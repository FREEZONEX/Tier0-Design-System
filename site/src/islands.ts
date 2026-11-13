// 增强挂载点。页面先由 public/assets/site.js 渲染出可用的原生版本，
// 本地存在 src/local/<name>.tsx 时，再把同名 [data-island] 节点替换为增强版本。
// src/local/ 不进仓库；缺少时 glob 结果为空，网站保持原生版本，构建不受影响。
type Island = { mount: (el: HTMLElement, props: unknown) => () => void }

const modules = import.meta.glob<Island>('./local/*.tsx')
const mounted = new Map<HTMLElement, () => void>()

function nameOf(path: string) {
  return path.replace(/^.*\//, '').replace(/\.tsx$/, '')
}
const loaders = new Map(Object.entries(modules).map(([p, load]) => [nameOf(p), load]))

async function scan() {
  for (const [el, unmount] of mounted) {
    if (!el.isConnected) {
      unmount()
      mounted.delete(el)
    }
  }
  const nodes = document.querySelectorAll<HTMLElement>('[data-island]')
  for (const el of nodes) {
    if (mounted.has(el)) continue
    const load = loaders.get(el.dataset.island || '')
    if (!load) continue
    mounted.set(el, () => {})
    try {
      const props = el.dataset.props ? JSON.parse(el.dataset.props) : {}
      const mod = await load()
      if (!el.isConnected) continue
      mounted.set(el, mod.mount(el, props))
      el.dataset.enhanced = ''
    } catch (err) {
      mounted.delete(el)
      console.warn('[islands]', el.dataset.island, err)
    }
  }
}

if (loaders.size) {
  document.addEventListener('portal:render', () => void scan())
  void scan()
}
