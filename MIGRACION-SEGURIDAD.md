# Revisión de seguridad del historial y paquete de migración

Fecha: 2026-10-21. Inspección local de solo lectura sobre la copia aislada. No se ejecutaron scripts del repositorio, hooks, filtros, textconv, builds ni peticiones a servicios. No se modificaron los originales, el índice, los objetos ni refs. Los únicos archivos creados por esta revisión son analizadores propios e informes sanitizados dentro de `audit/`.

## Resultado para decidir publicación

- La base `source/codex/inicio-protagonista` y los seis cambios de trabajo revisados no presentan credenciales ni datos privados nuevos identificados por esta revisión. Esto no equivale a una garantía absoluta de ausencia de secretos ni autoriza despliegues.
- **Bloqueo de privacidad en `source/codex/preparar-landing-geo`:** sus objetos todavía no remotos incluyen documentación y capturas de pruebas con metadata personal y administrativa. Mantenerla local hasta que exista autorización específica para publicarla en el repositorio público o se decida una alternativa de migración saneada.
- Borrar esos archivos sólo en el último commit de esa rama no evita la publicación de sus versiones históricas. Esta revisión no reescribió ni saneó la historia.
- En el objeto heredado original, `video-generator/reel-leads.json` contenía un nombre completo y un correo personal cuya condición sintética no estaba demostrada. La copia aislada fue saneada posteriormente por instrucción expresa: ahora usa una identidad claramente ficticia en todas sus repeticiones. El objeto original ya estaba en origin y su historia no se reescribió; véase el registro de saneamiento al final.

## Base de comparación y cobertura

Se tomó como frontera todo lo alcanzable desde `refs/remotes/origin/*`, recién verificado por el agente principal. En particular:

- `origin/main`: `7b34892d3ae40595627a59fd19eb3ceece34f73d`.
- `origin/codex/publicar-landing-geo`: `60595caa0abbee84ed39a8ad4c6e693fb1779c8b`.

Se enumeraron los objetos alcanzables desde las cuatro refs source y no alcanzables desde origin, sin limitarse al último árbol. Se procesaron los 7 commits nuevos, sus mensajes completos, todos sus diffs sin textconv ni diff externo, los 46 trees nuevos y los 110 blobs nuevos. Los 93 blobs de texto se examinaron íntegramente con búsqueda de patrones de claves, tokens, credenciales en URLs, claves privadas, JWT, asignaciones de credenciales y datos de contacto. Se revisó el contexto de documentación y datos de mayor riesgo. Se inspeccionaron visualmente las 17 imágenes PNG salientes. Los textos suman 468533 bytes; los blobs completos suman 3.013.015 bytes.

| Ref de origen | Tip | Commits nuevos | Blobs nuevos | Bytes de blobs nuevos | Resultado |
| --- | --- | ---: | ---: | ---: | --- |
| source/codex/inicio-protagonista | e7c91030cdf68ee9d2628092f7e2b98bd0baa096 | 4 | 28 | 210.454 | Sin datos privados nuevos identificados |
| source/codex/preparar-landing-geo | c5b62c9944bf3da4cce0c33d9d399d34fe23d48a | 3 | 82 | 2.802.561 | Bloquear publicación por metadata personal/operativa |
| source/codex/publicar-landing-geo | 60595caa0abbee84ed39a8ad4c6e693fb1779c8b | 0 | 0 | 0 | Ya alcanzable desde origin |
| source/main | 3b377c899ef7191a5bd00e14e419fc6be8167385 | 0 | 0 | 0 | Ya alcanzable desde origin |

Los cuatro commits exclusivos de inicio son `6ae4afa`, `7a20be9`, `4610d46` y `e7c9103`. Los tres exclusivos de preparar son `f8ddc30`, `6e02be6` y `c5b62c9`. Ningún mensaje contiene un secreto identificado. Las identidades de autor/committer de los siete commits ya aparecen en origin; no se vuelcan sus nombres ni correos en este informe.

