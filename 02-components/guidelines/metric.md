# 读数与指标

- 结构：上方说明文字（`body-sm`，`muted-foreground`）→ 数值（`metric` 或 `metric-lg`，Inter 500，等宽数字）→ 单位紧跟数值（`body-sm`，`muted-foreground`）。
- 字号按画面层级选：一排同级指标都用 `metric`；只有画面里单独突出的那一个关键数字用 `metric-lg`。不因数值长短改字号。
- 数值本身用 `foreground`；只有表达真实状态时才上色（如超限的温度用 destructive），不因为「好」就变绿。
- 正例：`主轴温度` / `72.4` `°C`；有阈值且超出时数值变 destructive，并在旁边写明阈值。不知道阈值时不上色，也不编造阈值。
