import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Projects = () => {
    const { t } = useLanguage();
    const [originalProjects, setOriginalProjects] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('stars'); // 'stars' or 'updated'

    const fallbackProjects = [
        {
            name: "Automation-Scripts",
            description: "Collection of Python scripts for daily task automation.",
            html_url: "https://github.com/efekrbas",
            language: "Python",
            stargazers_count: 12,
            forks_count: 3,
            updated_at: new Date().toISOString()
        },
        {
            name: "Portfolio",
            description: "Personal portfolio website built with HTML, CSS, and JS.",
            html_url: "https://github.com/efekrbas/efekrbas.github.io",
            language: "HTML",
            stargazers_count: 5,
            forks_count: 2,
            updated_at: new Date(Date.now() - 86400000).toISOString()
        }
    ];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('https://api.github.com/users/efekrbas/repos?per_page=100');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setOriginalProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setOriginalProjects(fallbackProjects);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        if (originalProjects.length > 0) {
            const sorted = [...originalProjects].sort((a, b) => {
                if (sortBy === 'stars') {
                    return b.stargazers_count - a.stargazers_count;
                } else {
                    return new Date(b.updated_at) - new Date(a.updated_at);
                }
            });
            setProjects(sorted.slice(0, 6));
        }
    }, [originalProjects, sortBy]);

    return (
        <motion.section
            id="projects"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="section-title">{t('projectsTitle')}</h2>

            <div className="filter-container">
                <div className="segmented-control glass-card">
                    <motion.div
                        className="selection-bg"
                        animate={{ x: sortBy === 'stars' ? 0 : '100%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    <button
                        className={`segment-btn ${sortBy === 'stars' ? 'active' : ''}`}
                        onClick={() => setSortBy('stars')}
                    >
                        {t('mostStarred')}
                    </button>
                    <button
                        className={`segment-btn ${sortBy === 'updated' ? 'active' : ''}`}
                        onClick={() => setSortBy('updated')}
                    >
                        {t('recentlyUpdated')}
                    </button>
                </div>
            </div>

            <div id="projects-container" className="projects-grid">
                {loading ? (
                    <div className="loading-projects">
                        <i className="fas fa-circle-notch fa-spin"></i> {t('loadingProjects')}
                    </div>
                ) : (
                    projects.map((project, index) => (
                        <motion.div
                            className="project-card glass-card"
                            key={project.id || index}
                            layout
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="project-header">
                                <i className="far fa-folder folder-icon"></i>
                                <div className="project-links">
                                    <a href={project.html_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub Link"><i className="fab fa-github"></i></a>
                                    {project.homepage && <a href={project.homepage} target="_blank" rel="noopener noreferrer" aria-label="External Link"><i className="fas fa-external-link-alt"></i></a>}
                                </div>
                            </div>
                            <div className="project-content">
                                <h3 className="project-title">{project.name}</h3>
                                <p className="project-desc">{project.description || "No description available."}</p>
                            </div>
                            <div className="project-footer">
                                <div className="project-tech-list">
                                    <span>{project.language || "Code"}</span>
                                </div>
                                <div className="project-stats">
                                    <span><i className="far fa-star"></i> {project.stargazers_count}</span>
                                    <span><i className="fas fa-code-branch"></i> {project.forks_count}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
            <div className="github-more">
                <a href="https://github.com/efekrbas?tab=repositories" target="_blank" rel="noopener noreferrer" className="btn secondary">
                    <i className="fab fa-github"></i> {t('viewAll')}
                </a>
            </div>
        </motion.section>
    );
};
export default Projects;
