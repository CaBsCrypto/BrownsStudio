"use client";

import { useRef, useState } from "react";
import { useLang } from "@/lib/i18n/LanguageContext";
import { getWhatsAppLink } from "@/lib/config";
import { Code2, Clock, Video, ArrowRight, ShieldCheck, Sparkles, Users, Brain, Network, GraduationCap, TrendingUp, BarChart3, Wallet, Palette, Store, ChevronLeft, ChevronRight, Check } from "lucide-react";

export default function WorkshopsShowcase() {
  const { t, lang } = useLang();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  
  // Safe cast or direct access from translation object
  const fp = (t as any).formacionPage || {
    sections: {
      workshops: {
        title: "Talleres Premium",
        subtitle: "Elige tu camino para dominar la inteligencia artificial.",
        creatorTitle: "IA para Creadores de Contenido",
        creatorSub: "Aprovecha video generativo, prompts avanzados y assets automáticos para escalar tu producción creativa.",
        creatorBadge: "Para Creadores",
        devTitle: "Formación en Desarrollo de Software & IA",
        devSub: "Aprende a construir agentes complejos, conectar APIs, gestionar bases de datos vectoriales e implementar flujos de WhatsApp.",
        devBadge: "Para Desarrolladores",
        toolTitle: "Formación en Herramientas de IA y Productividad",
        toolSub: "Domina la ingeniería de prompts, Google AI Studio, agentes a medida y automatiza tareas sin conocimientos previos de programación.",
        toolBadge: "Para Profesionales",
        personalTitle: "IA para Gestión Personal",
        personalSub: "Crea tu segundo cerebro, optimiza tus calendarios y automatiza tus notas y tareas personales con sistemas de IA a medida.",
        personalBadge: "Para Uso Personal",
        processTitle: "IA para Automatización de Procesos",
        processSub: "Conecta tus herramientas, automatiza la ingesta de leads, sincroniza CRMs y diseña pipelines de operaciones autónomos con Make y Python.",
        processBadge: "Para Automatización",
        corpTitle: "Capacitación Corporativa & Reskilling",
        corpSub: "Prepara a tu equipo para adoptar herramientas de IA de forma segura. Diseñamos programas a medida y metodologías prácticas adaptadas a tu negocio.",
        corpBadge: "Para Empresas / Corporativo",
        mktTitle: "IA para Marketing & SEO Programático",
        mktSub: "Generación autónoma de contenido optimizado para motores de búsqueda, copys para redes sociales y automatización de pauta digital.",
        mktBadge: "Para Marketing",
        salesTitle: "IA para Ventas y Prospección B2B",
        salesSub: "Automatización de prospección en frío (Outbound), correos electrónicos de ventas hiper-personalizados y agentes de agendamiento de llamadas.",
        salesBadge: "Para Ventas",
        finTitle: "IA para Finanzas y Análisis de Datos",
        finSub: "Crea reportes y tableros inteligentes, análisis automatizado de flujos de caja y auditoría de gastos empresariales.",
        finBadge: "Para Finanzas",
        designTitle: "IA para Diseñadores y Prototipado UX/UI",
        designSub: "Generación de wireframes, creación de assets gráficos y prototipos interactivos funcionales integrando herramientas de Figma e IA.",
        designBadge: "Para Diseñadores",
        pymeTitle: "IA para Emprendedores y PYMEs",
        pymeSub: "Adopta herramientas generativas y automatización para lanzar productos, gestionar leads locales y escalar tu negocio con bajo presupuesto.",
        pymeBadge: "Para Emprendedores",
        duration: "Duración: {duration}",
        modality: "Modalidad: {modality}",
        modalityVal: "Online en vivo y práctico",
        durationValCreator: "2 Semanas (6 Horas)",
        durationValDev: "4 Semanas (12 Horas)",
        durationValTool: "3 Semanas (9 Horas)",
        durationValPersonal: "2 Semanas (6 Horas)",
        durationValProcess: "3 Semanas (9 Horas)",
        durationValCorp: "A Medida (Syllabus Custom)",
        durationValMkt: "3 Semanas (9 Horas)",
        durationValSales: "3 Semanas (9 Horas)",
        durationValFin: "2 Semanas (6 Horas)",
        durationValDesign: "2 Semanas (6 Horas)",
        durationValPyme: "3 Semanas (9 Horas)",
        durationValCustom: "Llave en Mano (Done-for-you)",
        cta: "Consultar por Capacitación",
        customCta: "Cotizar Proyecto a Medida"
      }
    }
  };

  const ws = fp.sections.workshops;

  const workshopsData = [
    {
      type: "creator",
      title: ws.creatorTitle,
      subtitle: ws.creatorSub,
      badge: ws.creatorBadge,
      icon: Sparkles,
      duration: ws.durationValCreator,
      color: "linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(236, 72, 153, 0.02) 100%)",
      borderColor: "rgba(236, 72, 153, 0.2)",
      glowColor: "rgba(236, 72, 153, 0.15)",
      accentColor: "#ec4899",
      whatsappMsg: "Hola! Me interesa la capacitación en IA para Creadores de Contenido. ¿Me podrías dar más detalles?",
      modules: lang === "en"
        ? ["Generative video workflows (Runway, Sora)", "Prompting & high-retention copywriting", "Asset creation pipelines & automated templates"]
        : lang === "pt"
        ? ["Fluxos de vídeo generativo (Runway, Sora)", "Escrita de prompts e copies de alta retenção", "Pipeline de geração visual e assets automáticos"]
        : ["Flujos de video generativo (Runway, Sora)", "Escritura de prompts y copys de alta retención", "Pipeline de generación visual y assets automáticos"]
    },
    {
      type: "dev",
      title: ws.devTitle,
      subtitle: ws.devSub,
      badge: ws.devBadge,
      icon: Code2,
      duration: ws.durationValDev,
      color: "linear-gradient(135deg, rgba(0, 240, 255, 0.08) 0%, rgba(0, 240, 255, 0.02) 100%)",
      borderColor: "rgba(0, 240, 255, 0.2)",
      glowColor: "rgba(0, 240, 255, 0.15)",
      accentColor: "#00f0ff",
      whatsappMsg: "Hola! Me interesa la capacitación en Desarrollo de Software & IA. ¿Me podrías dar más detalles?",
      modules: lang === "en"
        ? ["Agent architectures & RAG with Vector DBs", "Integrations with APIs, webhooks, and DBs", "Deploying WhatsApp bots with Node/Python"]
        : lang === "pt"
        ? ["Arquitetura de agentes & RAG com Vector DBs", "Integrações com APIs, webhooks e bancos de dados", "Implantação de bots do WhatsApp com Node/Python"]
        : ["Arquitectura de agentes & RAG con Vector DBs", "Integración de APIs, webhooks y bases de datos", "Despliegue de bots de WhatsApp con Node/Python"]
    },
    {
      type: "tools",
      title: ws.toolTitle,
      subtitle: ws.toolSub,
      badge: ws.toolBadge,
      icon: Users,
      duration: ws.durationValTool,
      color: "linear-gradient(135deg, rgba(147, 51, 234, 0.08) 0%, rgba(147, 51, 234, 0.02) 100%)",
      borderColor: "rgba(147, 51, 234, 0.2)",
      glowColor: "rgba(147, 51, 234, 0.15)",
      accentColor: "#c084fc",
      whatsappMsg: "Hola! Me interesa la capacitación en Herramientas de IA & Productividad para Equipos. ¿Me podrías dar más detalles?",
      modules: lang === "en"
        ? ["Prompt engineering & LLM foundations", "Office task automation with Copilot & AI", "Custom AI agent creation (Custom GPTs)"]
        : lang === "pt"
        ? ["Engenharia de prompts & fundamentos de LLM", "Automação de tarefas com Copilot e IA", "Criação de agentes de IA (Custom GPTs)"]
        : ["Ingeniería de prompts y fundamentos de LLMs", "Automatización de tareas con Copilot e IA", "Creación de agentes de IA (Custom GPTs)"]
    },
    {
      type: "personal",
      title: ws.personalTitle,
      subtitle: ws.personalSub,
      badge: ws.personalBadge,
      icon: Brain,
      duration: ws.durationValPersonal,
      color: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.02) 100%)",
      borderColor: "rgba(16, 185, 129, 0.2)",
      glowColor: "rgba(16, 185, 129, 0.15)",
      accentColor: "#10b981",
      whatsappMsg: "Hola! Me interesa la capacitación en IA para Gestión Personal. ¿Me podrías dar más detalles?",
      modules: lang === "en"
        ? ["Second brain architecture (Notion/Obsidian)", "Calendar, tasks, and scheduling automation", "Integrating custom voice helpers"]
        : lang === "pt"
        ? ["Arquitetura do segundo cérebro (Notion/Obsidian)", "Automação de calendário, tarefas e compromissos", "Integração de assistentes de voz personalizados"]
        : ["Construcción de segundo cerebro (Notion/Obsidian)", "Automatización de calendarios, tareas y notas", "Integración de asistentes de voz personalizados"]
    },
    {
      type: "process",
      title: ws.processTitle,
      subtitle: ws.processSub,
      badge: ws.processBadge,
      icon: Network,
      duration: ws.durationValProcess,
      color: "linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(245, 158, 11, 0.02) 100%)",
      borderColor: "rgba(245, 158, 11, 0.2)",
      glowColor: "rgba(245, 158, 11, 0.15)",
      accentColor: "#f59e0b",
      whatsappMsg: "Hola! Me interesa la capacitación en IA para Automatización de Procesos. ¿Me podrías dar más detalles?",
      modules: lang === "en"
        ? ["Mapping operational workflows in Make", "Connecting CRM pipelines & databases", "Python scripts for data processing"]
        : lang === "pt"
        ? ["Mapeamento de fluxos operacionais no Make", "Conexão de CRM, planilhas e bancos de dados", "Scripts em Python para processamento de dados"]
        : ["Mapeo de flujos operativos en Make", "Conexión de CRM, planillas y bases de datos", "Scripts en Python para procesar datos"]
    },
    {
      type: "corporate",
      title: ws.corpTitle,
      subtitle: ws.corpSub,
      badge: ws.corpBadge,
      icon: GraduationCap,
      duration: ws.durationValCorp,
      color: "linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(239, 68, 68, 0.02) 100%)",
      borderColor: "rgba(239, 68, 68, 0.2)",
      glowColor: "rgba(239, 68, 68, 0.15)",
      accentColor: "#ef4444",
      whatsappMsg: "Hola! Me interesa la capacitación de Capacitación Corporativa y Reskilling para mi equipo. ¿Me podrías dar más detalles?",
      modules: lang === "en"
        ? ["Safe adoption & corporate data privacy policies", "Department-specific workflow automation", "Co-designing customized reskilling cohorts"]
        : lang === "pt"
        ? ["Adopção segura & políticas de privacidade corporativa", "Automação de fluxos por departamentos", "Co-desenho de planos personalizados de reskilling"]
        : ["Adopción segura y políticas de privacidad corporativas", "Automatización de flujos por departamento", "Co-diseño de planes personalizados de reskilling"]
    },
    {
      type: "mkt",
      title: ws.mktTitle,
      subtitle: ws.mktSub,
      badge: ws.mktBadge,
      icon: TrendingUp,
      duration: ws.durationValMkt,
      color: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0.02) 100%)",
      borderColor: "rgba(99, 102, 241, 0.2)",
      glowColor: "rgba(99, 102, 241, 0.15)",
      accentColor: "#6366f1",
      whatsappMsg: "Hola! Me interesa la capacitación de IA para Marketing y SEO Programático. ¿Me podrías dar más detalles?",
      modules: lang === "en"
        ? ["Programmatic SEO strategy based on keyword data", "Creative copywriting for social networks & ads", "Organic traffic lead generation pipelines"]
        : lang === "pt"
        ? ["Estratégia de SEO programático baseado em dados", "Redação criativa para redes sociais e anúncios", "Pipeline de captação orgânica com IA"]
        : ["Estrategia de SEO programático basado en datos", "Redacción creativa para redes sociales y anuncios", "Pipeline de captación orgánica con IA"]
    },
    {
      type: "sales",
      title: ws.salesTitle,
      subtitle: ws.salesSub,
      badge: ws.salesBadge,
      icon: BarChart3,
      duration: ws.durationValSales,
      color: "linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(6, 182, 212, 0.02) 100%)",
      borderColor: "rgba(6, 182, 212, 0.2)",
      glowColor: "rgba(6, 182, 212, 0.15)",
      accentColor: "#06b6d4",
      whatsappMsg: "Hola! Me interesa la capacitación de IA para Ventas y Prospección B2B. ¿Me podrías dar más detalles?",
      modules: lang === "en"
        ? ["Outbound sequences and automated prospecting", "High-conversion persuasive sales copywriting", "Voice calling appointment agents"]
        : lang === "pt"
        ? ["Sequências outbound e prospecção automatizada", "Redação comercial persuasiva de alta conversão", "Configuração de agentes telefônicos de voz"]
        : ["Secuencias outbound y prospección automatizada", "Redacción comercial persuasiva de alta conversión", "Agentes telefónicos de voz para agendamiento"]
    },
    {
      type: "finance",
      title: ws.finTitle,
      subtitle: ws.finSub,
      badge: ws.finBadge,
      icon: Wallet,
      duration: ws.durationValFin,
      color: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.02) 100%)",
      borderColor: "rgba(16, 185, 129, 0.2)",
      glowColor: "rgba(16, 185, 129, 0.15)",
      accentColor: "#10b981",
      whatsappMsg: "Hola! Me interesa la capacitación de IA para Finanzas y Análisis de Datos. ¿Me podrías dar más detalles?",
      modules: lang === "en"
        ? ["Intelligent reporting dashboards & cash flows", "AI vision cost auditing & invoice parsing", "Predictive modeling and forecasting"]
        : lang === "pt"
        ? ["Painéis de relatórios inteligentes & fluxos de caixa", "Auditoria de custos com visão computacional de IA", "Modelagem preditiva e projeções financeiras"]
        : ["Tableros inteligentes de reportes y flujos de caja", "Auditoría de costos con visión artificial de IA", "Modelado predictivo y proyecciones financieras"]
    },
    {
      type: "design",
      title: ws.designTitle,
      subtitle: ws.designSub,
      badge: ws.designBadge,
      icon: Palette,
      duration: ws.durationValDesign,
      color: "linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(236, 72, 153, 0.02) 100%)",
      borderColor: "rgba(236, 72, 153, 0.2)",
      glowColor: "rgba(236, 72, 153, 0.15)",
      accentColor: "#ec4899",
      whatsappMsg: "Hola! Me interesa la capacitación de IA para Diseñadores y Prototipado UX/UI. ¿Me podrías dar más detalles?",
      modules: lang === "en"
        ? ["High-fidelity interactive visual wireframing", "Creative assets variation with Midjourney & DALL-E", "Figma AI integrations for design speed"]
        : lang === "pt"
        ? ["Criação de protótipos visuais de alta fidelidade", "Variações de ativos criativos com Midjourney e DALL-E", "Integração de Figma AI para acelerar designs"]
        : ["Diseño de wireframes interactivos de alta fidelidad", "Variación de assets creativos con Midjourney y DALL-E", "Integraciones de Figma AI para acelerar diseño"]
    },
    {
      type: "pyme",
      title: ws.pymeTitle,
      subtitle: ws.pymeSub,
      badge: ws.pymeBadge,
      icon: Store,
      duration: ws.durationValPyme,
      color: "linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(245, 158, 11, 0.02) 100%)",
      borderColor: "rgba(245, 158, 11, 0.2)",
      glowColor: "rgba(245, 158, 11, 0.15)",
      accentColor: "#f59e0b",
      whatsappMsg: "Hola! Me interesa la capacitación de IA para Emprendedores y PYMEs. ¿Me podrías dar más detalles?",
      modules: lang === "en"
        ? ["Zero-budget operational digitizing & local CRM", "Customer lead nurturing & local services scheduling", "Fast-launch strategies for digital products"]
        : lang === "pt"
        ? ["Digitalização operacional e CRM local com orçamento zero", "Nutrição de leads de clientes & agendamento local", "Estratégia de lançamento rápido de produtos digitais"]
        : ["Digitalización operativa y CRM local con presupuesto cero", "Nutrición de prospectos locales y agendamiento", "Estrategia de lanzamiento rápido de productos digitales"]
    },
    {
      type: "custom",
      title: ws.customTitle,
      subtitle: ws.customSub,
      badge: ws.customBadge,
      icon: Code2,
      duration: ws.durationValCustom,
      color: "linear-gradient(135deg, rgba(71, 196, 255, 0.15) 0%, rgba(0, 240, 255, 0.05) 100%)",
      borderColor: "rgba(0, 240, 255, 0.4)",
      glowColor: "rgba(0, 240, 255, 0.3)",
      accentColor: "#00f0ff",
      whatsappMsg: "Hola Cristian! Estaba viendo los cursos de Browns Studio, pero no tengo tiempo para capacitarme. Me interesa cotizar el desarrollo de un sistema o agente de IA a medida para mi negocio.",
      modules: lang === "en"
        ? ["Technical blueprinting and system architecture mapping", "Custom API developments & database integrations", "Dedicated maintenance, monitoring, & optimization support"]
        : lang === "pt"
        ? ["Mapeamento técnico e design de arquitetura de sistema", "Desenvolvimento de APIs customizadas & integrações", "Manutenção dedicada, monitoramento e otimização contínua"]
        : ["Mapeo técnico y diseño de arquitectura del sistema", "Desarrollo de APIs personalizadas e integraciones", "Mantenimiento dedicado, monitoreo y soporte de optimización"]
    }
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header container with title & manual arrows */}
        <div className="px-6 flex flex-col md:flex-row md:items-end md:justify-between mb-10 sm:mb-14">
          <div className="max-w-2xl text-left">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e5e5e5] mb-4">
              {ws.title}
            </h2>
            <p className="text-[#9e9e9e] text-sm sm:text-base leading-relaxed">
              {ws.subtitle}
            </p>
          </div>

          <div className="flex gap-3 mt-6 md:mt-0">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-white/10 bg-[#0a0a0c]/60 hover:bg-[#00f0ff]/10 hover:border-[#00f0ff]/30 text-white flex items-center justify-center transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-white/10 bg-[#0a0a0c]/60 hover:bg-[#00f0ff]/10 hover:border-[#00f0ff]/30 text-white flex items-center justify-center transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Outer Wrapper */}
        <div className="relative w-full overflow-hidden px-6">

          {/* Carousel Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar py-4 scroll-smooth"
          >
            {workshopsData.map((workshop, idx) => {
              const Icon = workshop.icon;
              const isExpanded = expandedIdx === idx;

              return (
                <div
                  key={idx}
                  className="w-[300px] sm:w-[350px] flex-shrink-0 snap-center relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 group overflow-hidden border"
                  style={{
                    background: workshop.color,
                    borderColor: workshop.borderColor,
                    boxShadow: `0 8px 32px 0 rgba(0,0,0,0.37)`,
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.borderColor = workshop.accentColor + "80";
                    target.style.boxShadow = `0 12px 40px 0 ${workshop.glowColor}`;
                    target.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.borderColor = workshop.borderColor;
                    target.style.boxShadow = `0 8px 32px 0 rgba(0,0,0,0.37)`;
                    target.style.transform = "translateY(0)";
                  }}
                >
                  {/* Background ambient lighting */}
                  <div
                    className="absolute -right-20 -top-20 w-48 h-48 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-100"
                    style={{
                      background: workshop.accentColor
                    }}
                  />

                  <div>
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider"
                        style={{
                          background: workshop.accentColor + "15",
                          color: workshop.accentColor,
                          border: `1px solid ${workshop.accentColor}25`
                        }}
                      >
                        {workshop.badge}
                      </span>
                      <Icon
                        size={20}
                        className="transition-transform duration-300 group-hover:scale-110"
                        style={{ color: workshop.accentColor }}
                      />
                    </div>

                    {/* Title & Sub */}
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#e5e5e5] mb-3 leading-tight min-h-[56px] flex items-center">
                      {workshop.title}
                    </h3>
                    <p className="text-[#9e9e9e] text-xs sm:text-sm leading-relaxed mb-4 min-h-[72px]">
                      {workshop.subtitle}
                    </p>

                    {/* Syllabus Toggle Link */}
                    <button
                      onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                      className="text-xs font-semibold transition-colors duration-200 mb-6 flex items-center gap-1.5 hover:underline"
                      style={{ color: workshop.accentColor }}
                    >
                      <span>
                        {isExpanded 
                          ? (lang === "en" ? "Hide Syllabus" : lang === "pt" ? "Ocultar Módulos" : "Ocultar Temario") 
                          : (lang === "en" ? "View Syllabus" : lang === "pt" ? "Ver Módulos" : "Ver Temario")}
                      </span>
                      <span className="text-[10px] font-mono">{isExpanded ? "▲" : "▼"}</span>
                    </button>

                    {/* Expanded Syllabus List */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isExpanded ? "max-h-[220px] opacity-100 mb-6" : "max-h-0 opacity-0 pointer-events-none"
                      }`}
                    >
                      <ul className="space-y-2 border-t border-white/5 pt-4">
                        {workshop.modules.map((mod, midx) => (
                          <li key={midx} className="flex items-start gap-2.5 text-xs text-[#9e9e9e] leading-normal">
                            <Check size={12} className="mt-0.5 flex-shrink-0" style={{ color: workshop.accentColor }} />
                            <span>{mod}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Details & CTA */}
                  <div>
                    <div className="space-y-3 mb-6 border-t border-white/5 pt-4 text-xs text-[#9e9e9e]">
                      <div className="flex items-center gap-3">
                        <Clock size={14} className="text-[#5a5a5a]" />
                        <span>{ws.duration.replace("{duration}", workshop.duration)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Video size={14} className="text-[#5a5a5a]" />
                        <span>{ws.modality.replace("{modality}", ws.modalityVal)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <ShieldCheck size={14} className="text-[#5a5a5a]" />
                        <span>Browns Studio Verified Certification</span>
                      </div>
                    </div>

                    <a
                      href={getWhatsAppLink(workshop.whatsappMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        background: `linear-gradient(135deg, ${workshop.accentColor}, #ffffff)`,
                        color: "#000",
                        boxShadow: `0 4px 20px ${workshop.glowColor}`
                      }}
                      onMouseEnter={(e) => {
                        const btn = e.currentTarget as HTMLElement;
                        btn.style.background = `linear-gradient(135deg, ${workshop.accentColor}, ${workshop.accentColor}cc)`;
                        btn.style.color = "#000";
                      }}
                      onMouseLeave={(e) => {
                        const btn = e.currentTarget as HTMLElement;
                        btn.style.background = `linear-gradient(135deg, ${workshop.accentColor}, #ffffff)`;
                        btn.style.color = "#000";
                      }}
                    >
                      <span>{workshop.type === "custom" ? (ws.customCta || "Cotizar Proyecto") : ws.cta}</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
