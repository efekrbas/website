import React, { useState } from 'react';

const Header = () => {
    const [navOpen, setNavOpen] = useState(false);

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
                    <li><a href="/about" onClick={(e) => handleNavClick(e, 'about')}>Hakkımda</a></li>
                    <li><a href="/experience" onClick={(e) => handleNavClick(e, 'experience')}>Deneyim</a></li>
                    <li><a href="/skills" onClick={(e) => handleNavClick(e, 'skills')}>Yetenekler</a></li>
                    <li><a href="/education" onClick={(e) => handleNavClick(e, 'education')}>Eğitim</a></li>
                    <li><a href="/projects" onClick={(e) => handleNavClick(e, 'projects')}>Projeler</a></li>
                    <li><a href="/contact" onClick={(e) => handleNavClick(e, 'contact')}>İletişim</a></li>
                </ul>
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