## Hallazgos nuevos de preparar-landing-geo

`landing-geo/.qa/VERCEL-CORREO.md`, incluidas sus versiones históricas, contiene identificación de cuenta/equipo, identificadores administrativos de servicio, despliegue, solicitud, correo y log, referencias de pruebas y contactos del propietario. `landing-geo/.qa/INTEGRACION-PUBLICA.md` también documenta pruebas reales de correo y referencias operativas. Son datos internos de pruebas; los identificadores administrativos observados no se clasifican como credenciales de autenticación, pero no corresponde publicarlos sin la decisión indicada.

Las capturas siguientes muestran datos de pruebas del propietario o metadata de su sesión administrativa:

- `landing-geo/.qa/integracion-resend-entregado.png`.
- `landing-geo/.qa/resend-prueba-entregada.png`.
- `landing-geo/.qa/integracion-formulario-enviado.png`.
- `landing-geo/.qa/vercel-formulario-enviado.png`.
- `landing-geo/.qa/vercel-limite-formulario.png`.
- `landing-geo/.qa/vercel-firewall-verificado.png`.

Las capturas de configuración Vercel revisadas muestran nombres de variables y valores ocultos; no se observó una clave legible. El resto de PNG son capturas de la UI pública o de configuración sin secretos legibles. No se identificaron clientes en las solicitudes de prueba. Ninguna de estas imágenes se introducirá al publicar únicamente la historia de inicio: sus blobs nuevos pertenecen al conjunto exclusivo de preparar. Las rutas indicadas de documentación y capturas no están presentes en el árbol de inicio inspeccionado.

Los CSV nuevos `operacion/cupos.csv` y `operacion/registro-tiempo.csv` sólo contienen cabeceras. No contienen proyectos de clientes, registros de actividad ni reservas reales. No se encontraron bases de datos, dumps, uploads ni fixtures privados adicionales entre los objetos nuevos inventariados.

## Seis modificaciones actuales de publicacion-main

Se inspeccionaron los seis archivos completos y su diff frente a `e7c9103`, usando la copia aislada y lectura de las seis fuentes originales autorizadas:

- `app/opengraph-image.tsx`.
- `landing-geo/src/components/AgentScene.tsx`.
- `landing-geo/src/components/GeoLanding.tsx`.
- `landing-geo/src/content/browns-public.json`.
- `landing-geo/src/content/direction.ts`.
- `landing-geo/src/lib/public-information.ts`.

Los cambios modifican copy, cobertura global/remota y la presentación de información pública. El contacto comercial de Browns se conserva. No se identificaron secretos, nuevos datos personales ni registros de clientes en esos cambios. No se abrió ningún `.env.local`, perfil externo ni archivo de credenciales.

## Archivos heredados que seguirían en el paquete

Los siguientes objetos exactos ya son alcanzables desde origin. Incluirlos en el árbol de migración no aporta un blob nuevo al remoto, aunque merece revisar su conveniencia en el nuevo árbol. Esta distinción no convierte un dato potencialmente privado en público por autorización.

| Ruta o conjunto | Clasificación por contenido | Acción sugerida |
| --- | --- | --- |
| `.mcp.json` | Configuración de herramienta pública: comando npx para documentación Remotion; sin tokens, env de credenciales ni URL autenticada | Puede conservarse por contenido; no se ejecutó |
| `video-generator/leads.json` | Fixture de un guion de demo dental; mensajes prefijados y sin datos de contacto de pacientes ni registros CRM | Parece demostración sintética, sin cliente real identificado; conservar sólo si forma parte del proyecto |
| `video-generator/temp-props-abogados-pro.json` | Props de demo legal: conversación guionizada, nombre de pila y referencia de caso con patrón de muestra; sin contacto de cliente | Parece demostración sintética; no se acreditó un expediente real |
| `video-generator/reel-leads.json` | Conjunto de guiones promocionales. El objeto heredado tenía contacto ambiguo; la copia aislada usa ahora identidad claramente ficticia | Saneamiento de la copia completado; el objeto remoto histórico queda documentado, sin reescritura |
| `video-generator/output/*.mp4` | Ocho renders promocionales de UI y conversaciones guionizadas, correlacionados con los fixtures; no son exportaciones de una base CRM | Muestreo visual compatible con demos, sin cliente real identificado. Mantener fuera del paquete si no es necesario para continuar código |

