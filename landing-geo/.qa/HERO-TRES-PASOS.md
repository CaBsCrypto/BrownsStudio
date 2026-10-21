# Hero: tres pasos, un recorrido

Revisión local: 2026-10-07, http://localhost:5175/#inicio.

## Cambio

La escena presenta tres nodos: persona, agente y empresa. Servicios, cobertura y contacto están unidos al bloque de empresa, sin conexiones independientes. Dos carriles locales y una sola señal visible realizan la ida y la vuelta. Se conserva el cubo con profundidad, el fondo claro y las etiquetas de demostración ficticia.

El ciclo dura 24 segundos: pregunta (0–3), consulta al agente (3–6), agente (6–8), consulta a la empresa (8–11), empresa (11–15), vuelta al agente (15–18), agente (18–19), vuelta al chat (19–22), información de vuelta (22–24). Los cambios de ruta ocurren con la señal oculta.

## Verificación

- Compilación de producción, lint y TypeScript: correctos.
- Siete pruebas de reproducción: correctas. Cubren entrada en pantalla, pausa manual, suspensión fuera de pantalla, pestaña oculta y movimiento reducido.
- Navegador a 320, 390, 937 y 1440 px: tres nodos, dos conexiones y una señal en el SVG visible. Ningún texto de la escena sale de su contenedor. La escena no desborda; el CTA aparece antes de ella en los tamaños apilados.
- Dos ciclos observados mediante estilos aplicados en el navegador: la señal recorre ambos carriles hacia la empresa y vuelve por ellos; los bordes destacan la etapa correspondiente.
- Teclado: Enter pausa y Espacio continúa. El foco del control es visible. La pausa se conserva al desplazarse y cambiar el ancho.
- Salida de pantalla: ambas variantes suspenden sus animaciones.
- Movimiento reducido y contenido sin JavaScript: cubiertos por reglas CSS, estado inicial estático y pruebas de estado; no se emularon esas condiciones directamente en el navegador en esta revisión.

## Evidencia y referencias

- hero-tres-pasos-escritorio.jpg
- hero-tres-pasos-movil.jpg
- hero-tres-pasos-320.jpg
- hero-tres-pasos-medidas.json
- agent-scene-tres-pasos.tsx.reference
- agent-scene-tres-pasos.css.reference

La revisión de desbordes se limita al hero. No se modificaron las demás secciones, APIs, formulario ni MCP.
