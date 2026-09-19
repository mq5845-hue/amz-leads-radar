import { pathToFileURL } from 'node:url';

const REQUIREMENTS = [
  { name: 'VITE_SUPABASE_URL', scope: 'browser auth' },
  { name: 'VITE_SUPABASE_ANON_KEY', scope: 'browser auth' },
  { name: 'SUPABASE_URL', scope: 'protected API' },
  { name: 'SUPABASE_ANON_KEY', scope: 'protected API' },
  { name: 'OPENAI_API_KEY', scope: 'protected API provider' },
  { name: 'SUPABASE_SERVICE_ROLE_KEY', scope: 'ingestion worker' },
  { name: 'GEMINI_API_KEY', scope: 'ingestion worker' },
];

function isPresent(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

export function checkEnvironment(env = process.env) {
  const missing = REQUIREMENTS.filter(({ name }) => !isPresent(env[name]));
  const invalid = [];

  for (const name of ['VITE_SUPABASE_URL', 'SUPABASE_URL']) {
    if (isPresent(env[name]) && !isHttpsUrl(env[name])) invalid.push({ name, reason: 'must be an HTTPS URL' });
  }
  if (isPresent(env.AMZ_API_PROXY_TARGET) && !/^https?:\/\//i.test(env.AMZ_API_PROXY_TARGET.trim())) {
    invalid.push({ name: 'AMZ_API_PROXY_TARGET', reason: 'must start with http:// or https://' });
  }

  return { missing, invalid };
}

export function formatReport(result) {
  if (result.missing.length === 0 && result.invalid.length === 0) {
    return 'Live preflight PASS: required environment variables are present; no secret values were printed.';
  }

  const lines = ['Live preflight BLOCKED: configuration is incomplete or invalid.'];
  if (result.missing.length > 0) {
    lines.push('Missing required environment variables:');
    for (const item of result.missing) lines.push(`- ${item.name} (${item.scope})`);
  }
  if (result.invalid.length > 0) {
    lines.push('Invalid environment variables:');
    for (const item of result.invalid) lines.push(`- ${item.name}: ${item.reason}`);
  }
  lines.push('No secret values are displayed. Configure the variables, then rerun this command.');
  return lines.join('\n');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = checkEnvironment();
  console.log(formatReport(result));
  process.exitCode = result.missing.length || result.invalid.length ? 1 : 0;
}
