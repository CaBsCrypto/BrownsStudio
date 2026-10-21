# Trazabilidad del snapshot de integración saneado — 2026-10-21

**Publicación: AUTORIZADA; verificación pendiente. Continuación: NOT VERIFIED.** El usuario eligió conservar la rama exacta local y preparar otra rama saneada con trazabilidad. La autorización del 2026-10-21 permite agregar `vercel.json` en la raíz de ambas ramas, actualizar documentos/manifiestos, crear esos commits y publicar únicamente `migracion/browns-studio-20261021-8f42` y `migracion/browns-integracion-saneada-20261021-8f42` en el repositorio existente. No autoriza builds, despliegues, llamadas a Gemini, cambios en `main`, PR, merge ni cambios de configuración remota. El respaldo exacto permanece sólo local.

## Fuente, respaldo y relación Git

| Elemento | Referencia exacta | Función |
| --- | --- | --- |
| Fuente de código | `c5b62c9944bf3da4cce0c33d9d399d34fe23d48a` | Estado de `codex/preparar-landing-geo` en el worktree original `integracion-main` |
| Respaldo exacto local | `migracion/browns-integracion-20261021-8f42` en `f3601ee117617042710212f825859eee1fc08410` | Preserva la historia privada de integración y su paquete previo; no se publica |
| Rama saneada de entrega | `migracion/browns-integracion-saneada-20261021-8f42` | Snapshot seleccionado más un commit posterior de exclusión y documentación |
| Commit de snapshot saneado | `db943aa1954c3c5eb1cd92725b1a53b34ab7b180` | Punto revisado anterior al commit de exclusión |
| Único padre del commit de snapshot | `3b377c899ef7191a5bd00e14e419fc6be8167385` | Ancestro ya alcanzable desde el remoto verificado |
| Principal conservada aparte | `migracion/browns-studio-20261021-8f42`, punto previo a exclusión `a8411f0063bc4c036ca96796066e64093b65ff8b` | Incluye cuatro commits de publicación y seis modificaciones que este snapshot no incorpora; recibe su propio commit posterior de exclusión/documentación |

El SHA final de entrega se registra externamente después de crear y verificar el commit de exclusión; no se intenta incluir el SHA de este documento dentro de su propio commit. La comprobación debe confirmar que db943aa tiene exactamente el padre remoto indicado, que el nuevo tip desciende de db943aa mediante el commit de exclusión y que los commits privados de integración y el respaldo exacto no son ancestros de la rama saneada. Frente a la frontera remota previa a esta publicación, la alternativa tiene dos commits salientes: snapshot y exclusión/documentación. No crear tags, merges o refs publicables que hagan alcanzable la historia privada.

Los tres commits inéditos de la fuente se conservan en el respaldo exacto local. La rama saneada es una transformación por snapshot: no equivale a conservar esos commits ni su orden, mensajes, autoría o hashes. Una referencia textual de procedencia no crea una relación de padres en Git.

## Cambios frente al snapshot de integración

El código de aplicación parte del estado `c5b62c9944bf3da4cce0c33d9d399d34fe23d48a`, conservando la separación de líneas de trabajo. Las diferencias autorizadas se limitan a documentación sanitizada, plantillas de entorno, fixture de demostración, exclusión de evidencias/reproducibles, exclusión de despliegues automáticos para los dos nombres exactos y manifiesto. Toda diferencia adicional detectada debe explicarse antes de aprobar la salida.

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
| `.gitignore` | Se impide incorporar automáticamente capturas PNG de QA locales; este cambio no altera CI ni hosting |
| `vercel.json` en la raíz | `git.deploymentEnabled` fija `false` para los dos nombres exactos autorizados; no se modifica configuración remota ni el workflow |
| Plantillas de entorno | Regeneradas con nombres y valores vacíos; no se copian secretos ni `.env.local` |
| Documentos de migración e inventarios sanitizados | Adaptados a esta rama, al snapshot y a la publicación limitada autorizada con exclusión; sin rutas privadas de usuario ni datos administrativos |
| `MANIFIESTO-MIGRACION.sha256` | Recalculado sobre la selección final; excluye su propio archivo y metadatos Git |

Los resúmenes QA no constituyen nuevas pruebas ni acreditan envío o entrega actual de correo. No conservar enlaces de evidencias excluidas como si fueran parte del paquete. Los informes históricos de seguridad e inventario describen la revisión de las fuentes originales; sus cifras no deben reinterpretarse como conteos del snapshot final. El informe externo debe registrar el alcance real y el resultado de la revisión de salida.

Son siete documentos fuente con datos personales saneados: los dos QA y los cinco README/documentos operativos indicados. La tabla final de rutas fuente saneadas y SHA-256 de sus versiones de salida aparece al final de este documento. Incluye también el documento modificado únicamente para neutralizar referencias a evidencias excluidas. El resumen QA de correo recibe además una actualización del alcance autorizado; su hash se actualiza en esa tabla sin reproducir datos previos.

El código y las pruebas de la aplicación conservan los bytes exactos de la fuente de integración. Se mantiene el correo de CTA comercial intencional ya heredado de `origin`; también se mantiene el UUID claramente simulado de una prueba. No se modifican por confundir esos usos con datos personales de QA. La revisión independiente debe confirmar la equivalencia de código/pruebas y la lista completa de transformaciones fuera de ellos.

Las transformaciones heredadas de demo, plantillas y reproducibles evitan mantenerlos en el nuevo árbol, pero no purgan objetos anteriores ya alcanzables desde GitHub. El padre procede del historial remoto; no se reescribe la historia publicada.

## Preservación y límites

