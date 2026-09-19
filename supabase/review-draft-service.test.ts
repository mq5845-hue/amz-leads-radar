import { strict as assert } from 'node:assert';
import { generateReviewDraft, type ReviewDraftRepository, type ReviewDraftInput } from './review-draft-service.ts';

const input: ReviewDraftInput = { userId: 'u1', asin: 'B000000001', stars: 2, reviewText: 'The zipper broke.', brandProfileId: null, extraInstruction: null, requestId: 'req-1' };
const calls: string[] = [];
const repo: ReviewDraftRepository = {
  findUsageEvent: async () => null,
  countUsage: async () => 0,
  usageLimit: async () => 3,
  recordDraftAndUsage: async () => { calls.push('draft+usage'); return { draftId: 'd1', usageEventId: 'e1' }; }
};

const result = await generateReviewDraft(input, repo, async () => ({ draft: 'We are sorry to hear this.', analysis: 'Broken zipper', modelVersion: 'test' }));
assert.equal(result.usageEventId, 'e1');
assert.deepEqual(calls, ['draft+usage']);

await assert.rejects(() => generateReviewDraft({ ...input, stars: 5 }, repo, async () => ({ draft: 'x', analysis: 'x', modelVersion: 'test' })), /only-1-to-3-star/);
await assert.rejects(() => generateReviewDraft({ ...input, stars: 2.5 }, repo, async () => ({ draft: 'x', analysis: 'x', modelVersion: 'test' })), /only-1-to-3-star/);
await assert.rejects(() => generateReviewDraft({ ...input, userId: '   ' }, repo, async () => ({ draft: 'x', analysis: 'x', modelVersion: 'test' })), /missing-identity/);
await assert.rejects(() => generateReviewDraft({ ...input, requestId: '   ' }, repo, async () => ({ draft: 'x', analysis: 'x', modelVersion: 'test' })), /missing-identity/);
await assert.rejects(() => generateReviewDraft({ ...input, reviewText: null as unknown as string }, repo, async () => ({ draft: 'x', analysis: 'x', modelVersion: 'test' })), /invalid-review-text/);
await assert.rejects(() => generateReviewDraft({ ...input, asin: 123 as unknown as string }, repo, async () => ({ draft: 'x', analysis: 'x', modelVersion: 'test' })), /invalid-asin/);
await assert.rejects(() => generateReviewDraft(input, { ...repo, findUsageEvent: async () => ({ id: 'e1' }) }, async () => ({ draft: 'x', analysis: 'x', modelVersion: 'test' })), /duplicate-request-id/);
await assert.rejects(() => generateReviewDraft(input, { ...repo, usageLimit: async () => 0 }, async () => ({ draft: 'x', analysis: 'x', modelVersion: 'test' })), /quota/);
await assert.rejects(() => generateReviewDraft(input, repo, async () => ({ draft: 'Guaranteed refund and UL certified.', analysis: 'x', modelVersion: 'test' })), /draft-contains/);
console.log('review-draft-service: PASS');
