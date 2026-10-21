# Recorrido directo a la empresa preparada

La persona pregunta «¿Quién ofrece este servicio en Chile?». El agente consulta información pública y la señal llega directamente a «Tu empresa», sin detenerse en la competencia. La competencia ficticia conserva el estado «No» y no se anima. La empresa preparada muestra qué ofrece, dónde atiende y cómo contactarla; el Sí conserva la invitación al mismo formulario.

## Movimiento y conexiones

Ciclo continuo de 18 segundos: pregunta 0–2, señal al agente 2–4, agente 4–6, señal a la empresa 6–8, foco azul y celebración discreta 8–14, retorno 14–17 y reposo 17–18. Las piezas permanecen visibles.

El conector es local: sale del centro del agente, pasa sobre la competencia y termina en el centro superior de la empresa preparada. En el ancho menor, la empresa preparada va primero y la competencia queda debajo, fuera de la ruta. La señal es un punto HTML de 6 × 6 px; su movimiento usa las dimensiones del propio conector y sigue la línea SVG, sin mediciones JavaScript. Así conserva la forma circular en móvil.

La preparación con GEO se presenta como información pública consultable en una demostración ficticia, sin atribuir recomendaciones, posiciones ni resultados comerciales.

## Verificación

- Compilación, lint, TypeScript y las siete pruebas existentes del controlador correctos.
- Mediciones a 320, 390, 937 y 1440 px: textos sin desbordes dentro de la escena; inicio centrado en el agente y fin centrado en la empresa con diferencia menor de 0,01 px. La ruta termina justo en el borde superior de la empresa.
- Dos ciclos completos observados en móvil: señal circular de 6 × 6 px, competencia sin animación, llegada y retorno continuos, foco azul sincronizado.
- Pausa con Enter, continuación con Espacio, apertura del Sí, Escape y restitución del foco comprobados. La pausa manual se conserva al cerrar la invitación.
- El CTA de la invitación cierra el diálogo y lleva la URL y el foco a `#analisis`.
- Movimiento reducido, suspensión al ocultar pestaña o salir de pantalla, y render inicial estático conservan el controlador existente. Hay cobertura de estados en las siete pruebas; las preferencias y JavaScript desactivado no se emularon en navegador en esta revisión.

Capturas: `hero-directo-escritorio.jpg` y `hero-directo-movil.jpg`. Mediciones y muestras del ciclo en `hero-directo-medidas.json` y `hero-directo-ciclos.json`.

No se modificaron formulario, APIs, servicios ni otras secciones. La incidencia previa de desborde horizontal de las cartas de servicios queda fuera de esta revisión de la escena. El servidor queda abierto en `http://localhost:5175/#inicio`.
