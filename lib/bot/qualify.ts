// ── Lead qualification — async data extraction and upsert ────────────────────
import { extractLeadData } from "@/lib/ai/claude";
import { upsertLead } from "@/lib/db/leads";
import type { BotMessage } from "@/types/bot";

/**
 * Run async lead extraction from the conversation history and upsert into DB.
 * Called inside after() — does NOT block the WhatsApp response.
 */
export async function runQualification(
  conversationId: string,
  waPhone: string,
  messages: BotMessage[],
  businessId?: string
): Promise<void> {
  try {
    // Build a compact text representation of the last 10 messages
    const recent = messages.slice(-10);
    const conversationText = recent
      .map((m) => `${m.role === "user" ? "Cliente" : "Charlie"}: ${m.content}`)
      .join("\n");

    const extracted = await extractLeadData(conversationText);
    if (!extracted) return;

    // Map budget strings to numeric estimates
    if (extracted.budget_range && !extracted.budget_numeric) {
      extracted.budget_numeric = parseBudgetToNumeric(extracted.budget_range as string);
    }

    await upsertLead(conversationId, waPhone, extracted as Parameters<typeof upsertLead>[2], businessId);
  } catch (err) {
    // Non-critical — log but don't throw (this runs async)
    console.error("[qualify] Failed to extract lead data:", err);
  }
}

/**
 * Parse a budget string like "$500-$1000" or "1500 USD" into a numeric estimate.
 */
function parseBudgetToNumeric(budgetStr: string): number | undefined {
  const cleaned = budgetStr.replace(/[^0-9\-.,]/g, "");
  const numbers = cleaned.split(/[-,]/).map((n) => parseInt(n.replace(/\./g, ""), 10)).filter(Boolean);
  if (numbers.length === 0) return undefined;
  if (numbers.length === 1) return numbers[0];
  // Return the average of the range
  return Math.round(numbers.reduce((a, b) => a + b, 0) / numbers.length);
}
