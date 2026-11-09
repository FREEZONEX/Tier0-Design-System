# 01-tokens

设计系统的唯一真源。所有颜色、字体、间距、圆角、动效的值只在这里定义。

只有颜色分两层：`base.json` 定义色值（品牌色 + 产品色），`light.json` / `dark.json` 按用途映射到浅色和深色主题。其他类别不随主题变化，每类一个文件。

| 文件 | 内容 | 状态 |
|---|---|---|
| `color/base.json` | 品牌色（5 个）、色阶（绿、黑、灰）、辅助色（8 个色相） | 已定 |
| `color/light.json` | 浅色主题：主层 18 个（表面与文字、品牌、状态）+ 产品扩展 | 已定 |
| `color/dark.json` | 深色主题：同上 | 已定 |
| `typography.json` | 字体、字号、行高、字重 | 待编写 |
| `spacing.json` | 间距 | 待编写 |
| `radius.json` | 圆角 | 待编写 |
| `border.json` | 线宽 | 待编写 |
| `shadow.json` | 阴影 | 待编写 |
| `motion.json` | 时长、曲线 | 待编写 |
| `layout.json` | 断点、栅格、内容宽度 | 待编写 |

格式采用 W3C Design Tokens（DTCG）。用途映射里的每个 token 都要写明用在哪、不用在哪。

CSS、Tailwind、Figma 变量等成品文件不放在仓库里，需要时由脚本在构建时生成。

命名与前端 `packages/theme` 保持一致，不另起一套。

## 颜色用途 token

组件只使用 `light.json` / `dark.json` 主层的语义名称，不直接使用色阶。

**表面与文字**

| Token | 用途 |
|---|---|
| `background` | 页面底色 |
| `foreground` | 正文与标题 |
| `card` | 实色表面：面板、弹窗、产品界面截图的容器 |
| `subtle` | 大面积分区底色：卡片区、表格区 |
| `muted` | 悬停填充、行内代码、输入框底 |
| `muted-foreground` | 说明、次要标签、时间戳 |
| `border` | 单元格之间、卡片周围的细线 |

**品牌**：主操作用黑色；品牌绿每屏只出现一次：信号、高亮，或一个结果。

| Token | 用途 |
|---|---|
| `primary` | 唯一的主操作 |
| `primary-foreground` | 主操作上的文字 |
| `highlight` | 品牌绿：信号、高亮按钮、重点标记 |
| `highlight-foreground` | 品牌绿底上的文字 |
| `highlight-deep` | 品牌绿对比度不够时使用：白底上的强调字、白底版 Logo |
| `accent` | 选中行、高亮行的浅绿底 |
| `ring` | 键盘焦点环 |

**状态**：只用于真实的结果，并且总是配合图标或文字。

| Token | 用途 |
|---|---|
| `success` | 已完成、已保存、已连接 |
| `warning` | 需要注意、接近上限 |
| `destructive` | 破坏性操作和错误 |
| `info` | 中性提示及提示中的链接 |

**规则**

1. 使用语义工具类：`bg-background`、`text-muted-foreground`、`border-border`。
2. 组件中不写物理颜色：不用 `#fff`、`gray-500`、`bg-white`。
3. 组件中不写 `dark:` 分支。深色模式由 `.dark` 类和 token 层负责。
4. 品牌绿不用于大面积背景、装饰、图标和箭头。
5. 不用渐变文字、渐变描边或大面积色彩晕染。

`extended` 分组是前端现有的细分 token（如 `bg-secondary`、`success-tertiary`），保留用于兼容，新组件优先使用主层。
