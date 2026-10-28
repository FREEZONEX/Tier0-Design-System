---
name: tier0-design
description: >-
  Tier0 company design system router. Routes product prototypes, PPT/decks,
  single-page/poster, and website prototypes. Shares logo/type/color foundations;
  loads only the matching scenario skill. Truth sources: Tier0-Frontend + Figma,
  tier0.app, DESIGN.md. Not a generic UI polish skill.
user-invocable: true
metadata:
  version: "3.0.0"
  architecture: shared-foundations-plus-scenarios
---

# Tier0 Design System · Root

公司设计系统入口。先认场景，再加载**一个**场景 skill；共享层只取品牌资源，不把全库灌进上下文。

```text
共享层（Logo / 字体 / 颜色 / 气质）
    │
    ├── 产品原型      product
    ├── 网页原型      website
    ├── PPT 制作      ppt        （规范查询 | 生成 deck）
    └── 单页与海报    print
```

> 路径相对本文件所在目录。成稿默认输出到**仓库外**。  
> 公共站：[Design System](https://freezonex.github.io/Tier0-Design-System/)

## 工作方式

按 [任务策略](references/task-strategy.md) 选择当前任务的一种工作方式；默认直接给结果，省略开场与重复说明。网页 / 文档 / Skill Hub 先对齐 [中性视觉基线](references/web-visual-baseline.md)，禁止灰绿铺底。

## Protocol

1. 是否 Tier0 设计任务？否 → `no skill needed`
2. 场景不清 → **只问一句**：产品 / 网页 / PPT / 单页海报？交付格式？
3. 选 category（下表）→ **Prefer 1**；双角度最多 2；Never > 3
4. 读该 skill + 其点名的 1–3 个引用（**禁止**默认读全 `references/`）
5. **需要技术 SVG 插画**（glyph 场 / UI chrome / Fig 线框）时加载 [`skills/tier0-svg-illustration/SKILL.md`](skills/tier0-svg-illustration/SKILL.md)
6. **需要图表 / 可视化时**必须加载 [`skills/lieflat-charts/SKILL.md`](skills/lieflat-charts/SKILL.md)（[lieflat-charts](https://github.com/larashero3-dotcom/lieflat-charts)）：按 `catalog.md` 从模板出图，禁止自造图型。Tier0 色桥见同目录 `tier0-color-bridge.md`。规则：`.cursor/rules/lieflat-charts.mdc`
7. **工艺需要时**再加载 [ui-skills](https://github.com/ibelick/ui-skills)（去 AI 味 / 动效 / a11y / 版式精修）。先 `node skills/scripts/ui-skills-get.mjs suggest …` 或 `list --category …`，再 `get <slug>`；Prefer 1 个 craft skill。索引：[`references/ui-skills-index.json`](references/ui-skills-index.json)。规则：`.cursor/rules/ui-skills-craft.mdc`
8. 场景 + 插画/图表 + craft 合计 Prefer ≤ 3。交付任务再读 [`references/execution-contract.md`](references/execution-contract.md)
9. 实现；最终回复只给：**交付文件 · 关键变化 · 仍存在的限制**（可一句注明 recipe / lieflat 图型 / ui-skills slug）

读取 root ≠ 完成。ui-skills / lieflat / svg-illustration **不能**覆盖 Logo / 主色 / IBM Plex（图表与插画用 Tier0 token）。

## Categories（四大能力）

| Category | 能力 | Load | 真源（冲突时优先） |
|----------|------|------|-------------------|
| `product` | 产品原型 / 后台 / UNS 工作台 / 开发交付原型 | [`skills/tier0-product/SKILL.md`](skills/tier0-product/SKILL.md) | ① Figma · Tier0 UI（视觉）② [Tier0-Frontend](https://github.com/FREEZONEX/Tier0-Frontend)（组件 class / token / i18n）③ 本仓 `surfaces/tier0-product` + `tokens/product.css` |
| `website` | 网页原型 / 官网长页 / 营销站 | [`skills/tier0-website/SKILL.md`](skills/tier0-website/SKILL.md)；**交付到 Framer** 用 [`skills/tier0-framer-page/SKILL.md`](skills/tier0-framer-page/SKILL.md) | ① [tier0.app](https://tier0.app/) ② 用户当次提供的参考 ③ `surfaces/company-website` + `tokens/website.css` |
| `ppt` | PPT / 销售 deck | [`skills/tier0-ppt/SKILL.md`](skills/tier0-ppt/SKILL.md)（规范+生成统一入口；引擎在 `tier0-slide-skill/`） | ① `tokens/deck.css` + `references/ppt-checklist.md` ② slide-skill Gallery / template |
| `print` | 单页、海报、活动页、其他视觉物料 | [`skills/tier0-print/SKILL.md`](skills/tier0-print/SKILL.md) | ① [`DESIGN.md`](DESIGN.md) + `foundations/` + `assets/` ② 用户指定的优质 skill / 参考（在规范内发挥） |

注册表：[`skills/README.md`](skills/README.md)。

## 共享层（全场景）

| 资源 | 位置 |
|------|------|
| Logo | `assets/tier0-logo-black.svg`（浅底）· `assets/tier0-logo-lime.svg`（深底）· `assets/tier0-logo-white.svg`（反白） |
| 色板 | `tokens/core.css` · `foundations/color.md` |
| 字体 | IBM Plex Sans / SC / Mono（**无 Tektur 标题**；Tektur 仅 Logo）· `foundations/typography.md` |
| 品牌气质 | Industrial · Live · Open · `foundations/brand.md` |
| 设计权威（按需读相关段） | [`DESIGN.md`](DESIGN.md) |
| 交付硬门槛 | [`references/execution-contract.md`](references/execution-contract.md) |

共享层规定 **能用什么品牌材料**；场景 skill 规定 **这页怎么排、对齐谁**。不要在场景里另起一套色/字/Logo。

## 真源冲突时听谁

1. **安全 / 事实 / 用户当次硬约束**（数字、客户名、禁止项）  
2. **场景真源**（上表：Frontend/Figma、tier0.app、deck token、DESIGN.md）  
3. **本仓 foundations + tokens/core**（共享品牌）  
4. **lieflat-charts**（图表几何 / 模板；Tier0 任务用 custom 色桥）  
5. **ui-skills / 其他外部参考**（工艺优化，不得覆盖 Logo/主色/字体家族）  
6. 默认快修：`baseline-ui` / `improve-ui`；其他 slug 按话题从索引按需 `get`

产品：Figma 定布局与像素意图；**实现 API / class / token 名**以 Frontend 库为准，可用新版组件适度优化，禁止另造平行组件体系。  
网页：默认对齐 [tier0.app](https://tier0.app/)；你补充的参考用于提升版式，不换成别的品牌语言。

## Anti-patterns

- 一次读完所有 ppt references 或 slide-skill 全文  
- 跳过场景 skill，只用 root 臆造规范  
- 字体拼写 Logo / 自造字标  
- 把产品页做成营销 Landing，或把官网做成后台 dashboard  
- 声称做过未在最终文件上执行的验收
