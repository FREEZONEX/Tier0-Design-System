import * as React from 'react';

import { cn } from '@tier0/utils';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  highlightOnFocus?: boolean; // focus时是否高亮边框
}

// React 18 宿主兼容（2026-07-16）：ref 必须经 forwardRef 转发到原生 textarea。React 19 下 ref 是
// 普通 prop、经 {...props} 恰好透传（dashboard 一直靠这个隐式行为）；React 18 宿主（Enterprise
// 私有化）会把函数组件上的 ref 静默丢弃，uns-agent chat-composer 的 textareaRef 拿不到节点，
// @ 提及弹窗定位失效。forwardRef 在两个 React 大版本下行为一致，对不传 ref 的调用方零影响。
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, highlightOnFocus = true, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(
          'border-input placeholder:text-text-placeholder aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          // 'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
          // focus-visible样式调整
          highlightOnFocus && 'focus-visible:border-highlight-text focus-visible:shadow-input',
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
