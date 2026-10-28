#!/usr/bin/env node
/**
 * Tier0 产品原型验证：控制台报错、未识别的 Lucide 图标、滚动容器、横向溢出、弹窗实测宽度，并输出截图。
 *
 *   node skills/tier0-product/scripts/verify-prototype.mjs <prototype.html> [options]
 *
 * Options
 *   --out <dir>          截图输出目录（默认 ./verify-out）
 *   --cdn-cache <dir>    离线时用本地 npm 包替代 CDN（见 references/verification.md）
 *   --open "<selector>"  依次点击后测量 [role=dialog] 宽度并截图，可重复；
 *                        多步点击用 " >> " 分隔，如 --open "[data-action=menu][data-arg=dialogs] >> [data-arg=addSeats]"
 *   --wait <ms>          首屏等待（默认 1500）
 *
 * 依赖 playwright（全局或项目内均可，NODE_PATH 生效）。退出码：有报错或检查不通过时为 1。
 */
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--') && !isOptionValue(a));
if (!file) {
  console.error('Usage: verify-prototype.mjs <prototype.html> [--out dir] [--cdn-cache dir] [--open "<selector>"]...');
  process.exit(2);
}
function isOptionValue(a) {
  const i = args.indexOf(a);
  return i > 0 && ['--out', '--cdn-cache', '--open', '--wait'].includes(args[i - 1]);
}
const opt = (name, def) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : def; };
const opens = args.flatMap((a, i) => (a === '--open' ? [args[i + 1]] : []));
const outDir = resolve(opt('--out', 'verify-out'));
const cache = opt('--cdn-cache');
const waitMs = Number(opt('--wait', 1500));
mkdirSync(outDir, { recursive: true });

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  console.error('找不到 playwright：在项目内安装，或设置 NODE_PATH 指向全局 node_modules。');
  process.exit(2);
}

// 产物可能不含 <html>（Artifact 发布时由平台补骨架），这里补一个最小骨架
let html = readFileSync(resolve(file), 'utf8');
if (!/<html[\s>]/i.test(html)) {
  html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>${html}</body></html>`;
}

function cachedFile(prefix, rel) {
  if (!cache) return null;
  const dir = readdirSync(cache).find((d) => d.startsWith(prefix) && !d.endsWith('.tgz'));
  const p = dir && join(cache, dir, rel);
  return p && existsSync(p) ? p : null;
}
const localTailwind = cachedFile('tailwindcss-browser', 'dist/index.global.js');
const localLucide = cachedFile('lucide', 'dist/umd/lucide.min.js');

const result = { file, errors: [], checks: {}, dialogs: [], screenshots: [] };

async function openPage(browser, viewport) {
  const page = await browser.newPage({ viewport });
  if (cache) {
    await page.route('**/*', (route) => {
      const url = route.request().url();
      if (url.includes('@tailwindcss/browser') && localTailwind) return route.fulfill({ contentType: 'text/javascript', body: readFileSync(localTailwind) });
      if (url.includes('/lucide@') && localLucide) return route.fulfill({ contentType: 'text/javascript', body: readFileSync(localLucide) });
      if (url.startsWith('http')) return route.abort();
      return route.continue();
    });
  }
  page.on('pageerror', (e) => result.errors.push(`[${viewport.width}] pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() !== 'error') return;
    if (cache && m.text().includes('Failed to load resource')) return; // 离线时字体等外链必然失败
    result.errors.push(`[${viewport.width}] console: ${m.text()}`);
  });
  await page.setContent(html, { waitUntil: cache ? 'load' : 'networkidle' });
  await page.waitForTimeout(waitMs);
  return page;
}

const browser = await chromium.launch();
try {
  // 桌面
  const page = await openPage(browser, { width: 1440, height: 900 });
  const desk = await page.evaluate(() => {
    const scrollers = [...document.querySelectorAll('aside, nav')].filter((el) => {
      const s = getComputedStyle(el);
      return el.scrollHeight > el.clientHeight + 1 && /(auto|scroll)/.test(s.overflowY);
    });
    return {
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      unknownLucideIcons: [...new Set([...document.querySelectorAll('i[data-lucide]')].map((i) => i.dataset.lucide))],
      scrollingSidebars: scrollers.map((el) => el.id || el.className.toString().slice(0, 60)),
    };
  });
  result.checks.desktop = desk;
  await page.screenshot({ path: join(outDir, 'desktop.png') });
  await page.screenshot({ path: join(outDir, 'desktop-full.png'), fullPage: true });
  result.screenshots.push('desktop.png', 'desktop-full.png');

  // 弹窗
  for (const [i, sel] of opens.entries()) {
    try {
      for (const step of sel.split(' >> ')) {
        await page.click(step.trim(), { timeout: 5000 });
        await page.waitForTimeout(250);
      }
      const width = await page.evaluate(() => {
        const d = document.querySelector('[role="dialog"]');
        return d ? Math.round(d.getBoundingClientRect().width) : null;
      });
      const shot = `dialog-${i + 1}.png`;
      await page.screenshot({ path: join(outDir, shot) });
      result.dialogs.push({ selector: sel, width });
      result.screenshots.push(shot);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);
    } catch (e) {
      result.errors.push(`open "${sel}": ${e.message.split('\n')[0]}`);
    }
  }
  await page.close();

  // 手机宽度
  const phone = await openPage(browser, { width: 400, height: 860 });
  result.checks.phone = await phone.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    horizontalOverflow: document.documentElement.scrollWidth > 400,
  }));
  await phone.screenshot({ path: join(outDir, 'phone.png'), fullPage: true });
  result.screenshots.push('phone.png');
  await phone.close();
} finally {
  await browser.close();
}

const d = result.checks.desktop || {};
const failed =
  result.errors.length > 0 ||
  d.horizontalOverflow ||
  (d.unknownLucideIcons || []).length > 0 ||
  (d.scrollingSidebars || []).length > 0 ||
  result.checks.phone?.horizontalOverflow;
console.log(JSON.stringify({ ...result, outDir, ok: !failed }, null, 2));
process.exit(failed ? 1 : 0);
