// Minimal stand-in for Framer's "framer" module, used only by verify.mjs.
// useLocaleInfo reads globalThis.__FRAMER_LOCALE so SSR and hydration can be tested per locale.
export const ControlType = new Proxy({}, { get: (_, key) => key });
export const addPropertyControls = () => {};
export const RenderTarget = { canvas: 'canvas', preview: 'preview', current: () => 'preview' };
export const useLocaleInfo = () => ({ activeLocale: { code: globalThis.__FRAMER_LOCALE || 'en-US' }, locales: [] });
