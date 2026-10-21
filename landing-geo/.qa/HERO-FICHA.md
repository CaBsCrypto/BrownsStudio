# Hero: consulta a una ficha pública — 2026-10-07

Este registro sustituye la evidencia de la anterior escena de cubos en HERO-AGENTE.md. El contenido y la interpretación fueron revisados por UX, diseño visual y arquitectura.

## Entrega

Pregunta explícita → Agente IA consulta → ficha pública con servicios, cobertura y contacto. Ejemplo ficticio visible, sin recomendaciones ni respuesta real de IA. Campos completos desde HTML inicial, sin enlaces comerciales nuevos. Dos conectores SVG locales en slots del grid, sin medir centros DOM ni ResizeObserver. El ancho del componente controla el cambio a 620 px. En ancho amplio la pregunta ocupa la fila superior y debajo el agente conecta lateralmente con la ficha; en ancho estrecho todos se apilan.

Ciclo CSS compartido 18 s: persona0–4, agente4–7, servicios7–9⅓, cobertura9⅓–11⅔, contacto11⅔–14, ficha14–17, reposo17–18. Solo bordes/halos/pulsos; nodos quietos. Limpieza de estados finish/run/complete y reglas CSS anteriores. APIs, formulario, servicios y demás secciones conservados.

## Comprobado

- Compilación de producción/TypeScript y lint aprobados tras los ajustes finales.
- CSS analizado con PostCSS: 236 declaraciones, sin valores vacíos.
- Siete pruebas de ciclo de vida: SSR estático, entrada visible, pestaña oculta, pausa manual, persistencia y movimiento reducido.
- Navegador interno disponible en la pestaña de localhost. Dos ciclos completos muestreados durante38 s tras carga limpia: persona → agente → servicios → cobertura → contacto → ficha → reposo; sin resaltados simultáneos de campos.
- Una recarga parcial de estilos durante desarrollo desincronizó las animaciones. La carga limpia resolvió ese estado de HMR; repetir la verificación desde recarga completa tras editar estilos.
- Revisión visual/geométrica a320,390,937,1280y1440px. La escena sin desborde y todos los datos visibles. A1280 la escena mide594px y se apila, independientemente del viewport. A937 usa la composición amplia.
- Conectores: pregunta.bottom=query.top, query.bottom=agent.top, source ocupa la altura del agente y alcanza el borde de ficha. Sin ramas ni carriles superpuestos.
- Control por Enter/Space y pausa manual persistente. Pausa automática comprobada tras terminar desplazamiento fuera de pantalla (figura bottom−343.75, data-playing=false); al volver data-playing=true.
- CTA móvil anterior a figura (390px: CTAy422.7, figuray512.7).
- HTTP200: pregunta, fuente y data-animated=false presentes en HTML; sin botón de animación inicial.
- Capturas finales: escena-ficha-escritorio.jpg y escena-ficha-movil.jpg.

## Límites de esta verificación

El navegador no ofrece emulación de movimiento reducido ni desactivación de JavaScript. Esos casos se verificaron mediante estados, CSS y HTML inicial, no mediante capturas con esas opciones. La pestaña oculta está cubierta por pruebas del estado y el listener document.hidden, sin afirmar una prueba visual real de cambio de pestaña.

Hay un desborde preexistente de las cartas de servicios en móvil, fuera de esta escena: a390px las cartas miden382.5px por min-height680+aspect-ratio9/16, mientras el ancho útil de la página es375px y scrollWidth403. No se modificó esa sección, conforme al alcance. A320 también persiste; la escena se mantiene dentro del viewport. La verificación de la escena no acredita ausencia global de desbordes en la landing.
