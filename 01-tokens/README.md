# 01-tokens

设计系统的唯一真源。所有颜色、字体、间距、圆角、动效、音效的值只在这里定义。

| 目录 | 内容 |
|---|---|
| `base/` | 原始值：颜色、字体、间距、圆角、线宽、阴影、动效、布局 |
| `semantic/` | 用途层：背景、文字、边框、品牌（light / dark） |

格式采用 W3C Design Tokens（DTCG）。每个 semantic token 必须写明 `usage`（用在哪）和 `avoid`（不用在哪）。

CSS、Tailwind、Figma 变量等成品文件不放在仓库里，需要时由脚本在构建时生成。
