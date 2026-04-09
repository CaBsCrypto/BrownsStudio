# Browns Studio — Prompt Maestro de Activación del Bot Charlie

## Contexto del proyecto

Soy el dueño de Browns Studio, una agencia web + IA en LATAM. Tenemos un bot de WhatsApp llamado **Charlie** completamente programado en Next.js pero que necesita conectarse a una base de datos y a las APIs externas. El código está en producción en Vercel (`https://brownsstudio.vercel.app`) y el repositorio es `https://github.com/CaBsCrypto/BrownsStudio`.

## Tu misión

Ayudarme a conectar la base de datos del bot. El código ya está escrito — solo faltan las credenciales y configuración.

## Estado actual del código

### Stack técnico
- **Frontend/Backend:** Next.js 14 (App Router) en Vercel
- **IA:** Google Gemini 2.0 Flash (`lib/ai/claude.ts`)
- **DB:** Firebase Firestore (`lib/db/`) — **PROBLEMA: no puedo crear la clave de servicio porque mi cuenta tiene restricciones de organización**
- **WhatsApp:** Meta Business Cloud API (`lib/whatsapp/`)
- **Admin panel:** `/admin` (ya funciona con ADMIN_PASSWORD y ADMIN_SECRET)

### Variables de entorno YA configuradas en Vercel
```
ADMIN_PASSWORD ✅
ADMIN_SECRET ✅
```

### Variables de entorno PENDIENTES (las necesito todas)
```
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
GEMINI_API_KEY
WHATSAPP_PHONE_NUMBER_ID
WHATSAPP_BUSINESS_ACCOUNT_ID
WHATSAPP_ACCESS_TOKEN
WHATSAPP_APP_SECRET
WHATSAPP_WEBHOOK_VERIFY_TOKEN=browns-studio-webhook-2026
CALENDLY_URL
HANDOFF_NOTIFICATION_PHONE
```

## El problema principal — Firebase

Intenté crear la clave de servicio de Firebase pero recibo:
> "La creación de claves de la cuenta de servicio está inhabilitada. Se aplicó una política de la organización: `iam.disableServiceAccountKeyCreation`"

Esto pasa tanto en mi cuenta de empresa como en mi cuenta personal de Gmail. Necesito una de estas soluciones:

### Opción A — Usar Supabase en vez de Firebase (MÁS FÁCIL)
El código original usaba Supabase. Si Firebase sigue bloqueado, revertir la DB a Supabase es la solución más rápida.

**Lo que necesitarías hacer:**
1. Revertir `lib/db/client.ts` para usar `@supabase/supabase-js`
2. Revertir `lib/db/conversations.ts`, `lib/db/leads.ts`, `lib/db/businesses.ts`
3. Revertir los admin API routes
4. Ejecutar el SQL schema en Supabase (está abajo)
5. Actualizar variables en Vercel

### Opción B — Solucionar Firebase sin key JSON
Usar Workload Identity Federation o Application Default Credentials para autenticar sin clave privada.

### Opción C — Crear nuevo proyecto Firebase en cuenta sin restricciones
Si podés crear un proyecto Firebase en una cuenta Gmail sin políticas de organización.

---

## Código actual de la capa DB (Firebase)

### `lib/db/client.ts`
```typescript
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let _db: Firestore | null = null;

export function getFirestoreClient(): Firestore {
  if (_db) return _db;
  const projectId   = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey  = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Missing Firebase env vars");
  }
  if (!getApps().length) {
    initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  }
  _db = getFirestore();
  return _db;
}
export const getSupabaseClient = getFirestoreClient;
```

---

## SQL Schema para Supabase (si se revierte a Supabase)

