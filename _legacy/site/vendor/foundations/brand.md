# 品牌印象

**Tier0** — FREEZONEX 开源 UNS 工业数据平台。

## 气质三词

- **Industrial** — `#050B14` 深底，严肃工具感
- **Live** — `#B2ED1D` 实时数据流
- **Open** — IBM Plex，开发者与开源亲和

## Logo（强制 · Agent 零容忍）

| 文件 | 用途 |
|------|------|
| `assets/tier0-logo-lime.svg` | 深色底（侧栏、Hero、页脚） |
| `assets/tier0-logo-black.svg` | 浅色底导航 / 白底页头 |
| `assets/tier0-logo-white.svg` | 深底反白备用 |

产品 Cloud 控制台侧栏静态稿另见 **`tier0productdesign` → `references/brand-logo.md`**（`preview/assets/logo.svg` · 66×16）。

### 必须

1. 用 `<img>` / Next `Image` **引用上表官方文件**（或拷贝到交付目录后相对引用）。
2. **保留原始比例与颜色**；可缩放，不可拉伸变形、不可改 fill。
3. 交付目录内文件真实存在；打开最终 HTML/PPTX 能看见正确 Logo。
4. 底色与变体匹配：浅底 → black；深底 → lime（或 white 反白）。

### 禁止

```html
<!-- ❌ -->
<div class="logo">Tier0</div>
<span class="brand">TIER 0</span>
<svg><!-- 自行重绘的近似字标 --></svg>
```

- 字体拼写 / 字重模拟 Logo  
- 重绘、改色、拆绿竖条当装饰替代  
- 只写 `src` 不拷贝文件  
- 用截图 PNG、emoji、第三方近似 logo 替代  

执行契约总览：[`references/execution-contract.md`](../references/execution-contract.md)。

## 官网二维码（Marketing Deck 封底）

| 文件 | 用途 |
|------|------|
| `assets/website-qrcode-white.png` | 深底 slide（A2 封底）· 右下角 |
| `assets/website-qrcode-black.png` | 浅底 slide（备用）· 右下角 |

扫描目标：`https://tier0.app`。仅封底最后一页使用；摆放见 [`references/ppt-diagrams.md`](../references/ppt-diagrams.md) §封底二维码。

## Restraint

饱和 lime **只做高光**：Logo、Hero 挑词、数据流连线。大面积由 `#F0FBD2`、`#73B200`、`#CCF368` 承担。
