# 截图美化规则 · Marketing Deck

用于把产品截图、界面截图、架构图、数据大屏等处理成符合 PPT 幻灯片比例的图片资产，目标风格与 Tier0 Design System 一致：**深底点阵 + 柠檬绿 accent**。

优先程序化适配（保真），仅在内容需要重构/概念化时才重新生成。

---

## 开始前确认

进入截图流程前先问清楚：

- 截图来源：产品 UI、工业监控大屏、架构图、代码、网页、还是旧 PPT？
- 处理目标：**保真展示** / **统一美化（换背景）** / **重新设计成概念图**？
- 目标槽位比例：全屏 `16:9`、宽图 `21:9`、双栏半幅 `4:3`、方形 `1:1`？
- 是否需要隐藏敏感信息（IP、账号、项目名、内部数据）？
- 构图：居中、左对齐、右对齐、还是跟随页面布局自动判断？

---

## 处理链路

```
1. 先匹配版式 → 确定截图槽位比例
2. 再选处理方式：
   ├── 要保真 → 程序化适配（不重绘）
   ├── 要统一视觉 → 程序化适配 + Tier0 背景
   └── 原图不可用 / 需概念化 → 重新生成 UI 情景图
3. 再选背景风格（见下方风格映射）
4. 最后合成：背景 cover 铺满画布，截图等比缩放按 padding + alignment 放入
```

默认不裁剪截图内容。只有截图本身已按目标比例生成，或用户明确允许裁切时才使用 cover 裁切。

---

## 语义参数

每次处理截图前确定以下 7 个参数：

| 参数 | 可选值 | 判断方式 |
|---|---|---|
| `ratio` | `16:9` / `21:9` / `4:3` / `1:1` | 跟随幻灯片槽位，不跟原截图比例 |
| `background` | `dark-dot` / `dark-plain` / `light-plain` / `light-grid` | 跟随当前幻灯片主题（dark / light） |
| `padding` | `compact` / `standard` / `spacious` | 普通截图 standard；文字密集用 spacious；多图并排用 compact |
| `inset` | `none` / `subtle` / `balanced` | 需要从背景浮出时用 balanced；深底幻灯片多用 subtle / none |
| `shadow` | `none` / `soft-lime` / `glow-lime` | 深底页：`glow-lime`（柠檬绿微光）；白底页：`soft-lime` 或 `none` |
| `corners` | `square` / `small` / `medium` | 架构图 / 数据图用 `square`；UI 界面用 `small` |
| `alignment` | `center` / `top-left` / `top-right` / `bottom-left` / `bottom-right` | 跟随幻灯片构图，不必永远居中 |

---

## 风格映射

### Theme Dark · 深色幻灯片（Cover / Chapter / D 型深底）

- 背景：`dark-dot`（深底 + 白色点阵，opacity 0.045，与 deck.css 一致）
- 截图：直角或极小圆角（`square` / `small`）；柠檬绿微发光边框
- accent 线：仅用 `--ppt-accent-marker`（`#B2ED1D`）作 hairline 或点阵；**不做大面积色块**
- 推荐参数：

```text
ratio:16:9, background:dark-dot, padding:standard, inset:subtle, shadow:glow-lime, corners:square, alignment:center
```

### Theme Light · 白底幻灯片（C / D 型白底）

- 背景：`light-plain`（`#FFFFFF`）或 `light-grid`（细灰网格）
- 截图：无阴影或轻微阴影；顶边可加 `--ppt-accent-marker` hairline（1-2px）
- accent 色：只做细线 / 点阵，**不做大色块**
- 推荐参数：

```text
ratio:16:9, background:light-plain, padding:standard, inset:balanced, shadow:soft-lime, corners:small, alignment:center
```

---

## 截图类型决策

