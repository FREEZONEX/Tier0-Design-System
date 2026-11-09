# Tier0 Layout Gallery · Canonical Style Source

`layout-gallery/` is the visual source of truth for Tier0 slide work in this skill package. It is not a deck to copy page-for-page: it is a calibrated set of 26 registered page grammars. S10 is an ink-only section divider; S23 preserves source code/logic; `TIER0-ARCHITECTURE-REFERENCE` is a generation aid; use `TIER0-CLOSING-SPLIT` as the one closing page.

Use it whenever an existing Tier0 file needs a new page, a layout repair, or a visual consistency pass.

## Read in this order

1. Open `layout-gallery/index.html` and use `ESC` to inspect the whole rhythm.
2. Navigate to the closest content shape; press `R` to show its purpose, use case, visual rule, and anti-pattern over the 12-column alignment grid.
3. Read `layout-gallery/layout-catalog.json` when selecting layouts programmatically or planning a deck.
4. For architecture work, read `architecture-diagrams-tier0.md` and inspect `TIER0-ARCHITECTURE-REFERENCE` before selecting S17 or generating a diagram.
5. Copy the registered structure, then replace only copy, factual evidence, and the permitted image / data slot.

## Non-negotiable grammar

- **Fidelity first:** open the target Gallery page and copy its structure before inventing CSS. Full bar: `gallery-fidelity-tier0.md`.
- Canvas: 16:9, `canvas-card`, shared left/right content axis, minimum 40px canvas gutter.
- Head: the chrome already identifies the layout. Do not spend vertical space on a second page-level `CHAPTER CLOSE` / `WHY NOW` kicker. Put the mono `■ LABEL` treatment on an argument, a stage, a data figure, or an evidence block where it adds local meaning.
- Rhythm: use 8px spacing tokens; blocks normally keep ≥40px separation. Registered dense layouts such as S19 may intentionally use a smaller internal gap.
- Color: `#B2ED1D` is a signal surface / active state, not default white-background text. Use `#73B200` only where readable signal text is required.
- Text: IBM Plex Sans 400/500 for display; smaller text is never lighter than larger text.
- Evidence: real product screenshots/recordings, sourced data, or a clearly labelled pending slot. Never substitute a generated product UI mockup, generic SaaS dashboard, invented KPI, or ornamental chart.
- Images: direct rectangular evidence blocks; no decorative rounded cards, glow, or generic gradient backgrounds.
- Image groups: S15 is the 2–4 image evidence grammar. Use one primary image plus supporting context/detail/outcome images, with one concise caption under every image.
- Demo media: S16 is the only gallery grammar for a recorded task or live web proof—left side frames the question, right side is one 16:9 rectangular player. Video is muted by default; iframe embeds are sandboxed.
- Source logic: S23 is the grammar for routing trees, configuration, API payloads and long execution rules. Preserve literal tokens, indentation, source order and a readable 18px+ code field; split instead of shrinking.
- **Decoration ban:** no rotated diamond corner marks, diagonal filler bars, hard grid overlays on section dividers, or `ascii-bg` outside `cover-editorial`. Prefer Gallery `line-sketch` or one Carbon icon.
- **Composition craft:** one language per page; equal-width dual stacks; corner-number cards for short 2×2 copy; Chinese S10 titles use ~1.14 line-height. See `composition-craft-tier0.md`.

## Variation grammar

- Do not repeat the same surface or card silhouette more than twice in adjacent pages. Rotate between **editorial rails**, **named process stages**, **evidence fields**, **technical ledgers**, **relationship diagrams**, and **data figures** according to the reading task.
- Use cards only when the items need comparable containers. For three arguments, prefer a shared top rail with vertical dividers; for a sequence, use a dotted spine or staggered weave; for a relationship, use labelled nodes and connectors rather than cards that imitate a flowchart.
- Abstract illustrations use the Tier0 line language: black or grey 1–1.5px geometry, paper fields, one lime signal, no gradients, shadows, glossy 3D, or decorative icon packs. One compact sketch per module is enough.
- Process grammar: pick one structure before drawing—linear handoff, staggered weave, hub-and-spoke, hierarchy, loop, or before/after. Dotted connectors describe a path; solid lime is reserved for the active bridge or core.
- Data grammar: `rank` for priority, `slope` for a before/after change, `waterfall` for contribution, and `waffle` for composition. Add source, unit and time range before replacing the illustrative placeholder.

## How to adapt a layout

1. Match the **content shape** first: thesis, sequence, comparison, loop, architecture, metric, catalogue, or evidence hero.
2. Keep the gallery page's composition and density. Delete content before shrinking type or inventing a new layout.
3. Preserve the page's signal logic: in a comparison there is one focus, in a loop there are no decorative icons, in a card set hover is the active state. Choose a different registered grammar when the previous page already uses the same container type.
4. Use `data-layout="Sxx"` and an existing `data-animate` recipe. Add a new layout only after the registered layouts demonstrably cannot carry the content.
5. Run the Tier0 validator. For gallery changes, regenerate the catalog as part of the same change.

## Gallery maintenance

```bash
node skills/tier0-slide-skill/scripts/build-tier0-layout-gallery.mjs
```

The command regenerates the catalog, builds the HTML, and validates all 25 registered layouts in one pass.

Every gallery section must keep these attributes current:

```html
data-reference-role="..."
data-reference-use="..."
data-reference-rule="..."
data-reference-avoid="..."
data-reference-evidence="..."
```

They power `R` reference mode and the JSON catalog, so a visual change and its usage rule cannot silently diverge.
