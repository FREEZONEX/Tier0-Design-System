---
name: tier0-slide-skill
description: 将已有的 Tier0 PPT 结构、章节文档、图片、产品截图、Demo 视频、架构图或现有 PPTX，整理并逐页优化为符合 Tier0 品牌的**销售/售前演示稿**。先理解演示目的、受众和素材证据；**逐页先判第一性原理**（本页核心目的与核心观点），再把内容收成疏密合理的布局（发丝分割、表格/图表、关键数值突出），并选择或改造 Layout Gallery 的版式；在需要配图的槽位按 Tier0 illustration 风格统一出图（触发词 tier0_illustration_style）。可交付 HTML 演示稿、可编辑 PPTX 或两者。适用于「根据资料补全 Tier0 PPT」「优化现有 deck」「把 PPTX 改成 Tier0 风格」「按 Tier0 插画风格补概念配图」「客户提案、售前、产品介绍、架构说明、数据价值说明」等请求。**不做产品设计**（产品后台 UI、交互稿、组件、设计系统实现）；界面证据仅使用用户提供的真实截图/录屏。本 skill 位于 Tier0 Design System 的 skills/tier0-slide-skill/；VI 冲突时服从仓库 tokens/deck.css 与 references/ppt-checklist.md；插画 DNA 与 tier0-illustration-style 对齐。
---

# Tier0 Slide Skill

以**输入材料和演示目的**为起点，而不是以空白模板或固定页数为起点。

**范围边界：** 本 skill 只产出销售 / 售前 deck。禁止把它当成产品设计工具去画后台界面、改组件或写产品 UI 规范。

**品牌视觉（用户可见的标准）：**  
锁定 Tier0 色与字体——IBM Plex（正文/白底标题）、Tektur（深墨章节大标题）、绿 `#B2ED1D` 只作信号；画布 16:9。版式语言来自 `layout-gallery/` + `assets/template-tier0.html`，**按每页内容形状动态选用/改造**，不要整套抄成同一种卡片墙。  
内部文档里若出现 “V4 Editorial Hybrid / tier0-intro-v4”，只是**一种**封面·章节·封底语法备忘（见 `references/tier0-intro-v4-visual-grammar.md`），**不是**用户要勾选的产品名，也**不是**把任意源稿压成 8 页 dual starter 的许可证。

**源稿保真（优化已有 PPT 时的最高硬门槛）：**  
页数与源一致；插图/配图/视频不丢；禁止为「好排版」擅自删页或改写成无图文案页。细则：`references/source-fidelity-tier0.md`。

**布局第一性原理：** 每一页先回答「这页要传达什么、最核心观点是什么」，再生成疏密合理、层级正确的结构。详见 `references/layout-first-principles-tier0.md`。Gallery 装不下时按本页观点改版，禁止硬套 `Sxx`。

**Gallery / template：** 提供 token、组件类名与常见版式语法；禁止把每一页硬塞进某个 Gallery 成品页。见 `references/gallery-fidelity-tier0.md`。

**HTML 观感 vs dual 预览：**  
现场演示 HTML **必须以** `assets/template-tier0.html` 的 16:9 组件排版为准。`build-tier0-dual.mjs` 产出的扁平坐标 HTML / `site/slide-skill/demo-en/` **只是**可编辑 PPTX 的同源 QA，**绝不当**最终视觉样板。

## 输出与边界

| 交付 | 适用情况 | 原则 |
|---|---|---|
| HTML deck | 现场演示、动效/视频/交互、**视觉保真优先** | 16:9；template 组件；按源页动态布局；带齐源媒体 |
| 可编辑 PPTX | 客户改字、邮件分发 | 文本/简单图为原生对象；复杂证据可嵌入图片；视频可降级为封面帧但**页仍在** |
| HTML + PPTX | 两者都要 | 页序/文案一致；HTML 保演示观感；勿用 dual 扁平预览冒充 HTML 终稿 |

