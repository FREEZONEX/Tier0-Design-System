# 排版 — 共享基础

## 字体族

字体文件已随仓库放入 `fonts/`，由 `tokens/core.css` 统一注册；预览页和 UI Kit 不再需要外链 Google Fonts。

| 角色 | 字体 | 场景 |
|------|------|------|
| Display / Logo | IBM Plex Mono Medium | 产品、部分品牌页 |
| UI / 正文 | IBM Plex Sans | 产品、官网正文 |
| 官网标题 | **Poppins** | 仅 `company-website` |
| PPT 封面 / 章节大标题 | **Tektur Regular** | 仅 `ppt`（封面与深色章节页） |
| 中文 / 东亚 | **IBM Plex Sans SC** | PPT 优先；官网/文档中文可复用 |
| 页脚技术字 | IBM Plex Mono | PPT 版权 |

## 共享字号阶梯（`core.css`）

`display 88 → h1 48 → h2 32 → h3 24 → h4 18 → body 16/14 → caption 12`

产品页优先稳定克制；官网与 PPT 允许更大 Display，见各 surface 文档。

## 字距

Plex Sans 小字号负 tracking（-0.16 ~ -0.27px）保持工业紧凑感。
