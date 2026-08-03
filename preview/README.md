# Preview — 组件预览与维护门户

在仓库根目录启动：

```bash
./scripts/serve-preview.sh
```

浏览器打开：**http://localhost:8899/preview/**

新增 / 移动 preview HTML 后，运行一次：

```bash
python3 scripts/build-preview-manifest.py
```

会更新 `manifest.json`（门户目录索引）。

---

## 目录说明

| 目录 | Token | 内容 |
|------|-------|------|
| [`_shared/`](_shared/) | `tokens/core.css` | 色板、字号、间距、圆角等原子 token |
| [`tier0-product/`](tier0-product/) | `tokens/product.css` | 工作台：黑按钮、侧栏、表格行、LIVE 状态 |
| [`company-website/`](company-website/) | `tokens/website.css` | 官网：Eyebrow、Poppins Hero、图示面板、对比卡 |
| [`ppt/`](ppt/) | `tokens/deck.css` | PPT：封面/章节/内容页、主题色、页脚、KPI |

| 文件 | 说明 |
|------|------|
| [`index.html`](index.html) | 可视化维护门户 |
| [`manifest.json`](manifest.json) | 门户目录索引（脚本生成，可提交到 Git） |