不把没有证据的观点包装成数据；不为了“填满页面”添加装饰或虚构 KPI。

### 优化已有 PPTX（强制）

用户说「视觉/排版优化、内容不变」或上传完整 PPTX 时：

1. 先解包：记录**总页数**、每页文字、每页全部 media。  
2. 抽出全部图片/视频到项目目录。  
3. 交付页数 = 源页数（除非用户书面同意删/并页）。  
4. 逐页按源内容形状选 Gallery/template 语法，**保留该页图与视频**。  
5. 写入 `source/content-coverage.json`：`included` 覆盖每一源页。  

详见 `references/source-fidelity-tier0.md`。违反「少页、无图」= 交付失败，必须返工。

### 双格式硬规则

当交付包含 PPTX **且**是绿场短稿/结构简单时，可用 `deck.json` + `scripts/build-tier0-dual.mjs`。

当交付包含 PPTX **且**源稿富媒体、页数多时：

- **不要**把全文塞进 dual 仅有的几种 `kind` 里凑合；  
- HTML 走 template 保真；PPTX 可编辑对象 + 嵌入图；视频在 PPTX 侧注明降级；  
- dual starter（`assets/tier0-v4-dual-example.json`）只作字段参考，不作页数上限。

```bash
node <SKILL_ROOT>/scripts/validate-tier0-dual.mjs 项目/deck.json
node <SKILL_ROOT>/scripts/build-tier0-dual.mjs \
  --source 项目/deck.json \
  --html 项目/ppt/index.html \
  --pptx 项目/ppt/deck.pptx
node <SKILL_ROOT>/scripts/validate-tier0-pptx.mjs 项目/ppt/deck.pptx
```

完整规则见 `references/dual-output-tier0.md`。

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

**同时写满第一性原理字段**（详见 `references/layout-first-principles-tier0.md`）：

| 字段 | 含义 |
|------|------|
| `purpose` | 这页唯一任务 |
| `coreClaim` | 5 秒带走的核心观点 |
| `proofType` | `kpi` / `table` / `chart` / `list` / `compare` / `evidence-media` / `structure` |
| `heroElement` | 唯一视觉锚点（大标题 / 大数字 / 主表主图） |
| `density` | `sparse` · `editorial` · `dense` |

写不出 `coreClaim` 或 `heroElement` 超过一个 → 先拆页或回源，不要开排版。有分散数据时，规划如何收成表 / ledger / viz / `metric-quad` / `kpi-rail`，禁止用长段落埋数字。

- 优先保留原 PPTX 中正确的内容关系；仅在层级、密度、证据落位或品牌表达不足时重构。
- 先按内容形状选择 Gallery 语法：双向对照用 S08、线性或交错过程用 S11、现场到云端架构用 S13、闭环用 S14、图像证据用 S15、Demo 用 S16、系统关系用 S17、业务价值用 S18、四项能力 + 抽象线条图用 S19、KPI 清单用 S20、读数任务不同的数据图用 S21、路由/配置/执行逻辑等大段原文用 S23。
- 允许把 Gallery 的一个结构片段移入另一页，例如标题区域、两栏比例、图例、节点样式或底部证据区；不要复制与本页无关的文案、数字或装饰。
- 相邻页面不得连续三次使用同一种主体结构，同一个卡片容器不连续两页；用 editorial rail、交错流程、图片页、结构图或数据图建立节奏。普通正文页不添加消耗上边距的 page-level kicker，`■ LABEL` 只作为分点/阶段/图表的局部标签。

### 2b. 配图决策门（风格统一）

页级映射完成后、精细排版前，为**每一页**写入 `imageRole`（允许明确的 `none`）。规则真源：`references/illustration-slots-tier0.md`。

