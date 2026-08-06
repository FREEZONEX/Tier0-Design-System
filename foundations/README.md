# Foundations — 全场景共享基础

三个表面（产品 UI、官网、PPT）共用本层约定。场景特有规则见 `surfaces/*/`，不要在此重复。

**Agent 入口：** 先读仓库根目录 [`DESIGN.md`](../DESIGN.md)（Vercel `design.md` 格式的设计权威），再按需下钻本目录细则。

## 文件索引

| 文件 | 内容 |
|------|------|
| [brand.md](brand.md) | 品牌印象、Logo、气质三词 |
| [color.md](color.md) | 共享色语义、lime 使用禁区 |
| [typography.md](typography.md) | IBM Plex 家族与共享字号阶梯 |
| [spacing-layout.md](spacing-layout.md) | 8px 网格、圆角、阴影原则 |
| [iconography.md](iconography.md) | 图标总览（产品 Carbon / 其余 Lucide） |
| [icons-lucide.md](icons-lucide.md) | Lucide 引用、选标表、带 Icon 卡片 |
| [voice-content.md](voice-content.md) | 语气、术语、命名 |

## 共享品牌色（代码：`tokens/core.css`）

| Token | HEX | 角色 |
|-------|-----|------|
| `--fx-black` | `#050B14` | 深底、主文字 |
| `--fx-lime` | `#B2ED1D` | Tier0 Green，品牌高光 |
| `--fx-deep-green` | `#73B200` | 深绿强调、链接 |
| `--fx-button-lime` | `#CCF368` | 浅色 UI 主按钮 |
| `--fx-green-1` | `#F0FBD2` | 浅绿底、行 hover |

## 全场景 Must

- 工业、克制、可信；绿色是「标点」不是满屏铺色。
- 边框分层优先于重阴影。
- 术语一致：UNS、Source Flow、Event Flow、Namespace、Broker 等（见 [voice-content.md](voice-content.md)）。

## 全场景 Must not

- 把 `#B2ED1D` 当作浅色界面上的小字号按钮底色（对比不足）。
- 默认紫蓝渐变、霓虹赛博风、消费级圆角 pill 泛滥。
- 在产品 UI 使用 emoji 装饰。

## 场景差异（仅指向）

| 主题 | 产品 | 官网 | PPT |
|------|------|------|-----|
| 标题字体 | Plex Sans | **Plex Sans 400–500** | **Tektur** |
| 品牌蓝 | 不用 | 极少 | **`#1D77FE`** |
| 主按钮 | 近黑 + 绿高亮 | 轻 CTA | 主题色 |
