# Empresas como estaciones en el recorrido

La pregunta llega al agente, que envía una señal hacia la información pública en internet. Las empresas ahora son dos estaciones sucesivas junto al carril. La competencia ficticia permanece gris, con una conexión discontinua que se detiene antes de entrar. La señal pasa de largo y continúa hasta el puerto de Tu empresa; allí se ilumina el borde y se conserva el Sí que abre la invitación al análisis.

La composición utiliza filas completas en lugar de la comparación en columnas. El agente, el carril y las estaciones comparten la misma alineación lateral. Internet es un rótulo del recorrido, sin añadir otro nodo o tarjeta. La representación sigue identificada como demostración ilustrativa y consulta ficticia, sin garantizar recomendaciones o apariciones.

## Geometría y movimiento

El grid asigna una celda a cada tramo lateral y otra a cada empresa. Las filas se adaptan al texto. El primer tramo cubre el rótulo de internet, la competencia y el espacio entre estaciones. El segundo gira hacia el puerto izquierdo de Tu empresa. Las señales son puntos HTML de 6 × 6 px con tiempos sincronizados; no hay mediciones DOM para dibujar rutas.

Ciclo de 18 s: pregunta 0–2, llegada al agente 2–4, consulta 4–6, paso junto a competencia 6–7,4, llegada a Tu empresa 7,4–8, foco 8–14, regreso 14–17 y reposo 17–18. El puerto de la competencia queda inactivo durante todo el ciclo.

## Verificación

- Compilación, lint, TypeScript y siete pruebas del controlador correctos.
- Revisión a 320, 390, 937 y 1440 px: sin texto desbordado dentro de la escena; relevo entre tramos y llegada al borde de la empresa con diferencia de 0 px. El inicio queda alineado al anillo del agente, con un ajuste de 0,25 px en 320 px.
- Dos ciclos completos comprobados en navegador: señal circular, empresa activa sincronizada y competencia sin animación.
- Pausa por Enter, continuación por Espacio, apertura del Sí, Escape y restitución del foco comprobados. Todas las señales se pausan juntas. La pausa manual permanece tras cerrar el diálogo.
- El formulario y el diálogo conservan su comportamiento y CTA anterior a `#analisis`.
- Movimiento reducido, suspensión fuera de pantalla o con pestaña oculta y render estático conservan el controlador existente, cubierto por sus pruebas. No se emularon preferencias de sistema ni JavaScript desactivado en esta revisión.

Capturas: `hero-camino-escritorio.png` y `hero-camino-movil.png`. Mediciones y muestras de ciclos: `hero-camino-medidas.json` y `hero-camino-ciclos.json`.

No se modificaron APIs, formulario, servicios ni otras secciones. La incidencia previa de desborde horizontal de las cartas de servicios queda fuera de la revisión de la escena.
