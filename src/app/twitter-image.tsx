import { ogImageSize, renderOgImage } from '@/lib/ogImage';

export const size = ogImageSize;
export const contentType = 'image/png';

export default async function Image() {
  return renderOgImage();
}
