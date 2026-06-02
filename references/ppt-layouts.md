# Marketing Deck — 页面布局库（Layouts）

收录 **五种 Masterdeck 类型（A–E）** 的完整 HTML 骨架 + 常用变体。每段代码可直接粘贴，替换文案后即可用。

**全屏预览：** [`preview/ppt/`](../preview/ppt/)（与交付 deck 同 `100vw × 100vh`）。硬锁见 [`ppt-layout-lock.md`](ppt-layout-lock.md)。

---

## ⚠️ 生成前必读（Pre-flight）

### A. 类名必须来自 `tokens/deck.css`

所有布局类（`.deck-slide--cover` / `.deck-slide--chapter` / `.deck-slide--content` / `.deck-chrome` / `.deck-main` / `.deck-cover__*` / `.deck-footer` / `.deck-eyebrow` / `.deck-body` / `.tier0-card-icon` / `.deck-flow-card` 等）均在 `tokens/deck.css` 预定义。

**不要发明新类名。** 如需一次性调整，用 `style="..."` inline 写。

### B. 全屏尺寸

预览 HTML 与交付 deck **均为** 每页 `100vw × 100vh`；slide 背景铺满视口，**无**外层灰底画框、无 960×540 缩放框。

### C. Chrome 与 H1 不要写同一件事

这是最常见的内容重复问题：

| 位置 | 角色 | 内容 | 示例 |
|------|------|------|------|
| **Chrome 左** | 栏目标签（可跨页复用） | 章节序号 + 栏目名 | `03 · Architecture · 架构` |
| **Chrome 右** | 页码 / 元数据 | 页码或封面日期 | `05 / 12` · `2026-05-26 · 01 / 12` |
| **Eyebrow**（可选） | 本页管线提示，chrome 下方 | 流程路径 | `SOURCE FLOW → NAMESPACE → EVENT FLOW` |
| **H1** | 本页唯一主张 | 具体 claim | `三层即是全局` |

**反例（已踩坑）：** chrome 左写「架构」，H1 又写「Architecture Overview」—— 同义重复，信息密度归零。

### D. 主题节奏规划（生成前必做）

每页 `<section>` 必须带 `data-theme="dark"` 或 `"light"`。

| 类型 | 主题 | 原因 |
|------|------|------|
| **A** Cover | `dark` | 开场仪式感，深底强冲击 |
| **B** Chapter | `dark` | 深色节奏断点 |
| **C** 白底内容 | `light` | 正文主力，需清晰 |
| **D** 信息图（浅底）| `light` | 流程图 / 双栏需清晰 |
| **D** 信息图（深底时间轴）| `dark` | 计入深色断点，用于节奏调节 |
| **E** 对比 | `light` | 双栏需清晰 |
| **A** Closing | `dark` | 首尾呼应 |

#### 节奏硬规则（生成后自检）

- ❌ 连续 **> 2** 张白底（C / D-light / E）无 B / D-dark 断点
- ❌ 整稿 **没有** 至少 1 个 B 或 D-dark
- ❌ H1 与 chrome 左栏写同一句话
- ✅ 每 3–4 张白底后插入 1 张 B 或 D-dark 作节奏呼吸

#### 11 页节奏模板（可直接套用）

| 页 | 类型 | 主题 | 内容 |
|----|------|------|------|
| 1 | A | dark | 封面 |
| 2 | C | light | 痛点（Icon 卡 2×2） |
| 3 | B | dark | 章节幕封 |
| 4 | C | light | 概念说明 |
| 5 | D | light | 架构三栏 |
| 6 | D | light | 命名空间双栏 |
| 7 | C | light | 能力一览（Icon 卡 3×2） |
| 8 | E | light | 传统 vs Tier0 |
| 9 | D | light | 部署塔柱 + KPI |
| 10 | D | dark | 落地时间轴（深底） |
| 11 | A | dark | 封底 |

先对齐这张表，再动手写 slide。跳过规划直接粘骨架 = 全是白底。

### E. 动效系统（默认关闭，按需加 `data-anim`）

**核心机制：** 翻到某页时，JS 引擎找到该页所有 `[data-anim]` 元素，以 80ms 间隔逐个加 `.is-visible`（淡入 + 上移 6px）。`data-anim="step"` 用于 Pipeline 步骤，默认暗淡（opacity 0.18），每次按 `→ / 空格` 点亮一个，全部点亮后才翻到下一页。

| `data-anim` 值 | 行为 | 适用 |
|----------------|------|------|
| 无值（`data-anim`） | 淡入 + 轻微上移，80ms 错开 | 标题、图标卡、KPI、列表 |
| `"step"` | 暗淡等待，按键逐步点亮 | Pipeline 步骤节点 |

在 `<section>` 上加 `data-animate="pipeline"` 声明该页为逐步模式，否则 step 元素直接淡入不拦截翻页。

**在 `<section>` 上标记：**
```html
<!-- 普通进场（cascade 淡入） -->
<section class="deck-slide deck-slide--content" data-slide-type="C" data-theme="light">

<!-- 管线逐步（按键点亮步骤） -->
<section class="deck-slide deck-slide--content" data-slide-type="D" data-theme="light"
         data-animate="pipeline">
```

**在需要动画的元素上标记：**
```html
<h1 data-anim>Source Flow → <span class="accent">Namespace</span></h1>
<p class="deck-eyebrow" data-anim>...</p>
<div class="deck-pipeline__step" data-anim="step">...</div>
```

