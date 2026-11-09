# PPT — 组件

> **Agent：** 组件用法、HTML 片段、页脚与 KPI 细则见 [`references/ppt-components.md`](../../references/ppt-components.md)。

## 带 Icon 的能力卡片

类名 `.tier0-card-icon`（Figma **`4059:2453`**）：顶栏标题 + 28px 图标 · 分隔线 · `.card-lead` + `.card-list`。变体 `--accent`（主题绿底 + 深字）/ `--neutral`（浅灰）/ `--dark`（深黑底 + 白字）。样式在 `deck.css`（`.deck-slide` 作用域）。

## Style B · 瑞士网格色块卡

类名 `.deck-card-b` + `--fill-dark|gray|green|green-mid|green-deep` + `--index|panel|stripe|stat|split`。详见 [`references/ppt-components.md`](../../references/ppt-components.md) · 预览 [`preview/ppt/cards-style-b.html`](../../preview/ppt/cards-style-b.html)。

**对比度：** 浅底禁止 `#B2ED1D` 文字；绿填充仅配 `#050B14` 深字（P0-8）。

## 流程三栏卡（Type D）

- 顶边线 **`#B2ED1D`**（`--ppt-accent-marker`）  
- 小标题字 **`#73B200`**（`--ppt-emphasis-on-light`）  
- 一般**不加** Lucide 盒（与带 Icon 栅格卡区分）

## 页脚

仅 Tier0 版权 — 见 `export.md`
