---
version: alpha
name: Tier0
description: "Tier0 为制造业构建 Agentic 工业数据平台。界面近单色、克制、精确；品牌绿只用于信号、实时数据、选中和重点区块。Connect once, Reuse everywhere."
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
colors-dark:
  background: "#050B14"
  foreground: "#FFFFFF"
  card: "#151A19"
  subtle: "#151A19"
  muted: "#1C1F1E"
  muted-foreground: "#878787"
  border: "#1C1F1E"
  input: "#878787"
  primary: "#FFFFFF"
  primary-foreground: "#050B14"
  highlight: "#B2ED1D"
  highlight-foreground: "#050B14"
  highlight-deep: "#73B200"
  highlight-ink: "#B2ED1D"
  accent: "#4B640C"
  ring: "#B2ED1D"
  success: "#6AD09D"
  warning: "#FBBC55"
  destructive: "#EF4444"
  info: "#60A5FA"
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
    letterSpacing: "0.6px"
  code:
    fontFamily: "IBM Plex Mono"
    fontSize: "13px"
    fontWeight: "400"
    lineHeight: "20px"
    letterSpacing: "0px"
  web-display:
    fontFamily: "Inter"
    fontSize: "48px"
    fontWeight: "500"
    lineHeight: "60px"
    letterSpacing: "-0.96px"
  web-typo-h1:
    fontFamily: "Inter"
    fontSize: "38px"
    fontWeight: "700"
    lineHeight: "46px"
    letterSpacing: "-0.456px"
  web-typo-h2:
    fontFamily: "Inter"
    fontSize: "30px"
    fontWeight: "600"
    lineHeight: "36px"
    letterSpacing: "-0.225px"
  web-typo-h3:
    fontFamily: "Inter"
    fontSize: "24px"
    fontWeight: "600"
    lineHeight: "32px"
    letterSpacing: "-0.144px"
  web-typo-h4:
    fontFamily: "Inter"
    fontSize: "20px"
    fontWeight: "500"
    lineHeight: "28px"
    letterSpacing: "-0.1px"
  web-body-lg:
    fontFamily: "IBM Plex Sans"
    fontSize: "18px"
    fontWeight: "400"
    lineHeight: "28px"
    letterSpacing: "0px"
  web-body:
    fontFamily: "IBM Plex Sans"
    fontSize: "16px"
    fontWeight: "400"
    lineHeight: "24px"
    letterSpacing: "0px"
  web-body-sm:
    fontFamily: "IBM Plex Sans"
    fontSize: "14px"
    fontWeight: "400"
    lineHeight: "20px"
    letterSpacing: "0px"
  web-label:
    fontFamily: "IBM Plex Mono"
    fontSize: "14px"
    fontWeight: "500"
    lineHeight: "20px"
    letterSpacing: "0px"
  web-title:
    fontFamily: "IBM Plex Mono"
    fontSize: "12px"
    fontWeight: "400"
    lineHeight: "16px"
    letterSpacing: "0.6px"
  web-caption:
    fontFamily: "IBM Plex Sans"
    fontSize: "12px"
    fontWeight: "400"
    lineHeight: "16px"
    letterSpacing: "0px"
  web-code:
    fontFamily: "IBM Plex Mono"
    fontSize: "13px"
    fontWeight: "400"
    lineHeight: "20px"
    letterSpacing: "0px"
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
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "0 16px"
  button-highlight:
    backgroundColor: "{colors.highlight}"
    textColor: "{colors.highlight-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "36px"
  input:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    height: "32px"
    padding: "0 12px"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "24px"
  table-row:
    height: "40px"
    typography: "{typography.body}"
---

# Tier0 Design System

> 本文件由 `scripts/build_design_md.py` 从 `01-tokens/` 与 `00-foundation/` 生成，请勿手改。

## Overview

Tier0 为 **制造业** 构建 **Agentic 工业数据平台**。

它让工厂设备和业务系统的数据只需接入一次，就能被语义化集成；让 AI Agent 能在这层数据之上持续地分析、执行和生成应用。

> **Connect once, Reuse everywhere.**

设计原则：

