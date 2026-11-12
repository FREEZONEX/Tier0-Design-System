import { cn } from '@tier0/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

// 根据工作区名称哈希到固定配色，保证同名始终显示相同颜色。
// 取 @tier0/theme 的分类标识色板（--tier0-cat-*）：它专门表达「哪一个」而非状态，
// 所以这里不复用 success / error / warning 那几组语义色。换配色改 themes.scss。
const AVATAR_THEMES = [
  { bg: 'var(--tier0-cat-1-bg)', text: 'var(--tier0-cat-1-fg)' }, // red
  { bg: 'var(--tier0-cat-2-bg)', text: 'var(--tier0-cat-2-fg)' }, // yellow
  { bg: 'var(--tier0-cat-3-bg)', text: 'var(--tier0-cat-3-fg)' }, // violet
  { bg: 'var(--tier0-cat-4-bg)', text: 'var(--tier0-cat-4-fg)' }, // green
  { bg: 'var(--tier0-cat-5-bg)', text: 'var(--tier0-cat-5-fg)' }, // orange
  { bg: 'var(--tier0-cat-6-bg)', text: 'var(--tier0-cat-6-fg)' }, // blue
  { bg: 'var(--tier0-cat-7-bg)', text: 'var(--tier0-cat-7-fg)' }, // cyan
  { bg: 'var(--tier0-cat-8-bg)', text: 'var(--tier0-cat-8-fg)' }, // fuchsia
];

function nameToThemeIndex(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % AVATAR_THEMES.length;
}

export function getWorkspaceAvatarTheme(name: string) {
  return AVATAR_THEMES[nameToThemeIndex(name)];
}

interface ComAvatarProps {
  name?: string;
  src?: string;
  className?: string;
  fallbackClassName?: string;
}

// Given: 工作区名称 + 可选头像 URL When: 渲染 Then: 有图显图、无图显首字母 + 主题配色
export default function ComAvatar({ name = '', src, className, fallbackClassName }: ComAvatarProps) {
  const { bg, text } = getWorkspaceAvatarTheme(name);
  const initial = name.charAt(0).toUpperCase();

  return (
    <Avatar className={cn('size-8', className)}>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback className={fallbackClassName} style={{ background: bg, color: text }}>
        {initial}
      </AvatarFallback>
    </Avatar>
  );
}
