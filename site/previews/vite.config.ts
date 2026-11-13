import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'node:path';

// 门户「Tier0 平台组件」的预览：直接渲染 02-components/packages 里的前端组件（复刻自 Tier0-Frontend），
// 构建成单文件 public/previews/index.html，门户用 iframe 按 #组件 id 嵌入。
// 构建：npx vite build --config previews/vite.config.ts
// 02-components 不在 site 目录下，里面的第三方依赖改从 site/node_modules 解析
const fromSite = {
  name: 'tier0-resolve-from-site',
  enforce: 'pre' as const,
  async resolveId(this: any, id: string, importer?: string) {
    if (!importer || !importer.includes('02-components') || id.startsWith('.') || id.startsWith('/') || id.startsWith('@tier0/') || id === 'next-intl' || id.startsWith('\0')) return null;
    return this.resolve(id, path.resolve(__dirname, 'main.tsx'), { skipSelf: true });
  },
};
const pkg = (p: string) => path.resolve(__dirname, '../../02-components/packages', p);
export default defineConfig({
  root: __dirname,
  base: './',
  plugins: [fromSite, react(), tailwind(), viteSingleFile()],
  resolve: {
    alias: [
      { find: /^@tier0\/ui\/(.*)$/, replacement: pkg('ui/$1') },
      { find: '@tier0/utils', replacement: pkg('utils/src/index.ts') },
      { find: '@tier0/hooks', replacement: pkg('hooks/src/index.ts') },
      { find: 'next-intl', replacement: path.resolve(__dirname, 'shims/next-intl.ts') },
    ],
  },
  css: { preprocessorOptions: { scss: { api: 'modern-compiler', silenceDeprecations: ['import', 'global-builtin'] } } },
  build: { outDir: path.resolve(__dirname, '../public/previews'), emptyOutDir: true, chunkSizeWarningLimit: 4000 },
});
