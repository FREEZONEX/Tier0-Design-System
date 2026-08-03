#!/usr/bin/env node
import { readFileSync } from 'node:fs';

const file = process.argv[2];
const allowExperimental = process.argv.includes('--allow-experimental');

if (!file) {
  console.error('Usage: node scripts/validate-tier0-deck.mjs <index.html> [--allow-experimental]');
  process.exit(2);
}

const html = readFileSync(file, 'utf8');
const htmlForSlides = html.replace(/<!--[\s\S]*?-->/g, '');
const errors = [];
const warnings = [];

const allowedLayouts = new Set([
  'TIER0-COVER-EDITORIAL',
  'TIER0-CLOSING-SPLIT',
  'TIER0-COVER-V4-DARK',
  'TIER0-CLOSING-V4-DARK',
  'TIER0-ARCHITECTURE-REFERENCE',
  // legacy aliases during migration
  'SWISS-COVER-ASCII',
  'SWISS-CLOSING-ASCII',
  ...Array.from({ length: 23 }, (_, i) => `S${String(i + 1).padStart(2, '0')}`),
]);

const slideRe = /<section\b[^>]*class="[^"]*\bslide\b[^"]*"[^>]*>[\s\S]*?<\/section>/g;
const slides = [...htmlForSlides.matchAll(slideRe)].map((m, idx) => ({ idx: idx + 1, html: m[0], tag: m[0].match(/<section\b[^>]*>/)?.[0] ?? '' }));

if (!slides.length) {
  errors.push('No <section class="slide"> pages found.');
}

slides.forEach((slide) => {
  const layout = slide.tag.match(/\bdata-layout="([^"]+)"/)?.[1];

  if (!layout) {
    errors.push(`Slide ${slide.idx}: missing data-layout. Tier0 locked mode requires S01-S23 or TIER0-COVER-EDITORIAL/TIER0-CLOSING-SPLIT.`);
  } else if (!allowedLayouts.has(layout)) {
    errors.push(`Slide ${slide.idx}: data-layout="${layout}" is not registered in tier0-layout-lock.md.`);
  }

  if (layout === 'SWISS-COVER-ASCII' || layout === 'SWISS-CLOSING-ASCII') {
    warnings.push(`Slide ${slide.idx}: uses legacy cover/closing layout id. Prefer TIER0-COVER-EDITORIAL / TIER0-CLOSING-SPLIT.`);
  }

  if (layout === 'TIER0-CLOSING-SPLIT' || layout === 'TIER0-CLOSING-V4-DARK') {
    const declaredCta = slide.tag.match(/\bdata-closing-cta="([^"]+)"/)?.[1];
    const hasLegacyWebsite = /\bdata-website-qr=|\bdata-image-slot="tier0-app-qr"|www\.tier0\.app/.test(slide.html);
    const closingCta = declaredCta ?? (hasLegacyWebsite ? 'tier0-app' : 'none');
    if (!declaredCta) {
      warnings.push(`Slide ${slide.idx}: closing page has no data-closing-cta. Add "tier0-app" or "none" from the intake request.`);
    }
    if (!['tier0-app', 'none'].includes(closingCta)) {
      errors.push(`Slide ${slide.idx}: data-closing-cta must be "tier0-app" or "none".`);
    }
    if (closingCta === 'tier0-app') {
      if (!/\bdata-website-qr="tier0-app"/.test(slide.html)) {
        errors.push(`Slide ${slide.idx}: closing CTA "tier0-app" requires data-website-qr="tier0-app".`);
      }
      if (!/\bdata-image-slot="tier0-app-qr"/.test(slide.html)) {
        errors.push(`Slide ${slide.idx}: closing QR must use data-image-slot="tier0-app-qr".`);
      }
      if (!/www\.tier0\.app/.test(slide.html)) {
        errors.push(`Slide ${slide.idx}: closing QR CTA must visibly include www.tier0.app.`);
      }
    } else if (hasLegacyWebsite) {
      errors.push(`Slide ${slide.idx}: data-closing-cta="none" must not render the Tier0 website or QR.`);
    }
  }

  if (!allowExperimental && /\bdata-layout="P2[34]\b|P23 图文分栏|P24 证据网格|swiss-img-split|swiss-img-grid/.test(slide.html)) {
    errors.push(`Slide ${slide.idx}: uses experimental P23/P24 image structure. Use S22/S15 for image evidence or S16 for a demo player.`);
  }

  const isStatement = layout === 'S03' || layout === 'S09' || layout === 'S10'
    || layout === 'TIER0-COVER-EDITORIAL' || layout === 'TIER0-CLOSING-SPLIT'
    || layout === 'TIER0-COVER-V4-DARK' || layout === 'TIER0-CLOSING-V4-DARK'
    || layout === 'SWISS-COVER-ASCII' || layout === 'SWISS-CLOSING-ASCII';
  const topChunk = slide.html.slice(0, 1800);

  if (!isStatement && /text-align\s*:\s*center/i.test(topChunk)) {
    errors.push(`Slide ${slide.idx}: top title area contains text-align:center. Tier0 body titles should stay left aligned.`);
  }

  if (!isStatement && /align-self\s*:\s*center/i.test(topChunk) && /<h[12]\b/i.test(topChunk)) {
    errors.push(`Slide ${slide.idx}: top heading appears vertically/centrally aligned. Use the original left-top title skeleton.`);
  }

  if (/<svg\b[\s\S]*?<text\b/i.test(slide.html) && !/\bdata-allow-svg-labels="architecture"/.test(slide.tag)) {
    errors.push(`Slide ${slide.idx}: SVG contains visible <text>. Put labels in HTML grid/captions, or set data-allow-svg-labels="architecture" only for a compact native architecture diagram.`);
  }

  if (/data-lucide=/i.test(slide.html)) {
    warnings.push(`Slide ${slide.idx}: uses Lucide icons. Tier0 decks should use IBM Carbon Icons.`);
  }

  if (/(color\s*:\s*(?:var\(--accent\)|#B2ED1D|#73B200))/i.test(slide.html) && /class="[^"]*\blight\b/.test(slide.tag)) {
    const onDarkCard = /card-ink|card-accent-solid|tier0-card--ink|tier0-card--accent-solid|sub-card\.accent|stack-block\.b-accent|\.is-signal|signal-pill|step-num\.is-active|rule\.accent|s18-card-top/i.test(slide.html);
    if (!onDarkCard || /col-tag[^>]*color:\s*var\(--accent\)|t-meta[^>]*color:\s*var\(--accent\)|step-title[^>]*color:\s*var\(--accent\)/i.test(slide.html)) {
      warnings.push(`Slide ${slide.idx}: uses bright green text on a light slide. Use ink/muted text + green background, or the approved --accent-text-dark token for essential signal text. See checklist 0-T-3b.`);
    }
  }

  if (/font-weight\s*:\s*(600|700|800|900)/i.test(topChunk) && /<h[12]\b/i.test(topChunk)) {
    warnings.push(`Slide ${slide.idx}: headline may use weight ≥600. Tier0 headlines should stay 400/500.`);
  }

  if (/#002FA7|002FA7/i.test(slide.html)) {
    warnings.push(`Slide ${slide.idx}: contains accent blue (#002FA7). Tier0 accent should be #B2ED1D only.`);
  }

  const localImages = [...slide.html.matchAll(/<img\b[^>]*src="images\//g)];
  localImages.forEach((_, imageIndex) => {
    const imgTag = slide.html.slice(_.index, slide.html.indexOf('>', _.index) + 1);
    if (!/\bdata-image-slot="/.test(imgTag)) {
      errors.push(`Slide ${slide.idx}: local image ${imageIndex + 1} missing data-image-slot.`);
    }
  });

  const frameImageRe = /<div\b(?=[^>]*\bclass="([^"]*\bframe-img\b[^"]*)")[^>]*>\s*<img\b(?=[^>]*\bdata-image-slot="([^"]+)")[^>]*>/g;
  const frameImages = [...slide.html.matchAll(frameImageRe)];
  frameImages.forEach((match) => {
    const className = match[1];
    const slot = match[2];
    const frameTag = match[0].match(/^<div\b[^>]*>/)?.[0] ?? '';
    if (/^s15-grid-21x9$/.test(slot)) {
      if (/\bfit-contain\b/.test(className)) {
        errors.push(`Slide ${slide.idx}: ${slot} uses fit-contain. Regenerated S15 evidence images should fill the slot with .frame-img.r-21x9.`);
      }
      if (!/\br-21x9\b/.test(className)) {
        errors.push(`Slide ${slide.idx}: ${slot} must use .frame-img.r-21x9.`);
      }
      if (/height\s*:\s*\d+(?:\.\d+)?vh/i.test(frameTag)) {
        errors.push(`Slide ${slide.idx}: ${slot} frame has a fixed vh height. Use aspect-ratio .r-21x9 instead.`);
      }
    }
  });

  if (layout === 'S22') {
    if (!/data-image-slot="s22-hero-21x9"/.test(slide.html)) {
      errors.push(`Slide ${slide.idx}: S22 must use data-image-slot="s22-hero-21x9".`);
    }
    if (/object-position\s*:\s*top center/i.test(slide.html)) {
      errors.push(`Slide ${slide.idx}: S22 photo uses object-position:top center. Use center 35% or center center.`);
    }
  }

  if (layout === 'S15') {
    const evidenceGrid = slide.html.match(/<div\b[^>]*\bclass="[^"]*\bimage-evidence-grid\b[^"]*"[^>]*>/)?.[0];
    if (!evidenceGrid) {
      errors.push(`Slide ${slide.idx}: S15 must contain an .image-evidence-grid.`);
    } else {
      const count = Number(evidenceGrid.match(/\bdata-image-count="([234])"/)?.[1]);
      const itemCount = [...slide.html.matchAll(/<figure\b[^>]*\bclass="[^"]*\bimage-evidence-item\b[^"]*"[^>]*>/g)].length;
      if (!count) errors.push(`Slide ${slide.idx}: S15 image evidence grid needs data-image-count="2", "3", or "4".`);
      if (count && itemCount !== count) errors.push(`Slide ${slide.idx}: S15 data-image-count=${count} but contains ${itemCount} evidence items.`);
      if (itemCount && !/\bimage-evidence-caption\b/.test(slide.html)) errors.push(`Slide ${slide.idx}: S15 evidence images require captions.`);
    }
  }

  const vizFigures = [...slide.html.matchAll(/<figure\b[^>]*\bdata-viz="([^"]+)"[^>]*>/g)];
  vizFigures.forEach((figure, figureIndex) => {
    const figureTag = figure[0];
    if (!/\baria-label="[^"]+"/.test(figureTag)) {
      errors.push(`Slide ${slide.idx}: data-viz figure ${figureIndex + 1} needs an aria-label that states the chart's conclusion.`);
    }
  });
  if (vizFigures.length && !/class="[^"]*\bviz-source\b[^"]*"/.test(slide.html) && !/DATA PENDING/i.test(slide.html)) {
    warnings.push(`Slide ${slide.idx}: data visualization has no .viz-source or DATA PENDING disclosure.`);
  }
  const focusBars = [...slide.html.matchAll(/class="[^"]*\bviz-bars__fill\b[^"]*\bis-focus\b[^"]*"/g)];
  if (focusBars.length > 1) {
    warnings.push(`Slide ${slide.idx}: has ${focusBars.length} green data focus bars. Tier0 charts normally use one focus value.`);
  }
  if (/\bdata-animate="data-viz"/.test(slide.tag) && !/\bdata-viz=/.test(slide.html)) {
    errors.push(`Slide ${slide.idx}: data-animate="data-viz" requires at least one data-viz figure.`);
  }
  const demoEvidence = [...slide.html.matchAll(/<div\b[^>]*\bclass="[^"]*\bdemo-evidence\b[^"]*"[^>]*>/g)];
  demoEvidence.forEach((demo, demoIndex) => {
    if (!/\baria-label="[^"]+"/.test(demo[0])) {
      errors.push(`Slide ${slide.idx}: demo-evidence ${demoIndex + 1} needs an aria-label describing the demonstrated task.`);
    }
  });

  const demoPlayers = [...slide.html.matchAll(/<div\b[^>]*\bclass="[^"]*\bdemo-player\b[^"]*"[^>]*>/g)];
  demoPlayers.forEach((player, playerIndex) => {
    if (!/\baria-label="[^"]+"/.test(player[0])) {
      errors.push(`Slide ${slide.idx}: demo-player ${playerIndex + 1} needs an aria-label describing the demonstrated task.`);
    }
  });
  if (layout === 'S16' && demoPlayers.length !== 1) {
    errors.push(`Slide ${slide.idx}: S16 must contain exactly one .demo-player evidence frame.`);
  }
  if (/\bdata-animate="demo-stage"/.test(slide.tag) && !demoPlayers.length) {
    errors.push(`Slide ${slide.idx}: data-animate="demo-stage" requires a .demo-player frame.`);
  }
  const stages = [...slide.html.matchAll(/<div\b[^>]*\bclass="[^"]*\bdemo-player__stage\b[^"]*"[^>]*>/g)];
  stages.forEach((stage, stageIndex) => {
    if (!/\bdata-media-fit="(cover|contain|native)"/.test(stage[0])) {
      errors.push(`Slide ${slide.idx}: demo stage ${stageIndex + 1} needs data-media-fit="cover|contain|native" so framing is reviewed intentionally.`);
    }
    if (/data-media-fit="contain"/.test(stage[0]) && !/\bdata-media-letterbox="intentional"/.test(stage[0])) {
      errors.push(`Slide ${slide.idx}: contain-fit demo media must declare data-media-letterbox="intentional"; otherwise resize the frame or asset to remove blank bars.`);
    }
  });
  const videoTags = [...slide.html.matchAll(/<video\b[^>]*>/g)];
  videoTags.forEach((video, videoIndex) => {
    if (/\bautoplay\b/i.test(video[0]) && !/\bmuted\b/i.test(video[0])) {
      errors.push(`Slide ${slide.idx}: video ${videoIndex + 1} autoplays with sound. Demo media must be muted.`);
    }
  });
  const iframeTags = [...slide.html.matchAll(/<iframe\b[^>]*>/g)];
  iframeTags.forEach((iframe, iframeIndex) => {
    if (!/\bsandbox(?:="[^"]*")?/.test(iframe[0])) {
      errors.push(`Slide ${slide.idx}: iframe ${iframeIndex + 1} must use sandbox inside Tier0 demo evidence.`);
    }
  });
});

const closingIndexes = slides
  .map((slide, index) => ({ index, layout: slide.tag.match(/\bdata-layout="([^"]+)"/)?.[1] }))
  .filter((slide) => slide.layout === 'TIER0-CLOSING-SPLIT' || slide.layout === 'TIER0-CLOSING-V4-DARK');
if (closingIndexes.length !== 1) {
  errors.push(`Deck requires exactly one registered Tier0 closing page; found ${closingIndexes.length}.`);
} else if (closingIndexes[0].index !== slides.length - 1) {
  errors.push('The registered Tier0 closing page must be the final slide in the deck.');
}

if (warnings.length) {
  console.warn('Warnings:');
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length) {
  console.error('Tier0 deck validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Tier0 deck validation passed: ${slides.length} slide(s).`);
