---
name: tier0-website
description: >-
  Tier0 website / long-form web prototypes aligned to tier0.app. Shared brand
  foundations; user may supply extra references for craft upgrades without
  changing brand language. Not for product consoles or PPT decks.
---

# 网页原型 · Website

官网长页、产品叙事页、定价风页面、可打开的网页原型。

## 真源（按优先级）

1. **线上官网** — [tier0.app](https://tier0.app/)（视觉节奏、编辑风、CTA、信息架构的默认对齐对象）
2. **当次用户参考** — 你提供的优秀站点 / 截图 / skill（只提升版式与叙事，**不换品牌**）
3. **本仓场景规范** — `surfaces/company-website/` · `tokens/website.css`
4. **共享品牌** — `tokens/core.css` · `foundations/` · Logo 在 `assets/tier0-logo-*.svg`

## Load（最小集）

1. 本文件  
2. [`surfaces/company-website/README.md`](../../surfaces/company-website/README.md)  
3. [`tokens/website.css`](../../tokens/website.css) + [`tokens/core.css`](../../tokens/core.css)  
4. 交付：[`references/execution-contract.md`](../../references/execution-contract.md)

按需：`preview/company-website/` · `ui_kits/company-website/` · [`DESIGN.md`](../../DESIGN.md) Website 段  
（旧稿归档 `sources/spec.company-website.*` 默认不读）

## Hard rules

- 白底编辑风；对齐 Pricing / Builder，不做 startup 巨型 Hero 套路  
- 字体：IBM Plex Sans + Mono 标签；**禁止 Poppins**  
- 白底强调字 `#73B200`；主 CTA `#B2ED1D` + 近墨字  
- Logo：浅底 `assets/tier0-logo-black.svg`（官方文件，禁止文字伪 logo）  
- 圆角 ~4px；细边框；几乎无阴影  
- 外部参考可以更疏/更密/更强图示，但色板与字族不变

## Preview

`preview/company-website/` · `ui_kits/company-website/index.html`  
站：[Design System site](https://freezonex.github.io/Tier0-Design-System/site/)
