---
name: tier0-product
description: >-
  Tier0 product prototypes and console UI. Align to Tier0-Frontend packages and
  Figma Tier0-UI-Design; shared brand from foundations. Dense industrial workbench,
  not marketing pages or decks.
---

# 产品原型 · Product

后台 / UNS / 表格表单侧栏 / 可交互产品原型。

## 真源（按优先级）

1. **实现库** — [FREEZONEX/Tier0-Frontend](https://github.com/FREEZONEX/Tier0-Frontend)  
   `packages/theme` · `packages/ui`（workspace 内优先 Glob 本地 monorepo）
2. **设计源稿** — [Figma · Tier0 UI Design](https://www.figma.com/design/jmqCj0T7EoMnC4FNsAHfbl/Tier0-UI-Design?node-id=14311-69336)  
   布局、层级、间距以 Figma 为准；可用 Frontend 最新组件做合理优化，**不要**另起一套 UI
3. **本仓场景规范** — `surfaces/tier0-product/` · `tokens/product.css`
4. **共享品牌** — `tokens/core.css` · `foundations/brand.md`

Cloud 高还原（画廊 / 静态稿 / `@tier0/ui`）：另用 **`@tier0productdesign`**，Logo 见其 `brand-logo.md`（66×16）。

## Load（最小集）

1. 本文件  
2. [`surfaces/tier0-product/README.md`](../../surfaces/tier0-product/README.md)  
3. [`tokens/product.css`](../../tokens/product.css) + [`tokens/core.css`](../../tokens/core.css)  
4. 交付：[`references/execution-contract.md`](../../references/execution-contract.md)

按需：`preview/tier0-product/` · `ui_kits/tier0-product/` · Figma 目标 `node-id`  
（旧稿归档 `sources/spec.product-ui.md` 默认不读）

## Monorepo 检查（编码前）

1. Glob `packages/theme/src/themes.scss`  
2. **有** → 以库为事实：`themes.scss` · `variables.scss` · `tailwind.css` · `token.ts` + 相关 `packages/ui`  
3. **无** → 提示克隆 Frontend 进 workspace；确认后仅用设计系统 + Figma 继续

## Hard rules

- 工具气质、高密度；禁止营销 Hero / emoji / 大面积渐变  
- 结构：`Header → Controls → Content`  
- 主按钮近黑；绿 = 选中/进度/高亮，不是满屏主色  
- 浅色主按钮高亮 `#CCF368`，勿用 `#B2ED1D` 当小按钮底  
- 图标：IBM Carbon  
- Logo：产品壳用官方 SVG（Cloud：`preview/assets/logo.svg` 66×16）

## Preview

`preview/tier0-product/` · `ui_kits/tier0-product/index.html`
