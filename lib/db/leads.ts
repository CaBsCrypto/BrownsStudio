// ── Leads CRUD — Firestore ────────────────────────────────────────────────────
import { getFirestoreClient } from "./client";
import type { ExtractedLeadData, Lead } from "@/types/bot";

const COL = "leads";

export async function upsertLead(
  conversationId: string,
  waPhone: string,
  patch: ExtractedLeadData,
  businessId?: string
): Promise<void> {
  const db  = getFirestoreClient();
  // Lead shares the same document ID as its conversation
  const ref = db.collection(COL).doc(conversationId);

  const snap = await ref.get();

  // Build clean patch — only include fields that have a value
  const cleanPatch: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(patch)) {
    if (v !== undefined && v !== null) cleanPatch[k] = v;
  }

  if (snap.exists) {
    // Merge service_interest arrays if both exist
    if (patch.service_interest && snap.data()?.service_interest) {
      const merged = Array.from(
        new Set([...(snap.data()!.service_interest as string[]), ...patch.service_interest])
      );
      cleanPatch.service_interest = merged;
    }
    await ref.update({ ...cleanPatch, updated_at: new Date().toISOString() });
  } else {
    await ref.set({
      conversation_id: conversationId,
      wa_phone:        waPhone,
      business_id:     businessId ?? "fallback",
      status:          "new",
      calendly_sent:   false,
      created_at:      new Date().toISOString(),
      updated_at:      new Date().toISOString(),
      ...cleanPatch,
    });
  }
}

export async function markCalendlySent(conversationId: string): Promise<void> {
  const db = getFirestoreClient();
  await db.collection(COL).doc(conversationId).update({ calendly_sent: true });
}

export async function updateLeadStatus(
  conversationId: string,
  status: Lead["status"]
): Promise<void> {
  const db = getFirestoreClient();
  await db.collection(COL).doc(conversationId).update({ status, updated_at: new Date().toISOString() });
}

export async function getLeadByConversation(conversationId: string): Promise<Lead | null> {
  const db   = getFirestoreClient();
  const snap = await db.collection(COL).doc(conversationId).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() } as Lead;
}

/**
 * Searches for an existing lead by matching a phone number or name.
 * Uses robust suffix/prefix cleaning and case-insensitive comparison.
 */
export async function findLeadByContactInfo(
  phone?: string,
  name?: string
): Promise<Lead | null> {
  const db = getFirestoreClient();
  const leadsRef = db.collection(COL);

  const clean = (p: string) => p.replace(/\D/g, "");

  if (phone) {
    const cleanedPhone = clean(phone);
    if (cleanedPhone.length >= 8) {
      const snap = await leadsRef.get();
      for (const doc of snap.docs) {
        const leadPhone = clean(doc.data().wa_phone || "");
        if (leadPhone && (cleanedPhone.endsWith(leadPhone) || leadPhone.endsWith(cleanedPhone))) {
          return { id: doc.id, ...doc.data() } as Lead;
        }
      }
    }
  }

  if (name) {
    const nameLower = name.toLowerCase().trim();
    const snap = await leadsRef.get();
    for (const doc of snap.docs) {
      const leadName = (doc.data().full_name || "").toLowerCase().trim();
      if (leadName && (leadName.includes(nameLower) || nameLower.includes(leadName))) {
        return { id: doc.id, ...doc.data() } as Lead;
      }
    }
  }

  return null;
}

