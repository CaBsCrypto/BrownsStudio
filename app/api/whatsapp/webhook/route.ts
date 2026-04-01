// ── Meta WhatsApp Webhook — GET (verification) + POST (incoming messages) ────
import { after } from "next/server";
import { verifyWebhookSignature } from "@/lib/whatsapp/verify";
import { processMessage } from "@/lib/bot/handler";
import { getBusinessByPhoneId, getBusinessConfig, getFallbackBusinessConfig } from "@/lib/db/businesses";
import type { WhatsAppWebhookPayload } from "@/lib/whatsapp/types";

// ── GET — Meta webhook verification challenge ─────────────────────────────────
export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);

  const mode      = searchParams.get("hub.mode");
  const token     = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const expectedToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;

  if (mode === "subscribe" && token === expectedToken && challenge) {
    console.log("[WhatsApp Webhook] Verification successful");
    return new Response(challenge, { status: 200 });
  }

  console.warn("[WhatsApp Webhook] Verification failed", { mode, token });
  return new Response("Forbidden", { status: 403 });
}

// ── POST — Incoming messages ──────────────────────────────────────────────────
export async function POST(request: Request): Promise<Response> {
  // Read raw body for signature verification (MUST happen before json())
  const rawBody = Buffer.from(await request.arrayBuffer());
  const signature = request.headers.get("x-hub-signature-256");

  // Verify Meta signature
  if (!verifyWebhookSignature(rawBody, signature)) {
    console.warn("[WhatsApp Webhook] Invalid signature");
    return new Response("Forbidden", { status: 403 });
  }

  // Parse payload
  let payload: WhatsAppWebhookPayload;
  try {
    payload = JSON.parse(rawBody.toString("utf-8"));
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  // Acknowledge Meta IMMEDIATELY — must respond < 5s or Meta retries
  // Use after() to process the message AFTER the response is sent
  after(async () => {
    try {
      await handlePayload(payload);
    } catch (err) {
      console.error("[WhatsApp Webhook] Handler error:", err);
    }
  });

  return new Response("OK", { status: 200 });
}

// ── Internal: process the webhook payload ────────────────────────────────────
async function handlePayload(payload: WhatsAppWebhookPayload): Promise<void> {
  for (const entry of payload.entry ?? []) {
    for (const change of entry.changes ?? []) {
      const value = change.value;

      // Skip status updates and other non-message events
      if (!value.messages?.length) continue;

      // ── Identify which business this message belongs to ──────────────────
      const phoneNumberId = value.metadata?.phone_number_id;

      // Try to load business from DB; fall back to env-var config (single-tenant mode)
      let business = phoneNumberId ? await getBusinessByPhoneId(phoneNumberId) : null;
      let businessConfig = business ? await getBusinessConfig(business.id) : null;

      if (!business || !businessConfig) {
        // Fallback: single-tenant mode using env vars (Browns Studio default)
        businessConfig = getFallbackBusinessConfig();
        business = {
          id: "fallback",
          nombre: businessConfig.nombre_negocio,
          rubro: businessConfig.rubro,
          wa_phone_number_id: phoneNumberId ?? "",
          wa_access_token: null,
          gemini_api_key: null,
          is_active: true,
          plan: "starter",
          created_at: new Date().toISOString(),
        };
        console.log(`[WhatsApp] phone_number_id=${phoneNumberId} not in DB — using fallback config`);
      }

      // Build per-business credentials if the business has its own token
      const creds =
        business.wa_access_token || business.wa_phone_number_id !== phoneNumberId
          ? {
              phoneNumberId: business.wa_phone_number_id || phoneNumberId,
              accessToken: business.wa_access_token ?? undefined,
            }
          : undefined;

      const contacts = value.contacts ?? [];

      for (const message of value.messages) {
        if (message.type !== "text" || !message.text?.body) {
          console.log(`[WhatsApp] Ignoring message type: ${message.type}`);
          continue;
        }

        const waPhone = message.from;
        const messageText = message.text.body.trim();
        const messageId = message.id;

        const contact = contacts.find((c) => c.wa_id === waPhone);
        const displayName = contact?.profile?.name;

        console.log(
          `[WhatsApp][${businessConfig.nombre_negocio}] Message from +${waPhone}: "${messageText.substring(0, 50)}"`
        );

        await processMessage(
          waPhone, messageText, messageId,
          business, businessConfig,
          displayName, creds
        );
      }
    }
  }
}
