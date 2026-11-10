import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import fs from 'node:fs';

// 网站运行时读取仓库里的规范文件（00-foundation、01-tokens、03-brand）。
// 开发时直接从仓库根目录提供，构建时复制进 dist。
const repo = path.resolve(__dirname, '..');
const DATA_DIRS = ['00-foundation', '01-tokens', '03-brand'];
function repoData(): Plugin {
  return {
    name: 'tier0-repo-data',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = decodeURIComponent((req.url || '').split('?')[0]);
        const dir = DATA_DIRS.find(d => url.startsWith('/' + d + '/'));
        if (!dir) return next();
        const file = path.join(repo, url);
        if (!file.startsWith(repo) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) return next();
        res.setHeader('Content-Type', file.endsWith('.json') ? 'application/json' : file.endsWith('.svg') ? 'image/svg+xml' : 'text/plain; charset=utf-8');
        fs.createReadStream(file).pipe(res);
      });
    },
    closeBundle() {
      for (const d of DATA_DIRS) fs.cpSync(path.join(repo, d), path.resolve(__dirname, 'dist', d), { recursive: true });
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), repoData()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
});
