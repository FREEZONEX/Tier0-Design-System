# Layout Craft · Tier0

> 合并自 layout-first-principles / gallery-fidelity / composition-craft。
> Agent：模式 B 重排或返工时读本文件即可，不必再打开那三个旧文件。

---

## A · First Principles

与 Gallery 的关系：**先判第一性原理（可参考 `assets/layout-density/` 的疏密灵感）→ 再按需借用 Gallery / template 的组件与版式片段 → 用本文件把疏密与数据层级修到「精致、不溢出、不失衡」。**  
Gallery 是基础样式与布局语言，**不是**把每页硬套进某个 `Sxx`。

---

## 0. 每页开工：第一性原理门（强制）

在选 `Sxx`、写 HTML / `deck.json` **之前**，为该页写满下表（可写在工作笔记或 `deck.json` 的 `pageIntent` 字段）：

| 字段 | 问什么 | 通过标准 |
|------|--------|----------|
| `purpose` | 这页存在的唯一任务是什么？ | 一句话；不能是「介绍一下」 |
| `coreClaim` | 观众 5 秒必须带走的核心观点 | 可被证据证明；禁止口号空转 |
| `proofType` | 证明靠什么？ | `kpi` / `table` / `chart` / `list` / `compare` / `evidence-media` / `structure` |
| `heroElement` | 画面第一视觉锚点 | 一个大标题 **或** 一个大数字 **或** 一张主图/主表 |
| `secondary` | 次要信息如何收纳 | 分割线分区 / 侧栏 / 脚注来源；不得与 hero 抢面积 |
| `density` | 本页目标密度 | `sparse`（转场/封面）· `editorial`（结论+清单）· `dense`（表/多指标） |

**失败即停：**

- 写不出 `coreClaim` → 拆页或回源材料补结论。  
- `heroElement` 超过一个 → 删减或拆成两页。  
- 没有真实数据却写死 KPI → 用 `DATA PENDING` 或改成结构页，禁止虚构。

---

## 1. 从第一性原理到版式原型

| purpose / proofType | 优先结构（Tier0 组件） | Gallery 参考 |
|---------------------|------------------------|--------------|
| 一页结论 + 目录/路径 | 大标题 + 绿挑词 + TOC 行 + 可选底部 `kpi-rail` | S01 / cover 节奏 |
| 观点 + 分点证据 | 左大数字栈 / 右 `rule-list`（发丝分割） | S20 ledger 变体 |
| 对比 / 达成 | 左 insight（竖线强调）+ 右指标表 | S08 · S18 |
| 趋势 / 变化 | 左 hero KPI + 注释；右 `viz-bars` / 折线 | S21 · data-viz |
| 多指标一眼读完 | `metric-quad`（十字发丝线）或 `kpi-row-4` | S20 |
| 叙事 + 头条指标 | `readout-split`（深墨左 / 白右） | closing / S10 旁路变体 |
| 深墨扫描清单 | 左列表发丝行 + 右超大 KPI 柱 | 深墨内容页（少用卡片） |

**色锁：** 参考图里的紫色 → 一律换成 Tier0 `#B2ED1D`（面/路径）与 `#73B200`（白底可读绿字）。禁止紫/蓝/霓虹强调。

---

## 2. 疏密有度（UI 精致度硬规则）

### 2.1 画布几何

| 规则 | 要求 |
|------|------|
| 外边距 | ≥ 40px 等效（`.canvas-card` 已含 `--canvas-gutter:40px`）；内容不得贴边、不得压 nav |
| 区块间距 | 独立 block 之间 ≥ **40px**（`--block-gap` / `--sp-8`）；同一列表项内紧、项与项之间靠 **1px 发丝线** 呼吸 |
| 对齐 | 同一页数字右缘 / 标签左缘 / 分割线端点共轴；禁止「看起来差不多」 |
| 溢出 | 禁止裁切、重叠、文字顶出卡片；失败先删内容或换原型，禁止整页缩小 |
| 比例 | 双栏默认 `1fr 1fr`；「叙事 40% + 数据 60%」仅当 `proofType=chart|table` 且写进 `pageIntent` |