- **Less, but better：优先删减，而非添加**：新增任何颜色、字体或动效，都需要说明它解决了什么问题。界面以中性色为主，品牌色只用在需要引导注意力的位置。克制是可信的前提。
- **每个元素都有明确职责**：界面中不存在纯装饰性元素。四角框用于标记焦点，方块标记用于表示状态与要点，层级树用于表示数据路径，三者作为品牌图形元素使用。职责无法说明的元素，应当移除。
- **以真实内容表达**：用真实的产品界面、设备和数据来表达，文案描述具体能力。专业用户对失真的表达高度敏感。
- **精确到每一处细节**：间距、对齐、数值格式均遵循规范，发布前确保没有文字错误。设计追求长期稳定，经得起以工程标准审视每一个细节。

## Colors

组件只使用用途 token，不直接使用色阶。

### 表面与文字

| Token | 亮色 | 暗色 | 用途 |
|---|---|---|---|
| `background` | #FFFFFF | #050B14 | 页面底色。 |
| `foreground` | #050B14 | #FFFFFF | 正文与标题。 |
| `card` | #FFFFFF | #151A19 | 实色表面：面板、弹窗、产品界面截图的容器。 |
| `subtle` | #FAFAFA | #151A19 | 大面积分区底色：卡片区、表格区。 |
| `muted` | #F3F3F3 | #1C1F1E | 悬停填充、行内代码、输入框底。 |
| `muted-foreground` | #737373 | #878787 | 说明、次要标签、时间戳。 |
| `border` | #EBEBEB | #1C1F1E | 单元格之间、卡片周围的细线。 |
| `input` | #878787 | #878787 | 输入框、选择器等交互控件的边框，需与背景达到 3:1。 |

### 品牌

| Token | 亮色 | 暗色 | 用途 |
|---|---|---|---|
| `primary` | #050B14 | #FFFFFF | 唯一的主操作。 |
| `primary-foreground` | #FFFFFF | #050B14 | 主操作上的文字。 |
| `highlight` | #B2ED1D | #B2ED1D | 品牌绿：信号、实时数据、选中、重点区块。 |
| `highlight-foreground` | #050B14 | #050B14 | 品牌绿底上的文字。 |
| `highlight-deep` | #73B200 | #73B200 | 深绿：Logo、品牌图形和大面积的绿色识别。不用于文字和图标（改用 highlight-ink）。 |
| `highlight-ink` | #4B640C | #B2ED1D | 绿色的文字和图标：需要阅读、辨认的绿色元素。 |
| `accent` | #F7FDE8 | #4B640C | 选中行、高亮行的浅绿底。 |
| `ring` | #628210 | #B2ED1D | 键盘焦点环，宽 2px。 |

### 状态

| Token | 亮色 | 暗色 | 用途 |
|---|---|---|---|
| `success` | #2F7657 | #6AD09D | 已完成、已保存、已连接。 |
| `warning` | #A35C00 | #FBBC55 | 需要注意、接近上限。 |
| `destructive` | #DC2626 | #EF4444 | 破坏性操作和错误。 |
| `info` | #2563EB | #60A5FA | 中性提示及提示中的链接。 |

- 组件只使用 light.json / dark.json 主层的 token，不直接使用 base.json 的色值。
- 使用语义工具类：bg-background、text-muted-foreground、border-border。
- 组件中不写物理颜色：不用 #fff、gray-500、bg-white。
- 组件中不写 dark: 分支。深色模式由 .dark 类和 token 层负责。
- 页面不用彩色大面积背景；白底上需要阅读或辨认的绿色（文字、图标、表达状态的圆点）使用 highlight-ink，纯装饰的绿色圆点和色块可用 highlight。
- 不用渐变、玻璃质感、渐变文字、渐变描边或大面积色彩晕染。
- 次要文字（muted-foreground）不放在 muted 背景上；muted 背景上的文字用 foreground。

## Typography

字阶分两套：product 用于产品后台，web 用于官网和宣传物料。

| 字体 | 首选 | 说明 |
|---|---|---|
| display | Inter / PingFang SC | 标题：页面标题、分区标题、官网与 Deck 大标题 |
| sans | IBM Plex Sans / PingFang SC | 正文与界面文字：段落、按钮、表单、标签、导航 |
| mono | IBM Plex Mono / PingFang SC | 代码、命令行、数据路径、数值与读数 |
| sc | PingFang SC / Microsoft YaHei | 中文：使用系统字体 |
| logo | Tektur | Logo 字标 |

