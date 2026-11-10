# 02-components

产品组件以前端组件库为准：`Tier0-Frontend/packages/ui`。本目录不再另写一套组件。

| 来源 | 目录 | 命名 |
|---|---|---|
| shadcn/ui 基础组件 | `packages/ui/components/ui/` | 原名，如 `button.tsx` |
| shadcn/ui 二次封装 | `packages/ui/components/` | `cn-` 前缀，如 `cn-table.tsx` |
| 通用业务组件 | `packages/ui/components/` | `com-` 前缀，如 `com-avatar.tsx` |
| Ant Design 封装 | `packages/ui/components/` | `ant-` 前缀，如 `ant-table` |

门户网站的「组件」页按前端组件的尺寸、圆角、颜色和状态还原展示，用于查阅和对齐；代码以前端仓库为准。

此前在本仓库定义的组件（按钮、面板、取景框、读数等）已移到 `_legacy/02-components-v1/`，暂不使用。
