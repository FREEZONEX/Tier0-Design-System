# Tier0 Website-Matched PPT Style Guide · Refined Cards

> 用途：这版规范重塑为更贴近 `tier0.app/tier0/builder` 与 `tier0.app/pricing` 的页面气质。目标不是普通 SaaS 卡片模板，而是把官网里的排版、留白、字体节奏、黑白结构和绿色信号感迁移到 PPT。

> **V4 Editorial Hybrid 更新**：正式介绍 deck 默认使用白底 editorial 封面、纯网格深墨章节转场和深墨封底；封面 / 白底证据页使用 IBM Plex，深墨转场使用 Tektur。章节转场禁止 Logo、角线、标题短线和角落圆形。先读 `tier0-intro-v4-visual-grammar.md`。

---

## 1. Visual Direction

Tier0 PPT 应该像官网页面被切成一张张演示画布：

```text
White canvas
Huge quiet typography
Monospace section labels
Black structural lines
Bracketed key terms
Sparse neon green signal
Flat product evidence
```

### 核心气质

```text
Calm
Precise
Editorial
Operational
Technical
Product-led
```

### 不要做成

```text
Generic startup gradients
Blue-purple SaaS templates
Cute AI robot visual
Heavy cyberpunk console
Consulting-style dense pages
Overly rounded dashboard cards
Too many icons or decorations
```

一句话定义：

```text
Tier0 PPT should feel like a product website section expanded into slides:
large IBM Plex Sans headlines, IBM Plex Mono labels, wide whitespace,
thin black dividers, flat app screenshots, and green only where the system is active.
```

---

## 2. Typography System

### 2.1 Font Stack

| Usage | Font | Weight | Notes |
|---|---|---:|---|
| Hero headline | IBM Plex Sans | 400 | 大标题正文必须 Regular，不要 SemiBold / Bold |
| Bracket keyword text | IBM Plex Sans | 500 | 方括号内关键词用 Medium；不要 SemiBold / Bold |
| Bracket marks `[ ]` | IBM Plex Sans | 400 | 方括号符号必须 Regular，不跟随关键词加粗 |
| Slide headline | IBM Plex Sans | 400 | 允许局部关键词 500，但整句不能整体加粗 |
| Feature title | IBM Plex Sans | 400 / 500 | 不要过重 |
| Body text | IBM Plex Sans | 400 | 灰色、舒展行距 |
| Section label | IBM Plex Mono | 500 | uppercase，前置黑色方块 |
| Step number | IBM Plex Mono | 500 | 圆形编号，保持技术感 |
| Step title | IBM Plex Mono | 500 only | 显式 Medium，禁止浏览器/PPT 默认 Bold 700 |
| Metadata / route text | IBM Plex Mono | 400 / 500 | `/tier0 project`、status、small labels |

### 2.2 PPT Font Sizes

以 16:9 PPT 为准：

| Element | Size | Weight | Line Height |
|---|---:|---:|---:|
| Cover headline | 52–66 pt | 400 | 1.08 |
| Website-style hero headline | 44 pt | 400 | 1.16–1.18 |
| Slide headline | 40–46 pt | 400 | 1.14–1.18 |
| Bracket keyword text | same as headline | 500 | same；方括号符号 400 |
| Section label | 12–15 pt | 500 | 1.2 |
| Step title | 18–24 pt | 500 only | 1.2；不要 600/700 |
| Feature title | 16–20 pt | 400 / 500 | 1.25 |
| Body text | 14–17 pt | 400 | 1.45 |
| Metadata | 9–12 pt | 400 / 500 | 1.3 |

### 2.3 Website Exact Heading Tokens

官网标题更像 Framer 的 RichText token，而不是传统 PPT 的 Bold Title。生成 HTML / PPT 时按下面锁死：

