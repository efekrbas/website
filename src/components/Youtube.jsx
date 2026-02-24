import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const VideoCard = ({ video }) => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(false);
    const iframeRef = React.useRef(null);

    const togglePlay = () => {
        if (!iframeRef.current) return;

        const action = isPaused ? 'playVideo' : 'pauseVideo';
        iframeRef.current.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: action,
            args: []
        }), '*');
        setIsPaused(!isPaused);
    };

    const handleThumbnailClick = () => {
        setIsPlaying(true);
        setIsPaused(false);
    };

    return (
        <div className="video-container">
            {!isPlaying ? (
                <div
                    className="video-thumbnail"
                    onClick={handleThumbnailClick}
                    style={{
                        backgroundImage: `url(https://img.youtube.com/vi/${video.id}/maxresdefault.jpg)`,
                        cursor: 'none'
                    }}
                >
                    <div className="play-button">
                        <i className="fas fa-play"></i>
                    </div>
                </div>
            ) : (
                <>
                    <iframe
                        ref={iframeRef}
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&enablejsapi=1&controls=0&modestbranding=1&rel=0`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                    <div
                        className="video-overlay"
                        onClick={togglePlay}
                        style={{
                            cursor: 'none',
                            backgroundColor: isPaused ? 'rgba(0, 0, 0, 0.4)' : 'transparent',
                            backdropFilter: isPaused ? 'blur(5px)' : 'none',
                            transition: 'background-color 0.3s, backdrop-filter 0.3s'
                        }}
                    >
                        {isPaused && (
                            <div className="play-button overlay-icon">
                                <i className="fas fa-play"></i>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

const Youtube = () => {
    const { t } = useLanguage();

    const videos = [
        {
            id: '7KzIZfZtk9g', // Found via search
            title: 'Microsoft IIS ile Localde Web Server Kurulumu',
        },
        {
            id: 'm25zP_XQeq4', // Found via search
            title: 'Discord Orbs Rozeti Nasıl Alınır?',
        },
    ];

    return (
        <motion.section
            id="youtube"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="section-title">{t('youtubeTitle')}</h2>
            <div className="youtube-grid">
                {videos.map((video, index) => (
                    <motion.div
                        className="youtube-card glass-card"
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <VideoCard video={video} />
                        <div className="youtube-content">
                            <h3 className="youtube-video-title">{video.title}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="github-more">
                <a href="https://www.youtube.com/@efekrbs" target="_blank" rel="noopener noreferrer" className="btn secondary">
                    <i className="fab fa-youtube"></i> {t('visitChannel')}
                </a>
            </div>
            <style>{`
                .youtube-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    padding: 1rem;
                }
                .youtube-card {
                    overflow: hidden;
                    border-radius: 15px;
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: transform 0.3s ease;
                }
                .youtube-card:hover {
                    transform: translateY(-5px);
                }
                .video-container {
                    position: relative;
                    padding-bottom: 56.25%; /* 16:9 aspect ratio */
                    height: 0;
                    overflow: hidden;
                    background-color: #000;
                }
                .video-thumbnail {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: opacity 0.3s ease;
                }
                .video-thumbnail:hover {
                    opacity: 0.9;
                }
                .video-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: transparent;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .play-button {
                    width: 60px;
                    height: 60px;
                    background: rgba(255, 0, 0, 0.9);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 24px;
                    box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .video-thumbnail:hover .play-button, .play-button.overlay-icon:hover {
                    transform: scale(1.1);
                    box-shadow: 0 0 30px rgba(255, 0, 0, 0.7);
                }
                .video-container iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: 0;
                }
                .youtube-content {
                    padding: 1rem;
                }
                .youtube-video-title {
                    font-size: 1.1rem;
                    margin: 0;
                    color: #fff;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            `}</style>
        </motion.section>
    );
};

export default Youtube;
