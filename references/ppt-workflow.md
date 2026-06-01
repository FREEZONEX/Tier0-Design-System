# Marketing Deck — 工作流（Workflow）

仅当 surface = **`ppt`** 时使用。索引见 [`references/README.md`](README.md)。

---

## 何时使用 / 不适用

| ✅ 合适 | ❌ 不合适 |
|---------|-----------|
| Tier0 销售路演、技术深潜、投资人简版 | 大段 Excel 表格式数据页 |
| Masterdeck 对齐的 PPTX / 全屏 HTML | 需要多人实时协作编辑（优先 PPT 源文件） |
| 对外仅呈现 **Tier0** 品牌 | 画面需出现 FREEZONEX 母公司品牌 |

---

## Step 0 · 动手前：需求澄清

**用户已给完整大纲 + 交付格式** → 可进入 Step 1。  
**仅给主题或模糊想法** → 用下表对齐后再写 slide。小改已有 deck 时，缺信息不阻塞则不问。

### 7 问清单

| # | 问题 | 为什么要问 |
|---|------|------------|
| 1 | **受众与场景？**（CXO / 工控架构师 / 渠道 / 投资人；首次拜访还是深潜） | 决定深度与术语 |
| 2 | **目标？**（认知、二访、PoC、伙伴、融资） | 决定 CTA 页 |
| 3 | **时长与页数？**（15min≈8–10 页；30min≈15–20） | 控制密度 |
| 4 | **语言？**（英 / 中 / 混排） | 触发 Sans SC |
| 5 | **素材？**（现有 PPT、PDF、架构图、客户名禁忌） | 避免编造 |
| 6 | **交付格式？**（大纲 / MD / 全屏 HTML / 只改 PPT / 评审） | 决定输出路径 |
| 7 | **硬约束？**（禁定价、禁客户名、禁 FREEZONEX、必含章节） | 避免返工 |

### 必含章节（首次销售 deck 默认）

封面 → 痛点 → UNS 概念 → Tier0 架构（Source Flow → Namespace → Event Flow）→ 用例 → 对比 → 证明 / 运营模式 → 下一步

可删页，**不可** 为装饰加页。

---

## Step 1 · 必读文件（按序）

| 顺序 | 文件 |
|------|------|
| 1 | [`surfaces/ppt/README.md`](../surfaces/ppt/README.md) |
| 2 | [`ppt-layout-lock.md`](ppt-layout-lock.md) |
| 3 | [`ppt-themes.md`](ppt-themes.md) |
| 4 | [`ppt-layouts.md`](ppt-layouts.md) |
| 5 | [`ppt-components.md`](ppt-components.md) |
| 6 | [`tokens/deck.css`](../tokens/deck.css) |
| 7 | [`ppt-flowcharts.md`](ppt-flowcharts.md)（有流程图：卡片 / 连线样式） |
| 8 | [`ppt-diagrams.md`](ppt-diagrams.md)（封面 SVG / 等轴测） |
|| 9 | [`ppt-screenshots.md`](ppt-screenshots.md)（有截图：比例 / 背景 / 合成参数） |

冲突或缺细节时查 [`sources/spec.ppt.md`](../sources/spec.ppt.md)。

---

## Step 2 · 叙事弧与页型分配

无大纲时，用此弧搭骨架（页数可缩放）：

```
钩子     → 1 页  A  客户语境 + Tier0
定调     → 1–2  C  痛点 / 为什么现在
核心     → 3–5  C/D  UNS + 架构 + 能力
转折     → 1    E  传统 vs Tier0（可选）
收束     → 1–2  C/B  下一步 / 章节呼吸
```

**版式选择：**

| 内容 | 类型 |
|------|------|
| 封面、封底 | A |
| 章节断点 | B |
| 多数说明 | C |
| 架构、时间轴、流程 | D |
| 前后对比 | E |

规则：连续白底 C **不超过 2 张** 无 B 断点。详见 layout-lock。

---

## Step 3 · 实现

### PPTX

- 主题色对齐 `theme1.xml` / [`ppt-themes.md`](ppt-themes.md)
- 版式用母版 A–E，不手绘吸色

### HTML

- 引用 `tokens/deck.css`
- 从 [`ppt-layouts.md`](ppt-layouts.md) 复制对应 `data-slide-type` 骨架
- 封面 SVG：[`assets/marketing-cover-visual.svg`](../assets/marketing-cover-visual.svg)
- 组件：[`ppt-components.md`](ppt-components.md)
- 图示：[`ppt-diagrams.md`](ppt-diagrams.md)

**预览对照：** 打开 `preview/ppt/*.html` 全屏核对样式（与交付结构一致）。

---

## Step 4 · 自检

逐项执行 [`ppt-checklist.md`](ppt-checklist.md)，**P0 必须全过** 再交付。

---

## Step 5 · 输出位置

| 产出 | 写到哪里 |
|------|----------|
| 销售成稿 HTML / MD / 客户 PPT 副本 | **本仓库外**（如 `~/Desktop/<项目>/`） |
| 规范 / token / 预览 / references 更新 | 本设计系统仓库 |

**禁止：** 在 `Tier0-Design-System` 内新建 `decks/` 或客户 HTML。

### HTML 交付摘要

- 全屏：`100vw × 100vh` per slide
- 图：Base64 或 HTTPS；无 `file://`、`/Users/...`
- 详见 [`surfaces/ppt/export.md`](../surfaces/ppt/export.md)

---

## Step 6 · 迭代

- 改文案：保持 `data-slide-type` 与版式类名不变
- 改视觉规范：同步 `tokens/deck.css`、`references/`、`sources/spec.*`，必要时 `preview/ppt/`
- 踩坑写入 `ppt-checklist.md` 对应 P 级
