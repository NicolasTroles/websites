import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { site } from '@/config/site.config';

/**
 * Generated at build time rather than shipped as a PNG, so the card can never
 * drift out of sync with the tagline in site.config. System fonts only: loading
 * a webfont here would add a network fetch to every build for a 1200x630 image
 * nobody zooms into.
 */
/*
 * The client's real lockup, read off disk and inlined as a data URI. It lives
 * in design/ rather than public/ because nothing should serve it: this route is
 * prerendered at build time, when the repo is on disk, so the bytes never need
 * to exist at runtime. Satori decodes PNG, not WebP — do not point this at the
 * .webp the site itself uses.
 */
const logoDataUri = `data:image/png;base64,${readFileSync(
  join(process.cwd(), 'design', 'logo-og.png'),
).toString('base64')}`;

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

        {/* A plain img: Satori has no next/image, and this never runs in a
            browser. */}
        <img src={logoDataUri} alt="" width={420} height={116} />

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