**导航脚本完整片段（粘贴到业务 deck 的 `<script>` 里）：**
```javascript
// 在已有的 go(n) 函数里：调用 animateIn(slides[n]) 即可
function animateIn(slide) {
  const elems = [...slide.querySelectorAll('[data-anim]')]
    .filter(el => el.getAttribute('data-anim') !== 'step');
  elems.forEach((el, i) => {
    el.classList.remove('is-visible');
    setTimeout(() => el.classList.add('is-visible'), 80 * i + 40);
  });
  const section = slide.querySelector('[data-animate="pipeline"]') || slide;
  if (section.dataset && section.dataset.animate === 'pipeline') {
    slide._steps = [...slide.querySelectorAll('[data-anim="step"]')];
    slide._stepIdx = 0;
    slide._steps.forEach(s => s.classList.remove('is-lit'));
  } else {
    slide._steps = null;
  }
}

function tryAdvancePipeline() {
  const slide = slides[idx];
  if (!slide._steps || slide._stepIdx >= slide._steps.length) return false;
  slide._steps[slide._stepIdx].classList.add('is-lit');
  slide._stepIdx++;
  return true;
}

// 替换原 onKey，先拦截 pipeline，再翻页
function onKey(e) {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    if (!tryAdvancePipeline()) go(idx + 1);
  }
  if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1); }
  if (e.key === 'Home') { e.preventDefault(); go(0); }
  if (e.key === 'End') { e.preventDefault(); go(slides.length - 1); }
}

// 在 go() 结束时调用 animateIn
function go(n) {
  if (lock) return;
  idx = Math.max(0, Math.min(slides.length - 1, n));
  deck.style.transform = 'translateX(' + -idx * 100 + 'vw)';
  nav.querySelectorAll('button').forEach((d, i) => d.classList.toggle('active', i === idx));
  lock = true;
  setTimeout(() => { lock = false; animateIn(slides[idx]); }, 520);
}
```

**不需要动效的页面**：不加任何 `data-anim` 即可，JS 只对带标记的元素生效。

### F. 封面主视觉锁

- **必须** 使用 [`assets/marketing-cover-visual.svg`](../assets/marketing-cover-visual.svg)
- 摆放：全高贴右（`position: absolute; top:0; right:0; height:100%`）；左侧溢出可裁切
- **禁止** 手绘等轴测块 / 临时 SVG 替代
- **禁止** accent1 装饰斜线（历史 `.deck-cover__line`）

---

## 0. 全屏 slide 外壳（所有类型共用）

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="tokens/deck.css">
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; height: 100%; overflow: hidden; }
    #deck {
      display: flex;
      height: 100vh;
      transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
    }
  </style>
</head>
<body>
  <div id="deck">
    <!-- 多个 section.deck-slide，每个宽 100vw -->
  </div>
</body>
</html>
```

> 字体由 `core.css`（被 `deck.css` @import）本地加载；路径按实际项目调整。

---

## 类型 A — 封面（`data-slide-type="A"`）

**预览：** [`slide-cover-A.html`](../preview/ppt/slide-cover-A.html)

**要点：** 深底 `#050B14` · 左文右图 · `marketing-cover-visual.svg` · **Tektur Regular** 标题 · `.accent` 挑词 · **无** accent1 装饰斜线

```html
<section class="deck-slide deck-slide--cover" data-slide-type="A" data-theme="dark">
  <header class="deck-chrome">
    <div class="deck-chrome__l">Tier0 · Unified Namespace</div>
    <div class="deck-chrome__r">Customer briefing · 2026-05-26 · 01 / 12</div>
  </header>
  <div class="deck-main deck-main--cover">
    <div class="deck-cover__content">
      <h1>Tier<span class="accent">0</span><br>Unified Namespace</h1>
      <p class="deck-cover__sub">面向工业数据的统一命名空间</p>
    </div>
    <img class="deck-cover__visual" src="assets/marketing-cover-visual.svg" alt="">
  </div>
  <div class="deck-cover__bar">
    <img class="deck-cover__logo" src="assets/tier0-logo-lime.svg" alt="Tier0">
    <p class="deck-footer">Copyright © 2026 Tier0. All rights reserved.</p>
  </div>
</section>
```

**关键要点：**
- `h1` 字体由 `--font-cover`（Tektur）驱动，**禁用 Poppins**
- `.accent` 挑词色 = `--ppt-emphasis-on-dark`（`#B2ED1D`）
- `deck-cover__visual` 全高贴右；多 slide 横向排列时需在业务 CSS 中改为 `position: absolute`，避免 `position: fixed` 穿透其他 slide
- chrome 右侧封面页可附日期，其他页只写页码

### 变体 A2 — 封底 Closing

封底与封面共用同一视觉结构（深底 + 右侧主视觉 SVG），文字全部用英文。

**预览：** [`slide-closing-A2.html`](../preview/ppt/slide-closing-A2.html)

```html
<section class="deck-slide deck-slide--cover deck-slide--closing" data-slide-type="A" data-theme="dark">
    <div class="deck-chrome__r">12 / 12</div>
  </header>
  <div class="deck-main deck-main--cover" style="position:relative;z-index:2;">
    <div style="max-width:50vw;padding-top:2vh;">
      <p class="deck-cover__sub">Let's map your factory's unified namespace — prove the value in two weeks.</p>
    </div>
    <aside style="align-self:start;padding-top:2vh;min-width:240px;">
      <p style="font-family:var(--font-label);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--ppt-emphasis-on-dark);margin:0 0 14px;">Resources</p>
      <ul style="list-style:none;margin:0;padding:0;border-top:1px solid rgba(255,255,255,.12);">
        <li style="padding:12px 0 12px 14px;border-bottom:1px solid rgba(255,255,255,.1);">
          <span style="display:block;font-size:max(14px,1.4vw);font-weight:500;color:#fff;">tier0.app</span>
          <span style="display:block;font-size:12px;color:rgba(255,255,255,.55);">Product website</span>
        </li>
        <li style="padding:12px 0 12px 14px;border-bottom:1px solid rgba(255,255,255,.1);">
          <span style="display:block;font-size:max(14px,1.4vw);font-weight:500;color:#fff;">github.com/FREEZONEX/Tier0-Edge</span>
          <span style="display:block;font-size:12px;color:rgba(255,255,255,.55);">Open source repository</span>
        </li>
        <li style="padding:12px 0 12px 14px;border-left:2px solid var(--ppt-accent-marker);background:rgba(178,237,29,.08);">
          <span style="display:block;font-size:max(14px,1.4vw);font-weight:500;color:var(--ppt-emphasis-on-dark);">Start a PoC · ≈ 4 weeks</span>
          <span style="display:block;font-size:12px;color:rgba(255,255,255,.55);">Single-line pilot · Source → Namespace → Event</span>
        </li>
      </ul>
    </aside>
  </div>
  <img class="deck-cover__visual" src="assets/marketing-cover-visual.svg" alt="" style="opacity:0.55;">
  <div class="deck-cover__bar">
    <img class="deck-cover__logo" src="assets/tier0-logo-lime.svg" alt="Tier0">
    <p class="deck-footer" style="margin:0;padding:0;">Copyright © 2026 Tier0. All rights reserved.</p>
  </div>
  <img class="deck-qrcode" src="assets/website-qrcode-white.png" alt="QR code — tier0.app" width="96" height="96">
</section>
```

