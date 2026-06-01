# PPT — 版式模板

> **Agent：** 可粘贴全屏 HTML 骨架、Pre-flight 与叙事→版式表见 [`references/ppt-layouts.md`](../../references/ppt-layouts.md)。硬约束见 [`references/ppt-layout-lock.md`](../../references/ppt-layout-lock.md)。

HTML deck 与 `preview/ppt/` 预览均为**全屏 slide**（`100vw × 100vh`），背景铺满 viewport。

## Office 版式映射

| type | 中文名 | 用途 |
|------|--------|------|
| `title` | 标题幻灯片 | 封面、封底 |
| `secHead` | 节标题 | 深色章节大标题 |
| `obj` | 标题和内容 | 标准左文右图 |
| `twoObj` | 两栏内容 | 双列要点 |
| `titleOnly` | 仅标题 | 一句话过渡 |
| `blank` | 空白 | 全插画自定义 |

## 类型 A — 封面

- 背景 `tx1` 全屏深底，不能露出外层底色或预览画框
- 主视觉使用 [`assets/marketing-cover-visual.svg`](../../assets/marketing-cover-visual.svg)，不要临时重画立方体 / 等轴测图
- SVG **全高贴右**（与 viewport 同高，`tokens/deck.css` · `.deck-cover__visual`）；允许向左溢出裁切
- 左侧 5%–44% 保留给标题、副标题、日期 / 场景信息；文字不得压到主视觉复杂区域
- PNG 参考图仅用于确认摆放比例和裁切效果，不入库、不作为交付资产
- 背景仅用 slide 自带低对比点阵；**禁止** accent1 装饰斜线或额外 HTML 线（如历史 `.deck-cover__line`）；不得破坏 SVG 内轴线与绿色高光
- 主标题：白 + accent1 挑词
- 副标题 20–24pt Regular
- 左下（可选）：**Tier0** wordmark（lime SVG）；**禁止**母公司条形色块或 FREEZONEX Logo

## 类型 B — 深色章节

- 全屏深底，Tektur Regular 白字
- 低对比网格；避免大块 accent1 底

## 类型 C — 白底内容

- 顶栏：**IBM Plex Sans/SC Medium** 32pt 起
- Eyebrow（可选）：**IBM Plex Mono** · 12pt · 全大写 · **#73B200**（accent2）
- 正文 14–16pt，`#050B14`，行距 1.2
- 右栏：等轴测线稿 + accent1 局部填色

## 类型 D — 信息图 / 时间轴

- 白或 `lt2` / `#E6F9B4` 低透明洗
- accent1 轴线 + `#1D77FE` 辅助（仅透明度变化）

## 类型 E — 对比双栏

- 左：传统集成（浅灰洗 + 40–55% 字）
- 右：Tier0（浅绿洗 + 深字 + 可选 accent1 勾）
