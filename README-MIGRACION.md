# Migración de integración saneada de Browns Studio — 2026-10-21

**Publicación: AUTORIZADA; verificación pendiente. Continuación: NOT VERIFIED.** Este paquete corresponde a `migracion/browns-integracion-saneada-20261021-8f42`. La autorización del 2026-10-21 permite agregar `vercel.json` en la raíz de ambas ramas, actualizar documentos/manifiestos, crear esos commits y publicar únicamente `migracion/browns-studio-20261021-8f42` y `migracion/browns-integracion-saneada-20261021-8f42` en el repositorio existente. No autoriza builds, despliegues, llamadas a Gemini, cambios en `main`, PR, merge ni cambios de configuración remota. El respaldo exacto permanece sólo local.

No se instaló, compiló, inició ni probó el proyecto durante la preparación. La recuperación desde GitHub y la continuidad en notebook siguen pendientes. Los comandos de clonación del prompt receptor dependen de que el informe externo confirme el SHA remoto y la recuperación desde GitHub. La autorización de publicación no permite ejecutar el proyecto en la notebook.

## Repositorio, rama y procedencia

- Repositorio público verificado: `https://github.com/CaBsCrypto/BrownsStudio.git`.
- Rama de **este paquete**: `migracion/browns-integracion-saneada-20261021-8f42`.
- Snapshot de integración: fuente de código `c5b62c9944bf3da4cce0c33d9d399d34fe23d48a`, del worktree original `integracion-main`, rama `codex/preparar-landing-geo`.
- La copia exacta preparada se preserva **sólo localmente**, rama `migracion/browns-integracion-20261021-8f42`, SHA `f3601ee117617042710212f825859eee1fc08410`. No publicarla, etiquetarla ni incorporarla como padre o mediante merge a la rama saneada.
- El commit de snapshot saneado `db943aa1954c3c5eb1cd92725b1a53b34ab7b180` tiene como **único padre** `3b377c899ef7191a5bd00e14e419fc6be8167385`, ancestro ya alcanzable desde el remoto verificado. El commit posterior de exclusión y documentación desciende de ese snapshot. Los commits privados de integración y la copia exacta no deben ser ancestros de esta rama.
- La principal elegida por el usuario sigue separada: `migracion/browns-studio-20261021-8f42`, punto revisado previo a la exclusión `a8411f0063bc4c036ca96796066e64093b65ff8b`, con cuatro commits de publicación y sus seis modificaciones. Su tip final también agrega la exclusión y documentación. **Este snapshot de integración no incorpora esos cuatro commits ni las seis modificaciones.**
- Rama predeterminada observada el 2026-10-21: `main`, SHA `7b34892d3ae40595627a59fd19eb3ceece34f73d`. Comprobar de nuevo antes de una integración futura.

El SHA final de este paquete se obtiene del informe externo de preparación y se verifica en GitHub durante la publicación autorizada. No se incluye aquí el SHA del commit que contiene este documento. `MIGRACION-TRAZABILIDAD.md` documenta la relación entre fuente, respaldo y snapshot.

La preservación por snapshot conserva el estado de código de integración con las transformaciones documentadas; **no conserva la equivalencia de historia, autoría commit a commit ni el orden de sus tres commits inéditos**. La historia exacta se mantiene local. Un SHA fuente escrito en esta documentación no convierte sus commits en ancestros.

## Selección y saneamiento del paquete

La revisión inicial encontró documentación de QA e imágenes nuevas con datos personales del propietario y referencias administrativas de pruebas. Quitar archivos sólo del tip de la historia exacta habría dejado esas versiones alcanzables. Esta alternativa parte del ancestro ya remoto e incorpora un árbol seleccionado en un commit nuevo.