### 2.1b 间距节奏（硬门槛 · 自查必过）

真源：`template-tier0.html` 的 Carbon 8px 模数（`--sp-3`…`--sp-9`）+ `.canvas-card` 的 `--block-gap` / `--stack-gap` / `--inline-gap`。

| 层级 | Token | 典型用法 | 禁止 |
|------|-------|----------|------|
| 画布外边距 | `--canvas-gutter` ≥40px | `.canvas-card` padding | 再套一层水平 padding 把 chrome 挤歪 |
| **独立区块** | `--block-gap` = **40px** 起步；证据页（案例截图+流图）用 `.stack-loose` = **clamp(40px, 4.8vh, 56px)** | chrome→标题区→证据图→流图 | `gap:1vh` / `gap:6px` 把整页压成贴片 |
| 区块内相关元素 | `--stack-gap` = **24px** | 标题↔标签行、Challenge↔Solution 内边 | 标题贴 chrome（无 margin）又无 gap |
| 行内芯片/标签 | `--inline-gap` = **12px** | `.tag-row`、流图片 | 标签粘成 `LIVEAUDITABLE` |
| chrome 下沿 | `.chrome-min` 默认 `margin-bottom:48px`；若父级已用 `.stack` gap，则 chrome `margin-bottom:0` | 二选一，勿叠加到 80px+ 也不要两者都砍光 | |

**自查（每页 ESC 稳定态）：**

1. chrome 与主标题之间目测 ≥ ~32–48px，不是「贴在一起」。  
2. 标题区与主图 / 主证据之间 ≥ 40px。  
3. 主图与底栏架构流之间 ≥ 40px。  
4. `.tag` 之间有可见空隙（用 `.tag-row`，不要只靠文字空格）。  
5. 失败信号：整页 `gap:1vh`、流图 `padding:8px`、卡片 `padding:8px 10px` 当主证据容器。

### 2.2 密度档位

| 档位 | 何时用 | 画面特征 |
|------|--------|----------|
| `sparse` | 封面、深墨转场 | 超大单句；几乎无卡；大量留白故意为之 |
| `editorial` | 大多数结论页 | 标题一句 + 短说明 + 一条分割线 + 3–6 个分点或 1 个主图 |
| `dense` | 复盘、指标、对比表 | 发丝表/账本；大数字；脚注来源；仍保持 ≥40px 边距 |

**禁止：** 为了「满」而堆第二套标题、装饰菱形、无语义色块。空 → 放大 hero / 用角标序号 / 换更密原型，不要乱加装饰。

### 2.3 分割线语法（优先于厚卡片）

参考图的「精致感」大量来自 **细分割线分区**，而不是盒子套盒子。

| 用法 | 实现 |
|------|------|
| 标题区与内容区 | `border-bottom: 1px solid var(--border-subtle)` |
| 列表项 | `.rule-list` 每项底部分割线 |
| 2×2 指标 | `.metric-quad` 十字发丝 |
| 表 | `.data-table` **只有横线**，无竖线、无重阴影 |
| 结论与来源 | 顶部分割 + `.viz-source` / 脚注 |

深墨页分割线用 `rgba(255,255,255,.12)`；白底用 `--border-subtle`。

---

## 3. 关键数值与文本如何「跳出来」

1. **一页一个数字英雄**：字号显著大于正文（`kpi-hero` / `ledger-num` / `metric-quad__value`）；单位用小号 `.unit`。  
2. **绿只点亮「赢 / 目标 / 本页焦点」**：白底数字默认墨色；达成率、关键结论词可用 `#73B200`；亮绿面 `#B2ED1D` 留给底栏、选中行、路径。  
3. **关键词挑词**：标题里最多 1–2 个词用绿或括号 `[Keyword]`；禁止整句刷绿。  
4. **insight 竖条**：左栏结论旁用 3–4px 竖向 accent（`.insight-rail`），锚定「第一性原理句子」。  
5. **表内高亮**：只高亮「证明 coreClaim」的单元格/行（`.is-focus` / `.is-win`），不要整表染色。

---

## 4. 表格 · 图表 · 补充数据

