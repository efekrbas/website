import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CloudSun, Music, Code2, MapPin, ExternalLink, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const DISCORD_USER_ID = '378501743366897675';

const LiveStatus = () => {
    const { t } = useLanguage();
    const [time, setTime] = useState(new Date());
    const [lanyard, setLanyard] = useState(null);
    const [spotifyData, setSpotifyData] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        let ws;
        let heartbeatInterval;
        const connect = () => {
            ws = new WebSocket('wss://api.lanyard.rest/socket');
            ws.onopen = () => {
                ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_USER_ID } }));
            };
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.op === 1) {
                    heartbeatInterval = setInterval(() => {
                        ws.send(JSON.stringify({ op: 3 }));
                    }, data.d.heartbeat_interval);
                }
                if (data.op === 0) setLanyard(data.d);
            };
            ws.onclose = () => { clearInterval(heartbeatInterval); setTimeout(connect, 5000); };
            ws.onerror = () => ws.close();
        };
        connect();
        return () => { clearInterval(heartbeatInterval); if (ws) ws.close(); };
    }, []);

    useEffect(() => {
        const fetchSpotify = async () => {
            try {
                const res = await fetch('/api/spotify');
                const data = await res.json();
                setSpotifyData(data);
            } catch { setSpotifyData(null); }
        };
        fetchSpotify();
        const interval = setInterval(fetchSpotify, 10000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (d) => d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const formatDate = (d) => d.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' });

    const techStack = [
        { name: t('penetrationTesting'), color: '#ef4444' },
        { name: 'Linux', color: '#f59e0b' },
        { name: 'C / C# / C++', color: '#8b5cf6' },
        { name: 'Python', color: '#3776ab' },
        { name: 'Javascript', color: '#f7df1e' },
        { name: 'HTML', color: '#e34f26' },
        { name: 'CSS', color: '#1572b6' },
        { name: 'Node.js', color: '#339933' },
        { name: 'MySQL / MSSQL', color: '#00758f' },
        { name: t('automation'), color: '#06b6d4' },
    ];

    const langs = [
        { name: t('english'), level: t('professional'), pct: 80 },
        { name: t('turkish'), level: t('Congenital'), pct: 100 },
    ];

    const discordStatus = lanyard?.discord_status || 'offline';
    const discordUser = lanyard?.discord_user;
    const username = discordUser?.global_name || discordUser?.username || 'hackviser';
    const avatarUrl = discordUser
        ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.${discordUser.avatar?.startsWith('a_') ? 'gif' : 'png'}?size=128`
        : '/images/efe-profile.png';

    const isListeningSpotify = spotifyData?.isPlaying || lanyard?.listening_to_spotify || false;
    const spotify = spotifyData?.isPlaying
        ? { song: spotifyData.title, artist: spotifyData.artist, album: spotifyData.album, album_art_url: spotifyData.albumArt }
        : lanyard?.spotify;

    const statusColors = { online: '#3ba55d', idle: '#faa81a', dnd: '#ed4245', offline: '#747f8d' };
    const statusTexts = { online: t('discordOnline'), idle: 'Idle', dnd: 'DND', offline: t('discordOffline') };

    return (
        <motion.section
            id="live-status"
            className="live-status-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="section-title">{t('liveStatusTitle')}</h2>

            <div className="ls-grid-12">
                {/* Discord — col 1-5, row 1-2 */}
                <motion.div className="ls-card ls-area-discord" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                    <div className="ls-discord-profile">
                        <div className="ls-discord-avatar">
                            <img src={avatarUrl} alt={username} />
                            <span className="ls-discord-status-dot" style={{ background: statusColors[discordStatus] }}></span>
                        </div>
                        <div className="ls-discord-info">
                            <span className="ls-discord-name">{username}</span>
                            <span className="ls-discord-status">{statusTexts[discordStatus]}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Clock — col 6-12, row 1 */}
                <motion.div className="ls-card ls-area-clock" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                    <div className="ls-card-header">
                        <MapPin size={12} className="ls-icon ls-icon-blue" />
                        <span className="ls-card-label">{t('istanbul')}</span>
                    </div>
                    <div className="ls-clock-content">
                        <div className="ls-clock">{formatTime(time)}</div>
                        <div className="ls-date">{formatDate(time)}</div>
                    </div>
                </motion.div>

                {/* Stack — col 6-12, row 2 */}
                <motion.div className="ls-card ls-area-stack" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                    <div className="ls-card-header">
                        <Code2 size={12} className="ls-icon ls-icon-purple" />
                        <span className="ls-card-label">{t('technicalSkills')}</span>
                    </div>
                    <div className="ls-stack-pills">
                        {techStack.map((tech) => (
                            <div key={tech.name} className="ls-pill">
                                <span className="ls-pill-dot" style={{ backgroundColor: tech.color }}></span>
                                <span className="ls-pill-name">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Languages — col 1-3, row 3 */}
                <motion.div className="ls-card ls-area-langs" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                    <div className="ls-card-header">
                        <Languages size={12} className="ls-icon ls-icon-blue" />
                        <span className="ls-card-label">{t('languages')}</span>
                    </div>
                    <div className="ls-langs-list">
                        {langs.map((lang) => (
                            <div key={lang.name} className="ls-lang-item">
                                <div className="ls-lang-top">
                                    <span className="ls-lang-name">{lang.name}</span>
                                    <span className="ls-lang-level">{lang.level}</span>
                                </div>
                                <div className="ls-progress-bar">
                                    <div className="ls-progress" style={{ width: `${lang.pct}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Spotify — col 4-9, row 3 */}
                <motion.div className="ls-card ls-area-spotify" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                    <div className="ls-card-header">
                        <Music size={12} className="ls-icon ls-icon-green" />
                        <span className="ls-card-label">Spotify</span>
                    </div>
                    <div className="ls-spotify-body">
                        {isListeningSpotify && spotify ? (
                            <div className="ls-spotify-row">
                                <div className="ls-spotify-album-art">
                                    <img src={spotify.album_art_url} alt={spotify.album} />
                                </div>
                                <div className="ls-spotify-info">
                                    <span className="ls-spotify-song">{spotify.song}</span>
                                    <span className="ls-spotify-artist">{spotify.artist}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="ls-spotify-row">
                                <div className="ls-spotify-icon-wrap">
                                    <Music size={18} />
                                </div>
                                <span className="ls-spotify-text">{t('spotifyNotPlaying')}</span>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Weather — col 10-12, row 3 */}
                <motion.div className="ls-card ls-area-weather" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                    <div className="ls-weather-top">
                        <div className="ls-weather-main">
                            <div className="ls-temp">8°C</div>
                            <div className="ls-weather-loc">{t('istanbul')}</div>
                        </div>
                        <CloudSun size={28} className="ls-weather-icon" />
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default LiveStatus;
