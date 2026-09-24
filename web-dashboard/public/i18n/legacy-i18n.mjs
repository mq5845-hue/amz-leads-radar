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
    'Demo mode': 'Demo mode',
    'Demo mode • 尚未登入': 'Demo mode • Not signed in',
    'Demo mode • Supabase 尚未完成同步': 'Demo mode • Supabase is not fully synced',
    '今日回覆額度:': 'Daily quota:', '今日即時數據已同步 • 5 篇高潛力站外商機': 'Live data synced • 5 high-potential opportunities',
    '從 Reddit 痛點差評，精準攔截屬於您的 Amazon 購買客戶': 'Turn Reddit pain points into Amazon customers',
    '全天候監控海外社群尋求推薦與競品負評。': 'Monitor communities for recommendations and competitor complaints.',
    'Demo mode • 尚未登入': 'Demo mode • Not signed in',
    '目前使用本地 Reddit mock 與示範額度；登入後才會讀取 server-side quota。': 'Using the local Reddit mock and demo quota; sign in to load the server-side quota.',
    '尚未設定 Supabase 環境變數；目前使用本地 Reddit mock 與示範額度。': 'Supabase environment variables are not configured; using the local Reddit mock and demo quota.',
    '登入以同步額度': 'Sign in to sync quota', '登入並讀取額度': 'Sign in and load quota',
    '登入中…': 'Signing in…', '登入失敗。': 'Sign-in failed.', '登入成功，正在載入 server-side quota…': 'Signed in; loading server-side quota…',
    '登出': 'Sign out', '已登入': 'Signed in', '已登入 •': 'Signed in •', '切換語言選單': 'Switch language menu',
    '次': 'uses', 'Chrome Web Store 外掛（即將推出）': 'Chrome Web Store extension (coming soon)',
    'API 文檔（建置中）': 'API documentation (under construction)', '使用條款與隱私權（建置中）': 'Terms and privacy (under construction)',
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
    'Demo mode': '示範模式',
    'Demo mode • 尚未登入': '示範模式 • 尚未登入',
    'Demo mode • Supabase 尚未完成同步': '示範模式 • Supabase 尚未完成同步',
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
  'SaaS 看板': 'SaaSダッシュボード', '跨境電商站外引流智能商機雷達': 'Amazon外トラフィック機会レーダー', 'Off-Amazon Traffic Opportunity Radar': 'Amazon外トラフィック機会レーダー', 'SAAS DASHBOARD': 'SaaSダッシュボード',
  '今日即時數據已同步 • 5 篇高潛力站外商機': 'リアルタイムデータ同期済み • 有望な機会5件',
  '從 Reddit 痛點差評，精準攔截屬於您的 Amazon 購買客戶': 'Redditの課題をAmazon顧客につなげる',
  '全天候監控海外社群尋求推薦與競品負評。': '海外コミュニティの推薦や競合への不満を常時監視します。',
  'Monitor overseas communities for recommendations and competitor complaints. Click any opportunity to': '海外コミュニティの推薦や競合への不満を監視します。機会をクリックすると',
  'jump to Reddit in one click': 'ワンクリックでRedditへ移動',
  ', then use the Chrome extension to adjust tone and fill the reply in one click!': 'し、Chrome拡張機能で文体を調整して返信を入力できます。',
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
Object.assign(uiCopy['zh-CN'], {
  '全天候監控海外社群尋求推薦與競品負評。': '全天候监控海外社区的推荐与竞品差评。',
  '全天候監控海外社群尋求推薦與競品負評。點擊任一商機即可': '全天候监控海外社区的推荐与竞品差评。点击任一商机即可',
  '，並透過 Chrome 外掛在側邊欄秒速微調語氣、一鍵填入留言！': '，通过 Chrome 扩展快速调整语气并一键填入回复！',
  'AI buyer pain points / review signals:': 'AI 买家痛点／评论信号：', 'Electronics': '电子产品', 'Home & Office': '居家与办公', 'Home & Kitchen': '居家与厨房', 'Outdoor & Sports': '户外与运动',
  'New opportunity': '新商机', 'In progress': '处理中', 'Replied': '已回复', 'Ignored': '已忽略', '2 hours ago': '2 小时前',
  'Reddit post upvotes': 'Reddit 帖子点赞数', 'Reddit discussion comments': 'Reddit 讨论评论数', 'Reply on Reddit': '前往 Reddit 回复',
  'Need a portable charger / powerbank that doesn\'t swell after 6 months of heavy travel': '长期旅行六个月后不会膨胀的充电宝？',
  'Why are ergonomic desk chairs either $300 junk or $1600 Herman Miller? Is there a sweet spot?': '人体工学椅不是 300 美元的劣质品，就是 1600 美元的 Herman Miller？真正合适的价格带在哪里？',
  'Burr coffee grinder that doesn\'t jam or stall on dense light roast Ethiopian beans?': '不会被高密度浅烘埃塞俄比亚豆卡住的磨豆机？',
  'Wireless earbuds where the microphone DOES NOT sound like I\'m underwater inside a submarine?': '麦克风不会像在潜水艇水下一样的无线耳机？',
  'Ultralight backpacking sleeping pad that DOES NOT sound like a crinkly chip bag every time I move?': '每次翻身都不会像薯片袋一样发出声音的超轻量登山睡垫？'
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
const authStatusUi = {
  en: {
    'Demo mode • 尚未登入': 'Demo mode • Not signed in',
    '目前使用本地 Reddit mock 與示範額度；登入後才會讀取 server-side quota。': 'Using the local Reddit mock and demo quota; sign in to load the server-side quota.',
    '尚未設定 Supabase 環境變數；目前使用本地 Reddit mock 與示範額度。': 'Supabase environment variables are not configured; using the local Reddit mock and demo quota.',
    '登入以同步額度': 'Sign in to sync quota', '登入並讀取額度': 'Sign in and load quota', '登入中…': 'Signing in…',
    '登入失敗。': 'Sign-in failed.', '登入成功，正在載入 server-side quota…': 'Signed in; loading server-side quota…', '登出': 'Sign out'
  },
  'zh-CN': {
    'Demo mode • 尚未登入': '演示模式 • 尚未登录', '目前使用本地 Reddit mock 與示範額度；登入後才會讀取 server-side quota。': '当前使用本地 Reddit mock 与演示额度；登录后才会读取 server-side quota。',
    '尚未設定 Supabase 環境變數；目前使用本地 Reddit mock 與示範額度。': '尚未配置 Supabase 环境变量；当前使用本地 Reddit mock 与演示额度。', '登入以同步額度': '登录以同步额度', '登入並讀取額度': '登录并读取额度', '登入中…': '登录中…', '登出': '退出登录'
  },
  ja: {
    'Demo mode • 尚未登入': 'デモモード • 未ログイン', '目前使用本地 Reddit mock 與示範額度；登入後才會讀取 server-side quota。': '現在はローカルRedditモックとデモ枠を使用中。ログインするとサーバー側の枠を読み込みます。',
    '尚未設定 Supabase 環境變數；目前使用本地 Reddit mock 與示範額度。': 'Supabase環境変数未設定。ローカルRedditモックとデモ枠を使用中です。', '登入以同步額度': 'ログインして枠を同期', '登入並讀取額度': 'ログインして枠を読み込む', '登入中…': 'ログイン中…', '登出': 'ログアウト'
  },
  ko: {
    'Demo mode • 尚未登入': '데모 모드 • 로그인하지 않음', '目前使用本地 Reddit mock 與示範額度；登入後才會讀取 server-side quota。': '현재 로컬 Reddit mock과 데모 한도를 사용 중입니다. 로그인하면 서버 한도를 불러옵니다.',
    '尚未設定 Supabase 環境變數；目前使用本地 Reddit mock 與示範額度。': 'Supabase 환경 변수가 설정되지 않아 로컬 Reddit mock과 데모 한도를 사용합니다.', '登入以同步額度': '로그인하여 한도 동기화', '登入並讀取額度': '로그인하여 한도 불러오기', '登入中…': '로그인 중…', '登出': '로그아웃'
  },
  ms: {
    'Demo mode • 尚未登入': 'Mod demo • Belum log masuk', '目前使用本地 Reddit mock 與示範額度；登入後才會讀取 server-side quota。': 'Menggunakan Reddit mock tempatan dan kuota demo; log masuk untuk memuatkan kuota pelayan.', '尚未設定 Supabase 環境變數；目前使用本地 Reddit mock 與示範額度。': 'Pemboleh ubah Supabase belum ditetapkan; menggunakan Reddit mock tempatan dan kuota demo.', '登入以同步額度': 'Log masuk untuk segerakkan kuota', '登入並讀取額度': 'Log masuk dan muatkan kuota', '登入中…': 'Sedang log masuk…', '登出': 'Log keluar'
  },
  id: {
    'Demo mode • 尚未登入': 'Mode demo • Belum masuk', '目前使用本地 Reddit mock 與示範額度；登入後才會讀取 server-side quota。': 'Menggunakan Reddit mock lokal dan kuota demo; masuk untuk memuat kuota server.', '尚未設定 Supabase 環境變數；目前使用本地 Reddit mock 與示範額度。': 'Variabel lingkungan Supabase belum dikonfigurasi; menggunakan Reddit mock lokal dan kuota demo.', '登入以同步額度': 'Masuk untuk menyinkronkan kuota', '登入並讀取額度': 'Masuk dan muat kuota', '登入中…': 'Sedang masuk…', '登出': 'Keluar'
  },
  vi: {
    'Demo mode • 尚未登入': 'Chế độ demo • Chưa đăng nhập', '目前使用本地 Reddit mock 與示範額度；登入後才會讀取 server-side quota。': 'Đang dùng Reddit mock cục bộ và hạn mức demo; đăng nhập để tải hạn mức máy chủ.', '尚未設定 Supabase 環境變數；目前使用本地 Reddit mock 與示範額度。': 'Chưa cấu hình biến môi trường Supabase; đang dùng Reddit mock cục bộ và hạn mức demo.', '登入以同步額度': 'Đăng nhập để đồng bộ hạn mức', '登入並讀取額度': 'Đăng nhập và tải hạn mức', '登入中…': 'Đang đăng nhập…', '登出': 'Đăng xuất'
  },
  'zh-TW': {}
};
for (const [locale, entries] of Object.entries(authStatusUi)) uiCopy[locale] = { ...(uiCopy[locale] || {}), ...entries };
const commonLocaleUi = {
  en: {
    'SaaS 看板': 'SaaS Dashboard', '跨境電商站外引流 (Off-Amazon Traffic) 智能商機雷達': 'Off-Amazon Traffic Opportunity Radar',
    '全天候監控海外社群尋求推薦與競品負評。點擊任一商機即可': 'Monitor overseas communities for recommendations and competitor complaints. Click any opportunity to',
    '一鍵跳轉至 Reddit': 'jump to Reddit in one click', '，並透過 Chrome 外掛在側邊欄秒速微調語氣、一鍵填入留言！': ', then use the Chrome extension to adjust tone and fill the reply in one click!',
    '3 / 3 次': '3 / 3 uses', 'Demo mode': 'Demo mode', '切換語言選單': 'Switch language menu',
    'Chrome Web Store 外掛（即將推出）': 'Chrome Web Store extension (coming soon)', 'API 文檔（建置中）': 'API documentation (under construction)', '使用條款與隱私權（建置中）': 'Terms and privacy (under construction)', '預擬回覆': 'Draft reply', '複製草稿': 'Copy draft'
  },
  'zh-TW': {
    'SaaS 看板': 'SaaS 看板', '跨境電商站外引流 (Off-Amazon Traffic) 智能商機雷達': '跨境電商站外引流智能商機雷達',
    '全天候監控海外社群尋求推薦與競品負評。點擊任一商機即可': '全天候監控海外社群的推薦與競品負評。點擊任一商機即可', '一鍵跳轉至 Reddit': '一鍵跳轉至 Reddit',
    '，並透過 Chrome 外掛在側邊欄秒速微調語氣、一鍵填入留言！': '，透過 Chrome 外掛快速調整語氣並一鍵填入留言！', '3 / 3 次': '3 / 3 次', 'Demo mode': 'Demo 模式', '切換語言選單': '切換語言選單',
    'Chrome Web Store 外掛（即將推出）': 'Chrome Web Store 外掛（即將推出）', 'API 文檔（建置中）': 'API 文件（建置中）', '使用條款與隱私權（建置中）': '使用條款與隱私權（建置中）', '預擬回覆': '預擬回覆', '複製草稿': '複製草稿'
  },
  'zh-CN': {
    'SaaS 看板': 'SaaS 看板', '跨境電商站外引流 (Off-Amazon Traffic) 智能商機雷達': '跨境电商站外引流智能商机雷达',
    '全天候監控海外社群尋求推薦與競品負評。點擊任一商機即可': '全天候监控海外社区的推荐与竞品差评。点击任一商机即可', '一鍵跳轉至 Reddit': '一键跳转至 Reddit',
    '，並透過 Chrome 外掛在側邊欄秒速微調語氣、一鍵填入留言！': '，通过 Chrome 扩展快速调整语气并一键填入回复！', '3 / 3 次': '3 / 3 次', 'Demo mode': '演示模式', '切換語言選單': '切换语言菜单',
    'Chrome Web Store 外掛（即將推出）': 'Chrome Web Store 扩展（即将推出）', 'API 文檔（建置中）': 'API 文档（建设中）', '使用條款與隱私權（建置中）': '使用条款与隐私（建设中）', '預擬回覆': '草拟回复', '複製草稿': '复制草稿'
  },
  ja: {
    'SaaS 看板': 'SaaSダッシュボード', '跨境電商站外引流 (Off-Amazon Traffic) 智能商機雷達': 'Amazon外トラフィック機会レーダー',
    '全天候監控海外社群尋求推薦與競品負評。點擊任一商機即可': '海外コミュニティの推薦や競合への不満を監視します。機会をクリックすると', '一鍵跳轉至 Reddit': 'ワンクリックでRedditへ移動',
    '，並透過 Chrome 外掛在側邊欄秒速微調語氣、一鍵填入留言！': '、Chrome拡張機能で文体を調整して返信を入力できます。', '3 / 3 次': '3 / 3 回', 'Demo mode': 'デモモード', '切換語言選單': '言語メニューを切り替え',
    'Chrome Web Store 外掛（即將推出）': 'Chrome Web Store拡張機能（近日公開）', 'API 文檔（建置中）': 'APIドキュメント（準備中）', '使用條款與隱私權（建置中）': '利用規約とプライバシー（準備中）', '預擬回覆': '返信の下書き', '複製草稿': '下書きをコピー'
  },
  ko: {
    'SaaS 看板': 'SaaS 대시보드', '跨境電商站外引流 (Off-Amazon Traffic) 智能商機雷達': 'Amazon 외부 트래픽 기회 레이더',
    '全天候監控海外社群尋求推薦與競品負評。點擊任一商機即可': '해외 커뮤니티의 추천과 경쟁사 불만을 모니터링합니다. 기회를 클릭하면', '一鍵跳轉至 Reddit': '한 번의 클릭으로 Reddit으로 이동',
    '，並透過 Chrome 外掛在側邊欄秒速微調語氣、一鍵填入留言！': ' Chrome 확장 프로그램으로 말투를 조정하고 답변을 입력할 수 있습니다!', '3 / 3 次': '3 / 3회', 'Demo mode': '데모 모드', '切換語言選單': '언어 메뉴 전환',
    'Chrome Web Store 外掛（即將推出）': 'Chrome 웹 스토어 확장 프로그램(출시 예정)', 'API 文檔（建置中）': 'API 문서(준비 중)', '使用條款與隱私權（建置中）': '약관 및 개인정보 처리방침(준비 중)', '預擬回覆': '답변 초안', '複製草稿': '초안 복사'
  },
  ms: {
    'SaaS 看板': 'Papan pemuka SaaS', '跨境電商站外引流 (Off-Amazon Traffic) 智能商機雷達': 'Radar peluang trafik luar Amazon',
    '全天候監控海外社群尋求推薦與競品負評。點擊任一商機即可': 'Pantau komuniti luar negara untuk cadangan dan aduan pesaing. Klik peluang untuk', '一鍵跳轉至 Reddit': 'pergi ke Reddit dengan satu klik',
    '，並透過 Chrome 外掛在側邊欄秒速微調語氣、一鍵填入留言！': ', kemudian laraskan nada dan isi balasan dengan sambungan Chrome!', '3 / 3 次': '3 / 3 penggunaan', 'Demo mode': 'Mod demo', '切換語言選單': 'Tukar menu bahasa',
    'Chrome Web Store 外掛（即將推出）': 'Sambungan Chrome Web Store (akan datang)', 'API 文檔（建置中）': 'Dokumentasi API (sedang dibina)', '使用條款與隱私權（建置中）': 'Terma dan privasi (sedang dibina)', '預擬回覆': 'Draf balasan', '複製草稿': 'Salin draf'
  },
  id: {
    'SaaS 看板': 'Dasbor SaaS', '跨境電商站外引流 (Off-Amazon Traffic) 智能商機雷達': 'Radar peluang trafik luar Amazon',
    '全天候監控海外社群尋求推薦與競品負評。點擊任一商機即可': 'Pantau komunitas global untuk rekomendasi dan keluhan pesaing. Klik peluang untuk', '一鍵跳轉至 Reddit': 'buka Reddit dalam satu klik',
    '，並透過 Chrome 外掛在側邊欄秒速微調語氣、一鍵填入留言！': ', lalu sesuaikan nada dan isi balasan dengan ekstensi Chrome!', '3 / 3 次': '3 / 3 penggunaan', 'Demo mode': 'Mode demo', '切換語言選單': 'Ganti menu bahasa',
    'Chrome Web Store 外掛（即將推出）': 'Ekstensi Chrome Web Store (segera hadir)', 'API 文檔（建置中）': 'Dokumentasi API (sedang dibuat)', '使用條款與隱私權（建置中）': 'Ketentuan dan privasi (sedang dibuat)', '預擬回覆': 'Draf balasan', '複製草稿': 'Salin draf'
  },
  vi: {
    'SaaS 看板': 'Bảng điều khiển SaaS', '跨境電商站外引流 (Off-Amazon Traffic) 智能商機雷達': 'Radar cơ hội lưu lượng ngoài Amazon',
    '全天候監控海外社群尋求推薦與競品負評。點擊任一商機即可': 'Theo dõi cộng đồng quốc tế để tìm đề xuất và khiếu nại về đối thủ. Nhấp vào cơ hội để', '一鍵跳轉至 Reddit': 'mở Reddit bằng một cú nhấp',
    '，並透過 Chrome 外掛在側邊欄秒速微調語氣、一鍵填入留言！': ', sau đó điều chỉnh giọng điệu và điền câu trả lời bằng tiện ích Chrome!', '3 / 3 次': '3 / 3 lượt', 'Demo mode': 'Chế độ demo', '切換語言選單': 'Đổi menu ngôn ngữ',
    'Chrome Web Store 外掛（即將推出）': 'Tiện ích Chrome Web Store (sắp ra mắt)', 'API 文檔（建置中）': 'Tài liệu API (đang xây dựng)', '使用條款與隱私權（建置中）': 'Điều khoản và quyền riêng tư (đang xây dựng)', '預擬回覆': 'Bản nháp trả lời', '複製草稿': 'Sao chép bản nháp'
  }
};
for (const [locale, entries] of Object.entries(commonLocaleUi)) uiCopy[locale] = { ...(uiCopy[locale] || {}), ...entries };

const renderLocaleUi = {
  en: {
    '所有 Subreddits': 'All Subreddits', '所有品類': 'All categories', '匹配度:': 'Match:', '不限': 'Any', '≥ 90% (極高)': '≥ 90% (very high)',
    '今日偵測商機 Leads': 'Leads detected today', '篇潛在貼文': 'potential posts', '平均關鍵字匹配度': 'Average keyword match', 'AI 高相關性': 'High AI relevance',
    '原帖社群熱度 (Upvotes)': 'Original post activity (Upvotes)', '潛在關注買家': 'potential buyers', '社群互動討論量 (Comments)': 'Community comments', '則已觸及評論': 'comments reached',
    '全部線索': 'All leads', '🟢 最新未處理': '🟢 New', '🟡 跟進中': '🟡 In progress', '🔵 已回覆': '🔵 Replied', '⚪ 已忽略': '⚪ Ignored',
    '新商機': 'New opportunity', '處理中': 'In progress', '已回覆': 'Replied', '已忽略': 'Ignored', '2 小時前': '2 hours ago', '匹配': 'match',
    'AI 提煉買家痛點 / 差評關鍵：': 'AI buyer pain points / review signals:', '作者:': 'Author:', '預設品牌': 'Default brand', 'AI 核心痛點拆解：': 'AI pain-point breakdown:',
    'Reddit 原文內容預覽': 'Reddit source preview', 'AI 預擬回覆話術（語氣切換）': 'AI draft reply (tone)', '已自動代入您的品牌：': 'Your brand has been inserted:',
    '標記為已回覆': 'Mark as replied', '前往 Reddit 並喚醒 Copilot': 'Open Reddit and wake Copilot', '客觀熱心網友': 'Helpful enthusiast', '同病相憐買家': 'Fellow buyer', '技術專家解方': 'Technical expert solution',
    '以第三方視角科普產品規格與避坑點，軟性植入推薦': 'Explain product specs and pitfalls from a third-party perspective with a soft recommendation.',
    '共鳴原帖差評痛點，真誠分享更換品牌後的親身體驗': 'Relate to the original complaint and share an honest first-hand experience after switching brands.',
    '從材料或電路工程角度剖析問題，建立專業信任度': 'Analyze the problem from a materials or electrical-engineering perspective to build trust.',
  },
  'zh-TW': {
    '所有 Subreddits': '所有 Subreddits', '所有品類': '所有品類', '匹配度:': '匹配度：', '不限': '不限', '≥ 90% (極高)': '≥ 90%（極高）',
    '今日偵測商機 Leads': '今日偵測商機 Leads', '篇潛在貼文': '篇潛在貼文', '平均關鍵字匹配度': '平均關鍵字匹配度', 'AI 高相關性': 'AI 高相關性',
    '原帖社群熱度 (Upvotes)': '原帖社群熱度 (Upvotes)', '潛在關注買家': '潛在關注買家', '社群互動討論量 (Comments)': '社群互動討論量 (Comments)', '則已觸及評論': '則已觸及評論',
    '全部線索': '全部線索', '🟢 最新未處理': '🟢 最新未處理', '🟡 跟進中': '🟡 跟進中', '🔵 已回覆': '🔵 已回覆', '⚪ 已忽略': '⚪ 已忽略',
    '新商機': '新商機', '處理中': '處理中', '已回覆': '已回覆', '已忽略': '已忽略', '2 小時前': '2 小時前', '匹配': '匹配',
    'AI 提煉買家痛點 / 差評關鍵：': 'AI 提煉買家痛點／差評關鍵：', '作者:': '作者：', '預設品牌': '預設品牌', 'AI 核心痛點拆解：': 'AI 核心痛點拆解：',
    'Reddit 原文內容預覽': 'Reddit 原文內容預覽', 'AI 預擬回覆話術（語氣切換）': 'AI 預擬回覆話術（語氣切換）', '已自動代入您的品牌：': '已自動代入您的品牌：',
    '標記為已回覆': '標記為已回覆', '前往 Reddit 並喚醒 Copilot': '前往 Reddit 並喚醒 Copilot', '客觀熱心網友': '客觀熱心網友', '同病相憐買家': '同病相憐買家', '技術專家解方': '技術專家解方',
    '以第三方視角科普產品規格與避坑點，軟性植入推薦': '以第三方視角科普產品規格與避坑點，軟性植入推薦',
    '共鳴原帖差評痛點，真誠分享更換品牌後的親身體驗': '共鳴原帖差評痛點，真誠分享更換品牌後的親身體驗',
    '從材料或電路工程角度剖析問題，建立專業信任度': '從材料或電路工程角度剖析問題，建立專業信任度',
  },
  'zh-CN': {
    '所有 Subreddits': '所有 Subreddits', '所有品類': '所有品类', '匹配度:': '匹配度：', '不限': '不限', '≥ 90% (極高)': '≥ 90%（极高）',
    '今日偵測商機 Leads': '今日检测商机 Leads', '篇潛在貼文': '篇潜在帖子', '平均關鍵字匹配度': '平均关键词匹配度', 'AI 高相關性': 'AI 高相关性',
    '原帖社群熱度 (Upvotes)': '原帖社区热度（Upvotes）', '潛在關注買家': '潜在关注买家', '社群互動討論量 (Comments)': '社区互动讨论量（Comments）', '則已觸及評論': '条已触达评论',
    '全部線索': '全部线索', '🟢 最新未處理': '🟢 最新未处理', '🟡 跟進中': '🟡 跟进中', '🔵 已回覆': '🔵 已回复', '⚪ 已忽略': '⚪ 已忽略',
    '新商機': '新商机', '處理中': '处理中', '已回覆': '已回复', '已忽略': '已忽略', '2 小時前': '2 小时前', '匹配': '匹配',
    'AI 提煉買家痛點 / 差評關鍵：': 'AI 提炼买家痛点／差评关键词：', '作者:': '作者：', '預設品牌': '默认品牌', 'AI 核心痛點拆解：': 'AI 核心痛点拆解：',
    'Reddit 原文內容預覽': 'Reddit 原文内容预览', 'AI 預擬回覆話術（語氣切換）': 'AI 草拟回复话术（语气切换）', '已自動代入您的品牌：': '已自动代入您的品牌：',
    '標記為已回覆': '标记为已回复', '前往 Reddit 並喚醒 Copilot': '前往 Reddit 并唤醒 Copilot', '客觀熱心網友': '客观热心网友', '同病相憐買家': '同病相怜买家', '技術專家解方': '技术专家解答',
    '以第三方視角科普產品規格與避坑點，軟性植入推薦': '以第三方视角科普产品规格与避坑点，软性植入推荐',
    '共鳴原帖差評痛點，真誠分享更換品牌後的親身體驗': '共鸣原帖差评痛点，真诚分享更换品牌后的亲身体验',
    '從材料或電路工程角度剖析問題，建立專業信任度': '从材料或电路工程角度剖析问题，建立专业信任度',
  },
  ja: {
    '所有 Subreddits': 'すべてのSubreddit', '所有品類': 'すべてのカテゴリ', '匹配度:': '一致度:', '不限': '指定なし', '≥ 90% (極高)': '≥ 90%（非常に高い）',
    '今日偵測商機 Leads': '本日の検出リード', '篇潛在貼文': '件の投稿候補', '平均關鍵字匹配度': '平均キーワード一致度', 'AI 高相關性': 'AI関連性が高い',
    '原帖社群熱度 (Upvotes)': '元投稿の反応（Upvotes）', '潛在關注買家': '見込み購入者', '社群互動討論量 (Comments)': 'コミュニティコメント', '則已觸及評論': '件のコメント',
    '全部線索': 'すべてのリード', '🟢 最新未處理': '🟢 新規', '🟡 跟進中': '🟡 対応中', '🔵 已回覆': '🔵 返信済み', '⚪ 已忽略': '⚪ 無視',
    '新商機': '新しい機会', '處理中': '対応中', '已回覆': '返信済み', '已忽略': '無視', '2 小時前': '2時間前', '匹配': '一致',
    'AI 提煉買家痛點 / 差評關鍵：': 'AIによる購入者の不満／レビュー要点:', '作者:': '投稿者:', '預設品牌': 'デフォルトブランド', 'AI 核心痛點拆解：': 'AIによる核心的な不満分析:',
    'Reddit 原文內容預覽': 'Reddit原文プレビュー', 'AI 預擬回覆話術（語氣切換）': 'AI返信下書き（トーン）', '已自動代入您的品牌：': 'ブランドを自動入力:',
    '標記為已回覆': '返信済みにする', '前往 Reddit 並喚醒 Copilot': 'Redditを開いてCopilotを起動', '客觀熱心網友': '親切な愛好家', '同病相憐買家': '同じ悩みを持つ購入者', '技術專家解方': '技術専門家の解決策',
    '以第三方視角科普產品規格與避坑點，軟性植入推薦': '第三者の視点で仕様と注意点を解説し、自然に推薦します。',
    '共鳴原帖差評痛點，真誠分享更換品牌後的親身體驗': '元投稿の不満に共感し、ブランド変更後の体験を共有します。',
    '從材料或電路工程角度剖析問題，建立專業信任度': '材料・電気工学の視点で分析し、専門的な信頼を築きます。',
  },
  ko: {
    '所有 Subreddits': '모든 Subreddit', '所有品類': '모든 카테고리', '匹配度:': '일치도:', '不限': '제한 없음', '≥ 90% (極高)': '≥ 90% (매우 높음)',
    '今日偵測商機 Leads': '오늘 발견한 리드', '篇潛在貼文': '개의 잠재 게시물', '平均關鍵字匹配度': '평균 키워드 일치도', 'AI 高相關性': '높은 AI 관련성',
    '原帖社群熱度 (Upvotes)': '원문 커뮤니티 반응(Upvotes)', '潛在關注買家': '잠재 구매자', '社群互動討論量 (Comments)': '커뮤니티 댓글', '則已觸及評論': '개의 댓글',
    '全部線索': '모든 리드', '🟢 最新未處理': '🟢 신규', '🟡 跟進中': '🟡 진행 중', '🔵 已回覆': '🔵 답변 완료', '⚪ 已忽略': '⚪ 무시됨',
    '新商機': '새로운 기회', '處理中': '진행 중', '已回覆': '답변 완료', '已忽略': '무시됨', '2 小時前': '2시간 전', '匹配': '일치',
    'AI 提煉買家痛點 / 差評關鍵：': 'AI 구매자 불만／리뷰 신호:', '作者:': '작성자:', '預設品牌': '기본 브랜드', 'AI 核心痛點拆解：': 'AI 핵심 문제 분석:',
    'Reddit 原文內容預覽': 'Reddit 원문 미리보기', 'AI 預擬回覆話術（語氣切換）': 'AI 답변 초안(톤)', '已自動代入您的品牌：': '브랜드 자동 입력:',
    '標記為已回覆': '답변 완료로 표시', '前往 Reddit 並喚醒 Copilot': 'Reddit을 열고 Copilot 실행', '客觀熱心網友': '친절한 애호가', '同病相憐買家': '같은 문제를 겪은 구매자', '技術專家解方': '기술 전문가 해결책',
    '以第三方視角科普產品規格與避坑點，軟性植入推薦': '제3자의 관점에서 사양과 주의점을 설명하고 자연스럽게 추천합니다.',
    '共鳴原帖差評痛點，真誠分享更換品牌後的親身體驗': '원문의 불만에 공감하고 브랜드 변경 후의 경험을 공유합니다.',
    '從材料或電路工程角度剖析問題，建立專業信任度': '재료·전기공학 관점에서 분석해 전문적인 신뢰를 쌓습니다.',
  },
  ms: {
    '所有 Subreddits': 'Semua Subreddit', '所有品類': 'Semua kategori', '匹配度:': 'Padanan:', '不限': 'Semua', '≥ 90% (極高)': '≥ 90% (sangat tinggi)',
    '今日偵測商機 Leads': 'Petunjuk dikesan hari ini', '篇潛在貼文': 'siaran berpotensi', '平均關鍵字匹配度': 'Padanan kata kunci purata', 'AI 高相關性': 'Relevan AI tinggi',
    '原帖社群熱度 (Upvotes)': 'Aktiviti komuniti asal (Undian)', '潛在關注買家': 'pembeli berpotensi', '社群互動討論量 (Comments)': 'Komen komuniti', '則已觸及評論': 'komen dicapai',
    '全部線索': 'Semua petunjuk', '🟢 最新未處理': '🟢 Baharu', '🟡 跟進中': '🟡 Sedang diproses', '🔵 已回覆': '🔵 Dibalas', '⚪ 已忽略': '⚪ Diabaikan',
    '新商機': 'Peluang baharu', '處理中': 'Sedang diproses', '已回覆': 'Dibalas', '已忽略': 'Diabaikan', '2 小時前': '2 jam lalu', '匹配': 'padanan',
    'AI 提煉買家痛點 / 差評關鍵：': 'Titik masalah pembeli / isyarat ulasan AI:', '作者:': 'Pengarang:', '預設品牌': 'Jenama lalai', 'AI 核心痛點拆解：': 'Pecahan masalah utama AI:',
    'Reddit 原文內容預覽': 'Pratonton sumber Reddit', 'AI 預擬回覆話術（語氣切換）': 'Draf balasan AI (nada)', '已自動代入您的品牌：': 'Jenama dimasukkan secara automatik:',
    '標記為已回覆': 'Tandakan sebagai dibalas', '前往 Reddit 並喚醒 Copilot': 'Buka Reddit dan aktifkan Copilot', '客觀熱心網友': 'Peminat yang membantu', '同病相憐買家': 'Pembeli yang mengalami masalah sama', '技術專家解方': 'Penyelesaian pakar teknikal',
    '以第三方視角科普產品規格與避坑點，軟性植入推薦': 'Terangkan spesifikasi dan perangkap produk dari sudut pihak ketiga dengan cadangan lembut.',
    '共鳴原帖差評痛點，真誠分享更換品牌後的親身體驗': 'Kongsi pengalaman sebenar selepas menukar jenama sambil memahami masalah asal.',
    '從材料或電路工程角度剖析問題，建立專業信任度': 'Analisis masalah dari sudut bahan atau kejuruteraan elektrik untuk membina kepercayaan.',
  },
  id: {
    '所有 Subreddits': 'Semua Subreddit', '所有品類': 'Semua kategori', '匹配度:': 'Kecocokan:', '不限': 'Semua', '≥ 90% (極高)': '≥ 90% (sangat tinggi)',
    '今日偵測商機 Leads': 'Prospek terdeteksi hari ini', '篇潛在貼文': 'postingan potensial', '平均關鍵字匹配度': 'Kecocokan kata kunci rata-rata', 'AI 高相關性': 'Relevansi AI tinggi',
    '原帖社群熱度 (Upvotes)': 'Aktivitas komunitas asli (Upvote)', '潛在關注買家': 'pembeli potensial', '社群互動討論量 (Comments)': 'Komentar komunitas', '則已觸及評論': 'komentar tercapai',
    '全部線索': 'Semua prospek', '🟢 最新未處理': '🟢 Baru', '🟡 跟進中': '🟡 Sedang diproses', '🔵 已回覆': '🔵 Dibalas', '⚪ 已忽略': '⚪ Diabaikan',
    '新商機': 'Peluang baru', '處理中': 'Sedang diproses', '已回覆': 'Dibalas', '已忽略': 'Diabaikan', '2 小時前': '2 jam lalu', '匹配': 'cocok',
    'AI 提煉買家痛點 / 差評關鍵：': 'Masalah pembeli / sinyal ulasan AI:', '作者:': 'Penulis:', '預設品牌': 'Merek default', 'AI 核心痛點拆解：': 'Rincian masalah utama AI:',
    'Reddit 原文內容預覽': 'Pratinjau sumber Reddit', 'AI 預擬回覆話術（語氣切換）': 'Draf balasan AI (nada)', '已自動代入您的品牌：': 'Merek Anda dimasukkan otomatis:',
    '標記為已回覆': 'Tandai sudah dibalas', '前往 Reddit 並喚醒 Copilot': 'Buka Reddit dan aktifkan Copilot', '客觀熱心網友': 'Penggemar yang membantu', '同病相憐買家': 'Pembeli dengan masalah serupa', '技術專家解方': 'Solusi pakar teknis',
    '以第三方視角科普產品規格與避坑點，軟性植入推薦': 'Jelaskan spesifikasi dan jebakan produk dari sudut pandang pihak ketiga dengan rekomendasi lembut.',
    '共鳴原帖差評痛點，真誠分享更換品牌後的親身體驗': 'Berempati pada keluhan asli dan bagikan pengalaman setelah berganti merek.',
    '從材料或電路工程角度剖析問題，建立專業信任度': 'Analisis masalah dari sudut material atau teknik listrik untuk membangun kepercayaan.',
  },
  vi: {
    '所有 Subreddits': 'Tất cả Subreddit', '所有品類': 'Tất cả danh mục', '匹配度:': 'Độ khớp:', '不限': 'Tất cả', '≥ 90% (極高)': '≥ 90% (rất cao)',
    '今日偵測商機 Leads': 'Khách hàng tiềm năng hôm nay', '篇潛在貼文': 'bài đăng tiềm năng', '平均關鍵字匹配度': 'Độ khớp từ khóa trung bình', 'AI 高相關性': 'Độ liên quan AI cao',
    '原帖社群熱度 (Upvotes)': 'Tương tác bài đăng gốc (Upvotes)', '潛在關注買家': 'người mua tiềm năng', '社群互動討論量 (Comments)': 'Bình luận cộng đồng', '則已觸及評論': 'bình luận đã tiếp cận',
    '全部線索': 'Tất cả khách hàng tiềm năng', '🟢 最新未處理': '🟢 Mới', '🟡 跟進中': '🟡 Đang xử lý', '🔵 已回覆': '🔵 Đã trả lời', '⚪ 已忽略': '⚪ Đã bỏ qua',
    '新商機': 'Cơ hội mới', '處理中': 'Đang xử lý', '已回覆': 'Đã trả lời', '已忽略': 'Đã bỏ qua', '2 小時前': '2 giờ trước', '匹配': 'khớp',
    'AI 提煉買家痛點 / 差評關鍵：': 'Nỗi đau người mua / tín hiệu đánh giá AI:', '作者:': 'Tác giả:', '預設品牌': 'Thương hiệu mặc định', 'AI 核心痛點拆解：': 'Phân tích nỗi đau cốt lõi bằng AI:',
    'Reddit 原文內容預覽': 'Xem trước nội dung Reddit', 'AI 預擬回覆話術（語氣切換）': 'Bản nháp trả lời AI (giọng điệu)', '已自動代入您的品牌：': 'Đã tự động thêm thương hiệu:',
    '標記為已回覆': 'Đánh dấu đã trả lời', '前往 Reddit 並喚醒 Copilot': 'Mở Reddit và đánh thức Copilot', '客觀熱心網友': 'Người đam mê hữu ích', '同病相憐買家': 'Người mua cùng gặp vấn đề', '技術專家解方': 'Giải pháp chuyên gia kỹ thuật',
    '以第三方視角科普產品規格與避坑點，軟性植入推薦': 'Giải thích thông số và điểm cần tránh từ góc nhìn bên thứ ba với đề xuất tự nhiên.',
    '共鳴原帖差評痛點，真誠分享更換品牌後的親身體驗': 'Đồng cảm với khiếu nại gốc và chia sẻ trải nghiệm thật sau khi đổi thương hiệu.',
    '從材料或電路工程角度剖析問題，建立專業信任度': 'Phân tích vấn đề theo góc nhìn vật liệu hoặc kỹ thuật điện để tạo dựng niềm tin.',
  },
};
for (const [locale, entries] of Object.entries(renderLocaleUi)) uiCopy[locale] = { ...(uiCopy[locale] || {}), ...entries };
const staticLocaleUi = {
  en: {
    '找不到符合條件的商機線索': 'No matching opportunities found', '請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。': 'Try broadening your search, adjusting the Subreddit filter, or resetting the match threshold.',
    'AMZ Leads Radar © 2026 • 跨境電商站外拓客雙軌制 SaaS': 'AMZ Leads Radar © 2026 • Dual-channel e-commerce acquisition SaaS', 'Supabase 登入': 'Supabase Sign in',
    'Email / Password • session 僅保留在目前頁面記憶體': 'Email / Password • session stays in this page memory', '取消': 'Cancel', '登入並讀取額度': 'Sign in and load quota',
    'AI 核心痛點拆解：': 'AI pain-point breakdown:', 'Reddit 原文內容預覽': 'Reddit source preview', 'AI 預擬回覆話術（語氣切換）': 'AI draft reply (tone)', '已自動代入您的品牌：': 'Brand inserted automatically:',
    '複製草稿': 'Copy draft', '真人審核機制：外掛輔助填入，手動點擊發布，100% 避免封號': 'Human review required: the extension assists entry; you click publish manually to protect your account.',
    '標記為已回覆': 'Mark as replied', '前往 Reddit 並喚醒 Copilot': 'Open Reddit and wake Copilot', '升級 AMZ Leads Radar Pro 專業版': 'Upgrade to AMZ Leads Radar Pro',
    '為跨境賣家解鎖全天候無上限社群商機監控、高轉化 AI 話術與 Chrome 一鍵填入輔助！': 'Unlock 24/7 community opportunity monitoring, high-converting AI copy, and one-click Chrome assistance.',
    'Free 體驗方案': 'Free plan', '當前方案': 'Current plan', '/ 永久免費': '/ forever free', '✔ 每日最新 5 條商機線索': '✔ 5 new opportunities every day', '✔ 每日 3 次外掛一鍵填入輔助': '✔ 3 extension-assisted replies per day', '✔ 預設社群品類監控': '✔ Default community monitoring', '已在使用中': 'Current plan', '最受歡迎': 'Most popular', 'Pro 專業方案': 'Pro plan', '/ 月 (隨時可取消)': '/ month (cancel anytime)', '無上限': 'Unlimited', '✔ 3 種專業話術語氣 + 自訂 Prompt': '✔ 3 professional tones + custom prompts', '✔ 支援自訂 15 組品類與競品關鍵字庫': '✔ Up to 15 custom categories and competitor keyword sets', '✔ Telegram / Discord 實時商機通報': '✔ Telegram / Discord opportunity alerts', '立即開通 Pro 專業版 (Lemon Squeezy)': 'Activate Pro now (Lemon Squeezy)', '7 天無條件全額退款保證 • SSL 256 位元加密安全付款': '7-day full refund guarantee • SSL 256-bit encrypted payment',
    '賣家品牌與店鋪設定': 'Seller brand and store settings', '您的品牌名稱 (Brand Name)': 'Your brand name (Brand Name)', '當 AI 產生回覆草稿時，會自動以此品牌名稱置換 [Your Brand]。': 'AI drafts automatically replace [Your Brand] with this brand name.', 'Amazon 商品超連結或店鋪首頁 URL': 'Amazon product link or storefront URL', '（選填）建議使用 Amazon Attribution 連結追蹤站外引流紅利與轉化率！': '(Optional) Amazon Attribution links are recommended for tracking external traffic and conversions!', '防封號提示：': 'Account safety tip:', '取消': 'Cancel', '儲存設定': 'Save settings',
  },
  'zh-TW': {
    '找不到符合條件的商機線索': '找不到符合條件的商機線索', '請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。': '請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。', 'AMZ Leads Radar © 2026 • 跨境電商站外拓客雙軌制 SaaS': 'AMZ Leads Radar © 2026 • 跨境電商站外拓客雙軌制 SaaS', 'Supabase 登入': 'Supabase 登入', 'Email / Password • session 僅保留在目前頁面記憶體': 'Email／Password • session 僅保留在目前頁面記憶體', '取消': '取消', '登入並讀取額度': '登入並讀取額度', 'AI 核心痛點拆解：': 'AI 核心痛點拆解：', 'Reddit 原文內容預覽': 'Reddit 原文內容預覽', 'AI 預擬回覆話術（語氣切換）': 'AI 預擬回覆話術（語氣切換）', '已自動代入您的品牌：': '已自動代入您的品牌：', '複製草稿': '複製草稿', '真人審核機制：外掛輔助填入，手動點擊發布，100% 避免封號': '真人審核機制：外掛輔助填入，手動點擊發布，100% 避免封號', '標記為已回覆': '標記為已回覆', '前往 Reddit 並喚醒 Copilot': '前往 Reddit 並喚醒 Copilot', '升級 AMZ Leads Radar Pro 專業版': '升級 AMZ Leads Radar Pro 專業版', '賣家品牌與店鋪設定': '賣家品牌與店鋪設定', '您的品牌名稱 (Brand Name)': '您的品牌名稱（品牌名稱）', '當 AI 產生回覆草稿時，會自動以此品牌名稱置換 [Your Brand]。': 'AI 產生草稿時會以此品牌名稱取代 [Your Brand]。', 'Amazon 商品超連結或店鋪首頁 URL': 'Amazon 商品超連結或店鋪首頁 URL', '防封號提示：': '防封號提示：', '取消': '取消', '儲存設定': '儲存設定',
  },
  'zh-CN': {
    '找不到符合條件的商機線索': '找不到符合条件的商机线索', '請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。': '请尝试放宽关键词搜索、调整 Subreddit 筛选或重置匹配度门槛。', 'AMZ Leads Radar © 2026 • 跨境電商站外拓客雙軌制 SaaS': 'AMZ Leads Radar © 2026 • 跨境电商站外获客双轨制 SaaS', 'Supabase 登入': 'Supabase 登录', 'Email / Password • session 僅保留在目前頁面記憶體': 'Email／Password • session 仅保留在当前页面内存', '取消': '取消', '登入並讀取額度': '登录并读取额度', 'AI 核心痛點拆解：': 'AI 核心痛点拆解：', 'Reddit 原文內容預覽': 'Reddit 原文内容预览', 'AI 預擬回覆話術（語氣切換）': 'AI 草拟回复话术（语气切换）', '已自動代入您的品牌：': '已自动代入您的品牌：', '複製草稿': '复制草稿', '真人審核機制：外掛輔助填入，手動點擊發布，100% 避免封號': '人工审核机制：扩展程序辅助填入，手动点击发布，避免账号被封。', '標記為已回覆': '标记为已回复', '前往 Reddit 並喚醒 Copilot': '前往 Reddit 并唤醒 Copilot', '升級 AMZ Leads Radar Pro 專業版': '升级 AMZ Leads Radar Pro 专业版', '賣家品牌與店鋪設定': '卖家品牌与店铺设置', '您的品牌名稱 (Brand Name)': '您的品牌名称（品牌名称）', '當 AI 產生回覆草稿時，會自動以此品牌名稱置換 [Your Brand]。': 'AI 生成回复草稿时会用此品牌名替换 [Your Brand]。', 'Amazon 商品超連結或店鋪首頁 URL': 'Amazon 商品超链接或店铺首页 URL', '防封號提示：': '防封号提示：', '取消': '取消', '儲存設定': '保存设置',
  },
  ja: {
    '找不到符合條件的商機線索': '条件に一致する機会が見つかりません', '請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。': 'キーワードを広げ、Subredditフィルターや一致度を調整してください。', 'AMZ Leads Radar © 2026 • 跨境電商站外拓客雙軌制 SaaS': 'AMZ Leads Radar © 2026 • 越境EC集客SaaS', 'Supabase 登入': 'Supabaseログイン', 'Email / Password • session 僅保留在目前頁面記憶體': 'Email / Password • セッションはこのページのメモリにのみ保持', '取消': 'キャンセル', '登入並讀取額度': 'ログインして枠を読み込む', 'AI 核心痛點拆解：': 'AIによる核心的な不満分析:', 'Reddit 原文內容預覽': 'Reddit原文プレビュー', 'AI 預擬回覆話術（語氣切換）': 'AI返信下書き（トーン）', '已自動代入您的品牌：': 'ブランドを自動入力:', '複製草稿': '下書きをコピー', '真人審核機制：外掛輔助填入，手動點擊發布，100% 避免封號': '人による確認が必要です。拡張機能が入力を補助し、公開は手動で行います。', '標記為已回覆': '返信済みにする', '前往 Reddit 並喚醒 Copilot': 'Redditを開いてCopilotを起動', '升級 AMZ Leads Radar Pro 專業版': 'AMZ Leads Radar Proへアップグレード', '賣家品牌與店鋪設定': '販売者ブランドと店舗の設定', '您的品牌名稱 (Brand Name)': 'ブランド名', '當 AI 產生回覆草稿時，會自動以此品牌名稱置換 [Your Brand]。': 'AI下書きではこのブランド名で[Your Brand]を置き換えます。', 'Amazon 商品超連結或店鋪首頁 URL': 'Amazon商品リンクまたは店舗URL', '防封號提示：': 'アカウント安全のヒント:', '取消': 'キャンセル', '儲存設定': '設定を保存',
  },
  ko: {
    '找不到符合條件的商機線索': '조건에 맞는 기회를 찾을 수 없습니다', '請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。': '키워드 검색을 넓히고 Subreddit 필터 또는 일치도 기준을 조정해 보세요.', 'AMZ Leads Radar © 2026 • 跨境電商站外拓客雙軌制 SaaS': 'AMZ Leads Radar © 2026 • 해외 유입 고객 확보 SaaS', 'Supabase 登入': 'Supabase 로그인', 'Email / Password • session 僅保留在目前頁面記憶體': 'Email / Password • 세션은 현재 페이지 메모리에만 유지됩니다', '取消': '취소', '登入並讀取額度': '로그인하여 한도 불러오기', 'AI 核心痛點拆解：': 'AI 핵심 문제 분석:', 'Reddit 原文內容預覽': 'Reddit 원문 미리보기', 'AI 預擬回覆話術（語氣切換）': 'AI 답변 초안(톤)', '已自動代入您的品牌：': '브랜드 자동 입력:', '複製草稿': '초안 복사', '真人審核機制：外掛輔助填入，手動點擊發布，100% 避免封號': '사람의 검토가 필요합니다. 확장 프로그램이 입력을 돕고 게시를 직접 클릭합니다.', '標記為已回覆': '답변 완료로 표시', '前往 Reddit 並喚醒 Copilot': 'Reddit을 열고 Copilot 실행', '升級 AMZ Leads Radar Pro 專業版': 'AMZ Leads Radar Pro로 업그레이드', '賣家品牌與店鋪設定': '판매자 브랜드 및 스토어 설정', '您的品牌名稱 (Brand Name)': '브랜드 이름', '當 AI 產生回覆草稿時，會自動以此品牌名稱置換 [Your Brand]。': 'AI 초안은 이 브랜드 이름으로 [Your Brand]를 바꿉니다.', 'Amazon 商品超連結或店鋪首頁 URL': 'Amazon 상품 링크 또는 스토어 URL', '防封號提示：': '계정 안전 팁:', '取消': '취소', '儲存設定': '설정 저장',
  },
  ms: {
    '找不到符合條件的商機線索': 'Tiada peluang yang sepadan ditemui', '請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。': 'Cuba luaskan carian, ubah penapis Subreddit atau tetapkan semula ambang padanan.', 'AMZ Leads Radar © 2026 • 跨境電商站外拓客雙軌制 SaaS': 'AMZ Leads Radar © 2026 • SaaS pemerolehan pelanggan e-dagang dua saluran', 'Supabase 登入': 'Log masuk Supabase', 'Email / Password • session 僅保留在目前頁面記憶體': 'Email / Password • sesi hanya disimpan dalam memori halaman ini', '取消': 'Batal', '登入並讀取額度': 'Log masuk dan muatkan kuota', 'AI 核心痛點拆解：': 'Pecahan masalah utama AI:', 'Reddit 原文內容預覽': 'Pratonton sumber Reddit', 'AI 預擬回覆話術（語氣切換）': 'Draf balasan AI (nada)', '已自動代入您的品牌：': 'Jenama dimasukkan secara automatik:', '複製草稿': 'Salin draf', '真人審核機制：外掛輔助填入，手動點擊發布，100% 避免封號': 'Semakan manusia diperlukan; sambungan membantu mengisi dan anda menerbitkan secara manual.', '標記為已回覆': 'Tandakan sebagai dibalas', '前往 Reddit 並喚醒 Copilot': 'Buka Reddit dan aktifkan Copilot', '升級 AMZ Leads Radar Pro 專業版': 'Naik taraf ke AMZ Leads Radar Pro', '賣家品牌與店鋪設定': 'Tetapan jenama dan kedai penjual', '您的品牌名稱 (Brand Name)': 'Nama jenama', '當 AI 產生回覆草稿時，會自動以此品牌名稱置換 [Your Brand]。': 'Draf AI menggantikan [Your Brand] dengan nama jenama ini.', 'Amazon 商品超連結或店鋪首頁 URL': 'Pautan produk Amazon atau URL kedai', '防封號提示：': 'Petua keselamatan akaun:', '取消': 'Batal', '儲存設定': 'Simpan tetapan',
  },
  id: {
    '找不到符合條件的商機線索': 'Tidak ada peluang yang cocok', '請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。': 'Coba perluas pencarian, sesuaikan filter Subreddit, atau reset ambang kecocokan.', 'AMZ Leads Radar © 2026 • 跨境電商站外拓客雙軌制 SaaS': 'AMZ Leads Radar © 2026 • SaaS akuisisi e-commerce dua jalur', 'Supabase 登入': 'Masuk ke Supabase', 'Email / Password • session 僅保留在目前頁面記憶體': 'Email / Password • sesi hanya disimpan di memori halaman ini', '取消': 'Batal', '登入並讀取額度': 'Masuk dan muat kuota', 'AI 核心痛點拆解：': 'Rincian masalah utama AI:', 'Reddit 原文內容預覽': 'Pratinjau sumber Reddit', 'AI 預擬回覆話術（語氣切換）': 'Draf balasan AI (nada)', '已自動代入您的品牌：': 'Merek Anda dimasukkan otomatis:', '複製草稿': 'Salin draf', '真人審核機制：外掛輔助填入，手動點擊發布，100% 避免封號': 'Tinjauan manusia diperlukan; ekstensi membantu mengisi dan Anda menerbitkan secara manual.', '標記為已回覆': 'Tandai sudah dibalas', '前往 Reddit 並喚醒 Copilot': 'Buka Reddit dan aktifkan Copilot', '升級 AMZ Leads Radar Pro 專業版': 'Tingkatkan ke AMZ Leads Radar Pro', '賣家品牌與店鋪設定': 'Pengaturan merek dan toko penjual', '您的品牌名稱 (Brand Name)': 'Nama merek', '當 AI 產生回覆草稿時，會自動以此品牌名稱置換 [Your Brand]。': 'Draf AI mengganti [Your Brand] dengan nama merek ini.', 'Amazon 商品超連結或店鋪首頁 URL': 'Tautan produk Amazon atau URL toko', '防封號提示：': 'Tips keamanan akun:', '取消': 'Batal', '儲存設定': 'Simpan pengaturan',
  },
  vi: {
    '找不到符合條件的商機線索': 'Không tìm thấy cơ hội phù hợp', '請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。': 'Hãy mở rộng từ khóa, điều chỉnh bộ lọc Subreddit hoặc đặt lại ngưỡng khớp.', 'AMZ Leads Radar © 2026 • 跨境電商站外拓客雙軌制 SaaS': 'AMZ Leads Radar © 2026 • SaaS thu hút khách hàng thương mại điện tử đa kênh', 'Supabase 登入': 'Đăng nhập Supabase', 'Email / Password • session 僅保留在目前頁面記憶體': 'Email / Password • phiên chỉ được giữ trong bộ nhớ trang này', '取消': 'Hủy', '登入並讀取額度': 'Đăng nhập và tải hạn mức', 'AI 核心痛點拆解：': 'Phân tích nỗi đau cốt lõi bằng AI:', 'Reddit 原文內容預覽': 'Xem trước nội dung Reddit', 'AI 預擬回覆話術（語氣切換）': 'Bản nháp trả lời AI (giọng điệu)', '已自動代入您的品牌：': 'Đã tự động thêm thương hiệu:', '複製草稿': 'Sao chép bản nháp', '真人審核機制：外掛輔助填入，手動點擊發布，100% 避免封號': 'Cần người kiểm duyệt; tiện ích hỗ trợ điền và bạn tự bấm đăng.', '標記為已回覆': 'Đánh dấu đã trả lời', '前往 Reddit 並喚醒 Copilot': 'Mở Reddit và đánh thức Copilot', '升級 AMZ Leads Radar Pro 專業版': 'Nâng cấp lên AMZ Leads Radar Pro', '賣家品牌與店鋪設定': 'Cài đặt thương hiệu và cửa hàng người bán', '您的品牌名稱 (Brand Name)': 'Tên thương hiệu', '當 AI 產生回覆草稿時，會自動以此品牌名稱置換 [Your Brand]。': 'Bản nháp AI thay [Your Brand] bằng tên thương hiệu này.', 'Amazon 商品超連結或店鋪首頁 URL': 'Liên kết sản phẩm Amazon hoặc URL cửa hàng', '防封號提示：': 'Mẹo bảo vệ tài khoản:', '取消': 'Hủy', '儲存設定': 'Lưu cài đặt',
  },
};
for (const [locale, entries] of Object.entries(staticLocaleUi)) uiCopy[locale] = { ...(uiCopy[locale] || {}), ...entries };

const missingStaticLocaleUi = {
  en: {
    '次': 'uses', '為跨境賣家解鎖全天候無上限社群商機監控、高轉化 AI 話術與 Chrome 一鍵填入輔助！': 'Unlock 24/7 community opportunity monitoring, high-converting AI copy, and one-click Chrome assistance.',
    '✔ 每日最新 5 條商機線索': '✔ 5 new opportunities every day', '✔ 每日 3 次外掛一鍵填入輔助': '✔ 3 extension-assisted replies per day', '✔ 預設社群品類監控': '✔ Default community monitoring',
    '線索全天候即時監控': '24/7 opportunity monitoring', 'Chrome 外掛輔助填入': 'Chrome extension assisted replies', '✔ 3 種專業話術語氣 + 自訂 Prompt': '✔ 3 professional tones + custom prompts',
    '✔ 支援自訂 15 組品類與競品關鍵字庫': '✔ Up to 15 custom categories and competitor keyword sets', '✔ Telegram / Discord 實時商機通報': '✔ Telegram / Discord opportunity alerts',
    '立即開通 Pro 專業版 (Lemon Squeezy)': 'Activate Pro now (Lemon Squeezy)', '在 Reddit 回覆時，建議優先以「解決買家痛點」為主。若太過直白貼廣告連結容易被版主刪文，Copilot 會自動引導採取軟性自然植入策略。': 'When replying on Reddit, focus on solving buyer pain points. Direct advertising links may be removed, so Copilot guides a natural soft-placement strategy.',
    '（選填）建議使用 Amazon Attribution 連結追蹤站外引流紅利與轉化率！': '(Optional) Amazon Attribution links are recommended for tracking external traffic and conversions!'
  },
  'zh-TW': {
    '次': '次', '為跨境賣家解鎖全天候無上限社群商機監控、高轉化 AI 話術與 Chrome 一鍵填入輔助！': '為跨境賣家解鎖全天候無上限社群商機監控、高轉化 AI 話術與 Chrome 一鍵填入輔助！',
    '✔ 每日最新 5 條商機線索': '✔ 每日最新 5 條商機線索', '✔ 每日 3 次外掛一鍵填入輔助': '✔ 每日 3 次外掛一鍵填入輔助', '✔ 預設社群品類監控': '✔ 預設社群品類監控', '線索全天候即時監控': '線索全天候即時監控', 'Chrome 外掛輔助填入': 'Chrome 外掛輔助填入', '✔ 3 種專業話術語氣 + 自訂 Prompt': '✔ 3 種專業話術語氣 + 自訂 Prompt', '✔ 支援自訂 15 組品類與競品關鍵字庫': '✔ 支援自訂 15 組品類與競品關鍵字庫', '✔ Telegram / Discord 實時商機通報': '✔ Telegram / Discord 實時商機通報', '立即開通 Pro 專業版 (Lemon Squeezy)': '立即開通 Pro 專業版（Lemon Squeezy）', '在 Reddit 回覆時，建議優先以「解決買家痛點」為主。若太過直白貼廣告連結容易被版主刪文，Copilot 會自動引導採取軟性自然植入策略。': '在 Reddit 回覆時，建議優先以「解決買家痛點」為主，避免過度直白的廣告連結。', '（選填）建議使用 Amazon Attribution 連結追蹤站外引流紅利與轉化率！': '（選填）建議使用 Amazon Attribution 連結追蹤站外引流紅利與轉化率！'
  },
  'zh-CN': {
    '次': '次', '為跨境賣家解鎖全天候無上限社群商機監控、高轉化 AI 話術與 Chrome 一鍵填入輔助！': '为跨境卖家解锁全天候无限社区商机监控、高转化 AI 话术与 Chrome 一键填入辅助！', '✔ 每日最新 5 條商機線索': '✔ 每日最新 5 条商机线索', '✔ 每日 3 次外掛一鍵填入輔助': '✔ 每日 3 次扩展辅助回复', '✔ 預設社群品類監控': '✔ 默认社区品类监控', '線索全天候即時監控': '全天候监控商机', 'Chrome 外掛輔助填入': 'Chrome 扩展辅助回复', '✔ 3 種專業話術語氣 + 自訂 Prompt': '✔ 3 种专业话术语气 + 自定义 Prompt', '✔ 支援自訂 15 組品類與競品關鍵字庫': '✔ 支持自定义 15 组品类与竞品关键词库', '✔ Telegram / Discord 實時商機通報': '✔ Telegram / Discord 实时商机通知', '立即開通 Pro 專業版 (Lemon Squeezy)': '立即开通 Pro 专业版（Lemon Squeezy）', '在 Reddit 回覆時，建議優先以「解決買家痛點」為主。若太過直白貼廣告連結容易被版主刪文，Copilot 會自動引導採取軟性自然植入策略。': '在 Reddit 回复时，建议优先解决买家痛点，避免过于直接的广告链接。', '（選填）建議使用 Amazon Attribution 連結追蹤站外引流紅利與轉化率！': '（选填）建议使用 Amazon Attribution 链接追踪站外流量与转化率！'
  },
  ja: {
    '次': '回', '為跨境賣家解鎖全天候無上限社群商機監控、高轉化 AI 話術與 Chrome 一鍵填入輔助！': '24時間のコミュニティ機会監視、高転換AI文面、Chromeワンクリック入力を解放します。', '✔ 每日最新 5 條商機線索': '✔ 毎日5件の新しい機会', '✔ 每日 3 次外掛一鍵填入輔助': '✔ 拡張機能による返信補助を1日3回', '✔ 預設社群品類監控': '✔ 既定コミュニティカテゴリ監視', '線索全天候即時監控': '機会を24時間監視', 'Chrome 外掛輔助填入': 'Chrome拡張機能による返信補助', '✔ 3 種專業話術語氣 + 自訂 Prompt': '✔ 3種類の専門トーン＋カスタムPrompt', '✔ 支援自訂 15 組品類與競品關鍵字庫': '✔ 最大15件のカテゴリ・競合キーワード', '✔ Telegram / Discord 實時商機通報': '✔ Telegram / Discord機会通知', '立即開通 Pro 專業版 (Lemon Squeezy)': 'Proを今すぐ有効化（Lemon Squeezy）', '在 Reddit 回覆時，建議優先以「解決買家痛點」為主。若太過直白貼廣告連結容易被版主刪文，Copilot 會自動引導採取軟性自然植入策略。': 'Redditでは購入者の課題解決を優先し、広告リンクは自然に案内してください。', '（選填）建議使用 Amazon Attribution 連結追蹤站外引流紅利與轉化率！': '（任意）Amazon Attributionリンクで外部流入と転換率を追跡できます。'
  },
  ko: {
    '次': '회', '為跨境賣家解鎖全天候無上限社群商機監控、高轉化 AI 話術與 Chrome 一鍵填入輔助！': '24시간 커뮤니티 기회 모니터링과 고전환 AI 문구, Chrome 원클릭 입력을 제공합니다.', '✔ 每日最新 5 條商機線索': '✔ 매일 새로운 기회 5건', '✔ 每日 3 次外掛一鍵填入輔助': '✔ 확장 프로그램 답변 지원 하루 3회', '✔ 預設社群品類監控': '✔ 기본 커뮤니티 카테고리 모니터링', '線索全天候即時監控': '기회를 24시간 모니터링', 'Chrome 外掛輔助填入': 'Chrome 확장 프로그램 답변 지원', '✔ 3 種專業話術語氣 + 自訂 Prompt': '✔ 전문 말투 3종 + 사용자 지정 Prompt', '✔ 支援自訂 15 組品類與競品關鍵字庫': '✔ 최대 15개 카테고리 및 경쟁 키워드', '✔ Telegram / Discord 實時商機通報': '✔ Telegram / Discord 기회 알림', '立即開通 Pro 專業版 (Lemon Squeezy)': 'Pro 지금 활성화(Lemon Squeezy)', '在 Reddit 回覆時，建議優先以「解決買家痛點」為主。若太過直白貼廣告連結容易被版主刪文，Copilot 會自動引導採取軟性自然植入策略。': 'Reddit에서는 구매자 문제 해결을 우선하고 광고 링크는 자연스럽게 안내하세요.', '（選填）建議使用 Amazon Attribution 連結追蹤站外引流紅利與轉化率！': '(선택) Amazon Attribution 링크로 외부 유입과 전환을 추적하세요.'
  },
  ms: {
    '次': 'penggunaan', '為跨境賣家解鎖全天候無上限社群商機監控、高轉化 AI 話術與 Chrome 一鍵填入輔助！': 'Buka pemantauan peluang komuniti 24/7, salinan AI berkonversi tinggi dan bantuan Chrome satu klik.', '✔ 每日最新 5 條商機線索': '✔ 5 peluang baharu setiap hari', '✔ 每日 3 次外掛一鍵填入輔助': '✔ 3 balasan bantuan sambungan sehari', '✔ 預設社群品類監控': '✔ Pemantauan kategori komuniti lalai', '線索全天候即時監控': 'Pemantauan peluang 24/7', 'Chrome 外掛輔助填入': 'Balasan bantuan sambungan Chrome', '✔ 3 種專業話術語氣 + 自訂 Prompt': '✔ 3 nada profesional + gesaan tersuai', '✔ 支援自訂 15 組品類與競品關鍵字庫': '✔ Sehingga 15 kategori dan kata kunci pesaing', '✔ Telegram / Discord 實時商機通報': '✔ Makluman peluang Telegram / Discord', '立即開通 Pro 專業版 (Lemon Squeezy)': 'Aktifkan Pro sekarang (Lemon Squeezy)', '在 Reddit 回覆時，建議優先以「解決買家痛點」為主。若太過直白貼廣告連結容易被版主刪文，Copilot 會自動引導採取軟性自然植入策略。': 'Semasa membalas di Reddit, utamakan penyelesaian masalah pembeli dan gunakan pautan secara semula jadi.', '（選填）建議使用 Amazon Attribution 連結追蹤站外引流紅利與轉化率！': '(Pilihan) Gunakan pautan Amazon Attribution untuk menjejak trafik luar dan penukaran!'
  },
  id: {
    '次': 'penggunaan', '為跨境賣家解鎖全天候無上限社群商機監控、高轉化 AI 話術與 Chrome 一鍵填入輔助！': 'Dapatkan pemantauan peluang komunitas 24/7, copy AI berkonversi tinggi, dan bantuan Chrome sekali klik.', '✔ 每日最新 5 條商機線索': '✔ 5 peluang baru setiap hari', '✔ 每日 3 次外掛一鍵填入輔助': '✔ 3 balasan bantuan ekstensi per hari', '✔ 預設社群品類監控': '✔ Pemantauan kategori komunitas default', '線索全天候即時監控': 'Pemantauan prospek 24/7', 'Chrome 外掛輔助填入': 'Balasan bantuan ekstensi Chrome', '✔ 3 種專業話術語氣 + 自訂 Prompt': '✔ 3 nada profesional + prompt kustom', '✔ 支援自訂 15 組品類與競品關鍵字庫': '✔ Hingga 15 kategori dan kata kunci pesaing', '✔ Telegram / Discord 實時商機通報': '✔ Notifikasi peluang Telegram / Discord', '立即開通 Pro 專業版 (Lemon Squeezy)': 'Aktifkan Pro sekarang (Lemon Squeezy)', '在 Reddit 回覆時，建議優先以「解決買家痛點」為主。若太過直白貼廣告連結容易被版主刪文，Copilot 會自動引導採取軟性自然植入策略。': 'Saat membalas di Reddit, utamakan solusi untuk masalah pembeli dan gunakan tautan secara alami.', '（選填）建議使用 Amazon Attribution 連結追蹤站外引流紅利與轉化率！': '(Opsional) Gunakan tautan Amazon Attribution untuk melacak trafik eksternal dan konversi!'
  },
  vi: {
    '次': 'lượt', '為跨境賣家解鎖全天候無上限社群商機監控、高轉化 AI 話術與 Chrome 一鍵填入輔助！': 'Mở khóa giám sát cơ hội cộng đồng 24/7, nội dung AI chuyển đổi cao và hỗ trợ điền bằng Chrome một cú nhấp.', '✔ 每日最新 5 條商機線索': '✔ 5 cơ hội mới mỗi ngày', '✔ 每日 3 次外掛一鍵填入輔助': '✔ 3 lần hỗ trợ trả lời bằng tiện ích mỗi ngày', '✔ 預設社群品類監控': '✔ Theo dõi danh mục cộng đồng mặc định', '線索全天候即時監控': 'Theo dõi cơ hội 24/7', 'Chrome 外掛輔助填入': 'Hỗ trợ trả lời bằng tiện ích Chrome', '✔ 3 種專業話術語氣 + 自訂 Prompt': '✔ 3 giọng điệu chuyên nghiệp + Prompt tùy chỉnh', '✔ 支援自訂 15 組品類與競品關鍵字庫': '✔ Tối đa 15 danh mục và từ khóa đối thủ tùy chỉnh', '✔ Telegram / Discord 實時商機通報': '✔ Thông báo cơ hội Telegram / Discord', '立即開通 Pro 專業版 (Lemon Squeezy)': 'Kích hoạt Pro ngay (Lemon Squeezy)', '在 Reddit 回覆時，建議優先以「解決買家痛點」為主。若太過直白貼廣告連結容易被版主刪文，Copilot 會自動引導採取軟性自然植入策略。': 'Khi trả lời trên Reddit, hãy ưu tiên giải quyết vấn đề của người mua và đưa liên kết tự nhiên.', '（選填）建議使用 Amazon Attribution 連結追蹤站外引流紅利與轉化率！': '(Tùy chọn) Dùng liên kết Amazon Attribution để theo dõi lưu lượng ngoài và chuyển đổi!'
  }
};
for (const [locale, entries] of Object.entries(missingStaticLocaleUi)) uiCopy[locale] = { ...(uiCopy[locale] || {}), ...entries };

const planLocaleUi = {
  en: { 'Free 體驗方案': 'Free plan', '當前方案': 'Current plan', '/ 永久免費': '/ forever free', '已在使用中': 'Current plan', '最受歡迎': 'Most popular', 'Pro 專業方案': 'Pro plan', '/ 月 (隨時可取消)': '/ month (cancel anytime)', '無上限': 'Unlimited', '7 天無條件全額退款保證 • SSL 256 位元加密安全付款': '7-day full refund guarantee • SSL 256-bit encrypted payment' },
  'zh-TW': { 'Free 體驗方案': 'Free 體驗方案', '當前方案': '當前方案', '/ 永久免費': '/ 永久免費', '已在使用中': '已在使用中', '最受歡迎': '最受歡迎', 'Pro 專業方案': 'Pro 專業方案', '/ 月 (隨時可取消)': '/ 月（隨時可取消）', '無上限': '無上限', '7 天無條件全額退款保證 • SSL 256 位元加密安全付款': '7 天無條件全額退款保證 • SSL 256 位元加密安全付款' },
  'zh-CN': { 'Free 體驗方案': '免费体验方案', '當前方案': '当前方案', '/ 永久免費': '/ 永久免费', '已在使用中': '当前方案', '最受歡迎': '最受欢迎', 'Pro 專業方案': 'Pro 专业方案', '/ 月 (隨時可取消)': '/ 月（随时可取消）', '無上限': '无限', '7 天無條件全額退款保證 • SSL 256 位元加密安全付款': '7 天无条件全额退款保证 • SSL 256 位加密安全付款' },
  ja: { 'Free 體驗方案': '無料プラン', '當前方案': '現在のプラン', '/ 永久免費': '/ 永久無料', '已在使用中': '使用中', '最受歡迎': '人気プラン', 'Pro 專業方案': 'Proプラン', '/ 月 (隨時可取消)': '/ 月（いつでもキャンセル可）', '無上限': '無制限', '7 天無條件全額退款保證 • SSL 256 位元加密安全付款': '7日間全額返金保証 • SSL 256ビット暗号化決済' },
  ko: { 'Free 體驗方案': '무료 요금제', '當前方案': '현재 요금제', '/ 永久免費': '/ 영구 무료', '已在使用中': '현재 사용 중', '最受歡迎': '가장 인기', 'Pro 專業方案': 'Pro 요금제', '/ 月 (隨時可取消)': '/ 월(언제든 취소 가능)', '無上限': '무제한', '7 天無條件全額退款保證 • SSL 256 位元加密安全付款': '7일 전액 환불 보장 • SSL 256비트 암호화 결제' },
  ms: { 'Free 體驗方案': 'Pelan percuma', '當前方案': 'Pelan semasa', '/ 永久免費': '/ percuma selamanya', '已在使用中': 'Sedang digunakan', '最受歡迎': 'Paling popular', 'Pro 專業方案': 'Pelan Pro', '/ 月 (隨時可取消)': '/ bulan (boleh batal bila-bila masa)', '無上限': 'Tanpa had', '7 天無條件全額退款保證 • SSL 256 位元加密安全付款': 'Jaminan bayaran balik penuh 7 hari • Pembayaran disulitkan SSL 256-bit' },
  id: { 'Free 體驗方案': 'Paket gratis', '當前方案': 'Paket saat ini', '/ 永久免費': '/ gratis selamanya', '已在使用中': 'Sedang digunakan', '最受歡迎': 'Paling populer', 'Pro 專業方案': 'Paket Pro', '/ 月 (隨時可取消)': '/ bulan (dapat dibatalkan kapan saja)', '無上限': 'Tanpa batas', '7 天無條件全額退款保證 • SSL 256 位元加密安全付款': 'Jaminan pengembalian penuh 7 hari • Pembayaran terenkripsi SSL 256-bit' },
  vi: { 'Free 體驗方案': 'Gói miễn phí', '當前方案': 'Gói hiện tại', '/ 永久免費': '/ miễn phí vĩnh viễn', '已在使用中': 'Đang sử dụng', '最受歡迎': 'Phổ biến nhất', 'Pro 專業方案': 'Gói Pro', '/ 月 (隨時可取消)': '/ tháng (có thể hủy bất cứ lúc nào)', '無上限': 'Không giới hạn', '7 天無條件全額退款保證 • SSL 256 位元加密安全付款': 'Đảm bảo hoàn tiền đầy đủ trong 7 ngày • Thanh toán mã hóa SSL 256-bit' }
};
for (const [locale, entries] of Object.entries(planLocaleUi)) uiCopy[locale] = { ...(uiCopy[locale] || {}), ...entries };

const metadataAndAlertLocaleUi = {
  en: { pageTitle: pageTitles.en, Language: 'Language', 'Radar scanning animation': 'Radar scanning animation', '關閉登入面板': 'Close sign-in panel', '關閉商機詳情': 'Close opportunity details', '關閉升級視窗': 'Close upgrade dialog', '關閉設定視窗': 'Close settings dialog', '目前尚未公開': 'Not publicly available yet', '文件頁面建置中': 'Documentation page is under construction', '法律文件建置中': 'Legal documents are under construction', '例如: ApexGear, VoltMaster...': 'e.g. ApexGear, VoltMaster...', '跳轉至 Reddit 原文並啟動瀏覽器 Copilot': 'Open the Reddit source and start Browser Copilot', '此線索的 Reddit 連結無效，無法跳轉。': 'This opportunity has an invalid Reddit link and cannot be opened.', '此線索不是受支援的 Reddit 連結，已阻止跳轉。': 'This is not a supported Reddit link; navigation was blocked.', '今日額度已用完，無法前往 Reddit。': 'Today’s quota is exhausted; Reddit cannot be opened.', '尚未設定 Lemon Squeezy checkout URL。請先完成付款設定。': 'The Lemon Squeezy checkout URL is not configured. Complete payment setup first.', '品牌設定儲存失敗。': 'Failed to save brand settings.', '✅ 品牌與店鋪設定已儲存！': '✅ Brand and store settings saved!', '登入中…': 'Signing in…', '登入失敗。': 'Sign-in failed.', '登入成功，正在載入 server-side quota…': 'Signed in; loading the server-side quota…', '登出失敗。': 'Sign-out failed.' },
  'zh-TW': { pageTitle: pageTitles['zh-TW'], Language: '語言', 'Radar scanning animation': '雷達掃描動畫', '關閉登入面板': '關閉登入面板', '關閉商機詳情': '關閉商機詳情', '關閉升級視窗': '關閉升級視窗', '關閉設定視窗': '關閉設定視窗', '目前尚未公開': '目前尚未公開', '文件頁面建置中': '文件頁面建置中', '法律文件建置中': '法律文件建置中', '例如: ApexGear, VoltMaster...': '例如：ApexGear、VoltMaster…', '跳轉至 Reddit 原文並啟動瀏覽器 Copilot': '跳轉至 Reddit 原文並啟動瀏覽器 Copilot', '此線索的 Reddit 連結無效，無法跳轉。': '此線索的 Reddit 連結無效，無法跳轉。', '此線索不是受支援的 Reddit 連結，已阻止跳轉。': '此線索不是受支援的 Reddit 連結，已阻止跳轉。', '今日額度已用完，無法前往 Reddit。': '今日額度已用完，無法前往 Reddit。', '尚未設定 Lemon Squeezy checkout URL。請先完成付款設定。': '尚未設定 Lemon Squeezy checkout URL。請先完成付款設定。', '品牌設定儲存失敗。': '品牌設定儲存失敗。', '✅ 品牌與店鋪設定已儲存！': '✅ 品牌與店鋪設定已儲存！', '登入中…': '登入中…', '登入失敗。': '登入失敗。', '登入成功，正在載入 server-side quota…': '登入成功，正在載入 server-side quota…', '登出失敗。': '登出失敗。' },
  'zh-CN': { pageTitle: pageTitles['zh-CN'], Language: '语言', 'Radar scanning animation': '雷达扫描动画', '關閉登入面板': '关闭登录面板', '關閉商機詳情': '关闭商机详情', '關閉升級視窗': '关闭升级窗口', '關閉設定視窗': '关闭设置窗口', '目前尚未公開': '目前尚未公开', '文件頁面建置中': '文档页面建设中', '法律文件建置中': '法律文件建设中', '例如: ApexGear, VoltMaster...': '例如：ApexGear、VoltMaster…', '跳轉至 Reddit 原文並啟動瀏覽器 Copilot': '跳转至 Reddit 原文并启动浏览器 Copilot', '此線索的 Reddit 連結無效，無法跳轉。': '此商机的 Reddit 链接无效，无法跳转。', '此線索不是受支援的 Reddit 連結，已阻止跳轉。': '此链接不受支持，已阻止跳转。', '今日額度已用完，無法前往 Reddit。': '今日额度已用完，无法前往 Reddit。', '尚未設定 Lemon Squeezy checkout URL。請先完成付款設定。': '尚未设置 Lemon Squeezy checkout URL，请先完成付款设置。', '品牌設定儲存失敗。': '品牌设置保存失败。', '✅ 品牌與店鋪設定已儲存！': '✅ 品牌与店铺设置已保存！', '登入中…': '正在登录…', '登入失敗。': '登录失败。', '登入成功，正在載入 server-side quota…': '登录成功，正在加载 server-side quota…', '登出失敗。': '退出登录失败。' },
  ja: { pageTitle: pageTitles.ja, Language: '言語', 'Radar scanning animation': 'レーダー走査アニメーション', '關閉登入面板': 'ログインパネルを閉じる', '關閉商機詳情': '機会の詳細を閉じる', '關閉升級視窗': 'アップグレードダイアログを閉じる', '關閉設定視窗': '設定ダイアログを閉じる', '目前尚未公開': '現在は公開されていません', '文件頁面建置中': 'ドキュメントを準備中', '法律文件建置中': '法務ページを準備中', '例如: ApexGear, VoltMaster...': '例: ApexGear、VoltMaster…', '跳轉至 Reddit 原文並啟動瀏覽器 Copilot': 'Reddit原文を開いてブラウザCopilotを起動', '此線索的 Reddit 連結無效，無法跳轉。': 'この機会のRedditリンクは無効です。', '此線索不是受支援的 Reddit 連結，已阻止跳轉。': '対応していないRedditリンクのため移動を停止しました。', '今日額度已用完，無法前往 Reddit。': '本日の利用枠を使い切ったため、Redditを開けません。', '尚未設定 Lemon Squeezy checkout URL。請先完成付款設定。': 'Lemon Squeezyの決済URLが未設定です。先に決済設定を完了してください。', '品牌設定儲存失敗。': 'ブランド設定の保存に失敗しました。', '✅ 品牌與店鋪設定已儲存！': '✅ ブランドと店舗の設定を保存しました。', '登入中…': 'ログイン中…', '登入失敗。': 'ログインに失敗しました。', '登入成功，正在載入 server-side quota…': 'ログインしました。server-side quotaを読み込んでいます…', '登出失敗。': 'ログアウトに失敗しました。' },
  ko: { pageTitle: pageTitles.ko, Language: '언어', 'Radar scanning animation': '레이더 스캔 애니메이션', '關閉登入面板': '로그인 패널 닫기', '關閉商機詳情': '기회 상세 닫기', '關閉升級視窗': '업그레이드 대화상자 닫기', '關閉設定視窗': '설정 대화상자 닫기', '目前尚未公開': '아직 공개되지 않음', '文件頁面建置中': '문서 페이지 준비 중', '法律文件建置中': '법률 문서 준비 중', '例如: ApexGear, VoltMaster...': '예: ApexGear, VoltMaster…', '跳轉至 Reddit 原文並啟動瀏覽器 Copilot': 'Reddit 원문을 열고 브라우저 Copilot 시작', '此線索的 Reddit 連結無效，無法跳轉。': '이 기회의 Reddit 링크가 올바르지 않아 열 수 없습니다.', '此線索不是受支援的 Reddit 連結，已阻止跳轉。': '지원되지 않는 Reddit 링크라 이동을 차단했습니다.', '今日額度已用完，無法前往 Reddit。': '오늘 한도를 모두 사용해 Reddit을 열 수 없습니다.', '尚未設定 Lemon Squeezy checkout URL。請先完成付款設定。': 'Lemon Squeezy 결제 URL이 설정되지 않았습니다. 먼저 결제 설정을 완료하세요.', '品牌設定儲存失敗。': '브랜드 설정 저장에 실패했습니다.', '✅ 品牌與店鋪設定已儲存！': '✅ 브랜드 및 스토어 설정을 저장했습니다.', '登入中…': '로그인 중…', '登入失敗。': '로그인에 실패했습니다.', '登入成功，正在載入 server-side quota…': '로그인했습니다. server-side quota를 불러오는 중입니다…', '登出失敗。': '로그아웃에 실패했습니다.' },
  ms: { pageTitle: pageTitles.ms, Language: 'Bahasa', 'Radar scanning animation': 'Animasi imbasan radar', '關閉登入面板': 'Tutup panel log masuk', '關閉商機詳情': 'Tutup butiran peluang', '關閉升級視窗': 'Tutup dialog naik taraf', '關閉設定視窗': 'Tutup dialog tetapan', '目前尚未公開': 'Belum tersedia untuk umum', '文件頁面建置中': 'Halaman dokumentasi sedang dibina', '法律文件建置中': 'Dokumen undang-undang sedang dibina', '例如: ApexGear, VoltMaster...': 'cth.: ApexGear, VoltMaster…', '跳轉至 Reddit 原文並啟動瀏覽器 Copilot': 'Buka sumber Reddit dan mulakan Browser Copilot', '此線索的 Reddit 連結無效，無法跳轉。': 'Pautan Reddit peluang ini tidak sah dan tidak boleh dibuka.', '此線索不是受支援的 Reddit 連結，已阻止跳轉。': 'Pautan Reddit ini tidak disokong; navigasi disekat.', '今日額度已用完，無法前往 Reddit。': 'Kuota hari ini telah habis; Reddit tidak boleh dibuka.', '尚未設定 Lemon Squeezy checkout URL。請先完成付款設定。': 'URL pembayaran Lemon Squeezy belum dikonfigurasi. Lengkapkan tetapan bayaran dahulu.', '品牌設定儲存失敗。': 'Gagal menyimpan tetapan jenama.', '✅ 品牌與店鋪設定已儲存！': '✅ Tetapan jenama dan kedai disimpan!', '登入中…': 'Sedang log masuk…', '登入失敗。': 'Log masuk gagal.', '登入成功，正在載入 server-side quota…': 'Berjaya log masuk; sedang memuatkan kuota pelayan…', '登出失敗。': 'Log keluar gagal.' },
  id: { pageTitle: pageTitles.id, Language: 'Bahasa', 'Radar scanning animation': 'Animasi pemindaian radar', '關閉登入面板': 'Tutup panel masuk', '關閉商機詳情': 'Tutup detail peluang', '關閉升級視窗': 'Tutup dialog peningkatan', '關閉設定視窗': 'Tutup dialog pengaturan', '目前尚未公開': 'Belum tersedia untuk umum', '文件頁面建置中': 'Halaman dokumentasi sedang dibuat', '法律文件建置中': 'Dokumen hukum sedang dibuat', '例如: ApexGear, VoltMaster...': 'mis.: ApexGear, VoltMaster…', '跳轉至 Reddit 原文並啟動瀏覽器 Copilot': 'Buka sumber Reddit dan mulai Browser Copilot', '此線索的 Reddit 連結無效，無法跳轉。': 'Tautan Reddit prospek ini tidak valid dan tidak dapat dibuka.', '此線索不是受支援的 Reddit 連結，已阻止跳轉。': 'Tautan Reddit ini tidak didukung; navigasi diblokir.', '今日額度已用完，無法前往 Reddit。': 'Kuota hari ini habis; Reddit tidak dapat dibuka.', '尚未設定 Lemon Squeezy checkout URL。請先完成付款設定。': 'URL checkout Lemon Squeezy belum dikonfigurasi. Selesaikan pengaturan pembayaran terlebih dahulu.', '品牌設定儲存失敗。': 'Gagal menyimpan pengaturan merek.', '✅ 品牌與店鋪設定已儲存！': '✅ Pengaturan merek dan toko disimpan!', '登入中…': 'Sedang masuk…', '登入失敗。': 'Gagal masuk.', '登入成功，正在載入 server-side quota…': 'Berhasil masuk; sedang memuat kuota server…', '登出失敗。': 'Gagal keluar.' },
  vi: { pageTitle: pageTitles.vi, Language: 'Ngôn ngữ', 'Radar scanning animation': 'Hoạt ảnh quét radar', '關閉登入面板': 'Đóng bảng đăng nhập', '關閉商機詳情': 'Đóng chi tiết cơ hội', '關閉升級視窗': 'Đóng hộp thoại nâng cấp', '關閉設定視窗': 'Đóng hộp thoại cài đặt', '目前尚未公開': 'Chưa công khai', '文件頁面建置中': 'Trang tài liệu đang được xây dựng', '法律文件建置中': 'Tài liệu pháp lý đang được xây dựng', '例如: ApexGear, VoltMaster...': 'ví dụ: ApexGear, VoltMaster…', '跳轉至 Reddit 原文並啟動瀏覽器 Copilot': 'Mở nguồn Reddit và khởi động Browser Copilot', '此線索的 Reddit 連結無效，無法跳轉。': 'Liên kết Reddit của cơ hội này không hợp lệ và không thể mở.', '此線索不是受支援的 Reddit 連結，已阻止跳轉。': 'Liên kết Reddit không được hỗ trợ; đã chặn chuyển hướng.', '今日額度已用完，無法前往 Reddit。': 'Đã dùng hết hạn mức hôm nay; không thể mở Reddit.', '尚未設定 Lemon Squeezy checkout URL。請先完成付款設定。': 'Chưa cấu hình URL thanh toán Lemon Squeezy. Hãy hoàn tất cài đặt thanh toán trước.', '品牌設定儲存失敗。': 'Không thể lưu cài đặt thương hiệu.', '✅ 品牌與店鋪設定已儲存！': '✅ Đã lưu cài đặt thương hiệu và cửa hàng!', '登入中…': 'Đang đăng nhập…', '登入失敗。': 'Đăng nhập thất bại.', '登入成功，正在載入 server-side quota…': 'Đã đăng nhập; đang tải hạn mức máy chủ…', '登出失敗。': 'Đăng xuất thất bại.' }
};
for (const [locale, entries] of Object.entries(metadataAndAlertLocaleUi)) uiCopy[locale] = { ...(uiCopy[locale] || {}), ...entries };

const footerLocaleUi = {
  en: { '網站聲明': 'Website statement: AMZ Leads Radar is an independent third-party tool and is not affiliated with Amazon, Reddit, or any other platform. Public content is provided for research and workflow assistance; users must verify information and follow each platform’s rules.' },
  'zh-TW': { '網站聲明': '網站聲明：AMZ Leads Radar 為獨立第三方工具，與 Amazon、Reddit 或其他平台無隸屬關係。公開內容僅供研究與工作流程輔助，使用者仍應自行確認資訊並遵守各平台規範。' },
  'zh-CN': { '網站聲明': '声明：AMZ Leads Radar 是独立的第三方工具，与 Amazon、Reddit 或其他平台没有隶属关系。公开内容仅供研究和工作流程辅助，用户仍应自行核实信息并遵守各平台规则。' },
  ja: { '網站聲明': 'サイト声明：AMZ Leads Radar は独立した第三者ツールであり、Amazon、Redditなどのプラットフォームとは提携していません。公開情報は調査と業務支援を目的としており、利用者は情報を確認し各プラットフォームの規約に従ってください。' },
  ko: { '網站聲明': '웹사이트 안내: AMZ Leads Radar는 독립적인 제3자 도구이며 Amazon, Reddit 또는 다른 플랫폼과 제휴하지 않습니다. 공개 콘텐츠는 조사와 업무 지원을 위한 것이며, 사용자는 정보를 확인하고 각 플랫폼의 규정을 따라야 합니다.' },
  ms: { '網站聲明': 'Pernyataan laman web: AMZ Leads Radar ialah alat pihak ketiga bebas dan tidak berafiliasi dengan Amazon, Reddit atau mana-mana platform lain. Kandungan awam disediakan untuk penyelidikan dan bantuan aliran kerja; pengguna hendaklah mengesahkan maklumat dan mematuhi peraturan setiap platform.' },
  id: { '網站聲明': 'Pernyataan situs: AMZ Leads Radar adalah alat pihak ketiga independen dan tidak berafiliasi dengan Amazon, Reddit, atau platform lainnya. Konten publik disediakan untuk riset dan bantuan alur kerja; pengguna harus memverifikasi informasi dan mematuhi aturan setiap platform.' },
  vi: { '網站聲明': 'Tuyên bố trang web: AMZ Leads Radar là công cụ bên thứ ba độc lập và không liên kết với Amazon, Reddit hay bất kỳ nền tảng nào khác. Nội dung công khai chỉ nhằm hỗ trợ nghiên cứu và quy trình làm việc; người dùng cần tự xác minh thông tin và tuân thủ quy định của từng nền tảng.' }
};
for (const [locale, entries] of Object.entries(footerLocaleUi)) uiCopy[locale] = { ...(uiCopy[locale] || {}), ...entries };

const statementLocaleUi = {
  en: { '網站聲明標題': 'Website statement', '開啟網站聲明': 'Open website statement', '關閉網站聲明': 'Close website statement' },
  'zh-TW': { '網站聲明標題': '網站聲明', '開啟網站聲明': '開啟網站聲明', '關閉網站聲明': '關閉網站聲明' },
  'zh-CN': { '網站聲明標題': '网站声明', '開啟網站聲明': '打开网站声明', '關閉網站聲明': '关闭网站声明' },
  ja: { '網站聲明標題': 'サイト声明', '開啟網站聲明': 'サイト声明を開く', '關閉網站聲明': 'サイト声明を閉じる' },
  ko: { '網站聲明標題': '웹사이트 안내', '開啟網站聲明': '웹사이트 안내 열기', '關閉網站聲明': '웹사이트 안내 닫기' },
  ms: { '網站聲明標題': 'Pernyataan laman web', '開啟網站聲明': 'Buka pernyataan laman web', '關閉網站聲明': 'Tutup pernyataan laman web' },
  id: { '網站聲明標題': 'Pernyataan situs', '開啟網站聲明': 'Buka pernyataan situs', '關閉網站聲明': 'Tutup pernyataan situs' },
  vi: { '網站聲明標題': 'Tuyên bố trang web', '開啟網站聲明': 'Mở tuyên bố trang web', '關閉網站聲明': 'Đóng tuyên bố trang web' }
};
for (const [locale, entries] of Object.entries(statementLocaleUi)) uiCopy[locale] = { ...(uiCopy[locale] || {}), ...entries };

const policyLocaleUi = {
  en: {
    'Cookie Policy': 'Cookie Policy',
    'Privacy Policy': 'Privacy Policy',
    'Refund and Cancellation Policy': 'Refund and Cancellation Policy',
    'Terms of Service / Terms and Conditions': 'Terms of Service / Terms and Conditions',
    '開啟 Cookie Policy': 'Open Cookie Policy',
    '開啟 Privacy Policy': 'Open Privacy Policy',
    '開啟 Refund and Cancellation Policy': 'Open Refund and Cancellation Policy',
    '開啟 Terms of Service / Terms and Conditions': 'Open Terms of Service / Terms and Conditions',
    '關閉政策視窗': 'Close policy window',
    '法律文件建置中說明': 'The full policy text will be published here before public launch.'
  },
  'zh-TW': {
    'Cookie Policy': 'Cookie 政策',
    'Privacy Policy': '隱私權政策',
    'Refund and Cancellation Policy': '退款與取消政策',
    'Terms of Service / Terms and Conditions': '服務條款／條件',
    '開啟 Cookie Policy': '開啟 Cookie 政策',
    '開啟 Privacy Policy': '開啟隱私權政策',
    '開啟 Refund and Cancellation Policy': '開啟退款與取消政策',
    '開啟 Terms of Service / Terms and Conditions': '開啟服務條款／條件',
    '關閉政策視窗': '關閉政策視窗',
    '法律文件建置中說明': '完整政策內容將於正式發布前在此公開。'
  },
  'zh-CN': {
    'Cookie Policy': 'Cookie 政策',
    'Privacy Policy': '隐私政策',
    'Refund and Cancellation Policy': '退款与取消政策',
    'Terms of Service / Terms and Conditions': '服务条款／条款与条件',
    '開啟 Cookie Policy': '打开 Cookie 政策',
    '開啟 Privacy Policy': '打开隐私政策',
    '開啟 Refund and Cancellation Policy': '打开退款与取消政策',
    '開啟 Terms of Service / Terms and Conditions': '打开服务条款／条款与条件',
    '關閉政策視窗': '关闭政策窗口',
    '法律文件建置中說明': '完整政策内容将在正式发布前于此公开。'
  },
  ja: {
    'Cookie Policy': 'Cookieポリシー',
    'Privacy Policy': 'プライバシーポリシー',
    'Refund and Cancellation Policy': '返金・キャンセルポリシー',
    'Terms of Service / Terms and Conditions': '利用規約／利用条件',
    '開啟 Cookie Policy': 'Cookieポリシーを開く',
    '開啟 Privacy Policy': 'プライバシーポリシーを開く',
    '開啟 Refund and Cancellation Policy': '返金・キャンセルポリシーを開く',
    '開啟 Terms of Service / Terms and Conditions': '利用規約／利用条件を開く',
    '關閉政策視窗': 'ポリシーを閉じる',
    '法律文件建置中說明': '完全なポリシー本文は正式公開前にここへ掲載します。'
  },
  ko: {
    'Cookie Policy': '쿠키 정책',
    'Privacy Policy': '개인정보 처리방침',
    'Refund and Cancellation Policy': '환불 및 취소 정책',
    'Terms of Service / Terms and Conditions': '서비스 약관／이용약관',
    '開啟 Cookie Policy': '쿠키 정책 열기',
    '開啟 Privacy Policy': '개인정보 처리방침 열기',
    '開啟 Refund and Cancellation Policy': '환불 및 취소 정책 열기',
    '開啟 Terms of Service / Terms and Conditions': '서비스 약관／이용약관 열기',
    '關閉政策視窗': '정책 창 닫기',
    '法律文件建置中說明': '전체 정책 내용은 정식 출시 전에 이곳에 게시됩니다.'
  },
  ms: {
    'Cookie Policy': 'Dasar Kuki',
    'Privacy Policy': 'Dasar Privasi',
    'Refund and Cancellation Policy': 'Dasar Bayaran Balik dan Pembatalan',
    'Terms of Service / Terms and Conditions': 'Syarat Perkhidmatan / Terma dan Syarat',
    '開啟 Cookie Policy': 'Buka Dasar Kuki',
    '開啟 Privacy Policy': 'Buka Dasar Privasi',
    '開啟 Refund and Cancellation Policy': 'Buka Dasar Bayaran Balik dan Pembatalan',
    '開啟 Terms of Service / Terms and Conditions': 'Buka Syarat Perkhidmatan / Terma dan Syarat',
    '關閉政策視窗': 'Tutup tetingkap dasar',
    '法律文件建置中說明': 'Teks penuh dasar akan diterbitkan di sini sebelum pelancaran umum.'
  },
  id: {
    'Cookie Policy': 'Kebijakan Cookie',
    'Privacy Policy': 'Kebijakan Privasi',
    'Refund and Cancellation Policy': 'Kebijakan Pengembalian Dana dan Pembatalan',
    'Terms of Service / Terms and Conditions': 'Ketentuan Layanan / Syarat dan Ketentuan',
    '開啟 Cookie Policy': 'Buka Kebijakan Cookie',
    '開啟 Privacy Policy': 'Buka Kebijakan Privasi',
    '開啟 Refund and Cancellation Policy': 'Buka Kebijakan Pengembalian Dana dan Pembatalan',
    '開啟 Terms of Service / Terms and Conditions': 'Buka Ketentuan Layanan / Syarat dan Ketentuan',
    '關閉政策視窗': 'Tutup jendela kebijakan',
    '法律文件建置中說明': 'Teks lengkap kebijakan akan diterbitkan di sini sebelum peluncuran publik.'
  },
  vi: {
    'Cookie Policy': 'Chính sách Cookie',
    'Privacy Policy': 'Chính sách quyền riêng tư',
    'Refund and Cancellation Policy': 'Chính sách hoàn tiền và hủy',
    'Terms of Service / Terms and Conditions': 'Điều khoản dịch vụ / Điều khoản và điều kiện',
    '開啟 Cookie Policy': 'Mở Chính sách Cookie',
    '開啟 Privacy Policy': 'Mở Chính sách quyền riêng tư',
    '開啟 Refund and Cancellation Policy': 'Mở Chính sách hoàn tiền và hủy',
    '開啟 Terms of Service / Terms and Conditions': 'Mở Điều khoản dịch vụ / Điều khoản và điều kiện',
    '關閉政策視窗': 'Đóng cửa sổ chính sách',
    '法律文件建置中說明': 'Toàn văn chính sách sẽ được đăng tại đây trước khi ra mắt chính thức.'
  }
};
for (const [locale, entries] of Object.entries(policyLocaleUi)) uiCopy[locale] = { ...(uiCopy[locale] || {}), ...entries };

const consistencyLocaleUi = {
  en: {
    '所有 Subreddits': 'All communities',
    'Reddit 貼文讚數': 'Reddit post upvotes',
    'Reddit 討論留言數': 'Reddit discussion comments',
    '請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。': 'Try broadening your keyword search, adjusting the community filter, or resetting the match threshold.',
    'Email': 'Email',
    'Password': 'Password',
    'Supabase Auth password': 'Supabase Auth password',
    'Email / Password • session 僅保留在目前頁面記憶體': 'Email / Password • session stays in this page memory',
    '✔ 3 種專業話術語氣 + 自訂 Prompt': '✔ 3 professional tones + custom prompt'
  },
  'zh-TW': {
    'Demo mode': '示範模式',
    '所有 Subreddits': '所有社群',
    'Reddit 貼文讚數': 'Reddit 貼文讚數',
    'Reddit 討論留言數': 'Reddit 討論留言數',
    '今日偵測商機 Leads': '今日偵測商機',
    '原帖社群熱度 (Upvotes)': '原帖社群熱度（讚數）',
    '社群互動討論量 (Comments)': '社群互動討論量（留言）',
    'Free 體驗方案': '免費體驗方案',
    '✔ 3 種專業話術語氣 + 自訂 Prompt': '✔ 3 種專業話術語氣 + 自訂提示詞',
    'Email': '電子郵件',
    'Password': '密碼',
    'Supabase Auth password': 'Supabase Auth 密碼',
    'Email / Password • session 僅保留在目前頁面記憶體': '電子郵件／密碼 • 工作階段僅保留在目前頁面記憶體',
    '請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。': '請嘗試放寬關鍵字搜尋、調整社群篩選或重設匹配度門檻。',
    '目前使用本地 Reddit mock 與示範額度；登入後才會讀取 server-side quota。': '目前使用本地 Reddit mock 與示範額度；登入後才會讀取伺服器端額度。',
    '登入成功，正在載入 server-side quota…': '登入成功，正在載入伺服器端額度…',
    '線索仍保留為既有 Reddit mock；額度來自 public.profiles，跳轉操作會由 server RPC 扣除。': '線索仍保留為既有 Reddit mock；額度來自 public.profiles，跳轉操作會由伺服器 RPC 扣除。'
  },
  'zh-CN': {
    'Demo mode': '演示模式',
    'Demo mode • 尚未登入': '演示模式 • 尚未登录',
    'Demo mode • Supabase 尚未完成同步': '演示模式 • Supabase 尚未完成同步',
    '所有 Subreddits': '所有社区',
    'Reddit 貼文讚數': 'Reddit 帖子点赞数',
    'Reddit 討論留言數': 'Reddit 讨论评论数',
    '請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。': '请尝试放宽关键词搜索、调整社区筛选或重置匹配度门槛。',
    '今日偵測商機 Leads': '今日检测商机',
    '原帖社群熱度 (Upvotes)': '原帖社区热度（点赞）',
    '社群互動討論量 (Comments)': '社区互动量（评论）',
    'Email': '电子邮件',
    'Password': '密码',
    'Supabase Auth password': 'Supabase Auth 密码',
    'Email / Password • session 僅保留在目前頁面記憶體': '电子邮件／密码 • 会话仅保留在当前页面内存',
    '✔ 3 種專業話術語氣 + 自訂 Prompt': '✔ 3 种专业话术语气 + 自定义提示词',
    '目前使用本地 Reddit mock 與示範額度；登入後才會讀取 server-side quota。': '目前使用本地 Reddit mock 和演示额度；登录后才会读取服务器端额度。',
    '登入成功，正在載入 server-side quota…': '登录成功，正在加载服务器端额度…',
    '線索仍保留為既有 Reddit mock；額度來自 public.profiles，跳轉操作會由 server RPC 扣除。': '线索仍保留为现有 Reddit mock；额度来自 public.profiles，跳转操作会由服务器 RPC 扣除。'
  },
  ja: {
    'Demo mode': 'デモモード',
    'Reddit 貼文讚數': 'Reddit投稿の投票数',
    'Reddit 討論留言數': 'Reddit議論のコメント数',
    'Electronics': '電子機器', 'Home & Office': 'ホーム・オフィス', 'Home & Kitchen': 'ホーム・キッチン', 'Outdoor & Sports': 'アウトドア・スポーツ',
    'Demo mode • 尚未登入': 'デモモード • 未ログイン',
    'Demo mode • Supabase 尚未完成同步': 'デモモード • Supabase未同期',
    '所有 Subreddits': 'すべてのコミュニティ',
    '請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。': 'キーワード検索を広げ、コミュニティフィルターを調整するか、一致度の基準をリセットしてください。',
    '原帖社群熱度 (Upvotes)': '元投稿の反応（高評価）',
    '社群互動討論量 (Comments)': 'コミュニティのコメント数',
    'Email': 'メールアドレス',
    'Password': 'パスワード',
    'Supabase Auth password': 'Supabase Auth パスワード',
    'Email / Password • session 僅保留在目前頁面記憶體': 'メールアドレス／パスワード • セッションはこのページのメモリにのみ保持',
    '✔ 3 種專業話術語氣 + 自訂 Prompt': '✔ 3種類の専門トーン + カスタムプロンプト',
    '目前使用本地 Reddit mock 與示範額度；登入後才會讀取 server-side quota。': '現在はローカルのRedditモックとデモ枠を使用しています。ログイン後にサーバー側の利用枠を読み込みます。',
    '登入成功，正在載入 server-side quota…': 'ログインしました。サーバー側の利用枠を読み込んでいます…'
  },
  ko: {
    'Demo mode': '데모 모드',
    'Reddit 貼文讚數': 'Reddit 게시물 추천 수',
    'Reddit 討論留言數': 'Reddit 토론 댓글 수',
    'Electronics': '전자제품', 'Home & Office': '홈·오피스', 'Home & Kitchen': '홈·주방', 'Outdoor & Sports': '아웃도어·스포츠',
    'Demo mode • 尚未登入': '데모 모드 • 로그인하지 않음',
    'Demo mode • Supabase 尚未完成同步': '데모 모드 • Supabase 동기화 미완료',
    '所有 Subreddits': '모든 커뮤니티',
    '請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。': '키워드 검색을 넓히고 커뮤니티 필터 또는 일치도 기준을 조정해 보세요.',
    '原帖社群熱度 (Upvotes)': '원문 커뮤니티 반응(추천)',
    'Email': '이메일',
    'Password': '비밀번호',
    'Supabase Auth password': 'Supabase Auth 비밀번호',
    'Email / Password • session 僅保留在目前頁面記憶體': '이메일／비밀번호 • 세션은 현재 페이지 메모리에만 유지됩니다',
    '✔ 3 種專業話術語氣 + 自訂 Prompt': '✔ 전문 말투 3종 + 사용자 지정 프롬프트',
    '目前使用本地 Reddit mock 與示範額度；登入後才會讀取 server-side quota。': '현재 로컬 Reddit 모크와 데모 한도를 사용합니다. 로그인 후 서버 한도를 불러옵니다.',
    '登入成功，正在載入 server-side quota…': '로그인했습니다. 서버 한도를 불러오는 중입니다…'
  },
  ms: {
    'Demo mode': 'Mod demo',
    'Reddit 貼文讚數': 'Undian siaran Reddit',
    'Reddit 討論留言數': 'Komen perbincangan Reddit',
    'Electronics': 'Elektronik', 'Home & Office': 'Rumah & pejabat', 'Home & Kitchen': 'Rumah & dapur', 'Outdoor & Sports': 'Luar & sukan',
    'Demo mode • 尚未登入': 'Mod demo • Belum log masuk',
    'Demo mode • Supabase 尚未完成同步': 'Mod demo • Supabase belum disegerakkan sepenuhnya',
    '所有 Subreddits': 'Semua komuniti',
    '請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。': 'Cuba luaskan carian kata kunci, ubah penapis komuniti atau tetapkan semula ambang padanan.',
    '原帖社群熱度 (Upvotes)': 'Aktiviti komuniti asal (Undian)',
    '社群互動討論量 (Comments)': 'Komen komuniti',
    'Email': 'E-mel',
    'Password': 'Kata laluan',
    'Supabase Auth password': 'Kata laluan Supabase Auth',
    'Email / Password • session 僅保留在目前頁面記憶體': 'E-mel／kata laluan • sesi hanya disimpan dalam memori halaman ini',
    '✔ 3 種專業話術語氣 + 自訂 Prompt': '✔ 3 nada profesional + gesaan tersuai',
    '目前使用本地 Reddit mock 與示範額度；登入後才會讀取 server-side quota。': 'Sedang menggunakan mock Reddit tempatan dan kuota demo; log masuk untuk memuatkan kuota pelayan.',
    '登入成功，正在載入 server-side quota…': 'Berjaya log masuk; sedang memuatkan kuota pelayan…'
  },
  id: {
    'Demo mode': 'Mode demo',
    'Reddit 貼文讚數': 'Upvote postingan Reddit',
    'Reddit 討論留言數': 'Komentar diskusi Reddit',
    'Electronics': 'Elektronik', 'Home & Office': 'Rumah & kantor', 'Home & Kitchen': 'Rumah & dapur', 'Outdoor & Sports': 'Luar ruang & olahraga',
    'Demo mode • 尚未登入': 'Mode demo • Belum masuk',
    'Demo mode • Supabase 尚未完成同步': 'Mode demo • Supabase belum sepenuhnya tersinkron',
    '所有 Subreddits': 'Semua komunitas',
    '請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。': 'Coba perluas pencarian kata kunci, sesuaikan filter komunitas, atau reset ambang kecocokan.',
    '原帖社群熱度 (Upvotes)': 'Aktivitas komunitas asli (suara positif)',
    '社群互動討論量 (Comments)': 'Komentar komunitas',
    'Email': 'Email',
    'Password': 'Kata sandi',
    'Supabase Auth password': 'Kata sandi Supabase Auth',
    'Email / Password • session 僅保留在目前頁面記憶體': 'Email／kata sandi • sesi hanya disimpan di memori halaman ini',
    '✔ 3 種專業話術語氣 + 自訂 Prompt': '✔ 3 gaya profesional + prompt kustom',
    '目前使用本地 Reddit mock 與示範額度；登入後才會讀取 server-side quota。': 'Menggunakan mock Reddit lokal dan kuota demo; masuk untuk memuat kuota server.',
    '登入成功，正在載入 server-side quota…': 'Berhasil masuk; sedang memuat kuota server…'
  },
  vi: {
    'Demo mode': 'Chế độ demo',
    'Reddit 貼文讚數': 'Lượt tán thành bài đăng Reddit',
    'Reddit 討論留言數': 'Bình luận thảo luận Reddit',
    'Electronics': 'Điện tử', 'Home & Office': 'Nhà & văn phòng', 'Home & Kitchen': 'Nhà & bếp', 'Outdoor & Sports': 'Ngoài trời & thể thao',
    'Demo mode • 尚未登入': 'Chế độ demo • Chưa đăng nhập',
    'Demo mode • Supabase 尚未完成同步': 'Chế độ demo • Supabase chưa đồng bộ đầy đủ',
    '所有 Subreddits': 'Tất cả cộng đồng',
    '請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。': 'Hãy mở rộng từ khóa, điều chỉnh bộ lọc cộng đồng hoặc đặt lại ngưỡng khớp.',
    '原帖社群熱度 (Upvotes)': 'Tương tác bài đăng gốc (Lượt tán thành)',
    '社群互動討論量 (Comments)': 'Bình luận cộng đồng',
    'Email': 'Email',
    'Password': 'Mật khẩu',
    'Supabase Auth password': 'Mật khẩu Supabase Auth',
    'Email / Password • session 僅保留在目前頁面記憶體': 'Email／mật khẩu • phiên chỉ được giữ trong bộ nhớ trang này',
    '✔ 3 種專業話術語氣 + 自訂 Prompt': '✔ 3 giọng điệu chuyên nghiệp + Prompt tùy chỉnh',
    '目前使用本地 Reddit mock 與示範額度；登入後才會讀取 server-side quota。': 'Đang dùng dữ liệu mô phỏng Reddit cục bộ và hạn mức dùng thử; hãy đăng nhập để tải hạn mức máy chủ.',
    '登入成功，正在載入 server-side quota…': 'Đã đăng nhập; đang tải hạn mức máy chủ…'
  }
};
for (const [locale, entries] of Object.entries(consistencyLocaleUi)) uiCopy[locale] = { ...(uiCopy[locale] || {}), ...entries };

const toolbarTooltipLocaleUi = {
  en: { '掃描最新線索': 'Scan latest leads', '店鋪與品牌設定': 'Store and brand settings' },
  'zh-TW': { '掃描最新線索': '掃描最新線索', '店鋪與品牌設定': '店鋪與品牌設定' },
  'zh-CN': { '掃描最新線索': '扫描最新线索', '店鋪與品牌設定': '店铺与品牌设置' },
  ja: { '掃描最新線索': '最新のリードをスキャン', '店鋪與品牌設定': '店舗とブランドの設定' },
  ko: { '掃描最新線索': '최신 리드 스캔', '店鋪與品牌設定': '스토어 및 브랜드 설정' },
  ms: { '掃描最新線索': 'Imbas petunjuk terkini', '店鋪與品牌設定': 'Tetapan kedai dan jenama' },
  id: { '掃描最新線索': 'Pindai prospek terbaru', '店鋪與品牌設定': 'Pengaturan toko dan merek' },
  vi: { '掃描最新線索': 'Quét khách hàng tiềm năng mới nhất', '店鋪與品牌設定': 'Cài đặt cửa hàng và thương hiệu' }
};
for (const [locale, entries] of Object.entries(toolbarTooltipLocaleUi)) uiCopy[locale] = { ...(uiCopy[locale] || {}), ...entries };

const painpointSummaryLocaleUi = {
  en: {
    '買家頻繁出差，抱怨多款行動電源在數月內電池膨脹且 USB-C 孔鬆動，急尋高耐用度、65W PD 輸出、不易過熱膨脹的長效行動電源。': 'Frequent business travel has exposed battery swelling and loose USB-C ports within months; buyers need a durable 65W PD power bank that stays cool and reliable.',
    '遠端工程師抱怨 Amazon 平價工學椅腰靠斷裂、座墊塌陷，不願花費 $1600 買頂級名牌，尋求 $400-$600 區間真正耐用、具備 3D 扶手與透氣網布的「甜點區」工作椅。': 'Remote engineers report broken lumbar supports and collapsed cushions in budget Amazon chairs; they want a durable $400-$600 work chair with 3D armrests and breathable mesh instead of a $1,600 premium brand.',
    '精品咖啡愛好者抱怨一般平價磨豆機遇到高密度淺焙豆經常卡豆並燒壞馬達，正尋找具備大扭力、低殘粉、適合手沖與濃縮的耐用磨豆機。': 'Specialty coffee lovers say budget grinders jam on dense light-roast beans and burn out their motors; they need a durable grinder with high torque, low retention, and strong pour-over and espresso performance.',
    '用戶每天有大量線上會議需求，強烈抱怨市售藍牙耳機在戶外或微風環境下通話音質如沉船水下，尋求麥克風抗風噪與人聲收音極佳的耳機。': 'Users with frequent online meetings report poor Bluetooth-earbud call quality outdoors and in light wind; they need excellent wind-noise rejection and clear voice capture.',
    '戶外露營登山者抱怨超輕充氣睡墊翻身時如洋芋片包裝紙般吵鬧，且隔夜漏氣，急需 R 值 4 以上、重量 18oz 以下且極致靜音、不漏氣的高品質睡墊。': 'Outdoor campers say ultralight inflatable pads crinkle loudly when they turn and lose air overnight; they need a quiet, leak-resistant pad with an R-value above 4 and weight under 18 oz.'
  },
  'zh-TW': {
    '買家頻繁出差，抱怨多款行動電源在數月內電池膨脹且 USB-C 孔鬆動，急尋高耐用度、65W PD 輸出、不易過熱膨脹的長效行動電源。': '買家頻繁出差，抱怨多款行動電源在數月內電池膨脹且 USB-C 孔鬆動，急尋高耐用度、65W PD 輸出、不易過熱膨脹的長效行動電源。',
    '遠端工程師抱怨 Amazon 平價工學椅腰靠斷裂、座墊塌陷，不願花費 $1600 買頂級名牌，尋求 $400-$600 區間真正耐用、具備 3D 扶手與透氣網布的「甜點區」工作椅。': '遠端工程師抱怨 Amazon 平價工學椅腰靠斷裂、座墊塌陷，不願花費 $1600 買頂級名牌，尋求 $400-$600 區間真正耐用、具備 3D 扶手與透氣網布的「甜點區」工作椅。',
    '精品咖啡愛好者抱怨一般平價磨豆機遇到高密度淺焙豆經常卡豆並燒壞馬達，正尋找具備大扭力、低殘粉、適合手沖與濃縮的耐用磨豆機。': '精品咖啡愛好者抱怨一般平價磨豆機遇到高密度淺焙豆經常卡豆並燒壞馬達，正尋找具備大扭力、低殘粉、適合手沖與濃縮的耐用磨豆機。',
    '用戶每天有大量線上會議需求，強烈抱怨市售藍牙耳機在戶外或微風環境下通話音質如沉船水下，尋求麥克風抗風噪與人聲收音極佳的耳機。': '用戶每天有大量線上會議需求，強烈抱怨市售藍牙耳機在戶外或微風環境下通話音質如沉船水下，尋求麥克風抗風噪與人聲收音極佳的耳機。',
    '戶外露營登山者抱怨超輕充氣睡墊翻身時如洋芋片包裝紙般吵鬧，且隔夜漏氣，急需 R 值 4 以上、重量 18oz 以下且極致靜音、不漏氣的高品質睡墊。': '戶外露營登山者抱怨超輕充氣睡墊翻身時如洋芋片包裝紙般吵鬧，且隔夜漏氣，急需 R 值 4 以上、重量 18oz 以下且極致靜音、不漏氣的高品質睡墊。'
  },
  'zh-CN': {
    '買家頻繁出差，抱怨多款行動電源在數月內電池膨脹且 USB-C 孔鬆動，急尋高耐用度、65W PD 輸出、不易過熱膨脹的長效行動電源。': '买家频繁出差，抱怨多款充电宝在数月内电池膨胀且 USB-C 接口松动，急需高耐用度、65W PD 输出、不易过热膨胀的长效充电宝。',
    '遠端工程師抱怨 Amazon 平價工學椅腰靠斷裂、座墊塌陷，不願花費 $1600 買頂級名牌，尋求 $400-$600 區間真正耐用、具備 3D 扶手與透氣網布的「甜點區」工作椅。': '远程工程师抱怨 Amazon 平价人体工学椅腰靠断裂、坐垫塌陷，不愿花费 $1600 购买顶级品牌，正在寻找 $400-$600 区间真正耐用、配备 3D 扶手与透气网布的工作椅。',
    '精品咖啡愛好者抱怨一般平價磨豆機遇到高密度淺焙豆經常卡豆並燒壞馬達，正尋找具備大扭力、低殘粉、適合手沖與濃縮的耐用磨豆機。': '精品咖啡爱好者抱怨普通平价磨豆机遇到高密度浅烘豆经常卡豆并烧坏电机，正在寻找高扭矩、低残粉、适合手冲与意式咖啡的耐用磨豆机。',
    '用戶每天有大量線上會議需求，強烈抱怨市售藍牙耳機在戶外或微風環境下通話音質如沉船水下，尋求麥克風抗風噪與人聲收音極佳的耳機。': '用户每天需要参加大量线上会议，强烈抱怨市售蓝牙耳机在户外或微风环境下通话音质像在沉船水下，正在寻找抗风噪且人声收音出色的耳机。',
    '戶外露營登山者抱怨超輕充氣睡墊翻身時如洋芋片包裝紙般吵鬧，且隔夜漏氣，急需 R 值 4 以上、重量 18oz 以下且極致靜音、不漏氣的高品質睡墊。': '户外露营登山者抱怨超轻充气睡垫翻身时像薯片包装一样吵闹，而且会隔夜漏气，急需 R 值 4 以上、重量低于 18oz、极其安静且不漏气的高品质睡垫。'
  },
  ja: {
    '買家頻繁出差，抱怨多款行動電源在數月內電池膨脹且 USB-C 孔鬆動，急尋高耐用度、65W PD 輸出、不易過熱膨脹的長效行動電源。': '出張が多い購入者から、数か月でバッテリーが膨張しUSB-Cポートが緩むという声があり、65W PD対応で過熱しにくく長持ちするモバイルバッテリーが求められています。',
    '遠端工程師抱怨 Amazon 平價工學椅腰靠斷裂、座墊塌陷，不願花費 $1600 買頂級名牌，尋求 $400-$600 區間真正耐用、具備 3D 扶手與透氣網布的「甜點區」工作椅。': 'リモートワーカーから、低価格のAmazonチェアはランバーサポートが壊れ座面がへたるという不満があり、1600ドルの高級品ではなく、3Dアームレストと通気性メッシュを備えた400〜600ドルの丈夫なチェアが求められています。',
    '精品咖啡愛好者抱怨一般平價磨豆機遇到高密度淺焙豆經常卡豆並燒壞馬達，正尋找具備大扭力、低殘粉、適合手沖與濃縮的耐用磨豆機。': 'スペシャルティコーヒー愛好家から、安価なグラインダーは高密度の浅煎り豆で詰まりモーターが焼けるという不満があり、高トルク・低残留でハンドドリップとエスプレッソに使える丈夫な機種が求められています。',
    '用戶每天有大量線上會議需求，強烈抱怨市售藍牙耳機在戶外或微風環境下通話音質如沉船水下，尋求麥克風抗風噪與人聲收音極佳的耳機。': 'オンライン会議が多い利用者から、屋外や微風時にBluetoothイヤホンの通話音質が悪いという不満があり、風切り音を抑え人の声を明瞭に拾える機種が求められています。',
    '戶外露營登山者抱怨超輕充氣睡墊翻身時如洋芋片包裝紙般吵鬧，且隔夜漏氣，急需 R 值 4 以上、重量 18oz 以下且極致靜音、不漏氣的高品質睡墊。': 'キャンプや登山をする利用者から、超軽量インフレータブルマットは寝返りで音が鳴り一晩で空気が抜けるという不満があり、R値4以上・18オンス未満で静かで漏れにくい製品が求められています。'
  },
  ko: {
    '買家頻繁出差，抱怨多款行動電源在數月內電池膨脹且 USB-C 孔鬆動，急尋高耐用度、65W PD 輸出、不易過熱膨脹的長效行動電源。': '출장이 잦은 구매자들은 몇 달 만에 보조배터리가 부풀고 USB-C 포트가 헐거워진다고 불평하며, 과열되지 않고 오래가는 65W PD 보조배터리를 찾고 있습니다.',
    '遠端工程師抱怨 Amazon 平價工學椅腰靠斷裂、座墊塌陷，不願花費 $1600 買頂級名牌，尋求 $400-$600 區間真正耐用、具備 3D 扶手與透氣網布的「甜點區」工作椅。': '재택 근무자들은 저가 Amazon 인체공학 의자의 요추 지지대가 부러지고 쿠션이 꺼진다고 불평하며, 1600달러 고급 브랜드 대신 3D 팔걸이와 통기성 메시를 갖춘 400~600달러대의 튼튼한 의자를 찾고 있습니다.',
    '精品咖啡愛好者抱怨一般平價磨豆機遇到高密度淺焙豆經常卡豆並燒壞馬達，正尋找具備大扭力、低殘粉、適合手沖與濃縮的耐用磨豆機。': '스페셜티 커피 애호가들은 저가 그라인더가 고밀도 라이트 로스트 원두에서 자주 막히고 모터가 타버린다고 말하며, 높은 토크와 낮은 잔량으로 핸드드립과 에스프레소에 모두 적합한 내구성 제품을 찾고 있습니다.',
    '用戶每天有大量線上會議需求，強烈抱怨市售藍牙耳機在戶外或微風環境下通話音質如沉船水下，尋求麥克風抗風噪與人聲收音極佳的耳機。': '온라인 회의가 잦은 사용자들은 야외나 약한 바람에서 시중 Bluetooth 이어버드의 통화 음질이 나쁘다고 불평하며, 바람 소리를 줄이고 목소리를 선명하게 잡는 제품을 찾고 있습니다.',
    '戶外露營登山者抱怨超輕充氣睡墊翻身時如洋芋片包裝紙般吵鬧，且隔夜漏氣，急需 R 值 4 以上、重量 18oz 以下且極致靜音、不漏氣的高品質睡墊。': '캠핑과 하이킹 이용자들은 초경량 에어 매트가 뒤척일 때 바스락거리고 밤새 공기가 빠진다고 불평하며, R값 4 이상·18온스 미만의 조용하고 누수에 강한 제품을 찾고 있습니다.'
  },
  ms: {
    '買家頻繁出差，抱怨多款行動電源在數月內電池膨脹且 USB-C 孔鬆動，急尋高耐用度、65W PD 輸出、不易過熱膨脹的長效行動電源。': 'Pembeli yang kerap melakukan perjalanan kerja mendapati bateri mudah alih mengembung dan port USB-C longgar dalam beberapa bulan; mereka memerlukan power bank 65W PD yang tahan lama, tidak mudah panas dan boleh dipercayai.',
    '遠端工程師抱怨 Amazon 平價工學椅腰靠斷裂、座墊塌陷，不願花費 $1600 買頂級名牌，尋求 $400-$600 區間真正耐用、具備 3D 扶手與透氣網布的「甜點區」工作椅。': 'Jurutera jarak jauh mengadu sokongan lumbar kerusi Amazon murah mudah patah dan kusyen mendap; mereka mencari kerusi kerja $400-$600 yang tahan lama dengan tempat letak tangan 3D dan jejaring bernafas, bukan jenama premium $1,600.',
    '精品咖啡愛好者抱怨一般平價磨豆機遇到高密度淺焙豆經常卡豆並燒壞馬達，正尋找具備大扭力、低殘粉、適合手沖與濃縮的耐用磨豆機。': 'Peminat kopi istimewa mengadu pengisar murah kerap tersumbat pada biji sangai cerah yang padat dan motor terbakar; mereka memerlukan pengisar tahan lama dengan tork tinggi, sisa rendah serta sesuai untuk pour-over dan espresso.',
    '用戶每天有大量線上會議需求，強烈抱怨市售藍牙耳機在戶外或微風環境下通話音質如沉船水下，尋求麥克風抗風噪與人聲收音極佳的耳機。': 'Pengguna yang kerap menghadiri mesyuarat dalam talian mengadu kualiti panggilan fon telinga Bluetooth buruk di luar atau ketika angin perlahan; mereka memerlukan penolakan hingar angin dan tangkapan suara yang jelas.',
    '戶外露營登山者抱怨超輕充氣睡墊翻身時如洋芋片包裝紙般吵鬧，且隔夜漏氣，急需 R 值 4 以上、重量 18oz 以下且極致靜音、不漏氣的高品質睡墊。': 'Pengguna perkhemahan dan mendaki mengadu alas tidur tiup ultraringan berkeriut kuat apabila berpusing dan kehilangan angin semalaman; mereka memerlukan alas yang senyap, tidak mudah bocor, bernilai R melebihi 4 dan berat di bawah 18 oz.'
  },
  id: {
    '買家頻繁出差，抱怨多款行動電源在數月內電池膨脹且 USB-C 孔鬆動，急尋高耐用度、65W PD 輸出、不易過熱膨脹的長效行動電源。': 'Pembeli yang sering bepergian untuk urusan kerja mengeluhkan baterai power bank menggembung dan port USB-C longgar dalam beberapa bulan; mereka membutuhkan power bank 65W PD yang tahan lama, tidak mudah panas, dan andal.',
    '遠端工程師抱怨 Amazon 平價工學椅腰靠斷裂、座墊塌陷，不願花費 $1600 買頂級名牌，尋求 $400-$600 區間真正耐用、具備 3D 扶手與透氣網布的「甜點區」工作椅。': 'Pekerja jarak jauh mengeluhkan penyangga lumbar kursi Amazon murah patah dan bantalan kempis; mereka mencari kursi kerja $400-$600 yang tahan lama dengan sandaran tangan 3D dan jaring bernapas, bukan merek premium $1.600.',
    '精品咖啡愛好者抱怨一般平價磨豆機遇到高密度淺焙豆經常卡豆並燒壞馬達，正尋找具備大扭力、低殘粉、適合手沖與濃縮的耐用磨豆機。': 'Pecinta kopi spesialti mengeluhkan grinder murah sering macet pada biji sangrai ringan yang padat dan motornya terbakar; mereka mencari grinder tahan lama dengan torsi tinggi, retensi rendah, serta cocok untuk pour-over dan espresso.',
    '用戶每天有大量線上會議需求，強烈抱怨市售藍牙耳機在戶外或微風環境下通話音質如沉船水下，尋求麥克風抗風噪與人聲收音極佳的耳機。': 'Pengguna yang sering rapat daring mengeluhkan kualitas panggilan earbud Bluetooth buruk di luar ruangan atau angin ringan; mereka membutuhkan peredaman suara angin dan tangkapan suara yang jernih.',
    '戶外露營登山者抱怨超輕充氣睡墊翻身時如洋芋片包裝紙般吵鬧，且隔夜漏氣，急需 R 值 4 以上、重量 18oz 以下且極致靜音、不漏氣的高品質睡墊。': 'Pengguna berkemah dan mendaki mengeluhkan alas tidur tiup ultraringan berisik saat berbalik dan bocor semalaman; mereka membutuhkan alas yang senyap, tahan bocor, bernilai R di atas 4, dan berbobot di bawah 18 oz.'
  },
  vi: {
    '買家頻繁出差，抱怨多款行動電源在數月內電池膨脹且 USB-C 孔鬆動，急尋高耐用度、65W PD 輸出、不易過熱膨脹的長效行動電源。': 'Người mua thường xuyên đi công tác phàn nàn pin sạc dự phòng phồng lên và cổng USB-C lỏng chỉ sau vài tháng; họ cần pin 65W PD bền, ít nóng và đáng tin cậy.',
    '遠端工程師抱怨 Amazon 平價工學椅腰靠斷裂、座墊塌陷，不願花費 $1600 買頂級名牌，尋求 $400-$600 區間真正耐用、具備 3D 扶手與透氣網布的「甜點區」工作椅。': 'Kỹ sư làm việc từ xa phàn nàn ghế công thái học giá rẻ trên Amazon bị gãy đỡ lưng và xẹp đệm; họ muốn một ghế làm việc bền trong tầm $400-$600 với tay vịn 3D và lưới thoáng, thay vì thương hiệu cao cấp $1.600.',
    '精品咖啡愛好者抱怨一般平價磨豆機遇到高密度淺焙豆經常卡豆並燒壞馬達，正尋找具備大扭力、低殘粉、適合手沖與濃縮的耐用磨豆機。': 'Người yêu cà phê đặc sản phàn nàn máy xay giá rẻ thường kẹt với hạt rang sáng mật độ cao và cháy động cơ; họ cần máy xay bền, mô-men xoắn cao, ít lưu bột, phù hợp cho pour-over và espresso.',
    '用戶每天有大量線上會議需求，強烈抱怨市售藍牙耳機在戶外或微風環境下通話音質如沉船水下，尋求麥克風抗風噪與人聲收音極佳的耳機。': 'Người thường xuyên họp trực tuyến phàn nàn chất lượng cuộc gọi của tai nghe Bluetooth kém khi ở ngoài trời hoặc có gió nhẹ; họ cần khả năng giảm tiếng gió và thu giọng nói rõ ràng.',
    '戶外露營登山者抱怨超輕充氣睡墊翻身時如洋芋片包裝紙般吵鬧，且隔夜漏氣，急需 R 值 4 以上、重量 18oz 以下且極致靜音、不漏氣的高品質睡墊。': 'Người cắm trại và đi bộ đường dài phàn nàn đệm ngủ bơm hơi siêu nhẹ kêu sột soạt khi trở mình và xì hơi qua đêm; họ cần đệm yên tĩnh, chống rò rỉ, R-value trên 4 và nặng dưới 18 oz.'
  }
};
for (const [locale, entries] of Object.entries(painpointSummaryLocaleUi)) uiCopy[locale] = { ...(uiCopy[locale] || {}), ...entries };

const copyFeedbackLocaleUi = {
  en: { '已複製！': 'Copied!', '複製失敗，請手動複製。': 'Copy failed. Please copy manually.' },
  'zh-TW': { '已複製！': '已複製！', '複製失敗，請手動複製。': '複製失敗，請手動複製。' },
  'zh-CN': { '已複製！': '已复制！', '複製失敗，請手動複製。': '复制失败，请手动复制。' },
  ja: { '已複製！': 'コピーしました！', '複製失敗，請手動複製。': 'コピーに失敗しました。手動でコピーしてください。' },
  ko: { '已複製！': '복사됨!', '複製失敗，請手動複製。': '복사에 실패했습니다. 직접 복사해 주세요.' },
  ms: { '已複製！': 'Disalin!', '複製失敗，請手動複製。': 'Salinan gagal. Sila salin secara manual.' },
  id: { '已複製！': 'Tersalin!', '複製失敗，請手動複製。': 'Penyalinan gagal. Silakan salin secara manual.' },
  vi: { '已複製！': 'Đã sao chép!', '複製失敗，請手動複製。': 'Sao chép thất bại. Vui lòng sao chép thủ công.' }
};
for (const [locale, entries] of Object.entries(copyFeedbackLocaleUi)) uiCopy[locale] = { ...(uiCopy[locale] || {}), ...entries };

function translateText(value, dictionary, locale) {
  const exact = dictionary[value] || (locale === 'en' ? uiCopy.en[value] : undefined);
  if (exact) return exact;
  const entries = Object.entries(dictionary)
    .concat(locale === 'en' ? Object.entries(uiCopy.en) : [])
    .filter(([source]) => source && value.includes(source))
    .sort((a, b) => b[0].length - a[0].length);
  let translated = value;
  for (const [source, target] of entries) translated = translated.split(source).join(target);
  return translated;
}

function getTranslation(key, locale = (typeof document !== 'undefined' ? document.documentElement.lang : 'en'), fallback = key) {
  const normalized = normalize(locale);
  const dictionary = uiCopy[normalized] || uiCopy.en;
  const value = translateText(String(key), dictionary, normalized);
  return value === key ? fallback : value;
}

function translateUi(locale, root = document) {
  root.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = getTranslation(element.dataset.i18n, locale, element.textContent);
    element.textContent = value;
  });
  root.querySelectorAll('[data-i18n-placeholder], [data-i18n-title], [data-i18n-aria-label]').forEach((element) => {
    for (const [attribute, datasetKey] of [['placeholder', 'i18nPlaceholder'], ['title', 'i18nTitle'], ['aria-label', 'i18nAriaLabel']]) {
      const key = element.dataset[datasetKey];
      if (key) element.setAttribute(attribute, getTranslation(key, locale, element.getAttribute(attribute) || key));
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

if (typeof window !== 'undefined') {
  window.amzI18n = {
    setAccountLocale,
    translateUi,
    t: (key, fallback = key, locale = (typeof document !== 'undefined' ? document.documentElement.lang : 'en')) => getTranslation(key, locale, fallback),
  };
}

if (typeof document !== 'undefined') {
  bootstrapLegacyI18n();
}
