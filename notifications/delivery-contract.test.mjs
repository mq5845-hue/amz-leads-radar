import test from 'node:test';
import assert from 'node:assert/strict';
import { createDeliverySnapshot, renderLocalizedTemplate } from './delivery-contract.mjs';

test('renders a localized template with interpolation values', () => {
  const result = renderLocalizedTemplate({
    subject: 'Review draft ready for {{brand}}',
    body: 'Open {{count}} new draft(s) before {{date}}.',
  }, { brand: 'ApexGear', count: 2, date: '2026-09-22' });
  assert.deepEqual(result, {
    subject: 'Review draft ready for ApexGear',
    body: 'Open 2 new draft(s) before 2026-09-22.',
  });
});

test('creates an immutable send-time snapshot', () => {
  const snapshot = createDeliverySnapshot({
    userId: 'user-1',
    templateKey: 'review-draft-ready',
    templateVersion: 3,
    locale: 'ja',
    timezone: 'Asia/Tokyo',
    marketplace: 'JP',
    sentAt: '2026-09-22T10:00:00.000Z',
  });
  assert.deepEqual(snapshot, {
    userId: 'user-1',
    templateKey: 'review-draft-ready',
    templateVersion: 3,
    locale: 'ja',
    timezone: 'Asia/Tokyo',
    marketplace: 'JP',
    sentAt: '2026-09-22T10:00:00.000Z',
  });
});

test('rejects snapshots without a supported locale or template version', () => {
  assert.throws(() => createDeliverySnapshot({ userId: 'u', templateKey: 'x', templateVersion: 0, locale: 'fr', timezone: 'UTC', marketplace: 'US' }), /locale|templateVersion/i);
});
