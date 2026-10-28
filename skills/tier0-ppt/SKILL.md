---
name: tier0-ppt
description: >-
  Tier0 PPT / sales deck. Spec mode for Masterdeck tokens and checklist; hand off
  to tier0-slide-skill when generating HTML + editable PPTX. Shared brand assets.
---

# PPT 制作 · Deck

路演、售前、对内讲解的幻灯片。

工作方式遵循 [任务策略](../../references/task-strategy.md)：简洁交付，按任务选方法。

## 两种模式

| 模式 | 何时 | Load |
|------|------|------|
| **规范** | 查 token、改预览组件、核对 checklist | 本文件 + 下列最小集 |
| **生成** | 从素材做出 HTML + 可编辑 PPTX | 改走 [`../tier0-slide-skill/SKILL.md`](../tier0-slide-skill/SKILL.md) |

VI 冲突时仍以 `tokens/deck.css` + `references/ppt-checklist.md` 为准。

## 真源

1. `tokens/deck.css` · `surfaces/ppt/` · `references/ppt-checklist.md`  
2. slide-skill：`template-tier0.html` · Layout Gallery  
3. 共享：`assets/tier0-logo-*.svg` · 封底 QR `assets/website-qrcode-*.png`

## Load（规范模式最小集）

1. 本文件  
2. [`surfaces/ppt/README.md`](../../surfaces/ppt/README.md)  
3. [`tokens/deck.css`](../../tokens/deck.css)  
4. [`references/ppt-workflow.md`](../../references/ppt-workflow.md)  
5. 交付：[`references/ppt-checklist.md`](../../references/ppt-checklist.md) + [`references/execution-contract.md`](../../references/execution-contract.md)

## On-demand（每次最多再加 1 个）

| 需要 | 读 |
|------|-----|
| 字体/色/FREEZONEX 硬锁 | `ppt-layout-lock.md` |
| 版式骨架 | `ppt-layouts.md` |
| 组件 / Style B | `ppt-components.md` |
| 流程 | `ppt-flowcharts.md` |
| 图示 / QR | `ppt-diagrams.md` |
| 截图 | `ppt-screenshots.md` |

**禁止**一次读完全部 `ppt-*.md`。

## Hard rules（摘要）

- Tektur（封面/深墨章节）+ IBM Plex；禁止 Poppins  
- 画面仅 Tier0；禁止 FREEZONEX 字标  
- 深底标题绿 `#B2ED1D`；白底 `#73B200`；结构标记始终 `#B2ED1D`  
- 浅底禁止 `#B2ED1D` 小字（P0-8）

## Preview

`preview/ppt/` · Gallery：`skills/tier0-slide-skill/layout-gallery/`
