# Browns Studio — Agent Handbook

Instrucciones para cualquier agente (Claude Code u otro) que tome este repo.
Leer esto **antes** de editar código.

---

## 1. ¿Qué es?

Landing + admin backend para **Browns Studio**, agencia de desarrollo web + IA
(bots WhatsApp, automatizaciones, training Google AI Studio). Cierre por
WhatsApp + Calendly. Sitio en producción: **https://browns.studio**.

---

## 2. Stack

- **Next.js 16** (App Router, Turbopack) — SSG + middleware
- **TypeScript** strict
- **Tailwind CSS** + CSS variables custom en `app/globals.css`
- **Firebase / Firestore** — businesses, conversations, leads (admin panel)
- **Gemini API** (`gemini-2.0-flash`) — bot LLM
- **WhatsApp Cloud API** (Meta) — canal del bot
- **Vercel** — hosting + env vars + CI/CD (push to `main` → deploy)
- **lucide-react** — íconos
- Fuentes: `var(--font-display)`, `var(--font-jet-brains-mono)`

---

## 3. Estructura del repo

```
app/
  [locale]/          SSG page pre-renderizada en /es, /en, /pt
    page.tsx         Landing — compone los 10 componentes
    layout.tsx       Metadata + hreflang alternates
  admin/             Panel privado (login + businesses CRUD)
  api/
    admin/           Auth + CRUD (Firestore)
    whatsapp/webhook Entrada de mensajes + verificación
  proyecto/[slug]/   Páginas de caso de estudio (SSG)
  globals.css        Keyframes + utilidades globales
  page.tsx           Raíz — redirige a /{locale} (pero middleware lo hace antes)
  not-found.tsx

components/          Todos los del landing (Hero, Portfolio, AIShowcase...)
  BrownsOS*.tsx      Orb 3D scroll-driven (desktop + mobile)

lib/
  i18n/
    translations.ts  ÚNICA fuente de copy — 3 locales (en/es/pt)
    LanguageContext  Lee lang del pathname, ciclo ES→EN→PT
  config.ts          SITE_CONFIG, WHATSAPP_URL
  db/                Firestore client + queries
  ai/claude.ts       Wrapper Gemini (nombre "claude" es legado, NO es Anthropic)
  bot/               Lógica conversacional del bot
  whatsapp/          Cliente + verificación firmas Meta

middleware.ts        Detecta Accept-Language → redirect a /es|/en|/pt
                     + protege /admin/* con cookie ADMIN_SECRET
data/                JSON estático de proyectos
public/              Assets estáticos
scripts/             Utilidades one-off (seed Firestore, etc.)
```

---

## 4. i18n — CRÍTICO

**3 locales**: `es` (default + LATAM), `en` (EU/US/Asia), `pt` (Brasil).

- Detección automática en `middleware.ts` vía `Accept-Language`.
- URLs: `/es`, `/en`, `/pt` (todas SSG vía `generateStaticParams`).
- **Todo el copy vive en `lib/i18n/translations.ts`** — nunca hardcodear
  strings en componentes. Si agregas una key, agrégala en los 3 idiomas.
- `useLang()` devuelve `{ lang, t, toggle }`. `t` es el objeto del idioma actual.
- Cambiar idioma: `toggle()` navega a `/<next>` (ciclo ES→EN→PT).
- SEO: `layout.tsx` emite hreflang alternates + `x-default`.

---

## 5. Flujo de la landing

Orden fijo en `app/[locale]/page.tsx`:

```
BrownsOSLoader → Navbar → Hero → Portfolio → AIShowcase → SobreMi
→ Pricing → Proceso → FAQ → CTA → Footer → WhatsAppButton
```

Filosofía del contenido: **portafolio directo → cierre**. No duplicar info
entre secciones. AIShowcase muestra capacidades (no precios), Pricing cierra.

### CTAs — jerarquía

- Hero, Pricing, SobreMi, CTA, WhatsAppButton, mobile menu, Navbar → WhatsApp
- **AIShowcase → scroll a `#precios`** (no WhatsApp, para no fragmentar).
- Total: 7 CTAs de WhatsApp con embudo claro.

---

## 6. Cómo correr

```bash
npm install
cp .env.example .env.local   # rellenar valores (ver sección 7)
npm run dev                   # localhost:3000 → redirige a /es por defecto
npm run build                 # verifica los 3 locales SSG
npm run start                 # producción local
npm run lint
```

Para testear otro idioma en dev: ir manualmente a `/en` o `/pt`,
o cambiar el `Accept-Language` del browser.

---

## 7. Variables de entorno

**Todas las reales viven en Vercel** (Settings → Environment Variables).
Para dev local copiar `.env.example` a `.env.local` y pedir los valores.

Categorías:
- **Admin**: `ADMIN_PASSWORD`, `ADMIN_SECRET`
- **Firebase**: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`
- **Gemini**: `GEMINI_API_KEY`, `GEMINI_MODEL` (default `gemini-2.0-flash`)
- **WhatsApp**: `WHATSAPP_WEBHOOK_VERIFY_TOKEN`, `WHATSAPP_APP_SECRET`,
  `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_ACCESS_TOKEN`, `HANDOFF_NOTIFICATION_PHONE`
- **Calendly**: `CALENDLY_URL`

---

## 8. Deploy

- **Automático**: `git push origin main` → Vercel despliega.
- Branch protection: commits directos a `main` permitidos (repo pequeño).
- Antes de pushear cambios grandes: correr `npm run build` local y verificar
  que los 3 locales (`/es`, `/en`, `/pt`) compilan sin warnings.

---

## 9. Convenciones

- **Estilos**: mix de Tailwind + `style={{...}}` inline para animaciones y
  gradientes custom. Es intencional — mantener consistencia.
- **Animaciones**: `@keyframes` en `app/globals.css`, aplicar vía `style`
  o clases `reveal` + `reveal-delay-N`.
- **IntersectionObserver** se usa en casi todos los componentes para
  fade-in on scroll. Copiar el patrón existente (`visible` state).
- **Paleta**: fondos `#040a16 / #050a18 / #0e0e0e / #191919`, acento
  cyan `#00f0ff / #47c4ff`, gris claro `#e5e5e5 / #9e9e9e`.
- Íconos de `lucide-react`, nunca importar SVGs inline salvo casos puntuales.
- No crear archivos `.md` nuevos salvo que el usuario lo pida.

---

## 10. Qué NO tocar sin pedir permiso

- `middleware.ts` — routing de locales + protección admin.
- `app/[locale]/layout.tsx` — hreflang SEO.
- `lib/db/` y `lib/whatsapp/verify.ts` — integraciones productivas.
- Estructura de `translations.ts` — romperla crashea el build en los 3 idiomas.
- `components/BrownsOS*.tsx` — orb scroll-driven ya calibrado por el user.

---

## 11. Contacto / owner

- GitHub: **CaBsCrypto/BrownsStudio**
- Dueño: Cabs (Browns Studio / Umbra, Chile)
- Default locale: **es** (LATAM-first)
