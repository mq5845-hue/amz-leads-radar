import { Lead, UserProfile } from '../types';

export const INITIAL_PROFILE: UserProfile = {
  id: 'usr_demo_8821',
  email: 'seller@amazonbrand.com',
  plan: 'free',
  daily_usage_left: 3,
  max_daily_usage: 3,
  brand_name: 'ApexGear Pro',
  store_url: 'https://amazon.com/dp/B08EXAMPLE'
};

export const MOCK_LEADS: Lead[] = [
  {
    id: 'lead-1',
    reddit_url: 'https://www.reddit.com/r/BuyItForLife/comments/1f8e123/need_a_portable_charger_powerbank_that_doesnt/',
    reddit_id: 't3_1f8e123',
    subreddit: 'r/BuyItForLife',
    title: 'Need a portable charger / powerbank that doesn\'t swell after 6 months of heavy travel',
    author: 'NomadCoder_99',
    content_raw: 'I have gone through three Anker and generic power banks this year. Every single one either bulges around month 4 or the USB-C port gets super loose. I travel 3 weeks a month for photography and need 65W PD to charge my MacBook Air and iPhone. What is actually built to last?',
    painpoint_summary: '買家頻繁出差，抱怨多款行動電源在數月內電池膨脹且 USB-C 孔鬆動，急尋高耐用度、65W PD 輸出、不易過熱膨脹的長效行動電源。',
    keyword_matches: ['powerbank', 'swelling', 'loose USB-C', '65W PD', 'built to last'],
    match_score: 96,
    upvotes: 342,
    comments_count: 87,
    sentiment: 'negative',
    suggested_reply: 'Totally feel your pain on battery swelling—usually happens when budget controllers overheat the cells during 65W sustained loads. If you want something actually reliable, look for powerbanks with GaN III controllers and grade-A 21700 cells (similar to Tesla packs). Check out [Your Brand / Link], they use reinforced aluminum housing and dual NTC temp sensors which prevent cell degradation during long flights.',
    replies: {
      helpful_enthusiast: 'Totally feel your pain on battery swelling—usually happens when budget controllers overheat the cells during 65W sustained loads. If you want something actually reliable, look for powerbanks with GaN III controllers and grade-A 21700 cells. Check out [Your Brand / Link], they use reinforced aluminum housing and dual NTC temp sensors.',
      fellow_sufferer: 'Man, went through the exact same nightmare last year with loose ports ruining a shoot in Europe. Switched to [Your Brand / Link] about 8 months ago—the braided connector and CNC alloy casing feel indestructible so far.',
      tech_pro_solution: 'The root cause of swelling is thermal runaway caused by poor heat dissipation in plastic enclosures. For 65W travel, you need aluminum heatsinking and 21700 Li-ion cells. Take a look at [Your Brand / Link] which specs 1000+ cycle life with UL94-V0 fireproof standards.'
    },
    status: 'new',
    category: 'Electronics',
    created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
  },
  {
    id: 'lead-2',
    reddit_url: 'https://www.reddit.com/r/amazon/comments/1f8c892/why_are_ergonomic_desk_chairs_either_300_junk_or/',
    reddit_id: 't3_1f8c892',
    subreddit: 'r/amazon',
    title: 'Why are ergonomic desk chairs either $300 junk or $1600 Herman Miller? Is there a sweet spot?',
    author: 'DeskBound_Dev',
    content_raw: 'I work 10 hours a day as a remote backend dev. Bought a generic $280 ergonomic mesh chair on Amazon with 4.5 stars, lumbar support snapped within 3 months and the seat cushion flattened into cardboard. I don\'t want to drop $1,600 on an Aeron. Does anyone have an honest recommendation in the $400-$600 range with real 3D armrests and durable mesh?',
    painpoint_summary: '遠端工程師抱怨 Amazon 平價工學椅腰靠斷裂、座墊塌陷，不願花費 $1600 買頂級名牌，尋求 $400-$600 區間真正耐用、具備 3D 扶手與透氣網布的「甜點區」工作椅。',
    keyword_matches: ['ergonomic chair', 'lumbar snapped', 'cushion flattened', 'sweet spot', 'durable mesh'],
    match_score: 92,
    upvotes: 518,
    comments_count: 143,
    sentiment: 'inquiry',
    suggested_reply: 'As someone who sits 9+ hours coding, the biggest trap with $250 Amazon chairs is cheap plastic lumbar frames and low-density molded foam. In that $400-$500 sweet spot, look for Korean Wintex mesh and steel-reinforced chassis. We\'ve been testing [Your Brand / Link] in our home office—the dynamic 3D lumbar actually tracks spine movement without digging in.',
    replies: {
      helpful_enthusiast: 'As someone who sits 9+ hours coding, the biggest trap with $250 Amazon chairs is cheap plastic lumbar frames. In that $400-$500 sweet spot, look for Korean Wintex mesh and steel-reinforced chassis. Check out [Your Brand / Link]—the dynamic 3D lumbar actually tracks spine movement.',
      fellow_sufferer: 'I had that exact same experience with the foam flattening out into rock. My lower back was killing me until I tried [Your Brand / Link] on recommendation from a coworker. Been 14 months and mesh tension is still like day one.',
      tech_pro_solution: 'From an ergonomic perspective, prioritize synchronized tilt mechanisms (2:1 recline ratio) and nylon-glass fiber framing. [Your Brand / Link] offers BIFMA-certified gas cylinders and true 3D armrest adjustments that rival $1k chairs without the markup.'
    },
    status: 'new',
    category: 'Home & Office',
    created_at: new Date(Date.now() - 5 * 3600 * 1000).toISOString()
  },
  {
    id: 'lead-3',
    reddit_url: 'https://www.reddit.com/r/Coffee/comments/1f8a441/burr_grinder_that_doesnt_clog_with_light_roast/',
    reddit_id: 't3_1f8a441',
    subreddit: 'r/Coffee',
    title: 'Burr coffee grinder that doesn\'t jam or stall on dense light roast Ethiopian beans?',
    author: 'CaffeineCraver',
    content_raw: 'My third Amazon conical burr grinder just burnt out its small motor because of dense light roasts. Any burr grinder under $150 with high-torque DC motor that actually produces consistent espresso/aeropress grind without retention mess?',
    painpoint_summary: '精品咖啡愛好者抱怨一般平價磨豆機遇到高密度淺焙豆經常卡豆並燒壞馬達，正尋找具備大扭力、低殘粉、適合手沖與濃縮的耐用磨豆機。',
    keyword_matches: ['burr grinder', 'dense light roast', 'stalling motor', 'retention mess', 'consistent grind'],
    match_score: 88,
    upvotes: 189,
    comments_count: 64,
    sentiment: 'negative',
    suggested_reply: 'Light roast Ethiopian beans are basically hard pebbles, so low-torque AC motors choke instantly. For sub-$150, you need a high-torque planetary gear DC motor and 40mm stainless CNC burrs rather than stamped steel. You might want to check [Your Brand / Link]—it has zero-retention bellows and handles dense natural beans without bogging down.',
    replies: {
      helpful_enthusiast: 'Light roast Ethiopian beans are basically hard pebbles, so low-torque AC motors choke instantly. For sub-$150, you need high-torque planetary gear DC motors and 40mm stainless CNC burrs. Take a look at [Your Brand / Link].',
      fellow_sufferer: 'Burned out two grinders on Guji beans before I learned this lesson the hard way! Switched over to [Your Brand / Link] and the slow-RPM torque makes a night and day difference.',
      tech_pro_solution: 'Look closely at the burr hardness (60+ HRC) and rotational speed (<450 RPM reduces heat and fines). [Your Brand / Link] incorporates high-torque reduction gearing specifically engineered for light roast bean density.'
    },
    status: 'in_progress',
    category: 'Home & Kitchen',
    created_at: new Date(Date.now() - 8 * 3600 * 1000).toISOString()
  },
  {
    id: 'lead-4',
    reddit_url: 'https://www.reddit.com/r/headphones/comments/1f87199/wireless_earbuds_where_the_mic_doesnt_sound_like/',
    reddit_id: 't3_1f87199',
    subreddit: 'r/headphones',
    title: 'Wireless earbuds where the microphone DOES NOT sound like I\'m underwater inside a submarine?',
    author: 'AudioAudiophile',
    content_raw: 'I take 15 Zoom calls a day and workout during lunch. Every single wireless earbuds (even $180 models) has trash microphones when outside with slight wind. Why is it so hard to get clear voice isolation?',
    painpoint_summary: '用戶每天有大量線上會議需求，強烈抱怨市售藍牙耳機在戶外或微風環境下通話音質如沉船水下，尋求麥克風抗風噪與人聲收音極佳的耳機。',
    keyword_matches: ['wireless earbuds', 'mic quality', 'wind noise', 'underwater sound', 'clear calls'],
    match_score: 94,
    upvotes: 420,
    comments_count: 112,
    sentiment: 'negative',
    suggested_reply: 'Microphone performance on TWS earbuds usually fails because beamforming algorithms aggressively cancel vocals along with wind. You need dual-bone conduction sensors paired with 4-mic ENC arrays. Take a peek at [Your Brand / Link]—they specifically use AI voice isolation trained on traffic/wind noise.',
    replies: {
      helpful_enthusiast: 'Microphone performance on TWS earbuds usually fails because beamforming algorithms aggressively cancel vocals along with wind. Look for dual-bone conduction sensors and 4-mic ENC arrays like on [Your Brand / Link].',
      fellow_sufferer: 'Clients were constantly telling me I sounded muffled on Zoom until I switched. [Your Brand / Link] solved this completely for me even when walking my dog in windy weather.',
      tech_pro_solution: 'Audio clarity under wind requires hardware wind-deflector grilles plus DSP neural processing. [Your Brand / Link] achieves 35dB wind suppression without distorting human vocal frequencies.'
    },
    status: 'replied',
    category: 'Electronics',
    created_at: new Date(Date.now() - 12 * 3600 * 1000).toISOString()
  },
  {
    id: 'lead-5',
    reddit_url: 'https://www.reddit.com/r/CampingGear/comments/1f7z331/ultralight_sleeping_pad_that_doesnt_sound_like_a/',
    reddit_id: 't3_1f7z331',
    subreddit: 'r/CampingGear',
    title: 'Ultralight backpacking sleeping pad that DOES NOT sound like a crinkly chip bag every time I move?',
    author: 'TrailHiker_Dan',
    content_raw: 'I am a side sleeper and wake up my entire tent camp whenever I shift because my ultralight insulated pad crinkles deafeningly. Is there an R-value 4+ pad under 18oz that is actually quiet and doesn\'t leak air overnight?',
    painpoint_summary: '戶外露營登山者抱怨超輕充氣睡墊翻身時如洋芋片包裝紙般吵鬧，且隔夜漏氣，急需 R 值 4 以上、重量 18oz 以下且極致靜音、不漏氣的高品質睡墊。',
    keyword_matches: ['sleeping pad', 'chip bag crinkle', 'ultralight', 'R-value 4', 'air leak'],
    match_score: 91,
    upvotes: 276,
    comments_count: 79,
    sentiment: 'inquiry',
    suggested_reply: 'The dreaded potato chip crinkle comes from cheap Mylar film insulation! Modern pads have moved to micro-fiber fill or suspended baffle architectures that insulate silently without the metallic crunch. Take a look at [Your Brand / Link]—it offers an ASTM R-value of 4.3 at 16.8oz and uses brushed stretch polyester that makes zero noise.',
    replies: {
      helpful_enthusiast: 'The dreaded potato chip crinkle comes from cheap Mylar film insulation! Modern pads have moved to micro-fiber fill or suspended baffle architectures. Take a look at [Your Brand / Link]—ASTM R-4.3 at 16.8oz and zero noise.',
      fellow_sufferer: 'My hiking buddies literally threatened to kick me out of the shelter because of my old pad crinkling all night haha. Switched to [Your Brand / Link] this season and slept like a baby in 30°F weather.',
      tech_pro_solution: 'Look for TPU laminated 20D/30D ripstop fabric rather than PVC coated films. [Your Brand / Link] uses silent thermal chamber baffles with zero-leak dual-way flat valves rated to -10°C.'
    },
    status: 'new',
    category: 'Outdoor & Sports',
    created_at: new Date(Date.now() - 16 * 3600 * 1000).toISOString()
  }
];
