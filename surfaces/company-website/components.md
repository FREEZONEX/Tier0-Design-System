# 官网 — 组件规格（摘要）

完整 CSS 见 [`sources/spec.company-website.tokens.md`](../../sources/spec.company-website.tokens.md)。

## Eyebrow Chip

- 高 22px，`0 10px` padding，`radius 999px`  
- 底 `#F3F8E8`，边 `#D7E5B2`，字 `#8EBB1D`  
- IBM Plex Mono 10px，uppercase  

## Hero Title

- Poppins 700，最大宽约 820px  
- **仅关键短语** `--green-brand`  

## Diagram Panel

- 半径 4px，边 `#E2E6DE`  
- 底 `#F9FAF6` 或 `#FFFFFF`  
- padding 28–40px，**无阴影**  

## Code Panel

- 底 `#F6F7F3`，mono 标签  
- 语法点缀：`--code-orange`、`--code-teal`  

## Feature Card（无 Icon）

- 白底 + 1px border  
- 标题 Poppins 600 24px  
- hover：`--shadow-hover` 极轻  

## Card with Icon（Grid Tile）

能力栅格 / 四宫格常用。类名：`tier0-card-icon` + `tier0-icon-box`（`tokens/icon-card.css`）。

| 元素 | 规格 |
|------|------|
| 图标盒 | 42×42px，`#EEF6D7` 底，Lucide **`#8EBB1D`**，圆角 6px |
| 图标 | Lucide 22px，`stroke-width: 1.75` — 按语义选名见 [icons-lucide.md](../../foundations/icons-lucide.md) |
| 标题 | Poppins 600，22–24px |
| 正文 | Plex Sans 14px，`--text-3` |
| 卡片 | min-h 184px，padding 26px，border `#E2E6DE` |

预览：[`preview/company-website/card-with-icon.html`](../../preview/company-website/card-with-icon.html)

## Comparison Card（Closing）

- 两卡同宽  
- Tier0 侧：`--green-soft-2` 或 accent 边框  

## 按钮

- 半径 4px，非 pill 泛滥  
- 主操作克制，避免巨型营销 CTA  
