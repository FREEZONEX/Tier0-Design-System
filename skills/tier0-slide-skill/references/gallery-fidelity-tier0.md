# Gallery Fidelity Bar · Tier0 Slide Skill

视觉真源是 `layout-gallery/index.html`（按 `R` 看每页规则）。本文件规定：**产出必须像 Gallery，而不是像自创装饰皮肤。**

## 1. 对齐方式（硬顺序）

1. 打开 Gallery，找到内容形状最近的 `Sxx`，按 `R` 读 `role / use / rule / avoid`。
2. 复制该页的**结构与密度**（标题区、列数、卡片/非卡片语法、证据槽），再替换文案与证据。
3. 类名优先来自 `assets/template-tier0.html` 已注册样式：`tier0-card`、`sub-card`、`line-sketch`、`ledger`、`duo-compare` 等。
4. 只有 Gallery 语法装不下内容时，才允许局部改造；改造后仍须通过本文件 §3 禁令。

禁止：先写一堆自创 CSS（`v2-*` 装饰层、旋转菱形、斜线几何），再“套成 Tier0 色”。

## 2. Gallery 级观感清单（每页）

| 维度 | Gallery 标准 | 失败信号 |
|------|-------------|----------|
| 画布 | 16:9 · `canvas-card` · 左右轴对齐 · ≥40px 外边距 | 内容贴边、被 nav 压住、任意空洞 |
| 标题 | IBM Plex 400/500 · 左对齐 · 一页一句结论 | 双标题竞争、字重 ≥600、居中正文标题 |
| 卡片 | 浅灰 / 淡绿交替；对比用内容，不是满屏黑块 | 连续多张 `ink` 黑底、装饰用黑条 |
| 图标 | 需要时才放 **IBM Carbon** 内联 SVG | emoji、Lucide、无语义几何装饰 |
| 抽象图 | Gallery `line-sketch` 黑灰线 + 单点亮绿 | 旋转菱形、斜线角标、ASCII 铺底（封面除外） |
| 绿 | `#B2ED1D` 作信号面/路径；白底字用 `#73B200` 或墨色 | 白底写亮绿字、满页铺绿 |
| 节奏 | 每 4–6 页一张深墨转场；相邻页不连用同容器 | 三连同款四卡网格 |
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

- 构图返工细则：`composition-craft-tier0.md`
- 版式选择与 `R` 元数据：`layout-gallery-tier0.md`
- 逐页验收：`page-review-tier0.md`
- VI / 色字：`tier0-vi-style-guide.md`、`tier0-intro-v4-visual-grammar.md`
- 全套清单：`checklist-tier0.md`（含本文件 P0 条目）
