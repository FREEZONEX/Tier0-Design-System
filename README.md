# Tier0 Design System（多场景版）

**Tier0** 是 FREEZONEX 面向工业 IoT 的开源 Unified Namespace (UNS) 平台。本仓库为 **多表面（multi-surface）设计系统**：共享品牌基础，并按场景拆分规范、Token 与 UI Kit。

---

## 场景选择器

| 我要做… | 阅读 | Token | UI Kit | 预览 |
|--------|------|-------|--------|------|
| **产品后台**（Namespace、表格、表单、侧栏） | [`surfaces/tier0-product/`](surfaces/tier0-product/) | [`tokens/product.css`](tokens/product.css) | [`ui_kits/tier0-product/`](ui_kits/tier0-product/) | [`preview/tier0-product/`](preview/tier0-product/) |
| **公司官网**（长文产品页、UNS 叙事、定价风） | [`surfaces/company-website/`](surfaces/company-website/) | [`tokens/website.css`](tokens/website.css) | [`ui_kits/company-website/`](ui_kits/company-website/) | [`preview/company-website/`](preview/company-website/) |
| **PPT 规范**（Masterdeck、路演视觉） | [`surfaces/ppt/`](surfaces/ppt/) | [`tokens/deck.css`](tokens/deck.css) | `ui_kits/ppt/` | [`preview/ppt/`](preview/ppt/) |
| **做一份销售 Deck**（HTML + 可编辑 PPTX） | [`skills/tier0-slide-skill/`](skills/tier0-slide-skill/) | 同上（VI 锁） | skill 内 Gallery | 见 skill README 三步上手 |

**怎么选：** 只查颜色/字体/组件 → `surfaces/ppt/`；要从素材生成演示稿 → [`skills/tier0-slide-skill/README.md`](skills/tier0-slide-skill/README.md)。  
**Agent 入口：** [`SKILL.md`](SKILL.md)。Skill 注册表：[`skills/README.md`](skills/README.md)。

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
│   └── ppt/
├── sources/                  # 你提供的历史规范原文（归档）
├── references/               # Agent 深度参考（ppt：workflow / layouts / components / checklist…）
│   ├── README.md
│   └── ppt-*.md
├── skills/                   # 可独立触发的 Agent Skills（注册表见 skills/README.md）
│   └── tier0-slide-skill/    # 销售/售前 deck：intake → Gallery → HTML + 可编辑 PPTX
├── assets/                   # Logo · 封面 SVG · 官网 QR
├── preview/                  # 见 preview/README.md
│   ├── _shared/              # 原子 token 卡
│   ├── tier0-product/        # 产品组件卡
│   ├── company-website/      # 官网组件卡
│   └── ppt/                  # 幻灯片组件卡（16:9）
├── ui_kits/                  # 可打开的 HTML/JSX 参考实现
├── fonts/                    # 本地字体：Poppins、IBM Plex Sans/SC、Mono、Tektur
└── .cursor/skills/           # Cursor 发现用软链 → ../../skills/<name>
```

---

## 三场景差异（速查）

| 维度 | 产品 UI | 公司官网 | PPT |
|------|---------|----------|----------------|
| **气质** | 高密度工作台 | 长文编辑、图示叙事 | 深色章节 + 白底内容交替 |
| **主字体** | IBM Plex Sans | Poppins 标题 + Plex 正文 | Tektur 封面·章节 / Plex/SC 正文 |
| **主强调色** | FX Green 高亮态（克制） | `#A7CF3A` 标题挑词 | `#B2ED1D` accent1 |
| **主 CTA** | 近黑主按钮 + 绿色高亮 | 轻量、非营销 Hero | 主题色按钮少，结构线为主 |
| **圆角** | 4px 默认 | 4px 面板 | 4px 卡片 |
| **密度** | 高 | 中（留白呼吸） | 低（每页一观点） |
| **蓝色** | 不用作品牌主色 | 极少 | **`#1D77FE` 品牌蓝**（PPT 专用） |

