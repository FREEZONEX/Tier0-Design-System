# Surface — Tier0 产品 UI

> 提炼自 [`sources/spec.product-ui.md`](../../sources/spec.product-ui.md)（同步自 `Downloads/DESIGN.md`）。工程实现以 monorepo `packages/theme`、`packages/ui` 为准。

## 定位

回答：产品界面应呈现什么气质、新页面遵守哪些规则、token/组件去哪查。

**不负责：** Monorepo 工程规范、组件 API 逐字段说明（见 `CLAUDE.md`、`packages/ui`）。

## 设计目标

- 精确、克制、**产品工具**，非营销落地页  
- **高密度** enterprise workspace  
- 层级靠排版、边框、间距 — 非重装饰  
- 中性色为主，**FX Green** 作强调，非满屏主色  

## 与其他场景差异

| 维度 | 产品 UI | 官网 | PPT |
|------|---------|------|-----|
| 布局 | Header + Controls + Content | 长滚动叙事节 | 幻灯片版式 |
| 密度 | 高 | 中 | 低 |
| 主按钮 | **近黑** + 绿高亮 | 轻量 CTA | 少按钮 |
| 标题字体 | Plex Sans | Plex Sans | Tektur |
| 渐变/大 Hero | **禁止** | 节制 | 仅封面装饰 |

## 代码事实来源（产品仓库）

| 路径 | 内容 |
|------|------|
| `packages/theme/src/index.scss` | 主题入口 |
| `packages/theme/src/themes.scss` | 语义变量 |
| `packages/theme/src/variables.scss` | 原始色板 |
| `packages/theme/src/tailwind.css` | Tailwind token |
| `packages/ui/components` | 共享组件 |

优先语义 token + 共享组件，避免业务页局部覆盖。

## 设计原则（摘要）

### 层级优先

字号/字重、背景层次、边框、模块间距 — **不要**靠艳色底、插画、重阴影。

### 高密度优先

表单、筛选、表格、侧栏紧凑；主体结构 `header + controls + content`。除登录/向导外，不做居中展示型 Landing。

### 语义优先

- 黑：核心操作与主文字  
- 绿：高亮、激活、选中、进度 — **不等于** success 绿滥用  
- success / warning / error / info：用既有状态 token  

## 基础视觉

| 主题 | 规则 |
|------|------|
| 颜色 | `--tier0-*` → Tailwind 语义 class → 极少局部 |
| 排版 | `typo-h1`…`typo-h4`、`.label`、`.caption` |
| 间距 | 4px 栅格；常用 8/12/16/20/24；圆角 **4px** |
| 边框 | 面板/表格细边框；弹层可适度阴影；dashboard 卡片避免大软阴影 |

## 组件要点

| 组件 | 规则 |
|------|------|
| Button | `@tier0/ui`；一区一主操作；黑主按钮 / 绿高亮；i18n |
| 表单 | 紧凑；rules/initialValues 提取；勿 JSX 内联大段配置 |
| 弹窗 | `CnDialog`；稳定滚动区 |
| 表格 | 行 hover/selected 用既有 token；长文本 tooltip |
| 卡片/标签 | 白/浅底；绿=强调态非万能 success |

## 页面结构

```
Header    → 标题、描述、返回、主次操作
Controls  → 搜索、筛选、视图切换、批量操作
Content   → 表格 / 列表 / 画布 / 详情
```

- loading / empty / error 保持结构稳定  
- `min-h-0`、明确滚动容器  

## 动效与 i18n

- 短过渡：颜色、透明度、边框、阴影  
- AI/构建中可少量流动效果  
- **所有用户可见文案必须 i18n**  

## 风格化默认（无稿时）

- 默认工作台，非品牌展示页  
- 白/浅灰底 + 近黑文字 + FX Green 点缀  
- 禁止：紫蓝渐变、霓虹、深黑科技舱、新主色模块  

## 文档与检查清单

| 文件 | 内容 |
|------|------|
| [layout.md](layout.md) | 侧栏、工作区、表格密度 |
| [components.md](components.md) | 组件级 Do/Don't |
| [checklist.md](checklist.md) | UI Review 清单 |

## UI Kit

打开 [`ui_kits/tier0-product/index.html`](../../ui_kits/tier0-product/index.html) — Sidebar、NamespaceTree、TopicDetail 组合稿。

Token：[`tokens/product.css`](../../tokens/product.css)
