#!/usr/bin/env bash
# Install tier0-slide-skill for local agents (Cursor / Codex / Claude / Agents).
# One-liner:
#   curl -fsSL https://raw.githubusercontent.com/FREEZONEX/Tier0-Design-System/main/skills/tier0-slide-skill/scripts/install-skill.sh | bash
set -euo pipefail

REPO_URL="${TIER0_REPO_URL:-https://github.com/FREEZONEX/Tier0-Design-System.git}"
REPO_REF="${TIER0_REPO_REF:-main}"
INSTALL_HOME="${TIER0_SKILLS_HOME:-$HOME/.tier0}"
REPO_DIR="$INSTALL_HOME/Tier0-Design-System"
SKILL_REL="skills/tier0-slide-skill"
SKILL_DIR="$REPO_DIR/$SKILL_REL"
SKILL_NAME="tier0-slide-skill"

log() { printf '%s\n' "$*"; }
die() { printf 'Error: %s\n' "$*" >&2; exit 1; }

need() {
  command -v "$1" >/dev/null 2>&1 || die "需要 $1。请先安装后再重试。"
}

link_skill() {
  local target_dir="$1"
  mkdir -p "$target_dir"
  ln -sfn "$SKILL_DIR" "$target_dir/$SKILL_NAME"
  log "  ✓ $target_dir/$SKILL_NAME"
}

need git
need node
need npm

NODE_MAJOR="$(node -p "process.versions.node.split('.')[0]")"
if [ "$NODE_MAJOR" -lt 18 ]; then
  die "需要 Node.js 18+（当前 $(node -v)）"
fi

log "→ 安装目录：$INSTALL_HOME"
mkdir -p "$INSTALL_HOME"

if [ -d "$REPO_DIR/.git" ]; then
  log "→ 更新仓库…"
  git -C "$REPO_DIR" fetch --depth 1 origin "$REPO_REF"
  git -C "$REPO_DIR" checkout -q -B "$REPO_REF" "FETCH_HEAD"
else
  log "→ 稀疏克隆 skill（首次会稍慢）…"
  rm -rf "$REPO_DIR"
  git clone --depth 1 --filter=blob:none --sparse \
    --branch "$REPO_REF" "$REPO_URL" "$REPO_DIR"
  git -C "$REPO_DIR" sparse-checkout set "$SKILL_REL"
fi

# Ensure sparse set includes the skill on updates
if git -C "$REPO_DIR" sparse-checkout list >/dev/null 2>&1; then
  git -C "$REPO_DIR" sparse-checkout set "$SKILL_REL" >/dev/null 2>&1 || true
fi

[ -f "$SKILL_DIR/SKILL.md" ] || die "未找到 $SKILL_DIR/SKILL.md"

log "→ 安装 npm 依赖…"
(cd "$SKILL_DIR" && npm install --no-fund --no-audit)

log "→ 链接到本机 Agent skills 目录："
linked=0
if [ -d "$HOME/.cursor" ] || mkdir -p "$HOME/.cursor/skills" 2>/dev/null; then
  link_skill "$HOME/.cursor/skills"
  linked=1
fi
if [ -d "$HOME/.codex" ] || mkdir -p "$HOME/.codex/skills" 2>/dev/null; then
  link_skill "$HOME/.codex/skills"
  linked=1
fi
if [ -d "$HOME/.claude" ] || mkdir -p "$HOME/.claude/skills" 2>/dev/null; then
  link_skill "$HOME/.claude/skills"
  linked=1
fi
if [ -d "$HOME/.agents" ] || mkdir -p "$HOME/.agents/skills" 2>/dev/null; then
  link_skill "$HOME/.agents/skills"
  linked=1
fi

[ "$linked" -eq 1 ] || die "未能写入任何 skills 目录。"

cat <<EOF

安装完成。

Skill 路径：$SKILL_DIR

在 Cursor / Codex 新开对话后直接说：

  @tier0-slide-skill 帮我打开 PPT 交付表单（intake）入口

或：

  用 tier0-slide-skill 做一份 Tier0 产品介绍 PPT：8 页，交付 HTML + 可编辑 PPTX

更新 skill：再次运行本安装命令即可。
EOF
