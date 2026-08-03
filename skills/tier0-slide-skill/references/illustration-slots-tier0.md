# 配图槽位与风格锁定 · Tier0

本文件是 slide skill 的**配图真源**：决定「这页要不要图、放哪、生成什么风格」。  
风格 DNA 与 `tier0-illustration-style` 对齐；产品截图 / 原生架构图另有优先级，不要混用。

---

## 1. 先选角色，再生成

| `imageRole` | 何时用 | 怎么做 | 禁止 |
|-------------|--------|--------|------|
| `product-evidence` | 证明产品真实存在（Builder、Namespace、权限…） | 真实截图优先；没有截图才用 flat UI mockup 提示词 | 插画代替截图当「证据」 |
| `illustration` | 解释概念、价值、抽象关系（UNS、数据地基、出海…） | 必须用下方 **Tier0 Illustration 公式** | 蓝紫 SaaS、照片、3D 炫光、卡通机器人 |
| `documentary` | S22 横幅、现场氛围、工厂实景 | 低饱和纪实摄影提示词 | 插画式等距工厂 |
| `architecture-native` | 系统关系、流程、对照 | **不要出图**：用 Gallery / `canvas` 原生节点与线 | 把架构烤成一张不可编辑图 |
| `none` | 封面 ASCII、深墨章节、纯文字结论页 | 明确不配图 | 为了「好看」硬塞装饰图 |

**默认优先级：** 真实截图 > 原生可编辑图 > Tier0 插画 > 纪实照片 > 占位框。

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
