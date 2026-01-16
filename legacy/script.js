document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor logic
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button');

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        
        // Add a slight delay for the follower
        setTimeout(() => {
            follower.style.transform = `translate3d(${e.clientX - 15}px, ${e.clientY - 15}px, 0)`;
        }, 80);
    });

    // Hover Effect for Cursor
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = `scale(1.5)`;
            cursor.style.background = 'white';
            follower.style.opacity = '0';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = `scale(1)`;
            cursor.style.background = 'transparent';
            follower.style.opacity = '1';
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // Accordion functionality for certificates
    const accordionHeaders = document.querySelectorAll('.cert-accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            accordionItem.classList.toggle('active');
        });
    });

    // Add CSS for reveal animation dynamically if not in CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    // GitHub Projects Fetching
    const projectsContainer = document.getElementById('projects-container');
    const username = 'efekrbas';
    
    // Fallback data in case API fails or rate limit is hit
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

    const fetchProjects = async () => {
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
            
            if (!response.ok) {
                throw new Error('GitHub API request failed');
            }

            const data = await response.json();
            
            // Filter out forks if desired, or keep them. Showing top 6
            const projects = data.slice(0, 6);
            
            renderProjects(projects);
            
        } catch (error) {
            console.error('Error fetching projects:', error);
            // Use fallback data if API fails
            renderProjects(fallbackProjects);
        }
    };

    const renderProjects = (projects) => {
        projectsContainer.innerHTML = '';
        
        projects.forEach(project => {
            // Check for valid description or use default
            const description = project.description || "No description available.";
            const language = project.language || "Code";
            
            const projectHTML = `
                <div class="project-card glass-card">
                    <div class="project-header">
                        <i class="far fa-folder folder-icon"></i>
                        <div class="project-links">
                            <a href="${project.html_url}" target="_blank" aria-label="GitHub Link"><i class="fab fa-github"></i></a>
                            ${project.homepage ? `<a href="${project.homepage}" target="_blank" aria-label="External Link"><i class="fas fa-external-link-alt"></i></a>` : ''}
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">${project.name}</h3>
                        <p class="project-desc">${description}</p>
                    </div>
                    <div class="project-footer">
                        <div class="project-tech-list">
                            <span>${language}</span>
                        </div>
                        <div class="project-stats">
                            <span><i class="far fa-star"></i> ${project.stargazers_count}</span>
                            <span><i class="fas fa-code-branch"></i> ${project.forks_count}</span>
                        </div>
                    </div>
                </div>
            `;
            
            projectsContainer.innerHTML += projectHTML;
        });
    };

    // Call the function
    fetchProjects();

});
