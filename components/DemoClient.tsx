"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, MessageSquare, Send, Mic, RefreshCw, CheckCheck, Landmark, ShieldCheck } from "lucide-react";

interface Preset {
  businessName: string;
  botName: string;
  services: string;
  faqs: string;
  firstQuestion: string;
}

const PRESETS: Record<string, Record<string, Preset>> = {
  es: {
    dental: {
      businessName: "Clínica Dental Providencia",
      botName: "Dra. Ana (Asistente)",
      services: `* Ortodoncia invisible (Invisalign): desde $1.800.000 CLP.
* Limpieza e Higiene Dental Profunda: $45.000 CLP.
* Blanqueamiento LED Premium: $120.000 CLP.
* Implantes Dentales de Titanio: desde $650.000 CLP.`,
      faqs: `* Horario: Lunes a Viernes de 09:00 a 20:00. Sábado de 09:00 a 14:00.
* Dirección: Av. Providencia 1240, Oficina 402, Santiago (a pasos del Metro Manuel Montt).
* Reglas: Sé muy empática, responde con calidez chilena ("po", "cachai", "dime", "cuéntame").
* Objetivo: Lograr que el paciente agende su primera evaluación gratuita.`,
      firstQuestion: "¡Hola! Quisiera consultar por el precio del blanqueamiento dental.",
    },
    agency: {
      businessName: "Estudio Creativo Prisma",
      botName: "Sofía (Consultora)",
      services: `* Diseño de Marca & Identidad Visual: $450.000 CLP.
* Desarrollo Web en Next.js & CMS: $900.000 - $1.800.000 CLP.
* Gestión Mensual de Redes Sociales: $350.000 CLP / mes.`,
      faqs: `* Horario: Lunes a Viernes de 9am a 6pm.
* Reglas: Tono profesional, moderno, con mucha energía digital.
* Objetivo: Invitar al cliente a agendar una videollamada de 15 minutos en nuestro Calendly para cotizar a su medida.`,
      firstQuestion: "Hola, necesito renovar la página web de mi consultora inmobiliaria.",
    },
    propiedades: {
      businessName: "Corredora Andes Gold",
      botName: "Andrés (Asesor)",
      services: `* Venta de Departamentos y Casas: Comisión del 2% sobre el valor final.
* Arriendos con Seguro de Pago: Comisión del 50% del primer mes de arriendo.
* Tasación Comercial de Propiedades: $90.000 CLP.`,
      faqs: `* Horario: 24/7 (asistencia automatizada).
* Reglas: Sumamente educado, confiable, directo.
* Objetivo: Capturar el presupuesto del cliente y derivarlo a handoff humano.`,
      firstQuestion: "Hola, estoy buscando arrendar un departamento de 2 dormitorios en Las Condes.",
    },
  },
  en: {
    dental: {
      businessName: "Providance Dental Clinic",
      botName: "Dr. Ana (Virtual Assistant)",
      services: `* Invisalign Treatment: from $2,500.
* Deep Teeth Cleaning & Hygiene: $80.
* Premium LED Teeth Whitening: $250.
* Titanium Dental Implants: from $950.`,
      faqs: `* Hours: Mon-Fri 9:00 AM to 8:00 PM. Sat 9:00 AM to 2:00 PM.
* Address: 1240 Providencia Ave, Suite 402.
* Rules: Be highly empathetic, warm, and professional.
* Goal: Get the patient to book their first free clinical evaluation.`,
      firstQuestion: "Hi! I would like to know the price for teeth whitening.",
    },
    agency: {
      businessName: "Prisma Creative Studio",
      botName: "Sofia (AI Consultant)",
      services: `* Branding & Visual Identity: $750.
* Premium Web Design (Next.js & CMS): $1,500 - $3,500.
* Social Media Management: $600 / month.`,
      faqs: `* Hours: Mon-Fri 9 AM to 6 PM.
* Rules: Professional tone, modern, and high-energy tech language.
* Goal: Invite the lead to schedule a quick 15-minute scoping call on Calendly.`,
      firstQuestion: "Hello, I need to redesign the website for my real estate firm.",
    },
    propiedades: {
      businessName: "Andes Gold Real Estate",
      botName: "Andres (AI Broker)",
      services: `* Property Sales: 2% commission on the final selling price.
* Residential Rentals: 50% commission on the first month's rent.
* Professional Property Valuation: $150.`,
      faqs: `* Hours: 24/7 (AI-assisted).
* Rules: Extremely polite, trustworthy, and precise.
* Goal: Capture the buyer's budget and hand over to a human broker immediately.`,
      firstQuestion: "Hello, I'm looking to rent a 2-bedroom apartment in Las Condes.",
    },
  },
  pt: {
    dental: {
      businessName: "Clínica Odontológica Providance",
      botName: "Dra. Ana (Assistente)",
      services: `* Tratamento Invisalign: a partir de R$ 8.000.
* Limpeza e Higiene Dental Profunda: R$ 150.
* Clareamento LED Premium: R$ 450.
* Implantes Dentários de Titânio: a partir de R$ 2.500.`,
      faqs: `* Horário: Seg-Sex das 9h às 20h. Sáb das 9h às 14h.
* Regras: Seja extremamente empática, carinhosa e profissional.
* Objetivo: Fazer com que o paciente agende sua primeira avaliação clínica gratuita.`,
      firstQuestion: "Olá! Gostaria de saber o preço do clareamento dental.",
    },
    agency: {
      businessName: "Estúdio Criativo Prisma",
      botName: "Sofia (Consultora)",
      services: `* Branding e Identidade Visual: R$ 2.500.
* Web Design Premium (Next.js & CMS): R$ 5.000 - R$ 12.000.
* Gestão de Redes Sociais: R$ 1.800 / mês.`,
      faqs: `* Horário: Seg-Sex das 9h às 18h.
* Regras: Tom de voz moderno, focado em tecnologia e muito dinâmico.
* Objetivo: Convidar o lead para agendar uma reunião rápida de 15 minutos no Calendly.`,
      firstQuestion: "Olá, preciso remodelar o site da minha empresa imobiliária.",
    },
    propiedades: {
      businessName: "Imobiliária Andes Gold",
      botName: "André (AI Corretor)",
      services: `* Venda de Imóveis: Comissão de 2% sobre o valor final de venda.
* Aluguel Residencial: Comissão de 50% do primeiro mês de aluguel.
* Avaliação Imobiliária Profissional: R$ 500.`,
      faqs: `* Horário: 24/7 (Assistência automatizada).
* Regras: Muito educado, confiável e focado em dados de mercado.
* Objetivo: Descobrir o orçamento do comprador e transferir para um corretor humano imediatamente.`,
      firstQuestion: "Olá, estou procurando alugar um apartamento de 2 quartos em Las Condes.",
    },
  },
};

