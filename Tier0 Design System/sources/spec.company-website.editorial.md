# Tier0 UNS Editorial Page Design System (PDF-Aligned Full Spec)

> Version: revised from the first PDF reference  
> Based on: `tier0-uns.pdf` long-form product page direction  
> Primary use: rebuild the Unified Namespace page style, generate aligned page mocks, and ground future page prompts

---

## 1. Design Character

This page style is **not** a generic SaaS homepage system.

It is a **long-form product narrative page** with a calm industrial editorial tone:
- structured
- quiet
- precise
- credible
- product-first
- diagram-led
- light, never glossy

It should not feel like:
- a startup hero with oversized CTA marketing energy
- a dark cyber-tech page
- a soft, playful consumer dashboard
- a dense technical whitepaper with no visual rhythm

It should feel like:
- a product story told through compact sections
- engineered, not decorative
- visual, but restrained
- crisp, modular, and readable
- built for explanation, not hype

The strongest signature in the PDF comes from this combination:
- **pure white root canvas**
- **very light gray section grouping blocks used sparingly**
- **compact mono eyebrow chips above sections**
- **Poppins-like bold display titles with selected green emphasis**
- **IBM Plex Sans style body copy**
- **thin-outline green-and-neutral technical illustrations**
- **white cards with subtle borders**
- **tight corners and almost no shadow**

---

## 2. Page Archetype

The first PDF is a **single long-scroll explanatory page**. It behaves more like a product concept page than a traditional homepage.

### 2.1 Page flow
Recommended section order:

1. Eyebrow + H1 + intro + hero diagram
2. Concept section
3. Protocol section
4. Architecture section
5. Structure section
6. Reuse section
7. Data model grid
8. Feedback loop section
9. Platform outcomes grid
10. Comparison / closing section

### 2.2 Narrative rhythm
Each section should alternate between:
- explanation
- diagram or code panel
- compact summary statement
- next concept block

The page should breathe. It should never feel like a wall of copy.

---

## 3. Canvas & Breakpoints

### 3.1 Desktop artboard
- Reference desktop frame: `1440px`
- Max content width: `1280px`
- Default readable text column: `560px - 620px`
- Default wide diagram zone: `560px - 700px`

### 3.2 Mobile artboard
- Reference mobile frame: `810px`
- Mobile container width: `calc(100% - 48px)`
- Narrow mobile fallback: `calc(100% - 32px)` below `480px`

### 3.3 Breakpoints
- `1440px`: desktop target
- `1100px`: two-column collapse threshold
- `810px`: mobile baseline required by user
- `480px`: narrow mobile cleanup

---

## 4. Background Hierarchy

The PDF uses a mostly white page with only light structural grouping.

### 4.1 Root page background
- `#FFFFFF`

### 4.2 Section band background
Use a very pale neutral gray-green wash only when grouping a visual cluster:
- `#F7F8F4`
- optional secondary wash: `#F8F8F6`

Use this for:
- hero diagram band
- comparison or grouped illustration zones
- selected grid sections
- illustration staging areas

Do not alternate every section aggressively. The page should remain mostly white.

### 4.3 Card / panel surface
- `#FFFFFF`

### 4.4 Soft staging surface
Use for code panels, diagram frames, and illustration boards:
- `#F6F7F3`
- `#F9FAF6`

### 4.5 Rule
The page should read as **white first, tinted second**.

---

## 5. Color System

### 5.1 Core tokens

| Token | Value | Role |
|------|------|------|
| `--page` | `#FFFFFF` | Root canvas |
| `--section-soft` | `#F7F8F4` | Light grouped section background |
| `--surface` | `#FFFFFF` | Card and panel surface |
| `--surface-soft` | `#F6F7F3` | Diagram / code stage |
| `--surface-soft-2` | `#F9FAF6` | Alternate soft stage |
| `--text` | `#171A22` | Primary heading text |
| `--text-2` | `#454C57` | Strong supporting text |
| `--text-3` | `#707780` | Paragraph text |
| `--text-4` | `#99A1AA` | Meta / utility text |
| `--border` | `#E2E6DE` | Primary border |
| `--border-2` | `#D6DDCF` | Stronger border / emphasis frame |
| `--green-brand` | `#A7CF3A` | Main accent green |
| `--green-brand-2` | `#8EBB1D` | Deeper green for icons / arrows |
| `--green-soft` | `#EEF6D7` | Soft icon / chip fill |
| `--green-soft-2` | `#F4F9E9` | Highlight panel fill |
| `--green-border` | `#CCDE9D` | Highlight border |
| `--code-orange` | `#E3A441` | Syntax accent |
| `--code-teal` | `#2CA7A0` | Syntax accent |

