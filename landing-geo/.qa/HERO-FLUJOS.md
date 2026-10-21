# Hero: recuperar los nodos y los flujos

Revisión local: 7 de octubre de 2026.

## Decisión visual

Se reconstruyó la composición de las capturas hero-agente-escritorio.jpg y hero-agente-movil.jpg: pregunta independiente, agente azul, empresa tridimensional y tres piezas flotantes. Se conserva el fondo claro solicitado. No existía una copia del código original; no se presenta como una restauración exacta.

La tarjeta de conversación de la versión anterior fue sustituida por la red. Servicios, cobertura y contacto muestran datos ilustrativos y reciben una señal y un borde durante su consulta. Un carril separado vuelve al agente; una pieza pequeña indica la información recibida. El ejemplo sigue identificado como ficticio, sin consultas reales ni resultados comerciales.

## Implementación

Los nodos, textos y recorridos comparten coordenadas SVG. Hay dos geometrías: escritorio 600 × 460 y móvil 320 × 576. El cambio se decide por ancho del componente. El layout oculto mantiene su animación mediante visibility, para conservar la fase al cambiar de ancho. No hay mediciones DOM ni ResizeObserver.

Lectura y señales: ciclo de 24 segundos. Esfera orbital: 48 segundos. Pausa manual, suspensión fuera de pantalla y por pestaña oculta conservadas. Sin cambios en APIs, formulario, servicios ni otras secciones.

## Verificación

- Compilación final, TypeScript y lint correctos. Las siete pruebas de reproducción pasan.
- Revisados anchos 320, 390, 937 y 1440 px. Tras corregir dos textos móviles, todas las etiquetas de las piezas quedan dentro de sus placas en 320 y 390 px.
- El hero mide aproximadamente 646 px de alto a 320 y 757 px a 390; la composición de conversación anterior superaba 970 px.
- Observados más de 48 segundos: pregunta → agente → consulta → servicios → cobertura → contacto → retorno → información recibida, con repetición y bordes sincronizados.
- Pausa con Enter y continuación con Space. Durante la pausa, ambas órbitas conservaron exactamente 65.4174 % al pasar de escritorio a móvil; ambas estaban en animation-play-state: paused.
- HTML inicial entregado en localhost con información completa y data-animated=false.
- Pestaña oculta y movimiento reducido: verificados mediante pruebas del reducer y reglas CSS. No se simuló visualmente esas condiciones ni se desactivó JavaScript en el navegador.
- El ancho temporal del navegador se restableció al terminar; localhost queda abierto.

## Referencias guardadas

- hero-flujos-escritorio.jpg
- hero-flujos-movil.jpg
- agent-scene-flujos.tsx.reference
- agent-scene-flujos.css.reference

La aceptación visual se limita al hero. El desborde anterior de cartas de servicios en algunos tamaños permanece fuera de este cambio.
