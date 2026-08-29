import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const ogImageSize = { width: 1200, height: 630 };

/**
 * Share card (Open Graph / Twitter): the real client logo centered over the
 * brand's dark background, at the size Facebook and WhatsApp expect for a
 * link preview (1200x630).
 */
export async function renderOgImage() {
  const logo = await readFile(join(process.cwd(), 'public/logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#12160F',
      }}
    >
      {/* Logo's native ratio (1536x1024) preserved, scaled to 560px wide. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logoSrc} width={560} height={373} alt="" />
    </div>,
    { ...ogImageSize },
  );
}
