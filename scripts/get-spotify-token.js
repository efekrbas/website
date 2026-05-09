/**
 * Spotify Refresh Token Generator
 * 
 * Bu script Spotify API için gerekli refresh token'ı almanıza yardımcı olur.
 * 
 * KULLANIM:
 * 1. https://developer.spotify.com/dashboard adresine gidin
 * 2. "Create App" butonuna tıklayın
 * 3. App adı ve açıklamasını girin
 * 4. Redirect URI olarak: http://localhost:3000/callback ekleyin
 * 5. "Web API" seçeneğini işaretleyin
 * 6. Client ID ve Client Secret'ı aşağıya yapıştırın
 * 7. Bu scripti çalıştırın: node scripts/get-spotify-token.js
 * 8. Tarayıcıda açılan linke gidin ve Spotify'a giriş yapın
 * 9. Yönlendirilen URL'deki "code" parametresini kopyalayın
 * 10. Terminale yapıştırın
 */

import http from 'http';
import { URL } from 'url';

// ⬇️ BU DEĞERLERİ SPOTIFY DEVELOPER DASHBOARD'DAN ALIN
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:3000/callback';
const SCOPES = 'user-read-currently-playing user-read-recently-played';

const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;

console.log('\n🎵 Spotify Token Generator\n');
console.log('Bu linki tarayıcınızda açın:\n');
console.log(authUrl);
console.log('\n⏳ Callback bekleniyor...\n');

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:3000`);

    if (url.pathname === '/callback') {
        const code = url.searchParams.get('code');

        if (!code) {
            res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>❌ Hata: Code bulunamadı</h1>');
            return;
        }

        try {
            const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

            const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${basic}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: REDIRECT_URI,
                }),
            });

            const data = await tokenRes.json();

            if (data.refresh_token) {
                console.log('\n✅ Başarılı! Refresh Token:\n');
                console.log(data.refresh_token);
                console.log('\n📋 Bu değerleri .env.local dosyanıza ekleyin:\n');
                console.log(`SPOTIFY_CLIENT_ID=${CLIENT_ID}`);
                console.log(`SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`);
                console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <html>
                    <body style="background:#0a0a0a;color:#fff;font-family:monospace;padding:40px;text-align:center;">
                        <h1 style="color:#1db954;">✅ Token alındı!</h1>
                        <p>Refresh token terminale yazdırıldı.</p>
                        <p>Bu pencereyi kapatabilirsiniz.</p>
                    </body>
                    </html>
                `);
            } else {
                console.error('❌ Token alınamadı:', data);
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`<h1>❌ Hata</h1><pre>${JSON.stringify(data, null, 2)}</pre>`);
            }
        } catch (err) {
            console.error('❌ Hata:', err);
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`<h1>❌ Hata</h1><pre>${err.message}</pre>`);
        }

        setTimeout(() => {
            server.close();
            process.exit(0);
        }, 1000);
    }
});

server.listen(3000, () => {
    console.log('🚀 Sunucu http://localhost:3000 adresinde çalışıyor');
});
