# 图标

> 摘要（Icons）：只用 lucide，按钮和列表里 `icon-sm`，颜色跟随文字。

- 统一用 lucide 图标（shadcn/ui 默认图标库），不混用其他图标库，不用 emoji。
- 尺寸：按钮、表格、输入框、侧栏里 `icon-sm`，空状态 `icon-lg`；线宽保持 lucide 默认；颜色跟随文字（`currentColor`）。
- 用 lucide 的包（React 项目用 `lucide-react`，独立页面用 lucide 官方的 npm 包或 CDN 脚本），不凭记忆手写图标路径。
- 图标不放进彩色底块做装饰；只有空状态的图标放在浅灰（`muted`）方块里。
