# PPTX 改稿（v3 · shadcn 风格）

把现有 `.pptx`（含多个版本合并）改成 Tier0 v3 版式：**直接改原文件**，保留母版、截图、客户 logo，左侧长文本重组为分层结构。基准成品：Tier0 Case Studies v3（2026-11）。示例脚本：[`../examples/case_studies_v3.py`](../examples/case_studies_v3.py)。

---

## 1. 流程

1. **读**：`slide_text.py`（或 python-pptx dump）列出每页 shape、坐标、文本；渲染全部页（含隐藏页）看现状。
2. **定底稿**：多个版本时选品牌更完整的一份为底（母版 / 封面 / 字体），其他版本只取它缺的东西（客户 logo、空掉的正文、更好的裁切）。
3. **写 build 脚本**：`from tier0_pptx_kit import *`；每页 `prep()` 清空 → `panel()` 摆截图 → `place_logo()` → 左栏按 §4 组件重排 → 最后 `deck_cleanup()`。文案写在 build 脚本里，不手改 XML。
4. **渲染验收**：`scripts/render_check.sh out.pptx qa/`（先装仓库 `fonts/` 里的 IBM Plex，否则 LibreOffice 换字体，溢出判断无效）。逐张看 contact sheet，按 §6 清单修，只重渲改过的页。
5. **交付**：校验通过后交 `.pptx`；隐藏页保持隐藏；回复列出改短的标题 / 压缩的文案 / 从其他版本借的素材。

---

## 2. 色板（PPT 浅底页唯一允许的颜色）

| Token | HEX | 用途 | 禁止 |
|-------|-----|------|------|
| Ink | `#050B14` | **所有**文字、箭头、流程连线 | — |
| Muted | `#71717A` | 眉标 `CASE STUDY`、KPI 类别、页码、图例 | 正文 |
| Tier0 Green | `#CBF368` | 填充：标签方块 ■、编号徽章、VALUE 标签、Tier0 节点；深底挑词 | **白底上作文字** |
| Surface | `#FAFAFA` | 所有卡片 / 面板 / 值行底色 | 其他灰（F4F4F4 / F3F3F3） |
| Border | `#E4E4E7` | 0.75pt 细边：卡片、面板、截图、分隔线 | — |
| White | `#FFFFFF` | 页面底、chip 底 | — |

- **不再使用** `#73B200`（灰调绿字）与 `#B2ED1D`（旧亮绿）：`deck_cleanup()` 按 `REMAP` 自动替换（73B200 / 585C62 → Ink，B2ED1D → CBF368，F3F3F3 / F4F4F4 → FAFAFA）。
- `#FAFAFA` 在白底上几乎不可见 → 卡片**必须**带 `#E4E4E7` 细边（shadcn card）。
- 卡片**不加**彩色顶边 / 侧边条。

## 3. 网格（16:9 · 13.333 × 7.5 in）

```
0.5 ─────────── 7.1 │0.4│ 7.5 ─────────── 12.83
 OVERVIEW ■ 1.75        DELIVERABLES ■ 1.75      ← 两栏标签同一行
 Lead 2.05 (15pt ≤2 行)  ┌ panel 2.05 ─────────┐
 SECTION ■ 3.00          │ 截图网格 pad 0.25    │
 section 3.30 – 5.45     │ gap 0.2，图注 9.5pt  │
 VALUE 5.75 – 6.25       │                      │
 client logo → 6.80      └──────────── 6.80 ────┘
                                         页码 6.98 右对齐 12.83
```

- 左右边距 0.5"；标题占位符 x=0.4 + 0.1 内边距 = 0.5 文字线。Tier0 logo 宽 1.3"，右边缘 12.83、顶 0.55（**母版和每个版式都有一份，必须都改**，否则叠两个）。
- 间距只用 **0.1 / 0.2 / 0.3**；标签 → 内容 0.3；卡片间距 0.2（流程卡 0.3，中间放 chevron）。
- 左栏底部（logo 底边）= 右栏面板底边 = 6.80。
- 删除页脚 `Tier0 / Case Studies`（与左上眉标重复）。页码：IBM Plex Mono 9pt Muted，右对齐页边距。
- 眉标（标题第一段 `CASE STUDY` / `USE CASES`）改 Muted 灰。标题一行放不下（宽 10.2"）就**改短**，地点等细节移到 Lead。

## 4. 组件（kit 函数）

