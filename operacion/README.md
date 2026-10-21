# Operación de Browns Studio

Estado: preparación local y validación piloto. No habilita ventas ni acredita un mes de mantención cumplido.

## Oferta y material de trabajo

- [Fichas de Inicio, Avanzado y Continuidad](servicios.md).
- [Análisis gratuito](plantillas/analisis-gratuito.md).
- [Propuesta comercial](plantillas/propuesta.md).
- [Aceptación y entrega](plantillas/aceptacion.md).
- [Informe de mantención y evolución](plantillas/informe-mensual.md).
- [Registro de tiempo](registro-tiempo.csv) y [cupos](cupos.csv). Comenzar vacíos; registrar tiempos reales, nunca estimaciones como trabajo realizado.
- [Estado y puertas de lanzamiento](lanzamiento.md).
- [Implementación por plataforma y página](implementacion-web.md).
- [Flujo del formulario y ubicación de los datos](flujo-formulario.md).

## Capacidad y recorrido

Responsable: Responsable de operación. Capacidad inicial: cinco horas semanales; una implementación activa y hasta dos clientes piloto activos. Distribución orientativa: 2 h de implementación, 1 h de análisis/venta y 2 h de soporte, pruebas y mantención. Las horas de evolución salen de la capacidad disponible, no se suman a las cinco horas.

Antes de prometer una fecha, sumar trabajo comprometido, mantención de ambos clientes y contingencia. Si no cabe, ofrecer el siguiente cupo; no acelerar mediante reducción de pruebas. La demostración propia también consume capacidad. Las estimaciones se anotan en la propuesta, los tiempos reales en el registro.

1. Recibir URL y correo. Registrar la solicitud en un archivo local protegido, confirmar recepción efectiva y posibilidad de revisión. El formulario no crea un análisis automáticamente.
2. Confirmar una revisión inicial de un dominio y seleccionar sus recursos públicos prioritarios. No anunciar todavía un número fijo de páginas o hallazgos. Límite interno de una hora, incluidas revisión y redacción: registrar qué se revisó y qué quedó fuera. No pedir accesos privados ni inventar oportunidades para completar el formato.
3. Registrar URL inicial, destino de redirección, origen de las pruebas generales, páginas, configuración y fecha del escaneo. Usar el perfil que corresponda a web informativa; requisitos de API, autenticación y comercio pueden no aplicar.
4. Entregar resumen por correo usando la plantilla, con hallazgos verificados, inconclusos y no aplicables separados. Confirmar fecha según cupo, sin plazo fijo anunciado todavía.
5. Recomendar el servicio mínimo suficiente. Puede ser ninguna implementación, Inicio o una futura evaluación Avanzado. Un cero del escáner no justifica por sí solo una integración.
6. Cotizar antes de acceder o cambiar recursos. La propuesta fija alcance, pruebas, responsabilidades, implementación, mensualidad y costos externos. Elegir los valores con tiempos medidos del piloto; la plantilla vacía no debe enviarse como propuesta final.
7. Crear respaldo y plan de reversión, implementar, probar y entregar evidencia. La aceptación resuelve defectos del trabajo contratado sin consumir evolución.
8. Mantener un informe por mes. Toda ampliación se estima y acuerda antes de realizarla. El cliente puede permanecer en Inicio; Continuidad sustituye su mensualidad de mantención.

## Soporte y datos

Canal: contacto@browns.studio. Revisar correo en días hábiles y acusar recibo dentro de dos días hábiles. Separar respuesta inicial de resolución; comunicar diagnóstico, dependencia y próxima actualización. Sin atención 24/7 ni plazo universal de reparación.

Guardar solicitudes, propuestas y evidencias privadas fuera de repositorios públicos, public/, la fuente consultable y logs del Worker. Usar un identificador interno en los registros CSV, sin correo ni contraseñas. No registrar cuerpos de solicitudes ni consultas de clientes en logs. El cliente entrega credenciales por un canal seguro acordado, nunca por el formulario público.

Para producción, cuentas y recursos del cliente mantienen su titularidad; Browns recibe los permisos mínimos acordados. Registrar quién aprueba los hechos y las reglas de acceso. La entrega incluye recursos, ubicación, configuración, contactos responsables y pasos de reversión.

## Uso del escáner

Es una referencia externa, no la oferta completa ni un certificado de aparición en IA. Reportar fecha y configuración junto con cualquier puntaje. No comparar resultados obtenidos con perfiles distintos como si fueran equivalentes. No crear OAuth, API, MCP o Skills ficticios para obtener puntos.

No atribuir a Browns una certificación o relación comercial con Cloudflare. Si el escáner falla, conservar el error como inconcluso y contrastar con HTTP, negociación de contenido y consultas MCP propias. No enviar datos privados al escáner.

Fuentes: [comprobaciones de Cloudflare](https://blog.cloudflare.com/agent-readiness/), [buenas prácticas MCP](https://developers.cloudflare.com/agents/model-context-protocol/).

> Nota de migración saneada (2026-10-21): las referencias administrativas y personales omitidas y las capturas excluidas se conservan en la copia exacta local. Las comprobaciones descritas son históricas y no se repitieron al preparar esta copia.
