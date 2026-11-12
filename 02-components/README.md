# 02-components

产品组件复刻自 Tier0-Frontend，代码在 `packages/` 下，可以直接引用。来源版本记录在 `packages/SOURCE`。

| 包 | 内容 |
|---|---|
| `packages/ui` | 组件库（`@tier0/ui`）：shadcn/ui 基础组件和 Tier0 封装 |
| `packages/theme` | 主题与 token 的 CSS 变量（`@tier0/theme`），亮色与暗色 |
| `packages/utils` | `cn()`、日期、下载等工具（`@tier0/utils`），`ui` 依赖它 |
| `packages/hooks` | 通用 hooks（`@tier0/hooks`），`ui` 依赖它 |

每个组件在 Tier0 里怎么用，见 [`guidelines/`](guidelines/README.md)。

只复制了这四个纯前端包，业务、gRPC、观测和 UNS 相关的包没有复制。

## 组件命名

| 来源 | 目录 | 命名 |
|---|---|---|
| shadcn/ui 基础组件 | `packages/ui/components/ui/` | 原名，如 `button.tsx` |
| shadcn/ui 二次封装 | `packages/ui/components/` | `cn-` 前缀，如 `cn-table.tsx` |
| 通用业务组件 | `packages/ui/components/` | `com-` 前缀，如 `com-avatar.tsx` |
| Ant Design 封装 | `packages/ui/components/` | `ant-` 前缀，如 `ant-table` |

## 怎么用

- 在 pnpm / npm workspace 里把 `02-components/packages/*` 加进 workspace，然后按包名引用：`import { Button } from '@tier0/ui'`。
- 样式：引入 `@tier0/theme` 的 `src/tailwind.css`（Tailwind v4）。

## 更新

不在这里手改组件代码。前端更新后，在仓库根目录运行：

```bash
scripts/sync-frontend-ui.sh ../Tier0-Frontend release
```
