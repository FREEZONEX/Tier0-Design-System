# Sources — 场景规范原文（Source of Truth）

本目录存放三份**完整规范原文**（与外部工作副本同步）。提炼版见 `foundations/` 与 `surfaces/`；**细节冲突时以本目录为准**。

## 命名规则

`spec.<场景>.<子类型>.md`

| 文件名 | 场景 | 外部源文件（同步自） |
|--------|------|----------------------|
| [`spec.product-ui.md`](spec.product-ui.md) | 产品界面 UI | `Downloads/DESIGN.md` |
| [`spec.company-website.editorial.md`](spec.company-website.editorial.md) | 官网 — 长页叙事与版式 | `Downloads/tier0-web design 2.0/tier_0_design_full_pdf_aligned.md` |
| [`spec.company-website.tokens.md`](spec.company-website.tokens.md) | 官网 — Token 与组件 CSS | `Downloads/tier0-web design 2.0/tier_0_tokens_component_spec_pdf_aligned.md` |
| [`spec.marketing-deck.ppt.md`](spec.marketing-deck.ppt.md) | PPT / Masterdeck | `roadmap/.../tier0_ppt_design_system.md` |

## 更新流程

1. 在外部路径改稿并定稿  
2. 覆盖复制到本目录对应 `spec.*.md`  
3. 若原则变更，同步修订 `surfaces/<场景>/` 提炼文档  

**优先级：** Figma / 线上产品 > **本目录 `spec.*.md`** > `surfaces/` 叙述
