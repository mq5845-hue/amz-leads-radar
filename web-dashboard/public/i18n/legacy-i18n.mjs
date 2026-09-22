const supported = ['zh-TW', 'zh-CN', 'en', 'ja', 'ko', 'ms', 'id', 'vi'];
const copy = {
  en: { scan: 'Scan leads', login: 'Sign in', upgrade: 'Upgrade to Pro' },
  'zh-TW': { scan: '掃描線索', login: '登入', upgrade: '升級 Pro 專業版' },
  'zh-CN': { scan: '扫描线索', login: '登录', upgrade: '升级 Pro 专业版' },
  ja: { scan: 'リードをスキャン', login: 'ログイン', upgrade: 'Pro にアップグレード' },
  ko: { scan: '리드 스캔', login: '로그인', upgrade: 'Pro로 업그레이드' },
  ms: { scan: 'Imbas petunjuk', login: 'Log masuk', upgrade: 'Naik taraf ke Pro' },
  id: { scan: 'Pindai prospek', login: 'Masuk', upgrade: 'Tingkatkan ke Pro' },
  vi: { scan: 'Quét khách hàng tiềm năng', login: 'Đăng nhập', upgrade: 'Nâng cấp lên Pro' },
};

const uiCopy = {
  en: {
    '今日回覆額度:': 'Daily quota:', '今日即時數據已同步 • 5 篇高潛力站外商機': 'Live data synced • 5 high-potential opportunities',
    '從 Reddit 痛點差評，精準攔截屬於您的 Amazon 購買客戶': 'Turn Reddit pain points into Amazon customers',
    '全天候監控海外社群尋求推薦與競品負評。': 'Monitor communities for recommendations and competitor complaints.',
    '搜尋標題、痛點摘要或關鍵字 (例如: battery, coffee, chair)...': 'Search titles, pain points, or keywords (e.g. battery, coffee, chair)...',
    '所有 Subreddits': 'All Subreddits', '所有品類': 'All categories', '匹配度:': 'Match:', '不限': 'Any',
    '今日偵測商機 Leads': 'Leads detected today', '篇潛在貼文': 'potential posts', '平均關鍵字匹配度': 'Average keyword match',
    'AI 高相關性': 'High AI relevance', '原帖社群熱度 (Upvotes)': 'Original post activity (Upvotes)', '潛在關注買家': 'potential buyers',
    '社群互動討論量 (Comments)': 'Community comments', '則已觸及評論': 'comments reached', '找不到符合條件的商機線索': 'No matching opportunities found',
    '請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。': 'Try broadening your keyword search, adjusting the Subreddit filter, or resetting the match threshold.',
    '重設所有篩選': 'Reset all filters', '店鋪設定': 'Store settings', '登入': 'Sign in', '升級 Pro 專業版': 'Upgrade to Pro',
    'SaaS 看板': 'SaaS Dashboard', '跨境電商站外引流 (Off-Amazon Traffic) 智能商機雷達': 'Off-Amazon Traffic Opportunity Radar',
    'Supabase 登入': 'Supabase Sign in', '登入後會讀取 server-side quota。': 'Your server-side quota will load after sign-in.',
    '登入並同步 quota': 'Sign in and sync quota', 'Chrome Web Store 外掛': 'Chrome Web Store extension', 'API 文檔': 'API documentation', '使用條款與隱私權': 'Terms and privacy',
    '一鍵跳轉至 Reddit': 'jump to Reddit in one click', '店鋪與品牌設定': 'Store and brand settings', '掃描最新線索': 'Scan latest leads',
    '篇潛在貼文': 'potential posts', '今日偵測商機 Leads': 'Leads detected today', '平均關鍵字匹配度': 'Average keyword match',
    '原帖社群熱度 (Upvotes)': 'Original post activity (Upvotes)', '社群互動討論量 (Comments)': 'Community comments',
    '潛在關注買家': 'potential buyers', '則已觸及評論': 'comments reached', '🟢 最新未處理': '🟢 New', '🟡 跟進中': '🟡 In progress',
    '🔵 已回覆': '🔵 Replied', '⚪ 已忽略': '⚪ Ignored', '全部線索': 'All leads', '新商機': 'New opportunity', '處理中': 'In progress', '已回覆': 'Replied', '已忽略': 'Ignored',
    '預擬回覆': 'Draft reply', '前往 Reddit 回覆': 'Reply on Reddit', '標記為已回覆': 'Mark as replied', '前往 Reddit 並喚醒 Copilot': 'Open Reddit and wake Copilot',
    '複製草稿': 'Copy draft', '已複製！': 'Copied!', '介面語言': 'Interface language', '時區': 'Timezone', '取消': 'Cancel', '儲存設定': 'Save settings',
    '賣家品牌與店鋪設定': 'Seller brand and store settings', '您的品牌名稱 (Brand Name)': 'Your brand name (Brand Name)',
    'Amazon 商品超連結或店鋪首頁 URL': 'Amazon product link or storefront URL', '設定同步失敗，已保留本機設定。': 'Sync failed; local settings were kept.',
    '正在使用 OpenAI 產生草稿…': 'OpenAI is generating a draft…', '當前方案': 'Current plan', '永久免費': 'Forever free', '最受歡迎': 'Most popular',
    '立即開通 Pro 專業版 (串接 Stripe)': 'Activate Pro now (via Stripe)', '設定同步失敗，已保留本機設定。': 'Sync failed; local settings were kept.',
    'AI 提煉買家痛點 / 差評關鍵：': 'AI buyer pain points / review signals:', '預設品牌': 'Default brand', '作者:': 'Author:',
    'AI 預擬回覆話術（語氣切換）': 'AI draft reply (tone)', '已自動代入您的品牌：': 'Your brand has been inserted automatically:',
    '真人審核機制：外掛輔助填入，手動點擊發布，100% 避免封號': 'Human review required: the extension assists entry; you click publish manually to protect your account.',
    'Reddit 原文內容預覽': 'Reddit source preview', '複製草稿': 'Copy draft', '取消': 'Cancel', '儲存設定': 'Save settings',
    '客觀熱心網友': 'Helpful enthusiast', '同病相憐買家': 'Fellow buyer', '技術專家解方': 'Technical expert solution',
    '防封號提示：': 'Account safety tip:', '選填': 'Optional', '建議使用 Amazon Attribution 連結追蹤站外引流紅利與轉化率！': 'Amazon Attribution links are recommended for tracking external traffic and conversions.',
    '當 AI 產生回覆草稿時，會自動以此品牌名稱置換 [Your Brand]。': 'AI drafts automatically replace [Your Brand] with this name.',
    '已在使用中': 'Current plan', '/ 永久免費': '/ forever free', '無限次數': 'Unlimited', '無限': 'Unlimited'
    ,'SaaS 看板': 'SaaS Dashboard', '跨境電商站外拓客雙軌制 SaaS': 'Dual-channel e-commerce acquisition SaaS',
    '今日即時數據已同步 • 5 篇高潛力站外商機': 'Live data synced • 5 high-potential opportunities',
    '全天候監控海外社群尋求推薦與競品負評。': 'Monitor overseas communities for recommendations and competitor complaints.',
    '並透過 Chrome 外掛在側邊欄秒速微調語氣、一鍵填入留言！': 'Then use the Chrome extension to adjust tone and fill the reply in one click!',
    '（選填）': '(Optional)', '介面語言': 'Interface language', '取消': 'Cancel', '儲存設定': 'Save settings',
    '升級 AMZ Leads Radar Pro 專業版': 'Upgrade to AMZ Leads Radar Pro', 'Free 體驗方案': 'Free plan', 'Pro 專業方案': 'Pro plan',
    '每日最新 5 條商機線索': '5 new opportunities every day', '每日 3 次外掛一鍵填入輔助': '3 extension-assisted replies per day',
    '預設社群品類監控': 'Default community category monitoring', '無上限': 'Unlimited', '線索全天候即時監控': '24/7 opportunity monitoring',
    'Chrome 外掛輔助填入': 'Chrome extension assisted replies', '3 種專業話術語氣 + 自訂 Prompt': '3 professional tones + custom prompts',
    '支援自訂 15 組品類與競品關鍵字庫': 'Up to 15 custom categories and competitor keyword sets', 'Telegram / Discord 實時商機通報': 'Telegram / Discord opportunity alerts',
    '7 天無條件全額退款保證 • SSL 256 位元加密安全付款': '7-day full refund guarantee • SSL 256-bit encrypted payment',
    'API 文檔': 'API documentation', '使用條款與隱私權': 'Terms and privacy', 'Chrome Web Store 外掛': 'Chrome Web Store extension',
    '標記為已回覆': 'Mark as replied', '前往 Reddit 並喚醒 Copilot': 'Open Reddit and wake Copilot', '複製草稿': 'Copy draft',
    '品牌與店鋪設定': 'Brand and store settings', '您的品牌名稱 (Brand Name)': 'Your brand name (Brand Name)',
    'Amazon 商品超連結或店鋪首頁 URL': 'Amazon product link or storefront URL', '時區': 'Timezone',
    '支援自訂': 'Custom support', '設定同步失敗，已保留本機設定。': 'Sync failed; local settings were kept.',
    '固定或收回語言選單': 'Pin or close language menu', '掃描最新線索': 'Scan latest leads', 'Supabase 登入': 'Supabase sign in',
    '跳轉至 Reddit 原文並啟動瀏覽器 Copilot': 'Open the Reddit source and start Browser Copilot', 'Reddit 貼文讚數': 'Reddit post upvotes',
    'Reddit 討論留言數': 'Reddit discussion comments', '品牌與自訂店鋪連結設定': 'Brand and custom store link settings',
    '店鋪與品牌設定': 'Store and brand settings', '登入 Supabase 以同步 quota': 'Sign in to Supabase to sync quota',
    'Dashboard 尚未配置 VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY。': 'Dashboard Supabase environment variables are not configured.'
    ,'跨境電商站外拓客雙軌制 SaaS': 'Dual-channel e-commerce acquisition SaaS', 'Demo quota（尚未登入）': 'Demo quota (not signed in)',
    '2 小時前': '2 hours ago', '篇潛在貼文': 'potential posts', '匹配': 'match', '極高': 'very high',
    '，並透過 Chrome 外掛在側邊欄秒速微調語氣、一鍵填入留言！': ', then use the Chrome extension to adjust tone and fill the reply in one click!',
    '今日回覆額度:': 'Daily quota:', '3 / 3 次': '3 / 3 uses', '無限次數': 'Unlimited uses',
    'AMZ Leads Radar © 2026 • 跨境電商站外拓客雙軌制 SaaS': 'AMZ Leads Radar © 2026 • Dual-channel e-commerce acquisition SaaS',
    '全天候監控海外社群尋求推薦與競品負評。點擊任一商機即可': 'Monitor overseas communities for recommendations and competitor complaints. Click any opportunity to', '≥ 90% (極高)': '≥ 90% (very high)'
  },
  'zh-CN': { '今日回覆額度:': '今日回复额度：', '今日即時數據已同步 • 5 篇高潛力站外商機': '实时数据已同步 • 5 个高潜力商机', '所有 Subreddits': '所有 Subreddits', '所有品類': '所有品类', '匹配度:': '匹配度：', '不限': '不限', '店鋪設定': '店铺设置', '登入': '登录', '升級 Pro 專業版': '升级 Pro 专业版', '重設所有篩選': '重置所有筛选' },
  ja: { '今日回覆額度:': '本日の返信枠:', '所有 Subreddits': 'すべてのSubreddit', '所有品類': 'すべてのカテゴリ', '匹配度:': '一致度:', '不限': '指定なし', '店鋪設定': '店舗設定', '登入': 'ログイン', '升級 Pro 專業版': 'Proにアップグレード', '重設所有篩選': 'すべてのフィルターをリセット' },
  ko: { '今日回覆額度:': '오늘 답변 한도:', '所有 Subreddits': '모든 Subreddit', '所有品類': '모든 카테고리', '匹配度:': '일치도:', '不限': '제한 없음', '店鋪設定': '스토어 설정', '登入': '로그인', '升級 Pro 專業版': 'Pro로 업그레이드', '重設所有篩選': '모든 필터 초기화' },
  ms: {
    '今日回覆額度:': 'Kuota balasan harian:', '所有 Subreddits': 'Semua Subreddit', '所有品類': 'Semua kategori', '匹配度:': 'Padanan:', '不限': 'Semua',
    '店鋪設定': 'Tetapan kedai', '登入': 'Log masuk', '升級 Pro 專業版': 'Naik taraf ke Pro', '重設所有篩選': 'Tetapkan semula semua penapis',
    '今日即時數據已同步 • 5 篇高潛力站外商機': 'Data langsung disegerakkan • 5 peluang berpotensi tinggi',
    '從 Reddit 痛點差評，精準攔截屬於您的 Amazon 購買客戶': 'Tukar masalah Reddit kepada pelanggan Amazon',
    '全天候監控海外社群尋求推薦與競品負評。': 'Pantau komuniti luar negara untuk cadangan dan aduan pesaing.',
    '並透過 Chrome 外掛在側邊欄秒速微調語氣、一鍵填入留言！': 'Laraskan nada dan isi balasan dengan satu klik melalui sambungan Chrome!',
    '今日偵測商機 Leads': 'Petunjuk dikesan hari ini', '篇潛在貼文': 'siaran berpotensi', '平均關鍵字匹配度': 'Padanan kata kunci purata',
    'AI 高相關性': 'Relevan AI tinggi', '原帖社群熱度 (Upvotes)': 'Aktiviti komuniti asal (Undian)', '潛在關注買家': 'pembeli berpotensi',
    '社群互動討論量 (Comments)': 'Komen komuniti', '則已觸及評論': 'komen dicapai', '所有線索': 'Semua petunjuk',
    '新商機': 'Peluang baharu', '處理中': 'Sedang diproses', '已回覆': 'Dibalas', '已忽略': 'Diabaikan',
    '🟢 最新未處理': '🟢 Baharu', '🟡 跟進中': '🟡 Sedang diproses', '🔵 已回覆': '🔵 Dibalas', '⚪ 已忽略': '⚪ Diabaikan',
    '掃描最新線索': 'Imbas petunjuk terkini', 'Supabase 登入': 'Log masuk Supabase', 'SaaS 看板': 'Papan pemuka SaaS',
    '匹配': 'padanan', '極高': 'sangat tinggi', '≥ 90% (極高)': '≥ 90% (sangat tinggi)', '2 小時前': '2 jam lalu',
    'AI 提煉買家痛點 / 差評關鍵：': 'Titik masalah pembeli / isyarat ulasan AI:', '作者:': 'Pengarang:',
    'Reddit 貼文讚數': 'Undian siaran Reddit', 'Reddit 討論留言數': 'Komen perbincangan Reddit', '電子產品': 'Elektronik',
    '店鋪與品牌設定': 'Tetapan kedai dan jenama', '品牌與店鋪設定': 'Tetapan jenama dan kedai', '目前方案': 'Pelan semasa',
    '當前方案': 'Pelan semasa', '永久免費': 'Percuma selamanya', '最受歡迎': 'Paling popular', 'Free 體驗方案': 'Pelan percuma',
    'Pro 專業方案': 'Pelan Pro', '立即開通 Pro 專業版 (串接 Stripe)': 'Aktifkan Pro sekarang (melalui Stripe)', '已在使用中': 'Sedang digunakan',
    '每日最新 5 條商機線索': '5 petunjuk baharu setiap hari', '每日 3 次外掛一鍵填入輔助': '3 balasan bantuan sambungan setiap hari',
    '預設社群品類監控': 'Pemantauan kategori komuniti lalai', '無上限': 'Tanpa had', '無限': 'Tanpa had', '無限次數': 'Penggunaan tanpa had',
    '線索全天候即時監控': 'Pemantauan petunjuk 24/7', 'Chrome 外掛輔助填入': 'Balasan bantuan sambungan Chrome',
    '3 種專業話術語氣 + 自訂 Prompt': '3 nada profesional + gesaan tersuai', '支援自訂 15 組品類與競品關鍵字庫': 'Sehingga 15 kategori dan kata kunci pesaing tersuai',
    'Telegram / Discord 實時商機通報': 'Makluman peluang Telegram / Discord', '7 天無條件全額退款保證 • SSL 256 位元加密安全付款': 'Jaminan bayaran balik penuh 7 hari • Pembayaran disulitkan SSL 256-bit',
    '賣家品牌與店鋪設定': 'Tetapan jenama dan kedai penjual', '您的品牌名稱 (Brand Name)': 'Nama jenama anda', '介面語言': 'Bahasa antara muka',
    '時區': 'Zon waktu', '取消': 'Batal', '儲存設定': 'Simpan tetapan', '防封號提示：': 'Petua keselamatan akaun:', '選填': 'Pilihan',
    '建議使用 Amazon Attribution 連結追蹤站外引流紅利與轉化率！': 'Gunakan pautan Amazon Attribution untuk menjejak trafik luar dan penukaran.',
    '品牌與自訂店鋪連結設定': 'Tetapan jenama dan pautan kedai tersuai', '複製草稿': 'Copy draft'
  },
  id: {
    '今日回覆額度:': 'Kuota balasan hari ini:', '所有 Subreddits': 'Semua Subreddit', '所有品類': 'Semua kategori', '匹配度:': 'Kecocokan:', '不限': 'Semua',
    '店鋪設定': 'Pengaturan toko', '登入': 'Masuk', '升級 Pro 專業版': 'Tingkatkan ke Pro', '重設所有篩選': 'Atur ulang semua filter',
    '今日即時數據已同步 • 5 篇高潛力站外商機': 'Data langsung tersinkron • 5 peluang berpotensi tinggi',
    '從 Reddit 痛點差評，精準攔截屬於您的 Amazon 購買客戶': 'Ubah masalah Reddit menjadi pelanggan Amazon',
    '全天候監控海外社群尋求推薦與競品負評。': 'Pantau komunitas global untuk rekomendasi dan keluhan pesaing.',
    '並透過 Chrome 外掛在側邊欄秒速微調語氣、一鍵填入留言！': 'Sesuaikan nada dan isi balasan dengan satu klik melalui ekstensi Chrome!',
    '今日偵測商機 Leads': 'Prospek terdeteksi hari ini', '篇潛在貼文': 'postingan potensial', '平均關鍵字匹配度': 'Kecocokan kata kunci rata-rata',
    'AI 高相關性': 'Relevansi AI tinggi', '原帖社群熱度 (Upvotes)': 'Aktivitas komunitas asli (Upvote)', '潛在關注買家': 'pembeli potensial',
    '社群互動討論量 (Comments)': 'Komentar komunitas', '則已觸及評論': 'komentar tercapai', '所有線索': 'Semua prospek',
    '新商機': 'Peluang baru', '處理中': 'Sedang diproses', '已回覆': 'Dibalas', '已忽略': 'Diabaikan',
    '🟢 最新未處理': '🟢 Baru', '🟡 跟進中': '🟡 Sedang diproses', '🔵 已回覆': '🔵 Dibalas', '⚪ 已忽略': '⚪ Diabaikan',
    '掃描最新線索': 'Pindai prospek terbaru', 'Supabase 登入': 'Masuk ke Supabase', 'SaaS 看板': 'Dasbor SaaS',
    '匹配': 'cocok', '極高': 'sangat tinggi', '≥ 90% (極高)': '≥ 90% (sangat tinggi)', '2 小時前': '2 jam lalu',
    'AI 提煉買家痛點 / 差評關鍵：': 'Masalah pembeli / sinyal ulasan AI:', '作者:': 'Penulis:',
    'Reddit 貼文讚數': 'Upvote postingan Reddit', 'Reddit 討論留言數': 'Komentar diskusi Reddit', '店鋪與品牌設定': 'Pengaturan toko dan merek',
    '品牌與店鋪設定': 'Pengaturan merek dan toko', '當前方案': 'Paket saat ini', '永久免費': 'Gratis selamanya', '最受歡迎': 'Paling populer',
    'Free 體驗方案': 'Paket gratis', 'Pro 專業方案': 'Paket Pro', '立即開通 Pro 專業版 (串接 Stripe)': 'Aktifkan Pro sekarang (via Stripe)', '已在使用中': 'Sedang digunakan',
    '每日最新 5 條商機線索': '5 prospek baru setiap hari', '每日 3 次外掛一鍵填入輔助': '3 balasan bantuan ekstensi per hari', '預設社群品類監控': 'Pemantauan kategori komunitas default',
    '無上限': 'Tanpa batas', '無限': 'Tanpa batas', '無限次數': 'Penggunaan tanpa batas', '線索全天候即時監控': 'Pemantauan prospek 24/7',
    'Chrome 外掛輔助填入': 'Balasan bantuan ekstensi Chrome', '3 種專業話術語氣 + 自訂 Prompt': '3 nada profesional + prompt kustom',
    '支援自訂 15 組品類與競品關鍵字庫': 'Hingga 15 kategori dan kata kunci pesaing kustom', 'Telegram / Discord 實時商機通報': 'Notifikasi peluang Telegram / Discord',
    '賣家品牌與店鋪設定': 'Pengaturan merek dan toko penjual', '您的品牌名稱 (Brand Name)': 'Nama merek Anda', '介面語言': 'Bahasa antarmuka', '時區': 'Zona waktu',
    '取消': 'Batal', '儲存設定': 'Simpan pengaturan', '防封號提示：': 'Tips keamanan akun:', '選填': 'Opsional',
    '建議使用 Amazon Attribution 連結追蹤站外引流紅利與轉化率！': 'Gunakan tautan Amazon Attribution untuk melacak trafik eksternal dan konversi.', '複製草稿': 'Copy draft'
  },
  vi: { '今日回覆額度:': 'Hạn mức trả lời hôm nay:', '所有 Subreddits': 'Tất cả Subreddit', '所有品類': 'Tất cả danh mục', '匹配度:': 'Độ khớp:', '不限': 'Tất cả', '店鋪設定': 'Cài đặt cửa hàng', '登入': 'Đăng nhập', '升級 Pro 專業版': 'Nâng cấp Pro', '重設所有篩選': 'Đặt lại tất cả bộ lọc' },
  'zh-TW': {
    '今日偵測商機 Leads': '今日偵測商機', '篇潛在貼文': '篇潛在貼文', '平均關鍵字匹配度': '平均關鍵字匹配度',
    '原帖社群熱度 (Upvotes)': '原帖社群熱度（讚數）', '社群互動討論量 (Comments)': '社群互動討論量（留言）',
    '潛在關注買家': '潛在關注買家', '則已觸及評論': '則已觸及評論', '找不到符合條件的商機線索': '找不到符合條件的商機線索',
    '請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。': '請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。',
    '所有 Subreddits': '所有 Subreddits', '所有品類': '所有品類', '匹配度:': '匹配度：', '不限': '不限',
    '今日回覆額度:': '今日回覆額度：', '今日即時數據已同步 • 5 篇高潛力站外商機': '即時資料已同步 • 5 篇高潛力站外商機',
    '今日偵測商機 Leads': '今日偵測商機', 'AI 高相關性': 'AI 高相關性', '平均關鍵字匹配度': '平均關鍵字匹配度',
    '重設所有篩選': '重設所有篩選', '店鋪設定': '店鋪設定', '登入': '登入', '升級 Pro 專業版': '升級 Pro 專業版',
    'SaaS 看板': 'SaaS 看板', '跨境電商站外引流 (Off-Amazon Traffic) 智能商機雷達': '跨境電商站外引流智能商機雷達',
    '跨境電商站外拓客雙軌制 SaaS': '跨境電商站外拓客雙軌制 SaaS', '一鍵跳轉至 Reddit': '一鍵跳轉至 Reddit',
    '店鋪與品牌設定': '店鋪與品牌設定', '掃描最新線索': '掃描最新線索', '全部線索': '全部線索', '新商機': '新商機',
    '處理中': '處理中', '已回覆': '已回覆', '已忽略': '已忽略', '預擬回覆': '預擬回覆', '前往 Reddit 回覆': '前往 Reddit 回覆',
    '標記為已回覆': '標記為已回覆', '前往 Reddit 並喚醒 Copilot': '前往 Reddit 並喚醒 Copilot', '複製草稿': '複製草稿',
    '已複製！': '已複製！', '介面語言': '介面語言', '時區': '時區', '取消': '取消', '儲存設定': '儲存設定',
    '賣家品牌與店鋪設定': '賣家品牌與店鋪設定', '您的品牌名稱 (Brand Name)': '您的品牌名稱（品牌名稱）',
    'Amazon 商品超連結或店鋪首頁 URL': 'Amazon 商品連結或店鋪首頁 URL', '當前方案': '目前方案', '永久免費': '永久免費',
    '最受歡迎': '最受歡迎', '立即開通 Pro 專業版 (串接 Stripe)': '立即開通 Pro 專業版（串接 Stripe）',
    'Free 體驗方案': 'Free 體驗方案', 'Pro 專業方案': 'Pro 專業方案', '無限次數': '無限次數', '無限': '無限',
    '固定或收回語言選單': '固定或收回語言選單', 'Supabase 登入': 'Supabase 登入', '登入並同步 quota': '登入並同步 quota',
    'Reddit 貼文讚數': 'Reddit 貼文讚數', 'Reddit 討論留言數': 'Reddit 討論留言數', '品牌與店鋪設定': '品牌與店鋪設定',
    '品牌與自訂店鋪連結設定': '品牌與自訂店鋪連結設定', '已在使用中': '目前方案', '/ 永久免費': '/ 永久免費',
    '2 小時前': '2 小時前', '匹配': '匹配', '極高': '極高', '≥ 90% (極高)': '≥ 90%（極高）',
    '3 / 3 次': '3 / 3 次', 'AMZ Leads Radar © 2026 • 跨境電商站外拓客雙軌制 SaaS': 'AMZ Leads Radar © 2026 • 跨境電商站外拓客雙軌制 SaaS'
  }
};
const sharedLocaleUi = {
  'zh-CN': { '今日回覆額度:': '今日回复额度：', '今日偵測商機 Leads': '今日检测商机', '篇潛在貼文': '篇潜在帖子', '平均關鍵字匹配度': '平均关键词匹配度', 'AI 高相關性': 'AI 高相关性', '原帖社群熱度 (Upvotes)': '原帖社区热度（点赞）', '潛在關注買家': '潜在买家', '社群互動討論量 (Comments)': '社区互动量（评论）', '則已觸及評論': '条已触达评论', '搜尋標題、痛點摘要或關鍵字 (例如: battery, coffee, chair)...': '搜索标题、痛点摘要或关键词（例如：battery、coffee、chair）...', '全部線索': '全部线索', '新商機': '新商机', '處理中': '处理中', '已回覆': '已回复', '已忽略': '已忽略', '🟢 最新未處理': '🟢 新', '🟡 跟進中': '🟡 跟进中', '🔵 已回覆': '🔵 已回复', '⚪ 已忽略': '⚪ 已忽略', '2 小時前': '2 小时前', '匹配': '匹配', '預擬回覆': 'Draft reply', '前往 Reddit 回覆': '前往 Reddit 回复' },
  ja: { '今日回覆額度:': '本日の返信上限:', '今日偵測商機 Leads': '本日のリード', '篇潛在貼文': '件の有望な投稿', '平均關鍵字匹配度': '平均キーワード一致度', 'AI 高相關性': 'AI関連度が高い', '原帖社群熱度 (Upvotes)': '元投稿の反応（Upvotes）', '潛在關注買家': '見込み購入者', '社群互動討論量 (Comments)': 'コミュニティコメント', '則已觸及評論': '件のコメント', '搜尋標題、痛點摘要或關鍵字 (例如: battery, coffee, chair)...': 'タイトル、課題、キーワードを検索（例：battery、coffee、chair）...', '全部線索': 'すべてのリード', '新商機': '新しい機会', '處理中': '対応中', '已回覆': '返信済み', '已忽略': '無視', '🟢 最新未處理': '🟢 新着', '🟡 跟進中': '🟡 対応中', '🔵 已回覆': '🔵 返信済み', '⚪ 已忽略': '⚪ 無視', '2 小時前': '2時間前', '匹配': '一致', '預擬回覆': 'Draft reply', '前往 Reddit 回覆': 'Redditで返信' },
  ko: { '今日回覆額度:': '오늘 답변 한도:', '今日偵測商機 Leads': '오늘 발견한 리드', '篇潛在貼文': '잠재 게시물', '平均關鍵字匹配度': '평균 키워드 일치도', 'AI 高相關性': 'AI 관련성 높음', '原帖社群熱度 (Upvotes)': '원문 커뮤니티 반응(Upvotes)', '潛在關注買家': '잠재 구매자', '社群互動討論量 (Comments)': '커뮤니티 댓글', '則已觸及評論': '댓글 도달', '搜尋標題、痛點摘要或關鍵字 (例如: battery, coffee, chair)...': '제목, 문제 요약 또는 키워드 검색(예: battery, coffee, chair)...', '全部線索': '모든 리드', '新商機': '새로운 기회', '處理中': '진행 중', '已回覆': '답변 완료', '已忽略': '무시됨', '🟢 最新未處理': '🟢 신규', '🟡 跟進中': '🟡 진행 중', '🔵 已回覆': '🔵 답변 완료', '⚪ 已忽略': '⚪ 무시됨', '2 小時前': '2시간 전', '匹配': '일치', '預擬回覆': 'Draft reply', '前往 Reddit 回覆': 'Reddit에서 답변' },
  ms: { '今日回覆額度:': 'Kuota balasan harian:', '今日偵測商機 Leads': 'Petunjuk dikesan hari ini', '平均關鍵字匹配度': 'Padanan kata kunci purata', '原帖社群熱度 (Upvotes)': 'Aktiviti komuniti asal (Upvotes)', '社群互動討論量 (Comments)': 'Komen komuniti', '搜尋標題、痛點摘要或關鍵字 (例如: battery, coffee, chair)...': 'Cari tajuk, masalah atau kata kunci...', '全部線索': 'Semua petunjuk', '預擬回覆': 'Draft reply', '前往 Reddit 回覆': 'Balas di Reddit' },
  id: { '今日回覆額度:': 'Kuota balasan hari ini:', '今日偵測商機 Leads': 'Prospek terdeteksi hari ini', '平均關鍵字匹配度': 'Kecocokan kata kunci rata-rata', '原帖社群熱度 (Upvotes)': 'Aktivitas komunitas asli (Upvotes)', '社群互動討論量 (Comments)': 'Komentar komunitas', '搜尋標題、痛點摘要或關鍵字 (例如: battery, coffee, chair)...': 'Cari judul, masalah, atau kata kunci...', '全部線索': 'Semua prospek', '預擬回覆': 'Draft reply', '前往 Reddit 回覆': 'Balas di Reddit' },
  vi: { '今日回覆額度:': 'Hạn mức trả lời hôm nay:', '今日偵測商機 Leads': 'Khách hàng tiềm năng hôm nay', '篇潛在貼文': 'bài đăng tiềm năng', '平均關鍵字匹配度': 'Độ khớp từ khóa trung bình', 'AI 高相關性': 'Độ liên quan AI cao', '原帖社群熱度 (Upvotes)': 'Tương tác bài đăng gốc (Upvotes)', '潛在關注買家': 'người mua tiềm năng', '社群互動討論量 (Comments)': 'Bình luận cộng đồng', '則已觸及評論': 'bình luận đã tiếp cận', '搜尋標題、痛點摘要或關鍵字 (例如: battery, coffee, chair)...': 'Tìm tiêu đề, vấn đề hoặc từ khóa...', '全部線索': 'Tất cả khách hàng tiềm năng', '新商機': 'Cơ hội mới', '處理中': 'Đang xử lý', '已回覆': 'Đã trả lời', '已忽略': 'Đã bỏ qua', '🟢 最新未處理': '🟢 Mới', '🟡 跟進中': '🟡 Đang xử lý', '🔵 已回覆': '🔵 Đã trả lời', '⚪ 已忽略': '⚪ Đã bỏ qua', '2 小時前': '2 giờ trước', '匹配': 'khớp', '預擬回覆': 'Draft reply', '前往 Reddit 回覆': 'Trả lời trên Reddit' },
  'zh-TW': { '今日即時數據已同步 • 5 篇高潛力站外商機': '即時資料已同步 • 5 篇高潛力站外商機', '從 Reddit 痛點差評，精準攔截屬於您的 Amazon 購買客戶': '將 Reddit 痛點轉化為 Amazon 客戶', '全天候監控海外社群尋求推薦與競品負評。': '全天候監控海外社群的推薦與競品負評。', '並透過 Chrome 外掛在側邊欄秒速微調語氣、一鍵填入留言！': '透過 Chrome 外掛快速調整語氣並一鍵填入留言！', '篇潛在貼文': '篇潛在貼文', 'AI 高相關性': 'AI 高相關性', '潛在關注買家': '潛在關注買家', '新商機': '新商機', '處理中': '處理中', '已回覆': '已回覆', '已忽略': '已忽略', '🟢 最新未處理': '🟢 新', '🟡 跟進中': '🟡 跟進中', '🔵 已回覆': '🔵 已回覆', '⚪ 已忽略': '⚪ 已忽略', '2 小時前': '2 小時前', '預擬回覆': 'Draft reply', '前往 Reddit 回覆': '前往 Reddit 回覆' }, en: {}
};
const pageTitles = {
  en: 'AMZ Leads Radar - Off-Amazon Traffic Opportunity Radar',
  'zh-TW': 'AMZ Leads Radar - 跨境電商站外引流商機看板', 'zh-CN': 'AMZ Leads Radar - 跨境电商站外引流商机看板',
  ja: 'AMZ Leads Radar - Amazon外トラフィック機会レーダー', ko: 'AMZ Leads Radar - 아마존 외부 트래픽 기회 레이더',
  ms: 'AMZ Leads Radar - Radar Peluang Trafik Luar Amazon', id: 'AMZ Leads Radar - Radar Peluang Trafik di Luar Amazon',
  vi: 'AMZ Leads Radar - Radar cơ hội lưu lượng ngoài Amazon'
};
const matchLabels = { en: 'match', 'zh-TW': '匹配', 'zh-CN': '匹配', ja: '一致', ko: '일치', ms: 'padanan', id: 'cocok', vi: 'khớp' };
Object.assign(uiCopy.ja, {
  '今日即時數據已同步 • 5 篇高潛力站外商機': 'リアルタイムデータ同期済み • 有望な機会5件',
  '從 Reddit 痛點差評，精準攔截屬於您的 Amazon 購買客戶': 'Redditの課題をAmazon顧客につなげる',
  '全天候監控海外社群尋求推薦與競品負評。': '海外コミュニティの推薦や競合への不満を常時監視します。',
  '並透過 Chrome 外掛在側邊欄秒速微調語氣、一鍵填入留言！': 'Chrome拡張機能で文体を調整し、ワンクリックで返信を入力できます。',
  '篇潛在貼文': '件の有望な投稿', 'AI 高相關性': 'AI関連度が高い', '潛在關注買家': '見込み購入者', '則已觸及評論': '件のコメント',
  '新商機': '新しい機会', '處理中': '対応中', '已回覆': '返信済み', '已忽略': '無視', '2 小時前': '2時間前',
  '🟢 最新未處理': '🟢 新着', '🟡 跟進中': '🟡 対応中', '🔵 已回覆': '🔵 返信済み', '⚪ 已忽略': '⚪ 無視',
  'AI 提煉買家痛點 / 差評關鍵：': 'AIによる購入者の課題・レビュー分析:', '匹配': '一致', '極高': '非常に高い',
  'Reddit 貼文讚數': 'Reddit投稿の投票数', 'Reddit 討論留言數': 'Reddit議論のコメント数', '店鋪與品牌設定': '店舗とブランドの設定',
  '目前方案': '現在のプラン', '當前方案': '現在のプラン', '永久免費': '永久無料', '最受歡迎': '人気プラン', 'Free 體驗方案': '無料プラン', 'Pro 專業方案': 'Proプラン',
  '立即開通 Pro 專業版 (串接 Stripe)': 'Proを今すぐ有効化（Stripe連携）', '已在使用中': '使用中', '每日最新 5 條商機線索': '毎日5件の新しい機会',
  '每日 3 次外掛一鍵填入輔助': '拡張機能による返信補助3回/日', '預設社群品類監控': '既定コミュニティカテゴリ監視', '無上限': '無制限', '無限': '無制限',
  '線索全天候即時監控': '機会を24時間監視', 'Chrome 外掛輔助填入': 'Chrome拡張機能による返信補助', '3 種專業話術語氣 + 自訂 Prompt': '3種類の専門トーン＋カスタムPrompt',
  '賣家品牌與店鋪設定': '販売者ブランドと店舗の設定', '您的品牌名稱 (Brand Name)': 'ブランド名', '介面語言': 'インターフェース言語', '時區': 'タイムゾーン', '取消': 'キャンセル', '儲存設定': '設定を保存',
  '固定或收回語言選單': '言語メニューを固定または閉じる', '複製草稿': 'Copy draft'
});
Object.assign(uiCopy['zh-CN'], {
  '篇潛在貼文': '篇潜在帖子', 'AI 高相關性': 'AI 高相关性', '潛在關注買家': '潜在买家', '則已觸及評論': '条已触达评论',
  '🟢 最新未處理': '🟢 新', '🟡 跟進中': '🟡 跟进中', '🔵 已回覆': '🔵 已回复', '⚪ 已忽略': '⚪ 已忽略', '2 小時前': '2 小时前',
  '匹配': '匹配', '新商機': '新商机', '處理中': '处理中', '已回覆': '已回复', '已忽略': '已忽略', 'AI 提煉買家痛點 / 差評關鍵：': 'AI 买家痛点 / 评论信号：'
});
Object.assign(uiCopy['zh-TW'], {
  '全天候監控海外社群尋求推薦與競品負評。': '全天候監控海外社群的推薦與競品負評。',
  '全天候監控海外社群尋求推薦與競品負評。點擊任一商機即可': '全天候監控海外社群的推薦與競品負評。點擊任一商機即可',
  '，並透過 Chrome 外掛在側邊欄秒速微調語氣、一鍵填入留言！': '，透過 Chrome 外掛快速調整語氣並一鍵填入留言！',
  '點擊任一商機即可': '點擊任一商機即可', '並透過 Chrome 外掛在側邊欄秒速微調語氣、一鍵填入留言！': '透過 Chrome 外掛快速調整語氣並一鍵填入留言！',
  'AI buyer pain points / review signals:': 'AI 買家痛點／評論訊號：', 'Electronics': '電子產品', 'Home & Office': '居家與辦公', 'Home & Kitchen': '居家與廚房', 'Outdoor & Sports': '戶外與運動',
  'New opportunity': '新商機', 'In progress': '處理中', 'Replied': '已回覆', 'Ignored': '已忽略', '2 hours ago': '2 小時前',
  'Reddit post upvotes': 'Reddit 貼文讚數', 'Reddit discussion comments': 'Reddit 討論留言數', 'Reply on Reddit': '前往 Reddit 回覆',
  'Need a portable charger / powerbank that doesn\'t swell after 6 months of heavy travel': '長期旅行六個月後不會膨脹的行動電源？',
  'Why are ergonomic desk chairs either $300 junk or $1600 Herman Miller? Is there a sweet spot?': '工學椅不是 300 美元的劣質品，就是 1600 美元的 Herman Miller？真正合適的價格帶在哪裡？',
  'Burr coffee grinder that doesn\'t jam or stall on dense light roast Ethiopian beans?': '不會被高密度淺焙衣索比亞豆卡住的磨豆機？',
  'Wireless earbuds where the microphone DOES NOT sound like I\'m underwater inside a submarine?': '麥克風不會像在潛水艇水下一樣的無線耳機？',
  'Ultralight backpacking sleeping pad that DOES NOT sound like a crinkly chip bag every time I move?': '每次翻身都不會像洋芋片袋一樣發出聲音的超輕量登山睡墊？'
});
Object.assign(uiCopy.ko, {
  '今日即時數據已同步 • 5 篇高潛力站外商機': '실시간 데이터 동기화 완료 • 잠재력 높은 기회 5건', '從 Reddit 痛點差評，精準攔截屬於您的 Amazon 購買客戶': 'Reddit의 문제를 Amazon 고객으로 전환하세요', '全天候監控海外社群尋求推薦與競品負評。': '해외 커뮤니티의 추천과 경쟁사 불만을 상시 모니터링합니다.',
  '篇潛在貼文': '잠재 게시물', 'AI 高相關性': 'AI 관련성 높음', '潛在關注買家': '잠재 구매자', '則已觸及評論': '댓글 도달', '2 小時前': '2시간 전', 'AI 提煉買家痛點 / 差評關鍵：': 'AI 구매자 문제 / 리뷰 신호:',
  '🟢 最新未處理': '🟢 신규', '🟡 跟進中': '🟡 진행 중', '🔵 已回覆': '🔵 답변 완료', '⚪ 已忽略': '⚪ 무시됨', '新商機': '새로운 기회', '處理中': '진행 중', '已回覆': '답변 완료', '已忽略': '무시됨'
});
Object.assign(uiCopy.vi, {
  '今日即時數據已同步 • 5 篇高潛力站外商機': 'Đã đồng bộ dữ liệu trực tiếp • 5 cơ hội tiềm năng cao', '從 Reddit 痛點差評，精準攔截屬於您的 Amazon 購買客戶': 'Biến vấn đề Reddit thành khách hàng Amazon', '全天候監控海外社群尋求推薦與競品負評。': 'Theo dõi cộng đồng quốc tế để tìm đề xuất và khiếu nại về đối thủ.',
  '篇潛在貼文': 'bài đăng tiềm năng', 'AI 高相關性': 'Độ liên quan AI cao', '潛在關注買家': 'người mua tiềm năng', '則已觸及評論': 'bình luận đã tiếp cận', '2 小時前': '2 giờ trước', 'AI 提煉買家痛點 / 差評關鍵：': 'Vấn đề người mua / tín hiệu đánh giá AI:',
  '🟢 最新未處理': '🟢 Mới', '🟡 跟進中': '🟡 Đang xử lý', '🔵 已回覆': '🔵 Đã trả lời', '⚪ 已忽略': '⚪ Đã bỏ qua', '新商機': 'Cơ hội mới', '處理中': 'Đang xử lý', '已回覆': 'Đã trả lời', '已忽略': 'Đã bỏ qua'
});
Object.assign(uiCopy['zh-CN'], {
  '今日即時數據已同步 • 5 篇高潛力站外商機': '实时数据已同步 • 5 个高潜力商机',
  '從 Reddit 痛點差評，精準攔截屬於您的 Amazon 購買客戶': '将 Reddit 痛点转化为 Amazon 客户',
  '全天候監控海外社群尋求推薦與競品負評。': '全天候监控海外社区的推荐与竞品差评。',
  '並透過 Chrome 外掛在側邊欄秒速微調語氣、一鍵填入留言！': '通过 Chrome 扩展快速调整语气并一键填入回复！'
});
for (const locale of Object.keys(sharedLocaleUi)) uiCopy[locale] = { ...(uiCopy[locale] || {}), ...sharedLocaleUi[locale] };
const sourceText = new WeakMap();

