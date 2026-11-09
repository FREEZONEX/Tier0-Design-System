/**
 * Inject Tier0 visual overrides into an Archify-delivered HTML artifact.
 * Keeps Archify topology/validate/deliver; remaps colors & fonts to Tier0 VI.
 *
 * Usage:
 *   node scripts/apply-archify-tier0-theme.mjs path/to/diagram.html
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const themePath = path.resolve(__dirname, '../vendor/archify/assets/tier0-slide-theme.css');

const target = process.argv[2];
if (!target) {
  console.error('Usage: node scripts/apply-archify-tier0-theme.mjs <diagram.html>');
  process.exit(2);
}

const abs = path.resolve(target);
if (!fs.existsSync(abs)) {
  console.error(`File not found: ${abs}`);
  process.exit(1);
}
if (!fs.existsSync(themePath)) {
  console.error(`Theme missing: ${themePath}`);
  process.exit(1);
}

let html = fs.readFileSync(abs, 'utf8');
const css = fs.readFileSync(themePath, 'utf8');
const marker = '/* tier0-slide-theme */';
if (html.includes(marker)) {
  html = html.replace(/<style data-tier0-theme>[\s\S]*?<\/style>/, `<style data-tier0-theme>\n${marker}\n${css}\n</style>`);
} else {
  const inject = `<style data-tier0-theme>\n${marker}\n${css}\n</style>\n</head>`;
  if (!html.includes('</head>')) {
    console.error('No </head> in HTML; cannot inject theme.');
    process.exit(1);
  }
  html = html.replace('</head>', inject);
  // Prefer light + blueprint for slide export
  html = html.replace(/data-theme="dark"/g, 'data-theme="light"');
  if (!/data-preset=/.test(html)) {
    html = html.replace(/<html([^>]*)>/, '<html$1 data-preset="blueprint">');
  } else {
    html = html.replace(/data-preset="[^"]*"/, 'data-preset="blueprint"');
  }
}

fs.writeFileSync(abs, html);
console.log(`Tier0 theme applied: ${abs}`);
