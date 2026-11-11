// 从相邻的 Tier0-App-Scaffold 仓库构建组件门户，输出为单个 HTML（public/scaffold/index.html，不进仓库）
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const site = resolve(import.meta.dirname, '..');
const repo = resolve(process.env.SCAFFOLD_DIR || join(site, '../../Tier0-App-Scaffold'));
const tmp = join(repo, '.output', 'ds-gallery');
const cfg = join(repo, '.output', 'ds-gallery.config.mjs');
mkdirSync(join(repo, '.output'), { recursive: true });
writeFileSync(cfg, `import {defineConfig} from 'vite';import react from '@vitejs/plugin-react';import tailwind from '@tailwindcss/vite';
const root=${JSON.stringify(join(repo, 'gallery') + '/')};
export default defineConfig({root,base:'./',publicDir:false,plugins:[react(),tailwind()],resolve:{alias:{'@':${JSON.stringify(join(repo, 'src'))}}},
build:{emptyOutDir:true,outDir:${JSON.stringify(tmp)},assetsInlineLimit:1e9,cssCodeSplit:false,rollupOptions:{input:root+'index.html',output:{inlineDynamicImports:true}}}});`);
execSync(`npx vite build --config ${JSON.stringify(cfg)} --logLevel warn`, { cwd: repo, stdio: 'inherit' });
const a = join(tmp, 'assets');
const file = ext => join(a, readdirSync(a).find(f => f.endsWith(ext)));
let html = readFileSync(join(tmp, 'index.html'), 'utf8')
  .replace(/<script type="module" crossorigin src="[^"]+"><\/script>/, () => `<script type="module">${readFileSync(file('.js'), 'utf8').replaceAll('</script', '<\\/script')}</script>`)
  .replace(/<link rel="stylesheet" crossorigin href="[^"]+">/, () => `<style>${readFileSync(file('.css'), 'utf8')}</style>`);
mkdirSync(join(site, 'public/scaffold'), { recursive: true });
writeFileSync(join(site, 'public/scaffold/index.html'), html);
rmSync(tmp, { recursive: true, force: true }); rmSync(cfg, { force: true });
console.log('scaffold gallery →', join(site, 'public/scaffold/index.html'));
