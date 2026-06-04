import fs from "fs";
import path from "path";
import "dotenv/config";

// Chilean female voice provided by user
const VOICE_ID = "Fd38GRHtJllY0CuguAy9"; 
const MODEL_ID = "eleven_multilingual_v2";

const SEGMENTS = [
  {
    name: "v1_dental_hook_v4.mp3",
    text: "¿Pierdes cotizaciones de tratamientos por no responder a tiempo? Así lo resolvemos con Inteligencia Artificial."
  },
  {
    name: "v1_dental_pipeline_v3.mp3",
    text: "Nuestra IA se conecta a tu sistema, agenda pacientes 24/7 y envía recordatorios automáticos, garantizando que cada reserva se convierta en una atención efectiva."
  },
  {
    name: "v1_dental_outro_v3.mp3",
    text: "Atención 24/7 y agenda cien por ciento automatizada. Ve al link en nuestro perfil y pide tu demo gratis."
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
  const voiceoversDir = path.join(process.cwd(), "public/voiceovers");

  for (const seg of SEGMENTS) {
    const outputPath = path.join(voiceoversDir, seg.name);
    await generateAudio(seg.text, outputPath);
  }

  console.log("All dental voiceovers generated successfully! 🎉");
}

main().catch(console.error);
