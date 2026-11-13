import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@tier0/utils';
import { Loader } from 'lucide-react';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none cursor-pointer [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-button-highlight text-highlight-foreground hover:bg-button-highlight-hover',
        primary: 'bg-button-primary text-white shadow-xs hover:bg-button-primary-hover',
        destructive:
          'bg-button-destructive text-white shadow-xs hover:bg-button-destructive-hover focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-bg-tertiary hover:text-text dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-bg-accent text-text shadow-xs hover:bg-bg-tertiary',
        ghost: 'hover:bg-bg-tertiary hover:text-text dark:hover:bg-accent/50',
        link: 'text-text underline-offset-4 hover:underline',
      },
      /**
       * 改动点：
       * 1.所有按钮左右padding改为px-4 (16px)
       * 2.size改为大中小三种尺寸,默认用sm
       */
      size: {
        sm: 'h-8 rounded-md gap-1.5 px-4',
        md: 'h-9 rounded-md px-4 py-2',
        lg: 'h-10 rounded-md px-4',
        icon: 'size-9',
      },
      loading: {
        true: 'cursor-wait opacity-80',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
    /**
     * 前导图标。loading 时被 spinner **替换**（而非并列）——这是 `icon` 存在的唯一理由：
     * 图标写在 children 里时组件无从得知哪个是前导图标，只能在 spinner 之后再渲染一遍，
     * 于是"转圈 + 原图标"同时出现。带前导图标的 loading 按钮请一律用本 prop，
     * 不要把图标放进 children。
     */
    icon?: React.ReactNode;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  icon,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      disabled={loading || disabled}
      className={cn(buttonVariants({ variant, size, loading, className }))}
      {...props}
    >
      {/* 左侧 leading 槽位：loading 时是 spinner，否则是调用方传入的 icon，二者互斥 */}
      {loading ? (
        <Loader
          className={cn(
            'animate-spin',
            size === 'sm' && 'size-4',
            size === 'md' && 'size-5',
            size === 'lg' && 'size-5'
          )}
        />
      ) : (
        icon
      )}
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
