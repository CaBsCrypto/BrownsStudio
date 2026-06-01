const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Default templates by industry to fall back on when generating via CLI with partial props
const industryTemplates = {
  dental: {
    botName: "Dra. Ana",
    hookText: "¿Pierdes pacientes en WhatsApp por demoras?",
    clientMessage: "¡Hola! Quisiera consultar por el precio del blanqueamiento dental.",
    botReply: "¡Hola! Con gusto. Nuestro Blanqueamiento LED Premium tiene un valor promo de $120.000 CLP. ¿Te acomoda agendar una evaluación gratuita?",
    ctaUrl: "browns.studio/demo",
    crmLabel: "Nuevo Paciente Calificado",
    actions: ["Crear Lead en HubSpot", "Agendar Evaluación", "Notificar a Cristian"]
  },
  inmobiliaria: {
    botName: "Soporte Andes",
    hookText: "¿Pierdes horas respondiendo requisitos básicos?",
    clientMessage: "Hola, me interesa el departamento en Providencia. ¿Cuáles son los requisitos y cuándo se puede ver?",
    botReply: "¡Hola! Para este depto pedimos liquidación 3x arriendo, aval y Dicom Platinum. ¿Cumples con los requisitos para agendarte una visita guiada?",
    ctaUrl: "browns.studio/demo",
    crmLabel: "Prospecto Pre-Calificado",
    actions: ["Crear Tarjeta CRM", "Guardar en Sheets", "Enviar Calendly"]
  },
  academia: {
    botName: "Tutor IA",
    hookText: "¿Tus asesores no dan abasto con los leads?",
    clientMessage: "Hola, me gustaría recibir el programa de estudios y el precio del Bootcamp de IA para Negocios.",
    botReply: "¡Hola! Claro que sí, aquí tienes el PDF del programa. El valor es de $450 USD. ¿Te gustaría agendar una llamada breve con admisiones?",
    ctaUrl: "browns.studio/demo",
    crmLabel: "Estudiante Interesado",
    actions: ["Guardar Lead", "Enviar Temario PDF", "Llamada Admisiones"]
  },
  ecommerce: {
    botName: "Asistente Zenith",
    hookText: "¿Clientes abandonando carritos por falta de soporte?",
    clientMessage: "Hola, hice un pedido hace 3 días y todavía no me llega el código de seguimiento. ¿Me ayudan?",
    botReply: "¡Hola! Tu compra #4902 ya está con Starken. Tu tracking es STK-98230. Te acabo de enviar un cupón del 10% de regalo por la demora.",
    ctaUrl: "browns.studio/demo",
    crmLabel: "Soporte Resuelto & Cupón Enviado",
    actions: ["Actualizar Shopify", "Crear Ticket de Soporte", "Enviar Cupón 10%"]
  },
  abogados: {
    botName: "Sofía",
    hookText: "¿Cuánto tiempo pierdes en consultas de despidos sin conocer los detalles del caso?",
    clientMessage: "Hola, me despidieron ayer de mi trabajo y creo que fue injustificado.",
    botReply: "¡Hola! Evaluamos tu caso en una consulta gratis. Para ver si calificas, ¿cuántos años trabajaste ahí?",
    ctaUrl: "browns.studio/legal",
    crmLabel: "Caso Calificado & Dossier",
    actions: ["Crear Expediente Digital", "Agendar Consulta Estratégica", "Notificar Abogado"]
  }
};

// Simple command line arguments parser
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

// Ensure the output folder exists
const outputDir = path.join(__dirname, "output");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const args = parseArgs();

if (args.name || args.industry) {
  // --- SINGLE RENDER CLI MODE ---
  const name = args.name || "Empresa Demo";
  const industry = args.industry || "dental";
  
  if (!industryTemplates[industry]) {
    console.error(`❌ Error: Industria inválida. Las opciones son: ${Object.keys(industryTemplates).join(", ")}`);
    process.exit(1);
  }

  console.log(`\n🚀 Iniciando renderizado individual para: "${name}" (${industry})`);
  
  const template = industryTemplates[industry];
  const leadData = {
    id: name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
    businessName: name,
    industry: industry,
    botName: args.bot || template.botName,
    hookText: args.hook || template.hookText,
    clientMessage: args.client || template.clientMessage,
    botReply: args.reply || template.botReply,
    ctaUrl: args.cta || template.ctaUrl,
    crmLabel: template.crmLabel,
    actions: template.actions
  };

  renderVideo(leadData);
} else {
  // --- BATCH RENDERING MODE (leads.json) ---
  console.log("\n📦 Iniciando renderizado por lotes (Batch Mode desde leads.json)...");
  
  const leadsPath = path.join(__dirname, "leads.json");
  if (!fs.existsSync(leadsPath)) {
    console.error("❌ Error: No se encontró el archivo leads.json en la carpeta.");
    process.exit(1);
  }

  try {
    const leads = JSON.parse(fs.readFileSync(leadsPath, "utf8"));
    console.log(`📝 Se encontraron ${leads.length} leads en la cola.`);
    
    leads.forEach((lead, index) => {
      console.log(`\n[${index + 1}/${leads.length}] Renderizando: "${lead.businessName}" (${lead.industry})`);
      renderVideo(lead);
    });
    
    console.log("\n✅ ¡Todos los videos se han renderizado con éxito!");
  } catch (error) {
    console.error("❌ Error al procesar leads.json:", error.message);
    process.exit(1);
  }
}

// Function to invoke Remotion CLI render
function renderVideo(lead) {
  const outputFileName = `pitch-${lead.id}.mp4`;
  const outputPath = path.join(outputDir, outputFileName);
  
  // Create a temporary JSON props file to prevent Windows shell quote-stripping issues
  const tempPropsPath = path.join(__dirname, `temp-props-${lead.id}.json`);
  fs.writeFileSync(tempPropsPath, JSON.stringify(lead, null, 2), "utf8");
  
  console.log(`\n🎥 Generando: output/${outputFileName}`);
  
  // Spawn the remotion command synchronously and inherit stdout/stderr for nice terminal visual bars
  const result = spawnSync("pnpm", [
    "run",
    "remotion",
    "--",
    "render",
    "src/index.ts",
    lead.id,
    outputPath,
    `--props=${tempPropsPath}`,
    "--color"
  ], {
    stdio: "inherit",
    shell: true,
    cwd: __dirname
  });

  // Clean up the temporary props file
  if (fs.existsSync(tempPropsPath)) {
    try {
      fs.unlinkSync(tempPropsPath);
    } catch (e) {
      // Ignore cleanup error if file locked
    }
  }

  if (result.status === 0) {
    console.log(`🟢 ¡Éxito! Video guardado en: ${outputPath}`);
  } else {
    console.error(`🔴 Falló el renderizado para: ${lead.businessName}`);
  }
}
