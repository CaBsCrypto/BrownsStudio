# Reestructuración de la escena del hero

## Composición

Tres momentos separados: una pregunta de la persona, un agente compacto y una comparación entre dos empresas ficticias. La pregunta usa una burbuja; el agente, un núcleo circular con una señal orbital; la comparación diferencia una competencia discreta y una empresa con información preparada sobre servicios, cobertura y contacto.

El contenido ahora es HTML con tipografía nativa. Se retiraron los dos lienzos SVG duplicados, los textos escalados y el botón superpuesto por porcentajes. Los dos conectores son SVG locales, sin mediciones mediante JavaScript ni ramificaciones. El Sí está integrado en el contenido y conserva el diálogo con el CTA a `#analisis`.

## Movimiento

Ciclo continuo de 22 segundos: pregunta 0–3, señal al agente 3–5, consulta 5–8, señal a la comparación 8–10, foco en competencia 10–12, foco en la empresa preparada 12–18, retorno al agente 18–21 y reposo 21–22. Una señal sutil gira alrededor del agente. El confeti acompaña el ejemplo positivo y el diálogo abierto por la persona.

La pausa manual, la suspensión fuera de pantalla y al ocultar la pestaña permanecen en el controlador existente. El diálogo suspende la escena sin alterar la pausa manual. Sin JavaScript se ve el contenido completo y un Sí estático; con movimiento reducido el CSS desactiva señales, órbita y celebraciones.

## Verificación

- Compilación, lint y TypeScript correctos; las siete pruebas del controlador pasan.
- Revisión visual y mediciones en 320, 390, 937 y 1440 px: sin desbordes ni texto recortado en la escena. En el ancho menor las empresas se disponen verticalmente; en 390 px conservan la comparación en dos columnas.
- Observación de dos ciclos completos desde una recarga limpia: señales alternadas, foco azul de la empresa sincronizado y regreso al agente sin reiniciar el layout.
- Enter y Espacio, pausa/continuación, apertura del Sí, Escape, restitución del foco y CTA al mismo formulario comprobados en el navegador.
- La pausa manual permanece al cerrar el diálogo. Su CTA cierra, restaura los estilos del body y lleva el foco y la URL a `#analisis`.
- Movimiento reducido y contenido sin JavaScript revisados en código; no se emularon esas preferencias en el navegador.

## Archivos de evidencia

- `hero-historia-escritorio.jpg`
- `hero-historia-movil.jpg`
- `hero-historia-ciclos.json`
- `hero-historia-medidas.json`
- `agent-scene-historia.tsx.reference`
- `agent-scene-historia.css.reference`

El servidor local volvió a iniciarse en 5175. No se modificaron APIs, formulario, servicios ni otras secciones. La revisión de desbordes se limita a la escena; las cartas de servicios conservan la incidencia previa fuera de este alcance.
