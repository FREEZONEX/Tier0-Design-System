# Tier0 Slide Skill

一句话：把文档 / PPTX / 截图整理成 **符合 Tier0 品牌的销售演示稿**，可同时交付 **HTML（现场演示）** 和 **可编辑 PPTX（转发改字）**。逐页先判**第一性原理**（核心目的/观点），再做疏密合理的布局（发丝分割、表格图表、关键数值突出）。

## 一键安装（Cursor / Codex）

本机已有 Git、Node.js 18+ 时，终端粘贴一行即可：

```bash
curl -fsSL https://raw.githubusercontent.com/FREEZONEX/Tier0-Design-System/main/skills/tier0-slide-skill/scripts/install-skill.sh | bash
```

脚本会：

1. 把 skill 装到 `~/.tier0/Tier0-Design-System/skills/tier0-slide-skill`
2. 安装 npm 依赖
3. 软链到 `~/.cursor/skills/`、`~/.codex/skills/`（以及已有的 `~/.claude/skills/`、`~/.agents/skills/`）

装完后**新开** Cursor / Codex 对话，直接说：

```text
@tier0-slide-skill 帮我打开 PPT 交付表单（intake）入口，我要先填交付格式和素材再生成稿。
```

已在本仓库开发者：仓库内已有 `.cursor/skills/tier0-slide-skill` 软链，只需 `cd skills/tier0-slide-skill && npm install`。

```text
输入  →  确认页锁定交付与素材
      →  每页 purpose / coreClaim / heroElement
      →  deck.json 单一内容源
输出  →  ppt/index.html  +  ppt/deck.pptx
品牌  →  IBM Plex · 白底 · 品牌绿 #B2ED1D（少量点缀）
布局  →  references/layout-first-principles-tier0.md
```

---

## 什么时候用

| 场景 | 用不用 |
|------|--------|
| 客户拜访 / 售前 / 产品介绍 PPT | ✅ |
| 把现有 PPTX 改成 Tier0 风格 | ✅ |
| 根据 DOCX / 截图 / 架构图补全 deck | ✅ |
| 产品后台 UI、交互稿、组件设计、官网落地页 | ❌ 不在本 skill 范围 |

本 skill **只做销售 / 售前演示稿**，不做产品设计（界面、交互、组件、设计系统实现）。

对 Cursor / Codex Agent 直接说：

```text
用 tier0-slide-skill 做一份 Tier0 产品介绍 PPT：8 页，突出 UNS 和 Builder，要 HTML + 可编辑 PPTX。
```

---

## 三步上手

在设计系统仓库根目录执行（把 `客户名称` 换成你的项目名）：

### 1. 装依赖（每个机器一次）

优先用上面的**一键安装**；若已在本仓库内：

```bash
cd skills/tier0-slide-skill && npm install && cd ../..
```

### 2. 开确认页（先别生成）

```bash
node skills/tier0-slide-skill/scripts/start-tier0-intake.mjs --project projects/客户名称
```

浏览器会打开本地门户。填完后得到：

```text
projects/客户名称/intake/request.json
```

校验：

```bash
node skills/tier0-slide-skill/scripts/validate-tier0-intake.mjs projects/客户名称/intake/request.json
```

### 3. 生成双格式

Agent 会根据 intake + 素材写出 `deck.json`，然后构建：

```bash
node skills/tier0-slide-skill/scripts/validate-tier0-dual.mjs projects/客户名称/deck.json

node skills/tier0-slide-skill/scripts/build-tier0-dual.mjs \
  --source projects/客户名称/deck.json \
  --html   projects/客户名称/ppt/index.html \
  --pptx   projects/客户名称/ppt/deck.pptx

node skills/tier0-slide-skill/scripts/validate-tier0-pptx.mjs projects/客户名称/ppt/deck.pptx
```

预览 HTML：

```bash
python3 -m http.server 5181 --bind 127.0.0.1 --directory projects/客户名称/ppt
# 打开 http://127.0.0.1:5181/index.html
```

---

## 产出是什么

| 文件 | 用途 |
|------|------|
| `ppt/index.html` | 现场演示、分享链接、动效 / Demo |
| `ppt/deck.pptx` | 邮件附件、客户改字、销售微调 |
| `deck.json` | 唯一内容源；改文案只改这一份再重建 |
| `intake/request.json` | 交付格式、封面信息、素材边界的锁定记录 |

