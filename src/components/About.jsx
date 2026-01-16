import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <motion.section
            id="about"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="section-title">Hakkımda</h2>
            <div className="about-container">
                <div className="about-image-wrapper">
                    <img src="/images/efe-profile.png" alt="Efe Kırbaş" className="about-profile-img" />
                </div>
                <div className="about-details">
                    <div className="about-text">
                        <p>Medipol Sağlık Grubu'nda Bilgi İşlem Saha Destek Stajyeri olarak çalıştım ve bu süreçte son
                            kullanıcıların donanım-yazılım sorunlarını çözme, arıza-tespiti konularında pratik deneyim
                            kazandım. Ayrıca bilgisayar, yazıcı ve çevre birimlerinin kurulum–bakım işlemlerini
                            gerçekleştirme
                            konularında aktif görev aldım. <br />Bilecik Şeyh Edebali Üniversitesi'nde Bilgisayar
                            Programcılığı bölümünde önlisans eğitimime devam ediyor, aynı zamanda yazılım geliştirme
                            üzerine yoğunlaşıyorum.</p>
                    </div>
                    <div className="stats-grid">
                        <motion.div className="stat-card glass-card" whileHover={{ y: -5 }}>
                            <i className="fas fa-code"></i>
                            <h3>Developer</h3>
                            <p>CLI & Automation</p>
                        </motion.div>
                        <motion.div className="stat-card glass-card" whileHover={{ y: -5 }}>
                            <i className="fas fa-shield-alt"></i>
                            <h3>Cyber Security</h3>
                            <p>Student @ Siber Vatan</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};
export default About;
