# Marketing Deck — 组件手册（Components）

实现以 [`tokens/deck.css`](../tokens/deck.css) + [`tokens/icon-card.css`](../tokens/icon-card.css) 为准。视觉验收打开 [`preview/ppt/`](../preview/ppt/) 对应 HTML。

---

## 目录

- [顶部 Chrome（章节 · 页码 / 日期）](#顶部-chrome章节--页码--日期)
- [页脚 Footer](#页脚-footer)
- [封底二维码 QR](#封底二维码-qr)
- [Eyebrow 小节标签](#eyebrow-小节标签)
- [标题与挑词](#标题与挑词)
- [列表与项目符号](#列表与项目符号)
- [KPI 数字块](#kpi-数字块)
- [带 Icon 能力卡片](#带-icon-能力卡片)
- [Style B · 瑞士网格色块卡](#style-b--瑞士网格色块卡)
- [流程三栏卡（Type D）](#流程三栏卡type-d)
- [对比双栏（Type E）](#对比双栏type-e)
- [Lucide 图标](#lucide-图标)

---

## 顶部 Chrome（章节 · 页码 / 日期）

每页顶栏：**左侧**稳定章节 / 栏目，**右侧**页码或封面元数据。样式在 `tokens/deck.css`（`.deck-chrome`）。

| 属性 | 值 |
|------|-----|
| 字体 | **IBM Plex Mono** → `var(--font-label)` |
| 字号 | 12px（`--deck-chrome-size`） |
| 样式 | **`text-transform: uppercase`**（全大写，HTML 可写混合大小写） |
| 字距 | `letter-spacing: 0.14em` |
| 深色底字色 | `rgba(255,255,255,.62)` |
| 白底字色 | `rgba(5,11,20,.55)` |

### 内容页（C / D / E）

```html
<header class="deck-chrome">
  <div class="deck-chrome__l">02 · Capabilities</div>
  <div class="deck-chrome__r">03 / 12</div>
</header>
```

- **`.deck-chrome__l`**：章节序号 + 英/中栏目名（跨多页可相同，如 `03 · Architecture · 架构`）
- **`.deck-chrome__r`**：当前页 / 总页数，等宽数字（`font-feature-settings: "tnum"`）

### 封面（A）

```html
<header class="deck-chrome">
  <div class="deck-chrome__l">Tier0 · Unified Namespace</div>
  <div class="deck-chrome__r">Customer briefing · 2026-05-26 · 01 / 12</div>
</header>
```

- **右侧**可放：会议类型 · **日期** · 页码（封面一般为 `01 / N`）

### 深色章节（B）

```html
<header class="deck-chrome">
  <div class="deck-chrome__l">Concept · 核心理念</div>
  <div class="deck-chrome__r">04 / 12</div>
</header>
```

### 与 Eyebrow 分工

| 位置 | 角色 | 示例 |
|------|------|------|
| **Chrome 左** | 章节 / 栏目（可跨页复用） | `02 · Capabilities` |
| **Chrome 右** | 页码或日期 | `03 / 12` |
| **Eyebrow**（可选） | 本页管线提示，在 chrome **下方** | `SOURCE FLOW → NAMESPACE → EVENT FLOW` |
| **H1** | 本页主标题 claim | `Source Flow → Namespace → …` |

**不要** 让 chrome 左栏与 H1 写同一句重复语义。

### Slide 外壳

```html
<section class="deck-slide deck-slide--content" data-slide-type="C" data-theme="light">
  <header class="deck-chrome">…</header>
  <div class="deck-main">…正文…</div>
  <p class="deck-footer">Copyright © 2026 Tier0. All rights reserved.</p>
</section>
```

`data-theme="dark"` 用于 A/B 深底；`light` 用于 C/D/E 白底。

---

## 页脚 Footer

**全稿统一文案（Tier0 only）：**

```
Copyright © 2026 Tier0. All rights reserved.
```

| 属性 | 值 |
|------|-----|
| 字体 | IBM Plex Mono → `var(--font-footer)` |
| 字号 | 10–12px |
| 颜色 | 灰 `#99A1AA` 或 tx1 @ ~60% |
| 位置 | 左下，距底 ~16px，与 safe margin 对齐 |

```html
<p class="deck-footer">Copyright © 2026 Tier0. All rights reserved.</p>
```

```css
.deck-footer {
  position: absolute;
  left: var(--slide-safe-margin, 48px);
  bottom: 16px;
  margin: 0;
  font-family: var(--font-footer);
  font-size: 10px;
  color: #99a1aa;
}
```

**禁止：** FREEZONEX、母公司色条、双品牌并列。

---

## 封底二维码 QR

**仅**变体 A2（Closing，最后一页）。扫描目标 `https://tier0.app`。

| 属性 | 值 |
|------|-----|
| 类名 | `.deck-qrcode`（`tokens/deck.css`） |
| 封底修饰 | section 加 `deck-slide--closing`（Logo + 版权左对齐，右侧预留 QR 区域） |
| 深底资产 | `assets/website-qrcode-white.png` |
| 浅底资产（备用） | `assets/website-qrcode-black.png` |
| 位置 | 右下；`right: var(--slide-safe-margin)` · `bottom: 16px` |
| 尺寸 | `clamp(72px, 9vw, 112px)` 宽 |
| alt | `QR code — tier0.app` |

```html
<section class="deck-slide deck-slide--cover deck-slide--closing" data-slide-type="A" data-theme="dark">
  …
  <img class="deck-qrcode" src="assets/website-qrcode-white.png" alt="QR code — tier0.app" width="96" height="96">
</section>
```

左下 Logo + 版权仍在 `.deck-cover__bar`；QR 独立绝对定位，不与 bar 混排。封面 A1 **不放** QR。

预览：[slide-closing-A2.html](../preview/ppt/slide-closing-A2.html) · 图示规则见 [ppt-diagrams.md](ppt-diagrams.md) §2。

---

## Eyebrow 小节标签

**可选。** 放在 chrome **之下**、H1 之上，用于本页管线 / 副标题提示（**不是**章节序号——序号放 chrome 左栏）。

与 chrome **同字体规则**：IBM Plex Mono · 12px · **全大写**（类名 `.deck-eyebrow`，复用 `--font-label`）。

| 属性 | 值 |
|------|-----|
| 字体 | IBM Plex Mono（同 chrome） |
| 字号 | 12px |
| 颜色（白底） | `--ppt-emphasis-on-light`（`#73B200`） |
| 颜色（深底） | `--ppt-emphasis-on-dark`（`#B2ED1D`） |
| 内容 | 如 `Source flow → namespace → event flow`（CSS 会变为全大写） |

```html
<p class="deck-eyebrow">Source flow → namespace → event flow</p>
```

其他页内小字说明（图注、KPI 说明等）用 `.deck-label` 或 `.deck-kpi__label`，同样 Mono + 全大写。

---

## 标题与挑词

| 场景 | 元素 | 字体 | 挑词色 |
|------|------|------|--------|
| A 封面 | `h1` | Tektur Regular 54–72px | `.accent` → `--ppt-emphasis-on-dark` |
| B 章节 | `h1` | Tektur Regular 48–60px，白字 | 一般整句白，少挑词 |
| C 页标题 | `h1` | Plex Medium 32–40px | `.accent` → `--ppt-emphasis-on-light` |

```html
<!-- 封面 -->
<h1>Tier<span class="accent">0</span><br>Unified Namespace</h1>

<!-- 白底内容 -->
<h1>Source Flow → <span class="accent">Namespace</span> → Event Flow</h1>
```

---

## 列表与项目符号

- 正文 14–16px，行距 **1.2**
- 项目符号方块 / 竖线：**`--ppt-accent-marker`（#B2ED1D）**，白底亦然
- 不要用 emoji 列表符

```html
<ul class="deck-body">
  <li>Connect shop-floor sources at the edge</li>
  <li>Publish a semantic MQTT topic tree</li>
</ul>
```

```css
.deck-body {
  font-size: var(--fs-slide-body, 16px);
  line-height: 1.2;
  color: var(--ppt-tx1);
  padding-left: 1.2em;
}
.deck-body li::marker {
  color: var(--ppt-accent-marker);
}
```

---

## KPI 数字块

超大数字 **仅** 用于数据展示，不作句子标题。

| 属性 | 值 |
|------|-----|
| 字号 | 48–115px（视版式） |
| 颜色（白底） | `--ppt-emphasis-on-light` |
| 标签 | Plex Regular 14px，tx1 @ 65% |

预览：[`preview/ppt/kpi-block.html`](../preview/ppt/kpi-block.html)

```html
<div class="deck-kpi">
  <span class="deck-kpi__value">10×</span>
  <span class="deck-kpi__label">Faster namespace rollout</span>
</div>
```

---

## 带 Icon 能力卡片

类名 **`.tier0-card-icon`**（`deck.css` 引入 `icon-card.css`）。**幻灯片内**对齐 Figma **`4059:2453`**（官网仍用 `icon-card.css` 默认竖排栅格，勿混用结构）。

| 修饰类 | 填充 | 描边 / 分隔线 | 字色 |
|--------|------|----------------|------|
| `.tier0-card-icon--accent` | `#B2ED1D`（`--ppt-card-fill-green`） | 分隔线 `rgba(5,11,20,.18)` | 标题/正文 `#050B14` |
| `.tier0-card-icon--neutral` | `#F4F4F4`（`--ppt-card-fill-gray`） | 描边 + 分隔线灰 | `#050B14` |
| `.tier0-card-icon--dark` | `#050B14`（`--ppt-card-fill-dark`） | 分隔线 `accent1` 35% | 白字 + 图标 `#B2ED1D` |

**禁止：** 白底或浅灰底卡片的小标题使用 `#B2ED1D` 文字；亮绿仅作**填充底**（配深字）或 1–2px 结构线。见 [ppt-checklist.md](ppt-checklist.md) **P0-8**。

| 元素 | 样式 |
|------|------|
| 外框 | `padding: 16px 24px` · `border-radius: 4px` · `border: 1px solid` |
| `.card-title` | 24px Plex Medium · `#050B14` · 与 `.tier0-icon-box` 顶栏左右分布 |
| `.tier0-icon-box` | 28×28 · 无底色 · Lucide `stroke-width: 1.75` · `#050B14` |
| `.tier0-card-icon__rule` | 1px 水平线 |
| `.card-lead` | 16px Medium · `#585C62` |
| `.card-list` | 14px Regular · `#585C62` · `li + li` 间距 8px |

```html
<article class="tier0-card-icon tier0-card-icon--accent">
  <header class="tier0-card-icon__head">
    <h3 class="card-title">Core Perspective</h3>
    <span class="tier0-icon-box" aria-hidden="true"><!-- Lucide 28px --></span>
  </header>
  <hr class="tier0-card-icon__rule" />
  <div class="tier0-card-icon__body">
    <p class="card-lead">Real-Time &amp; Historical Calculation</p>
    <ul class="card-list">
      <li>…</li>
    </ul>
  </div>
</article>
```

预览：[`preview/ppt/card-with-icon.html`](../preview/ppt/card-with-icon.html)

---

## Style B · 瑞士网格色块卡

类名 **`.deck-card-b`**（`tokens/deck.css`）。瑞士国际主义风格：**网格对齐、大色块、强对比、编号索引**，颜色锁定 Tier0 主题盘。

预览：[`preview/ppt/cards-style-b.html`](../preview/ppt/cards-style-b.html)

### 填充修饰（必选其一）

| 修饰类 | 填充 | 字色 |
|--------|------|------|
| `.deck-card-b--fill-dark` | `#050B14` | 白字；编号/数值可用 `#B2ED1D` |
| `.deck-card-b--fill-gray` | `#F4F4F4` | `#050B14` |
| `.deck-card-b--fill-green` | `#B2ED1D` | **`#050B14` 深字** |
| `.deck-card-b--fill-green-mid` | `#C5E855` | `#050B14` |
| `.deck-card-b--fill-green-deep` | `#196B24` | 白字 |

### 结构变体

| 变体 | 类名 | 用途 |
|------|------|------|
| **B1 Index** | `.deck-card-b--index` | 大编号 + 标题 + 正文（2×2 / 3×1 栅格） |
| **B2 Panel** | `.deck-card-b--panel` | 顶栏 band 标签 + 内容区 |
| **B3 Stripe** | `.deck-card-b--stripe` | 左侧 4px accent 竖条 + 侧栏缩写 |
| **B4 Stat** | `.deck-card-b--stat` | KPI 大数字 + 说明 |
| **B5 Split** | `.deck-card-b--split` | 非对称色块侧栏 + 正文（Swiss 分栏） |

栅格容器：`.deck-card-b-grid` + `--2x2` / `--3x1` / `--4x1`。

```html
<div class="deck-card-b-grid deck-card-b-grid--2x2">
  <article class="deck-card-b deck-card-b--index deck-card-b--fill-dark">
    <span class="deck-card-b__index">01</span>
    <h3 class="deck-card-b__title">Source Flow</h3>
    <p class="deck-card-b__body">Connect shop-floor sources at the edge.</p>
  </article>
  <article class="deck-card-b deck-card-b--panel deck-card-b--fill-green">
    <p class="deck-card-b__band">Namespace · 命名空间</p>
    <div class="deck-card-b__content">
      <h3 class="deck-card-b__title">Semantic MQTT tree</h3>
      <p class="deck-card-b__body">Publish once, subscribe everywhere.</p>
    </div>
  </article>
  <!-- … -->
</div>
```

**对比度硬规则（P0-8）：** 白底/浅灰上的 `.deck-card-b__meta`、`.deck-card-b__band`（浅底）用 `--ppt-label-on-light`（`#050B14`）；**不得**用 `#B2ED1D` 作文字。绿底 `#B2ED1D` 上正文/标题一律深字。

图标名见 [`foundations/icons-lucide.md`](../foundations/icons-lucide.md)。流程图节点卡见 [`ppt-flowcharts.md`](ppt-flowcharts.md)。

---

## 流程三栏卡（Type D）

- 顶边线 **`--ppt-accent-marker`**
- 小标题字 **`--ppt-emphasis-on-light`**
- **一般不加** Lucide 图标盒（与 Icon 栅格卡区分）

预览：对照 `slide-content-C` + 自绘三栏；Type D 全页见 [`ppt-layouts.md`](ppt-layouts.md)。

---

## 对比双栏（Type E）

| 栏 | 背景 | 字色 |
|----|------|------|
| 左 · 传统 | 浅灰洗 | 40–55% 黑 |
| 右 · Tier0 | 浅绿洗（如 highlight wash 低透明） | 深字 + 可选 accent1 勾 |

---

## Lucide 图标

- **仅** 小 UI 图标（卡片区、要点旁）
- `stroke-width: 1.75`，统一描边，不混 filled 集
- **不** 用 Lucide 替代架构主视觉 / 封面 SVG / 等轴测插画

主视觉规则见 [`ppt-diagrams.md`](ppt-diagrams.md)。
