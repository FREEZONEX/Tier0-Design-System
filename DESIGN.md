---
version: alpha
name: Tier0
description: "Tier0 为制造业构建 Agentic 工业数据平台。界面近单色、克制、精确：白底细线组织结构，品牌绿只做信号，近直角，产品本身就是展示。"
colors:
  background: "#FFFFFF"
  foreground: "#050B14"
  card: "#FFFFFF"
  subtle: "#FAFAFA"
  muted: "#F3F3F3"
  muted-foreground: "#737373"
  border: "#EBEBEB"
  input: "#878787"
  primary: "#050B14"
  primary-foreground: "#FFFFFF"
  highlight: "#B2ED1D"
  highlight-foreground: "#050B14"
  highlight-deep: "#73B200"
  highlight-ink: "#4B640C"
  accent: "#F7FDE8"
  ring: "#628210"
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
shadow:
  none: "none"
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
  focus: "0 0 0 2px rgb(162 216 26 / 0.2)"
motion:
  duration-instant: "0ms"
  duration-fast: "150ms"
  duration-base: "200ms"
  duration-slow: "300ms"
  duration-signal: "2000ms"
  easing-standard: "cubic-bezier(0.4, 0, 0.2, 1)"
  easing-enter: "cubic-bezier(0, 0, 0.2, 1)"
  easing-exit: "cubic-bezier(0.4, 0, 1, 1)"
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

Tier0 为 **制造业** 构建 **Agentic 工业数据平台**。

它让工厂设备和业务系统的数据只需接入一次，就能被语义化集成；让 AI Agent 能在这层数据之上持续地分析、执行和生成应用。

> **Connect once, Reuse everywhere.**

- **信号灯**：品牌绿是品牌层面唯一的强调色，用于运行状态、实时数据、选中和重点区块，让需要关注的地方一眼可见。状态色（成功、警告、错误、提示）不属于品牌色，只用于表达真实的结果；辅助色只用于图表和分类标签。
- **白底，浅灰区块**：页面以白色为底；官网的卡片区用浅灰托住，产品里的表头和悬停行用浅灰填充。白与浅灰两层就能分出区域，不需要额外的颜色，界面保持干净，让品牌绿和数据更容易被看到。
- **细线为主**：页面内的层级以 1px 细线为主，细线让每块信息的边界明确、结构一目了然，接近工程图纸和设备面板的秩序感。浅灰填充和阴影是补充：表头、悬停用浅灰，浮层和需要与背景区分的面板可以用阴影。
- **近直角**：圆角以 4px 为主，卡片 6px，最大不超过 8px；胶囊徽章、进度条、开关、头像等本身是圆形的元素除外。接近直角的边缘显得利落、精确，符合工业设备和工程工具的气质；统一的小圆角也让组件之间更整齐。
- **产品本身就是展示**：画面以产品为主：真实的界面、操作过程和可交互的演示，让用户直接动手、直接体验，从而建立信任、快速上手。辅助画面只用来说明产品的关键概念，层级简单清晰，一个画面只讲一件事。
- **工程气质**：用工程图纸和数据结构里的元素组织画面：层级树代表 UNS 的数据组织方式，连线架构图和等距方块插图说明数据接入与关键概念，方块标记代表状态与要点，四角框代表当前焦点，代码与命令用等宽字体，点阵作为背景，带来图纸般的秩序感。

## Colors

- 组件只使用 light.json / dark.json 主层的 token，不直接使用 base.json 的色值。
- 使用语义工具类：bg-background、text-muted-foreground、border-border。
- 组件中不写物理颜色：不用 #fff、gray-500、bg-white。
- 组件中不写 dark: 分支。深色模式由 .dark 类和 token 层负责。
- 页面不用彩色大面积背景；白底上需要阅读或辨认的绿色（文字、图标、表达状态的圆点）使用 highlight-ink，纯装饰的绿色圆点和色块可用 highlight。
- 不用渐变、玻璃质感、渐变文字、渐变描边或大面积色彩晕染。
- 次要文字（muted-foreground）不放在 muted 背景上；muted 背景上的文字用 foreground。

- 状态色的浅底：背景用状态色 10% 透明度（暗色 15%），描边 10%（暗色 25%），文字和图标用状态色本身。整块横幅提示用 4% 底色加 30% 描边。
- 辅助色（`red-500` 等）只用于图表系列和分类标签；完整色阶见 `01-tokens/color/base.json`。

## Themes

亮色和暗色共用同一套 token 名称，深色模式由 `.dark` 类切换。

