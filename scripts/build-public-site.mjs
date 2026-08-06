#!/usr/bin/env node
/**
 * Build the public GitHub Pages site under site/.
 * Copies gallery + ZH/EN demo decks + markdown snapshots.
 */
import { cpSync, mkdirSync, writeFileSync, rmSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const site = join(root, 'site');
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

function buildDual(source, htmlOut, pptxOut) {
  const dual = spawnSync(process.execPath, [
    join(skill, 'scripts', 'build-tier0-dual.mjs'),
    '--source', source,
    '--html', htmlOut,
    '--pptx', pptxOut,
  ], { cwd: root, encoding: 'utf8' });
  if (dual.status !== 0) {
    console.error(dual.stdout || '');
    console.error(dual.stderr || '');
    process.exit(dual.status || 1);
  }
}

mkdirSync(join(site, 'assets', 'brand'), { recursive: true });
cpSync(join(skill, 'assets', 'brand', 'logos', 'tier0-logo-black.png'), join(site, 'assets', 'brand', 'tier0-logo-black.png'));
const logoSvg = join(root, 'assets', 'tier0-logo-black.svg');
if (existsSync(logoSvg)) cpSync(logoSvg, join(site, 'assets', 'brand', 'tier0-logo-black.svg'));
for (const css of ['core.css', 'deck.css', 'product.css', 'website.css']) {
  const src = join(root, 'tokens', css);
  if (existsSync(src)) cpSync(src, join(site, 'assets', css));
}

const gallerySrc = join(skill, 'layout-gallery');
const galleryDest = join(site, 'vendor', 'layout-gallery');
rmSync(galleryDest, { recursive: true, force: true });
copyDir(gallerySrc, galleryDest, { skip: [/source\.png$/i, /^\./] });

cpSync(join(skill, 'SKILL.md'), join(site, 'slide-skill', 'SKILL.md'));
cpSync(join(skill, 'README.md'), join(site, 'slide-skill', 'README.md'));

// English demo — dual builder example (updated cover / type norms)
const demoEn = join(site, 'slide-skill', 'demo-en');
mkdirSync(demoEn, { recursive: true });
buildDual(
  join(skill, 'assets', 'tier0-v4-dual-example.json'),
  join(demoEn, 'index.html'),
  join(demoEn, 'deck.pptx'),
);

// Keep legacy /demo path as English alias
const demoLegacy = join(site, 'slide-skill', 'demo');
rmSync(demoLegacy, { recursive: true, force: true });
copyDir(demoEn, demoLegacy);

// Chinese demo — polished Layout Gallery / template deck
// `projects/` is gitignored, so CI must keep committed site/slide-skill/demo-zh when local sources are absent.
const zhSrc = join(root, 'projects', 'tier0-deck-20260729-1053', 'ppt-v2');
const zhDeck = join(root, 'projects', 'tier0-deck-20260729-1053', 'deck.json');
const demoZh = join(site, 'slide-skill', 'demo-zh');
if (existsSync(zhSrc)) {
  rmSync(demoZh, { recursive: true, force: true });
  copyDir(zhSrc, demoZh, { skip: [/^\./] });
} else if (existsSync(zhDeck)) {
  console.warn('Chinese ppt-v2 missing; building dual from projects deck.json');
  rmSync(demoZh, { recursive: true, force: true });
  mkdirSync(demoZh, { recursive: true });
  buildDual(zhDeck, join(demoZh, 'index.html'), join(demoZh, 'deck.pptx'));
} else if (existsSync(join(demoZh, 'index.html'))) {
  console.warn('Chinese projects/ source missing in CI; keeping committed site/slide-skill/demo-zh');
} else {
  console.warn('Chinese demo source missing; cloning demo-en as demo-zh placeholder');
  rmSync(demoZh, { recursive: true, force: true });
  copyDir(demoEn, demoZh);
}

// Foundations → public vendor + composed DESIGN.md for tokens portal
const foundationsSrc = join(root, 'foundations');
const foundationsDest = join(site, 'vendor', 'foundations');
rmSync(foundationsDest, { recursive: true, force: true });
mkdirSync(foundationsDest, { recursive: true });
const foundationFiles = [
  'README.md',
  'brand.md',
  'color.md',
  'typography.md',
  'spacing-layout.md',
  'iconography.md',
  'icons-lucide.md',
  'voice-content.md',
];
for (const name of foundationFiles) {
  const src = join(foundationsSrc, name);
  if (existsSync(src)) cpSync(src, join(foundationsDest, name));
}

// Agent-facing DESIGN.md (Vercel design.md format) → public tokens portal
mkdirSync(join(site, 'tokens'), { recursive: true });
const designSrc = join(root, 'DESIGN.md');
if (existsSync(designSrc)) {
  cpSync(designSrc, join(site, 'tokens', 'DESIGN.md'));
} else {
  console.warn('Root DESIGN.md missing; tokens portal will lack design guide');
}

// Snapshot CSS into site/assets for offline reference (already copied above)
writeFileSync(join(site, '.nojekyll'), '');
rmSync(join(site, 'CNAME'), { force: true });

writeFileSync(join(site, 'README.md'), `# Tier0 Design System — Public showcase

GitHub Pages 产品展示站（\`site/\`）。

- 气质：白底黑字快速上手；Hero ASCII；三场景入口 + 两列 Design System 画廊
- Tokens 门户：场景预览、完整 token 表、根目录 \`DESIGN.md\`（Vercel design.md 格式）
- Local preview: \`python3 -m http.server 8898 --directory site\` → http://127.0.0.1:8898/
- Rebuild vendor / demos / DESIGN.md: \`node scripts/build-public-site.mjs\`
- Production: https://freezonex.github.io/Tier0-Design-System/site/

| Path | Role |
|------|------|
| \`/\` | Hero + entries + system gallery |
| \`/tokens/\` | Design system portal (tokens + DESIGN.md) |
| \`/vendor/foundations/\` | Synced foundations markdown |
| \`/slide-skill/\` | Skill hub |
| \`/slide-skill/demo-zh/\` | Chinese polished deck |
| \`/slide-skill/demo-en/\` | English dual-output example |

Do not hand-edit \`vendor/\`, \`slide-skill/demo/\`, \`demo-en/\`, \`demo-zh/\`, or \`tokens/DESIGN.md\` — they are synced by the build script from skill / root \`DESIGN.md\`.
`);

console.log('Public site built → site/');
console.log('- vendor/layout-gallery');
console.log('- vendor/foundations + tokens/DESIGN.md');
console.log('- slide-skill/demo-en (dual example)');
console.log('- slide-skill/demo-zh (Chinese polished deck)');
console.log('- slide-skill/demo → alias of demo-en');
