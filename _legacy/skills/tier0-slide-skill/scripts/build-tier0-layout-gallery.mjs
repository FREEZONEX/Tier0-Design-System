#!/usr/bin/env node
/** Build the canonical Gallery, its machine-readable catalog, and its locked-mode validation. */
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const skillRoot = resolve(scriptDir, '..');
const galleryDir = resolve(skillRoot, 'layout-gallery');
const run = (script, ...args) => execFileSync(process.execPath, [resolve(scriptDir, script), ...args], { stdio: 'inherit' });

run('build-tier0-layout-catalog.mjs', resolve(galleryDir, 'slides.html'), resolve(galleryDir, 'layout-catalog.json'));
run('build-tier0-deck.mjs', galleryDir);
run('validate-tier0-deck.mjs', resolve(galleryDir, 'index.html'));
