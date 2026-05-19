# 产品 UI — 布局

## 全局壳层

- 固定左栏约 **220–240px**，背景 `#050B14`  
- 内容区白底 `#FFFFFF`，顶栏 + 主内容 flex  
- 参考：`ui_kits/tier0-product/index.html`

## 工作区三段

1. **Header** — 标题区 + 主/次操作（右对齐或标题行尾）  
2. **Controls** — 筛选、搜索、分段、批量（单行或双行紧凑）  
3. **Content** — 表格/树/编辑器；`flex:1; min-height:0` 滚动  

## 表格

- 行高 **48–56px**  
- 分隔 `#CCC` / `--tier0-border`  
- Hover / selected：`#F0FBD2`  

## 禁止

- 内部业务页大面积居中 Hero  
- 与任务无关的装饰背景  
