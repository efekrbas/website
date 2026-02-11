import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

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
        // Valid placeholder that works if needed, but sticking to real ones found.
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
                        <div className="video-container">
                            <iframe
                                src={`https://www.youtube.com/embed/${video.id}`}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
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
            <style jsx>{`
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
