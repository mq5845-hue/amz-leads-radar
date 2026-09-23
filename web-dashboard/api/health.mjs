export default function handler(_req, res) {
  const configured = Boolean(process.env.OPENAI_API_KEY);
  const productionRuntime = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
  const healthy = configured || !productionRuntime || process.env.ALLOW_LOCAL_DEMO === '1';
  res.status(healthy ? 200 : 503).json({
    ok: healthy,
    ...(healthy ? {} : { error: 'review-draft-provider-not-configured' }),
    service: configured ? 'review-draft-openai' : (productionRuntime ? 'review-draft-unavailable' : 'review-draft-local-demo'),
    productionReady: configured,
    providerConfigured: configured,
    model: configured ? (process.env.OPENAI_MODEL || 'gpt-5-mini') : (productionRuntime ? null : 'local-demo'),
  });
}
