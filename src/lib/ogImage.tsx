import { ImageResponse } from 'next/og';

export const ogImageSize = { width: 1200, height: 630 };

/**
 * Share card (Open Graph / Twitter). No logo artwork exists for this client
 * (only the Google Business listing), so the card is drawn directly —
 * charcoal background, the tool mark, and the wordmark in the site's own
 * palette — instead of reading an uploaded logo file.
 */
export async function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          background: '#181B1D',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 120,
            height: 120,
            borderRadius: 12,
            background: '#F4B400',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 64,
          }}
        >
          🔧
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: 6,
            color: '#AFB6B8',
            textTransform: 'uppercase',
          }}
        >
          Marido de Aluguel
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: 4,
            color: '#F3EFE4',
            textTransform: 'uppercase',
          }}
        >
          Oliveira
        </div>
      </div>
    ),
    { ...ogImageSize },
  );
}
