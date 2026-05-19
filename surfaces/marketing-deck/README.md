# Surface — PPT / 市场材料（Masterdeck）

> 完整规范：[`sources/spec.marketing-deck.ppt.md`](../../sources/spec.marketing-deck.ppt.md)（v1.5，对齐 `26.01.14-Tier0 Masterdeck.pptx`）。

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
| 封面标题 | **Poppins SemiBold** | — | Poppins |
| 章节大标题 | **Tektur Regular** | — | — |
| 白底页标题 | **Plex Sans Medium**（禁 Poppins） | Plex | Poppins |
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
| lt2 | `#EFECE0` | 浅米辅助底 |

改版时写回 `theme1.xml`，禁止手绘吸色脱离主题。

## 字体白名单

**仅允许：** Tektur、Poppins、IBM Plex Sans、**IBM Plex Sans SC**、IBM Plex Mono  

- 拉丁：`IBM Plex Sans`  
- 简中/东亚：**IBM Plex Sans SC**（不得换其他中文字体）  

## 幻灯片类型

| 类型 | 说明 |
|------|------|
| **A 封面** | 深底 `#050B14` + 点阵 + accent1 挑词 + 右等轴测 |
| **B 深色章节** | Tektur Regular 白字 ≥48pt |
| **C 白底内容** | 顶栏标题 Plex Medium 32pt+，正文 14–16pt |
| **D 信息图** | accent1 轴线 + `#1D77FE` 辅助 |
| **E 对比双栏** | 浅绿洗 vs 浅灰洗 |

详见 [slide-templates.md](slide-templates.md) · 带 Icon 卡片见 [components.md](components.md)。

## 字号阶梯（内容页）

| 层级 | 字号 | 字体 |
|------|------|------|
| L0 封面 | 54–72pt | Poppins SemiBold |
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

`ui_kits/marketing-deck/` — 待补 HTML 幻灯片模板；规范以 PPT 母版为准。

## 检查清单

[checklist.md](checklist.md)
