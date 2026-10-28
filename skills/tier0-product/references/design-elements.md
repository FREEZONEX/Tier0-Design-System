# 设计要点与设计元素

数值来自 Tier0-Frontend 源码和 Figma Tier0 UI Design 实测。Frontend 更新后以源码为准，本文件同步修订。

## 1. Token 三层

`variables.scss`（原色阶）→ `themes.scss`（`--tier0-*` 语义）→ `tailwind.css`（`@theme inline`，生成 `bg-* / text-* / border-*`）。原型三层都原样搬，class 只用第三层的名字。

| 用途 | Tailwind class | 语义变量 | 浅色值 |
|------|---------------|---------|--------|
| 主文字 | `text-text` | `--tier0-text-color` | `#050b14` |
| 次文字 | `text-text-secondary` | `--tier0-text-secondary` | `#242424` |
| 辅助文字 / 卡片标题 | `text-text-tertiary` | `--tier0-text-tertiary` | `#878787` |
| 占位 | `text-text-placeholder` | `--tier0-text-placeholder` | `#d9d9d9` |
| 边框 | `border-border` | `--border` | `#ebebeb` |
| 页面底 | `bg-background` / `bg-bg` | `--background` | `#fff` |
| 分区底（说明条、表头） | `bg-bg-subtle` | `--tier0-bg-subtle` | `#fcfcfc` |
| 次按钮、空进度段 | `bg-bg-accent` | `--tier0-bg-accent` | `#f3f3f3` |
| hover 底、侧栏底 | `bg-bg-tertiary` | `--tier0-bg-tertiary` | `#f9f9f9` |
| 主操作（浅绿按钮） | `bg-button-highlight` | `--tier0-highlight-bg-primary` | `#cef368` |
| 主操作 hover | `bg-button-highlight-hover` | `--tier0-highlight-bg-secondary` | `#dcf797` |
| 近黑按钮 | `bg-button-primary` | `--tier0-primary` | `#050b14` |
| 危险按钮 | `bg-button-destructive` | `--destructive` | `#dc2626` |
| Tab 下划线 | `border-b-tab-line` | `--tab-line` | `#7ea815` |
| 高亮提示框 | `border-highlight-border bg-highlight-bg-tertiary` | | `#cef368` / `#f7fde8` |
| 输入框聚焦 | `focus-visible:border-highlight-text focus-visible:shadow-input` | | `#a2db1a` |
| 成功 | `text-success` · `bg-success-tertiary` · `border-success-secondary` | | `#53b483` |
| 警示 | `text-warning-strong`（白底正文）· `bg-warning`（进度填充）· `bg-warning-accent`（提示底） | | `#c8911a` / `#fbbc55` / `#fbf2cb` |
| 错误 | `text-destructive` · `bg-error` · `bg-error-tertiary` | | `#dc2626` / `#fee2e2` |

规则：
- 暗色用 `.dark` 类切换（`@custom-variant dark (&:is(.dark *))`），原型里按 `prefers-color-scheme` 和 `data-theme` 同步
- 分类色（模块、头像）只取已有色阶（`--tier0-cat-*`、fx-green-deep `#73b200`、blue-600 `#2563eb`、violet-600 `#7c3aed`），不新增色值

## 2. 字体与字号

| 角色 | 字体 | class | 规格 |
|------|------|-------|------|
| 正文、按钮、表单 | IBM Plex Sans | 默认 `font-sans` | 14/20 |
| 中文 | Noto Sans SC（回退 PingFang SC） | 跟随字体栈 | — |
| 页面标题 | Inter | `font-display text-3xl font-semibold` | 30/36 Semibold |
| 区块标题（Current Plan） | Inter | `font-display text-xl font-medium` | 20/28 Medium |
| 套餐名 | Inter | `font-display text-[28px]/9 font-medium` | 28/36 |
| 大数字 | Inter | `font-display text-[32px]/[39px] font-medium` | 32 Medium |
| 资源数值 | Inter | `font-display text-xl/7 font-medium` | 20/28 |
| 卡片标题 | IBM Plex Sans | `text-base/6 font-medium text-text-tertiary` | 16/24 灰 |
| 标签 / 值 | IBM Plex Sans | `text-sm/4 text-text-tertiary` / `text-[15px]/[22px] font-medium` | 14/16 · 15/22 |
| 进度条下标签 | IBM Plex Sans | `text-xs/6`，key 灰、值 Medium | 12 |
| 页面描述 | IBM Plex Sans | `text-text-secondary text-sm font-medium` | 14/20 Medium |

Google Fonts：`IBM+Plex+Sans:wght@400;500;600;700&family=Inter:wght@500;600;700&family=Noto+Sans+SC:wght@400;500;600`。

