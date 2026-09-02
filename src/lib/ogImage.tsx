import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const ogImageSize = { width: 1200, height: 630 };

/**
 * Share card (Open Graph / Twitter): the real client logo, centered on a
 * white background — the logo is petrol + amber and only reads on a light
 * ground — sized for how Facebook/WhatsApp/Twitter crop a link preview
 * (1200x630), which is what shows up when the link is shared in WhatsApp.
 */
export async function renderOgImage() {
  const logo = await readFile(join(process.cwd(), 'public/logo.png'));
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
          background: '#FFFFFF',
        }}
      >
        {/* Logo's native ratio (2172x724) preserved, scaled up for the 1200x630 card. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={900} height={300} alt="" />
      </div>
    ),
    { ...ogImageSize },
  );
}
