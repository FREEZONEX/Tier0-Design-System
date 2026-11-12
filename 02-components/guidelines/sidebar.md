# 侧边栏

- 按 Tier0-Frontend 的 sidebar 组件：每项高 `nav-item`，左侧 lucide 图标 `icon-sm`，图标和文字间隔 `inline`，文字 `body-sm`。
- 文字用 `foreground`。悬停：`muted` 灰底，过渡用 fast；当前项：`muted` 灰底 + 500 字重。导航不用品牌绿，绿色留给业务指标和关键操作。
- 可以收起为只显示图标的窄栏，展开收起用 slow + standard 过渡；分组标题用 `caption`、`muted-foreground`，正常大小写。
