-- Additive Dashboard Auth hardening. Existing tables and demo data are preserved.

-- A browser session may consume only its own quota. The previous function accepted
-- an arbitrary user id, which allowed an authenticated caller to target another row.
create or replace function public.consume_daily_quota(p_user_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_profile record;
begin
  if auth.uid() is distinct from p_user_id then
    raise exception 'not-authorized' using errcode = '42501';
  end if;

  select * into v_profile from public.profiles where id = p_user_id for update;
  if not found then
    return jsonb_build_object('success', false, 'message', 'Profile not found');
  end if;

  if v_profile.plan in ('pro', 'agency') then
    return jsonb_build_object('success', true, 'unlimited', true, 'usage_left', 999);
  end if;

  if v_profile.last_usage_reset < current_date then
    v_profile.daily_usage_left := v_profile.max_daily_usage;
    v_profile.last_usage_reset := current_date;
  end if;

  if v_profile.daily_usage_left <= 0 then
    return jsonb_build_object(
      'success', false,
      'message', 'Daily quota reached. Please upgrade to Pro for unlimited autofills.',
      'usage_left', 0
    );
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

drop policy if exists "Allow individual view profile" on public.profiles;
create policy "Allow individual view profile" on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "Allow individual update profile" on public.profiles;
create policy "Allow individual update profile" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

revoke all on public.profiles from anon;
grant select, update on public.profiles to authenticated;

-- Existing deployments also need the legacy lead status policy narrowed to
-- authenticated sessions; anonymous callers must remain read-only.
drop policy if exists "Allow update lead status" on public.leads;
create policy "Allow update lead status" on public.leads
  for update to authenticated
  using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);

revoke execute on function public.consume_daily_quota(uuid) from public;
revoke execute on function public.consume_daily_quota(uuid) from anon;
grant execute on function public.consume_daily_quota(uuid) to authenticated;
