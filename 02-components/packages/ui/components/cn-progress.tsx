'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@tier0/utils';

export interface CnProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  value?: number;
  color?: string; // 支持 Tailwind CSS 颜色类名，如 'bg-gray-600', 'bg-red-500', 'bg-orange-500'
  trackColor?: string; // 进度条背景色
  className?: string;
}

const CnProgress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, CnProgressProps>(
  ({ className, value, color = 'bg-primary', trackColor = 'bg-primary/20', ...props }, ref) => {
    return (
      <ProgressPrimitive.Root
        ref={ref}
        data-slot="progress"
        className={cn('relative h-2 w-full overflow-hidden rounded-full', trackColor, className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn('h-full w-full flex-1 transition-all', color)}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    );
  }
);

CnProgress.displayName = ProgressPrimitive.Root.displayName;

export default CnProgress;
