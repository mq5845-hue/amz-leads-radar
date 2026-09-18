-- Additive review-generation quota RPC.
-- The function is intentionally scoped to the authenticated caller and only
-- records successful review_generate events. It is not a billing system.

create or replace function public.consume_review_generation(
  p_request_id text,
  p_metadata jsonb default '{}'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_profile public.profiles%rowtype;
  v_existing public.usage_events%rowtype;
  v_usage_left integer;
begin
  if v_user_id is null then
    return jsonb_build_object('success', false, 'error', 'authentication-required');
  end if;

  if coalesce(length(trim(p_request_id)), 0) = 0 then
    return jsonb_build_object('success', false, 'error', 'request-id-required');
  end if;

  select * into v_existing
  from public.usage_events
  where user_id = v_user_id
    and request_id = p_request_id
    and feature = 'review_generate'
  limit 1;

  if found then
    return jsonb_build_object(
      'success', v_existing.result = 'success',
      'duplicate', true,
      'usage_event_id', v_existing.id,
      'usage_left', null
    );
  end if;

  select * into v_profile
  from public.profiles
  where id = v_user_id
  for update;

  if not found then
    return jsonb_build_object('success', false, 'error', 'profile-not-found');
  end if;

  if v_profile.plan in ('pro', 'agency') then
    v_usage_left := null;
  else
    if v_profile.last_usage_reset < current_date then
      v_profile.daily_usage_left := v_profile.max_daily_usage;
      v_profile.last_usage_reset := current_date;
    end if;

    if v_profile.daily_usage_left <= 0 then
      return jsonb_build_object('success', false, 'error', 'review-generation-quota-reached', 'usage_left', 0);
    end if;

    v_usage_left := v_profile.daily_usage_left - 1;
    update public.profiles
    set daily_usage_left = v_usage_left,
        last_usage_reset = v_profile.last_usage_reset,
        updated_at = now()
    where id = v_user_id;
  end if;

  insert into public.usage_events(user_id, feature, request_id, units, period_key, result, metadata)
  values (v_user_id, 'review_generate', p_request_id, 1, current_date, 'success', coalesce(p_metadata, '{}'::jsonb))
  returning * into v_existing;

  return jsonb_build_object(
    'success', true,
    'duplicate', false,
    'usage_event_id', v_existing.id,
    'usage_left', v_usage_left
  );
exception
  when unique_violation then
    select * into v_existing
    from public.usage_events
    where user_id = v_user_id and request_id = p_request_id and feature = 'review_generate'
    limit 1;
    return jsonb_build_object('success', true, 'duplicate', true, 'usage_event_id', v_existing.id, 'usage_left', null);
end;
$$;

revoke all on function public.consume_review_generation(text, jsonb) from public, anon;
grant execute on function public.consume_review_generation(text, jsonb) to authenticated;
