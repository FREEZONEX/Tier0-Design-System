# Imagery · Tier0

> 合并自 illustration-slots / image-prompts / screenshot-framing。
> Agent：配图决策与提示词只读本文件。

---

## A · Slots & Style Lock

---

## 1. 先选角色，再生成

| `imageRole` | 何时用 | 怎么做 | 禁止 |
|-------------|--------|--------|------|
| `product-evidence` | 证明产品真实存在 | **仅使用用户上传的真实截图 / 录屏帧**；缺图则占位并标注待补 | 生成产品 UI mockup、交互稿、设计系统组件 |
| `illustration` | 解释概念、价值、抽象关系（UNS、数据地基、出海…） | 必须用下方 **Tier0 Illustration 公式** | 蓝紫 SaaS、照片、3D 炫光、卡通机器人；假 UI 冒充产品 |
| `documentary` | S22 横幅、现场氛围、工厂实景 | 低饱和纪实摄影提示词 | 插画式等距工厂 |
| `architecture-native` | 系统关系、流程、对照 | **不要出图**：用 Gallery / `canvas` 原生节点与线 | 把架构烤成一张不可编辑图 |
| `none` | 封面 ASCII、深墨章节、纯文字结论页 | 明确不配图 | 为了「好看」硬塞装饰图 |

**本 skill 不做产品设计。** 不绘制、不生成、不「美化」产品后台界面；界面证据只能来自既有素材。

**默认优先级：** 真实截图 / 录屏 > 原生可编辑图 > Tier0 插画 > 纪实照片 > 占位框。

---

## 2. 什么时候必须配图

满足任一条件 → 该页应有图（或显式写 `imageRole: "none"` 并说明原因）：

1. 本页结论依赖「看得见的证据」（产品能力、现场、案例）。
2. Gallery 版式本身是图文结构（S15 / S16 / S22、`feature-split` 右栏证据区）。
3. 源材料提供了截图 / 架构图 / 照片，且覆盖映射要求落入该页。
4. 用户明确要求「概念页补插画」。

满足任一条件 → **不要**插画：

1. 封面 `cover-editorial`（右侧已是 ASCII 场）。
2. `section-dark` 章节转场。
3. 成本公式、KPI 清单、可编辑对照表（用原生对象）。
4. 需要客户二次改节点的架构页（用 `architecture-native`）。

---

## 3. 槽位地图（落位先于生成）

生成前先写入 `imageSlot`，再按槽位选比例。

| `imageSlot` | 适用 `kind` / Gallery | 画布建议 (960×540) | 比例 | `object-fit` |
|-------------|----------------------|--------------------|------|--------------|
| `feature-split-right` | `feature-split` | x406 y159 w496 h298 | 16:10 | `cover` 插画；`contain` 截图 |
| `compare-panel` | `compare-2` 单栏配图 | 栏内留白区，约 380×220 | 16:10 | `cover` |
| `s15-grid-item` | S15 证据网格 | 格内统一 | 21:9 或 16:10（同页统一） | `cover` |
| `s22-hero` | S22 | 顶栏全宽 | 21:9 | `cover` |
| `process-stage` | `process-4` 阶段图 | 每段小图可选 | 1:1 或 4:3 | `cover` |
| `canvas-free` | `canvas` | 在 `elements[]` 里写死坐标 | 按构图 | 显式写 `fit` |

文件命名：`images/{页号}-{slot短名}-{语义}.{png|webp}`  
例：`images/05-feature-split-uns-hub.png`

HTML 传统模式仍需 `data-image-slot="…"`；双格式模式在 `deck.json` 写 `imageSlot`，构建器落到 `<img>` / PPTX 图片对象。

---

## 4. Tier0 Illustration 风格公式（统一）

触发词（有 LoRA 时必带；无 LoRA 也放在句首以保持可移植）：

```text
tier0_illustration_style
```

### 正提示结构

