-- Align the live amz-leads-radar project with the protected review-draft API.
-- This migration targets the deployed schema and intentionally does not assume
-- the legacy public.leads table exists.

create or replace function public.consume_daily_quota(p_user_id uuid)
returns jsonb
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
declare
  v_profile record;
begin
  if (select auth.uid()) is distinct from p_user_id then
    raise exception 'not-authorized' using errcode = '42501';
  end if;

  select * into v_profile from public.profiles where id = p_user_id for update;
  if not found then
    return jsonb_build_object('success', false, 'message', 'Profile not found');
  end if;

  if v_profile.plan in ('pro', 'agency') then
    return jsonb_build_object('success', true, 'unlimited', true, 'usage_left', null);
  end if;

  if v_profile.last_usage_reset < current_date then
    v_profile.daily_usage_left := v_profile.max_daily_usage;
    v_profile.last_usage_reset := current_date;
  end if;

  if v_profile.daily_usage_left <= 0 then
    return jsonb_build_object('success', false, 'message', 'Daily quota reached', 'usage_left', 0);
  end if;

  update public.profiles
  set daily_usage_left = v_profile.daily_usage_left - 1,
      last_usage_reset = v_profile.last_usage_reset,
      updated_at = now()
  where id = p_user_id;

  return jsonb_build_object(
    'success', true,
    'usage_left', v_profile.daily_usage_left - 1,
    'message', 'Quota deducted successfully'
  );
end;
$$;

drop policy if exists "Users insert own profiles" on public.profiles;
drop policy if exists "Users read own profiles" on public.profiles;
drop policy if exists "Users update own profiles" on public.profiles;
create policy "Users insert own profiles" on public.profiles
  for insert to authenticated
  with check ((select auth.uid()) = id);
create policy "Users read own profiles" on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);
create policy "Users update own profiles" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "Users delete own brand profiles" on public.brand_profiles;
drop policy if exists "Users insert own brand profiles" on public.brand_profiles;
drop policy if exists "Users read own brand profiles" on public.brand_profiles;
drop policy if exists "Users update own brand profiles" on public.brand_profiles;
create policy "Users delete own brand profiles" on public.brand_profiles
  for delete to authenticated
  using ((select auth.uid()) = user_id);
create policy "Users insert own brand profiles" on public.brand_profiles
  for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Users read own brand profiles" on public.brand_profiles
  for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Users update own brand profiles" on public.brand_profiles
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users insert own review drafts" on public.review_drafts;
drop policy if exists "Users read own review drafts" on public.review_drafts;
drop policy if exists "Users update own review drafts" on public.review_drafts;
create policy "Users insert own review drafts" on public.review_drafts
  for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Users read own review drafts" on public.review_drafts
  for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Users update own review drafts" on public.review_drafts
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users insert own usage events" on public.usage_events;
drop policy if exists "Users read own usage events" on public.usage_events;
create policy "Users insert own usage events" on public.usage_events
  for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Users read own usage events" on public.usage_events
  for select to authenticated
  using ((select auth.uid()) = user_id);

revoke all on public.profiles, public.brand_profiles, public.review_drafts, public.usage_events from public, anon;
grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.brand_profiles to authenticated;
grant select, insert, update on public.review_drafts to authenticated;
grant select, insert on public.usage_events to authenticated;

revoke execute on function public.consume_daily_quota(uuid) from public, anon;
grant execute on function public.consume_daily_quota(uuid) to authenticated;

create index if not exists idx_review_drafts_brand_profile_id
  on public.review_drafts (brand_profile_id);

create or replace function public.record_review_draft_usage(
  p_user_id uuid,
  p_asin text,
  p_review_fingerprint text,
  p_stars numeric,
  p_review_text text,
  p_painpoint_analysis text,
  p_draft_text text,
  p_warnings jsonb,
  p_brand_profile_id uuid,
  p_model_version text,
  p_request_id text
)
returns jsonb
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
declare
  v_quota jsonb;
  v_draft_id uuid;
  v_usage_id uuid;
begin
  if (select auth.uid()) is distinct from p_user_id then
    raise exception 'not-authorized' using errcode = '42501';
  end if;

  if p_brand_profile_id is not null and not exists (
    select 1 from public.brand_profiles
    where id = p_brand_profile_id and user_id = p_user_id
  ) then
    raise exception 'brand-profile-not-owned' using errcode = '42501';
  end if;

  if exists (
    select 1 from public.usage_events
    where user_id = p_user_id and request_id = p_request_id
  ) then
    raise exception 'duplicate-request-id' using errcode = '23505';
  end if;

  v_quota := public.consume_daily_quota(p_user_id);
  if coalesce((v_quota ->> 'success')::boolean, false) is not true then
    raise exception 'review-generation-quota-reached'
      using errcode = 'P0001',
            detail = coalesce(v_quota ->> 'message', 'Daily quota reached');
  end if;

  insert into public.review_drafts (
    user_id, asin, review_fingerprint, stars, review_text,
    painpoint_analysis, draft_text, warnings, brand_profile_id,
    model_version, status
  ) values (
    p_user_id, p_asin, p_review_fingerprint, p_stars, p_review_text,
    coalesce(p_painpoint_analysis, ''), p_draft_text,
    coalesce(p_warnings, '[]'::jsonb), p_brand_profile_id,
    coalesce(p_model_version, 'unknown'), 'generated'
  ) returning id into v_draft_id;

  insert into public.usage_events (
    user_id, feature, request_id, units, period_key, result, metadata
  ) values (
    p_user_id, 'review_generate', p_request_id, 1, current_date,
    'success', jsonb_build_object('draft_id', v_draft_id, 'model_version', coalesce(p_model_version, 'unknown'))
  ) returning id into v_usage_id;

  return jsonb_build_object(
    'draft_id', v_draft_id,
    'usage_event_id', v_usage_id,
    'usage_left', v_quota -> 'usage_left'
  );
exception
  when unique_violation then
    raise exception 'duplicate-request-id' using errcode = '23505';
end;
$$;

revoke execute on function public.record_review_draft_usage(uuid, text, text, numeric, text, text, text, jsonb, uuid, text, text) from public, anon;
grant execute on function public.record_review_draft_usage(uuid, text, text, numeric, text, text, text, jsonb, uuid, text, text) to authenticated;
