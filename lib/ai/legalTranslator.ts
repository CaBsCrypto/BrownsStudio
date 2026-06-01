// ── AI Legal Translator for Chilean Judicial Jargon — Gemini 2.0 Flash 🇨🇱⚖️
import { GoogleGenerativeAI } from "@google/generative-ai";

const DEFAULT_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

function getClient(apiKeyOverride?: string): GoogleGenerativeAI {
  if (apiKeyOverride) return new GoogleGenerativeAI(apiKeyOverride);
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set — obtené tu key gratis en aistudio.google.com/apikey");
  }
  return new GoogleGenerativeAI(apiKey);
}

/**
 * Custom dictionary of common Chilean legal abbreviations/jargon to friendly terms.
 * This acts as dynamic context for the AI prompt.
 */
const JURIDICAL_GLOSSARY = `
- "Téngase por acompañado": Significa que el juez ha recibido los documentos o pruebas presentados y los ha agregado oficialmente al expediente.
- "Traslado con citación": Significa que se le ha informado de una solicitud a la otra parte, dándole un plazo para opinar u objetar antes de decidir.
- "No ha lugar": Significa que el juez ha rechazado la solicitud que se le hizo por no cumplir con los requisitos o no corresponder legalmente.
- "A lo principal, por interpuesto": Se refiere a la solicitud principal del escrito (demanda, recurso, etc.), la cual el juez acepta a tramitación.
- "Firma electrónica avanzada (FEA)": Firma digital con validez legal completa equivalente a la firma manuscrita notariada.
- "Autos": Se refiere al expediente físico o digital del juicio.
- "Proveído": Cualquier resolución o decisión dictada por el juez para avanzar en el trámite.
- "Recepto judicial / Receptor": Funcionario encargado de notificar personalmente una resolución a las partes fuera del tribunal.
- "Cúmplase": Orden del juez para que se ejecute estrictamente lo que se ha resuelto.
`;

/**
 * Translates a complex Chilean PJUD resolution into plain, friendly Chilean Spanish.
 */
export async function translateResolutionWithGemini(
  rawText: string,
  jurisdiccion: string,
  apiKeyOverride?: string
): Promise<string> {
  try {
    const client = getClient(apiKeyOverride);
    const model = client.getGenerativeModel({
      model: DEFAULT_MODEL,
      generationConfig: {
        maxOutputTokens: 600,
        temperature: 0.2, // low temperature for precise, accurate legal translation
      },
    });

    const systemInstruction = `Eres "JurisClaro AI", un asistente legal experto de un prestigioso estudio jurídico chileno.
Tu única misión es traducir resoluciones judiciales altamente técnicas y complejas del Poder Judicial de Chile (PJUD) a un lenguaje extremadamente claro, amigable y comprensible para cualquier ciudadano común (un cliente del estudio).

Sigue estas directrices estrictas:
1. Sé cálido, tranquilizador y profesional. Mantén un tono cercano ("chileno amable", sin caer en modismos vulgares o chilenismos informales, pero sí usando un español de Chile cercano y empático).
2. Estructura tu respuesta en 3 secciones muy claras usando markdown:
   * ⚖️ **¿Qué pasó hoy en tu caso?**: Explica de forma súper simple y en un solo párrafo corto qué significa la resolución en la práctica (ej: el juez recibió un documento, se fijó una fecha, se rechazó una petición, etc.).
   * 💡 **¿Qué significa esto para ti?**: Explica de forma práctica el impacto que esto tiene para el cliente. Evita palabras complicadas. Si es una buena o mala noticia, explícalo con calma.
   * 🚀 **Próximo paso**: Qué ocurrirá a continuación o qué debe hacer el cliente (ej: "No tienes que hacer nada, nuestro equipo ya está preparando el siguiente escrito").
3. Glosario de ayuda chilena:
${JURIDICAL_GLOSSARY}

Jurisdicción del caso: ${jurisdiccion} (esto te da contexto de si es Civil, Laboral, Familia o Cobranza).

IMPORTANTE: No inventes plazos ni consecuencias extremas si no están escritas en el texto. Sé siempre veraz pero amigable.`;

    const prompt = `Por favor, traduce y explica la siguiente resolución judicial:
---
${rawText}
---`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      systemInstruction: systemInstruction,
    });

    const text = result.response.text();
    if (!text) throw new Error("Received empty response from Gemini");
    return text.trim();
  } catch (error) {
    console.error("Error in translateResolutionWithGemini:", error);
    return `⚖️ **Nueva actualización procesal**\n\nSe ha recibido una nueva resolución técnica en su causa de materia ${jurisdiccion}.\n\n*Texto original:* ${rawText}\n\n*Nota:* Nuestro equipo de abogados está revisando detalladamente esta actualización para indicarle los pasos a seguir. Si tiene dudas urgentes, por favor escriba a su abogado asignado.`;
  }
}
