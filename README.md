# Tier0 Design System（多场景版）

**Tier0** 是 FREEZONEX 面向工业 IoT 的开源 Unified Namespace (UNS) 平台。本仓库为 **多表面（multi-surface）设计系统**：共享品牌基础，并按场景拆分规范、Token 与 UI Kit。

---

## 场景选择器

| 我要做… | 阅读 | Token | UI Kit | 预览 |
|--------|------|-------|--------|------|
| **产品后台**（Namespace、表格、表单、侧栏） | [`surfaces/tier0-product/`](surfaces/tier0-product/) | [`tokens/product.css`](tokens/product.css) | [`ui_kits/tier0-product/`](ui_kits/tier0-product/) | [`preview/tier0-product/`](preview/tier0-product/) |
| **公司官网**（长文产品页、UNS 叙事、定价风） | [`surfaces/company-website/`](surfaces/company-website/) | [`tokens/website.css`](tokens/website.css) | [`ui_kits/company-website/`](ui_kits/company-website/) | [`preview/company-website/`](preview/company-website/) |
| **PPT / 市场材料**（Masterdeck、路演） | [`surfaces/marketing-deck/`](surfaces/marketing-deck/) | [`tokens/deck.css`](tokens/deck.css) | `ui_kits/marketing-deck/` | [`preview/marketing-deck/`](preview/marketing-deck/) · 成稿 [`decks/`](../decks/) |

**Agent 入口：** [`SKILL.md`](SKILL.md) — 先识别场景，再读对应 `surfaces/*`。

**向 AI 写需求（开发 / 销售 / 设计 prompt 例句）：** 见仓库根 [`README.md`](../README.md)。

---

## 目录结构

```
├── README.md                 # 本文件（总索引）
├── SKILL.md                  # Agent 场景路由
├── foundations/              # 全场景共享：品牌、术语、Logo、通用禁忌
├── tokens/
│   ├── core.css              # 共享色板与 primitive 类
│   ├── product.css           # 产品 UI 覆盖
│   ├── website.css           # 官网编辑风覆盖
│   └── deck.css              # PPT 主题色覆盖
├── surfaces/                 # 分场景规范（主文档）
│   ├── tier0-product/
│   ├── company-website/
│   └── marketing-deck/
├── sources/                  # 你提供的历史规范原文（归档）
├── assets/                   # Logo
├── preview/                  # 见 preview/README.md
│   ├── _shared/              # 原子 token 卡
│   ├── tier0-product/        # 产品组件卡
│   ├── company-website/      # 官网组件卡
│   └── marketing-deck/       # 幻灯片组件卡（16:9）
├── ui_kits/                  # 可打开的 HTML/JSX 参考实现
└── fonts/                    # 本地 IBM Plex Mono（如有）
```

---

## 三场景差异（速查）

| 维度 | 产品 UI | 公司官网 | PPT / 市场材料 |
|------|---------|----------|----------------|
| **气质** | 高密度工作台 | 长文编辑、图示叙事 | 深色章节 + 白底内容交替 |
| **主字体** | IBM Plex Sans | Poppins 标题 + Plex 正文 | Poppins 封面 / Tektur 章节 / Plex 正文 |
| **主强调色** | FX Green 高亮态（克制） | `#A7CF3A` 标题挑词 | `#B2ED1D` accent1 |
| **主 CTA** | 近黑主按钮 + 绿色高亮 | 轻量、非营销 Hero | 主题色按钮少，结构线为主 |
| **圆角** | 4px 默认 | 4px 面板 | 4px 卡片 |
| **密度** | 高 | 中（留白呼吸） | 低（每页一观点） |
| **蓝色** | 不用作品牌主色 | 极少 | **`#1D77FE` 品牌蓝**（PPT 专用） |

---

## 外部事实来源

| 来源 | 链接 |
|------|------|
| Figma — Tier0 设计素材 | https://www.figma.com/design/msabW3Xudtn6cCtdsxE7g2/Tier0-%E8%AE%BE%E8%AE%A1%E7%B4%A0%E6%9D%90 |
| 产品站 | https://tier0.app/ |
| GitHub | https://github.com/FREEZONEX/Tier0-Edge |
| 文档 | https://tier0edge.vercel.app/ |

**冲突时优先级：** Figma / 线上产品 > `sources/` 归档 > 本仓库叙述。

---

## 规范原文（`sources/`）

命名：`spec.<场景>.<子类型>.md` — 与三表面一一对应，详见 [`sources/README.md`](sources/README.md)。

| 文件 | 场景 |
|------|------|
| `spec.product-ui.md` | 产品界面 UI（`Downloads/DESIGN.md`） |
| `spec.company-website.editorial.md` | 官网长页叙事与版式 |
| `spec.company-website.tokens.md` | 官网 Token + 组件 CSS |
| `spec.marketing-deck.ppt.md` | PPT / Masterdeck |

内容已提炼进 `foundations/` 与 `surfaces/*`；细节以 `sources/` 为准时可全文查阅。
