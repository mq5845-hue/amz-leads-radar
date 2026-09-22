export function classifyProviderError(error = {}) {
  if (error.code === 'ETIMEDOUT' || error.code === 'ECONNRESET' || error.status === 503) return 'PROVIDER_TIMEOUT';
  if (error.status === 429) return 'RATE_LIMITED';
  if (error.status === 400 || error.code === 'INVALID_RECIPIENT') return 'INVALID_RECIPIENT';
  return 'PROVIDER_UNAVAILABLE';
}

export async function sendWithProvider(provider, message) {
  if (!provider || typeof provider.send !== 'function') throw new Error('provider-send-not-configured');
  try {
    const result = await provider.send({ to: message.to, subject: message.subject, body: message.body });
    if (!result?.id) throw new Error('provider-message-id-missing');
    return { ok: true, providerMessageId: result.id };
  } catch (error) {
    return { ok: false, errorCode: classifyProviderError(error) };
  }
}
