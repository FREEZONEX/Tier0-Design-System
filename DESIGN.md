---
version: alpha
name: Tier0
description: "Tier0 为制造业构建 Agentic 工业数据平台。界面近单色、克制、精确：白底细线组织结构，品牌绿只做信号，近直角，产品本身就是展示。"
colors:
  background: "#FFFFFF"
  foreground: "#050B14"
  card: "#FFFFFF"
  subtle: "#FAFAFA"
  muted: "#F5F5F5"
  muted-foreground: "#878787"
  border: "#EBEBEB"
  input: "#E5E5E5"
  primary: "#050B14"
  primary-foreground: "#FFFFFF"
  highlight: "#B2ED1D"
  highlight-foreground: "#050B14"
  highlight-deep: "#73B200"
  highlight-ink: "#48640C"
  accent: "#F3F3F3"
  ring: "#A1A1A1"
  highlight-subtle: "#F7FDE8"
  button-highlight: "#CEF368"
  button-highlight-hover: "#DCF797"
  success: "#2F7657"
  warning: "#A35C00"
  destructive: "#DC2626"
  info: "#2563EB"
  red-500: "#EF4444"
  orange-500: "#F97316"
  yellow-500: "#FBBC55"
  green-500: "#6AD09D"
  cyan-500: "#06B6D4"
  blue-500: "#3B82F6"
  violet-500: "#8B5CF6"
  fuchsia-500: "#D946EF"
typography:
  typo-h1:
    fontFamily: "Inter"
    fontSize: "38px"
    fontWeight: "700"
    lineHeight: "46px"
    letterSpacing: "-0.456px"
  typo-h2:
    fontFamily: "Inter"
    fontSize: "30px"
    fontWeight: "600"
    lineHeight: "36px"
    letterSpacing: "-0.225px"
  typo-h3:
    fontFamily: "Inter"
    fontSize: "24px"
    fontWeight: "600"
    lineHeight: "32px"
    letterSpacing: "-0.144px"
  typo-h4:
    fontFamily: "Inter"
    fontSize: "20px"
    fontWeight: "500"
    lineHeight: "28px"
    letterSpacing: "-0.1px"
  body-lg:
    fontFamily: "IBM Plex Sans"
    fontSize: "18px"
    fontWeight: "400"
    lineHeight: "28px"
    letterSpacing: "0px"
  body:
    fontFamily: "IBM Plex Sans"
    fontSize: "16px"
    fontWeight: "400"
    lineHeight: "24px"
    letterSpacing: "0px"
  body-sm:
    fontFamily: "IBM Plex Sans"
    fontSize: "14px"
    fontWeight: "400"
    lineHeight: "20px"
    letterSpacing: "0px"
  label:
    fontFamily: "IBM Plex Sans"
    fontSize: "14px"
    fontWeight: "500"
    lineHeight: "20px"
    letterSpacing: "0px"
  caption:
    fontFamily: "IBM Plex Sans"
    fontSize: "12px"
    fontWeight: "400"
    lineHeight: "16px"
    letterSpacing: "0px"
  title:
    fontFamily: "IBM Plex Sans"
    fontSize: "12px"
    fontWeight: "500"
    lineHeight: "16px"
    letterSpacing: "0px"
  code:
    fontFamily: "IBM Plex Mono"
    fontSize: "13px"
    fontWeight: "400"
    lineHeight: "20px"
    letterSpacing: "0px"
  body-long:
    fontFamily: "IBM Plex Sans"
    fontSize: "16px"
    fontWeight: "400"
    lineHeight: "28px"
    letterSpacing: "0px"
  metric-lg:
    fontFamily: "Inter"
    fontSize: "32px"
    fontWeight: "500"
    lineHeight: "40px"
    letterSpacing: "0px"
  metric:
    fontFamily: "Inter"
    fontSize: "22px"
    fontWeight: "500"
    lineHeight: "28px"
    letterSpacing: "0px"
  web-display:
    fontFamily: "Inter"
    fontSize: "48px"
    fontWeight: "500"
    lineHeight: "60px"
    letterSpacing: "-0.96px"
rounded:
  none: "0px"
  sm: "2px"
  md: "4px"
  lg: "6px"
  xl: "8px"
  full: "9999px"