function translateUi(locale, root = document) {
  const dictionary = uiCopy[locale] || uiCopy.en;
  const walker = document.createTreeWalker(root.body || root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    if (!node.nodeValue.trim() || node.parentElement?.closest('script, style')) continue;
    const key = sourceText.get(node) || node.nodeValue.trim();
    sourceText.set(node, key);
    // Every Dashboard UI string must have at least an English fallback; review content is excluded above.
    const value = key === '複製草稿' ? 'Copy draft' : (dictionary[key] || uiCopy.en[key]);
    if (value) node.nodeValue = node.nodeValue.replace(key, value);
  }
  const placeholderMap = { '搜尋標題、痛點摘要或關鍵字 (例如: battery, coffee, chair)...': dictionary['搜尋標題、痛點摘要或關鍵字 (例如: battery, coffee, chair)...'] || uiCopy.en['搜尋標題、痛點摘要或關鍵字 (例如: battery, coffee, chair)...'] };
  root.querySelectorAll('[placeholder]').forEach((element) => { if (placeholderMap[element.placeholder]) element.placeholder = placeholderMap[element.placeholder]; });
  root.querySelectorAll('[title], [aria-label]').forEach((element) => {
    for (const attribute of ['title', 'aria-label']) {
      const key = element.getAttribute(attribute);
      if (key && (dictionary[key] || uiCopy.en[key])) element.setAttribute(attribute, dictionary[key] || uiCopy.en[key]);
    }
  });
}