**关键要点：**
- 结构与封面完全一致（深底 · 左文右图 · `deck-cover__visual`）
- 封底**全文英文**；无大标题，直接以 `deck-cover__sub` 副句开场
- 右侧主视觉 SVG 保留，加 `opacity:0.55` 降低权重、突出文字
- aside 放 2–3 条资源链接，最后一条用 `border-left: accent-marker` 高亮 CTA
- 右下 `.deck-qrcode` 放 `website-qrcode-white.png`（深底专用）；仅封底使用，封面不放
- section 加 `deck-slide--closing`：版权与 Logo 左对齐，右侧预留 QR 条带，避免与 `.deck-cover__bar` 重叠

---

## 类型 B — 深色章节（`data-slide-type="B"`）

**预览：** [`slide-chapter-B.html`](../preview/ppt/slide-chapter-B.html)

**要点：** **Tektur Regular** 大标题垂直居中 · 深底点阵背景 · 内容极简（一句 claim + 可选副标题）· 用于每 2–4 张白底后的节奏断点

```html
<section class="deck-slide deck-slide--chapter" data-slide-type="B" data-theme="dark">
  <header class="deck-chrome">
    <div class="deck-chrome__l">Concept · 核心理念</div>
    <div class="deck-chrome__r">04 / 12</div>
  </header>
  <div class="deck-main">
    <h1>A namespace,<br>not another<br>point-to-point map</h1>
    <!-- 可选副标题：不超过 2 行 -->
    <p class="deck-cover__sub" style="margin-top:2vh;max-width:50vw;">
      一个语义化命名空间，替代无穷无尽的点对点集成
    </p>
  </div>
  <p class="deck-footer">Copyright © 2026 Tier0. All rights reserved.</p>
</section>
```

**关键要点：**
- `h1` 由 `--font-chapter`（Tektur）渲染，字号 `clamp(48px, 5.5vw, 60px)`，**垂直居中**显示（`justify-content: center`）
- `max-width: 50vw`（约半屏宽）自然折行，视觉重心居中
- 极简留白：只放一句主张，**不堆子弹点**
- 标题默认白色，**不需要** `.accent` 挑词（章节页整句本身就是强调）
- 可选：在 `h1` 后加 `<p class="deck-cover__sub" style="margin-top:2vh;max-width:50vw;">` 作副标题（≤ 2 行）

---

## 类型 C — 白底内容（`data-slide-type="C"`）

**预览：** [`slide-content-C.html`](../preview/ppt/slide-content-C.html)

**要点：** 白底 · **IBM Plex Sans / SC** Medium 标题 · `.accent` = `--ppt-emphasis-on-light`（`#73B200`）· 正文叙述 / Icon 卡栅格

### C1 — 基础正文 + 列表

```html
<section class="deck-slide deck-slide--content" data-slide-type="C" data-theme="light">
  <header class="deck-chrome">
    <div class="deck-chrome__l">02 · Capabilities · 平台能力</div>
    <div class="deck-chrome__r">03 / 12</div>
  </header>
  <div class="deck-main">
    <h1>Source Flow → <span class="accent">Namespace</span> → Event Flow</h1>
    <ul class="deck-body">
      <li>Connect shop-floor sources at the edge</li>
      <li>Publish a semantic MQTT topic tree</li>
      <li>Orchestrate flows on the namespace</li>
    </ul>
  </div>
  <p class="deck-footer">Copyright © 2026 Tier0. All rights reserved.</p>
</section>
```

### C2 — Icon 卡 2×2（痛点 / 概念 · 4 卡）

```html
<section class="deck-slide deck-slide--content" data-slide-type="C" data-theme="light">
  <header class="deck-chrome">
    <div class="deck-chrome__l">01 · The Problem · 痛点</div>
    <div class="deck-chrome__r">02 / 12</div>
  </header>
  <div class="deck-main" style="gap:2vh;">
    <h1>点对点集成<span class="accent">无法规模化</span></h1>
    <p class="deck-lead">N×M wiring grows with every new system — every new consumer requires a new connection.</p>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);grid-template-rows:repeat(2,1fr);gap:clamp(10px,1.4vw,16px);flex:1;min-height:0;">
      <article class="tier0-card-icon tier0-card-icon--neutral">
        <header class="tier0-card-icon__head">
          <h3 class="card-title">N×M 连线</h3>
          <span class="tier0-icon-box" aria-hidden="true"><i data-lucide="git-merge"></i></span>
        </header>
        <hr class="tier0-card-icon__rule">
        <div class="tier0-card-icon__body">
          <p class="card-copy">每接入一个系统，都要为每个消费者单独打通。</p>
        </div>
      </article>
      <article class="tier0-card-icon tier0-card-icon--neutral">
        <header class="tier0-card-icon__head">
          <h3 class="card-title">紧耦合</h3>
          <span class="tier0-icon-box" aria-hidden="true"><i data-lucide="link-2"></i></span>
        </header>
        <hr class="tier0-card-icon__rule">
        <div class="tier0-card-icon__body">
          <p class="card-copy">源与消费者直接绑定，改一处牵一片。</p>
        </div>
      </article>
      <article class="tier0-card-icon tier0-card-icon--neutral">
        <header class="tier0-card-icon__head">
          <h3 class="card-title">无单一事实源</h3>
          <span class="tier0-icon-box" aria-hidden="true"><i data-lucide="database-zap"></i></span>
        </header>
        <hr class="tier0-card-icon__rule">
        <div class="tier0-card-icon__body">
          <p class="card-copy">同一数据散落在 SCADA / MES / Historian。</p>
        </div>
      </article>
      <article class="tier0-card-icon tier0-card-icon--accent">
        <header class="tier0-card-icon__head">
          <h3 class="card-title">协议割裂</h3>
          <span class="tier0-icon-box" aria-hidden="true"><i data-lucide="unplug"></i></span>
        </header>
        <hr class="tier0-card-icon__rule">
        <div class="tier0-card-icon__body">
          <p class="card-copy">OPC UA、Modbus、PROFINET 各说各话。</p>
        </div>
      </article>
    </div>
  </div>
  <p class="deck-footer">Copyright © 2026 Tier0. All rights reserved.</p>
</section>
```

