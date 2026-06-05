/**
 * generate_reel_audio.js
 * Genera los 4 voiceovers del nuevo formato Reel 9:16 via ElevenLabs API.
 * Voz: Bella (EXAVITQu4vr4xnSDxMaL) — misma que los pitches existentes.
 * Modelo: eleven_multilingual_v2
 */

const fs = require("fs");
require("dotenv").config();

const VOICE_ID = "Fd38GRHtJllY0CuguAy9"; // Voz femenina chilena (misma que dental pitches)
const MODEL   = "eleven_multilingual_v2";
const API_KEY = process.env.ELEVENLABS_API_KEY;

const VOICE_SETTINGS = {
  stability: 0.60,
  similarity_boost: 0.75,
  style: 0.35,
};

const AUDIOS = [
  {
    file: "public/voiceovers/reel_dental_hook_v1.mp3",
    text: "El 73% de los pacientes elige al primero en responder. ¿Tu clínica está respondiendo a tiempo? Mira cómo nuestra Inteligencia Artificial atiende y agenda por ti.",
  },
  {
    file: "public/voiceovers/reel_dental_cta_v1.mp3",
    text: "Ponle un asistente de inteligencia artificial a tu clínica. Empieza hoy en browns punto studio.",
  },
  {
    file: "public/voiceovers/reel_abogados_hook_v1.mp3",
    text: "9 de cada 10 consultas legales no califican. Tu equipo pierde horas filtrando casos. Ya no más.",
  },
  {
    file: "public/voiceovers/reel_abogados_cta_v1.mp3",
    text: "Automatiza el filtrado de casos legales con inteligencia artificial. Pruébalo gratis en browns punto studio.",
  },
  {
    file: "public/voiceovers/reel_training_hook_v1.mp3",
    text: "El 45% del tiempo de tu equipo se pierde buscando información y manuales. Mira cómo nuestra IA responde por ti internamente.",
  },
  {
    file: "public/voiceovers/reel_training_cta_v1.mp3",
    text: "Ponle un asistente de inteligencia artificial a tu equipo corporativo. Empieza hoy en browns punto studio.",
  },
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
  fs.writeFileSync(outputFile, Buffer.from(buffer));
  console.log(`   ✅ Guardado: ${outputFile} (${(buffer.byteLength / 1024).toFixed(1)} KB)`);
}

(async () => {
  console.log("\n🔊 Browns Studio — Reel Audio Generator");
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

  console.log("\n✅ ¡Todos los voiceovers del reel generados!");
  console.log("   Próximo paso: en ReelVideoComposition.tsx cambia REEL_VO_READY = true\n");
})();
