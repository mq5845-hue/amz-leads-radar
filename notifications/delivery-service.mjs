import { createDeliverySnapshot, renderLocalizedTemplate } from './delivery-contract.mjs';
import { emailTemplates } from './email-resources.mjs';

export function buildEmailDelivery({ profile, marketplace, templateKey, templateVersion, params, sentAt }) {
  const locale = profile.locale || 'en';
  const timezone = profile.timezone || 'UTC';
  const template = emailTemplates[locale]?.[templateKey];
  if (!template) throw new Error(`email template unavailable: ${locale}/${templateKey}`);
  if (template.version !== templateVersion) throw new Error('email template version mismatch');
  return {
    snapshot: createDeliverySnapshot({ userId: profile.id, templateKey, templateVersion, locale, timezone, marketplace, sentAt }),
    message: renderLocalizedTemplate(template, params),
  };
}
