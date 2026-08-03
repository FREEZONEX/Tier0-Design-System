# Tier0 生成前确认门（Intake Gate）

这是 Tier0 Slide Skill 的**唯一前置确认门**。它在读取/重构素材和开始版式设计之前执行；目标是把真正影响交付、叙事和封尾处理的选择写成项目内的可审计配置，而不是让用户在页面中选择风格。

Tier0 品牌系统固定：IBM Plex、IBM Carbon、黑灰基底、`#B2ED1D` 作为信号色、`#73B200` 用于白底绿色文字、证据优先和 Layout Gallery 的内容关系语法。**不得提供主题、字体或自定义品牌色选择器。**

## 启动方式

在项目目录创建前或刚创建后，启动本地确认页：

```bash
node <SKILL_ROOT>/scripts/start-tier0-intake.mjs --project 项目/客户名称
```

默认地址为 `http://127.0.0.1:5050`。端口冲突时可显式传入 `--port 5051`。用户点击确认后，服务会写入：

```text
项目/客户名称/
├── intake/
│   ├── request.json       # 生成配置的唯一权威
│   └── uploads/           # 用户原始上传；不得用通用素材替代
```

在设计前运行：

```bash
node <SKILL_ROOT>/scripts/validate-tier0-intake.mjs 项目/客户名称/intake/request.json
```

验证通过才进入 deck brief 和页级叙事映射。确认页不可用、用户明确要求纯聊天确认时，使用文末的聊天回退表单；仍须把得到的值写为同一 schema 的 `intake/request.json`。

## 必填确认项

| 字段 | 选项 / 输入 | 对生成的影响 |
|---|---|---|
| 交付物 | HTML、可编辑 PPTX、或两者 | HTML 是视频、交互与动效的视觉基准；PPTX 要保持文本、图表和架构节点可编辑。至少选一个。 |
| 封面元信息 | 是否显示；若显示则日期、演讲者姓名，职位可选 | 未开启时封面不得预留空的日期、姓名或职位区。 |
| 封底网站与二维码 | 显示 / 不显示 | 显示时必须用 Tier0 官网 `www.tier0.app` 与官方 QR；关闭时封底只保留结论/下一步，不得残留二维码、网址或空 CTA 位。 |
| 上传素材 | PPTX、PDF、文档、数据、图片、Demo 视频等 | 写入 `intake/uploads/`；它们优先于 Gallery 示例、通用图片与 AI 配图。 |

## 建议确认项

以下字段不改变品牌，却能显著改善叙事和版式决策，因此放入确认页：

| 字段 | 用途 |
|---|---|
| 使用场景 | 销售/售前、产品 Demo、管理层汇报、实施方案、培训；决定密度和 CTA。 |
| 核心受众 | 决定术语层级、证据类型和技术深度。 |
| 主要语言 | `zh` / `en` / `bilingual`。`zh` 或 `en`：**禁止**在正文下再挂另一语言的复述句（专有名词除外）。仅当用户明确要求对照翻译时才用 `bilingual`，且需分栏或分页，不要句内夹注。 |
| 预计时长 | 决定页数、节奏与每页信息密度。 |
| 原有材料处理 | 默认 `source-faithful`：保留章节、层级和全部事实；`preserve` 尽量保留页序结构；`adaptive` 保留事实但可重构叙事；`rebuild` 将材料作为来源重新规划。后两者需要用户明确选择。 |
| 公开资料策略 | `no` 仅使用提供内容；`verify` 仅核验已提及事实；`yes` 可补充必要公开证据。任何新增数据仍须标来源。 |
| 必须保留 / 必须避免 | 锁定客户措辞、架构节点、禁用主张或视觉限制。 |
| 素材说明 | 用一句话补充这套演示要帮助观众理解、决定或执行什么。 |

不纳入本页的内容：自定义视觉风格、可任意替换的主色、字体选择、无目的的动画偏好。这些会破坏 Tier0 的可复用性；动效、图表和抽象插图由内容关系及 Layout Gallery 决定。

## 配置消费规则

`intake/request.json` 是**交付与演示约束**的最高权威；原始文档、PPTX、数据表和用户上传素材仍是事实、数字、案例与架构名称的最高权威。配置不能改写事实。

1. 读取 `delivery` 决定输出目录与验收范围；双交付时 HTML 与 PPTX 页序、文字、数字与品牌 token 一致。
2. `cover.showMetadata: false` 时使用纯标题封面；为 true 时展示 `date` 和 `speakerName`，`speakerRole` 有值才展示。
3. `closing.includeWebsiteAndQr: true` 时 closing 页写 `data-closing-cta="tier0-app"`，并加入 `data-website-qr="tier0-app"`、`data-image-slot="tier0-app-qr"` 和可见文字 `www.tier0.app`。二维码静区至少 12px，最小可视码区 72×72px，亮绿不能作为码本体。
4. `closing.includeWebsiteAndQr: false` 时 closing 页写 `data-closing-cta="none"`；禁止出现二维码、官网网址、空白二维码容器或假 CTA。
5. 根据 `narrative.sourceTreatment` 决定保留/重构程度；根据 `researchPolicy` 决定是否浏览或补充外部证据。
6. 根据素材和叙事从 Layout Gallery 选结构语法。不能因 intake 页面存在，就把每页变成同一种卡片。
7. `language=zh` 时遵守 `composition-craft-tier0.md`：全文中文、无英文复述句、中文深墨标题行高 ≈1.14；`language=en` 时全文英文。

## 聊天回退表单

仅在无法启动本地确认页或用户明确拒绝网页时，一次性询问并等待用户确认：

```text
Tier0 生成前确认
1) 交付：HTML / 可编辑 PPTX / 两者？
2) 封面是否显示日期与演讲者？若需要：日期、姓名、职位（可选）。
3) 封底是否显示 www.tier0.app 与官网二维码？是 / 否。
4) 请上传或列出要使用的 PPTX、文档、图片、视频、数据文件。
5) 场景、受众、语言、预计时长？
6) 原有材料：尽量保留 / 保留事实可重构 / 完全重新规划？
7) 可否补充公开资料：不补充 / 仅核验 / 可补充？
8) 必须保留或必须避免什么？
```

用户明确确认后，按页面服务同样的 JSON 字段落盘，再开始设计。不要先生成页面、后补问这些会改变交付的选择。
