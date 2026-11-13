# 按钮

> 摘要（Buttons）：默认 `sm` 尺寸；页面主操作用品牌绿 `default` 并带前导图标，弹窗和引导确认用黑底 `primary`，并排的次要操作用 `secondary`，工具栏用 `outline`，危险操作用 `destructive` 并先确认。

用 Tier0-Frontend 的按钮变体，默认尺寸 `sm`（高 32px，左右 16px，圆角 4px，14px 500）：

| 变体 | 样子 | 什么时候用 |
|---|---|---|
| `default` | 品牌绿底 `#CEF368`，黑字 | 页面主操作：标题行右侧的「新建」「升级」，卡片里的「Add Seats」「Buy Credits」 |
| `primary` | 黑底白字 | 弹窗、引导流程里的确认（「继续」「Upgrade to Base」），表单提交 |
| `secondary` | 灰底 `#F3F3F3` | 和主操作并排的次要操作（「Remove Seats」） |
| `outline` | 白底细线 | 工具栏、导出、筛选 |
| `ghost` | 无底，悬停变灰 | 行内操作、图标按钮 |
| `destructive` | 红底 | 删除、停机，且先确认 |
| `link` | 文字链接 | 「查看全部」「View usage」 |

- 一个区域只有一个主操作；页面级用 `default`，弹窗和引导流程的确认用 `primary`。
- 带图标的按钮把图标放在 `icon` 属性里（loading 时会被转圈替换）。
