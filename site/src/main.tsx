// React 入口。全局样式与组件库只存在于本地（见 .gitignore），
// 用 import.meta.glob 加载：本地缺少这些文件时不会导致构建失败。
import.meta.glob('./styles/globals.css', { eager: true })
import '../assets/site.css'
import './islands'
import './hero/workbench'
import qrcode from 'qrcode-generator'
// 名片编辑器用它生成二维码（site.js 是普通脚本，从 window 上取）
;(window as unknown as { qrcode: typeof qrcode }).qrcode = qrcode
document.dispatchEvent(new CustomEvent('t0:qr-ready'))
