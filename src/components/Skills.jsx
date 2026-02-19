import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Skills = () => {
    const { t } = useLanguage();

    return (
        <motion.section
            id="skills"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="section-title">{t('skillsTitle')}</h2>
            <div className="skills-wrapper">
                <div className="skill-category">
                    <h3>{t('technicalSkills')} (10)</h3>
                    <div className="tags">
                        <span className="tag">{t('penetrationTesting')}</span>
                        <span className="tag">Linux</span>
                        <span className="tag">C,C#,C++</span>
                        <span className="tag">Python</span>
                        <span className="tag">Javascript</span>
                        <span className="tag">HTML</span>
                        <span className="tag">CSS</span>
                        <span className="tag">Node.js</span>
                        <span className="tag">MySQL,MSSQL</span>
                        <span className="tag">{t('automation')}</span>
                    </div>
                </div>

                <div className="skill-category">
                    <h3>{t('languages')} (2)</h3>
                    <div className="languages">
                        <div className="lang-item">
                            <span>{t('english')}</span>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '80%' }}></div>
                            </div>
                            <span className="level">{t('professional')}</span>
                        </div>
                        <div className="lang-item">
                            <span>{t('turkish')}</span>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '100%' }}></div>
                            </div>
                            <span className="level">{t('Congenital')}</span>
                        </div>
                    </div>
                </div>

                <div className="skill-category certifications-section">
                    <h3>{t('certificates')}</h3>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <a
                            href="https://www.linkedin.com/in/efekrbs/details/certifications/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="view-certs-btn"
                        >
                            <i className="fas fa-award"></i> {t('viewCertifications')}
                            <i className="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};
export default Skills;

