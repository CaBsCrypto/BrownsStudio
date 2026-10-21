# Trazabilidad del snapshot de integración saneado — 2026-10-21

**Publicación: NO REALIZADA. Continuación: BLOCKED.** El usuario eligió conservar la rama exacta local y preparar otra rama saneada con trazabilidad. También ratificó mantener sin push mientras siga vigente no desplegar. Este documento registra procedencia y transformaciones; no autoriza publicación, PR, merge, deploy o cambios de configuración remota.

## Fuente, respaldo y relación Git

| Elemento | Referencia exacta | Función |
| --- | --- | --- |
| Fuente de código | `c5b62c9944bf3da4cce0c33d9d399d34fe23d48a` | Estado de `codex/preparar-landing-geo` en el worktree original `integracion-main` |
| Respaldo exacto local | `migracion/browns-integracion-20261021-8f42` en `f3601ee117617042710212f825859eee1fc08410` | Preserva la historia privada de integración y su paquete previo; no se publica |
| Nueva rama saneada | `migracion/browns-integracion-saneada-20261021-8f42` | Snapshot seleccionado en un commit nuevo |
| Único padre del nuevo commit | `3b377c899ef7191a5bd00e14e419fc6be8167385` | Ancestro ya alcanzable desde el remoto verificado |
| Principal conservada aparte | `migracion/browns-studio-20261021-8f42` en `a8411f0063bc4c036ca96796066e64093b65ff8b` | Incluye cuatro commits de publicación y seis modificaciones que este snapshot no incorpora |

El SHA del commit saneado se registra externamente después de crearlo y verificarlo; no se intenta incluir el SHA de este documento dentro de su propio commit. La comprobación debe confirmar exactamente un padre con el SHA indicado y que los commits privados de integración y el respaldo exacto no son ancestros de la rama saneada. No crear tags, merges o refs publicables que hagan alcanzable la historia privada.

Los tres commits inéditos de la fuente se conservan en el respaldo exacto local. La rama saneada es una transformación por snapshot: no equivale a conservar esos commits ni su orden, mensajes, autoría o hashes. Una referencia textual de procedencia no crea una relación de padres en Git.

## Cambios frente al snapshot de integración

El código de aplicación parte del estado `c5b62c9944bf3da4cce0c33d9d399d34fe23d48a`, conservando la separación de líneas de trabajo. Las diferencias autorizadas se limitan a documentación sanitizada, plantillas de entorno, fixture de demostración, exclusión de evidencias/reproducibles y manifiesto. Toda diferencia adicional detectada debe explicarse antes de aprobar la salida.

| Ruta o conjunto | Transformación y razón |
| --- | --- |
| Los 17 PNG nuevos de `landing-geo/.qa/` de la historia privada revisada | Excluidos del snapshot para evitar datos personales, metadata de sesión o referencias administrativas; las imágenes fuente de la aplicación no forman parte de esta exclusión |
| `landing-geo/.qa/VERCEL-CORREO.md` | Reemplazado completamente por resumen técnico sin identidad, contactos privados o identificadores administrativos |
| `landing-geo/.qa/INTEGRACION-PUBLICA.md` | Reemplazado completamente por resumen técnico sin datos de pruebas reales ni referencias administrativas |
| `README.md`, `landing-geo/README.md`, `operacion/lanzamiento.md` | Saneamiento de información operativa detectada en revisión adicional, con placeholders explícitos o datos sintéticos; se conserva la información técnica útil |
| `operacion/README.md`, `operacion/flujo-formulario.md` | Nombre de responsable sustituido por rol genérico; se conserva el flujo técnico y operativo útil |
| Referencias a los 17 PNG excluidos en otros documentos | Neutralizadas para no presentar evidencias ausentes como parte del paquete; la lista exacta de rutas y sus hashes de salida se registra en la tabla de salida final |
| `video-generator/reel-leads.json` | Identidad ambigua sustituida por `Persona de demostración` y `demo@example.invalid`, conservando esquema y resto de guiones |
| `video-generator/output/*.mp4` (ocho renders) | Excluidos del árbol actual por ser regenerables; sumaban aproximadamente 108 MB |
| `video-generator/temp-props-abogados-pro.json` | Excluido del árbol actual por ser temporal/regenerable |
| `.gitignore` | Se impide incorporar automáticamente capturas PNG de QA locales; no se cambia CI ni hosting |
| Plantillas de entorno | Regeneradas con nombres y valores vacíos; no se copian secretos ni `.env.local` |
| Documentos de migración e inventarios sanitizados | Adaptados a esta rama, al snapshot y al bloqueo de publicación ratificado; sin rutas privadas de usuario ni datos administrativos |
| `MANIFIESTO-MIGRACION.sha256` | Recalculado sobre la selección final; excluye su propio archivo y metadatos Git |

