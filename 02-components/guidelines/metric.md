# 读数与指标

> 摘要（Metric）：说明 → 数值 → 单位；卡片主读数用 `metric-lg`，一排小读数用 `metric`；只有超过已知阈值才变 destructive，并写明阈值。

- 卡片里的主读数：32px Inter 500（`metric-lg`），分母或单位紧跟（14px muted），如「6 / 10」「806 / 1,500」；旁边可写占比（14px muted）。
- 一排紧凑的小读数用 `metric`（22/28）。
- 数值用 `foreground`；只有表达真实状态时才上色（超限用 destructive），不因为「好」就变绿。
- 有用量时，读数下方放分段进度条，再下一行写来源拆分（「Plan 1 / 1」「Purchased 5 / 9」，12px muted 标签 + 14px 数值）。