### 产品字阶

| 名称 | 字号 | 行高 | 字重 | 用途 |
|---|---|---|---|---|
| typo-h1 | 38px | 46px | 700 | 页面大标题 |
| typo-h2 | 30px | 36px | 600 | 分区标题 |
| typo-h3 | 24px | 32px | 600 | 子标题、弹窗标题。 |
| typo-h4 | 20px | 28px | 500 | 面板、卡片标题 |
| body-lg | 18px | 28px | 400 | 引导语、空状态说明、卡片里的重点说明 |
| body | 16px | 24px | 400 | 官网正文、长段落 |
| body-sm | 14px | 20px | 400 | 产品界面正文（默认） |
| label | 14px | 20px | 500 | 按钮、表单标签、导航 |
| caption | 12px | 16px | 400 | 辅助说明、时间戳、注释 |
| title | 12px | 16px | 500 | 分组小标题 |
| code | 13px | 20px | 400 | 代码、命令行、数据路径、实时读数 |

### 官网字阶

| 名称 | 字号 | 行高 | 字重 | 用途 |
|---|---|---|---|---|
| display | 48px | 60px | 500 | 官网首屏、Deck 封面 |
| typo-h1 | 38px | 46px | 700 | 同产品字阶。 |
| typo-h2 | 30px | 36px | 600 | 同产品字阶。 |
| typo-h3 | 24px | 32px | 600 | 同产品字阶。 |
| typo-h4 | 20px | 28px | 500 | 同产品字阶。 |
| body-lg | 18px | 28px | 400 | 同产品字阶。 |
| body | 16px | 24px | 400 | 官网正文、长段落 |
| body-sm | 14px | 20px | 400 | 卡片说明、辅助段落 |
| label | 14px | 20px | 500 | 导航、按钮、链接 |
| title | 12px | 16px | 400 | 分组小标签 |
| caption | 12px | 16px | 400 | 同产品字阶。 |
| code | 13px | 20px | 400 | 同产品字阶。 |

- 标题用 Inter，正文用 IBM Plex Sans，代码、数据路径与实时读数用 IBM Plex Mono；中文使用系统字体（苹方 / 微软雅黑）；Tektur 只用于 Logo。
- 不引入以上之外的字体。
- 中文标题和中英混排标题字距为 0；只有纯英文标题使用字阶里的负字距。
- 建议最小字号 12px；更小的字号只用于图表刻度等不需要阅读的文字。
- 字重只用 400 / 500 / 600 / 700。
- 实时读数、数据路径、代码用 code 字阶（IBM Plex Mono）；表格里的数字用正文字体并开启等宽数字（tabular-nums）。
- 只用字阶里的字号，不写任意值（如 text-[17px]）。
- 段落之间：body-sm 正文间隔 12px，body 正文间隔 16px（见 spacing.json）。
- 连续的中文长文（文档、帮助）使用 body，行高放宽到 28px。
- 截断：表格单元格、标签、导航单行截断加省略号，并能查看完整内容；卡片说明最多 2 行。
- 文字颜色：标题与正文用 foreground；说明、时间戳用 muted-foreground；绿色文字用 highlight-ink。次要文字不放在 muted 背景上（对比度 4.27:1，低于 4.5:1）。
- 不用斜体做强调。

## Layout

间距：4px 基准网格（1 单位 = 4px），只用下列档位。

| Token | 值 | 用途 |
|---|---|---|
| space.0 | 0px | 无间距：相邻边框合并、表格单元格之间。 |
| space.0-5 | 2px | 微调：图标与文字的基线对齐、选中描边与内容的间隙。 |
| space.1 | 4px | 最小间距：图标与紧贴的文字、徽标内边距、标签行之间。 |
| space.1-5 | 6px | 按钮内图标与文字、Tab 内图标与文字。 |
| space.2 | 8px | 组内间距：同一组控件、表单项的标签与输入框、列表项之间。 |
| space.3 | 12px | 控件水平内边距（输入框、选择器）、表单项之间。 |
| space.4 | 16px | 组间间距：卡片之间、按钮水平内边距、移动端页面边距。 |
| space.6 | 24px | 区块内边距：卡片、面板的内边距；桌面端栅格沟槽与页面边距。 |
| space.8 | 32px | 大区块：弹窗内边距与内部间距、页面内分区之间。 |
| space.12 | 48px | 页面分区之间（产品页面内的大分区、文档页的节）。 |
| space.16 | 64px | 官网与文档：分区之间。 |
| space.24 | 96px | 官网：首屏与正文、主要章节之间。 |

