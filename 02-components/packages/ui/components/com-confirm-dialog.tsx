import { cn } from '@tier0/utils';
import { useTranslations } from 'next-intl';
import React from 'react';
import { CnDialog, CnDialogProps } from './cn-dialog';

// 默认是删除相关文案
interface ComConfirmDialogProps extends CnDialogProps {
  title?: string;
  deleteName?: string; // 需要删除的内容名称
  description?: React.ReactNode; // 自定义描述，未传时使用默认删除文案
  className?: string;
  okText?: string;
}
export default function ComConfirmDialog({
  title,
  deleteName,
  description,
  className,
  okText,
  okBtnProps,
  ...restProps
}: ComConfirmDialogProps) {
  const t = useTranslations();
  const defaultDescription = (
    <div className="min-w-0 text-sm leading-7">
      {t.rich('ui.confirm.deletePromptRich', {
        name: () => <span className="break-all">[{deleteName}]</span>,
      })}
    </div>
  );

  return (
    <CnDialog
      className={cn('w-[480px]', className)}
      title={title || t('ui.confirm.deleteTitle')}
      description={description ?? defaultDescription}
      okBtnProps={{
        variant: 'destructive',
        ...okBtnProps,
      }}
      okText={okText || t('ui.confirm.deleteCta')}
      {...restProps}
    />
  );
}
