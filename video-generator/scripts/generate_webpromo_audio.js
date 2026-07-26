const fs = require("fs");
const path = require("path");
require("dotenv").config();

const VOICE_ID = "Fd38GRHtJllY0CuguAy9"; // Voz femenina chilena (Bella)
const MODEL   = "eleven_multilingual_v2";
const API_KEY = process.env.ELEVENLABS_API_KEY;

const VOICE_SETTINGS = {
  stability: 0.60,
  similarity_boost: 0.75,
  style: 0.35,
};

const AUDIOS = [
  {
    file: "public/voiceovers/webpromo_scene1.mp3",
    text: "¿Aún usas una página web anticuada y lenta que espanta a tus clientes? El 53% abandona tu web si tarda en cargar.",
  },
  {
    file: "public/voiceovers/webpromo_scene2.mp3",
    text: "Lleva tu negocio al siguiente nivel. Danos tus requerimientos y nosotros nos encargamos del resto.",
  },
  {
    file: "public/voiceovers/webpromo_scene3.mp3",
    text: "Diseño moderno, ultrarrápido y optimizado para vender. Agenda una reunión hoy en Browns Studio.",
  }
];

async function generateAudio(text, outputFile) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;

  console.log(`\n🎙️  Generando: ${outputFile}`);
  console.log(`   → "${text.substring(0, 60)}..."`);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "xi-api-key": API_KEY,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: MODEL,
      voice_settings: VOICE_SETTINGS,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ElevenLabs API error (${res.status}): ${err}`);
  }

  const buffer = await res.arrayBuffer();
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, Buffer.from(buffer));
  console.log(`   ✅ Guardado: ${outputFile} (${(buffer.byteLength / 1024).toFixed(1)} KB)`);
}

(async () => {
  console.log("\n🔊 Browns Studio — Web Promo Audio Generator");
  console.log("   Voz: Bella · Modelo: eleven_multilingual_v2\n");

  if (!API_KEY) {
    console.error("❌ Error: ELEVENLABS_API_KEY no encontrada en .env");
    process.exit(1);
  }

  for (const audio of AUDIOS) {
    try {
      await generateAudio(audio.text, audio.file);
    } catch (err) {
      console.error(`\n❌ Error generando ${audio.file}:`, err.message);
    }
  }

  console.log("\n✅ ¡Voiceovers del Web Promo generados!\n");
})();