| Token | 亮色 | 暗色 |
|---|---|---|
| `background` | #FFFFFF | #050B14 |
| `foreground` | #050B14 | #FFFFFF |
| `card` | #FFFFFF | #050B14 |
| `subtle` | #FAFAFA | #151A19 |
| `muted` | #F3F3F3 | #1C1F1E |
| `muted-foreground` | #737373 | #878787 |
| `border` | #EBEBEB | #343434 |
| `input` | #878787 | #878787 |
| `primary` | #050B14 | #FFFFFF |
| `primary-foreground` | #FFFFFF | #050B14 |
| `highlight` | #B2ED1D | #B2ED1D |
| `highlight-foreground` | #050B14 | #050B14 |
| `highlight-deep` | #73B200 | #73B200 |
| `highlight-ink` | #4B640C | #B2ED1D |
| `accent` | #F7FDE8 | #4B640C |
| `ring` | #628210 | #B2ED1D |
| `success` | #2F7657 | #6AD09D |
| `warning` | #A35C00 | #FBBC55 |
| `destructive` | #DC2626 | #EF4444 |
| `info` | #2563EB | #60A5FA |

## Typography

- 标题和读数用 Inter，正文用 IBM Plex Sans，代码和命令行用 IBM Plex Mono；中文使用系统字体（苹果设备为苹方，Windows 为微软雅黑，Android 为思源黑体）；Tektur 只用于 Logo。
- 不引入以上之外的字体。
- 中文标题和中英混排标题字距为 0；只有纯英文标题使用字阶里的负字距。
- 最小字号用 caption；更小的字号只用于图表刻度等不需要阅读的文字。
- 字重只用 400 / 500 / 600 / 700。
- 读数和统计数字用 metric 字阶（Inter，500 字重），按画面层级在 metric-lg 和 metric 之间选，必要时可按场景放大；数字开启等宽数字（tabular-nums）。等宽字体只用于代码。
- 只用字阶里的字号，不写任意值。
- 段落之间：body-sm 用 paragraph，body 和 body-long 用 paragraph-lg。
- 连续的中文长文（文档、帮助）使用 body-long（16/28）。
- 截断：表格单元格、标签、导航单行截断加省略号，并能查看完整内容；卡片说明最多 2 行。
- 文字颜色：标题与正文用 foreground；说明、时间戳用 muted-foreground；绿色文字用 highlight-ink。次要文字不放在 muted 背景上（对比度 4.27:1，低于 4.5:1）。
- 不用斜体做强调。

- 字体加载：Tier0-Frontend 用 `next/font/google` 加载 Inter 和 IBM Plex Sans；独立页面用 Google Fonts 加载 Inter、IBM Plex Sans 和 IBM Plex Mono。中文不加载 Web 字体。

## Layout

- 间距、内边距和组件尺寸以 4 的倍数为主；space.0-5、space.1-5 用于图标与文字的微调和控件内部。
- 同一层级的元素之间用同一档间距；进入更高一层级时，间距至少升一档：组内 group-item → 组间 group → 区块间 section。
- 层级以 border.1 细线为主；表头、悬停、分区可以用浅灰填充，浮层和需要和背景区分的面板可以用阴影。
- 尽量使用 space 刻度里的档位，少用刻度外的数值。
- 产品界面默认密度为「紧凑」：控件高 control-sm、表格行高 table-row、卡片内边距 card-padding；不在同一页面混用两种密度。
- 页面结构从任务出发：先想清楚用户在这一页要看什么、做什么，再决定要不要顶栏和侧栏。常见做法是左侧导航 + 右侧工作区，不需要顶栏；需要顶栏时保持窄（不超过 app-header），并且只放有用的内容（面包屑、搜索、当前对象、全局操作），不为划分空间而加。内容区内边距桌面用 shell.page-padding，移动端用 shell.page-padding-mobile。
- 内容区使用 grid.columns 栏栅格，沟槽桌面 grid.gutter、移动端 grid.gutter-mobile；卡片与面板的宽度取整数栏。
- 连续阅读的文字（说明、文档正文）单行最大宽度 width.measure；表格、看板、拓扑图不受此限，占满内容区。
- 监控看板按「概览 → 列表 → 详情」从上到下、从左到右排列：关键读数在首屏左上，告警与异常在读数旁，明细在下方。
- 同一页面内对齐线不超过 3 条：内容区左边缘、栅格栏边缘、右侧操作区边缘。
- breakpoint.lg 以下侧栏改为抽屉；breakpoint.md 以下表格改为卡片列表或横向滚动，不压缩列宽到无法阅读。

