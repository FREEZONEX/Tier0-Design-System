# Tier0 DESIGN.md

> Agent-readable design guide synthesized from `foundations/`.
> Source of truth: repo `foundations/*.md` + `tokens/core.css`.

## Surfaces

| Surface | Path | Tokens |
|---------|------|--------|
| Product UI | `surfaces/tier0-product/` | `tokens/product.css` |
| Company Website | `surfaces/company-website/` | `tokens/website.css` |
| Marketing Deck (PPT) | `surfaces/ppt/` | `tokens/deck.css` |
| Slide Skill | `skills/tier0-slide-skill/` | deck + Gallery |


---

<!-- foundations/brand.md -->

# 品牌印象

**Tier0** — FREEZONEX 开源 UNS 工业数据平台。

## 气质三词

- **Industrial** — `#050B14` 深底，严肃工具感
- **Live** — `#B2ED1D` 实时数据流
- **Open** — IBM Plex，开发者与开源亲和

## Logo

| 文件 | 用途 |
|------|------|
| `assets/tier0-logo-lime.svg` | 深色底（侧栏、Hero、页脚） |
| `assets/tier0-logo-black.svg` | 浅色底导航 |
| `assets/tier0-logo-white.svg` | 深底反白备用 |

## 官网二维码（Marketing Deck 封底）

| 文件 | 用途 |
|------|------|
| `assets/website-qrcode-white.png` | 深底 slide（A2 封底）· 右下角 |
| `assets/website-qrcode-black.png` | 浅底 slide（备用）· 右下角 |

扫描目标：`https://tier0.app`。仅封底最后一页使用；摆放见 [`references/ppt-diagrams.md`](../references/ppt-diagrams.md) §封底二维码。

##  restraint

饱和 lime **只做高光**：Logo、Hero 挑词、数据流连线。大面积由 `#F0FBD2`、`#73B200`、`#CCF368` 承担。


---

<!-- foundations/color.md -->

# 颜色 — 共享语义

实现：`tokens/core.css`。各 surface 另有扩展（`tokens/website.css`、`tokens/deck.css`）。

## 使用顺序（产品 UI）

1. `--tier0-*` / `--fx-*` 语义变量  
2. Tailwind 语义 class（若在 monorepo 内）  
3. 极少量局部补充 — **禁止**业务页常规硬编码 hex  

## Lime 禁区（全场景）

| 允许 | 禁止 |
|------|------|
| Logo、深色 Hero 一字高光、流线图 | 浅色 UI 小按钮满铺 `#B2ED1D` |
| 选中/激活/进度（产品） | 整页荧光绿底 |
| PPT accent1 结构线 | 绿底上叠白字（PPT 对比不足） |

## 浅色产品 CTA

- 填充：`#CCF368`（`--fx-button-lime`）  
- 文字：`#333333`（`--fx-on-lime`）  

## 表格 / 列表 hover

- 使用 `#F0FBD2`，不用灰色行 hover


---

<!-- foundations/typography.md -->

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


---

<!-- foundations/spacing-layout.md -->

# 间距与布局 — 共享

## 栅格

- 默认 **8px** 基础网格；产品 UI 内部控件可用 **4px** 紧凑节奏。  
- 卡片内边距常见 **28px**；组件圆角 **4px**，卡片 **10px**（产品 primitive）或 **4px**（官网/PPT 编辑风）。

## 阴影

- 卡片：`1px 2px 8px rgba(5,11,20,.10)`  
- Hover：略加深，**无** translate 跳动  
- 禁止：内阴影、新拟态、多层软阴影堆叠（产品 dashboard）

## 动效

- 150–200ms ease-out；颜色/边框/透明度为主  
- 禁止：与状态无关的装饰动画  

## 焦点

- `2px #B2ED1D` outline，`2px` offset


---

<!-- foundations/voice-content.md -->

# 文案与术语

## 语气

- 直接、技术、克制；面向 OT/IT、工程师、集成商  
- 产品陈述用第三人称；安装步骤用「你」  
- 避免营销口号、情绪化、第一人称  

## 命名

| 写法 | 说明 |
|------|------|
| **Tier0** | 无空格，数字 0 |
| **FREEZONEX** | 全大写 |
| **UNS** | Unified Namespace |

## 术语表

UNS、Source Flow、Event Flow、Namespace、Topic、Path、Topology、Broker、Sink、IIoT、time-series、semantic MQTT

## 按钮与导航

- 按钮：sentence case —「Start free trial」「Sign in」  
- 导航 / 分区：Title Case —「Namespace」「Source Flow」  

## Emoji

- **产品 UI：** 不用  
- 文档：仅功能性 📖 🐞，非装饰
