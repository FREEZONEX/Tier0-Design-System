# Components · Tier0

组件手册：`layouts-tier0.md` 的 22 个 S 版式骨架 + Tier0 官网视觉语言。

> 完整 VI 见 `tier0-vi-style-guide.md`。

---

## 字体

```css
--sans: "IBM Plex Sans", "IBM Plex Sans Placeholder", sans-serif;
--mono: "IBM Plex Mono", ui-monospace, monospace;
```

| 用途 | 字体 | 字重 |
|---|---|---|
| Hero / Slide headline | IBM Plex Sans | 400 |
| Bracket keyword | IBM Plex Sans | 500（括号符号 400） |
| Body | IBM Plex Sans | 400 |
| Section label | IBM Plex Mono | 500 uppercase |
| Step title | IBM Plex Mono | 500 only |
| Metadata | IBM Plex Mono | 400/500 |

**禁止**：大标题 600/700/800；Inter 作主标题；IBM Plex Mono 作 hero headline。

---

## Local Label · `■ HOW IT WORKS`

```html
<div class="section-label">HOW IT WORKS</div>
```

- 黑色方块 `■` 由 CSS `::before` 生成
- 12–15px，letter-spacing 2–5%
- 默认用于**分点、流程阶段、图表小标题、证据块**，而不是每页大标题上方；`chrome-min` 已经承担全页定位。
- 只有真正的章节分割页才可以把它放在大标题上方；普通正文页不使用重复的 `CHAPTER CLOSE` / `WHY NOW` 页首标签。

---

## 信息结构变体 · 不要反复堆卡

| 内容关系 | 首选组件 | 不适用时改用 |
|---|---|---|
| 三条平行论据 | `.argument-rail-grid` / `.argument-rail` | 需要逐项证据时用 S18 outcome rail |
| 4–6 步过程 | `.process-weave` 或 `.timeline-h` | 有回路时用 S14 loop |
| 模块配抽象说明图 | `.line-sketch` | 有真实 UI / 现场素材时用 S15 或 S22 |
| 关系网络 | architecture node + 1px connector | 不要用卡片之间硬拉箭头 |
| 数据判断 | `.data-pattern` + `data-viz` | 数值少且需逐行核对时用 `.ledger` |

**选择规则**：同一套 deck 不连续三页使用同一类容器；同一个卡片样式不连续两页。先按阅读关系选结构，再选绿色信号位。

---

## Website Hero Headline · `.headline`

```html
<h1 class="headline">
  From <span class="bracket-mark">[</span><span class="keyword">Business Requirement</span><span class="bracket-mark">]</span><br>
  <span class="muted">To</span>
  <span class="bracket-mark">[</span><span class="keyword">Published Applications</span><span class="bracket-mark">]</span>
</h1>
```

---

## Tier0 Card · `.tier0-card`（官网 flat surface）

```html
<div class="tier0-card">
  <div class="tier0-card__marker"></div>
  <div class="tier0-card__title">Production Work Order</div>
  <p class="body-sm">Create, assign, track, and close production tasks.</p>
</div>

<div class="tier0-card tier0-card--green">...</div>
```

| 状态 | 背景 | 文字 | 类名 |
|---|---|---|---|
| default | `#F3F3F3` surface-grey-soft | `#050B14` | `.tier0-card` / `.card-fill` |
| grey | `#EBEBEB` surface-grey | `#050B14` | `.tier0-card--grey` |
| active / green | `#ECFFD2` surface-green | `#050B14` | `.tier0-card.is-active` / `.is-green` |
| ink | `#050B14` | `#FFFFFF` | `.tier0-card--ink` / `.card-ink` |
| solid accent | `#B2ED1D` | `#050B14` | `.tier0-card--accent-solid` / `.card-accent-solid` |

**禁止**：圆角 > 2px、drop shadow、白底绿字。

### S19 四卡（必须对齐 Gallery）

