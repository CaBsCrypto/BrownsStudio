// ── Conversations CRUD — Firestore ────────────────────────────────────────────
import { getFirestoreClient } from "./client";
import { FieldValue } from "firebase-admin/firestore";
import type { BotMessage, Conversation, ConversationStage } from "@/types/bot";

const COL = "conversations";

/**
 * Deterministic document ID: avoids needing a query on every message.
 * businessId can be "fallback" for single-tenant mode.
 */
function docId(waPhone: string, businessId: string): string {
  return `${businessId}_${waPhone}`;
}

export async function getOrCreateConversation(
  waPhone: string,
  displayName?: string,
  businessId?: string
): Promise<Conversation> {
  const db  = getFirestoreClient();
  const bid = businessId ?? "fallback";
  const id  = docId(waPhone, bid);
  const ref = db.collection(COL).doc(id);

  const snap = await ref.get();
  if (snap.exists) return { id, ...snap.data() } as Conversation;

  const now  = new Date().toISOString();
  const data = {
    wa_phone:        waPhone,
    business_id:     bid,
    display_name:    displayName ?? null,
    messages:        [],
    stage:           "greeting" as ConversationStage,
    last_message_at: now,
    created_at:      now,
  };

  await ref.set(data);
  return { id, ...data, updated_at: now } as unknown as Conversation;
}

export async function appendMessage(
  conversationId: string,
  message: BotMessage
): Promise<void> {
  const db  = getFirestoreClient();
  const ref = db.collection(COL).doc(conversationId);

  const snap = await ref.get();
  if (!snap.exists) throw new Error(`Conversation ${conversationId} not found`);

  const current: BotMessage[] = snap.data()?.messages ?? [];
  const updated = [...current, message].slice(-60); // keep last 60

  await ref.update({
    messages:        updated,
    last_message_at: new Date().toISOString(),
  });
}

export async function updateStage(
  conversationId: string,
  stage: ConversationStage
): Promise<void> {
  const db = getFirestoreClient();
  await db.collection(COL).doc(conversationId).update({ stage });
}