```css
.headline {
  font-family: "IBM Plex Sans", "IBM Plex Sans Placeholder", sans-serif;
  font-size: 44px;
  font-weight: 400;
  line-height: 1.18;
  letter-spacing: -0.021em;
  color: rgb(5, 11, 20);
}
.headline .muted {
  font-weight: 400;
  color: rgba(9, 9, 9, .56);
}
.headline .keyword {
  font-weight: 500;
  color: rgb(5, 11, 20);
}
.headline .bracket-mark {
  font-weight: 400;
}
```

禁止规则：

```text
Do not use IBM Plex Mono for major headlines.
Do not use Inter for major headlines.
Do not set headline keyword weight to 600 or 700.
Do not make the whole line medium/bold. Only the bracketed keyword may be 500.
PowerPoint / Keynote 环境必须安装 IBM Plex Sans；否则会自动替换字体，视觉一定会偏。
```

### 2.4 Heading Rules

官网式标题有三个特点：

1. **大，但不吼。** 多用 IBM Plex Sans Regular / Medium，不要 Bold；官网标题更像 400 到 500 的克制字重。
2. **关键词加括号。** 用 `[Template]`、`[Published Applications]`、`[Governed Applications]` 做视觉锚点。
3. **灰黑分层。** 过渡词用灰色 Regular，重点词用黑色 Medium；方括号仍是 Regular。

推荐：

```text
From [Business Requirement]
To [Published Applications]
```

```text
Start with a [Template]
Make it yours.
```

```text
Two product,
Two ways to build
industrial operations.
```

```text
Everything needed
to move beyond the
prototype.
```

---

## 3. Color System

### 3.1 Core Colors

| Token | Hex | Usage |
|---|---:|---|
| Tier0 Black | `#050B14` | heading, step number, primary text |
| Tier0 White | `#FFFFFF` | main background |
| Tier0 Green | `#B2ED1D` | active step, selected card, top bar, CTA signal |
| Pale Green | `#ECFFD2` | selected / highlighted content block |
| Very Pale Green | `#F6FFE8` | soft template block |
| Soft Background | `#F9F9F9` | secondary block / pricing card |
| UI Grey | `#F3F3F3` | icon container, inactive block |
| Border Grey | `#EBEBEB` | subtle dividers |
| Divider Black | `#2B2D2F` | workflow horizontal rules |
| Muted Text | `#73777D` | description, body, right-side notes |
| Light Muted Text | `#8A8F95` | metadata |
| Body Text | `#111822` | paragraph text |

### 3.2 Usage Ratio

```text
80% white / near white
12% black text and dividers
5% muted grey text
3% Tier0 green
```

绿色不要铺满。它更像工厂控制面板上的运行灯：只在第 04 / 05 步、selected plan、active template、CTA 等关键位置亮一下。

---

## 4. Layout Language

### 4.1 Canvas

```text
PPT ratio: 16:9
Canvas: white background
Outer margin: 64–88 px
Top label zone: 64–100 px from top
Hero title zone: large, left or centered
```

### 4.2 Website-like Sections

#### A. Editorial Hero

```text
■ SECTION LABEL

Huge headline
with deliberate breaks.

Short body note, usually 1–2 lines.

Optional product screenshot / product panel.
```

#### B. Workflow Grid

官网的 workflow 不是彩色流程图，而是几条细黑线和编号组成的“操作节拍”。

```text
Top: label + large headline + right-side explanation
Middle/bottom: 3 + 2 step layout
Each step: thin black top divider, round number, monospace title, body text
Only final or active steps use green circle
```

#### C. Feature List Section

```text
Left: huge title + short paragraph
Right: 2-column feature list
Each item: small grey square icon + title + body
No heavy card border
No big shadow
```

#### D. Product Evidence Section

```text
Left: principle or numbered claims
Right: screenshot/mockup panel
Use product UI as proof, not decoration
```

#### E. Template / Pricing Grid

```text
Use flat rectangular blocks, not glossy cards
Selected block: pale green background
Default block: #F9F9F9 or #F6FFE8
Small green square marker at top-left
Screenshot or plan details inside
```

---

## 5. Components

