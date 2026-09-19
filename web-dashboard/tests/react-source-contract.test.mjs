import assert from 'node:assert/strict';
import fs from 'node:fs';

const app = fs.readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const detail = fs.readFileSync(new URL('../src/components/LeadDetailModal.tsx', import.meta.url), 'utf8');
const settings = fs.readFileSync(new URL('../src/components/SettingsModal.tsx', import.meta.url), 'utf8');

assert.match(app, /daily_usage_left\s*<=\s*0/);
assert.match(app, /targetUrl\.protocol\s*!==\s*['"]https:['"]/);
assert.match(app, /hostname\s*!==\s*['"]reddit\.com['"]/);
assert.match(app, /window\.open\(targetUrl\.toString\(\),\s*['_"]_blank['"],\s*['_"]noopener,noreferrer['_"]\)/);
assert.match(detail, /const \[activeTone/);
assert.match(detail, /if \(!lead\) return null/);
assert.match(settings, /useEffect/);
assert.match(settings, /if \(!isOpen\) return null/);
console.log('react-source-contract: PASS');
