import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Experience = () => {
    const { language, t } = useLanguage();

    return (
        <motion.section
            id="experience"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="section-title">{t('experienceTitle')}</h2>
            <div className="timeline">
                <div className="timeline-item">
                    <div className="timeline-date">
                        {language === 'tr' ? 'Kasım 2025 - Günümüz' : 'November 2025 - Present'}
                    </div>
                    <div className="timeline-content glass-card">
                        <div className="timeline-inner">
                            <div className="logo-container">
                                <img src="/images/sibervatan.png" alt="Siber Vatan" className="company-logo" />
                            </div>
                            <div className="text-container">
                                <h3>{t('cyberSecurityStudent')}</h3>
                                <h4>{t('cyberHomeland')}</h4>
                                <p className="location"><i className="fas fa-map-marker-alt"></i> Bilecik, {language === 'tr' ? 'Türkiye' : 'Türkiye'}</p>

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
                                <p className="location"><i className="fas fa-map-marker-alt"></i> Bağcılar, İstanbul, {language === 'tr' ? 'Türkiye' : 'Türkiye'}
                                </p>
                                <ul>
                                    <li>{t('expItem1')}</li>
                                    <li>{t('expItem2')}</li>
                                    <li>{t('expItem3')}</li>
                                </ul>
                            </div>
                            <div className="logo-container">
                                <img src="/images/medipol.png" alt="Medipol Sağlık Grubu" className="company-logo" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};
export default Experience;
