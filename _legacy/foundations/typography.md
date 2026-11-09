# 排版 — 共享基础

## 字体族

字体文件已随仓库放入 `fonts/`，由 `tokens/core.css` 统一注册；预览页和 UI Kit 不再需要外链 Google Fonts。

| 角色 | 字体 | 场景 |
|------|------|------|
| Display / Logo | IBM Plex Mono Medium | 产品、部分品牌页 |
| UI / 正文 / 官网标题 | **IBM Plex Sans**（标题 400–500） | 产品、官网（对齐 tier0.app） |
| 官网挑词 / 信号字 | IBM Plex Sans + `#73B200` | 白底强调；亮绿 `#B2ED1D` 作面/按钮 |
| PPT 封面 / 章节大标题 | **Tektur Regular** | 仅 `ppt`（封面与深色章节页） |
| 中文 / 东亚 | **IBM Plex Sans SC** | 全场景 |
| 页脚 / kicker / ■ 标签 | IBM Plex Mono | 官网、PPT、文档 |

**禁止 Poppins。** 官网标题与 [tier0.app/pricing](https://tier0.app/pricing)、[tier0.app/product/tier0-builder](https://tier0.app/product/tier0-builder) 一致，使用 IBM Plex Sans，不用独立 display 字体。

## 共享字号阶梯（`core.css`）

`display 88 → h1 48 → h2 32 → h3 24 → h4 18 → body 16/14 → caption 12`

产品页优先稳定克制；官网与 PPT 允许更大 Display，见各 surface 文档。

## 字距

Plex Sans 小字号负 tracking（-0.16 ~ -0.27px）保持工业紧凑感。
