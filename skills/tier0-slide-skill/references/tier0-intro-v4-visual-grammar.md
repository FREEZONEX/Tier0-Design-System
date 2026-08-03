# Tier0 Intro V4 Visual Grammar

## 目录

1. 视觉结论
2. 页面节奏
3. 字体
4. 色彩
5. 网格与坐标
6. 组件语法
7. 页面族
8. HTML / PPTX 对齐规则

## 1. 视觉结论

参考 `Tier0 Intro - EN-V4.pptx` 与既有 Tier0 HTML deck 的核心不是单一“科技黑”或单一“官网白”，而是白底 editorial 开场、深墨叙事转场和白底证据页交替：

```text
White editorial cover
  + dark narrative dividers
  + white evidence pages
  + fluorescent green signal
  + industrial grid
  + editorial proof
```

一句话：

```text
像一份工业数据产品的技术宣言，
但每个观点紧接着有白底证据页证明。
```

## 2. 页面节奏

默认节奏：

```text
白底 editorial 封面
→ 白底挑战
→ 白底架构 / 对比
→ 深墨问题转场
→ 白底产品能力
→ 白底真实 UI / Demo
→ 白底成本价值
→ 深墨客户 / 章节转场
→ 白底采用路径 / 案例
→ 深墨封底
```

硬规则：

- 每 4–6 页至少出现 1 张深墨转场页。
- 深墨页只讲一句主张，不承载密集正文。
- 白底页负责证据、步骤、架构、案例和成本。
- 连续三页不得都是同一种卡片网格。

## 3. 字体

| 角色 | 字体 | 字重 | 960×540 字号 |
|---|---|---:|---:|
| 白底 editorial 封面标题 | IBM Plex Sans | 400 | 40–46 |
| 深墨转场标题 | Tektur | 500–600 | 34–40 |
| 白底主标题 | IBM Plex Sans | 500–600 | 28–34 |
| Section label | IBM Plex Mono | 600 | 10–13 |
| 卡片标题 | IBM Plex Sans | 500–600 | 13–17 |
| 正文 | IBM Plex Sans | 400 | 10–14 |
| 元数据 / 页脚 | IBM Plex Mono | 400–500 | 9–11 |
| 巨数 | Tektur 或 IBM Plex Sans | 600–700 | 34–50 |

参考稿深墨标题具有方正、切角、工业终端感；Tektur 是主要展示字体。白底正文保持 IBM Plex，可读性优先。

字体不可用时：

- Tektur → `IBM Plex Sans Condensed` → `Arial Narrow`。
- IBM Plex Sans → `Aptos` → `Arial`。
- IBM Plex Mono → `Aptos Mono` → `Consolas`。

## 4. 色彩

| Token | Hex | 用途 |
|---|---:|---|
| Dark canvas | `#06101B` | 深墨转场 / 封底 |
| Ink | `#050B14` | 白底标题、正文 |
| White | `#FFFFFF` | 内容页 |
| Tier0 lime | `#B2ED1D` | 深底高亮、active path |
| Deep green | `#73B200` | 白底可读高亮文字 |
| Pale lime | `#F5FBDE` | 结论条、选中面 |
| Surface | `#F4F4F4` | 卡片标题条、弱分区 |
| Border | `#CDCED0` | 1px 结构线 |
| Body grey | `#585C62` | 白底正文 |
| Muted grey | `#ACAEB1` | 深底副标题 |

用色比例：

```text
白底内容页：88% 白 / 8% 深墨 / 3% 灰 / 1% 绿
深墨章节页：85% 深墨 / 8% 网格 / 5% 白 / 2% 绿
```

白底绿字必须使用 `#73B200`；`#B2ED1D` 只用于深底文字或实体信号块。

## 5. 网格与坐标

基准画布：

```text
960 × 540 design units
PowerPoint: 13.333 × 7.5 inch
Mapping: 72 design units = 1 inch
```

常用坐标：

- 外边距：48 左右，24–40 上，28–40 下。
- 白底页标题：x=40–48，y=28–60，w=820–880。
- 主内容开始：y=150–175。
- 页脚：y=510–523。
- 3 卡间距：12–18。
- 发丝线：1。
- 结论条：48–60 高，左侧 3–4 宽绿色信号。