## Elevation & Depth

阴影。层级以 细线为主，阴影克制使用：浮层、需要和背景区分的面板、可点击和拖拽的交互反馈。

- 浮层按离页面的远近用 md / lg：下拉、气泡、提示、通知用 md；弹窗、侧滑面板用 lg。
- 可点击控件（按钮、输入框）可用 xs，提示它们可以被按下；按下或禁用时去掉。
- 拖拽中的卡片、行用 md，表示它被「拿起」。
- 深色模式下阴影不可见，浮层改用 border.1 描边区分。

## Shapes

- 控件（按钮、输入框、选择器、标签、表格内元素）用 radius.md。
- 卡片、面板、侧滑面板、图片容器用 radius.lg。
- 弹窗、下拉、提示等浮层用 radius.md，与控件一致。
- radius.xl 是上限，只用于大尺寸的媒体容器（截图、视频、插图框）。
- 例外：胶囊徽章、进度条、开关、滑块、头像、状态圆点用 radius.full；除此之外不使用全圆角。
- 嵌套时内层圆角不大于外层。
- 分隔、卡片外框、表格行线、输入框边框统一用 border.1。
- border.2 用于选中状态的描边或指示条、图表中需要强调的线。
- 实线为默认；虚线只表示「尚未存在」的东西：新建占位、拖放区域、草稿连线。
- 线的颜色用 color token：分隔与外框用 border，交互控件边框用 input。
- 键盘焦点按前端写法：输入框、选择器用 shadow.focus；按钮等其他控件用 ring 色 50% 透明度的 border.3 外圈。

## Components

产品界面必须用 Tier0-Frontend 的 `packages/ui`（shadcn/ui）组件，不自己画按钮、侧栏、表格；做独立演示页面时，也要还原这些组件的尺寸、颜色和交互状态。下面是用法，取值见 front matter 的 `components`。

### 极简

- 每个元素只表达一种信息；同一个信息只表达一次，不同时用图标、颜色和文字重复表达。
- 能用间距分开的不加线，能用文字说清的不加图标，能合并的区块合并。新增一个元素前，先说清它表达了什么别处没有的信息。

### 页面布局

- 布局从任务出发：先确定这一页最重要的信息和操作，让它们在第一屏、在视线起点；再安排次要内容。不为对称或填满空间加区块。
- 常见结构是左侧导航 + 右侧工作区。侧栏可以用浅灰（`subtle`）底、工作区用白底，把注意力引到右侧。顶栏只在承载内容时出现，保持窄。
- 层级用间距表达：同一组里的并列元素间隔 `group-item`，组与组之间间隔 `group`。例如一组指标卡之间用 `group-item`，指标卡组和旁边的告警列表之间用 `group`；所有区块等间距会让分组消失。
- 并排的区块高度由各自内容决定，不为了和旁边对齐而拉高、留出大片空白；需要对齐时用真实内容填满，否则顶部对齐即可。

### Logo

- 页面上单独出现 Tier0 标志时，一律用 SVG 文件，不用文字或字体代替：亮底用 `03-brand/logo/assets/tier0-logo-black.svg`；暗底的产品界面用 `tier0-logo-white.svg`，品牌展示（海报、开场）用 `tier0-logo-lime.svg`。
- 产品界面里 Logo 高度不超过 `logo-ui`，四周留白不少于 Logo 高度的一半。

### 页面标题

- 产品页面标题用 `typo-h3`，紧凑页面用 `typo-h4`；`typo-h1` 只用于官网和文档。
- 标题下方的状态和元信息用 `body-sm`、`muted-foreground`，和标题间隔 `title-gap`；状态写成「圆点 + 文字」放在同一行，时间等信息用 `·` 分隔。
- 页面级操作放在标题行右侧，与标题垂直居中。

### 侧边栏

- 按 Tier0-Frontend 的 sidebar 组件：每项高 `nav-item`，左侧 lucide 图标 `icon-sm`，图标和文字间隔 `inline`，文字 `body-sm`。
- 文字用 `foreground`。悬停：`muted` 灰底，过渡用 fast；当前项：`muted` 灰底 + 500 字重。导航不用品牌绿，绿色留给业务指标和关键操作。
- 可以收起为只显示图标的窄栏，展开收起用 slow + standard 过渡；分组标题用 `caption`、`muted-foreground`，正常大小写。

### 卡片与区块

