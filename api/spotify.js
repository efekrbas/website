const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

async function getAccessToken() {
    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
    const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
        console.error("Missing Spotify env variables:", {
            clientId: !!CLIENT_ID,
            clientSecret: !!CLIENT_SECRET,
            refreshToken: !!REFRESH_TOKEN
        });
        throw new Error("Missing Spotify environment variables");
    }

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

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Spotify token request failed:", response.status, errorData);
        throw new Error(`Spotify token error: ${JSON.stringify(errorData)}`);
    }

    return response.json();
}

export default async function handler(req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');

    try {
        const tokenResponse = await getAccessToken();
        const access_token = tokenResponse.access_token;

        if (!access_token) {
            console.error("No access token in response:", tokenResponse);
            return res.status(200).json({ isPlaying: false, error: "No access token in JSON response" });
        }

        const response = await fetch(NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        // Eğer hiçbir şey çalmıyorsa 204 döner
        if (response.status === 204) {
            return res.status(200).json({ isPlaying: false, message: "Nothing is currently playing" });
        }

        if (response.status > 400) {
            const errorText = await response.text();
            console.error("Spotify now playing request failed:", response.status, errorText);
            return res.status(200).json({ isPlaying: false, error: `Playback error ${response.status}: ${errorText}` });
        }

        const data = await response.json();

        if (!data.item) {
            return res.status(200).json({ isPlaying: false, message: "Data received but no item playing" });
        }

        const song = {
            isPlaying: data.is_playing,
            title: data.item.name,
            artist: data.item.artists.map((a) => a.name).join(', '),
            album: data.item.album.name,
            albumArt: data.item.album.images[0]?.url,
            songUrl: data.item.external_urls.spotify,
        };

        return res.status(200).json(song);
    } catch (error) {
        console.error("Internal Spotify handler error:", error.message);
        return res.status(200).json({ 
            isPlaying: false, 
            error: error.message 
        });
    }
}
