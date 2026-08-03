# Tier0 Architecture Diagram Reference

Use this reference before generating, drawing, or asking an image model for an architecture diagram. The first decision is the **relationship grammar**, not the visual style.

The live visual sheet is `TIER0-ARCHITECTURE-REFERENCE` in `layout-gallery/index.html`. The supplied-reference index lives in `references/assets/architecture-diagrams/user-provided/`.

## Choose one grammar

| Grammar | Use when | Structure | Do not use when |
|---|---|---|---|
| Namespace hub | Several systems connect through one semantic core | Sources / applications point to one labeled namespace | You need to show a strict sequence |
| Linear flow | Information has an intentional direction | Source → flow → namespace → event flow → application | Systems communicate in many peer-to-peer directions |
| Layered tree | The namespace itself is the story | Factory → line → device → metric / state / action | The central concern is system integration |
| Point-to-point contrast | Explaining why a unified layer matters | Tangled before-state beside a clean target state | A target architecture should stand on its own |

## Tier0 translation rules

- Keep labels in HTML whenever possible. SVG only carries nodes, connectors, and simple geometric state.
- One diagram = one relationship grammar. Do not combine tree, hub, and mesh as decoration.
- The semantic core or active route uses `#B2ED1D`; all other nodes are paper/grey with ink hairlines.
- Use 1–1.5px connectors and no shadows, noisy outlines, glow, coin icons, or rasterized texture.
- Every connector must have a reason. If a reader cannot name the relationship, remove it or label it outside the SVG.
- Use `#73B200` only for readable green text on a white background; otherwise keep labels ink.
- Prefer a maximum of 6 external systems and 3 hierarchy levels in a slide diagram. Split complex models across slides.

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
