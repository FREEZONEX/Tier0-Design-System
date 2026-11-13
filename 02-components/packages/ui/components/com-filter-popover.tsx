'use client';

import type { PopoverContentProps } from '@radix-ui/react-popover';
import { cn } from '@tier0/utils';
import { Check, ChevronRight, Filter, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export type ComFilterOption = {
  value: string | number;
  label: string;
};

export type ComFilterSection<T extends string = string> = {
  key: T;
  title: string;
  options: ComFilterOption[];
  selectionMode?: 'single' | 'multiple';
};

export type ComFilterInteractionMode = 'checkbox' | 'secondary';

type ComFilterPopoverProps<T extends string = string> = {
  value: Record<T, (string | number)[]>;
  sections: ComFilterSection<T>[];
  onChange: (filters: Record<T, (string | number)[]>) => void;
  title?: string;
  triggerText?: string;
  resetText?: string;
  applyText?: string;
  interactionMode?: ComFilterInteractionMode;
  popoverAlign?: PopoverContentProps['align'];
  popoverSide?: PopoverContentProps['side'];
  popoverSideOffset?: PopoverContentProps['sideOffset'];
  popoverClassName?: string;
  popoverMaxHeight?: string | number;
};

export default function ComFilterPopover<T extends string = string>({
  value,
  sections,
  onChange,
  title,
  triggerText,
  resetText,
  applyText,
  interactionMode = 'checkbox',
  popoverAlign = 'start',
  popoverSide = 'bottom',
  popoverSideOffset = 8,
  popoverClassName,
  popoverMaxHeight = 'calc(100vh - 16rem)',
}: ComFilterPopoverProps<T>) {
  const t = useTranslations();
  const resolvedTitle = title ?? t('ui.filter.title');
  const resolvedTriggerText = triggerText ?? t('ui.filter.trigger');
  const resolvedResetText = resetText ?? t('ui.filter.reset');
  const resolvedApplyText = applyText ?? t('ui.filter.apply');

  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<Record<T, (string | number)[]>>(value);
  const [searchText, setSearchText] = useState('');
  const [activeSectionKey, setActiveSectionKey] = useState<T | undefined>(sections[0]?.key);

  const appliedSelectionCount = useMemo(
    () => sections.reduce((sum, section) => sum + (value[section.key] || []).length, 0),
    [sections, value]
  );

  const hasActiveFilters = appliedSelectionCount > 0;

  const filteredSections = useMemo(() => {
    if (interactionMode !== 'secondary') return sections;

    const keyword = searchText.trim().toLowerCase();
    if (!keyword) return sections;

    return sections
      .map((section) => ({
        ...section,
        options: section.options.filter((option) => option.label.toLowerCase().includes(keyword)),
      }))
      .filter((section) => section.options.length > 0);
  }, [interactionMode, sections, searchText]);

  const activeSection = useMemo(
    () => filteredSections.find((section) => section.key === activeSectionKey) ?? filteredSections[0],
    [activeSectionKey, filteredSections]
  );
  const showEmptySearchState = interactionMode === 'secondary' && filteredSections.length === 0;

  const handleOptionChange = (section: ComFilterSection<T>, optionValue: string | number, checked: boolean) => {
    setLocalFilters((prev) => ({
      ...prev,
      [section.key]: checked
        ? section.selectionMode === 'single'
          ? [optionValue]
          : Array.from(new Set([...(prev[section.key] || []), optionValue]))
        : (prev[section.key] || []).filter((item) => item !== optionValue),
    }));
  };

  const handleReset = () => {
    // Build empty filters from sections so new sections do not require extra reset logic.
    const emptyFilters = sections.reduce(
      (acc, section) => ({
        ...acc,
        [section.key]: [],
      }),
      {} as Record<T, (string | number)[]>
    );

    setLocalFilters(emptyFilters);
    onChange(emptyFilters);
  };

  const handleApply = () => {
    onChange(localFilters);
    setOpen(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (nextOpen) {
      setLocalFilters(value);
      setSearchText('');
      setActiveSectionKey((prev) => (sections.some((section) => section.key === prev) ? prev : sections[0]?.key));
    }
  };

  const defaultPopoverClassName =
    interactionMode === 'secondary' ? 'w-[400px] overflow-hidden p-0' : 'w-56 overflow-hidden p-0';

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant={hasActiveFilters ? 'primary' : 'outline'} size="sm" className="gap-1.5 px-3">
          <Filter size={16} />
          {resolvedTriggerText}
          {appliedSelectionCount > 0 && (
            <span className="bg-bg-accent text-text-secondary rounded-full px-2 py-0.5 text-xs leading-4">
              {appliedSelectionCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(defaultPopoverClassName, popoverClassName)}
        style={{ maxHeight: popoverMaxHeight }}
        align={popoverAlign}
        side={popoverSide}
        sideOffset={popoverSideOffset}
      >
        <div className="flex flex-col py-3" style={{ maxHeight: popoverMaxHeight }}>
          {interactionMode === 'checkbox' ? (
            <div className="mb-3 min-h-0 flex-1 overflow-y-auto px-3">
              {sections.map((section) => (
                <div key={section.key} className="mb-3 border-b pb-2 last:mb-0">
                  <p className="text-text-secondary mb-2 text-xs font-medium">{section.title}</p>
                  <div className="space-y-1.5">
                    {section.options.map((option) => {
                      const checked = (localFilters[section.key] || []).includes(option.value);
                      const isSingleMode = section.selectionMode === 'single';

                      if (isSingleMode) {
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleOptionChange(section, option.value, !checked)}
                            className="flex w-full cursor-pointer items-center gap-2 rounded-[3px] py-0.5 text-left text-sm"
                          >
                            <span
                              className={cn(
                                'border-border flex size-4 shrink-0 items-center justify-center rounded-full border',
                                checked && 'border-primary'
                              )}
                            >
                              <span className={cn('size-2 rounded-full', checked ? 'bg-primary' : 'bg-transparent')} />
                            </span>
                            <span>{option.label}</span>
                          </button>
                        );
                      }

                      return (
                        <label key={option.value} className="flex cursor-pointer items-center gap-2 text-sm">
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(value: boolean | 'indeterminate') =>
                              handleOptionChange(section, option.value, value === true)
                            }
                          />
                          {option.label}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-3 flex min-h-0 flex-1 flex-col px-2">
              <div className="mb-2 border-b px-1 pb-2">
                <div className="text-text-tertiary flex items-center gap-1.5">
                  <Search size={14} className="shrink-0" />
                  <Input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder={resolvedTitle}
                    wrapClassName="w-full"
                    highlightOnFocus={false}
                    className="h-auto border-none bg-transparent px-0 py-0 text-sm shadow-none focus:border-none"
                  />
                </div>
              </div>

              {showEmptySearchState ? (
                <div className="border-border bg-bg flex min-h-0 flex-1 items-center justify-center rounded-md border">
                  <div className="text-text-tertiary px-6 py-2 text-center text-sm">{t('ui.table.emptyTitle')}</div>
                </div>
              ) : (
                /* Secondary interaction mode: pick section on the left, choose options on the right. */
                <div className="grid min-h-0 flex-1 grid-cols-2 gap-1">
                  <div className="border-border bg-bg min-h-0 overflow-hidden rounded-md border p-1">
                    <div className="h-full space-y-0.5 overflow-y-auto">
                      {filteredSections.map((section) => {
                        const sectionSelectedCount = (localFilters[section.key] || []).length;
                        const isActive = section.key === activeSection?.key;

                        return (
                          <button
                            key={section.key}
                            type="button"
                            onClick={() => setActiveSectionKey(section.key)}
                            className={cn(
                              'flex w-full items-center gap-2 rounded-[2px] px-2 py-1 text-left text-sm',
                              isActive ? 'bg-bg-accent text-text' : 'text-text-secondary hover:bg-bg-accent/70'
                            )}
                          >
                            <span className="min-w-0 flex-1 truncate" title={section.title}>
                              {section.title}
                            </span>
                            {sectionSelectedCount > 0 && (
                              <span className="bg-bg-tertiary text-text-secondary rounded-full px-2 py-0.5 text-xs leading-4">
                                {sectionSelectedCount}
                              </span>
                            )}
                            <ChevronRight size={16} className="text-text-tertiary shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-border bg-bg min-h-0 overflow-hidden rounded-md border p-1">
                    <div className="h-full space-y-0.5 overflow-y-auto">
                      {activeSection?.options.map((option) => {
                        const checked = (localFilters[activeSection.key] || []).includes(option.value);
                        const isSingleMode = activeSection.selectionMode === 'single';

                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleOptionChange(activeSection, option.value, !checked)}
                            className={cn(
                              'flex w-full items-center gap-2 rounded-[3px] px-2 py-1.5 text-left text-sm',
                              checked ? 'bg-bg-accent text-text' : 'text-text-secondary hover:bg-bg-accent/70'
                            )}
                          >
                            {isSingleMode ? (
                              <span
                                className={cn(
                                  'border-border flex size-4 shrink-0 items-center justify-center rounded-full border',
                                  checked && 'border-primary'
                                )}
                              >
                                <span
                                  className={cn('size-2 rounded-full', checked ? 'bg-primary' : 'bg-transparent')}
                                />
                              </span>
                            ) : (
                              <span
                                className={cn(
                                  'border-border flex size-4 shrink-0 items-center justify-center rounded-[4px] border',
                                  checked && 'border-primary bg-primary text-primary-foreground'
                                )}
                              >
                                {checked && <Check size={12} />}
                              </span>
                            )}
                            <span className="min-w-0 truncate" title={option.label}>
                              {option.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2 px-3">
            <Button variant="secondary" size="sm" onClick={handleReset} className="flex-1">
              {resolvedResetText}
            </Button>
            <Button size="sm" variant="primary" onClick={handleApply} className="flex-1">
              {resolvedApplyText}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
