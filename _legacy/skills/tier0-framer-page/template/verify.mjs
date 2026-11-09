// Verifies the generated Framer code component before delivery.
//   node verify.mjs
// 1. runs build.mjs
// 2. bundles out/<Component>.tsx with a stub "framer" module and server-renders it in every locale
// 3. hydrates it in Chromium at the Framer frame widths (desktop / tablet / mobile), inside a 1440px window
//    (like the Framer canvas) and on a real phone-sized viewport
// 4. fails on page errors, React warnings (hydration mismatch), horizontal overflow, wrong locale or broken filters
// Screenshots land in out/verify/shots/.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const outDir = join(here, 'out', 'verify');
const shotDir = join(outDir, 'shots');
mkdirSync(shotDir, { recursive: true });

const LOCALES = { en: /[A-Za-z]/, 'zh-CN': /[一-龥]/ };
const FRAME_WIDTHS = [1440, 730, 390];
const HOST_NAV_HEIGHT = 64;

function load(name, hint) {
  try { return require(name); } catch {
    console.error(`Missing "${name}". ${hint}`);
    process.exit(1);
  }
}
const esbuild = load('esbuild', 'Run `npm install` in this folder.');
const { chromium } = load('playwright', 'Run `npm i -D playwright && npx playwright install chromium` (or use a global install via NODE_PATH).');

execFileSync(process.execPath, [join(here, 'build.mjs')], { stdio: 'inherit' });
const tsx = readdirSync(join(here, 'out')).find(f => f.endsWith('.tsx'));
const tsxPath = join(here, 'out', tsx).replaceAll('\\', '/');

const common = {
  bundle: true, jsx: 'automatic', logLevel: 'error', absWorkingDir: here,
  alias: { framer: './stubs/framer.js' }, loader: { '.tsx': 'tsx' }
};
const tree = `h('div', { style: { width: '100%' } }, h(Component))`;
await esbuild.build({
  ...common, platform: 'node', format: 'cjs', outfile: join(outDir, 'ssr.cjs'),
  stdin: { resolveDir: here, contents: `import { renderToString } from 'react-dom/server'; import { createElement as h } from 'react'; import Component from '${tsxPath}';
export function render(locale) { globalThis.__FRAMER_LOCALE = locale; return renderToString(${tree}); }` }
});
await esbuild.build({
  ...common, platform: 'browser', format: 'iife', outfile: join(outDir, 'client.js'),
  define: { 'process.env.NODE_ENV': '"development"' },
  stdin: { resolveDir: here, contents: `import { hydrateRoot } from 'react-dom/client'; import { createElement as h } from 'react'; import Component from '${tsxPath}';
hydrateRoot(document.getElementById('app'), ${tree});` }
});

const { render } = require(join(outDir, 'ssr.cjs'));
for (const locale of Object.keys(LOCALES)) {
  writeFileSync(join(outDir, `host-${locale}.html`), `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0"><div style="position:sticky;top:0;z-index:5;height:${HOST_NAV_HEIGHT}px;background:#f2f2f2;font:13px sans-serif;padding:8px">Host site nav</div>
<script>globalThis.__FRAMER_LOCALE=${JSON.stringify(locale)}</script><div id="app">${render(locale)}</div><script src="client.js"></script></body></html>`);
}

const failures = [];
const fail = (tag, message) => failures.push(`${tag}: ${message}`);
const browser = await chromium.launch();

async function check(locale, { viewport, frame, mobile }) {
  const tag = `${locale}@${frame || viewport}${mobile ? '-phone' : frame ? '-frame' : ''}`;
  const context = await browser.newContext({ viewport: { width: viewport, height: 900 }, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const page = await context.newPage();
  page.on('pageerror', e => fail(tag, `page error ${e.message}`));
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') fail(tag, `console ${m.type()} ${m.text().slice(0, 160)}`); });
  await page.goto(pathToFileURL(join(outDir, `host-${locale}.html`)).href);
  if (frame) await page.evaluate(w => Object.assign(document.getElementById('app').style, { width: `${w}px`, margin: '0 auto' }), frame);
  await page.waitForTimeout(800);

  const h1 = (await page.locator('h1').first().textContent()) || '';
  if (!LOCALES[locale].test(h1)) fail(tag, `heading not in ${locale}: "${h1}"`);
  const overflow = await page.evaluate(() => {
    const right = document.getElementById('app').getBoundingClientRect().right + 1;
    return [...document.querySelectorAll('#app *')].filter(e => e.getBoundingClientRect().width && e.getBoundingClientRect().right > right)
      .slice(0, 3).map(e => (e.className && (e.className.baseVal ?? e.className)) || e.tagName);
  });
  if (overflow.length) fail(tag, `horizontal overflow: ${overflow.join(', ')}`);

  // Filters must change the result count and work with taps on phones (no horizontal-scroll-only controls).
  try {
    const count = page.locator('[data-role=count]');
    const before = await count.textContent();
    const target = page.locator('[data-category]:not([data-category=all])').first();
    if (mobile) await target.tap({ timeout: 3000 }); else await target.click({ timeout: 3000 });
    if ((await count.textContent()) === before) fail(tag, 'category filter did not change the result count');
    await page.locator('[data-category=all]').click({ timeout: 3000 });
    await page.locator('details summary').first().click({ timeout: 3000 });
    if (!(await page.locator('details').first().evaluate(d => d.open))) fail(tag, 'first record did not expand');
  } catch (error) {
    fail(tag, `interaction failed: ${error.message.split('\n')[0]}`);
  }

  await page.screenshot({ path: join(shotDir, `${tag}.png`), fullPage: true });
  await context.close();
  console.log(`checked ${tag}`);
}

for (const locale of Object.keys(LOCALES)) {
  for (const frame of FRAME_WIDTHS) await check(locale, { viewport: 1440, frame });
  await check(locale, { viewport: 390, mobile: true });
}
await browser.close();

if (failures.length) {
  console.error(`\n${failures.length} problem(s):\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log(`\nAll checks passed. Screenshots: ${shotDir}`);
