import test from 'node:test';
import assert from 'node:assert/strict';
import { resolvePathLocale, pathWithLocale } from './url-locale.mjs';

test('reads a supported locale from the first URL path segment', () => {
  assert.deepEqual(resolvePathLocale('/ja/dashboard'), { locale: 'ja', pathname: '/dashboard' });
  assert.deepEqual(resolvePathLocale('/dashboard'), { locale: null, pathname: '/dashboard' });
});

test('builds a canonical locale URL without duplicating locale segments', () => {
  assert.equal(pathWithLocale('/dashboard', 'en'), '/en/dashboard');
  assert.equal(pathWithLocale('/ja/dashboard', 'en'), '/en/dashboard');
  assert.equal(pathWithLocale('/', 'en'), '/en/');
});
