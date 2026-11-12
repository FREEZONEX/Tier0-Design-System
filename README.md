# Tier0 Design System

Tier0 的品牌与设计系统，同时服务对外的品牌宣传和对内的产品交付，并以 AI 可读的方式组织。


## 目录

| 目录 | 内容 |
|---|---|
| [`00-foundation/`](00-foundation/foundation.md) | 品牌故事、设计原则、品牌特征、约束与边界 |
| [`01-tokens/`](01-tokens/) | 基础真源：颜色、字体、间距、圆角、动效、音效 |
| [`02-components/`](02-components/) | 对内：产品界面组件与用法 |
| [`03-brand/`](03-brand/) | 对外：品牌资产：Logo、纹理、动画、音效、图片、图标、模版 |
| [`04-skills/`](04-skills/) | AI 调用规则：UI 界面、官网、Slides、宣传物料 |
| [`site/`](site/) | 设计系统门户网站：读取以上目录实时展示，本地用 `python3 -m http.server` 在仓库根目录启动后访问 `/site/` |
| [`DESIGN.md`](DESIGN.md) | 给 AI 和设计工具读的设计说明，按 Stitch 的 8 段格式写，由 `scripts/build_design_md.py` 从 `01-tokens/` 与 `scripts/design-md.body.md` 生成，不要手改 |
| [`changelog.md`](changelog.md) | 变更记录 |

## 依赖方向

```
00-foundation → 01-tokens → 02-components / 03-brand → 04-skills
```

`02-components` 和 `03-brand` 只能引用 `01-tokens` 的值，不自己定义颜色和数值。
