import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const migration = await readFile(
  new URL('./migrations/20260919160000_review_draft_atomic_usage.sql', import.meta.url),
  'utf8',
).catch(() => '');
const liveAlignment = await readFile(
  new URL('./migrations/20260919174343_live_auth_quota_alignment.sql', import.meta.url),
  'utf8',
).catch(() => '');

test('review draft atomic RPC is an authenticated, RLS-aware transaction boundary', () => {
  assert.match(migration, /create or replace function public\.record_review_draft_usage/i);
  assert.match(migration, /security invoker/i);
  assert.match(migration, /auth\.uid\(\)\s+is distinct from\s+p_user_id/i);
  assert.match(migration, /public\.consume_daily_quota\(p_user_id\)/i);
  assert.match(migration, /brand_profiles[\s\S]*user_id\s*=\s*p_user_id/i);
  assert.match(migration, /insert into public\.review_drafts/i);
  assert.match(migration, /insert into public\.usage_events/i);
  assert.match(migration, /unique_violation/i);
  assert.match(migration, /revoke execute on function public\.record_review_draft_usage[\s\S]*from public, anon/i);
  assert.match(migration, /grant execute on function public\.record_review_draft_usage[\s\S]*to authenticated/i);
});

test('usage ledger insert is limited to the current authenticated owner', () => {
  assert.match(migration, /create policy "Users insert own usage events"[\s\S]*to authenticated/i);
  assert.match(migration, /with check \(\(select auth\.uid\(\)\) = user_id\)/i);
  assert.match(migration, /grant select, insert on public\.usage_events to authenticated/i);
});

test('live alignment migration preserves the current API contract without assuming legacy leads', () => {
  assert.match(liveAlignment, /create or replace function public\.consume_daily_quota/i);
  assert.match(liveAlignment, /consume_daily_quota\([\s\S]*?security invoker/i);
  assert.match(liveAlignment, /create or replace function public\.record_review_draft_usage/i);
  assert.match(liveAlignment, /create index if not exists idx_review_drafts_brand_profile/i);
  assert.doesNotMatch(liveAlignment, /on public\.leads/i);
  assert.match(liveAlignment, /revoke execute on function public\.record_review_draft_usage[\s\S]*from public, anon/i);
  assert.match(liveAlignment, /grant execute on function public\.record_review_draft_usage[\s\S]*to authenticated/i);
});

console.log('sql-contract: PASS');
