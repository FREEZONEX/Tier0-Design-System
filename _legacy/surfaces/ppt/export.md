# PPT / HTML 交付

## PowerPoint

- 主题色通过 **设计 → 变体 → 颜色 → 自定义** 与 `tokens/deck.css` / [`sources/spec.ppt.md`](../../sources/spec.ppt.md) §2 对齐  
- 改版 Masterdeck 后更新 [`sources/spec.ppt.md`](../../sources/spec.ppt.md) 版本号  

## HTML 形态（摘要页、只读预览）

- 图片使用 **data URI** 或经审核的 **HTTPS CDN**  
- **禁止** `file://`、`./assets/`、`/Users/...`  
- 导出 PNG 先编码或上传，再写入 HTML  
- 体积大时压缩图或外链，仍不用本地路径  

## HTML Deck 全屏规则

- 交付给客户或内部演示的 deck HTML 必须是**全屏翻页**：`html`、`body`、`#deck` 占满 viewport；每页 slide 使用 `width: 100vw; height: 100vh`。
- 不要把整页内容包在居中的固定 `960px × 540px` / `1280px × 720px` 预览画框里；`preview/ppt/` 与交付 deck 均为全屏。
- 若需要保持 16:9 构图，用 slide 内部 safe area / `aspect-ratio: 16 / 9` 控制内容区，不要牺牲 slide 背景的全屏铺满。
- 封面、章节页、深色页背景必须延展到浏览器边缘，不露出外层灰底或黑底。

## 字体嵌入

演示包需嵌入：**Tektur、IBM Plex Sans、IBM Plex Sans SC、IBM Plex Mono**（**不要**嵌入 Poppins）  
这些字体已放入本仓库 `fonts/`，HTML 预览通过 `tokens/core.css` 本地加载；导出 PPT / 离线演示包时仍需在目标文件中嵌入同一套字体。
