/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== 'production';

// CSP allows the Google Maps embed (frame-src) and otherwise restricts
// everything to 'self' — the site loads no third-party script or image.
// 'unsafe-eval' is dev-only: Next's Fast Refresh uses eval() to apply
// modules, and without it the script dies immediately and the page never
// hydrates (dead JS = nothing that depends on JS shows up, like the
// scroll-reveal on every section). Production's build doesn't use eval, so
// it stays out of that build.
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self' data:;
  connect-src 'self';
  frame-src https://www.google.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
`
  .replace(/\s{2,}/g, ' ')
  .trim();

const securityHeaders = [
  { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
