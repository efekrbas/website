import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="hero">
            <motion.div
                className="hero-content"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="greeting">Merhaba, ben</span>
                <h1 className="glitch" data-text="Efe Kırbaş">Efe Kırbaş</h1>
                <h2 className="subtitle">CLI & <span className="highlight">Automation</span> Developer</h2>
                <p className="hero-desc">Karmaşık iş akışlarını terminale taşıyor, sistemleri otomatize eden verimli toollar
                    geliştiriyorum</p>
                <div className="cta-buttons">
                    <a href="#contact" className="btn primary">İletişime Geç <i className="fas fa-arrow-right"></i></a>
                    <a href="https://www.linkedin.com/in/efekrbs" target="_blank" className="btn secondary"><i
                        className="fab fa-linkedin"></i> LinkedIn</a>
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
    char *skills[] = {"CyberSec", "Linux", "C"};
    char *mission = "Automate Everything";
    
    printf("Hello World! I'm Efe.\\n");
    return 0;
}`}
                    </code></pre>
                </div>
            </motion.div>
            <div className="scroll-down">
                <span>Kaydır</span>
                <i className="fas fa-chevron-down"></i>
            </div>
        </section>
    );
};
export default Hero;
