import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Education = () => {
    const { t } = useLanguage();

    return (
        <motion.section
            id="education"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="section-title">{t('educationTitle')}</h2>
            <div className="education-grid">
                <div className="edu-card glass-card">
                    <div className="edu-inner">
                        <div className="logo-container">
                            <img src="/images/bilecik-universitesi-logo.png" alt="Bilecik Şeyh Edebali University"
                                className="company-logo" />
                        </div>
                        <div className="text-container">
                            <div className="year">2025 - 2027</div>
                            <h3>{t('bilecikUniversity')}</h3>
                            <p>{t('associateDegree')}</p>
                        </div>
                    </div>
                </div>
                <div className="edu-card glass-card">
                    <div className="edu-inner">
                        <div className="logo-container">
                            <img src="/images/dundar-ucar-logo.jpg" alt="Dündar Uçar MTAL" className="company-logo" />
                        </div>
                        <div className="text-container">
                            <div className="year">2022 - 2025</div>
                            <h3>{t('dundarUcarHighSchool')}</h3>
                            <p>{t('highSchool')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};
export default Education;
