<div align="center">

# 🌐 Efe Kırbaş - Portfolio

Modern, responsive ve premium kişisel portfolio websitesi

[![Live Demo](https://img.shields.io/badge/🚀_Demo-efekrbs.com-blue?style=for-the-badge)](https://efekrbs.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## ✨ Özellikler

| Özellik | Açıklama |
|---------|----------|
| 📊 **Live Status Dashboard** | Discord varlığı, anlık hava durumu ve sistem stack gösterimi |
| 🎵 **Spotify Entegrasyonu** | Lanyard API ve Spotify Web API ile gerçek zamanlı müzik takibi |
| ⛅ **Canlı Hava Durumu** | Open-Meteo API kullanılarak anlık İstanbul sıcaklığı ve dinamik ikonlar |
| 🌍 **Akıllı Dil Algılama** | Tarayıcı diline göre otomatik Türkçe veya İngilizce gösterimi |
| 🎨 **Premium Tasarım** | Tailwind CSS v4, özel Grid sistemi ve Glassmorphism efektleri |
| 💻 **Tech Stack Kartları** | Kullanılan diller ve teknolojilerin interaktif gösterimi |
| ⌨️ **Dinamik Typewriter** | Hero bölümünde sonsuz döngülü terminal daktilo efekti |
| 📱 **Tam Responsive** | Tüm cihazlar için optimize edilmiş akıcı layout |
| 📂 **GitHub API** | Projelerin yıldız ve güncelleme tarihine göre dinamik çekilmesi |
| ✨ **Micro-Animations** | Framer Motion ile premium kullanıcı deneyimi |

---

## 🛠️ Teknolojiler

<div align="center">

| Frontend | Animasyon | API / Entegrasyon | Araçlar |
|:--------:|:---------:|:---:|:-------:|
| React 19 | Framer Motion | Lanyard API (Discord) | Vite 7 |
| Tailwind CSS v4 | Hover Effects | Spotify Web API | Vercel Serverless |
| HTML5 / CSS3 | Micro-interactions | GitHub API | ESLint |
| Grid & Flexbox | Smooth Scroll | Open-Meteo API | PostCSS |

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

# Geliştirme sunucusunu başlat
npm run dev
```

---

## 📁 Proje Yapısı

```
src/
├── components/
│   ├── Header.jsx          # Navigasyon
│   ├── Hero.jsx            # Ana bölüm (ASCII Art & Intro)
│   ├── About.jsx           # Hakkımda
│   ├── LiveStatus.jsx      # Dashboard (Discord, Spotify, Tech Stack)
│   ├── Experience.jsx      # Deneyim (Zigzag Timeline)
│   ├── Education.jsx       # Eğitim
│   ├── Projects.jsx        # GitHub projeleri
│   ├── Youtube.jsx         # YouTube içerikleri
│   ├── Contact.jsx         # İletişim bölümü
│   ├── Cursor.jsx          # Custom premium cursor
│   └── Footer.jsx          # Alt bilgi
├── context/
│   └── LanguageContext.jsx # Dil yönetimi & çeviriler
├── App.jsx                 # Ana uygulama yapısı
├── main.jsx                # Giriş noktası
└── index.css               # Global tasarım sistemi & stiller
```

---

## 📜 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

---

## 🎵 Spotify Integration Setup

To enable the "Now Playing" feature, follow these steps:

1. Create a Spotify Developer App at [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard).
2. Set the **Redirect URI** to `http://localhost:3000/callback` in your app settings.
3. Run the helper script to get your `REFRESH_TOKEN`:
   ```bash
   node scripts/spotify-setup.cjs
   ```
4. Add the following environment variables to your Vercel project:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `SPOTIFY_REFRESH_TOKEN`

---

### 👤 İletişim

[![GitHub](https://img.shields.io/badge/GitHub-efekrbas-181717?style=for-the-badge&logo=github)](https://github.com/efekrbas)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Efe_Kırbaş-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/efekrbs)

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

</div>
