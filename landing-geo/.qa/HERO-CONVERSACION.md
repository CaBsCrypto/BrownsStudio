# Hero: conversación y fuente pública

Revisión local: 7 de octubre de 2026. Esta composición sustituye la ficha del intento anterior.

## Resultado

- Pregunta por un servicio dentro de un chat genérico.
- Empresa como fuente pública preparada con GEO, con profundidad y esfera orbital.
- Consulta de servicio, cobertura y contacto: cada borde destaca a su turno.
- Dos carriles cortos representan consulta y retorno; después destaca la respuesta del chat.
- Ciclo continuo de 24 segundos. Los datos siempre están presentes; la animación ilustra su consulta.
- Ejemplo ficticio identificado. No hay llamadas a IA, integración con marcas, recomendaciones ni resultados reales.
- Cambio limitado a AgentScene.tsx y AgentScene.module.css. Formulario, APIs y demás secciones conservados.

## Comprobaciones

- Compilación final, lint y TypeScript correctos. Las 7 pruebas del estado de reproducción pasan.
- HTTP 200 en localhost:5175; pregunta, empresa y respuesta vienen en el HTML inicial con animación desactivada.
- Revisados anchos de viewport de 320, 390, 937, 1280 y 1440 px. La escena cabe en su contenedor, sin texto cortado ni cruces entre chat y fuente.
- Órbita móvil corregida: max-width global restringía el SVG antes de aplicar su escala. Ahora el sistema de coordenadas se conserva. La esfera tiene una capa propia para permanecer visible sobre la empresa.
- Observados más de 48 segundos: pregunta → consulta → servicio → cobertura → contacto → retorno → respuesta → siguiente ciclo. Foco y señales comparten la misma duración CSS.
- Pausa con Enter: offset orbital permanece idéntico después de 1,5 segundos. Continuación con Space; foco visible comprobado.
- Al navegar fuera del hero, reproducción suspendida; al volver, se reanuda.
- Movimiento reducido y pestaña oculta cubiertos por reducer y reglas CSS. La herramienta del navegador no ofrece emulación de esas condiciones; no se afirma una prueba visual real de ambas.
- Sin JavaScript: contenido y estado inicial verificados en HTML; no se desactivó JavaScript en el navegador.

## Capturas

- hero-conversacion-escritorio.jpg
- hero-conversacion-movil.jpg
- hero-conversacion-movil-fuente.jpg

## Fuera del cambio

La página completa conserva un desborde anterior en las cartas de servicios a algunos anchos. La escena nueva cabe en su ancho disponible; no se modificaron esas cartas dentro de este trabajo del hero.