### 5.2 Accent rules
Green is used for:
- emphasized words inside headings
- eyebrow chip outlines and text
- diagram arrows
- icon strokes / fills
- highlighted summary bars
- comparison card emphasis
- selected frame borders

Do not use green for full paragraphs.

### 5.3 Neutral rules
Most of the page should be carried by:
- white
- near-black text
- pale gray borders
- restrained green punctuation

---

## 6. Typography

### 6.1 Typeface system
Use:
- **Primary heading font:** `Poppins`
- **Body font:** `IBM Plex Sans`
- **Utility / eyebrow / code-adjacent labels:** `IBM Plex Mono`

### 6.2 Usage model

**Poppins**
- H1
- section H2
- card titles
- grid item titles
- highlighted summary lines

**IBM Plex Sans**
- lead paragraphs
- body paragraphs
- card descriptions
- section support copy
- comparison bullets

**IBM Plex Mono**
- eyebrow chips
- code window captions
- technical micro labels
- tiny system labels
- optional diagram tags

### 6.3 Type scale

| Role | Font | Size | Weight | Line-height | Tracking |
|------|------|------|--------|-------------|----------|
| Eyebrow chip | IBM Plex Mono | 10px | 500 | 1.2 | `0.04em` |
| Hero H1 | Poppins | 76px | 700 | 0.98 | `-0.05em` |
| Hero H1 tablet | Poppins | 60px | 700 | 1.0 | `-0.05em` |
| Hero H1 mobile | Poppins | 38px | 700 | 1.04 | `-0.04em` |
| Section H2 | Poppins | 46px | 700 | 1.08 | `-0.04em` |
| Section H2 mobile | Poppins | 30px | 700 | 1.14 | `-0.03em` |
| Subheading / card title | Poppins | 24px | 600 | 1.18 | `-0.03em` |
| Grid tile title | Poppins | 22px | 600 | 1.2 | `-0.02em` |
| Lead paragraph | IBM Plex Sans | 18px | 400 | 1.7 | normal |
| Body paragraph | IBM Plex Sans | 16px | 400 | 1.72 | normal |
| Small body | IBM Plex Sans | 14px | 400 | 1.65 | normal |
| Caption / utility | IBM Plex Sans | 12px | 400 | 1.5 | normal |
| Mono utility | IBM Plex Mono | 10px | 500 | 1.35 | `0.02em` |

### 6.4 Heading composition rules
Headings in the PDF follow these patterns:
- sentence-case or title-case hybrids
- 2-line or 3-line blocks
- one key phrase in green
- never fully green
- left-aligned in split sections
- centered in single-column sections

Example structure:
- `Why the namespace matters`
- `beyond messaging`

or

- `Applications do not just consume`
- `data - they write back`

### 6.5 Body copy width rules
- Short explanatory paragraphs should stay within `520px - 620px`
- Centered explanatory copy should stay within `820px`
- Comparison bullets may use shorter lines for scanability

---

## 7. Spacing & Rhythm

### 7.1 Global spacing
- top page padding: `78px`
- hero intro to diagram gap: `44px`
- section-to-section desktop: `120px`
- section-to-section mobile: `80px`
- internal text block gap: `18px - 22px`
- eyebrow to heading: `18px`
- heading to support copy: `18px`
- support copy to media: `28px - 36px`

### 7.2 Two-column section spacing
- desktop columns: `1fr 1fr`
- gap: `64px`
- vertical align: start
- no decorative vertical dividers

### 7.3 Centered section spacing
- centered eyebrow
- centered H2
- centered short intro paragraph
- grid starts after `44px`

### 7.4 Mobile spacing
At `810px`:
- all major two-column sections stack
- grid gaps drop to `16px - 20px`
- section padding becomes visually tighter
- long illustrations scale down but keep white breathing room

---

## 8. Structural Layout Patterns

### 8.1 Pattern A: Hero narrative + wide diagram
Use for the top section:
- left-aligned eyebrow chip
- large multi-line H1
- 2 intro paragraphs
- wide bordered diagram panel below

### 8.2 Pattern B: Left text + right code panel
Use for concept sections:
- text column about `44% - 48%`
- code or diagram panel about `52% - 56%`

### 8.3 Pattern C: Left diagrams + right explanation
Use for architecture or feedback loop sections:
- stacked small diagram panels on one side
- heading, paragraph, bullets, and summary bar on the other

### 8.4 Pattern D: Centered heading + card grid
Use for:
- "What can be modeled..."
- "What this enables..."
- other taxonomy sections

