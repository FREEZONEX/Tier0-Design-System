# Demo Prototypes · Tier0

## 目的

Demo 只用于帮助销售讲清一段**已有**产品流程，例如「从需求到发布」「连接一个数据源」。  
**不是产品设计稿，不重新设计后台界面，不做交互稿或组件探索。**

## 先选证据类型

| 证据强度 | 使用条件 | 做法 |
|---|---|---|
| 真实产品录屏 / 截图（默认） | 用户提供了真实页面或录屏 | 录屏放入 S16；关键单帧放入 S22 / S15，并标注任务和当前状态 |
| 概念插画 | 没有界面素材，又必须表达概念 | 用 `imageRole: illustration` + `tier0_illustration_style`；明确不是产品截图 |
| 占位 | 证据待补 | 灰框 + 待补说明；不要用假 UI 填空 |

**禁止：** 手绘 / 生成产品后台 mockup、通用 SaaS Dashboard、为「看起来像产品」而编造界面。

## Demo 边界

1. 一页只讲一个任务：输入 → 处理 → 已完成。
2. 界面必须来自真实素材；图标可用 IBM Carbon，Logo 用官方资产。
3. 页面外壳保持 Tier0 deck 语法：白底、直角、发丝线、少量 `#B2ED1D`。
4. 必须有静态最终状态；`B` 静态模式与键盘翻页可读。
5. 若嵌入受控网页预览，只能复现既有产品路径，不得借机改版 UI。

## S16 Demo Evidence Player（视频）

S16 是展示单个真实产品任务的首选模板：左侧说明「看什么、为何重要」，右侧是 **16:9 直角播放器框**，放入真实录屏或关键截图。

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

## 验收

- [ ] 证据来自真实截图 / 录屏，或明确标注的概念插画
- [ ] 没有生成式产品 UI mockup
- [ ] 一页一个任务；静态模式可读
