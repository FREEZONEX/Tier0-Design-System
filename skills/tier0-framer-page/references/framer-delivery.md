# Framer delivery · 代码组件写法与验收

> 实现参考：[`../template/build.mjs`](../template/build.mjs)（生成的组件外壳）· [`../template/src/widget.js`](../template/src/widget.js)（渲染与交互）。

## 1. 交付形态

| 形态 | 结论 |
|------|------|
| **Code Component（.tsx）** | ✅ 默认。原生渲染、高度 Fit Content、可被 Framer 预渲染（SEO）、属性面板可配置 |
| Embed（HTML） | ⚠️ 仅兜底。iframe 固定高度，展开内容只能框内滚动；`srcdoc` 里拿不到页面 URL（复制链接需 `shareUrl`） |
| 把 .tsx 贴进 Embed | ❌ 不会渲染 — 用户反馈「显示不出来」时先排查这一点 |

## 2. 组件骨架（build.mjs 生成，勿手改）

```tsx
// @ts-nocheck
import { useEffect, useMemo, useRef, useState } from "react"
import * as Framer from "framer"                 // 命名空间导入：缺少 useLocaleInfo 时不报链接错误
const { addPropertyControls, ControlType, RenderTarget } = Framer

/** @framerSupportedLayoutWidth any-prefer-fixed
 *  @framerSupportedLayoutHeight auto
 *  @framerIntrinsicWidth 1200 */
export default function Component(props) {
  // 1. locale = 属性强制 || Framer.useLocaleInfo() || <html lang>（MutationObserver 监听）|| "en"
  // 2. initialHtml = createX(options).html()  → dangerouslySetInnerHTML（SSR 有真实内容）
  // 3. useEffect → mountX(ref.current, options)（画布里关闭快捷键与 hash 同步）
  return (<div style={{ width: "100%", ...props.style }}>
    <link rel="stylesheet" href={FONT_URL} />
    <style dangerouslySetInnerHTML={{ __html: CSS }} />
    <div ref={ref} className="t0sa" lang={locale} style={{ "--t0-scroll-offset": …, "--t0-gutter": …, "--t0-max": … }}
         dangerouslySetInnerHTML={{ __html: initialHtml }} suppressHydrationWarning />
  </div>)
}
addPropertyControls(Component, { /* 用 defaultValue，不用 defaultProps */ })
```

## 3. 坑位（都踩过）

| 症状 | 原因 | 做法 |
|------|------|------|
| Framer 里整块空白 | TSX 里 CSS 字符串被手加的 `"` 截断，文件编译失败 | CSS 只在 `src/widget.css` 改，build 用 `JSON.stringify` 嵌入 |
| 字体全没加载 | css2 链接含不存在的族（`IBM Plex Sans SC`）→ 整条 400 | 只放 Google Fonts 真实存在的族；中文走系统回退 |
| 选择器失效 + hydration 报错 | `<style>{css}</style>` 在 SSR 中把 `>` `'` 转义 | `<style dangerouslySetInnerHTML>` |
| hydration mismatch | 服务端与客户端算出的语言不同 | 客户端语言放进 `useState`，首帧与 SSR 一致，effect 后再切 |
| 画布里平板 / 手机还是桌面布局 | `@media` 看浏览器窗口，画布各断点共用窗口 | 根节点 `container: name / inline-size`，全部用 `@container` |
| 根节点无法按自身宽度改变量 | 容器不能查询自己 | 边距变量放子元素：`.wrap { --pad: var(--gutter) }`，手机档 `--pad: min(var(--gutter), 16px)` |
| 手机端分类滑不动 | Framer 发布页横向滚动被拦截 | 手机端平铺 / 竖排，不留 `overflow-x:auto` |
| toast 位置错乱 | 祖先 transform 让 `position:fixed` 失效 | 在按钮内反馈状态 |
| sticky 侧栏被站点导航遮住 | 导航高度未知 | 属性 Nav offset → `--t0-scroll-offset`，sticky top 与回滚偏移都用它 |
| 组件底色变成错位色块 | 组件自己画了背景 | 画布透明，只给卡片白底 |

## 4. 样式隔离

- 所有选择器挂在 2–4 字母根前缀下（模板为 `.t0sa`，新页面换自己的前缀）  
- 基础重置用 `:where()`，不抢 Framer 样式优先级  
- 颜色、字体、间距全用根上的 CSS 变量，方便站点侧覆盖

## 5. 验收清单（交付前，全部在最终 .tsx 上执行）

`node verify.mjs` 自动覆盖：

- [ ] 中 / 英 SSR 输出含正确语言标题  
- [ ] hydration 无 React 警告、无页面错误  
- [ ] 1440 窗口内 1440 / 730 / 390 画板宽度 + 390 真机触屏：无横向溢出  
- [ ] 分类筛选改变结果数（手机用 tap）；首条可展开  
- [ ] 截图写入 `out/verify/shots/`

人工再看：

- [ ] 截图逐张过一遍（对齐、截断、换行、空状态）  
- [ ] Hero 描述桌面一行；CTA 方形；无阴影；圆角 4px  
- [ ] `mailto` 地址、外链正确；复制链接在真实页面可用  
- [ ] 回复里写明：Framer 安装步骤、未在真实 Framer 编辑器中验证的部分
