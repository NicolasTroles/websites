import type { MetadataRoute } from 'next';
import { site } from '@/config/site.config';

/**
 * Serves /robots.txt. Never add a public/robots.txt alongside this file — the
 * static one would win and this handler would become dead code.
 *
 * AI crawlers are deliberately allowed: a consultancy this specific benefits
 * from being quotable by assistants, which is the same reason /llms.txt exists.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site.seo.url}/sitemap.xml`,
    host: site.seo.url,
  };
}
