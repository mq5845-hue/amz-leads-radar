import http from 'node:http';

const port = Number(process.env.PORT || 8787);
const geminiKey = process.env.GEMINI_API_KEY || '';

function send(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS' });
  res.end(JSON.stringify(body));
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, {});
  if (req.method === 'GET' && req.url === '/health') return send(res, 200, { ok: true, service: geminiKey ? 'review-draft-gemini' : 'review-draft-local-demo', productionReady: Boolean(geminiKey), providerConfigured: Boolean(geminiKey) });
  if (req.method !== 'POST' || req.url !== '/api/review-drafts') return send(res, 404, { error: 'not-found' });
  let raw = '';
  req.on('data', (chunk) => { raw += chunk; if (raw.length > 100000) req.destroy(); });
  req.on('end', async () => {
    try {
      const input = JSON.parse(raw || '{}');
      if (![1, 2, 3].includes(Number(input.stars)) || !String(input.reviewText || '').trim()) return send(res, 400, { error: 'only-1-to-3-star-reviews-with-text-supported' });
      const text = String(input.reviewText).trim();
      if (geminiKey) {
        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(geminiKey)}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: `Write one concise, professional American-English Amazon seller reply to this ${input.stars}-star review. Do not invent refunds, certifications, guarantees, or product features. Review: ${text}` }] }] }) });
        if (!geminiResponse.ok) return send(res, 502, { error: 'ai-provider-failed' });
        const payload = await geminiResponse.json();
        const draft = payload.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (!draft) return send(res, 502, { error: 'ai-empty-response' });
        return send(res, 200, { draft, analysis: 'Gemini analysis completed.', warnings: [], usageEventId: `gemini-${Date.now()}`, modelVersion: 'gemini-2.5-flash' });
      }
      return send(res, 200, { draft: `We’re sorry to hear about your experience with this product. We understand how frustrating it is when ${text.slice(0, 120)} Please contact our customer support team so we can review the details and help with the next steps.`, analysis: 'Local demo analysis: the review describes a product experience requiring acknowledgement and support follow-up.', warnings: ['local-demo-not-ai-generated'], usageEventId: `local-${Date.now()}`, modelVersion: 'local-demo' });
    } catch { return send(res, 400, { error: 'invalid-json' }); }
  });
});

server.listen(port, '127.0.0.1', () => console.log(`Review draft local demo listening at http://127.0.0.1:${port}`));
