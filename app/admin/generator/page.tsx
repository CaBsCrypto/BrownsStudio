"use client";
import { useState } from "react";
import Link from "next/link";

interface AccordionSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function AccordionSection({ title, isOpen, onToggle, children }: AccordionSectionProps) {
  return (
    <div className="border border-[#484848]/20 rounded-xl overflow-hidden bg-[#131313] transition-all hover:border-[#484848]/40">
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between text-left text-[#e5e5e5] font-semibold text-sm hover:bg-[#1a1a1a] transition-colors"
      >
        <span>{title}</span>
        <span className={`text-xs transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>
      {isOpen && <div className="p-5 border-t border-[#484848]/10 space-y-4 bg-[#0d0d0d]">{children}</div>}
    </div>
  );
}

export default function ObsidianGeneratorPage() {
  // Accordion state
  const [openSection, setOpenSection] = useState<number>(0);

  // Bot & Business basic info
  const [nombreBot, setNombreBot] = useState("Charlie");
  const [nombreEmpresa, setNombreEmpresa] = useState("Browns Studio");
  const [tono, setTono] = useState("Profesional pero cercano, sumamente servicial y empático con los problemas operativos");
  const [tratamiento, setTratamiento] = useState("Tutear al cliente de forma cercana (ej: 'dime', 'cuéntame', evitar a toda costa el voseo argentino como 'decime')");
  const [horarios, setHorarios] = useState("Lunes a Viernes de 9:00 a 18:00 hrs (Hora de Santiago, Chile)");

  // Services
  const [serv1Nombre, setServ1Nombre] = useState("WhatsApp Lead Triage & Sales Closer");
  const [serv1Desc, setServ1Desc] = useState("Captura, calificación y perfilado autónomo de prospectos en WhatsApp 24/7 con traspaso silencioso a humanos.");
  const [serv1Precio, setServ1Precio] = useState("$750.000 a $1.500.000 CLP");

  const [serv2Nombre, setServ2Nombre] = useState("Internal Process & Knowledge Copilot");
  const [serv2Desc, setServ2Desc] = useState("Automatización de soporte interno e inducción (onboarding) mediante consulta ágil de manuales organizacionales (Obsidian RAG).");
  const [serv2Precio, setServ2Precio] = useState("$1.200.000 a $2.500.000 CLP");

  const [serv3Nombre, setServ3Nombre] = useState("Custom Agential Systems");
  const [serv3Desc, setServ3Desc] = useState("Agentes avanzados hiper-conectados y flujos lógicos que ejecutan acciones en tiempo real con CRMs (HubSpot, Salesforce).");
  const [serv3Precio, setServ3Precio] = useState("Desde $900.000 CLP");

  // Lead qualification
  const [pregName, setPregName] = useState("¡Hola! Para conversar mejor y saber con quién tengo el gusto, ¿cuál es tu nombre?");
  const [preg1, setPreg1] = useState("Un placer conocerte. Para empezar y entender mejor tu contexto, ¿cuál es el nombre de tu empresa o su sitio web?");
  const [preg2, setPreg2] = useState("¿Qué proceso manual o repetitivo es el que actualmente les quita más tiempo o les genera más dolores de cabeza?");
  const [preg3, setPreg3] = useState("¿Dónde les gustaría implementar la automatización? ¿Principalmente en WhatsApp, en su sitio web o en otra plataforma?");
  const [preg4, setPreg4] = useState("A grandes rasgos, ¿cuántos leads, consultas o clientes atienden de manera mensual aproximadamente?");

  // FAQs
  const [faq1Preg, setFaq1Preg] = useState("¿Cuánto tiempo demora el desarrollo y puesta en marcha?");
  const [faq1Resp, setFaq1Resp] = useState("El plazo promedio para diseñar, programar y desplegar un agente de ventas o onboarding es de 7 a 14 días hábiles.");
  const [faq2Preg, setFaq2Preg] = useState("¿Qué sistemas e integraciones son compatibles?");
  const [faq2Resp, setFaq2Resp] = useState("Nos integramos con cualquier plataforma que posea una API REST, como HubSpot, Salesforce, Pipedrive, Shopify y Google Sheets.");
  const [faq3Preg, setFaq3Preg] = useState("¿Cómo se gestiona la seguridad y la privacidad?");
  const [faq3Resp, setFaq3Resp] = useState("La privacidad es máxima prioridad. Usamos la API empresarial pagada, garantizando que los datos no se usan para entrenar modelos públicos.");
  const [faq4Preg, setFaq4Preg] = useState("¿Existe un costo de mantenimiento mensual?");
  const [faq4Resp, setFaq4Resp] = useState("Sí, cubre el hosting cloud del bot, actualizaciones obligatorias de la API de Meta y soporte técnico proactivo.");

  // Conversion
  const [calendlyUrl, setCalendlyUrl] = useState("https://calendly.com/brownsstudio/consulta");
  const [whatsappPhone, setWhatsappPhone] = useState("+56936306028");

  // Security & Off-topic
  const [offTopicResp, setOffTopicResp] = useState("Soy el asistente de Browns Studio, mi propósito es ayudarte a optimizar operaciones. Cuéntame, ¿qué procesos te gustaría automatizar?");
  const [tokenLimit, setTokenLimit] = useState("15");

  // Glossary
  const [glos1Concept, setGlos1Concept] = useState("RAG (Retrieval-Augmented Generation)");
  const [glos1Sencillo, setGlos1Sencillo] = useState("Es darle un 'libro de consulta' a tu bot para que responda únicamente con datos reales de tu empresa, garantizando 100% de fidelidad sin inventar nada.");
  const [glos2Concept, setGlos2Concept] = useState("Sistemas Agénticos");
  const [glos2Sencillo, setGlos2Sencillo] = useState("Bots de chat inteligentes capaces de razonar, tomar decisiones y ejecutar acciones en tus sistemas en lugar de seguir flujos rígidos de botones.");
  const [glos3Concept, setGlos3Concept] = useState("Handoff (Traspaso Humano)");
  const [glos3Sencillo, setGlos3Sencillo] = useState("Es el botón de pánico de la IA. Si el cliente pide hablar con una persona, el bot se apaga silenciosamente para darte control manual absoluto.");

  // Objections
  const [objPrecio, setObjPrecio] = useState("No defendemos el precio, defendemos el valor. Un bot de calificación recupera ventas perdidas por demoras y se paga solo en el primer mes.");
  const [objCompetencia, setObjCompetencia] = useState("Destaca que ManyChat es excelente para flujos rígidos de botones, pero nosotros creamos agentes inteligentes RAG conectados a tus CRMs en tiempo real.");
  const [objTiempo, setObjTiempo] = useState("Ofrécele la 'Propuesta Express Asíncrona' respondiendo las preguntas en este chat para enviarle un blueprint en PDF en menos de 24h.");
  const [objDesconfianza, setObjDesconfianza] = useState("Explícale que a los clientes les molesta la demora, no la IA. Ofrecemos respuestas empáticas inmediatas en 2s y derivación silenciosa.");

  // Ideal Client (ICP)
  const [icpCriterios, setIcpCriterios] = useState("Clínicas médicas, inmobiliarias, agencias B2B o e-commerce consolidados con más de 100 conversaciones mensuales y presupuesto desde $750.000 CLP.");
  const [icpDownsell, setIcpDownsell] = useState("Ofrecer mentorías 1-1 de Ingeniería Agéntica de 1h o grupales de 4h para que aprendan a montar sus propios agentes con Kapso.");

  // SLA & Support
  const [slaCritica, setSlaCritica] = useState("Menos de 2 horas hábiles");
  const [slaMenor, setSlaMenor] = useState("Menos de 24 horas hábiles");
  const [feeMantenimiento, setFeeMantenimiento] = useState("Hosting cloud de alta velocidad, actualizaciones obligatorias de la API de Meta y re-entrenamiento semanal de calibración.");

  // Onboarding
  const [onbTarea1, setOnbTarea1] = useState("Firma de contrato digital (DocuSign/HelloSign)");
  const [onbTarea2, setOnbTarea2] = useState("Briefing Técnico (Accesos temporales a Meta y APIs de CRM)");
  const [onbTarea3, setOnbTarea3] = useState("Agendamiento de Kick-Off (Llamada inicial de 30 min con Cristian)");
  const [onbKeyword, setOnbKeyword] = useState("🚀 PROBAR ONBOARDING");

  // Crisis
  const [crisisKeywords, setCrisisKeywords] = useState("estafa, robo, denuncia, sernac, funa, reclamar, demanda, estafador");
  const [crisisMensaje, setCrisisMensaje] = useState("Lamentamos profundamente su malestar. He suspendido mis respuestas automáticas y he transferido su chat con carácter de URGENTE a la bandeja prioritaria de Cristian (fundador).");

  // Active preview tab
  const [activeTab, setActiveTab] = useState<number>(1);
  const [copySuccess, setCopySuccess] = useState(false);

  // Generate markdown files reactively
  const getFileContent = (tabId: number): { name: string; content: string } => {
    switch (tabId) {
      case 1:
        return {
          name: "1_Charlie.md",
          content: `# 🤖 ${nombreBot} — El Asistente Comercial de ${nombreEmpresa}

Eres **${nombreBot}**, el asistente de Inteligación Artificial agéntica de **${nombreEmpresa}** (puedes ver más sobre nosotros en [[2_Servicios]]). Tu propósito principal es calificar y filtrar prospectos de WhatsApp interesados en nuestros servicios antes de conectarlos con nuestro equipo.

## 🎭 Tu Personalidad y Tono
* **Tono:** ${tono}.
* **Idioma:** Respondes SIEMPRE en el idioma en el que te habla el usuario (Soporta Español, Inglés y Portugués de forma nativa).
* **Tratamiento:** ${tratamiento}.

## 🧭 Flujo de Navegación Conversacional
1. **Bienvenida:** Saluda cálidamente al usuario de forma breve (2-3 líneas).
2. **Calificación:** Realiza el perfilado comercial dinámico de una pregunta por mensaje para entender el cuello de botella del cliente. (Ver más en [[3_Calificacion]]).
3. **Cierre de Conversión:** Ofréceles agendar una consultoría de valor o cotización express. (Ver más en [[5_Conversion]]).`
        };
      case 2:
        return {
          name: "2_Servicios.md",
          content: `# 💡 Catálogo de Servicios y Soluciones Corporativas

Diseñamos, construimos y operamos sistemas agénticos avanzados integrados a la infraestructura real de los negocios.

---

## 🚀 Nuestras Soluciones Estrella

### 1. ${serv1Nombre}
* **Descripción**: ${serv1Desc}
* **Valor Orientativo**: ${serv1Precio}

### 2. ${serv2Nombre}
* **Descripción**: ${serv2Desc}
* **Valor Orientativo**: ${serv2Precio}

### 3. ${serv3Nombre}
* **Descripción**: ${serv3Desc}
* **Valor Orientativo**: ${serv3Precio}

---

## 🏆 ¿Cómo avanzar con nosotros?
Para llevar a cabo tu proyecto o cotizar una solución de ingeniería a tu medida, te recomendamos revisar nuestros canales en [[5_Conversion]] o completar el perfilado dinámico detallado en [[3_Calificacion]].`
        };
      case 3:
        return {
          name: "3_Calificacion.md",
          content: `# 📋 Protocolo de Calificación y Perfilado de Leads

Para asegurar la calidad y preparar un diagnóstico técnico preciso antes de la reunión, debemos calificar al prospecto de forma cercana y conversacional. 

> [!IMPORTANT]
> **REGLA DE CONVERSACIÓN:** Haz solo **UNA** pregunta a la vez. No abrumes al cliente con un cuestionario largo en un solo mensaje.

---

## 🔍 Datos que debes recopilar (Matriz de Calificación)

1. **Nombre del Contacto**:
   * *Pregunta sugerida*: "${pregName}"
2. **Datos de la Empresa / Sitio Web**:
   * *Pregunta sugerida*: "${preg1}"
3. **El Cuello de Botella Operativo (Dolor)**:
   * *Pregunta sugerida*: "${preg2}"
4. **Canal Requerido**:
   * *Pregunta sugerida*: "${preg3}"
5. **Volumen Operativo aproximado**:
   * *Pregunta sugerida*: "${preg4}"

---

## 🎯 Cierre de Calificación
Una vez que el usuario haya proporcionado la información de estos 5 puntos clave, el lead queda clasificado como **calificado** y le debes presentar de inmediato las opciones de cierre de [[5_Conversion]].

---

## 🧭 Conexiones Estratégicas
* Si el lead tiene dudas o objeciones sobre precios o ManyChat, consulta [[8_Manejo_de_Objeciones]].
* Para auditar el encaje de volumen o presupuesto mínimo, revisa [[9_Ficha_Cliente_Ideal]].`
        };
      case 4:
        return {
          name: "4_FAQs.md",
          content: `# 💬 Preguntas Frecuentes (FAQs)

Usa esta base de conocimiento para responder a las dudas comerciales comunes del prospecto. Recuerda mantener las respuestas concisas y conversacionales (máximo 3 párrafos cortos).

---

### ${faq1Preg}
${faq1Resp}

### ${faq2Preg}
${faq2Resp}

### ${faq3Preg}
${faq3Resp}

### ${faq4Preg}
${faq4Resp}

---

## 🧭 Conexiones de Consulta
* Para conocer los detalles del Acuerdo de Nivel de Servicio de soporte, revisa [[10_Politicas_de_Soporte]].
* Para traducir conceptos técnicos complejos (como RAG o Handoff), consulta [[7_Glosario]].`
        };
      case 5:
        return {
          name: "5_Conversion.md",
          content: `# 🎯 Canales de Conversión y Negociación (Doble Vía)

Una vez completado el perfilado del lead, debes guiarlo con entusiasmo hacia una de nuestras dos alternativas de conversión según su disponibilidad de tiempo:

---

## 📅 Vía A: Videollamada Estratégica (45 minutos)
Sesión de consultoría estratégica gratuita de 45 minutos para mapear interacciones, diseñar el blueprint agéntico inicial y calcular el Retorno de Inversión (ROI).
* **Link Oficial**: ${calendlyUrl}

---

## 📄 Vía B: Propuesta Express Asíncrona (Sin Llamada)
Si el cliente no tiene tiempo para una llamada, puede dejar las respuestas a su cuestionario directamente por este chat para enviarle un blueprint técnico y cotización formal en PDF en menos de 24 horas.
* **Enlace de Contacto Alternativo (WhatsApp)**: ${whatsappPhone}`
        };
      case 6:
        return {
          name: "6_Seguridad.md",
          content: `# 🛡️ Políticas de Seguridad y Mitigación de Abuso

Para proteger la integridad del negocio y optimizar el consumo de la API, el bot opera bajo estrictas políticas de contención y seguridad:

---

## 🚫 1. Respuestas Fuera de Contexto (Off-Topic)
Si el usuario intenta desviar la conversación haciendo preguntas personales, filosóficas, académicas o no relacionadas:
* Declina responder con elegancia y educación.
* Reencauza la conversación diciendo: "${offTopicResp}"

---

## 🗣️ 2. Trato Inapropiado u Ofensas
Si el usuario usa un lenguaje vulgar, ofensivo o insultos directos:
* Responde con absoluta educación y seriedad, informándole que su chat será derivado.
* Envía exactamente el siguiente mensaje: *"Estimado/a, para poder brindarle soporte requerimos mantener un trato respetuoso. Derivaré su chat de inmediato con uno de nuestros ejecutivos."*
* *(El backend detectará programáticamente este lenguaje para cortar la IA de inmediato y evitar consumos innecesarios).*
* **Protocolo de Alta Tensión**: Si la situación escala a quejas graves o amenazas, se activa de forma prioritaria el [[12_Manual_de_Crisis]] de contención.

---

## ⚡ 3. Límites de Mensajes (Token Guard)
Para evitar que bots o atacantes envíen miles de mensajes seguidos quemando la API de Google, existe un límite estricto de **${tokenLimit} mensajes** por sesión. Llegado ese punto, la conversación se congela automáticamente y se escala a un especialista humano en [[5_Conversion]].`
        };
      case 7:
        return {
          name: "7_Glosario.md",
          content: `# 📖 Glosario de Conceptos y Tecnicismos Propios

Usa estas explicaciones sencillas para traducir conceptos complejos a tus prospectos de forma sumamente comprensible (con peras y manzanas).

---

## 💡 Conceptos Clave

### 1. ${glos1Concept}
* *Traducción sencilla*: ${glos1Sencillo}

### 2. ${glos2Concept}
* *Traducción sencilla*: ${glos2Sencillo}

### 3. ${glos3Concept}
* *Traducción sencilla*: ${glos3Sencillo}

---

## 🧭 Conexión en el Cerebro
* Volver a consultas generales comerciales en [[4_FAQs]].`
        };
      case 8:
        return {
          name: "8_Manejo_de_Objeciones.md",
          content: `# 🎯 Protocolo de Manejo de Objeciones Comerciales

Cuando un cliente presente dudas o defensas sobre contratar nuestros servicios, reencauza la conversación con empatía y enfoque en el Retorno de Inversión (ROI).

---

## 🛡️ Objeciones Comunes y Respuestas Maestro

### Objeción 1: "Es muy caro" / "No tengo ese presupuesto"
* **Enfoque**: ${objPrecio}

### Objeción 2: "Ya tengo una persona que me maneja redes / ManyChat básico"
* **Enfoque**: ${objCompetencia}

### Objeción 3: "No tengo tiempo para una videollamada"
* **Enfoque**: ${objTiempo}

### Objeción 4: "Esto va a espantar a mis clientes si se dan cuenta que es una IA"
* **Enfoque**: ${objDesconfianza}

---

## 🧭 Conexión en el Cerebro
* Volver a la calificación de prospectos en [[3_Calificacion]].
* Avanzar a conversión directa en [[5_Conversion]].
* **Gancho del Onboarding**: Si el cliente sigue indeciso o dice que no, ofrécele ver la demo de bienvenida interactiva de [[11_Onboarding_Clientes]] para revertir el riesgo.`
        };
      case 9:
        return {
          name: "9_Ficha_Cliente_Ideal.md",
          content: `# 🎯 Ficha de Cliente Ideal (ICP - Ideal Customer Profile)

Usa esta matriz interna para perfilar la calidad y encaje comercial de los leads que ingresan a nuestro sistema.

---

## 💎 Criterios de Encaje Comercial
Nuestros servicios están diseñados de forma óptima para empresas que cumplen con los siguientes criterios:
* **Características**: ${icpCriterios}

---

## ⚡ Plan de Contención para Leads Fuera de Perfil (ICP Bajo)
Si el lead está empezando de forma independiente o su presupuesto es muy bajo:
* **No los descartamos**: Les ofrecemos nuestras soluciones de downsell.
* **Derivación**: ${icpDownsell}

---

## 🧭 Conexión en el Cerebro
* Volver al protocolo de calificación en [[3_Calificacion]].`
        };
      case 10:
        return {
          name: "10_Politicas_de_Soporte.md",
          content: `# 🛠️ Políticas de Soporte Técnico y Acuerdos de Nivel de Servicio (SLA)

Usa esta nota de referencia técnica para responder dudas sobre las garantías de continuidad de servicio de los bots desarrollados por la empresa.

---

## ⏰ Horarios de Atención Técnica
* **Horario de soporte**: ${horarios}

---

## ⚡ Tiempos de Respuesta Garantizados (SLA)

1. **Incidencia Crítica (Bloqueo del Bot / Caída de Webhook)**:
   * *Tiempo de Respuesta*: **${slaCritica}**.
   * *Acción*: Corrección de código en caliente, diagnóstico de caída de Meta Cloud o restauración de bases de datos.
2. **Incidencia Menor (Fallas en textos, ajustes menores de prompts)**:
   * *Tiempo de Respuesta*: **${slaMenor}**.

---

## 🎁 ¿Qué cubre nuestro Fee de Mantenimiento Mensual?
Todos los desarrollos incluyen un fee mensual de mantenimiento y optimización que cubre:
* ${feeMantenimiento}

---

## 🧭 Conexión en el Cerebro
* Volver al índice general de preguntas en [[4_FAQs]].`
        };
      case 11:
        return {
          name: "11_Onboarding_Clientes.md",
          content: `# 🤝 Onboarding de Clientes Nuevos (Bienvenida y Demo)

Este nodo detalla el proceso de bienvenida automatizado para nuevos clientes y actúa como un poderoso recurso de venta interactiva ante objeciones.

---

## 📅 1. El Proceso de Bienvenida Oficial (Post-Venta)
Una vez que un cliente realiza el pago inicial del proyecto, el bot comercial le da la bienvenida de forma automática e inicia el levantamiento de información en 3 pasos rápidos:
1. **Paso 1**: ${onbTarea1}
2. **Paso 2**: ${onbTarea2}
3. **Paso 3**: ${onbTarea3}

---

## 🎯 2. La Demostración Interactiva (Gancho de Venta ante Objeciones)
Si el prospecto tiene dudas en [[8_Manejo_de_Objeciones]], se siente indeciso o dice que "no" al cierre comercial:
* **Estrategia comercial**: Ofrécele de forma entusiasta experimentar en carne propia cómo funciona este sistema de bienvenida automatizado simulando que ya es cliente nuestro.
* **Mensaje sugerido**: *"¡Entiendo al 100% que quieras pensarlo! Para mostrarte la calidad de lo que hacemos, ¿te gustaría probar una simulación en vivo de nuestro proceso de bienvenida? Solo escribe la palabra *${onbKeyword}* o presiona el botón y simularé ser tu asistente de inducción para que veas los beneficios operativos en tiempo real."*
* *(El bot activará el modo Onboarding Eduardo al recibir esta petición, demostrando el valor real del producto).*

---

## 🧭 Conexión en el Cerebro
* Volver a manejo de objeciones comerciales en [[8_Manejo_de_Objeciones]] o canal de conversión en [[5_Conversion]].`
        };
      case 12:
        return {
          name: "12_Manual_de_Crisis.md",
          content: `# 🚨 Manual de Crisis y Contención Reputacional (PR)

Este protocolo establece cómo el bot debe reaccionar de forma inmediata y seria ante quejas graves, amenazas de mala reputación o usuarios altamente frustrados.

---

## 🚫 1. Detección de Mensajes de Crisis
Si el usuario envía mensajes que contienen palabras clave de alta tensión como:
* **Palabras gatillo**: ${crisisKeywords}

---

## 🛡️ 2. Protocolo de Contención Inmediata
El bot **bloqueará cualquier respuesta informal o defensiva** y responderá con absoluta seriedad y empatía corporativa.

### Mensaje de Contención Obligatorio:
> *"${crisisMensaje}"*

---

## ⚡ 3. Acción del Sistema (Detrás de Escena)
1. **Handoff Inmediato**: Se actualiza el estado del chat a \`handoff\` de forma permanente para silenciar la IA.
2. **Alerta Crítica**: Se gatilla una notificación push al canal del administrador con la etiqueta \`[ALERTA DE CRISIS DE REPUTACIÓN / URGENTE]\` adjuntando el teléfono y nombre del lead.

---

## 🧭 Conexión en el Cerebro
* Vinculado a políticas de seguridad en [[6_Seguridad]] e historial de contacto humano prioritario en [[5_Conversion]].`
        };
      case 13:
        return {
          name: "13_Preparacion_de_Conversaciones.md",
          content: `# 💬 Preparación de Conversaciones y Briefing del Cliente
   
Usa este nodo para guiar a tus prospectos sobre cómo estructurar y preparar la estrategia conversacional de su propio negocio antes de su videollamada con nuestro equipo.

---

## 🗺️ 1. El Mapa del Viaje Conversacional (Conversational Journey)
Para diseñar un bot comercial que venda con la misma efectividad que tu mejor vendedor humano, debemos estructurar la conversación en 4 hitos claros:

1. **La Entrada (Icebreaker)**: Cómo inicia el chat (anuncio, botón en la web).
2. **El Filtro (Calificación)**: Qué preguntas clave debemos hacer para perfilar.
3. **El Valor (Resolución de Objeciones/FAQs)**: Responder dudas frecuentes de forma inmediata.
4. **La Salida (Conversión)**: El llamado a la acción principal (agendar videollamada, comprar directo).

---

## 📋 2. Checklist de Preparación para la Videollamada de Valor
Te recomendamos tener a mano los siguientes insumos clave para diseñar tu blueprint agéntico en vivo en nuestra llamada:
* [ ] **Tus servicios estrella**: Detalla qué incluyen y cuál es su precio.
* [ ] **Tus dudas más frecuentes (FAQs)**: Esas preguntas que te hacen siempre.
* [ ] **Tus objeciones más duras**: Lo que te dicen tus clientes cuando dudan.
* [ ] **Tus enlaces clave**: Tu agenda virtual y contacto de ventas.

---

## 📄 3. Formulario Express de Preparación Asíncrona (Sin videollamada)
Si prefieres avanzar de forma asíncrona, puedes enviarnos esta plantilla rápida directamente por este chat:

\`\`\`text
ESTRATEGIA CONVERSACIONAL - [Nombre de tu Negocio]
1. Nombre del Bot deseado:
2. Rubro del negocio:
3. Qué proceso quieres automatizar (Ventas, Soporte, Citas):
4. Tus 2 principales servicios y precios:
5. La pregunta frecuente número 1 que hace tu cliente:
6. Tu enlace de Calendly o número de WhatsApp de soporte:
\`\`\`
*Procesaremos esta ficha para enviarte un blueprint técnico formal en PDF en menos de 24 horas.*

---

## 🧭 Conexión en el Cerebro
* Volver al protocolo de calificación en [[3_Calificacion]] o canales de conversión en [[5_Conversion]].`
        };
      default:
        return { name: "", content: "" };
    }
  };

