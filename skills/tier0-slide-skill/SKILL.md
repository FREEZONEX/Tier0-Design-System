---
name: tier0-slide-skill
description: >-
  将 Tier0 PPT / 文档 / 截图 / Demo / 架构图整理为销售·售前演示稿（HTML 和/或可编辑 PPTX）。
  已有完整布局的 PPTX 默认模式 A：只统一 DESIGN.md / deck token 字体·色·边框·圆角，禁止整套推翻乱排；
  仅失败页或用户明确重构时模式 B。不做产品后台 UI。触发：Tier0 PPT、售前 deck、优化现有 PPTX、架构说明、案例演示。
---

# Tier0 Slide Skill

**调用**：`@tier0-slide-skill` · 真源：`skills/tier0-slide-skill/`

**范围**：销售 / 售前 deck only。禁止画产品后台或写 UI 规范。

**品牌**：IBM Plex · Tektur（深墨大标题）· 绿 `#B2ED1D` 仅信号 · 16:9 · 冲突服从 `DESIGN.md` + `tokens/deck.css`。

---

## Agent 工作流

```
0. intake          → start-tier0-intake.mjs（阻塞确认）
1. 解包 + 模式判定  → A 风格统一（默认）| B 仅失败页重排
2. 页级映射         → content-coverage + data-source-ids
3. 逐页生成         → template-tier0.html
4. 页验收           → page-review
5. 校验 + 导出      → validate-tier0-deck · PPTX
```

### 加载策略（硬规则）

| 阶段 | 读什么 | 禁止 |
|------|--------|------|
| 开始 | 本文件 + **始终 3** | 不要扫 `references/*.md` 全读 |
| 细则 | 按需 **再加 1 个** 顶层文件 | 不要进 `references/detail/` 除非专项 |
| 实现 | `assets/template-tier0.html` | 不要用 dual 扁平预览当 HTML 终稿 |

**始终 3：** `intake-gate-tier0.md` · `source-fidelity-tier0.md` · `tier0-vi-style-guide.md`

**顶层按需（仅 6）：** `layout-craft` · `imagery` · `diagrams` · `motion` · `dual-output` · `page-review`  
完整说明：`references/README.md`。归档细则在 `references/detail/`（默认不读）。

---

## 模式 A / B

| 模式 | 何时 | 做什么 |
|------|------|--------|
| **A（默认）** | 源布局完整 | 保留分区与主图；只统一字体/色/边框；封面 `COVER-EDITORIAL` · 封底 `CLOSING-SPLIT` |
| **B** | 单页失败或用户明确重构 | 按内容形状改版；禁止整套同壳 |

硬门槛：页数 1:1 · 素材不跨页 · 标题完整句 · chrome 与正文 kicker **不重复** · 宽截图完整可见 · 源有 DATA FLOW 须保留且不溢出 · **间距自查**：独立区块 ≥40px（`.canvas-card.stack`）；案例/证据页用 `.stack-loose`（约 48–56px）；标签用 `.tag-row`；禁止整页 `gap:1vh`。细则：`layout-craft-tier0.md` §2.1b · 验收：`page-review-tier0.md` Geometry。

---

## 交付

| 交付 | 原则 |
|------|------|
| HTML | template 16:9；动效/视频保真 |
| PPTX | 每页有正文和/或图；禁止空壳 |
| Both | 页序文案一致；富媒体长稿勿硬塞 dual `kind` |

```bash
node <SKILL_ROOT>/scripts/start-tier0-intake.mjs --project 项目/客户
node <SKILL_ROOT>/scripts/validate-tier0-deck.mjs 项目/ppt/index.html
```

---

## Reference 顶层索引

| 文件 | 何时读 |
|------|--------|
| intake-gate / source-fidelity / tier0-vi | 始终 |
| layout-craft-tier0.md | 模式 B / 返工 |
| imagery-tier0.md | 配图 |
| diagrams-tier0.md | 架构流 |
| motion-tier0.md | 动画顺序 |
| dual-output-tier0.md | 短稿 dual |
| page-review-tier0.md | 逐页验收 |
| detail/* | 仅查历史细则 / Sxx 长表 |

---

## 目录

```
assets/template-tier0.html
layout-gallery/
references/          # 顶层 ≤10 个 md
references/detail/   # 归档，默认不读
scripts/
```