spacing:
  "0": "0px"
  "0-5": "2px"
  "1": "4px"
  "1-5": "6px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "6": "24px"
  "8": "32px"
  "12": "48px"
  "16": "64px"
  "24": "96px"
  inline-tight: "4px"
  inline: "8px"
  control-x: "12px"
  button-x: "16px"
  stack-tight: "8px"
  stack: "16px"
  card-padding: "24px"
  dialog-padding: "32px"
  section: "48px"
  section-web: "96px"
  title-gap: "4px"
  paragraph: "12px"
  paragraph-lg: "16px"
  group-item: "12px"
  group: "24px"
  control-xs: "24px"
  control-sm: "32px"
  control-md: "36px"
  control-lg: "40px"
  touch: "44px"
  table-header: "40px"
  table-row: "40px"
  app-header: "48px"
  icon-sm: "16px"
  icon-md: "20px"
  icon-lg: "24px"
  nav-item: "32px"
  logo-ui: "20px"
  empty-media: "40px"
  grid-columns: 12
  grid-gutter: "24px"
  grid-gutter-mobile: "16px"
  shell-header: "48px"
  shell-sidebar: "256px"
  shell-sidebar-collapsed: "48px"
  shell-sidebar-mobile: "288px"
  shell-page-padding: "24px"
  shell-page-padding-mobile: "16px"
  width-measure: "680px"
  width-dialog-sm: "480px"
  width-dialog-md: "672px"
  width-dialog-lg: "1024px"
  width-content-max: "1440px"
  width-web-max: "1200px"
  breakpoint-sm: "640px"
  breakpoint-md: "768px"
  breakpoint-lg: "1024px"
  breakpoint-xl: "1280px"
  breakpoint-2xl: "1536px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "{spacing.control-sm}"
    padding: "{spacing.button-x}"
  button-highlight:
    backgroundColor: "{colors.highlight}"
    textColor: "{colors.highlight-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "{spacing.control-sm}"
    padding: "{spacing.button-x}"
  input:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    height: "{spacing.control-md}"
    padding: "{spacing.control-x}"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-padding}"
  table-row:
    height: "{spacing.table-row}"
    typography: "{typography.body-sm}"
  metric:
    textColor: "{colors.foreground}"
    typography: "{typography.metric}"
---

## Overview

Tier0 为制造业构建 Agentic 工业数据平台：工厂设备和业务系统的数据只接入一次，语义化集成后，AI Agent 在这层数据上持续分析、执行和生成应用。**Connect once, Reuse everywhere.**

界面要像一台精密、可靠的工程工具：近单色、安静、精确。白底和 1px 细线组织结构，品牌绿只出现在需要被注意的地方，边角接近直角，画面以真实的产品和数据为主，不靠装饰取胜。

- **产品界面**：高密度的工业工作台。紧凑、跟手，用间距和细线分组。
- **官网与宣传物料**：同一套颜色和字体，字阶放大、留白更多，可以使用品牌图形（四角框、方块标记、层级树、点阵）。

数值以 `01-tokens/` 为准，本文件 front matter 是它的摘录；组件的逐条用法见 `02-components/guidelines/`；取舍顺序和分阶段工作法见 `04-skills/tier0-design/SKILL.md`。

## Colors

近单色：黑、白、灰承担绝大部分界面，品牌绿是唯一的强调色。

- **Foreground `#050B14`**：标题、正文，也是主按钮（`primary`）的底色。
- **Background / Card `#FFFFFF`**：页面和卡片都是白底，用 `border` 细线分开。
- **Subtle `#FAFAFA`**：侧栏、表头、悬停的列表行。
- **Muted `#F5F5F5`**：导航项的悬停和选中、空状态图标的底块。
- **Muted-foreground `#878787`**：说明、时间戳、单位。不放在 `muted` 底上。
- **Border `#EBEBEB` / Input `#E5E5E5`**：分隔和外框用 `border`，表单控件的边框用 `input`。
- **Highlight `#B2ED1D`（品牌绿）**：运行状态圆点、实时数据、官网的重点区块。白底上要阅读的绿色文字和图标用 `highlight-ink` `#48640C`；强调按钮用 `button-highlight` `#CEF368`，悬停 `#DCF797`。
- **状态色**：success `#2F7657`、warning `#A35C00`、destructive `#DC2626`、info `#2563EB`，只表达真实的结果。浅底写法是状态色 10% 透明度底（暗色 15%），文字用状态色本身；整页横幅用 4% 底加 30% 描边。
- **辅助色**（`red-500`、`blue-500` 等）只用于图表系列和分类标签。

组件里只写语义类（`bg-background`、`text-muted-foreground`、`border-border`），不写 `bg-white`、`gray-500` 这类物理颜色，也不写 `dark:` 分支。暗色模式由 `.dark` 类切换同名 token：

