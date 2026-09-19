-- The live quota RPC does not need elevated privileges: authenticated RLS
-- already permits a user to read/update only their own profile row.
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

revoke execute on function public.consume_daily_quota(uuid) from public, anon;
grant execute on function public.consume_daily_quota(uuid) to authenticated;
