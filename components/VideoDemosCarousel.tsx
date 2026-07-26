"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n/LanguageContext";
import { Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX, Maximize2 } from "lucide-react";

export default function VideoDemosCarousel() {
  const { lang } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false); // Pauses autoplay carousel
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const videoDemos = [
    {
      title: lang === "en" ? "WhatsApp Agent Builder" : lang === "pt" ? "WhatsApp Agent Builder" : "WhatsApp Agent Builder",
      desc: lang === "en" 
        ? "Visual workflow builder for conversational agents with context memory and tool calling integrations."
        : lang === "pt"
        ? "Construtor visual de fluxos para agentes conversacionais com memória contextual e integrações de chamadas de ferramentas."
        : "Constructor visual de flujos de conversación y bots con memoria contextual y tool calling.",
      techs: ["Next.js", "Kapso API", "Gemini 2.0", "Firebase"],
      color: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
      accent: "#00f0ff",
      duration: 154 // 2:34
    },
    {
      title: lang === "en" ? "Remotion Promo Generator" : lang === "pt" ? "Remotion Promo Generator" : "Remotion Promo Generator",
      desc: lang === "en"
        ? "Automated video pitch generation combining ElevenLabs voice synthesis and programatic Remotion rendering."
        : lang === "pt"
        ? "Geração automatizada de pitches de vídeo combinando síntese de voz ElevenLabs e renderização programática Remotion."
        : "Generador automático de pitches de video personalizados usando síntesis de voz ElevenLabs y Remotion.",
      techs: ["React", "Remotion", "ElevenLabs", "FFmpeg"],
      color: "linear-gradient(135deg, #090d16 0%, #1e1b4b 100%)",
      accent: "#a855f7",
      duration: 98 // 1:38
    },
    {
      title: lang === "en" ? "JurisClaro Legal Scraper" : lang === "pt" ? "JurisClaro Legal Scraper" : "JurisClaro Legal Scraper",
      desc: lang === "en"
        ? "Autonomous scrapers parsing Chilean judicial records (PJUD) into simplified AI explanations for clients."
        : lang === "pt"
        ? "Scrapers autônomos processando registros judiciais chilenos (PJUD) em explicações de IA simplificadas para clientes."
        : "Módulo inteligente de scraping y parseo de causas judiciales chilenas a explicaciones simplificadas.",
      techs: ["Puppeteer", "AI Extraction", "Node.js", "Cron Tasks"],
      color: "linear-gradient(135deg, #1e1b4b 0%, #030712 100%)",
      accent: "#f59e0b",
      duration: 112 // 1:52
    },
    {
      title: lang === "en" ? "B2B Outbound Lead Sorter" : lang === "pt" ? "B2B Outbound Lead Sorter" : "B2B Outbound Lead Sorter",
      desc: lang === "en"
        ? "Automated B2B prospecting tool parsing LinkedIn profiles, matching them to sales scripts, and triggering CRM entry."
        : lang === "pt"
        ? "Ferramenta automatizada de prospecção B2B analisando perfis do LinkedIn e gerando scripts de vendas no CRM."
        : "Herramienta automatizada de prospección B2B que analiza perfiles de LinkedIn y califica leads en CRM.",
      techs: ["LinkedIn API", "OpenAI GPT-4o", "HubSpot SDK"],
      color: "linear-gradient(135deg, #022c22 0%, #064e3b 100%)",
      accent: "#10b981",
      duration: 142 // 2:22
    },
    {
      title: lang === "en" ? "Figma UX/UI AI Layout Generator" : lang === "pt" ? "Figma UX/UI AI Layout Generator" : "Figma UX/UI AI Layout Generator",
      desc: lang === "en"
        ? "Custom plugin using semantic vision models to generate code layouts and component states directly inside Figma artboards."
        : lang === "pt"
        ? "Plugin personalizado usando modelos de visão semântica para gerar layouts de código e componentes no Figma."
        : "Plugin de Figma que utiliza modelos de visión semántica para estructurar layouts y código interactivo.",
      techs: ["Figma Plugin API", "Claude 3.5 Sonnet", "TailwindCSS"],
      color: "linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%)",
      accent: "#ec4899",
      duration: 125 // 2:05
    }
  ];

  const total = videoDemos.length;
  const activeDemo = videoDemos[activeIndex];

  const prev = useCallback(() => {
    setIsPlaying(false);
    setProgress(0);
    setActiveIndex((current) => (current - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setIsPlaying(false);
    setProgress(0);
    setActiveIndex((current) => (current + 1) % total);
  }, [total]);

  // Autoplay carousel (only when video is not playing)
  useEffect(() => {
    if (paused || isPlaying) return;
    const timer = setInterval(() => {
      next();
    }, 8000);
    return () => clearInterval(timer);
  }, [paused, isPlaying, next]);

  // Simulated video playback timer
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prevProgress + 1;
        });
      }, (activeDemo.duration * 1000) / 100);
    } else {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    }

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying, activeDemo.duration]);

  const handlePlayToggle = () => {
    if (!isPlaying) {
      // Simulate brief buffering
      setIsBuffering(true);
      setTimeout(() => {
        setIsBuffering(false);
        setIsPlaying(true);
      }, 600);
    } else {
      setIsPlaying(false);
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newProgress = Math.min(Math.max((clickX / width) * 100, 0), 100);
    setProgress(newProgress);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentSeconds = (progress / 100) * activeDemo.duration;

  return (
    <section className="py-12 sm:py-16 px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest mb-4"
            style={{ border: "1px solid rgba(71,196,255,0.2)", background: "rgba(71,196,255,0.05)", color: "#47c4ff" }}
          >
            DEMOS EN VIDEO
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#e5e5e5] mb-3">
            {lang === "en" ? "AI Highlight Demos" : lang === "pt" ? "Demos em Destaque de IA" : "Demostraciones Destacadas de IA"}
          </h2>
          <p className="text-[#9e9e9e] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            {lang === "en" 
              ? "Interact with our video player mock showing automated voice pitches, scraper logs and workflow diagrams."
              : lang === "pt"
              ? "Interaja com nossa demo de player de vídeo apresentando pitches automáticos, logs e fluxos."
              : "Videos explicativos que demuestran nuestros flujos de automatización, síntesis de voz y pipelines de datos."}
          </p>
        </div>

        {/* Carousel Frame Container */}
        <div 
          className="relative group overflow-hidden rounded-3xl border border-white/5 bg-[#0b0c10]"
          style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.6)" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Main 16:9 Video Container */}
          <div 
            className="aspect-video w-full relative flex items-center justify-center overflow-hidden transition-all duration-500 select-none"
            style={{ background: activeDemo.color }}
          >
            {/* Buffering Spinner */}
            {isBuffering && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                <div className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: `${activeDemo.accent} ${activeDemo.accent} transparent transparent` }} />
              </div>
            )}

            {/* Ambient Accent light */}
            <div 
              className="absolute inset-0 opacity-40 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at center, ${activeDemo.accent}15 0%, transparent 70%)` }}
            />

            {/* Simulated Animated Video Feed / Waveform */}
            {isPlaying && !isBuffering ? (
              <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none">
                {/* Simulated Grid Overlay */}
                <div 
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                  }}
                />

                {/* Top status */}
                <div className="flex justify-between items-center text-[10px] font-mono text-white/40 tracking-wider">
                  <span>STREAMING DEMO_FEED.MP4</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    LIVE
                  </span>
                </div>

                {/* Center visual: Audio wave bar loop */}
                <div className="flex items-center justify-center gap-1.5 h-24 my-auto">
                  {[...Array(16)].map((_, i) => {
                    const animationDelay = `${i * 0.1}s`;
                    return (
                      <div
                        key={i}
                        className="w-1 rounded-full opacity-60 transition-all duration-300"
                        style={{
                          height: "100%",
                          background: activeDemo.accent,
                          animation: `bounce 1.2s ease-in-out infinite alternate`,
                          animationDelay
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            ) : null}

            {/* Play/Pause Button overlay */}
            {!isPlaying && !isBuffering && (
              <button
                onClick={handlePlayToggle}
                className="w-20 h-20 rounded-full flex items-center justify-center border border-white/10 bg-black/60 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:border-white/30 shadow-2xl cursor-pointer z-10"
              >
                <Play size={26} className="text-white/90 translate-x-0.5" fill="currentColor" />
              </button>
            )}

            {/* Custom Interactive Player Control Bar (Visible on Hover/Playing) */}
            <div 
              className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/85 to-transparent pt-12 pb-4 px-6 flex flex-col gap-4 transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10"
            >
              {/* Progress Slider Bar */}
              <div 
                className="h-1.5 w-full bg-white/10 hover:h-2 rounded-full cursor-pointer relative overflow-hidden transition-all"
                onClick={handleProgressBarClick}
              >
                <div 
                  className="h-full rounded-full transition-all duration-100"
                  style={{ 
                    width: `${progress}%`,
                    background: activeDemo.accent,
                    boxShadow: `0 0 8px ${activeDemo.accent}`
                  }}
                />
              </div>

              {/* Lower Controls */}
              <div className="flex items-center justify-between text-white/80">
                {/* Left controls: Play, skip, time */}
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handlePlayToggle}
                    className="hover:text-white transition-colors"
                  >
                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                  </button>

                  <span className="text-xs font-mono select-none">
                    {formatTime(currentSeconds)} / {formatTime(activeDemo.duration)}
                  </span>
                </div>

                {/* Right controls: Volume, full screen */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className="hover:text-white transition-colors"
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setVolume(Number(e.target.value));
                        setIsMuted(false);
                      }}
                      className="w-16 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#00f0ff]"
                      style={{ background: `linear-gradient(to right, ${activeDemo.accent} ${isMuted ? 0 : volume}%, rgba(255,255,255,0.1) ${isMuted ? 0 : volume}%)` }}
                    />
                  </div>

                  <button className="hover:text-white transition-colors">
                    <Maximize2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Custom keyframes injection inside component */}
            <style>{`
              @keyframes bounce {
                0% { transform: scaleY(0.15); }
                100% { transform: scaleY(0.75); }
              }
            `}</style>

            {/* Coming soon badge (hidden when control bar is shown on hover) */}
            {!isPlaying && (
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded text-xs uppercase font-mono tracking-widest bg-black/80 text-white/50 border border-white/5 group-hover:opacity-0 transition-opacity duration-300">
                COMING SOON
              </div>
            )}
          </div>

          {/* Navigation Overlay Arrows */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-black/55 border border-white/5 text-white/70 hover:text-white hover:border-[#00f0ff]/30 hover:bg-black/85 transition-all duration-200 z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-black/55 border border-white/5 text-white/70 hover:text-white hover:border-[#00f0ff]/30 hover:bg-black/85 transition-all duration-200 z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Video Card Details Below the Player */}
        <div className="mt-8 bg-[#0b0c10]/40 border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 backdrop-blur-md">
          <div className="flex-1">
            <span className="text-xs uppercase tracking-widest mb-1.5 block font-semibold" style={{ color: activeDemo.accent }}>
              HIGHLIGHT PITCH
            </span>
            <h3 className="font-display font-semibold text-xl text-[#e5e5e5] mb-2">
              {activeDemo.title}
            </h3>
            <p className="text-[#9e9e9e] text-sm leading-relaxed">
              {activeDemo.desc}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:max-w-[200px] flex-shrink-0">
            {activeDemo.techs.map((tech) => (
              <span 
                key={tech} 
                className="px-2.5 py-1 rounded text-xs text-white/55 bg-white/5 border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Indicators Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {videoDemos.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsPlaying(false);
                setProgress(0);
                setActiveIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 bg-[#00f0ff]"
                  : "w-1.5 bg-white/10 hover:bg-white/20"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
