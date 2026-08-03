# Tier0 双格式交付：一份源生成 HTML + 可编辑 PPTX

## 目录

1. 何时进入双格式模式
2. 单一数据源
3. 可编辑边界
4. 构建命令
5. Schema
6. 页面类型
7. 验收

## 1. 何时进入双格式模式

当 `intake/request.json` 的交付包含 `pptx` 或 `both` 时，从第一步就进入双格式模式。不要先自由写一份 HTML，再事后手工重建 PPTX。

双格式模式使用：

```text
deck.json
   ├── index.html   浏览器演示
   └── deck.pptx    PowerPoint 原生对象
```

HTML 与 PPTX 必须来自同一份 `deck.json`。禁止维护两份独立文案、页序或坐标。

若需求依赖视频、WebGL、iframe 或复杂交互：

- HTML 保留完整交互。
- PPTX 使用静态首帧或简化证据图。
- 在交付说明中列出降级项。
- 不要把整页截图铺满 PPTX 冒充“可编辑”。

## 2. 单一数据源

复制 starter：

```bash
cp <SKILL_ROOT>/assets/tier0-v4-dual-example.json 项目/deck.json
```

从 skill 根目录安装一次依赖：

```bash
npm install
```

构建：

```bash
node <SKILL_ROOT>/scripts/build-tier0-dual.mjs \
  --source 项目/deck.json \
  --html 项目/ppt/index.html \
  --pptx 项目/ppt/Tier0-deck.pptx
```

只生成 HTML：

```bash
node <SKILL_ROOT>/scripts/build-tier0-dual.mjs \
  --source 项目/deck.json \
  --html 项目/ppt/index.html \
  --html-only
```

## 3. 可编辑边界

PPTX 中以下对象必须是原生对象：

- 标题、正文、标签、页脚：独立文本框。
- 背景、卡片、强调条、网格、分隔线：PowerPoint shape / line。
- 简单流程与架构：原生 shape + connector。
- 图片、产品截图、照片：独立 picture 对象，可替换和裁切，但图片内部文字不可编辑。

以下情况允许是图片：

- 产品 UI 截图。
- 客户提供的照片。
- 复杂图表的静态证据图。
- 无法合理拆成 PowerPoint 对象的品牌插画。

验收不能只检查文件能否打开；必须确认主要文字能双击编辑，并且每页不是单张全屏图片。

## 4. 构建命令

构建脚本会：

1. 校验 `deck.json`。
2. 以 960 × 540 设计坐标生成自包含 `index.html`。
3. 将相同坐标按 `72 units = 1 inch` 映射到 13.333 × 7.5 inch PPTX。
4. 将 text / rect / line / image 分别生成文本框、形状、线条和图片。
5. 保留 HTML 键盘翻页、全屏缩放、页码和低干扰舞台。

脚本不会：

- 从任意 HTML 猜测 PowerPoint 结构。
- 把 CSS 动画翻译为 PowerPoint 动画。
- 自动把截图中的文字变成文本框。

## 5. Schema

最小结构：

```json
{
  "meta": {
    "title": "Tier0 Deck",
    "author": "Tier0",
    "subject": "Industrial Data Platform",
    "company": "Tier0",
    "language": "en-US",
    "theme": "tier0-v4-hybrid",
    "width": 960,
    "height": 540
  },
  "slides": [
    {
      "id": "01-cover",
      "kind": "cover-editorial",
      "chrome": "TIER0 · PRODUCT CONCEPT",
      "kicker": "UNS AGENT",
      "title": "Natural language,\ndriving real-time industrial operations.",
      "sideNote": "Headless MES +\nGenerative UI"
    }
  ]
}
```

所有坐标使用 960 × 540 设计单位。通用 `canvas` 页支持：

```json
{
  "id": "custom",
  "kind": "canvas",
  "background": "#FFFFFF",
  "elements": [
    {
      "type": "text",
      "x": 48,
      "y": 48,
      "w": 864,
      "h": 60,
      "text": "A native editable headline",
      "fontFace": "IBM Plex Sans",
      "fontSize": 32,
      "color": "#050B14",
      "bold": true
    },
    {
      "type": "rect",
      "x": 48,
      "y": 130,
      "w": 320,
      "h": 160,
      "fill": "#F3F3F3",
      "line": "#CDCED0",
      "lineWidth": 1
    },
    {
      "type": "line",
      "x": 48,
      "y": 315,
      "w": 864,
      "h": 0,
      "color": "#2B2D2F",
      "lineWidth": 1
    },
    {
      "type": "image",
      "x": 560,
      "y": 130,
      "w": 320,
      "h": 180,
      "src": "images/product.png",
      "alt": "Product evidence"
    }
  ]
}
```

文字可以使用 `runs` 做局部颜色和字重：

```json
{
  "type": "text",
  "x": 48,
  "y": 80,
  "w": 800,
  "h": 80,
  "fontFace": "IBM Plex Sans",
  "fontSize": 32,
  "runs": [
    { "text": "Build the foundation. ", "color": "#050B14", "bold": true },
    { "text": "Reuse every application.", "color": "#73B200", "bold": true }
  ]
}
```

## 6. 页面类型

构建器内置以下页面类型：

| `kind` | 用途 |
|---|---|
| `cover-editorial` | **默认封面**：白底左侧 Logo / 大标题 / 演讲者信息 + 右侧亮绿 ASCII 呼吸场。点阵与 `template-tier0.html` 用同一套四波噪声场和字符梯度 `   ...:::---+++***◦◦••▢▣`，HTML 动态呼吸、PPTX 落为 t=0 冻结帧的可编辑文本。标题字号按估算行数自适应（52→28px）。可选 `keyword` 渲染为 `[关键词]` 加粗前置行 |
| `cover-dark` | Legacy / opt-in 深墨封面；仅在用户明确要求时使用 |
| `section-dark` | Gallery S10 纯深墨转场：超大 IBM Plex 单句标题 + mono 章节标签 + 底部发丝线；无硬网格或装饰 |
| `challenge-3` | 三个挑战 + 底部结论 |
| `compare-2` | 双栏对比 |
| `feature-split` | 左侧主张 + 右侧能力 / 证据 |
| `cost-compare` | 两行成本公式对比 |
| `process-4` | 四阶段采用路径 |
| `closing-dark` | 深墨封底 |
| `canvas` | 任意原生对象组合 |

内置页型用于快速建立与 `Tier0 Intro - EN-V4.pptx` 相近的视觉节奏。复杂页面先用已登记页型；只有现有页型无法承载内容时才使用 `canvas`。

## 7. 验收

运行：

```bash
node <SKILL_ROOT>/scripts/validate-tier0-dual.mjs 项目/deck.json
node <SKILL_ROOT>/scripts/validate-tier0-pptx.mjs 项目/ppt/Tier0-deck.pptx
```

人工检查：

1. HTML 与 PPTX 页数、页序、文案一致。
2. HTML 在 16:9、4:3 投屏窗口中都不裁切。
3. PPTX 标题、正文、标签能双击编辑。
4. PPTX 每页有多个原生对象；不是一张全屏截图。
5. 图片保持比例，没有拉伸。
6. 深墨页与白底页交替形成节奏。
7. 荧光绿只用于路径、结论或关键数值。
8. 字体缺失时记录 Tektur / IBM Plex 的替换风险。
