import type { MetadataRoute } from 'next';
import { site } from '@/config/site.config';

// One-page site: one indexable URL. Anchors (/#servicos) don't belong here —
// they live in llms.txt. lastModified is the last real content change, kept in
// the config, so every deploy doesn't claim the page changed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.seo.url,
      lastModified: new Date(site.seo.lastModified),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
