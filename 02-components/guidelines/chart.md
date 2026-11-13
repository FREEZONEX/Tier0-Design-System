# 图表

> 摘要（Charts）：单系列用 `foreground`，多系列用辅助色并在线旁标注；阈值线用 destructive。

- 单系列曲线用 `foreground`；多系列用辅助色，并直接在线旁标注名称，少用图例。
- 阈值线用 destructive 的 `border.1` 线并标注数值；超过阈值的那一段可以改为 destructive。
- 刻度和坐标文字用 `caption`、`muted-foreground`；网格线用 `border` 色。
