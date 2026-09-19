import assert from 'node:assert/strict';
import fs from 'node:fs';

const manifest = JSON.parse(fs.readFileSync(new URL('./manifest.json', import.meta.url), 'utf8'));
assert.ok(manifest.host_permissions.includes('http://localhost:8787/*'));
assert.ok(manifest.host_permissions.includes('http://127.0.0.1:8787/*'));
console.log('manifest-contract: PASS');