## 3. `@tier0/ui` 组件 class（逐字）

### Button — `packages/ui/components/ui/button.tsx`

```
base: inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none cursor-pointer [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]

variant
  default     bg-button-highlight text-highlight-foreground hover:bg-button-highlight-hover
  primary     bg-button-primary text-white shadow-xs hover:bg-button-primary-hover
  destructive bg-button-destructive text-white shadow-xs hover:bg-button-destructive-hover
  outline     border bg-background shadow-xs hover:bg-bg-tertiary hover:text-text
  secondary   bg-bg-accent text-text shadow-xs hover:bg-bg-tertiary
  ghost       hover:bg-bg-tertiary hover:text-text
  link        text-text underline-offset-4 hover:underline

size（默认 sm）
  sm   h-8 rounded-md gap-1.5 px-4
  md   h-9 rounded-md px-4 py-2
  lg   h-10 rounded-md px-4
  icon size-9
```

loading 时前导图标换成旋转的 `Loader`（sm `size-4`，md/lg `size-5`），按钮加 `cursor-wait opacity-80` 并禁用。卡片内按钮 Figma 左右留白 8–12px，用 `className="px-3"` 覆盖（需模拟 tailwind-merge 去掉 `px-4`）。

### CnDialog — `cn-dialog.tsx` + `ui/dialog.tsx`

```
overlay  fixed inset-0 z-50 bg-black/50
content  bg-background fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-8 rounded-md border p-8 shadow-lg sm:max-w-2xl [&>*]:min-w-0 max-h-[calc(100vh-2rem)]
header   flex flex-col gap-4 text-center sm:text-left
title    text-dialog-title h-8 text-2xl/8 font-semibold max-w-[90%] truncate
desc     text-muted-foreground text-sm
footer   flex flex-col-reverse gap-2 sm:flex-row sm:justify-end shrink-0
close    absolute top-8 right-8 cursor-pointer rounded-xs opacity-70 transition-opacity hover:opacity-100 [&_svg:not([class*='size-'])]:size-6
默认底栏 outline md「Cancel」+ CnAsyncButton md「OK」
```

宽度（Figma 实测）：普通确认 / 选择类 **480px**（`className="w-120"`）；带价格明细的 Add Seats **500px**（`w-125`）。`className` 里的 `w-* / gap-* / sm:max-w-*` 会替换 content 默认值。

### CnTabs — `cn-tabs.tsx`（type="line"）

```
wrap     flex items-center justify-start border-border border-b      （tabListWrapClassName）
list     text-muted-foreground inline-flex w-fit items-center bg-transparent h-12 gap-6 p-0
trigger  text-text-tertiary data-[state=active]:border-b-tab-line data-[state=active]:text-foreground h-12 gap-2.5 rounded-none border-b-2 border-transparent bg-transparent p-0 shadow-none text-sm font-medium
```

Tab 图标 14px（`size-3.5`），Figma 用 `file-chart-column` / `chart-line` / `credit-card`。分段切换（By module / By user）用 `type="card"`，外框 `h-8 rounded-md border p-1`，激活项 `bg-background shadow-xs`。

### CnProgress — `cn-progress.tsx`

```
root       relative h-2 w-full overflow-hidden rounded-full bg-primary/20   （trackColor 默认 bg-primary/20）
indicator  h-full w-full flex-1 transition-all {color，默认 bg-primary}   style: translateX(-(100-value)%)
```

颜色由 `getUsageBarColor(percent)` 决定（`apps/saas-dashboard/lib/usage-progress.ts`）：`>90 → bg-error`，`>=70 → bg-warning`，否则默认。Storage 条 Figma 高 6px（`className="h-1.5"`）。

### 其他

| 组件 | 关键 class |
|------|-----------|
| Input | `border-input placeholder:text-text-placeholder flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs md:text-sm focus-visible:border-highlight-text focus-visible:shadow-input aria-invalid:border-destructive`；有右侧图标时 `pr-9`，图标 `absolute right-3` |
| Tooltip | 业务里用 `TOOLTIP_CONTENT_CLASS`：`bg-button-primary text-primary-foreground rounded-[2px] px-2 py-1.5 text-sm leading-[22px] whitespace-nowrap shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)]`；触发器 `CircleHelp` 14px（标签内 12px） |
| DropdownMenu item | `relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent`；分隔 `bg-border -mx-1 my-1 h-px` |
| Table | `w-full caption-bottom text-sm`；行 `border-b`；表头 `h-10 px-2 text-left font-medium`；单元格 `p-2`（业务表常用 `px-4 py-2.5`，表头 `bg-bg-subtle`） |
| 状态标签 getWsStatusTag | AntTag `h-[22px] gap-1.5 rounded-md border px-2 text-xs/[14px]`；Active = `border-success-secondary bg-success-tertiary text-success` + `circle-check` 12px |
| SeatStepper | `border-border inline-flex items-center rounded-md border`；两侧 ghost icon 按钮；中间 `min-w-12 border-x px-4 text-center text-sm font-medium tabular-nums` |
| Toast（sonner） | 卡片 `rounded-md border bg-popover px-4 py-3 text-sm shadow-lg`，图标 16px：success `circle-check`、error `octagon-x`、info `info` |

