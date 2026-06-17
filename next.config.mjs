/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const isProd = process.env.NODE_ENV === 'production';
    
    // Temel güvenlik başlıkları (hem dev hem prod için)
    const securityHeaders = [
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      }
    ];

    // Geliştirme ortamında (mobilden yerel ağ ile test ederken) HTTPS'e zorlamaması için 
    // HSTS ve upgrade-insecure-requests'i sadece production'da ekliyoruz.
    if (isProd) {
      securityHeaders.push({
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains; preload',
      });
    }

    const cspValue = isProd 
      ? "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; img-src 'self' blob: data: https://i.scdn.co https://cdn-images-1.medium.com https://miro.medium.com https://cdn.simpleicons.org https://avatars.githubusercontent.com https://img.youtube.com; font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com; connect-src 'self' https://vitals.vercel-insights.com; frame-src 'self' https://www.youtube.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;"
      : "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; img-src 'self' blob: data: https://i.scdn.co https://cdn-images-1.medium.com https://miro.medium.com https://cdn.simpleicons.org https://avatars.githubusercontent.com https://img.youtube.com; font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com; connect-src 'self' https://vitals.vercel-insights.com; frame-src 'self' https://www.youtube.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';";

    securityHeaders.push({
      key: 'Content-Security-Policy',
      value: cspValue
    });

    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
