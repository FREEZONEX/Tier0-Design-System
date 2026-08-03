#!/usr/bin/env node
/**
 * Build a machine-readable index from the canonical Tier0 Layout Gallery.
 * Usage:
 *   node scripts/build-tier0-layout-catalog.mjs <slides.html> <layout-catalog.json>
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const [slidesArg, outArg] = process.argv.slice(2);
if (!slidesArg || !outArg) {
  console.error('Usage: node scripts/build-tier0-layout-catalog.mjs <slides.html> <layout-catalog.json>');
  process.exit(2);
}

const slidesPath = resolve(slidesArg);
const outPath = resolve(outArg);
const source = readFileSync(slidesPath, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
const sectionRe = /<section\b[^>]*class="[^"]*\bslide\b[^"]*"[^>]*>[\s\S]*?<\/section>/g;
const sections = [...source.matchAll(sectionRe)].map(match => match[0]);
const getAttr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? '';
const required = ['data-layout', 'data-reference-role', 'data-reference-use', 'data-reference-rule', 'data-reference-avoid'];
const failures = [];

const layouts = sections.map((section, index) => {
  const tag = section.match(/^<section\b[^>]*>/)?.[0] ?? '';
  const missing = required.filter(name => !getAttr(tag, name));
  if (missing.length) failures.push(`Slide ${index + 1}: missing ${missing.join(', ')}`);
  return {
    slide: index + 1,
    id: getAttr(tag, 'data-layout'),
    motion: getAttr(tag, 'data-animate') || null,
    role: getAttr(tag, 'data-reference-role'),
    useWhen: getAttr(tag, 'data-reference-use'),
    visualRule: getAttr(tag, 'data-reference-rule'),
    avoid: getAttr(tag, 'data-reference-avoid'),
    primaryEvidence: getAttr(tag, 'data-reference-evidence') || 'Text / layout',
  };
});

if (layouts.length !== 26) failures.push(`Expected 26 gallery slides; found ${layouts.length}.`);
if (new Set(layouts.map(item => item.id)).size !== layouts.length) failures.push('Layout ids must be unique in the canonical gallery.');
if (failures.length) {
  console.error('Tier0 layout catalog build failed:');
  failures.forEach(message => console.error(`- ${message}`));
  process.exit(1);
}

const catalog = {
  schemaVersion: '1.0',
  purpose: 'Canonical visual source for Tier0 presentation layouts. Read this catalog together with the live Layout Gallery before adapting another deck.',
  canvas: {
    ratio: '16:9',
    shell: 'canvas-card',
    gutter: 'max(40px, 5vw)',
    blockGap: '40px minimum unless a registered layout specifies a denser rhythm',
    titleAxis: 'left aligned; kicker above title',
  },
  tokens: {
    ink: '#050B14',
    paper: '#FFFFFF',
    signal: '#B2ED1D',
    signalText: '#73B200',
    paleSignal: '#ECFFD2',
    neutralSurface: '#F3F3F3',
  },
  layouts,
};

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Built ${outPath} (${layouts.length} canonical layouts).`);
