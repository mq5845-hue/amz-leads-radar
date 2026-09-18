export async function consumeReviewGeneration({ url, anonKey, accessToken, requestId, metadata = {}, fetchImpl = fetch }) {
  if (!url || !anonKey || !accessToken) throw new Error('supabase-configuration-missing');
  if (!requestId?.trim()) throw new Error('request-id-required');

  const response = await fetchImpl(`${url.replace(/\/$/, '')}/rest/v1/rpc/consume_review_generation`, {
    method: 'POST',
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ p_request_id: requestId, p_metadata: metadata })
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.message || body.error || `supabase-rpc-failed-${response.status}`);
  return body;
}
