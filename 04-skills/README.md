# 04-skills

AI 调用规则。把 `00-foundation`、`01-tokens`、`02-components`、`03-brand` 打包成 AI 可以直接使用的 skill。

| Skill | 出口 | 用途 |
|---|---|---|
| [`tier0-ui`](tier0-ui/) | UI 界面 | 生成产品界面和页面 |
| [`tier0-web`](tier0-web/) | 官网 | 生成官网页面与区块 |
| [`tier0-slides`](tier0-slides/) | Slides | 生成 PPT / Slides |
| [`tier0-marketing`](tier0-marketing/) | 宣传物料 | 生成社媒图、海报等宣传物料 |

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
