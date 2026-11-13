## Overview

Tier0 为制造业构建 Agentic 工业数据平台：工厂设备和业务系统的数据只接入一次，语义化集成后，AI Agent 在这层数据上持续分析、执行和生成应用。**Connect once, Reuse everywhere.**

界面要像一台精密、可靠的工程工具：近单色、安静、精确。白底和 1px 细线组织结构，品牌绿只出现在需要被注意的地方，边角接近直角，画面以真实的产品和数据为主，不靠装饰取胜。

- **产品界面**：高密度的工业工作台。紧凑、跟手，用间距和细线分组。
- **官网与宣传物料**：同一套颜色和字体，字阶放大、留白更多，可以使用品牌图形（方块标记、层级树、点阵）。

数值以 `01-tokens/` 为准，本文件 front matter 是它的摘录；组件的逐条用法见 `02-components/guidelines/`；取舍顺序和分阶段工作法见 `.agents/skills/tier0-design/SKILL.md`。

## Colors

近单色：黑、白、灰承担绝大部分界面，品牌绿是唯一的强调色。

- **Foreground `{{colors.foreground}}`**：标题、正文，也是主按钮（`primary`）的底色。
- **Background / Card `{{colors.background}}`**：页面和卡片都是白底，用 `border` 细线分开。
- **Subtle `{{colors.subtle}}`**：侧栏、表头、悬停的列表行。
- **Muted `{{colors.muted}}`**：导航项的悬停和选中、空状态图标的底块。
- **Muted-foreground `{{colors.muted-foreground}}`**：说明、时间戳、单位。不放在 `muted` 底上。
- **Border `{{colors.border}}` / Input `{{colors.input}}`**：分隔和外框用 `border`，表单控件的边框用 `input`。
- **Highlight `{{colors.highlight}}`（品牌绿）**：运行状态圆点、实时数据、官网的重点区块。白底上要阅读的绿色文字和图标用 `highlight-ink` `{{colors.highlight-ink}}`；强调按钮用 `button-highlight` `{{colors.button-highlight}}`，悬停 `{{colors.button-highlight-hover}}`。
- **状态色**：success `{{colors.success}}`、warning `{{colors.warning}}`、destructive `{{colors.destructive}}`、info `{{colors.info}}`，只表达真实的结果。状态标签直接沿用 `AntTag` 的主题色阶与样式，不另写透明度底色；整页横幅用 4% 底加 30% 描边。
- **辅助色**（`red-500`、`blue-500` 等）只用于图表系列和分类标签。

组件里只写语义类（`bg-background`、`text-muted-foreground`、`border-border`），不写 `bg-white`、`gray-500` 这类物理颜色，也不写 `dark:` 分支。暗色模式由 `.dark` 类切换同名 token：

{{themes}}

## Typography

- **产品字阶**：页面标题 `typo-h2` 30/36 Inter 600（前端 `text-3xl font-semibold`），标题下的说明 14/20 500 用 `text-secondary`；区块标题 20/28 Inter 500；弹窗标题 `typo-h3` 24/32；正文 `body-sm` 14/20；标签和按钮 `label` 14/20 500；说明 `caption` 12/16。`typo-h1`、`typo-h2` 只用于官网和文档。
- **官网、海报、Slides**：用 `web-*` 字阶，按画幅放大，字体和字重不变。
{{rules.typography}}

## Layout

- **4px 基准**：间距只取 front matter `spacing` 里的档位（4、8、12、16、24、32、48、64、96）；2px、6px 只用于图标与文字之间的微调。
- **用间距表达分组**：组内并列元素间隔 {{spacing.group-item}}（`group-item`），组与组之间 {{spacing.group}}（`group`），区块之间 {{spacing.section}}（`section`，官网 {{spacing.section-web}}）。每进入更高一层，间距至少升一档。
- **紧凑密度**：按钮高 {{spacing.control-sm}}（`control-sm`），表单控件 {{spacing.control-md}}（`control-md`），表格行 {{spacing.table-row}}，卡片内边距 {{spacing.card-padding}}。同一页面不混用两种密度。
- **应用骨架**：左侧导航 {{layout.shell.sidebar}}（收起 {{layout.shell.sidebar-collapsed}}）加右侧工作区，工作区内边距 {{layout.shell.page-padding}}（移动端 {{layout.shell.page-padding-mobile}}）。默认不放顶栏。做法见 `02-components/guidelines/app-shell.md`。
- **栅格与容器**：{{layout.grid.columns}} 栏，沟槽 {{layout.grid.gutter}}（移动端 {{layout.grid.gutter-mobile}}）；产品内容区最宽 {{layout.width.content-max}}，官网 {{layout.width.web-max}}；连续阅读的文字单行最宽 {{layout.width.measure}}。
- **响应式**：小于 {{layout.breakpoint.md}} 时侧栏变成组件自带的抽屉；表格只在自身容器内横向滚动，页面不横向溢出。做法见 `02-components/guidelines/page-layout.md`。
- 并排的区块按各自内容定高、顶部对齐，不为对齐拉高、留出空白。

## Elevation & Depth

层级优先用 1px 细线和「白 + 浅灰」两层表面来表达。阴影只给离开页面平面的东西。

- **卡片、面板、表格**：不加阴影，用 `border: 1px solid var(--border)`。
- **下拉、气泡提示、通知**：`box-shadow: {{shadow.md}}`（`shadow.md`）。拖拽中的卡片也用它。
- **弹窗、侧滑面板**：`box-shadow: {{shadow.lg}}`（`shadow.lg`），遮罩 `rgb(0 0 0 / 0.5)`。
- **按钮、输入框**：可用 `box-shadow: {{shadow.xs}}`（`shadow.xs`），按下或禁用时去掉。
- **暗色模式**：阴影看不见，浮层改用 1px `border` 描边区分。

## Shapes

形状接近直角，显得利落、精确。

- **4px**（`rounded.md`）：按钮、输入框、标签、弹窗、下拉、提示。
- **6px**（`rounded.lg`）：卡片、面板、图片容器。
- **8px**（`rounded.xl`）是上限，只给大尺寸的截图、视频、插图框。
- **全圆角**只给胶囊徽章、进度条、开关、滑块、头像、状态圆点。
- 嵌套时内层圆角不大于外层；侧滑面板贴边的两角为 0。
- **线宽**：分隔和外框 1px；选中描边和指示条 2px。实线是默认；虚线只表示还不存在的东西（新建占位、拖放区域、草稿连线）。
- **键盘焦点**：输入框和选择器用 `box-shadow: {{shadow.focus}}`；按钮等其他控件用 3px 外圈，颜色为 `ring` 的 50% 透明度。

## Components

凡是产品页面，包括原型、演示页和本地测试页，一律用 Tier0-Frontend `packages/ui` 的组件实现（副本在 `02-components/packages/ui`），不手写 HTML 仿制按钮、侧栏、表格。外壳（侧栏、页面标题、页签、区块）按 `02-components/guidelines/app-shell.md` 搭，它对应 `apps/saas-dashboard` 的写法；只用基础组件拼不出产品的样子。每个组件的逐条用法见 `02-components/guidelines/`。

{{components}}
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
- 把原型的状态切换、方案切换混进产品界面（放到右下角的原型控制面板）。
- 回弹、弹性、过冲的动效；实时数据的数字滚动动画。
- 用文字代替 Tier0 Logo 的 SVG。