## 4. 页面与卡片规格（Figma 实测）

### 壳层

| 区域 | 规格 |
|------|------|
| App 侧栏 | 234px，`bg-bg-tertiary`，固定不滚动 |
| Settings 菜单 | 248px，当前项 `bg-bg-accent font-medium` |
| 内容区 | 唯一滚动容器；左右 36px；内容最大宽 887px |
| 标题 → Tab | 标题 30/36，描述 14/20，下方 6px 接 Tab（高 48） |
| Tab → 首个区块 | 32px；区块之间 32px；区块标题与内容 16px（资源区 24px） |

### 卡片

```
卡片    border-border flex flex-col gap-5 rounded-md border p-4
卡片头  flex h-6 items-center justify-between gap-5
        标题 flex items-center gap-1.5 text-base/6 font-medium text-text-tertiary + 16px Lucide 图标（stroke 灰）
并排    grid gap-4 md:grid-cols-2
虚线    py-2 内放 border-t border-dashed
```

卡片头图标：Builder Seats `blocks`、AI Credits `coins`、Applications `layout-grid`、Storage `database`。

### 当前套餐卡

- 主体 `py-5 pr-6 pl-5`，名称区 280px，竖分隔线 50px 高，字段两列各 168px、间距 24
- 字段：标签 14/16 灰，值 15/22 Medium
- 底部说明条 `border-t bg-bg-subtle px-5 py-2.5`，文字 14/24 灰，右侧 Upgrade Plan

### 用量表达

| 元素 | 规格 |
|------|------|
| 大数字行 | `数字(Inter 32) / 总量 · x% used`，后两段 14 灰，百分比按阈值着色 |
| 分段进度（总量 ≤ 10） | 每段 `h-2 rounded-[2px]`，间距 2px；已用 `bg-primary`（或阈值色），空段 `bg-bg-accent` |
| 连续进度（总量 > 10） | CnProgress |
| 双段额度条 | 套餐额度与附加额度两段，间距 4px，各自 `rounded-full bg-bg-accent`；段内按模块颜色堆叠，同一组颜色按用量顺序排，套餐用完后跨过间隔继续排进附加段 |
| 进度条下标签 | `Plan 1 / 1` 在左，`Purchased 5 / 9` 在右；key 与值间距 8 |
| 待处理提示条 | `bg-warning-accent rounded-md px-2.5 py-1.5 gap-2`，无描边；`circle-alert` 16px `text-warning`；正文 13/20；操作 13/20 Medium `text-warning-strong` |
| 满额 | 只让进度条与百分比变色，不加说明文字 |

### 图表（recharts，`packages/ui/components/ui/chart.tsx`）

- 堆叠柱 `stackId` 同一组，**直角**，不加 `radius`
- 网格线 `--border`，坐标字 11px `--muted-foreground`
- 首尾刻度不出界（最后一个标签右对齐）
- Tooltip：日期 + Total，下列各模块值，颜色点 8px
- 图例在图下方，12px 灰

### 空状态

```
容器  flex flex-col items-center justify-center gap-1 px-4 py-10 text-center
图标  mb-2 flex size-9 items-center justify-center rounded-md bg-bg-accent text-text-tertiary（chart-no-axes-column 16px）
标题  text-sm font-medium      说明  max-w-sm text-xs text-text-tertiary
```

区分两种空：从未有数据（引导使用）和所选范围无数据（给「回到最近 30 天」按钮）。

### 日期范围（Ant Design RangePicker 样式覆盖）

- 弹层 512px，内边距 16，区块间距 16
- 双月并排，翻页箭头在月份标题行内（左月左侧、右月右侧）
- 日期格 32px 高；起止日 `bg-button-highlight`，区间内 `bg-highlight-bg-tertiary`（无圆角，连成一条）
- 未来日期置灰不可选；底部 Reset 左，Cancel / Apply 右

## 5. 文案

- 产品界面英文，用 `messages/modules/<module>/en.json` 原文；新文案列出建议 key（末级 ≤ 25 字符）
- 中文（切换或说明）用「你」；大标题中文同样用 Inter 字体栈回退到 Noto Sans SC
- 不写解释性冗余文字；同一功能不重复出现两个入口
- 按钮写动作：Add Seats、Cancel Plan、Undo Removal
