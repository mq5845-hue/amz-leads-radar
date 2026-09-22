/**
 * AMZ Leads Radar - Extension Popup Script
 */

document.addEventListener('DOMContentLoaded', () => {
  const btnOpenDashboard = document.getElementById('btn-open-dashboard');
  const btnUpgrade = document.getElementById('btn-upgrade');
  const quotaCount = document.getElementById('quota-count');
  const progressFill = document.getElementById('progress-fill');
  const planTag = document.getElementById('plan-tag');
  const localeSelect = document.getElementById('locale-select');
  const locales = ['zh-TW', 'zh-CN', 'en', 'ja', 'ko', 'ms', 'id', 'vi'];
  const copy = {
    en: { brandSub: 'Off-Amazon growth Copilot', running: '🟢 Running', freePlan: 'Free plan', dailyQuota: 'Daily assisted-fill quota', openDashboard: '🚀 Open Web Dashboard', upgrade: '👑 Upgrade to Pro (Unlimited)', howTo: 'How it works:' },
    'zh-TW': { brandSub: '跨境電商站外引流 Copilot', running: '🟢 運行中', freePlan: 'Free 體驗方案', dailyQuota: '今日輔助填入額度', openDashboard: '🚀 開啟 Web 線索看板 (Dashboard)', upgrade: '👑 升級 Pro 專業版 (無限解鎖)', howTo: '使用方式：' },
    'zh-CN': { brandSub: '跨境电商站外引流 Copilot', running: '🟢 运行中', freePlan: 'Free 体验方案', dailyQuota: '今日辅助填入额度', openDashboard: '🚀 打开 Web 线索看板 (Dashboard)', upgrade: '👑 升级 Pro 专业版 (无限解锁)', howTo: '使用方式：' },
    ja: { brandSub: 'Amazon外部成長 Copilot', running: '🟢 実行中', freePlan: 'Freeプラン', dailyQuota: '本日の入力サポート上限', openDashboard: '🚀 Webダッシュボードを開く', upgrade: '👑 Proにアップグレード（無制限）', howTo: '使い方：' },
    ko: { brandSub: 'Amazon 외부 성장 Copilot', running: '🟢 실행 중', freePlan: 'Free 플랜', dailyQuota: '오늘의 지원 입력 한도', openDashboard: '🚀 Web 대시보드 열기', upgrade: '👑 Pro로 업그레이드 (무제한)', howTo: '사용 방법:' },
    ms: { brandSub: 'Copilot pertumbuhan luar Amazon', running: '🟢 Berjalan', freePlan: 'Pelan percuma', dailyQuota: 'Kuota pengisian berbantu hari ini', openDashboard: '🚀 Buka Papan Pemuka Web', upgrade: '👑 Naik taraf ke Pro (Tanpa had)', howTo: 'Cara penggunaan:' },
    id: { brandSub: 'Copilot pertumbuhan di luar Amazon', running: '🟢 Berjalan', freePlan: 'Paket Free', dailyQuota: 'Kuota pengisian berbantuan hari ini', openDashboard: '🚀 Buka Dashboard Web', upgrade: '👑 Tingkatkan ke Pro (Tanpa batas)', howTo: 'Cara menggunakan:' },
    vi: { brandSub: 'Copilot tăng trưởng ngoài Amazon', running: '🟢 Đang chạy', freePlan: 'Gói miễn phí', dailyQuota: 'Hạn mức điền hỗ trợ hôm nay', openDashboard: '🚀 Mở Dashboard Web', upgrade: '👑 Nâng cấp Pro (Không giới hạn)', howTo: 'Cách sử dụng:' }
  };
  const normalizeLocale = (value) => locales.includes(value) ? value : (locales.find((locale) => locale.toLowerCase() === String(value || '').split('-')[0].toLowerCase()) || 'en');
  const applyLocale = (locale) => {
    const selected = normalizeLocale(locale);
    document.documentElement.lang = selected;
    const strings = copy[selected] || copy.en;
    document.querySelectorAll('[data-i18n]').forEach((element) => { if (strings[element.dataset.i18n]) element.textContent = strings[element.dataset.i18n]; });
    localeSelect.value = selected;
    if (typeof chrome !== 'undefined' && chrome.storage?.sync) chrome.storage.sync.set({ locale: selected });
    return selected;
  };

  const loadLocale = () => {
    const fallback = normalizeLocale(navigator.language);
    if (typeof chrome !== 'undefined' && chrome.storage?.sync) {
      chrome.storage.sync.get(['locale'], (res) => applyLocale(res.locale || fallback));
    } else applyLocale(fallback);
  };
  localeSelect.addEventListener('change', () => applyLocale(localeSelect.value));
  loadLocale();

  // Load state from chrome.storage if available
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['plan', 'usage_left', 'max_usage'], (res) => {
      if (res.plan === 'pro') {
        planTag.textContent = '👑 Pro plan';
        planTag.style.background = 'rgba(245, 158, 11, 0.2)';
        planTag.style.color = '#fbbf24';
        planTag.style.borderColor = 'rgba(245, 158, 11, 0.4)';
        quotaCount.textContent = '無限次數';
        progressFill.style.width = '100%';
        btnUpgrade.style.display = 'none';
      } else if (res.usage_left !== undefined) {
        const left = res.usage_left;
        const max = res.max_usage || 3;
        quotaCount.textContent = `${left} / ${max} 次`;
        progressFill.style.width = `${(left / max) * 100}%`;
      }
    });
  }

  // Open Web Dashboard in new tab
  btnOpenDashboard.addEventListener('click', () => {
    // Open localhost or deployed dashboard
    const dashboardUrl = 'http://localhost:3000';
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url: dashboardUrl });
    } else {
      window.open(dashboardUrl, '_blank');
    }
  });

  // Upgrade button
  btnUpgrade.addEventListener('click', () => {
    const upgradeUrl = 'http://localhost:3000#upgrade';
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url: upgradeUrl });
    } else {
      window.open(upgradeUrl, '_blank');
    }
  });
});
