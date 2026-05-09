const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

const getAccessToken = async () => {
    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: REFRESH_TOKEN,
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

        // 204 = nothing playing right now
        if (nowPlayingRes.status === 204) {
            // Fall back to recently played
            const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
                headers: { Authorization: `Bearer ${access_token}` },
            });

            if (!recentRes.ok) {
                return Response.json({ isPlaying: false });
            }

            const recentData = await recentRes.json();
            const track = recentData.items?.[0]?.track;

            if (!track) {
                return Response.json({ isPlaying: false });
            }

            return Response.json({
                isPlaying: false,
                title: track.name,
                artist: track.artists.map((a) => a.name).join(', '),
                album: track.album.name,
                albumImageUrl: track.album.images?.[0]?.url,
                songUrl: track.external_urls.spotify,
            });
        }

        if (!nowPlayingRes.ok) {
            return Response.json({ isPlaying: false });
        }

        const data = await nowPlayingRes.json();

        if (!data?.item) {
            return Response.json({ isPlaying: false });
        }

        return Response.json({
            isPlaying: data.is_playing,
            title: data.item.name,
            artist: data.item.artists.map((a) => a.name).join(', '),
            album: data.item.album.name,
            albumImageUrl: data.item.album.images?.[0]?.url,
            songUrl: data.item.external_urls.spotify,
            progressMs: data.progress_ms,
            durationMs: data.item.duration_ms,
        });
    } catch (error) {
        console.error('Spotify API error:', error);
        return Response.json({ isPlaying: false });
    }
}
