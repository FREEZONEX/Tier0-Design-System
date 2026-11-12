# 应用外壳

产品页面使用 Tier0-Frontend 的侧栏组件与应用层配置。左侧导航 + 右侧工作区；顶栏只在承载面包屑、搜索或全局操作时出现。宽度以实际应用的 `SidebarProvider` 配置为准，见下方来源；底部账户与通知是产品外壳的补充要求，不代表当前上游应用已全部实现。

## 左侧导航（AppSidebar）

- 展开宽 240px（`shell.sidebar`），收起宽 64px（`shell.sidebar-collapsed`），移动端抽屉宽 288px（`shell.sidebar-mobile`，不超过视口）。底色 `bg-bg-tertiary`（grey-50 `#F9F9F9`），右侧 1px `border` 分隔，内边距 16px。
- 顶部是工作区切换：字母头像（方块，工作区识别色浅底）+ 工作区名（14px，600）+ 上下箭头；收起按钮固定在侧栏头部右上角，用 `SidebarTrigger`，不放到右侧工作区。不在这里放 Tier0 Logo。
- 分组标题（UNS、App、Anchor）：12/16，`text-text-tertiary`（`#878787`），正常大小写，左右内边距 8px。
- 导航项：高 32px，左右内边距 8px，圆角 4px，16px lucide 图标 + 14/20 文字，图标和文字间隔 8–12px。
- 当前项：`bg-bg-accent`（grey-100 `#F3F3F3`）+ 500 字重；悬停同色。不用品牌绿。
- 底部使用 `SidebarFooter` 放账户头像（`ComAvatar`）和通知入口；导航内容独立滚动，底部入口保持可见。账户行左侧是头像，中间是单行省略的用户名，右侧是通知铃铛；头像与名称打开账户菜单，通知打开通知列表，真实未读数用铃铛右上角的计数徽标；没有通知显示空状态，不伪造未读数。收起时保留头像和通知图标，隐藏文字，提供可访问名称和提示。
- 收起后保留展开按钮；使用同一侧栏状态控制图标、宽度和工作区，不额外叠加固定宽度或偏移。
- 有套餐升级入口时，在账户区上方放升级卡片：品牌绿浅底、1px 品牌绿描边（fx-green 300），标题 14px 500 + 说明 12px muted，右侧品牌绿圆形操作图标。收起时隐藏卡片，不挤占图标列。
- 升级卡片与底部账户行之间保留一条细分隔线，表示套餐区域与个人账户的职责边界；不在头像、用户名和通知之间加线。没有升级区时不保留空分隔线。

### 调用结构

照 `apps/saas-dashboard` 的 `AppSidebar` 写，不在侧栏外层自己加 padding 或容器；否则收起后图标不居中、底部头像和通知对不齐。

```tsx
<SidebarProvider style={{ '--sidebar-width': '15rem', '--sidebar-width-icon': '4rem' }}>
  <Sidebar collapsible="icon">
    <SidebarHeader className="flex h-16 flex-row items-center justify-between p-4">
      {state !== 'collapsed' && <工作区切换 />}
      <SidebarTrigger className="size-8 cursor-pointer" />
    </SidebarHeader>
    <SidebarContent>
      {groups.map(g => (<>
        {state === 'collapsed' && <SidebarSeparator className="mx-auto w-6!" />}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className={state === 'collapsed' ? 'hidden' : 'flex'}>{g.name}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-4">
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={label} isActive={active}>
                  <ComSafeLink href={href} className="h-8 px-2 text-sm"><Icon /><span>{label}</span></ComSafeLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </>))}
    </SidebarContent>
    {state !== 'collapsed' && <升级卡片 />}
    <SidebarFooter>
      <SidebarMenu className="px-4">{/* 头像和通知也用 SidebarMenuButton，收起时自动居中 */}</SidebarMenu>
    </SidebarFooter>
  </Sidebar>
  <SidebarInset className="h-full min-w-0">…</SidebarInset>
</SidebarProvider>
```

- 收起时：分组标题隐藏，组与组之间用 `w-6` 的短分隔线；`SidebarMenuButton` 由组件强制成 32px 方块并居中，不要再给菜单项写宽度或外边距。
- 底部账户和通知同样放进 `SidebarMenu px-4` 的 `SidebarMenuButton`；收起后分两行（头像、铃铛），未读改成右上角小红点，完整数量放进提示。

### 宽度来源与接入

