# Tier0 Design System

Tier0 的品牌与设计系统，同时服务对外的品牌宣传和对内的产品交付，并以 AI 可读的方式组织。

> 正在重塑中。旧版本内容暂存在 `_legacy/`，整理完成后删除，新内容不要引用它。

## 目录

| 目录 | 内容 |
|---|---|
| [`00-foundation/`](00-foundation/foundation.md) | 品牌故事、设计原则、品牌特征、约束与边界 |
| [`01-tokens/`](01-tokens/) | 基础真源：颜色、字体、间距、圆角、动效、音效 |
| [`02-components/`](02-components/) | 对内：产品界面组件与用法 |
| [`03-brand/`](03-brand/) | 对外：品牌资产：Logo、纹理、动画、音效、图片、图标、模版 |
| [`04-skills/`](04-skills/) | AI 调用规则：UI 界面、官网、Slides、宣传物料 |
| [`changelog.md`](changelog.md) | 变更记录 |

## 依赖方向

```
00-foundation → 01-tokens → 02-components / 03-brand → 04-skills
```

`02-components` 和 `03-brand` 只能引用 `01-tokens` 的值，不自己定义颜色和数值。
