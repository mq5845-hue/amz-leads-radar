import assert from 'node:assert/strict';
import { checkEnvironment, formatReport } from './live-preflight.mjs';

const complete = {
  VITE_SUPABASE_URL: 'https://example.supabase.co',
  VITE_SUPABASE_ANON_KEY: 'anon-placeholder',
  SUPABASE_URL: 'https://example.supabase.co',
  SUPABASE_ANON_KEY: 'anon-placeholder',
  OPENAI_API_KEY: 'openai-placeholder',
  SUPABASE_SERVICE_ROLE_KEY: 'service-placeholder',
  GEMINI_API_KEY: 'gemini-placeholder',
};

assert.deepEqual(checkEnvironment(complete).missing, []);

const incomplete = checkEnvironment({
  OPENAI_API_KEY: 'sk-this-must-never-be-printed',
});
assert.deepEqual(incomplete.missing.map((item) => item.name), [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'GEMINI_API_KEY',
]);
assert.match(formatReport(incomplete), /Missing required environment variables/);
assert.doesNotMatch(formatReport(incomplete), /sk-this-must-never-be-printed/);
console.log('live-preflight: PASS');
