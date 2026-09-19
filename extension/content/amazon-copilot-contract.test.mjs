import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('./amazon-copilot.js', import.meta.url), 'utf8');

assert.match(source, /reviewFingerprint:\s*review\.reviewId\s*\|\|\s*review\.asin\s*\|\|\s*requestId/);
assert.match(source, /\brequestId\b/);
console.log('amazon-copilot-contract: PASS');