- Se excluyen los 17 PNG nuevos de `landing-geo/.qa/` pertenecientes a la historia privada revisada.
- Se reemplazan completamente `landing-geo/.qa/VERCEL-CORREO.md` y `landing-geo/.qa/INTEGRACION-PUBLICA.md` por resúmenes sin identidad personal, contactos privados o identificadores administrativos. Esos resúmenes no acreditan nuevas pruebas ni entrega actual de correo.
- Se sanea información operativa detectada en `README.md`, `landing-geo/README.md` y `operacion/lanzamiento.md` con placeholders explícitos o datos sintéticos, conservando contenido técnico útil. En `operacion/README.md` y `operacion/flujo-formulario.md` se sustituye el nombre de un responsable por un rol genérico. Son siete documentos fuente con datos personales saneados, incluidos los dos QA. Se neutralizan también las referencias a los 17 PNG excluidos que aparezcan en otros documentos; las rutas exactas y hashes de salida deben quedar en la traza final.
- `video-generator/reel-leads.json` usa una identidad claramente ficticia (`Persona de demostración`, `demo@example.invalid`) conservando su esquema. Los guiones de demostración de `video-generator/leads.json` se conservan.
- Se omiten ocho MP4 regenerables de `video-generator/output` y `video-generator/temp-props-abogados-pro.json`. Las fuentes para regenerar los medios permanecen según el inventario.
- Las plantillas de entorno contienen nombres y valores vacíos. No se copian `.env.local`, credenciales, sesiones, perfiles, datos reales de clientes, dumps, caches, `node_modules`, `.next` ni `.vercel`.
- Se actualizan documentación, inventarios sanitizados y manifiesto para distinguir este snapshot de las otras ramas. Toda transformación adicional debe quedar registrada en `MIGRACION-TRAZABILIDAD.md` y en el informe externo.

Estos cambios no purgan ni reescriben objetos ya publicados en GitHub. El ancestro público puede conservar contenido heredado que se ha retirado del árbol actual; la revisión tiene ese límite. No se ofrece garantía absoluta de ausencia de secretos. La revisión final debe comprobar tanto el árbol como todos los objetos nuevos alcanzables desde la rama saneada y confirmar que la historia privada no sea alcanzable.

Los informes previos de seguridad e inventario describen la revisión histórica de las fuentes originales; no prueban por sí solos el saneamiento de esta salida. `MIGRACION-TRAZABILIDAD.md` y el informe externo registran el alcance actualizado. No declarar saneamiento completo antes de la validación independiente del paquete final.

El código y las pruebas de aplicación conservan los bytes de la fuente de integración. El correo de CTA comercial ya heredado de `origin` y el UUID claramente simulado de una prueba se conservan por su función; no se tratan como datos personales de QA. La revisión independiente debe confirmar esa equivalencia y las excepciones documentadas fuera de código/pruebas.

No se detectaron LFS, submódulos ni symlinks en los siete commits originalmente salientes. `.mcp.json` declaraba `npx @remotion/mcp@latest`, sin secretos detectados: no se activó. Revisar su descarga y ejecución antes de autorizar una versión no fijada.

Los originales, índices, refs principales y la copia exacta se conservan. No se reescriben ni se combina integración con publicación. Los analizadores e informes privados de auditoría permanecen fuera del paquete publicable.

## Dependencias que siguen en la PC original

El inventario limitado de carpetas hermanas registró 203 archivos en `calculadora`, `landing`, `landing-geo`, `landing-spatial`, `operacion`, `piloto-agentes` y `release-notes`. No se incorporan automáticamente a esta rama. El piloto depende de su `../landing-geo` hermano y existe un monitor local ligado a la PC de origen; no se trasladó ni reprogramó.

Valores de entorno, configuración privada, recursos no versionados y servicios siguen necesitando recuperación por un canal seguro autorizado. Compartir cuenta no instala herramientas ni recupera esas dependencias. No se inspeccionaron rutas externas al alcance ni se ejecutó Graphify. La copia de este repositorio por sí sola no demuestra portabilidad del conjunto externo.

## Publicación autorizada con exclusión de despliegues

La autorización del 2026-10-21 permite agregar `vercel.json` en la raíz de ambas ramas, actualizar documentos/manifiestos, crear esos commits y publicar únicamente `migracion/browns-studio-20261021-8f42` y `migracion/browns-integracion-saneada-20261021-8f42` en el repositorio existente. No autoriza builds, despliegues, llamadas a Gemini, cambios en `main`, PR, merge ni cambios de configuración remota. El respaldo exacto permanece sólo local.

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

