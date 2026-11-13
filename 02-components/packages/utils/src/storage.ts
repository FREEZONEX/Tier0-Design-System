export const storageOpt = {
  /**
   * 设置原始的localStorage值
   * @param key
   * @param value
   */
  setOrigin(key: string, value: any) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, value);
  },
  getOrigin(key: string) {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
  },
  /**
   * 设置一个JSON 对象
   * @param key
   * @param value
   */
  set(key: string, value: any) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key: string) {
    if (typeof window === 'undefined') return null;
    try {
      const value = localStorage.getItem(key);
      if (value === null || value === undefined || value === '') {
        return null;
      }
      return JSON.parse(value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return null;
    }
  },
  remove(key: string) {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
};
