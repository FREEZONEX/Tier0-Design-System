// React 入口。全局样式与组件库只存在于本地（见 .gitignore），
// 用 import.meta.glob 加载：本地缺少这些文件时不会导致构建失败。
import.meta.glob('./styles/globals.css', { eager: true })
import './islands'
import './hero/workbench'
