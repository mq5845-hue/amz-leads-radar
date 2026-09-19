import assert from 'node:assert/strict';
import fs from 'node:fs';

const config = fs.readFileSync(new URL('../vite.config.ts', import.meta.url), 'utf8');
const packageJson = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

assert.match(config, /proxy\s*:\s*\{/);
assert.match(config, /['"]\/api['"]\s*:\s*\{/);
assert.match(config, /AMZ_API_PROXY_TARGET/);
assert.equal(packageJson.scripts['dev:api'], 'node ../api/server.mjs');
console.log('vite-proxy-contract: PASS');
