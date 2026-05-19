# PPT / 市场材料 — 组件

## 带 Icon 的能力卡片

与官网 **Grid Tile** 同构，类名与 token 共用 `tokens/icon-card.css`（经 `deck.css` 引入）。

| 元素 | 规格 |
|------|------|
| 容器 | `.tier0-card-icon` |
| 图标盒 | `.tier0-icon-box` — 40×40px，`#EEF6D7` 底，图标 `#8EBB1D` |
| 图标 | **Lucide**，20px，`stroke-width: 1.75` |
| 标题 | IBM Plex Sans/SC **Medium**，18px，`#050B14` |
| 正文 | 14px，65% 黑 |

白底幻灯片场景图标名参考 [icons-lucide.md](../../foundations/icons-lucide.md)。

预览：[`preview/marketing-deck/card-with-icon.html`](../../preview/marketing-deck/card-with-icon.html)

## 流程三栏卡（Type D）

- 顶边线 **`#B2ED1D`**（`--ppt-accent-marker`）  
- 小标题字 **`#73B200`**（`--ppt-emphasis-on-light`）  
- 一般**不加** Lucide 盒（与带 Icon 栅格卡区分）

## 页脚

仅 Tier0 版权 — 见 `export.md`