```text
tier0_illustration_style, [具体工业主体], [业务场景], [构图], [Tier0 视觉性状], [创新隐喻], [比例与留白], [约束]
```

### 必须保留的视觉 DNA

- 工业 SaaS / IIoT / UNS / 制造数据 / 工厂智能
- 等距模块化场景：工厂岛、数据枢纽、schema 卡、管线、传感器、立方体结构
- 产品插画：暖白 / 白底；深色 campaign：炭黑 / 黑绿底
- 品牌绿（acid lime / `#B2ED1D`）作信号路径，橄榄色细线，浅灰机械体
- 细技术线稿、清晰边缘、企业级干净构图
- **冷静、精确**；不要「未来科技秀」

### 负提示（默认）

```text
photorealistic, stock photo, glossy 3d render, generic blue technology, cyberpunk neon, purple gradient, beige lifestyle illustration, watercolor, hand drawn sketch, anime, childish cartoon, messy text, random logo, fake UI clutter, excessive glow, excessive shadows, low contrast, blurry, noisy, no readable text, no brand logos
```

### 按页类型的快速配方

**概念插画（白底证据栏）**

```text
tier0_illustration_style, isometric unified namespace data hub for multi-site factories, sources publishing into one governed model, warm off-white background, modular factory islands, floating schema cards, acid lime signal paths, thin olive technical linework, pale grey machinery, clean enterprise SaaS composition, leave calm negative space on one side for slide text overlay, 16:10, no readable text, no photorealism
```

**深色 campaign / 章节隐喻（少用；不要替代 section-dark）**

```text
tier0_illustration_style, dark industrial data foundation graphic, modular cube stack above factory network grid, charcoal black-green background, acid lime highlights, subtle orbit lines, editorial composition with empty space for headline, precise industrial SaaS atmosphere, 16:9, no fake logos
```

**产品 UI 证据（非插画；`imageRole: product-evidence`）**

见 `image-prompts-tier0.md` 类型 1；优先真实截图。

**纪实横幅（`imageRole: documentary`）**

见 `image-prompts-tier0.md` 类型 2。

---

## 5. `deck.json` 字段约定

在需要配图的 slide 上写：

