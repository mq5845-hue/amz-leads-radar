import assert from 'node:assert/strict';
import test from 'node:test';
import { containsUnsafePromise, createRequestCache, getHealthStatus, getRootStatus } from './server.mjs';

test('exposes a useful root status for local browser checks', () => {
  assert.deepEqual(getRootStatus(), {
    service: 'AMZ Leads Radar review-draft API',
    health: '/health',
    reviewDrafts: '/api/review-drafts'
  });
});

test('does not report production readiness without Supabase quota configuration', () => {
  assert.deepEqual(getHealthStatus({ openAiKey: 'configured', openAiModel: 'gpt-5-mini', supabaseUrl: '', supabaseAnonKey: '' }), {
    ok: true,
    service: 'review-draft-openai',
    productionReady: false,
    providerConfigured: true,
    quotaProviderConfigured: false,
    model: 'gpt-5-mini'
  });
});

test('rejects drafts that promise unsupported refunds or certifications', () => {
  assert.equal(containsUnsafePromise('We will issue a full refund and provide a certified replacement.'), true);
});

test('allows a cautious support follow-up without unsupported promises', () => {
  assert.equal(containsUnsafePromise('We are sorry to hear this. Please contact support so we can review the details.'), false);
});

test('reuses the in-flight result for the same request ID', async () => {
  const cache = createRequestCache();
  let calls = 0;
  const generate = () => { calls += 1; return Promise.resolve({ draft: 'safe draft' }); };
  const first = cache.run('request-1', generate);
  const second = cache.run('request-1', generate);
  assert.deepEqual(await first, { draft: 'safe draft' });
  assert.deepEqual(await second, { draft: 'safe draft' });
  assert.equal(calls, 1);
});
