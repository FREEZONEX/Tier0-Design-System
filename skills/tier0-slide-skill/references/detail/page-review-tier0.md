# Tier0 page review gate

Run this gate after completing **every slide**, at final render size and after its entrance animation has settled. Record `pass`, `revise`, or `needs-source` in the working plan; do not postpone a failed page to the end of the deck.

## Review order

0. **First principles & density** — Before aesthetics: can you state this page’s `purpose` and `coreClaim`? Is there exactly one `heroElement`? Are KPIs/tables/charts used when data exists (not buried in paragraphs)? Hairline dividers preferred over nested card spam. No overflow, overlap, or unbalanced columns. See `layout-first-principles-tier0.md`.
1. **Gallery fidelity** — Open the matched `Sxx` in `layout-gallery/index.html` side by side. Structure and density should feel the same family. Fail if the page invents rotated diamond ornaments, diagonal “signal” bars, ASCII fill outside `cover-editorial`, or stacks large ink cards on a light content page. See `gallery-fidelity-tier0.md`.
2. **Language & composition** — One language per deck page. Fail bilingual glosses under Chinese (or Chinese under English). Fail left-empty / right-cramped dual columns. Fail large unanchored voids in short-copy cards (use corner number or Gallery sketch). Chinese S10 titles need ~1.14 line-height. See `composition-craft-tier0.md`.
3. **Source fidelity** — When optimizing a source PPTX: is the work in **Mode A** (preserve composition, restyle tokens) or **Mode B** (rebuild broken structure)? Mode A fails if the page no longer matches the source thumbnail’s partitions/hero placement. Titles must be full sentences; media roles correct; assets not remixed across pages. See `source-fidelity-tier0.md`.
4. **Message** — Can a viewer identify the page conclusion in five seconds? Is there one dominant title and one evidence path? Fail if content is huddled in a corner with a large meaningless void (Mode B symptom — do not “fix” a Mode A page by inventing a new layout unless the void already existed in source and user asked to repair it).
5. **Evidence** — Does each image, screenshot, diagram, number, and icon explain the conclusion? Remove decorative elements and unverified figures. Concept illustrations must follow `tier0_illustration_style` (see `illustration-slots-tier0.md`); product claims prefer real screenshots over illustrations. Fail stamp-sized screenshots, icon-as-hero, or Demo pages with empty black blocks + tiny side media.
6. **Hierarchy** — Is the reading path title → explanation → proof clear? Are emphasis, labels, and body text readable from a presentation distance? On a light surface, ordinary text must be ink/grey; use a green surface with ink text, or `--accent-text-dark` only for essential readable signals. One hero number or one green focus per page. Fail huge title + ant-body, or repeated title tokens (`Notebook · Notebook`).
7. **Geometry** — Check canvas bounds, chrome/nav safe area, image crop, connector endpoints, chart labels, and all grid columns. No clipping, overlap, or hidden content is acceptable. Screenshot/video frames must declare `data-media-fit`; `contain` is only valid when the intentional letterbox supports the evidence. Margins ≥40px; independent blocks ≥40px apart.
8. **Balance** — Is whitespace intentional? Prefer equal-width dual stacks with equal row distribution. Check for a crowded side opposite an empty side, large unanchored blank areas, unequal card density. If a page has little source content, enlarge/recompose the evidence and title block rather than leaving a gallery-sized void.
9. **Brand** — Use IBM Plex, Tier0 green only for focus (not reference-purple), IBM Carbon icons where icons are needed, square/near-square surfaces, and real product evidence.

## Fast pass / fail table

| Check | Pass | Revise when |
|---|---|---|
| First principles | `purpose` + `coreClaim` clear; one hero; data upgraded to table/chart when present | Vague page; multiple competing heroes; KPIs buried in prose |
| Density / dividers | Hairline partitions; ≥40px margins; no overflow/overlap | Nested card spam; clipped text; unbalanced columns |
| Gallery match | Same grammar as target `Sxx` (cards, gaps, sketch/icon language) | Custom deco CSS, diamond corners, ASCII on closing, or ink-card spam on a white page |
| Language | One language; product tokens only as needed | Chinese body + English paraphrase sentence in the same block |
| Balance | Equal dual columns / equal card cells; short copy has a visual anchor | Left empty & right cramped; large void under short card copy |
| Title | One takeaway, left-aligned body title; Chinese ink titles ~1.14 line-height; full sentence from source | Two competing headlines, isolated single-word wraps, CJK lines glued at 0.9 lh, or PPTX text-run fragments used as h1 |
| Copy | Short, scannable, evidence-led | Paragraphs compete with the visual or labels become smaller than readable body text |
| Layout | All content fits with safe breathing room | Any canvas overflow, collision, crop, nav collision, or arbitrary blank hole / corner-huddled content |
| Graphic | One relationship grammar and clear labels | Lines cross without meaning, arrows hit nodes, icons are decorative, or the diagram needs explanation to be legible |
| Media | Real image / video / Tier0-styled illustration is correctly framed and role-tagged (hero ≠ icon) | Stamp screenshots, icon-as-hero, Demo empty black slab + tiny side media, or non-Tier0 illustration style |
| Cover | `TIER0-COVER-EDITORIAL` grammar; complete title; one right-side anchor | Template placeholders left in, broken title, or icon clutter on the cover |
| Template shell | Bottom progress + side nav + ESC overview present | Using dual flat QA HTML as final deck |
| Emphasis | One green focus and consistent hierarchy | Green is used as ordinary text color on white, or several elements compete as “active”; purple accents from non-Tier0 refs |
| Source coverage | Every required item is mapped and visible | A source heading, scenario sub-step, boundary, exception, or literal technical block silently disappears |
| Product media | Frame fits the evidence at a useful scale | UI sits inside an oversized empty black/grey frame, is distorted, cropped, or has accidental letterbox bars |

## Repair order

1. Rewrite `coreClaim` / pick a single `heroElement` (or split the slide).
2. Remove secondary content or split the message across slides.
3. Switch to a better-matched Gallery grammar + density prototype (`rule-list`, `metric-quad`, `ledger`, `viz-*`, `readout-split`).
4. Strip decorative geometry (rotated diamonds, diagonal bars, non-cover ASCII) and bilingual glosses.
5. Rebalance columns to `1fr 1fr` with equal row stacks; for short cards use corner numbers or `line-sketch`.
6. Adjust spacing and only then type scale (Chinese ink titles → line-height ≥ 1.12).
7. Re-render and rerun the gate.

Never solve overflow by shrinking the whole page, turning body text into captions, or placing content on top of the navigation.
