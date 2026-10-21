# Mini estación 3D de búsqueda para agentes

La escena representa la pregunta de una persona, la consulta de un agente a información pública y la llegada de una señal a Tu empresa. La competencia es una estación gris con datos faltantes dentro del ejemplo ficticio. No muestra una respuesta real ni garantiza apariciones, recomendaciones o posiciones.

## Presentación

- Figura sin marco exterior grande: ancho máximo 360 px en escritorio y 320 px en móvil. Pregunta de 238 px; etiqueta de competencia de 100–110 px y pieza interactiva Tu empresa de 120–130 px.
- Modelo procedural de Three.js r180, ya instalado. Cámara ortográfica fija, geometrías redondeadas, luz clara y sombras suaves de contacto. Sin assets descargados ni dependencias nuevas.
- Tres estaciones: esfera de agente sobre pedestal, bloque gris de competencia y edificio blanco/azul de Tu empresa. Un único mesh de señal comparte la entrada, órbita, carril y llegada.
- Textos y controles en HTML. La pieza Tu empresa completa abre el diálogo existente; su CTA conserva `#analisis`.
- Ciclo de 18 s: pregunta 0–4, consulta 4–8, búsqueda 8–10, llegada 10–14, retorno 14–17 y reposo 17–18. La fase de llegada mantiene su etiqueta durante el retorno.
- Three.js se importa al entrar en pantalla. DPR limitado a 1,5, sin mapas de sombras. La pausa detiene el bucle del renderer. Se liberan geometrías, materiales, texturas, observadores, listeners, canvas y renderer al desmontar.
- Un SVG estático y los mismos textos se renderizan desde servidor. Se conservan ante carga pendiente, fallo o ausencia de WebGL. Movimiento reducido muestra una composición completa sin bucle continuo.

## Comprobaciones realizadas

- Compilación final, TypeScript, lint y siete pruebas existentes del controlador: correctos.
- Navegador a 320, 390, 937 y 1440 px: WebGL funcionando, textos completos, pregunta y etiqueta de competencia sin superposición, controles de al menos 44 px. Altura de 385 px; anchos medidos 273, 320, 360 y 360 px.
- Se corrigió el desborde previo de ServiceCards fijando el ancho de cada carta al espacio disponible. Ancho de documento igual al viewport en los cuatro tamaños.
- 37,7 s de observación: dos ciclos, las cuatro fases, un canvas único y estado de renderer ready en todas las muestras.
- Pausa por Enter y continuación por Espacio. Dos capturas completas, después de terminar el desplazamiento suave, son idénticas durante la pausa.
- Apertura de la invitación por teclado y clic; suspensión con el diálogo abierto; cierre por Escape y devolución de foco a Tu empresa.
- CTA del diálogo cierra la invitación, enfoca el formulario y pausa el modelo fuera de pantalla. Al volver al inicio, la reproducción continúa.
- El SVG y los textos están presentes en el HTML compilado del servidor. Movimiento reducido, pestaña oculta y estado inicial estático están cubiertos por las pruebas del controlador. No se emularon preferencias del sistema, JavaScript desactivado ni WebGL no disponible en esta revisión del navegador.
- Las capturas responsive corresponden al navegador de escritorio con viewport ajustado; no son una prueba de rendimiento en un teléfono físico. No se midieron fps o memoria GPU.

Capturas: `hero-agent-search-3d-escritorio.png` y `hero-agent-search-3d-movil.png`. Medidas: `hero-agent-search-3d-medidas.json`. Observación del ciclo: `hero-agent-search-3d-ciclos.json`.

No se modificaron APIs, formulario, recepción de solicitudes, MCP ni publicación.
