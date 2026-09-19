import assert from 'node:assert/strict';
import test from 'node:test';
import { createReviewDraftHandler } from '../api/review-drafts.mjs';

function makeResponse() {
  return {
    statusCode: 200,
    payload: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.payload = body;
      return this;
    },
  };
}

function makeRequest(body, headers = {}) {
  return { method: 'POST', headers, body };
}

test('production API rejects an OpenAI request without a bearer session', async () => {
  const handler = createReviewDraftHandler({
    env: { OPENAI_API_KEY: 'configured', SUPABASE_URL: 'https://example.supabase.co', SUPABASE_ANON_KEY: 'anon' },
  });
  const res = makeResponse();

  await handler(makeRequest({ stars: 2, reviewText: 'The zipper broke.', requestId: 'req-1', reviewFingerprint: 'review-1' }), res);

  assert.equal(res.statusCode, 401);
  assert.equal(res.payload.error, 'authentication-required');
});

test('authenticated API generates first, then records the draft through the atomic RPC', async () => {
  const rpcCalls = [];
  const supabase = {
    auth: { getUser: async () => ({ data: { user: { id: 'user-1' } }, error: null }) },
    rpc: async (name, params) => {
      rpcCalls.push({ name, params });
      return { data: { draft_id: 'draft-1', usage_event_id: 'usage-1', usage_left: 2 }, error: null };
    },
  };
  const handler = createReviewDraftHandler({
    env: { OPENAI_API_KEY: 'configured', OPENAI_MODEL: 'test-model', SUPABASE_URL: 'https://example.supabase.co', SUPABASE_ANON_KEY: 'anon' },
    fetchImpl: async () => new Response(JSON.stringify({ output_text: 'We are sorry to hear this.' }), { status: 200 }),
    createSupabaseClient: () => supabase,
  });
  const res = makeResponse();

  await handler(makeRequest({
    stars: 2,
    reviewText: 'The zipper broke.',
    asin: 'B000000001',
    requestId: 'req-1',
    reviewFingerprint: 'review-1',
  }, { authorization: 'Bearer session-token' }), res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.payload.usageEventId, 'usage-1');
  assert.equal(rpcCalls.length, 1);
  assert.equal(rpcCalls[0].name, 'record_review_draft_usage');
  assert.equal(rpcCalls[0].params.p_user_id, 'user-1');
  assert.equal(rpcCalls[0].params.p_request_id, 'req-1');
  assert.equal(rpcCalls[0].params.p_review_fingerprint, 'review-1');
});

test('demo API keeps the local fallback without requiring a session', async () => {
  const handler = createReviewDraftHandler({
    env: {},
    createSupabaseClient: () => { throw new Error('demo must not create Supabase client'); },
  });
  const res = makeResponse();

  await handler(makeRequest({ stars: 1, reviewText: 'The handle broke.' }), res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.payload.modelVersion, 'local-demo');
  assert.deepEqual(res.payload.warnings, ['local-demo-not-ai-generated']);
});

test('production API returns a client error for a null request body', async () => {
  const handler = createReviewDraftHandler({
    env: { OPENAI_API_KEY: 'configured', SUPABASE_URL: 'https://example.supabase.co', SUPABASE_ANON_KEY: 'anon' },
  });
  const res = makeResponse();

  await handler(makeRequest(null, { authorization: 'Bearer session-token' }), res);

  assert.equal(res.statusCode, 400);
  assert.equal(res.payload.error, 'only-1-to-3-star-reviews-with-text-supported');
});

test('production API rejects an unsafe provider draft before recording usage', async () => {
  let rpcCalled = false;
  const handler = createReviewDraftHandler({
    env: { OPENAI_API_KEY: 'configured', SUPABASE_URL: 'https://example.supabase.co', SUPABASE_ANON_KEY: 'anon' },
    fetchImpl: async () => new Response(JSON.stringify({ output_text: 'We guarantee a full refund and warranty.' }), { status: 200 }),
    createSupabaseClient: () => ({
      auth: { getUser: async () => ({ data: { user: { id: 'user-1' } }, error: null }) },
      rpc: async () => { rpcCalled = true; return { data: {}, error: null }; },
    }),
  });
  const res = makeResponse();

  await handler(makeRequest({ stars: 2, reviewText: 'The zipper broke.', requestId: 'req-unsafe', reviewFingerprint: 'review-unsafe' }, { authorization: 'Bearer session-token' }), res);

  assert.equal(res.statusCode, 502);
  assert.equal(res.payload.error, 'ai-unsafe-response');
  assert.equal(rpcCalled, false);
});

test('production API rejects a malformed provider payload instead of throwing', async () => {
  const handler = createReviewDraftHandler({
    env: { OPENAI_API_KEY: 'configured', SUPABASE_URL: 'https://example.supabase.co', SUPABASE_ANON_KEY: 'anon' },
    fetchImpl: async () => new Response(JSON.stringify({ output: {} }), { status: 200 }),
    createSupabaseClient: () => ({
      auth: { getUser: async () => ({ data: { user: { id: 'user-1' } }, error: null }) },
      rpc: async () => ({ data: {}, error: null }),
    }),
  });
  const res = makeResponse();

  await handler(makeRequest({ stars: 2, reviewText: 'The zipper broke.', requestId: 'req-malformed', reviewFingerprint: 'review-malformed' }, { authorization: 'Bearer session-token' }), res);

  assert.equal(res.statusCode, 502);
  assert.equal(res.payload.error, 'ai-empty-response');
});
