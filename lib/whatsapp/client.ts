// ── Meta WhatsApp Business Cloud API — outgoing message client ───────────────

const BASE_URL = "https://graph.facebook.com/v21.0";

export interface WhatsAppCredentials {
  phoneNumberId?: string;
  accessToken?: string;
}

function getPhoneNumberId(override?: string): string {
  const id = override ?? process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!id) throw new Error("WHATSAPP_PHONE_NUMBER_ID is not set");
  return id;
}

function getAccessToken(override?: string): string {
  const token = override ?? process.env.WHATSAPP_ACCESS_TOKEN;
  if (!token) throw new Error("WHATSAPP_ACCESS_TOKEN is not set");
  return token;
}

async function callMetaAPI(body: object, creds?: WhatsAppCredentials): Promise<void> {
  const phoneNumberId = getPhoneNumberId(creds?.phoneNumberId);
  const url = `${BASE_URL}/${phoneNumberId}/messages`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken(creds?.accessToken)}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Meta API error ${res.status}: ${error}`);
  }
}

/**
 * Send a plain text message to a WhatsApp number.
 * @param to - E.164 format WITHOUT the +, e.g. "5491155556666"
 * @param creds - Optional per-business credentials (falls back to env vars)
 */
export async function sendTextMessage(
  to: string,
  text: string,
  creds?: WhatsAppCredentials
): Promise<void> {
  await callMetaAPI(
    {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "text",
      text: { body: text, preview_url: false },
    },
    creds
  );
}

/**
 * Send an interactive button message (max 3 buttons, 20 chars each).
 */
export async function sendButtonMessage(
  to: string,
  bodyText: string,
  buttons: Array<{ id: string; title: string }>,
  creds?: WhatsAppCredentials
): Promise<void> {
  await callMetaAPI(
    {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "interactive",
      interactive: {
        type: "button",
        body: { text: bodyText },
        action: {
          buttons: buttons.map((b) => ({
            type: "reply",
            reply: { id: b.id, title: b.title.substring(0, 20) },
          })),
        },
      },
    },
    creds
  );
}

/**
 * Mark a message as read (shows blue ticks on sender's side).
 */
export async function markAsRead(
  messageId: string,
  creds?: WhatsAppCredentials
): Promise<void> {
  await callMetaAPI(
    {
      messaging_product: "whatsapp",
      status: "read",
      message_id: messageId,
    },
    creds
  );
}
