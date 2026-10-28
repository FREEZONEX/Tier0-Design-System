# Foundations — 全场景共享基础

四大能力（**产品原型 · 网页原型 · PPT · 单页/海报**）共用本层：Logo、色、字、气质、术语。  
场景排版与真源对齐见 `skills/*/SKILL.md` 与 `surfaces/*/`，**不要在 foundations 里写场景专属版式。**

**Agent：** root [`SKILL.md`](../SKILL.md) 选场景 → 场景 skill → 需要品牌细则时再读本目录。设计权威总览：[`DESIGN.md`](../DESIGN.md)（按需读相关段）。

## 与场景的关系

| 层 | 回答什么 |
|----|----------|
| **foundations + assets + tokens/core** | 我们是谁：Logo / 色 / 字 / 禁忌 |
| **scenario skill + surfaces + tokens/\*** | 这页怎么做、对齐哪份真源 |
| **用户外部参考 / 其他 skill** | 在品牌锁内把工艺做更好 |

## 文件索引

| 文件 | 内容 |
|------|------|
| [brand.md](brand.md) | 品牌印象、Logo 文件表、零容忍规则 |
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
- Logo 只用 `assets/tier0-logo-*.svg`（见 [brand.md](brand.md)）。
- 术语一致：UNS、Source Flow、Event Flow、Namespace、Broker 等（见 [voice-content.md](voice-content.md)）。

## 全场景 Must not

- 把 `#B2ED1D` 当作浅色界面上的小字号按钮底色（对比不足）。
- 默认紫蓝渐变、霓虹赛博风、消费级圆角 pill 泛滥。
- 在产品 UI 使用 emoji 装饰。
- 用字体拼写替代官方 Logo。

## 场景差异（仅指向）

| 主题 | 产品 | 官网 | PPT | 单页/海报 |
|------|------|------|-----|-----------|
| 标题字体 | Plex Sans | **Plex Sans 400–500** | **Plex Sans** | 全场景 Plex；**禁止 Tektur 标题** |
| 品牌蓝 | 不用 | 极少 | **`#1D77FE`** | 慎用 |
| 主按钮 | 近黑 + 绿高亮 | 亮绿 CTA | 主题色少 | 按物料 |
| 真源 | Frontend + Figma | tier0.app | deck token | DESIGN.md + brief |
