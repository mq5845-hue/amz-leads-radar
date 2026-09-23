const supportedLocales = ['en', 'zh-TW', 'zh-CN', 'ja', 'ko', 'ms', 'id', 'vi'];
const labels = {
  en: 'English',
  'zh-TW': '繁體中文',
  'zh-CN': '简体中文',
  ja: '日本語',
  ko: '한국어',
  ms: 'Bahasa Melayu',
  id: 'Bahasa Indonesia',
  vi: 'Tiếng Việt',
};

function normalizeLocale(value) {
  return supportedLocales.includes(value) ? value : 'en';
}

function localeFromLocation() {
  const queryLocale = new URLSearchParams(window.location.search).get('lang');
  if (queryLocale) return normalizeLocale(queryLocale);

  const pathLocale = window.location.pathname.split('/').filter(Boolean)[0];
  if (pathLocale) return normalizeLocale(pathLocale);

  return normalizeLocale(document.documentElement.lang);
}

function localePath(locale) {
  return `/${locale}/`;
}

function closeMenu(menu, trigger) {
  menu.classList.remove('is-open');
  trigger.setAttribute('aria-expanded', 'false');
}

function initLocaleMenu() {
  const menu = document.getElementById('locale-menu');
  const trigger = document.getElementById('locale-menu-trigger');
  const globe = document.getElementById('locale-globe-toggle');
  if (!menu || !trigger || !globe) return;

  const locale = localeFromLocation();
  document.documentElement.lang = locale;
  trigger.textContent = labels[locale];
  trigger.setAttribute('aria-label', `Current language: ${labels[locale]}`);

  globe.addEventListener('click', () => {
    const pinned = menu.classList.toggle('is-pinned');
    globe.setAttribute('aria-pressed', String(pinned));
  });

  trigger.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    trigger.setAttribute('aria-expanded', String(open));
  });

  menu.querySelectorAll('[data-locale]').forEach((option) => {
    option.addEventListener('click', () => {
      const nextLocale = normalizeLocale(option.dataset.locale);
      const nextUrl = new URL(localePath(nextLocale), window.location.origin);
      nextUrl.search = window.location.search;
      nextUrl.searchParams.delete('lang');
      nextUrl.hash = window.location.hash;
      window.location.assign(nextUrl.href);
    });
  });

  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target)) closeMenu(menu, trigger);
  });

  if (window.lucide?.createIcons) window.lucide.createIcons();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initLocaleMenu);
else initLocaleMenu();
