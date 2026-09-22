import test from 'node:test';
import assert from 'node:assert/strict';
import { createTranslator, applyDocumentLocale } from './translation-runtime.mjs';
import { resources } from './locale-resources.mjs';

test('translates a nested key and interpolates values', () => {
  const t = createTranslator(resources, 'zh-TW');
  assert.equal(t('dashboard.quota.remaining', { count: 4 }), '剩餘 4 次產生額度');
});

test('falls back to English when a target translation is missing', () => {
  const t = createTranslator({ en: { common: { greeting: 'Hello' } }, 'zh-TW': { common: {} } }, 'zh-TW');
  assert.equal(t('common.greeting'), 'Hello');
});

test('returns the key when no translation exists', () => {
  const t = createTranslator(resources, 'en');
  assert.equal(t('dashboard.notDefined'), 'dashboard.notDefined');
});

test('updates document language and direction without requiring a browser at import time', () => {
  const root = { documentElement: {} };
  applyDocumentLocale(root, 'ar-XB');
  assert.deepEqual(root.documentElement, { lang: 'ar-XB', dir: 'rtl' });
});
