const TRANSIENT_ERRORS = new Set(['PROVIDER_TIMEOUT', 'PROVIDER_UNAVAILABLE', 'RATE_LIMITED']);
const MAX_ATTEMPTS = 5;

export function deliveryTransition(current, event) {
  if (current.status !== 'queued') throw new Error(`cannot transition delivery from ${current.status}`);
  if (event.type === 'sent') {
    return { status: 'sent', provider_message_id: event.providerMessageId, sent_at: event.sentAt, error_code: null };
  }
  if (event.type === 'failed') {
    return { status: 'failed', provider_message_id: null, sent_at: null, error_code: event.errorCode };
  }
  throw new Error(`unsupported delivery event: ${event.type}`);
}

export function retrySchedule({ attempt, errorCode, now }) {
  if (!TRANSIENT_ERRORS.has(errorCode) || attempt >= MAX_ATTEMPTS) {
    return { retry: false, attempt, nextAttemptAt: null };
  }
  const next = new Date(now);
  next.setUTCSeconds(next.getUTCSeconds() + 60 * (2 ** (attempt - 1)));
  return { retry: true, attempt: attempt + 1, nextAttemptAt: next.toISOString() };
}
