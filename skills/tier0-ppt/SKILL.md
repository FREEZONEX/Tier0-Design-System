---
name: tier0-ppt
description: >-
  Tier0 PPT / sales deck — unified entry. Spec mode for deck tokens and checklist;
  generate mode builds HTML + editable PPTX via the slide engine (skills/tier0-slide-skill).
  Trigger: Tier0 PPT, 售前 deck, Masterdeck, optimize PPTX. No Tektur — IBM Plex only
  (Tektur reserved for logo wordmark assets).
---

# PPT 制作 · Deck（统一入口）

路演、售前、对内讲解。**只维护本 skill 作为 PPT 入口**；生成引擎在 [`../tier0-slide-skill/`](../tier0-slide-skill/)（模板 / Gallery / scripts）。

## 模式

| 模式 | 何时 | Load |
|------|------|------|
| **规范** | 查 token、改预览、核对 checklist | 本文件 + 下方「规范最小集」 |
| **生成** | 从素材做 HTML + 可编辑 PPTX | 本文件工作流摘要 → **完整流程读** [`../tier0-slide-skill/SKILL.md`](../tier0-slide-skill/SKILL.md) |

VI 冲突：`tokens/deck.css` + `references/ppt-checklist.md` + `DESIGN.md`。

## 字体（硬锁）

- **IBM Plex Sans / SC** — 标题与正文（含深墨章节巨标题）  
- **IBM Plex Mono** — kicker、页码、技术标签  
- **禁止 Tektur / Poppins** — Tektur **仅**出现在官方 Logo SVG 字标中，不用于幻灯标题  
- 深墨章节可用全大写 + Plex；中文勿强行 uppercase

## 真源

1. `tokens/deck.css` · `surfaces/ppt/` · `references/ppt-checklist.md`  
2. 生成：`skills/tier0-slide-skill/assets/template-tier0.html` · Layout Gallery  
3. 共享：`assets/tier0-logo-*.svg` · 封底 QR `assets/website-qrcode-*.png`  
4. 技术插画配图（可选）：[`../tier0-svg-illustration/SKILL.md`](../tier0-svg-illustration/SKILL.md)  
5. 真实数据图（可选）：[`../lieflat-charts/SKILL.md`](../lieflat-charts/SKILL.md)

## 规范模式 · 最小集

1. 本文件  
2. [`surfaces/ppt/README.md`](../../surfaces/ppt/README.md)  
3. [`tokens/deck.css`](../../tokens/deck.css)  
4. [`references/ppt-workflow.md`](../../references/ppt-workflow.md)  
5. [`references/ppt-checklist.md`](../../references/ppt-checklist.md) + [`references/execution-contract.md`](../../references/execution-contract.md)

### On-demand（每次最多再加 1 个）

| 需要 | 读 |
|------|-----|
| 字体/色/FREEZONEX 硬锁 | `ppt-layout-lock.md` |
| 版式骨架 | `ppt-layouts.md` |
| 组件 / Style B | `ppt-components.md` |
| 流程 | `ppt-flowcharts.md` |
| 图示 / QR | `ppt-diagrams.md` |
| 截图 | `ppt-screenshots.md` |

**禁止**一次读完全部 `ppt-*.md`。

## 生成模式 · 摘要

完整步骤以 slide-skill 为准：

```
0. intake → start-tier0-intake.mjs
1. 模式 A 风格统一（默认）| B 失败页重排
2. 页级映射 → template-tier0.html
3. validate + PPTX
```

始终 3（在 slide-skill references）：`intake-gate` · `source-fidelity` · `tier0-vi-style-guide`。

```bash
node skills/tier0-slide-skill/scripts/start-tier0-intake.mjs --project 项目/客户
node skills/tier0-slide-skill/scripts/validate-tier0-deck.mjs 项目/ppt/index.html
```

## Hard rules（摘要）

- 画面仅 Tier0；禁止 FREEZONEX 字标  
- 深底标题强调可用 `#B2ED1D`；白底可读绿 `#73B200`；结构标记 `#B2ED1D`  
- 浅底禁止 `#B2ED1D` 小字（P0-8）  
- 无 Tektur 标题

## Preview

`preview/ppt/` · Gallery：`skills/tier0-slide-skill/layout-gallery/`
