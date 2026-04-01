// ── Human handoff — notify the business owner via WhatsApp ───────────────────
import { sendTextMessage, type WhatsAppCredentials } from "@/lib/whatsapp/client";
import type { Lead, BusinessConfig } from "@/types/bot";

/**
 * Send a notification to the business owner's personal WhatsApp
 * when a lead needs human attention.
 *
 * @param config - Business config for handoff_phone and business name
 * @param creds - Per-business WhatsApp credentials for sending the notification
 */
export async function notifyHandoff(
  lead: Lead | null,
  waPhone: string,
  triggerReason: string,
  config?: BusinessConfig,
  creds?: WhatsAppCredentials
): Promise<void> {
  // Prefer per-business handoff phone, fall back to global env var
  const rawPhone = config?.handoff_phone ?? process.env.HANDOFF_NOTIFICATION_PHONE;
  if (!rawPhone) {
    console.warn("[handoff] No handoff_phone configured — skipping owner notification");
    return;
  }

  // Strip non-digits for Meta API
  const ownerPhoneClean = rawPhone.replace(/\D/g, "");
  const businessName = config?.nombre_negocio ?? "Browns Studio";

  const summary = lead
    ? [
        `🔔 *LEAD CALIENTE — ${businessName} Bot*`,
        ``,
        `📱 WhatsApp: +${waPhone}`,
        `👤 Nombre: ${lead.full_name ?? "No capturado"}`,
        `🏢 Negocio: ${lead.business_type ?? "No especificado"}`,
        `🛠 Servicio: ${lead.service_interest?.join(", ") ?? "No especificado"}`,
        `💰 Presupuesto: ${lead.budget_range ?? "No especificado"}`,
        `⏰ Urgencia: ${lead.urgency ?? "No especificada"}`,
        `📝 Dolor/necesidad: ${lead.pain_point ?? "No capturado"}`,
        ``,
        `⚡ Motivo del traspaso: ${triggerReason}`,
        ``,
        `👆 Este cliente está esperando que alguien del equipo lo contacte.`,
      ].join("\n")
    : [
        `🔔 *LEAD — ${businessName} Bot*`,
        ``,
        `📱 WhatsApp: +${waPhone}`,
        `⚡ Motivo: ${triggerReason}`,
        ``,
        `⚠️ No se capturaron datos del lead aún.`,
        `👆 Este cliente está esperando atención humana.`,
      ].join("\n");

  try {
    await sendTextMessage(ownerPhoneClean, summary, creds);
  } catch (err) {
    console.error("[handoff] Failed to notify owner:", err);
  }
}
