const { getAudioDurationInSeconds } = require('get-audio-duration');
async function check() {
  const d1 = await getAudioDurationInSeconds('public/voiceovers/v1_dental_pipeline.mp3');
  const d2 = await getAudioDurationInSeconds('public/voiceovers/v1_dental_outro.mp3');
  console.log(`v1_dental_pipeline.mp3: ${d1} sec (${Math.ceil(d1 * 30)} frames)`);
  console.log(`v1_dental_outro.mp3: ${d2} sec (${Math.ceil(d2 * 30)} frames)`);
}
check();
