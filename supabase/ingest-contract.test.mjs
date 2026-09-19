import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('./ingest-service.ts', import.meta.url), 'utf8');

test('ingestion service fails closed when server credentials are missing', () => {
  assert.match(source, /Missing required environment variable/);
  assert.doesNotMatch(source, /your-service-role-key/);
  assert.doesNotMatch(source, /your-gemini-api-key/);
  assert.doesNotMatch(source, /require\.main/);
});
