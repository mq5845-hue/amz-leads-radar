-- ============================================================================
-- AMZ Leads Radar: Supabase PostgreSQL Schema & Seed Data
-- ============================================================================

-- 1. Enable UUID Extension
create extension if not exists "uuid-ossp";

-- 2. Create Leads Table (商機資料表)
create table if not exists public.leads (
  id uuid default gen_random_uuid() primary key,
  reddit_url text unique not null,
  reddit_id text,
  subreddit text not null,
  title text not null,
  author text default 'anonymous_redditor',
  content_raw text,
  painpoint_summary text not null,
  keyword_matches text[] default '{}',
  match_score integer default 85 check (match_score >= 0 and match_score <= 100),
  upvotes integer default 0,
  comments_count integer default 0,
  sentiment text default 'negative', -- negative (complaining about existing products), inquiry (asking for recommendations)
  suggested_reply text,
  replies jsonb default '{
    "helpful_enthusiast": "",
    "fellow_sufferer": "",
    "tech_pro_solution": ""
  }'::jsonb,
  status text default 'new' check (status in ('new', 'in_progress', 'replied', 'ignored')),
  category text default 'General', -- Electronics, Home & Kitchen, Outdoor, Beauty, etc.
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexing for fast query & filtering
create index if not exists idx_leads_subreddit on public.leads(subreddit);
create index if not exists idx_leads_match_score on public.leads(match_score desc);
create index if not exists idx_leads_status on public.leads(status);
create index if not exists idx_leads_created_at on public.leads(created_at desc);

