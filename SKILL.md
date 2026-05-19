---
name: tier0-design
description: Multi-surface design system for Tier0 (product UI, company website, marketing deck). Route to the correct surface before generating UI.
user-invocable: true
---

## 1. 识别场景（必做）

| 用户任务关键词 | Surface | 必读 |
|----------------|---------|------|
| 后台、Namespace、Broker、表格、表单、侧栏、工作台 | `tier0-product` | `surfaces/tier0-product/README.md` + `sources/spec.product-ui.md` + `tokens/product.css` |
| 官网、定价、UNS 长页、产品叙事、tier0.app | `company-website` | `surfaces/company-website/README.md` + `sources/spec.company-website.*.md` + `tokens/website.css` |
| PPT、幻灯片、Masterdeck、路演、Keynote | `marketing-deck` | `surfaces/marketing-deck/README.md` + `sources/spec.marketing-deck.ppt.md` + `tokens/deck.css` |

若未说明场景，**先问**：产品 UI / 官网 / PPT？以及深色或浅色、受众、交付格式（HTML / React / PPTX）。

## 2. 全场景必读

- `foundations/README.md` — 品牌、命名、共享禁忌
- `tokens/core.css` — 共享色板（lime `#B2ED1D`、黑 `#050B14` 等）

再加载对应 surface 的 `tokens/*.css` 与 `surfaces/*/README.md`。

## 3. 实现与预览

- **Token 预览：** `preview/_shared/`（原子）· `preview/<surface>/`（场景组件，见各目录 README）
- **产品 UI 组合稿：** 打开 `ui_kits/tier0-product/index.html`
- **官网组合稿：** 打开 `ui_kits/company-website/index.html`
- **PPT：** 见 `surfaces/marketing-deck/`；完整规范 `sources/spec.marketing-deck.ppt.md`
- **图标：** 产品 UI 用 Carbon；官网 / PPT / HTML 用 **Lucide**（`foundations/icons-lucide.md`）；带 Icon 卡片用 `.tier0-card-icon`

## 4. 硬规则（全场景）

- **Tier0** 写作：零不是字母 O；**FREEZONEX** 全大写。
- 饱和 lime `#B2ED1D`：**品牌点缀**，不是产品浅色 UI 的主按钮色（用 `#CCF368`）。
- 产品 UI：**无 emoji**、无大面积渐变、不要把内部页做成营销 Landing。
- 官网：Poppins 仅作**标题**；正文 IBM Plex Sans。
- PPT：字体白名单 **Tektur / Poppins / IBM Plex Sans / IBM Plex Sans SC / IBM Plex Mono**；品牌蓝仅 **`#1D77FE`**；**禁止**画面出现 **FREEZONEX**（仅 Tier0 Logo / 版权）；**重点标题绿**：深底 **`#B2ED1D`**、白底 **`#73B200`**；**项目符号与卡片顶边**始终 **`#B2ED1D`**。

## 5. 输出

- 原型 / 幻灯片 HTML：可复制 `assets/`，引用对应 `tokens/*.css`。
- **销售演示稿等成稿：** 输出到仓库根 `decks/<项目>/`，**不要**写入本设计系统目录。
- 生产代码：遵守各 surface 文档中的工程事实来源（产品 UI 见 `packages/theme`）。

## 6. Prompt 例句（按角色）

开发 / 销售 / 设计向 Agent 描述需求时的模板与例句，见仓库根 [`README.md`](../README.md)。
