import { strict as assert } from 'node:assert';
import { createReviewDraftRepository, type ReviewDraftDbClient } from './review-draft-repository.ts';

const input = {
  userId: 'u1',
  asin: 'B000000001',
  reviewFingerprint: 'review-fingerprint-1',
  stars: 2,
  reviewText: 'The zipper broke.',
  brandProfileId: null,
  extraInstruction: null,
  requestId: 'req-1',
};
const output = {
  draft: 'We are sorry to hear this.',
  analysis: 'Broken zipper',
  warnings: [],
  modelVersion: 'test',
};

const calls: Array<{ name: string; params: Record<string, unknown> }> = [];
const client: ReviewDraftDbClient = {
  rpc: async (name, params) => {
    calls.push({ name, params });
    return { data: { draft_id: 'd1', usage_event_id: 'e1' }, error: null };
  },
};

const repo = createReviewDraftRepository(client);
const result = await repo.recordDraftAndUsage(input, output);
assert.deepEqual(result, { draftId: 'd1', usageEventId: 'e1' });
assert.equal(calls[0]?.name, 'record_review_draft_usage');
assert.equal(calls[0]?.params.p_user_id, 'u1');
assert.equal(calls[0]?.params.p_review_fingerprint, 'review-fingerprint-1');
assert.equal(calls[0]?.params.p_request_id, 'req-1');
assert.equal(calls[0]?.params.p_draft_text, output.draft);

const duplicateRepo = createReviewDraftRepository({
  rpc: async () => ({ data: null, error: { code: '23505', message: 'duplicate-request-id' } }),
});
await assert.rejects(() => duplicateRepo.recordDraftAndUsage(input, output), /duplicate-request-id/);

console.log('review-draft-repository: PASS');
