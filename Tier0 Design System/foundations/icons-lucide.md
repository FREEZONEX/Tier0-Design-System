# 图标 — Lucide（全局）

除 **产品 UI** 侧栏/表格等仍用 **Carbon 风格**（见 [iconography.md](iconography.md)）外，**官网、PPT / 市场材料、HTML 原型** 统一使用 **[Lucide](https://lucide.dev/icons/)**。

## 引用方式

### HTML 预览 / 静态页

```html
<script src="https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js"></script>
<i data-lucide="database" aria-hidden="true"></i>
<script>lucide.createIcons();</script>
```

### React / 生产代码

```bash
npm install lucide-react
```

```tsx
import { Database } from "lucide-react";
<Database size={22} strokeWidth={1.75} color="var(--icon-box-color)" />
```

## 样式约定

| 属性 | 值 |
|------|-----|
| 风格 | 描边（stroke），**不填色** |
| `stroke-width` | **1.75**（16–24px 图标）；细 UI 可用 1.5 |
| `stroke-linecap` / `join` | `round` |
| 颜色 | 随上下文 token，**禁止**彩虹多色 |

## 按放置位置选图标（推荐）

| 场景 | 尺寸 | 推荐 Lucide 名（示例） |
|------|------|------------------------|
| **带 Icon 的能力卡片** | 盒内 20–22px | `database` `network` `workflow` `radio` `layers` `shield-check` `git-branch` |
| 导航 / 外链 | 16–18px | `arrow-right` `external-link` `menu` `chevron-down` |
| 搜索 / 筛选 | 16–18px | `search` `filter` `sliders-horizontal` |
| 连接 / 数据流 | 20–24px | `cable` `arrow-left-right` `activity` `share-2` |
| 安全 / 部署 | 20–22px | `shield` `lock` `server` `cloud` |
| 成功 / 对比勾选 | 14–16px | `check` `check-circle` |
| 警告 / 错误 | 14–16px | `alert-circle` `alert-triangle` |
| 文档 / 代码 | 18–20px | `file-text` `code-2` `book-open` |
| 时间 / 日程 | 16–18px | `calendar` `clock` |
| 联系 / 下一步 | 18px | `mail` `calendar-plus` `arrow-right` |

选图标原则：

1. **语义优先** — 一眼能对应模块（Namespace → `layers` / `folder-tree`，Broker → `radio`）  
2. **一套笔画** — 同页不混 Lucide 与 Carbon / 填色 iconfont  
3. **少而准** — 一卡一图标；列表行内 16px 即可  
4. **访问性** — 装饰性图标 `aria-hidden="true"`；仅图标按钮加 `aria-label`

## 带 Icon 的卡片（官网 & 市场材料）

两表面共用组件类 **`.tier0-card-icon`** + **`.tier0-icon-box`**（`tokens/icon-card.css`）。

| Token / 类 | 官网 | PPT 白底卡 |
|------------|------|-----------|
| CSS 入口 | `tokens/website.css` | `tokens/deck.css` |
| 图标盒 | 42×42px，`#EEF6D7` 底，`#8EBB1D` 描边 | 40×40px，同色逻辑 |
| 卡片 | 1px `#E2E6DE`，padding 26px，min-h 184px | padding 20px，min-h 160px |

预览：

- 官网：[`preview/company-website/card-with-icon.html`](../preview/company-website/card-with-icon.html)  
- PPT：[`preview/marketing-deck/card-with-icon.html`](../preview/marketing-deck/card-with-icon.html)  
- 索引：[`preview/_shared/icons-lucide.html`](../preview/_shared/icons-lucide.html)

完整尺寸见 `sources/spec.company-website.editorial.md` §9.7 Grid Tile。

## 禁止

- Emoji、Font Awesome 填色图标、与 Lucide 混用的另一套线宽  
- 产品后台侧栏改用 Lucide（仍用 Carbon / `ui_kits/tier0-product/Icons.jsx`）  
- 在 PPT 幻灯片上使用复杂多色 SVG 图标库
