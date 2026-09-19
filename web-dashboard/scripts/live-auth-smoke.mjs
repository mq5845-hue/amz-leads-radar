import { randomUUID } from 'node:crypto';
import { pathToFileURL } from 'node:url';

import { createClient } from '@supabase/supabase-js';

const DEFAULT_API_URL = 'https://amz-leads-radar.vercel.app/api/review-drafts';

export function readLiveSmokeConfig(env = process.env) {
  const config = {
    supabaseUrl: env.AMZ_SMOKE_SUPABASE_URL || env.VITE_SUPABASE_URL || '',
    anonKey: env.AMZ_SMOKE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY || '',
    email: env.AMZ_SMOKE_EMAIL || '',
    password: env.AMZ_SMOKE_PASSWORD || '',
    apiUrl: env.AMZ_PRODUCTION_API_URL || DEFAULT_API_URL,
  };

  const missing = [];
  if (!config.supabaseUrl) missing.push('AMZ_SMOKE_SUPABASE_URL or VITE_SUPABASE_URL');
  if (!config.anonKey) missing.push('AMZ_SMOKE_SUPABASE_ANON_KEY or VITE_SUPABASE_ANON_KEY');
  if (!config.email) missing.push('AMZ_SMOKE_EMAIL');
  if (!config.password) missing.push('AMZ_SMOKE_PASSWORD');

  return missing.length ? { ok: false, missing } : { ok: true, config };
}

export function readSmokeFlags(env = process.env) {
  return {
    allowQuotaDecrement: env.AMZ_SMOKE_ALLOW_QUOTA_DECREMENT === '1',
    runProductionApi: env.AMZ_SMOKE_RUN_PRODUCTION_API === '1',
  };
}

function assertCondition(condition, message) {
  if (!condition) throw new Error(message);
}

async function readJson(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

export async function runLiveAuthSmoke({ env = process.env, createSupabaseClient = createClient, fetchImpl = globalThis.fetch } = {}) {
  const configResult = readLiveSmokeConfig(env);
  if (!configResult.ok) {
    return { ok: false, code: 2, message: `missing ${configResult.missing.join(', ')}` };
  }

  const flags = readSmokeFlags(env);
  if (flags.runProductionApi && !flags.allowQuotaDecrement) {
    return { ok: false, code: 2, message: 'AMZ_SMOKE_RUN_PRODUCTION_API requires AMZ_SMOKE_ALLOW_QUOTA_DECREMENT=1' };
  }

  const { supabaseUrl, anonKey, email, password, apiUrl } = configResult.config;
  const supabase = createSupabaseClient(supabaseUrl, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
  if (authError || !authData?.session?.access_token || !authData?.user?.id) {
    return { ok: false, code: 1, message: 'authentication failed' };
  }

  const userId = authData.user.id;
  const output = { auth: 'PASS', profile: 'PASS', rls: 'PASS', quota: flags.allowQuotaDecrement ? 'PASS' : 'SKIPPED', productionApi: flags.runProductionApi ? 'PASS' : 'SKIPPED' };

  try {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id,plan,daily_usage_left,max_daily_usage,last_usage_reset')
      .eq('id', userId)
      .single();
    if (profileError || profile?.id !== userId) throw new Error('profile read failed');

    const foreignId = randomUUID();
    const { data: foreignRows, error: foreignError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', foreignId);
    if (foreignError || (foreignRows || []).length !== 0) throw new Error('profile RLS isolation failed');

    const { error: foreignQuotaError } = await supabase.rpc('consume_daily_quota', { p_user_id: foreignId });
    if (!foreignQuotaError || String(foreignQuotaError.code || '') !== '42501') {
      throw new Error('quota RLS check failed');
    }

    if (flags.allowQuotaDecrement) {
      const { data: quota, error: quotaError } = await supabase.rpc('consume_daily_quota', { p_user_id: userId });
      if (quotaError || (!quota?.success && !quota?.unlimited)) throw new Error('quota RPC failed');
    }

    if (flags.runProductionApi) {
      const requestId = `live-smoke-${randomUUID()}`;
      const response = await fetchImpl(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authData.session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stars: 3,
          reviewText: 'Live smoke test review. Please acknowledge the concern and invite support follow-up.',
          reviewFingerprint: `live-smoke-${randomUUID()}`,
          requestId,
        }),
      });
      const payload = await readJson(response);
      if (!response.ok || !payload?.draft || !payload?.usageEventId) throw new Error(`production API failed with status ${response.status}`);
    }
  } finally {
    await supabase.auth.signOut({ scope: 'local' }).catch(() => {});
  }

  return { ok: true, output };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = await runLiveAuthSmoke();
  if (!result.ok) {
    console.error(`live-auth-smoke: ${result.message}`);
    process.exitCode = result.code;
  } else {
    console.log(`live-auth-smoke: ${Object.entries(result.output).map(([name, value]) => `${name}=${value}`).join(' ')}`);
  }
}
