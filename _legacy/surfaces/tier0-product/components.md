# 产品 UI — 组件

## Button

- 来源：`@tier0/ui` `Button`  
- 主：近黑 `bg-button-primary`  
- 强调：绿 `bg-button-highlight`  
- 图标按钮尺寸与相邻控件一致  

## 表单

- Ant Design / 共享输入组件  
- 字段配置、`rules`、`initialValues` 独立文件  
- 标签、占位、校验 i18n  

## 弹窗 `CnDialog`

- 标题 / 内容 / 底栏分明  
- 长内容独立滚动，避免整页跳动  

## 表格与列表

- 表头克制  
- 行操作低噪音，非每列强按钮  
- 截断 + tooltip  

## 卡片与 Tag

- 白/浅底 + 细边框  
- Tag 用现有状态 token；绿 tag ≠ success  

## Section label（营销风条，产品内少用）

若使用：`#F0FBD2` 底 + `#73B200` 字，18px — 见 `tokens/core.css` `.tier0-section-label`
