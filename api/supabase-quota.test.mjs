import assert from 'node:assert/strict';
import test from 'node:test';
import { consumeReviewGeneration, getBearerToken } from './supabase-quota.mjs';

test('extracts only a Bearer access token from authorization headers', () => {
  assert.equal(getBearerToken({ authorization: 'Bearer user-token' }), 'user-token');
  assert.equal(getBearerToken({ authorization: 'Basic user-token' }), null);
  assert.equal(getBearerToken({}), null);
});

test('calls the authenticated review quota RPC with request metadata', async () => {
  let request;
  const result = await consumeReviewGeneration({
    url: 'https://example.supabase.co',
    anonKey: 'anon-key',
    accessToken: 'user-token',
    requestId: 'request-1',
    metadata: { asin: 'B000000001' },
    fetchImpl: async (url, options) => {
      request = { url, options };
      return new Response(JSON.stringify({ success: true, usage_event_id: 'event-1' }), { status: 200 });
    }
  });
  assert.deepEqual(result, { success: true, usage_event_id: 'event-1' });
  assert.equal(request.url, 'https://example.supabase.co/rest/v1/rpc/consume_review_generation');
  assert.equal(request.options.headers.Authorization, 'Bearer user-token');
  assert.deepEqual(JSON.parse(request.options.body), { p_request_id: 'request-1', p_metadata: { asin: 'B000000001' } });
});

test('fails closed when Supabase configuration is incomplete', async () => {
  await assert.rejects(() => consumeReviewGeneration({ url: '', anonKey: 'anon', accessToken: 'token', requestId: 'request-1' }), /supabase-configuration-missing/);
});
