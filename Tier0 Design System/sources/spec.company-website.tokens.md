# Tier0 UNS Editorial Tokens + Component Spec

> Purpose: implementation-ready token and component reference aligned to the first PDF  
> Best use: HTML/CSS, React, Framer, or design-to-code reconstruction of the long-form UNS page

---

## 1. Global Tokens

### 1.1 Color Tokens
```css
:root {
  --page: #ffffff;
  --section-soft: #f7f8f4;
  --surface: #ffffff;
  --surface-soft: #f6f7f3;
  --surface-soft-2: #f9faf6;

  --text: #171a22;
  --text-2: #454c57;
  --text-3: #707780;
  --text-4: #99a1aa;

  --border: #e2e6de;
  --border-2: #d6ddcf;

  --green-brand: #a7cf3a;
  --green-brand-2: #8ebb1d;
  --green-soft: #eef6d7;
  --green-soft-2: #f4f9e9;
  --green-border: #ccde9d;

  --code-orange: #e3a441;
  --code-teal: #2ca7a0;
}
```

### 1.2 Typography Tokens
```css
:root {
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'IBM Plex Sans', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;

  --fs-chip: 10px;
  --fs-hero: 76px;
  --fs-hero-tablet: 60px;
  --fs-hero-mobile: 38px;
  --fs-h2: 46px;
  --fs-h2-mobile: 30px;
  --fs-card-title: 24px;
  --fs-tile-title: 22px;
  --fs-lead: 18px;
  --fs-body: 16px;
  --fs-body-sm: 14px;
  --fs-caption: 12px;
  --fs-code: 12px;

  --fw-regular: 400;
  --fw-medium: 500;
  --fw-semibold: 600;
  --fw-bold: 700;

  --lh-hero: 0.98;
  --lh-h2: 1.08;
  --lh-lead: 1.7;
  --lh-body: 1.72;
  --lh-code: 1.8;

  --ls-hero: -0.05em;
  --ls-heading: -0.04em;
  --ls-chip: 0.04em;
}
```

### 1.3 Radius Tokens
```css
:root {
  --radius-panel: 4px;
  --radius-card: 4px;
  --radius-card-lg: 6px;
  --radius-icon: 6px;
  --radius-btn: 4px;
}
```

### 1.4 Layout Tokens
```css
:root {
  --frame-desktop: 1440px;
  --frame-mobile: 810px;
  --container: 1280px;
  --measure: 620px;
  --measure-wide: 820px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 28px;
  --space-8: 36px;
  --space-9: 44px;
  --space-10: 64px;
  --space-11: 80px;
  --space-12: 120px;
}
```

### 1.5 Shadow Token
```css
:root {
  --shadow-hover: 0 6px 18px rgba(19, 24, 32, 0.05);
}
```

---

## 2. Breakpoints

```css
@media (max-width: 1439px) { }
@media (max-width: 1100px) { }
@media (max-width: 810px) { }
@media (max-width: 480px) { }
```

### Intent
- `1440px`: primary desktop artboard
- `1100px`: two-column collapse zone
- `810px`: required mobile baseline
- `480px`: narrow mobile cleanup

---

## 3. Page Skeleton

### 3.1 Base Container
```css
.container {
  width: min(var(--container), calc(100% - 80px));
  margin: 0 auto;
}
```

### 810px
```css
.container {
  width: calc(100% - 48px);
}
```

### 480px
```css
.container {
  width: calc(100% - 32px);
}
```

### 3.2 Page Shell
```css
.page-shell {
  background: var(--page);
  color: var(--text);
  padding-top: 78px;
}
```

### 3.3 Section
```css
.page-section {
  padding: 0 0 120px;
}

.page-section.soft {
  background: var(--section-soft);
  padding: 72px 0 120px;
}
```

### 810px
```css
.page-section {
  padding-bottom: 80px;
}

.page-section.soft {
  padding: 52px 0 80px;
}
```

---

## 4. Typography Components

### 4.1 Eyebrow Chip
```css
.eyebrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  padding: 0 10px;
  border: 1px solid #d7e5b2;
  background: #f3f8e8;
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: var(--fs-chip);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-chip);
  text-transform: uppercase;
  color: var(--green-brand-2);
}
```

