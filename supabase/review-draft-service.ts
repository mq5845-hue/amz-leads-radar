export type ReviewDraftInput = {
  userId: string;
  asin: string | null;
  stars: number;
  reviewText: string;
  brandProfileId: string | null;
  extraInstruction: string | null;
  requestId: string;
};

export type ReviewModelOutput = {
  draft: string;
  analysis: string;
  warnings?: string[];
  modelVersion: string;
};

export type ReviewDraftResult = ReviewModelOutput & { usageEventId: string };

export interface ReviewDraftRepository {
  findUsageEvent(userId: string, requestId: string): Promise<{ id: string } | null>;
  countUsage(userId: string, feature: 'review_generate'): Promise<number>;
  usageLimit(userId: string): Promise<number>;
  insertDraft(input: ReviewDraftInput, output: ReviewModelOutput): Promise<{ id: string }>;
  insertUsage(input: ReviewDraftInput, draftId: string): Promise<{ id: string }>;
}

export type ReviewModel = (input: ReviewDraftInput) => Promise<ReviewModelOutput>;

const unsafePatterns = [
  /guaranteed?\s+(refund|replacement|result)/i,
  /(?:UL|FDA|CE)\s*certified/i,
  /medical(?:ly)?\s+(safe|approved)/i,
  /fireproof|prevents?\s+fire|zero\s+risk/i
];

export function validateReviewInput(input: ReviewDraftInput): void {
  if (typeof input.userId !== 'string' || !input.userId.trim() || typeof input.requestId !== 'string' || !input.requestId.trim()) {
    throw new Error('missing-identity');
  }
  if (!Number.isInteger(input.stars) || input.stars < 1 || input.stars > 3) throw new Error('only-1-to-3-star-reviews-supported');
  if (typeof input.reviewText !== 'string' || !input.reviewText.trim() || input.reviewText.length > 10000) {
    throw new Error('invalid-review-text');
  }
  if (input.asin !== null && (typeof input.asin !== 'string' || !/^[A-Z0-9]{10}$/.test(input.asin))) {
    throw new Error('invalid-asin');
  }
}

export function validateModelOutput(output: ReviewModelOutput): string[] {
  if (!output.draft?.trim() || !output.analysis?.trim() || !output.modelVersion?.trim()) throw new Error('invalid-model-output');
  const warnings = [...(output.warnings || [])];
  if (unsafePatterns.some((pattern) => pattern.test(output.draft))) throw new Error('draft-contains-unverified-claim');
  return [...new Set(warnings)];
}

export async function generateReviewDraft(
  input: ReviewDraftInput,
  repository: ReviewDraftRepository,
  model: ReviewModel
): Promise<ReviewDraftResult> {
  validateReviewInput(input);
  const previous = await repository.findUsageEvent(input.userId, input.requestId);
  if (previous) throw new Error('duplicate-request-id');
  const used = await repository.countUsage(input.userId, 'review_generate');
  const limit = await repository.usageLimit(input.userId);
  if (limit >= 0 && used >= limit) throw new Error('review-generation-quota-reached');

  const output = await model(input);
  const warnings = validateModelOutput(output);
  const normalized = { ...output, warnings };
  const draft = await repository.insertDraft(input, normalized);
  const usage = await repository.insertUsage(input, draft.id);
  return { ...normalized, usageEventId: usage.id };
}