```html
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px;flex:1;min-height:0">
  <article class="tier0-card" style="padding:28px;display:flex;flex-direction:column;background:var(--grey-1)">
    <div class="t-meta" style="color:var(--accent-text-dark)">01</div>
    <h3 style="font-weight:400;font-size:max(22px,1.6vw);margin:18px 0 10px">Connect</h3>
    <p class="body-sm">…</p>
    <div style="height:1px;background:var(--border-subtle);margin-top:20px"></div>
    <div class="line-sketch line-sketch--converge" aria-label="…">
      <span class="line-sketch__node"></span><span class="line-sketch__node"></span>
      <span class="line-sketch__node"></span><span class="line-sketch__node is-signal"></span>
    </div>
  </article>
  <!-- 02 builder / 03 govern / 04 scale；底色在 grey-1 与 rgba(178,237,29,.18) 之间交替 -->
</div>
```

**禁止**：自创 `v2-advantage` 斜线 mark、旋转菱形角标、四卡里堆两张以上 ink 黑底。图标替代方案：单一 IBM Carbon SVG，不要装饰几何。

### 角标序号卡 · `.corner-card`（短文案 2×2）

文案少、格子大时，用右下角大号序号填视觉空洞；网格必须等分。

```html
<div class="corner-card-grid">
  <article class="corner-card is-green">
    <div class="corner-card__body">
      <h3>降低试用门槛</h3>
      <p>让海外用户更愿意先「试试看」。</p>
    </div>
    <div class="corner-card__n" aria-hidden="true">01</div>
  </article>
  <article class="corner-card">…02…</article>
  <article class="corner-card is-green">…03…</article>
  <article class="corner-card">…04…</article>
</div>
```

| 类 | 用途 |
|---|---|
| `.corner-card-grid` | `1fr 1fr` × `1fr 1fr`，`gap:20px` |
| `.corner-card.is-green` | 淡绿底 |
| `.corner-card.is-accent` | 实心亮绿底 |
| `.corner-card__n` | 右下角占位序号（低透明） |

**禁止**：不等分列宽导致四格看起来大小不一；序号与标题挤在左上留下整块空白。

### 双栈平衡 · `.dual-stack`（层 + 策略）

左右都是可拉伸内容时用等宽双栏，两侧行高均分。

```html
<div class="dual-stack">
  <div class="dual-stack__layers">
    <div class="dual-stack__layer"><span class="t-meta">通道</span><div><h3>MQTT / EMQX</h3><p class="body-sm">开放的数据通道</p></div></div>
    <div class="dual-stack__layer is-muted">…</div>
    <div class="dual-stack__layer is-signal">…</div>
  </div>
  <div class="dual-stack__ledger">
    <div class="t-meta">全球生态策略</div>
    <div class="dual-stack__rows">
      <div class="dual-stack__row"><b>01</b><span>…</span></div>
      <!-- 02–04 -->
    </div>
  </div>
</div>
```

**禁止**：`1.1fr .9fr` 再放大左右差距；左层高 padding 空、右行挤在一起。

---

## 网格卡片组件 · S05 / S15 / S16

以下组件在 `template-tier0.html` 中定义，**只换 Tier0 色、不改骨架**。

### 基础 token（互斥，一张卡只选一个）

```html
<article class="card-fill sub-card">...</article>
<article class="card-ink sub-card">...</article>
<article class="card-accent sub-card">...</article>
<article class="card-accent-solid brief-card">...</article>
```

| 类名 | 背景 | 文字 |
|---|---|---|
| `.card-fill` | `#F3F3F3` | ink |
| `.card-ink` | `#050B14` | white |
| `.card-accent` | `#ECFFD2` 浅绿 | ink |
| `.card-accent-solid` | `#B2ED1D` 亮绿 | ink |

### `.sub-card` · S05 堆叠 / 右侧卡列

```html
<article class="card-fill sub-card">
  <span class="nb-corner">01</span>
  <div class="ttl">Skill File</div>
  <p class="desc">纯 markdown，可手写</p>
</article>
```

