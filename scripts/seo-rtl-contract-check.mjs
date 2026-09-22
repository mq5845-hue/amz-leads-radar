import fs from 'node:fs';

const dashboard = fs.readFileSync(new URL('../web-dashboard/index.html', import.meta.url), 'utf8');
const bridge = fs.readFileSync(new URL('../web-dashboard/public/i18n/legacy-i18n.mjs', import.meta.url), 'utf8');
const locales = ['zh-TW', 'zh-CN', 'en', 'ja', 'ko', 'ms', 'id', 'vi'];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(/<meta\s+name="robots"\s+content="noindex, nofollow"/i.test(dashboard), 'Dashboard must be noindex');
assert(bridge.includes('document.documentElement.lang'), 'locale bridge must set html lang');
assert(bridge.includes('document.documentElement.dir'), 'locale bridge must set html dir');
assert(bridge.includes("'ar', 'fa', 'he', 'ur'"), 'locale bridge must retain RTL direction support');
assert(/html\[dir="rtl"\]/.test(dashboard), 'Dashboard must include RTL layout rules');
for (const locale of locales) assert(bridge.includes(`'${locale}'`), `missing URL locale in legacy bridge: ${locale}`);

console.log(`SEO/RTL contract PASS: dashboard noindex, ${locales.length} locales, RTL direction support`);
