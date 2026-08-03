---
name: tier0-slide-skill
description: 将已有的 Tier0 PPT 结构、章节文档、图片、产品截图、Demo 视频、架构图或现有 PPTX，整理并逐页优化为符合 Tier0 品牌的演示稿。先理解演示目的、受众和素材证据，再选择或改造 Layout Gallery 的版式；可交付 HTML 演示稿、可编辑 PPTX 或两者。适用于「根据资料补全 Tier0 PPT」「优化现有 deck」「把 PPTX 改成 Tier0 风格」「用截图/视频做销售演示」「客户提案、售前、产品 Demo、架构说明、数据价值说明」等请求。本 skill 位于 Tier0 Design System 的 skills/tier0-slide-skill/；VI 冲突时服从仓库 tokens/deck.css 与 references/ppt-checklist.md。
---

# Tier0 Slide Skill

以**输入材料和演示目的**为起点，而不是以空白模板或固定页数为起点。Layout Gallery 是排版、图文关系与信息密度的来源；不是必须逐页复刻的成品库。

默认视觉目标为 **Tier0 V4 Editorial Hybrid**：白底 editorial 封面、纯网格深墨章节转场、白底证据页与深墨封底交替。封面与白底页使用 IBM Plex，深墨转场使用 Tektur；`#B2ED1D` 只点亮路径、结论或关键文字。视觉语法见 `references/tier0-intro-v4-visual-grammar.md`。

默认封面必须使用 `cover-editorial`：白底左侧品牌、主标题和演讲者信息，右侧为亮绿动态 ASCII 点阵场；由同一份 `deck.json` 同步生成 HTML 与 PPTX，PPTX 将动效降级为可编辑静态点阵。不得为 PPTX 另做深色封面。`section-dark` 固定为 Gallery S10 极简转场：纯深墨底、一个超大 IBM Plex 单句标题、克制章节标签与底部发丝线；禁止硬网格、左上 Logo、标题前短线、绿色角线和角落圆形。

## 输出与边界

| 交付 | 适用情况 | 原则 |
|---|---|---|
| HTML deck | 现场演示、需要动效 / 视频 / 交互 Demo、优先视觉还原 | 默认视觉准绳；每页为 16:9 横向画布 |
| 可编辑 PPTX | 客户需二次改字、邮件分发、销售内部复用 | 文本、图表、架构节点保持为独立可编辑对象 |
| HTML + PPTX | 既要现场演示也要可编辑副本 | 内容、页序、品牌 token 必须一致；允许说明 PPTX 的动效降级 |

不把没有证据的观点包装成数据；不以替换所有页面为目标；不为了“填满页面”添加装饰元素或虚构 KPI。

### 双格式硬规则

当交付包含 PPTX 时，必须从第一步使用 `deck.json` 单一数据源，并运行 `scripts/build-tier0-dual.mjs` 同时生成 HTML 与 PPTX。不要先写自由 HTML，再手工维护第二套 PPTX。

```bash
node <SKILL_ROOT>/scripts/validate-tier0-dual.mjs 项目/deck.json
node <SKILL_ROOT>/scripts/build-tier0-dual.mjs \
  --source 项目/deck.json \
  --html 项目/ppt/index.html \
  --pptx 项目/ppt/deck.pptx
node <SKILL_ROOT>/scripts/validate-tier0-pptx.mjs 项目/ppt/deck.pptx
```

PPTX 中标题、正文、标签、背景、卡片、线条与简单架构必须是 PowerPoint 原生对象；产品截图、照片和复杂证据图可以是独立图片。完整规则与 schema 见 `references/dual-output-tier0.md`，starter 为 `assets/tier0-v4-dual-example.json`。

## 输入优先级

1. **`intake/request.json`**：交付格式、封面元信息、封底 CTA、语言、素材处理及公开资料边界的最高来源；不改写事实。
2. **结构化章节文档 / 客户 briefing**：事实、章节层级、叙事顺序、术语与禁区的最高来源。默认采用“源内容锁定”模式：不得为了更像销售 deck 而改写其章节结构或遗漏子规则。
3. **真实证据素材**：产品截图、照片、Demo 视频、案例图、数据表、架构图；优先进入对应页面，不用通用假 UI 替代。
4. **既有 PPTX / HTML deck**：保留有效的章节、内容和可复用图形；逐页判断是否需要重排，而非整体套皮。
5. **Layout Gallery**：提供适合内容形状的版式语法、间距和组件参考；允许抽取其中的标题结构、图文比例、分区方式和动效，不强制 1:1 复刻。

## 必走工作流

### 0. 生成前确认门（必须先完成）

在读取、重构或生成 deck 前，先启动 Tier0 专属确认页；这是本 skill 唯一的前置阻塞确认。它锁定交付、封面/封底和素材，不提供风格选择：