### `.stack-block` · S05 三层架构

```html
<div class="stack-block b-ink">...</div>
<div class="stack-block b-grey">...</div>
<div class="stack-block b-green">...</div>
<div class="stack-block b-accent">...</div>
```

### `.brief-card` / `.matrix-cell` · legacy matrix cells

```html
<div class="brief-card is-accent">...</div>
<div class="matrix-cell is-ink">...</div>
```

### 白底强调 · 不要用绿字

```html
<span class="col-tag is-signal">AFTER</span>
<span class="signal-marker"></span> Active column
```

---

## Step Block · Workflow

```html
<div class="step-divider"></div>
<div style="display:flex;gap:16px;align-items:flex-start">
  <span class="step-num is-active">04</span>
  <div>
    <div class="step-title">Publish</div>
    <p class="body-sm">Deploy to production with access control.</p>
  </div>
</div>
```

- 顶部分隔线：`1px #2B2D2F`
- 默认圆：`#050B14` 底白字
- Active：`#B2ED1D` 底黑字

---

## Feature Item

```html
<div style="display:flex;gap:16px">
  <div class="feature-icon"><!-- IBM Carbon SVG --></div>
  <div>
    <div class="feature-title">Build From Natural Language</div>
    <p class="body-sm">Describe workflows, records, forms...</p>
  </div>
</div>
```

---

## 图标 · IBM Carbon Icons

- 尺寸：16 / 20 / 24 / 32 px
- 单色 `currentColor`
- **禁止** Lucide、emoji、CSS 伪元素十字

推荐映射见 `tier0-vi-style-guide.md` §5.5。

---

## 官方 Logo · Brand Mark

素材路径见 `references/brand-assets-tier0.md`。

| 背景 | 文件 |
|---|---|
| 白底 / 浅灰（默认封面） | `assets/brand/logos/tier0-logo-black.png` |
| 深底 `#050B14` / 封底左半 | `assets/brand/logos/tier0-logo-white.png` |

```html
<!-- 浅底 chrome 示例：先 cp 到 ppt/images/brand/ -->
<img src="images/brand/tier0-logo-black.png" alt="Tier0" class="tier0-logo" width="101" height="25">
```

- 固定宽高比（约 4:1），高度 24–32px
- 禁止用文字「TIER0」替代官方 Logo

---

## 布局基础类

画布：`canvas-card` / `chrome-min` / `slide` / `slide.light` / `slide.dark`

网格：`grid-12` / `span-N` / `sub-grid-3-2`

时间线：`timeline-v` / `timeline-h` / `tl-node`

图表：`kpi-tower-row` / `h-bar-chart` / `kpi-hero`

图片：`frame-img` / `r-21x9` / `r-16x10` / `fit-contain`

图文分栏（P23 实验）：`.swiss-img-split` / `.swiss-img-grid`（内部类名，文档称「图文分栏 / 证据网格」）

装饰：`hr-hairline` / `rule`（divider 用 `#2B2D2F`）

---

## 语义映射

| 类 / ID | Tier0 用法 |
|---|---|
| `.kicker` | 改为 `■` 方块前缀 + Plex Mono |
| `.card-accent` | 浅绿 `#ECFFD2` |
| `.slide.accent` | 可选亮绿满屏；文字用 `--accent-on` 黑字 |
| `.h-hero` | 强制 weight 400 |
| `data-lucide` | 替换为 Carbon SVG |
| 旧封面 id | → `TIER0-COVER-EDITORIAL` |
| 旧封底 id | → `TIER0-CLOSING-SPLIT` |

---

## Cover / Closing HTML 骨架

### TIER0-COVER-EDITORIAL

