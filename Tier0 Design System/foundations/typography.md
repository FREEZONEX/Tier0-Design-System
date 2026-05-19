# 排版 — 共享基础

## 字体族

| 角色 | 字体 | 场景 |
|------|------|------|
| Display / Logo | IBM Plex Mono Medium | 产品、部分品牌页 |
| UI / 正文 | IBM Plex Sans | 产品、官网正文 |
| 官网标题 | **Poppins** | 仅 `company-website` |
| PPT 封面 | **Poppins SemiBold** | 仅 `marketing-deck` |
| PPT 章节 | **Tektur Regular** | 仅 `marketing-deck` |
| PPT / 中文 | **IBM Plex Sans SC** | 东亚与简体 |
| 页脚技术字 | IBM Plex Mono | PPT 版权 |

## 共享字号阶梯（`core.css`）

`display 88 → h1 48 → h2 32 → h3 24 → h4 18 → body 16/14 → caption 12`

产品页优先稳定克制；官网与 PPT 允许更大 Display，见各 surface 文档。

## 字距

Plex Sans 小字号负 tracking（-0.16 ~ -0.27px）保持工业紧凑感。
