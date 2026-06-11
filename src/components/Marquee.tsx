import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const techRow1 = [
    { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux/white' },
    { name: 'C', icon: 'https://cdn.simpleicons.org/c/white' },
    { name: 'C++', icon: 'https://cdn.simpleicons.org/cplusplus/white' },
    { name: 'Python', icon: 'https://cdn.simpleicons.org/python/white' },
    { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/white' },
    { name: 'HTML5', icon: 'https://cdn.simpleicons.org/html5/white' },
    { name: 'CSS3', icon: 'https://cdn.simpleicons.org/css/white' },
    { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/white' },
    { name: 'Penetration Testing', icon: 'https://cdn.simpleicons.org/kalilinux/white' }
];

const techRow2 = [
    { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/white' },
    { name: 'C#', icon: 'https://cdn.simpleicons.org/dotnet/white' },
    { name: 'SQL', icon: 'https://cdn.simpleicons.org/mysql/white' },
    { name: 'Ruby', icon: 'https://cdn.simpleicons.org/ruby/white' },
    { name: 'Blockchain', icon: 'https://cdn.simpleicons.org/bitcoin/white' },
    { name: 'Web3', icon: 'https://cdn.simpleicons.org/web3dotjs/white' },
    { name: 'Smart Contracts', icon: 'https://cdn.simpleicons.org/solidity/white' },
    { name: 'AI', icon: 'https://cdn.simpleicons.org/tensorflow/white' },
    { name: 'Automation', icon: 'https://cdn.simpleicons.org/githubactions/white' },
];

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

    const TechGroup = ({ row }: { row: {name: string, icon: string}[] }) => (
        <div className="tech-marquee-group">
            {row.map((tech, index) => (
                <div className="tech-icon-card" key={index}>
                    <img src={tech.icon} alt={tech.name} />
                    <span>{tech.name}</span>
                </div>
            ))}
        </div>
    );

    return (
        <div className="marquee-wrapper">
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
            
            <div className="tech-marquee-container">
                <div className="tech-marquee-row right">
                    <TechGroup row={techRow1} />
                    <TechGroup row={techRow1} />
                    <TechGroup row={techRow1} />
                    <TechGroup row={techRow1} />
                </div>
                <div className="tech-marquee-row left">
                    <TechGroup row={techRow2} />
                    <TechGroup row={techRow2} />
                    <TechGroup row={techRow2} />
                    <TechGroup row={techRow2} />
                </div>
            </div>
        </div>
    );
};

export default Marquee;
