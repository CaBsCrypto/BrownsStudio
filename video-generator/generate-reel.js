const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// ─── ElevenLabs voiceover scripts ─────────────────────────────────────────
// Copy-paste these into ElevenLabs and save the outputs to:
//   video-generator/public/voiceovers/
//
// dental hook  → reel_dental_hook_v1.mp3
//   "El 73% de los pacientes elige al primero en responder.
//    ¿Tu clínica está respondiendo a tiempo?"
//
// dental CTA   → reel_dental_cta_v1.mp3
//   "Ponle un asistente de inteligencia artificial a tu clínica.
//    Empieza hoy en browns punto studio"
//
// abogados hook → reel_abogados_hook_v1.mp3
//   "9 de cada 10 consultas legales no califican.
//    Tu equipo pierde horas filtrando casos. Ya no más."
//
// abogados CTA  → reel_abogados_cta_v1.mp3
//   "Automatiza el filtrado de casos legales con inteligencia artificial.
//    Pruébalo gratis en browns punto studio"
// ──────────────────────────────────────────────────────────────────────────

// Ensure output directory exists
const outputDir = path.join(__dirname, "output", "reels");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Parse CLI arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const key = args[i].substring(2);
      const val = args[i + 1];
      if (val && !val.startsWith("--")) {
        parsed[key] = val;
        i++;
      } else {
        parsed[key] = true;
      }
    }
  }
  return parsed;
}

const args = parseArgs();

// Load reel leads
const reelLeadsPath = path.join(__dirname, "reel-leads.json");
if (!fs.existsSync(reelLeadsPath)) {
  console.error("❌ Error: No se encontró reel-leads.json");
  process.exit(1);
}

const reelLeads = JSON.parse(fs.readFileSync(reelLeadsPath, "utf8"));

// Filter by --id if provided, otherwise render all
const leadsToRender = args.id
  ? reelLeads.filter((l) => l.id === args.id)
  : reelLeads;

if (leadsToRender.length === 0) {
  console.error(`❌ Error: No se encontró ningún lead con id="${args.id}"`);
  console.error(`   IDs disponibles: ${reelLeads.map((l) => l.id).join(", ")}`);
  process.exit(1);
}

console.log(
  `\n🎬 Browns Studio — Reel Generator (9:16 vertical)\n` +
    `   Renderizando ${leadsToRender.length} reel(s)...\n`
);

leadsToRender.forEach((lead, index) => {
  renderReel(lead, index + 1, leadsToRender.length);
});

console.log("\n✅ ¡Todos los reels se han renderizado con éxito!");
console.log(`📁 Guardados en: ${outputDir}\n`);

// ─── Render function ────────────────────────────────────────────────────────
function renderReel(lead, current, total) {
  const outputFileName = `reel-${lead.id}.mp4`;
  const outputPath = path.join(outputDir, outputFileName);

  // Write props to temp file (avoids Windows shell quote-stripping)
  const tempPropsPath = path.join(__dirname, `temp-reel-props-${lead.id}.json`);
  fs.writeFileSync(tempPropsPath, JSON.stringify(lead, null, 2), "utf8");

  console.log(`[${current}/${total}] 🎥 Generando: output/reels/${outputFileName}`);
  console.log(`        Industria: ${lead.industry} | Stat: ${lead.statNumber}`);

  const result = spawnSync(
    "pnpm",
    [
      "run",
      "remotion",
      "--",
      "render",
      "src/index.ts",
      lead.id,
      outputPath,
      `--props=${tempPropsPath}`,
      "--color",
    ],
    {
      stdio: "inherit",
      shell: true,
      cwd: __dirname,
    }
  );

  // Clean up temp file
  if (fs.existsSync(tempPropsPath)) {
    try {
      fs.unlinkSync(tempPropsPath);
    } catch (_) {
      // Ignore cleanup errors
    }
  }

  if (result.status === 0) {
    console.log(`   🟢 Éxito! → ${outputPath}\n`);
  } else {
    console.error(`   🔴 Falló el renderizado de: ${lead.id}\n`);
  }
}