遵守 `data-viz-tier0.md` 的数据契约。本文件补充**布局**约定：

| 形态 | 布局要点 |
|------|----------|
| 对比表 | 左「发生了什么」大字；右表列：指标 / 实际 / 目标 / 差 / 状态点 |
| 明细表 | 全宽；横线分隔；右侧可抽 1–2 个 outcome 大数（`21% → 12%`） |
| 柱/条 | 历史灰、焦点绿或墨；标注写在数据旁，不靠图例猜 |
| 底部 KPI 轨 | 深墨横条 3–4 个头条指标（`.kpi-rail`），证明封面/摘要页的 coreClaim |
| 补充 | 可把源材料里分散的数字收成一行对比或一个小表；**不可发明**未提供的数 |

有数据却只写成段落 → **必须**升级为表 / ledger / viz（除非 `purpose` 明确是纯叙事转场）。

---

## 5. 推荐组件（`template-tier0.html`）

| 类名 | 用途 |
|------|------|
| `.insight-rail` | 左结论 + 竖向 accent |
| `.rule-list` / `.rule-list__item` | 编号清单 + 发丝分割 |
| `.metric-quad` | 2×2 头条指标 |
| `.kpi-rail` | 底部深墨指标带 |
| `.readout-split` | 深墨叙事 \| 白底指标 |
| `.data-table` | 横线表 |
| 已有 `.ledger*` / `.viz-*` / `.kpi-hero` / `.kpi-row-4` | 继续优先使用 |

---

## 6. 逐页自检（Layout）

- [ ] `purpose` / `coreClaim` / `heroElement` 已写清且画面兑现  
- [ ] 无溢出、无重叠、无左空右挤、无贴边  
- [ ] 分区主要靠发丝线，而不是多层装饰卡  
- [ ] 关键数字/词一眼可见，且全页只有一个绿色焦点语义  
- [ ] 该用表/图的数据没有沦为长段落  
- [ ] 色与字仍是 Tier0（绿信号，非参考图紫色）

失败修复顺序：重写 `coreClaim` → 换原型 → 删次要块 → 调列宽/行均分 → 最后才改字号。

---

## B · Gallery Fidelity


## 1. 推荐对齐方式（可改造，勿硬套）

1. 先写本页 `purpose` / `coreClaim` / `heroElement` / `density`。
2. 打开 Gallery，找**内容形状**最近的 `Sxx`，按 `R` 读 `role / use / rule / avoid`——借结构与密度，**替换文案与证据**；形状不匹配时改造或组合片段，不要硬塞。
3. 类名优先来自 `assets/template-tier0.html`：`tier0-card`、`sub-card`、`line-sketch`、`ledger`、`duo-compare`、`rule-list` 等。
4. 改造后仍须通过本文件 §3 禁令（反装饰、反假 UI），并通过第一性原理疏密检查。

禁止：先写一堆自创 CSS（旋转菱形、斜线几何、封面以外的 ASCII 铺底），再“套成 Tier0 色”。  
也禁止：不管本页观点，机械把内容灌进某个 `Sxx` 空壳。

## 2. 基础观感清单（每页）

| 维度 | 期望 | 失败信号 |
|------|------|----------|
| 画布 | 16:9 · 合理外边距 · 内容不被 nav 压住 | 贴边、溢出、任意空洞 |
| 标题 | IBM Plex 400/500 · 左对齐 · 一页一句结论 | 双标题竞争、字重 ≥600、居中正文标题 |
| 卡片 | 浅灰 / 淡绿交替；对比用内容 | 连续多张 `ink` 黑底、装饰用黑条 |
| 图标 | 需要时才放 **IBM Carbon** 内联 SVG | emoji、无语义几何装饰 |
| 抽象图 | 黑灰线 + 单点亮绿（`line-sketch` 等） | 旋转菱形、斜线角标、ASCII 铺底（封面除外） |
| 绿 | `#B2ED1D` 作信号面/路径；白底字用 `#73B200` 或墨色 | 白底写亮绿字、满页铺绿 |
| 证据 | 真实截图/数据/占位；框贴合内容 | 假 Dashboard、大 letterbox 黑框 |
| 语言 | 一页一语；专有名词可保留 | 中文下挂英文复述句 |
| 平衡 | 双栏等宽均分；短文用角标占位 | 左空右挤；卡下大片空洞 |
| 中文标题 | 深墨标题行高 ≈1.14 | 两行汉字贴死（行高 0.9） |

