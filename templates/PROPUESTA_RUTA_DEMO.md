# Propuesta Estratégica y Técnica: Embudo Hiper-Personalizado en `/demo`

Para que el video de prospección sea 100% efectivo, la URL `browns.studio/demo` (o una URL dinámica como `browns.studio/demo?c=dental-pro` / `browns.studio/demo/dental-pro`) debe continuar la misma narrativa del video, pero llevándola a una experiencia **interactiva y real**.

Aquí tienes el blueprint de cómo deberíamos estructurar esta ruta técnica y visualmente para lograr la máxima tasa de conversión.

---

## 1. El Concepto Core: Experiencia Web Dinámica (Dynamic Personalization)

En lugar de mostrar una landing page genérica de demostración, la página `/demo` debe leer el ID del cliente de la URL (Query Param o Ruta Dinámica) y **personalizar todo el copy, colores, logo y bot de la landing** en tiempo real.

```
Prospecto recibe video de "Clínica Dentalia" ➔ Clic en browns.studio/demo?c=dental-pro
➔ Landing se tiñe de color dental, muestra el logo de Dentalia y dice:
"Hola! Diseñamos este Agente de Ventas IA a medida para Clínica Dentalia. Pruébalo abajo 👇"
```

---

## 2. Estructura Visual de la Página `/demo` (Sección por Sección)

Para mantener el diseño ultra-premium de Browns Studio (fondos oscuros, bordes de neón y cristal templado), la landing de demo debe contar con 4 secciones clave:

### Sección A: El Hero Personalizado de Bienvenida (Wow Effect)
* **Visual**: El **Orbe 3D de Browns OS** flotando a la izquierda en tamaño grande. A la derecha, un saludo que demuestre que el trabajo ya está hecho para ellos.
* **Copy**: 
  > *"Hola equipo de **[Nombre Empresa]**, diseñamos y entrenamos este Agente IA exclusivo para su negocio en base a su propuesta de valor. Pruébenlo en vivo a continuación."*

### Sección B: El Simulador de WhatsApp Interactivo (El "Playground")
* **Visual**: Un mockup interactivo premium en la web que emula un teléfono celular con la interfaz oscura de WhatsApp.
* **Interactividad**: Un chat real donde el cliente puede escribir mensajes libres y el bot de Browns Studio (conectado a una llamada rápida de Gemini en Next.js con un System Prompt pre-cargado de su empresa) le responde de inmediato.
* **Detalle Premium**: Mientras el bot procesa la respuesta, muestra el estado `Escribiendo...` en el header del teléfono móvil y los tres puntos rebotando (igual que en tu video).

### Sección C: El Dashboard de Integraciones en Acción (Veracidad de Ingeniería)
* **Visual**: Abajo del celular simulador, un panel interactivo que muestra las integraciones que ocurren "detrás de escena".
* **Cómo funciona**: Cuando el cliente interactúa con el simulador de WhatsApp de la **Sección B** y el bot califica el lead ficticio, se enciende una luz en este dashboard simulando las APIs de:
  - **HubSpot CRM**: Aparece una tarjeta de contacto llenándose con los datos que el usuario escribió en el chat.
  - **Calendly**: Muestra una alerta verde: *"Espacio reservado en agenda"*.
  - **Slack/WhatsApp**: Una simulación de notificación push que te avisa a ti como dueño: *"Nuevo lead ultra-calificado de Clínica Dentalia listo para cierre"*.

### Sección D: CTAs de Cierre Directo (El Embudo)
* **Vía A: La Auditoría de Procesos de 45 min** (Recomendado): Embeber directamente el widget de Calendly de Cristian con un estilo dark-mode integrado al fondo.
* **Vía B: Propuesta Express Asíncrona**: Un formulario corto (o un botón flotante de WhatsApp directo a tu chat) por si prefieren que les envíes la cotización técnica formal en formato PDF en menos de 24 horas.

---

