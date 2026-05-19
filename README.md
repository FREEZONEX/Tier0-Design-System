# Tier0 Design System（多场景版）

**Tier0** 是 FREEZONEX 面向工业 IoT 的开源 Unified Namespace (UNS) 平台。本仓库为 **多表面（multi-surface）设计系统**：共享品牌基础，并按场景拆分规范、Token 与 UI Kit。

---

## 场景选择器

| 我要做… | 阅读 | Token | UI Kit | 预览 |
|--------|------|-------|--------|------|
| **产品后台**（Namespace、表格、表单、侧栏） | [`surfaces/tier0-product/`](surfaces/tier0-product/) | [`tokens/product.css`](tokens/product.css) | [`ui_kits/tier0-product/`](ui_kits/tier0-product/) | [`preview/tier0-product/`](preview/tier0-product/) |
| **公司官网**（长文产品页、UNS 叙事、定价风） | [`surfaces/company-website/`](surfaces/company-website/) | [`tokens/website.css`](tokens/website.css) | [`ui_kits/company-website/`](ui_kits/company-website/) | [`preview/company-website/`](preview/company-website/) |
| **PPT / 市场材料**（Masterdeck、路演） | [`surfaces/marketing-deck/`](surfaces/marketing-deck/) | [`tokens/deck.css`](tokens/deck.css) | `ui_kits/marketing-deck/` | [`preview/marketing-deck/`](preview/marketing-deck/) |

**Agent 入口：** [`SKILL.md`](SKILL.md) — 先识别场景，再读对应 `surfaces/*`。

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

## 向 AI 写 Prompt：按角色速查

与 Cursor / Agent 对话时，**先说明你的角色、场景（surface）、交付格式**，再写具体任务。下面例句可直接复制后改括号内容。

### 1. 开发（产品 UI / 前端实现）

**先声明：** 场景 = `tier0-product`（后台工作台），不是官网也不是 PPT。

**推荐结构：** 场景 + 技术栈 + 页面/组件 + 约束 + 参考路径

**例句 A — 新页面**

```
@tier0-design
场景：tier0-product（产品后台 UI）
技术栈：React + 现有 packages/theme
任务：实现 Namespace 列表页 — 左侧筛选、主表格、空状态
约束：遵守 surfaces/tier0-product/README.md 与 tokens/product.css；无 emoji；主按钮近黑+绿色高亮态，不用饱和 #B2ED1D 满铺
参考：ui_kits/tier0-product/ 里现有表格与侧栏模式
交付：可运行的组件代码 + 简要说明改了哪些文件
```

**例句 B — 改组件 / 对齐设计**

```
@tier0-design
场景：tier0-product
任务：把 Broker 状态卡片改成与设计系统一致 — 4px 圆角、FX Green 仅作描边/标签，不要营销风大 Hero
必读：foundations/brand.md、surfaces/tier0-product/README.md
交付：diff 级修改，不要重构无关模块
```

**例句 C — 官网长页（若做 tier0.app 叙事页）**

```
@tier0-design
场景：company-website（官网 UNS 长文编辑页，不是产品后台）
任务：新增「Topology」章节区块 — Poppins 标题 + IBM Plex Sans 正文 + 线框示意图面板
必读：surfaces/company-website/README.md、sources/spec.company-website.editorial.md
禁止：套用 tier0-product 侧栏密度或 PPT 的 #1D77FE 品牌蓝
```

---

### 2. 销售（演示稿 / 市场材料）

**先声明：** 场景 = `marketing-deck`；**成稿（Markdown / HTML）输出到业务项目目录**，不要写进本设计系统仓库。

**推荐结构：** 场景 + 客户/会议 + 时长页数 + 必含模块 + 语言 + 禁止项

**例句 A — 首次客户交流（完整 deck）**

```
@tier0-design
设计表面：marketing-deck（PPT / 市场材料）
禁止套用：tier0-product、company-website 的字体与布局

客户：汽车零部件厂 OT/IT 负责人
会议目标：建立 Tier0/UNS 认知，约二次技术会
时长：20 分钟，约 12–15 页，英文为主

必含：封面、行业痛点、Tier0/UNS 是什么、Source Flow→Namespace→Event Flow、
      与传统集成对比、示意场景、下一步 PoC/深潜、封底 + Tier0 版权
不要：报价、合同、未公开客户名

必读（按顺序）：
surfaces/marketing-deck/README.md
surfaces/marketing-deck/slide-templates.md
sources/spec.marketing-deck.ppt.md
tokens/deck.css

交付：
A) 业务项目 <项目名>/ 下 Markdown 逐页表 + 演讲者备注
B) 同目录 HTML 预览（引用本仓库 tokens/deck.css，图 inline SVG）
C) 对照 surfaces/marketing-deck/checklist.md 自检
```

