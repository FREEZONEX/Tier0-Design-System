# Marketing Deck — 版式与品牌硬锁（Layout Lock）

Tier0 Masterdeck **不是**「换一套 CSS 就变风格」——而是一套 **固定双模态 + 五种幻灯片类型（A–E）**。Agent 不得为「好看」临时发明第六种页面结构。

完整母版依据见 [`sources/spec.ppt.md`](../sources/spec.ppt.md)。本文只列 **生成时必须遵守、校验器尚未自动化** 的硬锁。

---

## 1. 允许的幻灯片类型（正文只能 A–E）

| 类型 | Office 映射 | `data-slide-type` 建议 | 用途 |
|------|-------------|------------------------|------|
| **A** | `title` | `A` | 封面、封底 |
| **B** | `secHead` | `B` | 深色章节过渡 |
| **C** | `obj` / `titleOnly` | `C` | 白底标准内容 |
| **D** | `blank` + 自定义 | `D` | 时间轴、架构、流程 |
| **E** | `twoObj` | `E` | 对比双栏 |

**禁止：**

- 自造「居中海报式」全屏标题（除非类型 B 章节页）
- 全稿出现 **Poppins**（含历史母版残留）
- 封面（A）与深色章节（B）主标题必须用 **Tektur Regular**
- 画面出现 **FREEZONEX** 字样、Logo、母公司色条、口播归属
- 用饱和 `#B2ED1D` **满铺条** 再叠浅色正文
- 白底 / 浅灰 / 浅绿洗上用 `#B2ED1D` 作**文字**（小标题、Mono 标签）—— 见 **P0-8**
- 品牌蓝使用 `#1D77FE` **以外** 的蓝色 HEX（层次只允许该色的 **opacity** 变化）

每个交付 slide 建议写：`data-slide-type="C"`，便于自检 grep。

---

## 2. 字体白名单（四族 · 分工锁死）

| 用途 | 字体 | 字重 | 禁止 |
|------|------|------|------|
| A 封面主标题 | Tektur | **Regular 400** | **Poppins**、Bold |
| B 深色章节 | Tektur | **Regular 400** | **Poppins**、Bold 冒充章节字 |
| C 白底页标题 | IBM Plex Sans / **SC** | Medium 500 | **Poppins** |
| 正文 / 列表 | Sans / **SC** | Regular 400 | 其他中文字体 |
| 页脚 | IBM Plex Mono | Regular | 含 FREEZONEX 文案 |

- 拉丁：`IBM Plex Sans`
- 简中 / 东亚：**IBM Plex Sans SC**（与西文同档 Medium / Regular）
- HTML 用 `tokens/deck.css` 中的 `--font-cover` / `--font-chapter` / `--font-body-latin` / `--font-body-cjk` / `--font-footer`

---

## 3. 颜色锁（单主题 · 按底区分强调绿）

Masterdeck **只有一套主题色**，不从多 preset 里混搭。变量定义见 [`ppt-themes.md`](ppt-themes.md) 与 [`tokens/deck.css`](../tokens/deck.css)。

| 语义 | 变量 | HEX | 用于 |
|------|------|-----|------|
| 深底 / 主字 | `--ppt-tx1` | `#050B14` | A/B 背景、白底正文色 |
| 白底 | `--ppt-bg1` | `#FFFFFF` | C/D/E |
| 深底挑词 | `--ppt-emphasis-on-dark` | `#B2ED1D` | A/B 标题挑词 |
| 白底挑词 / eyebrow / KPI 数字 | `--ppt-emphasis-on-light` | `#73B200` | C/D/E 强调字 |
| 结构标记 | `--ppt-accent-marker` | `#B2ED1D` | 项目符号、卡片顶边、时间轴线（**白底也用亮绿**） |
| 浅底小字标签 | `--ppt-label-on-light` | `#050B14` | Mono 10–12px on 白/灰；**禁止 accent1 文字** |
| 品牌蓝 | `--ppt-accent4` | `#1D77FE` | 链接、冷侧结构、轴线辅助 |

---

## 4. HTML 交付形态锁

| 场景 | 规则 |
|------|------|
| **业务 deck 与预览** | 每页 `100vw × 100vh` 全屏；`#deck` 占满 viewport；**禁止**外层居中固定尺寸灰底画框 |
| **16:9 构图** | slide 内 safe area / `aspect-ratio: 16/9`；背景仍铺满视口 |
| **资源路径** | 交付 HTML：**禁止** `file://`、`/Users/...`、未解析的 `./assets/`；用 Base64 或 HTTPS |
| **成稿位置** | 写在用户业务目录，**不要**在本设计系统仓库建 `decks/` |

---

## 5. 封面主视觉锁（类型 A）

- **必须**使用 [`assets/marketing-cover-visual.svg`](../assets/marketing-cover-visual.svg)
- 摆放：**全高贴右**（`100vh`，抵消 slide 水平 padding 贴 viewport 右缘）；左侧溢出可裁切
- 左侧 **5%–44%** 留给标题 / 副标题 / 日期；文字不压主视觉复杂区
- **禁止** 临时手绘立方体 / 等轴测块替代 SVG
- **禁止** HTML/CSS 额外 accent1 装饰斜线（历史 `.deck-cover__line`）；背景仅 slide 自带点阵
- PNG 摆放参考图 **不入库、不交付**

---

## 6. 节奏锁

- 深色 B 与白底 C **交替**；避免连续 **>2** 张白底无节奏断点
- 每页 **一个观点**、一个主标题 claim
- 动画：切页无或仅淡入（投影环境）
