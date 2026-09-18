import http from 'node:http';

const port = Number(process.env.PORT || 8787);
const openAiKey = process.env.OPENAI_API_KEY || '';
const openAiModel = process.env.OPENAI_MODEL || 'gpt-5-mini';

const unsafePromisePatterns = [
  /\b(full|partial|your money|a)\s+refund\b/i,
  /\b(refund|replace|replacement)\s+(you|your|the customer)\b/i,
  /\b(certified|certification|guaranteed|guarantee|warranty|medical-grade)\b/i
];

export function containsUnsafePromise(text) {
  return unsafePromisePatterns.some((pattern) => pattern.test(String(text || '')));
}

export function createRequestCache() {
  const pending = new Map();
  return {
    run(requestId, operation) {
      if (pending.has(requestId)) return pending.get(requestId);
      const result = Promise.resolve().then(operation).finally(() => pending.delete(requestId));
      pending.set(requestId, result);
      return result;
    }
  };
}

function send(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS' });
  res.end(JSON.stringify(body));
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, {});
  if (req.method === 'GET' && req.url === '/health') return send(res, 200, { ok: true, service: openAiKey ? 'review-draft-openai' : 'review-draft-local-demo', productionReady: Boolean(openAiKey), providerConfigured: Boolean(openAiKey), model: openAiKey ? openAiModel : 'local-demo' });
  if (req.method !== 'POST' || req.url !== '/api/review-drafts') return send(res, 404, { error: 'not-found' });
  let raw = '';
  req.on('data', (chunk) => { raw += chunk; if (raw.length > 100000) req.destroy(); });
  req.on('end', async () => {
    try {
      const input = JSON.parse(raw || '{}');
      if (![1, 2, 3].includes(Number(input.stars)) || !String(input.reviewText || '').trim()) return send(res, 400, { error: 'only-1-to-3-star-reviews-with-text-supported' });
      if (!String(input.requestId || '').trim()) return send(res, 400, { error: 'request-id-required' });
      const text = String(input.reviewText).trim();
      const result = await requestCache.run(String(input.requestId), async () => {
        if (openAiKey) {
        const openAiResponse = await fetch('https://api.openai.com/v1/responses', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${openAiKey}` }, body: JSON.stringify({ model: openAiModel, store: false, input: `Write one concise, professional American-English Amazon seller reply to this ${input.stars}-star review. Do not invent refunds, certifications, guarantees, or product features. Review: ${text}` }) });
        if (!openAiResponse.ok) return { status: 502, body: { error: 'ai-provider-failed' } };
        const payload = await openAiResponse.json();
        const draft = payload.output_text?.trim() || payload.output?.flatMap((item) => item.content || []).find((part) => part.type === 'output_text')?.text?.trim();
        if (!draft) return { status: 502, body: { error: 'ai-empty-response' } };
        if (containsUnsafePromise(draft)) return { status: 502, body: { error: 'ai-unsafe-response', warnings: ['unsupported-promise-detected'] } };
        return { status: 200, body: { draft, analysis: 'OpenAI analysis completed.', warnings: [], usageEventId: `openai-${Date.now()}`, modelVersion: openAiModel } };
        }
        return { status: 200, body: { draft: `We’re sorry to hear about your experience with this product. We understand how frustrating it is when ${text.slice(0, 120)} Please contact our customer support team so we can review the details and help with the next steps.`, analysis: 'Local demo analysis: the review describes a product experience requiring acknowledgement and support follow-up.', warnings: ['local-demo-not-ai-generated'], usageEventId: `local-${Date.now()}`, modelVersion: 'local-demo' } };
      });
      return send(res, result.status, result.body);
    } catch { return send(res, 400, { error: 'invalid-json' }); }
  });
});

const requestCache = createRequestCache();

if (process.argv[1] && process.argv[1].replaceAll('\\', '/').endsWith('/api/server.mjs')) {
  server.listen(port, '127.0.0.1', () => console.log(`Review draft local demo listening at http://127.0.0.1:${port}`));
}
