import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Header = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const { t } = useLanguage();

    const sections = ['about', 'experience', 'skills', 'education', 'projects', 'youtube', 'contact'];

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -30% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) observer.observe(section);
        });

        // Special case for hero section
        const heroSection = document.getElementById('hero');
        if (heroSection) observer.observe(heroSection);

        return () => observer.disconnect();
    }, []);

    const toggleNav = () => {
        setNavOpen(!navOpen);
    };

    const handleNavClick = (e, id) => {
        e.preventDefault();
        setNavOpen(false);

        const element = document.getElementById(id);
        if (element) {
            // CSS'te section padding-top 80px olduğu için offsetTop tam olarak header'ın bittiği yere denk gelir
            const targetPosition = element.offsetTop;

            // Zaten o hizada mıyız? (10px tolerans)
            if (Math.abs(window.scrollY - targetPosition) < 10) {
                return;
            }

            window.history.pushState({}, '', `/#${id}`);
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

            setActiveSection(id);
        }
    };

    return (
        <header>
            <nav className="glass-nav">
                <div className="logo">EFEK</div>
                <ul className={`nav-links ${navOpen ? 'nav-active' : ''}`}>
                    {sections.map(id => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                className={activeSection === id ? 'active' : ''}
                                onClick={(e) => handleNavClick(e, id)}
                            >
                                {t(id)}
                            </a>
                        </li>
                    ))}
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
