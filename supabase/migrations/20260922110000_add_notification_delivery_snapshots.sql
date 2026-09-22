-- Additive notification/email delivery audit records.
-- Stores send-time localization metadata; it intentionally does not store
-- Amazon review text or AI-generated draft content.

create table if not exists public.notification_deliveries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  channel text not null check (channel in ('email', 'in_app')),
  template_key text not null check (char_length(template_key) between 1 and 160),
  template_version integer not null check (template_version > 0),
  locale text not null check (locale in ('zh-TW', 'zh-CN', 'en', 'ja', 'ko', 'ms', 'id', 'vi')),
  timezone text not null check (char_length(timezone) between 1 and 80),
  marketplace text not null check (char_length(marketplace) between 2 and 32),
  status text not null default 'queued' check (status in ('queued', 'sent', 'failed')),
  provider_message_id text,
  error_code text,
  queued_at timestamptz not null default now(),
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_notification_deliveries_user_created
  on public.notification_deliveries(user_id, created_at desc);

alter table public.notification_deliveries enable row level security;

revoke all on public.notification_deliveries from anon;
grant select, insert on public.notification_deliveries to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'notification_deliveries'
      and policyname = 'Users read own notification deliveries'
  ) then
    create policy "Users read own notification deliveries"
      on public.notification_deliveries for select
      to authenticated
      using ((select auth.uid()) = user_id);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'notification_deliveries'
      and policyname = 'Users insert own notification deliveries'
  ) then
    create policy "Users insert own notification deliveries"
      on public.notification_deliveries for insert
      to authenticated
      with check ((select auth.uid()) = user_id);
  end if;
end;
$$;