- `apps/saas-dashboard/app/ws/[workspaceId]/(pages)/layout.tsx` 和 `apps/platform-admin/app/(pages)/layout.tsx` 均在 `SidebarProvider` 设置 `--sidebar-width: 15rem`、`--sidebar-width-icon: 4rem`（根字号 16px 时为 240px / 64px）。接入时显式传入这两个配置。
- `packages/ui/components/ui/sidebar.tsx` 的 16rem / 3rem 是基础组件默认值，不是产品外壳宽度；移动抽屉使用该组件的 18rem。不要改基础组件副本来代替应用层配置。
- `packages/hooks/src/use-mobile.ts` 的移动断点为 768px。
- 本地 `AppSidebar` 仍使用 Logo 头部且底部菜单被注释，与用户确认的工作区切换侧栏参考图存在差异。产品外壳采用参考图的工作区切换、右上角收起、升级卡片和底部账户通知结构；宽度、折叠机制与组件 API 仍以应用代码为准。不要将此结构说明误认为上游已经完成同步。

## 二级导航（设置类页面）

- 宽 248px，白底，右侧 1px `border`；分组标题带 14px 图标，12px muted；项高 32px，当前项灰底 + 500 字重。

## 工作区

- 工作区内边距使用 `shell.page-padding`（24px），移动端用 `shell.page-padding-mobile`（16px），宽度随剩余空间变化。旧原型的 36–40px 测量值不作为通用规则。
- 优先组合 `SidebarProvider`、`Sidebar`、`SidebarInset`，保留组件占位；自定义布局用 `auto minmax(0, 1fr)` 或可收缩的 flex 工作区，工作区及表格容器设 `min-width: 0`。不在侧栏旁使用 `100vw` 工作区，也不重复添加侧栏宽度的左边距。
- 小于 768px 时使用侧栏自带的 `Sheet` 抽屉，关闭时不占工作区宽度；工作区提供打开导航的入口，抽屉内保留关闭入口。遮罩、Esc 关闭与焦点返回沿用组件行为。
- 标题与操作、筛选栏允许换行；指标卡随宽度减列。表格仅在自身容器内横向滚动，页面本身不能横向溢出。
- 面包屑（可选）：12px muted，在标题上方 8px。

## 页面标题（SettingComHeader）

- 标题：`text-3xl font-semibold`（30–32px，Inter 600）。注意：前端主题给裸 `<h1>` 设了全局样式 `text-5xl`（48px），会压过 `text-3xl`；前端的 `SettingComHeader` 用 `<span>`。自己写标题时用 `<h1 className="typo-h2">`，或沿用 `<span>`。
- 说明：`text-sm font-medium text-text-secondary`（14/20，500，`#242424`），在标题下 8px；不是 muted 灰。
- 计数或状态写在说明行里，用 `·` 分隔，失败数用 destructive 文字（如「8 个数据源 · 14 个绑定 · 2 个失败」）。
- 页面主操作在标题行右侧：品牌绿 `default` 按钮，带前导图标（如 `Plus` +「新建数据源」）。

## 页签

- 标题下方是下划线页签（`cn-tabs`）：14px，未选中 muted，选中 foreground + 2px 品牌绿下划线；页签可带 lucide 图标或灰底计数（12px，`bg-bg-accent`，圆角 4px）。
- 页签下方使用组件自带的 1px `border`，不再叠加一条分隔线。

## 区块

- 区块标题：20/28，Inter 500（如「Current Plan」），和下方内容间隔 16px，区块之间 32–40px。
- 卡片：白底、1px `border`、圆角 6px、内边距 20–24px；底部操作条用 `bg-bg-subtle`（`#FCFCFC`）+ 上边 1px 线。
- 卡片里的大读数：32px Inter 500，后跟「/ 10」这类分母（14px muted）。

## 筛选栏和提示

- 筛选栏：一行 32px 高的组合控件（视图切换、分组、类型），带图标和灰色前缀标签；搜索框靠右。
- 失败汇总横幅：整行，destructive 浅底 + 浅红描边，左侧图标和汇总，右侧「查看全部」链接。

## 分割线

- 仅保留承担结构作用的边界：侧栏与工作区、表格外框与行分隔、页签自身底线。同一边界只画一次。
- 标题与内容、筛选栏与表格优先用间距分组；底部仅在升级区与账户区之间保留一条线，其余导航分组用间距区分，不额外插入 `Separator`；没有实际分区内容时不留空分隔线。
- 不用全局去掉所有边框来修复多余分割线，保留组件需要的输入框、焦点和表格边界。

## 原型控制

- 浮在右下角，宽约 320px，白底、1px `border`、圆角 6px、`shadow-lg`。
- 标题行：品牌绿浅底的「原型」小标签 + 当前方案名 + 收起箭头；每个变量一行，左侧 12px muted 标签，右侧分段控件（选中白底 + 阴影）。
- 收起后是一条小横条：绿色圆点 +「原型控制」+ 进度（如「1 / 4」）。
