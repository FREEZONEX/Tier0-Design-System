# 按钮

- 用 Tier0-Frontend 的按钮变体：`primary`（黑底）、`default`（品牌绿底 `button-highlight`，即 fx-green 300，前端的默认值）、`outline`（白底细线）、`secondary`（浅灰底）、`ghost`（无底，悬停变灰）、`destructive`、`link`。尺寸默认 `sm`（`control-sm`），表单里用 `md`（`control-md`），页面主操作可用 `lg`（`control-lg`）。
- 一个视图只有一个主操作，用 `primary`；品牌绿的 `default` 只给需要特别强调的工作流操作，使用时显式写出 variant，不依赖默认值。
- 正例：表单底部「取消」（outline）+「保存」（primary）；列表右上角「导出」用 outline，「运行」用 default。
