"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SITE_CONFIG, WHATSAPP_URL } from "@/lib/config";

const navLinks = [
  { label: "Servicios", href: "#servicios", id: "servicios" },
  { label: "Portfolio",  href: "#portfolio",  id: "portfolio"  },
  { label: "Proceso",   href: "#proceso",   id: "proceso"   },
  { label: "Precios",   href: "#precios",   id: "precios"   },
  { label: "FAQ",       href: "#faq",       id: "faq"       },
];

const allSectionIds = ["inicio", "sobre-mi", "servicios", "portfolio", "proceso", "precios", "testimonios", "faq", "contacto"];

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState("");

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

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group" aria-label={SITE_CONFIG.name}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #c6c6c7, #939eb5)" }}
              >
                <span className="text-black font-display font-bold text-sm leading-none">B</span>
              </div>
              <span className="font-display font-semibold text-lg tracking-wide text-[#e5e5e5] group-hover:text-[#c6c6c7] transition-colors duration-300">
                BROWNS{" "}
                <span className="text-gradient-gold">STUDIO</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
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
                        isActive ? "w-full bg-[#47c4ff]" : "w-0 group-hover:w-full bg-[#484848]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-black hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(198,198,199,0.15)]"
                style={{ background: "linear-gradient(135deg, #c6c6c7, #939eb5)" }}
              >
                Cotizar Proyecto
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-[#5a5a5a] hover:text-[#e5e5e5] transition-colors"
                aria-label="Abrir menú"
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
          <div className="flex flex-col h-full p-6 pt-20">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-left py-4 text-sm font-medium uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
                    isActive ? "text-[#47c4ff]" : "text-[#5a5a5a] hover:text-[#9e9e9e]"
                  }`}
                  style={{ borderBottom: "1px solid rgba(72,72,72,0.12)", animationDelay: `${i * 0.05}s` }}
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
              Cotizar Proyecto
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
