// ── Meta WhatsApp Business Cloud API — outgoing message client ───────────────

const BASE_URL = process.env.KAPSO_API_KEY
  ? "https://api.kapso.ai/meta/whatsapp/v24.0"
  : "https://graph.facebook.com/v21.0";

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
  if (!token && !process.env.KAPSO_API_KEY) {
    throw new Error("Neither WHATSAPP_ACCESS_TOKEN nor KAPSO_API_KEY is set");
  }
  return token ?? "";
}

async function callMetaAPI(body: object, creds?: WhatsAppCredentials): Promise<void> {
  const phoneNumberId = getPhoneNumberId(creds?.phoneNumberId);
  const url = `${BASE_URL}/${phoneNumberId}/messages`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const kapsoApiKey = process.env.KAPSO_API_KEY;
  if (kapsoApiKey) {
    headers["X-API-Key"] = kapsoApiKey;
  } else {
    headers["Authorization"] = `Bearer ${getAccessToken(creds?.accessToken)}`;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
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
 * Send an interactive WhatsApp Flow message.
 * @param flowId - The unique Flow ID registered in Meta
 * @param flowToken - Unique token representing the context of this conversation
 * @param flowCta - Text displayed on the CTA button (max 20 chars, e.g. "Comenzar")
 * @param screen - The ID of the screen in the flow to navigate to first
 * @param inputData - Key-value pair of data to pre-populate the form (e.g. { display_name: "John" })
 */
export async function sendFlowMessage(
  to: string,
  bodyText: string,
  flowId: string,
  flowToken: string,
  flowCta: string,
  screen: string,
  inputData?: object,
  creds?: WhatsAppCredentials
): Promise<void> {
  await callMetaAPI(
    {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "interactive",
      interactive: {
        type: "flow",
        body: { text: bodyText },
        action: {
          name: "flow",
          parameters: {
            flow_message_version: "3",
            flow_token: flowToken,
            flow_id: flowId,
            flow_cta: flowCta.substring(0, 20),
            flow_action: "navigate",
            flow_action_payload: {
              screen,
              data: inputData ?? {},
            },
          },
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