```json
{
  "id": "05-builder",
  "kind": "feature-split",
  "title": "…",
  "imageRole": "illustration",
  "imageSlot": "feature-split-right",
  "image": "images/05-feature-split-app-builder.png",
  "imageAlt": "App Builder wired to a unified namespace of factory islands",
  "imageFit": "cover",
  "imageAspect": "16:10",
  "imagePrompt": "tier0_illustration_style, isometric app builder console generating a shop-floor app from a brief, connected to a central UNS hub, warm off-white background, modular blocks, acid lime signal paths, thin olive technical linework, 16:10, leave right-center calm for product focus, no readable text, no photorealism"
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `imageRole` | 配图页必填 | 见 §1；无图页可省略或 `"none"` |
| `imageSlot` | 配图页必填 | 见 §3 |
| `image` | 有成图时必填 | 相对项目目录的路径 |
| `imageAlt` | 必填 | 一句英文或中文描述，PPTX/无障碍共用 |
| `imageFit` | 推荐 | `cover` / `contain` |
| `imageAspect` | 推荐 | 与生成比例一致 |
| `imagePrompt` | `illustration` 必填 | 必须以 `tier0_illustration_style` 开头 |

缺图时构建器仍可渲染灰框占位；但 **交付前** `imageRole` 为 `illustration` / `product-evidence` / `documentary` 的页必须有真实文件。

---

## 6. Agent 工作流（配图决策门）

在页级叙事映射之后、逐页精细设计之前执行：

1. 扫每一页，填写 `imageRole`（含明确的 `none`）。
2. 需要图的页选定 `imageSlot` + `imageAspect`。
3. 有真实素材 → 落入对应槽；路径写入 `image`，`imageRole=product-evidence|documentary`。
4. 需要概念图 → 按 §4 写 `imagePrompt`，生成到 `images/`，再写 `image`。
5. 架构 / 流程 → `imageRole=architecture-native`，用原生对象，不跑出图。
6. 同组多图（S15）锁定同一比例、同一裁切密度、同一边距。
7. 运行 `node scripts/validate-tier0-illustrations.mjs 项目/deck.json`。

生成工具不限（LoRA / Liblib / 其它）；**风格锁在提示词与验收**，不锁在某一个供应商。

---

## 7. 验收清单

- [ ] 每页都有明确的 `imageRole`（或整 deck 声明默认 `none` 仅文字）
- [ ] 插画提示词以 `tier0_illustration_style` 开头，且含具体工业场景
- [ ] 无蓝紫渐变、无照片冒充插画、无可读假 UI 字（除非真截图）
- [ ] 图未带 PPT 页眉页脚 / 页码 / 装饰边框
- [ ] 同页多图比例与 `object-fit` 一致
- [ ] HTML / PPTX 中图片未拉伸；主体落在安全区
- [ ] 架构页仍是可编辑原生对象，不是整页插画

相关：`image-prompts-tier0.md`（分类型提示词底稿）、`screenshot-framing.md`（截图裁切）、`architecture-diagrams-tier0.md`（原生架构）。

---

## B · Prompt Templates

---

## 通用硬规则

- 先锁槽位与比例，再生成；保存到 `images/{页号}-{slot短名}-{语义}.{ext}`
- 配图是 slide 内素材，**不要**生成页眉、页脚、页码、标题栏、角标、署名、装饰边框
- 同页 / 同组图：同一比例、同一视觉缩放、同一边距密度
- 文字语言跟随用户语言；插画默认 **无可读文字**
- 禁止：卡通、霓虹、AI 机器人、蓝紫 SaaS 渐变、stock 图、照片冒充插画

---

## 类型 A · Concept Illustration（`imageRole: illustration`）

句首触发词 + 具体工业场景。完整公式与负提示见 `illustration-slots-tier0.md` §4。

```text
tier0_illustration_style, [具体工业主体], [业务场景], isometric modular composition, warm off-white background, acid lime signal paths, thin olive technical linework, pale grey machinery, clean enterprise SaaS, [创新隐喻], [16:10|16:9|21:9], leave calm negative space for slide text, no readable text, no photorealism
```

**负提示：**

```text
photorealistic, stock photo, glossy 3d render, generic blue technology, cyberpunk neon, purple gradient, beige lifestyle illustration, watercolor, anime, childish cartoon, messy text, random logo, fake UI clutter, excessive glow, excessive shadows, blurry
```

### 常用场景底稿

**UNS / 数据地基**

```text
tier0_illustration_style, isometric unified namespace for multi-site factories, equipment publishing once into a governed data model, warm off-white background, factory islands connected to a central hub, floating schema cards, acid lime routing paths, thin olive technical linework, modular platform blocks, 16:10, no readable text, no photorealism
```

**App Builder / 生成应用**

```text
tier0_illustration_style, isometric industrial app builder turning a plain-language brief into a running shop-floor application, console linked to a UNS hub, warm off-white background, modular UI panels as abstract blocks without readable text, acid lime signal paths, thin olive linework, 16:10, no photorealism
```

**集成对照（点对点 → 统一）**

```text
tier0_illustration_style, isometric before-and-after of industrial integration, left tangled point-to-point cables between apps and machines, right clean publish-once namespace hub, warm off-white background, acid lime on the governed paths only, thin technical linework, 16:10, no readable text
```

**出海 / 多站点运营**

```text
tier0_illustration_style, isometric multi-region manufacturing operations on one data foundation, distributed factory islands linked by lime signal bridges to a central cloud hub, warm off-white background, modular blocks, thin olive linework, calm enterprise composition, 16:10, no readable text
```

---

## 类型 B · Screenshot Evidence（`imageRole: product-evidence`）

**只接受用户提供的真实截图 / 录屏帧。**  
本 skill **禁止**生成产品界面 mockup、交互稿或设计系统组件。

缺图时：

1. 在 `deck.json` 保留 `imageRole: "product-evidence"` 与 `imageSlot`
2. 不写 `image`，或写占位路径并在 coverage 标 `pending`
3. 向用户索取截图；在补齐前不要用插画或假 UI 冒充

截图裁切：`screenshot-framing.md`。

---

## 类型 C · Documentary（`imageRole: documentary`）

```text
生成一张 21:9 超宽横向纪实摄影配图,主题是:[页面概念]。Tier0 editorial documentary:高对比、低饱和、冷静克制、真实工业/办公/产品使用场景,构图有大量负空间,主体位于中央 70% 安全区,适合 S22 顶部横幅。不要 AI 机器人、科幻界面、商业摆拍、logo、水印或文字。只保留核心照片本身,不要 PPT 外壳。
```

---

## 类型 D · 信息图 / 数据块（谨慎）

优先改用原生组件（流程用 S11/`process-4`，数据用 `data-viz-tier0.md`）。仅当必须出图时：

```text
生成一张横向 Tier0 Style 工作流信息图,解释:[流程]。IBM Plex 气质、编号步骤、细黑横线、最后一步 #B2ED1D 绿圆、白底大留白。不要蓝紫非品牌色、渐变、3D、卡通。比例 16:10。不要 PPT chrome。
```

系统关系图优先 `architecture-native`，不要栅格化。

---

## 类型 E · S15 网格单张

同组锁定同一比例（21:9 或 16:10）：

**插画格**

```text
tier0_illustration_style, [证据主题的单一隐喻], warm off-white background, compact isometric spot illustration, acid lime accent only on the focal path, thin olive linework, identical margin density for a grid cell, 21:9, no readable text
```

**产品证据格**

只用用户上传的真实截图，统一比例与裁切（见 `screenshot-framing.md`）。**禁止**为格子生成产品 UI mockup。
---

## 写入 deck.json

生成后立刻回写：

```json
"imageRole": "illustration",
"imageSlot": "feature-split-right",
"image": "images/05-feature-split-uns-hub.png",
"imageAlt": "…",
"imageFit": "cover",
"imageAspect": "16:10",
"imagePrompt": "tier0_illustration_style, …"
```

然后跑：

```bash
node scripts/validate-tier0-illustrations.mjs 项目/deck.json
```

---

## C · Screenshot Framing

## 优先级

1. **程序化适配优先**:截图内容、文字、UI 细节需要保真时,不要重画;创建目标比例画布,把原截图等比缩放后放入画布。
2. **GPT-M 2.0 只做重构**:只有原图过长、过窄、信息太乱、需要 UI 情景化或概念化表达时,才使用“截图再设计 / UI 情景图”。
3. **模板槽位先行**:先确定 slide 版式和图片槽位比例,再决定截图适配参数。

## 开始前询问

在主流程 Step 1 中,只要用户可能提供截图,就先问清楚:

- 截图在哪个文件夹?是否包含网页、App、代码、dashboard、设计稿或旧 PPT?
- 这批截图要**保真展示**、**统一美化**、**重新设计成 UI 情景图**,还是混合处理?
- 最终要放进哪些槽位:21:9 顶图、16:10 主图、4:3 侧图、1:1 方图、还是多图网格?
- 是否必须保留所有文字和数据?是否需要隐藏账号、头像、项目名等敏感信息?
- 构图希望居中、左上、右下,还是根据页面内容自动判断?

如果在 Claude Code 中,用 Ask Question / `ask_question` 做这些澄清;如果在 Codex 中,用普通对话询问,不要调用 Ask Question。

## 处理链路

1. **先匹配版式**:根据内容选择模板 layout,确定截图槽位尺寸和比例。
2. **再选处理方式**:
   - 要保真:程序化适配,不重画截图。
   - 要统一视觉但不改内容:程序化适配 + 主题背景。
   - 原图不可用或需要解释概念:再走 GPT-M 2.0 截图再设计。
3. **再选择背景**:优先使用内置背景资产,不应该每张截图临时生成一种风格。
4. **最后合成截图**:创建目标比例画布,背景 cover 铺满,截图等比缩放后按 `padding` 和 `alignment` 放入。

默认不要裁掉截图内容。只有截图已经按目标槽位重新生成,或者用户明确允许裁切时,才使用 cover 裁切。

## 语义参数

每次处理截图前,先确定这 7 个参数:

| 参数 | 可选值 | 判断方式 |
|---|---|---|
| `ratio` | `21:9` / `16:10` / `16:9` / `4:3` / `1:1` | 跟随模板图片槽位,不要跟随原截图比例 |
| `background` | `plain` / `gradient` / `wallpaper` / `blurred` / `grid` / `paper` | 跟随当前 PPT 风格和主题 |
| `padding` | `compact` / `standard` / `spacious` | 普通截图 standard;文字密集或高截图 spacious;小图组 compact |
| `inset` | `none` / `subtle` / `balanced` | 截图需要从背景中浮出来时用 balanced;Tier0多用 none/subtle |
| `shadow` | `none` / `soft` / `editorial` | Style A 可 soft/editorial;Style B 默认 none |
| `corners` | `square` / `small` / `medium` | Style B square;Style A small/medium |
| `alignment` | `center` / `top-left` / `top-right` / `bottom-left` / `bottom-right` | 跟随页面构图,不是永远居中 |

## 风格映射

### Style A · 电子杂志风

- 背景: `paper` / `blurred` / 低饱和 `gradient`
- 质感:纸张、墨水、胶片颗粒、暖白、低对比
- 截图:可用小圆角和轻微阴影,但不要像 SaaS 营销卡片
- 背景资产:优先使用 `assets/screenshot-backgrounds/style-a/` 下对应主题的 16:9 crop-safe WebP,截图合成时按槽位裁切
- 推荐语义:

```text
ratio:16:10, background:paper, padding:standard, inset:balanced, shadow:editorial, corners:small, alignment:center
```

### Style B · Tier0 网格版式

- 背景: `plain` / `grid` / `dot-matrix`
- 色彩:只允许当前锚点色作为极低占比强调;不要大面积亮色块
- 截图:直角、无阴影、无圆角、少量 hairline 或顶部 accent 线
- 背景资产:优先使用 `assets/screenshot-backgrounds/style-b/` 下对应主题色的 16:9 crop-safe WebP,只用当前 accent,不要混色
- 推荐语义:

```text
ratio:21:9, background:grid, padding:standard, inset:subtle, shadow:none, corners:square, alignment:center
```

## 背景强度规则

截图背景是“托底”,不是主视觉。

- 如果 `alignment` 不确定,背景中心和四角都必须安静,不要放显眼色块。
- 如果截图要放在右下角,右下角不能有强色块;其他位置同理。
- Tier0锚点色只做 `5%-8%` 视觉占比的淡线、点阵或极浅几何场,不要生成高亮蓝条、大色块、霓虹渐变。
- 背景不能有文字、logo、图标、人物、设备、边框、明显主体或方向性构图。
- 背景必须 crop-safe:裁成 `21:9`、`16:10`、`4:3`、`1:1` 都不能暴露“被裁掉”的痕迹。

## 内置主题背景资产

本 Skill 已经内置一组 GPT-M 2.0 预生成背景。处理截图时**优先使用这些资产**,不要实时调用 GPT-M 2.0 重新生成背景。只有用户明确要求新风格、现有主题缺失,或背景与内容明显不匹配时,才生成新的背景。

背景图之后由程序复用到每张截图中。不要把背景当作单张 slide 来画,背景图内部不能有标题、页脚、边框、logo、人物或明显主体。

### Style A · 5 套主题背景

| 主题 | 内置资产 | 背景语义 |
|---|---|---|
| 墨水经典 | `assets/screenshot-backgrounds/style-a/monocle-classic.webp` | 黑白灰纸张纹理、柔和阴影、细颗粒 |
| 靛蓝瓷 | `assets/screenshot-backgrounds/style-a/indigo-porcelain.webp` | 靛蓝低饱和墨色、纸感渐变、轻微噪点 |
| 森林墨 | `assets/screenshot-backgrounds/style-a/forest-ink.webp` | 模糊植物阴影、低饱和绿色、纸张颗粒 |
| 牛皮纸 | `assets/screenshot-backgrounds/style-a/kraft-paper.webp` | 暖纸色、淡墨阴影、复古印刷颗粒 |
| 沙丘 | `assets/screenshot-backgrounds/style-a/dune.webp` | 沙色/灰调柔和渐变、低对比、留白安静 |

### Style B · 4 套主题背景

| 主题色 | 内置资产 | 背景语义 |
|---|---|---|
| #B2ED1D 信号绿 | `assets/screenshot-backgrounds/style-b/ikb-dot-gradient.webp` | 点阵 + 低对比蓝色渐变,避免亮蓝大色块 |
| 柠檬黄 | `assets/screenshot-backgrounds/style-b/lemon-grid.webp` | 纯网格 + 稀疏点阵,黄色只做低透明细线/点 |
| 柠檬绿 | `assets/screenshot-backgrounds/style-b/lemon-green-dot-shadow.webp` | 点阵 + 阴影场,绿色只做轻微光感 |
| 安全橙 | `assets/screenshot-backgrounds/style-b/safety-orange-halftone.webp` | 模块化半调点阵 + 暗部阴影,橙色低占比 |

内置背景都是 1920×1080 级别的 16:9 WebP。程序化合成时,先把背景 cover 到目标画布,再裁成 `21:9` / `16:10` / `4:3` / `1:1` 等截图槽位。背景必须四角安静,因为截图可能居中、左上、右下或被裁成不同尺寸。

## 截图类型决策

| 原始素材 | 推荐处理 |
|---|---|
| 普通网页 / App / 桌面截图 | 程序化适配到目标比例 |
| 产品 UI 细节很重要 | 程序化适配,使用 `fit-contain`,不重画 |
| 长网页截图 | 截关键区域或拆成 2-3 张同尺寸面板 |
| 极窄 / 极高截图 | 先尝试 `spacious + side alignment`;仍太小时再重构 |
| 代码截图 | Style A 用纸感背景;Style B 用浅网格背景;文字必须可读 |
| 概念解释用的 UI 情景图 | 可以 GPT-M 2.0 重新设计 |

## 生成背景图提示词

只有需要新增背景资产时才使用本节。常规截图美化不要实时生成背景,直接使用上方内置资产。

### Style A 背景

```text
16:9 crop-safe screenshot background for an editorial magazine / e-ink PPT system. Warm off-white paper texture, subtle ink wash, fine film grain, low contrast, quiet center and quiet corners, no text, no logo, no objects, no border, no focal subject. Suitable for cropping to 21:9, 16:10, 4:3, or 1:1.
```

### Style B 背景

```text
16:9 crop-safe screenshot background for a Tier0 International Style PPT system. Pure off-white base, ultra-subtle 16-column grid and sparse dot matrix, one accent color only: [theme color], used at very low opacity as thin lines or tiny dots, no large bright color blocks. Quiet center and quiet corners, no text, no logo, no objects, no border, no focal subject. Suitable for cropping to 21:9, 16:10, 4:3, or 1:1.
```
