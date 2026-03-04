import { Instagram, Linkedin, Youtube, Mail, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG, WHATSAPP_URL } from "@/lib/config";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Proceso", href: "#proceso" },
  { label: "Precios", href: "#precios" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: SITE_CONFIG.instagram },
  { icon: Linkedin, label: "LinkedIn", href: SITE_CONFIG.linkedin },
  { icon: Youtube, label: "YouTube", href: SITE_CONFIG.youtube },
];

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-sm bg-gradient-gold flex items-center justify-center shadow-gold">
                <span className="text-bg-primary font-display font-bold text-sm leading-none">B</span>
              </div>
              <span className="font-display font-semibold text-lg tracking-wide text-text-primary">
                BROWNS <span className="text-gradient-gold">STUDIO</span>
              </span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-xs">
              {SITE_CONFIG.description}
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-text-muted hover:text-accent-gold hover:border-accent-gold/30 transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-text-primary font-semibold text-sm mb-4 tracking-wide">
              Navegación
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-text-muted text-sm hover:text-accent-gold transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-text-primary font-semibold text-sm mb-4 tracking-wide">
              Contacto
            </h4>
            <div className="space-y-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-muted text-sm hover:text-accent-gold transition-colors duration-200 group"
              >
                <span>WhatsApp</span>
                <ArrowUpRight
                  size={12}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2 text-text-muted text-sm hover:text-accent-gold transition-colors duration-200 group"
              >
                <Mail size={13} />
                <span>{SITE_CONFIG.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            © 2026 {SITE_CONFIG.name} — Todos los derechos reservados.
          </p>
          <p className="text-text-muted text-xs">
            Hecho con ❤️ para negocios locales de Latinoamérica
          </p>
        </div>
      </div>
    </footer>
  );
}
