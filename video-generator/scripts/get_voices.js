const fs = require('fs');
require('dotenv').config();

fetch('https://api.elevenlabs.io/v1/voices', {
  headers: {
    'xi-api-key': process.env.ELEVENLABS_API_KEY
  }
})
.then(res => res.json())
.then(data => {
  if (!data.voices) {
    console.log("No voices found:", data);
    return;
  }
  const females = data.voices.filter(v => v.labels && v.labels.gender === 'female');
  console.log("Found " + females.length + " female voices");
  females.slice(0, 10).forEach(v => {
    console.log(`${v.name} - ${v.voice_id} - ${v.labels?.accent || 'No accent'}`);
  });
})
.catch(e => console.error(e));
