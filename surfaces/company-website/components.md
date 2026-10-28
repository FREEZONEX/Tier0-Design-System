# 官网 — 组件规格（摘要）

当前实现以 `tokens/website.css` 与 [中性视觉基线](../../references/web-visual-baseline.md) 为准；sources 仅作历史归档。

## Eyebrow Chip

- 高 22px，`0 10px` padding，`radius 999px`  
- 底 `#F3F3F3`，边 `#EBEBEB`，字 `#343434`  
- IBM Plex Mono 10px，uppercase  

## Hero Title

- IBM Plex Sans **500**，最大宽约 820px  
- **仅关键短语** 用 `#73B200`（白底）或括号 `[Keyword]`  

## Diagram Panel

- 半径 4px，边 `#ebebeb`  
- 底 `#f9f9f9` 或 `#FFFFFF`  
- padding 28–40px，**无阴影**  

## Code Panel

- 底 `#f3f3f3`，mono 标签  
- 语法点缀：`--code-orange`、`--code-teal`  

## Feature Card（无 Icon）

- 白底 + 1px border  
- 标题 IBM Plex Sans 500 · 22–24px  
- hover：极轻边框加深，无重阴影  

## Card with Icon（Grid Tile）

能力栅格 / 四宫格常用。类名：`tier0-card-icon` + `tier0-icon-box`（`tokens/icon-card.css`）。

| 元素 | 规格 |
|------|------|
| 图标盒 | 42×42px，`#F3F3F3` 底，Lucide **`#343434`**，圆角 6px |
| 图标 | Lucide 22px，`stroke-width: 1.75` — 按语义选名见 [icons-lucide.md](../../foundations/icons-lucide.md) |
| 标题 | IBM Plex Sans 500，22–24px |
| 正文 | Plex Sans 14px，`--text-3` |
| 卡片 | min-h 184px，padding 26px，border `#ebebeb` |

预览：[`preview/company-website/card-with-icon.html`](../../preview/company-website/card-with-icon.html)

## Comparison Card（Closing）

- 两卡同宽  
- 两侧均用中性背景；Tier0 侧可用小型亮绿标记，避免整卡铺绿  

## 按钮

- 半径 4px，非 pill 泛滥  
- **主 CTA**：`#B2ED1D` 底 + 近墨字（对齐 pricing Free Trial）  
- 次操作：白底 + 细边框  
- 避免巨型营销圆角胶囊  
