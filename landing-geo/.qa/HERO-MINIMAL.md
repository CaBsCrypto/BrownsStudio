# Escena compacta y minimalista

La lógica se conserva: pregunta de una persona, consulta del agente, paso junto a la competencia sin información y llegada a Tu empresa preparada con GEO. El ciclo sigue durando 18 segundos y el Sí mantiene el diálogo y el CTA a `#analisis`.

Se redujeron el marco máximo de 560 a 460 px, el agente de 60 a 44 px, el carril lateral de 60 a 44 px, los espacios, radios y sombras. Las empresas ahora son filas compactas con nombre, una explicación y estado. Se retiraron los iconos de edificios, la lista de tres datos y el resumen repetido del recorrido. La preparación de información y la naturaleza ficticia del ejemplo siguen explícitas.

El carril utiliza variables compartidas: centro del agente a 22 px, rótulo de internet de 28 px y separación de estaciones de 12 px. La entrada a Tu empresa está al 50 % de su altura real, sin coordenadas medidas mediante JavaScript. Los puntos tienen 5 × 5 px. El botón Sí conserva 44 px de alto como área táctil.

## Comprobaciones

- Compilación, lint, TypeScript y siete pruebas existentes del controlador correctos.
- Altura de la escena: 426 px a 1440, 937 y 390 px; 477 px a 320 px. La versión anterior medía 675 px en escritorio y 758 px en 390 px.
- Sin texto desbordado dentro de la escena en los cuatro anchos. Inicio, relevo entre tramos y entrada a Tu empresa alineados, con diferencia medida de 0 px.
- Dos ciclos completos a 320 px: señal circular, competencia sin animación, llegada al centro de la empresa y foco azul sincronizado.
- Pausa por Enter, continuación por Espacio, apertura del Sí y cierre por Escape comprobados. Todas las señales se pausan juntas.
- El controlador conserva suspensión al salir de pantalla, pestaña oculta, movimiento reducido y estado inicial estático. Estas condiciones están cubiertas por sus pruebas; no se emularon las preferencias del sistema ni JavaScript desactivado en navegador en esta revisión.

Capturas: `hero-minimal-escritorio.png` y `hero-minimal-movil.png`. Mediciones y ciclos: `hero-minimal-medidas.json` y `hero-minimal-ciclos.json`.

No se modificaron APIs, formulario, servicios ni otras secciones. La incidencia previa de desborde horizontal en las cartas de servicios queda fuera de la revisión de la escena.
