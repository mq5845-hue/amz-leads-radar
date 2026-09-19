-- Atomic review-draft persistence and quota consumption.
-- The function is SECURITY INVOKER: authenticated grants and ownership RLS
-- remain the authorization boundary, while the function provides one DB transaction.

drop policy if exists "Users insert own usage events" on public.usage_events;
create policy "Users insert own usage events" on public.usage_events
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

revoke all on public.brand_profiles, public.review_drafts, public.usage_events from public, anon;
grant select, insert, update, delete on public.brand_profiles to authenticated;
grant select, insert, update on public.review_drafts to authenticated;
grant select, insert on public.usage_events to authenticated;

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
  if auth.uid() is distinct from p_user_id then
    raise exception 'not-authorized' using errcode = '42501';
  end if;

  if p_brand_profile_id is not null and not exists (
    select 1
    from public.brand_profiles
    where id = p_brand_profile_id
      and user_id = p_user_id
  ) then
    raise exception 'brand-profile-not-owned' using errcode = '42501';
  end if;

  if exists (
    select 1
    from public.usage_events
    where user_id = p_user_id
      and request_id = p_request_id
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
    user_id,
    asin,
    review_fingerprint,
    stars,
    review_text,
    painpoint_analysis,
    draft_text,
    warnings,
    brand_profile_id,
    model_version,
    status
  ) values (
    p_user_id,
    p_asin,
    p_review_fingerprint,
    p_stars,
    p_review_text,
    coalesce(p_painpoint_analysis, ''),
    p_draft_text,
    coalesce(p_warnings, '[]'::jsonb),
    p_brand_profile_id,
    coalesce(p_model_version, 'unknown'),
    'generated'
  ) returning id into v_draft_id;

  insert into public.usage_events (
    user_id,
    feature,
    request_id,
    units,
    period_key,
    result,
    metadata
  ) values (
    p_user_id,
    'review_generate',
    p_request_id,
    1,
    current_date,
    'success',
    jsonb_build_object('draft_id', v_draft_id, 'model_version', coalesce(p_model_version, 'unknown'))
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
