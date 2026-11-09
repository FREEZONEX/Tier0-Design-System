#!/usr/bin/env node
/**
 * Offline-friendly ui-skills helper for Tier0 DS.
 * Usage:
 *   node skills/scripts/ui-skills-get.mjs categories
 *   node skills/scripts/ui-skills-get.mjs list [--category motion]
 *   node skills/scripts/ui-skills-get.mjs get <slug>
 *   node skills/scripts/ui-skills-get.mjs suggest <keyword...>
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const indexPath = path.join(root, 'references/ui-skills-index.json');
const localSkillDirs = [
  path.join(root, '.cursor/skills'),
  path.join(root, 'vendor/ui-skills/skills'),
];

const argv = process.argv.slice(2);
const cmd = argv[0];
if (!cmd || ['-h', '--help', 'help'].includes(cmd)) {
  console.log(`Usage:
  node skills/scripts/ui-skills-get.mjs categories
  node skills/scripts/ui-skills-get.mjs list [--category <topic>]
  node skills/scripts/ui-skills-get.mjs get <slug>
  node skills/scripts/ui-skills-get.mjs suggest <keyword...>`);
  process.exit(0);
}

const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const skills = index.skills ?? [];

function byCategory(cat) {
  const c = String(cat || '').toLowerCase();
  return skills.filter((s) => (s.topics || []).includes(c));
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${url} → ${res.status}`);
  return res.text();
}

function readLocal(slug) {
  for (const dir of localSkillDirs) {
    const p = path.join(dir, slug, 'SKILL.md');
    if (fs.existsSync(p)) return fs.readFileSync(p, 'utf8');
  }
  return null;
}

if (cmd === 'categories') {
  const counts = new Map();
  for (const s of skills) {
    for (const t of s.topics || []) counts.set(t, (counts.get(t) || 0) + 1);
  }
  [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .forEach(([t, n]) => console.log(`${t}\t${n}`));
  process.exit(0);
}

if (cmd === 'list') {
  let i = argv.indexOf('--category');
  let list = skills;
  if (i >= 0) list = byCategory(argv[i + 1]);
  for (const s of list) {
    console.log(`${s.slug}\t[${(s.topics || []).join(',')}]\t${s.description.slice(0, 100)}`);
  }
  console.error(`# ${list.length} skill(s)`);
  process.exit(0);
}

if (cmd === 'suggest') {
  const q = argv.slice(1).join(' ').toLowerCase();
  if (!q) {
    console.error('suggest needs keywords');
    process.exit(1);
  }
  const scored = skills
    .map((s) => {
      const hay = `${s.slug} ${s.name} ${s.description} ${(s.topics || []).join(' ')}`.toLowerCase();
      let score = 0;
      for (const word of q.split(/\s+/)) if (word && hay.includes(word)) score += 1;
      return { s, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.s.slug.localeCompare(b.s.slug))
    .slice(0, 12);
  for (const { s, score } of scored) {
    console.log(`${score}\t${s.slug}\t[${(s.topics || []).join(',')}]\t${s.description.slice(0, 90)}`);
  }
  process.exit(0);
}

if (cmd === 'get') {
  const slug = argv[1];
  if (!slug) {
    console.error('get needs <slug>');
    process.exit(1);
  }
  const local = readLocal(slug);
  if (local) {
    process.stdout.write(local);
    process.exit(0);
  }
  const hit = skills.find((s) => s.slug === slug || s.name === slug);
  if (!hit?.rawUrl) {
    console.error(`Unknown slug: ${slug}. Try: node skills/scripts/ui-skills-get.mjs suggest ${slug}`);
    process.exit(1);
  }
  try {
    const text = await fetchText(hit.rawUrl);
    process.stdout.write(text);
  } catch (e) {
    console.error(String(e.message || e));
    console.error(`Open: ${hit.githubUrl}`);
    process.exit(1);
  }
  process.exit(0);
}

console.error(`Unknown command: ${cmd}`);
process.exit(1);
