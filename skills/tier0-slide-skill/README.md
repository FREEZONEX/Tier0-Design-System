# Tier0 Slide Skill

一句话：把文档 / PPTX / 截图整理成 **符合 Tier0 品牌的销售演示稿**，可同时交付 **HTML（现场演示）** 和 **可编辑 PPTX（转发改字）**。

```text
输入  →  确认页锁定交付与素材
      →  deck.json 单一内容源
输出  →  ppt/index.html  +  ppt/deck.pptx
品牌  →  IBM Plex · 白底 · 品牌绿 #B2ED1D（少量点缀）
```

---

## 什么时候用

| 场景 | 用不用 |
|------|--------|
| 客户拜访 / 售前 / 产品 Demo | ✅ |
| 把现有 PPTX 改成 Tier0 风格 | ✅ |
| 根据 DOCX / 截图 / 架构图补全 deck | ✅ |
| 只改产品后台 UI 或官网落地页 | ❌ 走根目录 `SKILL.md` 对应场景 |

对 Cursor Agent 直接说：

```text
用 tier0-slide-skill 做一份 Tier0 产品介绍 PPT：8 页，突出 UNS 和 Builder，要 HTML + 可编辑 PPTX。
```

---

## 三步上手

在设计系统仓库根目录执行（把 `客户名称` 换成你的项目名）：

### 1. 装依赖（每个机器一次）

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

### 默认封面

白底左侧 Logo / 标题 / 演讲者，右侧亮绿 **ASCII 呼吸点阵**（HTML 动态；PPTX 为可编辑静态帧）。  
深墨章节转场用 Gallery S10：纯深墨 + 超大标题 + 底部发丝线，不要硬网格。

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
├── references/              # 细则（双格式、动效、校验…）
└── scripts/                 # intake / build / validate
```

更深规则请读 [`SKILL.md`](SKILL.md)；双格式 schema 见 [`references/dual-output-tier0.md`](references/dual-output-tier0.md)。
