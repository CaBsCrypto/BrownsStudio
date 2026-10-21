# Hero agéntico — 2026-10-06

## Entrega

Hero de /direccion con mensaje y CTA conservados, dos columnas desde 1100 px y escena posterior al CTA por debajo de ese ancho. Escenario SVG/CSS azul oscuro con pregunta, agente, recursos de servicios/cobertura/contacto y núcleo empresarial. Secuencia única de nueve segundos; pausa, continuación y repetición explícita. Etiqueta de demostración y descripción accesible; gráficos decorativos aria-hidden. No ejecuta consultas, no modifica APIs ni añade dependencias.

El estado responde a IntersectionObserver, visibilitychange y prefers-reduced-motion. Las animaciones se suspenden conservando su posición al salir del viewport, ocultarse el documento o pausarse manualmente. Al completar se muestra una composición estática; regresar al inicio no reinicia el recorrido. La fuente HTML inicial también muestra esa composición sin JavaScript y no contiene controles inertes de animación.

Se usa overflow: clip en el panel para evitar que el foco del control desplace internamente el contenido y oculte la etiqueta. Se reubicó Contacto para evitar superposición con el nombre de la empresa.

## Verificado

- Compilación Next/TypeScript y ESLint: correctos.
- npm run test:scene: cinco pruebas correctas para entrada al viewport, suspensión por viewport/documento oculto, pausa manual persistente, final sin repetición automática y movimiento reducido.
- Navegador interno: reproducción y final, repetición por botón, pausa mediante Enter, persistencia de pausa manual al navegar a Servicios y volver, suspensión al abandonar el viewport y final al regresar. La primera espera de final fue demasiado breve para la secuencia; una observación posterior confirmó Volver a ver y ausencia de reproducción.
- Anchos 320, 390, 937 y 1440 px: sin desbordamiento horizontal de la página; controles, texto y recursos legibles. Los elementos de fondo que exceden el panel quedan recortados intencionalmente. El CTA precede a la escena en móvil y lleva a #analisis; verificado con navegación real y foco en el formulario.
- En 1440 y 390 px se guardaron capturas: hero-agente-escritorio.jpg y hero-agente-movil.jpg. La captura de escritorio incluye la etiqueta visible y el estado final. El panel ya no se desplaza internamente al enfocar controles.
- HTTP local: 200; HTML contiene data-animated=false/data-playing=false, Demostración ilustrativa e Información pública consultable, sin botones de animación en el render de servidor.

## Límites de las comprobaciones

El navegador disponible no ofrece emulación de prefers-reduced-motion ni desactivación de JavaScript. La presentación estática se comprobó en el HTML entregado; el cambio de preferencia y la suspensión por documento oculto se comprobaron con pruebas del estado real usado por el componente y revisión de CSS/listeners. Ocultar visualmente el navegador interno mediante su capability no cambia document.hidden, por lo que ese intento no se contabiliza como prueba de pestaña oculta.

Durante la revisión se reinició el entorno de navegador y el servidor previo dejó de estar disponible. Se volvió a iniciar Next en 127.0.0.1:5175 y se abrió una nueva pestaña válida para completar las pruebas. No se modificó una configuración de producción ni se publicaron cambios externos.