-- 3. Profiles Table (用戶檔案與 Freemium 配額表)
create table if not exists public.profiles (
  id uuid primary key, -- mapped to auth.users.id
  email text,
  plan text default 'free' check (plan in ('free', 'pro', 'agency')),
  daily_usage_left integer default 3,
  max_daily_usage integer default 3,
  last_usage_reset date default current_date,
  brand_name text default '',
  store_url text default '',
  locale text not null default 'en' check (locale in ('zh-TW', 'zh-CN', 'en', 'ja', 'ko', 'ms', 'id', 'vi')),
  timezone text not null default 'UTC',
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3a. Notification delivery localization snapshots
create table if not exists public.notification_deliveries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  channel text not null check (channel in ('email', 'in_app')),
  template_key text not null,
  template_version integer not null check (template_version > 0),
  locale text not null check (locale in ('zh-TW', 'zh-CN', 'en', 'ja', 'ko', 'ms', 'id', 'vi')),
  timezone text not null,
  marketplace text not null,
  status text not null default 'queued' check (status in ('queued', 'sent', 'failed')),
  provider_message_id text,
  error_code text,
  queued_at timestamptz not null default now(),
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.notification_deliveries enable row level security;

-- 4. Lead Activities Table (用戶操作軌跡與轉化追蹤)
create table if not exists public.lead_activities (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete cascade,
  action_type text not null check (action_type in ('jump_to_reddit', 'autofill', 'copied', 'status_change')),
  tone_selected text default 'helpful_enthusiast',
  final_content text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Stored Procedures / RPC Functions

-- Function: Consume daily quota for autofill action
create or replace function public.consume_daily_quota(p_user_id uuid)
returns jsonb
language plpgsql
security definer
as $$
declare
  v_profile record;
begin
  -- Check user profile
  select * into v_profile from public.profiles where id = p_user_id for update;
  if not found then
    return jsonb_build_object('success', false, 'message', 'Profile not found');
  end if;

  -- Pro / Agency has unlimited quota
  if v_profile.plan in ('pro', 'agency') then
    return jsonb_build_object('success', true, 'unlimited', true, 'usage_left', 999);
  end if;

  -- Reset quota if it is a new day
  if v_profile.last_usage_reset < current_date then
    v_profile.daily_usage_left := v_profile.max_daily_usage;
    v_profile.last_usage_reset := current_date;
  end if;

  -- Check if quota remains
  if v_profile.daily_usage_left <= 0 then
    return jsonb_build_object(
      'success', false, 
      'message', 'Daily quota reached. Please upgrade to Pro for unlimited autofills.',
      'usage_left', 0
    );
  end if;

  -- Deduct 1 count
  update public.profiles
  set 
    daily_usage_left = v_profile.daily_usage_left - 1,
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

-- 6. Row Level Security (RLS) Policies
alter table public.leads enable row level security;
alter table public.profiles enable row level security;
alter table public.lead_activities enable row level security;

-- Leads: All authenticated and anon users can read leads
create policy "Allow read leads" on public.leads
  for select using (true);

-- Leads: Update lead status
create policy "Allow update lead status" on public.leads
  for update using (true);

-- Profiles: Users can view their own profile
create policy "Allow individual view profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Allow individual update profile" on public.profiles
  for update using (auth.uid() = id);

-- 7. Seed Data for Instant Realistic Demo
insert into public.leads (
  reddit_url,
  reddit_id,
  subreddit,
  title,
  author,
  content_raw,
  painpoint_summary,
  keyword_matches,
  match_score,
  upvotes,
  comments_count,
  sentiment,
  suggested_reply,
  replies,
  status,
  category,
  created_at
) values
(
  'https://www.reddit.com/r/BuyItForLife/comments/1f8e123/need_a_portable_charger_powerbank_that_doesnt/',
  't3_1f8e123',
  'r/BuyItForLife',
  'Need a portable charger / powerbank that doesn''t swell after 6 months of heavy travel',
  'NomadCoder_99',
  'I have gone through three Anker and generic power banks this year. Every single one either bulges around month 4 or the USB-C port gets super loose. I travel 3 weeks a month for photography and need 65W PD to charge my MacBook Air and iPhone. What is actually built to last?',
  '買家出差頻率高，抱怨過去使用的行動電源幾個月內電池膨脹且 Type-C 接孔鬆動，正急切尋找高耐用度、具備 65W PD 輸出、不易發熱膨脹的高品質電源。',
  array['powerbank', 'swelling', 'loose USB-C', '65W PD', 'built to last'],
  96,
  342,
  87,
  'negative',
  'Totally feel your pain on battery swelling—usually happens when budget controllers overheat the cells during 65W sustained loads. If you want something actually reliable, look for powerbanks with GaN III controllers and grade-A 21700 cells (similar to Tesla packs). Check out [Your Brand / Link], they use reinforced aluminum housing and dual NTC temp sensors which prevent cell degradation during long flights.',
  '{
    "helpful_enthusiast": "Totally feel your pain on battery swelling—usually happens when budget controllers overheat the cells during 65W sustained loads. If you want something actually reliable, look for powerbanks with GaN III controllers and grade-A 21700 cells. Check out [Your Brand / Link], they use reinforced aluminum housing and dual NTC temp sensors.",
    "fellow_sufferer": "Man, went through the exact same nightmare last year with loose ports ruining a shoot in Europe. Switched to [Your Brand / Link] about 8 months ago—the braided connector and CNC alloy casing feel indestructible so far.",
    "tech_pro_solution": "The root cause of swelling is thermal runaway caused by poor heat dissipation in plastic enclosures. For 65W travel, you need aluminum heatsinking and 21700 Li-ion cells. Take a look at [Your Brand / Link] which specs 1000+ cycle life with UL94-V0 fireproof standards."
  }'::jsonb,
  'new',
  'Electronics',
  now() - interval '2 hours'
),
(
  'https://www.reddit.com/r/amazon/comments/1f8c892/why_are_ergonomic_desk_chairs_either_300_junk_or/',
  't3_1f8c892',
  'r/amazon',
  'Why are ergonomic desk chairs either $300 junk or $1600 Herman Miller? Is there a sweet spot?',
  'DeskBound_Dev',
  'I work 10 hours a day as a remote backend dev. Bought a generic $280 ergonomic mesh chair on Amazon with 4.5 stars, lumbar support snapped within 3 months and the seat cushion flattened into cardboard. I don''t want to drop $1,600 on an Aeron. Does anyone have an honest recommendation in the $400-$600 range with real 3D armrests and durable mesh?',
  '遠端工程師抱怨 Amazon 廉價工學椅腰靠斷裂、座墊塌陷，不願花費 $1600 買頂級名牌，尋求 $400-$600 區間真正耐用、具備 3D 扶手與透氣網布的「甜點區」工作椅。',
  array['ergonomic chair', 'lumbar snapped', 'cushion flattened', 'sweet spot', 'durable mesh'],
  92,
  518,
  143,
  'inquiry',
  'As someone who sits 9+ hours coding, the biggest trap with $250 Amazon chairs is cheap plastic lumbar frames and low-density molded foam. In that $400-$500 sweet spot, look for Korean Wintex mesh and steel-reinforced chassis. We''ve been testing [Your Brand / Link] in our home office—the dynamic 3D lumbar actually tracks spine movement without digging in.',
  '{
    "helpful_enthusiast": "As someone who sits 9+ hours coding, the biggest trap with $250 Amazon chairs is cheap plastic lumbar frames. In that $400-$500 sweet spot, look for Korean Wintex mesh and steel-reinforced chassis. Check out [Your Brand / Link]—the dynamic 3D lumbar actually tracks spine movement.",
    "fellow_sufferer": "I had that exact same experience with the foam flattening out into rock. My lower back was killing me until I tried [Your Brand / Link] on recommendation from a coworker. Been 14 months and mesh tension is still like day one.",
    "tech_pro_solution": "From an ergonomic perspective, prioritize synchronized tilt mechanisms (2:1 recline ratio) and nylon-glass fiber framing. [Your Brand / Link] offers BIFMA-certified gas cylinders and true 3D armrest adjustments that rival $1k chairs without the markup."
  }'::jsonb,
  'new',
  'Home & Office',
  now() - interval '5 hours'
),
(
  'https://www.reddit.com/r/Coffee/comments/1f8a441/burr_grinder_that_doesnt_clog_with_light_roast/',
  't3_1f8a441',
  'r/Coffee',
  'Burr coffee grinder that doesn''t jam or stall on dense light roast Ethiopian beans?',
  'CaffeineCraver',
  'My third Amazon conical burr grinder just burnt out its small motor because of dense light roasts. Any burr grinder under $150 with high-torque DC motor that actually produces consistent espresso/aeropress grind without retention mess?',
  '精品咖啡愛好者抱怨一般平價磨豆機遇到高密度淺焙豆經常卡豆並燒壞馬達，正尋找具備大扭力、低殘粉、適合手沖與濃縮的耐用磨豆機。',
  array['burr grinder', 'dense light roast', 'stalling motor', 'retention mess', 'consistent grind'],
  88,
  189,
  64,
  'negative',
  'Light roast Ethiopian beans are basically hard pebbles, so low-torque AC motors choke instantly. For sub-$150, you need a high-torque planetary gear DC motor and 40mm stainless CNC burrs rather than stamped steel. You might want to check [Your Brand / Link]—it has zero-retention bellows and handles dense natural beans without bogging down.',
  '{
    "helpful_enthusiast": "Light roast Ethiopian beans are basically hard pebbles, so low-torque AC motors choke instantly. For sub-$150, you need high-torque planetary gear DC motors and 40mm stainless CNC burrs. Take a look at [Your Brand / Link].",
    "fellow_sufferer": "Burned out two grinders on Guji beans before I learned this lesson the hard way! Switched over to [Your Brand / Link] and the slow-RPM torque makes a night and day difference.",
    "tech_pro_solution": "Look closely at the burr hardness (60+ HRC) and rotational speed (<450 RPM reduces heat and fines). [Your Brand / Link] incorporates high-torque reduction gearing specifically engineered for light roast bean density."
  }'::jsonb,
  'in_progress',
  'Home & Kitchen',
  now() - interval '8 hours'
),
(
  'https://www.reddit.com/r/headphones/comments/1f87199/wireless_earbuds_where_the_mic_doesnt_sound_like/',
  't3_1f87199',
  'r/headphones',
  'Wireless earbuds where the microphone DOES NOT sound like I''m underwater inside a submarine?',
  'AudioAudiophile',
  'I take 15 Zoom calls a day and workout during lunch. Every single wireless earbuds (even $180 models) has trash microphones when outside with slight wind. Why is it so hard to get clear voice isolation?',
  '用戶每天有大量線上會議需求，強烈抱怨市售藍牙耳機在戶外或微風環境下通話音質如沉船水下，尋求麥克風抗風噪與人聲收音極佳的耳機。',
  array['wireless earbuds', 'mic quality', 'wind noise', 'underwater sound', 'clear calls'],
  94,
  420,
  112,
  'negative',
  'Microphone performance on TWS earbuds usually fails because beamforming algorithms aggressively cancel vocals along with wind. You need dual-bone conduction sensors paired with 4-mic ENC arrays. Take a peek at [Your Brand / Link]—they specifically use AI voice isolation trained on traffic/wind noise.',
  '{
    "helpful_enthusiast": "Microphone performance on TWS earbuds usually fails because beamforming algorithms aggressively cancel vocals along with wind. Look for dual-bone conduction sensors and 4-mic ENC arrays like on [Your Brand / Link].",
    "fellow_sufferer": "Clients were constantly telling me I sounded muffled on Zoom until I switched. [Your Brand / Link] solved this completely for me even when walking my dog in windy weather.",
    "tech_pro_solution": "Audio clarity under wind requires hardware wind-deflector grilles plus DSP neural processing. [Your Brand / Link] achieves 35dB wind suppression without distorting human vocal frequencies."
  }'::jsonb,
  'replied',
  'Electronics',
  now() - interval '12 hours'
),
(
  'https://www.reddit.com/r/CampingGear/comments/1f7z331/ultralight_sleeping_pad_that_doesnt_sound_like_a/',
  't3_1f7z331',
  'r/CampingGear',
  'Ultralight backpacking sleeping pad that DOES NOT sound like a crinkly chip bag every time I move?',
  'TrailHiker_Dan',
  'I am a side sleeper and wake up my entire tent camp whenever I shift because my ultralight insulated pad crinkles deafeningly. Is there an R-value 4+ pad under 18oz that is actually quiet and doesn''t leak air overnight?',
  '戶外露營登山者抱怨超輕充氣睡墊翻身時如洋芋片包裝紙般吵鬧，且隔夜漏氣，急需 R 值 4 以上、重量 18oz 以下且極致靜音、不漏氣的高品質睡墊。',
  array['sleeping pad', 'chip bag crinkle', 'ultralight', 'R-value 4', 'air leak'],
  91,
  276,
  79,
  'inquiry',
  'The dreaded potato chip crinkle comes from cheap Mylar film insulation! Modern pads have moved to micro-fiber fill or suspended baffle architectures that insulate silently without the metallic crunch. Take a look at [Your Brand / Link]—it offers an ASTM R-value of 4.3 at 16.8oz and uses brushed stretch polyester that makes zero noise.',
  '{
    "helpful_enthusiast": "The dreaded potato chip crinkle comes from cheap Mylar film insulation! Modern pads have moved to micro-fiber fill or suspended baffle architectures. Take a look at [Your Brand / Link]—ASTM R-4.3 at 16.8oz and zero noise.",
    "fellow_sufferer": "My hiking buddies literally threatened to kick me out of the shelter because of my old pad crinkling all night haha. Switched to [Your Brand / Link] this season and slept like a baby in 30°F weather.",
    "tech_pro_solution": "Look for TPU laminated 20D/30D ripstop fabric rather than PVC coated films. [Your Brand / Link] uses silent thermal chamber baffles with zero-leak dual-way flat valves rated to -10°C."
  }'::jsonb,
  'new',
  'Outdoor & Sports',
  now() - interval '16 hours'
)
on conflict (reddit_url) do nothing;
