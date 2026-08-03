#!/usr/bin/env node
/**
 * Build a self-contained Tier0 HTML deck and an editable PPTX from one deck.json.
 *
 * Usage:
 *   node scripts/build-tier0-dual.mjs \
 *     --source path/deck.json \
 *     --html path/index.html \
 *     --pptx path/deck.pptx
 *
 * HTML only:
 *   node scripts/build-tier0-dual.mjs --source path/deck.json --html path/index.html --html-only
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(__dirname, '..');
const DEFAULT_W = 960;
const DEFAULT_H = 540;
const UNITS_PER_INCH = 72;

const C = {
  dark: '#06101B',
  ink: '#050B14',
  white: '#FFFFFF',
  lime: '#B2ED1D',
  green: '#73B200',
  pale: '#F5FBDE',
  surface: '#F4F4F4',
  border: '#CDCED0',
  body: '#585C62',
  muted: '#ACAEB1',
  grid: '#24303B',
};

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    if (key === 'html-only') {
      args[key] = true;
      continue;
    }
    args[key] = argv[i + 1];
    i += 1;
  }
  if (!args.source || !args.html || (!args['html-only'] && !args.pptx)) {
    console.error('Usage: node scripts/build-tier0-dual.mjs --source deck.json --html index.html --pptx deck.pptx');
    console.error('   or: node scripts/build-tier0-dual.mjs --source deck.json --html index.html --html-only');
    process.exit(2);
  }
  return args;
}

function stripHash(value, fallback = '000000') {
  if (!value) return fallback;
  return String(value).replace(/^#/, '').toUpperCase();
}

function esc(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function text(x, y, w, h, value, style = {}) {
  return { type: 'text', x, y, w, h, text: value, ...style };
}

function rect(x, y, w, h, fill, style = {}) {
  return { type: 'rect', x, y, w, h, fill, ...style };
}

function line(x, y, w, h, color = C.border, lineWidth = 1, style = {}) {
  return { type: 'line', x, y, w, h, color, lineWidth, ...style };
}

function image(x, y, w, h, src, style = {}) {
  return { type: 'image', x, y, w, h, src, ...style };
}

function asciiField(x, y, w, h, style = {}) {
  return { type: 'ascii', x, y, w, h, fill: C.lime, color: C.ink, tone: 'ink', ...style };
}

// 固定坐标画布没有真模板的 flex 自适应,所以按估算行数把字号收到刚好不溢出。
function estimateLines(value, fontSize, colW) {
  return String(value ?? '').split('\n').reduce((lines, row) => {
    let units = 0;
    for (const ch of row) {
      if (/[\u2E80-\uFFFF]/.test(ch)) units += 1;
      else if (/[ \t.,:;'"!|()[\]iiljtfr-]/.test(ch)) units += 0.34;
      else units += 0.56;
    }
    return lines + Math.max(1, Math.ceil(units * fontSize / colW));
  }, 0);
}

function fitFontSize(value, colW, boxH, { max = 52, min = 28, step = 2, lineHeight = 1.28 } = {}) {
  for (let size = max; size > min; size -= step) {
    if (estimateLines(value, size, colW) * size * lineHeight <= boxH) return size;
  }
  return min;
}

const ASCII_PALETTE = '   ...:::---+++***◦◦••▢▣';

// PPTX 无法运行动画,用呼吸场 t=0 的一帧冻结成纯文本网格,保持与 HTML 同一套字符梯度。
function asciiFrozenFrame(el, cell = 24) {
  const cols = Math.max(1, Math.floor(el.w / cell));
  const rows = Math.max(1, Math.floor(el.h / cell));
  const threshold = el.tone === 'light' ? 0.22 : 0.10;
  return Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, c) => {
    const n = (
      Math.sin(c * 0.18)
      + Math.sin(r * 0.24)
      + Math.sin((c + r) * 0.12)
      + Math.sin(Math.hypot(c - cols * 0.5, r - rows * 0.5) * 0.16)
    ) / 4;
    const v = (n + 1) / 2;
    if (v < threshold) return ' ';
    return ASCII_PALETTE[Math.min(ASCII_PALETTE.length - 1, Math.floor(v * ASCII_PALETTE.length))];
  }).join(' ')).join('\n');
}

function resolveAsset(sourceDir, ref) {
  if (!ref) return '';
  if (ref.startsWith('@skill/')) return path.resolve(skillRoot, ref.slice('@skill/'.length));
  return path.resolve(sourceDir, ref);
}

function shape(x, y, w, h, shapeType, fill, style = {}) {
  return { type: 'shape', x, y, w, h, shape: shapeType, fill, ...style };
}

function darkGrid(width, height, options = {}) {
  const {
    ambientCircles = true,
    cornerMarks = true,
  } = options;
  const elements = [];
  for (let x = 60; x < width; x += 80) {
    elements.push(line(x, 0, 0, height, C.grid, 1, { opacity: 0.55 }));
  }
  for (let y = 57; y < height; y += 77) {
    elements.push(line(0, y, width, 0, C.grid, 1, { opacity: 0.55 }));
  }
  if (ambientCircles) {
    elements.push(shape(690, -190, 420, 420, 'ellipse', '#14251D', { opacity: 0.75, line: 'transparent' }));
    elements.push(shape(-170, 365, 400, 400, 'ellipse', '#14251D', { opacity: 0.72, line: 'transparent' }));
  }
  if (cornerMarks) {
    elements.push(line(878, 10, 72, 0, C.lime, 2, { opacity: 0.72 }));
    elements.push(line(950, 10, 0, 32, C.lime, 2, { opacity: 0.72 }));
    elements.push(line(8, 510, 72, 0, C.lime, 2, { opacity: 0.72 }));
    elements.push(line(8, 478, 0, 32, C.lime, 2, { opacity: 0.72 }));
  }
  return elements;
}

function logoElements(slide, sourceDir, dark = false) {
  if (slide.logo) {
    return [image(dark ? 48 : 857, dark ? 24 : 24, dark ? 116 : 65, dark ? 28 : 16, resolveAsset(sourceDir, slide.logo), {
      alt: 'Tier0',
      fit: 'contain',
    })];
  }
  if (!dark) {
    return [
      text(857, 24, 58, 18, 'TIER', {
        fontFace: 'Tektur',
        fontSize: 12,
        color: C.ink,
        bold: false,
        margin: 0,
      }),
      rect(911, 24, 10, 15, 'transparent', { line: C.lime, lineWidth: 2 }),
    ];
  }
  return [
    text(48, 24, 150, 32, 'TIER', {
      fontFace: 'Tektur',
      fontSize: 24,
      color: dark ? C.white : C.ink,
      bold: false,
      margin: 0,
    }),
    rect(133, 25, 18, 25, 'transparent', { line: C.lime, lineWidth: 3 }),
  ];
}

function footerElements(slide, index, total, dark = false) {
  const footer = slide.footer ?? `Copyright © ${new Date().getFullYear()} Tier0. All rights reserved.`;
  return [
    text(14, 512, 650, 16, footer, {
      fontFace: 'IBM Plex Mono',
      fontSize: 8.5,
      color: dark ? '#66717D' : '#A5A5A5',
      margin: 0,
    }),
    text(850, 512, 70, 16, `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`, {
      fontFace: 'IBM Plex Mono',
      fontSize: 8.5,
      color: dark ? '#66717D' : '#A5A5A5',
      align: 'right',
      margin: 0,
    }),
  ];
}

function coverDark(slide, ctx) {
  const elements = [...darkGrid(ctx.width, ctx.height), ...logoElements(slide, ctx.sourceDir, true)];
  elements.push(
    text(48, 232, 670, 22, slide.kicker ?? 'UNIFIED NAMESPACE · DATA FIRST', {
      fontFace: 'IBM Plex Mono', fontSize: 12, color: C.lime, bold: true, letterSpacing: 1.2, margin: 0,
    }),
    text(48, 264, 870, 58, slide.title ?? 'Build the Unified Data Foundation.', {
      fontFace: 'Tektur', fontSize: 39, color: C.white, bold: true, margin: 0, breakLine: false,
    }),
    text(48, 320, 870, 62, slide.accentTitle ?? 'Generate Connected Applications.', {
      fontFace: 'Tektur', fontSize: 39, color: C.lime, bold: true, margin: 0,
    }),
    text(48, 408, 750, 28, slide.subtitle ?? 'Data First for Industrial Digitalization.', {
      fontFace: 'IBM Plex Sans', fontSize: 17, color: C.muted, margin: 0,
    }),
    text(48, 476, 610, 24, slide.footer ?? 'Tier0 Platform · www.tier0.app', {
      fontFace: 'IBM Plex Mono', fontSize: 12, color: '#66717D', margin: 0,
    }),
  );
  const clusterX = 720;
  const clusterY = 172;
  elements.push(
    line(clusterX - 60, clusterY + 70, 260, -118, '#526B2D', 1, { opacity: 0.75 }),
    line(clusterX - 45, clusterY + 128, 252, -128, '#526B2D', 1, { opacity: 0.75 }),
    line(clusterX - 70, clusterY + 42, 275, 154, '#66717D', 1, { opacity: 0.55, dash: 'dash' }),
    shape(clusterX + 14, clusterY + 24, 60, 60, 'diamond', '#151F28', { line: '#ACAEB1', lineWidth: 1 }),
    shape(clusterX + 78, clusterY + 72, 78, 78, 'diamond', '#070B10', { line: '#ACAEB1', lineWidth: 1 }),
    shape(clusterX + 150, clusterY + 25, 46, 46, 'diamond', '#111922', { line: '#ACAEB1', lineWidth: 1 }),
    shape(clusterX + 62, clusterY + 120, 38, 38, 'diamond', '#5B9CFF', { line: '#5B9CFF', lineWidth: 0 }),
    shape(clusterX + 190, clusterY + 116, 34, 34, 'diamond', '#8FD400', { line: '#8FD400', lineWidth: 0 }),
    shape(clusterX + 108, clusterY - 34, 44, 44, 'chevron', C.lime, { line: C.lime, lineWidth: 0 }),
  );
  return { background: C.dark, elements };
}

function coverEditorial(slide, ctx) {
  const panelX = 610;
  const panelW = ctx.width - panelX;
  const logo = resolveAsset(ctx.sourceDir, slide.logo ?? '@skill/assets/brand/logos/tier0-logo-black.png');
  const title = slide.title ?? 'Natural language,\ndriving real-time industrial operations.';
  const padX = 34;
  const colW = panelX - padX * 2;
  const titleBoxH = 186;
  const titleText = slide.keyword ? `[${slide.keyword}]\n${title}` : title;
  const titleStyle = {
    fontFace: 'IBM Plex Sans',
    fontSize: fitFontSize(titleText, colW, titleBoxH),
    color: C.ink,
    bold: false,
    fontWeight: 400,
    margin: 0,
    lineHeight: 1.28,
    letterSpacing: -0.2,
  };
  const titleEl = slide.keyword
    ? text(padX, 134, colW, titleBoxH, '', {
      ...titleStyle,
      runs: [
        { text: `[${slide.keyword}]\n`, bold: true },
        { text: title },
      ],
    })
    : text(padX, 134, colW, titleBoxH, title, titleStyle);
  const elements = [
    asciiField(panelX, 0, panelW, ctx.height, { tone: 'ink' }),
    image(padX, 30, 104, 26, logo, { alt: 'Tier0', fit: 'contain', objectPosition: 'left center' }),
    titleEl,
    text(padX, 332, 470, 58, slide.sideNote ?? slide.subtitle ?? 'Headless MES + Generative UI', {
      fontFace: 'IBM Plex Sans', fontSize: 20, color: C.body, bold: false, margin: 0, lineHeight: 1.35,
    }),
    line(padX, 452, colW, 0, C.border, 1),
    text(padX, 466, 300, 26, slide.speaker ?? slide.author ?? '', {
      fontFace: 'IBM Plex Sans', fontSize: 20, color: '#2F343B', margin: 0, lineHeight: 1.2,
    }),
    text(padX, 496, 320, 18, slide.speakerRole ?? slide.role ?? '', {
      fontFace: 'IBM Plex Mono', fontSize: 10, color: C.body, letterSpacing: 1, margin: 0,
    }),
    text(padX + colW - 180, 474, 180, 20, slide.date ?? '', {
      fontFace: 'IBM Plex Mono', fontSize: 11, color: '#2F343B', align: 'right', margin: 0,
    }),
  ];
  return { background: C.white, elements };
}

function sectionDark(slide, ctx) {
  const title = [slide.title, slide.accentTitle].filter(Boolean).join('\n')
    || 'The foundation is only the beginning.';
  const elements = [
    text(48, 34, 500, 18, slide.chapterLabel ?? 'CHAPTER · NEXT', {
      fontFace: 'IBM Plex Mono', fontSize: 10, color: C.lime, bold: true, letterSpacing: 1.1, margin: 0,
    }),
    text(48, 144, 835, 170, title, {
      fontFace: 'IBM Plex Sans', fontSize: 58, color: C.white, bold: false, fontWeight: 400, margin: 0, lineHeight: 0.96,
    }),
  ];
  if (slide.note) {
    elements.push(text(52, 342, 470, 54, slide.note, {
      fontFace: 'IBM Plex Sans', fontSize: 13, color: C.muted, margin: 0, lineHeight: 1.4,
    }));
  }
  elements.push(
    line(48, 464, 864, 0, '#33404B', 1),
    text(48, 484, 400, 18, slide.footerLabel ?? 'SECTION DIVIDER · PURE TITLE', {
      fontFace: 'IBM Plex Mono', fontSize: 8.5, color: '#66717D', letterSpacing: 0.6, margin: 0,
    }),
    text(850, 484, 62, 18, `${String(ctx.index + 1).padStart(2, '0')} / ${String(ctx.total).padStart(2, '0')}`, {
      fontFace: 'IBM Plex Mono', fontSize: 8.5, color: '#66717D', align: 'right', margin: 0,
    }),
  );
  return { background: C.dark, elements };
}

function challenge3(slide, ctx) {
  const cards = (slide.cards ?? []).slice(0, 3);
  const elements = [...logoElements(slide, ctx.sourceDir, false)];
  elements.push(
    text(40, 34, 360, 18, slide.kicker ?? 'CHALLENGE', {
      fontFace: 'IBM Plex Mono', fontSize: 11, color: C.green, bold: true, letterSpacing: 1, margin: 0,
    }),
    text(40, 60, 878, 68, slide.title ?? 'Why Industrial Digitalization Projects Mostly Fail', {
      fontFace: 'IBM Plex Sans', fontSize: 30, color: C.ink, bold: true, margin: 0,
    }),
    text(40, 120, 820, 36, slide.subtitle ?? '', {
      fontFace: 'IBM Plex Sans', fontSize: 12, color: C.body, margin: 0,
    }),
  );
  const cardW = 282;
  const startX = 40;
  for (let i = 0; i < 3; i += 1) {
    const card = cards[i] ?? { title: `Challenge ${i + 1}`, body: 'Evidence pending.' };
    const x = startX + i * (cardW + 12);
    elements.push(
      rect(x, 165, cardW, 235, C.white, { line: C.border, lineWidth: 1 }),
      line(x, 165, cardW, 0, C.lime, 2),
      text(x + 18, 194, 40, 18, String(i + 1).padStart(2, '0'), {
        fontFace: 'IBM Plex Mono', fontSize: 10, color: C.green, bold: true, margin: 0,
      }),
      text(x + 18, 221, cardW - 36, 48, card.title, {
        fontFace: 'IBM Plex Sans', fontSize: 14, color: C.ink, bold: true, margin: 0,
      }),
      line(x + 18, 275, cardW - 36, 0, C.border, 1),
      text(x + 18, 286, cardW - 36, 84, card.body, {
        fontFace: 'IBM Plex Sans', fontSize: 10.5, color: C.body, margin: 0, lineHeight: 1.45,
      }),
    );
  }
  elements.push(
    rect(40, 419, 878, 51, C.pale, { line: 'transparent', lineWidth: 0 }),
    rect(40, 419, 4, 51, C.lime, { line: 'transparent', lineWidth: 0 }),
    text(62, 435, 70, 18, slide.resultLabel ?? 'RESULT', {
      fontFace: 'IBM Plex Mono', fontSize: 10, color: C.green, bold: true, letterSpacing: 1, margin: 0,
    }),
    text(135, 429, 730, 34, slide.result ?? 'Digitalization becomes a recurring cost center, not a compounding asset.', {
      fontFace: 'IBM Plex Sans', fontSize: 12, color: C.ink, bold: false, margin: 0, valign: 'mid',
    }),
    ...footerElements(slide, ctx.index, ctx.total, false),
  );
  return { background: C.white, elements };
}

function compare2(slide, ctx) {
  const panels = slide.panels ?? [
    { title: 'Before', body: 'Point-to-point integration repeats for every application.' },
    { title: 'After', body: 'The Unified Namespace is built once and reused.' },
  ];
  const elements = [...logoElements(slide, ctx.sourceDir, false)];
  elements.push(
    text(40, 28, 700, 44, slide.title ?? 'From Point-to-Point Integration to UNS', {
      fontFace: 'IBM Plex Sans', fontSize: 28, color: C.ink, bold: true, margin: 0,
    }),
  );
  for (let i = 0; i < 2; i += 1) {
    const panel = panels[i] ?? {};
    const x = i === 0 ? 40 : 493;
    elements.push(
      rect(x, 93, 428, 390, C.white, { line: C.border, lineWidth: 1 }),
      rect(x, 93, 428, 3, C.lime, { line: 'transparent', lineWidth: 0 }),
      rect(x, 96, 428, 43, i === 0 ? C.surface : C.pale, { line: 'transparent', lineWidth: 0 }),
      text(x + 20, 105, 388, 26, panel.title ?? `Panel ${i + 1}`, {
        fontFace: 'IBM Plex Sans', fontSize: 16, color: C.ink, bold: true, align: 'center', margin: 0,
      }),
    );
    if (panel.image) {
      elements.push(image(x + 24, 160, 380, 250, resolveAsset(ctx.sourceDir, panel.image), {
        alt: panel.title ?? 'Comparison evidence', fit: panel.fit ?? 'contain',
      }));
    } else {
      const points = panel.points ?? [panel.body ?? 'Evidence pending'];
      points.slice(0, 5).forEach((item, pointIndex) => {
        elements.push(
          rect(x + 36, 175 + pointIndex * 48, 10, 10, i === 0 ? C.border : C.lime, { line: 'transparent', lineWidth: 0 }),
          text(x + 58, 168 + pointIndex * 48, 330, 34, item, {
            fontFace: 'IBM Plex Sans', fontSize: 12, color: C.body, margin: 0, valign: 'mid',
          }),
        );
      });
    }
    if (panel.caption) {
      elements.push(text(x + 24, 430, 380, 32, panel.caption, {
        fontFace: 'IBM Plex Mono', fontSize: 9, color: C.body, margin: 0, align: 'center',
      }));
    }
  }
  elements.push(...footerElements(slide, ctx.index, ctx.total, false));
  return { background: C.white, elements };
}

function featureSplit(slide, ctx) {
  const bullets = (slide.bullets ?? []).slice(0, 4);
  const elements = [...logoElements(slide, ctx.sourceDir, false)];
  elements.push(
    text(40, 34, 420, 18, slide.kicker ?? 'APP GENERATION', {
      fontFace: 'IBM Plex Mono', fontSize: 10.5, color: C.green, bold: true, letterSpacing: 1, margin: 0,
    }),
    text(40, 60, 880, 66, slide.title ?? 'App Builder · Bringing Vibe Coding to the Industrial World', {
      fontFace: 'IBM Plex Sans', fontSize: 28, color: C.ink, bold: true, margin: 0,
    }),
  );
  bullets.forEach((bullet, i) => {
    const y = 152 + i * 76;
    elements.push(
      rect(40, y, 3, 55, C.lime, { line: 'transparent', lineWidth: 0 }),
      text(56, y - 2, 300, 22, bullet.title, {
        fontFace: 'IBM Plex Sans', fontSize: 11.5, color: C.ink, bold: true, margin: 0,
      }),
      text(56, y + 22, 300, 38, bullet.body, {
        fontFace: 'IBM Plex Sans', fontSize: 9.5, color: C.body, margin: 0, lineHeight: 1.35,
      }),
    );
  });
  elements.push(rect(390, 143, 528, 330, C.white, { line: C.border, lineWidth: 1 }));
  if (slide.image) {
    elements.push(image(406, 159, 496, 298, resolveAsset(ctx.sourceDir, slide.image), {
      alt: slide.imageAlt ?? 'Product evidence', fit: slide.imageFit ?? 'contain',
    }));
  } else {
    const flow = slide.flow ?? ['USER · brief', 'AppBuilder', 'Generated app'];
    flow.slice(0, 3).forEach((label, i) => {
      const x = 420 + i * 158;
      elements.push(
        rect(x, 178, 130, 78, i === 1 ? C.pale : C.surface, { line: C.border, lineWidth: 1 }),
        text(x + 10, 195, 110, 42, label, {
          fontFace: i === 1 ? 'Tektur' : 'IBM Plex Mono',
          fontSize: i === 1 ? 13 : 10,
          color: C.ink,
          bold: true,
          align: 'center',
          valign: 'mid',
          margin: 0,
        }),
      );
      if (i < 2) elements.push(line(x + 130, 217, 28, 0, C.green, 2));
    });
    elements.push(
      text(420, 287, 250, 20, 'UNS', { fontFace: 'Tektur', fontSize: 18, color: C.green, bold: true, margin: 0 }),
      text(420, 312, 250, 86, slide.unsBody ?? 'Read and write live operational context through a governed namespace.', {
        fontFace: 'IBM Plex Mono', fontSize: 10, color: C.body, margin: 0, lineHeight: 1.45,
      }),
      rect(690, 286, 190, 112, C.surface, { line: C.border, lineWidth: 1 }),
      text(710, 307, 150, 68, slide.outputBody ?? 'A running application with users, permissions, audit and versioning.', {
        fontFace: 'IBM Plex Sans', fontSize: 10.5, color: C.ink, margin: 0,
      }),
    );
  }
  elements.push(...footerElements(slide, ctx.index, ctx.total, false));
  return { background: C.white, elements };
}

function costCompare(slide, ctx) {
  const elements = [...logoElements(slide, ctx.sourceDir, false)];
  elements.push(
    text(48, 28, 360, 18, slide.kicker ?? 'COST CALCULATIONS', {
      fontFace: 'IBM Plex Mono', fontSize: 10.5, color: C.green, bold: true, letterSpacing: 1, margin: 0,
    }),
    text(48, 54, 864, 44, slide.title ?? 'The same applications — at 0.75X instead of 2X.', {
      fontFace: 'IBM Plex Sans', fontSize: 28, color: C.ink, bold: true, margin: 0,
    }),
  );
  const rows = slide.rows ?? [
    { label: 'Traditional Dev', dev: 'X', integration: 'X', total: '2X', accent: false, note: 'integration normally equals development cost' },
    { label: 'UNS Dev', dev: '0.5X', integration: '0.25X', total: '0.75X', accent: true, note: 'integration trends toward 10% long term' },
  ];
  rows.slice(0, 2).forEach((row, i) => {
    const y = 106 + i * 180;
    const color = row.accent ? C.green : C.ink;
    elements.push(
      rect(28, y, 904, 165, C.white, { line: C.border, lineWidth: 1 }),
      text(68, y + 65, 110, 40, row.label, {
        fontFace: 'IBM Plex Sans', fontSize: 12, color, bold: true, valign: 'mid', margin: 0,
      }),
      text(426, y + 54, 120, 20, 'DEV COST', {
        fontFace: 'IBM Plex Mono', fontSize: 9, color: C.body, letterSpacing: 0.8, margin: 0,
      }),
      text(426, y + 74, 120, 56, row.dev, {
        fontFace: 'Tektur', fontSize: 34, color, bold: true, margin: 0,
      }),
      text(548, y + 79, 30, 40, '+', {
        fontFace: 'Tektur', fontSize: 24, color: C.ink, align: 'center', margin: 0,
      }),
      text(582, y + 54, 180, 20, 'INTEGRATION COST', {
        fontFace: 'IBM Plex Mono', fontSize: 9, color: C.body, letterSpacing: 0.8, margin: 0,
      }),
      text(582, y + 74, 180, 56, row.integration, {
        fontFace: 'Tektur', fontSize: 34, color, bold: true, margin: 0,
      }),
      text(750, y + 79, 30, 40, '≈', {
        fontFace: 'Tektur', fontSize: 24, color: C.ink, align: 'center', margin: 0,
      }),
      text(780, y + 54, 120, 20, 'TOTAL', {
        fontFace: 'IBM Plex Mono', fontSize: 9, color: C.body, letterSpacing: 0.8, margin: 0,
      }),
      text(780, y + 68, 130, 64, row.total, {
        fontFace: 'Tektur', fontSize: 40, color, bold: true, margin: 0,
      }),
      text(426, y + 130, 430, 20, row.note ?? '', {
        fontFace: 'IBM Plex Sans', fontSize: 8.5, color: C.body, margin: 0,
      }),
    );
  });
  elements.push(
    text(48, 482, 864, 26, slide.result ?? 'Customer human resources saved — a lot, too.', {
      fontFace: 'IBM Plex Sans', fontSize: 11, color: C.ink, bold: true, margin: 0,
    }),
    ...footerElements(slide, ctx.index, ctx.total, false),
  );
  return { background: C.white, elements };
}

function process4(slide, ctx) {
  const steps = (slide.steps ?? []).slice(0, 4);
  const elements = [...logoElements(slide, ctx.sourceDir, false)];
  elements.push(
    text(40, 34, 400, 18, slide.kicker ?? 'RECOMMENDED ADOPTION PATH', {
      fontFace: 'IBM Plex Mono', fontSize: 10.5, color: C.green, bold: true, letterSpacing: 1, margin: 0,
    }),
    text(40, 60, 860, 70, slide.title ?? 'Start with a valuable use case. Build the reusable foundation behind it.', {
      fontFace: 'IBM Plex Sans', fontSize: 28, color: C.ink, bold: true, margin: 0,
    }),
  );
  const startX = 40;
  const cardW = 211;
  for (let i = 0; i < 4; i += 1) {
    const step = steps[i] ?? { title: `Phase ${i + 1}`, body: 'Define the outcome and evidence.' };
    const x = startX + i * (cardW + 8);
    elements.push(
      rect(x, 155, cardW, 272, C.white, { line: C.border, lineWidth: 1 }),
      line(x, 155, cardW, 0, C.lime, 2),
      text(x + 16, 181, cardW - 32, 18, `PHASE ${i + 1}`, {
        fontFace: 'IBM Plex Mono', fontSize: 9.5, color: C.green, bold: true, letterSpacing: 0.8, margin: 0,
      }),
      text(x + 16, 211, cardW - 32, 65, step.title, {
        fontFace: 'IBM Plex Sans', fontSize: 13, color: C.ink, bold: true, margin: 0,
      }),
      text(x + 16, 294, cardW - 32, 104, step.body, {
        fontFace: 'IBM Plex Sans', fontSize: 10, color: C.body, margin: 0, lineHeight: 1.4,
      }),
    );
  }
  elements.push(
    text(48, 452, 864, 32, slide.result ?? 'The first application delivers immediate value. The foundation makes every future use case easier.', {
      fontFace: 'IBM Plex Sans', fontSize: 12, color: C.ink, bold: true, margin: 0,
    }),
    ...footerElements(slide, ctx.index, ctx.total, false),
  );
  return { background: C.white, elements };
}

function closingDark(slide, ctx) {
  const elements = [...logoElements(slide, ctx.sourceDir, true)];
  const lines = slide.lines ?? [
    { text: 'Build the Unified Data Foundation.', color: C.white },
    { text: 'Generate Connected Applications.', color: C.lime },
    { text: 'Move toward Operational Intelligence.', color: '#7C838C' },
  ];
  lines.slice(0, 3).forEach((item, i) => {
    elements.push(text(48, 212 + i * 50, 850, 48, item.text, {
      fontFace: 'Tektur', fontSize: 28, color: item.color ?? (i === 1 ? C.lime : C.white), bold: true, margin: 0,
    }));
  });
  elements.push(
    text(48, 418, 760, 24, slide.footer ?? 'Tier0 Platform · www.tier0.app', {
      fontFace: 'IBM Plex Mono', fontSize: 11, color: '#A4A9AF', margin: 0,
    }),
    text(48, 455, 760, 24, slide.contact ?? '', {
      fontFace: 'IBM Plex Mono', fontSize: 9.5, color: '#66717D', margin: 0,
    }),
    ...footerElements({ footer: '' }, ctx.index, ctx.total, true),
  );
  if (slide.qr) {
    elements.push(
      rect(817, 393, 103, 103, '#0E1824', { line: '#66717D', lineWidth: 1 }),
      image(829, 405, 79, 79, resolveAsset(ctx.sourceDir, slide.qr), {
        alt: slide.qrAlt ?? 'Tier0 website QR code',
        fit: 'contain',
      }),
      text(817, 498, 103, 14, slide.qrLabel ?? 'SCAN TO VISIT', {
        fontFace: 'IBM Plex Mono', fontSize: 7.5, color: '#A4A9AF', align: 'center', margin: 0,
      }),
    );
  }
  return { background: C.dark, elements };
}

function expandSlide(slide, ctx) {
  const kind = slide.kind ?? 'canvas';
  if (kind === 'cover-dark') return coverDark(slide, ctx);
  if (kind === 'cover-editorial') return coverEditorial(slide, ctx);
  if (kind === 'section-dark') return sectionDark(slide, ctx);
  if (kind === 'challenge-3') return challenge3(slide, ctx);
  if (kind === 'compare-2') return compare2(slide, ctx);
  if (kind === 'feature-split') return featureSplit(slide, ctx);
  if (kind === 'cost-compare') return costCompare(slide, ctx);
  if (kind === 'process-4') return process4(slide, ctx);
  if (kind === 'closing-dark') return closingDark(slide, ctx);
  if (kind === 'canvas') {
    const resolvedElements = (Array.isArray(slide.elements) ? slide.elements : []).map((element) => (
      element.type === 'image' ? { ...element, src: resolveAsset(ctx.sourceDir, element.src) } : element
    ));
    return {
      background: slide.background ?? C.white,
      elements: resolvedElements,
    };
  }
  throw new Error(`Unsupported slide kind "${kind}" on ${slide.id ?? `slide ${ctx.index + 1}`}`);
}

function validateDeck(deck) {
  const errors = [];
  if (!deck || typeof deck !== 'object') errors.push('Root must be an object.');
  if (!Array.isArray(deck?.slides) || !deck.slides.length) errors.push('slides must be a non-empty array.');
  const ids = new Set();
  for (const [index, slide] of (deck?.slides ?? []).entries()) {
    if (!slide.id) errors.push(`Slide ${index + 1}: missing id.`);
    else if (ids.has(slide.id)) errors.push(`Slide ${index + 1}: duplicate id "${slide.id}".`);
    else ids.add(slide.id);
  }
  if (errors.length) throw new Error(`Invalid deck.json:\n- ${errors.join('\n- ')}`);
}

function resolveImageData(src) {
  if (!src || !fs.existsSync(src)) return null;
  const ext = path.extname(src).toLowerCase();
  const mime = ext === '.svg' ? 'image/svg+xml'
    : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg'
      : ext === '.webp' ? 'image/webp'
        : 'image/png';
  return `data:${mime};base64,${fs.readFileSync(src).toString('base64')}`;
}

function htmlTextContent(el) {
  if (Array.isArray(el.runs)) {
    return el.runs.map((run) => {
      const css = [
        run.color ? `color:${run.color}` : '',
        run.bold != null ? `font-weight:${run.bold ? 700 : 400}` : '',
        run.italic ? 'font-style:italic' : '',
        run.underline ? 'text-decoration:underline' : '',
      ].filter(Boolean).join(';');
      return `<span style="${css}">${esc(run.text).replaceAll('\n', '<br>')}</span>`;
    }).join('');
  }
  return esc(el.text ?? '').replaceAll('\n', '<br>');
}

function htmlElement(el) {
  const base = [
    `left:${el.x ?? 0}px`,
    `top:${el.y ?? 0}px`,
    `width:${el.w ?? 0}px`,
    `height:${el.h ?? 0}px`,
    `opacity:${el.opacity ?? 1}`,
  ];
  if (el.type === 'text') {
    const style = [
      ...base,
      `font-family:"${esc(el.fontFace ?? 'IBM Plex Sans')}",sans-serif`,
      `font-size:${el.fontSize ?? 16}px`,
      `font-weight:${el.bold ? 700 : (el.fontWeight ?? 400)}`,
      `font-style:${el.italic ? 'italic' : 'normal'}`,
      `color:${el.color ?? C.ink}`,
      `text-align:${el.align ?? 'left'}`,
      `letter-spacing:${el.letterSpacing ?? 0}px`,
      `line-height:${el.lineHeight ?? 1.2}`,
      `justify-content:${el.valign === 'mid' ? 'center' : el.valign === 'bottom' ? 'flex-end' : 'flex-start'}`,
      `padding:${el.margin ?? 0}px`,
    ].join(';');
    return `<div class="el text" style='${style}'>${htmlTextContent(el)}</div>`;
  }
  if (el.type === 'rect' || el.type === 'shape') {
    const clip = el.shape === 'diamond'
      ? 'clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%)'
      : el.shape === 'chevron'
        ? 'clip-path:polygon(0 0,65% 0,100% 50%,65% 100%,0 100%,35% 50%)'
        : el.shape === 'ellipse'
          ? 'border-radius:50%'
          : '';
    const border = !el.line || el.line === 'transparent' || el.lineWidth === 0
      ? 'border:none'
      : `border:${el.lineWidth ?? 1}px solid ${el.line}`;
    return `<div class="el shape" style="${[...base, `background:${el.fill ?? 'transparent'}`, border, clip].join(';')}"></div>`;
  }
  if (el.type === 'line') {
    const length = Math.hypot(el.w ?? 0, el.h ?? 0);
    const angle = Math.atan2(el.h ?? 0, el.w ?? 0) * 180 / Math.PI;
    const dash = el.dash === 'dash' ? 'border-top-style:dashed' : 'border-top-style:solid';
    return `<div class="el line" style="left:${el.x}px;top:${el.y}px;width:${length}px;height:0;opacity:${el.opacity ?? 1};border-top-width:${el.lineWidth ?? 1}px;border-top-color:${el.color ?? C.border};${dash};transform:rotate(${angle}deg)"></div>`;
  }
  if (el.type === 'image') {
    const src = resolveImageData(el.src);
    if (!src) {
      return `<div class="el image-missing" style="${base.join(';')}"><span>${esc(el.alt ?? path.basename(el.src ?? 'image'))}</span></div>`;
    }
    return `<img class="el" src="${src}" alt="${esc(el.alt ?? '')}" style="${[...base, `object-fit:${el.fit ?? 'contain'}`, `object-position:${el.objectPosition ?? 'center'}`].join(';')}">`;
  }
  if (el.type === 'ascii') {
    const tone = el.tone === 'light' ? 'light' : 'ink';
    // 深色页靠 screen 混合把白字加亮到底色上,canvas 自身必须透明,否则整页被提亮。
    const paint = tone === 'light'
      ? ['background:transparent', 'mix-blend-mode:screen']
      : [`background:${el.fill ?? C.lime}`, 'mix-blend-mode:normal'];
    return `<canvas class="el ascii-field" data-ascii-field data-ascii-ink="${tone}" aria-hidden="true" style="${[...base, ...paint].join(';')}"></canvas>`;
  }
  return '';
}

function buildHtml(deck, expanded) {
  const title = esc(deck.meta?.title ?? 'Tier0 Slide Deck');
  const slides = expanded.map((slide, index) => `
    <section class="slide${index === 0 ? ' active' : ''}" data-slide="${index}" data-id="${esc(deck.slides[index].id)}" data-source-ids="${esc((deck.slides[index].sourceIds ?? []).join(','))}" style="background:${slide.background}">
      ${slide.elements.map(htmlElement).join('\n      ')}
    </section>`).join('\n');
  return `<!DOCTYPE html>
<html lang="${esc(deck.meta?.language ?? 'en-US')}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&family=Tektur:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box}
  html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#111820}
  body{font-family:"IBM Plex Sans",Arial,sans-serif}
  #viewport{position:fixed;inset:0;display:grid;place-items:center}
  #stage{position:absolute;width:${deck.meta?.width ?? DEFAULT_W}px;height:${deck.meta?.height ?? DEFAULT_H}px;transform-origin:center center;background:#06101B;box-shadow:0 22px 70px rgba(0,0,0,.35)}
  .slide{display:none;position:absolute;inset:0;width:${deck.meta?.width ?? DEFAULT_W}px;height:${deck.meta?.height ?? DEFAULT_H}px;overflow:hidden}
  .slide.active{display:block}
  .el{position:absolute;box-sizing:border-box}
  .text{display:flex;flex-direction:column;overflow:hidden;white-space:normal;text-wrap:pretty}
  .line{transform-origin:0 0}
  .image-missing{display:grid;place-items:center;border:1px solid #CDCED0;background:#F4F4F4;color:#73777D;font:10px "IBM Plex Mono",monospace;text-align:center;padding:8px}
  .ascii-field{display:block}
  #counter{display:none;position:fixed;right:18px;bottom:14px;color:rgba(255,255,255,.68);font:11px "IBM Plex Mono",monospace;letter-spacing:.08em}
  #hint{display:none;position:fixed;left:18px;bottom:14px;color:rgba(255,255,255,.42);font:10px "IBM Plex Mono",monospace;letter-spacing:.05em}
  body.chrome-visible #counter,body.chrome-visible #hint{display:block}
  @media print{
    html,body{overflow:visible;background:#fff}
    #viewport{position:static;display:block}
    #stage{position:static;transform:none!important;box-shadow:none;width:${deck.meta?.width ?? DEFAULT_W}px;height:auto}
    .slide{display:block!important;position:relative;page-break-after:always}
    #counter,#hint{display:none}
  }
</style>
</head>
<body>
<div id="viewport"><main id="stage">${slides}</main></div>
<div id="hint">← → navigate · F fullscreen · C chrome</div>
<div id="counter"></div>
<script>
(() => {
  const PALETTE = '   ...:::---+++***◦◦••▢▣';
  const fields = [...document.querySelectorAll('[data-ascii-field]')];
  function setupField(canvas) {
    const ink = canvas.dataset.asciiInk !== 'light';
    const dpr = Math.min(devicePixelRatio || 1, ink ? 3 : 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w < 4 || h < 4) return false;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.__w = w;
    canvas.__h = h;
    canvas.__profile = ink
      ? {cell:14, fontSize:14, fontWeight:600, threshold:0.10, alphaMin:0.16, alphaRange:0.68, ink:true}
      : {cell:16, fontSize:13, fontWeight:500, threshold:0.22, alphaMin:0.08, alphaRange:0.55, ink:false};
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = canvas.__profile.fontWeight + ' ' + canvas.__profile.fontSize + 'px "IBM Plex Mono", monospace';
    ctx.textBaseline = 'top';
    canvas.__ctx = ctx;
    return true;
  }
  function drawField(canvas, t) {
    if (!canvas.__ctx) return;
    const ctx = canvas.__ctx;
    const p = canvas.__profile;
    const CELL = p.cell;
    ctx.clearRect(0, 0, canvas.__w, canvas.__h);
    const cols = Math.ceil(canvas.__w / CELL);
    const rows = Math.ceil(canvas.__h / CELL);
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const n = (
          Math.sin(c * 0.18 + t)
          + Math.sin(r * 0.24 - t * 0.7)
          + Math.sin((c + r) * 0.12 + t * 0.45)
          + Math.sin(Math.hypot(c - cols * 0.5, r - rows * 0.5) * 0.16 - t * 0.55)
        ) / 4;
        const v = (n + 1) / 2;
        if (v < p.threshold) continue;
        const ch = PALETTE[Math.min(PALETTE.length - 1, Math.floor(v * PALETTE.length))];
        if (ch === ' ') continue;
        const alpha = p.alphaMin + (v - p.threshold) * p.alphaRange;
        ctx.fillStyle = p.ink
          ? 'rgba(115,178,0,' + Math.min(0.84, alpha).toFixed(3) + ')'
          : 'rgba(255,255,255,' + alpha.toFixed(3) + ')';
        ctx.fillText(ch, c * CELL, r * CELL);
      }
    }
  }
  function reset(canvas) {
    // 同步画出 t=0 一帧:rAF 被节流(后台标签页/打印导出)时也不会留下空白色块。
    if (setupField(canvas)) drawField(canvas, 0);
  }
  if (fields.length) {
    fields.forEach(reset);
    addEventListener('resize', () => fields.forEach(reset), {passive:true});
    const t0 = performance.now();
    let frame = 0;
    const tick = (now) => {
      const t = (now - t0) / 1000 * 0.55;
      frame += 1;
      fields.forEach((canvas) => {
        const slide = canvas.closest('.slide');
        if (slide && !slide.classList.contains('active') && (frame & 3) !== 0) return;
        drawField(canvas, t);
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  const slides = [...document.querySelectorAll('.slide')];
  const stage = document.getElementById('stage');
  const counter = document.getElementById('counter');
  let index = Math.max(0, Math.min(slides.length - 1, Number(location.hash.slice(1)) - 1 || 0));
  function scale() {
    const s = Math.min(innerWidth / ${deck.meta?.width ?? DEFAULT_W}, innerHeight / ${deck.meta?.height ?? DEFAULT_H});
    stage.style.transform = 'scale(' + s + ')';
  }
  function show(next) {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    counter.textContent = String(index + 1).padStart(2,'0') + ' / ' + String(slides.length).padStart(2,'0');
    history.replaceState(null, '', '#' + (index + 1));
  }
  addEventListener('resize', scale);
  addEventListener('keydown', (event) => {
    if (['ArrowRight','PageDown',' '].includes(event.key)) show(index + 1);
    if (['ArrowLeft','PageUp'].includes(event.key)) show(index - 1);
    if (event.key === 'Home') show(0);
    if (event.key === 'End') show(slides.length - 1);
    if (event.key.toLowerCase() === 'f') document.documentElement.requestFullscreen?.();
    if (event.key.toLowerCase() === 'c') document.body.classList.toggle('chrome-visible');
  });
  addEventListener('click', (event) => {
    if (event.clientX > innerWidth * .55) show(index + 1);
    else if (event.clientX < innerWidth * .45) show(index - 1);
  });
  scale();
  show(index);
  document.fonts?.ready.finally(() => { scale(); window.__tier0DeckReady = true; });
})();
</script>
</body>
</html>`;
}

function unit(value) {
  return Number(value ?? 0) / UNITS_PER_INCH;
}

function shapeType(pptx, name) {
  const map = {
    rect: pptx.ShapeType.rect,
    ellipse: pptx.ShapeType.ellipse,
    diamond: pptx.ShapeType.diamond,
    chevron: pptx.ShapeType.chevron,
  };
  return map[name] ?? pptx.ShapeType.rect;
}

function pptxText(el) {
  if (!Array.isArray(el.runs)) return el.text ?? '';
  return el.runs.map((run) => ({
    text: run.text ?? '',
    options: {
      color: stripHash(run.color ?? el.color ?? C.ink),
      bold: run.bold ?? el.bold ?? false,
      italic: run.italic ?? false,
      underline: run.underline ? { style: 'sng' } : undefined,
      fontFace: run.fontFace ?? el.fontFace ?? 'IBM Plex Sans',
      fontSize: run.fontSize ?? el.fontSize ?? 16,
    },
  }));
}

async function buildPptx(deck, expanded, outFile) {
  let PptxGenJS;
  try {
    ({ default: PptxGenJS } = await import('pptxgenjs'));
  } catch (error) {
    throw new Error(`pptxgenjs is not installed. Run "npm install" in ${skillRoot}\n${error.message}`);
  }
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = deck.meta?.author ?? 'Tier0';
  pptx.company = deck.meta?.company ?? 'Tier0';
  pptx.subject = deck.meta?.subject ?? '';
  pptx.title = deck.meta?.title ?? 'Tier0 Slide Deck';
  pptx.lang = deck.meta?.language ?? 'en-US';
  pptx.theme = {
    headFontFace: 'Tektur',
    bodyFontFace: 'IBM Plex Sans',
    lang: deck.meta?.language ?? 'en-US',
  };

  for (let slideIndex = 0; slideIndex < expanded.length; slideIndex += 1) {
    const model = expanded[slideIndex];
    const slide = pptx.addSlide();
    slide.background = { color: stripHash(model.background, 'FFFFFF') };
    for (const el of model.elements) {
      if (el.type === 'rect' || el.type === 'shape') {
        const lineColor = !el.line || el.line === 'transparent' || el.lineWidth === 0
          ? { color: stripHash(el.fill ?? model.background), transparency: 100 }
          : { color: stripHash(el.line), width: el.lineWidth ?? 1 };
        slide.addShape(shapeType(pptx, el.type === 'rect' ? 'rect' : el.shape), {
          x: unit(el.x), y: unit(el.y), w: unit(el.w), h: unit(el.h),
          fill: { color: stripHash(el.fill ?? model.background), transparency: Math.round((1 - (el.opacity ?? 1)) * 100) },
          line: lineColor,
        });
      } else if (el.type === 'line') {
        slide.addShape(pptx.ShapeType.line, {
          x: unit(el.x), y: unit(el.y), w: unit(el.w), h: unit(el.h),
          line: {
            color: stripHash(el.color ?? C.border),
            width: el.lineWidth ?? 1,
            transparency: Math.round((1 - (el.opacity ?? 1)) * 100),
            dash: el.dash === 'dash' ? 'dash' : 'solid',
          },
        });
      } else if (el.type === 'text') {
        slide.addText(pptxText(el), {
          x: unit(el.x), y: unit(el.y), w: unit(el.w), h: unit(el.h),
          fontFace: el.fontFace ?? 'IBM Plex Sans',
          fontSize: el.fontSize ?? 16,
          color: stripHash(el.color ?? C.ink),
          bold: el.bold ?? false,
          italic: el.italic ?? false,
          align: el.align ?? 'left',
          valign: el.valign === 'mid' ? 'mid' : el.valign === 'bottom' ? 'bottom' : 'top',
          margin: unit(el.margin ?? 0),
          breakLine: false,
          fit: 'shrink',
          lineSpacingMultiple: (el.lineHeight ?? 1.2) * 1.0,
          charSpacing: el.letterSpacing ?? 0,
          transparency: Math.round((1 - (el.opacity ?? 1)) * 100),
        });
      } else if (el.type === 'image') {
        if (el.src && fs.existsSync(el.src)) {
          slide.addImage({
            path: el.src,
            x: unit(el.x), y: unit(el.y), w: unit(el.w), h: unit(el.h),
            altText: el.alt ?? '',
          });
        } else {
          slide.addShape(pptx.ShapeType.rect, {
            x: unit(el.x), y: unit(el.y), w: unit(el.w), h: unit(el.h),
            fill: { color: 'F4F4F4' },
            line: { color: 'CDCED0', width: 1 },
          });
          slide.addText(el.alt ?? path.basename(el.src ?? 'image'), {
            x: unit(el.x), y: unit(el.y), w: unit(el.w), h: unit(el.h),
            fontFace: 'IBM Plex Mono', fontSize: 9, color: '73777D',
            align: 'center', valign: 'mid', margin: 0.08,
          });
        }
      } else if (el.type === 'ascii') {
        if (el.tone !== 'light') {
          slide.addShape(pptx.ShapeType.rect, {
            x: unit(el.x), y: unit(el.y), w: unit(el.w), h: unit(el.h),
            fill: { color: stripHash(el.fill ?? C.lime) },
            line: { color: stripHash(el.fill ?? C.lime), transparency: 100 },
          });
        }
        slide.addText(asciiFrozenFrame(el), {
          x: unit(el.x + 12), y: unit(el.y + 10), w: unit(el.w - 24), h: unit(el.h - 20),
          fontFace: 'IBM Plex Mono', fontSize: 7.5,
          color: stripHash(el.tone === 'light' ? C.white : C.green),
          transparency: 30, margin: 0, breakLine: false, fit: 'shrink',
          lineSpacingMultiple: 0.9, bold: true,
        });
      }
    }
    const sourceIds = (deck.slides[slideIndex].sourceIds ?? []).join(', ');
    slide.addNotes?.([`Source slide: ${deck.slides[slideIndex].id}${sourceIds ? ` | Source IDs: ${sourceIds}` : ''}`]);
  }
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  await pptx.writeFile({ fileName: outFile });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const sourceFile = path.resolve(args.source);
  const sourceDir = path.dirname(sourceFile);
  const htmlFile = path.resolve(args.html);
  const pptxFile = args.pptx ? path.resolve(args.pptx) : null;
  const deck = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
  validateDeck(deck);
  deck.meta ??= {};
  deck.meta.width ??= DEFAULT_W;
  deck.meta.height ??= DEFAULT_H;
  if (deck.meta.width !== DEFAULT_W || deck.meta.height !== DEFAULT_H) {
    throw new Error(`Tier0 dual mode requires a 960 × 540 canvas; received ${deck.meta.width} × ${deck.meta.height}.`);
  }
  const expanded = deck.slides.map((slide, index) => expandSlide(slide, {
    index,
    total: deck.slides.length,
    width: deck.meta.width,
    height: deck.meta.height,
    sourceDir,
  }));
  fs.mkdirSync(path.dirname(htmlFile), { recursive: true });
  fs.writeFileSync(htmlFile, buildHtml(deck, expanded), 'utf8');
  console.log(`✓ HTML: ${htmlFile}`);
  if (!args['html-only']) {
    await buildPptx(deck, expanded, pptxFile);
    console.log(`✓ Editable PPTX: ${pptxFile}`);
  }
}

main().catch((error) => {
  console.error(`✗ ${error.stack ?? error.message}`);
  process.exit(1);
});
