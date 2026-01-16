import React, { useState } from 'react';

const Header = () => {
    const [navOpen, setNavOpen] = useState(false);

    const toggleNav = () => {
        setNavOpen(!navOpen);
    };

    return (
        <header>
            <nav className="glass-nav">
                <div className="logo">EK.</div>
                <ul className={`nav-links ${navOpen ? 'nav-active' : ''}`}>
                    <li><a href="#about" onClick={() => setNavOpen(false)}>Hakkımda</a></li>
                    <li><a href="#experience" onClick={() => setNavOpen(false)}>Deneyim</a></li>
                    <li><a href="#skills" onClick={() => setNavOpen(false)}>Yetenekler</a></li>
                    <li><a href="#education" onClick={() => setNavOpen(false)}>Eğitim</a></li>
                    <li><a href="#projects" onClick={() => setNavOpen(false)}>Projeler</a></li>
                    <li><a href="#contact" onClick={() => setNavOpen(false)}>İletişim</a></li>
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
