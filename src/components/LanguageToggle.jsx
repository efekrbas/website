import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
    const { language, toggleLanguage } = useLanguage();
    const isTurkish = language === 'tr';

    return (
        <div className="language-toggle-wrapper">
            <span className={`lang-label ${!isTurkish ? 'active' : ''}`}>EN</span>
            <button
                className={`language-toggle ${isTurkish ? 'turkish' : ''}`}
                onClick={toggleLanguage}
                aria-label="Toggle language"
            >
                <span className="toggle-slider"></span>
            </button>
            <span className={`lang-label ${isTurkish ? 'active' : ''}`}>TR</span>
        </div>
    );
};

export default LanguageToggle;
