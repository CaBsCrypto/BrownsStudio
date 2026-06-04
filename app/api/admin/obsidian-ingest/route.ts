import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType, Schema } from "@google/generative-ai";
import JSZip from "jszip";

// Esquema estructurado para forzar a Gemini a devolver exactamente los 5 archivos
const obsidianSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    identidad: {
      type: SchemaType.STRING,
      description: "Contenido Markdown para 01_Identidad.md. Usa un tono imperativo para configurar el System Prompt. Incluye las restricciones absolutas.",
    },
    servicios: {
      type: SchemaType.STRING,
      description: "Contenido Markdown para 02_Servicios.md. DEBES usar Tablas Markdown para listar precios y servicios.",
    },
    operaciones: {
      type: SchemaType.STRING,
      description: "Contenido Markdown para 03_Operaciones.md. Políticas de reembolso, envíos, logística, horarios.",
    },
    faqs: {
      type: SchemaType.STRING,
      description: "Contenido Markdown para 04_FAQs.md. Usa formato de ### Pregunta seguida de la Respuesta.",
    },
    comercial: {
      type: SchemaType.STRING,
      description: "Contenido Markdown para 05_Comercial.md. Estrategias de venta, manejo de objeciones comunes y sus contraargumentos.",
    }
  },
  required: ["identidad", "servicios", "operaciones", "faqs", "comercial"],
};

export async function POST(request: Request) {
  try {
    const { clientName, rawText } = await request.json();

    if (!clientName || !rawText) {
      return NextResponse.json({ error: "Faltan datos obligatorios (clientName, rawText)" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Falta configurar GEMINI_API_KEY en las variables de entorno" }, { status: 500 });
    }

    console.log(`[Obsidian Ingest] Iniciando parseo para cliente: ${clientName}`);
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Usamos el modelo optimizado para tareas largas y estructuradas
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: obsidianSchema,
        temperature: 0.2, // Baja temperatura para mantener precisión de datos duros
      },
    });

    const prompt = `
      Eres un Ingeniero Experto en Prompting y RAG (Retrieval-Augmented Generation).
      Tu tarea es analizar el siguiente documento desordenado proporcionado por un cliente y estructurarlo 
      en 5 archivos Markdown optimizados para ser leídos por un Cerebro de Inteligencia Artificial (Obsidian Vault).
      
      INSTRUCCIONES CLAVE PARA EVITAR ALUCINACIONES:
      1. Extrae los datos duros exactamente como vienen (precios, números, horarios).
      2. No inventes información que no esté en el texto.
      3. Para el archivo de "servicios", DEBES usar el formato de tablas de Markdown (ej. | Servicio | Precio |).
      4. Para el archivo de "identidad", redacta en tono imperativo como instrucciones para la IA (ej. "NUNCA des un descuento").
      5. Evita pronombres ambiguos (usa nombres de productos literales).

      === DOCUMENTO EN BRUTO DEL CLIENTE ===
      ${rawText}
      ======================================
    `;

    const result = await model.generateContent(prompt);
    const responseData = JSON.parse(result.response.text());

    const safeClientId = clientName.toLowerCase().replace(/[^a-z0-9]/g, "-");

    // Crear el ZIP en memoria en lugar de escribir en disco (para soportar Vercel Serverless)
    const zip = new JSZip();

    // Escribir los 5 archivos Markdown en la raiz del ZIP
    zip.file("01_Identidad.md", responseData.identidad);
    zip.file("02_Servicios.md", responseData.servicios);
    zip.file("03_Operaciones.md", responseData.operaciones);
    zip.file("04_FAQs.md", responseData.faqs);
    zip.file("05_Comercial.md", responseData.comercial);

    // Escribir la configuración base para que Obsidian lo reconozca como un Vault
    const obsidianDir = zip.folder(".obsidian");
    if (obsidianDir) {
      const appJson = {
        "attachmentFolderPath": "/",
        "alwaysUpdateLinks": true,
        "newFileLocation": "root",
        "showUnsupportedFiles": true
      };
      const workspaceJson = {
        "main": {
          "id": "root",
          "type": "split",
          "children": []
        }
      };
      
      obsidianDir.file("app.json", JSON.stringify(appJson, null, 2));
      obsidianDir.file("workspace.json", JSON.stringify(workspaceJson, null, 2));
    }

    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    console.log(`[Obsidian Ingest] Vault ZIP creado en memoria para ${safeClientId}`);

    return new NextResponse(new Uint8Array(zipBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${safeClientId}-obsidian-vault.zip"`,
      },
    });

  } catch (error: any) {
    console.error("[Obsidian Ingest] Error en la generación:", error);
    return NextResponse.json({ error: error.message || "Error interno del servidor" }, { status: 500 });
  }
}
