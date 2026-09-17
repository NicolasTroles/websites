import { ImageResponse } from 'next/og';
import { site } from '@/config/site.config';

/**
 * Generated at build time rather than shipped as a PNG, so the card can never
 * drift out of sync with the tagline in site.config. System fonts only: loading
 * a webfont here would add a network fetch to every build for a 1200x630 image
 * nobody zooms into.
 */
export const alt = `${site.brandFull} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0A1E2C',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        {/* The emerald wedge from the client's banner. */}
        <div
          style={{
            position: 'absolute',
            right: -120,
            bottom: -160,
            width: 620,
            height: 620,
            background: '#3FA98A',
            opacity: 0.12,
            transform: 'rotate(18deg)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <svg width="64" height="60" viewBox="0 0 64 60">
            <g transform="translate(24 8) scale(0.78)">
              <path
                fill="#3FA98A"
                fillRule="evenodd"
                d="M0 0 H23 A13 13 0 0 1 23 26 H14 L38 52 H24 L9 33 V52 H0 Z M9 8 H21 A5 5 0 0 1 21 18 H9 Z"
              />
            </g>
            <g transform="translate(0 4)">
              <path
                fill="#E8EEF3"
                fillRule="evenodd"
                d="M0 0 H23 A13 13 0 0 1 23 26 H14 L38 52 H24 L9 33 V52 H0 Z M9 8 H21 A5 5 0 0 1 21 18 H9 Z"
              />
            </g>
          </svg>
          <div style={{ width: 1, height: 52, background: '#20394C' }} />
          <div
            style={{
              color: '#E8EEF3',
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            Rodrigues Rangel
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: '#E8EEF3', fontSize: 60, fontWeight: 700, lineHeight: 1.1 }}>
            Transformando exigências em
          </div>
          <div style={{ color: '#3FA98A', fontSize: 60, fontWeight: 700, lineHeight: 1.2 }}>
            organização, conformidade e controle.
          </div>
        </div>

        <div
          style={{
            color: '#93A8B8',
            fontSize: 26,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    size,
  );
}
