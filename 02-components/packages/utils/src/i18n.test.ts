import { describe, expect, it } from 'vitest';
import { getLocalizedText } from './i18n';

describe('getLocalizedText', () => {
  it('selects the current locale and accepts next-intl locale aliases', () => {
    const value = { 'en-US': 'Operator', 'zh-CN': '操作员' };

    expect(getLocalizedText(value, 'zh-cn')).toBe('操作员');
    expect(getLocalizedText(value, 'en')).toBe('Operator');
  });

  it('falls back to English, then another available translation', () => {
    expect(getLocalizedText({ 'en-US': 'Operator' }, 'ja')).toBe('Operator');
    expect(getLocalizedText({ 'ja-JP': 'オペレーター' }, 'zh-cn')).toBe('オペレーター');
  });

  it('preserves legacy string responses', () => {
    expect(getLocalizedText('Operator', 'zh-cn')).toBe('Operator');
  });
});
