"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Sparkles, ChevronDown, ExternalLink, Activity, CheckCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n/LanguageContext";

const CLIENT_LOGOS = [
  { name: "Trust Leaf",       abbr: "TL", color: "#C5A070" },
  { name: "PizzaDAO",         abbr: "PZ", color: "#c084fc" },
  { name: "Umbra Hub",        abbr: "UH", color: "#818cf8" },
  { name: "Morales Araya",    abbr: "MA", color: "#c8a45e" },
  { name: "GM Nail",          abbr: "GM", color: "#f472b6" },
  { name: "BS Tracker",       abbr: "BS", color: "#5865F2" },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

const statNumerics = [
  { numeric: 8,   suffix: "+" },
  { numeric: 7,   suffix: ""  },
  { numeric: 100, suffix: "%" },
];

function StatItem({ numeric, suffix, label, active }: { numeric: number; suffix: string; label: string; active: boolean }) {
  const count = useCountUp(numeric, 1200, active);
  return (
    <div className="text-center relative z-10">
      <div
        className="text-3xl sm:text-4xl font-display font-extrabold"
        style={{ letterSpacing: "-0.04em", color: "#00f0ff", textShadow: "0 0 15px rgba(0,240,255,0.3)" }}
      >
        {count}{suffix}
      </div>
      <div style={{ color: "rgba(0,240,255,0.5)", fontSize: "9px", marginTop: "6px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  const { t, lang } = useLang();
  const heroRef      = useRef<HTMLElement>(null);

  const hudLabels = {
    es: { lead: "PROSPECTO / LEAD", status: "ESTADO INTERNO", value: "VALOR ESTIMADO" },
    en: { lead: "PROSPECT / LEAD", status: "INTERNAL STATUS", value: "ESTIMATED VALUE" },
    pt: { lead: "PROSPECTO / LEAD", status: "ESTADO INTERNO", value: "VALOR ESTIMADO" },
  };

  const activeHudLabels = hudLabels[lang as keyof typeof hudLabels] || hudLabels.es;
  const [statsActive, setStatsActive] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Chat Simulator State Engine
  const [selectedNiche, setSelectedNiche] = useState(0);
  const [isAutoCycle, setIsAutoCycle] = useState(true);
  const [chatStep, setChatStep] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [typingSender, setTypingSender] = useState<"prospect" | "agent">("prospect");

  const currentSim = t.hero.chatSims[selectedNiche];

  useEffect(() => {
    setChatStep(1);
    setIsTyping(false);
  }, [selectedNiche]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 110);
            });
            setTimeout(() => setStatsActive(true), 600);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // Chat simulation state machine loop (humanized pacing)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (chatStep === 1) {
      timer = setTimeout(() => {
        setTypingSender("agent");
        setIsTyping(true);
        timer = setTimeout(() => {
          setIsTyping(false);
          setChatStep(2);
        }, 1200); // 1.2s typing indicator for Agent Msg 1
      }, 800); // 800ms initial pause
    } else if (chatStep === 2) {
      timer = setTimeout(() => {
        setChatStep(3);
      }, 2500); // 2.5s pause to read Agent Msg 1
    } else if (chatStep === 3) {
      timer = setTimeout(() => {
        setChatStep(4);
      }, 1800); // 1.8s loading spin for Tool 1
    } else if (chatStep === 4) {
      timer = setTimeout(() => {
        setTypingSender("prospect");
        setIsTyping(true);
        timer = setTimeout(() => {
          setIsTyping(false);
          setChatStep(5);
        }, 1000); // 1s typing indicator for Prospect response
      }, 3500); // 3.5s pause to read Agent Msg 2
    } else if (chatStep === 5) {
      timer = setTimeout(() => {
        setChatStep(6);
      }, 2200); // 2.2s pause to read Prospect Msg 2
    } else if (chatStep === 6) {
      timer = setTimeout(() => {
        setChatStep(7);
      }, 1800); // 1.8s loading spin for Tool 2
    } else if (chatStep === 7) {
      timer = setTimeout(() => {
        setTypingSender("agent");
        setIsTyping(true);
        timer = setTimeout(() => {
          setIsTyping(false);
          setChatStep(8);
        }, 1200); // 1.2s typing indicator for final Agent confirmation
      }, 2500); // 2.5s pause to read success
    } else if (chatStep === 8) {
      timer = setTimeout(() => {
        if (isAutoCycle) {
          setSelectedNiche((prev) => (prev + 1) % t.hero.chatSims.length);
          setChatStep(1);
          setIsTyping(false);
        } else {
          setChatStep(1);
        }
      }, 8000); // 8s pause at the very end to read everything before cycling
    }

    return () => clearTimeout(timer);
  }, [chatStep, isAutoCycle, t.hero.chatSims.length]);

  const statLabels = [t.hero.stat1, t.hero.stat2, t.hero.stat3];

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-transparent pt-24 pb-12 lg:py-0"
    >
      {/* ── Immersive Cyber Grid & Ambient Vignette ─────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(rgba(0, 240, 255, 0.15) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle 80% 50% at 50% -20%, rgba(10,15,30,0.6) 0%, transparent 80%)," +
              "radial-gradient(circle 60% 60% at 90% 50%, rgba(0,240,255,0.03) 0%, transparent 70%)," +
              "radial-gradient(circle 60% 60% at 10% 80%, rgba(112,0,255,0.02) 0%, transparent 70%)"
          }}
        />
      </div>

      {/* Cyber-mesh glowing orbs behind the phone mock-up */}
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] rounded-full filter blur-[120px] opacity-[0.15] pointer-events-none bg-gradient-to-r from-tertiary via-indigo-600 to-purple-600 animate-pulse-slow z-0 hidden lg:block" />
      <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] rounded-full filter blur-[100px] opacity-[0.1] pointer-events-none bg-gradient-to-r from-pink-500 to-[#7000ff] animate-pulse z-0 hidden lg:block" />

      {/* ── Content Grid ────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Value Hook Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">

            {/* Badge */}
            <div
              className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest border"
              style={{
                borderColor: "rgba(0,240,255,0.3)",
                background: "rgba(0,240,255,0.06)",
                color:      "#00f0ff",
                fontFamily: "var(--font-jet-brains-mono), monospace",
                boxShadow: "0 0 15px rgba(0,240,255,0.15)"
              }}
            >
              <Sparkles size={11} className="animate-pulse text-[#00f0ff]" />
              {t.hero.badge}
            </div>

            {/* Outcome-focused Headline */}
            <h1
              className="reveal reveal-delay-1 font-display font-extrabold text-[2.6rem] sm:text-5xl md:text-6xl text-[#f3f4f6] mb-6 leading-[1.05] tracking-tight"
            >
              {t.hero.line1}
              <br />
              <span className="bg-gradient-to-r from-[#00f0ff] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent bg-size-200 animate-shimmer">
                {t.hero.line2}
              </span>
              <br />
              {t.hero.line3}
            </h1>

            {/* Value-oriented Subtext */}
            <p className="reveal reveal-delay-2 text-base sm:text-lg leading-relaxed mb-10 text-[#9e9e9e] max-w-xl">
              {t.hero.sub}
            </p>

            {/* Upgraded Cyber CTA block */}
            <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto animate-in" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="group flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm text-black transition-all duration-300 w-full sm:w-auto justify-center relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #00f0ff, #00c8d8)",
                    boxShadow: "0 0 30px rgba(0, 240, 255, 0.35)",
                  }}
                >
                  <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
                  {t.hero.cta1}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute bottom-full mb-2 left-0 right-0 sm:left-auto sm:right-auto sm:min-w-[290px] glass rounded-2xl p-2 border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300 z-50">
                    {t.cta.contactOptions.map((opt: { label: string; msg: string }, i: number) => (
                      <a
                        key={i}
                        href={`${WHATSAPP_URL}&text=${encodeURIComponent(opt.msg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl text-xs sm:text-sm text-[#e5e5e5] hover:bg-white/5 transition-colors group/item font-medium"
                        onClick={() => setShowDropdown(false)}
                      >
                        <span>{opt.label}</span>
                        <ExternalLink size={12} className="opacity-0 group-hover/item:opacity-100 transition-opacity text-[#00f0ff]" />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 w-full sm:w-auto justify-center border border-white/10 text-[#9e9e9e] hover:border-tertiary/50 hover:text-white hover:bg-tertiary/5 hover:shadow-[0_0_20px_rgba(0,240,255,0.12)]"
              >
                {t.hero.cta2}
              </button>
            </div>

            {/* Floating HUD-style Stats Card */}
            <div
              className="reveal reveal-delay-4 grid grid-cols-3 gap-6 p-6 rounded-2xl relative overflow-hidden border border-white/5 w-full max-w-xl"
              style={{
                background: "rgba(10, 10, 15, 0.75)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Tech details */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-tertiary/40" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-tertiary/40" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-tertiary/40" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-tertiary/40" />

              {statNumerics.map((s, i) => (
                <StatItem key={i} numeric={s.numeric} suffix={s.suffix} label={statLabels[i]} active={statsActive} />
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: Immersive Interactive CRM & Agent Mockup */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center lg:justify-end">
            
            {/* Ambient behind light border */}
            <div className="w-full max-w-md relative select-none animate-float">
              
              {/* Carousel Tabs */}
              <div className="flex flex-wrap justify-center gap-2 mb-4 relative z-30">
                {t.hero.chatSims.map((sim, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedNiche(idx);
                      setIsAutoCycle(false);
                      setChatStep(1);
                      setIsTyping(false);
                    }}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all backdrop-blur-md border ${
                      selectedNiche === idx
                        ? "bg-tertiary/20 border-tertiary/50 text-white shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                        : "bg-[#181822]/50 border-white/5 text-white/40 hover:text-white/80 hover:bg-[#181822]"
                    }`}
                  >
                    {sim.tabName}
                  </button>
                ))}
              </div>

              {/* Phone Frame Glass Chassis */}
              <div className="w-full rounded-3xl border border-white/10 bg-[#060609]/90 backdrop-blur-2xl p-1 relative shadow-2xl shadow-tertiary/5 overflow-hidden">
                
                {/* Tech Status Tag */}
                <div className="absolute top-0 right-12 bg-tertiary/10 border-b border-x border-tertiary/20 px-3.5 py-1 rounded-b-xl text-[9px] font-mono text-tertiary uppercase tracking-widest flex items-center gap-1.5 z-20">
                  <Activity size={9} className="animate-pulse" />
                  {currentSim.hudActive}
                </div>

                {/* Reactive Header Dashboard (Instant outcome display with high-tech status progression) */}
                <div className="p-4 border-b border-white/5 bg-white/[0.01] grid grid-cols-3 gap-3 text-center relative z-10 pt-6">
                  <div className="rounded-xl border border-white/5 bg-[#0e0e13]/60 p-2.5 transition-all">
                    <div className="text-[8px] text-[#9e9e9e] uppercase tracking-wider font-bold mb-1">
                      {activeHudLabels.lead}
                    </div>
                    <div className="text-[10px] font-extrabold font-mono text-white transition-all duration-300">
                      {currentSim.hudLead}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-[#0e0e13]/60 p-2.5 transition-all">
                    <div className="text-[8px] text-[#9e9e9e] uppercase tracking-wider font-bold mb-1">
                      {activeHudLabels.status}
                    </div>
                    <div className={`text-[10px] font-extrabold font-mono transition-all duration-300 ${chatStep >= 4 ? 'text-tertiary shadow-[0_0_10px_rgba(0,240,255,0.2)]' : 'text-white/20'}`}>
                      {currentSim.hudStatus}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-[#0e0e13]/60 p-2.5 transition-all">
                    <div className="text-[8px] text-[#9e9e9e] uppercase tracking-wider font-bold mb-1">
                      {activeHudLabels.value}
                    </div>
                    <div className={`text-[10px] font-extrabold font-mono transition-all duration-300 ${chatStep >= 7 ? 'text-[#10b981] drop-shadow-[0_0_8px_rgba(16,185,129,0.3)] font-semibold' : 'text-white/20'}`}>
                      {currentSim.hudValue}
                    </div>
                  </div>
                </div>

                {/* Simulated CRM & Chat Area */}
                <div className="p-4 h-[460px] overflow-y-auto space-y-4 no-scrollbar flex flex-col justify-end text-[11px] relative z-10">
                  
                  {/* Step 1+: Prospect Msg 1 */}
                  {chatStep >= 1 && (
                    <div className="flex justify-start animate-in fade-in slide-in-from-left-4 duration-300 max-w-[85%]">
                      <div className="bg-[#181822] text-[#e5e5e5] rounded-2xl rounded-tl-none p-3.5 border border-white/5 relative">
                        <span className="text-[9px] text-white/40 block mb-1 font-semibold uppercase tracking-wider">Prospecto (Cliente)</span>
                        {currentSim.prospect}
                      </div>
                    </div>
                  )}

                  {/* Step 2+: Agent Msg 1 */}
                  {chatStep >= 2 && (
                    <div className="flex justify-end animate-in fade-in slide-in-from-right-4 duration-300 max-w-[85%] ml-auto">
                      <div className="bg-tertiary/10 text-white rounded-2xl rounded-tr-none p-3.5 border border-tertiary/20 relative shadow-[0_0_15px_rgba(0,240,255,0.03)]">
                        <span className="text-[9px] text-tertiary block mb-1 font-semibold uppercase tracking-wider">Agente BrownsOS</span>
                        {currentSim.agent1}
                      </div>
                    </div>
                  )}

                  {/* Step 3+: Tool Call Badge 1 */}
                  {chatStep >= 3 && (
                    <div className="flex justify-center animate-in fade-in duration-300">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] font-mono transition-all ${chatStep >= 4 ? 'border-green-500/20 bg-green-500/5 text-green-400' : 'border-tertiary/20 bg-tertiary/5 text-tertiary'}`}>
                        {chatStep >= 4 ? (
                          <>
                            <CheckCircle size={9} className="text-green-400" />
                            {currentSim.tool1Success}
                          </>
                        ) : (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping" />
                            {currentSim.tool1}
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 4+: Agent Msg 2 (Giving options) */}
                  {chatStep >= 4 && (
                    <div className="flex justify-end animate-in fade-in slide-in-from-right-4 duration-300 max-w-[85%] ml-auto">
                      <div className="bg-tertiary/10 text-white rounded-2xl rounded-tr-none p-3.5 border border-tertiary/20 relative">
                        {currentSim.agent2}
                      </div>
                    </div>
                  )}

                  {/* Step 5+: Prospect Msg 2 */}
                  {chatStep >= 5 && (
                    <div className="flex justify-start animate-in fade-in slide-in-from-left-4 duration-300 max-w-[85%]">
                      <div className="bg-[#181822] text-[#e5e5e5] rounded-2xl rounded-tl-none p-3.5 border border-white/5 relative">
                        <span className="text-[9px] text-white/40 block mb-1 font-semibold uppercase tracking-wider">Prospecto (Cliente)</span>
                        {currentSim.prospect2}
                      </div>
                    </div>
                  )}

                  {/* Step 6+: Tool Call Badge 2 */}
                  {chatStep >= 6 && (
                    <div className="flex justify-center animate-in fade-in duration-300">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] font-mono transition-all ${chatStep >= 7 ? 'border-[#10b981]/25 bg-[#10b981]/5 text-[#10b981]' : 'border-amber-500/20 bg-amber-500/5 text-amber-400 animate-pulse'}`}>
                        {chatStep >= 7 ? (
                          <>
                            <CheckCircle size={9} className="text-[#10b981]" />
                            {currentSim.tool2Success}
                          </>
                        ) : (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                            {currentSim.tool2}
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 8: Agent Msg 3 (Final Confirmation) */}
                  {chatStep >= 8 && (
                    <div className="flex justify-end animate-in fade-in slide-in-from-right-4 duration-300 max-w-[85%] ml-auto">
                      <div className="bg-tertiary/10 text-white rounded-2xl rounded-tr-none p-3.5 border border-tertiary/20 relative shadow-[0_0_15px_rgba(0,240,255,0.03)]">
                        <span className="text-[9px] text-tertiary block mb-1 font-semibold uppercase tracking-wider">Agente BrownsOS</span>
                        {currentSim.agent3}
                      </div>
                    </div>
                  )}

                  {/* Simulated Typing Indicator Bubble */}
                  {isTyping && (
                    <div className={`flex items-center gap-1.5 p-3 rounded-2xl border bg-[#121217] ${typingSender === 'agent' ? 'border-tertiary/20 text-tertiary ml-auto rounded-tr-none' : 'border-white/5 text-white/50 mr-auto rounded-tl-none'} w-14 justify-center animate-pulse`}>
                      <span className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1 h-1 rounded-full bg-current animate-bounce" />
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

