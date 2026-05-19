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
离线可从 [IBM Plex](https://github.com/IBM/plex) 获取 Sans / Mono；SC 需单独授权包。
