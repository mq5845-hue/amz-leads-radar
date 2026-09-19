import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('./server.mjs', import.meta.url), 'utf8');

test('local API server delegates review drafts to the protected dashboard handler', () => {
  assert.match(source, /web-dashboard[\\/]api[\\/]review-drafts\.mjs/);
  assert.match(source, /createReviewDraftHandler/);
  assert.doesNotMatch(source, /api\.openai\.com/);
  assert.doesNotMatch(source, /usageEventId:\s*`openai-/);
});