Los resúmenes QA no constituyen nuevas pruebas ni acreditan envío o entrega actual de correo. No conservar enlaces de evidencias excluidas como si fueran parte del paquete. Los informes históricos de seguridad e inventario describen la revisión de las fuentes originales; sus cifras no deben reinterpretarse como conteos del snapshot final. El informe externo debe registrar el alcance real y el resultado de la revisión de salida.

Son siete documentos fuente con datos personales saneados: los dos QA y los cinco README/documentos operativos indicados. La tabla final de rutas fuente saneadas y SHA-256 de sus versiones de salida debe añadirse después de aplicar todos los cambios y antes de calcular el manifiesto. Debe incluir también los documentos modificados únicamente para neutralizar referencias a evidencias excluidas, sin reproducir datos previos.

El código y las pruebas de la aplicación conservan los bytes exactos de la fuente de integración. Se mantiene el correo de CTA comercial intencional ya heredado de `origin`; también se mantiene el UUID claramente simulado de una prueba. No se modifican por confundir esos usos con datos personales de QA. La revisión independiente debe confirmar la equivalencia de código/pruebas y la lista completa de transformaciones fuera de ellos.

Las transformaciones heredadas de demo, plantillas y reproducibles evitan mantenerlos en el nuevo árbol, pero no purgan objetos anteriores ya alcanzables desde GitHub. El padre procede del historial remoto; no se reescribe la historia publicada.

## Preservación y límites

- La principal `a8411f0063bc4c036ca96796066e64093b65ff8b`, el respaldo exacto `f3601ee117617042710212f825859eee1fc08410`, los originales, índices y sus refs permanecen conservados.
- No se incorporan los cuatro commits y seis modificaciones de publicación a esta alternativa de integración.
- No se copian credenciales, valores de entorno, sesiones, caches, entornos instalados o metadata local de hosting.
- Las siete carpetas sueltas, el piloto con su dependencia de un hermano y el monitor siguen en la PC original según el inventario. Este snapshot no acredita su recuperación.
- No se ejecutan instalación, build, aplicación, pruebas del proyecto ni proveedores externos durante esta preparación.
- La revisión no garantiza ausencia absoluta de secretos o datos privados; requiere validar árbol y todos los nuevos objetos alcanzables, no sólo el último diff.

## Verificaciones que debe registrar el informe externo

Antes de declarar completa la preparación local, una revisión independiente debe confirmar:

1. Nombre exacto de rama, SHA nuevo, un solo padre y ausencia de la historia privada entre sus ancestros.
2. Los dos SHA de preservación sin cambios y los originales/índices sin alteraciones.
3. Árbol de código equivalente a la fuente indicada, salvo la lista documentada de transformaciones.
4. Exclusión de los 17 PNG, reemplazo íntegro de los dos documentos QA y saneamiento de documentación adicional; ausencia de referencias personales/administrativas salientes y de enlaces rotos a evidencias retiradas.
5. Plantillas vacías, fixture sintético, exclusión de reproducibles, manifiesto completo y hashes correctos sobre bytes LF.
6. Revisión de todos los commits, trees, blobs y mensajes nuevos alcanzables desde la rama saneada, tomando como frontera el remoto verificado.
7. Confirmación explícita de que no hubo push, PR, merge, deploy ni cambio de CI/hosting/permisos.

No declarar saneamiento completo o revisión independiente exitosa por la sola presencia de este documento. Los conteos y el resultado final se registran fuera del commit después de verificarlos.