- Los puntos revisados previos `a8411f0063bc4c036ca96796066e64093b65ff8b` y `db943aa1954c3c5eb1cd92725b1a53b34ab7b180` se conservan como ancestros de sus respectivos nuevos tips. El respaldo exacto `f3601ee117617042710212f825859eee1fc08410`, los originales, índices y sus refs permanecen sin cambios.
- No se incorporan los cuatro commits y seis modificaciones de publicación a esta alternativa de integración.
- No se copian credenciales, valores de entorno, sesiones, caches, entornos instalados o metadata local de hosting.
- Las siete carpetas sueltas, el piloto con su dependencia de un hermano y el monitor siguen en la PC original según el inventario. Este snapshot no acredita su recuperación.
- No se ejecutan instalación, build, aplicación, pruebas del proyecto ni proveedores externos durante esta preparación.
- La revisión no garantiza ausencia absoluta de secretos o datos privados; requiere validar árbol y todos los nuevos objetos alcanzables, no sólo el último diff.

## Verificaciones que debe registrar el informe externo

Antes de declarar completa la preparación local, una revisión independiente debe confirmar:

1. Nombre exacto de rama y SHA final; parentesco del snapshot db943aa con el ancestro remoto y del commit posterior de exclusión con db943aa; ausencia de la historia privada entre los ancestros del tip final.
2. Preservación de a841 y db943 como ancestros de sus ramas; respaldo exacto f360 sin cambios y originales/índices/refs sin alteraciones.
3. Árbol de código equivalente a la fuente indicada, salvo la lista documentada de transformaciones.
4. Exclusión de los 17 PNG, reemplazo íntegro de los dos documentos QA y saneamiento de documentación adicional; ausencia de referencias personales/administrativas salientes y de enlaces rotos a evidencias retiradas.
5. Plantillas vacías, fixture sintético, exclusión de reproducibles, manifiesto completo y hashes correctos sobre bytes LF.
6. Revisión de todos los commits, trees, blobs y mensajes nuevos alcanzables desde la rama saneada, tomando como frontera el remoto verificado.
7. Exclusión de despliegues automáticos presente desde el primer push en ambos tips; publicación limitada exclusivamente a las dos refs autorizadas, sin modificar main, PR, merge, builds, despliegues, Gemini o configuración remota/CI/permisos.
8. SHA remoto, recuperación desde clon nuevo y comprobaciones de integridad y automatizaciones posteriores; resultados reales en el informe externo.

No declarar saneamiento completo o revisión independiente exitosa por la sola presencia de este documento. Los conteos y el resultado final se registran fuera del commit después de verificarlos.

## Publicación autorizada y continuidad pendiente

El `vercel.json` de la raíz incorpora `git.deploymentEnabled` con `false` para los dos nombres exactos:

```json
{
  "git": {
    "deploymentEnabled": {
      "migracion/browns-studio-20261021-8f42": false,
      "migracion/browns-integracion-saneada-20261021-8f42": false
    }
  }
}
```

La [configuración Git documentada por Vercel](https://vercel.com/docs/project-configuration/git-configuration#git.deploymentenabled) excluye los despliegues automáticos para esas ramas. La exclusión debe estar en sus tips desde el primer push; no se sustituye por un ignored build step ni por mensajes de commit. Su alcance es el despliegue automático de Git: Vercel puede recibir el evento y leer configuración. No bloquea una ejecución manual ni nombres de rama distintos. No renombrar la rama ni publicar una continuación asumiendo que heredará esta exclusión.

Vercel sigue enlazado; la metadata observada muestra `GEMINI_API_KEY` para `preview` sin restricción de rama, sin leer su valor. El build raíz podría enviar `knowledge_base/*.md` a Gemini. La autorización permite publicar con las dos exclusiones automáticas, manteniendo prohibidos builds, despliegues y llamadas a Gemini. No modificar configuración remota ni usar PR como mecanismo de publicación.

Esta documentación se compromete antes del push y no anticipa una entrega remota verificada. La publicación sólo se declara VERIFICADA en el informe externo tras comprobar la ref remota exacta y recuperarla desde un clon nuevo de GitHub. En notebook deberán comprobarse SHA y manifiesto con `core.autocrlf=false`; instalación, pruebas y servicios requerirán la autorización aplicable y los builds requieren cambiar expresamente la prohibición vigente. Usar datos sintéticos, servicios de prueba y validación con PC original apagada. La continuidad permanece NOT VERIFIED hasta esos pasos.

## Selección exacta de documentos fuente saneados

La tabla registra únicamente las copias seleccionadas para este árbol, sin valores retirados. Se sustituyen contactos de pruebas por marcadores sintéticos, responsables personales por roles y datos administrativos por omisiones explícitas. También se neutralizan referencias a capturas excluidas cuando corresponda. Los archivos que sólo cambian enlaces mantienen su contenido técnico. Los hashes siguientes son de la salida saneada; el manifiesto incluye además el resto del árbol.

| Documento | SHA-256 de salida |
| --- | --- |
| `README.md` | `bc05633bfb3d16ff0c355e703826efbe017dcdde01730ba26aa3754e1f4ac711` |
| `landing-geo/.qa/HERO-ENERGIA-CONSULTA.md` | `38294033987a2d688d2a1f2f1ce0aa346829fdafe72c27cddd189884724eb120` |
| `landing-geo/.qa/INTEGRACION-PUBLICA.md` | `ed705ba2712baa8ab0d9f9a8d534d23ca02be61fda8db55fb866e13de7038e8c` |
| `landing-geo/.qa/VERCEL-CORREO.md` | `8adbd36862882e9511ac96672c7abe347485e0f47d7c8bdaa0d1674bf699a5b4` |
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
