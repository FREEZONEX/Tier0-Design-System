#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const target = process.argv[2];
if (!target) {
  console.error('Usage: node scripts/validate-tier0-intake.mjs <project>/intake/request.json');
  process.exit(2);
}

let intake;
try {
  intake = JSON.parse(readFileSync(resolve(target), 'utf8'));
} catch (error) {
  console.error(`Unable to read intake request: ${error.message}`);
  process.exit(2);
}

const errors = [];
if (!intake.delivery || (!intake.delivery.html && !intake.delivery.pptx)) errors.push('Choose at least one delivery format: HTML and/or PPTX.');
if (intake.brand?.system !== 'tier0' || intake.brand?.customStyleAllowed !== false) errors.push('The request must retain the locked Tier0 brand system.');
if (intake.cover?.showMetadata) {
  if (!intake.cover.date) errors.push('Cover metadata is enabled, but the presentation date is missing.');
  if (!intake.cover.speakerName?.trim()) errors.push('Cover metadata is enabled, but the speaker name is missing.');
}
if (!['sales', 'product-demo', 'leadership', 'implementation', 'training'].includes(intake.narrative?.purpose)) errors.push('Narrative purpose is missing or invalid.');
if (!['zh-CN', 'en', 'bilingual'].includes(intake.narrative?.language)) errors.push('Narrative language is missing or invalid.');
if (!['preserve', 'adaptive', 'rebuild'].includes(intake.narrative?.sourceTreatment)) errors.push('Source-treatment policy is missing or invalid.');
if (!['no', 'verify', 'yes'].includes(intake.narrative?.researchPolicy)) errors.push('Research policy is missing or invalid.');

if (errors.length) {
  console.error(`Tier0 intake validation failed (${errors.length} issue${errors.length === 1 ? '' : 's'}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Tier0 intake valid: ${target}`);
console.log(`Delivery: ${[intake.delivery.html && 'HTML', intake.delivery.pptx && 'PPTX'].filter(Boolean).join(' + ')}`);
console.log(`Closing CTA: ${intake.closing?.includeWebsiteAndQr ? 'website + QR' : 'none'}`);