La lectura de Vercel observó el proyecto enlazado al repositorio con producción desde `main`, Node 24.x y raíz del repositorio. Sólo se leyó metadata de `GEMINI_API_KEY` para `preview` sin restricción de rama; su valor no se leyó. El build raíz ejecutaría `scripts/generate-embeddings.js` y podría enviar `knowledge_base/*.md` a Gemini si encuentra esa clave en el proceso. No ejecutarlo ni iniciar otro mecanismo de build durante esta publicación.

El único workflow versionado observado, `.github/workflows/landing-geo.yml`, se activa por PR, pushes a `main` y ejecución manual. Un push sólo a los dos nombres de migración no coincide con su trigger `push`. Antes de publicar se deben volver a revisar configuración, automatizaciones, refs salientes y objetos nuevos; después se deben comprobar refs remotas, recuperación y ausencia de builds/despliegues asociados a los SHA publicados. Los resultados finales quedan en el informe externo; esta documentación no anticipa éxito.

## Entorno y servicios

Versiones deducidas de manifiestos, lockfiles y CI, sin instalar ni ejecutar el proyecto:

| Componente | Versión o requisito observado |
| --- | --- |
| Node.js | 24.x |
| pnpm raíz | 10.28.0 |
| Aplicación raíz | Next 16.2.6, React 19.2.6, TypeScript 5.9.3 |
| GEO independiente | Next 16.3.8, React 19.3.0, `package-lock.json` propio |
| Generador de video | Remotion 4.0.469, React 19.0.0, dentro del workspace pnpm |
| Multimedia | FFmpeg y herramientas de Remotion sólo para el flujo autorizado |

El workspace pnpm raíz incluye `.` y `video-generator`, no `landing-geo`. Usar `pnpm install --frozen-lockfile` desde la raíz y `npm ci` desde `landing-geo`, únicamente con autorización en la notebook. No actualizar versiones o lockfiles al recuperar. CI y los lockfiles prevalecen como referencia de reproducción sobre instrucciones antiguas de Node 18+/npm.

