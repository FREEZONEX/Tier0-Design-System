# 官网 — 布局

## 容器

```css
.container {
  width: min(1280px, calc(100% - 80px));
  margin: 0 auto;
}
```

810px：`width: calc(100% - 48px)`  
480px：`calc(100% - 32px)`

## 间距节奏

| 场景 | 桌面 |
|------|------|
| 页顶 padding | 78px |
| 节间距 | 120px（移动 80px） |
| Eyebrow → H2 | 18px |
| 标题 → 正文 | 18px |
| 正文 → 媒体 | 28–36px |

## 双栏

- `1fr 1fr`，gap **64px**，顶对齐  
- 1100px 以下叠栏  

## 居中节

- Eyebrow、H2、短 intro 居中  
- 栅格距 intro **44px**

## 禁止

- 节与节之间交替过重色带  
- 装饰性竖分割线  
