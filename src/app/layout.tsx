import '../index.css';
import { LanguageProvider } from '../context/LanguageContext';
import Chatbot from '../components/Chatbot';
import { Analytics } from '@vercel/analytics/react';
import React from 'react';

export const metadata = {
  title: 'Efe Kırbaş',
  description: 'Efe Kırbaş - Yazılım Geliştirici & Siber Güvenlik Meraklısı. Karmaşık iş akışlarını terminale taşıyor, sistemleri otomatize eden verimli araçlar geliştiriyorum.',
  icons: {
    icon: '/favicon.png',
  },
  other: {
    'google-site-verification': 'E47bLbGHUsDuMohzuH6zgFuIuyZYUiIFF-RGO04DPn8',
  },
  openGraph: {
    siteName: 'Efe Kırbaş',
    title: 'Efe Kırbaş',
    description: 'Yazılım Geliştirici & Siber Güvenlik Meraklısı. Karmaşık iş akışlarını terminale taşıyor, sistemleri otomatize eden verimli araçlar geliştiriyorum.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Space+Grotesk:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              'name': 'Efe Kırbaş',
              'url': 'https://efekrbs.vercel.app',
            }),
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          {children}
          <Chatbot />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
