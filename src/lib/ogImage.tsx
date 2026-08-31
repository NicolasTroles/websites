import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const ogImageSize = { width: 1200, height: 630 };

/**
 * Share card (Open Graph / Twitter): the real client logo, centered on the
 * site's charcoal background, sized for how Facebook/WhatsApp/Twitter crop a
 * link preview (1200x630) — this is what shows up when the link is shared in
 * WhatsApp. Uses logo-escura.png (dark text) on a light card here — the
 * white logo.png used elsewhere on the site is made for a dark backdrop, but
 * the dark-text version reads clearer as a flat share-card graphic.
 */
export async function renderOgImage() {
  const logo = await readFile(join(process.cwd(), 'public/logo-escura.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#181B1D',
        }}
      >
        <div
          style={{
            display: 'flex',
            background: '#F3EFE4',
            padding: '48px 64px',
            borderRadius: 16,
          }}
        >
          {/* Logo's native ratio (1997x788) preserved, scaled up for the 1200x630 card. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={780} height={308} alt="" />
        </div>
      </div>
    ),
    { ...ogImageSize },
  );
}