```sql
create table public.conversations (
  id              uuid primary key default uuid_generate_v4(),
  wa_phone        text not null,
  display_name    text,
  messages        jsonb not null default '[]',
  stage           text not null default 'greeting',
  business_id     uuid,
  last_message_at timestamptz default now(),
  created_at      timestamptz default now()
);

create table public.leads (
  id                uuid primary key default uuid_generate_v4(),
  conversation_id   uuid references public.conversations(id),
  wa_phone          text not null,
  business_id       uuid,
  full_name         text,
  business_type     text,
  budget_range      text,
  budget_numeric    int,
  urgency           text,
  service_interest  text[],
  pain_point        text,
  calendly_sent     boolean default false,
  package_discussed text,
  status            text default 'new',
  score             int,
  notes             text,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

create table public.businesses (
  id                  uuid primary key default uuid_generate_v4(),
  nombre              text not null,
  rubro               text,
  wa_phone_number_id  text not null unique,
  wa_access_token     text,
  gemini_api_key      text,
  is_active           boolean default true,
  plan                text default 'starter',
  created_at          timestamptz default now()
);

create table public.business_configs (
  id            uuid primary key default uuid_generate_v4(),
  business_id   uuid not null references public.businesses(id) on delete cascade,
  nombre_bot    text default 'Charlie',
  tono          text default 'profesional y cercano',
  horario       text default 'Lunes a Viernes 9am-6pm',
  calendly_url  text,
  handoff_phone text,
  servicios     jsonb default '[]',
  faqs          jsonb default '[]',
  reglas_extra  text,
  updated_at    timestamptz default now()
);

create index idx_conversations_wa_phone on public.conversations(wa_phone);
create index idx_leads_wa_phone on public.leads(wa_phone);
create index idx_businesses_wa_phone on public.businesses(wa_phone_number_id);
create index idx_conversations_business on public.conversations(business_id);
create index idx_leads_business on public.leads(business_id);
```

---

## Arquitectura del bot (para contexto)

```
WhatsApp mensaje entrante
  ↓
app/api/whatsapp/webhook/route.ts
  ↓ extrae phone_number_id → busca negocio en DB
lib/db/businesses.ts → getBusinessByPhoneId()
  ↓ si no encuentra → usa config fallback (Browns Studio)
lib/bot/handler.ts → processMessage()
  ↓
lib/ai/prompts.ts → buildSystemPrompt(stage, lead, businessConfig)
  ↓
lib/ai/claude.ts → generateReply() con Gemini 2.0 Flash
  ↓
lib/whatsapp/client.ts → sendTextMessage()
  ↓
WhatsApp respuesta al cliente
```

### Flujo de conversación
```
greeting → qualifying → scheduling → closing → [handoff]
```
- **greeting:** Charlie se presenta
- **qualifying:** extrae nombre, negocio, servicio, presupuesto (1 pregunta por mensaje)
- **scheduling:** si tiene datos suficientes, ofrece link Calendly
- **closing:** presenta precio y cierra
- **handoff:** si pide hablar con alguien o presupuesto > $5000 → notifica al dueño

---

## Archivos críticos del proyecto

```
app/api/whatsapp/webhook/route.ts  — webhook Meta (GET verify + POST messages)
lib/bot/handler.ts                 — orquestador principal
lib/ai/prompts.ts                  — system prompt dinámico de Charlie
lib/ai/claude.ts                   — cliente Gemini 2.0 Flash
lib/db/client.ts                   — cliente DB (Firebase/Supabase)
lib/db/conversations.ts            — CRUD conversaciones
lib/db/leads.ts                    — CRUD leads
lib/db/businesses.ts               — CRUD negocios + fallback config
lib/whatsapp/client.ts             — envío de mensajes Meta API
lib/whatsapp/verify.ts             — verificación firma HMAC-SHA256
middleware.ts                      — protección rutas /admin
app/admin/                         — panel de administración
```

---

## Verificación final

Una vez conectada la DB y configuradas todas las variables en Vercel:

1. Abrir `https://brownsstudio.vercel.app/admin` → login → panel carga sin errores
2. `GET https://brownsstudio.vercel.app/api/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=browns-studio-webhook-2026&hub.challenge=test123` → responde `test123`
3. (Con Meta configurado) Mandar "hola" al número del bot → Charlie responde en < 5 segundos
4. Verificar en DB que se creó la conversación y el lead

---

## Lo que ya funciona ✅
- Panel de admin `/admin` (login, lista negocios, crear negocio, editar config)
- Código del bot completo (webhook, handler, Gemini, prompts)
- Middleware de auth
- Deploy en Vercel automático desde GitHub

## Lo que falta ❌
- Conectar DB (Firebase bloqueado / Supabase pendiente)
- Variables de entorno: Gemini API key, Meta API credentials, DB credentials
- Registrar webhook en Meta (requiere número dedicado para WhatsApp)
