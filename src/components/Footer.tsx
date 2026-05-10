import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer>
            <p>{t('footerText')}</p>
        </footer>
    );
};
export default Footer;
