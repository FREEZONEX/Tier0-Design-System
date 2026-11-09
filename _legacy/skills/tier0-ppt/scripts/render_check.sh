#!/usr/bin/env bash
# Render every slide (hidden ones too) to JPG + contact sheets for visual QA.
# Usage: render_check.sh deck.pptx [outdir]
# Installs the repo's IBM Plex fonts first so LibreOffice measures text like PowerPoint does
# (without them, overflow checks are meaningless).
set -euo pipefail
DECK="$1"; OUT="${2:-qa}"
HERE="$(cd "$(dirname "$0")" && pwd)"; REPO="$(cd "$HERE/../../.." && pwd)"
mkdir -p ~/.fonts "$OUT"
cp -n "$REPO"/fonts/IBMPlex*.ttf ~/.fonts/ 2>/dev/null || true
fc-cache -f >/dev/null 2>&1 || true
fc-list | grep -qi "IBM Plex Sans" || echo "WARN: IBM Plex Sans not visible to fontconfig — text widths will be off"

python3 - "$DECK" "$OUT/_unhidden.pptx" <<'PY'
import sys
from pptx import Presentation
p = Presentation(sys.argv[1])
for s in p.slides: s._element.set("show", "1")   # hidden slides are skipped by soffice otherwise
p.save(sys.argv[2])
PY
SOFFICE="$(command -v soffice || command -v libreoffice)"
"$SOFFICE" --headless --convert-to pdf --outdir "$OUT" "$OUT/_unhidden.pptx" >/dev/null
rm -f "$OUT"/s-*.jpg
pdftoppm -jpeg -r 110 "$OUT/_unhidden.pdf" "$OUT/s"
python3 - "$OUT" <<'PY'
import glob, sys
from PIL import Image
out = sys.argv[1]; fs = sorted(glob.glob(f"{out}/s-*.jpg"))
for k in range(0, len(fs), 6):
    ims = [Image.open(f) for f in fs[k:k + 6]]; w, h = ims[0].size
    g = Image.new("RGB", (w * 2, h * ((len(ims) + 1) // 2)), "white")
    for i, im in enumerate(ims): g.paste(im, ((i % 2) * w, (i // 2) * h))
    g.save(f"{out}/sheet-{k // 6 + 1}.jpg", quality=85)
print("\n".join(sorted(glob.glob(f"{out}/sheet-*.jpg"))))
PY
