# Tier0 Design System（多场景版）

**Tier0** 是 FREEZONEX 面向工业 IoT 的开源 Unified Namespace (UNS) 平台。本仓库为 **多表面（multi-surface）设计系统**：共享品牌基础，并按场景拆分规范、Token 与 UI Kit。

---

## 场景选择器

| 我要做… | Skill | 真源 | Token / 预览 |
|--------|-------|------|----------------|
| **产品原型**（后台、UNS、表格表单） | [`skills/tier0-product`](skills/tier0-product/SKILL.md) | [Tier0-Frontend](https://github.com/FREEZONEX/Tier0-Frontend) · [Figma UI](https://www.figma.com/design/jmqCj0T7EoMnC4FNsAHfbl/Tier0-UI-Design?node-id=14311-69336) | [`tokens/product.css`](tokens/product.css) · [`preview/tier0-product/`](preview/tier0-product/) |
| **网页原型**（官网长页、营销站） | [`skills/tier0-website`](skills/tier0-website/SKILL.md) | [tier0.app](https://tier0.app/)（+ 你提供的参考） | [`tokens/website.css`](tokens/website.css) · [`preview/company-website/`](preview/company-website/) |
| **Framer 页面交付**（嵌入官网的代码组件） | [`skills/tier0-framer-page`](skills/tier0-framer-page/SKILL.md) | [tier0.app](https://tier0.app/) + 评审定稿细则 | [`template/`](skills/tier0-framer-page/template/README.md)（build + verify） |
| **PPT 规范** | [`skills/tier0-ppt`](skills/tier0-ppt/SKILL.md) | Masterdeck / `deck.css` | [`tokens/deck.css`](tokens/deck.css) · [`preview/ppt/`](preview/ppt/) |
| **PPT 生成**（HTML + 可编辑 PPTX） | [`skills/tier0-slide-skill`](skills/tier0-slide-skill/) | slide-skill + deck VI | Gallery 见 skill README |
| **单页 / 海报 / 物料** | [`skills/tier0-print`](skills/tier0-print/SKILL.md) | [`DESIGN.md`](DESIGN.md) + foundations（+ 外部 craft skill） | [`tokens/core.css`](tokens/core.css) · `assets/` |

**共享：** Logo / 字体 / 颜色 → [`foundations/`](foundations/) · [`assets/`](assets/) · [`tokens/core.css`](tokens/core.css)。  
**Agent 入口：** [`SKILL.md`](SKILL.md)（root）· [`skills/README.md`](skills/README.md) · [`references/execution-contract.md`](references/execution-contract.md)。  
**公共站：** [freezonex.github.io/Tier0-Design-System](https://freezonex.github.io/Tier0-Design-System/)

---

## 目录结构

```
├── README.md                 # 本文件（总索引）
├── SKILL.md                  # Agent root router（选最小 skill 集）
├── DESIGN.md                 # Agent 设计权威（Vercel design.md 格式，按需读）
├── foundations/              # 全场景共享细则：品牌、术语、Logo、通用禁忌
├── tokens/
│   ├── core.css              # 共享色板与 primitive 类
│   ├── product.css           # 产品 UI 覆盖
│   ├── website.css           # 官网编辑风覆盖
│   └── deck.css              # PPT 主题色覆盖
├── surfaces/                 # 分场景规范（人读 + skill 下钻）
│   ├── tier0-product/
│   ├── company-website/
│   └── ppt/
├── skills/                   # 场景 skill：product / website / ppt / print / slide
│   ├── README.md             # 注册表
│   ├── tier0-product/
│   ├── tier0-website/
│   ├── tier0-framer-page/    # 官网页面 → Framer 代码组件
│   ├── tier0-ppt/
│   ├── tier0-print/
│   ├── tier0-slide-skill/
│   └── scripts/tier0-skills.mjs
├── sources/                  # 历史规范归档（默认不读）
├── references/               # 按需：execution-contract · ppt-*
│   ├── execution-contract.md
│   ├── README.md
│   └── ppt-*.md
├── assets/                   # Logo · 封面 SVG · 官网 QR
├── preview/                  # 组件预览卡
│   ├── _shared/
│   ├── tier0-product/
│   ├── company-website/
│   └── ppt/
├── ui_kits/                  # 组合稿：product / company-website / ppt
├── fonts/
└── .cursor/skills/           # 软链 → skills/*
```

---

## 三场景差异（速查）

| 维度 | 产品 UI | 公司官网 | PPT |
|------|---------|----------|----------------|
| **气质** | 高密度工作台 | 长文编辑、图示叙事 | 深色章节 + 白底内容交替 |
| **主字体** | IBM Plex Sans | IBM Plex Sans（标题 500）+ Mono 标签 | Tektur 封面·章节 / Plex/SC 正文 |
| **主强调色** | FX Green 高亮态（克制） | `#B2ED1D` CTA 面 · `#73B200` 白底字 | `#B2ED1D` accent1 |
| **主 CTA** | 近黑主按钮 + 绿色高亮 | 亮绿底近墨字（对齐 tier0.app） | 主题色按钮少，结构线为主 |
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

白底黑字的快速上手展示站：ASCII 铺底、三场景入口、Token 速查（对齐产品规范站气质，不是 marketing 落地页）。

**https://freezonex.github.io/Tier0-Design-System/site/**

仓库内目录为 `site/`（不再使用 `docs/` 作为公开站目录）。在当前 Pages「从仓库根发布」配置下，公网入口即 `/site/`。

若改用 GitHub Actions 发布：根地址会自动跳转到 `/site/`；正式浏览请用上面的 `/site/` 链接。

| 路径 | 内容 |
|------|------|
| `/site/` | 产品展示首页（Hero + 三场景） |
| `/site/slide-skill/` | Skill 总览、Guide、Gallery、Demo、SKILL.md |
| `/site/tokens/` | 色板与绿的用法 |
| `/site/surfaces/*` | Website / Product 规范导航 |

本地预览公开站：

```bash
node scripts/build-public-site.mjs
python3 -m http.server 8898 --directory site
# http://127.0.0.1:8898/
```

更新 Gallery / Demo 快照后重新 build 再提交 `site/`。

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
