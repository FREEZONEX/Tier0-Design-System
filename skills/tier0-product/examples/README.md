# 参考成品

三个已交付的产品原型，各代表一种形态。做新原型前先打开对应的那一个，对照它的结构、控制面板和交付说明。

数据均为示例，不调用任何接口。

## plan-billing-handoff.html · 形态 A 组件级交付原型

Settings → Plan / Usage / Billing。

- 主稿：Figma `17896:5453`；弹窗沿用旧版 `10982:79999`
- 页面：Current Plan、Builder Seats（分段进度）、AI Credits（双段按模块堆叠条）、Apps & Resources；Usage（时间范围、自定义区间、堆叠柱状图、按模块 / 按成员明细）；Billing（Stripe 入口、取消与撤销）
- 弹窗：Add Seats（优惠码生效 / 无效 / 价格加载失败 / 绑卡回跳）、Confirm Payment、Remove Seats、Seats In Use（Owner / 非 Owner）、Not enough Builder seats、Buy AI Credits、Cancel plan
- 状态：Owner / Builder × 正常 / Trial / 额度用尽 / 新空间无用量 × 已绑卡 / 待移除 / 已取消
- 看点：`Button()` `CnDialog()` 对 `cn()` 合并的模拟；`data-component` 标注；交付说明五节

## onboarding-flow.html · 形态 B 流程原型

首次登录引导弹窗：头像 → 工作信息（填空句式）→ 起步方式 → Workspace（邀请 / 新建 / 邀请码）→ 初始化加载。

- 背景是用户即将进入的真实工作台壳层；右侧缩小版工作台随步骤点亮对应区域
- 中英文切换（`L(en, zh)`），中文用「你」，大标题 Inter
- 原型控制：界面语言、邀请场景预设、跳到步骤、步骤说明、提交载荷预览
- 看点：纯 CSS 复刻 `@tier0/ui` 并逐行注释 token；字号只用四级

## login-visual.html · 形态 C 品牌视觉原型

登录页：左侧登录（Google / GitHub / Email），右侧 Connect → Contextualize → Build 三段叙事动效。

- React 打包成单文件，品牌色取自 `packages/theme`
- 背景 T/0 字符网格 Canvas：时间驱动、按 DPR 绘制、暂停与后台时停止
- 只动 transform / opacity；分段导航占位固定；支持暂停 / 播放与减少动态效果
- 看点：CSS 版本注释（v3 … v10）记录每轮打磨了什么