## 3. 绝对禁令（近年翻车点）

1. **禁止装饰性旋转方块/菱形**：`transform:rotate(45deg)` 描边方块、卡片 `::after` 角标、斜线“信号条”。
2. **禁止为了填空而加几何**：没有语义的菱形、网格底纹（深墨 S10 转场页也不要硬网格角线）。
3. **禁止滥用黑底块**：内容页默认白/浅灰/淡绿；黑底留给 S10 章节转场与封底叙事栏。同一白底页不要出现 ≥2 张大面积 ink 卡（除非 Gallery 该页明确要求）。
4. **封底**：`TIER0-CLOSING-SPLIT` 左侧深墨即可；**不要**再叠 ASCII 点阵或大菱形描边。ASCII 只属于 `cover-editorial` 右侧场。
5. **图标**：装饰位只允许 Carbon；无图标优于假图标。
6. **S19 四卡**：对齐 Gallery——`tier0-card` + 序号 `t-meta` + 短文 +（`line-sketch` **或** 一个 Carbon icon），交替 `grey-1` / 淡绿底；不要自创顶部斜线+菱形 mark。
7. **语言单一**：中文 deck 不要在中文标题/正文下再挂一句英文复述；英文 deck 同理。产品名与协议名（MQTT、UNS）可保留，禁止中英双语对照句。详见 `composition-craft-tier0.md`。
8. **中文深墨标题**：`ink-section-divider__title` 行高用约 `1.14`，避免两行汉字贴死（勿用英文单行的 `0.9`）。
9. **禁止左空右挤**：双内容栏默认 `1fr 1fr` + 两侧行高均分；短文案大格子用右下角大号序号占位（`.corner-card`），不要留无锚点空洞。

## 4. 交付前对照

```bash
# 在浏览器并排打开：
# 1) layout-gallery/index.html → 目标 Sxx
# 2) 项目 ppt/index.html → 对应页
# 逐页比：标题字重、卡片底色节奏、有无多余装饰、证据框比例、左右是否平衡、是否中英混杂
node <SKILL_ROOT>/scripts/validate-tier0-deck.mjs 项目/ppt/index.html
```

校验器会对旋转菱形装饰、封底 ASCII、白底页过量 ink 卡、双语复述、过紧深墨行高发出错误/警告。

## 5. 与其它文档的关系

- 第一性原理 / 疏密 / 表图突出：`layout-first-principles-tier0.md`
- 构图返工细则：`composition-craft-tier0.md`
- 版式选择与 `R` 元数据：`layout-gallery-tier0.md`
- 逐页验收：`page-review-tier0.md`
- VI / 色字：`tier0-vi-style-guide.md`、`tier0-intro-v4-visual-grammar.md`
- 全套清单：`checklist-tier0.md`（含本文件 P0 条目）

---

## C · Composition Craft

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
| 数字埋在段落里 | 升级为 `ledger` / `metric-quad` / `viz-*` / `data-table`（见 `layout-first-principles-tier0.md`） |
| 分区靠厚卡片套娃 | 改发丝分割：`rule-list` / `metric-quad` / 表横线 |
| 多处抢绿 | 只留一个 focus（大数或一行 `is-focus`） |

## 6. 与第一性原理布局的关系

排版前先写 `purpose` / `coreClaim` / `heroElement` / `density`。完整规则、参考图与组件表：`layout-first-principles-tier0.md`。

## 7. 与验收的关系

- 逐页门：`page-review-tier0.md`（Language / Balance / First principles）
- 保真总则：`gallery-fidelity-tier0.md`
- 清单：`checklist-tier0.md` → `0-T-7` · `0-T-8`
- 校验：`validate-tier0-deck.mjs` 会对双语复述、过紧深墨行高发出警告/错误
