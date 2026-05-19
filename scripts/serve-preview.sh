#!/usr/bin/env bash
# Build manifest + start local preview server for the design system portal.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
PORT="${PORT:-8899}"

python3 scripts/build-preview-manifest.py
echo ""
echo "Tier0 Design System — Preview Portal"
echo "  → http://localhost:${PORT}/preview/"
echo "  (Ctrl+C to stop)"
echo ""
exec python3 -m http.server "$PORT"
