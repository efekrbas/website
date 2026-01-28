import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Header = () => {
    const [navOpen, setNavOpen] = useState(false);
    const { t } = useLanguage();

    const toggleNav = () => {
        setNavOpen(!navOpen);
    };

    const handleNavClick = (e, id) => {
        e.preventDefault();
        setNavOpen(false);
        const element = document.getElementById(id);
        if (element) {
            window.history.pushState({}, '', `/#${id}`);
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header>
            <nav className="glass-nav">
                <div className="logo">EK.</div>
                <ul className={`nav-links ${navOpen ? 'nav-active' : ''}`}>
                    <li><a href="/about" onClick={(e) => handleNavClick(e, 'about')}>{t('about')}</a></li>
                    <li><a href="/experience" onClick={(e) => handleNavClick(e, 'experience')}>{t('experience')}</a></li>
                    <li><a href="/skills" onClick={(e) => handleNavClick(e, 'skills')}>{t('skills')}</a></li>
                    <li><a href="/education" onClick={(e) => handleNavClick(e, 'education')}>{t('education')}</a></li>
                    <li><a href="/projects" onClick={(e) => handleNavClick(e, 'projects')}>{t('projects')}</a></li>
                    <li><a href="/contact" onClick={(e) => handleNavClick(e, 'contact')}>{t('contact')}</a></li>
                    <li className="mobile-lang-toggle"><LanguageToggle /></li>
                </ul>
                <div className="desktop-lang-toggle">
                    <LanguageToggle />
                </div>
                <div className={`burger ${navOpen ? 'toggle' : ''}`} onClick={toggleNav}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