### 8.5 Pattern E: Closing comparison cards
Use 2 strong bordered cards in a centered band:
- left = traditional integration
- right = Tier0 Unified Namespace
- same width
- subtle highlight on the Tier0 side

---

## 9. Component System

## 9.1 Eyebrow Chip

### Visual
- outlined pill-like micro chip, but still restrained
- very light green tint
- thin border
- tiny mono uppercase text

### Spec
- height: `22px`
- padding: `0 10px`
- radius: `999px`
- background: `#F3F8E8`
- border: `1px solid #D7E5B2`
- text color: `#8EBB1D`

### Usage
- one per major section
- never oversized
- no icon required

---

## 9.2 Hero Title Block

### Rules
- large black title with 1 highlighted green phrase
- maximum width around `820px`
- 2-3 lines on desktop
- do not fully justify
- use tighter line-height than body

### Highlight
Accent only the most important phrase:
- `Unified Namespace`
- `beyond messaging`
- `the architecture`
- `they write back`
- `across the platform`
- `connectivity`

---

## 9.3 Intro / Lead Copy

### Rules
- IBM Plex Sans
- medium-long lines
- subdued gray
- 2 paragraphs max at the top of a section
- no bold unless naming a concept

### Spec
- font size: `16px - 18px`
- line-height: `1.7`
- max width: `1120px` in hero intro, `600px` in split sections

---

## 9.4 Diagram Panel

### Purpose
Used for:
- system flow diagrams
- namespace tree diagrams
- comparison diagrams
- illustration boards

### Visual
- white or soft-stage background
- 1px border
- tiny radius
- no shadow
- generous internal padding
- centered composition

### Spec
- radius: `4px`
- border: `1px solid #E2E6DE`
- background: `#F9FAF6` or `#FFFFFF`
- padding desktop: `28px - 40px`
- padding mobile: `18px - 22px`

---

## 9.5 Code Window

### Visual
The PDF uses a lightweight fake code editor frame:
- top chrome strip in soft gray
- three tiny dots at top-left
- faint label at top-right
- syntax colors in green / orange / teal / gray
- plenty of whitespace

### Spec
- background: `#F7F8F5`
- border: `1px solid #E2E6DE`
- radius: `4px`
- top bar height: `24px`
- dot size: `6px`
- code font: `IBM Plex Mono`, `12px - 13px`
- code line-height: `1.8`

---

## 9.6 Summary Bar / Callout Strip

This appears as the short highlighted statement near the end of sections.

### Visual
- pale green fill or white surface with green left rule
- short statement only
- stronger tone than paragraph copy

### Two acceptable variants

#### Variant A
- background: `#F4F9E9`
- border: `1px solid #D6E5AF`
- padding: `14px 18px`

#### Variant B
- background: `transparent`
- border-left: `4px solid #9CCB2F`
- padding-left: `16px`

### Text
- Poppins or IBM Plex Sans medium
- `20px - 24px` desktop
- `18px` mobile

---

## 9.7 Grid Tile

Used in the "What can be modeled..." and "What this enables..." sections.

### Visual
- white card
- 1px border
- compact icon square at top-left
- title below or beside icon
- small explanatory copy

### Spec
- min height desktop: `184px`
- padding: `26px`
- radius: `4px`
- background: `#FFFFFF`
- border: `1px solid #E2E6DE`

