import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// Generated in code rather than a static asset — same reasoning as
// components/Brand.tsx: no approved logo artwork exists yet. Mirrors the
// borehole mark: strata rings in clay on the site's ink background.
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#12161B',
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          border: '2.5px solid #C17A3E',
          display: 'flex',
        }}
      />
    </div>,
    { ...size },
  );
}
