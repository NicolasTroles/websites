import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const ogImageSize = { width: 1200, height: 630 };

/**
 * Share card (Open Graph / Twitter): the real client logo, centered on the
 * site's charcoal background, sized for how Facebook/WhatsApp/Twitter crop a
 * link preview (1200x630) — this is what shows up when the link is shared in
 * WhatsApp. Uses logo.png, the same white/cream logo as the rest of the
 * site, straight on the charcoal background it was designed for.
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
          background: '#181B1D',
        }}
      >
        {/* Logo's native ratio (2103x748) preserved, scaled up for the 1200x630 card. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={880} height={313} alt="" />
      </div>
    ),
    { ...ogImageSize },
  );
}
