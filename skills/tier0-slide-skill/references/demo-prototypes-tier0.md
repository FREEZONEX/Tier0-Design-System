# Demo Prototypes · Tier0

## 目的

Demo 原型只用于帮助销售讲清一段真实产品流程，例如「从需求到发布」「连接一个数据源」「为角色分配应用」。它不是独立产品设计稿，也不是把页面做成通用 SaaS Dashboard。

## 先选证据类型

| 证据强度 | 使用条件 | 做法 |
|---|---|---|
| 真实产品录屏 / 截图（默认） | 有真实页面或录屏帧 | 录屏放入 S16；关键单帧放入 S22 / S17，并标注任务和当前状态 |
| 可点击 HTML 原型 | 没有截图，但必须现场演示一个状态变化 | 只实现 1 条主路径与 2–4 个状态 |
| 静态概念图 | 尚未有产品界面 | 用生成 PNG 表达概念；明确标记为 concept，不冒充产品 |

## 原型边界

1. 一页只讲一个任务：输入 → 处理 → 已完成，不能在同一页塞导航、设置、报表和管理台。
2. 优先使用真实 Tier0 UI、官方 Logo、IBM Carbon 图标与现有产品 token；无依据时不用「通用黑底 AI 控制台」。
3. 页面外壳保持 Tier0：白底、直角、发丝线、少量 `#B2ED1D` active 状态；不要新增渐变、阴影、圆角卡片体系。
4. 原型必须有静态最终状态，键盘翻页与 `B` 静态模式不能被内部滚动/动画劫持。
5. 原型内按钮只在确实演示状态变化时可点击；每个可点击元素都必须有可见反馈。

## S16 Demo Evidence Player（视频 / Live Web）

S16 是展示单个真实产品任务的首选模板：左侧说明「看什么、为何重要」，右侧是一个 **16:9 直角播放器框**。播放器可以替换为真实录屏、受限网页原型或一张关键产品状态；不把它改回多卡片概览。

```html
<div class="demo-player" aria-label="Builder demo: create and publish a shift handover app">
  <div class="demo-player__bar">
    <span>BUILDER · DEMO PREVIEW</span>
    <span>VIDEO · 16:9</span>
  </div>
  <div class="demo-player__stage">
    <video controls muted playsinline preload="metadata" poster="images/builder-demo-poster.png">
      <source src="media/builder-demo.mp4" type="video/mp4">
    </video>
  </div>
</div>
```

- 录屏优先使用 `<video controls muted playsinline preload="metadata">`：不自动播放声音，也不占用键盘翻页。
- 若使用 iframe，必须写 `sandbox`，只嵌入一个可演示的任务状态；不能抢滚轮、方向键或 ESC。
- 没有媒体资源时可使用受控 HTML 原型，但必须只包含一条路径与一个可见完成状态；不要画假 Dashboard。
- 播放器是直角黑色外框，内部媒体为 16:9；不使用圆角、浮层阴影或渐变。

## 其他证据容器

```html
<div class="demo-evidence" aria-label="Builder demo: review and publish a generated work order app">
  <div class="demo-evidence__bar">
    <span>BUILDER · REVIEW</span>
    <span class="demo-evidence__status">READY TO PUBLISH</span>
  </div>
  <div class="demo-evidence__stage">
    <!-- 优先放真实截图；原型只放这个受控区域内 -->
    <img src="images/builder-review.png" alt="Builder review screen showing a work-order app ready to publish" data-image-slot="s22-hero-21x9">
  </div>
</div>
```

用于 live 原型时，内部状态变化要限制在 `.demo-evidence__stage`；不要让 iframe 抢走页面的方向键、滚轮或 ESC。

## 推荐版式

- **S16**：一条产品任务的录屏 / live web / HTML 原型；左侧解释、右侧播放器证据。
- **S22**：一张关键产品状态 + 左上标题块 + 下方 2–3 个 KPI。
- **S17**：左侧论点/指标，右半灰色证据面板；适合架构或 Demo 前后状态。
- **S08**：地点、站点、系统节点与数据流关系。
- **S11**：四到五步任务流；每一步需是真实用户动作或系统状态。

## 交付前检查

- [ ] 有真实截图时，没有用手绘 SVG 或 AI UI 代替。
- [ ] 原型的产品名称、数字、状态与销售口径一致。
- [ ] 首帧和最终状态均可读；加载失败有静态 fallback。
- [ ] 所有交互都在 3 次操作内回到可讲解的主路径。
- [ ] 不存在未经证实的功能、客户数据或品牌 Logo。