### C3 — Icon 卡 3×2（能力一览 · 6 卡）

```html
<section class="deck-slide deck-slide--content" data-slide-type="C" data-theme="light">
  <header class="deck-chrome">
    <div class="deck-chrome__l">05 · Capabilities · 平台能力</div>
    <div class="deck-chrome__r">07 / 12</div>
  </header>
  <div class="deck-main" style="gap:1.5vh;">
    <h1>平台能力一览</h1>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:clamp(10px,1.4vw,16px);flex:1;min-height:0;">
      <article class="tier0-card-icon tier0-card-icon--neutral">
        <header class="tier0-card-icon__head">
          <h3 class="card-title">Source Flow</h3>
          <span class="tier0-icon-box" aria-hidden="true"><i data-lucide="cable"></i></span>
        </header>
        <hr class="tier0-card-icon__rule">
        <div class="tier0-card-icon__body"><p class="card-copy">边缘接入与协议归一化</p></div>
      </article>
      <article class="tier0-card-icon tier0-card-icon--neutral">
        <header class="tier0-card-icon__head">
          <h3 class="card-title">Unified Namespace</h3>
          <span class="tier0-icon-box" aria-hidden="true"><i data-lucide="layers"></i></span>
        </header>
        <hr class="tier0-card-icon__rule">
        <div class="tier0-card-icon__body"><p class="card-copy">语义化 MQTT 主题树 SSOT</p></div>
      </article>
      <article class="tier0-card-icon tier0-card-icon--neutral">
        <header class="tier0-card-icon__head">
          <h3 class="card-title">Event Flow</h3>
          <span class="tier0-icon-box" aria-hidden="true"><i data-lucide="git-branch"></i></span>
        </header>
        <hr class="tier0-card-icon__rule">
        <div class="tier0-card-icon__body"><p class="card-copy">可视化编排规则与告警</p></div>
      </article>
      <article class="tier0-card-icon tier0-card-icon--neutral">
        <header class="tier0-card-icon__head">
          <h3 class="card-title">MQTT Broker</h3>
          <span class="tier0-icon-box" aria-hidden="true"><i data-lucide="radio"></i></span>
        </header>
        <hr class="tier0-card-icon__rule">
        <div class="tier0-card-icon__body"><p class="card-copy">高吞吐发布订阅 · Sparkplug B</p></div>
      </article>
      <article class="tier0-card-icon tier0-card-icon--neutral">
        <header class="tier0-card-icon__head">
          <h3 class="card-title">Connectivity</h3>
          <span class="tier0-icon-box" aria-hidden="true"><i data-lucide="network"></i></span>
        </header>
        <hr class="tier0-card-icon__rule">
        <div class="tier0-card-icon__body"><p class="card-copy">20+ 工业与 IT 协议双向连通</p></div>
      </article>
      <article class="tier0-card-icon tier0-card-icon--accent">
        <header class="tier0-card-icon__head">
          <h3 class="card-title">Edge-to-Cloud</h3>
          <span class="tier0-icon-box" aria-hidden="true"><i data-lucide="shield-check"></i></span>
        </header>
        <hr class="tier0-card-icon__rule">
        <div class="tier0-card-icon__body"><p class="card-copy">边缘部署 · TLS · RBAC 权限治理</p></div>
      </article>
    </div>
  </div>
  <p class="deck-footer">Copyright © 2026 Tier0. All rights reserved.</p>
</section>
```

**标题区间距（`deck.css` 自动处理，勿手写 margin）：**
- 无副句：`h1` 下 **24px** 到正文
- 有副句：紧接 `h1` 后用 `.deck-sub` 或 `.deck-lead`（或管线页 `h1` 后的 `.deck-eyebrow`）→ 标题下 **4px**，副句下 **24px** 到正文

```html
<h1>主标题 <span class="accent">挑词</span></h1>
<p class="deck-lead">一句副句说明本页观点；写满一行再换行，勿拆成短行。</p>
<!-- 下方卡片 / 列表 / 代码块 -->
```

副句（`.deck-lead` / `.deck-sub`）**不设 `max-width` 字符限制**，默认 `width: 100%` 占满 `deck-main` 内容区。

**关键要点（所有 C 变体通用）：**
- `h1` 最多 2 行，长句用 `<span class="accent">` 挑词而非换行
- Icon 卡最后一张用 `--accent`（绿底），其余用 `--neutral`（浅灰）—— 产生视觉落点
- `card-copy` ≤ 2 行，超出则拆卡
- Icon 卡只写 `data-lucide`，**不换成 inline SVG**

---

## 类型 D — 信息图（`data-slide-type="D"`）

类型 D 有四种常用变体，按内容选择。

### D1 — 三栏流程卡（架构 / Source → Namespace → Event）

**预览：** [`flow-styles.html`](../preview/ppt/flow-styles.html)

