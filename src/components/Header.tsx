import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const sections = ['about', 'live-status', 'experience', 'education', 'projects', 'youtube', 'medium'];

const Header = () => {

    const [navOpen, setNavOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const { t } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
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

        const observeAll = () => {
            observer.disconnect();
            const allIds = ['hero', ...sections];
            allIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) observer.observe(el);
            });
        };

        // Initial observe after a short delay so lazy components mount
        const timer = setTimeout(observeAll, 800);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };

    }, []);

    const toggleNav = () => {
        setNavOpen(!navOpen);
    };

    const handleNavClick = (e, id) => {
        e.preventDefault();
        setNavOpen(false);

        const element = document.getElementById(id);
        if (element) {
            let targetPosition = element.offsetTop;
            
            // Offset logic removed to prevent sections from being too close to the navbar

            // Zaten o hizada mıyız? (10px tolerans)
            if (Math.abs(window.scrollY - targetPosition) < 10) {
                return;
            }

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
                <div className="logo">EFE KIRBAŞ</div>
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
                </ul>
                <div className="nav-actions">
                    <button
                        className="theme-toggle-btn"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        id="theme-toggle"
                    >
                        {theme === 'dark' ? (
                            <i className="fas fa-sun"></i>
                        ) : (
                            <i className="fas fa-moon"></i>
                        )}
                    </button>
                    <div className={`burger ${navOpen ? 'toggle' : ''}`} onClick={toggleNav}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
