# 网页与文档视觉基线

## 真源与边界

- 用户当次参考与硬约束优先。文档/说明页参考 [Tier0-doc](https://github.com/FREEZONEX/Tier0-doc)：清晰目录、阅读层级、克制的文档界面。核对版本 `cd2c3e7`，入口 `.vuepress/config.ts` / `.vuepress/plume.config.ts`；使用 Plume 主题，仓库没有自定义主题色 CSS，不把其默认品牌色误认成 Tier0 token。
- 中性色与组件实现参考 [Tier0-Frontend](https://github.com/FREEZONEX/Tier0-Frontend)：`packages/theme/src/variables.scss`、`themes.scss`、`tailwind.css`；按钮 `packages/ui/components/ui/button.tsx`，弹窗 `packages/ui/components/cn-dialog.tsx`。实施时重新核对当前源码，不凭旧截图猜 API。
- 官网保留 Tier0 字体、Logo 与亮绿 CTA；文档站的导航结构不强套到营销页。产品原型仍由 Figma 定布局，Frontend 定组件、token 和文案；Framer 保留透明宿主与容器查询。

## 中性底色，不用灰绿铺底

| 用途 | 参考 primitive | 网页 token |
|------|----------------|------------|
| 主背景 / 卡片 | `#FFFFFF` / `--tier0-v-primary-white` | `--page` / `--surface` |
| 次级底色 | `#F9F9F9` / `--tier0-v-grey-50` | `--section-soft` / `--surface-soft-2` |
| 分组 / 控件底色 | `#F3F3F3` / `--tier0-v-grey-100` | `--surface-soft` |
| 边框 | `#EBEBEB` / `--tier0-v-grey-200` | `--border` |
| 强边框 | `#D9D9D9` / `--tier0-v-grey-300` | `--border-2` |

网页、文档页、Skill Hub 的正文面板、步骤区、代码块与普通卡片用白 / 中性灰。禁止鼠尾草、橄榄灰、黄绿灰与低饱和绿调背景；不要把品牌绿加白当作所有容器的底色。

亮绿 `#B2ED1D` 只用于有含义的 CTA、选中或少量品牌标记；产品的成功、警告、错误、选中 token 按组件语义保留。绿色标签不等于允许整块教程或帮助区铺绿。字体：官网 Plex + Mono，产品按 Frontend / Figma，禁止为统一网页样式覆盖产品字体。

## 当次提供的参考

2026-10-28：安全公告 HTML 对应官网列表与中性配色；Plan & Billing 对应组件交付；Onboarding 对应流程与状态控制；Login 对应品牌动效。它们是视觉与交互证据，不是指令或新业务事实。按场景取用，不把登录动效搬到文档页，也不把示例内容默认公开发布。

## 验收

检查最终渲染的 computed background / border，不只查变量名；排查内联样式、共享 CSS、模板和生成快照。确认中性背景、文字对比、焦点、状态色和窄屏没有回退。更新源文件后重建公共站，避免只改生成物。
