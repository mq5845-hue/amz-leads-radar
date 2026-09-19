import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';

const repoRoot = resolve(import.meta.dirname, '..');
const ciWorkflowPath = resolve(repoRoot, '.github', 'workflows', 'ci.yml');
const liveWorkflowPath = resolve(repoRoot, '.github', 'workflows', 'live-smoke.yml');

function readWorkflow(pathname) {
  assert.equal(existsSync(pathname), true, `workflow is missing: ${pathname}`);
  return readFileSync(pathname, 'utf8');
}

test('fast CI runs the complete local contract and build gate', () => {
  const workflow = readWorkflow(ciWorkflowPath);

  assert.match(workflow, /on:\s*[\s\S]*push:/);
  assert.match(workflow, /on:\s*[\s\S]*pull_request:/);
  assert.match(workflow, /permissions:\s*\n\s+contents:\s+read/);
  assert.match(workflow, /working-directory:\s*web-dashboard/);
  assert.match(workflow, /npm ci --no-audit --no-fund/);
  assert.match(workflow, /node --test/);
  assert.match(workflow, /npm run build/);
  assert.match(workflow, /npx tsc --noEmit/);
  assert.match(workflow, /npm audit --audit-level=moderate/);
});

test('live smoke is isolated, secret-backed, and opt-in to quota mutation', () => {
  const workflow = readWorkflow(liveWorkflowPath);

  assert.match(workflow, /workflow_dispatch:/);
  assert.match(workflow, /schedule:/);
  assert.match(workflow, /concurrency:/);
  assert.match(workflow, /AMZ_SMOKE_SUPABASE_URL/);
  assert.match(workflow, /AMZ_SMOKE_SUPABASE_ANON_KEY/);
  assert.match(workflow, /AMZ_SMOKE_EMAIL/);
  assert.match(workflow, /AMZ_SMOKE_PASSWORD/);
  assert.match(workflow, /AMZ_SMOKE_ALLOW_QUOTA_DECREMENT/);
  assert.match(workflow, /AMZ_SMOKE_RUN_PRODUCTION_API/);
  assert.match(workflow, /npm run test:live-auth/);
  assert.match(workflow, /needs\.config\.outputs\.configured/);
  assert.doesNotMatch(workflow, /jgdrmgedxcavjmvmhlnv/);
});
