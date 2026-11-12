import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

export type DayjsLocale = 'en' | 'zh-cn';

export function setDayjsLocale(lang: DayjsLocale) {
  dayjs.locale(lang);
}

/**
 * 日期格式化说明：
 *
 * - 固定格式：使用明确占位符（如 HH/mm/dd），不依赖语言环境
 * * 示例：'HH:mm:ss DD/MM/YYYY' → "14:05:00 20/02/2025"
 *
 * - 动态格式：包含本地化标记（如 MMMM/dddd），随 locale 变化
 * * 示例：'dddd, MMMM D, YYYY' → 中文环境显示"星期四, 二月 20, 2025"
 * * 英文环境显示"Thursday, February 20, 2025"
 */
const DAY_FORMATS: Record<string, Record<string, string>> = {
  // 完整日期时间：包含时分秒和完整日期
  all: {
    en: 'HH:mm:ss DD/MM/YYYY',
    'zh-cn': 'YYYY/MM/DD HH:mm:ss',
  },
  // 仅时间：时分秒
  time: {
    en: 'HH:mm:ss',
    'zh-cn': 'HH:mm:ss',
  },
  // 小时 + 分钟（如 14:30）
  timeShort: {
    en: 'HH:mm',
    'zh-cn': 'HH:mm',
  },
  // 12 小时制时分（如 9:42 AM / 上午 9:42）
  timeShort12h: {
    en: 'h:mm A',
    'zh-cn': 'A h:mm',
  },
  // 完整日期时间（详细格式）：月 日, 年, 时:分
  full: {
    en: 'MMM DD, YYYY, HH:mm',
    'zh-cn': 'YYYY年 M月 D日 HH:mm',
  },
  // 完整日期时间（12小时制带AM/PM）：月 日, 年, 时:分 AM/PM
  full12h: {
    en: 'MMM DD, YYYY, hh:mm A',
    'zh-cn': 'YYYY年 M月 D日 hh:mm A',
  },
  // 计费时刻（BillingDate 的 tooltip）。不复用 full12h：中文下它渲染成「04:41 下午」
  // ——「下午」后置不是中文写法，年月日之间也不该有空格。full12h 是共享 key，
  // 两处 invite dialog 显式要的就是 12 小时制，不能为计费改掉它的语义。
  billingTime: {
    en: 'MMM DD, YYYY, hh:mm A',
    'zh-cn': 'YYYY年M月D日 HH:mm',
  },
  // 紧凑格式：时:分 日/月/年
  compact: {
    en: 'HH:mm DD/MM/YYYY',
    'zh-cn': 'HH:mm YYYY/MM/DD',
  },
  // 中等格式：月 日 时:分:秒
  medium: {
    en: 'MMM DD HH:mm:ss',
    'zh-cn': 'M月 D日 HH:mm:ss',
  },
  // 简短日期：月 日（用于图表等场景）
  short: {
    en: 'MMM D',
    'zh-cn': 'M月 D日',
  },
  // 简短日期带年份（如 Feb 20, 2025 / 2025年 2月 20日）：与 short 同风格，用于列表里跨年的条目
  shortWithYear: {
    en: 'MMM D, YYYY',
    'zh-cn': 'YYYY年 M月 D日',
  },
  // 只有月份（如 Feb / 2月）
  monthOnly: {
    en: 'MMM',
    'zh-cn': 'M月',
  },
  // 日期（如 Feb 1, 2025 / 2025年 2月 1日）
  date: {
    en: 'MMM DD, YYYY',
    'zh-cn': 'YYYY年 M月 D日',
  },
  // 同年日期，省略年份（如 Sep 24 / 9月24日）。与 short 的区别：中文补齐「日」字。
  // 不复用 short 是因为它已被图表等场景占用，改它的中文格式会波及无关页面。
  dateNoYear: {
    en: 'MMM D',
    'zh-cn': 'M月D日',
  },
  // 跨年日期，与 dateNoYear 成对（如 May 2, 2027 / 2027年5月2日）。
  // 不复用 date：它补零且中文带分隔空格，与 dateNoYear 放在一起会出现 "Sep 4" 与 "May 02, 2027"
  // 这种一半补零的写法；date 已被其他页面占用，不能就地改。
  dateWithYear: {
    en: 'MMM D, YYYY',
    'zh-cn': 'YYYY年M月D日',
  },
};

