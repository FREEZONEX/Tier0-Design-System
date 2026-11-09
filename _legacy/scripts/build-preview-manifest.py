#!/usr/bin/env python3
"""
Scan Tier0 Design System repo and emit preview/manifest.json
for the visual maintenance portal (preview/index.html).
"""

from __future__ import annotations

import json
import os
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "preview" / "manifest.json"

PORTAL_HTML = {"index.html"}

SKIP_DIRS = {
    ".git",
    ".cursor",
    "__pycache__",
    "node_modules",
    ".venv",
    "scripts",
}

SKIP_FILES = {".DS_Store", "manifest.json"}

SECTION_META = {
    "foundations": {
        "label": "Foundations",
        "subtitle": "全场景共享基础",
        "hint": "品牌、色、字、间距、图标、语气",
    },
    "tokens": {
        "label": "Tokens",
        "subtitle": "设计变量 CSS",
        "hint": "core + 各场景覆盖",
    },
    "surfaces": {
        "label": "Surfaces",
        "subtitle": "分场景规范文档",
        "hint": "tier0-product · company-website · ppt",
    },
    "preview": {
        "label": "Preview",
        "subtitle": "组件 HTML 预览卡",
        "hint": "浏览器内可直接查看效果",
    },
    "ui_kits": {
        "label": "UI Kits",
        "subtitle": "参考实现",
        "hint": "HTML / JSX 示例，供开发对照",
    },
    "sources": {
        "label": "Sources",
        "subtitle": "规范原文归档",
        "hint": "历史 spec，冲突时见 README 优先级",
    },
    "assets": {
        "label": "Assets",
        "subtitle": "Logo 等资源",
        "hint": "SVG 等品牌资产",
    },
    "fonts": {
        "label": "Fonts",
        "subtitle": "本地字体文件",
        "hint": "Poppins · IBM Plex Sans/SC · Tektur · Mono",
    },
    "references": {
        "label": "References",
        "subtitle": "Skill 工作流参考",
        "hint": "按需加载的 agent workflow 与检查清单",
    },
}

EXT_KIND = {
    ".md": "markdown",
    ".html": "html",
    ".css": "css",
    ".jsx": "jsx",
    ".svg": "image",
    ".ttf": "font",
}


def file_kind(path: Path) -> str:
    return EXT_KIND.get(path.suffix.lower(), "file")


def should_skip_dir(name: str) -> bool:
    return name in SKIP_DIRS or name.startswith(".")


def collect_files(base: Path, extensions: set[str] | None = None) -> list[Path]:
    if not base.is_dir():
        return []
    files: list[Path] = []
    for dirpath, dirnames, filenames in os.walk(base):
        dirnames[:] = sorted(d for d in dirnames if not should_skip_dir(d))
        for name in sorted(filenames):
            if name in SKIP_FILES:
                continue
            p = Path(dirpath) / name
            if extensions and p.suffix.lower() not in extensions:
                continue
            files.append(p.relative_to(ROOT))
    return files


def group_by_parent(paths: list[Path]) -> dict[str, list[Path]]:
    groups: dict[str, list[Path]] = {}
    for p in paths:
        parent = p.parent.as_posix() if p.parent != Path(".") else ""
        groups.setdefault(parent, []).append(p)
    return groups


def entry_for(path: Path) -> dict:
    rel = path.as_posix()
    kind = file_kind(path)
    return {
        "path": rel,
        "name": path.name,
        "kind": kind,
        "previewable": kind == "html",
        "group": path.parent.as_posix() if path.parent != Path(".") else "",
    }


def build_section(section_id: str, paths: list[Path]) -> dict | None:
    if not paths:
        return None
    meta = SECTION_META.get(section_id, {"label": section_id, "subtitle": "", "hint": ""})
    groups = group_by_parent(paths)
    children = []
    for group_key in sorted(groups.keys()):
        items = [entry_for(p) for p in sorted(groups[group_key], key=lambda x: x.name)]
        label = group_key.split("/")[-1] if group_key else section_id
        children.append(
            {
                "id": f"{section_id}--{group_key or 'root'}",
                "label": label,
                "path": group_key or section_id,
                "files": items,
            }
        )
    return {
        "id": section_id,
        "label": meta["label"],
        "subtitle": meta["subtitle"],
        "hint": meta["hint"],
        "fileCount": len(paths),
        "groups": children,
    }


def preview_component_paths() -> list[Path]:
    """HTML component cards only (exclude portal pages)."""
    all_html = collect_files(ROOT / "preview", {".html"})
    return sorted(
        p for p in all_html
        if p.name not in PORTAL_HTML and p.parent != Path("preview")
    )


def build_root_docs() -> dict:
    docs = []
    for name in ("README.md", "SKILL.md"):
        p = ROOT / name
        if p.exists():
            docs.append(entry_for(p.relative_to(ROOT)))
    return {
        "id": "root",
        "label": "仓库入口",
        "subtitle": "README · Agent 路由",
        "hint": "设计系统总索引与 AI 场景说明",
        "fileCount": len(docs),
        "groups": [{"id": "root--docs", "label": "根目录", "path": "", "files": docs}],
    }


def main() -> None:
    sections = [build_root_docs()]

    section_paths = {
        "foundations": collect_files(ROOT / "foundations", {".md"}),
        "tokens": collect_files(ROOT / "tokens", {".css"}),
        "surfaces": collect_files(ROOT / "surfaces", {".md"}),
        "preview": preview_component_paths(),
        "ui_kits": collect_files(ROOT / "ui_kits", {".html", ".jsx", ".md"}),
        "sources": collect_files(ROOT / "sources", {".md"}),
        "assets": collect_files(ROOT / "assets", {".svg", ".png"}),
        "fonts": collect_files(ROOT / "fonts", {".ttf", ".txt"}),
        "references": collect_files(ROOT / "references", {".md"}),
    }

    for sid, paths in section_paths.items():
        sec = build_section(sid, paths)
        if sec:
            sections.append(sec)

    html_count = len(section_paths["preview"])
    total = sum(s["fileCount"] for s in sections)

    manifest = {
        "version": 1,
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "repoName": "Tier0 Design System",
        "stats": {
            "totalIndexed": total,
            "htmlPreviews": html_count,
            "sections": len(sections),
        },
        "sections": sections,
        "surfaces": [
            {
                "id": "tier0-product",
                "label": "产品后台",
                "token": "tokens/product.css",
                "surface": "surfaces/tier0-product/",
            },
            {
                "id": "company-website",
                "label": "公司官网",
                "token": "tokens/website.css",
                "surface": "surfaces/company-website/",
            },
            {
                "id": "ppt",
                "label": "PPT",
                "token": "tokens/deck.css",
                "surface": "surfaces/ppt/",
            },
        ],
    }

    component_html = preview_component_paths()

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(
        f"Wrote {OUT.relative_to(ROOT)} ({total} files, {len(component_html)} HTML previews)"
    )

if __name__ == "__main__":
    main()
