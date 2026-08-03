# 配图提示词底稿 · Tier0

先读 [`illustration-slots-tier0.md`](illustration-slots-tier0.md) 决定 `imageRole` / `imageSlot` / 比例，再来本文件取提示词底稿。

**风格真源：** 概念插画必须使用 `tier0_illustration_style` 公式（与 `tier0-illustration-style` skill 一致）。本文件不再维护另一套「营销插画」口味。

---

## 通用硬规则

- 先锁槽位与比例，再生成；保存到 `images/{页号}-{slot短名}-{语义}.{ext}`
- 配图是 slide 内素材，**不要**生成页眉、页脚、页码、标题栏、角标、署名、装饰边框
- 同页 / 同组图：同一比例、同一视觉缩放、同一边距密度
- 文字语言跟随用户语言；插画默认 **无可读文字**
- 禁止：卡通、霓虹、AI 机器人、蓝紫 SaaS 渐变、stock 图、照片冒充插画

---

## 类型 A · Concept Illustration（`imageRole: illustration`）

句首触发词 + 具体工业场景。完整公式与负提示见 `illustration-slots-tier0.md` §4。

```text
tier0_illustration_style, [具体工业主体], [业务场景], isometric modular composition, warm off-white background, acid lime signal paths, thin olive technical linework, pale grey machinery, clean enterprise SaaS, [创新隐喻], [16:10|16:9|21:9], leave calm negative space for slide text, no readable text, no photorealism
```

**负提示：**

```text
photorealistic, stock photo, glossy 3d render, generic blue technology, cyberpunk neon, purple gradient, beige lifestyle illustration, watercolor, anime, childish cartoon, messy text, random logo, fake UI clutter, excessive glow, excessive shadows, blurry
```

### 常用场景底稿

**UNS / 数据地基**

```text
tier0_illustration_style, isometric unified namespace for multi-site factories, equipment publishing once into a governed data model, warm off-white background, factory islands connected to a central hub, floating schema cards, acid lime routing paths, thin olive technical linework, modular platform blocks, 16:10, no readable text, no photorealism
```

**App Builder / 生成应用**

```text
tier0_illustration_style, isometric industrial app builder turning a plain-language brief into a running shop-floor application, console linked to a UNS hub, warm off-white background, modular UI panels as abstract blocks without readable text, acid lime signal paths, thin olive linework, 16:10, no photorealism
```

**集成对照（点对点 → 统一）**

```text
tier0_illustration_style, isometric before-and-after of industrial integration, left tangled point-to-point cables between apps and machines, right clean publish-once namespace hub, warm off-white background, acid lime on the governed paths only, thin technical linework, 16:10, no readable text
```

**出海 / 多站点运营**

```text
tier0_illustration_style, isometric multi-region manufacturing operations on one data foundation, distributed factory islands linked by lime signal bridges to a central cloud hub, warm off-white background, modular blocks, thin olive linework, calm enterprise composition, 16:10, no readable text
```

---

## 类型 B · Product Evidence（`imageRole: product-evidence`）

真实截图优先。无截图时才用 mockup：

```text
生成一张 [16:10/21:9] 横向 Tier0 工业应用产品界面 mockup,主题是:[工作流/模板/仪表盘]。风格匹配 tier0.app:白底、IBM Plex 气质、flat 矩形面板、#F9F9F9 区块、选中态 #ECFFD2、稀疏 #B2ED1D marker、细黑分隔线、无阴影无大圆角。像真实 Builder 产品 UI,不是营销插画。不要 logo 水印、页眉页脚、PPT 外壳。文字使用[中文/英文],短标签即可。
```

截图裁切：`screenshot-framing.md`。

---

## 类型 C · Documentary（`imageRole: documentary`）

```text
生成一张 21:9 超宽横向纪实摄影配图,主题是:[页面概念]。Tier0 editorial documentary:高对比、低饱和、冷静克制、真实工业/办公/产品使用场景,构图有大量负空间,主体位于中央 70% 安全区,适合 S22 顶部横幅。不要 AI 机器人、科幻界面、商业摆拍、logo、水印或文字。只保留核心照片本身,不要 PPT 外壳。
```

---

## 类型 D · 信息图 / 数据块（谨慎）

优先改用原生组件（流程用 S11/`process-4`，数据用 `data-viz-tier0.md`）。仅当必须出图时：

```text
生成一张横向 Tier0 Style 工作流信息图,解释:[流程]。IBM Plex 气质、编号步骤、细黑横线、最后一步 #B2ED1D 绿圆、白底大留白。不要蓝紫非品牌色、渐变、3D、卡通。比例 16:10。不要 PPT chrome。
```

系统关系图优先 `architecture-native`，不要栅格化。

---

## 类型 E · S15 网格单张

同组锁定同一比例（21:9 或 16:10）：

**插画格**

```text
tier0_illustration_style, [证据主题的单一隐喻], warm off-white background, compact isometric spot illustration, acid lime accent only on the focal path, thin olive linework, identical margin density for a grid cell, 21:9, no readable text
```

**产品证据格**

```text
生成一张横向证据图,主题是:[证据 A/B/C]。Tier0 flat UI:直角模块、黑白灰、#B2ED1D 稀疏信号、相同边距。文字[中文/英文]短标签。比例与同组一致。不要 PPT 外壳。
```

---

## 写入 deck.json

生成后立刻回写：

```json
"imageRole": "illustration",
"imageSlot": "feature-split-right",
"image": "images/05-feature-split-uns-hub.png",
"imageAlt": "…",
"imageFit": "cover",
"imageAspect": "16:10",
"imagePrompt": "tier0_illustration_style, …"
```

然后跑：

```bash
node scripts/validate-tier0-illustrations.mjs 项目/deck.json
```
