'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

interface MediumPost {
    title: string;
    description: string;
    pubDate: string;
    link: string;
    thumbnail: string;
    categories: string[];
}

const MediumCard = ({ post, index }: { post: MediumPost; index: number }) => {
    const { t } = useLanguage();

    const formatDate = (dateStr: string) => {
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <motion.a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="medium-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
        >
            {post.thumbnail && (
                <div className="medium-card-thumbnail">
                    <Image src={post.thumbnail} alt={post.title} width={400} height={200} loading="lazy" />
                    <div className="medium-card-overlay">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                        </svg>
                    </div>
                </div>
            )}
            <div className="medium-card-content">
                <div className="medium-card-meta">
                    <span className="medium-card-date">{formatDate(post.pubDate)}</span>
                    {post.categories.length > 0 && (
                        <div className="medium-card-tags">
                            {post.categories.slice(0, 3).map((cat) => (
                                <span key={cat} className="medium-tag">{cat}</span>
                            ))}
                        </div>
                    )}
                </div>
                <h3 className="medium-card-title">{post.title}</h3>
            </div>
        </motion.a>
    );
};

const Medium = () => {
    const { t } = useLanguage();

    const posts: MediumPost[] = [
        {
            title: "Custom Windows XP Zafiyet Analizi",
            description: "",
            pubDate: "2026-05-31",
            link: "https://medium.com/@efekk/custom-windows-xp-zafiyet-analizi-af6f1af27df3",
            thumbnail: "https://cdn-images-1.medium.com/max/945/0*p4PsNjLZBsJd9PWM",
            categories: []
        },
        {
            title: "Metasploitable2 Zafiyet Analizi",
            description: "",
            pubDate: "2026-05-31",
            link: "https://medium.com/@efekk/custom-metasploitable2-zafiyet-analizi-f4132060ca17",
            thumbnail: "https://cdn-images-1.medium.com/max/945/0*My_f2lA9Jppb4Tcd",
            categories: []
        }
    ];

    return (
        <motion.section
            id="medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="section-title">{t('mediumTitle')}</h2>

            <div className="medium-grid">
                {posts.map((post, index) => (
                    <MediumCard key={post.link} post={post} index={index} />
                ))}
            </div>

            <div className="github-more" style={{ marginTop: '8px', marginBottom: '24px' }}>
                <a href="https://medium.com/@efekk" target="_blank" rel="noopener noreferrer" className="btn secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                    </svg>
                    {t('visitMedium')}
                </a>
            </div>

            <style>{`
                .medium-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 2rem;
                    padding: 1rem;
                }

                .medium-card {
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    border-radius: 15px;
                    background: var(--card-bg);
                    backdrop-filter: blur(10px);
                    border: 1px solid var(--card-border);
                    transition: background 0.3s ease, border-color 0.3s ease;
                    text-decoration: none;
                    color: inherit;
                    cursor: pointer;
                }

                .medium-card:hover {
                    border-color: var(--border-hover);
                    background: var(--card-hover);
                }

                .medium-card-thumbnail {
                    position: relative;
                    width: 100%;
                    height: 200px;
                    overflow: hidden;
                    background: rgba(255, 255, 255, 0.03);
                }

                .medium-card-thumbnail img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .medium-card:hover .medium-card-thumbnail img {
                    transform: scale(1.05);
                }

                .medium-card-overlay {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    width: 36px;
                    height: 36px;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(8px);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #00ab6c;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .medium-card:hover .medium-card-overlay {
                    opacity: 1;
                }

                .medium-card-content {
                    padding: 1.25rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.6rem;
                    flex: 1;
                }

                .medium-card-meta {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .medium-card-date {
                    font-size: 0.72rem;
                    color: var(--text-subtle);
                    font-weight: 500;
                }

                .medium-card-tags {
                    display: flex;
                    gap: 6px;
                    flex-wrap: wrap;
                }

                .medium-tag {
                    font-size: 0.62rem;
                    padding: 2px 8px;
                    border-radius: 12px;
                    background: rgba(0, 171, 108, 0.1);
                    color: #00ab6c;
                    border: 1px solid rgba(0, 171, 108, 0.2);
                    font-weight: 500;
                    text-transform: lowercase;
                }

                .medium-card-title {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    line-height: 1.4;
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .medium-card-desc {
                    font-size: 0.82rem;
                    color: var(--secondary-text);
                    line-height: 1.6;
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .medium-read-more {
                    font-size: 0.78rem;
                    font-weight: 600;
                    color: #00ab6c;
                    margin-top: auto;
                    padding-top: 0.5rem;
                    transition: all 0.3s ease;
                }

                .medium-card:hover .medium-read-more {
                    color: #00d68a;
                    letter-spacing: 0.5px;
                }

                .medium-loading {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                    padding: 3rem;
                    color: var(--text-subtle);
                }

                .medium-loading-spinner {
                    width: 32px;
                    height: 32px;
                    border: 2px solid var(--border-default);
                    border-top-color: #00ab6c;
                    border-radius: 50%;
                    animation: medium-spin 0.8s linear infinite;
                }

                @keyframes medium-spin {
                    to { transform: rotate(360deg); }
                }

                .medium-empty {
                    text-align: center;
                    padding: 3rem;
                    color: var(--text-subtle);
                    font-size: 0.9rem;
                }

                @media (max-width: 768px) {
                    .medium-grid {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                    }

                    .medium-card-thumbnail {
                        height: 180px;
                    }
                }
            `}</style>
        </motion.section>
    );
};

export default Medium;
