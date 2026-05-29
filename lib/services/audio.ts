import { GoogleGenerativeAI } from "@google/generative-ai";

const DEFAULT_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

function getGeminiClient(apiKeyOverride?: string): GoogleGenerativeAI {
  if (apiKeyOverride) return new GoogleGenerativeAI(apiKeyOverride);
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set — obtené tu key gratis en aistudio.google.com/apikey");
  }
  return new GoogleGenerativeAI(apiKey);
}

/**
 * Downloads a WhatsApp audio message from Meta Cloud API or Kapso.
 */
export async function downloadWhatsAppAudio(
  mediaId: string,
  accessToken?: string
): Promise<{ buffer: Buffer; mimeType: string }> {
  const token = accessToken ?? process.env.WHATSAPP_ACCESS_TOKEN ?? "";
  const headers: Record<string, string> = {};
  
  const kapsoApiKey = process.env.KAPSO_API_KEY;
  let url = "";

  if (kapsoApiKey) {
    // Kapso proxy route for media downloads
    url = `https://api.kapso.ai/meta/whatsapp/v24.0/media/${mediaId}`;
    headers["X-API-Key"] = kapsoApiKey;
  } else {
    // Direct Meta Cloud API route
    url = `https://graph.facebook.com/v21.0/${mediaId}`;
    headers["Authorization"] = `Bearer ${token}`;
  }

  console.log(`[audio] Fetching media metadata from: ${url}`);

  // 1. Fetch media metadata to obtain the actual binary download URL
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to fetch WhatsApp media metadata: ${res.statusText}. Details: ${errText}`);
  }
  
  const data = await res.json();
  const downloadUrl = data.url;
  const mimeType = data.mime_type || "audio/ogg";

  if (!downloadUrl) {
    throw new Error("Meta/Kapso API did not return a media download URL.");
  }

  console.log(`[audio] Downloading binary bytes from: ${downloadUrl}`);

  // 2. Fetch the raw binary bytes from the download URL
  // Note: Meta media download requests also require the Authorization header
  const mediaRes = await fetch(downloadUrl, { headers });
  if (!mediaRes.ok) {
    const errText = await mediaRes.text();
    throw new Error(`Failed to download binary audio bytes: ${mediaRes.statusText}. Details: ${errText}`);
  }

  const arrayBuffer = await mediaRes.arrayBuffer();
  return { buffer: Buffer.from(arrayBuffer), mimeType };
}

/**
 * Transcribes an audio buffer using Google Gemini's native multimodal capabilities.
 */
export async function transcribeAudioWithGemini(
  audioBuffer: Buffer,
  mimeType: string,
  apiKeyOverride?: string
): Promise<string> {
  const client = getGeminiClient(apiKeyOverride);
  const model = client.getGenerativeModel({
    model: DEFAULT_MODEL,
  });

  const base64Data = audioBuffer.toString("base64");
  const audioPart = {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };

  const prompt =
    "Eres un transcriptor de audio profesional experto en español de Chile. " +
    "Transcribe el siguiente archivo de audio de forma EXACTA y LITERAL al español. " +
    "Conserva todas las palabras, modismos chilenos y muletillas (ej: 'weón', 'po', 'cachai', 'dime', 'cuéntame'). " +
    "No interpretes, no resumas, y sobre todo NUNCA agregues preámbulos, explicaciones ni textos adicionales en tu respuesta. " +
    "Devuelve ÚNICAMENTE la transcripción literal del audio en texto plano.";

  console.log(`[audio] Invoking Gemini (${DEFAULT_MODEL}) for transcription...`);

  const result = await model.generateContent([prompt, audioPart]);
  const transcript = result.response.text().trim();

  if (!transcript) {
    throw new Error("Gemini returned an empty transcription response.");
  }

  console.log(`[audio] Transcription complete: "${transcript.substring(0, 60)}..."`);
  return transcript;
}
