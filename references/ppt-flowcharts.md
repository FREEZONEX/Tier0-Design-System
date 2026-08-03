# Marketing Deck — Flow 卡片与连线样式

对齐 Figma **Tier0 设计素材**：卡片 `4057:2384` · 线型 `4057:2393`。**只规定四类卡片色 + 三种线型**；布局与文案自定。

实现：`tokens/deck.css` · 预览：[`flow-styles.html`](../preview/ppt/flow-styles.html)

---

## 1. 四种节点卡

共用：`border-radius: 4px` · `border: 1.5px solid` · `padding: 10px 24px` · 内容区 `gap: 6px` 居中。

| 修饰类 | 填充 | 描边 | 副标题色 |
|--------|------|------|----------|
| `.deck-flow-card--soft` | `#C5E855` | `#73B200` | `#050B14` |
| `.deck-flow-card--lime` | `#B2ED1D` | `#73B200` | `#585C62` |
| `.deck-flow-card--white` | `#FFFFFF` | `#1D77FE` | `#1D77FE` |
| `.deck-flow-card--blue` | `#D2E4FF` | `#1D77FE` | `#585C62` |

**字号：**

| 元素 | 样式 |
|------|------|
| 主标题 `.deck-flow-card__title` | 18px IBM Plex Sans Medium，`#050B14` |
| 副标题 `.deck-flow-card__subtitle` | 15px IBM Plex Sans Medium（色见上表） |
| 图标 `.deck-flow-card__icon`（可选） | 20×20px，Lucide `stroke-width: 1.75` |

```html
<div class="deck-flow-card deck-flow-card--soft">
  <div class="deck-flow-card__row">
    <span class="deck-flow-card__icon"><!-- Lucide 20px --></span>
    <span class="deck-flow-card__title">…</span>
  </div>
  <p class="deck-flow-card__subtitle">…</p>
</div>
```

---

## 2. 线条（三种线型）

共用：`.deck-flow-line` · `#73B200` · **1.5px** · 水平/垂直正交折线（`path` / `line`）。

| 修饰类 | 箭头 | 用途 |
|--------|------|------|
| `.deck-flow-line--none` | 无 | 纯连线、分隔、无方向 |
| `.deck-flow-line--single` | 末端 `marker-end` | 单向数据流 |
| `.deck-flow-line--double` | `marker-start` + `marker-end` | 双向 / 往返 |

箭头为实心三角，用 SVG `<marker>` + `orient="auto"`（勿手写三角坐标）。

```html
<svg class="deck-flow-connectors" viewBox="0 0 400 40" aria-hidden="true">
  <defs>
    <marker id="deck-flow-arrowhead-end" viewBox="0 0 10 10" refX="9" refY="5"
      markerWidth="6" markerHeight="6" orient="auto" markerUnits="userSpaceOnUse">
      <path class="deck-flow-arrow" d="M0 1 L9 5 L0 9 Z" />
    </marker>
    <marker id="deck-flow-arrowhead-start" viewBox="0 0 10 10" refX="1" refY="5"
      markerWidth="6" markerHeight="6" orient="auto-start-reverse" markerUnits="userSpaceOnUse">
      <path class="deck-flow-arrow" d="M0 1 L9 5 L0 9 Z" />
    </marker>
  </defs>
  <path class="deck-flow-line deck-flow-line--none" d="M20 20 H116" />
  <path class="deck-flow-line deck-flow-line--single" d="M152 20 H248" />
  <path class="deck-flow-line deck-flow-line--double" d="M284 20 H380" />
</svg>
```

折线示例（单向）：

```html
<path class="deck-flow-line deck-flow-line--single" d="M20 50 H80 V25" />
```

`marker-*` 由修饰类经 CSS 绑定，**不必**在 `path` 上再写 `marker-end` 属性。

---

## 3. CSS 变量

| 变量 | 值 |
|------|-----|
| `--flow-card-soft` | `#C5E855`（`--ppt-card-fill-green-mid`） |
| `--flow-card-lime` | `#B2ED1D` |
| `--flow-card-white` | `#FFFFFF` |
| `--flow-card-blue` | `#D2E4FF` |
| `--flow-stroke-green` | `#73B200` |
| `--flow-stroke-blue` | `#1D77FE` |
| `--flow-subtitle-muted` | `#585C62` |
| `--flow-line` | `#73B200` |
| `--flow-line-width` | `1.5px` |

---

## 4. 禁止

- 第五种卡片色或第四种线型组合
- 位图流程图
- 青色 `#67E8F9` 光晕线
- 拐点菱形装饰
- 圆角 &gt; 4px（卡片）/ 贝塞尔花哨连线

---

## 5. 自检

- [ ] 仅使用 `--soft` / `--lime` / `--white` / `--blue` 四类卡
- [ ] 绿描边 `#73B200` 1.5px；蓝描边仅 `#1D77FE` 1.5px
- [ ] 线型为 `--none` / `--single` / `--double` 之一
- [ ] 线色 `#73B200` **1.5px**；箭头为 marker 实心三角
