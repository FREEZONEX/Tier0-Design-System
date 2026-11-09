#!/usr/bin/env node
/**
 * Validate Tier0 deck.json illustration slots & style lock.
 * Usage: node scripts/validate-tier0-illustrations.mjs path/to/deck.json
 */
import fs from 'node:fs';
import path from 'node:path';

const TRIGGER = 'tier0_illustration_style';
const ALLOWED_ROLES = new Set([
  'product-evidence',
  'illustration',
  'documentary',
  'architecture-native',
  'none',
]);
const ALLOWED_SLOTS = new Set([
  'feature-split-right',
  'compare-panel',
  's15-grid-item',
  's22-hero',
  'process-stage',
  'canvas-free',
]);
const FORBIDDEN_PROMPT = [
  /cyberpunk/i,
  /purple gradient/i,
  /generic blue/i,
  /photorealistic/i,
  /anime/i,
  /watercolor/i,
  /product ui mockup/i,
  /saas dashboard/i,
  /industrial application product/i,
];

const file = path.resolve(process.argv[2] || '');
if (!file || !fs.existsSync(file)) {
  console.error('Usage: node scripts/validate-tier0-illustrations.mjs path/to/deck.json');
  process.exit(1);
}

const deck = JSON.parse(fs.readFileSync(file, 'utf8'));
const root = path.dirname(file);
const errors = [];
const warnings = [];

function resolveImage(src) {
  if (!src) return null;
  if (src.startsWith('@skill/')) return null; // brand assets resolved by builder
  return path.resolve(root, src);
}

(deck.slides || []).forEach((slide, index) => {
  const label = `Slide ${index + 1} (${slide.id || slide.kind || 'unknown'})`;
  const role = slide.imageRole;
  const needsVisual = ['feature-split', 'compare-2'].includes(slide.kind) && slide.image;

  if (role != null && !ALLOWED_ROLES.has(role)) {
    errors.push(`${label}: invalid imageRole "${role}".`);
  }

  if (role === 'architecture-native' && slide.image) {
    warnings.push(`${label}: architecture-native should prefer editable shapes; image may bake the diagram.`);
  }

  if (role === 'none' && slide.image) {
    errors.push(`${label}: imageRole is none but image is set.`);
  }

  const illustrating = role === 'illustration' || role === 'product-evidence' || role === 'documentary';
  if (illustrating || slide.image || slide.imagePrompt) {
    if (!role) warnings.push(`${label}: has image fields but missing imageRole.`);
    if (!slide.imageSlot && role !== 'architecture-native' && role !== 'none') {
      warnings.push(`${label}: missing imageSlot (see illustration-slots-tier0.md).`);
    } else if (slide.imageSlot && !ALLOWED_SLOTS.has(slide.imageSlot)) {
      warnings.push(`${label}: unknown imageSlot "${slide.imageSlot}".`);
    }
  }

  if (role === 'product-evidence' && slide.imagePrompt) {
    errors.push(`${label}: product-evidence must use real screenshots only — remove imagePrompt (no UI mockup generation).`);
  }

  if (role === 'illustration') {
    if (!slide.imagePrompt) {
      errors.push(`${label}: illustration requires imagePrompt starting with ${TRIGGER}.`);
    } else if (!String(slide.imagePrompt).trim().startsWith(TRIGGER)) {
      errors.push(`${label}: imagePrompt must start with "${TRIGGER}".`);
    } else {
      for (const re of FORBIDDEN_PROMPT) {
        if (re.test(slide.imagePrompt)) {
          errors.push(`${label}: imagePrompt contains forbidden style token /${re.source}/.`);
        }
      }
    }
    if (!slide.imageAlt) errors.push(`${label}: illustration requires imageAlt.`);
  }

  if (illustrating && slide.image) {
    const abs = resolveImage(slide.image);
    if (abs && !fs.existsSync(abs)) {
      warnings.push(`${label}: image file missing (placeholder ok mid-build): ${slide.image}`);
    }
  }

  // Kind-specific nudges
  if (slide.kind === 'feature-split' && !slide.image && role !== 'none' && role !== 'architecture-native') {
    warnings.push(`${label}: feature-split has no image yet — add images/… file or set imageRole to none to keep the native flow fallback.`);
  }

  if (needsVisual && !slide.imageAlt) {
    warnings.push(`${label}: image should include imageAlt.`);
  }
});

if (errors.length) {
  console.error('Tier0 illustration validation failed:');
  errors.forEach((e) => console.error(`- ${e}`));
  if (warnings.length) {
    console.error('Warnings:');
    warnings.forEach((w) => console.error(`- ${w}`));
  }
  process.exit(1);
}

console.log(`Tier0 illustration validation passed: ${deck.slides?.length ?? 0} slide(s).`);
if (warnings.length) {
  console.log('Warnings:');
  warnings.forEach((w) => console.log(`- ${w}`));
}
