# Surface — 公司官网（Tier0 编辑风长页）

> 提炼自 [`sources/spec.company-website.editorial.md`](../../sources/spec.company-website.editorial.md) + [`sources/spec.company-website.tokens.md`](../../sources/spec.company-website.tokens.md)。  
> 典型页面：**UNS 长文产品叙事页**（非通用 SaaS 营销首页）。

## 定位

长滚动、**编辑感 + 工业可信** 的产品说明页（对齐 [tier0.app](https://tier0.app/pricing) / [Builder](https://tier0.app/product/tier0-builder)）：

- 白底为主、浅灰绿分组带点缀  
- **IBM Plex Sans** 标题（400–500）+ 括号挑词 `[Keyword]` / 绿字 `#73B200`  
- **IBM Plex Mono** 小节标签 `■ HOW IT WORKS`  
- 主 CTA：**亮绿底 `#B2ED1D` + 近墨字**；次 CTA：白底细边框  
- 细线技术插图 + 白卡片细边框  
- **紧圆角（~4px）、几乎无阴影**  
- **禁止 Poppins**

### 不应像

- _startup 超大 CTA Hero_  
- 深色赛博页  
- 软萌消费 dashboard  
- 无节奏的技术白皮书  
- Poppins / Inter 作品牌标题  

## 与其他场景差异

| 维度 | 官网 | 产品 UI | PPT |
|------|------|---------|-----|
| 字体 | **Plex Sans 标题 + 正文** | Plex only | + Tektur 章节 |
| 绿 | `#B2ED1D` 按钮/面；`#73B200` 白底字 | FX Green 状态 | `#B2ED1D` accent1 |
| 阴影 | 极轻或无 | 卡片轻阴影 | 默认无 |
| 结构 | 长页多 section | 工作台 | 幻灯片 |

## 页面原型（推荐节序）

1. Eyebrow + H1 + intro + hero diagram  
2. Concept → Protocol → Architecture → Structure  
3. Reuse → Data model grid → Feedback loop  
4. Platform outcomes → Comparison closing  

## 画布

| Token | 值 |
|-------|-----|
| 桌面画板 | 1440px |
| 内容最大宽 | 1280px |
| 正文栏 | 560–620px |
| 断点 | 1100 / **810** / 480 |

## 背景层次

1. 根画布 `#FFFFFF`  
2. 分组带 `#F7F8F4`（节制使用）  
3. 卡片 `#FFFFFF`  
4. 图示舞台 `#F6F7F3` / `#F9FAF6`  

**白底优先， tint 其次。**

## 颜色（`tokens/website.css`）

| Token | 用途 |
|-------|------|
| `--green-brand` | 标题挑词、箭头、强调框 |
| `--text` `#171A22` | 主标题 |
| `--text-3` | 正文 |
| `--border` `#E2E6DE` | 面板描边 |

绿 **不** 用于整段正文。

## 排版

| 角色 | 字体 | 桌面字号 |
|------|------|----------|
| Eyebrow chip | IBM Plex Mono | 10px |
| Hero H1 | IBM Plex Sans | 500 · ~38–76px |
| Section H2 | IBM Plex Sans | 400–500 · ~32–46px |
| Body | IBM Plex Sans | 16–18px |

标题：一句中 **仅一词/短语绿色**，勿全绿。

## 布局模式

| 模式 | 用途 |
|------|------|
| A Hero + 宽图 | 顶栏叙事 + 下图 |
| B 左文右代码 | Concept |
| C 左图右文 | Architecture |
| D 居中标题 + 卡片栅格 | 建模/能力 |
| E 双栏对比卡 | Traditional vs Tier0 |

详见 [layout.md](layout.md)。

## 组件

Eyebrow chip、Hero 标题块、Diagram panel、Code panel、Feature card、**Card with Icon**、Comparison card — 见 [components.md](components.md) 与 [`sources/spec.company-website.tokens.md`](../../sources/spec.company-website.tokens.md)。图标库：**Lucide**（`foundations/icons-lucide.md`）。

## UI Kit

[`ui_kits/company-website/index.html`](../../ui_kits/company-website/index.html) — Nav / Hero / Features / Pricing / Footer（营销风组合，与 UNS 长页可对照 token）。

> **注意：** 现有 UI Kit 偏定价营销；新建 UNS 长页时请优先遵循本 surface + [`spec.company-website.tokens.md`](../../sources/spec.company-website.tokens.md)。

## 完整规范

- 叙事与版式：[`sources/spec.company-website.editorial.md`](../../sources/spec.company-website.editorial.md)  
- Token / 组件 CSS：[`sources/spec.company-website.tokens.md`](../../sources/spec.company-website.tokens.md)
