/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== 'production';

// CSP permite o embed do Google Maps (frame-src) e mantém o resto restrito a
// 'self' — o site não carrega nenhum script ou imagem de terceiros.
// 'unsafe-eval' só entra em dev: o Fast Refresh do Next usa eval() para
// aplicar os módulos, e sem isso o script trava logo no início e a página
// nunca hidrata (JS morto = nada que dependa de JS aparece, como o
// scroll-reveal das seções). Em produção o build não usa eval, então fica de fora.
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
