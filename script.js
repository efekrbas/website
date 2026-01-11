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
});
