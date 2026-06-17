/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Clickjacking koruması (sitenin başka bir sitede iframe içinde açılmasını engeller)
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // MIME-sniffing saldırılarını engeller
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // Referer bilgisini güvenli hale getirir
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload', // Tarayıcıyı HTTPS kullanmaya zorlar
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block', // Eski tarayıcılar için ekstra XSS koruması
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; img-src 'self' blob: data: https://i.scdn.co https://cdn-images-1.medium.com https://miro.medium.com https://cdn.simpleicons.org https://avatars.githubusercontent.com https://img.youtube.com; font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com; connect-src 'self' https://vitals.vercel-insights.com; frame-src 'self' https://www.youtube.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;"
          },
        ],
      },
    ];
  },
};

export default nextConfig;
