export default function handler(_req, res) {
  const configured = Boolean(process.env.OPENAI_API_KEY);
  res.status(200).json({
    ok: true,
    service: configured ? 'review-draft-openai' : 'review-draft-local-demo',
    productionReady: configured,
    providerConfigured: configured,
    model: configured ? (process.env.OPENAI_MODEL || 'gpt-5-mini') : 'local-demo',
  });
}
