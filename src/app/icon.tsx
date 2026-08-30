import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

/** Favicon, drawn from the same tool mark used in the header — no uploaded artwork exists. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F4B400',
          fontSize: 38,
        }}
      >
        🔧
      </div>
    ),
    { ...size },
  );
}
