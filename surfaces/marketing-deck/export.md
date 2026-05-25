# PPT / HTML 交付

## PowerPoint

- 主题色通过 **设计 → 变体 → 颜色 → 自定义** 与 `tokens/deck.css` / [`sources/spec.marketing-deck.ppt.md`](../../sources/spec.marketing-deck.ppt.md) §2 对齐  
- 改版 Masterdeck 后更新 [`sources/spec.marketing-deck.ppt.md`](../../sources/spec.marketing-deck.ppt.md) 版本号  

## HTML 形态（摘要页、只读预览）

- 图片使用 **data URI** 或经审核的 **HTTPS CDN**  
- **禁止** `file://`、`./assets/`、`/Users/...`  
- 导出 PNG 先编码或上传，再写入 HTML  
- 体积大时压缩图或外链，仍不用本地路径  

## 字体嵌入

演示包需嵌入：**Tektur、Poppins、IBM Plex Sans、IBM Plex Sans SC、IBM Plex Mono**  
这些字体已放入本仓库 `fonts/`，HTML 预览通过 `tokens/core.css` 本地加载；导出 PPT / 离线演示包时仍需在目标文件中嵌入同一套字体。
