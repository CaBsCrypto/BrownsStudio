// ── JurisClaro AI — Chilean Judicial Bot Conversational Handler 🇨🇱⚖️
import { sendTextMessage, sendButtonMessage, type WhatsAppCredentials } from "@/lib/whatsapp/client";
import { getOrCreateConversation, appendMessage, updateStage } from "@/lib/db/conversations";
import { getLegalClient, registerLegalClient, getCasesByRut } from "@/lib/db/legal";
import { notifyHandoff } from "@/lib/bot/handoff";
import type { BotMessage, Business, BusinessConfig } from "@/types/bot";
import type { LegalCase } from "@/types/legal";

/**
 * Robust extraction of Chilean RUT from text.
 * Matches formats: XX.XXX.XXX-K, XXXXXXX-K, XXXXXXXK, etc. (case-insensitive)
 */
export function extractRut(text: string): string | null {
  const cleanText = text.replace(/\s+/g, "").toUpperCase();
  
  // 1. Match XX.XXX.XXX-K or X.XXX.XXX-K or XXXXXXX-K
  const matchWithHyphen = cleanText.match(/(\d{1,2})\.?(\d{3})\.?(\d{3})\-?([\dkK])/);
  if (matchWithHyphen) {
    const num = matchWithHyphen[1] + matchWithHyphen[2] + matchWithHyphen[3];
    const dv = matchWithHyphen[4];
    return `${num}-${dv}`;
  }
  
  // 2. Match XXXXXXXK or XXXXXXXXK (no hyphen at all)
  const matchNoHyphen = cleanText.match(/\b(\d{7,8})([\dkK])\b/);
  if (matchNoHyphen) {
    return `${matchNoHyphen[1]}-${matchNoHyphen[2]}`;
  }
  
  return null;
}

/**
 * Nice Chilean RUT Formatter (formats to XX.XXX.XXX-K).
 */
export function formatRut(rut: string): string {
  const parts = rut.split("-");
  const num = parts[0].replace(/\D/g, "");
  const dv = parts[1].toUpperCase();
  
  let formattedNum = "";
  let i = num.length;
  while (i > 0) {
    const chunk = num.slice(Math.max(0, i - 3), i);
    formattedNum = chunk + (formattedNum ? "." + formattedNum : "");
    i -= 3;
  }
  return `${formattedNum}-${dv}`;
}

/**
 * Validate Chilean RUT module 11 verifier digit.
 */
