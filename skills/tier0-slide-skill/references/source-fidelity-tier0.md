# 源稿保真（Source Fidelity）

适用于：**优化 / 重排已有 PPTX**、用户明确「内容不变」「视觉优化」「不要丢页」。

本文件优先于「为了好看而压缩页数」的冲动。Gallery / dual starter **不是**删页或丢素材的许可证。

## 硬规则（违反即失败）

1. **页数 1:1**  
   源 PPTX 有 N 页，交付 deck 必须仍是 N 页（或用户在对话里**明确书面批准**合并/删除某页）。禁止擅自 23→15、把「重复页」当可删而不问。

2. **素材不丢失**  
   源页上的插图、配图、截图、照片、图标条、视频/Demo 必须抽出并挂回对应页：  
   - 图片 → `images/{页号}-…`  
   - 视频 → `videos/{页号}-…`（HTML 可播；PPTX 用封面帧 + 注明原视频）  
   禁止用纯文字三卡/双栏把原图页「概括掉」。

3. **内容形状驱动版式，禁止套死 8 种 dual kind**  
   `cover-editorial / challenge-3 / compare-2 / feature-split / cost-compare / process-4 / section-dark / closing-dark` 只是**短稿 starter**。  
   源稿若有图文分栏、全出血图、Demo 屏、架构大图、案例长页：必须按该页形状用 `template-tier0.html` + Layout Gallery 语法（S15/S16/S08…）**动态改版**，不得整套压成同一种 `feature-split`。

4. **「内容不变」时的允许改动**  
   允许：层级、疏密、对齐、Tier0 色/字体、边距、把糊在一起的字拆成可读块。  
   禁止：改结论、删案例、删图、改数字、合并章节、用英文 stub 替换原文。

5. **省略必须可审计**  
   任何未进入交付的源页 / 源图 / 源视频，必须写入 `source/content-coverage.json` 的 `excludedWithRationale`，且**事先征得用户同意**。未同意不得排除。

## 优化已有 PPTX 的标准流程

```text
1. 解包 PPTX → 列出 slide 数、每页文字、每页 media 清单
2. 抽出全部 media 到项目 images/ / videos/
3. source-outline.json：每页一行（页码 / 标题 / 证据类型 / media 文件）
4. 逐页设计：保留该页结论与 media，只改排版语法
5. content-coverage.json：included 必须覆盖全部源页；excluded 为空或已批准
6. HTML：用 template-tier0.html 做 16:9 演示观感（不是 dual 扁平预览）
7. 若还要可编辑 PPTX：可双轨——HTML 保真演示；PPTX 用可编辑对象 + 嵌入图；或说明视频在 PPTX 降级为封面帧
```

## HTML 观感标准（用户投诉「尺寸/视觉不对」时看这里）

| 正确 | 错误 |
|------|------|
| `assets/template-tier0.html` 基座 + 组件类 | 把 `build-tier0-dual.mjs` 扁平绝对定位 HTML 当最终演示 |
| 画布 16:9，投屏约 1920×1080 检查 | 随意宽高、左右裁切、页脚压内容 |
| 每页按源内容疏密变化 | 连续多页同一套三卡/双栏 |
| 源图/视频在证据槽内完整可见 | 大 letterbox、裁掉主体、或整页无图 |

## 与 dual builder 的关系

- **绿场短稿 / 只要可编辑 PPTX 骨架**：可用 dual starter kinds。  
- **已有富媒体长稿优化**：先 HTML（template）保真；dual 不得成为删页删图的理由。  
- 若 dual schema 装不下某页结构：该页以 HTML 组件 + 嵌入图实现，PPTX 侧用「可编辑标题/正文 + 整块证据图」降级，并在 coverage 注明——**仍保留该页**，不删页。