---

## 向 AI 写 Prompt

只需 `@tier0-design` 然后用自然语言描述，AI 会根据关键词自动路由到对应场景：

| 你提到… | 路由到 |
|---------|--------|
| 产品后台、工作台、Namespace、表格、侧栏… | `tier0-product` |
| 官网、产品页、落地页、叙事… | `company-website` |
| PPT 规范、Masterdeck 组件… | `surfaces/ppt` |
| 生成 / 改一份 HTML+PPTX 演示稿… | `skills/tier0-slide-skill` |

说不清楚时直接描述需求，AI 会先问你确认场景。

```
@tier0-design 帮我做产品后台的 Namespace 列表页，左侧筛选 + 主表格 + 空状态
```

```
@tier0-design 官网加一个 Topology 章节区块，叙事风格，参考现有页面的留白感
```

```
用 tier0-slide-skill 做一份给汽车零部件厂 OT 负责人的 PPT，约 8 页英文，讲 Tier0/UNS 和下一步 PoC，要 HTML + 可编辑 PPTX
```

```
@tier0-design 帮我检查一下这份演示稿，对照 checklist 看哪里不符合规范
```

---

## 公开站（GitHub Pages）

对外说明与效果预览（intake 视觉风格）：

**https://freezonex.github.io/Tier0-Design-System/**

| 路径 | 内容 |
|------|------|
| `/` | Design System 首页（三场景 + Skill） |
| `/slide-skill/` | Skill 功能、用法、Gallery、Demo、SKILL.md |
| `/tokens/` | 色板与绿的用法 |

本地预览公开站：

```bash
node scripts/build-public-site.mjs
python3 -m http.server 8898 --directory docs
# http://127.0.0.1:8898/
```

更新 Gallery / Demo 快照后重新 build 再提交 `docs/`。

## 本地维护门户

在本仓库根目录启动维护门户（**8899**，仅本机）：

```bash
cd "<本仓库根目录>"
./scripts/serve-preview.sh
```

浏览器打开：**http://localhost:8899/preview/**

也可直接打开某一个组件卡，例如：

`http://localhost:8899/preview/ppt/footer-copyright.html`

新增/移动文件后运行 `python3 scripts/build-preview-manifest.py` 更新索引。

详见 [`preview/README.md`](preview/README.md) — `_shared/` 原子 token；`tier0-product/`、`company-website/`、`ppt/` 场景组件卡。
---

## 外部事实来源

| 来源 | 链接 |
|------|------|
| Figma — Tier0 设计素材 | https://www.figma.com/design/msabW3Xudtn6cCtdsxE7g2/Tier0-%E8%AE%BE%E8%AE%A1%E7%B4%A0%E6%9D%90 |
| 产品站 | https://tier0.app/ |
| GitHub | https://github.com/FREEZONEX/Tier0-Edge |
| 文档 — Cloud | https://clouddoc.tier0.dev/ |
| 文档 — Enterprise | https://enterprisedoc.tier0.dev/ |
| 文档 — Edge | https://edgedoc.tier0.dev/ |

**冲突时优先级：** Figma / 线上产品 > `sources/` 归档 > 本仓库叙述。

---

## 规范原文（`sources/`）

命名：`spec.<场景>.<子类型>.md` — 与三表面一一对应，详见 [`sources/README.md`](sources/README.md)。

| 文件 | 场景 |
|------|------|
| `spec.product-ui.md` | 产品界面 UI（`Downloads/DESIGN.md`） |
| `spec.company-website.editorial.md` | 官网长页叙事与版式 |
| `spec.company-website.tokens.md` | 官网 Token + 组件 CSS |
| `spec.ppt.md` | PPT / Masterdeck |

内容已提炼进 `foundations/` 与 `surfaces/*`；细节以 `sources/` 为准时可全文查阅。
