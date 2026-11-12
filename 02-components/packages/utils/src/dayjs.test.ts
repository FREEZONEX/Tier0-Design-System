import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { formatBillingTimeSuffix, formatDate, formatDateSmart, setDayjsLocale } from './dayjs';

// 计费日期只需精确到日：带时分秒会让「重置日」看起来像一个瞬间而不是一天，
// 且企业档是年度合同，跨年的日期不带年份根本读不出是哪一年。
describe('formatDateSmart', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-27T10:00:00Z'));
    setDayjsLocale('en');
  });
  afterEach(() => {
    vi.useRealTimers();
    setDayjsLocale('en');
  });

  // 断言格式特征而非具体某天：日期数字随宿主时区变，写死只在一个时区通过。
  it('omits the year within the current year', () => {
    expect(formatDateSmart('2026-09-24T05:56:16Z')).toMatch(/^Sep \d{1,2}$/);
  });

  it('shows the year once the date leaves the current year', () => {
    // 企业档套餐是年度订阅，到期日必然跨年
    expect(formatDateSmart('2027-05-26T15:59:59Z')).toMatch(/^May \d{1,2}, 2027$/);
  });

  it('shows the year for past years too', () => {
    expect(formatDateSmart('2025-12-15T12:00:00Z')).toMatch(/^Dec \d{1,2}, 2025$/);
  });

  it('judges the year in the local timezone, not UTC', () => {
    // 2025-12-31T23:00Z 在 UTC+8 已是 2026-01-01。日期按本地时区渲染（用户看到的是
    // 「自己这边的哪一天」），年份判断必须跟着走，否则同一个瞬间会一半带年份一半不带。
    const local = new Date('2025-12-31T23:00:00Z').getFullYear();
    const expected = local === 2026 ? 'Jan 1' : 'Dec 31, 2025';
    expect(formatDateSmart('2025-12-31T23:00:00Z')).toBe(expected);
  });

  it('never renders a time component', () => {
    const out = formatDateSmart('2026-09-24T05:56:16Z');
    expect(out).not.toMatch(/\d{2}:\d{2}/);
  });

  it('accepts second-precision unix timestamps', () => {
    // 后端返回的是 10 位秒级时间戳
    expect(formatDateSmart(1790229376)).toMatch(/^Sep \d{1,2}$/);
  });

  it('returns the placeholder for empty values', () => {
    expect(formatDateSmart('0')).toBe('-');
    expect(formatDateSmart(0)).toBe('-');
    expect(formatDateSmart(null)).toBe('-');
    expect(formatDateSmart(undefined)).toBe('-');
  });

  it('localises to Chinese', () => {
    setDayjsLocale('zh-cn');
    // 同年不带年份，但「日」字不能丢
    expect(formatDateSmart('2026-09-24T05:56:16Z')).toMatch(/^9月\d{1,2}日$/);
    // 跨年补年份，且与同年分支一样不加分隔空格
    expect(formatDateSmart('2027-05-26T15:59:59Z')).toMatch(/^2027年5月\d{1,2}日$/);
  });

  // 两个分支的「日」必须同一种写法：一个 Sep 4、一个 May 02, 2027 会显得像两套系统。
  it('never zero-pads the day, in either branch', () => {
    setDayjsLocale('en');
    // 关键是「日」不带前导 0——具体是 3 还是 4 由宿主时区决定，不断言
    expect(formatDateSmart('2026-09-04T05:56:16Z')).toMatch(/^Sep [1-9]$/);
    expect(formatDateSmart('2027-05-02T15:59:59Z')).toMatch(/^May [1-9], 2027$/);
  });

  // 断言格式特征而非具体时刻：小时随宿主时区变，写死 16:41 只在 UTC+8 通过，CI 在 UTC 会挂。
  it('formats the billing tooltip time the Chinese way', () => {
    setDayjsLocale('zh-cn');
    const out = formatDate('2026-09-27T08:41:26Z', 'billingTime');
    expect(out).toMatch(/^\d{4}年\d{1,2}月\d{1,2}日 \d{2}:\d{2}$/);
    expect(out).not.toMatch(/上午|下午/);
  });

  it('leaves the shared full12h contract alone', () => {
    setDayjsLocale('zh-cn');
    // 两处 invite dialog 显式要它，计费不能改掉其格式：年月日之间保留分隔空格，
    // 且带中文时段词（dayjs zh-cn 按小时给「凌晨/早上/上午/中午/下午/晚上」）
    const out = formatDate('2026-09-27T08:41:26Z', 'full12h');
    expect(out).toMatch(/^\d{4}年 \d{1,2}月 \d{1,2}日 /);
    expect(out).toMatch(/凌晨|早上|上午|中午|下午|晚上/);
  });
});

// 无 hover 的设备走不到 tooltip，精确时刻必须直接可见（Radix 忽略 touch 的 pointermove，
// tap 还会被 trigger 自己的 onClose 关掉）。
describe('formatBillingTimeSuffix', () => {
  afterEach(() => setDayjsLocale('en'));

  it('renders time and timezone without repeating the date', () => {
    const out = formatBillingTimeSuffix('2026-09-30T09:56:00Z', 'Asia/Shanghai');
    expect(out).toMatch(/^ · \d{2}:\d{2} \(Asia\/Shanghai\)$/);
    expect(out).not.toMatch(/Sep|9月/);
  });

  it('uses 24-hour form in Chinese too', () => {
    setDayjsLocale('zh-cn');
    const out = formatBillingTimeSuffix('2026-09-30T09:56:00Z', 'Asia/Shanghai');
    expect(out).not.toMatch(/凌晨|早上|上午|中午|下午|晚上/);
  });

  it('omits the timezone when unknown', () => {
    expect(formatBillingTimeSuffix('2026-09-30T09:56:00Z')).toMatch(/^ · \d{2}:\d{2}$/);
  });

  it('returns empty for unparseable values', () => {
    expect(formatBillingTimeSuffix('0', 'UTC')).toBe('');
    expect(formatBillingTimeSuffix(null, 'UTC')).toBe('');
  });
});
