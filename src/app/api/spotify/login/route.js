const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'https://efekrbs.com.tr/api/spotify/callback';
const SCOPES = 'user-read-currently-playing user-read-recently-played';

export async function GET() {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
    
    return new Response(`<html><body style="background:#0a0a0a;color:#fff;font-family:monospace;padding:40px;">
        <h2>Spotify Auth Debug</h2>
        <p><strong>CLIENT_ID:</strong> ${CLIENT_ID ? CLIENT_ID.substring(0, 8) + '...' : '❌ NOT SET'}</p>
        <p><strong>REDIRECT_URI:</strong> ${REDIRECT_URI}</p>
        <br/>
        <a href="${authUrl}" style="color:#1db954;font-size:1.2rem;">👉 Spotify'a Bağlan</a>
        <br/><br/>
        <p style="color:#666;font-size:0.8rem;">Full URL:</p>
        <code style="color:#888;word-break:break-all;font-size:0.7rem;">${authUrl}</code>
    </body></html>`, { headers: { 'Content-Type': 'text/html' } });
}
