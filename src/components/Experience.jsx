import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
    return (
        <motion.section
            id="experience"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="section-title">Deneyim</h2>
            <div className="timeline">
                <div className="timeline-item">
                    <div className="timeline-date">Kasım 2025 - Günümüz</div>
                    <div className="timeline-content glass-card">
                        <div className="timeline-inner">
                            <div className="logo-container">
                                <img src="/images/sibervatan.png" alt="Siber Vatan" className="company-logo" />
                            </div>
                            <div className="text-container">
                                <h3>Student</h3>
                                <h4>Siber Vatan</h4>
                                <p className="location"><i className="fas fa-map-marker-alt"></i> Bilecik, Türkiye</p>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-date">Eylül 2024 - Haziran 2025</div>
                    <div className="timeline-content glass-card">
                        <div className="timeline-inner">
                            <div className="text-container">
                                <h3>IT Field Support Intern</h3>
                                <h4>Medipol Sağlık Grubu</h4>
                                <p className="location"><i className="fas fa-map-marker-alt"></i> Bağcılar, İstanbul, Türkiye
                                </p>
                                <ul>
                                    <li>Son kullanıcı donanım-yazılım sorunları çözümü.</li>
                                    <li>Arıza tespiti ve pratik çözüm üretimi.</li>
                                    <li>Donanım kurulum ve bakım işlemleri.</li>
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