- 产品界面的卡片用白底（`card`）+ `border.1` 细线，不整块填灰；浅灰填充只给侧栏、表头和悬停行。
- 指标卡高度贴合内容；一排指标卡同高，但不跟旁边的列表或图表对齐拉伸。
- 面板结构只有两层：标题行（左侧标题，右侧操作）→ 内容。标题行和内容之间用间距分开，不画分割线；不叠多层工具栏。
- 一个面板里的分割线只用于一种地方，通常是列表行之间。标题区、操作区、筛选区之间不加线。
- 筛选、视图切换这类控制放进标题行右侧：选项少时用下拉按钮或分段控件，不单独占一整行。

### 按钮

- 用 Tier0-Frontend 的按钮变体：`primary`（黑底）、`default`（品牌绿底，前端的默认值）、`outline`（白底细线）、`secondary`（浅灰底）、`ghost`（无底，悬停变灰）、`destructive`、`link`。尺寸默认 `sm`（`control-sm`），表单里用 `md`（`control-md`），页面主操作可用 `lg`（`control-lg`）。
- 一个视图只有一个主操作，用 `primary`；品牌绿的 `default` 只给需要特别强调的工作流操作，使用时显式写出 variant，不依赖默认值。
- 正例：表单底部「取消」（outline）+「保存」（primary）；列表右上角「导出」用 outline，「运行」用 default。

### 焦点

- 按前端写法：输入框、选择器获得焦点时加 `shadow.focus` 外圈（校验失败时同形制，颜色换成 destructive）；按钮等其他控件用 `ring` 色 50% 透明度的 `border.3` 外圈，只在键盘操作时出现。

### 图标

- 统一用 lucide 图标（shadcn/ui 默认图标库），不混用其他图标库，不用 emoji。
- 尺寸：按钮、表格、输入框、侧栏里 `icon-sm`，空状态 `icon-lg`；线宽保持 lucide 默认；颜色跟随文字（`currentColor`）。
- 用 lucide 的包（React 项目用 `lucide-react`，独立页面用 lucide 官方的 npm 包或 CDN 脚本），不凭记忆手写图标路径。
- 图标不放进彩色底块做装饰；只有空状态的图标放在浅灰（`muted`）方块里。

### 读数与指标

- 结构：上方说明文字（`body-sm`，`muted-foreground`）→ 数值（`metric` 或 `metric-lg`，Inter 500，等宽数字）→ 单位紧跟数值（`body-sm`，`muted-foreground`）。
- 字号按画面层级选：一排同级指标都用 `metric`；只有画面里单独突出的那一个关键数字用 `metric-lg`。不因数值长短改字号。
- 数值本身用 `foreground`；只有表达真实状态时才上色（如超限的温度用 destructive），不因为「好」就变绿。
- 正例：`主轴温度` / `72.4` `°C`；有阈值且超出时数值变 destructive，并在旁边写明阈值。不知道阈值时不上色，也不编造阈值。

### 运行状态

- 设备或产线的运行状态写成「圆点 + 文字」，不做成标签：运行中用品牌绿圆点（亮色 `highlight-ink`，暗色 `highlight`），停机、故障用对应状态色圆点。

### 状态标签

- 用浅底样式：状态色 10% 背景、10% 描边、状态色文字，`radius.full`，`caption` 字阶；暗色下背景 15%、描边 25%。
- 文字写结果本身（「严重」「警告」「提示」「运行中」），不用纯色实底标签表达普通状态。

### 告警列表

- 每行：状态标签（浅底，固定宽度的第一列）→ 标题（`body-sm`，500，`foreground`），下方是来源（设备或数据路径，`caption`，`muted-foreground`，常规字体）→ 右侧时间（`caption`，`muted-foreground`）。
- 严重度只表达一次：用状态标签，就不再加状态图标；标签已经有颜色和文字。
- 行与行之间 `border.1` 细线；悬停用浅灰填充；点击进入详情。
- 按严重度、再按时间排序；严重告警靠状态图标和标签区分，不给整行上色，不加彩色左边线，标题不用彩色文字。
- 状态筛选放在面板标题行右侧的下拉按钮里（「全部 3」），下拉选项用对应语义的浅底标签带数量；不在标题下面再铺一行筛选。
- 列对齐：状态标签列固定宽度，标题和来源左对齐在同一条线上，时间右对齐；行高和内边距全列表一致。

### 交互反馈

