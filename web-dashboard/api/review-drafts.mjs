const fallbackDraft = (text) => `We’re sorry to hear about your experience with this product. We understand how frustrating it is when ${text.slice(0, 120)} Please contact our customer support team so we can review the details and help with the next steps.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method-not-allowed' });

  try {
    const input = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    if (![1, 2, 3].includes(Number(input.stars)) || !String(input.reviewText || '').trim()) {
      return res.status(400).json({ error: 'only-1-to-3-star-reviews-with-text-supported' });
    }

    const text = String(input.reviewText).trim();
    const openAiKey = process.env.OPENAI_API_KEY || '';
    const model = process.env.OPENAI_MODEL || 'gpt-5-mini';

    if (!openAiKey) {
      return res.status(200).json({
        draft: fallbackDraft(text),
        analysis: 'Local demo analysis: the review describes a product experience requiring acknowledgement and support follow-up.',
        warnings: ['local-demo-not-ai-generated'],
        usageEventId: `local-${Date.now()}`,
        modelVersion: 'local-demo',
      });
    }

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openAiKey}`,
      },
      body: JSON.stringify({
        model,
        store: false,
        input: `Write one concise, professional American-English Amazon seller reply to this ${input.stars}-star review. Do not invent refunds, certifications, guarantees, or product features. Review: ${text}`,
      }),
    });

    if (!response.ok) return res.status(502).json({ error: 'ai-provider-failed' });
    const payload = await response.json();
    const draft = payload.output_text?.trim() || payload.output?.flatMap((item) => item.content || []).find((part) => part.type === 'output_text')?.text?.trim();
    if (!draft) return res.status(502).json({ error: 'ai-empty-response' });

    return res.status(200).json({
      draft,
      analysis: 'OpenAI analysis completed.',
      warnings: [],
      usageEventId: `openai-${Date.now()}`,
      modelVersion: model,
    });
  } catch {
    return res.status(400).json({ error: 'invalid-request' });
  }
}
