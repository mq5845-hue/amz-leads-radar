import test from 'node:test';
import assert from 'node:assert/strict';
import { buildEmailDelivery } from './delivery-service.mjs';

test('builds a localized email delivery record from profile preferences', () => {
  const result = buildEmailDelivery({
    profile: { id: 'user-1', locale: 'ja', timezone: 'Asia/Tokyo' },
    marketplace: 'JP',
    templateKey: 'review-draft-ready',
    templateVersion: 1,
    params: { brand: 'ApexGear', count: 2 },
    sentAt: '2026-09-22T10:00:00.000Z',
  });
  assert.deepEqual(result, {
    snapshot: {
      userId: 'user-1', templateKey: 'review-draft-ready', templateVersion: 1,
      locale: 'ja', timezone: 'Asia/Tokyo', marketplace: 'JP',
      sentAt: '2026-09-22T10:00:00.000Z'
    },
    message: {
      subject: 'ApexGearの新しいレビュー下書きがあります',
      body: 'AMZ Leads Radarに確認待ちのレビュー下書きが2件あります。'
    }
  });
});

test('uses product defaults when an older profile has no locale or timezone', () => {
  const result = buildEmailDelivery({
    profile: { id: 'user-2' }, marketplace: 'US', templateKey: 'review-draft-ready',
    templateVersion: 1, params: { brand: 'Brand', count: 1 }, sentAt: '2026-09-22T10:00:00.000Z'
  });
  assert.equal(result.snapshot.locale, 'en');
  assert.equal(result.snapshot.timezone, 'UTC');
});