**例句 B — 只改几页 / 换行业话术**

```
@tier0-design
场景：marketing-deck
基于：<现有稿路径>/ 现有 HTML 或 Markdown
任务：只改第 4、10 页 — 受众改为「电池 PACK 产线 OT 负责人」，痛点换成储能行业用语
约束：深/浅页交替、白底标题用 IBM Plex Sans Medium（禁止 Poppins）
输出：只更新业务项目目录下 md + html，不改本设计系统仓库
```

**例句 C — 导出前检查**

```
对照 surfaces/marketing-deck/checklist.md，
检查 <你的演示稿.html 路径>
列出未满足项和需销售手工替换的占位（联系人、案例、GitHub 链接）
```

---

### 3. 设计（规范 / Figma / 视觉稿）

**先声明：** 要改的是哪条 surface，以及是「更新设计系统文档」还是「出视觉稿/组件」。

**推荐结构：** 场景 + 交付类型 + 依据（Figma/母版）+ 不要影响其他 surface

**例句 A — 扩展 PPT 母版组件**

```
@tier0-design
场景：marketing-deck
任务：按 sources/spec.marketing-deck.ppt.md 新增「类型 D 时间轴」版式说明 —
      accent1 轴线 + #1D77FE 透明度阶，更新 slide-templates.md
不要：改 tier0-product 的按钮色或官网 Poppins 规则
交付：只改 surfaces/marketing-deck/ 与 sources/spec.marketing-deck.ppt.md
```

**例句 B — 产品 UI 新组件规范**

```
@tier0-design
场景：tier0-product
任务：为「拓扑图缩略图」写组件规范 — 尺寸、边框、空状态、与 Namespace 页对齐
参考：Figma Tier0 设计素材（若有 node-id 一并给出）
交付：surfaces/tier0-product/ 下文档片段 + tokens/product.css 如需新 token 再提案
```

**例句 C — 官网长页新 section**

```
@tier0-design
场景：company-website
任务：设计「Event Flow」长文 section 线框 — 编辑风留白、mono eyebrow、浅绿示意图
必读：sources/spec.company-website.editorial.md
禁止：PPT 的 Tektur 章节字、产品后台表格密度
交付：Markdown 结构说明 + 可选 preview HTML 放进 preview/
```

**例句 D — 设计系统与代码对齐审查**

```
@tier0-design
任务：对比 surfaces/tier0-product/README.md 与 ui_kits/tier0-product/
列出 token/圆角/字重不一致项，建议只改文档或只改 kit 其一并说明原因
```

---

## Prompt 共通要点（三角色都适用）

1. **写清 surface：** `tier0-product` | `company-website` | `marketing-deck` 三选一（或明确「全场景品牌」只读 `foundations/`）。
2. **写清交付物路径：** 产品代码与幻灯片成稿进业务仓库；规范与 Token 在本设计系统仓库内维护。
3. **写清禁止项：** 例如销售稿不要报价；产品 UI 不要 emoji；PPT 白底标题不要用 Poppins。
4. **@tier0-design** 或指明阅读 `SKILL.md`，便于 Agent 自动路由必读文件。

---

## 本地预览

在本仓库根目录启动 HTTP 服务后，用浏览器查看 `preview/` 下的组件卡。两种方式共用 **8899 端口**，只需起一个服务。

### 方式 A — 经典单页（改门户之前）

```bash
cd "<本仓库根目录>"
python3 -m http.server 8899
```

浏览器打开组件索引：**http://localhost:8899/preview/classic.html**

或直接打开某一个 HTML，例如：

`http://localhost:8899/preview/marketing-deck/footer-copyright.html`

### 方式 B — 维护门户（推荐，含全仓库目录树）

```bash
cd "<本仓库根目录>"
./scripts/serve-preview.sh
```

浏览器打开：**http://localhost:8899/preview/**

新增/移动文件后运行 `python3 scripts/build-preview-manifest.py` 更新索引（`classic.html` 与门户会一并更新）。

详见 [`preview/README.md`](preview/README.md) — `_shared/` 原子 token；`tier0-product/`、`company-website/`、`marketing-deck/` 场景组件卡。

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
| `spec.marketing-deck.ppt.md` | PPT / Masterdeck |

内容已提炼进 `foundations/` 与 `surfaces/*`；细节以 `sources/` 为准时可全文查阅。
