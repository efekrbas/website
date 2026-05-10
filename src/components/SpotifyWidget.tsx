'use client';

import React, { useState, useEffect } from 'react';
import { Music } from 'lucide-react';

const SpotifyWidget = () => {
    const [data, setData] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                const res = await fetch('/api/spotify/now-playing');
                const json = await res.json();
                setData(json);
                if (json.progress && json.duration) {
                    setProgress((json.progress / json.duration) * 100);
                }
            } catch (err) {
                console.error('Spotify fetch error:', err);
            }
        };

        fetchNowPlaying();
        const interval = setInterval(fetchNowPlaying, 30000); // 30 seconds
        return () => clearInterval(interval);
    }, []);

    // Progress bar animation (client-side interpolation between fetches)
    useEffect(() => {
        if (!data?.isPlaying || !data?.progress || !data?.duration) return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + (1000 / data.duration) * 100;
                return next >= 100 ? 100 : next;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [data]);

    if (!data || (!data.title && !data.isPlaying)) {
        return (
            <div className="spotify-widget spotify-idle">
                <div className="spotify-icon-wrapper">
                    <svg className="spotify-logo" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                </div>
                <div className="spotify-info">
                    <span className="spotify-not-playing">Şu an çalmıyor</span>
                    <span className="spotify-sublabel">Spotify</span>
                </div>
            </div>
        );
    }

    return (
        <a
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`spotify-widget ${data.isPlaying ? 'spotify-playing' : 'spotify-paused'}`}
        >
            {data.albumArt && (
                <div className="spotify-album-art">
                    <img src={data.albumArt} alt={data.album} />
                    {data.isPlaying && (
                        <div className="spotify-eq">
                            <span></span><span></span><span></span>
                        </div>
                    )}
                </div>
            )}
            <div className="spotify-info">
                <span className="spotify-track">{data.title}</span>
                <span className="spotify-artist">{data.artist}</span>
                {data.isPlaying && data.duration && (
                    <div className="spotify-progress-bar">
                        <div className="spotify-progress" style={{ width: `${progress}%` }}></div>
                    </div>
                )}
            </div>
            <svg className="spotify-logo-small" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
        </a>
    );
};

export default SpotifyWidget;