// 预定义格式类型
export type DateFormatKey = keyof typeof DAY_FORMATS;

// format 参数类型：支持预定义格式 key 或自定义格式字符串
export type DateFormat = DateFormatKey | string;

/**
 * -------------------------
 * 统一时间解析（核心工具）
 * - null / undefined / '' / 0 / '0' → null
 * - 10 位时间戳（秒） → 毫秒
 * - 13 位时间戳（毫秒） → 直接使用
 * - 其他字符串 → 交给 dayjs
 * -------------------------
 */
export function parseToDayjs(input: unknown): Dayjs | null {
  // 1. 空值 / 无效值直接返回 null
  if (input == null || input === '' || input === 0 || input === '0') {
    return null;
  }

  // 2. 数字 or 纯数字字符串
  if (typeof input === 'number' || (typeof input === 'string' && /^\d+$/.test(input))) {
    const str = String(input);
    let ts = Number(str);

    if (!Number.isFinite(ts)) return null;

    // 秒级时间戳（10 位）→ 毫秒
    if (str.length === 10) {
      ts *= 1000;
    }

    const d = dayjs(ts);
    return d.isValid() ? d : null;
  }

  // 3. 其他字符串（ISO / RFC / 自定义）
  const d = dayjs(input as any);
  return d.isValid() ? d : null;
}

/**
 * 格式化日期时间
 * @example
 * // 使用预定义格式
 * formatDate(1234567890, 'all') // HH:mm:ss DD/MM/YYYY -> "14:05:00 20/02/2025"
 * formatDate(1234567890, 'full') // MMM DD, YYYY, HH:mm -> "Feb 20, 2025, 14:05"
 * formatDate(1234567890, 'full12h') // MMM DD, YYYY, hh:mm A -> "Feb 20, 2025, 2:30 PM"
 * formatDate(1234567890, 'compact') // HH:mm DD/MM/YYYY -> "14:05 20/02/2025"
 * formatDate(1234567890, 'medium') // MMM DD HH:mm:ss -> "Feb 20 14:05:00"
 * formatDate(1234567890, 'short') // MMM D -> "Feb 20"
 * formatDate(1234567890, 'shortWithYear') // MMM D, YYYY -> "Feb 20, 2025"
 * formatDate(1234567890, 'time') // HH:mm:ss -> "14:05:00"
 * formatDate(1234567890, 'timeShort') // HH:mm -> "14:05"
 * formatDate(1234567890, 'monthOnly') // MMM -> "Feb"
 * formatDate(1234567890, 'date') // MMM DD, YYYY -> "Feb 20, 2025"
 *
 * // 使用自定义格式
 * formatDate(1234567890, 'YYYY-MM-DD') // "2025-02-20"
 * formatDate(1234567890, 'HH:mm') // "14:30"
 * @param date 时间戳或日期字符串
 * @param format 格式化类型：
 *   - 预定义格式 key：'all' | 'time' | 'timeShort' | 'short' | 'shortWithYear' | 'full' | 'full12h' | 'compact' | 'medium' | 'monthOnly'
 *   - 自定义格式字符串：如 'YYYY-MM-DD'、'HH:mm' 等 dayjs 支持的格式
 * @returns 格式化后的时间字符串，无效时间返回 '-'
 *
 */
export const formatDate = (date: any, format: DateFormat = 'all'): string => {
  // 如果为空、0、'0' 都返回 '-'
  const time = parseToDayjs(date);
  if (!time) return '-';

  // 检查 format 是否是 DAY_FORMATS 中定义的预定义格式 key
  if (format in DAY_FORMATS) {
    const locale = dayjs.locale() || 'en';
    // 获取当前语言环境的格式模板，如果没有则使用英文格式作为后备
    const formatTemplate = DAY_FORMATS[format]?.[locale] || DAY_FORMATS[format]?.['en'];
    if (formatTemplate) {
      return time.format(formatTemplate);
    }
  }

  // 如果不是预定义格式 key，则当作自定义格式字符串直接使用
  return time.format(format);
};

