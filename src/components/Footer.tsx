'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer>
            <div className="footer-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                <p>{t('footerText')}</p>
            </div>
        </footer>
    );
};
export default Footer;