深墨转场页：

- 使用 Gallery S10 的纯深墨场，不铺满屏硬网格。
- 一个超大 IBM Plex 单句标题，配一个克制的 mono 章节标签。
- 底部仅保留发丝线、短 footer 和页码。
- 转场页不放左上 Tier0 Logo；品牌识别由字体、深墨场、信号色和页脚承担。

## 6. 组件语法

### 6.1 Section label

```text
UPPERCASE
IBM Plex Mono
10–13
letter spacing 0.08–0.14em
白底用 #73B200
深底用 #B2ED1D
```

### 6.2 白底信息卡

- 直角。
- 1px `#CDCED0`。
- 顶部可有 2px lime 线。
- 编号使用绿色 mono。
- 图标最多一个，图标必须解释信息。
- 不使用阴影和大圆角。

### 6.3 结论条

- 背景 `#F5FBDE`。
- 左边 3–4px `#B2ED1D`。
- 左侧 `RESULT` / `OUTCOME` mono label。
- 右侧一句 audience-facing 结论。
- 每页最多一条。

### 6.4 双栏对比

- 两个等宽面板，中间 24–32 间距。
- 顶部标题条：旧模式灰底，新模式淡绿底。
- 内容区白底 + 1px 边框。
- 中央箭头只说明方向，不作装饰。

### 6.5 成本公式

- 上下两条结构完全同构。
- 传统路径用深墨大数。
- Tier0 路径只把关键数值切换为深绿 / lime。
- 公式旁必须解释口径，避免“0.75X”成为无来源装饰。

## 7. 页面族

### Editorial cover

- 白底，顶部一行 mono chrome：左侧 deck 类型，右侧页码。
- 标题区左侧放黑色方块 + mono section label；主标题使用 IBM Plex Sans Regular。
- 右侧只放一条简短产品类别 / 副标题，不放 Logo、ASCII、工业节点、圆形或角线装饰。
- 底部使用一条黑色发丝线收束；HTML 与 PPTX 的标题换行必须一致。

### Minimal dark divider

- 深墨底 + 低对比网格。
- 只允许：白色主标题、可选亮绿结论、页脚与页码。
- 禁止：左上 Logo、标题短线、右上/左下绿色角线、绿色或暗绿色大圆、工业节点装饰。

### Challenge 3

- 上方 label + 断言标题 + 一句解释。
- 下方三卡，编号 01/02/03。
- 底部结论条回答“所以呢”。

### Feature split

- 左侧 38–44%：四条能力声明。
- 右侧 56–62%：产品流程 / 原生 UI / 数据流。
- UI 是证据主角，不套厚重设备框。

### Adoption path

- 四列从左到右。
- 每列顶部 2px lime。
- 只写阶段、动作、产出。
- 底部一句总结第一应用与可复用基础的关系。

### Case page

- 上方客户 + 断言式标题。
- 左侧真实截图或照片。
- 右侧 Challenge / Solution。
- 底部数据流，以原生 shape + connector 表达。

### Closing

- 深墨底。
- 3 行主张，由白 → lime → muted 逐级收束。
- 网址与联系信息独立文本框。
- 不用通用 “Thank you”。

## 8. HTML / PPTX 对齐规则

- 双格式交付统一使用 `scripts/build-tier0-dual.mjs`。
- HTML 和 PPTX 不允许分别调整坐标；要改只改 `deck.json`。
- 默认首屏使用 `cover-editorial`；只有用户明确要求深色封面时才使用 legacy `cover-dark`。
- `section-dark` 的极简约束由构建器锁定，不能在 `deck.json` 中用 `logo` 或装饰字段恢复。
- CSS 动画仅用于 HTML，不能改变最终稳定态布局。
- PPTX 的 text / rect / line 必须保持原生可编辑。
- 图片是独立 picture，不允许把标题和页脚烘焙进图片。
- 生成后比较 HTML 截图与 PPTX 渲染；允许字体替换导致 2–4% 的行宽差，但不允许换行、溢出或结构变化。
