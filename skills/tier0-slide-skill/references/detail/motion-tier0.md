# Motion · Tier0

## 原则

Tier0 动效表现的是系统运行、数据出现与证据建立。它必须让用户更容易理解页面，不应该像网页加载页或过场特效。

- **一页一个语义动作**：流程按步骤点亮；数值从结构中出现；图片缓慢入场。
- **先结构，后重点**：标题 / 框架先到，数据或 focus 最后出现。
- **绿色是状态，不是特效**：只用于 active step、focus bar、成功状态。
- **默认可静态阅读**：`prefers-reduced-motion` 与 `B` 低功耗模式必须直接呈现最终内容。

## 可用 recipe

| 内容 | `data-animate` | 动效语义 |
|---|---|---|
| 标题 + 卡片 | `grid-reveal` / `four-cards` | 结构先显、卡片按序进入 |
| 标题 + 图片证据组 | `matrix-fill` | 标题先显，主图与辅助图按阅读顺序进入 |
| 工作流 / 时间线 | `timeline-walk` / `progression` | 节点与路径按阅读顺序建立 |
| 条形 / KPI 数据 | `bar-grow` / `data-viz` | 轴与标签先到，数值条从左展开 |
| 架构 / 闭环 | `loop-form` / `system-diagram` | 外部关系 → 节点 → 核心结论 |
| 产品截图证据 | `image-hero` | 图片轻微缩放入场，说明与指标后到 |
| Demo 视频 / Live Web | `demo-stage` | 先说明观看任务，再显播放器；媒体不自动播放 |

不要新增全页淡入、无限循环、跳动数字、弹簧抖动、视差背景或与内容无关的 hover 特效。

## Recipe ↔ DOM（硬门槛）

`data-animate` **必须**匹配本页已有的 `data-anim` 钩子，否则顺序错乱或空播：

| recipe | 至少需要 |
|--------|----------|
| `grid-reveal` / `four-cards` | `[data-anim="line|head"]` + 卡片网格 / `[data-anim="up"]` |
| `matrix-fill` | `[data-anim="line"]` + `[data-anim="up"]`（子项依次入场） |
| `image-hero` | `[data-anim="img"] img`（纯视频页不要用这个） |
| `demo-stage` | Demo 专用 DOM；普通 `<video>` 页改用 `grid-reveal` |
| `architecture-flow` / `progression` | 仅当页内有对应 flow/step 节点时 |

选错 recipe（例如案例页用 `demo-stage`、视频页用 `image-hero`）= 动画顺序不合理。修好布局后再对一下本表。

## 时序与缓动

| 场景 | token | 时长 |
|---|---|---|
| 功能 / 状态变化 | `--ease-prod` | 150–240ms |
| 叙事性入场 | `--ease-entry-exp` | 400–700ms |
| 图像缓推 | `--ease-entry-exp` | 700–1100ms |

同一页总动画时长建议 ≤ 2.4 秒。卡片或柱形图的 stagger 建议 90–160ms，不要让客户等待逐项播放。

## 编写规则

```html
<section class="slide light" data-layout="S21" data-animate="data-viz">
  <div class="canvas-card">
    <div class="chrome-min">...</div>
    <div data-anim="line">...</div>
    <figure class="viz-figure" data-viz="comparison">...</figure>
  </div>
</section>
```

- 选择器必须基于语义 class / `data-*`，不要依赖 `div:nth-child()` 或一条装饰线的位置。
- 先检查首帧、中间帧、最终帧；如果移除一个装饰元素导致动效失效，说明 recipe 需要重构。
- 数据条应使用最终宽度作为可见 fallback，脚本只负责从 `0` 展开。
- 动效中不可隐藏关键文字或让焦点绿色短暂出现后消失。
- `demo-stage` 只入场播放器外框与证据内容；`<video>` 保持暂停，现场由用户主动点击播放。

## 交付检查

- [ ] 翻到每一页时 1 秒内能读到标题和主结论。
- [ ] `B` 静态模式下无空白、无 0% 条形、无未出现节点。
- [ ] 系统 reduced-motion 下没有持续 RAF 或自动播放循环。
- [ ] 动效不依赖图片加载完成才显示核心文案。
