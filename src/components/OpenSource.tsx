import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { GitPullRequest, CheckCircle2 } from 'lucide-react';

const contributions = [
    {
        repo: "RudranshG07/stello_finance",
        title: "feat: add max balance shortcut and input validation to StakeCard",
        url: "https://github.com/RudranshG07/stello_finance/pull/13",
        status: "Merged",
        number: "#13"
    },
    {
        repo: "rajdeep-singha/StellarPay",
        title: "feat(api): enhance health check with stellar network status and add env template",
        url: "https://github.com/rajdeep-singha/StellarPay/pull/44",
        status: "Merged",
        number: "#44"
    },
    {
        repo: "sceptejas/Stray-SDK",
        title: "feat: add AssetValidator for pre-flight trustline verification",
        url: "https://github.com/sceptejas/Stray-SDK/pull/20",
        status: "Merged",
        number: "#20"
    },
    {
        repo: "orbitkit-fun/stellar-agent-kit",
        title: "feat: add get_account_summary tool - operation history & testnet support",
        url: "https://github.com/orbitkit-fun/stellar-agent-kit/pull/51",
        status: "Merged",
        number: "#51"
    },
    {
        repo: "PreMiD/Activities",
        title: "feat(Hackviser): add activity",
        url: "https://github.com/PreMiD/Activities/pull/10579",
        status: "Merged",
        number: "#10579"
    }
];

const OpenSource = () => {
    const { t } = useLanguage();

    return (
        <motion.section
            id="open-source"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
            <h2 className="section-title">{t('openSourceTitle')}</h2>

            <div 
                className="tech-marquee-container" 
                style={{ 
                    padding: '20px 0', 
                    overflow: 'hidden',
                    width: '100vw',
                    position: 'relative',
                    left: '50%',
                    right: '50%',
                    marginLeft: '-50vw',
                    marginRight: '-50vw'
                }}
            >
                <div className="tech-marquee-row right" style={{ animationDuration: '45s' }}>
                    {[...Array(4)].map((_, i) => (
                        <div className="tech-marquee-group" key={i}>
                            {contributions.map((pr, index) => (
                                <motion.a
                                    href={pr.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-card glass-card clickable-card"
                                    key={`${i}-${index}`}
                                    whileHover={{ y: -5 }}
                                    style={{ 
                                        width: '400px', 
                                        minWidth: '400px', 
                                        flexShrink: 0, 
                                        margin: '0', 
                                        textDecoration: 'none', 
                                        color: 'inherit',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <div className="project-header">
                                        <GitPullRequest size={32} color="var(--accent-color)" />
                                        <div className="project-links">
                                            <span aria-label="View Pull Request" style={{ opacity: 0.7, fontSize: '1.2rem', marginLeft: '15px', color: 'var(--text-color)' }}>
                                                <i className="fas fa-external-link-alt"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="project-content">
                                        <h3 className="project-title" style={{ fontSize: '1.2rem' }}>{pr.repo}</h3>
                                        <p className="project-desc" style={{ marginBottom: '16px' }}>{pr.title}</p>
                                    </div>
                                    <div className="project-footer" style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginTop: 'auto' }}>
                                        <div className="project-tech-list">
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8b5cf6', fontWeight: 600 }}>
                                                <CheckCircle2 size={16} /> {pr.status}
                                            </span>
                                        </div>
                                        <div className="project-stats">
                                            <span>{pr.number}</span>
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default OpenSource;
