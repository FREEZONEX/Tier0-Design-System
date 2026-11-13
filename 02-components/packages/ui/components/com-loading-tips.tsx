'use client';

import { cn } from '@tier0/utils';
import { useEffect, useState } from 'react';

export interface ComLoadingTipsProps {
  /** 已翻译的 tips 文案;空数组不渲染,单条静态展示不轮播 */
  tips: readonly string[];
  /** 轮播间隔,默认 4s */
  intervalMs?: number;
  className?: string;
}

/**
 * Loading 场景的 tips 轮播(issue #1323):固定节奏顺序切换,淡入淡出交叉过渡。
 * 容器固定两行高,切换只变透明度不动布局;卸载即清定时器。
 * 文案由宿主注入(本组件跨 app 共享,不内置产品文案)。
 */
export function ComLoadingTips({ tips, intervalMs = 4000, className }: ComLoadingTipsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (tips.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % tips.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [tips.length, intervalMs]);

  if (tips.length === 0) return null;

  return (
    <div aria-live="polite" className={cn('relative h-10 w-72 max-w-[80vw] overflow-hidden text-center', className)}>
      {tips.map((tip, tipIndex) => (
        <p
          key={tipIndex}
          className={cn(
            'text-text-tertiary absolute inset-0 text-xs leading-5 transition-opacity duration-500 motion-reduce:transition-none',
            tipIndex === index % tips.length ? 'opacity-100' : 'opacity-0'
          )}
        >
          {tip}
        </p>
      ))}
    </div>
  );
}
