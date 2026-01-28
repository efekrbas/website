import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Projects = () => {
    const { t } = useLanguage();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fallbackProjects = [
        {
            name: "Portfolio",
            description: "Personal portfolio website built with HTML, CSS, and JS.",
            html_url: "https://github.com/efekrbas/efekrbas.github.io",
            language: "HTML",
            stargazers_count: 5,
            forks_count: 2
        },
        {
            name: "Automation-Scripts",
            description: "Collection of Python scripts for daily task automation.",
            html_url: "https://github.com/efekrbas",
            language: "Python",
            stargazers_count: 12,
            forks_count: 3
        }
    ];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Short delay to show loading state for demo purposes if needed, but not necessary.
                const response = await fetch('https://api.github.com/users/efekrbas/repos?sort=updated&direction=desc');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setProjects(data.slice(0, 6));
            } catch (error) {
                console.error("Error fetching projects:", error);
                setProjects(fallbackProjects);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <motion.section
            id="projects"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="section-title">{t('projectsTitle')}</h2>
            <div id="projects-container" className="projects-grid">
                {loading ? (
                    <div className="loading-projects">
                        <i className="fas fa-circle-notch fa-spin"></i> {t('loadingProjects')}
                    </div>
                ) : (
                    projects.map((project, index) => (
                        <motion.div
                            className="project-card glass-card"
                            key={index}
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
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
