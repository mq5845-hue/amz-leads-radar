import { resources } from '../i18n/locale-resources.mjs';
import { SUPPORTED_LOCALES } from '../i18n/locale-contract.mjs';
import { validateResourceSet } from '../i18n/locale-contract.mjs';
import { emailTemplates } from '../notifications/email-resources.mjs';

const apiErrorCodes = [
  'ROUTE_NOT_FOUND', 'UNSUPPORTED_REVIEW_INPUT', 'REQUEST_ID_REQUIRED',
  'AI_PROVIDER_FAILED', 'AI_EMPTY_RESPONSE', 'AI_UNSAFE_RESPONSE',
  'AUTHENTICATED_SESSION_REQUIRED', 'REVIEW_GENERATION_QUOTA_REJECTED',
  'SUPABASE_QUOTA_CHECK_FAILED', 'INVALID_JSON'
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

validateResourceSet(resources);
for (const locale of SUPPORTED_LOCALES) {
  const template = emailTemplates[locale]?.['review-draft-ready'];
  assert(template?.version === 1, `missing email template version: ${locale}`);
  assert(template.subject && template.body, `missing email template content: ${locale}`);
  for (const code of apiErrorCodes) {
    assert(resources[locale].errors?.[code], `missing API error translation: ${locale}.${code}`);
  }
}

console.log(`i18n contract PASS: ${SUPPORTED_LOCALES.length} locales, ${apiErrorCodes.length} API errors, review-draft-ready email v1`);