```html
<section class="deck-slide deck-slide--content" data-slide-type="D" data-theme="light">
  <header class="deck-chrome">
    <div class="deck-chrome__l">03 · Architecture · 架构</div>
    <div class="deck-chrome__r">05 / 12</div>
  </header>
  <div class="deck-main" style="gap:1vh;">
    <h1>源数据流 → 命名空间 → 事件流</h1>
    <p class="deck-eyebrow">Source flow → namespace → event flow</p>
    <!-- 流程卡：align-items:start，卡片自然高度，不铺满屏幕 -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(12px,1.6vw,20px);align-items:start;margin-top:2vh;">
      <div class="deck-flow-card deck-flow-card--soft">
        <div class="deck-flow-card__row">
          <span class="deck-flow-card__icon"><i data-lucide="cable"></i></span>
          <span class="deck-flow-card__title">Source Flow</span>
        </div>
        <p class="deck-flow-card__subtitle">边缘接入 PLC、传感器、OPC UA、Modbus，归一化为统一模型。</p>
        <span style="display:block;margin-top:16px;padding-top:10px;border-top:1px solid rgba(5,11,20,.12);font-family:var(--font-label);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(5,11,20,.55);">Edge Sources</span>
      </div>
      <div class="deck-flow-card deck-flow-card--lime">
        <div class="deck-flow-card__row">
          <span class="deck-flow-card__icon"><i data-lucide="layers"></i></span>
          <span class="deck-flow-card__title">Namespace</span>
        </div>
        <p class="deck-flow-card__subtitle">语义 MQTT 主题树 · Broker · 全厂单一事实源 SSOT。</p>
        <span style="display:block;margin-top:16px;padding-top:10px;border-top:1px solid rgba(5,11,20,.12);font-family:var(--font-label);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(5,11,20,.55);">Unified Namespace</span>
      </div>
      <div class="deck-flow-card deck-flow-card--blue">
        <div class="deck-flow-card__row">
          <span class="deck-flow-card__icon"><i data-lucide="git-branch"></i></span>
          <span class="deck-flow-card__title">Event Flow</span>
        </div>
        <p class="deck-flow-card__subtitle">规则 · 转换 · 编排 — 驱动 MES / ERP / BI / AI 消费侧。</p>
        <span style="display:block;margin-top:16px;padding-top:10px;border-top:1px solid rgba(5,11,20,.12);font-family:var(--font-label);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(5,11,20,.55);">Consumers</span>
      </div>
    </div>
  </div>
  <p class="deck-footer">Copyright © 2026 Tier0. All rights reserved.</p>
</section>
```

**flow-card 颜色选择：**

| 变体类 | 背景 | 用于 |
|--------|------|------|
| `--soft` | 浅绿洗 `#e5f9b4` | 起点 / 中性节点 |
| `--lime` | 亮绿 `#B2ED1D` | 核心节点（Namespace） |
| `--white` | 白 + 蓝边 | 消费侧 / IT 系统 |
| `--blue` | 浅蓝洗 | 消费侧 / 对外接口 |

### D2 — 双栏对比（代码树 + 要点列表）

```html
<section class="deck-slide deck-slide--content" data-slide-type="D" data-theme="light"
         style="background:var(--ppt-lt2);">
  <header class="deck-chrome">
    <div class="deck-chrome__l">04 · Namespace Model · 命名空间模型</div>
    <div class="deck-chrome__r">06 / 12</div>
  </header>
  <div class="deck-main" style="gap:1vh;">
    <h1>主题路径即<span class="accent">语义</span></h1>
    <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:clamp(16px,2vw,24px);flex:1;min-height:0;margin-top:1vh;">
      <!-- 左栏：代码示例 -->
      <div style="background:var(--ppt-lt2);padding:clamp(14px,2vh,20px);border-radius:4px;display:flex;flex-direction:column;">
        <p style="font-family:var(--font-label);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--ppt-emphasis-on-light);margin:0 0 10px;"><span style="color:var(--ppt-tx1);margin-right:6px;">A</span> MQTT Topic Tree</p>
        <pre style="margin:0;flex:1;font-family:var(--font-footer);font-size:11px;line-height:1.55;background:var(--ppt-tx1);color:#e8eaed;padding:14px;border-radius:4px;overflow:hidden;"># 主题即语义
enterprise/
└─ site-shanghai/
   └─ area-assembly/
      └─ line-01/
         └─ cell-03/
            ├─ plc/state → "running"
            ├─ robot/torque → 42.7 Nm
            └─ energy/kw → 18.4</pre>
      </div>
      <!-- 竖分隔线：灰色 --ppt-divider，不用 accent 绿 -->
      <span style="width:1px;background:var(--ppt-divider);align-self:stretch;" aria-hidden="true"></span>
      <!-- 右栏：要点 -->
      <div style="background:var(--ppt-highlight-wash);padding:clamp(14px,2vh,20px);border-radius:4px;">
        <p style="font-family:var(--font-label);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--ppt-emphasis-on-light);margin:0 0 10px;"><span style="color:var(--ppt-tx1);margin-right:6px;">B</span> Key Properties</p>
        <ul class="deck-body" style="margin-top:8px;max-width:none;">
          <li><strong>ISA-95 层级</strong> — Enterprise ▸ Site ▸ Area ▸ Line ▸ Cell</li>
          <li><strong>自描述</strong> — 主题路径本身即语义，免维护外部映射表</li>
          <li><strong>JSON Payload</strong> — 带时间戳、质量码与单位</li>
          <li><strong>变化上报</strong> — report by exception，仅在变化时发布</li>
        </ul>
      </div>
    </div>
  </div>
  <p class="deck-footer">Copyright © 2026 Tier0. All rights reserved.</p>
</section>
```

### D3 — 柱状部署塔 + KPI 行

```html
<section class="deck-slide deck-slide--content" data-slide-type="D" data-theme="light">
  <header class="deck-chrome">
    <div class="deck-chrome__l">07 · Deployment · 部署与集成</div>
    <div class="deck-chrome__r">09 / 12</div>
  </header>
  <div class="deck-main" style="gap:1vh;">
    <h1>边缘部署，<span class="accent">云端扩展</span></h1>
    <!-- 塔柱（4 列，底部对齐，高度递增） -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(10px,1.2vw,14px);align-items:end;margin-top:1vh;height:min(28vh,240px);">
      <!-- Tower 1 -->
      <div>
        <div style="height:36px;background:var(--ppt-lt2);display:grid;place-items:center;border-radius:4px 4px 0 0;margin-bottom:4px;color:var(--ppt-tx1);"><i data-lucide="hard-drive" style="width:18px;height:18px;"></i></div>
        <div style="padding:14px 10px;border:1px solid rgba(5,11,20,.12);border-radius:0 0 4px 4px;background:#fff;min-height:100px;">
          <span style="font-family:var(--font-label);font-size:9px;letter-spacing:.1em;text-transform:uppercase;opacity:.65;">Edge · 边缘</span>
          <p style="font-size:clamp(18px,2.2vw,22px);font-weight:500;letter-spacing:-.03em;margin:6px 0;">Tier0 Edge</p>
          <p style="font-size:12px;line-height:1.4;opacity:.8;margin:0;">贴近产线接入与缓存，断网续传不丢数</p>
        </div>
      </div>
      <!-- Tower 2 / 3 / 4 同结构，高度分别 min-height:130 / 160 / 130 -->
    </div>
    <!-- KPI 行 -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(10px,1.2vw,14px);margin-top:2vh;">
      <article style="padding:14px;border:1px solid rgba(5,11,20,.1);border-top:2px solid var(--ppt-accent-marker);border-radius:4px;background:#fff;">
        <p style="font-size:clamp(24px,3vw,28px);font-weight:500;color:var(--ppt-emphasis-on-light);letter-spacing:-.03em;line-height:1;margin:0;">OSS</p>
        <p style="font-size:12px;margin-top:6px;color:var(--ppt-tx1);">Open Source</p>
        <p style="font-size:11px;margin:4px 0 0;color:rgba(5,11,20,.55);">开源内核</p>
      </article>
      <!-- 其余 3 个 KPI 同结构 -->
    </div>
  </div>
  <p class="deck-footer">Copyright © 2026 Tier0. All rights reserved.</p>
</section>
```

