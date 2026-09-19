import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('./reddit-copilot.js', import.meta.url), 'utf8');

test('Reddit copilot escapes dashboard-controlled values before innerHTML rendering', () => {
  assert.match(source, /function escapeHtml\(value\)/);
  assert.match(source, /escapeHtml\(state\.brandName\)/);
  assert.match(source, /escapeHtml\(state\.storeUrl\)/);
  assert.match(source, /escapeHtml\(state\.draftText\)/);
});
