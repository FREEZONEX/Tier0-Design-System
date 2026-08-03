#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/validate-tier0-pptx.mjs path/to/deck.pptx');
  process.exit(2);
}

const pptxFile = path.resolve(file);
if (!fs.existsSync(pptxFile)) {
  console.error(`PPTX not found: ${pptxFile}`);
  process.exit(1);
}

let entries;
try {
  entries = execFileSync('unzip', ['-Z1', pptxFile], { encoding: 'utf8' })
    .split(/\r?\n/)
    .filter(Boolean);
} catch (error) {
  console.error(`Cannot inspect PPTX with unzip: ${error.message}`);
  process.exit(1);
}

const slideFiles = entries
  .filter((entry) => /^ppt\/slides\/slide\d+\.xml$/.test(entry))
  .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));
const errors = [];
const warnings = [];

if (!slideFiles.length) errors.push('No ppt/slides/slideN.xml entries found.');

for (const [index, slideFile] of slideFiles.entries()) {
  const xml = execFileSync('unzip', ['-p', pptxFile, slideFile], { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  const textShapeCount = (xml.match(/<p:sp>/g) ?? []).length;
  const pictureCount = (xml.match(/<p:pic>/g) ?? []).length;
  const textRunCount = (xml.match(/<a:t>/g) ?? []).length;
  const hasFullSlidePicture = /<a:off x="0" y="0"\/>\s*<a:ext cx="12192000" cy="6858000"\/>/.test(xml) && pictureCount === 1;

  if (textShapeCount < 1 || textRunCount < 1) {
    errors.push(`Slide ${index + 1}: no native editable text shapes found.`);
  }
  if (hasFullSlidePicture && textShapeCount < 2) {
    errors.push(`Slide ${index + 1}: appears to be a single full-slide image, not an editable slide.`);
  }
  if (pictureCount > 12) {
    warnings.push(`Slide ${index + 1}: contains ${pictureCount} picture objects; verify the page was not over-rasterized.`);
  }
}

if (warnings.length) {
  console.warn('Warnings:');
  for (const warning of warnings) console.warn(`- ${warning}`);
}
if (errors.length) {
  console.error('Tier0 PPTX editability validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Tier0 PPTX validation passed: ${slideFiles.length} slide(s), native text objects found on every slide.`);