| `imageRole` | 用途 |
|-------------|------|
| `product-evidence` | 用户提供的真实截图 / 录屏（禁止生成 UI mockup） |
| `illustration` | 概念隐喻插画；提示词必须以 `tier0_illustration_style` 开头 |
| `documentary` | S22 等纪实横幅 |
| `architecture-native` | 可编辑节点/线，不出图 |
| `none` | 封面 ASCII、深墨章节、纯文案页 |

硬规则：

1. 先定 `imageSlot` + 比例，再生成；文件进 `images/{页号}-{slot}-{语义}.ext`。
2. 真实截图 / 录屏 > 原生可编辑图 > Tier0 插画 > 纪实照片；不要用插画或生成式 UI 冒充产品证据。禁止产出产品设计稿。
3. 概念插画必须服从 `tier0_illustration_style` DNA（等距模块、暖白/炭黑底、酸橙信号、细橄榄线稿）；禁止蓝紫 SaaS、霓虹、照片风、卡通机器人。
4. 同组多图锁定同一比例与裁切密度。
5. 写完 `image` / `imagePrompt` / `imageAlt` 后运行：

```bash
node <SKILL_ROOT>/scripts/validate-tier0-illustrations.mjs 项目/deck.json
```

提示词底稿：`references/image-prompts-tier0.md`。若环境另有 `tier0-illustration-style` skill，生成插画时一并加载。

### 3. 逐页设计：内容与形式一一对应

每页只服务一个主结论。按下列优先级处理：

1. **兑现第一性原理**：`coreClaim` 必须是标题或左侧 insight 的第一句；`heroElement` 占据最大视觉权重；分区优先用发丝分割（`.rule-list` / `.metric-quad` / `.data-table` / `.kpi-rail` / `.readout-split` / `.insight-rail`），见 `layout-first-principles-tier0.md`。
2. **再对齐 Gallery 目标页**：打开 `layout-gallery/index.html` 对应 `Sxx`，按 `R` 确认 avoid 列表；结构类名优先用模板已有组件（`tier0-card` / `sub-card` / `line-sketch` / `corner-card` / `dual-stack` / `ledger` / `viz-*` 等），见 `gallery-fidelity-tier0.md` + `composition-craft-tier0.md`。
3. 按 `imageRole` 放入真实素材、Tier0 插画或明确占位符；
4. 建立标题、辅助说明、证据 / 图形的阅读顺序；有数据则升级为表或图，不要用段落藏 KPI；
5. 用 Tier0 token 和 Gallery 组件调整比例、间距、对齐与强调——**双栏等宽均分，禁止左空右挤**；外边距 ≥40px；独立 block 间距 ≥40px；
6. 仅在确有语义作用时添加 **IBM Carbon** 图标、连接线、色块或动效——禁止旋转菱形、斜线角标、无语义几何“填空”；短文案大格子用右下角大号序号占位（`.corner-card`）；
7. 抽象关系优先 Gallery 黑灰线条 + 单点亮绿（`line-sketch`）；需要场景隐喻时用 §2b 的 `illustration`，不要改用其它插画口味。关键数值一页一个英雄数字；绿只点亮焦点。

遵守 Tier0：深墨页展示标题优先 Tektur，白底标题与正文使用 IBM Plex；左对齐正文标题；`#B2ED1D` 只作 active/focus；白底普通文字不用亮绿，如必须用绿字，使用通过对比度检查的深绿 `#73B200`；直角/近直角容器、无重阴影。架构图先选择关系语法，再绘制节点。原始 UI 截图和视频必须按内容比例 fit 进证据框；不得用无意义黑框/灰框制造大面积 letterbox。**语言单一：** 中文稿不要在中文下再挂英文复述句（产品名/协议名除外）。**中文深墨标题**行高约 `1.14`，勿用 `0.9`。

**S19 四卡：** 内容形状接近时跟随 Gallery 节奏——序号 `t-meta` + 短标题 + 短文 +（底部 `line-sketch` **或** 单一 Carbon icon）；卡片底色浅灰/淡绿交替。不要自创顶部斜线+菱形 mark，也不要在四卡里塞两张以上大面积 ink 黑底。若本页观点不是「四步并列」，不要硬拆成 S19。

