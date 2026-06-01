// ── Main bot orchestrator ─────────────────────────────────────────────────────
import { sendTextMessage, sendButtonMessage, sendFlowMessage, markAsRead, type WhatsAppCredentials } from "@/lib/whatsapp/client";
import { getOrCreateConversation, appendMessage, updateStage, updateMode } from "@/lib/db/conversations";
import { getLeadByConversation, markCalendlySent, upsertLead, updateLeadStatus } from "@/lib/db/leads";
import { generateReply, suggestNextStage } from "@/lib/ai/claude";
import { buildSystemPrompt, buildOnboardingSystemPrompt } from "@/lib/ai/prompts";
import { runQualification } from "@/lib/bot/qualify";
import { notifyHandoff } from "@/lib/bot/handoff";
import { sendLeadToGoogleSheets } from "@/lib/services/googleSheets";
import type { BotMessage, Business, BusinessConfig, ConversationStage, ExtractedLeadData } from "@/types/bot";

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

  // ── Legal business delegation ──────────────────────────────────────────────
  if (business.rubro === "legal") {
    const { processLegalMessage } = await import("./legalHandler");
    await processLegalMessage(waPhone, messageText, messageId, business, businessConfig, displayName, creds);
    return;
  }

  // 2. Load or create conversation (scoped to this business)
  const conversation = await getOrCreateConversation(waPhone, displayName, business.id);
  const lead = await getLeadByConversation(conversation.id);

  // 2.3. If conversation is in 'handoff' stage, do NOT trigger Gemini or send bot messages.
  // This allows the human owner to chat manually with the customer in WhatsApp Business
  // without the AI bot interfering or replying automatically.
  if (conversation.stage === "handoff") {
    const userMessage: BotMessage = {
      role: "user",
      content: messageText,
      timestamp: new Date().toISOString(),
    };
    await appendMessage(conversation.id, userMessage);
    console.log(`[handler] Conversation in handoff mode — skipping AI response to let owner chat`);
    return;
  }

  // ── Programmatic Security Guards (Anti-Abuse & Anti-Flood) ───────────────────
  const lowerText = messageText.toLowerCase();

  // A. Programmatic Anti-Abuse (Insults & Vulgarity Filter)
  const OFFENSIVE_WORDS = [
    "puta", "mierda", "conchadesumadre", "chupala", "culiao", "culia", "weon", 
    "hueon", "aweonao", "maricon", "bastardo", "cbron", "hijo de puta", "hdp", 
    "gil", "ctm", "ql", "csm", "perra", "pendejo", "estupido", "idiota"
  ];
  const containsOffensiveWord = OFFENSIVE_WORDS.some(word => 
    lowerText.includes(word) || new RegExp(`\\b${word}\\b`, 'i').test(lowerText)
  );

  if (containsOffensiveWord) {
    const warningMessage = 
      "Estimado/a, para poder brindarle soporte requerimos mantener un trato respetuoso. " +
      `Derivaré su chat de inmediato con uno de nuestros ejecutivos de ${businessConfig.nombre_negocio}.`;
    
    await sendTextMessage(waPhone, warningMessage, creds);
    await updateStage(conversation.id, "handoff");
    await appendMessage(conversation.id, {
      role: "user",
      content: messageText,
      timestamp: new Date().toISOString(),
    });
    await appendMessage(conversation.id, {
      role: "assistant",
      content: warningMessage,
      timestamp: new Date().toISOString(),
    });
    await notifyHandoff(lead, waPhone, "Lenguaje inapropiado / Insulto detectado", businessConfig, creds);
    return;
  }

  // B. Programmatic Anti-Flood (Token Safety Limit)
  // Max 50 messages in Firestore history (25 rounds of Q&A) before forcing human takeover
  // Whitelist Cristian's personal numbers from this limit to allow unlimited testing
  const isWhitelisted = waPhone.includes("56936306028") || waPhone.includes("36306028") ||
                        waPhone.includes("56961857682") || waPhone.includes("61857682");
  if (conversation.mode !== "onboarding" && !isWhitelisted && conversation.messages && conversation.messages.length >= 50) {
    const limitMessage =
      "Has alcanzado el límite máximo de interacciones automatizadas de esta sesión. 🔒\n\n" +
      `Para continuar y asegurar que todas tus necesidades queden cubiertas de la mejor manera, te he transferido de forma automática con un especialista de ${businessConfig.nombre_negocio}. En breve te contactaremos.`;
    
    await sendTextMessage(waPhone, limitMessage, creds);
    await updateStage(conversation.id, "handoff");
    await appendMessage(conversation.id, {
      role: "user",
      content: messageText,
      timestamp: new Date().toISOString(),
    });
    await appendMessage(conversation.id, {
      role: "assistant",
      content: limitMessage,
      timestamp: new Date().toISOString(),
    });
    await notifyHandoff(lead, waPhone, "Límite de mensajes alcanzado (Anti-Flood)", businessConfig, creds);
    return;
  }

  // 2.5. Intercept WhatsApp Flow responses
  if (messageText.startsWith("__FLOW_RESPONSE__:")) {
    try {
      const jsonStr = messageText.substring(18);
      const data = JSON.parse(jsonStr);
      console.log(`[handler] Received Flow response:`, data);

      const fullName = data.full_name || data.nombre || displayName || null;
      const businessType = data.business_type || data.rubro || null;
      const budgetRange = data.budget_range || data.presupuesto || null;
      const painPoint = data.pain_point || data.dolor || null;

      let budgetNumeric: number | undefined;
      if (budgetRange) {
        const matches = budgetRange.replace(/\./g, "").match(/\d+/g);
        if (matches && matches.length > 0) {
          budgetNumeric = parseInt(matches[matches.length - 1], 10);
        }
      }

      const extracted: ExtractedLeadData = {};
      if (fullName) extracted.full_name = fullName;
      if (businessType) extracted.business_type = businessType;
      if (budgetRange) extracted.budget_range = budgetRange;
      if (painPoint) extracted.pain_point = painPoint;
      if (budgetNumeric) extracted.budget_numeric = budgetNumeric;

      await upsertLead(conversation.id, waPhone, extracted, business.id);
      await updateStage(conversation.id, "scheduling");
      await updateLeadStatus(conversation.id, "qualified");

      // Async: Sync qualified lead data to Google Sheets
      await sendLeadToGoogleSheets(waPhone, extracted, businessConfig.nombre_negocio);

      const greetingName = fullName ? fullName.split(" ")[0] : "estimado/a";
      const replyMsg =
        `¡Muchas gracias por completar el formulario, *${greetingName}*! 🙌\n\n` +
        `Con esto ya tengo toda la información de calificación para diseñar tu propuesta.\n\n` +
        `Para afinar los detalles de la arquitectura técnica y definir el plan a tu medida, te sugiero que agendemos una llamada de 30 minutos. Puedes elegir el horario que más te acomode presionando el botón de abajo:`;

      const schedulingButtons = [
        { id: "btn_calendly_info", title: "📅 Agendar Llamada" },
        { id: "btn_human", title: "🗣️ Hablar con Asesor" }
      ];

      await sendButtonMessage(waPhone, replyMsg, schedulingButtons, creds);

      await appendMessage(conversation.id, {
        role: "user",
        content: `[Formulario Completado] Rubro: ${businessType || "N/A"}, Presupuesto: ${budgetRange || "N/A"}, Dolor: ${painPoint || "N/A"}`,
        timestamp: new Date().toISOString(),
      });
      await appendMessage(conversation.id, {
        role: "assistant",
        content: replyMsg,
        timestamp: new Date().toISOString(),
      });
      return;
    } catch (err) {
      console.error("[handler] Failed to parse or upsert flow response:", err);
    }
  }
  // 3. Check for onboarding demo toggles BEFORE handoff or Gemini
  if (lowerText.includes("demo onboarding") || lowerText.includes("probar demo") || lowerText.includes("🚀 demo onboarding")) {
    await updateMode(conversation.id, "onboarding");
    conversation.mode = "onboarding";

    const introMsg =
      "¡Bienvenido/a al canal de *Onboarding interno de Browns Studio*! 🚀\n\n" +
      "Acabo de activar el modo de demostración. A partir de ahora simularé ser *Eduardo*, el Asistente IA de Onboarding de tu empresa.\n\n" +
      "Imagínate que eres un nuevo colaborador en su primer día. Pregúntame sobre:\n" +
      "- 📅 *Horarios e ingreso*\n" +
      "- 🎁 *Beneficios y capacitación*\n" +
      "- Slack, Notion u otros.\n\n" +
      "Cuando quieras salir de la demo, simplemente presiona el botón *🚪 Volver a Ventas*.";

    const demoButtons = [
      { id: "btn_onboarding_q1", title: "📅 Horarios" },
      { id: "btn_onboarding_q2", title: "🎁 Beneficios" },
      { id: "btn_sales_exit", title: "🚪 Volver a Ventas" }
    ];

    await sendButtonMessage(waPhone, introMsg, demoButtons, creds);
    await appendMessage(conversation.id, {
      role: "user",
      content: messageText,
      timestamp: new Date().toISOString(),
    });
    await appendMessage(conversation.id, {
      role: "assistant",
      content: introMsg,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  if (lowerText.includes("volver a ventas") || lowerText.includes("salir de la demo") || lowerText.includes("🚪 volver a ventas")) {
    await updateMode(conversation.id, "sales");
    conversation.mode = "sales";

    const exitMsg =
      "¡Excelente! Hemos salido de la demostración del Agente de Onboarding. 🔙\n\n" +
      "Volvemos a nuestro chat de *Ventas y Consultoría de Browns Studio*. " +
      "Cuéntame, ¿qué tal te pareció la fluidez y velocidad del asistente? ¿Te gustaría cotizar una solución similar para tu negocio?";

    const salesButtons = [
      { id: "btn_services", title: "💡 Ver Servicios" },
      { id: "btn_human", title: "🗣️ Hablar con Asesor" }
    ];

    await sendButtonMessage(waPhone, exitMsg, salesButtons, creds);
    await appendMessage(conversation.id, {
      role: "user",
      content: messageText,
      timestamp: new Date().toISOString(),
    });
    await appendMessage(conversation.id, {
      role: "assistant",
      content: exitMsg,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // 4. Detect explicit handoff triggers
  const wantsHuman =
    lowerText.includes("hablar con alguien") ||
    lowerText.includes("hablar con una persona") ||
    lowerText.includes("quiero una persona") ||
    lowerText.includes("hablar con el equipo") ||
    lowerText.includes("hablar con asesor") ||
    lowerText.includes("hablar con soporte") ||
    lowerText.includes("speak to a human") ||
    lowerText.includes("real person") ||
    lowerText.includes("asesor") ||
    lowerText.includes("soporte");

  if (wantsHuman) {
    await handleHandoff(
      conversation.id, waPhone, "handoff",
      "Solicitud explícita del cliente", lead, businessConfig, creds
    );
    return;
  }

  // 5. Build user message
  const userMessage: BotMessage = {
    role: "user",
    content: messageText,
    timestamp: new Date().toISOString(),
  };

  const updatedMessages = [...conversation.messages, userMessage];

  // 6. Build system prompt based on mode
  const systemPrompt = conversation.mode === "onboarding"
    ? buildOnboardingSystemPrompt(businessConfig, conversation.display_name)
    : await buildSystemPrompt(conversation.stage, lead, businessConfig, messageText, business.gemini_api_key ?? undefined);

  // 6. Generate Gemini reply (use per-business API key if available)
  let replyText: string;
  let success = true;
  try {
    replyText = await generateReply(
      systemPrompt,
      updatedMessages,
      business.gemini_api_key ?? undefined
    );
  } catch (err) {
    console.error("[handler] Gemini error:", err);
    replyText =
      "Disculpa, tuve un problema técnico. ¿Puedes intentar nuevamente en un momento? 🙏";
    success = false;
  }

  // Clean up any double or triple asterisks to prevent raw formatting errors on WhatsApp
  replyText = replyText.replace(/\*{2,}/g, "*");

  // 7. Send reply via Meta API (with buttons if appropriate)
  let buttons: Array<{ id: string; title: string }> = [];
  const lowerReply = replyText.toLowerCase();

  if (conversation.mode === "onboarding") {
    buttons = [
      { id: "btn_onboarding_q1", title: "📅 Horarios" },
      { id: "btn_onboarding_q2", title: "🎁 Beneficios" },
      { id: "btn_sales_exit", title: "🚪 Volver a Ventas" }
    ];
  } else if (conversation.stage === "greeting" || (lowerReply.includes("charlie") && lowerReply.includes("virtual"))) {
    buttons = [
      { id: "btn_services", title: "💡 Ver Servicios" },
      { id: "btn_onboarding_demo", title: "🚀 Demo Onboarding" },
      { id: "btn_human", title: "🗣️ Hablar con Asesor" }
    ];
  } else if (conversation.stage === "scheduling" || lowerReply.includes("calendly") || lowerReply.includes("llamada")) {
    buttons = [
      { id: "btn_calendly_info", title: "📅 Agendar Llamada" },
      { id: "btn_human", title: "🗣️ Hablar con Asesor" }
    ];
  } else if (conversation.stage === "qualifying") {
    buttons = [
      { id: "btn_human", title: "🗣️ Hablar con Asesor" }
    ];
  }

  try {
    if (conversation.mode !== "onboarding" && conversation.stage === "qualifying" && businessConfig.whatsapp_flow_id) {
      const inputData = { display_name: displayName ?? "" };
      await sendFlowMessage(
        waPhone,
        replyText,
        businessConfig.whatsapp_flow_id,
        `flow_${conversation.id}`,
        "📋 Calificar Ahora",
        "QUALIFICATION_SCREEN",
        inputData,
        creds
      );
    } else if (buttons.length > 0) {
      await sendButtonMessage(waPhone, replyText, buttons, creds);
    } else {
      await sendTextMessage(waPhone, replyText, creds);
    }
  } catch (err) {
    console.error("[handler] Failed to send custom interactive message, falling back to text/buttons:", err);
    if (buttons.length > 0) {
      await sendButtonMessage(waPhone, replyText, buttons, creds).catch(() => 
        sendTextMessage(waPhone, replyText, creds)
      );
    } else {
      await sendTextMessage(waPhone, replyText, creds);
    }
  }

  // 8. Persist both messages to DB ONLY if the AI successfully generated the reply
  if (success) {
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

    // 10. Async: extract lead data and detect stage transitions (only in sales mode)
    if (conversation.mode !== "onboarding") {
      await Promise.allSettled([
        runQualification(conversation.id, waPhone, updatedMessages, business.id),
        detectAndUpdateStage(
          conversation.id, conversation.stage, updatedMessages,
          waPhone, lead, businessConfig, creds
        ),
      ]);
    }
  }
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
    if (lead?.budget_numeric && lead.budget_numeric > 4500000 && currentStage !== "handoff") {
      await handleHandoff(
        conversationId, waPhone, currentStage,
        "Presupuesto enterprise (>$4.500.000 CLP)", lead, businessConfig, creds
      );
      return;
    }

    const nextStage = await suggestNextStage(currentStage, summary);
    if (nextStage && nextStage !== currentStage) {
      await updateStage(conversationId, nextStage as ConversationStage);

      if (nextStage === "handoff") {
        await notifyHandoff(lead, waPhone, "Detección automática por IA", businessConfig, creds);
      } else if (nextStage === "scheduling" && currentStage === "qualifying") {
        await updateLeadStatus(conversationId, "qualified");
        const updatedLead = await getLeadByConversation(conversationId);
        if (updatedLead) {
          await sendLeadToGoogleSheets(waPhone, updatedLead, businessConfig.nombre_negocio);
        }
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
