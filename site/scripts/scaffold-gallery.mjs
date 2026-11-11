// 从 Tier0-App-Scaffold 构建组件门户：
//  1) public/scaffold/ 多文件版本（本地预览与部署用）
//  2) public/scaffold/single.html 单文件版本（打包成单个 HTML 时嵌入；预览 iframe 改为 srcdoc）
// 输出不进仓库。SCAFFOLD_DIR 指向脚手架仓库，默认是相邻目录。
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, rmSync, readdirSync, cpSync } from 'node:fs';
import { resolve, join } from 'node:path';

const site = resolve(import.meta.dirname, '..');
const repo = resolve(process.env.SCAFFOLD_DIR || join(site, '../../Tier0-App-Scaffold'));
const out = join(site, 'public/scaffold');
const work = join(repo, '.output', 'ds-gallery');
rmSync(out, { recursive: true, force: true });
mkdirSync(join(repo, '.output'), { recursive: true });
const run = cmd => execSync(cmd, { cwd: repo, stdio: 'inherit' });

// 1) 多文件
run(`npx vite build --config gallery/vite.config.ts --base ./ --outDir ${JSON.stringify(out)} --emptyOutDir --logLevel warn`);

// 2) 单文件：index 与 preview 各自内联
const single = entry => {
  const dir = join(work, entry);
  const cfg = join(repo, '.output', `ds-${entry}.config.mjs`);
  writeFileSync(cfg, `import {defineConfig} from 'vite';import react from '@vitejs/plugin-react';import tailwind from '@tailwindcss/vite';
const root=${JSON.stringify(join(repo, 'gallery') + '/')};
export default defineConfig({root,base:'./',publicDir:false,plugins:[react(),tailwind()],resolve:{alias:{'@':${JSON.stringify(join(repo, 'src'))}}},
build:{emptyOutDir:true,outDir:${JSON.stringify(dir)},assetsInlineLimit:1e9,cssCodeSplit:false,rollupOptions:{input:root+'${entry}.html',output:{inlineDynamicImports:true}}}});`);
  run(`npx vite build --config ${JSON.stringify(cfg)} --logLevel error`);
  rmSync(cfg, { force: true });
  const a = join(dir, 'assets');
  const file = ext => join(a, readdirSync(a).find(f => f.endsWith(ext)));
  return readFileSync(join(dir, entry + '.html'), 'utf8')
    .replace(/<script type="module" crossorigin src="[^"]+"><\/script>/, () => `<script type="module">${readFileSync(file('.js'), 'utf8').replaceAll('</script', '<\\/script')}</script>`)
    .replace(/<link rel="stylesheet" crossorigin href="\.\/assets\/([^"]+)">/g, (m, f) => `<style>${readFileSync(join(a, f), 'utf8')}</style>`);
};
const index = single('index');
const preview = single('preview');
// iframe 指向 preview.html?xxx 时改为 srcdoc，并让预览页读到原来的查询参数
const shim = `<script>(function(){var P=${JSON.stringify(preview).replaceAll('</script', '<\\/script')};
function to(f,v){var q=String(v).split('?')[1]||'';f.srcdoc=P.replace('<head>',function(){return '<head><script>(function(){var Q='+JSON.stringify('?'+q)+',U=URLSearchParams;window.URLSearchParams=class extends U{constructor(x){super(x===undefined||x===location.search?Q:x)}}})()<\\/script>'});}
var d=Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype,'src');
Object.defineProperty(HTMLIFrameElement.prototype,'src',{get:d.get,set:function(v){if(/^(\\.\\/)?preview\\.html/.test(String(v)))to(this,v);else d.set.call(this,v);},configurable:true});
var sa=Element.prototype.setAttribute;Element.prototype.setAttribute=function(n,v){if(this.tagName==='IFRAME'&&n==='src'&&/^(\\.\\/)?preview\\.html/.test(String(v)))return to(this,v);return sa.call(this,n,v);};})();</script>`;
writeFileSync(join(out, 'single.html'), index.replace('<head>', () => '<head>' + shim));
rmSync(work, { recursive: true, force: true });
console.log('scaffold gallery →', out);
