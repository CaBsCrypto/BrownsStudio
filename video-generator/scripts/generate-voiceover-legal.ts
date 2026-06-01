import fs from "fs";
import path from "path";
import "dotenv/config";

// Deep male Spanish voice ID (e.g., Adam: pNInz6obpgfrhhF2Ewqi)
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; 
const MODEL_ID = "eleven_multilingual_v2";

const SEGMENTS = [
  {
    name: "v2_legal_hook.mp3",
    text: "¿Tus abogados junior pierden horas respondiendo dudas repetitivas de clientes? Así es como lo resuelves."
  },
  {
    name: "v2_legal_pipeline.mp3",
    text: "Automatiza la consulta de causas con Inteligencia Artificial conectada directamente al Poder Judicial Chileno."
  },
  {
    name: "v3_legal_outro.mp3",
    text: "Ahorra hasta un setenta por ciento de tiempo en atención y libera a tu equipo para litigar. El futuro de tu estudio empieza hoy."
  }
];

async function generateAudio(text: string, outputPath: string) {
  console.log(`Generating audio for: "${text.substring(0, 40)}..."`);
  
  if (!process.env.ELEVENLABS_API_KEY) {
    throw new Error("ELEVENLABS_API_KEY is not set in .env");
  }

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: MODEL_ID,
        voice_settings: {
          stability: 0.60,
          similarity_boost: 0.75,
          style: 0.35,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ElevenLabs API error: ${response.status} ${errorText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  
  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, buffer);
  console.log(`Saved -> ${outputPath}`);
}

async function main() {
  const voiceoversDir = path.join(__dirname, "../public/voiceovers");

  for (const seg of SEGMENTS) {
    const outputPath = path.join(voiceoversDir, seg.name);
    await generateAudio(seg.text, outputPath);
  }

  console.log("All legal voiceovers generated successfully! 🎉");
}

main().catch(console.error);
