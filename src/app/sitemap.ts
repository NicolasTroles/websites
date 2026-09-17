import type { MetadataRoute } from 'next';
import { pages, site } from '@/config/site.config';

/**
 * Serves /sitemap.xml. `lastModified` comes from site.seo.lastModified, not
 * from `new Date()` — stamping the build date makes the site claim it changed
 * on every deploy, and crawlers learn to ignore the field.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.seo.lastModified);

  return pages.map((page) => ({
    url: `${site.seo.url}${page.path === '/' ? '' : page.path}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: page.priority,
  }));
}
