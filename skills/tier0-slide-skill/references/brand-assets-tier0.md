# Tier0 品牌素材库 · Brand Assets

官方品牌素材集中存放于 `assets/brand/`。生成销售 deck 时**优先引用这里的文件**，不要用文字拼写「TIER0」代替 Logo，不要自行改色或拉伸变形。

> 后续会继续追加截图包、图标、封面图等；新素材按同样目录结构登记到本文「素材索引」表。

---

## 目录结构

```text
tier0-slide-skill/assets/brand/
├── logos/                    ← 官方 Logo（已入库）
│   ├── tier0-logo-black.png  ← 浅底默认
│   ├── tier0-logo-white.png  ← 深底
│   └── tier0-logo-lime.png   ← 深底（备用，与 white 同系）
├── qr/
│   └── tier0-app-qr.svg      ← 官网二维码（www.tier0.app）
└── (future)/                 ← 后续素材按类型分子目录
```

---

## Logo · 官方横版标识

| 文件 | 尺寸 | 适用背景 | 说明 |
|---|---|---|---|
| `logos/tier0-logo-black.png` | 505×125 | **白底 / 浅灰底**（需要品牌标识的内容页） | 「TIER」为 `#050B14` 墨色，「0」为 `#B2ED1D` |
| `logos/tier0-logo-white.png` | 505×125 | **深底**（`#050B14`、`slide.dark`、封底左半） | 「TIER」白色，「0」亮绿 |
| `logos/tier0-logo-lime.png` | 505×125 | **深底**（与 white 同场景，备用） | 白字 + 绿「0」，透明底 PNG |

### 使用规则

- **禁止**：拉伸宽高比、加阴影/描边、改「0」的颜色、在 Logo 旁叠 accent 绿字
- **推荐高度**：chrome / 页脚 `24–32px`（宽按比例缩放，约 4:1）
- **留白**：Logo 四周至少留 `16px` 净距，不要紧贴 slide 边缘
- **放置位置**：需要品牌标识的内容页或封底 dark 半屏；默认 `cover-editorial` 与 `section-dark` 均不放 Logo。

### 生成 deck 时如何引用

1. 拷贝所需 Logo 到项目目录（与 `index.html` 同级相对路径）：

```bash
mkdir -p "项目/XXX/ppt/images/brand"
cp "<SKILL_ROOT>/assets/brand/logos/tier0-logo-black.png" "项目/XXX/ppt/images/brand/"
cp "<SKILL_ROOT>/assets/brand/logos/tier0-logo-white.png" "项目/XXX/ppt/images/brand/"
cp "<SKILL_ROOT>/assets/brand/qr/tier0-app-qr.svg" "项目/XXX/ppt/images/brand/"
```

2. HTML 引用（浅底示例）：

```html
<img
  src="images/brand/tier0-logo-black.png"
  alt="Tier0"
  class="tier0-logo"
  width="101"
  height="25"
  data-brand-asset="tier0-logo-black"
>
```

3. 深底封底需要 Logo 时改用 `tier0-logo-white.png` 或 `tier0-logo-lime.png`。`section-dark` 禁止 Logo。

### PPTX 导出

嵌入同一 PNG 文件；不要转曲后改色。若 slide 背景为白，用 black 版；背景为 ink，用 white 版。

---

## 素材索引（持续更新）

| ID | 类型 | 路径 | 状态 |
|---|---|---|---|
| `tier0-logo-black` | Logo | `assets/brand/logos/tier0-logo-black.png` | ✅ 已入库 |
| `tier0-logo-white` | Logo | `assets/brand/logos/tier0-logo-white.png` | ✅ 已入库 |
| `tier0-logo-lime` | Logo | `assets/brand/logos/tier0-logo-lime.png` | ✅ 已入库 |
| `tier0-app-qr` | QR code | `assets/brand/qr/tier0-app-qr.svg` | ✅ 已入库 · 官网 `www.tier0.app` |

**追加新素材时**：放入 `assets/brand/<category>/`，在本表增加一行，并在 `components-tier0.md` 或对应 reference 里补充用法（如有）。

---

## 与 VI 的关系

Logo 色与 token 对齐见 `tier0-vi-style-guide.md`：

- 墨字 / ink：`#050B14`
- 信号绿 / accent：`#B2ED1D`

Deck 内除 Logo 外，不要用文字模拟品牌标识。顶部 `TIER0 · PRODUCT CONCEPT` 属于 mono chrome 元数据，不作为图形 Logo 使用，也不模拟绿色「0」。