### 4. 每页完成后必须过「页面验收门」

不要等到整套做完才检查。每页在动效稳定状态下同时检查画面和代码，全部通过才进入下一页：

1. **第一性原理与疏密（优先）**：本页 `coreClaim` 5 秒可读；hero 唯一；信息排布均匀、层级正确；发丝分区清楚；关键数字/表图到位；无溢出重叠、无左空右挤。可对照 `layout-density/` 参考图的疏密气质（见 `layout-first-principles-tier0.md`）。
2. **基础样式底线**：用了 template/Gallery 组件语法时，无旋转菱形/斜线角标；无封面以外的 ASCII 铺底；白底页未堆砌多余 ink 黑块（见 `gallery-fidelity-tier0.md`）。形状不匹配时允许改版，禁止为对齐而硬套。
3. **语言与构图**：一页一语；无中英对照句；双栏不左空右挤；短卡无大片空洞；中文深墨标题行距够（见 `composition-craft-tier0.md`）。
4. **内容接收与来源**：5 秒内能读出标题结论；图、数据或 Demo 能证明该结论；每个源内容 ID 均在 coverage map 中可追溯；没有竞争性标题、无依据数字或被改写的源标题。
5. **信息层级**：标题、说明、证据的阅读顺序清楚；关键点只使用一次绿色强调；正文在投屏距离可读。
6. **几何安全**：无横向/纵向溢出、遮挡、重叠、被导航或页脚压住；图片主体和图表标签没有被裁切。
7. **留白与平衡**：空白服务于标题、图形或章节节奏；若一侧空洞而另一侧拥挤，先改列宽与行均分，再调 margin；block 之间至少保留 40px 等效间距。
8. **品牌与证据**：无 emoji、无假 Dashboard、无多余图标；图标使用 IBM Carbon；白/浅底文字对比度达标；真实图片、视频、PPTX 图形和标签没有被拉伸、裁断或在画框内留下非语义的大块空白。封尾页是否带官网二维码与 `www.tier0.app` 必须严格遵从 intake，不能自行添加或删去。

失败时按顺序修复：先澄清本页观点与 hero → 删减次要内容 → 按内容形状改版或借用更合适的 Gallery 片段 → 去掉装饰几何 / 双语复述 → 调整列宽与素材比例 → 调整间距 → 最后才微调字号。不要用缩小一切来解决溢出，也不要用「硬套 Sxx」解决内容形状不匹配。

逐页检查表与判定方法：`references/page-review-tier0.md`。

### 5. 整套复核与导出

完成所有页面后，检查叙事、版式节奏、跨页术语、页码、素材路径和交互。默认封面使用 `cover-editorial` / `TIER0-COVER-EDITORIAL`，封底使用 `closing-dark` / `TIER0-CLOSING-V4-DARK`；传统 HTML 模式仍可使用 `TIER0-CLOSING-SPLIT`。必须对比 HTML 与 PPTX 的封面稳定态，标题换行、右侧说明、顶栏和底线应一致。当 intake 要求官网 CTA 时，加入 `assets/brand/qr/tier0-app-qr.svg` 和可见网址 `www.tier0.app`；不需要时不留二维码/网址占位。二维码必须保留完整静区并与底色形成高对比：深底用白色二维码容器中的深墨码，浅底用深墨容器中的白色码；不要把亮绿色直接作为二维码本体。双格式模式只改 `deck.json` 并重新构建；不要分别修 HTML 和 PPTX。

```bash
node <SKILL_ROOT>/scripts/validate-tier0-deck.mjs 项目/XXX/ppt/index.html
node <SKILL_ROOT>/scripts/validate-tier0-source-lock.mjs 项目/XXX/source/content-coverage.json 项目/XXX/ppt/index.html
```

