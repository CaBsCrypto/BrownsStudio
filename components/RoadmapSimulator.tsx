"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n/LanguageContext";
import { getWhatsAppLink } from "@/lib/config";
import { Compass, Sparkles, Code2, Users, Brain, Clock, ChevronRight, RefreshCw, Send, Target, Award, Calendar } from "lucide-react";

export default function RoadmapSimulator() {
  const { lang } = useLang();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState("");
  const [interest, setInterest] = useState("");
  const [experience, setExperience] = useState("");
  const [time, setTime] = useState("");
  const [goal, setGoal] = useState("");

  const stepsContent = {
    es: {
      title: "Configura tu Ruta de Aprendizaje",
      sub: "Responde 5 preguntas rápidas y nuestro recomendador generará tu temario y plan personalizado al instante.",
      step1: "¿Cuál es tu perfil actual?",
      step2: "¿Cuál es tu principal interés?",
      step3: "¿Cuál es tu nivel de experiencia en IA?",
      step4: "¿De cuánto tiempo dispones a la semana?",
      step5: "¿Cuál es tu objetivo final?",
      results: "Tu Ruta de Aprendizaje Generada",
      weeks: "Semanas estimadas",
      modules: "Módulos del Syllabus",
      cta: "Reservar Asesoría en WhatsApp",
      restart: "Configurar de nuevo",
      profiles: [
        { id: "creator", name: "Creador de Contenido", icon: Sparkles },
        { id: "dev", name: "Desarrollador / Programador", icon: Code2 },
        { id: "team", name: "Profesional / Equipo de Trabajo", icon: Users },
        { id: "personal", name: "Usuario buscando Gestión Personal", icon: Brain }
      ],
      interests: {
        creator: [
          { id: "video", name: "Automatización de Video & Renders" },
          { id: "prompts", name: "Ingeniería de Prompts Creativos" },
          { id: "copy", name: "Redacción y Guiones con IA" }
        ],
        dev: [
          { id: "agents", name: "Construcción de Agentes & Bots" },
          { id: "apis", name: "Integración de APIs y Base de Datos Vectoriales" },
          { id: "workflows", name: "Flujos de Automatización de WhatsApp" }
        ],
        team: [
          { id: "productivity", name: "Productividad y Automatización de Oficina" },
          { id: "manuals", name: "Digitalización de Manuales de Entrenamiento" },
          { id: "copilot", name: "Implementación de Copilotos Internos" }
        ],
        personal: [
          { id: "secondbrain", name: "Segundo Cerebro (Obsidian & Notion)" },
          { id: "schedule", name: "Gestión del Tiempo y Calendarios Inteligentes" },
          { id: "notes", name: "Toma de Notas y Resúmenes Autónomos" }
        ]
      },
      experiences: [
        { id: "beginner", name: "Principiante (Uso básico de ChatGPT / Ninguna base técnica)" },
        { id: "intermediate", name: "Intermedio (Consumo APIs, sé crear prompts estructurados)" },
        { id: "advanced", name: "Avanzado (Desarrollo software o administro servidores de datos)" }
      ],
      times: [
        { id: "low", name: "2 a 4 horas semanales (Estudio ligero)" },
        { id: "med", name: "5 a 8 horas semanales (Estudio moderado)" },
        { id: "high", name: "10+ horas semanales (Acelerado e intensivo)" }
      ],
      goals: [
        { id: "automate", name: "Automatizar flujos en mi negocio o empleo actual" },
        { id: "build_product", name: "Crear y lanzar un nuevo producto/servicio con IA (SaaS)" },
        { id: "career", name: "Acelerar mi crecimiento profesional e insertarme laboralmente" }
      ]
    },
    en: {
      title: "Configure Your Learning Roadmap",
      sub: "Answer 5 quick questions and our system will generate your personalized syllabus and plan instantly.",
      step1: "What is your current profile?",
      step2: "What is your primary interest?",
      step3: "What is your experience level in AI?",
      step4: "How much time can you dedicate per week?",
      step5: "What is your ultimate goal?",
      results: "Your Generated Learning Roadmap",
      weeks: "Estimated weeks",
      modules: "Syllabus Modules",
      cta: "Book Consultation on WhatsApp",
      restart: "Configure Again",
      profiles: [
        { id: "creator", name: "Content Creator", icon: Sparkles },
        { id: "dev", name: "Developer / Coder", icon: Code2 },
        { id: "team", name: "Professional / Team", icon: Users },
        { id: "personal", name: "Personal Productivity Seeker", icon: Brain }
      ],
      interests: {
        creator: [
          { id: "video", name: "Video Automation & Rendering" },
          { id: "prompts", name: "Creative Prompt Engineering" },
          { id: "copy", name: "AI Copywriting & Scripting" }
        ],
        dev: [
          { id: "agents", name: "Agentic Systems & Bots" },
          { id: "apis", name: "API Integrations & Vector DBs" },
          { id: "workflows", name: "WhatsApp Automation Workflows" }
        ],
        team: [
          { id: "productivity", name: "Office Productivity & Automation" },
          { id: "manuals", name: "Digitalizing Training Manuals" },
          { id: "copilot", name: "Custom Copilot Implementations" }
        ],
        personal: [
          { id: "secondbrain", name: "Secondary Brain (Obsidian & Notion)" },
          { id: "schedule", name: "Time Management & Smart Calendars" },
          { id: "notes", name: "Autonomous Note-taking & Summaries" }
        ]
      },
      experiences: [
        { id: "beginner", name: "Beginner (Basic ChatGPT use / No coding background)" },
        { id: "intermediate", name: "Intermediate (API consumption, structured prompting)" },
        { id: "advanced", name: "Advanced (Software development or data engineer)" }
      ],
      times: [
        { id: "low", name: "2 to 4 hours per week (Light study)" },
        { id: "med", name: "5 to 8 hours per week (Moderate study)" },
        { id: "high", name: "10+ hours per week (Accelerated & intensive)" }
      ],
      goals: [
        { id: "automate", name: "Automate workflows in my current business or job" },
        { id: "build_product", name: "Launch a new AI product or service (SaaS)" },
        { id: "career", name: "Accelerate professional growth and employability" }
      ]
    },
    pt: {
      title: "Configure seu Roteiro de Aprendizagem",
      sub: "Responda a 5 perguntas rápidas e nosso recomendador gerará seu plano de estudos personalizado instantaneamente.",
      step1: "Qual é o seu perfil atual?",
      step2: "Qual é o seu principal interesse?",
      step3: "Qual é o seu nível de experiência com IA?",
      step4: "Quanto tempo você pode dedicar por semana?",
      step5: "Qual é o seu objetivo final?",
      results: "Seu Roteiro de Aprendizagem Gerado",
      weeks: "Semanas estimadas",
      modules: "Módulos do Conteúdo",
      cta: "Reservar Consultoria no WhatsApp",
      restart: "Configurar Novamente",
      profiles: [
        { id: "creator", name: "Criador de Conteúdo", icon: Sparkles },
        { id: "dev", name: "Desenvolvedor / Programador", icon: Code2 },
        { id: "team", name: "Profissional / Equipe de Trabalho", icon: Users },
        { id: "personal", name: "Busca por Gestão Pessoal", icon: Brain }
      ],
      interests: {
        creator: [
          { id: "video", name: "Automação de Vídeo & Renders" },
          { id: "prompts", name: "Engenharia de Prompts Criativos" },
          { id: "copy", name: "Redação e Roteiros com IA" }
        ],
        dev: [
          { id: "agents", name: "Construção de Agentes & Bots" },
          { id: "apis", name: "Integração de APIs e Bancos de Dados Vetoriais" },
          { id: "workflows", name: "Fluxos de Automação de WhatsApp" }
        ],
        team: [
          { id: "productivity", name: "Produtividade & Automação de Escritório" },
          { id: "manuals", name: "Digitalização de Manuais de Treinamento" },
          { id: "copilot", name: "Implementação de Copilotos Internos" }
        ],
        personal: [
          { id: "secondbrain", name: "Segundo Cérebro (Obsidian & Notion)" },
          { id: "schedule", name: "Gestão de Tempo e Calendários Inteligentes" },
          { id: "notes", name: "Toma de Notas e Resumos Autónomos" }
        ]
      },
      experiences: [
        { id: "beginner", name: "Iniciante (Uso básico do ChatGPT / Sem base técnica)" },
        { id: "intermediate", name: "Intermediário (Uso de APIs, prompts estruturados)" },
        { id: "advanced", name: "Avançado (Desenvolvimento de software ou infraestrutura)" }
      ],
      times: [
        { id: "low", name: "2 a 4 horas por semana (Estudo leve)" },
        { id: "med", name: "5 a 8 horas por semana (Estudo moderado)" },
        { id: "high", name: "10+ horas por semana (Acelerado e intensivo)" }
      ],
      goals: [
        { id: "automate", name: "Automatizar processos no meu negócio ou trabalho" },
        { id: "build_product", name: "Criar e lançar um novo produto/serviço com IA (SaaS)" },
        { id: "career", name: "Acelerar meu crescimento profissional e inserção laboral" }
      ]
    }
  };

  const currentContent = stepsContent[lang as keyof typeof stepsContent] || stepsContent.es;

  const handleProfileSelect = (pId: string) => {
    setProfile(pId);
    setStep(2);
  };

  const handleInterestSelect = (iId: string) => {
    setInterest(iId);
    setStep(3);
  };

  const handleExperienceSelect = (eId: string) => {
    setExperience(eId);
    setStep(4);
  };

  const handleTimeSelect = (tId: string) => {
    setTime(tId);
    setStep(5);
  };

  const handleGoalSelect = (gId: string) => {
    setGoal(gId);
    setStep(6);
  };

  const reset = () => {
    setProfile("");
    setInterest("");
    setExperience("");
    setTime("");
    setGoal("");
    setStep(1);
  };

  // Generate dynamic output modules based on selections
  const getRoadmapOutput = () => {
    const selectedProfile = currentContent.profiles.find((p) => p.id === profile);
    const selectedInterests = (currentContent.interests as any)[profile] || [];
    const selectedInterest = selectedInterests.find((i: any) => i.id === interest);
    const selectedExp = currentContent.experiences.find((e) => e.id === experience);
    const selectedTime = currentContent.times.find((t) => t.id === time);
    const selectedGoal = currentContent.goals.find((g) => g.id === goal);

    let durationWeeks = 4;
    if (time === "high") durationWeeks = 3;
    if (time === "low") durationWeeks = 6;

    let modulesList = [
      lang === "en" ? "Module 1: Foundations & Prompt Architectures" : "Módulo 1: Fundamentos y Arquitectura de Prompts",
      lang === "en" ? "Module 2: Practical Automations & API consumption" : "Módulo 2: Automatizaciones Prácticas e Integraciones",
      lang === "en" ? "Module 3: Custom Project Implementation & Deployment" : "Módulo 3: Proyecto Personalizado y Despliegue"
    ];

    if (profile === "dev") {
      modulesList = [
        lang === "en" ? "Module 1: Advanced APIs, Tokenomics & Custom Logic" : "Módulo 1: APIs de LLMs, Tokens y Lógica a Medida",
        lang === "en" ? "Module 2: RAG, Embeddings & Vector Databases (Pinecone/Chroma)" : "Módulo 2: RAG, Embeddings y Bases de Datos Vectoriales",
        lang === "en" ? "Module 3: Multi-agent Frameworks & Live WhatsApp Automations" : "Módulo 3: Flujos Multi-agente y Automatizaciones en Vivo de WhatsApp"
      ];
    } else if (profile === "creator") {
      modulesList = [
        lang === "en" ? "Module 1: Advanced script generation & dynamic image rendering" : "Módulo 1: Generación avanzada de guiones y renderizado dinámico",
        lang === "en" ? "Module 2: Voice clones, audio assets & synthetic voices" : "Módulo 2: Clones de voz, assets de audio y voces sintéticas",
        lang === "en" ? "Module 3: Rendering programmatic videos using React & Remotion" : "Módulo 3: Renderizado de videos programáticos usando React y Remotion"
      ];
    } else if (profile === "personal") {
      modulesList = [
        lang === "en" ? "Module 1: Obsidian & Notion Second Brain setup" : "Módulo 1: Configuración de Obsidian y Notion como Segundo Cerebro",
        lang === "en" ? "Module 2: Zero-code email & task automation with Make" : "Módulo 2: Automatización sin código de correos y tareas con Make",
        lang === "en" ? "Module 3: Custom chatbots for voice note digestion & reviews" : "Módulo 3: Chatbots para ingesta de notas de voz y resúmenes estructurados"
      ];
    }

    // Tweak modules based on experience
    if (experience === "beginner") {
      modulesList.unshift(lang === "en" ? "Intro Module: Setup & Basic LLM Prompting" : "Módulo Introductorio: Configuración e Introducción a LLMs");
      durationWeeks += 1;
    }

    const whatsappMessage = lang === "en"
      ? `Hi Cristian, I just simulated my 5-step custom training roadmap!\n\nProfile: ${selectedProfile?.name}\nInterest: ${selectedInterest?.name}\nExperience: ${selectedExp?.name}\nTime dedication: ${selectedTime?.name}\nGoal: ${selectedGoal?.name}\nEstimated duration: ${durationWeeks} weeks.\n\nLet's schedule a call to review the syllabus!`
      : `Hola Cristian, acabo de configurar mi ruta de aprendizaje de 5 pasos en Browns Studio.\n\nPerfil: ${selectedProfile?.name}\nInterés: ${selectedInterest?.name}\nExperiencia: ${selectedExp?.name}\nDedicación: ${selectedTime?.name}\nObjetivo: ${selectedGoal?.name}\nDuración estimada: ${durationWeeks} semanas.\n\n¡Me gustaría coordinar una llamada para revisar los módulos!`;

    return {
      profileName: selectedProfile?.name,
      interestName: selectedInterest?.name,
      expName: selectedExp?.name,
      timeName: selectedTime?.name,
      goalName: selectedGoal?.name,
      durationWeeks,
      modulesList,
      whatsappMessage
    };
  };

  const result = step === 6 ? getRoadmapOutput() : null;

  return (
    <section className="py-12 sm:py-16 px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center mb-10">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest mb-4"
            style={{ border: "1px solid rgba(71,196,255,0.2)", background: "rgba(71,196,255,0.05)", color: "#47c4ff" }}
          >
            {lang === "en" ? "5-STEP SIMULATOR" : lang === "pt" ? "SIMULADOR DE 5 ETAPAS" : "RUTA DE APRENDIZAJE"}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#e5e5e5] mb-3">
            {currentContent.title}
          </h2>
          <p className="text-[#9e9e9e] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            {currentContent.sub}
          </p>
        </div>

        {/* Simulator Box */}
        <div 
          className="rounded-3xl border border-white/5 bg-[#0b0c10]/60 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 min-h-[300px] flex flex-col justify-between"
          style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.5)" }}
        >
          {/* STEP 1: Profile */}
          {step === 1 && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[#e5e5e5] mb-6 flex items-center gap-2">
                <Compass size={18} className="text-[#00f0ff]" />
                {currentContent.step1}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentContent.profiles.map((p) => {
                  const ProfileIcon = p.icon;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleProfileSelect(p.id)}
                      className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 text-left text-sm font-medium text-[#9e9e9e] hover:text-[#00f0ff] hover:border-[#00f0ff]/30 hover:bg-[#00f0ff]/5 transition-all duration-200"
                    >
                      <ProfileIcon size={20} />
                      <span>{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Interests */}
          {step === 2 && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[#e5e5e5] mb-6 flex items-center gap-2">
                <Compass size={18} className="text-[#00f0ff]" />
                {currentContent.step2}
              </h3>
              <div className="space-y-3">
                {((currentContent.interests as any)[profile] || []).map((i: any) => (
                  <button
                    key={i.id}
                    onClick={() => handleInterestSelect(i.id)}
                    className="flex items-center justify-between w-full p-4 rounded-xl border border-white/5 bg-white/5 text-left text-sm text-[#9e9e9e] hover:text-[#00f0ff] hover:border-[#00f0ff]/30 hover:bg-[#00f0ff]/5 transition-all duration-200"
                  >
                    <span>{i.name}</span>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Experience Level */}
          {step === 3 && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[#e5e5e5] mb-6 flex items-center gap-2">
                <Award size={18} className="text-[#00f0ff]" />
                {currentContent.step3}
              </h3>
              <div className="space-y-3">
                {currentContent.experiences.map((exp) => (
                  <button
                    key={exp.id}
                    onClick={() => handleExperienceSelect(exp.id)}
                    className="flex items-center justify-between w-full p-4 rounded-xl border border-white/5 bg-white/5 text-left text-sm text-[#9e9e9e] hover:text-[#00f0ff] hover:border-[#00f0ff]/30 hover:bg-[#00f0ff]/5 transition-all duration-200"
                  >
                    <span>{exp.name}</span>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Time Dedication */}
          {step === 4 && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[#e5e5e5] mb-6 flex items-center gap-2">
                <Clock size={18} className="text-[#00f0ff]" />
                {currentContent.step4}
              </h3>
              <div className="space-y-3">
                {currentContent.times.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTimeSelect(t.id)}
                    className="flex items-center justify-between w-full p-4 rounded-xl border border-white/5 bg-white/5 text-left text-sm text-[#9e9e9e] hover:text-[#00f0ff] hover:border-[#00f0ff]/30 hover:bg-[#00f0ff]/5 transition-all duration-200"
                  >
                    <span>{t.name}</span>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Final Goal */}
          {step === 5 && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[#e5e5e5] mb-6 flex items-center gap-2">
                <Target size={18} className="text-[#00f0ff]" />
                {currentContent.step5}
              </h3>
              <div className="space-y-3">
                {currentContent.goals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => handleGoalSelect(g.id)}
                    className="flex items-center justify-between w-full p-4 rounded-xl border border-white/5 bg-white/5 text-left text-sm text-[#9e9e9e] hover:text-[#00f0ff] hover:border-[#00f0ff]/30 hover:bg-[#00f0ff]/5 transition-all duration-200"
                  >
                    <span>{g.name}</span>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: Results Display */}
          {step === 6 && result && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#00f0ff] font-semibold block mb-1">
                    BROWNS ROUTE SIMULATOR
                  </span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#e5e5e5]">
                    {currentContent.results}
                  </h3>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#10b981]/20 bg-[#10b981]/5 text-[#10b981] text-xs">
                  <Clock size={12} />
                  <span>{result.durationWeeks} {currentContent.weeks}</span>
                </div>
              </div>

              {/* Selection details info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-white/5 text-xs text-[#9e9e9e] leading-relaxed">
                <div>
                  <span className="text-[#5a5a5a] block uppercase tracking-wider mb-0.5">Perfil</span>
                  <span className="text-[#e5e5e5] font-semibold">{result.profileName}</span>
                </div>
                <div>
                  <span className="text-[#5a5a5a] block uppercase tracking-wider mb-0.5">Interés Principal</span>
                  <span className="text-[#e5e5e5] font-semibold">{result.interestName}</span>
                </div>
                <div>
                  <span className="text-[#5a5a5a] block uppercase tracking-wider mb-0.5">Nivel IA</span>
                  <span className="text-[#e5e5e5] font-semibold">{result.expName}</span>
                </div>
                <div>
                  <span className="text-[#5a5a5a] block uppercase tracking-wider mb-0.5">Objetivo final</span>
                  <span className="text-[#e5e5e5] font-semibold">{result.goalName}</span>
                </div>
              </div>

              {/* Modules list */}
              <div>
                <span className="text-[#5a5a5a] text-xs block uppercase tracking-wider mb-3">
                  {currentContent.modules}
                </span>
                <ul className="space-y-2.5">
                  {result.modulesList.map((mod, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#9e9e9e]">
                      <span className="w-5 h-5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-[#00f0ff] flex items-center justify-center font-mono text-[10px] flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={reset}
                  className="px-4 py-3 rounded-xl border border-white/10 text-xs font-semibold text-[#9e9e9e] hover:text-[#00f0ff] hover:border-[#00f0ff]/30 transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  <RefreshCw size={12} />
                  {currentContent.restart}
                </button>

                <a
                  href={getWhatsAppLink(result.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-black hover:scale-[1.01] transition-transform duration-200 flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #00f0ff, #00b0ff)",
                    boxShadow: "0 4px 14px rgba(0,240,255,0.2)"
                  }}
                >
                  <Send size={12} />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="https://calendly.com/brownsstudio/consulta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Calendar size={12} />
                  <span>Calendly</span>
                </a>
              </div>
            </div>
          )}

          {/* Stepper indicators on bottom of steps 1-5 */}
          {step < 6 && (
            <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-6">
              <span className="text-xs text-[#5a5a5a]">Paso {step} de 5</span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      s === step ? "w-6 bg-[#00f0ff]" : "w-1.5 bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
