# Browns Studio: Generador de Videos Programáticos (Remotion)

Este es un entorno de desarrollo aislado para generar de manera interna videos de prospección y marketing personalizados para **Browns Studio**. 

El sistema compila y renderiza videos verticales (`1080x1920` - Aspect Ratio 9:16) de 26 segundos de duración, diseñados específicamente para ser enviados por WhatsApp o compartidos en redes sociales como Reels/Shorts.

---

## 📽 Estructura y Narrativa del Video (26 segundos)

El video utiliza el enfoque de alta empatía comercial **"El Caos de WhatsApp vs. El Cierre Automatizado"** y está estructurado en 4 fases continuas animadas mediante físicas de resorte (`spring`):

1. **0s - 3s (El Gancho)**: Pantalla oscura con un orbe de neón cyan pulsando y la pregunta del dolor específica de la industria (ej. *¿Pierdes pacientes por demoras en WhatsApp?*).
2. **3s - 12s (La Simulación WhatsApp)**: Conversación de alta fidelidad con interfaz oscura de WhatsApp. Muestra la bienvenida de la marca, la pregunta del cliente y a la Inteligencia Artificial simulando escribir (`Escribiendo...` con puntos matemáticos rebotando) antes de responder de forma hiper-personalizada con un enlace de agendamiento.
3. **12s - 22s (El Flujo Conectado - CRM)**: Diagrama de flujo dinámico con el **Orbe 3D de Browns Studio** en el centro. El orbe procesa el lead de WhatsApp y envía destellos de datos a alta velocidad hacia **HubSpot CRM** y **Calendly**, mostrando tres alertas flotantes elegantes:
   - `🧠 Agente Browns OS`: Calificación y perfilado completado.
   - `⚡ Integraciones OK`: Registro en CRM y envío de enlace.
   - `🔔 Notificación`: Alerta en Slack enviada de inmediato a Cristian.
4. **22s - 26s (El Cierre / Outro)**: Placa final premium corporativa de Browns Studio con el isotipo, logo y la propuesta de valor: *"Te armamos una simulación real y entrenada gratis en 48 horas en browns.studio"*.

---

## 🚀 Cómo Empezar a Usarlo

Asegúrate de estar en el directorio `video-generator/` de tu terminal para ejecutar estos comandos:

### 1. Previsualización Interactiva (Remotion Player)
Puedes previsualizar el video en tiempo real en tu navegador, jugar con la línea de tiempo y depurar los resortes ejecutando:
```bash
pnpm start
```
Esto abrirá el Remotion Previewer local en tu navegador (usualmente en `http://localhost:3000`).

### 2. Generación Masiva por Lotes (Batch Mode)
Para generar videos en masa, edita el archivo centralizado `leads.json` y agrega las empresas que deseas prospectar:

```json
[
  {
    "id": "dental-pro",
    "businessName": "Clínica Dental Dentalia",
    "industry": "dental",
    "botName": "Dra. Ana",
    "hookText": "¿Pierdes pacientes en WhatsApp por demoras?",
    "clientMessage": "¡Hola! Quisiera consultar por el precio del blanqueamiento dental.",
    "botReply": "¡Hola! Con gusto. Nuestro Blanqueamiento LED Premium tiene un valor promo de $120.000 CLP. ¿Te acomoda agendar una evaluación gratuita?",
    "ctaUrl": "browns.studio/demo",
    "crmLabel": "Nuevo Paciente Calificado",
    "actions": ["Crear Lead en HubSpot", "Agendar Evaluación", "Notificar a Cristian"]
  }
]
```

Luego, corre el script de renderizado:
```bash
pnpm build
```
Los videos se guardarán automáticamente en la carpeta `video-generator/output/` con el nombre `pitch-{id}.mp4`.

### 3. Generación Rápida al Instante (CLI Mode)
Si quieres prospectar a un cliente específico al momento, puedes generar su video de forma ultra-rápida sin editar ningún archivo, simplemente pasando argumentos a la terminal:

```bash
pnpm build -- --name "Clínica Dental Providencia" --industry "dental"
```

El script buscará la plantilla de textos ideal de la industria (`dental`, `inmobiliaria`, `academia`, o `ecommerce`) y generará al instante el video personalizado en la carpeta `output/`.

#### Argumentos CLI Personalizables Opcionales:
* `--name`: Nombre de la empresa prospecto (Obligatorio para activar modo CLI).
* `--industry`: Una de: `dental`, `inmobiliaria`, `academia`, `ecommerce` (Default: `dental`).
* `--bot`: Nombre personalizado para el Bot de IA.
* `--hook`: Texto del gancho/dolor en la introducción.
* `--client`: Pregunta simulada del cliente.
* `--reply`: Respuesta simulada de tu Agente IA.
* `--cta`: URL o link personalizado de salida.

Ejemplo hiper-personalizado:
```bash
pnpm build -- --name "Inmobiliaria Lyon" --industry "inmobiliaria" --bot "Asistente Lyon" --hook "¿Cansado de perder leads por chat?"
```

---

## 🛠 Tecnologías Utilizadas
* **Remotion (React 18)**: Framework de video programático.
* **TypeScript & Webpack**: Compilación segura.
* **Esbuild & Playwright (Chromium)**: Motor de compilación veloz y renderizado headless en segundo plano.
* **Lucide React**: Iconos vectoriales premium para los diagramas e interfaces.
* **Google Fonts (Outfit & Inter)**: Tipografías modernas integradas automáticamente.
