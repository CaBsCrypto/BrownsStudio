# Hero: datos para responder

Revisión local: 2026-10-07, http://localhost:5175/#inicio.

## Narrativa

Tres nodos y dos carriles: una persona pregunta por mantención de oficinas en Santiago, el agente consulta información pública y comprueba tres casos ficticios dentro de su mismo panel. Empresa A: falta el servicio (No). Empresa B: falta la cobertura (No). Tu empresa: datos disponibles (Sí). Una sola señal regresa por los mismos carriles y destaca la información de vuelta en el chat.

El bloque de empresa conserva su cubo con profundidad y agrupa Servicios, Cobertura y Contacto. El sí se refiere a información disponible en el ejemplo. La nota visible dice: «Empresas y consulta ficticias. Preparar información no garantiza aparecer en una IA». No hay búsquedas reales, recomendaciones, clasificaciones ni operaciones de MCP.

## Movimiento

Ciclo de 30 segundos: pregunta 0–3, consulta al agente 3–6, agente 6–8, consulta a la fuente 8–10, comprobación A 10–13, B 13–16, datos disponibles 16–20, retorno al agente 20–23, agente 23–24, vuelta al chat 24–27, información de vuelta 27–30. Los carriles cambian solo con la señal oculta. Los textos permanecen visibles en la composición estática.

## Verificación

- Compilación de producción, TypeScript y lint correctos. El último ajuste posterior a compilación cambia únicamente el color del texto de los checks a blanco para mejorar su contraste.
- CSS: ocho keyframes válidos según PostCSS; se conservaron las reglas de pausa y movimiento reducido.
- Navegador a 320, 390, 937 y 1440 px: tres nodos, dos carriles, una señal en la variante visible; ningún texto de la escena sale de su contenedor y el hero no desborda. CTA anterior a la escena en los tamaños apilados.
- Un ciclo completo observado: A → B → datos disponibles, seguido de vuelta por los dos carriles y repetición del ciclo.
- Enter pausa; Espacio continúa. Los 16 elementos animados de ambas variantes quedan pausados. Foco visible de 2 px; pausa conservada al cambiar el ancho y desplazarse.
- Movimiento reducido y presentación sin JavaScript se conservan por las reglas CSS y el estado inicial estático; no se emularon directamente en el navegador en esta revisión.

## Evidencia

- hero-consulta-disponible-escritorio.jpg
- hero-consulta-disponible-movil.jpg
- hero-consulta-disponible-medidas.json
- hero-consulta-disponible-ciclo.json
- agent-scene-consulta-disponible.tsx.reference
- agent-scene-consulta-disponible.css.reference

No se modificaron las demás secciones, APIs, formulario ni MCP. La revisión de desbordes se limita al hero.
