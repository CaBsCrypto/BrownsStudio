# Hero: dos empresas dentro del agente

Revisión local: 2026-10-07, http://localhost:5175/#inicio.

## Entrega

Dos objetos: persona y agente. Una persona pregunta «¿Qué empresa ofrece este servicio en Chile?». El agente compara únicamente «Competencia / Información insuficiente / No» y «Tu empresa / Datos disponibles / Sí». La alternativa del cliente es blanca, con canto suave, texto oscuro y check azul. Se conserva un acento breve de seis partículas al destacar el Sí.

Se eliminó la ficha «Perfil ilustrativo», sus datos de mantención y el carril hacia ella. Una sola señal recorre una única conexión de ida y vuelta. El cierre dice «Prepara tu empresa para las búsquedas de hoy». No se anuncian primeras posiciones ni recomendaciones garantizadas. La nota visible identifica las empresas y la consulta como ficticias.

## Tiempo previsto

Ciclo de 22 segundos: pregunta 0–3, consulta 3–6, agente 6–8, competencia 8–11, tu empresa 11–15, regreso 15–18, respuesta 18–22. Confeti 11,2–12,3. La ruta ya no cambia durante la animación.

## Verificación

- Compilación final, TypeScript y lint correctos. PostCSS validó ocho keyframes.
- Navegador a 320, 390, 937 y 1440 px: una conexión, una señal, dos opciones de empresa y ningún contenedor de empresa separado. Ningún texto de la escena sale de su contenedor; el hero no desborda.
- No, Sí y confeti observados. Pausa por teclado detiene las animaciones de ambas variantes; continuación conserva la fase.
- Después de los cambios de CSS en caliente se observó un desfase en el recorrido de vuelta. Se intentó comprobar la sincronización desde una carga completa, pero el navegador interno dejó de estar disponible. La aceptación del ciclo completo desde recarga queda pendiente; los keyframes de fuente definen las fases coordinadas indicadas arriba.
- Se solicitó abrir localhost mediante open_in_codex; el resultado quedó en cola para cuando se muestre el chat.
- Movimiento reducido y presentación estática conservados en CSS y estado inicial; no emulados directamente en esta revisión.

## Evidencia

- hero-dos-empresas-escritorio.jpg
- hero-dos-empresas-movil.jpg
- hero-dos-empresas-medidas.json
- hero-dos-empresas-retorno.json
- agent-scene-dos-empresas.tsx.reference
- agent-scene-dos-empresas.css.reference

No se modificaron APIs, formulario, MCP ni las demás secciones.
