# ⚙️ SOP Interno: De Documento de Cliente a Cerebro RAG

Esta guía es exclusiva para el equipo técnico de Browns Studio. Detalla el proceso de cómo tomar el documento (Word/Notion) que llenó el cliente y transformarlo en un sistema de archivos Markdown (Obsidian) optimizado para ingesta vectorial y RAG (Retrieval-Augmented Generation).

---

## 1. Preparación del Entorno (Vault del Cliente)

Nunca mezcles clientes en un mismo directorio de conocimiento. Por cada nuevo cliente, debes crear un "Sub-Vault" o carpeta aislada.

```text
/knowledge_base/clientes/
└── /nombre_del_cliente/
    ├── 01_Identidad.md
    ├── 02_Servicios.md
    ├── 03_Operaciones.md
    ├── 04_FAQs.md
    └── 05_Comercial.md
```

---

## 2. Técnicas de "Chunking" (Fragmentación)

Los Modelos de Lenguaje (LLMs) leen por fragmentos (*chunks*). Si pones todo en un solo archivo gigante de 20 páginas, la búsqueda vectorial fallará y el bot se confundirá. 

**Regla de Oro Interna:** Un archivo `.md` por contexto. Un encabezado `##` por tema.

### A. Archivo: `01_Identidad.md`
Este archivo se usa casi como el *System Prompt* base.
- Usa lenguaje imperativo.
- **Ejemplo de conversión:**
  - *Cliente escribió:* "No nos gusta dar descuentos grandes porque somos clínica premium."
  - *Tú pasas a Markdown:* `> [!WARNING] RESTRICCIÓN ABSOLUTA: Bajo ninguna circunstancia ofrecerás descuentos superiores al 5%. Tu posicionamiento es Clínica Premium.`

### B. Archivo: `02_Servicios.md`
El LLM procesa mucho mejor las **tablas** para datos duros que los párrafos de texto.
- **Transformación:** Pasa las listas de precios del cliente a Markdown Tables.
```markdown
## Catálogo de Ortodoncia
| Servicio | Precio Inicial | Mensualidad | Duración Aprox |
|----------|----------------|-------------|----------------|
| Brackets Metálicos | $50.000 CLP | $25.000 CLP | 18 a 24 meses |
| Brackets Zafiro | $100.000 CLP | $35.000 CLP | 12 a 18 meses |
```

### C. Archivo: `04_FAQs.md`
Usa la estructura estandarizada de Pregunta / Respuesta clara. Separa cada pregunta con un encabezado `###` para que el buscador vectorial indexe cada pregunta por separado.

```markdown
### ¿Atienden con Fonasa o Isapre?
Atendemos exclusivamente de forma particular. No tenemos convenios directos con Fonasa ni Isapres, pero entregamos boleta para que el paciente solicite su reembolso.
```

---

## 3. Enlazado Interno (Wikilinks)
Si un servicio depende de una política de operaciones, usa la sintaxis de Obsidian `[[...]]` para conectar los conceptos. Esto ayuda enormemente al LLM a saltar de un contexto a otro si usa herramientas de navegación (Agents).
- *Ejemplo:* `Para agendar la evaluación de ortodoncia, el paciente debe abonar primero (ver [[03_Operaciones#Políticas de Agendamiento]]).`

---

## 4. Pruebas de Estrés (Testing)
Antes de conectar este directorio a la API de WhatsApp de producción (Kapso):
1. Carga los archivos en tu motor de RAG de desarrollo.
2. Ataca al bot con preguntas capciosas o intentando sacarle descuentos irreales.
3. Si el bot alucina, **no modifiques el prompt del bot**. Modifica el archivo `.md` (el cerebro) para que la instrucción sea más restrictiva y literal.
