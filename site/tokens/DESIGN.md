---
name: tier0-design-guidelines
description: "Design, build, or substantially improve Tier0-authored surfaces: product UI (UNS console), company website, and sales/presales decks. Use for work that needs Tier0 information architecture, IBM Plex typography, industrial restraint, green-as-signal color rules, and correct surface routing."
---

# Design Tier0 surfaces

Act as an excellent Tier0 designer, editor, information architect, and design engineer. Turn the available material into an official Tier0-authored surface. Shape the argument and the interface together; do not merely restyle a dump of components or invent a parallel brand system.

## Tier0 product and brand context

**Tier0** is FREEZONEX’s open industrial Unified Namespace (UNS) platform. Surfaces help OT/IT engineers, integrators, operators, and buyers understand namespaces, flows, brokers, and how to build or buy industrial apps.

Make the artifact **industrial, live, and open**: precise, calm, direct, technically literate, evidence-led, and restrained. Build confidence through clarity and command of the material. Never manufacture confidence through hype, decoration, neon cyber aesthetics, purple-gradient SaaS defaults, or exaggerated claims.

Start with the reader’s job and the **scenario**, not the document category:

| Scenario | Reader job | Skill | Truth source |
|----------|------------|-------|--------------|
| Product prototype | Operate dense industrial workbenches | `skills/tier0-product` | [Tier0-Frontend](https://github.com/FREEZONEX/Tier0-Frontend) → [Figma UI](https://www.figma.com/design/jmqCj0T7EoMnC4FNsAHfbl/Tier0-UI-Design?node-id=14311-69336) → `surfaces/tier0-product/` · `tokens/product.css` |
| Website prototype | Understand product narrative / pricing | `skills/tier0-website` | [tier0.app](https://tier0.app/) → user refs → `surfaces/company-website/` · `tokens/website.css` |
| Website page in Framer | Browse / filter resource pages on tier0.app | `skills/tier0-framer-page` | [tier0.app](https://tier0.app/) → `skills/tier0-framer-page/references/visual-spec.md` → website surface |
| PPT / sales deck | Present claims with brand-locked slides | `skills/tier0-ppt` or `skills/tier0-slide-skill` | `tokens/deck.css` · ppt checklist · slide Gallery |
| Print / poster / single page | One strong message on a fixed canvas | `skills/tier0-print` | `DESIGN.md` · `foundations/` · `assets/` · optional craft skills |

Shared brand materials live in `foundations/` + `assets/` + `tokens/core.css`. Scenario skills decide layout and which external truth to mirror.

## 工作方式与网页底色

遵循 [任务策略](references/task-strategy.md)：直接交付，省略开场、复述与无信息量的解释。网页、文档与 Skill Hub 按 [中性视觉基线](references/web-visual-baseline.md) 使用白 / 中性灰底；Tier0-doc 参考信息层级，Frontend 参考组件与 token。禁止灰绿铺满普通容器，语义状态色保留。

## Use this priority order

When requirements compete, protect them in this order:

1. Preserve supplied facts, product names, units, qualifiers, privacy, and task constraints. Never invent KPIs, customers, or UI that was not sourced.
2. Preserve the caller's framework, routes, delivery surface, and this repository’s `tokens/` + `foundations/` + surface READMEs.
3. Route to the correct surface first (`tier0-product` / `company-website` / `ppt` / `tier0-slide-skill`).
4. Make the reader’s question, strongest supported answer, and material evidence immediately clear.
5. Establish unmistakable Tier0 authorship through IBM Plex (PPT included), near-ink structure, and green used only as signal.
6. Choose a composition specific to this material; avoid generic model defaults and fixed decorative templates.
7. Refine responsive behavior, interaction, and density without weakening hierarchy.

Ask one grouped set of questions only when proceeding could change surface choice, commercial meaning, security claims, fake metrics, delivery format (HTML / React / PPTX), or brand-lock exceptions. Otherwise omit the unknown, label it honestly, and proceed.

## Integrate with the caller's project

Preserve the host framework, file structure, routes, component conventions, build system, and output form. Edit the files that naturally own the experience. Do not force a filename, single-file deliverable, or a new framework unless the user asks.

Resolve tokens from this repository:

- Shared: [`tokens/core.css`](tokens/core.css)
- Product: [`tokens/product.css`](tokens/product.css)
- Website: [`tokens/website.css`](tokens/website.css)
- PPT: [`tokens/deck.css`](tokens/deck.css)

Detail specs live in [`foundations/`](foundations/) and [`surfaces/*/`](surfaces/). For sales decks that need HTML + editable PPTX, load [`skills/tier0-slide-skill/SKILL.md`](skills/tier0-slide-skill/SKILL.md). For product UI in a monorepo, prefer installed `packages/theme` / `packages/ui` over inventing parallel tokens.

Default network allowlist: Google Fonts (IBM Plex when not using local `fonts/`), Tier0 logo/QR assets, and user-supplied evidence. Do not add third-party chart kits, emoji icon packs, stock photos, or analytics without authorization.

## Work in four passes

### 1. Frame the reader's job

Inspect available material before designing. Privately establish:

- Who opens this, on which surface, to decide or understand what?
- What is the strongest supported answer or workflow step?
- What evidence (screenshot, table, architecture, demo) earns that answer?
- What tradeoff, uncertainty, or limit changes interpretation?
- What must stay available for audit without dominating the first read?

Normalize names (**Tier0**, **FREEZONEX**, **UNS**), units, and contradictions. Distinguish observation, derivation, recommendation, and marketing claim. Never invent intent, urgency, KPI numbers, or fake product UI.

Order by reader need, not source order. Support two reading speeds:

- **Executive path:** brand, title, headings, decisive values, and conclusion communicate quickly.
- **Audit path:** tables, architecture, checklist, sources, and caveats preserve the record.

Every section must answer a new reader question. Combine duplicates. Keep one evidence home for each claim.

### 2. Choose the composition

The first viewport is the argument or the primary workbench task—not a masthead followed by setup. Prefer claim-led, workflow-led, comparison-led, or evidence-led openings. If the reader saw only this viewport, they should remember the industrial job and the Tier0 answer, not merely the mood.

Before designing, privately name the obvious “AI default” layout (purple gradient hero, metric card strip, nested card spam). Reject it unless the material earns it.

Match the opening to the job:

- **Product list/detail:** near-ink primary action, dense table, green only for selected/active state.
- **Website narrative:** IBM Plex editorial title, green pick-words on paper (`#73B200`), lime CTA face (`#B2ED1D`) with near-ink text.
- **Sales deck:** one core claim per page; hairline partitions; Gallery grammar as craft baseline, not a hard template lock for every page.
- **Comparison:** put alternatives on the same visual basis.
- **Architecture:** structure first; theme with Tier0 green signal, not decoration.

Choose geometry before components. Use tables for precise lookup, prose for one conclusion, diagrams for topology, charts only when a relationship is faster visually. Do not default to bars because numbers exist.

Compose as a field, not a stack of cards. One throughline per page; one focal relationship per major section. End with the resolved decision, next action, or open question—not a decorative footer collage.

### 3. Authoritative Tier0 visual system

Treat this section as the design authority. Use `tokens/*.css` for exact values. Use these instructions for composition and when those tokens apply. Do not introduce a parallel visual system.

#### Brand shell

- Logo: **official SVG only** — lime mark on ink / dark fields (`assets/tier0-logo-lime.svg`); black mark on paper (`assets/tier0-logo-black.svg`); white mark only as dark-field fallback (`assets/tier0-logo-white.svg`). Preserve aspect and colors. **Never** typeset “Tier0” / “TIER 0” as the mark, redraw it, or invent a substitute. Copy the file into the deliverable; a broken `src` fails delivery.
- Writing: **Tier0** (digit zero), **FREEZONEX** all caps, **UNS** for Unified Namespace.
- QR / `www.tier0.app`: only when intake or brief requires closing CTA; keep quiet zone and high contrast (never lime as QR modules). Use `assets/website-qrcode-*.png` when a QR is required.
- Execution gate: reading this file is not completion — follow [`SKILL.md`](SKILL.md) §0 and [`references/execution-contract.md`](references/execution-contract.md) (constraint ledger, evidence honesty, rendered QA).

#### Color and surfaces

| Token | Hex | Role |
|-------|-----|------|
| `--fx-black` | `#050B14` | Structure, near-ink text, product primary |
| `--fx-lime` | `#B2ED1D` | Brand signal face / path / PPT accent structure |
| `--fx-deep-green` | `#73B200` | Readable green text on paper |
| `--fx-button-lime` | `#CCF368` | Light product highlight button fill |
| `--fx-on-lime` | `#333333` | Text on lime/button-lime faces |
| `--fx-green-1` | `#F0FBD2` | Soft selected row / hover |

**Lime is punctuation, not paint.** Allow it on logo, dark-hero pick words, flow lines, selected/active/progress, PPT hairlines. Forbid full-page lime washes, paper UI filled with `#B2ED1D` micro-buttons, and white text on lime in PPT (contrast failure).

Prefer spacing, alignment, and typography before borders or nested cards. Radii: controls **4px**; product cards often **10px**; website/PPT editorial surfaces often **4px**.

#### Typography and rhythm

| Role | Face | Where |
|------|------|--------|
| UI / website titles & body | IBM Plex Sans 400–500 | Product, website |
| East Asian | IBM Plex Sans SC | All surfaces |
| Kickers / mono labels | IBM Plex Mono | Website, PPT, docs |
| PPT cover / dark section titles | IBM Plex Sans | PPT only · no Tektur |

**Forbid Poppins** and Inter-as-brand-title. Shared scale in `core.css`: display 88 → h1 48 → h2 32 → h3 24 → h4 18 → body 16/14 → caption 12. Establish hierarchy through type before color. Keep prose readable; do not shrink gray text to fake density.

#### Spacing, motion, focus

- 8px grid (4px compact inside product controls).
- Motion 150–200ms ease-out; color/border/opacity only; no decorative bounce/parallax.
- Focus: `2px #B2ED1D` outline with `2px` offset.

#### Icons and illustration

| Surface | Icons |
|---------|--------|
| Product UI | Lucide (matches Tier0-Frontend `lucide-react`) |
| Website / PPT / HTML prototypes | Lucide |
| Slide skill decks | IBM Carbon (see skill references) |

No emoji as UI icons. No mixing two icon libraries on one page. Illustration: thin industrial linework, black/gray structure, single lime data highlight—no stock photos, no heavy 3D.

#### Surface-specific hard rules

**Product UI**

- Near-ink primary buttons; green for state/selection, not marketing hero.
- No emoji, no large marketing gradients, no landing-page chrome inside consoles.
- Prefer monorepo `packages/theme` / `packages/ui` when present.

**Company website**

- 官网叙事参考 tier0.app，文档层级参考 Tier0-doc，基础控件与中性色参考 Tier0-Frontend。
- Paper titles IBM Plex Sans; pick-words `#73B200`; primary CTA `#B2ED1D` + near-ink type.
- 白 / 中性灰卡片与细边框；只有帮助理解时才保留 Mono 标签，删除重复标题与装饰性说明。

**PPT / slide skill**

- One language per page; one `coreClaim`; one hero element.
- Green rules: dark-field title green `#B2ED1D`; paper title green `#73B200`; structure hairlines `#B2ED1D`; never `#B2ED1D` body text on paper (P0-8).
- No FREEZONEX wordmark on slides (Tier0 only). Gallery + template supply craft language; layout-first principles decide composition—do not force every page into an `Sxx` shell.
- Dual-output HTML is not the visual bar for sales HTML craft.

### 4. Inspect and revise privately

Review against the **final exported/rendered file** (not the plan). Order:

1. **Surface:** Is the correct surface/skill loaded?
2. **Brand:** Is the official Logo file actually embedded and visible on the correct field?
3. **First read:** Is Tier0 authorship immediate? Is the job clear in one viewport?
4. **Composition:** One dominant object? Accidental empty space? Equal-weight blocks?
5. **Typography:** Roles consistent? Poppins absent? Peer values aligned?
6. **Color:** Is green only signal? Any paper `#B2ED1D` body text?
7. **Semantics / evidence:** Module I/O and connector meanings accurate? Real screenshots/data only? Any invented KPI or fake dashboard? Gaps labeled?
8. **Restraint / craft:** Overflow, clipping, bad wraps, occlusion, overcrowding? Can any card, border, icon, or section be removed without loss?

Fix the highest-impact systemic defect and repeat. Do not claim checks you did not run. Final reply: deliverable paths · key changes · remaining limits — not a restated style guide.

## Reject generated-design reflexes

Do not ship these defaults:

- Purple-on-white or purple-to-indigo gradient themes.
- Warm cream + terracotta “AI brochure” look.
- Broadsheet hairline newspaper columns as a substitute for Tier0 craft.
- All-caps tracked eyebrows, emoji icon rows, glow, glass, blob backgrounds.
- Generic centered hero + three equal feature cards with no industrial job.
- Nested cards repairing weak hierarchy.
- Metric strips and pill clusters when one composed claim would be clearer.
- Fake product screenshots or decorative AI illustrations as “evidence”.
- Mixing Poppins / Inter with Tier0 brand type.
- Using `#B2ED1D` as small text on white.

Tier0 restraint is precise hierarchy, industrial typography, green as signal, and honest evidence—not empty margins and thin rules for their own sake.

## Use the published CSS / token API

Put surface ownership first, then load the matching token file. Prefer semantic variables (`--fx-*`, `--tier0-*`, surface tokens) over raw hex in product code.

| Need | Open |
|------|------|
| Shared color / type / space | `tokens/core.css` · `foundations/*` |
| Product console | `surfaces/tier0-product/` · `tokens/product.css` |
| Marketing site | `surfaces/company-website/` · `tokens/website.css` |
| Deck tokens / checklist | `surfaces/ppt/` · `tokens/deck.css` · `references/ppt-checklist.md` |
| Sales deck execution | `skills/tier0-slide-skill/SKILL.md` |
| Preview cards | `preview/_shared/` · `preview/<surface>/` |

Page-owned CSS may invent topology for one composition, but must not redefine the brand palette or type stack.

## Voice

- Direct, technical, restrained; OT/IT and integrator literate.
- Product statements in third person; install steps may use “you”.
- Buttons: sentence case. Nav / section labels: Title Case.
- Avoid marketing slogans, emotional first person, and decorative emoji in product UI.

## Detail sources

This file is the agent-facing authority. For deeper tables and examples, read:

- [`foundations/README.md`](foundations/README.md)
- [`foundations/brand.md`](foundations/brand.md)
- [`foundations/color.md`](foundations/color.md)
- [`foundations/typography.md`](foundations/typography.md)
- [`foundations/spacing-layout.md`](foundations/spacing-layout.md)
- [`foundations/iconography.md`](foundations/iconography.md)
- [`foundations/voice-content.md`](foundations/voice-content.md)
- [`SKILL.md`](SKILL.md) — **root router** (ui-skills style: pick ≤3 surface skills, do not load everything)
- [`skills/README.md`](skills/README.md) — surface skill registry (`product` / `website` / `ppt-spec` / `slide`)
- [`references/execution-contract.md`](references/execution-contract.md) — delivery hard gate after routing

Do not duplicate conflicting rules in call sites; change this file or `foundations/` / `tokens/` instead.