## 5.0 Card System: Website-style Flat Surfaces

Tier0 的卡片不要做成常见 SaaS 的“圆角白卡 + 阴影 + 大图标”。官网里的卡片更像 **flat content surface**：安静、矩形、留白大，靠背景色、细线、marker 和内容层级表达状态。

### Card taxonomy

| Type | Use | Background | Border | Radius | Shadow | Notes |
|---|---|---|---|---:|---|---|
| Product split surface | Builder / Platform 两列解释 | `#F7F8F9` / active `#ECFFD2` | none or 1px hairline | 0–2 px | none | 用小绿方块做识别，不要放大图标 |
| Template surface | 模板库、应用案例 | `#F6FFE8`, `#ECFFD2`, `#F7F8F9` | none | 0 px | none | 图片放在下半区，标题区保持呼吸感 |
| Pricing surface | 套餐卡 | `#F9F9F9` / selected `#ECFFD2` | 1px hairline | 0–2 px | none | 推荐套餐可用 6–8px 顶部绿条 |
| UI evidence card | mockup 内部 app card | `#FFFFFF` | `#E6EAEE` 1px | 0–4 px | none | 必须像真实产品 UI，不像营销卡片 |
| Feature item | 能力点列表 | transparent | none | none | none | 不是卡片，只是 icon + title + body |

### Card visual rules

```text
Use rectangular surfaces.
Use 0–2 px radius.
Use no heavy shadow.
Use hairline border only when structure needs separation.
Use small green square marker, not large decorative icons.
Use green background only for selected / recommended / active cards.
Do not make every card white. Alternate pale green and soft grey surfaces.
Do not use multiple accent colors inside one card except product UI evidence.
```

### Card typography

```text
Card title: IBM Plex Sans 400, optional 500 only for small UI card names.
Card body: IBM Plex Sans 400, muted grey.
Card metadata / tags: IBM Plex Mono 400/500.
Avoid IBM Plex Sans 600/700 inside cards.
Avoid oversized bold feature titles.
```

### Card spacing

```text
Large card padding: 28–40 px
Template card padding: 28–36 px
Pricing card padding: 32–40 px
Small UI card padding: 14–20 px
Marker to title gap: 28–48 px for template cards
Title to body gap: 8–12 px
Body to image gap: flexible; image can anchor to lower area
```

### Active / selected state

```text
Background: #ECFFD2
Accent: #B2ED1D marker or top strip
Border: optional 1px rgba(178, 237, 29, .7)
No glow, no thick green outline, no full-card neon border
```

### HTML/CSS reference

```css
.tier0-card {
  background: #F7F8F9;
  border: 0;
  border-radius: 0;
  box-shadow: inset 0 0 0 1px rgba(5, 11, 20, .075);
  padding: 32px;
}

.tier0-card.is-active {
  background: #ECFFD2;
  box-shadow: inset 0 0 0 1px rgba(178, 237, 29, .72);
}

.tier0-card__marker {
  width: 8px;
  height: 8px;
  background: #B2ED1D;
}

.tier0-card__title {
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 400;
  letter-spacing: -0.02em;
}
```

### 5.1 Section Label

```text
■ HOW IT WORKS
■ APPLICATION DELIVERY, BUILT IN
■ PROJECT STRUCTURE
■ TEMPLATE LIBRARY
■ PRICING
```

Style:

```text
Font: IBM Plex Mono Medium
Size: 12–15 pt
Color: #2B2D2F
Letter spacing: 2–5%
Prefix: black square marker
```

### 5.2 Website Hero Headline

```text
From [Business Requirement]
To [Published Applications]
```

Style:

```text
Font: IBM Plex Sans
Base size reference: 44px on website sections / 40–50pt in PPT
Base weight: 400
Base color: rgba(9, 9, 9, 0.58–0.80) or #73777D
Keyword text weight: 500
Keyword color: #050B14
Bracket symbol weight: 400
Letter spacing: -1% to -3%, not overly tight
Line height: 1.08–1.12
```

