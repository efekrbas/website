import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section id="hero">
            <motion.div
                className="hero-content"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="greeting">{t('greeting')}</span>
                <h1 className="glitch" data-text="Efe Kırbaş">Efe Kırbaş</h1>
                <h2 className="subtitle">{t('softwareDeveloper')}</h2>
                <p className="hero-desc">{t('heroDesc')}</p>
                <div className="cta-buttons">
                    <a href="/#contact" className="btn primary" onClick={(e) => {
                        e.preventDefault();
                        window.history.pushState({}, '', '/#contact');
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                        } else {
                            window.location.href = '/#contact';
                        }
                    }}>{t('contactBtn')}</a>
                    <a href="/Efe Kırbaş CV.pdf" download="Efe_Kirbas_CV.pdf" className="btn secondary">
                        <i className="fas fa-download"></i> {t('downloadCV')}
                    </a>
                </div>
            </motion.div>
            <motion.div
                className="hero-visual"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="code-block">
                    <div className="code-header">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                    </div>
                    <pre><code className="language-c">
                        {`#include <stdio.h>

int main() {
    char *skills[] = ${t('codeSkills')};
    char *mission = "${t('codeMission')}";
    
    printf("${t('codeHello')}\\n");
    return 0;
}`}
                    </code></pre>
                </div>
            </motion.div>
            <div className="scroll-down">
                <span>{t('scroll')}</span>
                <i className="fas fa-chevron-down"></i>
            </div>
        </section>
    );
};
export default Hero;
