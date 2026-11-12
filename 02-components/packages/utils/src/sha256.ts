import CryptoJS from 'crypto-js';

const bytesToHex = (bytes: Uint8Array): string =>
  Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

export const sha256 = async (text: string): Promise<string> => {
  const subtle = globalThis.crypto?.subtle;

  // HTTP + IP (non-secure context) may not expose crypto.subtle; use crypto-js as fallback.
  if (subtle?.digest) {
    try {
      const data = new TextEncoder().encode(text);
      const hashBuffer = await subtle.digest('SHA-256', data);
      return bytesToHex(new Uint8Array(hashBuffer));
    } catch {
      // Some runtimes expose subtle but fail at runtime.
    }
  }

  return CryptoJS.SHA256(text).toString();
};
