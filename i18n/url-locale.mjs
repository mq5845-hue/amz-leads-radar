export const URL_LOCALES = ['zh-TW', 'zh-CN', 'en', 'ja', 'ko', 'ms', 'id', 'vi'];

export function resolvePathLocale(pathname) {
  const segments = String(pathname || '/').split('/').filter(Boolean);
  const locale = URL_LOCALES.includes(segments[0]) ? segments.shift() : null;
  return { locale, pathname: `/${segments.join('/')}${segments.length ? '' : ''}`.replace(/\/$/, segments.length ? '' : '/') };
}

export function pathWithLocale(pathname, locale) {
  const resolved = resolvePathLocale(pathname);
  const suffix = resolved.pathname === '/' ? '/' : resolved.pathname;
  return `/${locale}${suffix}`;
}
