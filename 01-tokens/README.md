# 01-tokens

设计系统的唯一真源。所有颜色、字体、间距、圆角、动效的值只在这里定义。

只有颜色分两层：`base.json` 定义品牌色本身，`light.json` / `dark.json` 按用途映射到浅色和深色主题。其他类别不随主题变化，每类一个文件。

| 文件 | 内容 | 状态 |
|---|---|---|
| `color/base.json` | 品牌色：light green、deep green、black、white | 已定 |
| `color/light.json` | 浅色主题：背景、文字、边框、品牌的用途映射 | 待编写 |
| `color/dark.json` | 深色主题：同上 | 待编写 |
| `typography.json` | 字体、字号、行高、字重 | 待编写 |
| `spacing.json` | 间距 | 待编写 |
| `radius.json` | 圆角 | 待编写 |
| `border.json` | 线宽 | 待编写 |
| `shadow.json` | 阴影 | 待编写 |
| `motion.json` | 时长、曲线 | 待编写 |
| `layout.json` | 断点、栅格、内容宽度 | 待编写 |

格式采用 W3C Design Tokens（DTCG）。用途映射里的每个 token 都要写明用在哪、不用在哪。

CSS、Tailwind、Figma 变量等成品文件不放在仓库里，需要时由脚本在构建时生成。
