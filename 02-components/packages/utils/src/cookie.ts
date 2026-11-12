import Cookies from 'js-cookie';

export function getBroswerCookie(key: any) {
  return Cookies.get(key);
}

export function setBroswerCookie(key: any, value: any, expires?: any) {
  return Cookies.set(key, value, { expires, path: '/' });
}

export function removeBroswerCookie(key: any) {
  return Cookies.remove(key, { path: '/' });
}

/**
 * 清除所有 cookie
 */
export function clearAllBrowserCookies() {
  const allCookies = Cookies.get(); // 获取所有 cookie
  console.log('allCookies', allCookies);
  Object.keys(allCookies).forEach((key) => {
    Cookies.remove(key, { path: '/' });
  });
}
