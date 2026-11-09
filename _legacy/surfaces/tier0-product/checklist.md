# 产品 UI — Review 清单

提交 UI 前自查（摘自 [`sources/spec.product-ui.md`](../../sources/spec.product-ui.md) §13）。

## 风格一致性

- [ ] 整体仍是 workspace，非 landing page  
- [ ] 密度、边框、按钮语气与现有页一致  
- [ ] 无新主色 / 新圆角语言 / 新阴影风格  

## 颜色与 Token

- [ ] 使用 `--tier0-*` 或 Tailwind 语义 class  
- [ ] 无硬编码 hex / 默认 Tailwind 调色板  
- [ ] highlight / success / warning / error 语义正确  
- [ ] hover / focus / disabled / danger 反馈一致  
- [ ] 已跑 `pnpm check:ui-tokens -- <path>`（若在 monorepo）

## 组件复用

- [ ] 优先 `@tier0/ui` 与现有业务组件  
- [ ] 未在 feature 内重做基础按钮/表格/弹窗样式  

## 布局

- [ ] Header + Controls + Content  
- [ ] loading / empty / error 容器稳定  
- [ ] 滚动区清晰，无布局跳动  

## 文案

- [ ] 用户可见文案已 i18n  
- [ ] 按钮/空状态/错误文案直接可操作  

## 复杂场景

- [ ] 表单：配置已提取  
- [ ] 表格：列宽、tooltip、批量、行操作  
- [ ] 弹窗：高度、关闭路径、滚动区  
