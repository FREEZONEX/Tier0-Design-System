# Tier0 · 主题色预设

本 skill **仅** 使用 Tier0 Green Signal，不可切换其他 accent。

---

## Tier0 Green Signal（默认且唯一）

| Token | 值 | 用途 |
|---|---|---|
| `--paper` | `#FFFFFF` | 页面主底 |
| `--ink` | `#050B14` | 主文字 |
| `--muted` | `#73777D` | 次要文字 |
| `--divider` | `#2B2D2F` | 结构线 |
| `--accent` | `#B2ED1D` | 信号色（marker / active / solid 卡底） |
| `--accent-text` | `#73B200` | 亮底上的 accent 文字（对比度足够） |
| `--accent-on` | `#050B14` | accent 底上的文字 |
| `--accent-pale` / `--surface-green` | `#ECFFD2` | 浅绿卡片底 |
| `--surface-grey` | `#EBEBEB` | 灰色卡片底 |
| `--surface-grey-soft` | `#F3F3F3` | 浅灰卡片底 |
| `--surface-ink` | `#050B14` | 黑色卡片底 |

### 色块比例（投屏友好）

- **80%** 白 / 近白（`--paper`、`--grey-1`）
- **12%** 黑（文字 + `--surface-ink` 卡）
- **5%** 灰（muted 字 + `--surface-grey` 卡）
- **3%** 绿信号（marker、pill、active step、solid 卡底）

每页建议至少 1–2 张 `--surface-grey` / `--surface-green` / `--surface-ink` 实底卡，避免整页 `#F9F9F9` 发飘。

### 禁止

- ❌ 第三方蓝 `#002FA7`、柠檬黄、安全橙等多色锚点
- ❌ 白底 `color:var(--accent)` 绿字
- ❌ 渐变、大阴影、圆角 >2px

---

## 封面 / 封底

| 页面 | 推荐 |
|---|---|
| 封面 | `TIER0-COVER-EDITORIAL` · 白底左侧 Logo / 大标题 / 演讲者信息 + 右侧亮绿动态 ASCII 点阵；PPTX 使用可编辑静态点阵降级 |
| 封底 | `TIER0-CLOSING-SPLIT` · 左 `#050B14` + ASCII / 右白底 takeaway |

可选：`slide.accent` 亮绿满屏页（示例模板内）— 文字必须用 `--accent-on` 黑字。

---

## Surface token 速查

见 `components-tier0.md` 卡片映射表；模板 `:root` 与 `<style>` 内 `--surface-*` 定义以 `assets/template-tier0.html` 为准。
