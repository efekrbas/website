import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Experience = () => {
    const { language, t } = useLanguage();
    const containerRef = useRef(null);

    const calculateDuration = (startYear, startMonth, endYear = null, endMonth = null) => {
        const start = new Date(startYear, startMonth - 1);
        const end = endYear && endMonth ? new Date(endYear, endMonth - 1) : new Date();
        
        let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        if (!endYear) months += 1; // Devam eden işler için içinde bulunduğumuz ayı da sayalım

        if (months <= 0) return language === 'tr' ? 'Yeni' : 'New';
        
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        
        let result = '';
        if (years > 0) {
            result += `${years} ${language === 'tr' ? 'yıl' : 'year'}${years > 1 && language === 'en' ? 's' : ''}`;
        }
        if (remainingMonths > 0) {
            if (result) result += ' ';
            result += `${remainingMonths} ${language === 'tr' ? 'ay' : 'month'}${remainingMonths > 1 && language === 'en' ? 's' : ''}`;
        }
        return result || (language === 'tr' ? '1 ay' : '1 month');
    };

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
                        {language === 'tr' 
                            ? `Mayıs 2026 - Devam ediyor · ${calculateDuration(2026, 5)}` 
                            : `May 2026 - Continuing · ${calculateDuration(2026, 5)}`}
                    </div>
                    <div className="timeline-content glass-card">
                        <div className="timeline-inner">
                            <div className="logo-container">
                                <img src="/images/siber0x1.png" alt="Siber0x1" className="company-logo" loading="lazy" decoding="async" />
                            </div>
                            <div className="text-container">
                                <h3>{t('founder')}</h3>
                                <h4>{t('siber0x1')}</h4>
                                <p className="description">{t('siber0x1Desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="timeline-item">
                    <div className="timeline-date">
                        {language === 'tr' 
                            ? `Şubat 2026 - Devam ediyor · ${calculateDuration(2026, 2)}` 
                            : `February 2026 - Continuing · ${calculateDuration(2026, 2)}`}
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
                        {language === 'tr' 
                            ? `Kasım 2025 - Devam ediyor · ${calculateDuration(2025, 11)}` 
                            : `November 2025 - Continuing · ${calculateDuration(2025, 11)}`}
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
                        {language === 'tr' 
                            ? `Eylül 2024 - Haziran 2025 · ${calculateDuration(2024, 9, 2025, 6)}` 
                            : `September 2024 - June 2025 · ${calculateDuration(2024, 9, 2025, 6)}`}
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
