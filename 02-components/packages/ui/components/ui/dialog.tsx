'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { cn } from '@tier0/utils';

const DialogOpenContext = React.createContext<boolean | undefined>(undefined);

function Dialog({
  open: openProp,
  defaultOpen,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen ?? false);
  const open = openProp ?? uncontrolledOpen;

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (openProp === undefined) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [onOpenChange, openProp]
  );

  return (
    <DialogOpenContext.Provider value={open}>
      <DialogPrimitive.Root
        data-slot="dialog"
        open={openProp}
        defaultOpen={defaultOpen}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </DialogOpenContext.Provider>
  );
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  centerType = 'translate',
  container,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
  centerType?: 'translate' | 'flex'; // 考虑有些弹窗里需要全屏等处理，所以增加了flex模式（translate会让内部的fixed失效不准确）
  /** Portal 挂载点透传（缺省=radix 默认 body，行为不变）；非 dashboard 宿主的作用域容器注入口。 */
  container?: HTMLElement | null;
}) {
  const t = useTranslations();
  const open = React.useContext(DialogOpenContext);
  const stableChildrenRef = React.useRef(children);

  // Radix 会保留关闭态内容做退出动画，业务层同步清空状态时需要继续显示上一帧内容。
  if (open !== false) {
    stableChildrenRef.current = children;
  }

  const stableChildren = open === false ? stableChildrenRef.current : children;

  return (
    <DialogPortal data-slot="dialog-portal" container={container ?? undefined}>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={
          centerType === 'translate'
            ? cn(
                'bg-background data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-8 rounded-md border p-8 shadow-lg duration-200 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl [&>*]:min-w-0',
                className
              )
            : cn(
                'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 fixed inset-0 z-50 flex w-full items-center justify-center bg-transparent duration-200'
              )
        }
        {...props}
      >
        {centerType === 'translate' ? (
          <>
            {stableChildren}
            {showCloseButton && (
              <DialogPrimitive.Close
                data-slot="dialog-close"
                // 删除 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden
                className="ring-offset-background data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-8 right-8 cursor-pointer rounded-xs opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6"
              >
                <XIcon />
                <span className="sr-only">{t('ui.common.close')}</span>
              </DialogPrimitive.Close>
            )}
          </>
        ) : (
          <div
            className={cn(
              'bg-background z-50 grid w-full max-w-[calc(100%-2rem)] gap-8 rounded-md border p-8 shadow-lg duration-200 sm:max-w-2xl [&>*]:min-w-0',
              className
            )}
          >
            {stableChildren}
            {showCloseButton && (
              <DialogPrimitive.Close
                data-slot="dialog-close"
                // 删除 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden
                className="ring-offset-background data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-8 right-8 cursor-pointer rounded-xs opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6"
              >
                <XIcon />
                <span className="sr-only">{t('ui.common.close')}</span>
              </DialogPrimitive.Close>
            )}
          </div>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-4 text-center sm:text-left', className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('text-dialog-title h-8 text-2xl/8 font-semibold', className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
