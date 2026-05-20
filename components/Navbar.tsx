"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { SITE_CONFIG, WHATSAPP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n/LanguageContext";

interface NavTranslation {
  services: string;
  portfolio: string;
  process: string;
  pricing: string;
  faq: string;
  cta: string;
  formacion?: string;
  solutions?: string;
  solutionsList?: Record<string, string>;
}

const allSectionIds = ["inicio", "sobre-mi", "servicios", "portfolio", "proceso", "precios", "testimonios", "faq", "contacto"];

export default function Navbar() {
  const { t, lang, toggle } = useLang();
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

  const nav = t.nav as NavTranslation;
  const solutionsList = nav.solutionsList ? Object.entries(nav.solutionsList) : [];

  const navLinks = [
    { label: nav.services, href: "#servicios", id: "servicios", page: false },
    { label: nav.portfolio, href: "#portfolio", id: "portfolio", page: false },
    { label: nav.process,  href: "#proceso",   id: "proceso",   page: false },
    { label: nav.pricing,  href: "#precios",   id: "precios",   page: false },
    { label: nav.faq,      href: "#faq",       id: "faq",       page: false },
    { label: nav.formacion ?? "Formación", href: `/${lang}/formacion`, id: "formacion", page: true },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionEls = allSectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
        style={scrolled ? { background: "rgba(0,0,0,0.85)", borderBottom: "1px solid rgba(72,72,72,0.15)" } : {}}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            <Link href="/" className="flex items-center gap-3 group" aria-label={SITE_CONFIG.name}>
              <div className="relative">
                <div className="absolute inset-0 bg-accent-gold/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img 
                  src="/icon.png?v=5" 
                  alt="Logo" 
                  className="w-9 h-9 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <span className="font-display font-semibold text-lg tracking-wide text-[#e5e5e5] group-hover:text-[#c6c6c7] transition-colors duration-300">
                BROWNS{" "}
                <span className="text-gradient-gold">STUDIO</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Link 1: Services */}
              <button
                onClick={() => handleNavClick("#servicios")}
                className={`relative text-xs font-medium uppercase tracking-widest transition-all duration-300 cursor-pointer group ${
                  activeSection === "servicios" ? "text-[#e5e5e5]" : "text-[#5a5a5a] hover:text-[#9e9e9e]"
                }`}
              >
                {t.nav.services}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${
                    activeSection === "servicios" ? "w-full bg-[#00f0ff]" : "w-0 group-hover:w-full bg-[#484848]"
                  }`}
                />
              </button>

              {/* Solutions Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 text-xs font-medium uppercase tracking-widest transition-all duration-300 cursor-pointer group ${
                    dropdownOpen || activeSection === "soluciones" ? "text-[#00f0ff]" : "text-[#5a5a5a] hover:text-[#9e9e9e]"
                  }`}
                >
                  {nav.solutions ?? "Soluciones"}
                  <ChevronDown size={12} className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180 text-[#00f0ff]" : "text-[#5a5a5a] group-hover:text-[#9e9e9e]"}`} />
                </button>
                
                {/* Premium Glassmorphic Dropdown Menu */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-xl border transition-all duration-300 ${
                    dropdownOpen 
                      ? "opacity-100 translate-y-0 pointer-events-auto" 
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                  style={{
                    background: "rgba(10, 11, 10, 0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(0, 240, 255, 0.15)",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)",
                    padding: "8px 0",
                    zIndex: 100,
                  }}
                >
                  {solutionsList.map(([key, label]) => (
                    <Link
                      key={key}
                      href={`/${lang}/soluciones/${key}`}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#9e9e9e] hover:text-[#00f0ff] hover:bg-[#00f0ff]/5 transition-all duration-200"
                    >
                      <span className="mr-2 text-sm">
                        {key === "dentistas" ? "🦷" : key === "salud" ? "🏥" : key === "estetica" ? "✨" : key === "abogados" ? "⚖️" : "🎓"}
                      </span>
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other Hash Links */}
              {navLinks.slice(1).map((link) => {
                const isActive = activeSection === link.id;
                if (link.page) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative text-xs font-medium uppercase tracking-widest transition-all duration-300 group ${
                        isActive ? "text-[#e5e5e5]" : "text-[#5a5a5a] hover:text-[#9e9e9e]"
                      }`}
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full bg-[#484848] transition-all duration-300" />
                    </Link>
                  );
                }
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative text-xs font-medium uppercase tracking-widest transition-all duration-300 cursor-pointer group ${
                      isActive ? "text-[#e5e5e5]" : "text-[#5a5a5a] hover:text-[#9e9e9e]"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${
                        isActive ? "w-full bg-[#00f0ff]" : "w-0 group-hover:w-full bg-[#484848]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* CTA + lang toggle + hamburger */}
            <div className="flex items-center gap-3">
              {/* Language toggle */}
              <button
                onClick={toggle}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold transition-all duration-200 hover:scale-105"
                style={{ border: "1px solid rgba(0,240,255,0.3)", color: "#00f0ff", background: "rgba(0,240,255,0.05)" }}
                title={lang === "en" ? "Cambiar a Español" : lang === "es" ? "Mudar para Português" : "Switch to English"}
              >
                {lang === "en" ? "ES" : lang === "es" ? "PT" : "EN"}
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-black hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(198,198,199,0.15)]"
                style={{ background: "linear-gradient(135deg, #c6c6c7, #939eb5)" }}
              >
                {t.nav.cta}
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-[#5a5a5a] hover:text-[#e5e5e5] transition-colors"
                aria-label="Open menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-72 transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ background: "#0e0e0e", borderLeft: "1px solid rgba(72,72,72,0.2)" }}
        >
          <div className="flex flex-col h-full p-6 pt-20 overflow-y-auto">
            {/* Link 1: Services */}
            <button
              onClick={() => handleNavClick("#servicios")}
              className={`text-left py-4 text-sm font-medium uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
                activeSection === "servicios" ? "text-[#00f0ff]" : "text-[#5a5a5a] hover:text-[#9e9e9e]"
              }`}
              style={{ borderBottom: "1px solid rgba(72,72,72,0.12)" }}
            >
              {t.nav.services}
            </button>

            {/* Mobile Solutions Accordion */}
            <div className="py-2" style={{ borderBottom: "1px solid rgba(72,72,72,0.12)" }}>
              <button
                onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                className="w-full flex items-center justify-between text-left py-2 text-sm font-medium uppercase tracking-widest text-[#5a5a5a] hover:text-[#e5e5e5] transition-colors"
              >
                <span>{nav.solutions ?? "Soluciones"}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${mobileSolutionsOpen ? "rotate-180 text-[#00f0ff]" : ""}`} />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  mobileSolutionsOpen ? "max-h-[300px] mt-2 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <div className="pl-4 flex flex-col gap-3 py-2">
                  {solutionsList.map(([key, label]) => (
                    <Link
                      key={key}
                      href={`/${lang}/soluciones/${key}`}
                      onClick={() => {
                        setMobileSolutionsOpen(false);
                        setMobileOpen(false);
                      }}
                      className="flex items-center text-xs font-semibold uppercase tracking-wider text-[#7c7c7c] hover:text-[#00f0ff] transition-all"
                    >
                      <span className="mr-2 text-base">
                        {key === "dentistas" ? "🦷" : key === "salud" ? "🏥" : key === "estetica" ? "✨" : key === "abogados" ? "⚖️" : "🎓"}
                      </span>
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Other Mobile Links */}
            {navLinks.slice(1).map((link, i) => {
              const isActive = activeSection === link.id;
              if (link.page) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-left py-4 text-sm font-medium uppercase tracking-widest transition-colors duration-200 ${
                      isActive ? "text-[#00f0ff]" : "text-[#5a5a5a] hover:text-[#9e9e9e]"
                    }`}
                    style={{ borderBottom: "1px solid rgba(72,72,72,0.12)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-left py-4 text-sm font-medium uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
                    isActive ? "text-[#00f0ff]" : "text-[#5a5a5a] hover:text-[#9e9e9e]"
                  }`}
                  style={{ borderBottom: "1px solid rgba(72,72,72,0.12)", animationDelay: `${(i + 1) * 0.05}s` }}
                >
                  {link.label}
                </button>
              );
            })}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center justify-center gap-2 px-6 py-3 rounded-full text-black font-semibold text-sm hover:scale-105 transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #c6c6c7, #939eb5)" }}
              onClick={() => setMobileOpen(false)}
            >
              {t.nav.cta}
            </a>
            {/* Language toggle mobile */}
            <button
              onClick={() => { toggle(); setMobileOpen(false); }}
              className="mt-4 flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono font-semibold"
              style={{ border: "1px solid rgba(0,240,255,0.3)", color: "#00f0ff", background: "rgba(0,240,255,0.05)" }}
            >
              {lang === "en" ? "Cambiar a Español" : lang === "es" ? "Mudar para Português" : "Switch to English"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
