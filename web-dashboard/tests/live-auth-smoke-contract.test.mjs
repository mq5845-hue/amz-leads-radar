import test from 'node:test';
import assert from 'node:assert/strict';

import { isLiveSmokeCliEntry, readLiveSmokeConfig, readSmokeFlags, runLiveAuthSmoke } from '../scripts/live-auth-smoke.mjs';

test('live smoke config requires local-only auth inputs without exposing their values', () => {
  const result = readLiveSmokeConfig({
    VITE_SUPABASE_URL: 'https://example.supabase.co',
    VITE_SUPABASE_ANON_KEY: 'publishable-key',
  });

  assert.deepEqual(result, {
    ok: false,
    missing: ['AMZ_SMOKE_EMAIL', 'AMZ_SMOKE_PASSWORD'],
  });
});

test('live smoke config accepts explicit smoke aliases and a production API URL', () => {
  const result = readLiveSmokeConfig({
    AMZ_SMOKE_SUPABASE_URL: 'https://example.supabase.co',
    AMZ_SMOKE_SUPABASE_ANON_KEY: 'publishable-key',
    AMZ_SMOKE_EMAIL: 'smoke@example.com',
    AMZ_SMOKE_PASSWORD: 'local-only-password',
    AMZ_PRODUCTION_API_URL: 'https://example.com/api/review-drafts',
  });

  assert.equal(result.ok, true);
  assert.equal(result.config.supabaseUrl, 'https://example.supabase.co');
  assert.equal(result.config.apiUrl, 'https://example.com/api/review-drafts');
  assert.equal(result.config.email, 'smoke@example.com');
  assert.equal(result.config.password, 'local-only-password');
});

test('mutating live smoke steps are opt-in', () => {
  assert.deepEqual(readSmokeFlags({}), {
    allowQuotaDecrement: false,
    runProductionApi: false,
  });
  assert.deepEqual(readSmokeFlags({
    AMZ_SMOKE_ALLOW_QUOTA_DECREMENT: '1',
    AMZ_SMOKE_RUN_PRODUCTION_API: '1',
  }), {
    allowQuotaDecrement: true,
    runProductionApi: true,
  });
});

test('live smoke CLI entry detection works with Windows paths', () => {
  assert.equal(isLiveSmokeCliEntry('C:\\Users\\july ane\\web-dashboard\\scripts\\live-auth-smoke.mjs'), true);
  assert.equal(isLiveSmokeCliEntry('E:/workspace/web-dashboard/scripts/live-auth-smoke.mjs'), true);
  assert.equal(isLiveSmokeCliEntry('C:\\workspace\\tests\\live-auth-smoke-contract.test.mjs'), false);
});

test('live smoke does not spend quota or call production API by default', async () => {
  const rpcCalls = [];
  const fakeClient = {
    auth: {
      signInWithPassword: async () => ({
        data: { user: { id: 'user-1' }, session: { access_token: 'in-memory-token' } },
        error: null,
      }),
      signOut: async () => ({ error: null }),
    },
    from: () => ({
      select: () => ({
        eq: (_column, value) => value === 'user-1'
          ? { single: async () => ({ data: { id: 'user-1' }, error: null }) }
          : Promise.resolve({ data: [], error: null }),
      }),
    }),
    rpc: async (name, args) => {
      rpcCalls.push({ name, args });
      return args.p_user_id === 'user-1'
        ? { data: { success: true }, error: null }
        : { data: null, error: { code: '42501' } };
    },
  };

  const result = await runLiveAuthSmoke({
    env: {
      AMZ_SMOKE_SUPABASE_URL: 'https://example.supabase.co',
      AMZ_SMOKE_SUPABASE_ANON_KEY: 'publishable-key',
      AMZ_SMOKE_EMAIL: 'smoke@example.com',
      AMZ_SMOKE_PASSWORD: 'local-only-password',
    },
    createSupabaseClient: () => fakeClient,
    fetchImpl: async () => { throw new Error('production API should not run'); },
  });

  assert.deepEqual(result, {
    ok: true,
    output: { auth: 'PASS', profile: 'PASS', rls: 'PASS', quota: 'SKIPPED', productionApi: 'SKIPPED' },
  });
  assert.equal(rpcCalls.length, 1);
  assert.equal(rpcCalls[0].name, 'consume_daily_quota');
  assert.notEqual(rpcCalls[0].args.p_user_id, 'user-1');
});

test('live smoke does not treat an unrelated RPC error as RLS proof', async () => {
  const fakeClient = {
    auth: {
      signInWithPassword: async () => ({
        data: { user: { id: 'user-1' }, session: { access_token: 'in-memory-token' } },
        error: null,
      }),
      signOut: async () => ({ error: null }),
    },
    from: () => ({
      select: () => ({
        eq: (_column, value) => value === 'user-1'
          ? { single: async () => ({ data: { id: 'user-1' }, error: null }) }
          : Promise.resolve({ data: [], error: null }),
      }),
    }),
    rpc: async () => ({ data: null, error: { code: '57014' } }),
  };

  await assert.rejects(
    runLiveAuthSmoke({
      env: {
        AMZ_SMOKE_SUPABASE_URL: 'https://example.supabase.co',
        AMZ_SMOKE_SUPABASE_ANON_KEY: 'publishable-key',
        AMZ_SMOKE_EMAIL: 'smoke@example.com',
        AMZ_SMOKE_PASSWORD: 'local-only-password',
      },
      createSupabaseClient: () => fakeClient,
    }),
    /quota RLS check failed/,
  );
});
