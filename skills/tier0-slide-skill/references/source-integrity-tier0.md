# Tier0 source-integrity lock

Use this before choosing a visual grammar whenever the user supplies a structured document, existing PPTX, design brief, or detailed product specification. The source is the truth; a slide is only a clearer rendering of it.

## Required working artifacts

Create these alongside the deck before page composition:

```text
source/source-outline.json       # every heading/subheading in source order
source/content-coverage.json    # every source ID → output slides + treatment
```

`source-outline.json` assigns stable IDs to all required pieces: chapters, titled subsections, scope boundaries, user stories, trigger paths, execution steps, exception rules, lifecycle rules, code/configuration blocks, figures, and source assets.

`content-coverage.json` is the delivery ledger. Each required ID is one of: `direct`, `split`, `condensed`, `visualized`, or `explicitly-excluded`. An exclusion requires a written reason and `approvedByUser: true`. Everything else maps to one or more page IDs and each target `<section>` declares `data-source-ids="…"`.

## Non-negotiable preservation rules

- Preserve the source chapter order and named hierarchy by default. A shorter display title is allowed only when the original heading remains traceable in the source map and the meaning is unchanged.
- Do not merge or replace source-defined sections because a different sales narrative feels smoother. Ask before intentionally restructuring.
- Keep distinctions such as **definition / scope / interface**, **in-scope / out-of-scope**, assumptions, conditions and exceptions visibly distinct.
- A scenario is not covered until its user story, trigger, execution logic, ambiguity/confirmation rules and accumulation/lifecycle rules are all mapped. Split into several pages when required.
- Literal technical content remains literal: commands, fields, paths, node names, APIs and code blocks belong in S23 or a directly faithful structured diagram. Never invent syntax or silently normalize terms.
- Slide titles, labels, interface screenshots and captions must use source-approved terminology. A visual summary may shorten copy, but cannot add a new product promise, KPI, user role or system behavior.

## Required source-lock audit

Before final export run:

```bash
node scripts/validate-tier0-source-lock.mjs source/content-coverage.json ppt/index.html
```

It verifies that every required source ID is accounted for and appears in the generated deck. It cannot judge semantic truth by itself: the maker must still compare the page against source text during the page-review gate.

## Minimal coverage file

```json
{
  "sourceTitle": "UNS Agent",
  "items": [
    {"id":"1","label":"定义","required":true},
    {"id":"2.in","label":"In-Scope","required":true},
    {"id":"3.1.logic","label":"MqttSubscribe 执行逻辑","required":true}
  ],
  "coverage": [
    {"sourceIds":["1"],"slides":["02"],"treatment":"direct"},
    {"sourceIds":["2.in"],"slides":["03"],"treatment":"split"},
    {"sourceIds":["3.1.logic"],"slides":["06"],"treatment":"direct"}
  ]
}
```
