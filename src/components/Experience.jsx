import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Experience = () => {
    const { language, t } = useLanguage();
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const heightScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
    const smoothHeight = useSpring(heightScale, { stiffness: 100, damping: 30 });

    return (
        <motion.section
            id="experience"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="section-title">{t('experienceTitle')}</h2>
            <div className="timeline" ref={containerRef}>
                <motion.div
                    className="timeline-progress-bar"
                    style={{ scaleY: smoothHeight }}
                />

                <div className="timeline-item">
                    <div className="timeline-date">
                        {language === 'tr' ? 'Şubat 2026 - Devam ediyor' : 'February 2026 - Continuing'}
                    </div>
                    <div className="timeline-content glass-card">
                        <div className="timeline-inner">
                            <div className="text-container">
                                <h3>{t('campusAmbassador')}</h3>
                                <h4>{t('hackviser')}</h4>
                                <p className="location"><i className="fas fa-map-marker-alt"></i> {language === 'tr' ? 'Londra, Birleşik Krallık · Uzaktan' : 'London, United Kingdom · Remote'}</p>
                            </div>
                            <div className="logo-container">
                                <img src="/images/hackviser.jpg" alt="Hackviser" className="company-logo" loading="lazy" decoding="async" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-date">
                        {language === 'tr' ? 'Kasım 2025 - Devam ediyor' : 'November 2025 - Continuing'}
                    </div>
                    <div className="timeline-content glass-card">
                        <div className="timeline-inner">
                            <div className="logo-container">
                                <img
                                    src="/images/sibervatan.png"
                                    alt="Siber Vatan"
                                    className="company-logo"
                                    style={{ backgroundColor: 'transparent', padding: 0 }}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <div className="text-container">
                                <h3>{t('cyberSecurityStudent')}</h3>
                                <h4>{t('cyberHomeland')}</h4>
                                <p className="location"><i className="fas fa-map-marker-alt"></i> Bilecik, {language === 'tr' ? 'Türkiye' : 'Türkiye'}</p>
                                <ul>
                                    <li>{t('svItem1')}</li>
                                    <li>{t('svItem2')}</li>
                                    <li>{t('svItem3')}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-date">
                        {language === 'tr' ? 'Eylül 2024 - Haziran 2025' : 'September 2024 - June 2025'}
                    </div>
                    <div className="timeline-content glass-card">
                        <div className="timeline-inner">
                            <div className="text-container">
                                <h3>{t('itFieldSupportIntern')}</h3>
                                <h4>{t('medipolHealthGroup')}</h4>
                                <p className="location"><i className="fas fa-map-marker-alt"></i> Bağcılar, İstanbul, {language === 'tr' ? 'Türkiye' : 'Türkiye'} · Ofiste
                                </p>
                                <ul>
                                    <li>{t('expItem1')}</li>
                                    <li>{t('expItem2')}</li>
                                    <li>{t('expItem3')}</li>
                                </ul>
                            </div>
                            <div className="logo-container">
                                <img src="/images/medipol.png" alt="Medipol Sağlık Grubu" className="company-logo" loading="lazy" decoding="async" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};
export default Experience;