Los ocho MP4 suman **108.340.227 bytes**, y sus tamaños individuales van de 10.846.881 a 18.215.771 bytes. Son los archivos `pitch-abogados-pro`, `pitch-academia-ia`, `pitch-cl-nica-smileart`, `pitch-dental-pro`, `pitch-dentistas-nuevo`, `pitch-propiedades-andes`, `pitch-shopify-store` y `pitch-smileart-dental`. La clasificación audiovisual se basa en una muestra visual de cada vídeo y la comparación con sus fixtures; no es una auditoría de cada fotograma ni de toda su pista de audio.

## LFS, modos y tamaños salientes

No se encontraron punteros Git LFS, entradas gitlink de submódulos ni symlinks en los árboles salientes revisados. Los modos observados fueron archivos regulares. No hay blobs nuevos superiores a 1 MiB. El mayor blob saliente mide 529.573 bytes y corresponde a una captura de UI. Los MP4 grandes indicados son heredados ya remotos, no blobs salientes nuevos.

## Límites y evidencia reproducible

La detección por patrones puede omitir secretos con formato no conocido o datos cuya realidad sólo pueda confirmar el propietario. No se comprobó la vigencia de credenciales ni se contactaron proveedores. No se considera autorizada la publicación de datos personales por el mero hecho de que parezcan ejemplos. La revisión no cambia el bloqueo separado sobre despliegues o previews descrito por el agente principal.

Inventarios sanitizados de soporte: `seguridad-inventario.json` y `seguridad-clasificacion.json`. Contienen IDs de objetos, rutas, tamaños, líneas y categorías; no valores secretos ni contactos. Los analizadores propios permanecen dentro de `audit/` y no forman parte del repositorio que se vaya a publicar.

## Saneamiento autorizado posterior de un fixture en la copia aislada

Por instrucción expresa del agente principal se modificó exclusivamente `repo/video-generator/reel-leads.json`. Se reemplazaron 1 aparición de nombre completo, 1 aparición adicional de nombre de pila y 1 aparición de correo por `Persona de demostración` y `demo@example.invalid`. Se verificó que el esquema, la cantidad de registros y todos los demás valores del JSON permanecen iguales. Los campos modificados son textos de mensajes del primer guion de demo; no se reproducen los valores originales.

SHA256 del archivo resultante: `28a03cd330a7d61aa50fc4360f533d2e18f23263b5bd8c9ec7f2f89dd4ec8098`.

Registro sanitizado por campos y tipos: `reel-leads-saneamiento.json`. No se modificaron originales ni Git. El objeto histórico ambiguo sigue siendo alcanzable desde origin; este saneamiento sólo evita conservarlo en el nuevo árbol de trabajo. Las exclusiones de MP4 y temp-props regenerables quedan a cargo del agente principal.

## Contexto de la alternativa saneada

El informe anterior describe la historia fuente preservada localmente. La nueva referencia `migracion/browns-integracion-saneada-20261021-8f42` NO publica esa historia: tiene un único padre ya remoto y un snapshot seleccionado. Se retiran las 17 capturas PNG de QA, se sustituyen los dos informes operativos y se sanea otra documentación que repetía datos de pruebas o IDs de administración. Las fuentes de pruebas no se eliminan. Las rutas/categorías se documentan sin valores originales. Debe verificarse todo el historial saliente de esta nueva referencia, su manifiesto y su equivalencia de código antes de considerarla revisada. El historial heredado ya presente en origin no se reescribe ni se purga. El usuario ratificó sin push y sin deploy; preparar esta alternativa no cambia esa instrucción.
