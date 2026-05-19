# Preview — 组件预览与维护门户

在仓库根目录启动服务（二选一，**不要重复起两个 8899**）：

```bash
python3 -m http.server 8899          # 方式 A：仅经典单页
./scripts/serve-preview.sh             # 方式 B：重建索引 + 起服务（推荐）
```

| 方式 | 浏览器入口 | 说明 |
|------|------------|------|
| **A 经典单页** | http://localhost:8899/preview/classic.html | 改门户之前：按文件夹列出所有 HTML 组件卡链接 |
| **B 维护门户** | http://localhost:8899/preview/ | 全仓库目录树 + 内嵌预览 + Markdown |

首次使用方式 B 前，或新增 preview HTML 后，请运行一次：

```bash
python3 scripts/build-preview-manifest.py
```

会更新 `manifest.json` 与 `classic.html`。

---

## 目录说明

| 目录 | Token | 内容 |
|------|-------|------|
| [`_shared/`](_shared/) | `tokens/core.css` | 色板、字号、间距、圆角等原子 token |
| [`tier0-product/`](tier0-product/) | `tokens/product.css` | 工作台：黑按钮、侧栏、表格行、LIVE 状态 |
| [`company-website/`](company-website/) | `tokens/website.css` | 官网：Eyebrow、Poppins Hero、图示面板、对比卡 |
| [`marketing-deck/`](marketing-deck/) | `tokens/deck.css` | PPT：封面/章节/内容页、主题色、页脚、KPI |

| 文件 | 说明 |
|------|------|
| [`index.html`](index.html) | 可视化维护门户 |
| [`classic.html`](classic.html) | 经典单页索引（脚本生成） |
| [`manifest.json`](manifest.json) | 门户目录索引（脚本生成，可提交到 Git） |
