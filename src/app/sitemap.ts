import type { MetadataRoute } from 'next';
import { site } from '@/config/site.config';

// One-page site: a single indexable URL. Anchors (#processo…) don't belong here.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.seo.url}/`,
      lastModified: new Date(site.seo.lastModified),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
