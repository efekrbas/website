import { NextResponse } from 'next/server';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

const getAccessToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(
                `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString('base64')}`,
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
        }),
    });

    return response.json();
};

export async function GET() {
    try {
        const { access_token } = await getAccessToken();

        // Try currently playing first
        const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        // 204 = no content (nothing playing)
        if (nowPlayingRes.status === 200) {
            const data = await nowPlayingRes.json();

            if (data.item) {
                return NextResponse.json({
                    isPlaying: data.is_playing,
                    title: data.item.name,
                    artist: data.item.artists.map((a) => a.name).join(', '),
                    album: data.item.album.name,
                    albumArt: data.item.album.images[0]?.url,
                    songUrl: data.item.external_urls.spotify,
                    progress: data.progress_ms,
                    duration: data.item.duration_ms,
                });
            }
        }

        // Fallback to recently played
        const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        if (recentRes.status === 200) {
            const recentData = await recentRes.json();
            const track = recentData.items?.[0]?.track;

            if (track) {
                return NextResponse.json({
                    isPlaying: false,
                    title: track.name,
                    artist: track.artists.map((a) => a.name).join(', '),
                    album: track.album.name,
                    albumArt: track.album.images[0]?.url,
                    songUrl: track.external_urls.spotify,
                });
            }
        }

        return NextResponse.json({ isPlaying: false });
    } catch (err: any) {
        console.error('Spotify API error:', err);
        return NextResponse.json({ isPlaying: false, error: err.message }, { status: 500 });
    }
}
