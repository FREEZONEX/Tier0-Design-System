# References — Agent 深度参考

本目录存放 **给 Agent 用的操作型文档**（工作流、可粘贴骨架、硬约束、分级自检）。与 `surfaces/`、`sources/` 分工如下：

| 目录 | 读者 | 内容性质 |
|------|------|----------|
| [`surfaces/ppt/`](../surfaces/ppt/) | 人 + Agent | 场景入口、原则速查、链到本目录 |
| **`references/`（本目录）** | **Agent 为主** | 分步工作流、版式骨架、组件用法、踩坑清单 |
| [`sources/spec.ppt.md`](../sources/spec.ppt.md) | 设计 / 母版维护 | 从 Masterdeck 导出的完整规范（冲突时以此为准） |
| [`tokens/deck.css`](../tokens/deck.css) | 实现 | CSS 变量与类名事实来源 |
| [`preview/ppt/`](../preview/ppt/) | 视觉验收 | 全屏 slide 预览（与交付 HTML 同尺寸） |

当前仅 **ppt** 试点本结构；产品 UI / 官网仍读 `surfaces/*`。

---

## Marketing Deck 文件地图

| 文件 | 何时读 |
|------|--------|
| [`ppt-workflow.md`](ppt-workflow.md) | **动手前**：需求澄清、阅读顺序、叙事弧、输出位置 |
| [`ppt-layout-lock.md`](ppt-layout-lock.md) | **定稿前**：字体 / 色 / 版式类型 / 全屏 / FREEZONEX 硬锁 |
| [`ppt-themes.md`](ppt-themes.md) | 选色与强调色分工（Masterdeck 单主题，禁止自定义 hex） |
| [`ppt-layouts.md`](ppt-layouts.md) | **写 HTML 时**：类型 A–E 骨架与 Pre-flight |
| [`ppt-components.md`](ppt-components.md) | 页脚、KPI、Icon 卡（4059:2453）、流程三栏、列表标记 |
| [`ppt-flowcharts.md`](ppt-flowcharts.md) | **Flow 四类卡片** + **三线型**（无/单/双箭头，4057:2384 · 4057:2393） |
| [`ppt-diagrams.md`](ppt-diagrams.md) | 封面 SVG、等轴测 / 截图、Lucide 通用约定 |
| [`ppt-checklist.md`](ppt-checklist.md) | **交付前**：P0–P3 自检（含现象 / 根因 / 做法） |
| [`ppt-screenshots.md`](ppt-screenshots.md) | **放截图时**：比例 / 背景 / padding / shadow 语义参数，保真 vs 重构决策 |

### 推荐阅读顺序（生成新 deck）

```
workflow → layout-lock + themes → layouts → components → flowcharts（有流程图时）→ diagrams → screenshots（有截图时）→ checklist
```

小改已有 deck：只读 `workflow`（输出规则）+ 改动涉及的 `layouts` / `components` + `checklist`。

细节规则缺失或冲突时，再查 `sources/spec.ppt.md`。
