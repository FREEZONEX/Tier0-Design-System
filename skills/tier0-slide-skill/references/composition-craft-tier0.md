# Composition Craft · Tier0 Slide Skill

从近期中文 demo 排版返工沉淀的**可执行构图规则**。与 `gallery-fidelity-tier0.md` 一起用：先对齐 Gallery 语法，再用本文件消除「空、挤、混、贴」。

## 1. 语言单一（P0）

| 规则 | 正确 | 错误 |
|------|------|------|
| 一页一语 | 中文 deck 全文中文；英文 deck 全文英文 | 中文标题下再挂一句英文复述 |
| 专有名词 | MQTT、UNS、Node-RED、SaaS、GitHub 可保留 | `…。Lower the barrier to…` 整句对照 |
| 封面副标 | 与主标题同语言 | 中文主标 + 英文 lead |
| chrome 标签 | `chrome-min` 可用英文章节码（与 Gallery 一致） | 把 chrome 文案当成正文双语 |

**判定：** 同一 `<p>` / 卡片正文里，若已有汉字，就不要再出现完整英文句子（≥3 个英文词的陈述句）。

Intake `language=zh` 时默认启用本规则；`en` 时禁止中文夹注。

## 2. 左右栏平衡（P0）

**失败形态：** 左栏大方块内部留白大、边缘空；右栏多行挤在一起。

**修法：**

1. 两侧都是「可拉伸内容栈」时，用 **等宽** `1fr 1fr`，不要 `1.1fr .9fr` 再放大差距。
2. 左栈（层 / 卡）与右栈（策略行）都用 `grid-template-rows: repeat(N, 1fr)` **均分高度**，让两侧视觉重量接近。
3. 先改列宽与行均分，再调 padding；不要靠加大一侧 padding「填空」。

推荐类：`.dual-stack` / `.dual-stack__layers` / `.dual-stack__rows`（见 `template-tier0.html`）。

## 3. 短文案大格子（P0）

**失败形态：** 2×2 或 3 列卡片里字很少，格子下半截大片空洞；或四格因文案长短显得大小不一。

**修法：**

1. 网格用 **等分** `1fr 1fr`（或 `repeat(3|4,1fr)`）+ 固定 `gap:20px`，单元格同高。
2. 短文案时：文案靠上；把大号序号 **锚在右下角** 作占位（低透明度），填满视觉空洞。
3. 不要把序号和标题挤在同一行顶部留下整块空白。

推荐类：`.corner-card-grid` + `.corner-card` + `.corner-card__n`。

```html
<div class="corner-card-grid">
  <article class="corner-card is-green">
    <div class="corner-card__body">
      <h3>降低试用门槛</h3>
      <p>让海外用户更愿意先「试试看」。</p>
    </div>
    <div class="corner-card__n" aria-hidden="true">01</div>
  </article>
  <!-- … -->
</div>
```

有真实图示 / 指标时优先 Gallery `line-sketch` 或证据图，不必强行用角标数字。

## 4. 中文深墨标题行距（P0）

`ink-section-divider__title`（S10）：

- 中文（或会折成两行汉字）用 **`line-height: 1.14`**、`letter-spacing: -.04em`、带 `var(--sans-zh)`。
- **禁止**套用英文单行 hero 的 `line-height: .9` —— 两行汉字会贴死。
- 模板已默认 `1.14`；自定义深墨标题时同样遵守。

## 5. 密度与空洞速查

| 现象 | 优先动作 |
|------|----------|
| 一侧空一侧挤 | 等宽列 + 两侧 `1fr` 行均分 |
| 卡内下半截空 | 角标数字 / `line-sketch` / 收紧行数或改更密版式 |
| 标题下挂翻译句 | 删掉；只保留主语言 |
| 深墨两行汉字挤 | 行高 ≥ 1.12 |
| 为填空加菱形斜线 | 禁止；改用本文件 §3 或 Gallery 组件 |

## 6. 与验收的关系

- 逐页门：`page-review-tier0.md`（Language / Balance）
- 保真总则：`gallery-fidelity-tier0.md`
- 清单：`checklist-tier0.md` → `0-T-7`
- 校验：`validate-tier0-deck.mjs` 会对双语复述、过紧深墨行高发出警告/错误
