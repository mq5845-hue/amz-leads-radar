import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const dashboardHtml = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const authModule = await readFile(new URL('../src/legacy-auth.ts', import.meta.url), 'utf8').catch(() => '');
const supabaseClient = await readFile(new URL('../src/supabase.ts', import.meta.url), 'utf8');
const authMigration = await readFile(
  new URL('../../supabase/migrations/20260919120000_dashboard_supabase_auth.sql', import.meta.url),
  'utf8',
).catch(() => '');
const baseSchema = await readFile(
  new URL('../../supabase/schema.sql', import.meta.url),
  'utf8',
).catch(() => '');

test('legacy dashboard exposes an email/password auth panel and auth bridge', () => {
  assert.match(dashboardHtml, /src="\/src\/legacy-auth\.ts"/);
  assert.match(dashboardHtml, /id="auth-mode-badge"/);
  assert.match(dashboardHtml, /id="auth-form"/);
  assert.match(dashboardHtml, /window\.amzAuth/);
});

test('legacy filter options can be initialized repeatedly without duplicating choices', () => {
  assert.match(dashboardHtml, /subSelect\.innerHTML\s*=\s*['"]<option value="all">所有 Subreddits<\/option>['"]/);
  assert.match(dashboardHtml, /catSelect\.innerHTML\s*=\s*['"]<option value="all">所有品類<\/option>['"]/);
});

test('auth modal exposes dialog semantics and mobile header safeguards', () => {
  assert.match(dashboardHtml, /id="auth-modal"[^>]*role="dialog"/);
  assert.match(dashboardHtml, /id="auth-modal"[^>]*aria-modal="true"/);
  assert.match(dashboardHtml, /amz-header-inner/);
  assert.match(dashboardHtml, /amz-header-actions/);
  assert.match(dashboardHtml, /#btn-upgrade-top span\s*\{\s*display:\s*none/);
});

test('browser auth does not persist Supabase sessions in web storage', () => {
  assert.match(`${authModule}\n${supabaseClient}`, /persistSession:\s*false/);
  assert.match(`${authModule}\n${supabaseClient}`, /detectSessionInUrl:\s*false/);
  assert.doesNotMatch(authModule, /localStorage|sessionStorage/);
});

test('quota RPC rejects a user id that is not the current session user', () => {
  assert.match(authMigration, /auth\.uid\(\)\s+is distinct from\s+p_user_id/);
  assert.match(authMigration, /grant execute on function public\.consume_daily_quota\(uuid\) to authenticated/i);
  assert.match(authMigration, /revoke execute on function public\.consume_daily_quota\(uuid\) from anon/i);
  assert.match(authMigration, /drop policy if exists "Allow update lead status"[\s\S]*?for update to authenticated/i);
});

test('base schema does not expose the quota RPC or lead updates to anonymous callers', () => {
  assert.match(baseSchema, /set search_path\s*=\s*public,\s*pg_temp/i);
  assert.match(baseSchema, /auth\.uid\(\)\s+is distinct from\s+p_user_id/);
  assert.match(baseSchema, /revoke execute on function public\.consume_daily_quota\(uuid\) from public/i);
  assert.match(baseSchema, /grant execute on function public\.consume_daily_quota\(uuid\) to authenticated/i);
  assert.match(baseSchema, /create policy "Allow update lead status"[\s\S]*?for update to authenticated/i);
});

test('authenticated Reddit navigation reserves a user-initiated tab before awaiting quota', () => {
  const jumpToReddit = dashboardHtml.match(/async function jumpToReddit\(leadId\) \{[\s\S]*?\n    \}/)?.[0] || '';
  assert.match(jumpToReddit, /const pendingWindow = isDemoMode \? null : window\.open\(['"]about:blank['"], ['"]_blank['"]\)/);
  assert.match(jumpToReddit, /const result = await window\.amzAuth\?\.consumeQuota\(\)/);
  assert.match(jumpToReddit, /pendingWindow\.location\.href = url\.toString\(\)/);
});

test('legacy footer does not expose dead hash links', () => {
  assert.doesNotMatch(dashboardHtml, /href="#"/);
});
