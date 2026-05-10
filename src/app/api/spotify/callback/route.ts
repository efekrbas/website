import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    if (!code) {
        return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(
                    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
                ).toString('base64')}`,
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            }),
        });

        const data = await response.json();

        if (data.error) {
            return NextResponse.json({ error: data.error, description: data.error_description }, { status: 400 });
        }

        // Return the refresh token — save this to your .env.local as SPOTIFY_REFRESH_TOKEN
        return NextResponse.json({
            message: '✅ Success! Copy the refresh_token below and add it to your .env.local as SPOTIFY_REFRESH_TOKEN',
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_in: data.expires_in,
        });
    } catch (err) {
        return NextResponse.json({ error: 'Token exchange failed', details: err.message }, { status: 500 });
    }
}
