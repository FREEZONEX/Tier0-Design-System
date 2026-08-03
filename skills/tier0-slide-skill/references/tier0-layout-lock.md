# Tier0 Layout Lock

本文件是 **Tier0 Slide Skill** 的硬约束：**登记每一页允许使用的版式 ID**，防止生成时脱离模板自由拼页。

```text
tier0-layout-lock.md  →  能用哪 23 种页型（门禁 + 登记表）
layouts-tier0.md      →  每种页型 HTML 骨架与示例（排版细节）
```

完整 skeleton / 示例代码见 `layouts-tier0.md`（P1–P23 与 S01–S23 一一对应）。

---

## P0 规则

1. 正文页只能使用下方登记的 **S01–S23**。
2. 默认封面 / 封底使用 **`TIER0-COVER-EDITORIAL`** / **`TIER0-CLOSING-V4-DARK`**。`TIER0-COVER-V4-DARK` 仅在用户明确要求深色封面时使用；`TIER0-CLOSING-SPLIT` 可用于传统 HTML 模式（不占用 S01/S10 正文位，但 S01/S10 骨架仍可参考）。
3. 每页 `<section class="slide" data-layout="Sxx">`（或封面/封底 ID）**必填**。
4. 不发明 P23/P24 实验结构（除非 `--allow-experimental`）。
5. 字体：大标题 IBM Plex Sans **400**；`[Keyword]` **500**。
6. 品牌绿 `#B2ED1D` 少量点缀；禁止 `#002FA7` 等非品牌色作主色。
7. 生成后运行 `node scripts/validate-tier0-deck.mjs`；对照 `checklist-tier0.md`。

---

## 登记版式 S01–S23（完整）

| ID | 原始页 | 名称 | 必须保留的骨架 | 图片规则 | Tier0 备注 |
|---|---:|---|---|---|---|
| S01 | 01 | Index Cover | `.index-cover` + `button.cover-row`（左编号右标题，可双列紧凑） | 无 | **正式封面改用** `TIER0-COVER-EDITORIAL`；`data-goto` 跳转章节 |
| S02 | 02 | Vertical Timeline + KPI | 顶部左对齐标题，`.timeline-v`，底部 `.kpi-row-4` | 无 | 时间轴 dot + 黑字；active 节点可用品牌绿 |
| S03 | 03 | Split Statement | `.slide.split` 双半屏，左巨字，右灰底解释 | 无 | 左半可用 `#050B14`；禁止白底绿字 |
| S04 | 04 | Six Cells | 顶部左对齐标题，`.sub-grid-3-2` 六卡 | 卡内小图标，不放大图 | 用 `.tier0-card--grey/green/ink` 实底 |
| S05 | 05 | Three Layers | 顶部左对齐标题，`.stack-row` 三大块 | 无 | `.sub-card` / `.stack-block` 三色块 |
| S06 | 06 | KPI Tower | 左标题 + 右说明，不等高 KPI 塔 | 无 | 塔块用 grey/green/ink；最后一柱可用品牌绿实底 |
| S07 | 07 | Horizontal Bar | 左对齐标题，横向条形图 | 无 | 条形 accent 用 `#B2ED1D`，标签黑字 |
| S08 | 08 | Duo Compare | `.duo-compare` 两列 + 中线 | 无；地点页可换地图 | 强调列用 `.col-tag.is-signal`；地图见 `tier0-map-component.md` |
| S09 | 09 | Dot Matrix Statement | 大号 statement + 点阵装饰 | 无 | statement 左对齐，400 字重 |
| S10 | 10 | Ink Section Divider | 纯深墨场 + 超大 IBM Plex 单句标题 + mono 标签 + 底部发丝线 | 无 | 无硬网格、Logo、绿色角线或角落圆形；章节转场专用 |
| S11 | 11 | Workflow + Capability Frame | 左 statement + 右 3 项能力 + `.timeline-h` | 无 | `.s11-force-grid` + `.timeline-h`；无真实数据时不放 KPI |
| S12 | 12 | Manifesto + Ink Banner | 大字 statement + 底部 ink 通栏 | 无 | ink 条用 `#050B14`，非第三方蓝 |
| S13 | 13 | Site to Cloud Architecture | 双系统边界 + 中央 Tier0 core + 单向桥接 | 架构标签用 HTML | `.architecture-template` / `.architecture-board`；禁止点对点网状连线 |
| S14 | 14 | Loop Form | 左 4 步列表 + 右 loop 几何 | SVG 禁止文字 | 标签放 HTML；loop 线用 `#2B2D2F` |
| S15 | 15 | Image Evidence Grid | 标题 + 2–4 图证据网格 + caption | 2–4 图统一比例 | `.image-evidence-grid` / `.image-evidence-slot` |
| S16 | 16 | Demo Evidence Player | 左讲解 + 右 16:9 直角播放器 | 视频 / Live Web | `.demo-player` |
| S17 | 17 | System Diagram | 标题 + 系统图 + 三列解释 | SVG 禁止文字 | 同心圆/层级；标签 HTML |
| S18 | 18 | Why Now | 三列递进 + 底部巨数 | 无 | 最后一列可用 green/ink 卡强调 |
| S19 | 19 | Four Cards | 顶线 + 四列均分 | 无 | `.tier0-card` grey/green/ink/accent-solid |
| S20 | 20 | Stacked KPI Ledger | 纵向账单式巨数 | 无 | 巨数 400 字重，不用 200 |
| S21 | 21 | Tech Spec Sheet | 大标题 + 三 KPI + 右下矩阵 | 无 | spec 表发丝线 `#2B2D2F` |
| S22 | 22 | Image Hero | 顶全宽图 + 左上白块标题 + 三列 KPI | 主图 `21:9` | `data-image-slot="s22-hero-21x9"`；产品截图优先 |
| S23 | 23 | Code / Logic Evidence | 左源语境 + 右大代码/逻辑块 + 底部阅读结论 | 无 | `.logic-spec`；保留原 tokens、缩进与顺序；不把代码改写成装饰文案 |

