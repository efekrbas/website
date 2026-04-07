import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();
    const [typedText, setTypedText] = useState('');
    const fullText = "Efe Kırbaş";

    useEffect(() => {
        let i = 0;
        let isDeleting = false;
        let timer;

        const loop = () => {
            if (!isDeleting && i <= fullText.length) {
                setTypedText(fullText.slice(0, i));
                i++;
                timer = setTimeout(loop, i > fullText.length ? 2000 : 150);
            } else if (isDeleting && i >= 0) {
                setTypedText(fullText.slice(0, i));
                i--;
                timer = setTimeout(loop, i < 0 ? 500 : 80);
            } else if (i > fullText.length) {
                isDeleting = true;
                timer = setTimeout(loop, 0); 
            } else if (i < 0) {
                isDeleting = false;
                i = 0;
                timer = setTimeout(loop, 0);
            }
        };

        timer = setTimeout(loop, 150);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="hero">
            <motion.div
                className="hero-content"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="greeting">{t('greeting')}</span>
                <h1 
                    style={{ 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        display: 'flex', 
                        alignItems: 'center',
                        margin: '0 0 10px 0'
                    }}
                >
                    {typedText}
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        style={{ marginLeft: "6px", fontWeight: "400" }}
                    >
                        _
                    </motion.span>
                </h1>
                <h2 className="subtitle">{t('softwareDeveloper')}</h2>
                <p className="hero-desc">{t('heroDesc')}</p>
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
