#!/usr/bin/env bash
# 从 Tier0-Frontend 复刻组件到 02-components/packages/（ui、theme、utils、hooks）。
# 只复制这四个纯前端包；业务、gRPC、观测、UNS 等包不复制。
# 用法：scripts/sync-frontend-ui.sh [Tier0-Frontend 路径] [分支，默认 release]
set -euo pipefail
FE="${1:-../Tier0-Frontend}"
REF="${2:-release}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/02-components/packages"
git -C "$FE" fetch -q origin "$REF"
rm -rf "$DEST" && mkdir -p "$DEST"
git -C "$FE" archive "origin/$REF" packages/ui packages/theme packages/utils packages/hooks | tar -x -C "$DEST" --strip-components=1
# 包里的 tsconfig 继承前端根目录的 tsconfig.base.json（../../tsconfig.base.json），一并复制
git -C "$FE" show "origin/$REF:tsconfig.base.json" > "$ROOT/02-components/tsconfig.base.json"
echo "$(git -C "$FE" rev-parse --short "origin/$REF") $(git -C "$FE" log -1 --format=%ad --date=short "origin/$REF")" > "$DEST/SOURCE"
echo "synced from Tier0-Frontend origin/$REF → $DEST"
