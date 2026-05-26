// ── Google Sheets Apps Script Webhook service ─────────────────────────────────
import type { ExtractedLeadData } from "@/types/bot";

/**
 * Send qualified lead details to Google Sheets in real-time.
 * Uses a dependency-free Google Apps Script webhook for maximum efficiency.
 */
export async function sendLeadToGoogleSheets(
  waPhone: string,
  lead: any,
  businessName?: string
): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log("[googleSheets] GOOGLE_SHEETS_WEBHOOK_URL not configured — skipping sheets sync");
    return;
  }

  const payload = {
    whatsapp:       `+${waPhone}`,
    nombre:         lead.full_name       ?? "No capturado",
    rubro:          lead.business_type   ?? "No especificado",
    presupuesto:    lead.budget_range    ?? "No especificado",
    dolor:          lead.pain_point      ?? "No capturado",
    enlace_admin:   `https://www.browns.studio/admin/conversations/fallback_${waPhone}`,
    enlace_wa:      `https://wa.me/${waPhone}`,
    negocio:        businessName         ?? "Browns Studio"
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      console.error(`[googleSheets] Failed to sync lead: HTTP ${res.status}`);
    } else {
      console.log(`[googleSheets] Lead ${lead.full_name} synced to Google Sheets successfully`);
    }
  } catch (err) {
    console.error("[googleSheets] Error sending lead to Google Sheets:", err);
  }
}
