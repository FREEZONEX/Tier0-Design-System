# 侧边栏

配置与来源见 [`app-shell.md`](app-shell.md)，不要采用基础组件未经覆盖的默认宽度。

- `SidebarProvider` 设置展开 240px、收起 64px；小于 768px 用组件自带抽屉，宽 288px 且不超过视口。
- 底色 `bg-bg-tertiary`，右侧仅一条 1px 线；顶部是工作区切换，右上角必须有 `SidebarTrigger`。收起后仍能展开。
- 分组标题 12px muted；导航项高 32px、14px 文字、16px lucide 图标、圆角 4px。
- 当前项和悬停用 `bg-bg-accent` 灰底，当前项 500 字重，不用品牌绿。
- `SidebarFooter` 保留 `ComAvatar` 账户入口和通知入口；导航内容独立滚动。收起时保留可操作图标及提示，有升级卡片时与账户区之间保留一条分隔线，其余位置不加线。
- 工作区随展开、收起同步变化，不能被桌面侧栏遮挡；窄屏抽屉关闭后不保留侧栏占位。详见 [`page-layout.md`](page-layout.md)。