**关键要点：**
- 塔柱 `align-items: end`（底部对齐），通过 `min-height` 差异制造高度节奏
- KPI 数字色 = `--ppt-emphasis-on-light`（`#73B200`）；数字 ≤ 4 字符（OSS / 20+ / ≈4wk）
- KPI 顶边线颜色 = `--ppt-accent-marker`（`#B2ED1D`）

### D4 — 深底时间轴（落地路径）

```html
<section class="deck-slide deck-slide--content"
         data-slide-type="D" data-theme="dark"
         style="background:var(--ppt-tx1);background-image:radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px);background-size:12px 12px;">
  <header class="deck-chrome">
    <div class="deck-chrome__l">08 · Adoption · 落地路径</div>
    <div class="deck-chrome__r">10 / 12</div>
  </header>
  <div class="deck-main" style="gap:1vh;">
    <h1 style="color:#fff;">从 PoC 到<span style="color:var(--ppt-emphasis-on-dark);">规模化生产</span></h1>
    <!-- 时间轴 -->
    <div style="position:relative;margin-top:2vh;padding:5vh 0;flex:1;">
      <!-- 中轴线 -->
      <div style="position:absolute;left:8%;right:8%;top:50%;height:2px;background:var(--ppt-accent-marker);"></div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);position:relative;z-index:1;">
        <!-- 节点 up（标签在上）-->
        <div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px;">
          <div style="text-align:center;margin-bottom:28px;">
            <span style="font-family:var(--font-label);font-size:11px;color:rgba(255,255,255,.55);text-transform:uppercase;">01</span>
            <span style="display:block;font-size:15px;font-weight:500;color:#fff;margin:4px 0;">Discovery</span>
            <span style="font-size:12px;color:rgba(255,255,255,.65);">现状梳理 · 命名规范</span>
          </div>
          <span style="width:10px;height:10px;border-radius:50%;background:#fff;flex-shrink:0;"></span>
        </div>
        <!-- 节点 down + is-accent（标签在下，高亮点）-->
        <div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px;">
          <span style="width:10px;height:10px;border-radius:50%;background:var(--ppt-accent-marker);flex-shrink:0;"></span>
          <div style="text-align:center;margin-top:28px;">
            <span style="font-family:var(--font-label);font-size:11px;color:var(--ppt-emphasis-on-dark);text-transform:uppercase;">02</span>
            <span style="display:block;font-size:15px;font-weight:500;color:#fff;margin:4px 0;">PoC · ≈4 wk</span>
            <span style="font-size:12px;color:rgba(255,255,255,.65);">单产线全链路验证</span>
          </div>
        </div>
        <!-- 节点 03 up / 04 down 同结构 -->
      </div>
    </div>
    <p style="font-size:13px;color:rgba(255,255,255,.55);margin:1vh 0 0;">每一步都可独立验证、低风险推进 — 先在一条产线证明价值，再规模化复制</p>
  </div>
  <p class="deck-footer" style="color:rgba(255,255,255,.45);">Copyright © 2026 Tier0. All rights reserved.</p>
</section>
```

**关键要点（D4 深底时间轴）：**
- 背景 `--ppt-tx1` + 低对比点阵，**无额外色块或渐变**
- 中轴线色 = `--ppt-accent-marker`（`#B2ED1D`）
- 高亮节点圆点 = `--ppt-accent-marker`；普通节点 = `#fff`
- 高亮标签数字色 = `--ppt-emphasis-on-dark`（`#B2ED1D`）
- 此页计入"深色断点"，可代替 B 类型打破白底连续

### D5 — 水平管线步骤（Pipeline Steps）

**预览：** [`slide-pipeline-D5.html`](../preview/ppt/slide-pipeline-D5.html)（`→` 逐步点亮，`←` 切换变体）

**要点：** 编号圆圈 + 步骤连接线（`--ppt-accent-marker`）· 白底 · 支持 `data-animate="pipeline"` 按键逐步点亮 · 适合落地路径、集成流程、PoC 方法论

#### D5a — 纯文字步骤（4 步，落地路径）

```html
<section class="deck-slide deck-slide--content"
         data-slide-type="D" data-theme="light"
         data-animate="pipeline">
  <header class="deck-chrome">
    <div class="deck-chrome__l">08 · Adoption · 落地路径</div>
    <div class="deck-chrome__r">10 / 12</div>
  </header>
  <div class="deck-main" style="gap:1vh;">
    <h1 data-anim>从试点到<span class="accent">规模化</span></h1>
    <p class="deck-eyebrow" data-anim>PoC → Pilot → Scale-out</p>

    <div class="deck-pipeline">
      <div class="deck-pipeline__step" data-anim="step">
        <div class="deck-pipeline__nb">01</div>
        <p class="deck-pipeline__title">Discovery</p>
        <p class="deck-pipeline__desc">现状梳理 · 命名规范制定</p>
      </div>
      <div class="deck-pipeline__step" data-anim="step">
        <div class="deck-pipeline__nb">02</div>
        <p class="deck-pipeline__title">PoC</p>
        <p class="deck-pipeline__desc">单产线全链路验证 · ≈ 4 wk</p>
      </div>
      <div class="deck-pipeline__step" data-anim="step">
        <div class="deck-pipeline__nb">03</div>
        <p class="deck-pipeline__title">Pilot Line</p>
        <p class="deck-pipeline__desc">接入 MES / BI · 试运行</p>
      </div>
      <div class="deck-pipeline__step" data-anim="step">
        <div class="deck-pipeline__nb">04</div>
        <p class="deck-pipeline__title">Scale-out</p>
        <p class="deck-pipeline__desc">多产线 / 多厂区推广复制</p>
      </div>
    </div>

    <p style="margin-top:4vh;font-size:14px;color:rgba(5,11,20,.5);" data-anim>
      每一步可独立验证 · 低风险推进 — 先在一条产线证明价值，再复制
    </p>
  </div>
  <p class="deck-footer">Copyright © 2026 Tier0. All rights reserved.</p>
</section>
```

