---
name: tier0-svg-illustration
description: >-
  Generate small Tier0 SVG spot illustrations in Oxide-like technical craft:
  pixel-grid geometry, thin strokes, mono accents, green+gray+black only.
  Use for website/PPT section art — NOT full slide layouts or data charts.
  Remap Oxide craft to Tier0 tokens; never copy Oxide marks.
---

# Tier0 SVG Illustration

参考 [oxide.computer](https://oxide.computer/) 方案页里的**小节配图**（约 300×250 的 spot：折线窗、代码窗、线框等角块），用 Tier0 **绿 / 灰 / 黑**重铸。

## 硬规则（违反即返工）

1. **是 spot，不是 PPT 页**  
   - 默认 `viewBox` ≈ `0 0 360 280` 或 `0 0 400 300`  
   - **禁止** 960×540 整页构图、标题栏、状态条、多段说明、底栏 Fig 长文  
2. **像素级简单**  
   - 对齐到 **4px 网格**；`stroke-width` 1（或 1.2）；圆角 ≤2px  
   - 几何块 / 细线 / 小窗为主；禁止插画叙事堆砌  
3. **文字极少**  
   - 默认可编辑 text ≤ **4 条**，每条 ≤ 12 字符，仅 IBM Plex Mono  
   - 不要中文标题+副标题+节点说明+右卡 KPI 同屏  
4. **色板锁定（仅这些）**  

| 用途 | Hex |
|------|-----|
| 底 | `#050B14` |
| 面板 | `#0E1824` / `#181A1D` |
| 发丝 | `#2B2D2F` / `#303235` |
| 灰字/次结构 | `#73777D` / `#A3A4A5` |
| 信号绿 | `#B2ED1D` |
| 可读绿（浅底或次强调） | `#73B200` |

禁止第三色（紫/蓝/橙）、禁止大面积霓虹、禁止 cream 纸色。

5. **一图一意** — 只表达一个对象或一条流（如「库位货架」或「入库→库位→出库」三块）  
6. **无 Tektur**；无 Oxide / 0xide 字标

## 何时用 / 不用

| 用 | 不用 |
|----|------|
| 网页卡片旁配图、PPT 证据槽小图 | 整页讲解稿 → `tier0-ppt` |
| 线框货架 / 小窗趋势 / 代码感面板 | 真实数据图 → `lieflat-charts` |
| | 产品真实 UI → `tier0-product` |

## 加载

1. 本文件  
2. [`references/grammar.md`](references/grammar.md)  
3. 需要时 [`references/recipes.md`](references/recipes.md) · `examples/`  
4. 可选 [`references/oxide-source-notes.md`](references/oxide-source-notes.md)

## 工作流

```
1. 元素拆解（必做，先写清再画）
   主题名词 → 可辨认母题（看得到是什么，不是纯抽象块）
   例：仓库管理 → 箱体📦 / 仓房🏭 / 出入箭头 / 数据虚线
2. 母题 → SVG 几何（禁止直接贴 emoji；用线框立方体、山墙仓体、托盘等）
3. 选 recipe；≤400×300；绿只点一处高亮（如在途箱或活动库门）
4. 文字审查：≤4 条短 mono；叙事靠图形不靠文案
5. 交付单文件 SVG
```

### 元素拆解表（生成前在思考里填）

| 主题概念 | 可读母题 | SVG 画法 |
|----------|----------|----------|
| 货物 | 箱 / 托盘 | 等角立方体 + 顶面折线（胶带感） |
| 仓库 | 仓房 | 矩形墙 + 三角/折线屋顶 + 库门洞 |
| 入库 / 出库 | 方向 | 短箭头或传送带横线；一侧进一侧出 |
| 数据 / 系统 | 数据流 | 虚线 `#B2ED1D` 或灰点阵短段，连箱↔仓 |
| 库位 | 货格 | 仓内小格或架层线 |

**禁止**只画三个无名菱形就叫「仓库」。观众应能一眼认出箱和仓。
## Oxide → Tier0 对照（像素感）

| Oxide 小节图气质 | 做法 |
|------------------|------|
| 小窗 + 发丝边 | `rx=2` 面板，`#2B2D2F` stroke |
| 折线/面积弱填充 | 主线 `#B2ED1D`，fill opacity ≤0.15 |
| 代码窗绿字 | Mono `#B2ED1D` 在深绿灰底 `#0E1824` |
| 等角线框 | stroke only / 极暗 fill，单节点 accent |
| 点阵分隔 | 仅作窄条，不作满幅墙纸 |

## 交付

- 路径未指定 → `~/Desktop/tier0-svg-…/`  
- 回复：**文件 · recipe · 限制**

## Anti-patterns

- 做成「一页 PPT」：大标题、四段流程说明、右侧 KPI 卡、Fig 长 caption  
- **过度抽象**：看不出货物/建筑，只有无名几何  
- 直接使用 emoji 字符当图形  
- 灰绿以外的装饰色  
- 厚阴影、渐变彩虹、圆角胶囊  
- 临摹 Oxide 商标或产品截图