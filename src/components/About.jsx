import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();

    return (
        <motion.section
            id="about"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="section-title">{t('aboutTitle')}</h2>
            <div className="about-container">
                <div className="about-image-wrapper">
                    <img src="/images/efe-profile.png" alt="Efe Kırbaş" className="about-profile-img" />
                </div>
                <div className="about-details">
                    <div className="about-text">
                        <p>{t('aboutText')}</p>
                    </div>
                    <div className="stats-grid">
                        <motion.div className="stat-card glass-card" whileHover={{ y: -5 }}>
                            <i className="fas fa-code"></i>
                            <h3>{t('softwareDeveloper')}</h3>
                        </motion.div>
                        <motion.div className="stat-card glass-card" whileHover={{ y: -5 }}>
                            <i className="fas fa-shield-alt"></i>
                            <h3>{t('cyberSecurityEnthusiast')}</h3>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};
export default About;
