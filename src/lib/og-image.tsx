import { ImageResponse } from 'next/og';
import { COMPANY } from '@/data/company';

export const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};

const baseBackground = '#FFF5F5';
const accent = '#A70909';

export function createOgImage({
  title,
  subtitle,
  footer,
}: {
  title: string;
  subtitle?: string;
  footer?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background: baseBackground,
          fontFamily: 'Prompt, Inter, sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '36px',
                background: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: accent,
                fontWeight: 700,
                fontSize: '36px',
                boxShadow: '0 8px 24px rgba(167, 9, 9, 0.15)',
              }}
            >
              VT
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '28px', fontWeight: 700, color: accent }}>{COMPANY.legalNameTh}</span>
              <span style={{ fontSize: '18px', color: '#7A2D2D' }}>{COMPANY.legalNameEn}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right', color: '#7A2D2D', fontSize: '18px', fontWeight: 500 }}>
            {COMPANY.phoneDisplay}
            <br />
            {COMPANY.email}
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <div>
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 700,
                color: accent,
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {title}
            </h1>
            {subtitle ? (
              <p
                style={{
                  fontSize: '28px',
                  color: '#7A2D2D',
                  marginTop: '24px',
                  maxWidth: '900px',
                  lineHeight: 1.4,
                }}
              >
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#7A2D2D',
            fontSize: '20px',
          }}
        >
          <span>{footer ?? 'Multilingual accounting partner for growing businesses.'}</span>
          <span>virintirabusiness@gmail.com • {COMPANY.phoneDisplay}</span>
        </div>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
    },
  );
}
