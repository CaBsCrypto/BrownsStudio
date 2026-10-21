# Inventario Git de origen — 2026-10-21

La carpeta Browns Studio no es una raíz Git. El usuario eligió `publicacion-main` como base; `integracion-main` comparte su repositorio común. Se trabaja en una copia aislada fuera del proyecto. Las ramas nuevas de migración existen sólo en esa copia hasta resolver los bloqueos. No se alteran ramas ni índices originales.

## Estado original

| Worktree relativo | Rama | SHA exacto | Upstream | Cambios |
| --- | --- | --- | --- | --- |
| publicacion-main | codex/inicio-protagonista | e7c91030cdf68ee9d2628092f7e2b98bd0baa096 | origin/main | 0 staged, 6 unstaged, 0 untracked |
| integracion-main (repositorio común .git) | codex/preparar-landing-geo | c5b62c9944bf3da4cce0c33d9d399d34fe23d48a | ninguno | árbol e índice limpios |

No había HEAD separado ni stashes. Los dos worktrees son los únicos registrados en los metadatos del repositorio. No se siguieron rutas externas.

| Rama local original | SHA exacto | Upstream local | Commits no alcanzables desde origin verificado |
| --- | --- | --- | ---: |
| codex/inicio-protagonista | e7c91030cdf68ee9d2628092f7e2b98bd0baa096 | origin/main | 4 |
| codex/preparar-landing-geo | c5b62c9944bf3da4cce0c33d9d399d34fe23d48a | ninguno | 3 |
| codex/publicar-landing-geo | 60595caa0abbee84ed39a8ad4c6e693fb1779c8b | ninguno en la ref inventariada | 0 |
| main | 3b377c899ef7191a5bd00e14e419fc6be8167385 | origin/main | 0 |

El `origin/main` local original ya indicaba 7b34892d3ae40595627a59fd19eb3ceece34f73d. Después se verificó por lectura de GitHub y fetch sólo en la copia aislada: default main al mismo SHA y rama codex/publicar-landing-geo en 60595caa0abbee84ed39a8ad4c6e693fb1779c8b. Esto distingue metadatos locales de comprobación remota. El source/main antiguo es ancestro ya remoto; no se necesita publicar otra ref para preservarlo.

## Seis versiones de trabajo preservadas

- app/opengraph-image.tsx
- landing-geo/src/components/AgentScene.tsx
- landing-geo/src/components/GeoLanding.tsx
- landing-geo/src/content/browns-public.json
- landing-geo/src/content/direction.ts
- landing-geo/src/lib/public-information.ts

No había versiones intermedias staged distintas. Se copiaron explícitamente las seis versiones del árbol, se normalizaron CRLF a LF sólo en la copia y se conservaron en el commit intermedio cde2018. No se aplicó stash, reset, clean ni checkout al original.

## Ignorados relevantes

En publicacion-main: `.env.local` (no copiado ni leído para obtener valores), `.vercel/`, `.next/`, `node_modules/`, `video-generator/node_modules/`, `next-env.d.ts` y `tsconfig.tsbuildinfo`. En integracion-main: caches equivalentes y dependencias/next-env de landing-geo. No se copiaron caches, entornos instalados ni sesiones. Las plantillas de entorno se regeneraron en la copia con nombres y valores vacíos.

## Políticas y filtros revisados

No hay hooks locales activos: sólo archivos .sample. No se observó core.hooksPath ni fsmonitor personalizado. La configuración global define Git LFS, pero la revisión del historial saliente no encontró punteros, submódulos ni symlinks; no se instaló ni habilitó LFS. No se ejecutaron hooks, filtros de contenido del proyecto ni scripts del proyecto. Las nuevas identidades de commit usan la cuenta GitHub verificada CaBsCrypto con dirección noreply en la copia; no se cambió la configuración global.

GitHub consultado: repositorio público CaBsCrypto/BrownsStudio, permiso ADMIN de la cuenta, main predeterminada sin protección observada, rulesets y hooks consultados vacíos. El único workflow observado es landing-geo.yml, para PR, main y manual. La integración Vercel está documentada en README-MIGRACION.md y bloquea el push sin resolver sus previews.

## Integridad de los originales

El inventario privado de auditoría guarda SHA-256 del índice y de cada archivo tracked/untracked no ignorado de ambos árboles, estado porcelain v2, refs, stashes y nombres de ignorados. Al finalizar se compara con una segunda lectura. Ese inventario no contiene valores de entorno y permanece fuera del paquete público. El resultado de la comparación final se informa junto con los SHA de las ramas preparadas; no se anticipa un resultado dentro de su propio commit.
