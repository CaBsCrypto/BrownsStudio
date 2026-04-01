// ── Main bot orchestrator ─────────────────────────────────────────────────────
import { sendTextMessage, markAsRead, type WhatsAppCredentials } from "@/lib/whatsapp/client";
import { getOrCreateConversation, appendMessage, updateStage } from "@/lib/db/conversations";
import { getLeadByConversation, markCalendlySent } from "@/lib/db/leads";
import { generateReply, suggestNextStage } from "@/lib/ai/claude";
import { buildSystemPrompt } from "@/lib/ai/prompts";
import { runQualification } from "@/lib/bot/qualify";
import { notifyHandoff } from "@/lib/bot/handoff";
import type { BotMessage, Business, BusinessConfig, ConversationStage } from "@/types/bot";

/**
 * Process an incoming WhatsApp text message end-to-end.
 *
 * @param business      - The business this message belongs to
 * @param businessConfig - Config (services, tone, handoff phone, etc.)
 * @param creds         - Optional per-business Meta credentials (falls back to env vars)
 */
export async function processMessage(
  waPhone: string,
  messageText: string,
  messageId: string,
  business: Business,
  businessConfig: BusinessConfig,
  displayName?: string,
  creds?: WhatsAppCredentials
): Promise<void> {
  // 1. Mark message as read (shows blue ticks)
  try { await markAsRead(messageId, creds); } catch { /* non-critical */ }

  // 2. Load or create conversation (scoped to this business)
  const conversation = await getOrCreateConversation(waPhone, displayName, business.id);
  const lead = await getLeadByConversation(conversation.id);

  // 3. Detect explicit handoff triggers BEFORE calling Gemini
  const lowerText = messageText.toLowerCase();
  const wantsHuman =
    lowerText.includes("hablar con alguien") ||
    lowerText.includes("hablar con una persona") ||
    lowerText.includes("quiero una persona") ||
    lowerText.includes("hablar con el equipo") ||
    lowerText.includes("speak to a human") ||
    lowerText.includes("real person");

  if (wantsHuman && conversation.stage !== "handoff") {
    await handleHandoff(
      conversation.id, waPhone, "handoff",
      "Solicitud explícita del cliente", lead, businessConfig, creds
    );
    return;
  }

  // 4. Build user message
  const userMessage: BotMessage = {
    role: "user",
    content: messageText,
    timestamp: new Date().toISOString(),
  };

  const updatedMessages = [...conversation.messages, userMessage];

  // 5. Build system prompt with current stage, lead context, and business config
  const systemPrompt = buildSystemPrompt(conversation.stage, lead, businessConfig);

  // 6. Generate Gemini reply (use per-business API key if available)
  let replyText: string;
  try {
    replyText = await generateReply(
      systemPrompt,
      updatedMessages,
      business.gemini_api_key ?? undefined
    );
  } catch (err) {
    console.error("[handler] Gemini error:", err);
    replyText =
      "Disculpá, tuve un problema técnico. ¿Podés intentar nuevamente en un momento? 🙏";
  }

  // 7. Send reply via Meta API
  await sendTextMessage(waPhone, replyText, creds);

  // 8. Persist both messages to DB
  await appendMessage(conversation.id, userMessage);
  await appendMessage(conversation.id, {
    role: "assistant",
    content: replyText,
    timestamp: new Date().toISOString(),
  });

  // 9. Check if Calendly link was mentioned → mark as sent
  if (businessConfig.calendly_url && replyText.includes(businessConfig.calendly_url) && !lead?.calendly_sent) {
    await markCalendlySent(conversation.id);
  }

  // 10. Async: extract lead data and detect stage transitions
  await Promise.allSettled([
    runQualification(conversation.id, waPhone, updatedMessages, business.id),
    detectAndUpdateStage(
      conversation.id, conversation.stage, updatedMessages,
      waPhone, lead, businessConfig, creds
    ),
  ]);
}

/**
 * Detect if the conversation stage should advance and update DB if so.
 */
async function detectAndUpdateStage(
  conversationId: string,
  currentStage: ConversationStage,
  messages: BotMessage[],
  waPhone: string,
  lead: Awaited<ReturnType<typeof getLeadByConversation>>,
  businessConfig: BusinessConfig,
  creds?: WhatsAppCredentials
): Promise<void> {
  try {
    const summary = messages
      .slice(-6)
      .map((m) => `${m.role === "user" ? "Cliente" : "Charlie"}: ${m.content}`)
      .join("\n");

    // Enterprise threshold — escalate to handoff
    if (lead?.budget_numeric && lead.budget_numeric > 5000 && currentStage !== "handoff") {
      await handleHandoff(
        conversationId, waPhone, currentStage,
        "Presupuesto enterprise (>$5.000 USD)", lead, businessConfig, creds
      );
      return;
    }

    const nextStage = await suggestNextStage(currentStage, summary);
    if (nextStage && nextStage !== currentStage) {
      await updateStage(conversationId, nextStage as ConversationStage);

      if (nextStage === "handoff") {
        await notifyHandoff(lead, waPhone, "Detección automática por IA", businessConfig, creds);
      }
    }
  } catch (err) {
    console.error("[handler] Stage detection error:", err);
  }
}

/**
 * Handle handoff: update stage, send message to client, notify owner.
 */
async function handleHandoff(
  conversationId: string,
  waPhone: string,
  currentStage: ConversationStage,
  reason: string,
  lead: Awaited<ReturnType<typeof getLeadByConversation>>,
  businessConfig: BusinessConfig,
  creds?: WhatsAppCredentials
): Promise<void> {
  if (currentStage !== "handoff") {
    await updateStage(conversationId, "handoff");
  }

  const handoffMessage =
    "Entendido 🙌 Voy a conectarte con uno de nuestros especialistas ahora mismo. " +
    `En breve alguien del equipo de ${businessConfig.nombre_negocio} te va a escribir por acá.`;

  await sendTextMessage(waPhone, handoffMessage, creds);
  await appendMessage(conversationId, {
    role: "assistant",
    content: handoffMessage,
    timestamp: new Date().toISOString(),
  });

  await notifyHandoff(lead, waPhone, reason, businessConfig, creds);
}
