# Tier0 page review gate

Run this gate after completing **every slide**, at final render size and after its entrance animation has settled. Record `pass`, `revise`, or `needs-source` in the working plan; do not postpone a failed page to the end of the deck.

## Review order

1. **Source fidelity** — Does `data-source-ids` identify the exact source section? Do title, terms, user story, exception and technical names retain their source meaning? Check the coverage ledger before evaluating aesthetics.
2. **Message** — Can a viewer identify the page conclusion in five seconds? Is there one dominant title and one evidence path?
3. **Evidence** — Does each image, screenshot, diagram, number, and icon explain the conclusion? Remove decorative elements and unverified figures. Concept illustrations must follow `tier0_illustration_style` (see `illustration-slots-tier0.md`); product claims prefer real screenshots over illustrations.
4. **Hierarchy** — Is the reading path title → explanation → proof clear? Are emphasis, labels, and body text readable from a presentation distance? On a light surface, ordinary text must be ink/grey; use a green surface with ink text, or `--accent-text-dark` only for essential readable signals.
5. **Geometry** — Check canvas bounds, chrome/nav safe area, image crop, connector endpoints, chart labels, and all grid columns. No clipping, overlap, or hidden content is acceptable. Screenshot/video frames must declare `data-media-fit`; `contain` is only valid when the intentional letterbox supports the evidence.
6. **Balance** — Is whitespace intentional? Check for a crowded side opposite an empty side, large unanchored blank areas, unequal card density, and gaps below 40px equivalent between independent blocks. If a page has little source content, enlarge/recompose the evidence and title block rather than leaving a gallery-sized void.
7. **Brand** — Use IBM Plex, Tier0 green only for focus, IBM Carbon icons where icons are needed, square/near-square surfaces, and real product evidence.

## Fast pass / fail table

| Check | Pass | Revise when |
|---|---|---|
| Title | One takeaway, left-aligned body title | The page has two competing headlines or the title wraps into isolated single words |
| Copy | Short, scannable, evidence-led | Paragraphs compete with the visual or labels become smaller than readable body text |
| Layout | All content fits with safe breathing room | Any canvas overflow, collision, crop, nav collision, or arbitrary blank hole appears |
| Graphic | One relationship grammar and clear labels | Lines cross without meaning, arrows hit nodes, icons are decorative, or the diagram needs explanation to be legible |
| Media | Real image / video / Tier0-styled illustration is correctly framed and role-tagged | A subject is cropped, distorted, too small, treated as wallpaper, or uses a non-Tier0 illustration style |
| Emphasis | One green focus and consistent hierarchy | Green is used as ordinary text color on white, or several elements compete as “active” |
| Source coverage | Every required item is mapped and visible | A source heading, scenario sub-step, boundary, exception, or literal technical block silently disappears |
| Product media | Frame fits the evidence at a useful scale | UI sits inside an oversized empty black/grey frame, is distorted, cropped, or has accidental letterbox bars |

## Repair order

1. Remove secondary content or split the message across slides.
2. Switch to a better-matched Gallery grammar.
3. Rebalance columns, evidence size, and block grouping.
4. Adjust spacing and only then type scale.
5. Re-render and rerun the gate.

Never solve overflow by shrinking the whole page, turning body text into captions, or placing content on top of the navigation.
