# Template · Tier0 Security Advisories（Framer 代码组件）

一个完整、已验收的实现：安全公告与更新页。复用方式二选一：

- **同类页面**（更新日志、公告、资源列表）：改 `src/data.js` + `src/messages.js`，必要时调整 `src/widget.js` 的 `itemMarkup()` 与筛选维度  
- **其他页面**：只复用 `build.mjs` / `verify.mjs` / `stubs/` 骨架和 `widget.css` 的 token、container query 写法，换掉内容

## 目录

| 路径 | 作用 |
|------|------|
| `src/data.js` | 记录数据（中文为源 `T0SA_ZH`，英文按 id 映射生成 `T0SA_EN`） |
| `src/messages.js` | 界面文案，`zh-CN` / `en` 同 key |
| `src/widget.js` | `createAdvisories(options)` → `html()` 静态标记 / `mount(root)` 交互 |
| `src/widget.css` | 全部样式（根前缀 `.t0sa`，container query 三档） |
| `build.mjs` | 生成 `out/Tier0SecurityAdvisories.tsx` 与 `out/preview.html` |
| `verify.mjs` | SSR + hydration + 多宽度 + 交互验收，生成截图 |
| `stubs/framer.js` | 验收用的 `framer` 模块替身 |

## 命令

```bash
cd skills/tier0-framer-page/template
npm install                      # esbuild + react（仅验收需要）
node build.mjs                   # → out/
node verify.mjs                  # 需要 playwright + chromium
```

没有 Playwright 时：`npm i -D playwright && npx playwright install chromium`，或用全局安装：`NODE_PATH=$(npm root -g) node verify.mjs`。

`out/` 不入库；交付物以每次 build 结果为准。

## 组件属性（Framer 右侧面板）

| 属性 | 默认 | 说明 |
|------|------|------|
| Language | Auto | Auto = Framer 站点语言 → `<html lang>` → 浏览器；也可强制 English / 中文 |
| Report email | `productsupport@freezonex.io` | Hero CTA 与帮助卡的 `mailto` |
| Page size | 10 | 每页条数 |
| Share URL | 空 | 空 = 当前页面地址；Embed / iframe 场景必须填写 |
| Nav offset | 88px | 站点导航高度 + 余量（sticky 侧栏、翻页回滚） |
| Side padding | 24px | 平板 / 桌面左右边距；手机自动收窄到 ≤16px |
| Max width | 1200px | 内容最大宽度 |
