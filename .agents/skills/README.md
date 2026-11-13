# .agents/skills

AI 调用规则。把 `00-foundation`、`01-tokens`、`02-components`、`03-brand` 打包成 AI 可以直接使用的 skill。

| Skill | 出口 | 用途 |
|---|---|---|
| [`tier0-design`](tier0-design/SKILL.md) | 全部 | 总入口：品牌语境、取舍顺序、场景判断、分阶段工作、品牌图形和海报做法；规范数值在根目录 `DESIGN.md` |
| [`tier0-ui`](tier0-ui/) | UI 界面 | 生成产品界面和页面 |
| [`tier0-web`](tier0-web/) | 官网 | 生成官网页面与区块 |
| [`tier0-slides`](tier0-slides/) | Slides | 生成 PPT / Slides |
| [`tier0-marketing`](tier0-marketing/) | 宣传物料 | 生成社媒图、海报等宣传物料 |

## 通用 UI 技能

不只针对 Tier0，用来审查和打磨界面。和上面的 Tier0 技能一起用时，以 Tier0 的规范（`DESIGN.md`、`02-components/guidelines/`）为准。

| Skill | 用途 |
|---|---|
| [`baseline-ui`](baseline-ui/SKILL.md) | 快速清理界面：间距、层级、字体和小的布局问题 |
| [`improve-ui`](improve-ui/SKILL.md) | 只读审查一个界面，找出有依据的问题，写成给其他 Agent 执行的改进计划 |
| [`create-design-md`](create-design-md/SKILL.md) | 从现有产品或网站整理出 `DESIGN.md`。注意：本仓库的 `DESIGN.md` 由 `scripts/build_design_md.py` 生成，在这里不要用它直接改写，改源文件后重新生成 |
| [`ui-skills-root`](ui-skills-root/SKILL.md) | 通过 `ui-skills` 命令行挑选最小够用的 UI 技能 |

## 每个 skill 的结构

```
<skill>/
├── SKILL.md       主要说明（When / What / How / Reference / Limit）
├── references/    从上游生成，不手写
├── assets/        本地资产
├── examples/      正反样例
└── gotchas.md     常见陷阱
```

## 编写规范

- `SKILL.md` 开头必须有 `name` 和 `description`，`description` 写清楚"什么场景下调用"。
- 正文包含五段：When（什么时候用）、What（解决什么问题）、How（怎么执行）、Reference（参考什么）、Limit（什么不能做）。
- `references/` 只能由脚本生成，不手写。
- 每个 skill 至少有一个正例和一个反例。
