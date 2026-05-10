import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CloudSun, Music, Code2, MapPin, ExternalLink, Languages, Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, CloudDrizzle, Instagram, Twitter, Linkedin, Mail, MessageSquare, Share2 } from 'lucide-react';
import SpotifyWidget from './SpotifyWidget';
import { useLanguage } from '../context/LanguageContext';

const DISCORD_USER_ID = '378501743366897675';

const LiveStatus = () => {
    const { t } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [lanyard, setLanyard] = useState(null);
    const [weather, setWeather] = useState({ temp: null, code: null });

    useEffect(() => {
        setMounted(true);
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
        const fetchWeather = async () => {
            try {
                const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=41.0082&longitude=28.9784&current=temperature_2m,weather_code');
                const data = await res.json();
                setWeather({
                    temp: Math.round(data.current.temperature_2m),
                    code: data.current.weather_code
                });
            } catch (err) {
                console.error('Weather fetch error:', err);
            }
        };
        fetchWeather();
        const interval = setInterval(fetchWeather, 1800000); // 30 minutes
        return () => clearInterval(interval);
    }, []);

    const getWeatherIcon = (code) => {
        if (code === null) return <CloudSun size={28} className="ls-weather-icon" />;
        if (code === 0) return <Sun size={28} className="ls-weather-icon" />;
        if (code <= 3) return <CloudSun size={28} className="ls-weather-icon" />;
        if (code === 45 || code === 48) return <CloudFog size={28} className="ls-weather-icon" />;
        if (code <= 55) return <CloudDrizzle size={28} className="ls-weather-icon" />;
        if (code <= 65) return <CloudRain size={28} className="ls-weather-icon" />;
        if (code <= 77) return <CloudSnow size={28} className="ls-weather-icon" />;
        if (code >= 95) return <CloudLightning size={28} className="ls-weather-icon" />;
        return <Cloud size={28} className="ls-weather-icon" />;
    };

    const ClockWidget = () => {
        const [time, setTime] = useState(new Date());

        useEffect(() => {
            const timer = setInterval(() => setTime(new Date()), 1000);
            return () => clearInterval(timer);
        }, []);

        const formatTime = (d) => d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
        const formatDate = (d) => d.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' });

        return (
            <div className="ls-clock-content">
                <div className="ls-clock">{mounted ? formatTime(time) : '--:--:--'}</div>
                <div className="ls-date">{mounted ? formatDate(time) : '--'}</div>
            </div>
        );
    };

    const techStack = [
        { name: t('penetrationTesting'), color: '#ef4444' },
        { name: 'Linux', color: '#f59e0b' },
        { name: 'C', color: '#8b5cf6' },
        { name: 'C#', color: '#68217a' },
        { name: 'C++', color: '#00599c' },
        { name: 'Python', color: '#3776ab' },
        { name: 'Javascript', color: '#f7df1e' },
        { name: 'HTML', color: '#e34f26' },
        { name: 'CSS', color: '#1572b6' },
        { name: 'Node.js', color: '#339933' },
        { name: 'SQL', color: '#00758f' },
        { name: t('automation'), color: '#06b6d4' },
    ];

    const langs = [
        { name: t('english'), level: t('professional'), pct: 80 },
        { name: t('turkish'), level: t('Congenital'), pct: 100 },
    ];

    const discordStatus = lanyard?.discord_status || 'online';
    const discordUser = lanyard?.discord_user;
    const username = discordUser?.global_name || discordUser?.username || 'Efe';
    const avatarUrl = discordUser
        ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.${discordUser.avatar?.startsWith('a_') ? 'gif' : 'png'}?size=128`
        : '/images/discord-avatar.gif';


    const statusColors = { online: '#3ba55d', idle: '#faa81a', dnd: '#ed4245', offline: '#747f8d' };
    const statusTexts = { online: t('discordOnline'), idle: t('discordIdle'), dnd: t('discordDnd'), offline: t('discordOffline') };

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
                            <img 
                                src={avatarUrl} 
                                alt={username} 
                                onError={(e) => { e.target.onerror = null; e.target.src = '/images/discord-avatar.gif'; }} 
                            />
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
                    <ClockWidget />

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

                {/* Spotify — col 1-12, row 3 */}
                <motion.div className="ls-card ls-area-spotify" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                    <div className="ls-card-header">
                        <Music size={12} className="ls-icon" style={{ color: '#1db954' }} />
                        <span className="ls-card-label">Spotify</span>
                    </div>
                    <SpotifyWidget />
                </motion.div>

                {/* Languages — col 1-3, row 4 */}
                <motion.div className="ls-card ls-area-langs" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                    <div className="ls-card-header">
                        <Languages size={12} className="ls-icon ls-icon-blue" />
                        <span className="ls-card-label">{t('languages')}</span>
                    </div>
                    <div className="ls-langs-list">
                        {langs.map((lang, index) => (
                            <div key={lang.name} className="ls-lang-item">
                                <div className="ls-lang-top">
                                    <span className="ls-lang-name">{lang.name}</span>
                                    <span className="ls-lang-level">{lang.level}</span>
                                </div>
                                <div className="ls-progress-bar">
                                    <motion.div 
                                        className="ls-progress" 
                                        initial={{ width: "0%" }}
                                        whileInView={{ width: `${lang.pct}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.3 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Socials — col 4-9, row 3 */}
                <motion.div className="ls-card ls-area-socials" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                    <div className="ls-card-header">
                        <Share2 size={12} className="ls-icon ls-icon-green" />
                        <span className="ls-card-label">{t('socialMedia')}</span>
                    </div>
                    <div className="ls-socials-grid">
                        <a href="https://instagram.com/efekrbass" target="_blank" rel="noopener noreferrer" className="ls-social-item ig" title="Instagram">
                            <Instagram size={20} />
                        </a>
                        <a href="https://x.com/efekrbs" target="_blank" rel="noopener noreferrer" className="ls-social-item x" title="X (Twitter)">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z" />
                            </svg>
                        </a>
                        <a href="https://linkedin.com/in/efekrbs" target="_blank" rel="noopener noreferrer" className="ls-social-item ln" title="LinkedIn">
                            <Linkedin size={20} />
                        </a>
                        <a href="mailto:efekrbass@gmail.com" className="ls-social-item mail" title="Email">
                            <Mail size={20} />
                        </a>
                        <a href={`https://discord.com/users/${DISCORD_USER_ID}`} target="_blank" rel="noopener noreferrer" className="ls-social-item dc" title="Discord">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.23 10.23 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01 10.198 10.198 0 0 0 .372.292.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
                            </svg>
                        </a>
                        <a href="https://t.me/efeeeeeeeeeeeeeeeeeeeeeeeee" target="_blank" rel="noopener noreferrer" className="ls-social-item tg" title="Telegram">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-1.062 7.155-1.519 9.603-.193 1.034-.575 1.381-.943 1.416-.8.074-1.408-.526-2.183-1.034-1.213-.794-1.898-1.286-3.074-2.061-1.36-.895-.478-1.388.297-2.194.203-.21 3.724-3.414 3.796-3.724.009-.039.017-.184-.052-.246-.07-.062-.171-.041-.245-.024-.104.023-1.757 1.115-4.962 3.277-.469.322-.895.478-1.278.469-.422-.01-1.23-.238-1.832-.433-.738-.239-1.321-.365-1.27-.772.027-.211.318-.427.872-.647 3.403-1.48 5.672-2.457 6.806-2.929 3.242-1.347 3.916-1.58 4.356-1.588.097-.002.313.022.452.135.118.096.152.225.161.32-.01.059-.002.188-.012.288z"/>
                            </svg>
                        </a>
                    </div>
                </motion.div>

                {/* Weather — col 10-12, row 3 */}
                <motion.div className="ls-card ls-area-weather" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                    <div className="ls-weather-top">
                        <div className="ls-weather-main">
                            <div className="ls-temp">{weather.temp !== null ? `${weather.temp}°C` : '--°C'}</div>
                            <div className="ls-weather-loc">{t('istanbul')}</div>
                        </div>
                        {getWeatherIcon(weather.code)}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default LiveStatus;