function normalize(value) {
  if (supported.includes(value)) return value;
  const language = String(value || '').split('-')[0].toLowerCase();
  return supported.find((locale) => locale.toLowerCase() === language) || 'en';
}

export function resolvePathLocale(pathname) {
  const segments = String(pathname || '/').split('/').filter(Boolean);
  const locale = supported.includes(segments[0]) ? segments.shift() : null;
  const remainder = `/${segments.join('/')}`;
  return { locale, pathname: remainder === '/' ? '/' : remainder };
}

export function pathWithLocale(pathname, locale) {
  const resolved = resolvePathLocale(pathname);
  return `/${locale}${resolved.pathname === '/' ? '/' : resolved.pathname}`;
}

function resolveLocale() {
  const pathLocale = resolvePathLocale(window.location.pathname).locale;
  const queryLocale = new URLSearchParams(window.location.search).get('lang');
  return normalize(pathLocale || queryLocale || 'en');
}

export function bootstrapLegacyI18n(root = document) {
  const locale = resolveLocale();
  const direction = ['ar', 'fa', 'he', 'ur'].includes(locale) ? 'rtl' : 'ltr';
  document.documentElement.lang = locale;
  document.title = pageTitles[locale] || pageTitles.en;
  document.documentElement.dir = direction;
  const canonicalPath = pathWithLocale(window.location.pathname, locale);
  if (window.location.pathname !== canonicalPath) {
    window.history.replaceState({}, '', `${canonicalPath}${window.location.search}${window.location.hash}`);
  }
  for (const element of root.querySelectorAll('[data-i18n]')) {
    const key = element.dataset.i18n;
    const value = copy[locale]?.[key] || copy.en[key];
    if (value) element.textContent = value;
  }
  translateUi(locale, root);
  window.amzI18n.matchLabel = matchLabels[locale] || matchLabels.en;
  setupLocaleSelector(locale);
  document.dispatchEvent(new CustomEvent('amz-locale-change', { detail: { locale } }));
  return locale;
}

