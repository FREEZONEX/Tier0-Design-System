/**
 * 从 HTML 字符串中提取纯文本内容
 */
export function extractTextFromHtml(html: string | undefined | null): string {
  if (!html) return '';
  // 创建一个临时 DOM 元素来解析 HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
}
