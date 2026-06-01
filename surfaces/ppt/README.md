# Surface — PPT（Masterdeck）

> 完整规范：[`sources/spec.ppt.md`](../../sources/spec.ppt.md)（v1.5，对齐 `26.01.14-Tier0 Masterdeck.pptx`）。

## Agent 深度参考（生成 deck 时优先）

| 步骤 | 文档 |
|------|------|
| 工作流 | [`references/ppt-workflow.md`](../../references/ppt-workflow.md) |
| 硬锁 | [`references/ppt-layout-lock.md`](../../references/ppt-layout-lock.md) |
| 主题色 | [`references/ppt-themes.md`](../../references/ppt-themes.md) |
| 版式骨架 | [`references/ppt-layouts.md`](../../references/ppt-layouts.md) |
| 组件 | [`references/ppt-components.md`](../../references/ppt-components.md) |
| 图示 | [`references/ppt-diagrams.md`](../../references/ppt-diagrams.md) |
| 自检 | [`references/ppt-checklist.md`](../../references/ppt-checklist.md) |

索引与目录分工：[`references/README.md`](../../references/README.md)。

## 定位

路演与对外演示的 **PowerPoint 设计系统**，与产品 UI、官网 **字体与蓝色用法不同**。

## 设计原则

- **双模态**：深色章节页（节奏断点）+ 白底内容页（信息密度）交替  
- 工业编辑感：少装饰；强调色做「标点」  
- 字体分工严格（见下）  
- **Tier0 only**：画面与文案仅呈现 **Tier0**；**禁止 FREEZONEX**（无母公司页脚条、Logo、副标题、口播归属句）
- **重点标题绿**：深底 **`#B2ED1D`** · 白底 **`#73B200`**（`--ppt-emphasis-on-dark` / `--ppt-emphasis-on-light`）
- **结构标记**：项目符号、卡片顶边线 → 始终 **`#B2ED1D`**（`--ppt-accent-marker`），白底也不例外

## 与其他场景差异

| 维度 | PPT | 产品 UI | 官网 |
|------|-----|---------|------|
| 封面标题 | **Tektur Regular** | — | — |
| 章节大标题 | **Tektur Regular** | — | — |
| 白底页标题 | **Plex Sans Medium** | Plex | — |
| 品牌蓝 | **`#1D77FE` only** | 不用 | 极少 |
| 中文 | **IBM Plex Sans SC** | 可选 | Sans SC |

## 主题色（绑定 PPT 主题）

| 槽位 | HEX | 用途 |
|------|-----|------|
| tx1 / dk1 | `#050B14` | 深底、主字 |
| bg1 | `#FFFFFF` | 内容页 |
| accent1 | `#B2ED1D` | 深色页重点标题 / 挑词 |
| accent2 | `#73B200` | **白底页**重点标题、eyebrow、KPI 数字 |
| accent4 / 链接 | **`#1D77FE`** | 唯一品牌蓝（可用透明度阶） |
| lt2 | `#F4F4F4` | 浅灰辅助底 |

改版时写回 `theme1.xml`，禁止手绘吸色脱离主题。

## 字体白名单

**仅允许：** Tektur、IBM Plex Sans、**IBM Plex Sans SC**、IBM Plex Mono（**禁止 Poppins**）  

- 拉丁：`IBM Plex Sans`  
- 简中/东亚：**IBM Plex Sans SC**（不得换其他中文字体）  

## 幻灯片类型

| 类型 | 说明 |
|------|------|
| **A 封面** | 深底 `#050B14` + 左侧标题 + 右侧偏下 `assets/marketing-cover-visual.svg` 主视觉 |
| **B 深色章节** | Tektur Regular 白字 ≥48pt |
| **C 白底内容** | 顶栏标题 Plex Medium 32pt+，正文 14–16pt |
| **D 信息图** | accent1 轴线 + `#1D77FE` 辅助 |
| **E 对比双栏** | 浅绿洗 vs 浅灰洗 |

版式摘要见 [slide-templates.md](slide-templates.md)（Office 映射）；可粘贴 HTML 骨架见 [references/ppt-layouts.md](../../references/ppt-layouts.md)。带 Icon 卡片见 [components.md](components.md) / [references/ppt-components.md](../../references/ppt-components.md)。

## 字号阶梯（内容页）

| 层级 | 字号 | 字体 |
|------|------|------|
| L0 封面 | 54–72pt | Tektur Regular |
| L1 章节 | 48–60pt | Tektur Regular（深底） |
| L2 页标题 | 32–40pt | Plex Sans/SC Medium |
| L4 正文 | 14–16pt | Plex Regular |
| L6 页脚 | 10–12pt | Plex Mono |

## 组件要点

- 页脚：`Copyright © 2026 Tier0. All rights reserved.` — Plex Mono 10pt（**不得**含 FREEZONEX）  
- 圆角矩形统一 **4pt**  
- 白底白卡片必须有浅描边或 `lt2` 填充  
- **禁止**饱和 `#B2ED1D` 满铺条上叠浅色字  

## 可访问性与投影

- 正文投影 ≥ **14pt**  
- 动画：切页无或仅淡入  

## HTML 交付

见 [export.md](export.md) — 截图须 Base64 或 HTTPS，禁止 `file://`。

## Token

[`tokens/deck.css`](../../tokens/deck.css)

## UI Kit

`ui_kits/ppt/` — 待补 HTML 幻灯片模板；规范以 PPT 母版为准。

## 检查清单

交付前：[references/ppt-checklist.md](../../references/ppt-checklist.md)（P0–P3）。本目录 [checklist.md](checklist.md) 为母版规范摘要。