#### D5b — Icon 增强版（3 步 + 补充说明卡，架构流程）

```html
<section class="deck-slide deck-slide--content"
         data-slide-type="D" data-theme="light"
         data-animate="pipeline">
  <header class="deck-chrome">
    <div class="deck-chrome__l">03 · Architecture · 架构</div>
    <div class="deck-chrome__r">05 / 12</div>
  </header>
  <div class="deck-main" style="gap:1.5vh;">
    <h1 data-anim>Source → <span class="accent">Namespace</span> → Event</h1>
    <p class="deck-eyebrow" data-anim>三层即全局</p>

    <!-- 管线步骤 -->
    <div class="deck-pipeline" style="margin-top:4vh;">
      <div class="deck-pipeline__step" data-anim="step">
        <div class="deck-pipeline__nb">
          <i data-lucide="cable" style="width:16px;height:16px;stroke-width:2;"></i>
        </div>
        <p class="deck-pipeline__title">Source Flow</p>
        <p class="deck-pipeline__desc">PLC · OPC UA · Modbus · 归一化</p>
      </div>
      <div class="deck-pipeline__step" data-anim="step">
        <div class="deck-pipeline__nb">
          <i data-lucide="layers" style="width:16px;height:16px;stroke-width:2;"></i>
        </div>
        <p class="deck-pipeline__title">Namespace</p>
        <p class="deck-pipeline__desc">MQTT Broker · SSOT · 语义主题树</p>
      </div>
      <div class="deck-pipeline__step" data-anim="step">
        <div class="deck-pipeline__nb">
          <i data-lucide="git-branch" style="width:16px;height:16px;stroke-width:2;"></i>
        </div>
        <p class="deck-pipeline__title">Event Flow</p>
        <p class="deck-pipeline__desc">规则 · 编排 · MES / ERP / BI</p>
      </div>
    </div>

    <!-- 补充说明卡（可选，data-anim 整体淡入） -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(12px,1.6vw,20px);margin-top:3vh;" data-anim>
      <div style="padding:16px 20px;background:var(--ppt-lt2);border-radius:4px;">
        <p style="font-family:var(--font-label);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--ppt-emphasis-on-light);margin:0 0 8px;">Edge Sources</p>
        <p style="font-size:13px;color:rgba(5,11,20,.7);margin:0;line-height:1.5;">贴近产线采集，协议归一化后上报</p>
      </div>
      <div style="padding:16px 20px;background:var(--ppt-highlight-wash);border-radius:4px;">
        <p style="font-family:var(--font-label);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--ppt-emphasis-on-light);margin:0 0 8px;">Unified Namespace</p>
        <p style="font-size:13px;color:rgba(5,11,20,.7);margin:0;line-height:1.5;">全厂共享单一事实源，发布一次订阅无限</p>
      </div>
      <div style="padding:16px 20px;background:var(--ppt-lt2);border-radius:4px;">
        <p style="font-family:var(--font-label);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--ppt-emphasis-on-light);margin:0 0 8px;">Consumers</p>
        <p style="font-size:13px;color:rgba(5,11,20,.7);margin:0;line-height:1.5;">MES / ERP / AI 按需订阅，即插即用</p>
      </div>
    </div>
  </div>
  <p class="deck-footer">Copyright © 2026 Tier0. All rights reserved.</p>
</section>
```

**关键要点（D5 共用）：**
- `.deck-pipeline` 是 flex 容器，每个 `.deck-pipeline__step` 等宽；步骤间连接线由 CSS `::before` 自动绘制，颜色 = `--ppt-accent-marker`（`#B2ED1D`）
- 步骤数建议 3–5 个；超过 5 个时拆页或改用 D4 时间轴
- 圆圈内可放数字或 Lucide 图标（`width/height: 16px; stroke-width: 2`）
- 加 `data-animate="pipeline"` + 每步加 `data-anim="step"` → 演讲时按 `→` 逐步点亮；不加则全部直接显示
- 补充说明卡整体用一个 `data-anim`（在所有步骤点亮后才淡入）

---

## 类型 E — 对比双栏（`data-slide-type="E"`）

两列内容必须结构对称。提供两种视觉变体，按场景选择。

### E1 — 竖线分割（信息密度高 · 适合长列表对比）

左右无背景色块，中间一条灰色竖线（`--ppt-divider`）切分，视觉更轻。适合 5–6 条对比要点。

