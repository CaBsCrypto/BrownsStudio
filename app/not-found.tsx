import Link from "next/link";
import { Home, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg-primary flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-60" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-gold/5 blur-3xl" />

      {/* Decorations */}
      <div className="absolute top-20 left-20 w-16 h-16 border border-accent-gold/15 rotate-45 animate-float opacity-30" />
      <div className="absolute bottom-20 right-20 w-10 h-10 border border-accent-gold/10 rotate-12 animate-float opacity-20" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 text-center max-w-lg">
        {/* 404 */}
        <p className="font-display font-bold text-8xl sm:text-9xl text-gradient-gold mb-2 leading-none select-none">
          404
        </p>

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-sm bg-gradient-gold flex items-center justify-center">
            <span className="text-bg-primary font-display font-bold text-xs">B</span>
          </div>
          <span className="font-display font-semibold text-base tracking-wide text-text-secondary">
            BROWNS <span className="text-gradient-gold">STUDIO</span>
          </span>
        </div>

        <h1 className="font-display font-bold text-2xl sm:text-3xl text-text-primary mb-3">
          Esta página no existe
        </h1>
        <p className="text-text-muted text-base mb-10 leading-relaxed">
          Parece que te perdiste en el camino. No te preocupes — llevaremos a tu negocio al lugar correcto.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent-gold text-bg-primary font-semibold text-sm hover:bg-accent-gold-light transition-all duration-300 shadow-gold hover:scale-105"
          >
            <Home size={15} />
            Volver al inicio
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-accent-gold/30 text-text-secondary font-semibold text-sm hover:text-accent-gold hover:border-accent-gold/60 transition-all duration-300"
          >
            <MessageCircle size={15} />
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