### 断点

| 名称 | 宽度 | 场景 |
|---|---|---|
| sm | 640px | 大屏手机横屏。 |
| md | 768px | 平板竖屏、车间手持终端。 |
| lg | 1024px | 平板横屏、小尺寸工控屏；侧栏从抽屉变为常驻。 |
| xl | 1280px | 笔记本与常见工位显示器。产品界面以此为主设计宽度。 |
| 2xl | 1536px | 大屏显示器、控制室看板。 |

- 所有间距、内边距、组件尺寸取 4 的倍数；只有 space.0-5（2px）允许用于图标与文字的微调和细线偏移。
- 同一层级的元素之间用同一档间距；进入更高一层级时，间距至少升一档（例如组内 8px → 组间 16px → 区块间 32px）。
- 层级优先用间距和 1px 细线区分，不用阴影、不用额外底色。
- 不使用 space 刻度以外的数值（如 10px、14px、18px），改用相邻档位。
- 产品界面默认密度为「紧凑」：控件高 32px、表格行高 40px、卡片内边距 24px；不在同一页面混用两种密度。
- 页面结构固定为：顶部栏 64px + 侧栏 256px（可收起为 48px）+ 内容区；内容区内边距桌面 24px、移动端 16px。
- 内容区使用 12 栏栅格，沟槽桌面 24px、移动端 16px；卡片与面板的宽度取整数栏。
- 连续阅读的文字（说明、文档正文）单行最大宽度 680px；表格、看板、拓扑图不受此限，占满内容区。
- 监控看板按「概览 → 列表 → 详情」从上到下、从左到右排列：关键读数在首屏左上，告警与异常在读数旁，明细在下方。
- 同一页面内对齐线不超过 3 条：内容区左边缘、栅格栏边缘、右侧操作区边缘。
- 1024px 以下侧栏改为抽屉；768px 以下表格改为卡片列表或横向滚动，不压缩列宽到无法阅读。

## Elevation & Depth

阴影。界面层级主要靠 1px 细线和底色；阴影只在两种情况使用：内容浮在页面之上（浮层），以及需要提示「可以按下 / 已被拿起」的交互反馈。

| Token | 值 | 用途 |
|---|---|---|
| shadow.none | none | 默认。页面内所有容器。 |
| shadow.xs | 0 1px 2px 0 rgb(0 0 0 / 0.05) | 交互反馈：按钮、输入框的轻微立体感。 |
| shadow.md | 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) | 浮层：下拉、气泡、提示、通知；拖拽中的元素。 |
| shadow.lg | 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) | 浮层：弹窗、侧滑面板。 |
| shadow.focus | 0 0 0 2px rgb(162 216 26 / 0.2) | 输入框、选择器获得焦点时的外圈；校验失败时同形制，颜色换成 destructive 的 20%。 |

- 页面内的卡片、面板、表格不用阴影，用 1px 细线区分。
- 浮层按离页面的远近用 md / lg：下拉、气泡、提示、通知用 md；弹窗、侧滑面板用 lg。
- 可点击控件（按钮、输入框）可用 xs，提示它们可以被按下；按下或禁用时去掉。
- 拖拽中的卡片、行用 md，表示它被「拿起」。
- 深色模式下阴影不可见，浮层改用 1px border 区分。

## Shapes

圆角。以 4px 为主，接近直角；卡片 6px；最大 8px。圆形元素是唯一的例外。

