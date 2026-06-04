import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType, Schema } from "@google/generative-ai";
import fs from "fs";
import path from "path";

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

    // Crear la estructura de carpetas en el file system
    const safeClientId = clientName.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const vaultDir = path.join(process.cwd(), "knowledge_base", "clientes", safeClientId);
    const obsidianDir = path.join(vaultDir, ".obsidian");

    // Asegurar que existan los directorios
    if (!fs.existsSync(vaultDir)) {
      fs.mkdirSync(vaultDir, { recursive: true });
    }
    if (!fs.existsSync(obsidianDir)) {
      fs.mkdirSync(obsidianDir, { recursive: true });
    }

    // Escribir los 5 archivos Markdown
    fs.writeFileSync(path.join(vaultDir, "01_Identidad.md"), responseData.identidad);
    fs.writeFileSync(path.join(vaultDir, "02_Servicios.md"), responseData.servicios);
    fs.writeFileSync(path.join(vaultDir, "03_Operaciones.md"), responseData.operaciones);
    fs.writeFileSync(path.join(vaultDir, "04_FAQs.md"), responseData.faqs);
    fs.writeFileSync(path.join(vaultDir, "05_Comercial.md"), responseData.comercial);

    // Escribir la configuración base para que Obsidian lo reconozca como un Vault
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
    
    fs.writeFileSync(path.join(obsidianDir, "app.json"), JSON.stringify(appJson, null, 2));
    fs.writeFileSync(path.join(obsidianDir, "workspace.json"), JSON.stringify(workspaceJson, null, 2));

    console.log(`[Obsidian Ingest] Vault creado exitosamente en ${vaultDir}`);

    return NextResponse.json({
      success: true,
      message: "Cerebro RAG creado exitosamente",
      vaultPath: vaultDir,
      clientId: safeClientId
    });

  } catch (error: any) {
    console.error("[Obsidian Ingest] Error en la generación:", error);
    return NextResponse.json({ error: error.message || "Error interno del servidor" }, { status: 500 });
  }
}
