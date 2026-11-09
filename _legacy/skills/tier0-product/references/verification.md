# 验证与已知坑

交付前跑完「必做」，再对照「已知坑」逐条看。没跑的检查在回复里说没跑。

## 必做

### 1. 语法

```bash
python3 -c "import re,sys;s=open(sys.argv[1]).read();open('/tmp/proto-check.js','w').write(re.findall(r'<script>\n(.*?)</script>',s,re.S)[-1])" prototype.html
node --check /tmp/proto-check.js
```

### 2. 验证脚本

```bash
node skills/tier0-product/scripts/verify-prototype.mjs prototype.html \
  --out ./verify-out \
  --open "[data-action=menu][data-arg=dialogs] >> [data-arg=addSeats]" \
  --open "[data-action=menu][data-arg=dialogs] >> [data-arg=cancelPlan]"
```

输出 JSON：`errors`（控制台报错）、`unknownLucideIcons`（当前版本里不存在的图标名）、`scrollingSidebars`（会滚动的侧栏）、`horizontalOverflow`（桌面 / 400px）、`dialogs[].width`（实测弹窗宽度）。`ok: false` 时退出码为 1。

**离线环境**（CDN 被代理拦截时）：先把同版本的包拉到本地，再加 `--cdn-cache`：

```bash
mkdir -p .cdn-cache && cd .cdn-cache
npm pack @tailwindcss/browser@4.1.11 lucide@0.460.0
for f in *.tgz; do d="${f%.tgz}"; mkdir -p "$d" && tar xzf "$f" -C "$d" --strip-components=1; done
cd .. && node skills/tier0-product/scripts/verify-prototype.mjs prototype.html --cdn-cache .cdn-cache
```

`.cdn-cache/` 不要提交。

### 3. 看截图

逐张对照 Figma 截图看 `desktop.png`、`phone.png`、`dialog-*.png`。看一遍、改一轮，不要无限循环。

### 4. 对照清单

**还原**
- [ ] 每个 Figma 节点都有对应页面或状态
- [ ] 弹窗实测宽度 = Figma（480 / 500）
- [ ] 卡片内边距、间距、字号、图标名与规格清单一致
- [ ] 旧版弹窗按旧版，没有被新稿风格替换

**组件**
- [ ] 按钮、弹窗、Tabs、进度条、输入框的 class 与源码一致
- [ ] 没有 hex 颜色 class，没有 Tailwind 默认色板（`violet-100` 这类）
- [ ] 改造或新增的组件在标注和交付说明里都标了

**状态**
- [ ] 原型控制能切到状态矩阵里的每一项
- [ ] 每个弹窗都能从「弹窗直达」打开
- [ ] 空状态、加载、失败、满额都有
- [ ] 非 Owner 看不到 owner-only 的入口

**数据与文案**
- [ ] 同一数字各处一致；日期都从同一个「今天」算
- [ ] 英文文案来自 i18n；新文案列进 i18n 表
- [ ] 中文用「你」；没有解释性冗余文字

**壳层与适配**
- [ ] 侧栏不滚动，只有内容区滚动
- [ ] 400px 无横向滚动；原型控制在手机上默认收起
- [ ] 暗色下文字可读

## 已知坑

| 现象 | 原因 | 处理 |
|------|------|------|
| 弹窗宽度不对（设了 `w-120` 却是 672px） | 仓库 `cn()` 是 tailwind-merge，会删掉冲突的默认 class；原型直接拼接 class，`w-full` 和 `w-120` 同时存在 | 原型里模拟合并：`className` 有 `w-*` 就去掉默认 `w-full`，`gap-*` 去 `gap-8`，`sm:max-w-*` 去 `sm:max-w-2xl`，`px-*` 去 `px-4`，`h-*` 去 `h-2` |
| 弹窗内间距比设计大 | 同上，`gap-8` 没被 `gap-4` 替换 | 同上 |
| 图表比容器矮一截 | Tailwind 浏览器版异步生成样式，首次绘制时容器高度还是 0 | 图表容器挂 `ResizeObserver`，尺寸变化时重绘 |
| 图标空白 | 图标名在固定的 Lucide 版本里不存在（改名，如 `file-bar-chart-2` → `file-chart-column`） | 验证脚本看 `unknownLucideIcons`；或在 npm 包 `dist/esm/icons/` 里找文件 |
| 截图里样式全无 | 沙箱代理拦截 CDN | 用 `--cdn-cache` 走本地包 |
| 侧栏出现滚动条、跟着页面滚 | 整页滚动 | `html, body { height: 100% }`，壳层 `flex h-full overflow-hidden`，侧栏 `overflow-hidden`，只有 `main` `overflow-y-auto` |
| 页面最底部被原型控制挡住 | 面板固定在右下角 | 内容区底部留白 ≥ 面板高度，面板可收起 |
| 卡片按钮被挤到第二行 | `Button sm` 默认 `px-4` 比 Figma 宽 | 卡片内按钮 `className="px-3"`（配合合并逻辑），数字行 `whitespace-nowrap` |
| `font-sans` 让字体变成系统字体 | Tailwind 默认 `--font-sans` 不是 IBM Plex | `@theme` 里写 `--font-sans: <IBM Plex 字体栈>`、`--font-display: <Inter 字体栈>` |
| 满额时一堆红字 | 额外加了说明文字 | 只用进度条和百分比颜色表达 |
| 柱状图有圆角 | 顶段加了 `rx` / `radius` | 去掉，直角 |
| 日期弹层左右空太多 | 翻页箭头单独占列，宽度没按 Figma | 宽 512、内边距 16，箭头放进月份标题行 |
| 失焦校验吞掉按钮点击 | `focusout` 里重渲染，替换了正要点击的按钮 | 回车触发校验；或失焦时只更新输入框附近的节点 |
| Figma 节点 not found | 设计稿更新后节点被删或替换 | 重新列 section 子节点，按名字和位置找最新帧 |
| 找不到实例里的文字 | `findAllWithCriteria` 不进入 instance | 用 `findAll(n => n.type === 'TEXT')` |
| 两个数字口径不一致（如剩余 vs 已用） | Figma 不同帧各画各的 | 统一一种并写进「待确认」，不要两处各用一种 |
