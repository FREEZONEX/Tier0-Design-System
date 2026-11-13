import { cn } from '@tier0/utils';
import _ from 'lodash';
import { useTranslations } from 'next-intl';
import { CnAsyncButton } from './cn-async-button';
import { Button, type ButtonProps } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export type CnDialogOkButtonProps = Omit<
  ButtonProps,
  | 'onClick'
  | 'type'
  | 'asChild'
  | 'form'
  | 'formAction'
  | 'formEncType'
  | 'formMethod'
  | 'formNoValidate'
  | 'formTarget'
>;

const protectedOkButtonPropKeys = [
  'onClick',
  'type',
  'asChild',
  'form',
  'formAction',
  'formEncType',
  'formMethod',
  'formNoValidate',
  'formTarget',
  'loading',
  'disabled',
] as const satisfies readonly (keyof ButtonProps)[];

function normalizeOkButtonProps(okBtnProps?: CnDialogOkButtonProps) {
  const buttonProps = { ...(okBtnProps ?? {}) } as ButtonProps;
  const loading = buttonProps.loading;
  const disabled = buttonProps.disabled;

  protectedOkButtonPropKeys.forEach((key) => {
    Reflect.deleteProperty(buttonProps, key);
  });

  return {
    buttonProps: buttonProps as CnDialogOkButtonProps,
    loading,
    disabled,
  };
}

export interface CnDialogProps {
  children?: React.ReactNode;
  dialogTrigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  showOkBtn?: boolean;
  showCancelBtn?: boolean;
  showCloseIcon?: boolean;
  footer?: React.ReactNode | null;
  open?: boolean;
  defaultOpen?: boolean;
  loading?: boolean;
  onSubmit?: () => void | PromiseLike<unknown>;
  onCancel?: () => void; // 点击遮罩层或右上角叉或取消按钮的回调
  onOpenChange?: (open: boolean) => void;
  onInteractOutside?: (e: Event) => void; // 点击遮罩层时的回调，可以调用 e.preventDefault() 阻止关闭
  cancelBtnProps?: ButtonProps;
  okBtnProps?: CnDialogOkButtonProps;
  className?: string;
  triggerClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  footerClassName?: string;
  centerType?: 'translate' | 'flex';
  overflowScroll?: boolean;
  /** Portal 挂载点透传（缺省=radix 默认 body，行为不变）；非 dashboard 宿主的作用域容器注入口。 */
  container?: HTMLElement | null;
}

export function CnDialog({
  children,
  dialogTrigger,
  title,
  description,
  okText,
  cancelText,
  showOkBtn = true,
  showCancelBtn = true,
  showCloseIcon,
  footer,
  open,
  defaultOpen,
  loading = false,
  onCancel,
  onSubmit,
  onOpenChange,
  onInteractOutside,
  cancelBtnProps,
  okBtnProps,
  className,
  triggerClassName,
  headerClassName,
  titleClassName,
  footerClassName,
  centerType,
  overflowScroll = false,
  container,
}: CnDialogProps) {
  const t = useTranslations();
  const resolvedOkText = okText ?? t('ui.dialog.ok');
  const resolvedCancelText = cancelText ?? t('ui.dialog.cancel');
  const { buttonProps: restOkBtnProps, loading: okLoading, disabled: okDisabled } = normalizeOkButtonProps(okBtnProps);

  const handleOpenChang = (v: boolean) => {
    if (_.isFunction(onOpenChange)) {
      onOpenChange(v);
    } else {
      if (!v && _.isFunction(onCancel)) {
        onCancel();
      }
    }
  };

  const renderFooter = () => {
    if (footer === null) return null;
    if (footer) return footer;
    if (!showCancelBtn && !showOkBtn) return null;

    return (
      <DialogFooter className={cn('shrink-0', overflowScroll ? 'px-8' : '', footerClassName)}>
        {showCancelBtn && (
          <DialogClose asChild>
            <Button variant="outline" size="md" onClick={onCancel} disabled={loading} {...cancelBtnProps}>
              {resolvedCancelText}
            </Button>
          </DialogClose>
        )}
        {showOkBtn && (
          <CnAsyncButton
            type="button"
            size="md"
            {...restOkBtnProps}
            onClick={onSubmit}
            loading={Boolean(loading || okLoading)}
            disabled={okDisabled}
          >
            {resolvedOkText}
          </CnAsyncButton>
        )}
      </DialogFooter>
    );
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChang} defaultOpen={defaultOpen}>
      {dialogTrigger && (
        <DialogTrigger asChild className={cn(triggerClassName)}>
          {dialogTrigger}
        </DialogTrigger>
      )}
      <DialogContent
        showCloseButton={showCloseIcon}
        centerType={centerType}
        container={container}
        // 无 description 时 Radix 仍会把 aria-describedby 指向一个从未渲染的节点（悬空引用 + dev 警告）；
        // 官方摘除方式就是显式传 undefined，故此处条件展开而不是无条件传参。
        {...(description ? {} : { 'aria-describedby': undefined })}
        className={cn('max-h-[calc(100vh-2rem)]', overflowScroll ? 'flex flex-col px-0' : '', className)}
        onOpenAutoFocus={(e) => {
          e.preventDefault(); // 阻止默认的自动聚焦
        }}
        onInteractOutside={onInteractOutside}
      >
        <DialogHeader className={cn(overflowScroll ? 'shrink-0 px-8' : '', headerClassName)}>
          {title && (
            // 原生 tooltip 只对字符串标题有意义：ReactNode 标题 String() 出来是 [object Object]（Codex CR P2）
            <DialogTitle
              className={cn('max-w-[90%] truncate', titleClassName)}
              title={typeof title === 'string' ? title : undefined}
            >
              {title}
            </DialogTitle>
          )}
          {description && (
            // "asChild div" 修复p元素包裹div元素报错问题
            <DialogDescription asChild>
              <div>{description}</div>
            </DialogDescription>
          )}
        </DialogHeader>
        {overflowScroll ? (
          // DialogContent 本身撑到 max-h 后不再滚动（body 又被 Radix 锁滚），滚动必须发生在这层：
          // flex-col 复刻 DialogContent 的列布局，让已有调用方内部的 flex-1 嵌套滚动结构维持原有尺寸级联。
          // gap-[inherit] 取 DialogContent 自身算出的 gap（默认 gap-8，调用方可覆盖如 gap-5）套用到这层，
          // 让 children 之间的间距与未包裹前一致，无需在 CnDialog 上新增 gap 透传 prop（Codex #1982 3986937217）。
          <div className="flex min-h-0 flex-1 flex-col gap-[inherit] overflow-y-auto">{children}</div>
        ) : (
          children
        )}
        {renderFooter()}
      </DialogContent>
    </Dialog>
  );
}