```bash
node <SKILL_ROOT>/scripts/start-tier0-intake.mjs --project 项目/客户名称
node <SKILL_ROOT>/scripts/validate-tier0-intake.mjs 项目/客户名称/intake/request.json
```

- 必须确认：HTML / 可编辑 PPTX / 两者；封面是否展示日期与演讲者；封底是否展示 `www.tier0.app` 与官网二维码；原始素材上传。
- 同时确认：场景、受众、语言、时长、原有材料处理策略、公开资料策略、必须保留/避免内容。
- 本地确认页不能打开或用户明确要求纯聊天时，使用 `references/intake-gate-tier0.md` 的聊天回退表单；确认后仍写入同 schema 的 `intake/request.json`。
- Tier0 VI 永远锁定：不向用户提供自定义品牌色、字体或主题选择。更多 schema 与消费规则见 `references/intake-gate-tier0.md`。
- 若确认 `pptx` 或 `both`，立即锁定双格式模式；后续所有页面只改 `deck.json`，不分别改 HTML / PPTX。

### 1. 素材盘点与演示意图

读取用户给出的文档、PPTX、图片、视频和已有页面。先建立 `source-outline.json` 与 `content-coverage.json`，再形成一个简短的 **deck brief**。前两份文件锁定每个源章节、子标题、用户故事、流程步骤、边界与代码/配置块如何落到页面；任何省略都必须显式标为用户已批准的排除项。

- 受众、场景、时长与希望观众完成的行动；
- 核心结论与每一章必须被记住的一句话；
- 可验证证据、待补材料、不可改动的内容；
- 交付模式（HTML、PPTX 或双交付）与现有文件的可编辑性要求；以 `intake/request.json` 为准。

信息明确时直接执行；只有目的、受众或关键素材归属会显著改变叙事时，才集中询问一次。

详细方法：`references/source-first-deck-workflow.md`。

### 2. 先做页级叙事映射，再设计

为每一页列出：`页码 → 源内容 ID → 本页结论 → 输入证据 → 观众要看到什么 → 候选版式 → 是否保留原页结构`，并在每张源内容页的 `<section>` 加 `data-source-ids="…"`。

- 优先保留原 PPTX 中正确的内容关系；仅在层级、密度、证据落位或品牌表达不足时重构。
- 先按内容形状选择 Gallery 语法：双向对照用 S08、线性或交错过程用 S11、现场到云端架构用 S13、闭环用 S14、图像证据用 S15、Demo 用 S16、系统关系用 S17、业务价值用 S18、四项能力 + 抽象线条图用 S19、KPI 清单用 S20、读数任务不同的数据图用 S21、路由/配置/执行逻辑等大段原文用 S23。
- 允许把 Gallery 的一个结构片段移入另一页，例如标题区域、两栏比例、图例、节点样式或底部证据区；不要复制与本页无关的文案、数字或装饰。
- 相邻页面不得连续三次使用同一种主体结构，同一个卡片容器不连续两页；用 editorial rail、交错流程、图片页、结构图或数据图建立节奏。普通正文页不添加消耗上边距的 page-level kicker，`■ LABEL` 只作为分点/阶段/图表的局部标签。

### 3. 逐页设计：内容与形式一一对应

每页只服务一个主结论。按下列优先级处理：

1. 放入真实素材或明确占位符；
2. 建立标题、辅助说明、证据 / 图形的阅读顺序；
3. 用 Tier0 token 和 Gallery 组件调整比例、间距、对齐与强调；
4. 仅在确有语义作用时添加 IBM Carbon 图标、连接线、色块或动效；抽象配图使用 Gallery 的黑灰线条 + 单一亮绿信号语言，而非复杂 3D 插图。

遵守 Tier0：深墨页展示标题优先 Tektur，白底标题与正文使用 IBM Plex；左对齐正文标题；`#B2ED1D` 只作 active/focus；白底普通文字不用亮绿，如必须用绿字，使用通过对比度检查的深绿 `#73B200`；直角/近直角容器、无重阴影。架构图先选择关系语法，再绘制节点。原始 UI 截图和视频必须按内容比例 fit 进证据框；不得用无意义黑框/灰框制造大面积 letterbox。

### 4. 每页完成后必须过「页面验收门」

不要等到整套做完才检查。每页在动效稳定状态下同时检查画面和代码，全部通过才进入下一页：

