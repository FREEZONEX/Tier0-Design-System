#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(__dirname, '..');

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/validate-tier0-dual.mjs path/to/deck.json');
  process.exit(2);
}

const sourceFile = path.resolve(file);
const sourceDir = path.dirname(sourceFile);
const errors = [];
const warnings = [];
let deck;

try {
  deck = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
} catch (error) {
  console.error(`Invalid JSON: ${error.message}`);
  process.exit(1);
}

const allowedKinds = new Set([
  'cover-dark',
  'cover-editorial',
  'section-dark',
  'challenge-3',
  'compare-2',
  'feature-split',
  'cost-compare',
  'process-4',
  'closing-dark',
  'canvas',
]);
const allowedElementTypes = new Set(['text', 'rect', 'line', 'image', 'shape']);
const allowedShapes = new Set(['rect', 'ellipse', 'diamond', 'chevron']);
const width = deck.meta?.width ?? 960;
const height = deck.meta?.height ?? 540;

function resolveAsset(ref) {
  if (ref.startsWith('@skill/')) return path.resolve(skillRoot, ref.slice('@skill/'.length));
  return path.resolve(sourceDir, ref);
}

if (width !== 960 || height !== 540) {
  errors.push(`meta.width/meta.height must be 960 × 540; received ${width} × ${height}.`);
}
if (!Array.isArray(deck.slides) || !deck.slides.length) {
  errors.push('slides must be a non-empty array.');
}
if (deck.meta?.theme && deck.meta.theme !== 'tier0-v4-hybrid') {
  warnings.push(`Theme "${deck.meta.theme}" is not the reference-matched tier0-v4-hybrid theme.`);
}

const ids = new Set();
let darkCount = 0;
let closingCount = 0;
for (const [index, slide] of (deck.slides ?? []).entries()) {
  const prefix = `Slide ${index + 1}`;
  if (!slide.id) errors.push(`${prefix}: missing id.`);
  else if (ids.has(slide.id)) errors.push(`${prefix}: duplicate id "${slide.id}".`);
  else ids.add(slide.id);

  const kind = slide.kind ?? 'canvas';
  if (!allowedKinds.has(kind)) errors.push(`${prefix}: unsupported kind "${kind}".`);
  if (kind.endsWith('-dark')) darkCount += 1;
  if (kind === 'closing-dark') closingCount += 1;
  if (index === 0 && !['cover-dark', 'cover-editorial'].includes(kind)) {
    warnings.push(`${prefix}: the deck should normally open with cover-dark or cover-editorial.`);
  }
  if (index === 0 && kind === 'cover-dark') {
    warnings.push(`${prefix}: cover-dark is legacy/opt-in; use cover-editorial unless the user explicitly requested a dark cover.`);
  }
  if (kind === 'section-dark' && slide.logo) {
    errors.push(`${prefix}: section-dark must not declare a logo; the minimal divider is grid + title + optional accent title + footer only.`);
  }
  if (kind === 'closing-dark' && index !== deck.slides.length - 1) {
    errors.push(`${prefix}: closing-dark must be the final slide.`);
  }

  if (kind === 'challenge-3' && (slide.cards?.length ?? 0) !== 3) {
    errors.push(`${prefix}: challenge-3 requires exactly 3 cards.`);
  }
  if (kind === 'compare-2' && (slide.panels?.length ?? 0) !== 2) {
    errors.push(`${prefix}: compare-2 requires exactly 2 panels.`);
  }
  if (kind === 'process-4' && (slide.steps?.length ?? 0) !== 4) {
    errors.push(`${prefix}: process-4 requires exactly 4 steps.`);
  }
  if (kind === 'cost-compare' && (slide.rows?.length ?? 0) !== 2) {
    errors.push(`${prefix}: cost-compare requires exactly 2 rows.`);
  }

  if (kind === 'canvas') {
    if (!Array.isArray(slide.elements) || !slide.elements.length) {
      errors.push(`${prefix}: canvas requires a non-empty elements array.`);
      continue;
    }
    for (const [elementIndex, element] of slide.elements.entries()) {
      const label = `${prefix}, element ${elementIndex + 1}`;
      if (!allowedElementTypes.has(element.type)) {
        errors.push(`${label}: unsupported type "${element.type}".`);
        continue;
      }
      for (const key of ['x', 'y', 'w', 'h']) {
        if (!Number.isFinite(element[key])) errors.push(`${label}: ${key} must be a number.`);
      }
      if (Number.isFinite(element.x) && Number.isFinite(element.w)
          && (element.x < 0 || element.x + element.w > width + 0.5)) {
        errors.push(`${label}: horizontal bounds exceed the 960-unit canvas.`);
      }
      if (Number.isFinite(element.y) && Number.isFinite(element.h)
          && (element.y < 0 || element.y + element.h > height + 0.5)) {
        errors.push(`${label}: vertical bounds exceed the 540-unit canvas.`);
      }
      if (element.type === 'text' && !element.text && !Array.isArray(element.runs)) {
        errors.push(`${label}: text requires text or runs.`);
      }
      if (element.type === 'text' && (element.fontSize ?? 16) < 9) {
        warnings.push(`${label}: fontSize ${(element.fontSize ?? 16)} may be unreadable when projected.`);
      }
      if (element.type === 'shape' && !allowedShapes.has(element.shape)) {
        errors.push(`${label}: shape must be one of ${[...allowedShapes].join(', ')}.`);
      }
      if (element.type === 'image') {
        if (!element.src) {
          errors.push(`${label}: image requires src.`);
        } else if (!fs.existsSync(resolveAsset(element.src))) {
          warnings.push(`${label}: image does not exist and will render as a labeled placeholder: ${element.src}`);
        }
        if (!element.alt) warnings.push(`${label}: image should include alt text.`);
      }
    }
  }
}

if (deck.slides?.length >= 5 && darkCount < 2) {
  warnings.push('A 5+ slide V4 Hybrid deck should normally include at least two dark narrative pages.');
}
if (closingCount !== 1) {
  errors.push(`Deck requires exactly one closing-dark slide; found ${closingCount}.`);
}

if (warnings.length) {
  console.warn('Warnings:');
  for (const warning of warnings) console.warn(`- ${warning}`);
}
if (errors.length) {
  console.error('Tier0 dual-source validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Tier0 dual-source validation passed: ${deck.slides.length} slide(s).`);