## 3. Arquitectura e Implementación en Next.js (Paso a Paso)

Dado que ya cuentas con Firebase Firestore y un wrapper de Gemini API configurado en `lib/ai/claude.ts` (wrapper de Gemini), la implementación técnica en tu stack es sumamente sencilla:

### A. Estructura de Carpetas en Next.js (App Router)
Creamos una ruta dinámica para soportar URLs limpias como `browns.studio/demo/dental-pro`:

```
app/
  [locale]/
    demo/
      [slug]/
        page.tsx      <-- Página de demostración personalizada para el slug
```

### B. Carga de Datos desde Firestore (Backend)
En el servidor de Next.js (`page.tsx`), leemos el `slug` del prospecto y cargamos sus datos específicos que guardaremos en la colección `leads` o `businesses` en Firestore:

```typescript
// app/[locale]/demo/[slug]/page.tsx
import { getDb } from "@/lib/db/firestore";
import { notFound } from "next/navigation";

interface DemoPageProps {
  params: { slug: string; locale: string };
}

export default async function DemoPage({ params }: DemoPageProps) {
  const db = getDb();
  const leadDoc = await db.collection("leads").doc(params.slug).get();
  
  if (!leadDoc.exists) {
    // Si no existe, redirigir a una demo genérica de Browns Studio
    return notFound();
  }
  
  const leadData = leadDoc.data();
  
  return (
    <main className="min-h-screen bg-[#040a16] text-white">
      {/* Componentes de la Landing pasándole leadData */}
      <DemoHero businessName={leadData.businessName} />
      <WhatsAppPlayground 
        businessName={leadData.businessName} 
        botName={leadData.botName}
        systemPrompt={leadData.systemPrompt} // prompt entrenado del cliente
      />
      <IntegrationDashboard actions={leadData.actions} />
      <ClosingSection />
    </main>
  );
}
```

### C. El Chatbot Interactivo en la Web (Playground Endpoint)
Crearemos una API endpoint ligera en Next.js (`api/demo/chat`) que tome el mensaje del usuario de la web y el `systemPrompt` del prospecto, y llame a la API de Gemini para simular el Agente IA de manera instantánea:

```typescript
// app/api/demo/chat/route.ts
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/generative-ai"; // o tu wrapper existente en lib/ai

export async function POST(req: Request) {
  const { message, systemPrompt, chatHistory } = await req.json();
  
  // Inicializar Gemini con el System Prompt específico del prospecto
  const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: systemPrompt, // Instrucciones del bot específicas de su clínica/inmobiliaria
  });
  
  // Realizar la llamada
  const result = await model.generateContent(message);
  const reply = result.response.text();
  
  return NextResponse.json({ reply });
}
```

---

## 4. Plan de Acción y Siguientes Pasos

1. **Crear la Colección `leads` en Firestore**:
   Puedes usar un script similar a tus scripts one-off existentes en `scripts/` para alimentar la base de datos de Firestore con los mismos registros de `leads.json` (Dentalia, Andes Propiedades, etc.) agregando un campo `systemPrompt` (las reglas que debe seguir el bot del playground).
2. **Desarrollar la UI del Playground**:
   Puedes migrar y enriquecer los estilos de tu componente `components/RemotionVideo.tsx` convirtiéndolo en un componente interactivo de React (`useState` para capturar inputs, llamadas `fetch` a `/api/demo/chat`, animando burbujas con Framer Motion o transiciones de Tailwind).
3. **Pushear cambios a Vercel**:
   Haces `git push origin main` y el deploy automático de Vercel levantará el embudo de demostración para tus clientes de forma instantánea.

> [!TIP]
> **Ventaja Competitiva**: Cuando le envíes el video a tu cliente por WhatsApp, no solo verá un video genérico; al hacer clic en su enlace único, entrará a un portal web diseñado **exclusivamente para él**. Esto genera un sentido de personalización y profesionalismo que ninguna otra agencia de automatización en LATAM ofrece.
