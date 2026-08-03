# 颜色 — 共享语义

实现：`tokens/core.css`。各 surface 另有扩展（`tokens/website.css`、`tokens/deck.css`）。

## 使用顺序（产品 UI）

1. `--tier0-*` / `--fx-*` 语义变量  
2. Tailwind 语义 class（若在 monorepo 内）  
3. 极少量局部补充 — **禁止**业务页常规硬编码 hex  

## Lime 禁区（全场景）

| 允许 | 禁止 |
|------|------|
| Logo、深色 Hero 一字高光、流线图 | 浅色 UI 小按钮满铺 `#B2ED1D` |
| 选中/激活/进度（产品） | 整页荧光绿底 |
| PPT accent1 结构线 | 绿底上叠白字（PPT 对比不足） |

## 浅色产品 CTA

- 填充：`#CCF368`（`--fx-button-lime`）  
- 文字：`#333333`（`--fx-on-lime`）  

## 表格 / 列表 hover

- 使用 `#F0FBD2`，不用灰色行 hover  
