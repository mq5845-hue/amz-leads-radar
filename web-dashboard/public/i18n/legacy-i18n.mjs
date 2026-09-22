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
    '支援自訂': 'Custom support', '設定同步失敗，已保留本機設定。': 'Sync failed; local settings were kept.'
  },
  'zh-CN': { '今日回覆額度:': '今日回复额度：', '今日即時數據已同步 • 5 篇高潛力站外商機': '实时数据已同步 • 5 个高潜力商机', '所有 Subreddits': '所有 Subreddits', '所有品類': '所有品类', '匹配度:': '匹配度：', '不限': '不限', '店鋪設定': '店铺设置', '登入': '登录', '升級 Pro 專業版': '升级 Pro 专业版', '重設所有篩選': '重置所有筛选' },
  ja: { '今日回覆額度:': '本日の返信枠:', '所有 Subreddits': 'すべてのSubreddit', '所有品類': 'すべてのカテゴリ', '匹配度:': '一致度:', '不限': '指定なし', '店鋪設定': '店舗設定', '登入': 'ログイン', '升級 Pro 專業版': 'Proにアップグレード', '重設所有篩選': 'すべてのフィルターをリセット' },
  ko: { '今日回覆額度:': '오늘 답변 한도:', '所有 Subreddits': '모든 Subreddit', '所有品類': '모든 카테고리', '匹配度:': '일치도:', '不限': '제한 없음', '店鋪設定': '스토어 설정', '登入': '로그인', '升級 Pro 專業版': 'Pro로 업그레이드', '重設所有篩選': '모든 필터 초기화' },
  ms: { '今日回覆額度:': 'Kuota balasan harian:', '所有 Subreddits': 'Semua Subreddit', '所有品類': 'Semua kategori', '匹配度:': 'Padanan:', '不限': 'Semua', '店鋪設定': 'Tetapan kedai', '登入': 'Log masuk', '升級 Pro 專業版': 'Naik taraf ke Pro', '重設所有篩選': 'Tetapkan semula semua penapis' },
  id: { '今日回覆額度:': 'Kuota balasan hari ini:', '所有 Subreddits': 'Semua Subreddit', '所有品類': 'Semua kategori', '匹配度:': 'Kecocokan:', '不限': 'Semua', '店鋪設定': 'Pengaturan toko', '登入': 'Masuk', '升級 Pro 專業版': 'Tingkatkan ke Pro', '重設所有篩選': 'Atur ulang semua filter' },
  vi: { '今日回覆額度:': 'Hạn mức trả lời hôm nay:', '所有 Subreddits': 'Tất cả Subreddit', '所有品類': 'Tất cả danh mục', '匹配度:': 'Độ khớp:', '不限': 'Tất cả', '店鋪設定': 'Cài đặt cửa hàng', '登入': 'Đăng nhập', '升級 Pro 專業版': 'Nâng cấp Pro', '重設所有篩選': 'Đặt lại tất cả bộ lọc' },
  'zh-TW': {}
};
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
    const value = dictionary[key] || uiCopy.en[key];
    if (value) node.nodeValue = node.nodeValue.replace(key, value);
  }
  const placeholderMap = { '搜尋標題、痛點摘要或關鍵字 (例如: battery, coffee, chair)...': dictionary['搜尋標題、痛點摘要或關鍵字 (例如: battery, coffee, chair)...'] || uiCopy.en['搜尋標題、痛點摘要或關鍵字 (例如: battery, coffee, chair)...'] };
  root.querySelectorAll('[placeholder]').forEach((element) => { if (placeholderMap[element.placeholder]) element.placeholder = placeholderMap[element.placeholder]; });
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
  setupLocaleSelector(locale);
  return locale;
}

export function setAccountLocale(locale, root = document) {
  const normalized = normalize(locale);
  document.documentElement.lang = normalized;
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
  setupLocaleSelector(normalized);
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
  options.forEach((option) => option.addEventListener('click', () => {
    select.value = option.dataset.locale;
    select.dispatchEvent(new Event('change', { bubbles: true }));
    menu?.classList.remove('is-open');
    menu?.classList.remove('is-pinned', 'is-collapsed');
    globeToggle?.setAttribute('aria-pressed', 'false');
    trigger?.setAttribute('aria-expanded', 'false');
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
    menu.classList.remove('is-collapsed');
    if (!menu.classList.contains('is-pinned')) menu.classList.add('is-open');
    trigger?.setAttribute('aria-expanded', 'true');
  });
  menu?.addEventListener('mouseleave', () => {
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