- 所有可点击的元素都有悬停状态（颜色变化，fast + standard），按下沿用悬停色；焦点按上面的规则显示；页面不能像一张静态图。
- 悬停用灰色系，不用品牌绿：侧栏项用 `muted`，列表行和表格行用 `subtle`（行内有 `muted-foreground` 文字，不放在 `muted` 上）。
- 禁用：50% 透明度，不响应悬停和点击。

### 加载

- 区块首次加载用骨架：形状与最终内容一致（行数、列宽、指标卡位置接近真实），`muted` 底色，`radius.md`，轻微的透明度脉冲；不用整页转圈。
- 按钮触发的操作：按钮内图标换成旋转的 `LoaderCircle`，保持按钮宽度并禁用，文字可改为进行中的说法（「保存中」）。
- 已有内容刷新时保留旧内容，只在区块角落显示小的加载指示，不把内容清空再加载。

### 空状态

- 区块中央：`muted` 方块（`empty-media`）里的 lucide 图标（`icon-lg`）→ 标题（`label`）→ 一句说明为什么是空的、下一步做什么（`body-sm`，`muted-foreground`）→ 最多一个操作按钮。
- 区分两种空：还没有数据（引导去接入或创建），筛选后没有结果（提供「清除筛选」）。
- 正例：图标 `Inbox`，标题「暂无告警」，说明「Line-01 的设备运行正常，出现告警时会显示在这里。」，不放按钮。

### 错误

- 区块加载失败：在区块内显示 `CircleAlert`（destructive）→ 标题「无法加载告警」→ 一句原因（来自接口的真实原因；拿不到时写「请稍后重试」，不编造原因）→「重试」按钮；区块外的内容照常显示。
- 表单字段错误：输入框描边改为 destructive 并加对应的焦点外圈，错误文字写在输入框下方（`caption`，destructive），说明怎么改。
- 影响整个页面的问题（连接中断、权限不足）用页面顶部横幅：状态色 4% 底、30% 描边、状态图标、一句说明和一个操作。
- 错误文案写发生了什么和怎么办，不写错误码原文作为标题。

## Motion

- 只对 opacity、transform、颜色做过渡；不对宽高、布局做动画（数据条的长度变化除外）。
- 悬停、按下：fast + standard。浮层出现：base + enter；浮层消失：fast + exit。侧滑面板、页面区块移动：slow + standard。
- 不用回弹、弹性、过冲。
- 实时数据更新不加数字滚动动画，直接替换；需要提示变化时只闪烁一次背景（base 时长）。
- 同一视图只允许一个持续循环的装饰性动效（如运行指示灯的 signal 呼吸）；加载中的骨架和转圈不计入，加载结束即停止。
- 系统设置为减少动态效果时，所有过渡改为 duration.instant 或仅透明度变化，循环动效停止。

## Do's and Don'ts

**Do**

- **Less, but better：优先删减，而非添加**：新增任何颜色、字体或动效，都需要说明它解决了什么问题。界面以中性色为主，品牌色只用在需要引导注意力的位置。克制是可信的前提。
- **每个元素都有明确职责**：界面中不存在纯装饰性元素。四角框用于标记焦点，方块标记用于表示状态与要点，层级树用于表示数据路径，三者作为品牌图形元素使用。职责无法说明的元素，应当移除。
- **以真实内容表达**：用真实的产品界面、设备和数据来表达，文案描述具体能力。专业用户对失真的表达高度敏感。
- **精确到每一处细节**：间距、对齐、数值格式均遵循规范，发布前确保没有文字错误。设计追求长期稳定，经得起以工程标准审视每一个细节。

**Don't**

- 传统工业 4.0：蓝色粒子、发光齿轮、地球连线等
- 错误的工业感：卡通风格、蒸汽朋克、重型机械
- AI Slop：霓虹色渐变、玻璃拟态、多层嵌套的卡片、emoji 图标
- 英文全大写、加宽字距的小标签和眉题（如 `TOKENS`、`OVERVIEW`）。
- 等宽字体用在代码和命令行以外的地方：读数、标签、导航、路径说明都用常规字体。
- 不承载内容、只用来划分空间的宽顶栏。
- 导航、菜单、列表的悬停和选中用品牌绿。
- 产品界面里整块填灰的卡片；为了和旁边对齐而拉高、留出大片空白的区块。
- 所有区块用同一个间距，分不出哪些是一组。
- 一个面板里标题、操作、筛选、列表之间层层加分割线。
- 同一个信息同时用图标、颜色和文字重复表达。
- 原型的状态切换、方案切换混进产品界面里。
- 页面上单独出现的 Tier0 标志用文字代替 SVG。
