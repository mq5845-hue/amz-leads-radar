-- Additive migration for existing AMZ Leads Radar installations.
alter table public.profiles
  add column if not exists lemon_squeezy_customer_id text,
  add column if not exists lemon_squeezy_subscription_id text,
  add column if not exists lemon_squeezy_variant_id text,
  add column if not exists subscription_status text default 'free',
  add column if not exists subscription_renews_at timestamp with time zone,
  add column if not exists updated_at timestamp with time zone default timezone('utc'::text, now());

create table if not exists public.webhook_events (
  id uuid default gen_random_uuid() primary key,
  provider text not null check (provider = 'lemon_squeezy'),
  event_id text not null,
  event_name text not null,
  payload jsonb not null,
  received_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (provider, event_id)
);

alter table public.webhook_events enable row level security;
revoke all on public.webhook_events from anon, authenticated;
