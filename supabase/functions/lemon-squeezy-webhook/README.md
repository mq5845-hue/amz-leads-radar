# Lemon Squeezy Webhook

Deploy this Supabase Edge Function as `lemon-squeezy-webhook` and configure the Lemon Squeezy webhook URL as:

`https://<project-ref>.supabase.co/functions/v1/lemon-squeezy-webhook`

The function is configured with `verify_jwt = false` because Lemon Squeezy does not send a Supabase JWT. Security is provided by the raw-body `x-signature` HMAC check in the function.

Required secrets:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `LEMON_SQUEEZY_WEBHOOK_SECRET`

The handler verifies `x-signature` against the raw request body, resolves the target profile, applies the entitlement update, and then records `(provider, event_id)` for idempotency. Failed profile updates remain retryable by Lemon Squeezy. Do not expose the service-role key or webhook secret to the browser.

If the checkout is created for an authenticated user, pass the Supabase user UUID as Lemon Squeezy checkout custom data under `user_id`. The webhook prefers this immutable ID and falls back to the normalized billing email only when custom data is unavailable.

## Release verification

1. Apply both migrations to the target Supabase project.
2. Set the three Edge Function secrets listed above.
3. Deploy the function and configure the Lemon Squeezy webhook URL.
4. Send Lemon Squeezy test events and confirm `profiles.plan`, `subscription_status`, and `webhook_events`.
5. Test create, update, cancel, expired, duplicate delivery, invalid signature, and stale-subscription delivery.
