#!/usr/bin/env node
/**
 * Build the public GitHub Pages site under docs/.
 * Copies gallery + demo deck + markdown snapshots used by the public site.
 */
import { cpSync, mkdirSync, writeFileSync, rmSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const docs = join(root, 'docs');
const skill = join(root, 'skills', 'tier0-slide-skill');

function copyDir(src, dest, { skip = [] } = {}) {
  mkdirSync(dest, { recursive: true });
  for (const name of readdirSync(src)) {
    if (skip.some((re) => re.test(name))) continue;
    const from = join(src, name);
    const to = join(dest, name);
    const st = statSync(from);
    if (st.isDirectory()) copyDir(from, to, { skip });
    else cpSync(from, to);
  }
}

mkdirSync(join(docs, 'assets', 'brand'), { recursive: true });
cpSync(join(skill, 'assets', 'brand', 'logos', 'tier0-logo-black.png'), join(docs, 'assets', 'brand', 'tier0-logo-black.png'));
for (const css of ['core.css', 'deck.css', 'product.css', 'website.css']) {
  const src = join(root, 'tokens', css);
  if (existsSync(src)) cpSync(src, join(docs, 'assets', css));
}

const gallerySrc = join(skill, 'layout-gallery');
const galleryDest = join(docs, 'vendor', 'layout-gallery');
rmSync(galleryDest, { recursive: true, force: true });
copyDir(gallerySrc, galleryDest, { skip: [/source\.png$/i, /^\./] });

cpSync(join(skill, 'SKILL.md'), join(docs, 'slide-skill', 'SKILL.md'));
cpSync(join(skill, 'README.md'), join(docs, 'slide-skill', 'README.md'));

const demoDir = join(docs, 'slide-skill', 'demo');
mkdirSync(demoDir, { recursive: true });
const dual = spawnSync(process.execPath, [
  join(skill, 'scripts', 'build-tier0-dual.mjs'),
  '--source', join(skill, 'assets', 'tier0-v4-dual-example.json'),
  '--html', join(demoDir, 'index.html'),
  '--pptx', join(demoDir, 'deck.pptx'),
], { cwd: root, encoding: 'utf8' });
if (dual.status !== 0) {
  console.error(dual.stdout || '');
  console.error(dual.stderr || '');
  process.exit(dual.status || 1);
}

writeFileSync(join(docs, '.nojekyll'), '');
writeFileSync(join(docs, 'CNAME'), ''); // placeholder removed if empty — delete empty CNAME
rmSync(join(docs, 'CNAME'), { force: true });

writeFileSync(join(docs, 'README.md'), `# Tier0 Design System — Public site

GitHub Pages source folder.

- Local preview: \`python3 -m http.server 8899 --directory docs\` then open http://127.0.0.1:8899/
- Rebuild vendor copies: \`node scripts/build-public-site.mjs\`
- Production: https://freezonex.github.io/Tier0-Design-System/

Do not hand-edit \`vendor/\` or \`slide-skill/demo/\` — they are generated.
`);

console.log('Public site built → docs/');
console.log('- vendor/layout-gallery (source PNGs skipped)');
console.log('- slide-skill/demo from dual example');
console.log('- slide-skill/SKILL.md + README.md snapshots');
