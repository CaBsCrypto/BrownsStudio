# Hoja de Ruta — Formación en Desarrollo de Software & IA

> **Duración:** 4 semanas (12 horas) · **Modalidad:** Online en vivo y práctico
> **Audiencia:** Desarrolladores y perfiles técnicos que quieren construir productos con IA.
> **Prerrequisitos:** Programación básica (JavaScript/TypeScript recomendado) y manejo de terminal.
> **Certificación:** Browns Studio Verified Certification (al completar el proyecto final).

## Objetivo general

Aprender a construir agentes complejos, conectar APIs de LLMs, gestionar bases
de datos vectoriales e implementar flujos de WhatsApp de extremo a extremo,
terminando con un bot real desplegado en producción.

## Resultados de aprendizaje

Al terminar la formación el participante podrá:

- Integrar APIs de LLMs (Gemini / OpenAI) entendiendo tokens, contexto y costos.
- Diseñar agentes con tool calling, memoria y guardrails.
- Construir un pipeline RAG con embeddings y base de datos vectorial.
- Conectar el agente a WhatsApp Cloud API (con flujos visuales en Kapso) y desplegarlo.

**Estructura semanal:** 2 sesiones en vivo de 1,5 h (3 h/semana) + práctica guiada.

---

## Semana 1 — Fundamentos de LLMs y primera integración

**Meta de la semana:** aplicación que conversa con un LLM con comportamiento controlado.

### Sesión 1 (1,5 h) — Cómo funcionan los LLMs en producción
- Modelos, tokens, ventana de contexto, temperatura y costos.
- Panorama de APIs: Gemini (`gemini-2.0-flash`) y OpenAI — cuándo usar cada una.
- Setup del entorno: API keys, variables de entorno, primer "hola mundo".

### Sesión 2 (1,5 h) — Integración controlada
- System prompts y roles: darle personalidad y límites al modelo.
- Manejo de respuestas, errores, timeouts y rate limits.
- Taller: chat con system prompt propio y memoria de conversación básica.

**Entregable semana 1:** app/script conversacional con system prompt y control de errores.

---

## Semana 2 — Agentes y herramientas

**Meta de la semana:** agente capaz de ejecutar acciones reales.

### Sesión 3 (1,5 h) — Diseño de agentes
- Qué es un agente: loop de razonamiento + acción.
- Tool calling / function calling: definir herramientas y esquemas.
- Memoria de corto y largo plazo.

### Sesión 4 (1,5 h) — Agentes robustos
- Agentes multi-paso: planificación y encadenamiento de herramientas.
- Guardrails: validación de entradas/salidas, manejo de alucinaciones.
- Taller: agente con al menos 2 herramientas (ej: buscar + calcular + responder).

**Entregable semana 2:** agente con 2+ herramientas funcionando.

---

## Semana 3 — Datos, embeddings y RAG

**Meta de la semana:** agente que responde con conocimiento propio (documentos del participante).

### Sesión 5 (1,5 h) — Embeddings y bases de datos vectoriales
- Qué son los embeddings y la búsqueda semántica.
- Chunking: cómo dividir documentos sin perder contexto.
- Opciones de vector DB y criterios de elección.

### Sesión 6 (1,5 h) — RAG de extremo a extremo
- Ingesta de documentos → embeddings → almacenamiento.
- Retrieval: recuperar el contexto correcto y pasarlo al LLM.
- Respuestas con citas/fuentes y evaluación de calidad.
- Taller: mini-RAG sobre documentos propios (manuales, FAQs, catálogo).

**Entregable semana 3:** pipeline RAG respondiendo sobre documentos reales.

---

## Semana 4 — WhatsApp y despliegue a producción

**Meta de la semana:** bot de WhatsApp en producción con agente + RAG.

### Sesión 7 (1,5 h) — WhatsApp Cloud API y Kapso
- WhatsApp Cloud API (Meta): números, webhooks, verificación de firmas.
- Envío y recepción de mensajes, plantillas y estados.
- Flujos visuales con Kapso: triggers, lógica conversacional, handoff a humano.

### Sesión 8 (1,5 h) — Proyecto final en vivo
- Integración completa: WhatsApp → agente → RAG → respuesta.
- Despliegue (Vercel) y variables de entorno en producción.
- Monitoreo, límites y próximos pasos (métricas, mejoras).
- Demo final: cada participante presenta su bot funcionando.

**Proyecto final:** bot de WhatsApp desplegado en producción que responde con
un agente conectado a una base de conocimiento propia, con derivación a humano.

---

## Herramientas de la formación

- Gemini API / OpenAI API
- Base de datos vectorial (embeddings + búsqueda semántica)
- WhatsApp Cloud API (Meta) + Kapso (flujos visuales)
- TypeScript / Next.js · Vercel (deploy)

## Evaluación y certificación

El certificado se emite al demostrar en vivo el proyecto final: bot de WhatsApp
en producción respondiendo con conocimiento propio y flujo de handoff humano.
