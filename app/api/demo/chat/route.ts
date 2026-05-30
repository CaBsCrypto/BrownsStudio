import { generateReply } from "@/lib/ai/claude";

export async function POST(request: Request): Promise<Response> {
  try {
    const { businessName, botName, services, faqs, messages } = await request.json();

    if (!businessName || !botName || !messages || !Array.isArray(messages)) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Build a highly optimized, dynamic system prompt simulating a real WhatsApp sales bot
    const systemPrompt = `
Eres ${botName}, el asistente virtual inteligente de ${businessName}.
Tu objetivo principal es chatear de forma empática, profesional y muy humana en WhatsApp, resolviendo dudas de los prospectos e incentivándolos a agendar.

INFORMACIÓN DE SERVICIOS Y PRECIOS DEL NEGOCIO:
${services || "No especificados."}

PREGUNTAS FRECUENTES, REGLAS Y HORARIOS:
${faqs || "No especificadas."}

TU PERSONALIDAD Y TONO:
- Tono: Sumamente empático, profesional pero cálido y conversacional. Hablas de "tú", usas lenguaje chileno/latinoamericano natural (ej: "cuéntame", "dime", "qué bueno tenerte por acá"). Evitas el voseo argentino ("decime", "contame").
- Concisión: Máximo 2 o 3 párrafos por respuesta. WhatsApp debe sentirse dinámico, no envíes testamentos de texto.
- Formato de Negritas: Para destacar texto usa asteriscos simples: *texto*. NUNCA uses dobles (**texto**) ni triples (***texto***) ya que WhatsApp no los renderiza bien y se ven feos.
- Emojis: Sé sutil, 1 o 2 por mensaje como máximo.
- Si el usuario te hace una consulta que no está definida arriba, dile amablemente: "Eso prefiero confirmarlo directamente con nuestro equipo de asesores de ${businessName}. ¿Te parece si te conecto con uno de ellos o agendamos una llamada de 15 minutos para verlo en detalle?".
`.trim();

    // Use Gemini via generateReply
    const reply = await generateReply(systemPrompt, messages);
    
    // Clean any formatting anomalies (double/triple asterisks)
    const cleanedReply = reply.replace(/\*{2,}/g, "*");

    return Response.json({ reply: cleanedReply });
  } catch (err: any) {
    console.error("[Demo Chat API] Error in execution:", err);
    return new Response(err.message || "Internal Server Error", { status: 500 });
  }
}
