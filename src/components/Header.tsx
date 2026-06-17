import React, { useState, useEffect } from 'react';
import { Bot, BotOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const sections = ['about', 'live-status', 'experience', 'education', 'projects', 'open-source', 'youtube', 'medium'];

const Header = () => {

    const [navOpen, setNavOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [chatbotOpen, setChatbotOpen] = useState(false);
    const [chatbotHidden, setChatbotHidden] = useState(false);
    const [isManualScroll, setIsManualScroll] = useState(false);
    const { t } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('chatbotHidden');
            if (stored === 'true') {
                setChatbotHidden(true);
            }
        }
    }, []);

    const toggleChatbotVisibility = () => {
        const newState = !chatbotHidden;
        setChatbotHidden(newState);
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('setChatbotVisibility', { detail: { visible: !newState } }));
        }
    };

    useEffect(() => {
        const handleChatbotState = (e) => setChatbotOpen(e.detail);
        if (typeof window !== 'undefined') {
            window.addEventListener('chatbotStateChange', handleChatbotState);
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('chatbotStateChange', handleChatbotState);
            }
        };
    }, []);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            if (isManualScroll) return;
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

    }, [isManualScroll]);

    const toggleNav = () => {
        setNavOpen(!navOpen);
    };

    const handleNavClick = (e, id) => {
        e.preventDefault();
        setNavOpen(false);
        setIsManualScroll(true);
        setTimeout(() => setIsManualScroll(false), 1000);

        const element = document.getElementById(id);
        if (element) {
            
            // Animasyonlar (framer-motion vs) transform kullandığı için getBoundingClientRect 
            // ilk tıklamada yanlış değer verebiliyor. Bu yüzden offsetTop ile mutlak konumu buluyoruz.
            let elementPosition = 0;
            let curr: HTMLElement | null = element as HTMLElement;
            while (curr) {
                elementPosition += curr.offsetTop;
                curr = curr.offsetParent as HTMLElement | null;
            }
            
            let targetPosition = elementPosition;
            
            // Canlı durum (Live Status) içeriği uzun olduğu için laptoplarda içeriği ortalamak adına ofset ekliyoruz
            // (Kullanıcı Spotify kartının aşağıya yapışmasını istemedi)
            if (id === 'live-status' && window.innerWidth > 1024) {
                targetPosition += 60;
            }

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
            <nav className={`glass-nav ${chatbotOpen ? 'chatbot-is-open' : ''}`}>
                <div 
                    className="logo" 
                    style={{ transition: 'opacity 0.3s ease', cursor: 'pointer' }}
                    onClick={(e) => handleNavClick(e, 'hero')}
                >
                    EFE KIRBAŞ
                </div>
                
                {/* Background overlay for mobile menu */}
                {navOpen && (
                    <div 
                        className="nav-overlay" 
                        onClick={() => setNavOpen(false)}
                    />
                )}

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
                        style={{ transition: 'opacity 0.3s ease' }}
                    >
                        {theme === 'dark' ? (
                            <i className="fas fa-sun"></i>
                        ) : (
                            <i className="fas fa-moon"></i>
                        )}
                    </button>
                    <button
                        className="theme-toggle-btn"
                        onClick={toggleChatbotVisibility}
                        title={chatbotHidden ? t('showAiAssistant') : t('hideAiAssistant')}
                        aria-label={chatbotHidden ? t('showAiAssistant') : t('hideAiAssistant')}
                        style={{ transition: 'opacity 0.3s ease' }}
                    >
                        {chatbotHidden ? <BotOff size={18} /> : <Bot size={18} />}
                    </button>
                    <div 
                        className={`burger ${navOpen ? 'toggle' : ''}`} 
                        onClick={toggleNav}
                        style={{ transition: 'opacity 0.3s ease' }}
                    >
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
