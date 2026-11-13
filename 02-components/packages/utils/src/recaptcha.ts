export type RecaptchaOptions = {
  useRecaptchaNet?: boolean;
  enterprise?: boolean;
};

declare global {
  interface Window {
    recaptchaOptions?: RecaptchaOptions;
  }
}

export function initRecaptchaOptions(options: RecaptchaOptions = { useRecaptchaNet: true }) {
  if (typeof window === 'undefined') return;

  window.recaptchaOptions = {
    ...window.recaptchaOptions,
    ...options,
  };
}
