export const SUPPORTED_LOCALES = new Set(['zh-TW', 'zh-CN', 'en', 'ja', 'ko', 'ms', 'id', 'vi']);

function interpolate(value, params) {
  return String(value).replace(/{{\s*([\w.-]+)\s*}}/g, (_, name) => {
    if (params?.[name] === undefined) throw new Error(`missing template param: ${name}`);
    return String(params[name]);
  });
}

export function renderLocalizedTemplate(template, params = {}) {
  return {
    subject: interpolate(template.subject, params),
    body: interpolate(template.body, params),
  };
}

export function createDeliverySnapshot(input) {
  if (!SUPPORTED_LOCALES.has(input.locale)) throw new Error('unsupported delivery locale');
  if (!Number.isInteger(input.templateVersion) || input.templateVersion < 1) throw new Error('templateVersion must be a positive integer');
  for (const field of ['userId', 'templateKey', 'timezone', 'marketplace', 'sentAt']) {
    if (!String(input[field] || '').trim()) throw new Error(`missing delivery snapshot field: ${field}`);
  }
  return Object.freeze({
    userId: input.userId,
    templateKey: input.templateKey,
    templateVersion: input.templateVersion,
    locale: input.locale,
    timezone: input.timezone,
    marketplace: input.marketplace,
    sentAt: input.sentAt,
  });
}
