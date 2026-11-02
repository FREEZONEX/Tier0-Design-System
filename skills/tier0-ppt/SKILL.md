---
name: tier0-ppt
description: >-
  Tier0 PPT / sales deck. Spec mode for deck tokens and checklist; PPTX restyle mode
  (python-pptx kit) for optimizing / merging existing .pptx case-study decks in the v3
  shadcn style; hand off to tier0-slide-skill when generating HTML + editable PPTX from scratch.
---

# PPT 制作 · Deck

路演、售前、对内讲解的幻灯片。

工作方式遵循 [任务策略](../../references/task-strategy.md)：简洁交付，按任务选方法。

## 三种模式

| 模式 | 何时 | Load |
|------|------|------|
| **规范** | 查 token、改预览组件、核对 checklist | 本文件 + 下列最小集 |
| **PPTX 改稿**（默认，用户给了 .pptx） | 优化 / 合并现有 .pptx、长文本重排、统一风格 | [`references/pptx-restyle.md`](references/pptx-restyle.md) + [`scripts/tier0_pptx_kit.py`](scripts/tier0_pptx_kit.py) |
| **生成** | 从素材做出 HTML + 可编辑 PPTX | 改走 [`../tier0-slide-skill/SKILL.md`](../tier0-slide-skill/SKILL.md) |

VI 冲突时以 **v3 色板（下方 Hard rules）** + `tokens/deck.css` + `references/ppt-checklist.md` 为准。

## PPTX 改稿 · 快速路径

```bash
python3 build.py src.pptx out.pptx          # build.py: from tier0_pptx_kit import *  (参考 examples/case_studies_v3.py)
skills/tier0-ppt/scripts/render_check.sh out.pptx qa/   # 装 IBM Plex → 渲染全部页（含隐藏）→ contact sheet
```

每页：`prep()` 清空 → `panel()` 右栏截图 → `place_logo()` → `overview()` → 结构区（`flow` / `grid` / `rows` / `kpis` / `loop_nodes` / `chips`）→ `value_row()`；全稿最后 `deck_cleanup()`。规则、网格、组件尺寸、验收与踩坑全在 [`pptx-restyle.md`](references/pptx-restyle.md)。

## 真源

1. **v3 色板 + 网格**：[`references/pptx-restyle.md`](references/pptx-restyle.md) §2–3 · `tokens/deck.css`  
2. `surfaces/ppt/` · `references/ppt-checklist.md`  
3. slide-skill：`template-tier0.html` · Layout Gallery  
4. 共享：`assets/tier0-logo-*.svg` · 封底 QR `assets/website-qrcode-*.png`

## Load（规范模式最小集）

1. 本文件  
2. [`surfaces/ppt/README.md`](../../surfaces/ppt/README.md)  
3. [`tokens/deck.css`](../../tokens/deck.css)  
4. [`references/ppt-workflow.md`](../../references/ppt-workflow.md)  
5. 交付：[`references/ppt-checklist.md`](../../references/ppt-checklist.md) + [`references/execution-contract.md`](../../references/execution-contract.md)

## On-demand（每次最多再加 1 个）

| 需要 | 读 |
|------|-----|
| 改现有 .pptx | `skills/tier0-ppt/references/pptx-restyle.md` |
| 字体/色/FREEZONEX 硬锁 | `ppt-layout-lock.md` |
| 版式骨架 | `ppt-layouts.md` |
| 组件 / Style B | `ppt-components.md` |
| 流程 | `ppt-flowcharts.md` |
| 图示 / QR | `ppt-diagrams.md` |
| 截图 | `ppt-screenshots.md` |

**禁止**一次读完全部 `ppt-*.md`。

## Hard rules（v3 · 2026-11）

- 字体：Tektur（封面/深墨章节）+ IBM Plex Sans / SC / Mono；禁止 Poppins  
- 画面仅 Tier0；禁止 FREEZONEX 字标；删除与眉标重复的页脚  
- **颜色只有 5 个**：文字 `#050B14` · 次要 `#71717A` · Tier0 绿 `#CBF368`（仅填充 / 深底挑词，白底不作文字）· 面 `#FAFAFA` · 线 `#E4E4E7`  
- 不再使用 `#73B200` 灰调绿字、`#B2ED1D` 旧亮绿、`#F4F4F4` 灰（`deck_cleanup` 自动替换）  
- 直角为主，圆角只有 4px（卡片 / 面板 / chip / 节点）；卡片 = FAFAFA + 0.75pt 细边，无彩色顶边  
- 分区标签：绿方块 ■ + Mono caps；眉标 `CASE STUDY` 灰色  
- 网格：边距 0.5"，左栏 6.6" + 0.4" + 右栏 5.33"，两栏标签同行，间距 0.1/0.2/0.3

## Preview

`preview/ppt/` · Gallery：`skills/tier0-slide-skill/layout-gallery/`