  const activeFile = getFileContent(activeTab);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeFile.content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = activeFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    // Generate a simple manifest of all files to download sequentially
    for (let i = 1; i <= 13; i++) {
      const file = getFileContent(i);
      const blob = new Blob([file.content], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      // Slight delay to avoid browser blocking multiple downloads
      setTimeout(() => {
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, i * 150);
    }
  };

  const fillMockGlow = () => {
    // Fill the generator with Clínica Glow Dental mock details
    setNombreBot("Sofía");
    setNombreEmpresa("Clínica Dental Glow");
    setTono("Profesional, sumamente empático, calmado y tranquilizador ante miedos dentales");
    setTratamiento("Tutear de manera cálida pero con respeto (ej: 'hola', 'cuéntame', 'dime qué molestia tienes')");
    setHorarios("Lunes a Sábado de 8:00 a 20:00 hrs (Hora de Santiago)");
    setServ1Nombre("Limpieza Dental Ultra-Sonido & Pulido");
    setServ1Desc("Eliminación profunda de sarro con tecnología ultrasonido indolora, cepillado profesional y pulido de manchas.");
    setServ1Precio("$45.000 CLP (Convenio Fonasa disponible)");
    setServ2Nombre("Blanqueamiento Dental Premium 3D");
    setServ2Desc("Blanqueamiento clínico en una sesión con gel de peróxido fotoactivado por luz LED de alta intensidad.");
    setServ2Precio("$120.000 CLP");
    setServ3Nombre("Implantes & Estética Dental Avanzada");
    setServ3Desc("Rehabilitación oral completa con implantes de titanio de alta calidad biocompatibles y coronas de zirconio.");
    setServ3Precio("Desde $650.000 CLP (Evaluación y TAC gratis)");
    setPregName("¡Hola! Para conversar mejor y saber con quién tengo el gusto, ¿cuál es tu nombre?");
    setPreg1("Un placer conocerte. Para agendar la especialidad correcta, ¿cuál es tu RUT o previsión?");
    setPreg2("Cuéntame, ¿cuál es el motivo principal de tu consulta? ¿Es por dolor, limpieza, estética o un control general?");
    setPreg3("¿Tienes alguna preferencia de sucursal? ¿Te acomoda Providencia o Las Condes?");
    setPreg4("¿Prefieres agendar en horario de mañana (9am-1pm) o de tarde (2pm-7pm)?");
    setFaq1Preg("¿Atienden urgencias dentales los domingos?");
    setFaq1Resp("Sí, contamos con un servicio de urgencia activa 24/7 en nuestra sede de Providencia. Puedes asistir directamente o escribirnos aquí.");
    setFaq2Preg("¿Tienen convenios o reembolsos de Isapres?");
    setFaq2Resp("Emitimos boletas de honorarios y facturas con los códigos Fonasa/Isapre listos para reembolsar en tu aseguradora, además de IMED directo.");
    setFaq3Preg("¿Qué pasa si tengo mucho miedo al dentista?");
    setFaq3Resp("¡No te preocupes! Todo nuestro personal está capacitado en odontología sin dolor y ofrecemos sedación consciente para tratamientos sin estrés.");
    setFaq4Preg("¿Tienen opciones de financiamiento?");
    setFaq4Resp("Sí, puedes pagar en hasta 12 cuotas sin interés con tarjetas de crédito bancarias, convenios de empresa y financiamiento directo.");
    setCalendlyUrl("https://calendly.com/glowdental/reserva");
    setWhatsappPhone("+56999999999");
    setOffTopicResp("Soy Sofía, el asistente de Clínica Dental Glow. Mi propósito es ayudarte a coordinar tus horas de atención dental. Dime, ¿te gustaría agendar una evaluación?");
    setTokenLimit("12");
    setGlos1Concept("Odontología Sin Dolor (Sedación Consciente)");
    setGlos1Sencillo("Es una técnica donde respiras un gas relajante inocuo que te mantiene despierto pero libre de cualquier ansiedad o molestia durante el tratamiento.");
    setGlos2Concept("Implante Dental con TAC 3D");
    setGlos2Sencillo("Es un tornillo de titanio ultra resistente que reemplaza la raíz del diente perdido y sobre el cual se coloca una corona estética idéntica a un diente natural.");
    setGlos3Concept("Limpieza Profiláctica Profunda");
    setGlos3Sencillo("Una limpieza clínica avanzada que elimina el sarro acumulado debajo de las encías para prevenir gingivitis y mal aliento.");
    setObjPrecio("Entiendo, el presupuesto es importante. Ofrecemos evaluación 100% gratuita con TAC 3D incluido y opciones de pago de 3 a 12 cuotas sin interés.");
    setObjCompetencia("Destaca que en Glow Dental usamos tecnología alemana de vanguardia y garantizamos los implantes por 5 años por escrito.");
    setObjTiempo("Ofrece reservar de inmediato una pre-cita por este chat indicando sus horarios libres y nosotros nos encargamos de bloquearla.");
    setObjDesconfianza("Explícale al paciente que Sofía está conectada en tiempo real al software médico de la clínica, por lo que su cita queda agendada de forma 100% segura.");
    setIcpCriterios("Pacientes en Santiago buscando tratamientos estéticos, ortodoncia o implantes con cobertura Isapre o presupuesto medio-alto.");
    setIcpDownsell("Ofrecer la evaluación básica gratuita o una limpieza profiláctica de menor costo para que conozcan las instalaciones y el equipo dental.");
    setSlaCritica("Menos de 1 hora (Para urgencias de dolor)");
    setSlaMenor("Menos de 6 horas hábiles (Dudas de tratamientos)");
    setFeeMantenimiento("Coordinación automatizada de reservas de box clínico, recordatorios de citas automatizados por WhatsApp 24h antes y encuestas de satisfacción post-atención.");
    setOnbTarea1("Completar la Ficha Clínica Digital y Declaración de Salud que te enviaremos por WhatsApp.");
    setOnbTarea2("Subir fotografía de tu última radiografía o TAC dental si posees uno reciente.");
    setOnbTarea3("Asistir 10 minutos antes a la clínica para tu registro y recepción.");
    setOnbKeyword("🚀 PROBAR SIMULADOR DE CITA");
    setCrisisKeywords("estafa, negligencia, mala praxis, sernac, demanda, juicio, dolor insoportable, reclamo");
    setCrisisMensaje("Lamentamos profundamente su malestar y preocupación. He pausado mis respuestas automáticas y derivado su ficha con carácter URGENTE a la Directora Médica de la clínica para que le llame de inmediato.");
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[#e5e5e5] text-2xl font-bold tracking-tight">🧠 Generador de Bóveda "Cerebro"</h1>
          <p className="text-[#9e9e9e] text-sm mt-1">
            Diseñá e inyectá en vivo el cerebro de Obsidian para tus futuros clientes.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fillMockGlow}
            className="px-4 py-2 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 border border-amber-400/20 font-medium text-xs transition-all"
          >
            🦷 Cargar Demo "Clínica Dental"
          </button>
          <button
            onClick={handleDownloadAll}
            className="px-4 py-2 rounded-lg bg-[#47c4ff] hover:bg-[#05a9e3] text-black font-semibold text-xs shadow-md shadow-[#47c4ff]/10 transition-all"
          >
            ⚡ Descargar 13 Notas (.md)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        {/* Left Column - Form Fields (Accordion Style) */}
        <div className="space-y-4">
          <div className="bg-[#131313]/60 border border-[#484848]/20 rounded-xl p-4 flex items-center justify-between">
            <span className="text-xs text-[#9e9e9e]">
              💡 <strong>Tip:</strong> Modificá cualquier campo del formulario y observá en tiempo real cómo cambia la nota de Obsidian seleccionada a la derecha.
            </span>
          </div>

          <AccordionSection
            title="🎭 1. Identidad y Personalidad (1_Charlie.md)"
            isOpen={openSection === 0}
            onToggle={() => setOpenSection(openSection === 0 ? -1 : 0)}
          >
            <div className="grid grid-cols-2 gap-4">
              <Field label="Nombre del Bot">
                <input value={nombreBot} onChange={(e) => setNombreBot(e.target.value)} className={INPUT} />
              </Field>
              <Field label="Nombre del Negocio">
                <input value={nombreEmpresa} onChange={(e) => setNombreEmpresa(e.target.value)} className={INPUT} />
              </Field>
            </div>
            <Field label="Tono de Conversación">
              <input value={tono} onChange={(e) => setTono(e.target.value)} className={INPUT} />
            </Field>
            <Field label="Tratamiento y Modismos">
              <input value={tratamiento} onChange={(e) => setTratamiento(e.target.value)} className={INPUT} />
            </Field>
          </AccordionSection>

          <AccordionSection
            title="💡 2. Catálogo de Servicios (2_Servicios.md)"
            isOpen={openSection === 1}
            onToggle={() => setOpenSection(openSection === 1 ? -1 : 1)}
          >
            <div className="space-y-4">
              <div className="p-3 bg-[#1a1a1a]/50 rounded-lg border border-[#484848]/10 space-y-2">
                <p className="text-[10px] text-emerald-400 font-bold uppercase">Servicio 1</p>
                <input value={serv1Nombre} onChange={(e) => setServ1Nombre(e.target.value)} placeholder="Nombre" className={INPUT_SM} />
                <textarea value={serv1Desc} onChange={(e) => setServ1Desc(e.target.value)} placeholder="Descripción" rows={2} className={INPUT_SM} />
                <input value={serv1Precio} onChange={(e) => setServ1Precio(e.target.value)} placeholder="Precio" className={INPUT_SM} />
              </div>
              <div className="p-3 bg-[#1a1a1a]/50 rounded-lg border border-[#484848]/10 space-y-2">
                <p className="text-[10px] text-emerald-400 font-bold uppercase">Servicio 2</p>
                <input value={serv2Nombre} onChange={(e) => setServ2Nombre(e.target.value)} placeholder="Nombre" className={INPUT_SM} />
                <textarea value={serv2Desc} onChange={(e) => setServ2Desc(e.target.value)} placeholder="Descripción" rows={2} className={INPUT_SM} />
                <input value={serv2Precio} onChange={(e) => setServ2Precio(e.target.value)} placeholder="Precio" className={INPUT_SM} />
              </div>
              <div className="p-3 bg-[#1a1a1a]/50 rounded-lg border border-[#484848]/10 space-y-2">
                <p className="text-[10px] text-emerald-400 font-bold uppercase">Servicio 3</p>
                <input value={serv3Nombre} onChange={(e) => setServ3Nombre(e.target.value)} placeholder="Nombre" className={INPUT_SM} />
                <textarea value={serv3Desc} onChange={(e) => setServ3Desc(e.target.value)} placeholder="Descripción" rows={2} className={INPUT_SM} />
                <input value={serv3Precio} onChange={(e) => setServ3Precio(e.target.value)} placeholder="Precio" className={INPUT_SM} />
              </div>
            </div>
          </AccordionSection>

          <AccordionSection
            title="📋 3. Protocolo de Calificación (3_Calificacion.md)"
            isOpen={openSection === 2}
            onToggle={() => setOpenSection(openSection === 2 ? -1 : 2)}
          >
            <Field label="Pregunta 1 (Nombre de Contacto)">
              <input value={pregName} onChange={(e) => setPregName(e.target.value)} className={INPUT} />
            </Field>
            <Field label="Pregunta 2 (Identidad Empresa)">
              <input value={preg1} onChange={(e) => setPreg1(e.target.value)} className={INPUT} />
            </Field>
            <Field label="Pregunta 3 (Dolor Principal)">
              <input value={preg2} onChange={(e) => setPreg2(e.target.value)} className={INPUT} />
            </Field>
            <Field label="Pregunta 4 (Canal Requerido)">
              <input value={preg3} onChange={(e) => setPreg3(e.target.value)} className={INPUT} />
            </Field>
            <Field label="Pregunta 5 (Volumen Operativo)">
              <input value={preg4} onChange={(e) => setPreg4(e.target.value)} className={INPUT} />
            </Field>
          </AccordionSection>

          <AccordionSection
            title="💬 4. Preguntas Frecuentes (4_FAQs.md)"
            isOpen={openSection === 3}
            onToggle={() => setOpenSection(openSection === 3 ? -1 : 3)}
          >
            <div className="space-y-4">
              <div className="p-3 bg-[#1a1a1a]/50 rounded-lg border border-[#484848]/10 space-y-2">
                <input value={faq1Preg} onChange={(e) => setFaq1Preg(e.target.value)} className={INPUT_SM} />
                <textarea value={faq1Resp} onChange={(e) => setFaq1Resp(e.target.value)} rows={2} className={INPUT_SM} />
              </div>
              <div className="p-3 bg-[#1a1a1a]/50 rounded-lg border border-[#484848]/10 space-y-2">
                <input value={faq2Preg} onChange={(e) => setFaq2Preg(e.target.value)} className={INPUT_SM} />
                <textarea value={faq2Resp} onChange={(e) => setFaq2Resp(e.target.value)} rows={2} className={INPUT_SM} />
              </div>
              <div className="p-3 bg-[#1a1a1a]/50 rounded-lg border border-[#484848]/10 space-y-2">
                <input value={faq3Preg} onChange={(e) => setFaq3Preg(e.target.value)} className={INPUT_SM} />
                <textarea value={faq3Resp} onChange={(e) => setFaq3Resp(e.target.value)} rows={2} className={INPUT_SM} />
              </div>
              <div className="p-3 bg-[#1a1a1a]/50 rounded-lg border border-[#484848]/10 space-y-2">
                <input value={faq4Preg} onChange={(e) => setFaq4Preg(e.target.value)} className={INPUT_SM} />
                <textarea value={faq4Resp} onChange={(e) => setFaq4Resp(e.target.value)} rows={2} className={INPUT_SM} />
              </div>
            </div>
          </AccordionSection>

          <AccordionSection
            title="🎯 5. Conversión (5_Conversion.md)"
            isOpen={openSection === 4}
            onToggle={() => setOpenSection(openSection === 4 ? -1 : 4)}
          >
            <Field label="Enlace de Calendly / Reservas">
              <input value={calendlyUrl} onChange={(e) => setCalendlyUrl(e.target.value)} className={INPUT} />
            </Field>
            <Field label="WhatsApp de Derivación / Handoff">
              <input value={whatsappPhone} onChange={(e) => setWhatsappPhone(e.target.value)} className={INPUT} />
            </Field>
          </AccordionSection>

          <AccordionSection
            title="🛡️ 6. Seguridad & Mensajes (6_Seguridad.md)"
            isOpen={openSection === 5}
            onToggle={() => setOpenSection(openSection === 5 ? -1 : 5)}
          >
            <Field label="Respuesta Contención Off-Topic">
              <input value={offTopicResp} onChange={(e) => setOffTopicResp(e.target.value)} className={INPUT} />
            </Field>
            <Field label="Límite Máximo de Mensajes por Sesión (Anti-Flood)">
              <input value={tokenLimit} onChange={(e) => setTokenLimit(e.target.value)} type="number" className={INPUT} />
            </Field>
          </AccordionSection>

          <AccordionSection
            title="📖 7. Glosario de Tecnicismos (7_Glosario.md)"
            isOpen={openSection === 6}
            onToggle={() => setOpenSection(openSection === 6 ? -1 : 6)}
          >
            <div className="space-y-4">
              <div className="p-3 bg-[#1a1a1a]/50 rounded-lg border border-[#484848]/10 space-y-2">
                <input value={glos1Concept} onChange={(e) => setGlos1Concept(e.target.value)} className={INPUT_SM} />
                <textarea value={glos1Sencillo} onChange={(e) => setGlos1Sencillo(e.target.value)} rows={2} className={INPUT_SM} />
              </div>
              <div className="p-3 bg-[#1a1a1a]/50 rounded-lg border border-[#484848]/10 space-y-2">
                <input value={glos2Concept} onChange={(e) => setGlos2Concept(e.target.value)} className={INPUT_SM} />
                <textarea value={glos2Sencillo} onChange={(e) => setGlos2Sencillo(e.target.value)} rows={2} className={INPUT_SM} />
              </div>
              <div className="p-3 bg-[#1a1a1a]/50 rounded-lg border border-[#484848]/10 space-y-2">
                <input value={glos3Concept} onChange={(e) => setGlos3Concept(e.target.value)} className={INPUT_SM} />
                <textarea value={glos3Sencillo} onChange={(e) => setGlos3Sencillo(e.target.value)} rows={2} className={INPUT_SM} />
              </div>
            </div>
          </AccordionSection>

          <AccordionSection
            title="🥊 8. Manejo de Objeciones (8_Manejo_de_Objeciones.md)"
            isOpen={openSection === 7}
            onToggle={() => setOpenSection(openSection === 7 ? -1 : 7)}
          >
            <Field label="Objeción: Es muy caro / Falta presupuesto">
              <textarea value={objPrecio} onChange={(e) => setObjPrecio(e.target.value)} rows={2} className={INPUT} />
            </Field>
            <Field label="Objeción: Tengo ManyChat / Bot Rígido">
              <textarea value={objCompetencia} onChange={(e) => setObjCompetencia(e.target.value)} rows={2} className={INPUT} />
            </Field>
            <Field label="Objeción: No tengo tiempo para llamada">
              <textarea value={objTiempo} onChange={(e) => setObjTiempo(e.target.value)} rows={2} className={INPUT} />
            </Field>
            <Field label="Objeción: La IA va a ahuyentar a mis clientes">
              <textarea value={objDesconfianza} onChange={(e) => setObjDesconfianza(e.target.value)} rows={2} className={INPUT} />
            </Field>
          </AccordionSection>

          <AccordionSection
            title="💎 9. Cliente Ideal - ICP (9_Ficha_Cliente_Ideal.md)"
            isOpen={openSection === 8}
            onToggle={() => setOpenSection(openSection === 8 ? -1 : 8)}
          >
            <Field label="Criterios del Cliente Perfecto">
              <textarea value={icpCriterios} onChange={(e) => setIcpCriterios(e.target.value)} rows={2} className={INPUT} />
            </Field>
            <Field label="Plan de Downsell / Alternativa de Bajo Costo">
              <textarea value={icpDownsell} onChange={(e) => setIcpDownsell(e.target.value)} rows={2} className={INPUT} />
            </Field>
          </AccordionSection>

          <AccordionSection
            title="🛠️ 10. Políticas de Soporte & SLA (10_Politicas_de_Soporte.md)"
            isOpen={openSection === 9}
            onToggle={() => setOpenSection(openSection === 9 ? -1 : 9)}
          >
            <Field label="Horario de Atención Técnica Oficial">
              <input value={horarios} onChange={(e) => setHorarios(e.target.value)} className={INPUT} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="SLA Incidencia Crítica">
                <input value={slaCritica} onChange={(e) => setSlaCritica(e.target.value)} className={INPUT} />
              </Field>
              <Field label="SLA Incidencia Menor">
                <input value={slaMenor} onChange={(e) => setSlaMenor(e.target.value)} className={INPUT} />
              </Field>
            </div>
            <Field label="Cobertura del Fee de Mantenimiento">
              <textarea value={feeMantenimiento} onChange={(e) => setFeeMantenimiento(e.target.value)} rows={2} className={INPUT} />
            </Field>
          </AccordionSection>

          <AccordionSection
            title="🤝 11. Onboarding de Clientes (11_Onboarding_Clientes.md)"
            isOpen={openSection === 10}
            onToggle={() => setOpenSection(openSection === 10 ? -1 : 10)}
          >
            <Field label="Tarea 1 de Onboarding (Post-Pago)">
              <input value={onbTarea1} onChange={(e) => setOnbTarea1(e.target.value)} className={INPUT} />
            </Field>
            <Field label="Tarea 2 de Onboarding">
              <input value={onbTarea2} onChange={(e) => setOnbTarea2(e.target.value)} className={INPUT} />
            </Field>
            <Field label="Tarea 3 de Onboarding">
              <input value={onbTarea3} onChange={(e) => setOnbTarea3(e.target.value)} className={INPUT} />
            </Field>
            <Field label="Palabra Clave para Activar Demo Onboarding">
              <input value={onbKeyword} onChange={(e) => setOnbKeyword(e.target.value)} className={INPUT} />
            </Field>
          </AccordionSection>

          <AccordionSection
            title="🚨 12. Manual de Crisis & PR (12_Manual_de_Crisis.md)"
            isOpen={openSection === 11}
            onToggle={() => setOpenSection(openSection === 11 ? -1 : 11)}
          >
            <Field label="Palabras de Alerta Máxima (separadas por comas)">
              <input value={crisisKeywords} onChange={(e) => setCrisisKeywords(e.target.value)} className={INPUT} />
            </Field>
            <Field label="Mensaje Formal de Contención y Traspaso Humano URGENTE">
              <textarea value={crisisMensaje} onChange={(e) => setCrisisMensaje(e.target.value)} rows={3} className={INPUT} />
            </Field>
          </AccordionSection>

          <AccordionSection
            title="💬 13. Preparación de Conversaciones (13_Preparacion_de_Conversaciones.md)"
            isOpen={openSection === 12}
            onToggle={() => setOpenSection(openSection === 12 ? -1 : 12)}
          >
            <Field label="Concepto Conversacional Principal">
              <input value="Estrategia Conversacional" disabled className={`${INPUT} opacity-50 cursor-not-allowed`} />
            </Field>
            <span className="text-[10px] text-[#9e9e9e]">
              *Este nodo se nutre automáticamente del perfilado de calificación, Calendly y WhatsApp de soporte configurados en las secciones 3 y 5.*
            </span>
          </AccordionSection>
        </div>

        {/* Right Column - Live Preview Panel */}
        <div className="sticky top-6 bg-[#131313] border border-[#484848]/20 rounded-2xl p-6 flex flex-col h-[82vh]">
          {/* Preview Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#484848]/20 shrink-0">
            <div>
              <p className="text-[#e5e5e5] text-sm font-semibold flex items-center gap-1.5">
                <span>📄 Vista Previa:</span>
                <span className="text-[#47c4ff] font-mono">{activeFile.name}</span>
              </p>
              <p className="text-[#9e9e9e] text-[10px]">Actualización en tiempo real para Obsidian</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  copySuccess
                    ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"
                    : "bg-[#1f1f1f] text-[#e5e5e5] border-[#484848]/30 hover:bg-[#2c2c2c]"
                }`}
              >
                {copySuccess ? "¡Copiado! ✓" : "📋 Copiar"}
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-lg bg-[#1f1f1f] hover:bg-[#2c2c2c] text-[#e5e5e5] border border-[#484848]/30 text-xs font-semibold transition-all"
              >
                📥 Descargar
              </button>
            </div>
          </div>

          {/* Note Tab Selector Grid */}
          <div className="grid grid-cols-4 md:grid-cols-7 gap-1 py-3 shrink-0">
            {[...Array(13)].map((_, i) => {
              const fileNum = i + 1;
              const isActive = activeTab === fileNum;
              return (
                <button
                  key={fileNum}
                  onClick={() => setActiveTab(fileNum)}
                  className={`py-1 px-1.5 rounded text-[10px] font-mono font-semibold transition-all ${
                    isActive
                      ? "bg-[#47c4ff]/10 text-[#47c4ff] border border-[#47c4ff]/30 shadow-sm shadow-[#47c4ff]/5"
                      : "bg-[#0c0c0c] text-[#9e9e9e] hover:bg-[#1a1a1a]"
                  }`}
                >
                  N{fileNum}
                </button>
              );
            })}
          </div>

          {/* Text/Code Viewer */}
          <div className="flex-1 overflow-auto bg-[#0a0a0a] border border-[#484848]/10 rounded-xl p-4 font-mono text-xs text-[#b8b8b8] selection:bg-[#47c4ff]/20 whitespace-pre-wrap leading-relaxed custom-scrollbar">
            {activeFile.content}
          </div>

          {/* Sync instructions */}
          <div className="mt-4 pt-3 border-t border-[#484848]/20 text-[10px] text-[#9e9e9e] leading-normal shrink-0">
            🚀 <strong>Cómo instalar en Obsidian:</strong> Descargá la nota y guardala en la carpeta{" "}
            <code className="text-[#e5e5e5] bg-[#1a1a1a] px-1 py-0.5 rounded">knowledge_base/</code> del proyecto. Vercel
            volverá a compilar el cerebro del bot automáticamente en 30 segundos tras subir tus cambios a GitHub.
          </div>
        </div>
      </div>
    </div>
  );
}

const INPUT =
  "w-full bg-[#1f1f1f] border border-[#484848]/40 rounded-lg px-3 py-2 text-[#e5e5e5] text-sm placeholder:text-[#484848] focus:outline-none focus:border-[#47c4ff]/50 transition-colors";
const INPUT_SM =
  "w-full bg-[#1a1a1a] border border-[#484848]/30 rounded-md px-3 py-2 text-[#e5e5e5] text-sm placeholder:text-[#484848] focus:outline-none focus:border-[#47c4ff]/50 transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="block text-[#9e9e9e] text-[10px] font-bold uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}
