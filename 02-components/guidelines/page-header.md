# 页面标题

- 按前端 `SettingComHeader`：标题 `text-3xl font-semibold`（30–32px，Inter 600）；说明 `text-sm font-medium text-text-secondary`（14/20，`#242424`），在标题下 8px。不要写裸 `<h1 className="text-3xl">`：前端主题给 `h1` 设了全局 `text-5xl`，会变成 48px；用 `typo-h2` 类或 `<span>`。
- 计数和状态写进说明行，用 `·` 分隔；失败或超限的数字用 destructive 文字。
- 页面主操作放在标题行右侧，用品牌绿 `default` 按钮并带前导图标。
- 下方需要分视图时用下划线页签，见 `app-shell.md`。
