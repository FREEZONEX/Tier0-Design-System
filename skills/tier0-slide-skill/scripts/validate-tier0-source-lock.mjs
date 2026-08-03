#!/usr/bin/env node
import { readFileSync } from 'node:fs';

const [mapPath, deckPath] = process.argv.slice(2);
if (!mapPath || !deckPath) {
  console.error('Usage: node scripts/validate-tier0-source-lock.mjs <content-coverage.json> <index.html>');
  process.exit(2);
}
const ledger = JSON.parse(readFileSync(mapPath, 'utf8'));
const html = readFileSync(deckPath, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
const errors = [];
const ids = new Map((ledger.items ?? []).map(item => [item.id, item]));
const coverage = ledger.coverage ?? [];
const seen = new Map();
for (const entry of coverage) {
  for (const id of entry.sourceIds ?? []) {
    if (!ids.has(id)) errors.push(`Coverage references unknown source ID: ${id}.`);
    if (!seen.has(id)) seen.set(id, []);
    seen.get(id).push(entry);
  }
  if (!['direct', 'split', 'condensed', 'visualized', 'explicitly-excluded'].includes(entry.treatment)) errors.push(`Invalid coverage treatment: ${entry.treatment}.`);
  if (entry.treatment === 'explicitly-excluded' && (!entry.reason || entry.approvedByUser !== true)) errors.push(`Excluded source content requires reason and approvedByUser:true.`);
  if (entry.treatment !== 'explicitly-excluded' && !(entry.slides ?? []).length) errors.push(`Mapped content needs at least one output slide.`);
}
for (const [id, item] of ids) {
  if (item.required !== false && !seen.has(id)) errors.push(`Required source ID is missing from coverage: ${id} (${item.label ?? ''}).`);
}
const declared = new Set([...html.matchAll(/\bdata-source-ids="([^"]+)"/g)].flatMap(match => match[1].split(',').map(id => id.trim()).filter(Boolean)));
for (const [id, entries] of seen) {
  if (entries.some(entry => entry.treatment !== 'explicitly-excluded') && !declared.has(id)) errors.push(`Mapped source ID is not declared on a deck section: ${id}.`);
}
if (errors.length) {
  console.error('Tier0 source-lock validation failed:');
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`Tier0 source-lock validation passed: ${(ledger.items ?? []).length} source item(s).`);
