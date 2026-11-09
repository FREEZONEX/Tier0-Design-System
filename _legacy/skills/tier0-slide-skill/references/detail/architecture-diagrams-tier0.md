# Tier0 Architecture Diagram Reference

Use this reference before generating, drawing, or asking an image model for an architecture diagram. The first decision is the **relationship grammar**, not the visual style.

**复杂 / 需校验的图：** 用 vendored [Archify](https://github.com/tt-a1i/archify) 生成拓扑（`vendor/archify/`），再套 Tier0 主题。完整步骤见 `archify-tier0.md`。Archify 的方法（typed JSON → validate → deliver → export）保留；颜色与字体必须换成 Tier0，禁止直接使用 Archify 默认 cyan/violet console 皮肤。

The live visual sheet is `TIER0-ARCHITECTURE-REFERENCE` in `layout-gallery/index.html`. The supplied-reference index lives in `references/assets/architecture-diagrams/user-provided/`.

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
