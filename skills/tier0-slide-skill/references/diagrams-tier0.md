# Diagrams · Tier0

> 合并自 architecture-diagrams / archify-tier0。
> Agent：架构流与复杂拓扑只读本文件。

---

## A · Relationship Grammar

## Choose one grammar

| Grammar | Use when | Structure | Do not use when |
|---|---|---|---|
| Namespace hub | Several systems connect through one semantic core | Sources / applications point to one labeled namespace | You need to show a strict sequence |
| Linear flow | Information has an intentional direction | Source → flow → namespace → event flow → application | Systems communicate in many peer-to-peer directions |
| Layered tree | The namespace itself is the story | Factory → line → device → metric / state / action | The central concern is system integration |
| Point-to-point contrast | Explaining why a unified layer matters | Tangled before-state beside a clean target state | A target architecture should stand on its own |

## Archify type mapping

| Slide need | Archify type |
|---|---|
| Component / cloud / boundary map | `architecture` |
| Process / approval / CI | `workflow` |
| API / request chain | `sequence` |
| ETL / lineage | `dataflow` |
| State machine | `lifecycle` |

简单 ≤6 节点的销售页继续用 `architecture-native`（HTML/PPTX 原生），不必启动 Archify。

## 源稿架构流（硬门槛）

- 源页若含 `DATA FLOW` / `GENERATION FLOW` / `ANALYSIS FLOW` / Sources→UNS→Apps 等流图，**交付页必须保留等价语义**，并用 Tier0 **Linear flow**（或对应 grammar）重绘；禁止只留截图、丢掉流图。
- 案例页（Henkel / Aramco / IMI 等）常见「上：宽截图 · 下：数据流」：宽图横铺 `object-fit:cover`（或等比铺满证据槽），流图放底栏；禁止竖栏 `contain` 大留白把流图挤没或省略。
- 功能页右侧架构图必须可读、标签完整；禁止乱码 mono 块或与源语义无关的占位。

## Tier0 translation rules

- Keep labels in HTML whenever possible. SVG only carries nodes, connectors, and simple geometric state.
- One diagram = one relationship grammar. Do not combine tree, hub, and mesh as decoration.
- The semantic core or active route uses `#B2ED1D`; all other nodes are paper/grey with ink hairlines.
- Use 1–1.5px connectors and no shadows, noisy outlines, glow, coin icons, or rasterized texture.
- Every connector must have a reason. If a reader cannot name the relationship, remove it or label it outside the SVG.
- Use `#73B200` only for readable green text on a white background; otherwise keep labels ink.
- Prefer a maximum of 6 external systems and 3 hierarchy levels in a slide diagram. Split complex models across slides.
- After Archify `deliver`, run `node scripts/apply-archify-tier0-theme.mjs <out.html>` before screenshot/export.

## Presentation direction from the supplied references

Use the supplied system-architecture, comparison, hierarchy, and photographic-reference pages as a shared visual language across the deck:

- Start with one assertive ink headline. Use green only to name the active layer, system boundary, conclusion, or a short highlighted phrase—not every label.
- Give diagrams a calm neutral field and explicit system boundaries. A diagram is a readable explanation, not a decorative illustration.
- For comparisons, use two equal panels with one clear contrast: grey/neutral for the current state and pale green for the Tier0 target. Keep the same label order on both sides.
- For hierarchy or operating-model pages, make one large geometric form (tree, stack, or pyramid) the visual anchor; put concise numbered implications beside it rather than scattering text around the shape.
- For image-led pages, keep the content block on a quiet white field and fade the image edge into it. Do not draw synthetic dashboard widgets over a photo unless the image itself is product evidence.
- Keep all outlines 1–1.5px and square/near-square. The reference illustrations feel technical because the relationships are precise, not because they add icons, shadows, or 3D decoration.

## Generation prompt template

```text
Use case: infographic-diagram
Asset type: Tier0 presentation architecture evidence
Relationship grammar: [namespace hub | linear flow | layered tree | point-to-point contrast]
Systems and labels: [list only the verified systems]
Core relationship: [one sentence]
Style: Tier0 architecture diagram — white or neutral surface, IBM Plex-like typography,
rectangular nodes, 1px ink connectors, one #B2ED1D semantic core/active path,
black/grey labels, no gradients, no shadows, no rounded cards, no decorative icons.
Composition: [16:10 or 21:9], generous whitespace, labels outside connectors.
Avoid: generic dashboard UI, dense mesh, coin symbols, neon, 3D, stock imagery,
title/footer/page chrome, duplicate arrows, unreadable text.
```

