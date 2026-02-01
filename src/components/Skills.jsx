import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Skills = () => {
    const [activeAccordion, setActiveAccordion] = useState(null);
    const { t } = useLanguage();

    const toggleAccordion = (name) => {
        setActiveAccordion(activeAccordion === name ? null : name);
    };

    // Sertifika sayısını hesapla
    const hackviserCertCount = 1; // CAPT
    const ciscoCertCount = 7; // Industrial Networking, Network Technician, Networking Basics, Digital Safety, Cybersecurity, IoT, Modern AI
    const garantiCertCount = 5; // Garanti BBVA + MachineLearning, GenAI, ChatGPT, FutureTech
    const googleCertCount = 1; // TechSupport
    const miuulCertCount = 2; // UIUX, AIMiniBootcamp
    const mebCertCount = 3; // ComputerOperator, OOP, FastTyping
    const btkCertCount = 1; // DomainLaw
    const totalCertCount = hackviserCertCount + ciscoCertCount + garantiCertCount + googleCertCount + miuulCertCount + mebCertCount + btkCertCount;

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

                <div className="certifications glass-card">
                    <h3>{t('certificates')} ({totalCertCount})</h3>
                    <ul className="cert-list">
                        <li className={`cert-accordion-item ${activeAccordion === 'hackviser' ? 'active' : ''}`}>
                            <div className="cert-accordion-header" onClick={() => toggleAccordion('hackviser')}>
                                <span>Hackviser</span>
                                <i className="fas fa-chevron-down accordion-icon"></i>
                            </div>
                            <ul className="cert-accordion-content">
                                <li><i className="fas fa-award"></i> {t('certCAPT')}</li>
                            </ul>
                        </li>
                        <li className={`cert-accordion-item ${activeAccordion === 'cisco' ? 'active' : ''}`}>
                            <div className="cert-accordion-header" onClick={() => toggleAccordion('cisco')}>
                                <span>Cisco</span>
                                <i className="fas fa-chevron-down accordion-icon"></i>
                            </div>
                            <ul className="cert-accordion-content">
                                <li><i className="fas fa-award"></i> {t('certIndustrialNetworking')}</li>
                                <li><i className="fas fa-award"></i> {t('certNetworkTechnician')}</li>
                                <li><i className="fas fa-award"></i> {t('certNetworkingBasics')}</li>
                                <li><i className="fas fa-award"></i> {t('certDigitalSafety')}</li>
                                <li><i className="fas fa-award"></i> {t('certCybersecurity')}</li>
                                <li><i className="fas fa-award"></i> {t('certIoT')}</li>
                                <li><i className="fas fa-award"></i> {t('certModernAI')}</li>
                            </ul>
                        </li>
                        <li className={`cert-accordion-item ${activeAccordion === 'google' ? 'active' : ''}`}>
                            <div className="cert-accordion-header" onClick={() => toggleAccordion('google')}>
                                <span>Google</span>
                                <i className="fas fa-chevron-down accordion-icon"></i>
                            </div>
                            <ul className="cert-accordion-content">
                                <li><i className="fas fa-award"></i> {t('certTechSupport')}</li>
                            </ul>
                        </li>
                        <li className={`cert-accordion-item ${activeAccordion === 'miuul' ? 'active' : ''}`}>
                            <div className="cert-accordion-header" onClick={() => toggleAccordion('miuul')}>
                                <span>Miuul</span>
                                <i className="fas fa-chevron-down accordion-icon"></i>
                            </div>
                            <ul className="cert-accordion-content">
                                <li><i className="fas fa-award"></i> {t('certUIUX')}</li>
                                <li><i className="fas fa-award"></i> {t('certAIMiniBootcamp')}</li>
                            </ul>
                        </li>
                        <li className={`cert-accordion-item ${activeAccordion === 'meb' ? 'active' : ''}`}>
                            <div className="cert-accordion-header" onClick={() => toggleAccordion('meb')}>
                                <span>MEB</span>
                                <i className="fas fa-chevron-down accordion-icon"></i>
                            </div>
                            <ul className="cert-accordion-content">
                                <li><i className="fas fa-award"></i> {t('certComputerOperator')}</li>
                                <li><i className="fas fa-award"></i> {t('certOOP')}</li>
                                <li><i className="fas fa-award"></i> {t('certFastTyping')}</li>
                            </ul>
                        </li>
                        <li className={`cert-accordion-item ${activeAccordion === 'btk' ? 'active' : ''}`}>
                            <div className="cert-accordion-header" onClick={() => toggleAccordion('btk')}>
                                <span>{t('btkAkademi')}</span>
                                <i className="fas fa-chevron-down accordion-icon"></i>
                            </div>
                            <ul className="cert-accordion-content">
                                <li><i className="fas fa-award"></i> {t('certDomainLaw')}</li>
                            </ul>
                        </li>
                        <li className={`cert-accordion-item ${activeAccordion === 'garanti' ? 'active' : ''}`}>
                            <div className="cert-accordion-header" onClick={() => toggleAccordion('garanti')}>
                                <span>{t('certGarantiBBVA')}</span>
                                <i className="fas fa-chevron-down accordion-icon"></i>
                            </div>
                            <ul className="cert-accordion-content">
                                <li><i className="fas fa-award"></i> {t('certMachineLearning')}</li>
                                <li><i className="fas fa-award"></i> {t('certGenAI')}</li>
                                <li><i className="fas fa-award"></i> {t('certChatGPT')}</li>
                                <li><i className="fas fa-award"></i> {t('certFutureTech')}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </motion.section>
    );
};
export default Skills;