**不要**先写自由 HTML，再手工维护第二套 PPTX。要 PPTX 时，从第一步就走 `deck.json`。

---

## 版式从哪来

先打开 Layout Gallery，别自己发明卡片：

1. 浏览器打开 [`layout-gallery/index.html`](layout-gallery/index.html)
2. 找内容形态最接近的页；按 `R` 看用途、规则与反例
3. 需要程序化选型时读 [`layout-gallery/layout-catalog.json`](layout-gallery/layout-catalog.json)

详细规则：[`references/layout-gallery-tier0.md`](references/layout-gallery-tier0.md)  
**视觉保真硬门槛：** [`references/gallery-fidelity-tier0.md`](references/gallery-fidelity-tier0.md)  
**构图返工细则：** [`references/composition-craft-tier0.md`](references/composition-craft-tier0.md)（语言单一 · 双栏平衡 · 角标占位 · 中文行距）

### 默认封面

白底左侧 Logo / 标题 / 演讲者，右侧亮绿 **ASCII 呼吸点阵**（HTML 动态；PPTX 为可编辑静态帧）。  
深墨章节转场用 Gallery S10：纯深墨 + 超大标题 + 底部发丝线，不要硬网格；**中文标题行高约 1.14**。

### 配图怎么统一

| 你要… | 做法 |
|------|------|
| 决定这页要不要图、放哪 | [`references/illustration-slots-tier0.md`](references/illustration-slots-tier0.md) |
| 写插画 / 截图提示词 | [`references/image-prompts-tier0.md`](references/image-prompts-tier0.md) |
| 校验风格锁 | `node scripts/validate-tier0-illustrations.mjs 项目/deck.json` |

概念插画统一用触发词 **`tier0_illustration_style`**。证明产品时只用用户提供的真实截图 / 录屏，**禁止生成产品 UI mockup 或设计稿**；简单架构关系优先原生可编辑图形；复杂 / 需校验的拓扑用 vendored **Archify**（方法跟上游，视觉锁 Tier0），见 [`references/archify-tier0.md`](references/archify-tier0.md)。

**Tektur：** 仅深墨分隔页全大写标题；其它文字用 IBM Plex。

```json
"imageRole": "illustration",
"imageSlot": "feature-split-right",
"image": "images/05-feature-split-uns-hub.png",
"imageAlt": "…",
"imageFit": "cover",
"imagePrompt": "tier0_illustration_style, …"
```

---

## 常见问题

**可以换强调色吗？**  
不能。只允许品牌绿 `#B2ED1D`，且少量使用。

**HTML 和 PPTX 会不会对不上？**  
不会——同一份 `deck.json` 生成两边。PPTX 会把动效降级为静态对象，文字仍可编辑。

**确认页打不开怎么办？**  
用聊天按 `references/intake-gate-tier0.md` 填表，仍写入同结构的 `intake/request.json`。

**和仓库里 `surfaces/ppt/` 什么关系？**  
`surfaces/ppt/` = 设计规范；本 skill = 执行层（intake → 生成）。颜色/字体冲突时听 `tokens/deck.css` 与 `references/ppt-checklist.md`。

---

## 目录速查

```text
skills/tier0-slide-skill/
├── SKILL.md                 # Agent 完整工作流
├── README.md                # 本文件（人读）
├── assets/                  # 模板、品牌 Logo、示例 deck.json
├── layout-gallery/          # 版式画廊
├── references/              # 细则（双格式、动效、Archify×Tier0…）
├── vendor/archify/          # 上游架构图 skill（MIT）+ Tier0 主题
└── scripts/                 # intake / build / validate / theme
```

更深规则请读 [`SKILL.md`](SKILL.md)；双格式 schema 见 [`references/dual-output-tier0.md`](references/dual-output-tier0.md)。

---

## 公开展示站

效果预览（产品展示页，非 intake）：

- 线上：https://freezonex.github.io/Tier0-Design-System/site/slide-skill/
- 本地：`python3 -m http.server 8898 --directory site` → http://127.0.0.1:8898/slide-skill/
