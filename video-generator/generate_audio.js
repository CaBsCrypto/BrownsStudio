const fs = require('fs');
require('dotenv').config();

// We use Rachel (21m00Tcm4TlvDq8ikWAM) or Bella (EXAVITQu4vr4xnSDxMaL)
const text = "¿Asientos vacíos en tu clínica dental? Así lo resolvemos con Inteligencia Artificial.";
const voice_id = "EXAVITQu4vr4xnSDxMaL"; 
const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`;

fetch(url, {
  method: 'POST',
  headers: {
    'xi-api-key': process.env.ELEVENLABS_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: text,
    model_id: "eleven_multilingual_v2",
    voice_settings: { stability: 0.5, similarity_boost: 0.75 }
  })
})
.then(res => {
  if (!res.ok) {
    return res.text().then(err => { throw new Error(err) });
  }
  return res.arrayBuffer();
})
.then(buffer => {
  fs.writeFileSync('public/voiceovers/v1_dental_hook_v2.mp3', Buffer.from(buffer));
  console.log('Saved v1_dental_hook_v2.mp3');
})
.catch(console.error);