### Icon token
- icon box: `42px × 42px`
- background: `#EEF6D7`
- icon color: `#8EBB1D`
- radius: `6px`
- icon library: **[Lucide](https://lucide.dev)** — 22px, `stroke-width: 1.75`（见 `foundations/icons-lucide.md`）
- HTML 类名: `.tier0-icon-box` inside `.tier0-card-icon`（`tokens/icon-card.css`）

---

## 9.8 Comparison Card

### Visual
- two side-by-side cards
- very subtle tint on the Tier0 card
- clear heading and short bullet list
- no icons required, but tiny list markers acceptable

### Spec
- padding: `28px 30px`
- min height: `220px`
- border: `1px solid #E2E6DE`
- radius: `6px`
- standard background: `#FFFFFF`
- emphasized background: `#F7FAEF`
- emphasized border: `#D5E4A9`

---

## 10. Illustration Generation Rules

This is one of the biggest changes needed from the old docs.

The PDF style uses **clean technical illustrations**, not dark dramatic images.

### 10.1 Illustration character
Generated illustrations should feel:
- flat-isometric or lightly axonometric
- technical
- airy
- modular
- calm
- schematic
- white-background friendly

### 10.2 Required style traits
- white PNG background preferred
- thin vector outlines
- pale green + sage + soft gray palette
- minimal gradients
- extremely light shadowing only when necessary
- compact object clusters
- clear whitespace around the object
- visually compatible with cards, diagrams, and code panels

### 10.3 Preferred subject treatment
Use simplified industrial-software metaphors:
- server / device / database stacks
- namespace trees
- arrows and flow loops
- app windows
- dashboards
- cubes / signals / nodes
- folders / state icons / workflow icons

### 10.4 Avoid
- dark navy or black backgrounds
- neon glow effects
- glassmorphism
- 3D photorealism
- highly saturated greens
- cartoon mascots
- decorative gradients
- dense visual noise
- thick outlines

### 10.5 Color guidance for generated illustrations
Preferred palette:
- accent green: `#A7CF3A`
- icon green: `#8EBB1D`
- pale green fill: `#EAF3CD`
- pale neutral: `#F4F5F1`
- line gray: `#BFC7BC`
- text dark: `#171A22`

### 10.6 Composition rules
- object centered in frame
- generous padding around illustration
- no edge collisions
- avoid filling the entire card area with detail
- keep illustrations readable at card scale

### 10.7 Prompt guidance
Use prompt phrases like:
- `clean isometric industrial software illustration`
- `white background`
- `Tier0 editorial diagram style`
- `soft lime green and neutral gray palette`
- `thin vector outlines`
- `minimal shadow`
- `technical, modular, calm`

---

## 11. Borders, Radius, Shadows

### 11.1 Radius
The page is slightly softer than the homepage cards, but still tight.

| Element | Radius |
|--------|--------|
| Diagram panel | `4px` |
| Code panel | `4px` |
| Grid tile | `4px` |
| Comparison card | `6px` |
| Icon tile | `6px` |
| Eyebrow chip | full capsule |
| Buttons if any appear | `4px` |

### 11.2 Borders
- default: `1px solid #E2E6DE`
- emphasized panel: `1px solid #D5E4A9`

### 11.3 Shadows
Default: **none**

Allowed:
- ultra-soft image hover shadow only for interactive prototypes
- never heavy floating card shadows

Optional hover:
`0 6px 18px rgba(19, 24, 32, 0.05)`

---

## 12. Section-Specific Guidance

### 12.1 Hero section
- left eyebrow
- strong 2-line or 3-line H1
- intro paragraph block
- one large diagram panel spanning most of the width
- no CTA button required in this PDF page archetype

### 12.2 Concept section
- left text
- right code window
- short green summary bar below text

### 12.3 Protocol section
- centered eyebrow + centered title
- short centered intro
- 4 compact feature cards in a row
- supporting paragraph below

### 12.4 Architecture / reuse / feedback sections
- split layout
- one side media, one side text
- ending summary statement highlighted

### 12.5 Data model and outcomes sections
- centered section heading
- 4-column grid on desktop
- 2-column grid on medium screens
- 1-column grid on mobile

### 12.6 Closing comparison
- centered short intro above two comparison cards
- brief single-line conclusion below

---

## 13. Responsive Rules

### 13.1 At 1100px
- all 2-column sections stack
- hero H1 reduces to `60px`
- centered grids drop from 4 columns to 2
- large diagram panels get reduced padding

### 13.2 At 810px
- H1 becomes `38px`
- H2 becomes `30px`
- body remains `15px - 16px`
- all split layouts become single column
- grid sections become single column unless 2-column still feels readable
- code panels must remain readable with larger internal padding and horizontal control
- illustration panels keep white background and generous spacing

### 13.3 At 480px
- container narrows
- eyebrow chips stay small
- H1 can drop to `32px`
- code font can reduce to `11px`
- icon tiles can reduce to `36px`

---

## 14. Do / Don’t

### Do
- use white as the dominant canvas
- use a restrained light-green accent system
- center only the sections that need emphasis
- keep section titles compact and strong
- preserve lots of whitespace around diagrams
- use thin-outline technical illustrations
- let headings carry visual hierarchy
- use subtle gray-green staging surfaces
- keep long-form reading comfortable

### Don’t
- do not force homepage header/nav patterns onto this page
- do not overuse lime fills
- do not use large CTA-first hero composition
- do not add glossy gradients or dark tech backgrounds
- do not use overly rounded cards
- do not add decorative shadows
- do not make illustrations too dense
- do not turn the page into a generic blog layout

---

## 15. Final Style Sentence

**Tier0’s UNS editorial page should feel like a white long-form product explainer with strong Poppins headings, IBM Plex Sans body copy, mono eyebrow chips, thin-border diagram panels, soft green technical illustrations, and a calm industrial rhythm built for explanation and reuse.**