| Token | 亮色 | 暗色 |
|---|---|---|
| `background` | #FFFFFF | #050B14 |
| `foreground` | #050B14 | #FAFAFA |
| `card` | #FFFFFF | #050B14 |
| `subtle` | #FAFAFA | #151A19 |
| `muted` | #F5F5F5 | #262626 |
| `muted-foreground` | #878787 | #878787 |
| `border` | #EBEBEB | #343434 |
| `input` | #E5E5E5 | rgb(255 255 255 / 0.15) |
| `primary` | #050B14 | #FFFFFF |
| `primary-foreground` | #FFFFFF | #050B14 |
| `highlight` | #B2ED1D | #B2ED1D |
| `highlight-foreground` | #050B14 | #050B14 |
| `highlight-deep` | #73B200 | #73B200 |
| `highlight-ink` | #48640C | #B2ED1D |
| `accent` | #F3F3F3 | #1C1F1E |
| `ring` | #A1A1A1 | #737373 |
| `highlight-subtle` | #F7FDE8 | #48640C |
| `button-highlight` | #CEF368 | #CEF368 |
| `button-highlight-hover` | #DCF797 | #DCF797 |
| `success` | #2F7657 | #6AD09D |
| `warning` | #A35C00 | #FBBC55 |
| `destructive` | #DC2626 | #DC2626 |
| `info` | #2563EB | #60A5FA |

## Typography

- **字体**：标题和读数用 Inter；正文用 IBM Plex Sans；代码和命令行用 IBM Plex Mono；中文用系统字体（苹方、微软雅黑、思源黑体），不加载中文 Web 字体；Tektur 只用于 Logo。
- **产品字阶**：页面标题 `typo-h3` 24/32 600，紧凑页面 `typo-h4` 20/28 500；正文 `body-sm` 14/20；标签和按钮 `label` 14/20 500；说明 `caption` 12/16。`typo-h1`、`typo-h2` 只用于官网和文档。
- **读数**：`metric` Inter 22/28 500；画面里单独突出的一个关键数字用 `metric-lg` 32/40。数字开启 `font-variant-numeric: tabular-nums`。
- **长文**：中文文档和帮助用 `body-long` 16/28，单行不超过 680px。
- **官网、海报、Slides**：用 `web-*` 字阶，按画幅放大，字体和字重不变。
- 字重只用 400 / 500 / 600 / 700。中文标题和中英混排标题字距为 0，只有纯英文标题用字阶里的负字距。不用斜体做强调。

## Layout

- **4px 基准**：间距只取 front matter `spacing` 里的档位（4、8、12、16、24、32、48、64、96）；2px、6px 只用于图标与文字之间的微调。
- **用间距表达分组**：组内并列元素间隔 12px（`group-item`），组与组之间 24px（`group`），区块之间 48px（`section`，官网 96px）。每进入更高一层，间距至少升一档。
- **紧凑密度**：按钮高 32px（`control-sm`），表单控件 36px（`control-md`），表格行 40px，卡片内边距 24px。同一页面不混用两种密度。
- **应用骨架**：左侧导航 256px（收起 48px）加右侧工作区，工作区内边距 24px（移动端 16px）。默认不放顶栏；需要时不高于 48px，只放面包屑、搜索、当前对象和全局操作。
- **栅格与容器**：12 栏，沟槽 24px（移动端 16px）；产品内容区最宽 1440px，官网 1200px；连续阅读的文字单行最宽 680px。
- **响应式**：宽度小于 1024px 时侧栏改为抽屉；小于 768px 时表格改为卡片列表或横向滚动，不把列宽压到无法阅读。
- 并排的区块按各自内容定高、顶部对齐，不为对齐拉高、留出空白。

## Elevation & Depth

层级优先用 1px 细线和「白 + 浅灰」两层表面来表达。阴影只给离开页面平面的东西。

- **卡片、面板、表格**：不加阴影，用 `border: 1px solid var(--border)`。
- **下拉、气泡提示、通知**：`box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`（`shadow.md`）。拖拽中的卡片也用它。
- **弹窗、侧滑面板**：`box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`（`shadow.lg`），遮罩 `rgb(0 0 0 / 0.5)`。
- **按钮、输入框**：可用 `box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)`（`shadow.xs`），按下或禁用时去掉。
- **暗色模式**：阴影看不见，浮层改用 1px `border` 描边区分。

## Shapes

形状接近直角，显得利落、精确。

- **4px**（`rounded.md`）：按钮、输入框、标签、弹窗、下拉、提示。
- **6px**（`rounded.lg`）：卡片、面板、图片容器。
- **8px**（`rounded.xl`）是上限，只给大尺寸的截图、视频、插图框。
- **全圆角**只给胶囊徽章、进度条、开关、滑块、头像、状态圆点。
- 嵌套时内层圆角不大于外层；侧滑面板贴边的两角为 0。
- **线宽**：分隔和外框 1px；选中描边和指示条 2px。实线是默认；虚线只表示还不存在的东西（新建占位、拖放区域、草稿连线）。
- **键盘焦点**：输入框和选择器用 `box-shadow: 0 0 0 2px rgb(162 216 26 / 0.2)`；按钮等其他控件用 3px 外圈，颜色为 `ring` 的 50% 透明度。

