import fs from "fs";
import path from "path";
import "dotenv/config";

const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel (Voz femenina hiper-realista, estándar de la industria)
const MODEL_ID = "eleven_multilingual_v2";

const OUTRO_TEXT = "Ve al link en el perfil y solicita una demostración de Inteligencia Artificial gratuita para tu negocio.";

async function generateAudio(text: string, outputPath: string) {
  console.log(`Generating audio for: "${text.substring(0, 30)}..."`);
  
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
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.3,
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
  const leadsPath = path.join(__dirname, "../leads.json");
  const leads = JSON.parse(fs.readFileSync(leadsPath, "utf8"));
  const voiceoversDir = path.join(__dirname, "../public/voiceovers");

  // 1. Generate standard Outro
  await generateAudio(OUTRO_TEXT, path.join(voiceoversDir, "outro_v3.mp3"));

  // 2. Generate Hook for each lead
  for (const lead of leads) {
    const fullHookText = lead.industry === "abogados"
      ? lead.hookText
      : `${lead.hookText} Cada mensaje sin respuesta es una oportunidad perdida. Así lo resolvemos con inteligencia artificial.`;
    const hookFileName = `${lead.id}_hook.mp3`;
    
    const hookPath = path.join(voiceoversDir, hookFileName);
    // Force generation for lawyers or if file does not exist
    if (!fs.existsSync(hookPath) || lead.id === "abogados-pro" || lead.id === "dental-pro") {
      await generateAudio(fullHookText, hookPath);
    } else {
      console.log(`Skipping ${hookFileName} (already exists)`);
    }
  }

  console.log("All voiceovers generated successfully! 🎉");
}

main().catch(console.error);
