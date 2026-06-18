<div align="center">

# 🌐 Efe Kırbaş - Portfolio

Modern, Serverless Full-Stack ve premium kişisel portfolio websitesi

[![Live Demo](https://img.shields.io/badge/🚀_Demo-efekrbs.com.tr-blue?style=for-the-badge)](https://efekrbs.com.tr)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## ✨ Özellikler

| Özellik | Açıklama |
|---------|----------|
| ⚙️ **Serverless Full-Stack** | Next.js API Routes ile backend işlemleri, güvenli token yönetimi ve sunucu tabanlı Rate-limiting |
| 📊 **Live Status Dashboard** | Discord varlığı, anlık hava durumu ve sistem stack gösterimi |
| 🎵 **Spotify Entegrasyonu** | Spotify API üzerinden o an dinlenen şarkının canlı gösterimi |
| ⏳ **Deneyim Progress Bar** | Sayfa kaydırıldıkça dinamik olarak dolan senkronize zaman çizelgesi hattı |
| 🌓 **Light & Dark Mode** | Kusursuz renk geçişleri ve sisteme duyarlı tam uyumlu tema yönetimi |
| 🌍 **Akıllı Dil Algılama** | Tarayıcı diline göre otomatik Türkçe veya İngilizce gösterimi |
| 🎨 **Premium Tasarım** | Minimalist navbar, özel Grid sistemi, Glassmorphism ve ultra-modern estetik |
| 📂 **GitHub API** | Projelerin yıldız ve güncelleme tarihine göre dinamik çekilmesi |
| 📝 **Medium Entegrasyonu** | Medium makalelerinin premium kart tasarımıyla güncel listelenmesi |
| ✨ **Micro-Animations** | Gelişmiş CSS geçişleri ve 60fps premium etkileşimler |
| ⚡ **Yüksek Performans** | Strict TypeScript desteği, optimize edilmiş LERP döngüleri ve temiz React mimarisi |
| 🧪 **Test Altyapısı** | Jest ve React Testing Library ile desteklenmiş sağlam ve ölçeklenebilir kod tabanı |
| ♿ **Erişilebilirlik (a11y)** | Klavye navigasyonu ve Screen Reader uyumlu (ARIA) UI tasarımı |
| 🤖 **Efek - AI Asistan** | Groq & Llama 3 destekli, samimi kişilikli, "beep boop" konuşma balonlu ve siber güvenlik korumalı akıllı asistan |
| 💬 **Beep Boop Balonu** | Robot ikonunun üzerinde periyodik olarak beliren eğlenceli konuşma balonu animasyonu |
| ⛅ **Akıllı Hava Durumu** | Open-Meteo API + localStorage cache ile anlık İstanbul sıcaklığı, kesintisiz gösterim |

---

## 🛠️ Teknolojiler

<div align="center">

| Frontend & UI | Animasyon | Backend & API | Araçlar & Çevre |
|:-------------:|:---------:|:-------------:|:---------------:|
| React 19 | Framer Motion | Next.js API Routes | TypeScript (Strict) |
| Vanilla CSS | Hover Effects | Spotify Web API | Jest & RTL (Testing) |
| HTML5 | Micro-interactions | YouTube API | Vercel Serverless |
| Grid & Flexbox | Smooth Scroll | Lanyard API (Discord) | ESLint & PostCSS |
| Lucide Icons | Glassmorphism | Groq Cloud & Llama 3 | Git |

</div>

---

## 📦 Kurulum

```bash
# Repository'yi klonla
git clone https://github.com/efekrbas/website.git

# Dizine git
cd website

# Bağımlılıkları yükle
npm install

# Ortam değişkenlerini (.env.local) yapılandırın (Groq, Spotify API, vb.)

# Testleri çalıştırmak için
npm test

# Geliştirme sunucusunu başlat
npm run dev
```

---

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── api/chat/route.ts   # AI Backend & Rate Limiter
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Ana sayfa
├── components/
│   ├── Chatbot.tsx         # Efek 🤖 AI Asistan
│   ├── Header.tsx          # Minimalist Navigasyon
│   ├── Hero.tsx            # Ana bölüm
│   ├── About.tsx           # Hakkımda
│   ├── LiveStatus.tsx      # Dashboard
│   ├── SpotifyWidget.tsx   # Canlı Spotify verisi
│   ├── Experience.tsx      # Deneyim
│   ├── Education.tsx       # Eğitim
│   ├── Projects.tsx        # GitHub projeleri
│   ├── Youtube.tsx         # YouTube
│   ├── Medium.tsx          # Medium makaleleri
│   └── Footer.tsx          # Alt bilgi
├── context/
│   └── LanguageContext.tsx # Dil yönetimi (Type-safe)
└── index.css               # Tasarım sistemi & stiller
```

---

## 📜 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

---

### 👤 İletişim

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Efe_Kırbaş-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/efekrbs)

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

</div>
