#!/usr/bin/env node
/**
 * Assemble index.html from template-tier0.html + slides.html
 * Usage: node scripts/build-tier0-deck.mjs <output-dir>
 * Example: node scripts/build-tier0-deck.mjs layout-gallery
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(__dirname, '..');

const outDir = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : path.resolve(skillRoot, 'layout-gallery');

const templatePath = path.join(skillRoot, 'assets/template-tier0.html');
const slidesPath = path.join(outDir, 'slides.html');
const indexPath = path.join(outDir, 'index.html');

if (!fs.existsSync(slidesPath)) {
  console.error(`Missing slides.html: ${slidesPath}`);
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');
const slides = fs.readFileSync(slidesPath, 'utf8').trim();

const startMarker = '<!-- SLIDES_HERE';
const endMarker = '</div>\n\n<div id="nav">';

const startIdx = template.indexOf(startMarker);
const endIdx = template.indexOf(endMarker, startIdx);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find SLIDES_HERE / deck end markers in template-tier0.html');
  process.exit(1);
}

const titleMatch = slides.match(/<!--\s*DECK_TITLE:\s*(.+?)\s*-->/);
const deckTitle = titleMatch ? titleMatch[1].trim() : 'Tier0 Slide Deck';

let html = template.slice(0, startIdx)
  + slides
  + '\n\n'
  + template.slice(endIdx);

html = html.replace(/<title>[^<]*<\/title>/, `<title>${deckTitle}</title>`);

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(indexPath, html, 'utf8');
console.log(`Built ${indexPath} (${(html.length / 1024).toFixed(1)} KB)`);
