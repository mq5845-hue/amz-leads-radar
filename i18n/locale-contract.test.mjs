import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SUPPORTED_LOCALES,
  resolveLocale,
  localeDirection,
  validateResourceSet,
} from './locale-contract.mjs';

test('exposes the eight product locales with English as the default', () => {
  assert.deepEqual(SUPPORTED_LOCALES, ['zh-TW', 'zh-CN', 'en', 'ja', 'ko', 'ms', 'id', 'vi']);
  assert.equal(resolveLocale({}), 'en');
});

test('uses account locale over URL, storage, and browser locale', () => {
  assert.equal(resolveLocale({ accountLocale: 'ja', urlLocale: 'zh-TW', storedLocale: 'ko', browserLocales: ['vi'] }), 'ja');
});

test('uses URL before storage and browser for anonymous visitors', () => {
  assert.equal(resolveLocale({ urlLocale: 'ja', storedLocale: 'ko', browserLocales: ['vi'] }), 'ja');
  assert.equal(resolveLocale({ storedLocale: 'ko', browserLocales: ['vi'] }), 'ko');
  assert.equal(resolveLocale({ browserLocales: ['vi-VN'] }), 'vi');
});

test('normalizes unsupported or regional browser locales to a supported locale', () => {
  assert.equal(resolveLocale({ browserLocales: ['zh-HK', 'en-US'] }), 'en');
  assert.equal(resolveLocale({ browserLocales: ['zh-CN'] }), 'zh-CN');
});

test('reports direction for future RTL resources without changing product locales', () => {
  assert.equal(localeDirection('en'), 'ltr');
  assert.equal(localeDirection('ar-XB'), 'rtl');
});

test('rejects missing keys and interpolation mismatches across resources', () => {
  assert.throws(
    () => validateResourceSet({
      en: { common: { greeting: 'Hi {{name}}' } },
      'zh-TW': { common: {} },
    }),
    /missing key.*common\.greeting/i,
  );
  assert.throws(
    () => validateResourceSet({
      en: { common: { greeting: 'Hi {{name}}' } },
      'zh-TW': { common: { greeting: '嗨' } },
    }),
    /interpolation/i,
  );
});