| 函数 | 何时用 | 规格 |
|------|--------|------|
| `label` | 每个分区标题 | 0.09" 绿方块 ■ + Mono 9.5pt caps Ink，spc 120 |
| `overview` / `lead` | 每页第一块 | 一句话，15pt，≤2 行；页型需要可换标签（`CHALLENGE`） |
| `flow` | 有先后顺序的 3 步 | 卡片 + 徽章 + 13pt 标题 + 11pt 描述（≤45 字符），chevron 连接 |
| `grid` | 4 个并列能力 | 2×2；卡高 ≥0.85"，保证两行描述下方 ≥0.18" 留白 |
| `rows` | 3–5 条要点 / 范围 / 结果 | 徽章 · 粗标题 · 短注，细线分隔，无卡片 |
| `chips` | 数据源链路 / 检测对象 | 白底 + 细边 + 4px；`arrows=True` 表示流向 |
| `kpis` | 原文有数字 | 统计卡：类别 Muted Mono → 22pt 数值 → 单位；`compact=True` 高 1.15" |
| `stat_strip` | 次要数字 | 无卡片，竖细线分隔 |
| `loop_nodes` | A ⇄ Tier0 ⇄ B 闭环 | Tier0 节点绿底，两端 Surface；黑色双向箭头 + 右上图例 |
| `value_row` | 页尾价值 / 结果 | Surface 卡 + 绿色 `VALUE` 标签 + 11.5pt 一句话 |
| `panel` | 右栏截图 | 自动配对原图注，按列数均分；截图 0.75pt 细边 |
| `place_logo` | 客户 logo | 自动裁白边后统一高 0.4"（宽 ≤2.0"），底边 6.80 |
| `use_case_grid` | 总览页（多场景） | 3×2 卡：徽章 + 标题 + 副标题 + 两张错位叠放截图 |

形状：直角为主；**只有** card / panel / chip / node 用 4px 圆角（`R4`）。

## 5. 长文本重组规则

原页一大段 Background + 一串 bullet → 拆成：

1. **OVERVIEW**：一句话说清"为谁、做了什么"。
2. **结构区**（选一种，按内容形状）：
   - 有顺序 → `flow`（3 步）；有数字 → `kpis`（+ `stat_strip`）；并列能力 → `grid`；要点清单 → `rows`；系统间数据流 → `loop_nodes` + 步骤。
3. **VALUE**：一句话结果（原文的 "Value for …" / "The project demonstrated …"）。

- 改写只压缩措辞，**不新增事实、不改数字**；每条 ≤1 行（卡片描述 ≤2 行）。
- 同一套 deck 相邻页换不同结构区，避免整套同壳。
- 交付回复列出所有改短的标题和被压缩的段落，请对方核对。

## 6. 验收清单（渲染图上逐页看）

- [ ] 无文字溢出卡片 / 贴边（卡片内文字底部留白 ≥0.18"）；无单词被拆行（`latinLnBrk=0` 已设）
- [ ] 两栏标签同一 y；左栏 logo 底 = 面板底 = 6.80；页码右对齐 12.83
- [ ] 白底无绿字、无 `#73B200` / `#B2ED1D` / `#F4F4F4` 残留（`deck_cleanup` 后 grep XML）
- [ ] Tier0 logo 只出现一次（母版 + 版式都已改）
- [ ] KPI 数值不换行（4 列时 ≤6 字符，或改 3 列）
- [ ] 客户 logo 视觉高度一致（autocrop 生效）；缺的 logo 已从其他版本补齐
- [ ] 隐藏页同样处理并保持隐藏；封面日期更新
- [ ] `validate.py`（pptx skill）通过

## 7. 踩坑记录

| 现象 | 原因 | 处理 |
|------|------|------|
| 右上 Tier0 logo 重影 | 母版和版式各有一份 | `deck_cleanup` 同时遍历 `slide_masters` + `slide_layouts` |
| `40-60%` 拆成两行 | 卡宽 1.25" 放 24pt 不够 | 22pt + 文本框宽 `w-0.22`；`word_wrap=False` 在 LibreOffice 会居中，别用 |
| KMG logo 很小 | B 版丢了图片裁切 | `autocrop()` 按像素裁白边 |
| 某页正文为空 | 某版本占位符丢文本 | 从另一版本取原文 |
| 渲染字距和 PowerPoint 不同 | 环境缺 IBM Plex | `render_check.sh` 先装 `fonts/` |
| 隐藏页不出图 | soffice 跳过 `show="0"` | 渲染前临时设 `show="1"`（只用于 QA 副本） |
| 卡片看不出来 | FAFAFA ≈ 白 | 必须加 E4E4E7 细边 |
