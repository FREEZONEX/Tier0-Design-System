import { cn } from '@tier0/utils';
import _ from 'lodash';
import { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export interface Tab {
  key: string;
  label?: React.ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
}

export interface CnTabsProps {
  items: Tab[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  renderTabBar?: (tab: Tab) => ReactNode;
  type?: 'line' | 'card';
  tabBarAlign?: 'left' | 'center' | 'right';
  tabBarExtraContent?: ReactNode;
  className?: string;
  tabListWrapClassName?: string;
  tabListClassName?: string;
  tabBarClassName?: string;
  tabContentClassName?: string;
}
export default function CnTabs({
  items,
  value,
  defaultValue,
  onValueChange,
  renderTabBar,
  type = 'line',
  tabBarAlign,
  tabBarExtraContent,
  className,
  tabListWrapClassName,
  tabListClassName,
  tabBarClassName,
  tabContentClassName,
}: CnTabsProps) {
  const alignClass =
    tabBarAlign === 'center' ? 'justify-center' : tabBarAlign === 'right' ? 'justify-end' : 'justify-start'; // 默认左对齐

  return (
    <Tabs className={cn(className)} defaultValue={defaultValue} value={value} onValueChange={onValueChange}>
      <div
        className={cn('flex items-center', tabBarExtraContent ? 'justify-between' : alignClass, tabListWrapClassName)}
      >
        <TabsList
          className={cn(
            'bg-transparent',
            { 'h-12 gap-6 p-0': type === 'line' },
            { 'h-8 rounded-md border p-1': type === 'card' },
            tabListClassName
          )}
        >
          {_.map(items, (tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              disabled={tab?.disabled}
              className={cn(
                'cursor-pointer',
                {
                  'text-text-tertiary data-[state=active]:border-b-tab-line data-[state=active]:text-foreground h-12 gap-2.5 rounded-none border-b-2 border-transparent bg-transparent p-0 shadow-none data-[state=active]:shadow-none':
                    type === 'line',
                },
                {
                  'hover:bg-bg-tertiary data-[state=active]:bg-bg-accent h-6 w-6 rounded-md shadow-none':
                    type === 'card',
                },
                tabBarClassName
              )}
            >
              {renderTabBar ? (
                renderTabBar(tab)
              ) : (
                <>
                  {tab?.icon}
                  {tab?.label}
                </>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabBarExtraContent && <div>{tabBarExtraContent}</div>}
      </div>
      {_.map(items, (tab) =>
        tab?.children ? (
          <TabsContent key={tab.key} value={tab.key} className={tabContentClassName}>
            {tab.children}
          </TabsContent>
        ) : null
      )}
    </Tabs>
  );
}
