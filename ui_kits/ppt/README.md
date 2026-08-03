# Marketing Deck UI Kit

PPT 规范以 PowerPoint 母版为准（见 [`surfaces/ppt/`](../../surfaces/ppt/)）。

本目录预留 HTML 幻灯片模板（封面 / 章节 / 白底内容），便于 Agent 生成可浏览器预览的路演稿。

## 预览

本地启动：

```bash
./scripts/serve-preview.sh
```

浏览器打开：**http://localhost:8899/ui_kits/marketing-deck/**

`index.html` 包含 7 页演示稿（封面 → 章节 → 内容 → 卡片 → KPI → 对比 → 封底），支持 ← → 方向键与空格翻页。

单页组件预览见 [`preview/marketing-deck/`](../../preview/marketing-deck/)。

Token：[`tokens/deck.css`](../../tokens/deck.css)