### 4.2 Hero Title
```css
.hero-title {
  margin: 18px 0 18px;
  max-width: 820px;
  font-family: var(--font-heading);
  font-size: var(--fs-hero);
  font-weight: var(--fw-bold);
  line-height: var(--lh-hero);
  letter-spacing: var(--ls-hero);
  color: var(--text);
}

.hero-title .green {
  color: var(--green-brand);
}
```

### 1100px
```css
.hero-title {
  font-size: var(--fs-hero-tablet);
}
```

### 810px
```css
.hero-title {
  font-size: var(--fs-hero-mobile);
  line-height: 1.04;
}
```

### 4.3 Section Title
```css
.section-title {
  margin: 18px 0 18px;
  font-family: var(--font-heading);
  font-size: var(--fs-h2);
  font-weight: var(--fw-bold);
  line-height: var(--lh-h2);
  letter-spacing: var(--ls-heading);
  color: var(--text);
}

.section-title .green {
  color: var(--green-brand);
}
```

### 810px
```css
.section-title {
  font-size: var(--fs-h2-mobile);
  line-height: 1.14;
}
```

### 4.4 Lead Copy
```css
.lead,
.section-intro {
  max-width: 820px;
  margin: 0;
  font-family: var(--font-body);
  font-size: var(--fs-lead);
  line-height: var(--lh-lead);
  color: var(--text-3);
}
```

### 4.5 Body Copy
```css
.prose {
  max-width: var(--measure);
  font-family: var(--font-body);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  color: var(--text-3);
}

.prose p {
  margin: 0 0 18px;
}
```

### 810px
```css
.lead,
.section-intro,
.prose {
  font-size: 15px;
}
```

---

## 5. Layout Patterns

### 5.1 Hero Stack
```css
.hero-stack {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
```

### 5.2 Split Section
```css
.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
}
```

### 1100px
```css
.split {
  grid-template-columns: 1fr;
  gap: 28px;
}
```

### 5.3 Centered Section Head
```css
.center-head {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.center-head .section-title,
.center-head .section-intro {
  max-width: 880px;
}
```

---

## 6. Panel Components

### 6.1 Diagram Panel
```css
.diagram-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-panel);
  padding: 32px;
}
```

### Soft variant
```css
.diagram-panel.soft {
  background: var(--surface-soft-2);
}
```

### 810px
```css
.diagram-panel {
  padding: 20px;
}
```

### 6.2 Illustration Stage
```css
.illustration-stage {
  background: var(--surface-soft);
  border: 1px solid var(--border);
  border-radius: var(--radius-panel);
  padding: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 6.3 Code Panel
```css
.code-panel {
  border: 1px solid var(--border);
  border-radius: var(--radius-panel);
  overflow: hidden;
  background: var(--surface-soft);
}

.code-topbar {
  height: 24px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ecefe7;
  border-bottom: 1px solid var(--border);
}

.code-dots {
  display: flex;
  gap: 6px;
}

.code-dots span {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #c7cdc2;
}

.code-label {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-4);
}

.code-body {
  padding: 22px 24px 24px;
  font-family: var(--font-mono);
  font-size: var(--fs-code);
  line-height: var(--lh-code);
  color: #6a7380;
}
```

### Syntax helpers
```css
.code-green { color: var(--green-brand-2); }
.code-orange { color: var(--code-orange); }
.code-teal { color: var(--code-teal); }
.code-dark { color: var(--text); }
```

---

## 7. Highlight Components

### 7.1 Callout Bar
```css
.callout-bar {
  margin-top: 28px;
  padding: 14px 18px;
  border: 1px solid #d6e5af;
  background: var(--green-soft-2);
  border-radius: var(--radius-card);
  font-family: var(--font-heading);
  font-size: 22px;
  font-weight: var(--fw-medium);
  line-height: 1.3;
  color: var(--green-brand-2);
}
```

### 810px
```css
.callout-bar {
  font-size: 18px;
}
```

### 7.2 Left-Rule Callout
```css
.callout-rule {
  margin-top: 28px;
  padding-left: 16px;
  border-left: 4px solid #9ccb2f;
  font-family: var(--font-body);
  font-size: 20px;
  line-height: 1.5;
  color: var(--text-2);
}
```

---

## 8. Grid Components

### 8.1 Generic Card Grid
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}
```

### 1100px
```css
.card-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
```

