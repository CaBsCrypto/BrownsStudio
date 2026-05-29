// ── Calendly Webhook — Processes invitee.created events and updates leads ──────
import { findLeadByContactInfo, updateLeadStatus } from "@/lib/db/leads";
import { updateStage, appendMessage } from "@/lib/db/conversations";
import { getBusinessById, getBusinessConfig, getFallbackBusinessConfig } from "@/lib/db/businesses";
import { sendTextMessage } from "@/lib/whatsapp/client";
import { notifyHandoff } from "@/lib/bot/handoff";

export async function POST(request: Request): Promise<Response> {
  let body: any;
  try {
    body = await request.json();
  } catch (err) {
    return new Response("Bad Request", { status: 400 });
  }

  console.log("[Calendly Webhook] Event received:", body.event);

  // We are only interested in invitee.created
  if (body.event !== "invitee.created") {
    return new Response("Event ignored", { status: 200 });
  }

  const payload = body.payload;
  if (!payload) {
    return new Response("Missing payload", { status: 400 });
  }

  const inviteeName = payload.name || "";
  const inviteeEmail = payload.email || "";
  let inviteePhone = payload.text_reminders_number || "";

  // Look in questions and answers for a phone number
  if (payload.questions_and_answers && Array.isArray(payload.questions_and_answers)) {
    for (const qa of payload.questions_and_answers) {
      const answer = qa.answer || "";
      const cleaned = answer.replace(/\D/g, "");
      // If we find an answer with 8-15 digits, treat it as a phone number
      if (cleaned.length >= 8 && cleaned.length <= 15) {
        inviteePhone = answer;
        break;
      }
    }
  }

  console.log(`[Calendly Webhook] Invitee: "${inviteeName}" Email: "${inviteeEmail}" Phone: "${inviteePhone}"`);

  // Try to find the lead in Firestore
  const lead = await findLeadByContactInfo(inviteePhone || undefined, inviteeName || undefined);

  if (!lead) {
    console.warn(`[Calendly Webhook] No matching lead found for Phone="${inviteePhone}" or Name="${inviteeName}"`);
    return new Response("Lead not found", { status: 200 });
  }

  console.log(`[Calendly Webhook] Matching lead found! Lead ID: ${lead.id}, Phone: ${lead.wa_phone}`);

  // 1. Update lead status to "qualified" (or "won" since they booked the meeting)
  await updateLeadStatus(lead.id, "qualified");

  // 2. Transition conversation stage to "handoff" so AI stays silent and team takes over
  await updateStage(lead.id, "handoff");

  // 3. Load business details for customized WhatsApp responses
  const businessId = lead.business_id || "fallback";
  const business = await getBusinessById(businessId);
  const businessConfig = (await getBusinessConfig(businessId)) || getFallbackBusinessConfig();

  // 4. Format meeting time in Spanish (Chile timezone)
  const startTimeStr = payload.scheduled_event?.start_time;
  let formattedDate = "";
  if (startTimeStr) {
    try {
      const date = new Date(startTimeStr);
      formattedDate = date.toLocaleDateString("es-CL", {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Santiago",
      });
    } catch {
      formattedDate = startTimeStr;
    }
  }

  // 5. Send automated confirmation message to client on WhatsApp
  const greetingName = inviteeName.split(" ")[0] || "Estimado/a";
  const clientConfirmationMsg = 
    `¡Hola *${greetingName}*! 🙌\n\n` +
    `Acabo de ver que agendaste nuestra llamada de consultoría para el *${formattedDate || "día agendado"}*. 📅\n\n` +
    `Quedó confirmadísima. A partir de ahora, he transferido este chat con nuestro equipo de consultores de *${businessConfig.nombre_negocio}* para que preparen el blueprint de tu proyecto. Nos vemos pronto en la llamada. ¡Que tengas un excelente día! 🚀`;

  const creds = business?.wa_access_token
    ? {
        phoneNumberId: business.wa_phone_number_id,
        accessToken: business.wa_access_token,
      }
    : undefined;

  try {
    await sendTextMessage(lead.wa_phone, clientConfirmationMsg, creds);
    
    // Save to conversation history
    await appendMessage(lead.id, {
      role: "user",
      content: `[Calendly Booking Event] Agendado para: ${formattedDate || startTimeStr}`,
      timestamp: new Date().toISOString(),
    });
    
    await appendMessage(lead.id, {
      role: "assistant",
      content: clientConfirmationMsg,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[Calendly Webhook] Failed to send WhatsApp confirmation to client:", err);
  }

  // 6. Notify the team/owner that a meeting was booked
  const triggerReason = `Cita agendada por Calendly para el ${formattedDate || startTimeStr}`;
  try {
    await notifyHandoff(lead, lead.wa_phone, triggerReason, businessConfig, creds);
  } catch (err) {
    console.error("[Calendly Webhook] Failed to notify owner:", err);
  }

  return new Response("OK", { status: 200 });
}