/* ----------------------------------------------------
 * 日期比较 / 过期判断
 * ---------------------------------------------------- */

/**
 * 判断给定时间是否已过期（支持 ISO 字符串、timestamp 字符串/数字）
 * 规则：
 * - 空值视为已过期
 * - 纯数字字符串视为时间戳：10 位 => 秒，13 位 => 毫秒，其他长度按 Number 处理（优先视为毫秒）
 * - 非纯数字字符串按 dayjs 解析（ISO/人类可读格式）
 */
export function isDateExpired(time?: string | number | null): boolean {
  if (time === null || time === undefined || time === '') return true;

  const d = parseToDayjs(time);
  if (!d) return true;

  return d.valueOf() <= Date.now();
}

export function timeFromNow(timestamp: string | number, locale?: DayjsLocale) {
  // 如果为空、0、'0' 都返回 '-'
  const time = parseToDayjs(timestamp);
  if (!time) return '-';

  return (locale ? time.locale(locale) : time).fromNow();
}

/**
 * Convert timestamp input (seconds or milliseconds) to milliseconds number.
 * - Accepts string or number. Returns 0 for invalid/empty/0 values.
 * - Treats 10-digit numbers as seconds and converts to ms.
 */
export function toMsTimestamp(input?: string | number | null): number {
  const n = Number(input);
  if (!Number.isFinite(n) || n <= 0) return 0;
  // 10-digit-ish numbers are seconds -> convert to ms
  if (n < 1e12) return n * 1000;
  return n;
}

/**
 * 计费日期的「精确时刻」后缀，供无 hover 的设备（手机 / 平板）直接展示——
 * 它们走不到 tooltip：Radix 忽略 touch 的 pointermove，tap 又会被 trigger 自己的
 * onClose 关掉，精确时刻与时区就彻底不可达了。
 *
 * 只给时间不重复日期（调用方已经渲染了日期），24 小时制避开中文时段词。
 *
 * @example formatBillingTimeSuffix('2026-09-30T09:56:00Z', 'Asia/Shanghai') // " · 17:56 (Asia/Shanghai)"
 */
export const formatBillingTimeSuffix = (date: unknown, timeZone?: string): string => {
  const time = parseToDayjs(date);
  if (!time) return '';
  const locale = dayjs.locale() || 'en';
  const hm = time.format(DAY_FORMATS['timeShort'][locale] || DAY_FORMATS['timeShort']['en']);
  return timeZone ? ` · ${hm} (${timeZone})` : ` · ${hm}`;
};

/**
 * 计费场景的日期格式化：精确到日，不含时分秒；日期不在当前年时补上年份。
 *
 * 为什么不直接用固定格式：计费页同屏会出现「本月的重置日」和「明年的合同到期日」。
 * 恒带年份让当期日期变啰嗦，恒不带年份则读不出企业档年度订阅到期在哪一年。
 *
 * 时区取浏览器本地时区——用户看到的是「自己这边的哪一天」。精确时刻由调用方以 tooltip 补充。
 *
 * @example
 * formatDateSmart('2026-09-24T05:56:16Z') // 当前是 2026 年 -> "Sep 24"
 * formatDateSmart('2027-05-26T15:59:59Z') // -> "May 26, 2027"
 */
export const formatDateSmart = (date: unknown): string => {
  const time = parseToDayjs(date);
  if (!time) return '-';
  const key: DateFormatKey = time.year() === dayjs().year() ? 'dateNoYear' : 'dateWithYear';
  const locale = dayjs.locale() || 'en';
  return time.format(DAY_FORMATS[key][locale] || DAY_FORMATS[key]['en']);
};
