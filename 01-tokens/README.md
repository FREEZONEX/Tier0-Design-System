# 01-tokens

设计系统的唯一真源。所有颜色、字体、间距、圆角、动效、音效的值只在这里定义。

| 目录 | 内容 | 是否手改 |
|---|---|---|
| `base/` | 原始值：`color` `typography` `size` `motion` `sound` | 是 |
| `semantic/` | 用途层：背景、文字、边框、信号、状态（light / dark） | 是 |
| `dist/` | 生成物：CSS、Tailwind、Figma Variables、PPT 主题 | 否，由脚本生成 |

格式采用 W3C Design Tokens（DTCG）。每个 semantic token 必须写明 `usage`（用在哪）和 `avoid`（不用在哪）。

状态：待编写。
