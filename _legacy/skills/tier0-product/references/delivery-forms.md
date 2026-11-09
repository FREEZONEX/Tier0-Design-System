# 三种交付形态

三种形态的共同点：单个 HTML 文件、示例数据、英文产品界面、中文说明、右下角原型控制。区别在于原型要回答的问题不同。

## A 组件级交付原型

**回答**：这个页面用哪些组件、每个组件的 class 和状态是什么，开发改哪些文件。

**范例**：[`examples/plan-billing-handoff.html`](../examples/plan-billing-handoff.html)（Settings → Plan / Usage / Billing，7 个弹窗）

**技术**
- Tailwind v4 浏览器版：`<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4.1.11/dist/index.global.js">`
- `<style type="text/tailwindcss">` 里放 `@custom-variant dark (&:is(.dark *))` 和仓库 `packages/theme/src/tailwind.css` 的 `@theme inline` 块（原样）
- `:root` 里放 `variables.scss` 原色阶 + `themes.scss` 语义层，暗色块照搬 `.dark`
- Lucide UMD：`<script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js">`，`<i data-lucide="name">` 后调用 `lucide.createIcons()`
- 原生 JS 渲染：`Button()`、`CnDialog()`、`CnProgress()` 等函数返回 HTML 字符串，参数名与 React props 对齐；事件委托 `data-action`

**必备**
- 每个组件根节点带 `data-component` / `data-src` / `data-props`，开「组件标注」可悬停查看
- 交付说明抽屉：文件映射（复用 / 改造 / 新增）、状态与规则、待确认、i18n 改动
- 原型控制：角色、场景、关键开关、弹窗直达、Toast 示例

**适合**：设置页、列表页、详情页、弹窗组、表单。

## B 流程原型

**回答**：一个多步流程每一步长什么样、怎么跳转、提交了什么数据。

**范例**：[`examples/onboarding-flow.html`](../examples/onboarding-flow.html)（首登引导：头像 → 工作信息 → 起步方式 → Workspace → 初始化）

**技术**
- 纯 CSS 复刻 `@tier0/ui`：`.btn.default / .primary / .outline`、`.input`、`.select` 等，每个颜色变量后注释对应 token（`--hl-btn: #cef368; /* --tier0-highlight-bg-primary */`）
- 字号阶梯写成变量（标题 28/36、填空句 24/34、加载标题 20/30、正文 14/22、辅助 12/18），全流程只用这几级
- 图标用内联 SVG `<symbol>`（路径取自 Lucide），离线也能显示
- 文案函数 `L(en, zh)`，原型控制里切换语言；中文用「你」

**必备**
- 背景放用户即将进入的真实壳层（淡化），弹窗叠在上面，让评审看到上下文
- 右侧预览：当前步骤改动的区域点亮，其余淡出
- 原型控制：界面语言、场景预设（如「有 2 条邀请 / 没有邀请 / 加入失败 / 加载失败」）、跳到步骤、当前步骤说明、**提交载荷预览**（`<pre>` 展示提交给后端的 JSON）
- 加载态复刻产品现有组件（如 `WorkspacePendingState`：30% 起步，缓出推进到 100%）
- 与代码同源的常量注释来源（如 `与 apps/saas-dashboard/app/(auth)/onboarding/constants.ts 同源`）

**适合**：onboarding、向导、首次配置、多步表单。

## C 品牌视觉原型

**回答**：品牌感和动效节奏是什么样，性能上能不能上线。

**范例**：[`examples/login-visual.html`](../examples/login-visual.html)（登录页：左侧登录表单，右侧 Connect → Contextualize → Build 分段叙事）

**技术**
- React 组件开发，打包成单文件（脚本内联）；文件头注释写明「独立视觉原型，数据仅用于叙事演示，不调用认证或业务接口」
- 品牌色从 `packages/theme` 提取为 `--tier0-*` 变量，生产接入时直接继承同名主题变量
- 动效只动 `transform` / `opacity`，不加常驻 `blur`
- Canvas 背景：`requestAnimationFrame` + 时间驱动；静止时 10fps、交互时 30fps；按 `devicePixelRatio` 绘制；暂停、减少动态效果、后台标签页时停止推进
- 舞台按固定画布尺寸缩放（`transform: scale(var(--scene-scale))`），首屏不溢出
- 分段导航用固定占位，切换激活态时相邻标签不位移；当前段下方细进度条
- 提供暂停 / 播放；`prefers-reduced-motion` 下关闭动画并给静态终态
- CSS 里用版本注释记录迭代（`/* v9: … */`），评审能对照改了什么

**适合**：登录 / 注册页、产品介绍动效、空状态插画。

## 选择

| 情况 | 选 |
|------|----|
| 交给开发实现某个页面 | A |
| 评审一个多步流程，要看数据流 | B |
| 评审品牌视觉和动效 | C |
| 流程里有一步是复杂业务页 | B 做流程，那一步单独出一个 A |
