# 01-tokens

设计系统的唯一真源。所有颜色、字体、间距、圆角、动效的值只在这里定义。

只有颜色分两层：`base.json` 定义色值（品牌色 + 产品色），`light.json` / `dark.json` 按用途映射到浅色和深色主题。其他类别不随主题变化，每类一个文件。

| 文件 | 内容 | 状态 |
|---|---|---|
| `color/base.json` | 品牌色（5 个）、色阶（绿、黑、灰）、辅助色（8 个色相） | 已定 |
| `color/light.json` | 浅色主题：主层 18 个（表面与文字、品牌、状态）+ 产品扩展 | 已定 |
| `color/dark.json` | 深色主题：同上 | 已定 |
| `typography.json` | 字体、字重、字阶（11 级） | 已定 |
| `spacing.json` | 间距刻度、按用途的间距、控件与行高 | 初稿 |
| `radius.json` | 圆角：4px 为主，卡片 6px，上限 8px，圆形元素例外 | 初稿 |
| `border.json` | 线宽与线型 | 初稿 |
| `shadow.json` | 阴影：只用于浮层与交互反馈 | 初稿 |
| `motion.json` | 时长、曲线 | 初稿 |
| `layout.json` | 断点、页面结构、栅格、内容宽度 | 初稿 |

格式采用 W3C Design Tokens（DTCG）。用途映射里的每个 token 都要写明用在哪、不用在哪。

CSS、Tailwind、Figma 变量等成品文件不放在仓库里，需要时由脚本在构建时生成。

命名与前端 `packages/theme` 保持一致，不另起一套。

## 规则写在哪（一条规则只写一处）

| 内容 | 唯一位置 |
|---|---|
| 值（颜色、字号、间距、圆角、阴影、时长、断点） | 本目录的 JSON |
| 选哪个值（如「控件用 radius.md」） | 对应 JSON 的 `$extensions.tier0.rules`，门户「使用规则」读取这里 |
| 组件和页面怎么搭（侧栏、按钮、状态标签、窄屏适配…） | `02-components/guidelines/` |
| 给 AI 的总说明 | `DESIGN.md`，由 `scripts/build_design_md.py` 生成，不手改 |

本文件不再重复列出值和规则；查值看 JSON 或门户，查用法看上表。

