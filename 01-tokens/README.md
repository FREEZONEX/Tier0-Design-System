# 01-tokens

设计系统的唯一真源。所有颜色、字体、间距、圆角、动效的值只在这里定义。

只有颜色分两层：`base.json` 定义色值（品牌色 + 产品色），`light.json` / `dark.json` 按用途映射到浅色和深色主题。其他类别不随主题变化，每类一个文件。

| 文件 | 内容 | 状态 |
|---|---|---|
| `color/base.json` | 品牌色（5 个）、色阶（绿、黑、灰）、辅助色（8 个色相） | 已定 |
| `color/light.json` | 浅色主题：主层 18 个（表面与文字、品牌、状态）+ 产品扩展 | 已定 |
| `color/dark.json` | 深色主题：同上 | 已定 |
| `typography.json` | 字体、字重、字阶（11 级） | 已定 |
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

**品牌**：主操作用近黑；品牌绿是品牌层面唯一的颜色，每个区域只有一个绿色焦点。

| Token | 用途 |
|---|---|
| `primary` | 唯一的主操作 |
| `primary-foreground` | 主操作上的文字 |
| `highlight` | 品牌绿：信号、实时数据、选中、重点区块。只以色块、圆点、粗条出现，上面放近黑文字 |
| `highlight-foreground` | 品牌绿底上的文字 |
| `highlight-deep` | 深绿：白底上需要绿色识别性的文字、线条、图标或 Logo |
| `accent` | 选中行、高亮行的浅绿底 |
| `ring` | 键盘焦点环 |

**状态**：只用于真实的结果，并且总是配合图标或文字。

| Token | 用途 |
|---|---|
| `success` | 已完成、已保存、已连接 |
| `warning` | 需要注意、接近上限 |
| `destructive` | 破坏性操作和错误 |
| `info` | 中性提示及提示中的链接 |

**品牌绿怎么出现**

品牌绿 `#B2ED1D` 在白底上对比度很低，因此：

- 只以色块、圆点、粗条的形式出现，上面放近黑文字（`#050B14`）。
- 不用作白底上的文字、细线和图标。
- 白底上需要绿色识别性的文字、线条、图标或 Logo，改用深绿 `#73B200`（`highlight-deep`）。

**规则**

1. 使用语义工具类：`bg-background`、`text-muted-foreground`、`border-border`。
2. 组件中不写物理颜色：不用 `#fff`、`gray-500`、`bg-white`。
3. 组件中不写 `dark:` 分支。深色模式由 `.dark` 类和 token 层负责。
4. 品牌绿不用于大面积背景和装饰，也不用作白底上的文字、细线和图标（改用 `highlight-deep`）。
5. 不用渐变文字、渐变描边或大面积色彩晕染。

`extended` 分组是前端现有的细分 token（如 `bg-secondary`、`success-tertiary`），保留用于兼容，新组件优先使用主层。

## 字体

| 用途 | 字体 | Token |
|---|---|---|
| 标题 | Inter | `font.family.display` |
| 正文与界面文字 | IBM Plex Sans | `font.family.sans` |
| 代码、数据路径、数值 | IBM Plex Mono | `font.family.mono` |
| 中文 | IBM Plex Sans SC | `font.family.sc`（作为以上三种的中文回落） |
| Logo 字标 | Tektur | `font.family.logo`（仅 Logo，交付时转为路径） |

**字阶**

| Token | 字体 | 字号 / 行高 | 字重 | 用途 |
|---|---|---|---|---|
| `display` | Inter | 48 / 56 | 500 | 官网首屏、Deck 封面，每页最多一次 |
| `typo-h1` | Inter | 38 / 46 | 700 | 页面大标题 |
| `typo-h2` | Inter | 30 / 36 | 600 | 分区标题 |
| `typo-h3` | Inter | 24 / 32 | 600 | 子标题、弹窗标题 |
| `typo-h4` | Inter | 20 / 28 | 500 | 面板、卡片标题 |
| `body` | IBM Plex Sans | 16 / 24 | 400 | 官网正文、长段落 |
| `body-sm` | IBM Plex Sans | 14 / 20 | 400 | 产品界面正文（默认） |
| `label` | IBM Plex Sans | 14 / 20 | 500 | 按钮、表单标签、导航 |
| `caption` | IBM Plex Sans | 12 / 16 | 400 | 辅助说明、时间戳，最小字号 |
| `overline` | IBM Plex Sans | 11 / 16 | 500 | 全大写分组小标题，仅英文 |
| `code` | IBM Plex Mono | 13 / 20 | 400 | 代码、命令行、数据路径 |

**规则**

1. 不引入以上之外的字体。
2. 中文字间距为 0；标题的负字间距只对英文生效。
3. 最小字号 12px（`overline` 除外，且只用于英文大写）。
4. 字重只用 400 / 500 / 600 / 700。
5. 表格和读数中的数字使用等宽数字（tabular-nums）。
6. 不用斜体做强调。
