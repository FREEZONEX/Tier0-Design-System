---
name: tier0-framer-page
description: >-
  Deliver a Tier0 website page (resource / list / changelog / advisory style)
  as a Framer code component that drops into tier0.app pages built in Framer.
  Covers the tier0.app visual rules learned from review (transparent canvas,
  4px radii, no shadows, square lime CTA, sidebar + list card), site-locale
  auto language, container-query responsive layout for 1440 / 730 / 390
  Framer breakpoints, and a build → verify → deliver workflow with a working
  template. Use when the request mentions Framer, embedding into the website,
  or turning an HTML page into something the site team can paste into Framer.
  Not for product consoles (product) or decks (ppt).
---

# Framer 页面交付 · Framer Page

把一个官网页面（安全公告、更新日志、资源列表、文档目录这类「筛选 + 列表 + 详情」页）做成 **可直接放进 Framer 的代码组件**，风格对齐 [tier0.app](https://tier0.app/)。

本 skill 是 `website` 场景的交付分支：品牌与版式仍以 [`tier0-website`](../tier0-website/SKILL.md) 为准，这里补充 **Framer 落地方式、评审中确认过的视觉细则、交付流程与验收脚本**。

工作方式遵循 [任务策略](../../references/task-strategy.md)：简洁交付，按任务选方法。

网页底色与文档层级以 [中性视觉基线](../../references/web-visual-baseline.md) 为准；Tier0-doc 参考阅读结构，Frontend 参考组件与中性色。

## 真源（按优先级）

1. 用户当次硬约束（文案、数据、邮箱、禁用项）  
2. [tier0.app](https://tier0.app/) 线上样式（按钮、导航、字体节奏）  
3. 本 skill 的 [`references/visual-spec.md`](references/visual-spec.md)（评审定稿的细则）  
4. 共享品牌：`tokens/core.css` · `foundations/` · [`surfaces/company-website/README.md`](../../surfaces/company-website/README.md)

## Load（最小集）

1. 本文件  
2. [`references/visual-spec.md`](references/visual-spec.md) — 视觉与布局细则（动手设计前读）  
3. [`references/framer-delivery.md`](references/framer-delivery.md) — Framer 组件写法、坑位与验收清单（写代码前读）  
4. 交付：[`references/execution-contract.md`](../../references/execution-contract.md)

起步代码：[`template/`](template/README.md)（安全公告页完整实现，可直接改数据复用，或只复用构建 / 验收骨架）。

## 交付流程

| 步 | 做什么 | 产出 |
|----|--------|------|
| 0 | **约束账本**（execution-contract §0）：受众、交付格式（Framer 代码组件）、已确认要求、证据、缺口。每轮改动后对照全表，修 A 不丢 B | 账本 |
| 1 | **拆源**：把原始 HTML 的数据与文案拆成单一事实源 — `src/data.js`（中文为源 + 英文译文按 id 映射）、`src/messages.js`（`zh-CN` / `en` 同 key） | data / messages |
| 2 | **先删后加**：删掉装饰性冗余（见 visual-spec「删除清单」），再按 visual-spec 搭结构 | — |
| 3 | **实现**：`src/widget.css`（全部挂在根前缀下）+ `src/widget.js`（`createX().html()` 出静态 HTML，`mount()` 接管交互） | src/ |
| 4 | **构建**：`node build.mjs` → `out/<Component>.tsx` + `out/preview.html`。**禁止手改 .tsx** | out/ |
| 5 | **验收**：`node verify.mjs` — 中英 SSR、hydration、1440/730/390 宽度（含 1440 窗口内的 Framer 画板模拟和真机触屏）、溢出、筛选与展开交互，0 问题才算通过；再肉眼看 `out/verify/shots/` | 截图 + 通过日志 |
| 6 | **交付**：发 `.tsx` 与 `preview.html`；附 Framer 安装三步（见下）；回复只写 交付文件 · 关键变化 · 限制 | — |
| 7 | **迭代**：用户反馈 → 只改 `src/` → 重新 build + verify → 再发整份 `.tsx`。截图里的旧问题先确认是不是旧文件 | — |

页面若需要 SEO 描述，一并给出：英文 ≤155 字符、中文 ≤80 字，含「受影响版本 / 修复版本 / 升级」这类搜索词，给推荐 + 更短两档。

### Framer 安装（写进交付回复）

1. Assets → Code → `+` → New code file，整份粘贴 `.tsx`（不是 Embed）  
2. 拖到页面；每个断点（Desktop / Tablet 730 / Mobile）宽度 **Fill**、高度 **Fit Content**  
3. 右侧面板：Language 默认 Auto（跟随站点语言）；按导航高度调 Nav offset；外层 Frame 已有边距时把 Side padding 调 0

## Hard rules（评审定稿，违反即返工）

- **透明画布**：组件不画整块背景、渐变、网格纹理（Framer 页面自带底色，组件底色会变成错位色块）  
- **圆角 4px**（嵌套 3px）；只有状态圆点、步骤编号可圆形  
- **无阴影**：卡片 / 输入框 / 按钮只用 1px 细边框  
- **主 CTA 方形**：`#B2ED1D` 底 + 近墨字 + Mono 大写，4px 圆角，放 Hero 右上；联系 / 上报类动作用 `mailto:` 按钮  
- **不放语言切换**：语言跟随站点（Framer 本地化 → `<html lang>` → 浏览器），组件属性可强制  
- **Hero 描述一行**：桌面不换行（英文 ≈80 字符内、中文 ≈40 字内）  
- **配色只用三组**：亮绿 `#B2ED1D`、中性灰（`#F9F9F9` / `#F3F3F3` / `#EBEBEB`）、近墨 `#050B14`；禁止橄榄绿与绿调灰  
- **手机端不靠横向滑动**：Framer 发布页里横滑可能被拦截；筛选平铺（2 列网格）或下拉，卡片竖排  
- **响应式用 container query**，不用 `@media`（Framer 画布里各断点共用一个窗口宽度）  
- 字体：IBM Plex Sans（标题 / 正文）+ IBM Plex Mono（标签 / CTA）；禁止 Poppins  
- Logo 只用 `assets/tier0-logo-*.svg`；组件嵌入官网时通常不带 Logo（页头由 Framer 站点提供）

## Anti-patterns

- 把 TSX 当 HTML 贴进 Framer **Embed**（不会渲染）  
- 手改生成的 TSX 里的 CSS 字符串（引号截断 → 整个文件编译失败 → 页面空白）  
- Google Fonts 链接里放不存在的字体族（如 `IBM Plex Sans SC`）→ 整条字体请求失败  
- 用 `position:fixed` 的 toast（Framer 祖先有 transform 时会错位）→ 改按钮内反馈  
- 未跑 `verify.mjs` 就声称「各断点正常」
