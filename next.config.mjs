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
        ],
      },
    ];
  },
};

export default nextConfig;
