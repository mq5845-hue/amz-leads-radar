export const SUPPORTED_LOCALES = ['zh-TW', 'zh-CN', 'en', 'ja', 'ko', 'ms', 'id', 'vi'];

const DEFAULT_LOCALE = 'en';
const RTL_LOCALES = new Set(['ar', 'ar-XB', 'fa', 'he', 'ur']);

function normalizeLocale(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const candidate = value.trim().replace('_', '-');
  if (SUPPORTED_LOCALES.includes(candidate)) return candidate;

  const language = candidate.split('-')[0].toLowerCase();
  return SUPPORTED_LOCALES.find((locale) => locale.toLowerCase() === language) || null;
}

export function resolveLocale({ accountLocale, urlLocale, storedLocale, browserLocales = [] } = {}) {
  const candidates = [accountLocale, urlLocale, storedLocale, ...browserLocales];
  for (const candidate of candidates) {
    const locale = normalizeLocale(candidate);
    if (locale) return locale;
  }
  return DEFAULT_LOCALE;
}

export function localeDirection(locale) {
  return RTL_LOCALES.has(locale) ? 'rtl' : 'ltr';
}

function interpolationNames(value) {
  return [...String(value).matchAll(/{{\s*([\w.-]+)\s*}}/g)]
    .map((match) => match[1])
    .sort();
}

function flattenResources(value, prefix = '') {
  const entries = [];
  for (const [key, child] of Object.entries(value || {})) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (child && typeof child === 'object' && !Array.isArray(child)) {
      entries.push(...flattenResources(child, path));
    } else {
      entries.push([path, child]);
    }
  }
  return entries;
}

export function validateResourceSet(resources) {
  const source = resources.en;
  if (!source) throw new Error('resource set must include en source');
  const sourceEntries = new Map(flattenResources(source));

  for (const locale of SUPPORTED_LOCALES) {
    if (!resources[locale]) throw new Error(`missing locale resource: ${locale}`);
    const targetEntries = new Map(flattenResources(resources[locale]));
    for (const [key, sourceValue] of sourceEntries) {
      if (!targetEntries.has(key)) throw new Error(`missing key: ${locale}.${key}`);
      const sourceInterpolations = interpolationNames(sourceValue);
      const targetInterpolations = interpolationNames(targetEntries.get(key));
      if (sourceInterpolations.join('|') !== targetInterpolations.join('|')) {
        throw new Error(`interpolation mismatch: ${locale}.${key}`);
      }
    }
  }
  return true;
}

export { normalizeLocale };
