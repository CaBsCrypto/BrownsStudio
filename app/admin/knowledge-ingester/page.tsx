"use client";

import { useState } from "react";
import { Brain, FileText, Loader2, CheckCircle, AlertTriangle, User } from "lucide-react";

export default function KnowledgeIngesterPage() {
  const [clientName, setClientName] = useState("");
  const [rawText, setRawText] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleIngest = async () => {
    if (!clientName || !rawText) {
      setStatus("error");
      setMessage("Por favor, ingresa el nombre del cliente y pega el texto del documento.");
      return;
    }

    setStatus("loading");
    setMessage("Analizando documento y extrayendo metadatos comerciales...");

    try {
      const res = await fetch("/api/admin/obsidian-ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName, rawText }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al generar el Cerebro");
      }

      // Descargar el archivo ZIP retornado por el servidor
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${clientName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-obsidian-vault.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setStatus("success");
      setMessage(`¡Éxito! El Cerebro de IA se ha descargado a tu computadora como un archivo ZIP. Descomprímelo y úsalo en Obsidian.`);
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setMessage(error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/30">
          <Brain className="w-8 h-8 text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Ingestor Automático RAG</h1>
          <p className="text-zinc-400">Transforma textos brutos de clientes en Vaults de Obsidian perfectos.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl">
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-zinc-300 mb-2">
                  <User className="w-4 h-4 text-zinc-500" />
                  <span>Nombre del Cliente (Identificador)</span>
                </label>
                <input
                  type="text"
                  placeholder="ej. Clinica Dental Santa Maria"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-zinc-300 mb-2">
                  <FileText className="w-4 h-4 text-zinc-500" />
                  <span>Documento Bruto (Word / Notion)</span>
                </label>
                <textarea
                  placeholder="Pega aquí todo el texto desordenado que te envió el cliente. La IA lo fragmentará automáticamente en Identidad, Servicios, FAQs, Operaciones y Comercial..."
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  className="w-full h-80 bg-black border border-zinc-800 rounded-lg px-4 py-3 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono text-sm resize-none"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={handleIngest}
                disabled={status === "loading"}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generando Cerebro...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Procesar y Crear Vault
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Estado de Respuesta */}
          {status !== "idle" && (
            <div className={`p-4 rounded-lg border flex items-start space-x-3 transition-all ${
              status === "loading" ? "bg-blue-500/10 border-blue-500/30 text-blue-400" :
              status === "success" ? "bg-green-500/10 border-green-500/30 text-green-400" :
              "bg-red-500/10 border-red-500/30 text-red-400"
            }`}>
              {status === "loading" && <Loader2 className="w-5 h-5 animate-spin shrink-0 mt-0.5" />}
              {status === "success" && <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />}
              {status === "error" && <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />}
              <p className="text-sm font-medium leading-relaxed">{message}</p>
            </div>
          )}
        </div>

        {/* Panel Lateral Educativo */}
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-white mb-4">¿Cómo funciona?</h3>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex items-start">
                <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center shrink-0 mr-3 text-xs">1</span>
                <span>Pega el texto crudo sin importar el formato.</span>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mr-3 text-xs">2</span>
                <span>Gemini 1.5 Pro extrae semánticamente las intenciones comerciales, precios y operativas.</span>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0 mr-3 text-xs">3</span>
                <span>Se formatea en Tablas Markdown y alertas de Obsidian.</span>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mr-3 text-xs">4</span>
                <span>El servidor crea automáticamente el <strong>Vault .obsidian</strong>. Queda listo para ser leído por Kapso.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