双格式模式改为运行 `validate-tier0-dual.mjs` + `validate-tier0-pptx.mjs`；HTML-only 传统模式运行上面的 HTML validator。若有浏览器或渲染环境，逐页在 1920×1080 下检查最终状态；再用 `references/checklist-tier0.md` 做全 deck 核查。

## 必读资源（按任务加载）

1. 始终读：`references/intake-gate-tier0.md`、`references/source-fidelity-tier0.md`、`references/tier0-vi-style-guide.md`、`references/gallery-fidelity-tier0.md`、`references/layout-first-principles-tier0.md`、`references/composition-craft-tier0.md`、`references/tier0-layout-lock.md`、`references/layout-gallery-tier0.md`、`references/layouts-tier0.md`、`references/source-first-deck-workflow.md`、`references/source-integrity-tier0.md`、`references/page-review-tier0.md`。优化已有 PPTX 时**必读** `source-fidelity-tier0.md`。封面/章节语法备忘（非强制套用）见 `references/tier0-intro-v4-visual-grammar.md`。
2. 先读 `assets/template-tier0.html` 的 `<style>`，再使用任何 Gallery 类名；并排打开 `layout-gallery/index.html` 对照目标页。疏密/表图组件见模板内 `.insight-rail` `.rule-list` `.metric-quad` `.kpi-rail` `.readout-split` `.data-table`。
3. 交付包含 PPTX 且为绿场短稿时读 `references/dual-output-tier0.md`；富媒体长稿优化时以 template HTML 保真为主，dual 不得删页删图。
4. 有数据时读 `references/data-viz-tier0.md` + `layout-first-principles-tier0.md` §3–4；有 Demo / 视频时读 `references/demo-prototypes-tier0.md`；有架构图时读 `references/architecture-diagrams-tier0.md` + `references/archify-tier0.md`（复杂拓扑用 vendored Archify，视觉锁 Tier0）；有动效时读 `references/motion-tier0.md`。
5. 使用官方 Logo 或 UI 素材时读 `references/brand-assets-tier0.md`。
6. 需要配图 / 补概念插画时读 `references/illustration-slots-tier0.md` + `references/image-prompts-tier0.md`，并跑 `validate-tier0-illustrations.mjs`。源稿已有图时**优先用源图**，不要用 AI 插画替换。

**字体：** Tektur 仅用于深墨分隔页全大写标题；正文 / KPI / 节点名一律 IBM Plex。

## 快速决策

| 输入状态 | 优先动作 |
|---|---|
| 有章节文档 + 零散素材 | 先写 deck brief 和页级叙事映射，再从 Gallery 挑语法 |
| 有现成 PPTX，内容基本正确 /「内容不变」 | **页数 1:1 + 抽出全部 media**；逐页重排，禁止删页删图（`source-fidelity-tier0.md`） |
| 有截图 / 录屏 / Demo 视频 | 素材做证据主角（S15 / S16 / S22）；`imageRole=product-evidence` |
| 概念页缺图、需要统一隐喻插画 | 定 `imageSlot` → `tier0_illustration_style` → 写入 `images/` |
| 有数据 / 复盘指标 | 先写 `coreClaim`，再用表/图组件（`layout-first-principles-tier0.md`） |
| 有复杂系统关系 | 先选关系语法；简单图用 S13 / S17；复杂拓扑走 Archify |
| 只要可编辑 PPTX 的绿场短稿 | 可用 dual `deck.json`；**不**用它限制富媒体长稿的页数与版式 |

## 参考目录

`assets/template-tier0.html` = HTML 演示基座；`layout-gallery/` = 版式语法；`references/source-fidelity-tier0.md` = 优化源 PPT 的保真门；`assets/tier0-v4-dual-example.json` = 短稿双格式字段样例（非页数上限）；`references/checklist-tier0.md` = 整套核查。不要把 Gallery/starter 的示例文案、成本数字带入客户材料。
