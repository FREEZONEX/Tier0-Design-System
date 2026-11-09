---
name: tier0-print
description: >-
  Tier0 single-page, poster, campaign, and other visual collateral. Built on
  DESIGN.md + shared foundations/assets; may use user-supplied craft skills or
  references within brand lock. Not for product consoles or full PPT decks.
---

# 单页与海报 · Print / Campaign

单页、海报、活动 KV、招聘/展会物料、基于品牌元素的其他视觉生成。

工作方式遵循 [任务策略](../../references/task-strategy.md)：简洁交付，按任务选方法。

## 真源（按优先级）

1. **共享品牌系统** — [`DESIGN.md`](../../DESIGN.md) · `foundations/` · `tokens/core.css` · `assets/`  
2. **当次 brief** — 尺寸、受众、一句话信息、必须出现的事实  
3. **用户指定的优质 skill / 参考** — 在品牌锁内提升构图与工艺（如 motion、排版参考）；不得改 Logo 文件、主色家族、IBM Plex / Tektur 体系  
4. 需要网页宿主时，可借用 `website` 的纸面编辑节奏，但仍属本场景交付物

## Load（最小集）

1. 本文件  
2. [`foundations/brand.md`](../../foundations/brand.md) · [`foundations/color.md`](../../foundations/color.md) · [`foundations/typography.md`](../../foundations/typography.md)  
3. [`tokens/core.css`](../../tokens/core.css)  
4. [`DESIGN.md`](../../DESIGN.md) 中 Brand shell / Color / Reject reflexes 段（不要默认全文）  
5. 交付：[`references/execution-contract.md`](../../references/execution-contract.md)

按需：用户给出的外部 skill（作第 2 角度）、`foundations/icons-lucide.md`、官方 Logo/QR 资产。

## Hard rules

- Logo 只用 `assets/tier0-logo-*.svg`，按底色选型；禁止文字伪 logo  
- 色：`#050B14` 结构 · `#B2ED1D` 信号 · `#73B200` 浅底可读绿字；绿是标点不是满铺  
- 字体：IBM Plex（标题/正文）；大标题展示可 Tektur；禁止 Poppins  
- 一页一个主信息；工业、克制、可信  
- 外部参考负责「更好看」，本仓负责「仍是 Tier0」  
- 若实际是多页 PPT → 转 `ppt` / slide-skill；若是可滚动官网 → 转 `website`

## 发挥空间

允许在锁定品牌下做：更强构图、更密信息图、更大留白、更明确动势建议。  
不允许：换品牌色、换字族、虚构产品 UI/数据当证据。

## 交付

静态 HTML / PDF 导出页 / 图稿说明均可；路径在仓库外。回复：交付文件 · 关键变化 · 限制。
