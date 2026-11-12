/**
 * 规范化用户可见名称：去除首尾空白，并把中间连续空白折叠成单个普通空格。
 *
 * 用于「所见即所打」的比对/展示场景（如删除确认输入框），避免名称因首尾或
 * 中间脏空格导致用户肉眼无法分辨、无法精确复现输入。JS 的 \s 与 trim() 已
 * 覆盖普通空格、不间断空格( )、全角空格(　) 等空白类字符。
 */
export function normalizeName(value: string | undefined | null): string {
  return (value ?? '').trim().replace(/\s+/g, ' ');
}