const LOCAL_TEXTS = {
  es: {
    heroTitle: "Prueba tu Bot de WhatsApp en Vivo ⚡",
    heroDesc: "Configura el cerebro de tu negocio en 30 segundos y chatea con tu propio bot en pantalla. ¡Cero fricción, cero costo!",
    presetTitle: "1. Cargar demo rápida:",
    presets: {
      dental: "Clínica Dental",
      agency: "Agencia Creativa",
      propiedades: "Inmobiliaria",
    },
    bizConfigTitle: "2. Personalizar el cerebro del Bot:",
    bizLabel: "Nombre de tu Empresa",
    botLabel: "Nombre del Bot",
    servicesLabel: "Servicios y Precios",
    servicesPlaceholder: "Escribe tus productos, precios o rangos...",
    faqsLabel: "Reglas, Horarios y FAQs",
    faqsPlaceholder: "Ej: Horarios, dirección, tono de voz o reglas especiales...",
    simulateBtn: "Guardar e Iniciar Chat 🚀",
    simulatedMock: "Simulador de WhatsApp",
    onlineStatus: "En línea",
    inputPlaceholder: "Escribe tu mensaje...",
    typing: "está escribiendo...",
    send: "Enviar",
    simulateVoice: "Simular Nota de Voz 🎤",
    voiceTranscribing: "🎤 [Audio] Transcribiendo nota de voz...",
    successSave: "¡Cerebro configurado! Chatea en la pantalla de la derecha.",
    promptExText: "Presiona para probar esta pregunta:",
    enterpriseFeature: "Función B2B Premium",
    enterpriseDesc: "Este simulador utiliza la misma lógica agéntica de nuestro motor RAG para WhatsApp.",
    welcomeTemplate: "¡Hola! Bienvenido/a al canal de WhatsApp de *{businessName}*. Soy *{botName}*, tu asistente virtual de atención. ¿En qué te puedo colaborar hoy? 🙌",
  },
  en: {
    heroTitle: "Test your Live WhatsApp Bot ⚡",
    heroDesc: "Configure your business brain in 30 seconds and chat with your own bot on screen. Zero friction, zero cost!",
    presetTitle: "1. Load a quick demo:",
    presets: {
      dental: "Dental Clinic",
      agency: "Creative Agency",
      propiedades: "Real Estate",
    },
    bizConfigTitle: "2. Customize the Bot's Brain:",
    bizLabel: "Your Business Name",
    botLabel: "Assistant Name",
    servicesLabel: "Services & Prices",
    servicesPlaceholder: "Write down your products, prices, or ranges...",
    faqsLabel: "Rules, Hours & FAQs",
    faqsPlaceholder: "E.g. Hours, address, tone of voice, or special rules...",
    simulateBtn: "Save and Start Chatting 🚀",
    simulatedMock: "WhatsApp Simulator",
    onlineStatus: "Online",
    inputPlaceholder: "Type your message...",
    typing: "is typing...",
    send: "Send",
    simulateVoice: "Simulate Voice Note 🎤",
    voiceTranscribing: "🎤 [Audio] Transcribing voice note...",
    successSave: "Brain configured! Chat on the right-side screen.",
    promptExText: "Click to test this question:",
    enterpriseFeature: "B2B Premium Feature",
    enterpriseDesc: "This simulator uses the exact same agential logic as our real WhatsApp RAG engine.",
    welcomeTemplate: "Hi! Welcome to the WhatsApp channel of *{businessName}*. I am *{botName}*, your virtual assistant. How can I help you today? 🙌",
  },
  pt: {
    heroTitle: "Teste seu Bot de WhatsApp em Vivo ⚡",
    heroDesc: "Configure o cérebro da sua empresa em 30 segundos e converse com o seu próprio bot na tela. Sem atritos, sem custo!",
    presetTitle: "1. Carregar demo rápida:",
    presets: {
      dental: "Clínica Dental",
      agency: "Agência Criativa",
      propiedades: "Imobiliária",
    },
    bizConfigTitle: "2. Personalizar o Cêrebro do Bot:",
    bizLabel: "Nome da sua Empresa",
    botLabel: "Nome do Assistente",
    servicesLabel: "Serviços e Preços",
    servicesPlaceholder: "Escreva seus produtos, preços ou faixas...",
    faqsLabel: "Regras, Horários e FAQs",
    faqsPlaceholder: "Ex: Horários, endereço, tom de voz ou regras especiais...",
    simulateBtn: "Salvar e Iniciar Chat 🚀",
    simulatedMock: "Simulador de WhatsApp",
    onlineStatus: "Online",
    inputPlaceholder: "Digite sua mensagem...",
    typing: "está digitando...",
    send: "Enviar",
    simulateVoice: "Simular Nota de Voz 🎤",
    voiceTranscribing: "🎤 [Audio] Transcrevendo nota de voz...",
    successSave: "Cérebro configurado! Converse na tela da direita.",
    promptExText: "Clique para testar esta pergunta:",
    enterpriseFeature: "Recurso B2B Premium",
    enterpriseDesc: "Este simulador utiliza a mesma lógica agêntica do nosso motor RAG para WhatsApp.",
    welcomeTemplate: "Olá! Bem-vindo ao canal de WhatsApp da *{businessName}*. Sou *{botName}*, seu assistente virtual de atendimento. Como posso te ajudar hoje? 🙌",
  },
};


interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isAudio?: boolean;
}

export default function DemoClient({ locale }: { locale: string }) {
  const t = LOCAL_TEXTS[locale as keyof typeof LOCAL_TEXTS] || LOCAL_TEXTS.es;
  const presets = PRESETS[locale as keyof typeof PRESETS] || PRESETS.es;

  // Form State
  const [businessName, setBusinessName] = useState(presets.dental.businessName);
  const [botName, setBotName] = useState(presets.dental.botName);
  const [services, setServices] = useState(presets.dental.services);
  const [faqs, setFaqs] = useState(presets.dental.faqs);
  const [firstQuestion, setFirstQuestion] = useState(presets.dental.firstQuestion);

  // Active configurations for the Chat
  const [activeConfig, setActiveConfig] = useState({
    businessName: presets.dental.businessName,
    botName: presets.dental.botName,
    services: presets.dental.services,
    faqs: presets.dental.faqs,
  });

  // Chat State
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize with a welcome message on mount or config change
  useEffect(() => {
    resetChat();
  }, [activeConfig]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const formatWhatsAppText = (text: string) => {
    if (!text) return "";
    
    // Split by asterisks to find bold segments
    const boldParts = text.split(/(\*[^*]+\*)/g);
    
    return boldParts.map((part, bIdx) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        const innerText = part.slice(1, -1);
        return <strong key={`b-${bIdx}`} className="font-extrabold text-white">{innerText}</strong>;
      }
      
      // Split by underscores to find italic segments
      const italicParts = part.split(/(_[^_]+_)/g);
      return italicParts.map((subPart, iIdx) => {
        if (subPart.startsWith("_") && subPart.endsWith("_")) {
          const innerText = subPart.slice(1, -1);
          return <em key={`i-${iIdx}`} className="italic">{innerText}</em>;
        }
        return subPart;
      });
    });
  };

  const resetChat = () => {
    const template = t.welcomeTemplate || "¡Hola! Bienvenido/a al canal de WhatsApp de *{businessName}*. Soy *{botName}*, tu asistente virtual de atención. ¿En qué te puedo colaborar hoy? 🙌";
    const welcome = template
      .replace("{businessName}", activeConfig.businessName)
      .replace("{botName}", activeConfig.botName);
      
    setMessages([
      {
        role: "assistant",
        content: welcome,
        timestamp: formatTime(new Date()),
      },
    ]);
  };


  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Preset loaders
  const loadPreset = (key: "dental" | "agency" | "propiedades") => {
    const selected = presets[key];
    setBusinessName(selected.businessName);
    setBotName(selected.botName);
    setServices(selected.services);
    setFaqs(selected.faqs);
    setFirstQuestion(selected.firstQuestion);

    setActiveConfig({
      businessName: selected.businessName,
      botName: selected.botName,
      services: selected.services,
      faqs: selected.faqs,
    });

    setStatusMessage(t.successSave);
    setTimeout(() => setStatusMessage(""), 4000);
  };

  const handleApplyConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveConfig({
      businessName,
      botName,
      services,
      faqs,
    });
    setStatusMessage(t.successSave);
    setTimeout(() => setStatusMessage(""), 4000);
  };

  const sendMessage = async (textToSend: string, isAudio = false) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      role: "user",
      content: textToSend,
      timestamp: formatTime(new Date()),
      isAudio,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    try {
      // Map Messages to BotMessage structure
      const apiMessages = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
        timestamp: m.timestamp,
      }));

      const res = await fetch("/api/demo/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: activeConfig.businessName,
          botName: activeConfig.botName,
          services: activeConfig.services,
          faqs: activeConfig.faqs,
          messages: apiMessages,
        }),
      });

      if (!res.ok) {
        throw new Error("Error in communication");
      }

      const data = await res.json();

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "Disculpa, tuve un problema de conexión. ¿Podrías volver a intentarlo?",
          timestamp: formatTime(new Date()),
        },
      ]);
    } catch (err) {
      console.error(err);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Disculpa, en este momento no logré responder tu duda. Por favor, intenta de nuevo. 🤖",
          timestamp: formatTime(new Date()),
        },
      ]);
    }
  };

  // Simulador de nota de voz (Audio)
  const handleSimulateVoiceNote = () => {
    sendMessage(firstQuestion, true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-semibold mb-6 animate-pulse">
          <Sparkles className="w-4 h-4" />
          <span>{t.enterpriseFeature}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold font-header tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-400 mb-6 leading-tight">
          {t.heroTitle}
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          {t.heroDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Panel: Configuration Form */}
        <div className="lg:col-span-6 bg-slate-950/40 backdrop-blur-xl border border-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-500/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -z-10" />

          {/* Quick presets */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-4 flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              {t.presetTitle}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => loadPreset("dental")}
                className={`py-3 px-2 rounded-2xl border text-xs font-medium transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                  businessName === presets.dental.businessName
                    ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                }`}
              >
                <span>🦷 {t.presets.dental}</span>
              </button>
              <button
                type="button"
                onClick={() => loadPreset("agency")}
                className={`py-3 px-2 rounded-2xl border text-xs font-medium transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                  businessName === presets.agency.businessName
                    ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                }`}
              >
                <span>🎨 {t.presets.agency}</span>
              </button>
              <button
                type="button"
                onClick={() => loadPreset("propiedades")}
                className={`py-3 px-2 rounded-2xl border text-xs font-medium transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                  businessName === presets.propiedades.businessName
                    ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                }`}
              >
                <span>🏠 {t.presets.propiedades}</span>
              </button>
            </div>
          </div>

          <hr className="border-slate-900 my-6" />

          {/* Form */}
          <form onSubmit={handleApplyConfig} className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {t.bizConfigTitle}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  {t.bizLabel}
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  {t.botLabel}
                </label>
                <input
                  type="text"
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {t.servicesLabel}
              </label>
              <textarea
                value={services}
                onChange={(e) => setServices(e.target.value)}
                placeholder={t.servicesPlaceholder}
                className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors h-28 resize-none font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {t.faqsLabel}
              </label>
              <textarea
                value={faqs}
                onChange={(e) => setFaqs(e.target.value)}
                placeholder={t.faqsPlaceholder}
                className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors h-28 resize-none font-mono"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
            >
              <span>{t.simulateBtn}</span>
            </button>

            {statusMessage && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium text-center animate-fade-in flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{statusMessage}</span>
              </div>
            )}
          </form>

          {/* Quick Voice simulation hint */}
          <div className="mt-8 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-start gap-3">
            <Mic className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-1">{t.enterpriseFeature}: Transcripción Real</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.enterpriseDesc}
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <span className="text-[11px] font-medium text-indigo-300">{t.promptExText}</span>
                <button
                  type="button"
                  onClick={handleSimulateVoiceNote}
                  className="inline-flex self-start items-center gap-2 text-xs text-white bg-indigo-600/30 border border-indigo-500/40 hover:bg-indigo-600/40 py-2 px-3.5 rounded-full transition-all duration-300"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span className="italic">"{firstQuestion}"</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: WhatsApp Interactive Simulator inside a Premium Smartphone Frame */}
        <div className="lg:col-span-6 flex justify-center items-center w-full">
          {/* High-tech curved smartphone frame with double borders and metallic glow */}
          <div className="w-full max-w-[390px] h-[730px] rounded-[56px] bg-[#07080b] p-3.5 border-[5px] border-slate-800 shadow-[0_0_60px_rgba(99,102,241,0.15)] ring-1 ring-white/10 overflow-hidden flex flex-col relative">
            
            {/* Elegant camera and speaker notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-5.5 bg-[#07080b] rounded-b-2xl z-40 flex items-center justify-center gap-2 border-x border-b border-slate-800/50">
              <div className="w-14 h-1 bg-slate-800 rounded-full" />
              <div className="w-2.5 h-2.5 bg-slate-950 rounded-full border border-slate-900" />
            </div>

            {/* Screen Container */}
            <div className="flex-grow rounded-[42px] bg-[#0b141a] overflow-hidden flex flex-col relative border border-white/5 shadow-inner">
              {/* Premium Repeating WhatsApp Pattern Grid Overlay */}
              <div 
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(rgba(37, 211, 102, 0.25) 1.5px, transparent 1.5px)",
                  backgroundSize: "24px 24px"
                }}
              />
              <div 
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                  backgroundSize: "48px 48px"
                }}
              />

              {/* Chat Header */}
              <div className="bg-[#1f2c34]/95 backdrop-blur-md px-4 py-3 pt-6 flex items-center justify-between border-b border-slate-900/60 sticky top-0 z-30">
                <div className="flex items-center gap-3">
                  {/* WhatsApp Avatar Mockup with custom gradient and shadow */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 border border-indigo-400/30 flex items-center justify-center text-white font-bold font-header text-xs shadow-[0_0_12px_rgba(99,102,241,0.25)]">
                    {activeConfig.businessName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white leading-tight">
                      {activeConfig.businessName}
                    </h4>
                    <p className="text-[10px] text-slate-400 leading-none flex items-center gap-1.5 mt-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#25d366] animate-pulse" />
                      <span>{t.onlineStatus}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-0.5 bg-slate-950/60 border border-slate-800 rounded-full text-[9px] text-slate-400 font-medium tracking-wide">
                  <Landmark className="w-2.5 h-2.5 text-indigo-400" />
                  <span>{activeConfig.botName}</span>
                </div>
              </div>

              {/* Chat Bubble Area */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-[#0b141a] scrollbar-thin scrollbar-thumb-slate-800 relative z-10 pr-2">
                {messages.map((msg, index) => {
                  const isUser = msg.role === "user";
                  return (
                    <div
                      key={index}
                      className={`flex ${isUser ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                    >
                      <div
                        className={`max-w-[85%] rounded-[20px] px-3.5 py-2.5 text-xs sm:text-sm shadow-xl relative overflow-hidden ${
                          isUser
                            ? "bg-[#005c4b] text-white rounded-tr-none border border-emerald-800/30"
                            : "bg-[#202c33]/95 text-slate-100 rounded-tl-none border border-slate-800/60"
                        }`}
                      >
                        {/* Simulated Voice note indicator */}
                        {msg.isAudio && (
                          <div className="flex items-center gap-2 mb-2 p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/30 text-emerald-300 text-[10px] font-semibold">
                            <Mic className="w-3.5 h-3.5 animate-pulse text-rose-500" />
                            <span>🎤 [Audio Transcrito]</span>
                          </div>
                        )}
                        
                        {/* Render newlines correctly and formatting */}
                        <p className="whitespace-pre-line leading-relaxed">
                          {formatWhatsAppText(msg.content)}
                        </p>
                        
                        {/* Tick Checkmarks and Timestamp */}
                        <div className="flex items-center justify-end gap-1.5 mt-1.5 text-[9px] text-slate-400 leading-none">
                          <span>{msg.timestamp}</span>
                          {isUser && (
                            <CheckCheck className="w-3 h-3 text-[#00f0ff]" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-[#202c33]/90 border border-slate-800/60 rounded-[20px] rounded-tl-none px-4 py-2.5 text-xs shadow-md">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        <span className="text-[10px] text-slate-400 ml-2 italic">
                          {activeConfig.botName} {t.typing}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Footer Input Area */}
              <div className="bg-[#1f2c34]/95 backdrop-blur-md p-3 pb-5 flex items-center gap-2 border-t border-slate-900/60 sticky bottom-0 z-30">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && inputText.trim()) {
                      sendMessage(inputText);
                    }
                  }}
                  placeholder={t.inputPlaceholder}
                  className="flex-grow bg-[#2a3942] text-white border-none rounded-full px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-400"
                />
                
                <button
                  type="button"
                  onClick={() => {
                    if (inputText.trim()) sendMessage(inputText);
                  }}
                  className="w-9 h-9 rounded-full bg-[#00a884] hover:bg-[#008f72] active:scale-95 text-white flex items-center justify-center transition-all duration-200"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
