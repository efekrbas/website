import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Marquee = () => {
    const { t } = useLanguage();

    const items = [
        t('marqueeItem1'),
        t('marqueeItem2'),
        t('marqueeItem3'),
        t('marqueeItem4')
    ];

    // Create a group of items with stars
    const Group = () => (
        <>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <span className="marquee-text">{item}</span>
                    <span className="marquee-star">✦</span>
                </React.Fragment>
            ))}
        </>
    );

    return (
        <div className="marquee-container">
            <div className="marquee-content">
                <div className="marquee-group">
                    <Group />
                    <Group />
                </div>
                <div className="marquee-group" aria-hidden="true">
                    <Group />
                    <Group />
                </div>
            </div>
        </div>
    );
};

export default Marquee;
