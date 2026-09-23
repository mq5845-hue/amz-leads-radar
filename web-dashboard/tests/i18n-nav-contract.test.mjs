import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const dashboardRoot = path.resolve(import.meta.dirname, '..');
const indexHtml = fs.readFileSync(path.join(dashboardRoot, 'index.html'), 'utf8');

test('dashboard exposes the multilingual navigation menu', () => {
  assert.match(indexHtml, /id="locale-menu"/);
  assert.match(indexHtml, /data-lucide="globe-2"/);
  assert.match(indexHtml, /src="\/i18n\/nav-locale\.mjs"/);

  for (const locale of ['en', 'zh-TW', 'zh-CN', 'ja', 'ko', 'ms', 'id', 'vi']) {
    assert.match(indexHtml, new RegExp(`data-locale="${locale}"`));
  }
});

test('localized entrypoints exist for every supported navigation locale', () => {
  for (const locale of ['en', 'zh-TW', 'zh-CN', 'ja', 'ko', 'ms', 'id', 'vi']) {
    const entrypoint = path.join(dashboardRoot, 'public', locale, 'index.html');
    assert.equal(fs.existsSync(entrypoint), true, `${locale} entrypoint is missing`);
  }
});