export function setAccountLocale(locale, root = document) {
  const normalized = normalize(locale);
  document.documentElement.lang = normalized;
  document.title = pageTitles[normalized] || pageTitles.en;
  document.documentElement.dir = ['ar', 'fa', 'he', 'ur'].includes(normalized) ? 'rtl' : 'ltr';
  const canonicalPath = pathWithLocale(window.location.pathname, normalized);
  if (window.location.pathname !== canonicalPath) {
    window.history.replaceState({}, '', `${canonicalPath}${window.location.search}${window.location.hash}`);
  }
  for (const element of root.querySelectorAll('[data-i18n]')) {
    const key = element.dataset.i18n;
    const value = copy[normalized]?.[key] || copy.en[key];
    if (value) element.textContent = value;
  }
  translateUi(normalized, root);
  window.amzI18n.matchLabel = matchLabels[normalized] || matchLabels.en;
  setupLocaleSelector(normalized);
  document.dispatchEvent(new CustomEvent('amz-locale-change', { detail: { locale: normalized } }));
  return normalized;
}

function setupLocaleSelector(locale) {
  const select = document.getElementById('nav-locale-select');
  if (!select) return;
  const trigger = document.getElementById('locale-menu-trigger');
  const globeToggle = document.getElementById('locale-globe-toggle');
  const menu = document.getElementById('locale-menu');
  const options = [...document.querySelectorAll('.locale-menu-option')];
  let closeTimer;
  const syncMenu = (value) => {
    const active = options.find((item) => item.dataset.locale === value);
    if (active && trigger) trigger.textContent = active.textContent;
    options.forEach((item) => item.setAttribute('aria-selected', item.dataset.locale === value ? 'true' : 'false'));
  };
  select.value = locale;
  syncMenu(locale);
  if (select.dataset.localeBound === 'true') return;
  select.dataset.localeBound = 'true';
  options.forEach((option) => option.addEventListener('click', (event) => {
    event.stopPropagation();
    const next = normalize(option.dataset.locale);
    try { localStorage.setItem('amz_radar_locale', next); } catch { /* storage is optional */ }
    const target = pathWithLocale(window.location.pathname, next);
    window.location.assign(`${target}${window.location.search}${window.location.hash}`);
  }));
  menu?.addEventListener('click', (event) => {
    if (event.target.closest('.locale-menu-option')) return;
    const pinned = !menu?.classList.contains('is-pinned');
    menu?.classList.toggle('is-open', pinned);
    menu?.classList.toggle('is-pinned', pinned);
    menu?.classList.toggle('is-collapsed', !pinned);
    globeToggle?.setAttribute('aria-pressed', pinned ? 'true' : 'false');
    trigger?.setAttribute('aria-expanded', pinned ? 'true' : 'false');
  });
  menu?.addEventListener('mouseenter', () => {
    clearTimeout(closeTimer);
    if (menu.dataset.suppressHover === 'true') return;
    menu.classList.remove('is-collapsed');
    if (!menu.classList.contains('is-pinned')) menu.classList.add('is-open');
    trigger?.setAttribute('aria-expanded', 'true');
  });
  menu?.addEventListener('mouseleave', () => {
    menu.dataset.suppressHover = 'false';
    if (menu.classList.contains('is-pinned')) return;
    closeTimer = setTimeout(() => {
      if (menu.classList.contains('is-pinned')) return;
      menu.classList.remove('is-open', 'is-collapsed');
      globeToggle?.setAttribute('aria-pressed', 'false');
      trigger?.setAttribute('aria-expanded', 'false');
    }, 220);
  });
  select.addEventListener('change', () => {
    const next = setAccountLocale(select.value);
    select.value = next;
    syncMenu(next);
    try { localStorage.setItem('amz_radar_locale', next); } catch { /* storage is optional */ }
  });
}

if (typeof window !== 'undefined') window.amzI18n = { setAccountLocale, translateUi };

if (typeof document !== 'undefined') bootstrapLegacyI18n();
