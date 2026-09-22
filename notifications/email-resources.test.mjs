import test from 'node:test';
import assert from 'node:assert/strict';
import { emailTemplates } from './email-resources.mjs';
import { renderLocalizedTemplate } from './delivery-contract.mjs';

const locales = ['zh-TW', 'zh-CN', 'en', 'ja', 'ko', 'ms', 'id', 'vi'];

test('provides review-draft-ready email content for all supported locales', () => {
  for (const locale of locales) {
    const template = emailTemplates[locale]?.['review-draft-ready'];
    assert.ok(template?.subject, `${locale} subject missing`);
    assert.ok(template?.body, `${locale} body missing`);
    assert.equal(template.version, 1);
    const rendered = renderLocalizedTemplate(template, { brand: 'ApexGear', count: 2 });
    assert.ok(!rendered.subject.includes('{{'));
    assert.ok(!rendered.body.includes('{{'));
  }
});

test('keeps email content separate from user-generated review and AI draft text', () => {
  for (const locale of locales) {
    const serialized = JSON.stringify(emailTemplates[locale]);
    assert.equal(serialized.includes('reviewText'), false);
    assert.equal(serialized.includes('aiDraft'), false);
  }
});
