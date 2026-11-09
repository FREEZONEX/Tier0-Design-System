# 02-components

对内：产品界面组件。每个组件一个目录，包含代码（`src/`）和一份用法说明（`README.md`）。

## 用法说明怎么写

每个组件的 `README.md` 都按同一个 6 项模板填写（模板见 [`_template.md`](_template.md)）：

1. 是什么
2. 什么时候用
3. 什么时候不用（改用什么）
4. 变体
5. 状态
6. 必须 / 禁止

写法要求：每一条都是规定，不是建议；能写数字就写数字；"不用"一定要写"改用什么"。

## 组件清单

| 分组 | 组件 |
|---|---|
| 基础 | [按钮](button/)、[输入框](input/)、[选择器](select/)、[标签](tag/)、[图标](icon/) |
| 容器 | [面板](panel/)、[弹窗](dialog/)、[表格](table/)、[标签页](tabs/) |
| Tier0 特有 | [取景框](focus-frame/)、[信号点](signal/)、[路径](path/)、[读数](readout/)、[状态标签](status-tag/)、[AI](ai-message/) |

编写顺序：先写按钮、输入框、选择器、表格、弹窗，再写 Tier0 特有组件，最后补其余组件。

## 状态色对应

组件表达状态时只用下表的用途 token，不直接写原始色。原始色按色相命名、不带语义，状态和色相的对应关系以此表为准。

| 状态 | 用途 token（`color/light.json`） | 原始色（`color/base.json`） | 典型用法 |
|---|---|---|---|
| 成功 | `success-color` / `success-secondary` / `success-accent` / `success-tertiary` / `success-bg` | `auxiliary.green` | 完成、在线、校验通过 |
| 错误 | `error-color` / `error-secondary` / `error-accent` / `error-tertiary` | `auxiliary.red` | 失败、离线、校验不通过、危险操作 |
| 警告 | `warning-color` / `warning-strong` / `warning-fill` / `warning-secondary` / `warning-accent` / `warning-tertiary` | `auxiliary.yellow` | 需要注意、即将超限、用量接近上限 |
| 信息 | `blue-color` / `blue-secondary` / `blue-accent` / `blue-tertiary` | `auxiliary.blue` | 提示、更新中、处理中 |

层级用法（四种状态相同）：

| 后缀 | 用在 |
|---|---|
| `-color` | 文字、图标 |
| `-secondary` | 边框 |
| `-accent` | 无边框的背景 |
| `-tertiary` | 有边框的浅背景（最常用） |

搭配规则：深色前景 + 浅色背景，如 `success-tertiary` 背景配 `success-color` 文字，不反过来用。

其余辅助色（橙、青、紫、品红）不表达状态，只用于图表、分类标签等需要区分"哪一个"的场景。品牌绿 `fx-green` 只用于品牌强调，不表示"成功"。
