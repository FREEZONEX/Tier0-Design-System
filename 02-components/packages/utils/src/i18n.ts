export type LocalizedText = Record<string, string>;

const localeAliases: Record<string, string> = {
  en: 'en-US',
  'en-us': 'en-US',
  zh: 'zh-CN',
  'zh-cn': 'zh-CN',
  'zh-hans': 'zh-CN',
  ja: 'ja-JP',
  'ja-jp': 'ja-JP',
  ko: 'ko-KR',
  'ko-kr': 'ko-KR',
};

function normalizeLocale(locale: string) {
  const normalized = locale.trim().replaceAll('_', '-');
  return localeAliases[normalized.toLowerCase()] ?? normalized;
}

/** Selects a displayable string from an API i18n map with a stable fallback order. */
export function getLocalizedText(value: LocalizedText | string | null | undefined, locale?: string): string {
  if (typeof value === 'string') return value.trim();
  if (!value) return '';

  const candidates = [locale?.trim(), locale ? normalizeLocale(locale) : '', 'en-US'];
  for (const candidate of new Set(candidates)) {
    const text = candidate ? value[candidate] : undefined;
    if (text?.trim()) return text.trim();
  }

  return (
    Object.values(value)
      .find((text) => text?.trim())
      ?.trim() ?? ''
  );
}
