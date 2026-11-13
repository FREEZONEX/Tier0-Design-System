import * as React from 'react';

import { cn } from '@tier0/utils';

interface InputProps extends React.ComponentProps<'input'> {
  icon?: React.ReactNode;
  wrapClassName?: string;
  highlightOnFocus?: boolean; // focus时是否高亮边框
  rightIcon?: React.ReactNode;
}

/**
 * 决定「本控件在父布局中如何参与排布」的工具类。
 *
 * Input 为承载 icon 渲染了一层 wrapper，父级布局看到的 flex 子项是 wrapper 而不是
 * 里面的 <input>。className 却落在 <input> 上，于是 `<Input className="flex-1" />`
 * 只让 input 在 wrapper 内部伸展，wrapper 自身宽度纹丝不动——伸展彻底失效，而写法
 * 本身没有任何报错。全仓 wrapClassName 仅 3 处在用，说明这层分工基本没被意识到。
 *
 * 这些类必须改挂到 wrapper 上才会生效；宽度、内边距、颜色等仍留在 <input>。
 */
const LAYOUT_UTILITY = /^(flex-(1|auto|none|initial)|grow(-\d+)?|shrink(-\d+)?|basis-.+|min-w-.+|max-w-.+)$/;

/** 剥掉 `md:` / `lg:` / `hover:` 等变体前缀后再判断，避免漏掉 `lg:flex-none`。 */
function isLayoutUtility(token: string): boolean {
  const base = token.slice(token.lastIndexOf(':') + 1);
  return LAYOUT_UTILITY.test(base);
}

/** 把 className 拆成「归 wrapper 的布局类」与「留在 input 的其余类」。 */
export function splitInputLayoutClasses(className?: string): { layout: string; rest: string } {
  if (!className) return { layout: '', rest: '' };
  const layout: string[] = [];
  const rest: string[] = [];
  for (const token of className.split(/\s+/).filter(Boolean)) {
    (isLayoutUtility(token) ? layout : rest).push(token);
  }
  return { layout: layout.join(' '), rest: rest.join(' ') };
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, wrapClassName, type, icon, highlightOnFocus = true, rightIcon, ...props }, ref) => {
    const { layout, rest } = splitInputLayoutClasses(className);
    return (
      // max-w-full 是移动端兜底：定宽写法（w-100 = 400px、w-96 = 384px 等）在 375px
      // 视口下本会顶破容器，加了它就退化成「最宽不超过父容器」。桌面端有余量时无影响。
      <div className={cn('relative flex max-w-full items-center', layout, wrapClassName)}>
        {icon && (
          <span className="text-muted-foreground pointer-events-none absolute left-3 flex items-center">{icon}</span>
        )}
        <input
          ref={ref}
          type={type}
          data-slot="input"
          className={cn(
            'border-input selection:bg-primary selection:text-primary-foreground file:text-foreground dark:bg-input/30 placeholder:text-text-placeholder flex h-9 w-full max-w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            // 'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
            // focus-visible样式调整
            highlightOnFocus && 'focus-visible:border-highlight-text focus-visible:shadow-input',
            'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
            // 校验失败时压掉上面那行的品牌绿高亮：focus-visible 是伪类，特异性高过 aria-invalid，
            // 不显式覆盖的话聚焦中的错误输入框会红边框外面套一圈绿。
            // 跟着 highlightOnFocus 走：调用方关掉内建高亮时本就没有绿色要压，
            // 再加这层会把它显式的 opt-out 变成一句空话。
            highlightOnFocus &&
              'aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:shadow-input-invalid',
            icon ? 'pl-9' : '',
            rightIcon ? 'pr-9' : '',
            rest
          )}
          {...props}
        />
        {rightIcon && (
          <span className="text-muted-foreground pointer-events-none absolute right-3 flex items-center">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
