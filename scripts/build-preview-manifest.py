#!/usr/bin/env python3
"""
Scan Tier0 Design System repo and emit preview/manifest.json
for the visual maintenance portal (preview/index.html).
"""

from __future__ import annotations

import html
import json
import os
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "preview" / "manifest.json"
CLASSIC_OUT = ROOT / "preview" / "classic.html"

PORTAL_HTML = {"index.html", "classic.html"}

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
        "hint": "tier0-product · company-website · marketing-deck",
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


def write_classic_html(paths: list[Path]) -> None:
    """Old-style link index: open one HTML preview card at a time."""
    groups: dict[str, list[Path]] = {}
    for p in paths:
        key = p.parts[1] if len(p.parts) > 2 else "preview"
        groups.setdefault(key, []).append(p)

    folder_labels = {
        "_shared": "_shared/ — 原子 token（core.css）",
        "tier0-product": "tier0-product/ — 产品后台（product.css）",
        "company-website": "company-website/ — 公司官网（website.css）",
        "marketing-deck": "marketing-deck/ — PPT / 市场材料（deck.css）",
    }

    def classic_href(path: Path) -> str:
        """Relative URL from preview/classic.html (strip leading preview/)."""
        rel = path.as_posix()
        prefix = "preview/"
        if rel.startswith(prefix):
            return rel[len(prefix) :]
        return rel

    sections: list[str] = []
    for key in sorted(groups.keys()):
        label = folder_labels.get(key, f"{key}/")
        links = "\n".join(
            f'        <li><a href="{html.escape(classic_href(p), quote=True)}">'
            f"{html.escape(p.name)}</a></li>"
            for p in groups[key]
        )
        sections.append(
            f'    <section>\n'
            f"      <h2>{html.escape(label)}</h2>\n"
            f"      <ul>\n{links}\n      </ul>\n"
            f"    </section>"
        )

    body = "\n".join(sections)
    page_html = f"""<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tier0 Preview — 经典单页索引</title>
  <link rel="stylesheet" href="../tokens/core.css">
  <style>
    body {{
      margin: 0;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 14px;
      color: var(--fx-black-0, #050B14);
      background: #f6f7f9;
      line-height: 1.5;
    }}
    .wrap {{ max-width: 720px; margin: 0 auto; padding: 32px 24px 48px; }}
    h1 {{ font-size: 1.25rem; margin: 0 0 8px; }}
    .lead {{ color: var(--fx-black-4, #585C62); margin: 0 0 24px; font-size: 13px; }}
    .banner {{
      background: var(--fx-green-1, #F0FBD2);
      border-left: 4px solid var(--fx-deep-green, #73B200);
      padding: 12px 16px;
      margin-bottom: 28px;
      font-size: 13px;
      border-radius: 0 4px 4px 0;
    }}
    .banner a {{ color: var(--fx-deep-green); }}
    section {{ margin-bottom: 28px; }}
    h2 {{
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--fx-black-4);
      margin: 0 0 10px;
      font-weight: 600;
    }}
    ul {{ margin: 0; padding-left: 1.25rem; }}
    li {{ margin: 6px 0; }}
    a {{ color: var(--fx-deep-green); text-decoration: none; }}
    a:hover {{ text-decoration: underline; }}
    code {{
      font-family: "IBM Plex Mono", monospace;
      font-size: 12px;
      background: #fff;
      padding: 2px 6px;
      border-radius: 3px;
    }}
  </style>
</head>
<body>
  <motion.div class="wrap">
    <h1>Tier0 Design System — 经典预览索引</h1>
    <p class="lead">改维护门户之前的用法：起本地服务后，从这里点进单个 HTML 组件卡。</p>
    <motion.div class="banner">
      启动方式：<code>python3 -m http.server 8899</code>（在仓库根目录）<br>
      维护门户（全仓库目录）：<a href="index.html">preview/index.html</a>
    </motion.div>
{body}
  </motion.div>
</body>
</html>
"""
    page_html = page_html.replace("motion.div", "div")
    CLASSIC_OUT.write_text(page_html, encoding="utf-8")


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
        "assets": collect_files(ROOT / "assets", {".svg"}),
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
                "id": "marketing-deck",
                "label": "PPT / 市场材料",
                "token": "tokens/deck.css",
                "surface": "surfaces/marketing-deck/",
            },
        ],
    }

    component_html = preview_component_paths()
    write_classic_html(component_html)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(
        f"Wrote {OUT.relative_to(ROOT)} ({total} files, {len(component_html)} HTML previews)"
    )
    print(f"Wrote {CLASSIC_OUT.relative_to(ROOT)} (classic index)")


if __name__ == "__main__":
    main()
