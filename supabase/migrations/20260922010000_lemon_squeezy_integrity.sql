-- Keep migrated installations consistent with the canonical billing schema.
update public.profiles
set subscription_status = case
  when plan in ('pro', 'agency') then 'active'
  else 'free'
end
where subscription_status is null;

alter table public.profiles
  drop constraint if exists profiles_subscription_status_check;

alter table public.profiles
  add constraint profiles_subscription_status_check
  check (subscription_status in ('free', 'active', 'paused', 'past_due', 'cancelled', 'expired'));

create unique index if not exists profiles_lemon_squeezy_subscription_id_idx
  on public.profiles (lemon_squeezy_subscription_id)
  where lemon_squeezy_subscription_id is not null;
