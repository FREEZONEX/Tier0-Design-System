---
name: tier0-product
description: >-
  Tier0 product prototype delivery. Turns Figma frames (latest design plus any
  legacy dialogs / edge states the user points to) into an interactive,
  dev-handoff single-file HTML prototype that reuses Tier0-Frontend's @tier0/ui
  class strings, theme tokens and i18n copy, with a bottom-right state panel,
  component annotations and a handoff drawer. Use for 产品原型 / 交付原型 /
  开发交付 / 设置页 / 弹窗 / 工作台 / onboarding / 登录页 prototypes. Not for
  marketing pages or decks.
---

# 产品原型交付 · Product

产出物：**一个单文件 HTML 原型**。看起来与 Figma 一致，写法与 Tier0-Frontend 一致，开发打开就能对照实现。

参考成品（先看再做）：[`examples/`](examples/README.md)

| 文件 | 形态 | 学什么 |
|------|------|--------|
| `plan-billing-handoff.html` | A 组件级交付原型 | Tailwind v4 + 仓库 token、`@tier0/ui` class 逐字复用、组件标注、交付说明抽屉 |
| `onboarding-flow.html` | B 流程原型 | 分步弹窗、中英切换、步骤直达、场景预设、提交载荷预览、背景真实壳层 |
| `login-visual.html` | C 品牌视觉原型 | React 打包单文件、分段叙事动效、暂停/播放、性能与减少动态效果 |

## 真源（冲突时按序）

1. **用户当次要求**：文案、数据、取舍、"不要做什么"
2. **Figma 最新稿**：布局、尺寸、间距、字号、图标名、弹窗宽度。文件 `jmqCj0T7EoMnC4FNsAHfbl`（Tier0 UI Design）；旧版弹窗、边界场景按用户给的节点
3. **[Tier0-Frontend](https://github.com/FREEZONEX/Tier0-Frontend)**：组件 class、token 名、i18n 文案、业务规则（角色、套餐、阈值）
4. **本仓 foundations / tokens**：只在前三者没有覆盖时补缺

视觉听 Figma，写法听代码。两边不一致时不要静默选一边，写进交付说明的「改动清单」或「待确认」。

## 先选交付形态

| 形态 | 什么时候用 | 技术 | 详见 |
|------|-----------|------|------|
| **A 组件级交付原型** | 业务页、设置页、弹窗，要交给开发照着实现 | Tailwind v4 浏览器版 + 仓库 `@theme` token；按 `@tier0/ui` 源码逐字写 class | [`templates/handoff-starter.html`](templates/handoff-starter.html) |
| **B 流程原型** | 多步引导、向导、首登、需要中英文对照 | 纯 CSS 复刻 `@tier0/ui`，每个颜色注明对应 token；内联 SVG 图标 | `examples/onboarding-flow.html` |
| **C 品牌视觉原型** | 登录页、空态插画、叙事动效 | React/Canvas 打包成单文件；只动 transform / opacity | `examples/login-visual.html` |

不确定时选 A。一个原型只用一种形态。

## 工作流

细节与命令见 [`references/workflow.md`](references/workflow.md)。

1. **对齐范围**：要做的 Figma 节点、沿用旧版的弹窗节点、角色与场景、交付给谁。按 [`execution-contract`](../../references/execution-contract.md) §0 记约束账本
2. **取 Figma**：截图看全貌，再用只读脚本取精确数值（宽度、字号、间距、图标名）
3. **读代码**：组件源码、主题 token、i18n 文案、业务规则
4. **列状态矩阵**：角色 × 场景 × 边界态（空、满额、试用、取消、未绑卡、加载、失败）
5. **搭骨架并实现**：页面 → 弹窗 → Toast → 原型控制 → 组件标注 → 交付说明
6. **验证**：[`scripts/verify-prototype.mjs`](scripts/verify-prototype.mjs) + [`references/verification.md`](references/verification.md) 清单
7. **交付**：发布链接 + 发文件；回复里只写做了什么、和 Figma / 代码的差异、待确认
8. **迭代**：每条反馈回 Figma 重新取数，改同一个文件，保持同一个链接

## 硬规则

这些规则来自三个原型的评审反馈，违反过的都写在 [`references/verification.md`](references/verification.md) 的「已知坑」里。

**组件与样式**
- 只复刻 `@tier0/ui` 已有组件，class 字符串逐字取自源码；不另造按钮、弹窗、Tabs
- 模拟 `cn()`（tailwind-merge）：传入 `w-* / gap-* / px-* / h-*` 时替换默认值，否则 `w-full`、`gap-8`、`px-4` 会盖掉你的设置
- 颜色只用 token（`text-text-tertiary`、`bg-button-highlight`…），不写 hex，不用 Tailwind 默认色板
- 不引入新的 UI 库；日期选择标注为 Ant Design RangePicker

**视觉**
- 字体：正文 IBM Plex Sans；页面标题、区块标题、大数字用 Inter（`font-display`）；中文 Noto Sans SC
- 图标：Lucide（与 Frontend 的 `lucide-react` 一致），名称取 Figma 节点里的图标名，版本固定并核对存在
- 弹窗宽度按 Figma（常见 480px = `w-120`，带明细的 500px = `w-125`）
- 用量色：<70% 默认，70–90% `bg-warning`，>90% `bg-error`；额度用尽只让条和百分比变色，不加红色说明文字
- 柱状图直角，不加圆角
- 壳层：侧栏固定不滚动，只有内容区滚动

**文案**
- 产品界面英文，直接用仓库 i18n 原文；Figma 有新文案就列进「i18n 改动」
- 原型控制、标注、交付说明用中文；中文用「你」不用「您」
- 示例数据要标「示例」；数据口径对不上时列进「待确认」，不要自己圆

**交付**
- 原型控制放右下角，可收起，层级在弹窗之上、交付说明抽屉之下
- 不改业务仓库代码，不推送任何分支，除非用户明确要求
- 发布的链接默认私有，回复里提醒用户共享给开发

## Load map

| 需要 | 读 |
|------|----|
| 流程、命令、Figma 取数脚本 | [`references/workflow.md`](references/workflow.md) |
| 三种形态的细节与取舍 | [`references/delivery-forms.md`](references/delivery-forms.md) |
| token、字号、组件 class、卡片/弹窗规格 | [`references/design-elements.md`](references/design-elements.md) |
| 原型控制、组件标注、交付说明抽屉 | [`references/handoff-kit.md`](references/handoff-kit.md) |
| 验证脚本、自查清单、已知坑 | [`references/verification.md`](references/verification.md) |
| 起步骨架（形态 A） | [`templates/handoff-starter.html`](templates/handoff-starter.html) |

默认只读本文件 + `workflow.md` + 当前形态需要的 1–2 个引用。`surfaces/tier0-product/` 是产品 UI 的气质说明，与本 skill 冲突时以本 skill 为准。

## 完成标准

- [ ] 一个 `.html` 文件，浏览器直接打开，不需要构建（CDN 资源需联网）
- [ ] Figma 每个指定节点都有对应页面或状态，旧版弹窗按旧版还原
- [ ] 右下角原型控制能切换所有角色、场景、边界态，并能直达每个弹窗
- [ ] 形态 A：组件标注可开关，悬停显示组件名、props、仓库路径；交付说明含文件映射（复用 / 改造 / 新增）、状态规则、待确认、i18n 改动
- [ ] 验证脚本无报错，400px 宽无横向滚动，弹窗实测宽度与 Figma 一致
- [ ] 已发布或发送文件，回复里列出与 Figma / 代码的差异和待确认项
