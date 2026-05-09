'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SpotifyWidget = () => {
    const { t } = useLanguage();
    const [spotify, setSpotify] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchSpotify = async () => {
            try {
                const res = await fetch('/api/spotify');
                const data = await res.json();
                setSpotify(data);
                if (data.progressMs && data.durationMs) {
                    setProgress((data.progressMs / data.durationMs) * 100);
                }
            } catch (err) {
                console.error('Spotify fetch error:', err);
            }
        };

        fetchSpotify();
        const interval = setInterval(fetchSpotify, 15000); // Poll every 15s
        return () => clearInterval(interval);
    }, []);

    // Animate progress bar between polls
    useEffect(() => {
        if (!spotify?.isPlaying || !spotify?.durationMs) return;

        const tickInterval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + (1000 / spotify.durationMs) * 100;
                return next >= 100 ? 0 : next;
            });
        }, 1000);

        return () => clearInterval(tickInterval);
    }, [spotify?.isPlaying, spotify?.durationMs]);

    const formatTime = (ms) => {
        if (!ms) return '0:00';
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const currentTime = spotify?.durationMs
        ? formatTime((progress / 100) * spotify.durationMs)
        : '0:00';
    const totalTime = spotify?.durationMs
        ? formatTime(spotify.durationMs)
        : '0:00';

    return (
        <motion.div
            className="ls-card ls-area-spotify"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
        >
            <div className="ls-card-header">
                <svg className="ls-icon ls-spotify-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                <span className="ls-card-label">Spotify</span>
            </div>

            {spotify?.title ? (
                <a
                    href={spotify.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spotify-track-link"
                >
                    <div className="spotify-track">
                        <div className="spotify-album-art">
                            {spotify.albumImageUrl ? (
                                <img
                                    src={spotify.albumImageUrl}
                                    alt={spotify.album}
                                    className={`spotify-album-img ${spotify.isPlaying ? 'spinning' : ''}`}
                                />
                            ) : (
                                <div className="spotify-album-placeholder">
                                    <Music size={20} />
                                </div>
                            )}
                            {spotify.isPlaying && (
                                <div className="spotify-equalizer">
                                    <span className="eq-bar"></span>
                                    <span className="eq-bar"></span>
                                    <span className="eq-bar"></span>
                                </div>
                            )}
                        </div>
                        <div className="spotify-track-info">
                            <span className="spotify-track-name">{spotify.title}</span>
                            <span className="spotify-artist-name">{spotify.artist}</span>
                            {spotify.isPlaying && spotify.durationMs && (
                                <div className="spotify-progress-container">
                                    <div className="spotify-progress-bar">
                                        <motion.div
                                            className="spotify-progress-fill"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <div className="spotify-time">
                                        <span>{currentTime}</span>
                                        <span>{totalTime}</span>
                                    </div>
                                </div>
                            )}
                            {!spotify.isPlaying && (
                                <span className="spotify-status-text">{t('spotifyLastPlayed')}</span>
                            )}
                        </div>
                        <ExternalLink size={12} className="spotify-external-icon" />
                    </div>
                </a>
            ) : (
                <div className="spotify-empty">
                    <Music size={20} className="spotify-empty-icon" />
                    <span>{t('spotifyNotPlaying')}</span>
                </div>
            )}
        </motion.div>
    );
};

export default SpotifyWidget;
