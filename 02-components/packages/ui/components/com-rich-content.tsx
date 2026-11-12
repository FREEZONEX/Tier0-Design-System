import { cn } from '@tier0/utils';

export type ComRichContentDensity = 'compact' | 'default';

export interface ComRichContentProps {
  html?: string;
  className?: string;
  density?: ComRichContentDensity;
}

const richContentClassName = [
  'max-w-full break-words text-text',
  // ponytail: ! 压过 @tier0/theme 未分层的全局 a{color}，改成 @layer base 影响面太大；链接色对齐邮件模板 #7ea815（highlight-text-accent，主人 2026-09-08 拍板）
  '[&_a]:text-highlight-text-accent! [&_a]:underline! [&_a]:underline-offset-2',
  '[&_blockquote]:my-2 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:text-text-secondary',
  '[&_code]:rounded [&_code]:bg-bg-tertiary [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono',
  '[&_h1]:mb-2 [&_h1]:font-semibold [&_h1]:text-text',
  '[&_h2]:mb-2 [&_h2]:mt-3 [&_h2]:font-semibold [&_h2]:text-text',
  '[&_h3]:mb-1.5 [&_h3]:mt-2.5 [&_h3]:font-semibold [&_h3]:text-text',
  '[&_img]:my-2 [&_img]:max-w-full [&_img]:rounded-md',
  '[&_li]:my-0.5',
  '[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5',
  '[&_p]:mb-2 [&_p:last-child]:mb-0',
  '[&_pre]:my-2 [&_pre]:max-w-full [&_pre]:overflow-auto [&_pre]:rounded-md [&_pre]:bg-bg-tertiary [&_pre]:p-2',
  '[&_pre_code]:bg-transparent [&_pre_code]:p-0',
  '[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5',
].join(' ');

const densityClassName: Record<ComRichContentDensity, string> = {
  compact:
    'text-xs leading-5 [&_h1]:text-base [&_h1]:leading-6 [&_h2]:text-sm [&_h2]:leading-5 [&_h3]:text-xs [&_h3]:leading-5',
  default:
    'text-sm leading-5 [&_h1]:text-xl [&_h1]:leading-5 [&_h2]:text-lg [&_h2]:leading-5 [&_h3]:text-base [&_h3]:leading-5',
};

export default function ComRichContent({ html = '', className, density = 'default' }: ComRichContentProps) {
  return (
    <div
      className={cn(richContentClassName, densityClassName[density], className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