Important:

```text
Do not set bracket keywords to 600 or 700.
The website rhythm comes from IBM Plex Sans Medium 500,
not from heavy bold weight.
For example: [ = 400, Business Requirement = 500, ] = 400.
```

### 5.3 Step Block

```text
───────────────
01  Describe
Explain your workflow, fields, roles, forms, approvals, and outcomes.
```

Style:

```text
Divider: 1px #2B2D2F
Number circle: #050B14 / #B2ED1D for active or final steps
Step title: IBM Plex Mono Medium 500 only, never browser/PPT default Bold 700
Body: IBM Plex Sans Regular
```

### 5.4 Feature Item

```text
[small grey icon block]
Build From Natural Language
Describe workflows, records, forms, business rules, dashboards, and user actions.
```

Style:

```text
No card border by default
Icon block: #F3F3F3 square, 20–28 px
Title: #050B14, 16–20 pt, regular/medium
Body: #73777D, 12–15 pt
Grid gap: generous
```

### 5.5 Icon System: IBM Carbon Icons

所有图标统一使用 IBM Carbon Icons，不再使用 emoji、CSS 临时画出来的十字、随机线性图标或混合图标库。Carbon Icons 属于 IBM Carbon Design System 的图标体系，常用尺寸为 16 / 20 / 24 / 32 px，适合和 IBM Plex 字体一起使用。

Rules:

```text
Icon library: IBM Carbon Icons / @carbon/icons / @carbon/icons-svg
Icon size in PPT: 16, 20, 24, or 32 px
Feature icon block: 24–32 px square, #F3F3F3 background
Icon color: currentColor / rgba(5, 11, 20, .72)
Icon style: single-color Carbon glyph
Do not use CSS pseudo-icons as final icons
Do not mix Lucide, Heroicons, emoji, or random SVG packs
```

Recommended mapping:

| Product meaning | IBM Carbon icon direction |
|---|---|
| Natural language generation | AI / magic wand / generate |
| Managed data | database / data-base / cloud-data-ops |
| User access | user-access / user-role / locked |
| Preview and publish | launch / upload / deployment |
| Web and mobile | mobile / application-mobile |
| Versioned iteration | branch / version / workflow-automation |
| Project / app library | folder / application / catalog |

### 5.6 Template Surface

```text
■
Production Work Order Management
Create, assign, track, and close production tasks.

[flat product screenshot anchored in lower half]
```

Style:

```text
Use flat rectangular blocks, not rounded cards.
Background alternates between #F6FFE8, #ECFFD2, and #F7F8F9.
No shadow. No glossy image frame.
Border is optional; if used, only 1px rgba(5, 11, 20, .075).
Small green square marker at top-left.
Title: IBM Plex Sans Regular 400.
Body: IBM Plex Sans Regular 400, muted grey.
Screenshot: placed lower, edge-aligned or inset, with a quiet UI border.
Do not place large icons in template cards. The screenshot is the evidence.
```

### 5.7 Pricing Surface

```text
Builder
For individual builders creating industrial apps with AI.

$50 / month

Capabilities
App Builder
App Library
Cloud App Deployment
```

Style:

```text
Flat card, not rounded pricing tile.
Default background: #F9F9F9 or #F7F8F9.
Recommended / selected plan: #ECFFD2.
Recommended plan may use a 6–8 px Tier0 Green top strip.
Border: 1px hairline only, never thick.
No drop shadow.
Plan name: IBM Plex Sans 400.
Price: IBM Plex Sans 500, large but not decorative.
Section labels: IBM Plex Mono 400/500 uppercase.
Feature list: use small green square bullets, not arrows or emoji.
CTA: black fill or Tier0 green fill.
```

---

## 6. Slide Templates

### 6.1 Cover / Website Hero

```text
■ TIER0 BUILDER

Build apps with AI.
Deploy them for real.

Turn business requirements into working applications with built-in database,
access control, deployment, mobile access, and version management.

[Start Building Free] [Explore App Templates]
```