Las plantillas finales deben cubrir los nombres observados: `ADMIN_PASSWORD`, `ADMIN_SECRET`, `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, `GEMINI_API_KEY`, `GEMINI_MODEL`, `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_APP_SECRET`, `WHATSAPP_WEBHOOK_VERIFY_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_FLOW_ID`, `WHATSAPP_BUSINESS_ACCOUNT_ID`, `HANDOFF_NOTIFICATION_PHONE`, `KAPSO_API_KEY`, `KAPSO_WEBHOOK_SECRET`, `ELEVENLABS_API_KEY`, `RESEND_API_KEY`, `GEO_MAIL_FROM`, `GEO_MAIL_TO`, `GOOGLE_SHEETS_WEBHOOK_URL`, `CALENDLY_URL` y `NEXT_PUBLIC_SITE_URL`. No poner secretos en `NEXT_PUBLIC_*` ni en GitHub o el chat.

Firestore es remoto; el cliente usa la base nombrada `browns-studio`. No se exportaron datos ni ejecutaron migraciones, resets o escrituras productivas. Usar servicios de prueba y datos sintéticos autorizados. No regenerar claves para forzar el arranque. No se identificó una clave de cifrado propia ligada al equipo en las fuentes inspeccionadas, pero no se garantiza que todas las dependencias privadas estén recuperadas.

## Ejecución futura en notebook

Leer `PROMPT-RECEPTOR.md` antes de ejecutar. Allí se documentan clonación futura de la rama exacta, SHA, manifiesto, instalación y comprobaciones con autorización. Los siguientes efectos deben revisarse antes:

| Operación | Efecto relevante |
| --- | --- |
| Instalación raíz/GEO | Descarga paquetes y puede ejecutar mecanismos de compilación de dependencias |
| `pnpm run dev` | Inicia Next en 3000; las rutas pueden llamar a servicios si hay credenciales |
| `pnpm run build` | Genera embeddings antes de Next; sin `GEMINI_API_KEY` en el proceso omite esa fase |
| GEO `npm run dev` | Inicia Next en `127.0.0.1:5175` |
| Formulario GEO | Con Resend configurado puede enviar correo real |
| Voz/video | Puede contactar ElevenLabs, ejecutar Remotion y escribir medios |

El script de embeddings no carga `.env.local` por sí mismo; puede escribir `data/knowledge_base_embeddings.json` con texto y rutas absolutas. Algunos fallos mantienen un fallback y no hacen fallar el build. Para la validación sintética mantener `GEMINI_API_KEY` ausente o vacía en el entorno del proceso y no activar otras credenciales reales. Un build exitoso no prueba Gemini ni entrega de correo.

No se comprobó arquitectura o compatibilidad multimedia de la notebook. El generador usa rutas desde su directorio de trabajo y debe ejecutarse desde la raíz prevista. Un flujo local no acredita que funcione en hosting serverless.

## Integridad y recepción

`MANIFIESTO-MIGRACION.sha256` lista `<sha256>  <ruta/relativa>` sobre bytes exactos del árbol seleccionado, con LF para textos nuevos. El árbol de entrega previsto contiene 408 archivos versionados: 407 entradas en el manifiesto y el propio manifiesto; la incorporación de `vercel.json` raíz agrega un archivo frente al snapshot anterior. La verificación externa debe confirmar cobertura y hashes. Excluye el propio manifiesto y metadatos Git. No puede contener su hash dentro de sí mismo. El SHA final del commit lo aporta el informe externo; no usar como reemplazo los SHA de fuente, respaldo exacto o principal.

En un clon nuevo usar `core.autocrlf=false`, verificar el SHA contra un resumen que declare publicación **VERIFICADA**, revisar hooks/filtros/atributos antes de checkout y comprobar el manifiesto completo. Comprobar además que no falten ni sobren archivos frente al árbol comprometido. No normalizar bytes para forzar coincidencias.

La publicación está autorizada y queda pendiente de verificación externa por SHA remoto y clon nuevo. Sólo ese informe puede declararla **VERIFICADA** después de comprobarla. La continuidad permanece **NOT VERIFIED** hasta validar este snapshot en la notebook; las pruebas históricas no sustituyen esa comprobación.

## Validación e integración posteriores

- [x] Publicación de las dos ramas expresamente autorizada, con exclusión de despliegues automáticos para sus nombres exactos.
- [ ] Publicación verificada por SHA remoto y clon nuevo; consultar el resultado externo.
- [ ] SHA de la rama exacta y manifiesto completos coinciden en notebook.
- [ ] Instalación y ejecución autorizadas con Node 24.x y gestores previstos.
- [ ] Secretos recuperados por canal seguro; servicios de prueba y datos sintéticos disponibles.
- [ ] Landing GEO, assets/tipografías, CTA a `#analisis`, escritorio/móvil, navegación, teclado y movimiento reducido comprobados.
- [ ] Redirecciones previstas `/direccion`, `/es`, `/en` y `/pt` comprobadas.
- [ ] Formulario validado con transporte simulado/capturado, sin envío a Resend, Zoho, WhatsApp u otros destinos externos; error y conservación de datos comprobados.
- [ ] Admin sólo con autorización expresa, credenciales y Firestore de pruebas, sin producción.
- [ ] Flujo repetido con la PC original apagada o desconectada, usando internet sólo para servicios autorizados.

Crear una rama nueva para trabajo posterior después de verificar la recepción y con autorización aplicable. Su nombre no queda cubierto por las dos exclusiones exactas: antes de cualquier nuevo push debe revisarse y autorizarse su efecto de hosting. La autorización de esta entrega no autoriza publicaciones posteriores. Un clon `--single-branch` no trae automáticamente `main`: consultar la predeterminada, hacer fetch explícito de su ref y comparar ancestro, log y diff. Fetch no mezcla archivos; login no integra ramas. **No traer ni mezclar la referencia exacta privada para reconstruir la historia saneada.**

Cualquier PR requiere autorización separada y, salvo otra indicación, debe ser borrador. Revisar diff, historial, checks, conflictos y automatizaciones antes de integrar. No hacer push directo a `main`, force-push, auto-merge, merge o deploy como parte de esta recuperación. Conservar el respaldo exacto local y los originales.

Documentos de referencia: `MIGRACION-TRAZABILIDAD.md`, `MIGRACION-SEGURIDAD.md`, `MIGRACION-INVENTARIO-GIT.md`, `MIGRACION-INVENTARIO-LOCAL.md` y `PROMPT-RECEPTOR.md`.
