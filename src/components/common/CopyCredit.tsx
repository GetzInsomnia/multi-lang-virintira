// src/components/common/CopyCredit.tsx
'use client';

import { useEffect } from 'react';
import { COMPANY } from '@/data/company';

const MIN_COPY_LENGTH = 30;

/**
 * Appends a credit line (source URL + brand) when the user copies
 * text longer than MIN_COPY_LENGTH characters from the site.
 *
 * Placed once in the root layout – works on every page.
 */
export function CopyCredit() {
  useEffect(() => {
    function handleCopy(e: ClipboardEvent) {
      const selection = document.getSelection();
      if (!selection || selection.toString().trim().length < MIN_COPY_LENGTH) return;

      const originalText = selection.toString();
      const sourceUrl = window.location.href;
      const credit = `\n\n— Source: ${COMPANY.brand}\n🔗 ${sourceUrl}`;

      const plainText = originalText + credit;

      // Build HTML version preserving newlines
      const htmlCredit = `<br/><br/><small style="color:#888">— Source: <a href="${sourceUrl}">${COMPANY.brand}</a></small>`;

      // Try modern ClipboardItem API (async clipboard)
      if (e.clipboardData) {
        e.preventDefault();
        e.clipboardData.setData('text/plain', plainText);
        e.clipboardData.setData('text/html', selection.toString() + htmlCredit);
      }
    }

    document.addEventListener('copy', handleCopy);
    return () => document.removeEventListener('copy', handleCopy);
  }, []);

  return null; // Render nothing — behavior only
}