Layout:

```text
Left: text and CTAs
Right: product screenshot or flat product UI panel
Bottom: 250 free credits note
```

### 6.2 Two Product Slide

```text
Two product,
Two ways to build
industrial operations.
```

Use two large flat product panels:

```text
Tier0 Builder
Generate and manage industrial apps with AI.

Tier0 Platform
Connect real industrial data and build a foundation that scales.
```

### 6.3 Last-Mile App Creation Slide

```text
A generated app is not automatically a usable business application.
```

Two columns:

```text
Typical Vibe Coding Workflow
A compelling demo — with technical work still waiting.

Tier0 Builder
A platform to generate, publish, govern, and evolve real apps.
```

### 6.4 How It Works Slide

Use the exact website rhythm:

```text
■ HOW IT WORKS
From [Business Requirement]
To [Published Applications]

01 Describe
02 Generate
03 Preview
04 Publish
05 Iterate
```

### 6.5 Application Delivery Slide

```text
■ APPLICATION DELIVERY, BUILT IN
Everything needed
to move beyond the
prototype.
```

Right side feature list:

```text
Build From Natural Language
Platform-Managed Data
Govern User Access
Preview And Publish
Use Across Web And Mobile
Release App Versions
```

### 6.6 Project Structure Slide

```text
■ PROJECT STRUCTURE
One project.
Multiple operational apps.
```

Right side product UI evidence.

### 6.7 Template Library Slide

```text
■ TEMPLATE LIBRARY
Start with a [Template]
Make it yours.
```

Use 3 × 2 flat template grid.

### 6.8 Pricing Slide

```text
■ PRICING
Plans, capabilities,
usage, and price.
```

Use 3 cards or 4 cards. Avoid dense comparison-table overload.

---

## 7. AI Prompt for Generating Website-Matched Tier0 PPT

```text
Create a presentation that matches the current Tier0 website style from tier0.app/tier0/builder and tier0.app/pricing.

Use a white, spacious, editorial product layout. Use IBM Plex Sans for all major headlines and body text. Use IBM Plex Mono for section labels, step numbers, technical labels, and small metadata. Major headlines should be very large but mostly regular or medium weight, not default bold. For bracketed key terms such as [Business Requirement], [Published Applications], [Template], and [Governed Applications], keep the bracket symbols at 400 and set the words inside to IBM Plex Sans Medium 500. Do not use 500 for the main slide headline unless it is a small UI title.

Use small uppercase section labels prefixed with a black square, such as “■ HOW IT WORKS”, “■ APPLICATION DELIVERY, BUILT IN”, “■ PROJECT STRUCTURE”, and “■ TEMPLATE LIBRARY”.

Use thin black horizontal dividers for workflow steps. Use circular step numbers with black fill by default and Tier0 green (#B2ED1D) only for active/final steps. Use large whitespace and avoid over-decorating.

Use flat product-evidence layouts: website screenshot panels, template blocks, pricing blocks, and product UI mockups. Cards should be flat rectangles with #F9F9F9, #F6FFE8, or #ECFFD2 backgrounds. Avoid heavy shadows, glossy 3D, colorful dashboards, and generic stock imagery.

The deck should feel like a Tier0 product website section expanded into slides: quiet, technical, operational, precise, and product-led.
```

---

## 8. Quick Reference

```text
Background: #FFFFFF
Main text: #050B14
Muted text: #73777D
Divider: #2B2D2F
Accent: #B2ED1D
Soft card: #F9F9F9
Pale green card: #F6FFE8 / #ECFFD2
Headline font: IBM Plex Sans Regular / Medium, 400–500 only
Bracket keyword: IBM Plex Sans Medium 500; bracket symbols 400
Label font: IBM Plex Mono Medium
Step title font: IBM Plex Mono Medium 500 only, never Bold 700
Icons: IBM Carbon Icons only, 16 / 20 / 24 / 32 px
Green usage: precise signal only
```