export function validateRut(rut: string): boolean {
  const parts = rut.split("-");
  if (parts.length !== 2) return false;
  const num = parts[0].replace(/\D/g, "");
  const dv = parts[1].toUpperCase();
  
  let sum = 0;
  let mul = 2;
  for (let i = num.length - 1; i >= 0; i--) {
    sum += parseInt(num[i], 10) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const res = 11 - (sum % 11);
  let expectedDv = "";
  if (res === 11) expectedDv = "0";
  else if (res === 10) expectedDv = "K";
  else expectedDv = res.toString();
  
  return dv === expectedDv;
}

/**
 * Process legal client tracking messages.
 */
export async function processLegalMessage(
  waPhone: string,
  messageText: string,
  messageId: string,
  business: Business,
  businessConfig: BusinessConfig,
  displayName?: string,
  creds?: WhatsAppCredentials
): Promise<void> {
  const conversation = await getOrCreateConversation(waPhone, displayName, business.id);
  const lowerText = messageText.toLowerCase();

  // 1. Handle explicit human handoff requests
  const wantsAbogado =
    lowerText.includes("abogado") ||
    lowerText.includes("hablar con un abogado") ||
    lowerText.includes("hablar con persona") ||
    lowerText.includes("hablar con humano") ||
    lowerText.includes("asesor") ||
    lowerText.includes("soporte") ||
    lowerText.includes("ayuda") ||
    lowerText.includes("humano") ||
    lowerText.includes("human");

  if (wantsAbogado) {
    const handoffMsg =
      "Perfecto. He notificado de inmediato a su abogado asignado y a la secretaría del estudio. ⚖️🤝\n\n" +
      `Un profesional de nuestro equipo revisará su expediente y le contactará a la brevedad por esta vía o teléfono. He detenido el bot conversacional para que puedan conversar directamente.`;

    await sendTextMessage(waPhone, handoffMsg, creds);
    await updateStage(conversation.id, "handoff");
    
    await appendMessage(conversation.id, {
      role: "user",
      content: messageText,
      timestamp: new Date().toISOString(),
    });
    await appendMessage(conversation.id, {
      role: "assistant",
      content: handoffMsg,
      timestamp: new Date().toISOString(),
    });

    await notifyHandoff(null, waPhone, "Cliente solicita abogado / atención judicial humana", businessConfig, creds);
    return;
  }

  // 2. Fetch legal client record
  const client = await getLegalClient(waPhone);

  // CASE A: Client NOT registered
  if (!client) {
    const extractedRut = extractRut(messageText);

    if (extractedRut) {
      const formatted = formatRut(extractedRut);
      const isValid = validateRut(formatted);

      if (!isValid) {
        const errorMsg =
          `Disculpe, el RUT ingresado (*${formatted}*) no parece ser válido según el algoritmo verificador. ⚠️\n\n` +
          `Por favor, vuelva a ingresar su **RUT** completo con dígito verificador para poder buscar sus causas judiciales (ejemplo: \`15.936.028-9\`).`;
        
        await sendTextMessage(waPhone, errorMsg, creds);
        return;
      }

      // Valid RUT - register client
      const newClient = await registerLegalClient({
        id: waPhone,
        rut: formatted,
        full_name: displayName || "Cliente Judicial",
        email: null,
      });

      const successMsg = `¡Muchas gracias! Su RUT *${formatted}* ha sido verificado y vinculado con éxito a su número de celular. 🤝\n\nBuscando sus causas judiciales activas en nuestro sistema...`;
      await sendTextMessage(waPhone, successMsg, creds);

      // Instantly query causes for this client
      const cases = await getCasesByRut(formatted);

      if (cases.length === 0) {
        const noCasesMsg =
          `Actualmente no encontramos causas judiciales activas vinculadas a su RUT (*${formatted}*) en nuestro sistema. 📂\n\n` +
          `Si considera que esto es un error o su caso fue iniciado recientemente, por favor solicite asistencia a su abogado asignado presionando el botón de abajo:`;
        
        const noCasesButtons = [
          { id: "btn_abogado_legal", title: "🗣️ Hablar con Abogado" }
        ];
        
        await sendButtonMessage(waPhone, noCasesMsg, noCasesButtons, creds);
        
        await appendMessage(conversation.id, {
          role: "user",
          content: messageText,
          timestamp: new Date().toISOString(),
        });
        await appendMessage(conversation.id, {
          role: "assistant",
          content: successMsg + "\n" + noCasesMsg,
          timestamp: new Date().toISOString(),
        });
      } else {
        // We have cases! List them
        await listClientCases(waPhone, newClient.full_name, cases, conversation.id, messageText, creds);
      }
    } else {
      // Send welcome prompt asking for RUT
      const welcomeMsg =
        `Estimado/a, le damos la bienvenida a *JurisClaro AI* ⚖️, el canal de atención interactivo de su estudio jurídico.\n\n` +
        `Para poder brindarle un informe detallado sobre el estado de sus juicios y traducir las resoluciones complejas del Poder Judicial a un lenguaje simple y comprensible, por favor **ingrese su RUT** (ejemplo: \`15.936.028-9\`).`;

      await sendTextMessage(waPhone, welcomeMsg, creds);
    }
    return;
  }

  // CASE B: Client is already registered
  const cases = await getCasesByRut(client.rut);

  if (cases.length === 0) {
    const noCasesMsg =
      `Estimado/a *${client.full_name}*, no encontramos causas judiciales activas asociadas a su RUT (*${client.rut}*) en nuestro sistema. 📂\n\n` +
      `Si tiene una causa en trámite o requiere hablar con un profesional del estudio, presione el botón de abajo:`;
    
    const buttons = [
      { id: "btn_abogado_legal", title: "🗣️ Hablar con Abogado" }
    ];
    
    await sendButtonMessage(waPhone, noCasesMsg, buttons, creds);
    return;
  }

  // Detect which case is selected (either by exact RIT text or button cause_[RIT])
  let selectedCase: LegalCase | undefined;
  
  if (lowerText.startsWith("cause_")) {
    const ritSelected = messageText.substring(6).trim();
    selectedCase = cases.find(c => c.rol.toUpperCase() === ritSelected.toUpperCase());
  } else {
    // Check if the user typed the RIT directly
    selectedCase = cases.find(c => lowerText.includes(c.rol.toLowerCase()) || c.rol.toLowerCase() === lowerText);
  }

  if (selectedCase) {
    // ⚠️ STRESS/CRITICAL ALERT CHECK
    const ALERT_WORDS = ["embargo", "arresto", "detencion", "detención", "lanzamiento", "desalojo", "prision", "prisión", "remate", "fuerza publica", "fuerza pública", "orden de arresto"];
    const textToAnalyze = (selectedCase.raw_resolution + " " + selectedCase.translated_resolution).toLowerCase();
    
    const containsAlert = ALERT_WORDS.some(word => textToAnalyze.includes(word));

    if (containsAlert) {
      // High-stress resolution: Trigger prioritarian handoff immediately
      const alertMsg =
        `⚖️ *ALERTA EN SU CAUSA ROL: ${selectedCase.rol}*\n` +
        `*Tribunal:* ${selectedCase.tribunal}\n` +
        `*Carátula:* ${selectedCase.caratula}\n\n` +
        `⚠️ *Aviso Importante:* Hemos detectado que la última actualización procesal de su caso contiene un hito judicial prioritario.\n\n` +
        `Para su absoluta tranquilidad y resguardo legal, **hemos derivado este chat con máxima urgencia a su abogado asignado**, congelando temporalmente el asistente virtual. Un profesional de nuestro equipo se comunicará directamente con usted en breves minutos para guiarle. Su caso está en manos de especialistas.`;

      await sendTextMessage(waPhone, alertMsg, creds);
      await updateStage(conversation.id, "handoff");

      await appendMessage(conversation.id, {
        role: "user",
        content: messageText,
        timestamp: new Date().toISOString(),
      });
      await appendMessage(conversation.id, {
        role: "assistant",
        content: alertMsg,
        timestamp: new Date().toISOString(),
      });

      await notifyHandoff(
        null, 
        waPhone, 
        `🚨 ALERTA JUDICIAL EN CAUSA ${selectedCase.rol} (${selectedCase.caratula}) — Se detectaron palabras críticas. Handoff prioritario.`, 
        businessConfig, 
        creds
      );
      return;
    }

    // Normal Resolution: Present the Gemini translation!
    const caseMsg =
      `⚖️ *Causa ROL:* ${selectedCase.rol}\n` +
      `🏛️ *Tribunal:* ${selectedCase.tribunal}\n` +
      `👤 *Carátula:* ${selectedCase.caratula}\n` +
      `📌 *Estado:* ${selectedCase.status}\n\n` +
      `${selectedCase.translated_resolution}\n\n` +
      `_Última sincronización: ${new Date(selectedCase.updated_at).toLocaleDateString("es-CL")}_`;

    const buttons = [
      { id: "btn_human_legal", title: "🗣️ Hablar con Abogado" }
    ];

    if (cases.length > 1) {
      buttons.unshift({ id: "btn_other_cases", title: "⚖️ Ver Otras Causas" });
    }

    await sendButtonMessage(waPhone, caseMsg, buttons, creds);

    await appendMessage(conversation.id, {
      role: "user",
      content: messageText,
      timestamp: new Date().toISOString(),
    });
    await appendMessage(conversation.id, {
      role: "assistant",
      content: caseMsg,
      timestamp: new Date().toISOString(),
    });
  } else {
    // If they have only 1 case, show it directly instead of showing a list!
    if (cases.length === 1) {
      selectedCase = cases[0];
      // Reuse the same logic above:
      const ALERT_WORDS = ["embargo", "arresto", "detencion", "detención", "lanzamiento", "desalojo", "prision", "prisión", "remate", "fuerza publica", "fuerza pública", "orden de arresto"];
      const textToAnalyze = (selectedCase.raw_resolution + " " + selectedCase.translated_resolution).toLowerCase();
      const containsAlert = ALERT_WORDS.some(word => textToAnalyze.includes(word));

      if (containsAlert) {
        const alertMsg =
          `⚖️ *ALERTA EN SU CAUSA ROL: ${selectedCase.rol}*\n` +
          `*Tribunal:* ${selectedCase.tribunal}\n` +
          `*Carátula:* ${selectedCase.caratula}\n\n` +
          `⚠️ *Aviso Importante:* Hemos detectado que la última actualización procesal de su caso contiene un hito judicial prioritario.\n\n` +
          `Para su absoluta tranquilidad y resguardo legal, **hemos derivado este chat con máxima urgencia a su abogado asignado**, congelando el bot. Un profesional de nuestro equipo se comunicará directamente con usted.`;

        await sendTextMessage(waPhone, alertMsg, creds);
        await updateStage(conversation.id, "handoff");

        await appendMessage(conversation.id, {
          role: "user",
          content: messageText,
          timestamp: new Date().toISOString(),
        });
        await appendMessage(conversation.id, {
          role: "assistant",
          content: alertMsg,
          timestamp: new Date().toISOString(),
        });

        await notifyHandoff(null, waPhone, `🚨 ALERTA JUDICIAL EN CAUSA ${selectedCase.rol}`, businessConfig, creds);
        return;
      }

      const caseMsg =
        `⚖️ *Causa ROL:* ${selectedCase.rol}\n` +
        `🏛️ *Tribunal:* ${selectedCase.tribunal}\n` +
        `👤 *Carátula:* ${selectedCase.caratula}\n` +
        `📌 *Estado:* ${selectedCase.status}\n\n` +
        `${selectedCase.translated_resolution}\n\n` +
        `_Última sincronización: ${new Date(selectedCase.updated_at).toLocaleDateString("es-CL")}_`;

      const buttons = [
        { id: "btn_human_legal", title: "🗣️ Hablar con Abogado" }
      ];

      await sendButtonMessage(waPhone, caseMsg, buttons, creds);

      await appendMessage(conversation.id, {
        role: "user",
        content: messageText,
        timestamp: new Date().toISOString(),
      });
      await appendMessage(conversation.id, {
        role: "assistant",
        content: caseMsg,
        timestamp: new Date().toISOString(),
      });
    } else {
      // Multiple cases, just list them
      await listClientCases(waPhone, client.full_name, cases, conversation.id, messageText, creds);
    }
  }
}

/**
 * Internal helper to present case list.
 */
async function listClientCases(
  waPhone: string,
  fullName: string,
  cases: LegalCase[],
  conversationId: string,
  userInput: string,
  creds?: WhatsAppCredentials
): Promise<void> {
  const listMsg =
    `Estimado/a *${fullName}*, bienvenido/a. ⚖️\n\n` +
    `Actualmente nuestro estudio tiene en seguimiento *${cases.length} causa(s) judicial(es)* asociadas a su RUT.\n\n` +
    `Seleccione el RIT de la causa que desea revisar pulsando el botón correspondiente:`;

  // Max 3 buttons in WhatsApp, if > 3 list them in text and ask to reply with RIT
  const buttons = cases.slice(0, 2).map((c) => ({
    id: `cause_${c.rol}`,
    title: c.rol,
  }));
  
  // Add support button
  buttons.push({
    id: "btn_human_legal",
    title: "🗣️ Hablar con Abogado",
  });

  if (cases.length > 2) {
    // Text fallback for more cases
    const listText = cases.map((c, idx) => `${idx + 1}. *${c.rol}* (${c.caratula}) - ${c.tribunal}`).join("\n");
    const longMsg =
      `${listMsg}\n\n${listText}\n\n` +
      `💡 _Escriba directamente el RIT (ej: ${cases[0].rol}) de la causa que desea consultar._`;
      
    await sendButtonMessage(waPhone, longMsg, [buttons[2]], creds); // only "hablar con abogado" button
  } else {
    await sendButtonMessage(waPhone, listMsg, buttons, creds);
  }

  await appendMessage(conversationId, {
    role: "user",
    content: userInput,
    timestamp: new Date().toISOString(),
  });
  await appendMessage(conversationId, {
    role: "assistant",
    content: listMsg,
    timestamp: new Date().toISOString(),
  });
}
