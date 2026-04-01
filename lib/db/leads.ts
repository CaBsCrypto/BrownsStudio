// ── Lead CRUD ─────────────────────────────────────────────────────────────────
import { getSupabaseClient } from "./client";
import type { ExtractedLeadData, Lead } from "@/types/bot";

const TABLE = "leads";

/**
 * Upsert lead data — creates if not exists, merges new fields if it does.
 * Only updates fields that are present in the patch (non-undefined).
 */
export async function upsertLead(
  conversationId: string,
  waPhone: string,
  patch: ExtractedLeadData,
  businessId?: string
): Promise<void> {
  const db = getSupabaseClient();

  // Check if lead exists
  const { data: existing } = await db
    .from(TABLE)
    .select("id")
    .eq("conversation_id", conversationId)
    .single();

  // Build clean patch — only include fields that have a value
  const cleanPatch: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(patch)) {
    if (v !== undefined && v !== null) cleanPatch[k] = v;
  }

  if (existing) {
    // Merge service_interest arrays if both exist
    if (patch.service_interest) {
      const { data: lead } = await db
        .from(TABLE)
        .select("service_interest")
        .eq("id", existing.id)
        .single();

      if (lead?.service_interest) {
        const merged = Array.from(
          new Set([...(lead.service_interest as string[]), ...patch.service_interest])
        );
        cleanPatch.service_interest = merged;
      }
    }

    await db.from(TABLE).update(cleanPatch).eq("id", existing.id);
  } else {
    await db.from(TABLE).insert({
      conversation_id: conversationId,
      wa_phone: waPhone,
      ...(businessId ? { business_id: businessId } : {}),
      ...cleanPatch,
    });
  }
}

/**
 * Mark that the Calendly link was sent to this lead.
 */
export async function markCalendlySent(conversationId: string): Promise<void> {
  const db = getSupabaseClient();
  await db
    .from(TABLE)
    .update({ calendly_sent: true })
    .eq("conversation_id", conversationId);
}

/**
 * Update lead status.
 */
export async function updateLeadStatus(
  conversationId: string,
  status: Lead["status"]
): Promise<void> {
  const db = getSupabaseClient();
  await db
    .from(TABLE)
    .update({ status })
    .eq("conversation_id", conversationId);
}

/**
 * Get a lead by conversation ID.
 */
export async function getLeadByConversation(
  conversationId: string
): Promise<Lead | null> {
  const db = getSupabaseClient();
  const { data } = await db
    .from(TABLE)
    .select("*")
    .eq("conversation_id", conversationId)
    .single();

  return (data as unknown as Lead) ?? null;
}
