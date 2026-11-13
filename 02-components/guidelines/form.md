# 表单与焦点

> 摘要（Forms）：标签常驻在输入框上方；输入框高 `control-md`；焦点用 `shadow.focus`，出错时描边变 destructive，错误文字写在下方并说明怎么改。

- 标签放在输入框上方并保持可见（`label` 字阶），不只用占位符代替标签。
- 输入框、选择器高 `control-md`，边框用 `input` 色。
- 焦点按前端写法：输入框、选择器获得焦点时加 `shadow.focus` 外圈（校验失败时同形制，颜色换成 destructive）；按钮等其他控件用 `ring` 色 50% 透明度的 `border.3` 外圈，只在键盘操作时出现。
- 字段错误：输入框描边改为 destructive 并加对应的焦点外圈，错误文字写在输入框下方（`caption`，destructive），说明怎么改。
