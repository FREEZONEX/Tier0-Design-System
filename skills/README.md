# Skills 注册表

公司设计系统 = **共享品牌层** + **四大场景 skill**。

```text
foundations/ + assets/ + tokens/core.css + DESIGN.md
                    │
        ┌───────────┼───────────┬────────────┐
        ▼           ▼           ▼            ▼
     product     website       ppt         print
   产品原型     网页原型     PPT制作     单页与海报
```

Root 路由：[`../SKILL.md`](../SKILL.md)（Prefer 1 · 最多 3）  
交付契约：[`../references/execution-contract.md`](../references/execution-contract.md)

| Skill | Category | 能力 | 真源摘要 |
|-------|----------|------|----------|
| **tier0-design** | root | 路由 | — |
| **tier0-product** | `product` | 产品原型 | [Tier0-Frontend](https://github.com/FREEZONEX/Tier0-Frontend) → [Figma UI](https://www.figma.com/design/jmqCj0T7EoMnC4FNsAHfbl/Tier0-UI-Design?node-id=14311-69336) → 本仓 product surface |
| **tier0-website** | `website` | 网页原型 | [tier0.app](https://tier0.app/) → 用户参考 → website surface |
| **tier0-framer-page** | `website` 交付 | 官网页面 → Framer 代码组件（构建 + 验收模板） | [tier0.app](https://tier0.app/) → 评审定稿 visual-spec → website surface |
| **tier0-ppt** | `ppt` 规范 | PPT 规范查询 | `tokens/deck.css` + ppt checklist |
| **tier0-slide-skill** | `ppt` 生成 | 销售 deck HTML+PPTX | slide-skill + deck VI |
| **tier0-print** | `print` | 单页 / 海报 / 物料 | DESIGN.md + foundations；外部 skill 可在锁内发挥 |

站点：[Design System](https://freezonex.github.io/Tier0-Design-System/) · [Slide Skill](https://freezonex.github.io/Tier0-Design-System/site/slide-skill/)

## 怎么选

| 你要… | 选 |
|-------|-----|
| 后台 / UNS / 表单表格原型 | `product` |
| 对齐官网的网页 / 长页 | `website` |
| 放进 Framer 官网的页面（列表 / 公告 / 更新日志） | `tier0-framer-page` |
| 查 PPT 色字版式 | `tier0-ppt` |
| 做出一套可演示 deck | `tier0-slide-skill` |
| 海报、单页、KV、展会物料 | `print` |

## lieflat-charts（图表层，按需）

来源：[larashero3-dotcom/lieflat-charts](https://github.com/larashero3-dotcom/lieflat-charts)  
路径：[`lieflat-charts/SKILL.md`](lieflat-charts/SKILL.md) · 规则：`.cursor/rules/lieflat-charts.mdc`  
色桥：[`lieflat-charts/tier0-color-bridge.md`](lieflat-charts/tier0-color-bridge.md)

有数据要可视化 / 做图 / 报告插图时 **必须**读该 skill，从 `catalog.md` + `templates/` 出图。

## ui-skills（工艺层，按需）

来源：[ibelick/ui-skills](https://github.com/ibelick/ui-skills) · 索引 [`../references/ui-skills-index.json`](../references/ui-skills-index.json)（~300）  
规则：`.cursor/rules/ui-skills-craft.mdc` · 常驻 `.cursor/skills/{ui-skills-root,baseline-ui,improve-ui}`

```bash
node skills/scripts/ui-skills-get.mjs categories
node skills/scripts/ui-skills-get.mjs list --category motion
node skills/scripts/ui-skills-get.mjs suggest landing polish
node skills/scripts/ui-skills-get.mjs get baseline-ui
# 等价: npx ui-skills get <slug>
```

**不**替代场景真源或 lieflat 图型；只优化页面执行质量。

## 冲突优先级

1. 用户当次硬约束与事实  
2. 场景真源（上表）  
3. 共享 foundations / Logo / core tokens  
4. ui-skills / 外部参考（只优化工艺）

## 本地 CLI

```bash
node skills/scripts/tier0-skills.mjs categories
node skills/scripts/tier0-skills.mjs list --category print
node skills/scripts/tier0-skills.mjs get tier0-product
```

## Cursor 软链

```bash
mkdir -p .cursor/skills
ln -sfn ../../skills/tier0-product .cursor/skills/tier0-product
ln -sfn ../../skills/tier0-website .cursor/skills/tier0-website
ln -sfn ../../skills/tier0-framer-page .cursor/skills/tier0-framer-page
ln -sfn ../../skills/tier0-ppt .cursor/skills/tier0-ppt
ln -sfn ../../skills/tier0-print .cursor/skills/tier0-print
ln -sfn ../../skills/tier0-slide-skill .cursor/skills/tier0-slide-skill
ln -sfn ../../skills/lieflat-charts .cursor/skills/lieflat-charts
```

Slide 一键安装：

```bash
curl -fsSL https://raw.githubusercontent.com/FREEZONEX/Tier0-Design-System/main/skills/tier0-slide-skill/scripts/install-skill.sh | bash
```
