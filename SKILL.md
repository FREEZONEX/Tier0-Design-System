---
name: tier0-design
description: Multi-surface design system for Tier0 (product UI, company website, PPT). Route to the correct surface before generating UI. For sales/presales decks that need HTML + editable PPTX from source materials, also load skills/tier0-slide-skill.
user-invocable: true
---

> **路径约定：** 本文件中 `foundations/`、`tokens/`、`surfaces/`、`sources/`、`preview/`、`ui_kits/`、`assets/`、`skills/` 等均为**技能内置资源**，相对本技能目录 `${CLAUDE_SKILL_DIR}/`（即本 SKILL.md 所在目录）解析、读取与复制。`decks/`、`packages/*` 等指**用户当前项目**目录，不在技能内。成稿 HTML/PPTX 默认输出到**仓库外**。

## 1. 识别场景（必做）

| 用户任务关键词 | Surface / Skill | 必读 |
|----------------|-----------------|------|
| 后台、Namespace、Broker、表格、表单、侧栏、工作台 | `tier0-product` | `surfaces/tier0-product/README.md` + `sources/spec.product-ui.md` + `tokens/product.css` |
| 官网、定价、UNS 长页、产品叙事、tier0.app | `company-website` | `surfaces/company-website/README.md` + `sources/spec.company-website.*.md` + `tokens/website.css` |
| PPT 规范、Masterdeck token、版式骨架、checklist | `ppt`（规范层） | `surfaces/ppt/README.md` + `references/README.md` → `references/ppt-workflow.md` + `tokens/deck.css` |
| 销售/售前 deck、从 DOCX/截图/PPTX 生成、HTML+可编辑 PPTX、Layout Gallery、intake 确认页 | **`skills/tier0-slide-skill`**（执行层） | `skills/tier0-slide-skill/SKILL.md` + 其 `references/`；VI 冲突时仍以 `tokens/deck.css` / `references/ppt-checklist.md` 为准 |

若未说明场景，**先问**：产品 UI / 官网 / PPT？以及深色或浅色、受众、交付格式（HTML / React / PPTX）。

**PPT 双层路由：** 只要用户要「做出可演示/可编辑的 deck」（尤其双格式），进入 `skills/tier0-slide-skill`；只需查规范或改 token/preview 组件时留在 `surfaces/ppt` + `references/ppt-*`。更多 skill 注册表见 [`skills/README.md`](skills/README.md)。

## 2. 全场景必读

- **`DESIGN.md`** — Agent 设计指南（对齐 [vercel.com/design.md](https://vercel.com/design.md) 结构：上下文 → 优先级 → 四步工作法 → 视觉权威 → 反例）
- `foundations/README.md` — 品牌、命名、共享禁忌的细则表
- `tokens/core.css` — 共享色板（lime `#B2ED1D`、黑 `#050B14` 等）

再加载对应 surface 的 `tokens/*.css` 与 `surfaces/*/README.md`。

## 3. 产品 UI 读库检查（仅 tier0-product，生成代码前必做）

收到产品 UI 任务后，**在读设计系统文档之前**，先执行以下检查：

1. 用 Glob 搜索 `packages/theme/src/themes.scss`（任意路径）。
2. **找到了** → 以前端库为事实来源：
   - 必读：`packages/theme/src/themes.scss`、`packages/theme/src/variables.scss`、`packages/theme/src/tailwind.css`、`packages/theme/src/token.ts`
   - 按需读：`packages/ui/components/<与任务相关的组件目录>`
   - 设计系统 spec 文档作为气质与原则补充，不覆盖库的 prop 名 / className / token 名
3. **找不到** → 告知用户：

   > 当前 workspace 中未检测到 [Tier0-Frontend](https://github.com/FREEZONEX/Tier0-Frontend) 前端库。将库克隆到本地并在 Cursor 中加入 workspace 后，生成代码会更贴近真实实现。是否继续用设计系统文档生成？

   等用户确认后，仅凭设计系统文档继续。

## 4. 实现与预览

- **Token 预览：** `preview/_shared/`（原子）· `preview/<surface>/`（场景组件，见各目录 README）
- **产品 UI 组合稿：** 打开 `ui_kits/tier0-product/index.html`
- **官网组合稿：** 打开 `ui_kits/company-website/index.html`
- **PPT 规范：** 见 `surfaces/ppt/`；完整规范 `sources/spec.ppt.md`
- **PPT 规范参考：** `references/README.md`（索引）→ `references/ppt-workflow.md` → `references/ppt-layout-lock.md` / `references/ppt-layouts.md` / `references/ppt-components.md`；有截图：`references/ppt-screenshots.md`；交付前：`references/ppt-checklist.md`
- **PPT 销售 deck 执行：** `skills/tier0-slide-skill/`（intake → Layout Gallery → HTML / 双格式 PPTX）；Gallery：`skills/tier0-slide-skill/layout-gallery/`
- **图标：** 产品 UI 用 Carbon；官网 / PPT / HTML 用 **Lucide**（`foundations/icons-lucide.md`）；带 Icon 卡片用 `.tier0-card-icon`；slide-skill 内图标约定见其 `references/`（IBM Carbon）

## 5. 硬规则（全场景）

- **Tier0** 写作：零不是字母 O；**FREEZONEX** 全大写。
- 饱和 lime `#B2ED1D`：**品牌点缀**，不是产品浅色 UI 的主按钮色（用 `#CCF368`）。
- 产品 UI：**无 emoji**、无大面积渐变、不要把内部页做成营销 Landing。
- 官网：标题与正文均为 **IBM Plex Sans**（对齐 tier0.app）；白底强调字用 `#73B200`，主 CTA 用 `#B2ED1D` 绿底近墨字；**禁止 Poppins**。
- PPT：字体仅 **Tektur / IBM Plex Sans / IBM Plex Sans SC / IBM Plex Mono**（**禁止 Poppins**）；封面与章节大标题 **Tektur Regular**；品牌蓝仅 **`#1D77FE`**；**禁止**画面出现 **FREEZONEX**（仅 Tier0 Logo / 版权）；**重点标题绿**：深底 **`#B2ED1D`**、白底 **`#73B200`**；**项目符号与卡片顶边**始终 **`#B2ED1D`**；**浅底禁止 `#B2ED1D` 文字**（P0-8）；卡片大面积用 **`--ppt-card-fill-*`**（深黑/绿/灰）。

## 6. 输出

- 原型 / 幻灯片 HTML：可复制 `assets/`，引用对应 `tokens/*.css`。
- **销售演示稿等成稿：** 输出到**本仓库外**（如 `~/Desktop/<项目>/` 或用户指定的业务仓库），**不要**在本设计系统仓库内创建 `decks/` 或任何成稿 HTML。
- 生产代码：遵守各 surface 文档中的工程事实来源（产品 UI 见 `packages/theme`）。

## 7. Prompt 例句

自然语言描述需求即可，路由规则与例句见 [`README.md`](README.md)。合入更多 skill：见 [`skills/README.md`](skills/README.md)。
