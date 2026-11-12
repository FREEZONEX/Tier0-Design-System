'use client';

import { cn } from '@tier0/utils';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface AccordionProps {
  items: { key: string; label: React.ReactNode; content: React.ReactNode; showArrow?: boolean }[];
  type?: any; // 'single' | 'multiple'
  rootClassName?: string;
  itemClassName?: string | ((item: any, index: number) => string);
  labelClassName?: string | ((item: any, index: number) => string);
  contentClassName?: string | ((item: any, index: number) => string);
  value?: string;
  defaultValue?: string;
  collapsible?: boolean;
  showArrow?: boolean; // 是否展示箭头图标
  onChange?: (value: string) => void;
}

export default function CnAccordion({
  items,
  type = 'single',
  rootClassName,
  itemClassName,
  labelClassName,
  contentClassName,
  value: controlledValue,
  defaultValue,
  collapsible,
  showArrow = true,
  onChange,
}: AccordionProps) {
  const initialValue = defaultValue || items?.[0]?.key || '';
  const [innerValue, setInnerValue] = useState<string>(controlledValue ?? initialValue);
  const contentRef = useRef<any>({});
  const value = controlledValue ?? innerValue;

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInnerValue(controlledValue);
    }
  }, [controlledValue]);

  useEffect(() => {
    Object.values(contentRef?.current).forEach((contentEl: any) => {
      if (!contentEl) return;

      const handleAnimationStart = (e: AnimationEvent) => {
        if (e.animationName === 'accordion-up') {
          // 只在动画收起开始时设置为hidden，避免覆盖其他时候的overflow值，比如初始状态的
          contentEl.style.overflow = 'hidden';
        }
      };

      // 控制内容区域的滚动条显示与隐藏，只有动画结束时才触发auto，避免滚动条闪烁
      const handleAnimationEnd = (e: AnimationEvent) => {
        // accordion-down和accordion-up是定义在shadcn的styles里的
        if (e.animationName === 'accordion-down') {
          contentEl.style.overflow = 'auto';
        } else if (e.animationName === 'accordion-up') {
          contentEl.style.overflow = 'hidden';
        }
      };

      contentEl?.addEventListener('animationstart', handleAnimationStart);
      contentEl?.addEventListener('animationend', handleAnimationEnd);

      return () => {
        contentEl?.removeEventListener('animationstart', handleAnimationStart);
        contentEl?.removeEventListener('animationend', handleAnimationEnd);
      };
    });
  }, [value, items]);

  return (
    <Accordion
      type={type}
      collapsible={collapsible}
      className={cn('flex h-full w-full flex-col rounded-lg border-1', rootClassName)}
      value={value}
      onValueChange={(v: string) => {
        setInnerValue(v);
        if (onChange) {
          onChange(v);
        }
      }}
    >
      {_.map(items, (item, i) => (
        <AccordionItem
          key={item.key}
          value={item.key}
          className={cn(
            'flex min-h-0 flex-col',
            value === item.key ? 'flex-1' : '',
            _.isFunction(itemClassName) ? itemClassName(item, i) : itemClassName
          )}
        >
          <AccordionTrigger
            className={cn(
              'bg-bg-tertiary flex h-13 items-center rounded-none px-4 py-0 hover:no-underline',
              {
                'border-b-1': value === item.key,
                'rounded-t-lg': i === 0,
                'rounded-b-lg': i === items.length - 1,
                'rounded-b-none': value === item.key,
              },
              _.isFunction(labelClassName) ? labelClassName(item, i) : labelClassName
            )}
            showArrow={item.showArrow ?? showArrow}
          >
            {item.label}
          </AccordionTrigger>
          <AccordionContent
            asChild
            ref={(el: HTMLDivElement | null) => {
              if (el) {
                // 初始状态判断，默认当前已展开的为overflow：auto，这样初始内容才支持滚动条
                if (_.isEmpty(contentRef.current)) {
                  if (el.dataset.state === 'open') {
                    el.style.overflow = 'auto';
                  }
                }
                contentRef.current[item.key] = el; // 这里 el 是真正的 DOM,每次都重新赋值来更新
              }
            }}
            className={cn('p-0', _.isFunction(contentClassName) ? contentClassName(item, i) : contentClassName)}
          >
            <div className="min-h-0 flex-1">{item.content}</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
