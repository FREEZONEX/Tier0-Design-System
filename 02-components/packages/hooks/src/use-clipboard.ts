'use client';
import { useState } from 'react';

export function useClipboard(onCopy?: () => void) {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    let success = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        success = true;
      } catch (err) {
        console.error('Clipboard API failed, fallback to execCommand', err);
      }
    }

    if (!success) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        success = true;
      } catch (err) {
        console.error('Fallback copy failed', err);
      }
    }

    if (success) {
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return { copied, copy };
}
