# Source-first deck workflow

Use this workflow whenever the user starts with documents, media, an existing deck, or a PPTX. The material is evidence; the Gallery is a design language.

**When optimizing an existing PPTX**, also obey `source-fidelity-tier0.md`:

- **Default Mode A (style harmonize):** if the source already has a clear layout and assets, preserve the page structure; only unify fonts, colors, borders, and radii via `DESIGN.md` / `tokens/deck.css`. Do **not** overturn a good deck into Gallery clones.
- Cover / closing may still use the locked Tier0 grammars (`TIER0-COVER-EDITORIAL`, `TIER0-CLOSING-SPLIT`) while keeping source copy and hero intent.
- Mode B (structural rebuild) only for broken pages or explicit `adaptive` / `rebuild`.
- same page count; keep every image/video on its original semantic page; never misuse icons as heroes  
- titles must be full readable sentences  
- **forbid** batch shelling every slide into one empty HTML template  

Page count alone is not a pass. A restyled deck that no longer matches the source composition is also a fail under Mode A.

## 1. Build the deck brief

| Capture | Questions to answer |
|---|---|
| Purpose | What must the audience understand, decide, approve, or do? |
| Audience | Who is in the room? What do they already know? |
| Narrative | What is the one-sentence conclusion of each chapter? |
| Evidence | Which source proves each claim: document, number, screen, video, photo, or diagram? |
| Constraints | Required pages, terms, legal restrictions, language, duration, and output format |

Do not invent evidence. Mark unsupported claims as `待确认` or convert them to a qualitative statement.

## 2. Inventory and preserve source material

| Source | Preserve | Improve |
|---|---|---|
| Structured chapter document | Facts, sequence, customer language | Split dense paragraphs into slide-sized claims |
| Existing PPTX | **All pages**, verified diagrams, **all embedded media**, approved labels, **source composition** | Mode A: token/style only. Mode B (explicit): hierarchy repair — never silent deletion or asset remix |
| Screenshot / recording | Authentic product state from source assets | Crop, caption, placement — never invent UI |
| Demo video | File + one explainable task | HTML playback; PPTX poster frame if needed |
| Architecture image | Relationship grammar and named nodes | Rebuild as editable shapes when practical; else keep image |

For PPTX: unzip, count slides, export every `ppt/media/*` asset **with byte size**, map media → slide via relationships, **classify hero vs chrome-icon vs video**, and rebuild each page title as a full sentence **before** designing.

## 3. Create a slide map before building

Record a line for every slide:

```text
slide number → audience takeaway → evidence → gallery grammar → keep / reshape / replace → output-specific note
```

Example:

```text
06 → “One governed namespace connects plant and cloud.” → architecture brief + UI screenshot → S13 → reshape → editable nodes required in PPTX
```

## 4. Choose Gallery grammar, not Gallery copy

| Content shape | Start from | Adaptable parts |
|---|---|---|
| Two operating choices | S08 | Panel ratio, title/summary stack, evidence position |
| Ordered handoffs | S11 | Timeline spine, upper capability frame, label rhythm |
| Site-to-cloud system view | S13 | Two boundaries, core node, one directional bridge |
| Closed feedback loop | S14 | Ring geometry, side explanation, node axis |
| 2–4 real visuals | S15 | Evidence grid and captions |
| Video / live task | S16 | Player frame, left narrative, one task |
| Hierarchy or namespace | S17 | System field and explanatory columns |
| Business-value argument | S18 | Card hierarchy and highlight metrics |

Do not copy sample numbers, sample labels, page labels, or decorative structure that does not support the source material.

## 5. Select the delivery mode early

| Requirement | Choose |
|---|---|
| Need video, interaction, semantic motion, or maximal visual fidelity | HTML deck |
| Need client-side text edits and diagram editing | PPTX |
| Need both | Finalize the HTML composition first, then reconstruct PPTX as editable objects |

For PPTX, keep title, body, diagram nodes, connectors, and chart labels separate. Do not flatten the slide to a screenshot unless an asset is intrinsically raster (photo, video poster, product screenshot).
