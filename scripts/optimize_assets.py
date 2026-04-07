"""
optimize_assets.py — Browns Studio asset optimizer
---------------------------------------------------
Convierte JPG/PNG en /public a WebP + genera versiones optimizadas.

Requiere:
  pip install Pillow

Uso:
  python scripts/optimize_assets.py
  python scripts/optimize_assets.py --quality 75
  python scripts/optimize_assets.py --dry-run      (solo muestra, no convierte)
"""

import argparse
import os
import sys
import io
from pathlib import Path

# Fix Windows terminal encoding
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

try:
    from PIL import Image
except ImportError:
    print("❌ Pillow no instalado. Ejecuta: pip install Pillow")
    sys.exit(1)


# ── Config ────────────────────────────────────────────────────────────────────
PUBLIC_DIR   = Path(__file__).parent.parent / "public"
WEBP_QUALITY = 80       # 75-85 es el sweet spot calidad/peso
JPEG_QUALITY = 82       # re-comprimir JPGs existentes
MAX_WIDTH    = 1200     # px — previews no necesitan más
EXTENSIONS   = {".jpg", ".jpeg", ".png", ".webp"}


def human_size(n: int) -> str:
    for unit in ("B", "KB", "MB"):
        if n < 1024:
            return f"{n:.1f} {unit}"
        n /= 1024
    return f"{n:.1f} GB"


def optimize_image(path: Path, quality: int, dry_run: bool) -> dict:
    img     = Image.open(path)
    orig_sz = path.stat().st_size

    # Convert RGBA → RGB if saving as JPEG/WebP without alpha
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")

    # Resize if wider than MAX_WIDTH (keeps aspect ratio)
    if img.width > MAX_WIDTH:
        ratio  = MAX_WIDTH / img.width
        new_h  = int(img.height * ratio)
        img    = img.resize((MAX_WIDTH, new_h), Image.LANCZOS)
        resized = True
    else:
        resized = False

    webp_path = path.with_suffix(".webp")

    if not dry_run:
        img.save(webp_path, "WEBP", quality=quality, method=6)

    new_sz   = webp_path.stat().st_size if (not dry_run and webp_path.exists()) else orig_sz
    saving   = orig_sz - new_sz
    pct      = (saving / orig_sz * 100) if orig_sz else 0

    return {
        "original":  path.name,
        "webp":      webp_path.name,
        "orig_sz":   orig_sz,
        "new_sz":    new_sz,
        "saving":    saving,
        "pct":       pct,
        "resized":   resized,
        "dry_run":   dry_run,
    }


def scan_and_optimize(quality: int, dry_run: bool):
    images = [
        p for p in PUBLIC_DIR.rglob("*")
        if p.suffix.lower() in EXTENSIONS and p.stem != "og-image"
    ]

    if not images:
        print("ℹ️  No se encontraron imágenes en /public")
        return

    print(f"\n{'DRY RUN — ' if dry_run else ''}Optimizando {len(images)} imagen(es) en {PUBLIC_DIR}\n")
    print(f"{'Archivo':<45} {'Original':>9} {'WebP':>9} {'Ahorro':>9} {'%':>6}  Info")
    print("─" * 90)

    total_orig = total_new = 0

    for img_path in sorted(images):
        # Skip already-converted WebP if original JPG/PNG still exists
        if img_path.suffix.lower() == ".webp" and img_path.with_suffix(".jpg").exists():
            continue

        try:
            r = optimize_image(img_path, quality, dry_run)
        except Exception as e:
            print(f"  ⚠️  {img_path.name}: {e}")
            continue

        total_orig += r["orig_sz"]
        total_new  += r["new_sz"] if not dry_run else r["orig_sz"]

        info = []
        if r["resized"]:   info.append(f"↓ resized to {MAX_WIDTH}px")
        if dry_run:        info.append("(sin cambios)")

        print(
            f"  {r['original']:<43} "
            f"{human_size(r['orig_sz']):>9} "
            f"{human_size(r['new_sz']):>9} "
            f"{human_size(r['saving']):>9} "
            f"{r['pct']:>5.1f}%  "
            f"{'  '.join(info)}"
        )

    # ── Summary ───────────────────────────────────────────────────────────────
    total_saving = total_orig - total_new
    total_pct    = (total_saving / total_orig * 100) if total_orig else 0
    print("─" * 90)
    print(
        f"  {'TOTAL':<43} "
        f"{human_size(total_orig):>9} "
        f"{human_size(total_new):>9} "
        f"{human_size(total_saving):>9} "
        f"{total_pct:>5.1f}%"
    )

    if not dry_run:
        print(f"\n✅ WebP guardados en las mismas carpetas.")
        print("💡 Próximo paso: actualizar las referencias en data/proyectos.ts")
        print("   Cambiar: /previews/archivo.jpg  →  /previews/archivo.webp\n")
    else:
        print("\n💡 Esto es un dry-run. Para convertir: python scripts/optimize_assets.py\n")


# ── CLI ───────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Optimiza imágenes de Browns Studio a WebP")
    parser.add_argument("--quality",  type=int, default=WEBP_QUALITY, help=f"Calidad WebP 1-100 (default: {WEBP_QUALITY})")
    parser.add_argument("--dry-run",  action="store_true", help="Solo muestra estimados, no convierte")
    args = parser.parse_args()

    scan_and_optimize(quality=args.quality, dry_run=args.dry_run)