## Components

产品界面直接用 Tier0-Frontend `packages/ui` 的组件（副本在 `02-components/packages/ui`），不自己画按钮、侧栏、表格；独立演示页要还原它们的尺寸、颜色和状态。每个组件的逐条用法见 `02-components/guidelines/`。

- **Buttons**：一个视图只有一个 `primary`（黑底白字，高 32px，左右内边距 16px，圆角 4px）；次要操作用 `outline`；品牌绿的 `default`（`#CEF368`）只给需要特别强调的工作流操作，写代码时显式写出 variant。危险操作用 `destructive`，并先弹确认框。→ `button.md`
- **Cards & panels**：白底、1px `border`、6px 圆角、24px 内边距；不整块填灰，不加阴影，不卡片套卡片。面板只有「标题行 → 内容」两层，中间不画线；筛选和视图切换放在标题行右侧。→ `card.md`
- **Forms**：标签放在输入框上方并保持可见（`label` 14/20 500），不只用占位符；输入框高 36px，边框用 `input`。出错时边框变 `destructive`，错误文字写在输入框下方并说明怎么改。→ `focus.md`、`states.md`
- **Navigation**：侧栏每项高 32px，16px lucide 图标，文字 `body-sm`；悬停和当前项都用 `muted` 灰底，当前项加 500 字重；导航不用品牌绿。→ `sidebar.md`
- **Tables & lists**：行高 40px，行间 1px `border`，悬停用 `subtle` 底，点击行进入详情。
- **Run status**（标志性组件）：设备和产线的运行状态写成「圆点 + 文字」，运行中用品牌绿圆点；告警严重度用 `AntTag` 浅底标签，严重度只表达一次。→ `status.md`、`alert-list.md`
- **Metric**（标志性组件）：说明（`body-sm`、`muted-foreground`）→ 数值（`metric`）→ 单位。数值默认用 `foreground`，只有超过已知阈值时才变 `destructive`，并写明阈值。→ `metric.md`
- **Loading / Empty / Error**：加载用和最终内容形状一致的骨架；空状态说明为什么空、下一步做什么；错误写真实原因并给「重试」。→ `states.md`
- **Icons**：只用 lucide，按钮和列表里 16px，颜色跟随文字。→ `icon.md`
- **Logo**：用 SVG 文件，亮底用黑色版，产品界面里高度不超过 20px。→ `logo.md`
- **Motion**：时长和曲线只从 `01-tokens/motion.json` 的 `surface` 取：悬停 150ms standard；浮层进入 200ms enter、退出 150ms exit；侧滑面板 300ms standard。

## Do's and Don'ts

**Do**

- 先删后加：新增颜色、字体、图标或动效前，先说清它表达了什么别处没有的信息。
- 同一个信息只表达一次：标签已经有颜色和文字，就不再加状态图标。
- 用真实内容：真实的界面、设备名和数据路径（如 `Line-01/主轴温度`）；不编造阈值、原因和数据。
- 所有可点击元素都有悬停（灰色系，150ms）和键盘焦点；禁用为 50% 透明度。
- 系统开启「减少动态效果」时，过渡改为 0ms 或只变透明度，循环动画停止。
- 文案写发生了什么、下一步做什么：「无法加载告警」+ 原因 +「重试」，不把错误码当标题。
- 交付前对照渲染结果检查：页面里出现的每个颜色、字号、圆角都能在 front matter 里找到对应项。

**Don't**

- 紫蓝渐变、霓虹色、玻璃拟态、渐变文字或渐变描边、大面积的色彩晕染。
- 卡片套卡片；产品界面里整块填灰的卡片。
- token 以外的颜色、字号、间距和圆角。
- 传统工业 4.0 的画面（蓝色粒子、发光齿轮、地球连线），以及卡通、蒸汽朋克、重型机械。
- emoji 图标、混用图标库、凭记忆手写图标路径。
- 英文全大写、加宽字距的小标签和眉题（如 `OVERVIEW`）；在代码和命令行以外使用等宽字体。
- 导航、菜单、列表的悬停和选中用品牌绿。
- 一个面板里层层加分割线；所有区块用同一个间距。
- 不承载内容、只用来划分空间的宽顶栏。
- 把原型的状态切换、方案切换混进产品界面（放到左下角的原型控制面板）。
- 回弹、弹性、过冲的动效；实时数据的数字滚动动画。
- 用文字代替 Tier0 Logo 的 SVG。
