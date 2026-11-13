'use client';

import { useClipboard } from '@tier0/hooks';
import { cn } from '@tier0/utils';
import { Check, Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

interface ComClipboardProps {
  text: string; // 要复制的文本
  className?: string; // 按钮的额外样式
  size?: number; // 图标大小
  onCopy?: () => void; // 复制成功回调
}

/**
 * ComClipboard 组件
 * 使用 useClipboard 管理复制逻辑
 */
const ComClipboard: React.FC<ComClipboardProps> = ({ text, className, size = 14, onCopy }) => {
  const { copied, copy } = useClipboard(onCopy);
  const t = useTranslations();

  return (
    <button
      onClick={() => copy(text)}
      className={cn(
        'inline-flex items-center justify-center transition-colors',
        'text-text-tertiary hover:text-text-secondary cursor-pointer',
        className
      )}
      title={copied ? t('ui.clipboard.copied') : t('ui.clipboard.copy')}
    >
      {copied ? <Check size={size} className="text-success" /> : <Copy size={size} />}
    </button>
  );
};

export default ComClipboard;
