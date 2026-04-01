// ── Google Gemini AI client (reemplaza Anthropic Claude) ─────────────────────
// Gemini Flash 2.0: gratis, 1.500 req/día, 1M tokens/día
// aistudio.google.com/apikey → obtener API key gratuita

import { GoogleGenerativeAI } from "@google/generative-ai";
import type { BotMessage } from "@/types/bot";

const DEFAULT_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";

let _defaultClient: GoogleGenerativeAI | null = null;

function getClient(apiKeyOverride?: string): GoogleGenerativeAI {
  // Per-business key: always create a fresh client (no caching)
  if (apiKeyOverride) return new GoogleGenerativeAI(apiKeyOverride);

  // Default client: cached singleton
  if (_defaultClient) return _defaultClient;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set — obtené tu key gratis en aistudio.google.com/apikey");
  _defaultClient = new GoogleGenerativeAI(apiKey);
  return _defaultClient;
}

/**
 * Generate a bot reply given a system prompt and conversation history.
 */
export async function generateReply(
  systemPrompt: string,
  messages: BotMessage[],
  apiKeyOverride?: string
): Promise<string> {
  const client = getClient(apiKeyOverride);
  const model = client.getGenerativeModel({
    model: DEFAULT_MODEL,
    systemInstruction: systemPrompt,
    generationConfig: {
      maxOutputTokens: 400,
      temperature: 0.7,
    },
  });

  // Convert to Gemini history format (all messages except the last user message)
  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.content }],
  }));

  // Last message is the current user input
  const lastMessage = messages[messages.length - 1];
  if (!lastMessage || lastMessage.role !== "user") {
    throw new Error("Last message must be from user");
  }

  const chat = model.startChat({ history });
  const result = await chat.sendMessage(lastMessage.content);
  const text = result.response.text();

  if (!text) throw new Error("Empty response from Gemini");
  return text;
}

/**
 * Extract structured lead data from conversation text.
 * Runs async after the response is sent — not in the real-time path.
 */
export async function extractLeadData(
  conversationText: string
): Promise<Record<string, unknown> | null> {
  const client = getClient();
  const model = client.getGenerativeModel({
    model: DEFAULT_MODEL,
    generationConfig: { maxOutputTokens: 300, temperature: 0.1 },
  });

  const prompt = `Extraés datos de leads de conversaciones de WhatsApp de una agencia web.
Respondés SOLO con JSON válido, sin markdown, sin explicaciones.
Campos posibles: full_name, business_type, budget_range, budget_numeric (número entero USD),
urgency, service_interest (array de strings), pain_point.
Solo incluís campos que aparezcan CLARAMENTE en la conversación.
Si no encontrás nada, respondés con {}

Conversación:
${conversationText}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    // Remove markdown code blocks if present
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    if (Object.keys(parsed).length === 0) return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Determine if the conversation should advance to a new stage.
 */
export async function suggestNextStage(
  currentStage: string,
  conversationSummary: string
): Promise<string | null> {
  const client = getClient();
  const model = client.getGenerativeModel({
    model: DEFAULT_MODEL,
    generationConfig: { maxOutputTokens: 20, temperature: 0.1 },
  });

  const prompt = `Analizás conversaciones de WhatsApp de una agencia web (Browns Studio).
Etapas posibles: greeting, qualifying, scheduling, closing, handoff, closed.
Respondés SOLO con el nombre de la etapa, sin explicación.
Reglas:
- greeting → qualifying: cuando el usuario muestra interés concreto
- qualifying → scheduling: cuando tenemos nombre + tipo de negocio + servicio + presupuesto
- qualifying → handoff: si presupuesto > $5000 o frustración clara
- scheduling → closing: si piden precio específico en lugar de llamada
- cualquiera → handoff: si pide hablar con una persona
- Si no cambia, respondés con la etapa actual.

Etapa actual: ${currentStage}
Conversación reciente:
${conversationSummary}`;

  try {
    const result = await model.generateContent(prompt);
    const suggested = result.response.text().trim().toLowerCase();
    const validStages = ["greeting", "qualifying", "scheduling", "closing", "handoff", "closed"];
    if (suggested === currentStage || !validStages.includes(suggested)) return null;
    return suggested;
  } catch {
    return null;
  }
}
