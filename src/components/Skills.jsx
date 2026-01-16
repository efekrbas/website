import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
    // Accordion Logic
    const [certOpen, setCertOpen] = useState(false);

    return (
        <motion.section
            id="skills"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="section-title">Yetenekler & Sertifikalar</h2>
            <div className="skills-wrapper">
                <div className="skill-category">
                    <h3>Teknik Yetenekler (10)</h3>
                    <div className="tags">
                        <span className="tag">Siber Güvenlik</span>
                        <span className="tag">Linux</span>
                        <span className="tag">C,C#,C++</span>
                        <span className="tag">Python</span>
                        <span className="tag">Javascript</span>
                        <span className="tag">HTML</span>
                        <span className="tag">CSS</span>
                        <span className="tag">Node.js</span>
                        <span className="tag">MySQL,MSSQL</span>
                        <span className="tag">Automation</span>
                    </div>
                </div>

                <div className="skill-category">
                    <h3>Diller (2)</h3>
                    <div className="languages">
                        <div className="lang-item">
                            <span>İngilizce</span>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '80%' }}></div>
                            </div>
                            <span className="level">Professional</span>
                        </div>
                        <div className="lang-item">
                            <span>Türkçe</span>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '100%' }}></div>
                            </div>
                            <span className="level">Native</span>
                        </div>
                    </div>
                </div>

                <div className="certifications glass-card">
                    <h3>Sertifikalar (13)</h3>
                    <ul className="cert-list">
                        <li><i className="fas fa-award"></i> Certified Associate Penetration Tester (CAPT) - Hackviser</li>
                        <li><i className="fas fa-award"></i> Technical Support Fundamentals - Google</li>
                        <li className={`cert-accordion-item ${certOpen ? 'active' : ''}`}>
                            <div className="cert-accordion-header" onClick={() => setCertOpen(!certOpen)}>
                                <span><i className="fas fa-award"></i> Garanti BBVA Genç Yeni Nesil Kariyer Okulu -
                                    Teknoloji Serisi</span>
                                <i className="fas fa-chevron-down accordion-icon"></i>
                            </div>
                            <ul className="cert-accordion-content">
                                <li><i className="fas fa-award"></i> Temel Makine Öğrenmesi</li>
                                <li><i className="fas fa-award"></i> GenAI</li>
                                <li><i className="fas fa-award"></i> ChatGPT kullanımı ve Prompt Mühendisliği</li>
                                <li><i className="fas fa-award"></i> Geleceğin Teknolojileri</li>
                            </ul>
                        </li>
                        <li><i className="fas fa-award"></i> UI/UX Web Designer - Miuul</li>
                        <li><i className="fas fa-award"></i> Yapay Zeka Mini Bootcamp - Miuul</li>
                        <li><i className="fas fa-award"></i> Bilgisayar İşletmenliği (Operatörlüğü) - MEB</li>
                        <li><i className="fas fa-award"></i> Nesneye Dayalı Programlama - Python - MEB</li>
                        <li><i className="fas fa-award"></i> Bilgisayarda Hızlı Klavye Kullanımı - MEB</li>
                        <li><i className="fas fa-award"></i> İnternet Alan Adları Hukuku - BTK Akademi</li>
                    </ul>
                </div>
            </div>
        </motion.section>
    );
};
export default Skills;
