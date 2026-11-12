'use client';

import { cn } from '@tier0/utils';
import _ from 'lodash';
import { useTranslations } from 'next-intl';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type CnSelectOption = { label: React.ReactNode; value: string; title?: string };

export interface CnSelectProps {
  options: CnSelectOption[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: string) => void;
  className?: string;
  contentClassName?: string;
  /** 下拉浮层渲染容器：在 AntD Drawer 等需隔离 focus 的弹层内使用，避免 portal 到 body 引发误关。 */
  container?: HTMLElement | null;
  itemClassName?: string;
  size?: 'xs' | 'sm' | 'default';
  withBorder?: boolean;
  disabled?: boolean;
  /** 浮层展开方向；缺省由 Radix 按可用空间自动翻转 */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** 关闭自动翻转以固定 side；超长时须配 contentClassName 限高，否则会溢出视口 */
  avoidCollisions?: boolean;
}

function getOptionTitle(option?: CnSelectOption, fallback?: string) {
  if (option?.title) return option.title;
  if (_.isString(option?.label) || _.isNumber(option?.label)) return String(option.label);
  return fallback;
}

export default function CnSelect({
  options,
  placeholder,
  value,
  defaultValue,
  open,
  onOpenChange,
  onValueChange,
  className,
  contentClassName,
  container,
  itemClassName,
  size,
  withBorder,
  disabled,
  side,
  avoidCollisions,
}: CnSelectProps) {
  const t = useTranslations();
  const selectedOption = _.find(options, { value: value ?? defaultValue });
  const triggerTitle = getOptionTitle(selectedOption, placeholder);

  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      open={open}
      onOpenChange={onOpenChange}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger
        withBorder={withBorder}
        className={cn('cursor-pointer', className)}
        size={size}
        title={triggerTitle}
        disabled={disabled}
      >
        <SelectValue placeholder={placeholder ?? t('ui.select.placeholder')} />
      </SelectTrigger>
      <SelectContent className={contentClassName} container={container} side={side} avoidCollisions={avoidCollisions}>
        <SelectGroup>
          {_.map(options, (option) => {
            const { value, label } = option;
            const optionTitle = getOptionTitle(option);

            return (
              <SelectItem
                className={itemClassName}
                key={value}
                value={value}
                title={optionTitle}
                textValue={optionTitle}
              >
                {label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