| Token | 值 | 用途 |
|---|---|---|
| radius.none | 0px | 表格单元格、相邻拼接的面板。 |
| radius.sm | 2px | 标签内的小元素、色块、复选框内勾选区。 |
| radius.md | 4px | 默认：按钮、输入框、选择器、标签、弹窗、下拉。 |
| radius.lg | 6px | 卡片、面板、侧滑面板。 |
| radius.xl | 8px | 上限：截图、视频、插图等大尺寸媒体容器。 |
| radius.full | 9999px | 例外：胶囊徽章、进度条、开关、滑块、头像、状态圆点。 |

- 控件（按钮、输入框、选择器、标签、表格内元素）用 radius.md（4px）。
- 卡片、面板、侧滑面板、图片容器用 radius.lg（6px）。
- 弹窗、下拉、提示等浮层用 radius.md（4px），与控件一致。
- radius.xl（8px）是上限，只用于大尺寸的媒体容器（截图、视频、插图框）。
- 例外：胶囊徽章、进度条、开关、滑块、头像、状态圆点用 radius.full；除此之外不使用全圆角。
- 嵌套时内层圆角不大于外层。

### 线宽

| Token | 值 | 用途 |
|---|---|---|
| border.0 | 0px | 无边框：相邻已由底色区分时。 |
| border.1 | 1px | 默认：分隔线、卡片外框、表格行线、输入框边框。 |
| border.2 | 2px | 焦点环、选中指示、图表强调线。 |

- 分隔、卡片外框、表格行线、输入框边框统一 1px。
- 2px 只用于三种情况：键盘焦点环、选中状态的描边或指示条、图表中需要强调的线。
- 实线为默认；虚线只表示「尚未存在」的东西：新建占位、拖放区域、草稿连线。
- 线的颜色用 color token：分隔与外框用 border，交互控件边框用 input，焦点用 ring。

### 动效

动效：时长与曲线。动效用来说明状态变化和层级关系，不用来装饰。

| Token | 值 | 用途 |
|---|---|---|
| duration.instant | 0ms | 减少动态效果时、实时数据替换。 |
| duration.fast | 150ms | 悬停、按下、颜色变化。 |
| duration.base | 200ms | 浮层出现和消失：下拉、弹窗、提示。 |
| duration.slow | 300ms | 侧滑面板、抽屉、页面区块切换。 |
| duration.signal | 2000ms | 运行指示灯的呼吸周期。 |

| Token | 值 | 用途 |
|---|---|---|
| easing.standard | cubic-bezier(0.4, 0, 0.2, 1) | 移动与变形：已经在屏幕上的元素改变位置或大小，如侧滑面板推入、面板展开收起、列表重排。搭配 duration.slow（300ms）。 |
| easing.enter | cubic-bezier(0, 0, 0.2, 1) | 进入：下拉、气泡、弹窗、通知出现。搭配 duration.base（200ms）。 |
| easing.exit | cubic-bezier(0.4, 0, 1, 1) | 退出：下拉、弹窗、通知关闭；元素被移除。搭配 duration.fast（150ms）。 |

- 只对 opacity、transform、颜色做过渡；不对宽高、布局做动画（数据条的长度变化除外）。
- 悬停、按下用 fast；浮层出现和消失用 base；侧滑面板、页面区块用 slow。
- 进入用 enter 曲线，退出用 exit 曲线，其余用 standard。不用回弹、弹性、过冲。
- 实时数据更新不加数字滚动动画，直接替换；需要提示变化时只闪烁一次背景（base 时长）。
- 同一视图只允许一个持续循环的动效（如运行指示灯的 signal 呼吸）。
- 系统设置为减少动态效果时，所有过渡改为 0ms 或仅透明度变化，循环动效停止。

## Components

Tier0 平台组件以 Tier0-Frontend 的 `packages/ui` 为准；front matter 中的 `components` 只列出最常用的几种，取值全部引用上面的 token。
生成平台应用模版时使用 Tier0-App-Scaffold 自带的组件与主题。

## Do's and Don'ts

**Do**

- Less, but better：优先删减，而非添加
- 每个元素都有明确职责
- 以真实内容表达
- 精确到每一处细节

**Don't**

- 传统工业 4.0：蓝色粒子、发光齿轮、地球连线等
- 错误的工业感：卡通风格、蒸汽朋克、重型机械
- AI Slop：霓虹色渐变、玻璃拟态、多层嵌套的卡片、emoji 图标
