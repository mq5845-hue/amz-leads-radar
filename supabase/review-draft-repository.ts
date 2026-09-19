import type {
  ReviewDraftInput,
  ReviewDraftRepository,
  ReviewModelOutput,
} from './review-draft-service.ts';

export type ReviewDraftDbError = {
  code?: string;
  message?: string;
} | null;

export type ReviewDraftDbClient = {
  rpc(
    functionName: string,
    params: Record<string, unknown>,
  ): Promise<{ data: unknown; error: ReviewDraftDbError }>;
};

function mapRpcError(error: Exclude<ReviewDraftDbError, null>): Error {
  const message = String(error.message || '');
  if (error.code === '23505' || message.includes('duplicate-request-id')) {
    return new Error('duplicate-request-id');
  }
  if (message.includes('quota') || message.includes('Daily quota')) {
    return new Error('review-generation-quota-reached');
  }
  if (error.code === '42501' || message.includes('not-authorized') || message.includes('brand-profile-not-owned')) {
    return new Error('not-authorized');
  }
  return new Error('review-draft-persistence-failed');
}

function readRpcResult(data: unknown): { draftId: string; usageEventId: string } {
  if (!data || typeof data !== 'object') throw new Error('review-draft-persistence-failed');
  const result = data as Record<string, unknown>;
  const draftId = typeof result.draft_id === 'string' ? result.draft_id : '';
  const usageEventId = typeof result.usage_event_id === 'string' ? result.usage_event_id : '';
  if (!draftId || !usageEventId) throw new Error('review-draft-persistence-failed');
  return { draftId, usageEventId };
}

export function createReviewDraftRepository(client: ReviewDraftDbClient): Pick<ReviewDraftRepository, 'recordDraftAndUsage'> {
  return {
    async recordDraftAndUsage(input: ReviewDraftInput, output: ReviewModelOutput) {
      const { data, error } = await client.rpc('record_review_draft_usage', {
        p_user_id: input.userId,
        p_asin: input.asin,
        p_review_fingerprint: input.reviewFingerprint,
        p_stars: input.stars,
        p_review_text: input.reviewText,
        p_painpoint_analysis: output.analysis,
        p_draft_text: output.draft,
        p_warnings: output.warnings || [],
        p_brand_profile_id: input.brandProfileId,
        p_model_version: output.modelVersion,
        p_request_id: input.requestId,
      });
      if (error) throw mapRpcError(error);
      return readRpcResult(data);
    },
  };
}
