-- Additive Amazon review-reply MVP migration. No existing table is removed or renamed.

create table if not exists public.brand_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  brand_name text not null check (char_length(brand_name) between 1 and 120),
  tone text not null default 'professional_empathetic',
  support_policy text not null default '',
  prohibited_claims text[] not null default '{}',
  source text not null default 'manual' check (source in ('manual', 'website', 'approved_replies')),
  version integer not null default 1 check (version > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.review_drafts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  asin text check (asin is null or asin ~ '^[A-Z0-9]{10}$'),
  review_fingerprint text not null,
  stars numeric(2,1) not null check (stars >= 1 and stars <= 3),
  review_text text not null check (char_length(review_text) between 1 and 10000),
  painpoint_analysis text not null default '',
  draft_text text not null,
  warnings jsonb not null default '[]'::jsonb,
  brand_profile_id uuid references public.brand_profiles(id) on delete set null,
  model_version text not null default 'unknown',
  status text not null default 'generated' check (status in ('generated', 'filled', 'copied', 'discarded')),
  filled_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  feature text not null check (feature in ('review_generate', 'review_fill', 'reddit_summary', 'reddit_search')),
  request_id text not null,
  units integer not null default 1 check (units > 0),
  period_key date not null default current_date,
  result text not null check (result in ('success', 'rejected', 'failed')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, request_id)
);

create index if not exists idx_brand_profiles_user on public.brand_profiles(user_id);
create index if not exists idx_review_drafts_user_created on public.review_drafts(user_id, created_at desc);
create index if not exists idx_usage_events_user_period on public.usage_events(user_id, period_key, feature);

alter table public.brand_profiles enable row level security;
alter table public.review_drafts enable row level security;
alter table public.usage_events enable row level security;

create policy "Users read own brand profiles" on public.brand_profiles for select using (auth.uid() = user_id);
create policy "Users insert own brand profiles" on public.brand_profiles for insert with check (auth.uid() = user_id);
create policy "Users update own brand profiles" on public.brand_profiles for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users delete own brand profiles" on public.brand_profiles for delete using (auth.uid() = user_id);

create policy "Users read own review drafts" on public.review_drafts for select using (auth.uid() = user_id);
create policy "Users insert own review drafts" on public.review_drafts for insert with check (auth.uid() = user_id);
create policy "Users update own review drafts" on public.review_drafts for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users read own usage events" on public.usage_events for select using (auth.uid() = user_id);

revoke all on public.brand_profiles, public.review_drafts, public.usage_events from anon;
grant select, insert, update, delete on public.brand_profiles to authenticated;
grant select, insert, update on public.review_drafts to authenticated;
grant select on public.usage_events to authenticated;
