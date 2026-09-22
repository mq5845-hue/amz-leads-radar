import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyProviderError, sendWithProvider } from './provider-adapter.mjs';

test('passes a rendered message to the provider and returns provider metadata', async () => {
  const calls = [];
  const result = await sendWithProvider({ send: async (message) => { calls.push(message); return { id: 'msg-1' }; } }, {
    to: 'seller@example.com', subject: 'Subject', body: 'Body'
  });
  assert.deepEqual(calls, [{ to: 'seller@example.com', subject: 'Subject', body: 'Body' }]);
  assert.deepEqual(result, { ok: true, providerMessageId: 'msg-1' });
});

test('classifies provider failures without exposing provider-specific details to clients', () => {
  assert.equal(classifyProviderError({ code: 'ETIMEDOUT' }), 'PROVIDER_TIMEOUT');
  assert.equal(classifyProviderError({ status: 429 }), 'RATE_LIMITED');
  assert.equal(classifyProviderError({ status: 400 }), 'INVALID_RECIPIENT');
});
