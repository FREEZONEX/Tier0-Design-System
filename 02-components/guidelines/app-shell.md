# 应用外壳

产品页面的外壳按 Tier0-Frontend `apps/saas-dashboard` 的写法：左侧导航 + 右侧工作区，没有顶栏。数值量自现有原型（Plan & Billing、Connect、Onboarding、Plans and Orders），和前端代码一致的地方注明了 class。

## 左侧导航（AppSidebar）

- 宽 234–240px，底色 `bg-bg-tertiary`（grey-50 `#F9F9F9`），右侧 1px `border` 分隔，内边距 16px。
- 顶部是工作区切换：字母头像（方块，品牌色浅底）+ 工作区名（14px，600）+ 上下箭头；右侧可放收起按钮。不在这里放 Tier0 Logo。
- 分组标题（UNS、App、Anchor）：12/16，`text-text-tertiary`（`#878787`），正常大小写，左右内边距 8px。
- 导航项：高 32px，左右内边距 8px，圆角 4px，16px lucide 图标 + 14/20 文字，图标和文字间隔 8–12px。
- 当前项：`bg-bg-accent`（grey-100 `#F3F3F3`）+ 500 字重；悬停同色。不用品牌绿。
- 底部可放升级卡片：白底、1px 品牌绿描边（fx-green 300），标题 14px 500 +说明 12px muted，右侧品牌绿圆形图标按钮。

## 二级导航（设置类页面）

- 宽 248px，白底，右侧 1px `border`；分组标题带 14px 图标，12px muted；项高 32px，当前项灰底 + 500 字重。

## 工作区

- 内容区左右内边距 36–40px，顶部约 40px；内容不设最大宽度时跟随窗口。
- 面包屑（可选）：12px muted，在标题上方 8px。

## 页面标题（SettingComHeader）

- 标题：`text-3xl font-semibold`（30–32px，Inter 600）。注意：前端主题给裸 `<h1>` 设了全局样式 `text-5xl`（48px），会压过 `text-3xl`；前端的 `SettingComHeader` 用 `<span>`。自己写标题时用 `<h1 className="typo-h2">`，或沿用 `<span>`。
- 说明：`text-sm font-medium text-text-secondary`（14/20，500，`#242424`），在标题下 8px；不是 muted 灰。
- 计数或状态写在说明行里，用 `·` 分隔，失败数用 destructive 文字（如「8 个数据源 · 14 个绑定 · 2 个失败」）。
- 页面主操作在标题行右侧：品牌绿 `default` 按钮，带前导图标（如 `Plus` +「新建数据源」）。

## 页签

- 标题下方是下划线页签（`cn-tabs`）：14px，未选中 muted，选中 foreground + 2px 品牌绿下划线；页签可带 lucide 图标或灰底计数（12px，`bg-bg-accent`，圆角 4px）。
- 页签下方 1px `border` 通栏。

## 区块

- 区块标题：20/28，Inter 500（如「Current Plan」），和下方内容间隔 16px，区块之间 32–40px。
- 卡片：白底、1px `border`、圆角 6px、内边距 20–24px；底部操作条用 `bg-bg-subtle`（`#FCFCFC`）+ 上边 1px 线。
- 卡片里的大读数：32px Inter 500，后跟「/ 10」这类分母（14px muted）。

## 筛选栏和提示

- 筛选栏：一行 32px 高的组合控件（视图切换、分组、类型），带图标和灰色前缀标签；搜索框靠右。
- 失败汇总横幅：整行，destructive 浅底 + 浅红描边，左侧图标和汇总，右侧「查看全部」链接。

## 原型控制

- 浮在右下角，宽约 320px，白底、1px `border`、圆角 6px、`shadow-lg`。
- 标题行：品牌绿浅底的「原型」小标签 + 当前方案名 + 收起箭头；每个变量一行，左侧 12px muted 标签，右侧分段控件（选中白底 + 阴影）。
- 收起后是一条小横条：绿色圆点 +「原型控制」+ 进度（如「1 / 4」）。