1. **内容接收与来源**：5 秒内能读出标题结论；图、数据或 Demo 能证明该结论；每个源内容 ID 均在 coverage map 中可追溯；没有竞争性标题、无依据数字或被改写的源标题。
2. **信息层级**：标题、说明、证据的阅读顺序清楚；关键点只使用一次绿色强调；正文在投屏距离可读。
3. **几何安全**：无横向/纵向溢出、遮挡、重叠、被导航或页脚压住；图片主体和图表标签没有被裁切。
4. **留白与平衡**：空白服务于标题、图形或章节节奏；若一侧空洞而另一侧拥挤，先改结构/素材比例，再调 margin；block 之间至少保留 40px 等效间距。
5. **品牌与证据**：无 emoji、无假 Dashboard、无多余图标；图标使用 IBM Carbon；白/浅底文字对比度达标；真实图片、视频、PPTX 图形和标签没有被拉伸、裁断或在画框内留下非语义的大块空白。封尾页是否带官网二维码与 `www.tier0.app` 必须严格遵从 intake，不能自行添加或删去。

失败时按顺序修复：删减次要内容 → 更换更合适的 Gallery 语法 → 调整列宽与素材比例 → 调整间距 → 最后才微调字号。不要用缩小一切来解决溢出。

逐页检查表与判定方法：`references/page-review-tier0.md`。

### 5. 整套复核与导出

完成所有页面后，检查叙事、版式节奏、跨页术语、页码、素材路径和交互。默认封面使用 `cover-editorial` / `TIER0-COVER-EDITORIAL`，封底使用 `closing-dark` / `TIER0-CLOSING-V4-DARK`；传统 HTML 模式仍可使用 `TIER0-CLOSING-SPLIT`。必须对比 HTML 与 PPTX 的封面稳定态，标题换行、右侧说明、顶栏和底线应一致。当 intake 要求官网 CTA 时，加入 `assets/brand/qr/tier0-app-qr.svg` 和可见网址 `www.tier0.app`；不需要时不留二维码/网址占位。二维码必须保留完整静区并与底色形成高对比：深底用白色二维码容器中的深墨码，浅底用深墨容器中的白色码；不要把亮绿色直接作为二维码本体。双格式模式只改 `deck.json` 并重新构建；不要分别修 HTML 和 PPTX。

```bash
node <SKILL_ROOT>/scripts/validate-tier0-deck.mjs 项目/XXX/ppt/index.html
node <SKILL_ROOT>/scripts/validate-tier0-source-lock.mjs 项目/XXX/source/content-coverage.json 项目/XXX/ppt/index.html
```

双格式模式改为运行 `validate-tier0-dual.mjs` + `validate-tier0-pptx.mjs`；HTML-only 传统模式运行上面的 HTML validator。若有浏览器或渲染环境，逐页在 1920×1080 下检查最终状态；再用 `references/checklist-tier0.md` 做全 deck 核查。

## 必读资源（按任务加载）

1. 始终读：`references/intake-gate-tier0.md`、`references/tier0-vi-style-guide.md`、`references/tier0-intro-v4-visual-grammar.md`、`references/tier0-layout-lock.md`、`references/layout-gallery-tier0.md`、`references/layouts-tier0.md`、`references/source-first-deck-workflow.md`、`references/source-integrity-tier0.md`、`references/page-review-tier0.md`。
2. 先读 `assets/template-tier0.html` 的 `<style>`，再使用任何 Gallery 类名。
3. 交付包含 PPTX 时读 `references/dual-output-tier0.md`，并使用 `assets/tier0-v4-dual-example.json` + `scripts/build-tier0-dual.mjs`。
4. 有数据时读 `references/data-viz-tier0.md`；有 Demo / 视频时读 `references/demo-prototypes-tier0.md`；有架构图时读 `references/architecture-diagrams-tier0.md`；有动效时读 `references/motion-tier0.md`。
5. 使用官方 Logo 或 UI 素材时读 `references/brand-assets-tier0.md`。

## 快速决策

| 输入状态 | 优先动作 |
|---|---|
| 有章节文档 + 零散素材 | 先写 deck brief 和页级叙事映射，再从 Gallery 挑语法 |
| 有现成 PPTX，内容基本正确 | 保留页序和有效图形，逐页重排为 Tier0，而非整套重做 |
| 有截图 / 录屏 / Demo 视频 | 让素材成为证据主角，S15 / S16 / S22 优先 |
| 有复杂系统关系 | 先选 hub、linear flow、tree 或对比语法，再用 S13 / S17 |
| 只要求可编辑 PPTX | 从第一步进入双格式模式；以 `deck.json` 同时生成 HTML QA 版和可编辑 PPTX，不把整页烘焙成图片 |

## 参考目录

`assets/template-tier0.html` 是高自由度 HTML 基座；`assets/tier0-v4-dual-example.json` 是 HTML + 可编辑 PPTX 双格式基座；`layout-gallery/` 是可浏览的样式来源；`references/checklist-tier0.md` 是整套交付核查。不要把 Layout Gallery 或 starter 的示例文案、成本数字带入客户材料。
