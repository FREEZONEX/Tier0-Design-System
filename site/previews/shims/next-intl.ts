// 门户里没有 Next.js：用前端 packages/ui 自带的中文词条替代 next-intl
import type { ReactNode } from 'react';
import zh from '@tier0/ui/i18n/zh-cn';
type Dict = Record<string, unknown>;
type Vals = Record<string, string | number | ((chunks: ReactNode) => ReactNode)>;
const lookup = (key: string) => (key.split('.').reduce<unknown>((o, k) => (o as Dict | undefined)?.[k], zh) as string) ?? key;
const fill = (text: string, values?: Vals) => text.replace(/\{(\w+)\}/g, (_, k) => (values && typeof values[k] !== 'function' ? String(values[k]) : `{${k}}`));
export function useTranslations() {
  const t = (key: string, values?: Vals) => fill(lookup(key), values);
  // t.rich：把 <tag>文字</tag> 交给 values 里同名函数渲染
  t.rich = (key: string, values?: Vals): ReactNode[] => {
    const out: ReactNode[] = [];
    const re = /<(\w+)>(.*?)<\/\1>/g;
    const text = fill(lookup(key), values);
    let last = 0, m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      out.push(text.slice(last, m.index));
      const fn = values?.[m[1]];
      out.push(typeof fn === 'function' ? fn(m[2]) : m[2]);
      last = re.lastIndex;
    }
    out.push(text.slice(last));
    return out;
  };
  return t;
}
