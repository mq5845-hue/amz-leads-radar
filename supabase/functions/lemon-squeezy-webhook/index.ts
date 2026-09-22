import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);
const signingSecret = Deno.env.get("LEMON_SQUEEZY_WEBHOOK_SECRET");

const encoder = new TextEncoder();

async function hmacHex(secret: string, body: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function constantTimeEqual(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let result = 0;
  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return result === 0;
}

function subscriptionState(status: string): { plan: string; subscription_status: string } {
  const active = ["active", "on_trial"].includes(status);
  return {
    plan: active ? "pro" : "free",
    subscription_status: active
      ? "active"
      : status === "paused"
        ? "paused"
        : status === "past_due"
          ? "past_due"
          : status === "cancelled"
            ? "cancelled"
            : "expired",
  };
}

Deno.serve(async (request) => {
  if (request.method !== "POST" || !signingSecret) {
    return new Response("Not found", { status: 404 });
  }

  const rawBody = await request.text();
  const providedSignature = request.headers.get("x-signature") ?? "";
  const expectedSignature = await hmacHex(signingSecret, rawBody);
  if (!constantTimeEqual(providedSignature, expectedSignature)) {
    return new Response("Invalid signature", { status: 401 });
  }

  let payload: Record<string, any>;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const eventId = String(payload?.data?.id ?? "");
  const eventName = String(payload?.meta?.event_name ?? "");
  const attributes = payload?.data?.attributes ?? {};
  if (!eventId || !eventName) return new Response("Missing event identity", { status: 400 });

  const supported = ["subscription_created", "subscription_updated", "subscription_cancelled", "subscription_expired"];
  if (!supported.includes(eventName)) return new Response("Ignored", { status: 200 });

  const state = subscriptionState(String(attributes.status ?? "expired"));
  const update = {
    ...state,
    lemon_squeezy_customer_id: String(attributes.customer_id ?? ""),
    lemon_squeezy_subscription_id: eventId,
    lemon_squeezy_variant_id: String(attributes.variant_id ?? ""),
    subscription_renews_at: attributes.renews_at ?? null,
    updated_at: new Date().toISOString(),
  };

  const customUserId = String(payload?.meta?.custom_data?.user_id ?? "").trim();
  const email = String(attributes.user_email ?? "").trim().toLowerCase();
  if (!customUserId && !email) return new Response("Missing customer identity", { status: 422 });

  // Resolve the account before recording the event. A 5xx/422 response must
  // remain retryable by Lemon Squeezy instead of becoming a false duplicate.
  let profileQuery = supabase
    .from("profiles")
    .select("id, email, lemon_squeezy_subscription_id, subscription_status");
  const { data: profile, error: lookupError } = customUserId
    ? await profileQuery.eq("id", customUserId).maybeSingle()
    : await profileQuery.ilike("email", email).maybeSingle();
  if (lookupError) return new Response("Could not find profile", { status: 500 });
  if (!profile) return new Response("Profile not found", { status: 422 });

  // An old subscription event must not revoke a newer subscription.
  const existingSubscription = profile.lemon_squeezy_subscription_id;
  if (existingSubscription && existingSubscription !== eventId) {
    return new Response("Stale subscription event", { status: 200 });
  }

  const { error: profileError } = await supabase.from("profiles").update(update).eq("id", profile.id);
  if (profileError) return new Response("Could not update profile", { status: 500 });

  // Record only after the entitlement update succeeds. Repeated delivery is
  // idempotent because the profile update is deterministic and this key is unique.
  const { error: eventError } = await supabase.from("webhook_events").insert({
    provider: "lemon_squeezy",
    event_id: eventId,
    event_name: eventName,
    payload,
  });
  if (eventError && eventError.code !== "23505") return new Response("Could not record event", { status: 500 });
  return new Response("OK", { status: 200 });
});
