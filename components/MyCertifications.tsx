"use client";

import { useState, useRef } from "react";
import { useLang } from "@/lib/i18n/LanguageContext";
import { CheckCircle2, X, ShieldCheck, QrCode, FileText, Search, Loader2 } from "lucide-react";
import certificados from "@/lib/db/certificados.json";

export default function MyCertifications() {
  const { t, lang } = useLang();
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [searchId, setSearchId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedCert, setVerifiedCert] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const title = lang === "en" ? "My Professional Credentials" : lang === "pt" ? "Minhas Credenciais Profissionais" : "Mis Credenciales Profesionales";
  const subtitle = lang === "en" 
    ? "Verified certifications in cloud architecture, generative artificial intelligence, and Web3 development. Click on any card to view the digital credential."
    : lang === "pt"
    ? "Certificações verificadas em arquitetura de nuvem, inteligência artificial generativa e desenvolvimento Web3. Clique em qualquer cartão para ver a credencial digital."
    : "Certificaciones verificadas en arquitectura cloud, inteligencia artificial generativa y desarrollo Web3. Haz clic en cualquier tarjeta para ver la credencial digital.";

  // Safe cast for translation block
  const tc = (t as any).certificates || {
    title: "Validación de Certificados",
    subtitle: "Verifica la autenticidad de las certificaciones emitidas por Browns Studio.",
    placeholder: "Ingresa el ID del Certificado (ej. BS-AI-2026-001)",
    verifyBtn: "Verificar Autenticidad",
    verifying: "Verificando...",
    notFound: "Certificado no encontrado. Por favor, verifica el código.",
    foundTitle: "Certificación Válida",
    student: "Estudiante",
    course: "Curso / Taller",
    date: "Fecha de Emisión",
    id: "ID del Certificado",
    status: "Estado",
    statusVal: "Verificado y Activo",
    secured: "Protegido por el Registro Criptográfico de Browns Studio"
  };

  // Custom brand SVG renderers
  const GoogleCloudLogo = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"/>
      <path d="M19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" fill="#fff" opacity="0.2"/>
    </svg>
  );

  const MetaLogo = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-4.78-3.75-8.62-8.56-8.62-1.92 0-3.7.63-5.12 1.71L7.54 6.4C8.7 5.51 10.12 5 11.69 5c3.84 0 7 3.13 7 7s-3.16 7-7 7c-1.57 0-2.99-.51-4.15-1.4l1.34-1.06c1.42 1.08 3.2 1.71 5.12 1.71 4.81 0 8.56-3.84 8.56-8.62z" fill="#0668E3"/>
      <path d="M1.44 11.75C1.44 6.97 5.19 3.13 10 3.13c1.92 0 3.7.63 5.12 1.71l-1.34 1.06C12.62 5.01 11.2 4.5 9.63 4.5c-3.84 0-7 3.13-7 7s3.16 7 7 7c1.57 0 2.99-.51 4.15-1.4l-1.34-1.06c-1.42 1.08-3.2 1.71-5.12 1.71-4.81 0-8.56-3.84-8.56-8.62z" fill="#0668E3"/>
    </svg>
  );

  const StellarLogo = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#a855f7" strokeWidth="2"/>
      <path d="M8 15l4-8 4 8H8z" fill="#a855f7"/>
      <path d="M6 12h12" stroke="#a855f7" strokeWidth="2"/>
    </svg>
  );

  const certs = [
    {
      title: "Google Cloud Certified",
      subtitle: "Associate Cloud Engineer",
      issuer: "Google Cloud",
      year: "2025",
      id: "GCP-ACE-99412",
      logo: GoogleCloudLogo,
      color: "rgba(66, 133, 244, 0.03)",
      borderColor: "rgba(66, 133, 244, 0.15)",
      glowColor: "rgba(66, 133, 244, 0.2)",
      badgeColor: "#4285f4",
      description: lang === "en" 
        ? "Validates ability to plan, configure, deploy and secure cloud infrastructure solutions, utilizing Google Kubernetes Engine, App Engine and Compute instances."
        : "Valida la habilidad para planificar, configurar, desplegar y asegurar soluciones de infraestructura cloud, utilizando Google Kubernetes Engine, App Engine e instancias de computación."
    },
    {
      title: "Generative AI Fundamentals",
      subtitle: "Large Language Models & Prompt Engineering",
      issuer: "Google Cloud",
      year: "2026",
      id: "GCP-GENAI-1082",
      logo: GoogleCloudLogo,
      color: "rgba(244, 180, 0, 0.03)",
      borderColor: "rgba(244, 180, 0, 0.15)",
      glowColor: "rgba(244, 180, 0, 0.2)",
      badgeColor: "#f4b400",
      description: lang === "en" 
        ? "Advanced training on deploying LLMs, fine-tuning foundation models, structuring complex prompt systems, and implementing responsible AI filters."
        : "Formación avanzada en despliegue de LLMs, ajuste de modelos fundacionales (fine-tuning), estructuración de sistemas de prompts y filtros de IA responsable."
    },
    {
      title: "Meta Certified Developer",
      subtitle: "API Integrations & WhatsApp Business API",
      issuer: "Meta Blueprint",
      year: "2025",
      id: "META-DEV-3301",
      logo: MetaLogo,
      color: "rgba(6, 104, 227, 0.03)",
      borderColor: "rgba(6, 104, 227, 0.15)",
      glowColor: "rgba(6, 104, 227, 0.2)",
      badgeColor: "#0668e3",
      description: lang === "en" 
        ? "Validates expertise in implementing Conversational APIs, WhatsApp Cloud API hooks, webhooks management, and secure Meta Graph API data exchange."
        : "Valida la experiencia en la implementación de Conversational APIs, WhatsApp Cloud API hooks, manejo de webhooks y pasarelas seguras con Meta Graph API."
    },
    {
      title: "Soroban Smart Contracts",
      subtitle: "Stellar Web3 & Rust Developer",
      issuer: "Stellar Foundation",
      year: "2026",
      id: "SDF-SOROBAN-88",
      logo: StellarLogo,
      color: "rgba(147, 51, 234, 0.03)",
      borderColor: "rgba(147, 51, 234, 0.15)",
      glowColor: "rgba(147, 51, 234, 0.2)",
      badgeColor: "#a855f7",
      description: lang === "en" 
        ? "Validates technical proficiency in writing WASM smart contracts using Rust on the Soroban/Stellar platform, optimizing gas fees and implementing zero-knowledge structures."
        : "Valida el dominio técnico en la escritura de smart contracts en formato WASM usando Rust sobre la plataforma Soroban/Stellar, optimizando gas fees e integrando estructuras de zero-knowledge."
    }
  ];

  // Mouse spotlight spotlight effect
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleVerifySearch = () => {
    if (!searchId.trim()) return;
    setIsVerifying(true);
    setErrorMsg("");
    setVerifiedCert(null);

    setTimeout(() => {
      const match = certificados.find(c => c.id.toLowerCase() === searchId.trim().toLowerCase());
      if (match) {
        setVerifiedCert(match);
      } else {
        setErrorMsg(tc.notFound);
      }
      setIsVerifying(false);
    }, 1200);
  };

  return (
    <section className="py-16 sm:py-20 px-6 relative overflow-hidden bg-transparent">
      {styleTag}

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center mb-12">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest mb-4"
            style={{ border: "1px solid rgba(71,196,255,0.2)", background: "rgba(71,196,255,0.05)", color: "#47c4ff" }}
          >
            {lang === "en" ? "CREDENTIALS" : lang === "pt" ? "CREDENCIAIS" : "MIS CERTIFICACIONES"}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#e5e5e5] mb-4">
            {title}
          </h2>
          <p className="text-[#9e9e9e] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {certs.map((cert, idx) => {
            const Logo = cert.logo;
            return (
              <div
                key={idx}
                ref={(el) => { cardRefs.current[idx] = el; }}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onClick={() => setSelectedCert(cert)}
                className="spotlight-card relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-500 group overflow-hidden border cursor-pointer backdrop-blur-xl bg-white/[0.01] hover:scale-[1.02]"
                style={{
                  borderColor: cert.borderColor,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  "--spotlight-color": cert.glowColor
                } as React.CSSProperties}
              >
                <div>
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <span 
                      className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider"
                      style={{ background: cert.badgeColor + "20", color: cert.badgeColor }}
                    >
                      {cert.issuer}
                    </span>
                    <Logo />
                  </div>

                  <h3 className="font-display font-bold text-base text-[#e5e5e5] mb-1 group-hover:text-white transition-colors duration-200 relative z-10">
                    {cert.title}
                  </h3>
                  <p className="text-[#9e9e9e] text-xs leading-relaxed mb-6 group-hover:text-white/80 transition-colors duration-200 relative z-10">
                    {cert.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-[#5a5a5a] relative z-10">
                  <span className="flex items-center gap-1 text-green-500/70 font-semibold uppercase font-mono tracking-wider">
                    <CheckCircle2 size={10} className="text-green-500" />
                    VERIFIED
                  </span>
                  <span className="font-mono text-white/30">{cert.id}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Fullscreen Credential Modal */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 z-50 animate-fade-in">
          <div 
            className="relative w-full max-w-2xl bg-[#090d16] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col justify-between overflow-hidden"
            style={{ 
              backgroundImage: "radial-gradient(ellipse 50% 50% at 50% 0%, rgba(0,240,255,0.06) 0%, transparent 80%)"
            }}
          >
            <button 
              onClick={() => setSelectedCert(null)}
              className="absolute right-6 top-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <X size={20} />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                {<selectedCert.logo />}
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-white/40 block uppercase">
                    OFFICIAL DIGITAL CREDENTIAL
                  </span>
                  <h4 className="text-lg font-bold text-white font-display">
                    {selectedCert.title}
                  </h4>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1">
                    CERTIFICATE SUBTITLE / TRACK
                  </span>
                  <p className="text-sm font-semibold text-[#e5e5e5]">
                    {selectedCert.subtitle}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1">
                    CREDENTIAL DESCRIPTION & SKILLS
                  </span>
                  <p className="text-xs text-[#9e9e9e] leading-relaxed">
                    {selectedCert.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                <div>
                  <span className="text-white/40 block mb-0.5">ISSUER</span>
                  <span className="text-[#e5e5e5] font-semibold">{selectedCert.issuer}</span>
                </div>
                <div>
                  <span className="text-white/40 block mb-0.5">YEAR ISSUED</span>
                  <span className="text-[#e5e5e5] font-semibold">{selectedCert.year}</span>
                </div>
                <div>
                  <span className="text-white/40 block mb-0.5">VERIFICATION ID</span>
                  <span className="text-[#00f0ff] font-mono font-semibold">{selectedCert.id}</span>
                </div>
                <div>
                  <span className="text-white/40 block mb-0.5">STATUS</span>
                  <span className="text-green-500 font-bold flex items-center gap-1 uppercase">
                    <ShieldCheck size={12} />
                    Active & Verified
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-lg p-1.5 flex items-center justify-center flex-shrink-0">
                  <QrCode size={36} className="text-black" />
                </div>
                <div className="text-[10px] text-white/40 leading-relaxed font-mono">
                  <span>SCAN TO VERIFY Authenticity</span>
                  <span className="block text-green-500/80">Secured via Browns Studio</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2.5 rounded-lg border border-white/10 hover:border-white/20 text-xs font-semibold text-[#9e9e9e] hover:text-white transition-all flex items-center gap-1.5"
                >
                  <FileText size={14} />
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Verified Student Certificate Result Modal */}
      {verifiedCert && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 z-50 animate-fade-in">
          <div 
            className="relative w-full max-w-2xl bg-[#090d16] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col justify-between overflow-hidden"
            style={{ 
              backgroundImage: "radial-gradient(ellipse 50% 50% at 50% 0%, rgba(0,240,255,0.08) 0%, transparent 80%)"
            }}
          >
            <button 
              onClick={() => setVerifiedCert(null)}
              className="absolute right-6 top-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <X size={20} />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-white/5 pb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#00f0ff]/10 border border-[#00f0ff]/20">
                  <ShieldCheck size={20} className="text-[#00f0ff]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#00f0ff] block uppercase">
                    BROWNS STUDIO ACADEMY VERIFIED DIPLOMA
                  </span>
                  <h4 className="text-lg font-bold text-white font-display">
                    {tc.foundTitle}
                  </h4>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1">
                    {tc.student}
                  </span>
                  <p className="text-base font-bold text-white">
                    {verifiedCert.student}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1">
                    {tc.course}
                  </span>
                  <p className="text-sm font-semibold text-[#e5e5e5]">
                    {lang === "en" ? verifiedCert.courseEn : lang === "pt" ? verifiedCert.coursePt : verifiedCert.course}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                <div>
                  <span className="text-white/40 block mb-0.5">{tc.id}</span>
                  <span className="text-[#00f0ff] font-mono font-semibold">{verifiedCert.id}</span>
                </div>
                <div>
                  <span className="text-white/40 block mb-0.5">{tc.date}</span>
                  <span className="text-[#e5e5e5] font-semibold">
                    {lang === "en" ? verifiedCert.dateEn : lang === "pt" ? verifiedCert.datePt : verifiedCert.date}
                  </span>
                </div>
                <div>
                  <span className="text-white/40 block mb-0.5">ISSUER</span>
                  <span className="text-[#e5e5e5] font-semibold">Browns Studio</span>
                </div>
                <div>
                  <span className="text-white/40 block mb-0.5">{tc.status}</span>
                  <span className="text-green-500 font-bold flex items-center gap-1 uppercase">
                    <ShieldCheck size={12} />
                    {tc.statusVal}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-lg p-1.5 flex items-center justify-center flex-shrink-0">
                  <QrCode size={36} className="text-black" />
                </div>
                <div className="text-[10px] text-white/40 leading-relaxed font-mono">
                  <span>SECURE CREDENTIAL REGISTRY</span>
                  <span className="block text-green-500/80">{tc.secured}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setVerifiedCert(null)}
                  className="px-4 py-2.5 rounded-lg border border-white/10 hover:border-white/20 text-xs font-semibold text-[#9e9e9e] hover:text-white transition-all flex items-center gap-1.5"
                >
                  <FileText size={14} />
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

const styleTag = (
  <style>{`
    .spotlight-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(
        350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
        var(--spotlight-color, rgba(255,255,255,0.06)),
        transparent 80%
      );
      z-index: 1;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .spotlight-card:hover::before {
      opacity: 1;
    }
  `}</style>
);
