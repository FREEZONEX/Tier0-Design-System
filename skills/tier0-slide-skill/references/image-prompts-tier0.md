# GPT-M 2.0 配图提示词 · Tier0

用于 Codex 环境下为本 skill 生成 PPT 配图。提示词只负责定基调,不要写成长篇说明。先判断图片落位和比例,再选择类型。

## 通用规则

- 当前 deck 风格:**Tier0** — 白底编辑感、IBM Plex、flat product UI、稀疏 `#B2ED1D` 信号
- 基调:Tier0 product website section expanded into slides; calm, precise, operational, product-led
- 信息图、图表、截图再设计中的文字语言必须跟随用户语言
- 不生成卡通、3D、霓虹、AI 机器人、蓝紫 SaaS 渐变、stock 图
- 产品 UI 截图是第一公民（Product Evidence）
- 图片要给标题或正文留出可叠加空间,不要满屏堆细节
- 同一页或同一组图片必须使用同一比例、同一视觉缩放、同一边距密度
- 配图是嵌入 PPT 的素材,不是一张独立 slide:不要生成页眉、页脚、页码、标题栏、角标、署名、装饰边框或 slide chrome
- 生成后保存到 `images/`,命名为 `{页号}-{语义}.{ext}`

## 比例选择

| 用途 | 推荐比例 | HTML 落位 |
|------|---------|-----------|
| 章节封面 / 全屏主视觉 | 16:9 | `.frame-img.r-16x9` 或 hero 背景参考 |
| S22 顶部横幅 / Image Hero | 16:9 或 21:9 | `s22-hero-21x9` / `.frame-img.r-21x9` |
| 左文右图主图 | 16:10 或 4:3 | `.frame-img.r-16x10` / `.frame-img.r-4x3` |
| 信息图 / 系统关系图 | 16:9 或 16:10 | `.fit-contain` 或 `.frame-img.r-16x9` |
| 截图再设计 / UI 情景图 | 16:10 或 21:9 | S15 图片证据网格使用统一 `object-fit:cover` |
| 图片网格 | 统一横图 | `.frame-img.h-22` / `.frame-img.h-26` |

## 图片标准化策略

1. 先选目标槽位,再生成图片
2. 原始截图先读 `screenshot-framing.md` 做 programmatic framing
3. 每个提示词末尾补规格约束（比例、无 PPT chrome、同组一致）

---

## Tier0 配图硬规则

- 视觉锚点:Tier0 product website (`tier0.app/builder`, `tier0.app/pricing`)、IBM Plex、flat industrial app UI
- 构图:白底、大留白、细黑 `#2B2D2F` 分隔线、矩形 flat surface、产品 UI 作证据
- 色彩:80% 白/近白、12% 黑、5% 灰字、3% `#B2ED1D` 信号；**禁止 `#002FA7` 等#002FA7 非品牌色**
- 禁止:渐变、重阴影、圆角 >2px、AI 机器人、cyberpunk、consulting 密集页、stock 图
- UI 截图/mockup 必须像真实 Tier0 Builder/Platform 产品界面
- 21:9 图片核心主体落在中央 70% 安全区

### Tier0 类型 1:Product Evidence / UI Mockup

```text
生成一张 [16:10/21:9] 横向 Tier0 工业应用产品界面 mockup,主题是:[工作流/模板/仪表盘]。风格匹配 tier0.app:白底、IBM Plex 气质、flat 矩形面板、#F9F9F9 区块、选中态 #ECFFD2、稀疏 #B2ED1D marker、细黑分隔线、无阴影无圆角。像真实 Builder 产品 UI,不是营销卡片。不要 logo 水印、页眉页脚、PPT 外壳。文字使用[中文/英文],短标签即可。
```

### Tier0 类型 2:纪实照片 / S22 Hero

```text
生成一张 21:9 超宽横向纪实摄影配图,主题是:[页面概念]。Tier0 editorial documentary:高对比、低饱和、冷静克制、真实工业/办公/产品使用场景,构图有大量负空间,主体位于中央 70% 安全区,适合 S22 顶部横幅。不要 AI 机器人、科幻界面、商业摆拍、logo、水印或文字。只保留核心照片本身,不要 PPT 外壳。
```

### Tier0 类型 3:Workflow / 信息图

```text
生成一张横向 Tier0 Style 工作流信息图,解释:[从需求到发布的流程]。使用 IBM Plex 气质、5 步编号、细黑横线、黑底圆编号、最后一步 #B2ED1D 绿圆、白底大留白。不要#002FA7 非品牌色、渐变、3D、卡通。比例 16:10。只保留核心信息图,不要 PPT chrome。
```

### Tier0 类型 4:系统关系图

```text
生成一张横向 Tier0 Style 信息图,解释:[概念/流程/系统关系]。12/16 列网格、直角模块、1px 发丝线、黑白灰和少量 #B2ED1D accent。图中文字使用[中文/英文],每个标签不超过 8 个字/词。不要渐变、阴影、圆角、3D、卡通、霓虹或 SaaS 模板感。比例 [21:9/16:10]。
```

### Tier0 类型 5:多图网格单张（S15）

```text
生成一张横向证据图,主题是:[证据 A/B/C]。Tier0 Style:直角模块、黑白灰、#B2ED1D 稀疏信号、相同边距与线条粗细。图中文字使用[中文/英文],短标签即可。比例 [21:9/16:10],适合 S15 统一图片格。不要 PPT 外壳。
```

### Tier0 类型 6:Template Library Grid 单张

```text
生成一张 Template surface 证据图,应用名:[模板名称]。背景 #F6FFE8 或 #ECFFD2,顶部小绿方块 marker,标题区留白,下半区 flat 产品截图,无阴影无大图标。21:9 或 16:10,适合 S15 图片证据网格。
```

### Tier0 类型 7:数据块

```text
生成一张横向 Tier0 Style 数据图,核心数据是:[数字/对比/排名]。极大无衬线数字、1px 发丝线、直角色块、黑白灰和 #B2ED1D accent。图中文字使用[中文/英文],只保留必要标签。不要渐变、阴影、圆角、3D。比例 [16:9/16:10]。
```
