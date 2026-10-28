#!/usr/bin/env node
/**
 * Tier0 design system skill router helper.
 *   node skills/scripts/tier0-skills.mjs
 *   node skills/scripts/tier0-skills.mjs categories
 *   node skills/scripts/tier0-skills.mjs list --category product
 *   node skills/scripts/tier0-skills.mjs get tier0-print
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');

const catalog = [
  { slug: 'tier0-design', category: 'root', path: 'SKILL.md', summary: 'Root router — shared foundations + scenarios' },
  { slug: 'tier0-product', category: 'product', path: 'skills/tier0-product/SKILL.md', summary: 'Product prototypes (Frontend + Figma)' },
  { slug: 'tier0-website', category: 'website', path: 'skills/tier0-website/SKILL.md', summary: 'Web prototypes (tier0.app)' },
  { slug: 'tier0-framer-page', category: 'website', path: 'skills/tier0-framer-page/SKILL.md', summary: 'Website page delivered as a Framer code component' },
  { slug: 'tier0-ppt', category: 'ppt', path: 'skills/tier0-ppt/SKILL.md', summary: 'PPT spec / Masterdeck rules' },
  { slug: 'tier0-slide-skill', category: 'ppt', path: 'skills/tier0-slide-skill/SKILL.md', summary: 'PPT generate HTML + PPTX' },
  { slug: 'tier0-print', category: 'print', path: 'skills/tier0-print/SKILL.md', summary: 'Single page / poster / campaign' },
];

const [cmd = 'start', ...rest] = process.argv.slice(2);

function printStart() {
  console.log(`Tier0 Design System skills

Shared: foundations + assets + tokens/core + DESIGN.md
Scenarios: product | website | ppt | print

  node skills/scripts/tier0-skills.mjs categories
  node skills/scripts/tier0-skills.mjs list --category <product|website|ppt|print|root>
  node skills/scripts/tier0-skills.mjs get <slug>

Site: https://freezonex.github.io/Tier0-Design-System/
Truth: Frontend + Figma · tier0.app · deck tokens · DESIGN.md
`);
}

function printCategories() {
  for (const c of [...new Set(catalog.map((x) => x.category))]) console.log(c);
}

function printList(category) {
  const rows = category ? catalog.filter((c) => c.category === category) : catalog;
  if (!rows.length) {
    console.error(`Unknown category: ${category}`);
    process.exit(1);
  }
  for (const r of rows) console.log(`${r.slug}\t${r.category}\t${r.summary}\t${r.path}`);
}

function printGet(slug) {
  const item = catalog.find((c) => c.slug === slug);
  if (!item) {
    console.error(`Unknown slug: ${slug}`);
    process.exit(1);
  }
  const abs = join(root, item.path);
  if (!existsSync(abs)) {
    console.error(`Missing: ${abs}`);
    process.exit(1);
  }
  process.stdout.write(readFileSync(abs, 'utf8'));
}

if (cmd === 'start' || cmd === 'help' || cmd === '--help') printStart();
else if (cmd === 'categories') printCategories();
else if (cmd === 'list') {
  const i = rest.indexOf('--category');
  printList(i >= 0 ? rest[i + 1] : undefined);
} else if (cmd === 'get') printGet(rest[0]);
else {
  console.error(`Unknown command: ${cmd}`);
  printStart();
  process.exit(1);
}