## Bloqueo de publicación y continuidad

Vercel sigue enlazado y puede generar preview por push. La metadata observada muestra `GEMINI_API_KEY` para `preview` sin restricción de rama, sin leer su valor. El build raíz podría enviar `knowledge_base/*.md` a Gemini y consumir ambos servicios. El usuario decidió no hacer push mientras siga vigente no desplegar; la revisión de privacidad no altera esa instrucción.

No existe entrega remota verificada para este paquete. Después de autorización posterior, la publicación sólo se considera verificada si se comprueba la ref remota exacta y se recupera desde un clon nuevo de GitHub. En notebook deberán comprobarse SHA y manifiesto con `core.autocrlf=false`; instalación y pruebas requerirán autorización aplicable, datos sintéticos, servicios de prueba y validación con PC original apagada. La continuidad sigue BLOCKED hasta esos pasos.

## Selección exacta de documentos fuente saneados

La tabla registra únicamente las copias seleccionadas para este árbol, sin valores retirados. Se sustituyen contactos de pruebas por marcadores sintéticos, responsables personales por roles y datos administrativos por omisiones explícitas. También se neutralizan referencias a capturas excluidas cuando corresponda. Los archivos que sólo cambian enlaces mantienen su contenido técnico. Los hashes siguientes son de la salida saneada; el manifiesto incluye además el resto del árbol.

| Documento | SHA-256 de salida |
| --- | --- |
| `README.md` | `bc05633bfb3d16ff0c355e703826efbe017dcdde01730ba26aa3754e1f4ac711` |
| `landing-geo/.qa/HERO-ENERGIA-CONSULTA.md` | `38294033987a2d688d2a1f2f1ce0aa346829fdafe72c27cddd189884724eb120` |
| `landing-geo/.qa/INTEGRACION-PUBLICA.md` | `ed705ba2712baa8ab0d9f9a8d534d23ca02be61fda8db55fb866e13de7038e8c` |
| `landing-geo/.qa/VERCEL-CORREO.md` | `93510018f34347a75df1fafb86aeb2cb1f978477d218e448e407f0b14acca49d` |
| `landing-geo/README.md` | `f51b976e1e82fb7afe1b8caae306b7f1b4daf619c0a765c5269bde54aeb2004f` |
| `operacion/README.md` | `d084cd1924e783f433383ee673212d649a1e3af25226f0c899c2827c84c0cd3f` |
| `operacion/flujo-formulario.md` | `e8486b1d8732aa06a973c1615f3acd0167bc8d82f1b873af226139eaf81a7a78` |
| `operacion/lanzamiento.md` | `30d9846c9811af90f5c15e40bb244de8714bb39654462342a97d1b8eda2e6fad` |

## Evidencias retiradas del snapshot

Las 17 rutas siguientes son capturas de QA, no assets de ejecución ni fuentes de pruebas. Sus versiones originales y la historia completa quedan exclusivamente en las referencias locales de respaldo identificadas.

- `landing-geo/.qa/hero-energia-answer-movil.png`
- `landing-geo/.qa/hero-energia-company-movil.png`
- `landing-geo/.qa/hero-energia-consulta-escritorio.png`
- `landing-geo/.qa/integracion-1440.png`
- `landing-geo/.qa/integracion-320.png`
- `landing-geo/.qa/integracion-390.png`
- `landing-geo/.qa/integracion-937.png`
- `landing-geo/.qa/integracion-formulario-enviado.png`
- `landing-geo/.qa/integracion-preview.png`
- `landing-geo/.qa/integracion-resend-entregado.png`
- `landing-geo/.qa/resend-prueba-entregada.png`
- `landing-geo/.qa/vercel-correo-preparado.png`
- `landing-geo/.qa/vercel-firewall-activo.png`
- `landing-geo/.qa/vercel-firewall-verificado.png`
- `landing-geo/.qa/vercel-formulario-enviado.png`
- `landing-geo/.qa/vercel-limite-formulario.png`
- `landing-geo/.qa/vercel-resend-configurado.png`