```html
<section class="slide light" data-layout="TIER0-COVER-EDITORIAL" data-animate="hero">
  <div class="canvas-card" style="justify-content:space-between">
    <div class="chrome-min">
      <div class="l">TIER0 · PRODUCT CONCEPT</div>
      <div class="r">01 / NN</div>
    </div>
    <div style="display:grid;grid-template-columns:1.1fr .9fr;gap:7vw;align-items:end;flex:1">
      <div data-anim="title">
        <div class="section-label">UNS AGENT</div>
        <h1 class="headline" style="font-size:min(6.8vw,12vh);max-width:11ch;margin-top:3vh">
          Natural language,<br>driving real-time industrial operations.
        </h1>
      </div>
      <p style="font-size:min(1.9vw,3.2vh);line-height:1.45;max-width:23ch;margin-bottom:2vh;color:var(--text-secondary)">
        Headless MES +<br>Generative UI
      </p>
    </div>
    <div class="rule" data-anim="line"></div>
  </div>
</section>
```

- 默认左侧展示 Tier0 Logo、主标题与演讲者信息，右侧使用亮绿动态 ASCII 点阵场；PPTX 降级为可编辑静态点阵。不要再添加圆形、绿色角线或第二套装饰。
- 封面元信息开启时，放在顶部 chrome 或右侧说明下方；不要改变主体结构。
- 双格式模式使用 `deck.json kind:"cover-editorial"`，不要维护第二套 HTML 封面。

### S01 · Index Cover · 章节目录

```html
<div class="index-cover"><!-- 章节多时可加 index-cover--cols-2 index-cover--dense -->
  <button type="button" class="cover-row" data-goto="4" data-anim="row">
    <span class="cover-row__num">01</span>
    <span class="cover-row__body">
      <span class="cover-row__kicker">OVERVIEW</span>
      <span class="cover-row__title">Platform Overview</span>
    </span>
  </button>
</div>
```

- 编号与标题块 **垂直居中对齐**（`align-items:center`）
- kicker **不要**写 `SECTION ·`，只保留章节名（如 `OVERVIEW`）
- 标题默认 `--ink` 黑色；`:hover` 时编号与标题变 `--muted`
- `data-goto` = 0-based 幻灯片索引，点击调用 `go(n)` 跳转
- 章节 ≥4 时建议加 `index-cover--cols-2 index-cover--dense` 双列紧凑
- 双列模式按**列**填充：左列 01→N/2，右列续排；左列行间横线 + 右列前段行间横线（如 04–05）；无列间竖线、末行无底边；章节少时 `:has()` 自动放大

### TIER0-CLOSING-SPLIT

```html
<section class="slide split" data-layout="TIER0-CLOSING-SPLIT" data-animate="split-statement">
  <div class="canvas-card" style="padding:0">
    <div class="half b-ink" style="padding:5.6vh 3.6vw">
      ...
    </div>
    <div class="half" style="padding:5.6vh 3.6vw">...</div>
  </div>
</section>
```

### 官网二维码（按 intake 决定）

仅当 `intake/request.json.closing.includeWebsiteAndQr` 为 true 时，封底的深墨半页页脚放置该 CTA，并令 closing section 带 `data-closing-cta="tier0-app"`。二维码置于白色静区中，深墨码保证扫描对比；网址不能只藏在链接里，必须直接显示。为 false 时 closing section 写 `data-closing-cta="none"`，并省略整个 CTA DOM。

```html
<a class="closing-qr" href="https://www.tier0.app/" target="_blank" rel="noreferrer"
   data-website-qr="tier0-app" aria-label="访问 Tier0 官网：www.tier0.app">
  <span class="closing-qr__mark">
    <img src="images/brand/tier0-app-qr.svg" alt="Tier0 官网二维码"
         data-image-slot="tier0-app-qr">
  </span>
  <span class="closing-qr__copy">
    <span class="closing-qr__label">SCAN TO VISIT</span>
    <span class="closing-qr__url">www.tier0.app</span>
  </span>
</a>
```

- 封底改为浅底时使用 `.closing-qr--on-light`，转为深墨静区 + 白码；亮绿不可直接作为二维码本体。
- 不可缩至 `72px` 以下，四周保留 `12px` 以上静区，不能被页脚或导航覆盖。