| 原始素材 | 推荐处理 |
|---|---|
| Tier0 产品 UI 截图 | 程序化适配，`fit-contain`，不重绘，保留所有数字和状态 |
| 工业大屏 / 监控界面 | 程序化适配 + `dark-dot` 背景；突出数据，隐藏敏感字段 |
| 架构图 / 系统拓扑图 | 程序化适配，`light-plain` 或 `dark-plain`，`corners:square` |
| 代码截图 | `dark-dot` 背景；保证文字可读，适当 `spacious` padding |
| 长网页截图 | 截取关键区域，或拆成 2-3 张同尺寸面板并排 |
| 极窄 / 极高截图 | 先尝试 `spacious + side alignment`；仍太小则重新设计 |
| 概念说明 / 流程图解 | 可重新生成 UI 情景图，保持 Tier0 品牌色 |
| 对比截图（Before/After）| 左右双栏 `4:3`，中间加 `--ppt-accent-marker` 竖线分隔 |

---

## 背景强度规则

截图背景是「托底」，不是主视觉。

- **点阵密度**：白色点阵 `14×14px`，opacity `0.04–0.06`，不高于此值
- **accent 色占比**：`#B2ED1D` 柠檬绿仅做细线 / 点阵，视觉占比 **≤ 5%**，禁止大面积亮色块
- **构图安全区**：背景中心和四角都需安静——截图可能居中或偏角，任何位置都不能有强视觉主体
- **禁止出现**：文字、logo、图标、人物、设备、边框、明显方向性构图
- **Crop-safe**：背景裁成 `21:9`、`16:9`、`4:3`、`1:1` 时都不能暴露"被裁掉"的痕迹

---

## 内置背景资产

> 优先使用已有资产，不要每张截图实时生成新背景。

| 主题 | 路径 | 适用场景 |
|---|---|---|
| 深底点阵（标准） | `assets/screenshot-bg/dark-dot-standard.webp` | Cover / Chapter / 深色内容页 |
| 深底纯色 | `assets/screenshot-bg/dark-plain.webp` | 需要截图完全「浮出」时 |
| 白底纯色 | `assets/screenshot-bg/light-plain.webp` | 白底内容页（C/D 型） |
| 白底细网格 | `assets/screenshot-bg/light-grid.webp` | 架构图、比较图 |

背景图为 `1920×1080` WebP。合成时先 cover 铺满目标画布，再将截图按 padding + alignment 放入。

---

## 生成新背景图提示词

仅当内置资产不满足需求，或用户要求全新风格时使用。

### 深底点阵背景

```text
16:9 crop-safe background for an industrial IoT dashboard PPT. Dark near-black (#050B14), white dot matrix 14px spacing opacity 0.05, subtle radial gradient from center, quiet center and quiet corners. One accent: lime green (#B2ED1D) at 3-4% opacity as faint grid lines only, no bright blocks. No text, no logo, no icon, no objects, no border. Suitable for cropping to 21:9, 16:10, 4:3, 1:1.
```

### 白底细网格背景

```text
16:9 crop-safe background for a clean technical presentation. Pure white base (#FFFFFF), ultra-subtle light gray (#E5E5E5) 20-column grid at 8% opacity, sparse dot matrix. One accent: lime green (#B2ED1D) used only as hairline thin lines at 6% opacity, no color blocks. Quiet center and quiet corners, no text, no logo, no focal subject. Suitable for cropping to 21:9, 16:10, 4:3, 1:1.
```

---

## 与幻灯片版式的对应

| 版式类型 | 推荐截图位置 | 截图比例 | 背景主题 |
|---|---|---|---|
| A · Cover | 右半幅（与 `deck-cover__visual` 同区） | `9:16` 竖版 或 自由 | dark-dot |
| B · Chapter | 不建议放截图（极简留白） | — | — |
| C · 图文双栏 | 右栏 `deck-duo__visual` | `4:3` 或 `1:1` | light-plain |
| C · 全幅截图页 | `deck-main` 全铺 | `16:9` | 按页主题 |
| D · 架构图页 | `deck-main` 全铺 | `16:9` | light-plain / dark-plain |
| D · 双栏对比 | 左右各一张 | `4:3` | light-plain |
