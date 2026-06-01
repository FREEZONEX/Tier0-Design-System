# Marketing Deck — 主题色（Themes）

Tier0 Masterdeck 使用 **一套绑定 PPT 主题色的品牌盘**。**不允许** Agent 或销售自行指定新的品牌 hex「换肤」——会破坏与 `26.01.14-Tier0 Masterdeck.pptx` 的一致性。

权威表见 [`sources/spec.ppt.md`](../sources/spec.ppt.md) §2。CSS 实现见 [`tokens/deck.css`](../tokens/deck.css)。

---

## 使用方法（HTML / Agent）

1. 在 deck HTML 中 **只** `@import` 或 `<link>` 引用 `tokens/deck.css`（已 `@import core.css`）。
2. 所有颜色用 `var(--ppt-*)`，**不要** inline 新 hex。
3. PowerPoint 改版时同步 **设计 → 变体 → 颜色 → 自定义**，并回写 `sources/spec.ppt.md` 版本号。

---

## 核心色板（必记）

| 槽位 | CSS 变量 | HEX | 典型用途 |
|------|----------|-----|----------|
| 深底 / 主字 | `--ppt-tx1` | `#050B14` | A/B 全屏底、白底标题与正文 |
| 白底 | `--ppt-bg1` | `#FFFFFF` | C/D/E |
| 浅灰辅助 | `--ppt-lt2` | `#F4F4F4` | 卡片可选底、弱分区 |
| accent1 | `--ppt-accent1` | `#B2ED1D` | 深底挑词、结构线、标记 |
| accent2 | `--ppt-accent2` | `#73B200` | **白底** eyebrow、KPI、流程卡小标题 |
| 品牌蓝 | `--ppt-accent4` | `#1D77FE` | 链接、冷侧强调、轴线（**唯一蓝**） |
| 高亮洗 | `--ppt-highlight-wash` | `#E6F9B4` @ 低透明 | 白底大色块弱强调 |

### 强调色分工（最常踩坑）

| 画布 | 标题挑词 / eyebrow / KPI 数字 | 项目符号 · 卡片顶边 · 时间轴线 |
|------|------------------------------|--------------------------------|
| **深色**（A/B） | `#B2ED1D` → `--ppt-emphasis-on-dark` | `#B2ED1D` → `--ppt-accent-marker` |
| **白色**（C/D/E） | `#73B200` → `--ppt-emphasis-on-light` | **仍用** `#B2ED1D` → `--ppt-accent-marker` |

> 白底页 **不要** 把结构标记改成 `#73B200`——那是 accent2 的语义，不是 marker。

### 品牌蓝透明度阶（允许）

层次 **只能** 用 `#1D77FE` 的不透明度变化，例如：

- 100% — 主轴线、链接
- ~70% — 次级结构
- ~45% — 网格 / 弱线
- ~25% — 背景洗

**禁止** 引入第二套蓝（如 `#0066CC`）。

---

## 扩展色（图表 · 标签 · 慎用）

| 变量 | HEX | 用途 |
|------|-----|------|
| `--ppt-accent3` | `#196B24` | 图表系列、生态语义 |
| `--ppt-accent5` | `#A02B93` | 行业标签 |
| `--ppt-accent6` | `#4EA72E` | 辅助绿 |

新稿图表优先 accent1/2/4；3/5/6 不要大面积铺满。

---

## 废弃 · 勿用

| Token | 说明 |
|-------|------|
| `--ppt-footer-pill` | 旧母公司页脚条底色；新稿 **删除** 此类色块 |
| 画面内 FREEZONEX | 非颜色问题，但是 **P0 品牌锁** |

---

## 推荐「场景」对照（不是换主题，是叙事侧重）

Masterdeck 不换色，但可根据受众强调不同 **内容模块**：

| 如果是… | 叙事侧重 | 版式倾向 |
|---------|----------|----------|
| 首次销售拜访 | 痛点 → UNS → 架构 → 下一步 | A + 多 C + 少量 B |
| 技术深潜 | Source Flow / Namespace / Event Flow | C + D |
| 竞品对比 | 传统集成 vs Tier0 | E |
| 投资人简版 | 市场 + 差异化 + 牵引 | A + KPI（见 components）+ C |

---

## 不要做的事

- 不要混搭其他 surface 的色（如产品 UI 的 `#CCF368` 按钮绿、官网 `#A7CF3A`）
- 不要让用户「随便给一个 hex」——说明 Masterdeck 仅支持上表，改版需走设计规范
- 不要在深色章节页再叠 **大块** accent1 底（投影会糊）

选定 deck 后，在项目 README 里备注「Masterdeck v1.5 色板」即可。
