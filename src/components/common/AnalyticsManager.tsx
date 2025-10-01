"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

type Props = {
  gaId?: string;
  gtmId?: string;
};

type ConsentState = "checking" | "pending" | "granted" | "denied";

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const STORAGE_KEY = "virintira-analytics-consent";

export function AnalyticsManager({ gaId = GA_ID, gtmId = GTM_ID }: Props) {
  const [consent, setConsent] = useState<ConsentState>("checking");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "granted" || stored === "denied") {
      setConsent(stored);
    } else {
      setConsent("pending");
    }
  }, []);

  if (!gaId && !gtmId) {
    return null;
  }

  const shouldLoad = consent === "granted";

  const handleConsent = (value: Extract<ConsentState, "granted" | "denied">) => () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, value);
    }
    setConsent(value);
  };

  return (
    <>
      {shouldLoad && (
        <>
          {gaId ? (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="afterInteractive"
              />
              <Script id="ga4-init" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('consent', 'update', {
                    ad_storage: 'granted',
                    analytics_storage: 'granted',
                    functionality_storage: 'granted'
                  });
                  gtag('config', '${gaId}', {
                    anonymize_ip: true,
                  });
                `}
              </Script>
            </>
          ) : null}
          {gtmId ? (
            <>
              <Script id="gtm-init" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    'gtm.start': new Date().getTime(),
                    event: 'gtm.js'
                  });
                `}
              </Script>
              <noscript>
                <iframe
                  src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                  height="0"
                  width="0"
                  style={{ display: "none", visibility: "hidden" }}
                  title="gtm"
                />
              </noscript>
            </>
          ) : null}
        </>
      )}

      {(gaId || gtmId) && consent === "pending" ? (
        <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto w-full max-w-xl rounded-2xl border border-[#A70909]/20 bg-white p-4 shadow-xl">
          <p className="text-sm text-gray-800">
            We use cookies to understand site traffic and deliver tailored campaigns. Allow analytics and tag manager scripts?
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleConsent("denied")}
              className="inline-flex items-center justify-center rounded-full border border-[#A70909]/30 px-4 py-2 text-sm font-semibold text-[#A70909] transition hover:bg-[#A70909]/10"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={handleConsent("granted")}
              className="inline-flex items-center justify-center rounded-full bg-[#A70909] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#C9341F]"
            >
              Allow
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