---

## 登记扩展（仍算 S08）

### S08 + Tier0 Map Component

- 场景：地理、路线、门店/事件点位、人物住所关系
- `data-layout` 仍为 **`S08`**
- 结构：顶标题 + 左说明卡 + 右地图（`+` / `-` / `DRAG`）
- 详见 `tier0-map-component.md`

---

## 封面 / 封底 ID（Tier0 默认）

| ID | 用途 |
|---|---|
| `TIER0-COVER-V4-DARK` | Legacy / opt-in：仅在用户明确要求深色封面时使用 |
| `TIER0-CLOSING-V4-DARK` | **默认**：深墨底三行主张 + URL / contact |
| `TIER0-COVER-EDITORIAL` | **默认**：白底左侧 Logo / 大标题 / 演讲者信息 + 右侧亮绿动态 ASCII 点阵；PPTX 使用可编辑静态点阵降级 |
| `TIER0-CLOSING-SPLIT` | 左 `#050B14` + ASCII / 右 takeaway 封底；官网二维码 + `www.tier0.app` 由 intake 开关决定 |

双格式交付时，默认封面 / 封底分别对应 `deck.json` 的 `cover-editorial` / `closing-dark`，见 `dual-output-tier0.md`。深墨章节转场使用 `section-dark`，并强制执行极简无装饰规则。

迁移期 validator 仍接受旧 layout 字符串，但应改用上表 ID。

---

## 图片槽位（摘要）

### S22 · Hero Strip

- 比例 **21:9** · `data-image-slot="s22-hero-21x9"`
- 照片：`object-fit:cover; object-position:center 35%`（勿用 `top center`）
- UI/信息图：按槽位重生成后 `.frame-img.r-21x9` 铺满

### S15 / S16 · Multi Image Grid

- 同组统一 **21:9** 或 **16:10**
- 重生成图：`.frame-img.r-21x9`，勿 `fit-contain` 留白带
- 用户截图：先读 `screenshot-framing.md`

### S23 · Code / Logic Evidence

- 适用：路由逻辑、DSL、配置、API payload、系统执行步骤、日志或大段必须逐字保真的来源文本
- 右侧 `.logic-spec__code` 使用 `pre > code`，文本至少 18px、1.5 行高、允许换行但保持缩进；长内容拆页，不能缩成不可读小字
- 左侧只写这段原文回答的问题、来源章节与 2–3 条读法；保留 `data-source-ids`，不得补写不存在的命令或字段
- 黑/灰代码底可用，亮绿只能标记当前路径或选中行，不能作为白底代码文字

---

## 禁止清单

- 顶部中文大标题 `text-align:center`（statement/split 除外）
- 未登记正文结构（临时图文墙、自绘三圆页等）
- SVG 内可见 `<text>`
- 白底 `color:var(--accent)` 绿字
- 图片灰底包白底信息图

---

## 校验

```bash
node scripts/validate-tier0-deck.mjs path/to/index.html
```