## Asset handling

When a user supplies a diagram screenshot, store the original binary in
`assets/architecture-diagrams/user-provided/` using the filename from
`reference-manifest.json`. Do not trace it 1:1 or reuse unverified labels; use it as
a relationship and composition reference only.

---

## B · Archify × Tier0


## 何时用 Archify

| 场景 | 工具 |
|------|------|
| 复杂系统图、需校验的 topology、序列/数据流/生命周期 | **Archify**（本文件）→ 导出 PNG/SVG 进证据槽 |
| 销售页上简单 hub / linear / tree（≤6 节点） | 优先 `architecture-native`（HTML/PPTX 原生节点线），见 `architecture-diagrams-tier0.md` |
| 用户已给架构截图 | `imageRole=product-evidence`，不要用 Archify 重画假拓扑 |

## 工作流（跟 Archify Fast path）

1. 选类型：`architecture` | `workflow` | `sequence` | `dataflow` | `lifecycle`。
2. 读 `vendor/archify/schemas/<type>.schema.json` + `common.schema.json` + 一个 `examples/` 样本（只学字段形状，不抄事实）。
3. 先写 candidate JSON（`meta.quality_profile: "showcase"`），主路径清晰，≤12 主节点。
4. 校验 / 交付（在 skill 根或 vendor 目录）：

```bash
node vendor/archify/bin/archify.mjs validate <type> candidate.json --quality showcase --json
node vendor/archify/bin/archify.mjs deliver <type> candidate.json out/diagram.html --quality showcase --json
```

5. **套 Tier0 主题**（强制，覆盖 Archify 默认多色 console）：

```bash
node scripts/apply-archify-tier0-theme.mjs out/diagram.html
```

6. 导出静态证据进 deck：浏览器 Export → PNG/SVG，或 Share Card；放入 `images/{页号}-architecture-{语义}.png`，`imageRole=architecture-native` 仅当图是原生节点；栅格导出用 `product-evidence` / `illustration` 不适用——用 `imageRole` 文档约定：`architecture-export`。

推荐 viewer：`theme=light` + `preset=blueprint`（直角、少 glow）。交付 HTML 后立即跑 theme 脚本。

## Tier0 视觉锁（覆盖 Archify DESIGN）

Archify 默认 JetBrains Mono + cyan/violet/amber 语义色——**不得直接进 Tier0 销售页**。

| Archify | Tier0 映射 |
|---------|------------|
| JetBrains Mono | IBM Plex Mono（标签）/ IBM Plex Sans（标题） |
| frontend cyan | 近墨描边 + 浅灰填；焦点用 `#B2ED1D` |
| backend green | `#73B200` 仅可读绿字；面用 `#F5FBDE` |
| database violet / cloud amber / … | 一律灰阶墨线；禁止彩虹节点 |
| 圆角 pill / glow | 直角或 4px；无 glow |
| Signal Flow 氛围 | 禁止用于客户 deck |

关系语法仍服从 `architecture-diagrams-tier0.md`：一图一种 grammar（hub / linear / tree / contrast）。

## 与 deck.json 的衔接

- 复杂图：Archify → PNG/SVG → `canvas` / `feature-split` / 证据槽。
- 简单图：继续用 dual builder 原生 `rect`/`line`/`text`，不要为装饰去跑 Archify。
- 禁止把 Archify 示例 topology 或 Proof Lab 场景事实拷进客户材料。

## 上游更新

```bash
# 从 upstream zip 刷新 vendor（排除 test）
curl -fsSL -o /tmp/archify.zip https://github.com/tt-a1i/archify/archive/refs/heads/main.zip
# 解压后 rsync 到 vendor/archify，保留本仓库的 tier0 theme 资产
```

完整 Archify 契约：`vendor/archify/SKILL.md`、`references/authoring-contract.md`、`references/delivery-contract.md`。
