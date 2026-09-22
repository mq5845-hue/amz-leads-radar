import test from 'node:test';
import assert from 'node:assert/strict';
import { deliveryTransition, retrySchedule } from './delivery-worker.mjs';

test('transitions a queued delivery to sent with provider metadata', () => {
  assert.deepEqual(deliveryTransition({ status: 'queued' }, { type: 'sent', providerMessageId: 'msg-1', sentAt: '2026-09-22T10:00:00.000Z' }), {
    status: 'sent', provider_message_id: 'msg-1', sent_at: '2026-09-22T10:00:00.000Z', error_code: null,
  });
});

test('retries transient failures with bounded exponential backoff', () => {
  assert.deepEqual(retrySchedule({ attempt: 1, errorCode: 'PROVIDER_TIMEOUT', now: '2026-09-22T10:00:00.000Z' }), {
    retry: true, attempt: 2, nextAttemptAt: '2026-09-22T10:01:00.000Z'
  });
  assert.deepEqual(retrySchedule({ attempt: 5, errorCode: 'PROVIDER_TIMEOUT', now: '2026-09-22T10:00:00.000Z' }).retry, false);
});

test('does not retry permanent failures', () => {
  assert.deepEqual(retrySchedule({ attempt: 1, errorCode: 'INVALID_RECIPIENT', now: '2026-09-22T10:00:00.000Z' }), {
    retry: false, attempt: 1, nextAttemptAt: null
  });
});
