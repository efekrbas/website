const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'https://efekrbs.com.tr/api/spotify/callback';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
        return new Response(`<html><body style="background:#0a0a0a;color:#fff;font-family:monospace;padding:40px;text-align:center;">
            <h1 style="color:#ef4444;">❌ Hata</h1>
            <p>${error}</p>
        </body></html>`, { headers: { 'Content-Type': 'text/html' } });
    }

    if (!code) {
        return new Response(`<html><body style="background:#0a0a0a;color:#fff;font-family:monospace;padding:40px;text-align:center;">
            <h1 style="color:#ef4444;">❌ Code bulunamadı</h1>
        </body></html>`, { headers: { 'Content-Type': 'text/html' } });
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
            return new Response(`<html><body style="background:#0a0a0a;color:#fff;font-family:monospace;padding:40px;text-align:center;">
                <h1 style="color:#1db954;">✅ Spotify Bağlandı!</h1>
                <p style="margin:20px 0;color:#888;">Refresh Token:</p>
                <code style="background:#111;padding:15px 20px;border-radius:10px;border:1px solid #333;display:inline-block;max-width:600px;word-break:break-all;color:#1db954;font-size:0.85rem;">${data.refresh_token}</code>
                <p style="margin-top:20px;color:#666;font-size:0.8rem;">Bu token'ı Vercel Environment Variables'a SPOTIFY_REFRESH_TOKEN olarak ekle.</p>
            </body></html>`, { headers: { 'Content-Type': 'text/html' } });
        } else {
            return new Response(`<html><body style="background:#0a0a0a;color:#fff;font-family:monospace;padding:40px;text-align:center;">
                <h1 style="color:#ef4444;">❌ Token alınamadı</h1>
                <pre style="text-align:left;background:#111;padding:20px;border-radius:10px;color:#888;">${JSON.stringify(data, null, 2)}</pre>
            </body></html>`, { headers: { 'Content-Type': 'text/html' } });
        }
    } catch (err) {
        return new Response(`<html><body style="background:#0a0a0a;color:#fff;font-family:monospace;padding:40px;text-align:center;">
            <h1 style="color:#ef4444;">❌ Hata</h1>
            <p>${err.message}</p>
        </body></html>`, { headers: { 'Content-Type': 'text/html' } });
    }
}
