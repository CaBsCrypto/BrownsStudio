import { createHmac, timingSafeEqual } from "crypto";

export function verifyWebhookSignature(
  rawBody: Buffer,
  signature: string | null
): boolean {
  if (!signature) return false;

  const appSecret = process.env.WHATSAPP_APP_SECRET;
  if (!appSecret) {
    console.error("[WhatsApp] WHATSAPP_APP_SECRET is not set");
    return false;
  }

  // Meta sends "sha256=<hex>"
  const [algo, hex] = signature.split("=");
  if (algo !== "sha256" || !hex) return false;

  const expected = createHmac("sha256", appSecret)
    .update(rawBody)
    .digest("hex");

  try {
    return timingSafeEqual(Buffer.from(hex, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

export function verifyKapsoSignature(
  rawBody: Buffer,
  signature: string | null
): boolean {
  if (!signature) return false;

  const kapsoSecret = process.env.KAPSO_WEBHOOK_SECRET;
  if (!kapsoSecret) {
    console.error("[WhatsApp] KAPSO_WEBHOOK_SECRET is not set");
    return false;
  }

  const expected = createHmac("sha256", kapsoSecret)
    .update(rawBody)
    .digest("hex");

  try {
    return timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}
