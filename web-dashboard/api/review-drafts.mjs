import { createClient } from '@supabase/supabase-js';

const fallbackDraft = (text) => `We’re sorry to hear about your experience with this product. We understand how frustrating it is when ${text.slice(0, 120)} Please contact our customer support team so we can review the details and help with the next steps.`;

const unsafePromisePatterns = [
  /\b(?:full|partial|your money|a)\s+refund\b/i,
  /\b(refund|replace|replacement)\s+(you|your|the customer)\b/i,
  /\b(certified|certification|guaranteed|guarantee|warranty|medical-grade)\b/i,
  /\b(?:fireproof|prevents?\s+fire|zero\s+risk)\b/i,
];

function responseJson(res, status, body) {
  return res.status(status).json(body);
}

function bearerToken(req) {
  const raw = req.headers?.authorization || req.headers?.Authorization || '';
  const match = /^Bearer\s+([^\s]+)$/i.exec(String(raw));
  return match?.[1] || null;
}

function parseInput(req) {
  if (typeof req.body !== 'string') return req.body || {};
  return JSON.parse(req.body || '{}');
}

function validateInput(input, requireRequestIdentity) {
  if (![1, 2, 3].includes(Number(input.stars)) || !String(input.reviewText || '').trim()) {
    return 'only-1-to-3-star-reviews-with-text-supported';
  }

  const text = String(input.reviewText).trim();
  if (text.length > 10000) return 'review-text-too-long';
  if (input.asin != null && !/^[A-Z0-9]{10}$/.test(String(input.asin))) return 'invalid-asin';

  if (requireRequestIdentity) {
    if (typeof input.requestId !== 'string' || !input.requestId.trim() || input.requestId.length > 128) return 'request-id-required';
    if (typeof input.reviewFingerprint !== 'string' || !input.reviewFingerprint.trim() || input.reviewFingerprint.length > 256) return 'review-fingerprint-required';
  }

  return null;
}

function extractDraft(payload) {
  const nestedText = Array.isArray(payload.output)
    ? payload.output.flatMap((item) => Array.isArray(item?.content) ? item.content : [])
    .find((part) => part.type === 'output_text')
    ?.text
    : '';
  return String(payload.output_text || nestedText || '').trim();
}

function rpcErrorResponse(res, error) {
  const code = String(error?.code || '');
  const message = String(error?.message || '').toLowerCase();
  if (code === '23505' || message.includes('duplicate') || message.includes('request id')) {
    return responseJson(res, 409, { error: 'duplicate-request-id' });
  }
  if (message.includes('quota') || message.includes('daily limit')) {
    return responseJson(res, 429, { error: 'review-generation-quota-reached' });
  }
  if (code === '42501' || message.includes('not authorized') || message.includes('unauthorized')) {
    return responseJson(res, 403, { error: 'not-authorized' });
  }
  return responseJson(res, 502, { error: 'usage-record-failed' });
}

export function createReviewDraftHandler({
  env = process.env,
  fetchImpl = globalThis.fetch,
  createSupabaseClient = createClient,
} = {}) {
  return async function handler(req, res) {
    if (req.method !== 'POST') return responseJson(res, 405, { error: 'method-not-allowed' });

    let input;
    try {
      input = parseInput(req);
      if (!input || typeof input !== 'object' || Array.isArray(input)) input = {};
    } catch {
      return responseJson(res, 400, { error: 'invalid-json' });
    }

    const openAiKey = env.OPENAI_API_KEY || '';
    const validationError = validateInput(input, Boolean(openAiKey));
    if (validationError) return responseJson(res, 400, { error: validationError });

    const text = String(input.reviewText).trim();
    const model = env.OPENAI_MODEL || 'gpt-5-mini';

    if (!openAiKey) {
      const productionRuntime = env.NODE_ENV === 'production' || env.VERCEL === '1';
      if (productionRuntime && env.ALLOW_LOCAL_DEMO !== '1') {
        return responseJson(res, 503, { error: 'review-draft-provider-not-configured' });
      }
      return responseJson(res, 200, {
        draft: fallbackDraft(text),
        analysis: 'Local demo analysis: the review describes a product experience requiring acknowledgement and support follow-up.',
        warnings: ['local-demo-not-ai-generated'],
        usageEventId: `local-${Date.now()}`,
        modelVersion: 'local-demo',
      });
    }

    const supabaseUrl = env.SUPABASE_URL || '';
    const supabaseAnonKey = env.SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY || '';
    if (!supabaseUrl || !supabaseAnonKey) return responseJson(res, 503, { error: 'supabase-not-configured' });

    const accessToken = bearerToken(req);
    if (!accessToken) return responseJson(res, 401, { error: 'authentication-required' });

    const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
    });
    let userData;
    let userError;
    try {
      ({ data: userData, error: userError } = await supabase.auth.getUser(accessToken));
    } catch {
      return responseJson(res, 401, { error: 'invalid-session' });
    }
    if (userError || !userData?.user?.id) return responseJson(res, 401, { error: 'invalid-session' });

    let response;
    try {
      response = await fetchImpl('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model,
          store: false,
          input: `Write one concise, professional American-English Amazon seller reply to this ${input.stars}-star review. Do not invent refunds, certifications, guarantees, or product features. Review: ${text}`,
        }),
      });
    } catch {
      return responseJson(res, 502, { error: 'ai-provider-failed' });
    }

    if (!response.ok) return responseJson(res, 502, { error: 'ai-provider-failed' });

    let payload;
    try {
      payload = await response.json();
    } catch {
      return responseJson(res, 502, { error: 'ai-invalid-response' });
    }

    const draft = extractDraft(payload);
    if (!draft) return responseJson(res, 502, { error: 'ai-empty-response' });
    if (unsafePromisePatterns.some((pattern) => pattern.test(draft))) {
      return responseJson(res, 502, { error: 'ai-unsafe-response', warnings: ['draft-contains-unverified-claim'] });
    }

    let usageData;
    let usageError;
    try {
      ({ data: usageData, error: usageError } = await supabase.rpc('record_review_draft_usage', {
        p_user_id: userData.user.id,
        p_asin: input.asin == null ? null : String(input.asin),
        p_review_fingerprint: input.reviewFingerprint,
        p_stars: Number(input.stars),
        p_review_text: text,
        p_painpoint_analysis: 'OpenAI analysis completed.',
        p_draft_text: draft,
        p_warnings: [],
        p_brand_profile_id: input.brandProfileId == null ? null : String(input.brandProfileId),
        p_model_version: model,
        p_request_id: input.requestId,
      }));
    } catch (error) {
      return rpcErrorResponse(res, error);
    }
    if (usageError) return rpcErrorResponse(res, usageError);
    if (!usageData?.draft_id || !usageData?.usage_event_id) return responseJson(res, 502, { error: 'usage-record-failed' });

    return responseJson(res, 200, {
      draft,
      analysis: 'OpenAI analysis completed.',
      warnings: [],
      usageEventId: usageData?.usage_event_id,
      modelVersion: model,
      usageLeft: Number(usageData?.usage_left ?? 0),
    });
  };
}

export default createReviewDraftHandler();
