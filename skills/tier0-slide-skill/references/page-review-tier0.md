# Tier0 page review gate

Run this gate after completing **every slide**, at final render size and after its entrance animation has settled. Record `pass`, `revise`, or `needs-source` in the working plan; do not postpone a failed page to the end of the deck.

## Review order

0. **Gallery fidelity** — Open the matched `Sxx` in `layout-gallery/index.html` side by side. Structure and density should feel the same family. Fail if the page invents rotated diamond ornaments, diagonal “signal” bars, ASCII fill outside `cover-editorial`, or stacks large ink cards on a light content page. See `gallery-fidelity-tier0.md`.
1. **Language & composition** — One language per deck page. Fail bilingual glosses under Chinese (or Chinese under English). Fail left-empty / right-cramped dual columns. Fail large unanchored voids in short-copy cards (use corner number or Gallery sketch). Chinese S10 titles need ~1.14 line-height. See `composition-craft-tier0.md`.
2. **Source fidelity** — Does `data-source-ids` identify the exact source section? Do title, terms, user story, exception and technical names retain their source meaning? Check the coverage ledger before evaluating aesthetics.
3. **Message** — Can a viewer identify the page conclusion in five seconds? Is there one dominant title and one evidence path?
4. **Evidence** — Does each image, screenshot, diagram, number, and icon explain the conclusion? Remove decorative elements and unverified figures. Concept illustrations must follow `tier0_illustration_style` (see `illustration-slots-tier0.md`); product claims prefer real screenshots over illustrations.
5. **Hierarchy** — Is the reading path title → explanation → proof clear? Are emphasis, labels, and body text readable from a presentation distance? On a light surface, ordinary text must be ink/grey; use a green surface with ink text, or `--accent-text-dark` only for essential readable signals.
6. **Geometry** — Check canvas bounds, chrome/nav safe area, image crop, connector endpoints, chart labels, and all grid columns. No clipping, overlap, or hidden content is acceptable. Screenshot/video frames must declare `data-media-fit`; `contain` is only valid when the intentional letterbox supports the evidence.
7. **Balance** — Is whitespace intentional? Prefer equal-width dual stacks with equal row distribution. Check for a crowded side opposite an empty side, large unanchored blank areas, unequal card density, and gaps below 40px equivalent between independent blocks. If a page has little source content, enlarge/recompose the evidence and title block rather than leaving a gallery-sized void.
8. **Brand** — Use IBM Plex, Tier0 green only for focus, IBM Carbon icons where icons are needed, square/near-square surfaces, and real product evidence.

## Fast pass / fail table

| Check | Pass | Revise when |
|---|---|---|
| Gallery match | Same grammar as target `Sxx` (cards, gaps, sketch/icon language) | Custom deco CSS, diamond corners, ASCII on closing, or ink-card spam on a white page |
| Language | One language; product tokens only as needed | Chinese body + English paraphrase sentence in the same block |
| Balance | Equal dual columns / equal card cells; short copy has a visual anchor | Left empty & right cramped; large void under short card copy |
| Title | One takeaway, left-aligned body title; Chinese ink titles ~1.14 line-height | Two competing headlines, isolated single-word wraps, or CJK lines glued at 0.9 lh |
| Copy | Short, scannable, evidence-led | Paragraphs compete with the visual or labels become smaller than readable body text |
| Layout | All content fits with safe breathing room | Any canvas overflow, collision, crop, nav collision, or arbitrary blank hole appears |
| Graphic | One relationship grammar and clear labels | Lines cross without meaning, arrows hit nodes, icons are decorative, or the diagram needs explanation to be legible |
| Media | Real image / video / Tier0-styled illustration is correctly framed and role-tagged | A subject is cropped, distorted, too small, treated as wallpaper, or uses a non-Tier0 illustration style |
| Emphasis | One green focus and consistent hierarchy | Green is used as ordinary text color on white, or several elements compete as “active” |
| Source coverage | Every required item is mapped and visible | A source heading, scenario sub-step, boundary, exception, or literal technical block silently disappears |
| Product media | Frame fits the evidence at a useful scale | UI sits inside an oversized empty black/grey frame, is distorted, cropped, or has accidental letterbox bars |

## Repair order

1. Remove secondary content or split the message across slides.
2. Switch to a better-matched Gallery grammar (copy structure from Gallery, do not invent a new skin).
3. Strip decorative geometry (rotated diamonds, diagonal bars, non-cover ASCII) and bilingual glosses.
4. Rebalance columns to `1fr 1fr` with equal row stacks; for short cards use corner numbers or `line-sketch`.
5. Adjust spacing and only then type scale (Chinese ink titles → line-height ≥ 1.12).
6. Re-render and rerun the gate.

Never solve overflow by shrinking the whole page, turning body text into captions, or placing content on top of the navigation.
