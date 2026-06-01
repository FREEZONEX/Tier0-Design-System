# Marketing Deck — 质量检查清单（Checklist）

生成或修改任何 `ppt` 产出后使用。按 **P0 → P3** 顺序；P0 任一项失败即 **不得交付**。

工作流见 [`ppt-workflow.md`](ppt-workflow.md)。

---

## P0 · 一定不能犯

### P0-1 · 画面出现 FREEZONEX

**现象：** 幻灯片上有母公司名、Logo、页脚条或「FREEZONEX's …」。

**根因：** 沿用旧母版或从其他 deck 复制页。

**做法：** 仅 Tier0 Logo + `Copyright © 2026 Tier0. All rights reserved.`；grep `FREEZONEX` / `freezonex` 为零结果。

---

### P0-2 · 品牌蓝不是 #1D77FE

**现象：** 链接、轴线、冷色块出现其他蓝色 hex。

**做法：** 只用 `--ppt-accent4` 及其 opacity；改版写回 `theme1.xml` / `deck.css`。

---

### P0-3 · 字体越界（含 Poppins）

**现象：** 任意 slide 出现 **Poppins**；章节/封面用 Tektur Bold；白底标题非 Plex Medium；中文用非 Plex SC。

**做法：** 仅允许 Tektur / IBM Plex Sans / IBM Plex Sans SC / IBM Plex Mono。对照 [`ppt-layout-lock.md`](ppt-layout-lock.md) §2。`rg -i poppins` 应无匹配。

---

### P0-4 · 交付 HTML 非全屏

**现象：** 整 deck 包在居中固定尺寸灰底框里；深色底未铺满视口。

**根因：** 使用了旧版预览外壳（居中画框 + 固定宽高）。

**做法：** 每页 `100vw × 100vh`；与 `preview/ppt/` 全屏结构一致。

---

### P0-5 · 封面未用官方 SVG

**现象：** 手绘立方体、随机 3D、占位图代替封面。

**做法：** `assets/marketing-cover-visual.svg`，摆放见 [`ppt-diagrams.md`](ppt-diagrams.md)。**不要**加 accent1 装饰斜线或 `.deck-cover__line`。

---

### P0-6 · 交付 HTML 含本地路径

**现象：** `file://`、`/Users/...`、`src="./assets/..."` 在客户包中未解析。

**做法：** Base64 或 HTTPS；见 `export.md`。

---

### P0-7 · 白底结构标记错色

**现象：** 白底页项目符号或卡片顶边用了 `#73B200`。

**做法：** 标记始终 `#B2ED1D`（`--ppt-accent-marker`）；`#73B200` 仅 eyebrow / 挑词 / KPI。

---

## P1 · 视觉系统

- [ ] 每页有 `.deck-chrome`：左章节 / 栏目，右页码（封面含日期）；小标均为 **IBM Plex Mono + 全大写**
- [ ] 深底 `#050B14`；深底挑词 `#B2ED1D`
- [ ] 白底挑词 / eyebrow / KPI `#73B200`
- [ ] 卡片圆角 4px；浅描边或 `lt2` 填充；阴影克制
- [ ] 无饱和 lime 满铺条 + 浅字
- [ ] 页脚 Plex Mono，文案正确
- [ ] 颜色来自 `var(--ppt-*)`，无随手 hex
- [ ] 流程图样式符合 [`ppt-flowcharts.md`](ppt-flowcharts.md)（四类卡 + 线型 `--none`/`--single`/`--double`，`#73B200` 1.5px；无 `#67E8F9`）

---

## P2 · 叙事

- [ ] 每页一个目的、一个主标题 claim
- [ ] UNS 价值在功能清单之前（除非改既有故事）
- [ ] Source Flow → Namespace → Event Flow 顺序正确
- [ ] 无不可验证客户名 / 机密数据
- [ ] 下一步具体（PoC、技术深潜、集成工作坊）

---

## P3 · 打磨

- [ ] 深浅节奏：不过连续 3 页同色无断点
- [ ] Lucide 统一 stroke 1.75，不混 filled 集
- [ ] 图示线宽一致；标签 ≥14pt 等效
- [ ] 占位文案易替换（`{{customer}}` 或明确 TODO）
- [ ] `data-slide-type` 与 A–E 版式一致，无自造结构

---

## 快速 grep（HTML deck）

```bash
# 应无结果
rg -i 'freezonex|file://|/Users/|poppins' path/to/deck.html
rg 'data-slide-type' path/to/deck.html   # 每页应有
```

---

## 维护

新踩坑按重要性写入对应 P 级，并同步 [`surfaces/ppt/checklist.md`](../surfaces/ppt/checklist.md) 摘要（可选）。