### 810px
```css
.card-grid {
  grid-template-columns: 1fr;
}
```

### 8.2 Grid Tile
```css
.grid-tile {
  min-height: 184px;
  padding: 26px;
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  background: var(--surface);
}

.grid-icon {
  width: 42px;
  height: 42px;
  margin-bottom: 18px;
  border-radius: var(--radius-icon);
  background: var(--green-soft);
  display: grid;
  place-items: center;
  color: var(--green-brand-2);
}

.grid-title {
  margin: 0 0 10px;
  font-family: var(--font-heading);
  font-size: var(--fs-tile-title);
  font-weight: var(--fw-semibold);
  line-height: 1.2;
  color: var(--text);
}

.grid-copy {
  margin: 0;
  font-family: var(--font-body);
  font-size: var(--fs-body-sm);
  line-height: 1.65;
  color: var(--text-3);
}
```

---

## 9. Comparison Components

### 9.1 Comparison Grid
```css
.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
```

### 810px
```css
.comparison-grid {
  grid-template-columns: 1fr;
}
```

### 9.2 Comparison Card
```css
.comparison-card {
  min-height: 220px;
  padding: 28px 30px;
  border: 1px solid var(--border);
  border-radius: var(--radius-card-lg);
  background: var(--surface);
}

.comparison-card.is-tier0 {
  background: #f7faef;
  border-color: #d5e4a9;
}

.comparison-card h3 {
  margin: 0 0 18px;
  font-family: var(--font-heading);
  font-size: 24px;
  font-weight: var(--fw-semibold);
  line-height: 1.18;
  color: var(--text);
}

.comparison-list {
  margin: 0;
  padding-left: 18px;
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-3);
}
```

---

## 10. Section Recipes

### 10.1 Hero Recipe
```css
.hero {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.hero-media {
  margin-top: 26px;
}
```

### 10.2 Concept Recipe
```css
.concept-layout {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 64px;
  align-items: center;
}
```

### 10.3 Architecture / Reuse / Feedback Recipe
```css
.media-text {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}
```

### 10.4 Centered Grid Recipe
```css
.center-grid {
  display: flex;
  flex-direction: column;
  gap: 44px;
}
```

### 1100px
```css
.concept-layout,
.media-text {
  grid-template-columns: 1fr;
  gap: 28px;
}
```

---

## 11. Illustration Rules for Prompting

### 11.1 Required Prompt Vocabulary
Use combinations of:
- `clean isometric industrial software illustration`
- `white background`
- `soft lime green and neutral gray palette`
- `thin vector outlines`
- `minimal shadow`
- `technical diagram style`
- `calm editorial product page illustration`

### 11.2 Negative Prompt Guidance
Avoid:
- dark background
- neon glow
- photorealistic 3D
- glossy UI
- glassmorphism
- cartoon style
- dense particle effects
- thick outlines

### 11.3 Illustration Frame Rules
```css
.illust-frame {
  background: var(--surface-soft);
  border: 1px solid var(--border);
  border-radius: var(--radius-panel);
  padding: 28px;
}

.illust-frame img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}
```

---

## 12. Base CSS Skeleton

```css
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  background: var(--page);
  color: var(--text);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
h1, h2, h3, h4, h5, h6 {
  margin: 0;
  font-family: var(--font-heading);
}
p { margin: 0; }
.mono {
  font-family: var(--font-mono);
  letter-spacing: 0.02em;
}
.green {
  color: var(--green-brand);
}
```

---

## 13. Implementation Priority

### First-pass fidelity
1. Page width and section rhythm
2. Hero typography scale
3. White + pale gray background hierarchy
4. Eyebrow chip styling
5. Diagram panel borders and padding
6. Grid card proportions
7. Comparison card treatment
8. Illustration palette alignment

### Second-pass fidelity
1. Code panel chrome styling
2. Exact green tuning
3. Heading line breaks
4. Diagram padding calibration
5. Micro-label consistency
6. Mobile stacking polish

---

## 14. Final Handoff Rule

When building from this spec:

**Use a white long-form canvas, Poppins display headings, IBM Plex Sans body copy, IBM Plex Mono eyebrow chips, thin bordered panels, soft green technical illustrations, and 1440px / 810px artboards with calm editorial spacing instead of homepage-style CTA patterns.**