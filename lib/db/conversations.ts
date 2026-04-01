// ── Conversation CRUD ─────────────────────────────────────────────────────────
import { getSupabaseClient } from "./client";
import type { BotMessage, Conversation, ConversationStage } from "@/types/bot";

const TABLE = "conversations";

/**
 * Fetch existing conversation or create a new one for a WhatsApp number.
 */
export async function getOrCreateConversation(
  waPhone: string,
  displayName?: string,
  businessId?: string
): Promise<Conversation> {
  const db = getSupabaseClient();

  // Try to fetch existing — scoped to business if provided
  let query = db.from(TABLE).select("*").eq("wa_phone", waPhone);
  if (businessId) query = query.eq("business_id", businessId);

  const { data: existing, error: fetchError } = await query.single();

  if (fetchError && fetchError.code !== "PGRST116") {
    // PGRST116 = no rows found — that's ok
    throw new Error(`DB fetch error: ${fetchError.message}`);
  }

  if (existing) return existing as Conversation;

  // Create new conversation
  const { data: created, error: insertError } = await db
    .from(TABLE)
    .insert({
      wa_phone: waPhone,
      display_name: displayName ?? null,
      messages: [],
      stage: "greeting" as ConversationStage,
      ...(businessId ? { business_id: businessId } : {}),
    })
    .select()
    .single();

  if (insertError || !created) {
    throw new Error(`DB insert error: ${insertError?.message}`);
  }

  return created as Conversation;
}

/**
 * Append a message to the conversation history and update last_message_at.
 */
export async function appendMessage(
  conversationId: string,
  message: BotMessage
): Promise<void> {
  const db = getSupabaseClient();

  // Fetch current messages
  const { data, error: fetchError } = await db
    .from(TABLE)
    .select("messages")
    .eq("id", conversationId)
    .single();

  if (fetchError || !data) throw new Error(`DB fetch error: ${fetchError?.message}`);

  const current: BotMessage[] = data.messages ?? [];

  // Keep last 60 messages to avoid bloating the context window
  const updated = [...current, message].slice(-60);

  const { error: updateError } = await db
    .from(TABLE)
    .update({ messages: updated, last_message_at: new Date().toISOString() })
    .eq("id", conversationId);

  if (updateError) throw new Error(`DB update error: ${updateError.message}`);
}

/**
 * Update the conversation stage.
 */
export async function updateStage(
  conversationId: string,
  stage: ConversationStage
): Promise<void> {
  const db = getSupabaseClient();

  const { error } = await db
    .from(TABLE)
    .update({ stage })
    .eq("id", conversationId);

  if (error) throw new Error(`DB stage update error: ${error.message}`);
}