```html
<section class="deck-slide deck-slide--content" data-slide-type="E" data-theme="light">
  <header class="deck-chrome">
    <div class="deck-chrome__l">06 · Comparison · 对比</div>
    <div class="deck-chrome__r">08 / 12</div>
  </header>
  <div class="deck-main" style="gap:1vh;">
    <h1>从 N×M 接线，到一个命名空间</h1>
    <div style="display:grid;grid-template-columns:1fr 2px 1fr;gap:clamp(20px,3vw,40px);flex:1;min-height:0;align-items:start;margin-top:2vh;">
      <!-- 左：传统（弱化） -->
      <div>
        <p class="deck-eyebrow" style="color:rgba(5,11,20,.4);margin-bottom:10px;">Traditional · 传统集成</p>
        <h2 style="margin:0 0 16px;font-size:clamp(20px,2.4vw,26px);font-weight:500;color:rgba(5,11,20,.45);">N×M wiring</h2>
        <ul class="deck-body" style="max-width:none;font-size:14px;color:rgba(5,11,20,.5);">
          <li>N×M 定制连接，集成成本随规模膨胀</li>
          <li>紧耦合，任一改动风险扩散</li>
          <li>数据孤岛，缺乏统一语义</li>
          <li>协议各异，治理困难</li>
          <li>新增消费者需重新打通</li>
        </ul>
      </div>
      <!-- 竖分隔线：灰色 --ppt-divider -->
      <span style="width:1px;background:var(--ppt-divider);align-self:stretch;" aria-hidden="true"></span>
      <!-- 右：Tier0（满亮度） -->
      <div>
        <p class="deck-eyebrow" style="margin-bottom:10px;">Tier0 UNS</p>
        <h2 style="margin:0 0 16px;font-size:clamp(20px,2.4vw,26px);font-weight:500;color:var(--ppt-tx1);">1×N publish</h2>
        <ul class="deck-body" style="max-width:none;font-size:14px;">
          <li>发布一次，任意订阅（1×N）</li>
          <li>松耦合，源与消费者解耦</li>
          <li>单一事实源 + 语义主题树</li>
          <li>协议归一，集中治理</li>
          <li>新增消费者即插即用</li>
        </ul>
      </div>
    </div>
  </div>
  <p class="deck-footer">Copyright © 2026 Tier0. All rights reserved.</p>
</section>
```

### E2 — 卡片式（视觉权重强 · 适合短文案 + 图标）

两列各用一张 `tier0-card-icon` 卡片，左 `--neutral`（灰底）右 `--accent`（绿底），结构与 C 系列 icon 卡一致，视觉落点清晰。适合 3–4 条要点。

```html
<section class="deck-slide deck-slide--content" data-slide-type="E" data-theme="light">
  <header class="deck-chrome">
    <div class="deck-chrome__l">06 · Comparison · 对比</div>
    <div class="deck-chrome__r">08 / 12</div>
  </header>
  <div class="deck-main" style="gap:1.5vh;">
    <h1>从 N×M 接线，到一个命名空间</h1>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:clamp(14px,2vw,20px);flex:1;min-height:0;margin-top:1vh;">
      <!-- 左：传统 · neutral 灰底 -->
      <article class="tier0-card-icon tier0-card-icon--neutral" style="justify-content:flex-start;">
        <header class="tier0-card-icon__head">
          <h3 class="card-title">N×M wiring</h3>
          <span class="tier0-icon-box" aria-hidden="true"><i data-lucide="git-merge"></i></span>
        </header>
        <hr class="tier0-card-icon__rule">
        <div class="tier0-card-icon__body">
          <p class="card-lead" style="color:rgba(5,11,20,.55);">Traditional · 传统集成</p>
          <ul class="card-list" style="color:rgba(5,11,20,.55);">
            <li>N×M 定制连接，集成成本随规模膨胀</li>
            <li>紧耦合，任一改动风险扩散</li>
            <li>数据孤岛，缺乏统一语义</li>
            <li>新增消费者需重新打通</li>
          </ul>
        </div>
      </article>
      <!-- 右：Tier0 · accent 绿底 -->
      <article class="tier0-card-icon tier0-card-icon--accent" style="justify-content:flex-start;">
        <header class="tier0-card-icon__head">
          <h3 class="card-title">1×N publish</h3>
          <span class="tier0-icon-box" aria-hidden="true"><i data-lucide="layers"></i></span>
        </header>
        <hr class="tier0-card-icon__rule">
        <div class="tier0-card-icon__body">
          <p class="card-lead">Tier0 UNS</p>
          <ul class="card-list">
            <li>发布一次，任意订阅（1×N）</li>
            <li>松耦合，源与消费者解耦</li>
            <li>单一事实源 + 语义主题树</li>
            <li>新增消费者即插即用</li>
          </ul>
        </div>
      </article>
    </div>
  </div>
  <p class="deck-footer">Copyright © 2026 Tier0. All rights reserved.</p>
</section>
```

**关键要点（E1 / E2 共用）：**
- 两列结构必须对称：`eyebrow` → `h2/card-title` → 列表，不要一列堆段落另一列堆列表
- 左列视觉弱化（45–55% 透明度 / neutral 底），右列满亮度 / accent 底——落差即对比力
- E1 竖线色 = `--ppt-divider`（灰色 `rgba(5,11,20,0.14)`），宽 1px；**不用** accent 绿
- E2 右卡用 `--accent` 绿底
- 每列列表 ≤ 5 项；超出则精简或改用 E1 多行版本

---

## 附录 A：类型速查

| 类型 | CSS 类 | `data-theme` | 用于 |
|------|--------|-------------|------|
| **A** Cover | `.deck-slide--cover` | dark | 封面、封底 |
| **B** Chapter | `.deck-slide--chapter` | dark | 章节节奏断点 |
| **C** Content | `.deck-slide--content` | light | 正文（文本 / Icon 卡） |
| **D** Infographic | `.deck-slide--content` | light 或 dark | 架构图 / 双栏 / 塔柱 / 时间轴 |
| **E** Compare | `.deck-slide--content` | light | 传统 vs Tier0 |

## 附录 B：叙事模块 → 类型速查

| 叙事块 | 推荐类型 | 变体 |
|--------|----------|------|
| 封面 | A | — |
| 行业痛点 | C | C2（4 卡 2×2） |
| 核心理念过渡 | B | — |
| UNS 概念 | C | C1（文本 + 列表） |
| 三层架构 | D | D1（三栏流程卡） |
| 命名空间模型 | D | D2（双栏 + 代码树） |
| 能力一览 | C | C3（6 卡 3×2） |
| 传统 vs Tier0（长列表） | E | E1（竖线分割） |
| 传统 vs Tier0（短文案） | E | E2（卡片式） |
| 部署形态 | D | D3（塔柱 + KPI） |
| 落地路径（演讲互动） | D | D5（水平管线，逐步点亮） |
| 落地路径（视觉强调） | D | D4（深底时间轴） |
| 封底 / 下一步 | A | A2（Closing 变体） |

完整顺序与节奏见 [`ppt-workflow.md`](ppt-workflow.md)。
