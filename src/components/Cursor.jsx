import React, { useEffect, useRef } from 'react';

const Cursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        const moveCursor = (e) => {
            if (cursor && follower) {
                cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
                // Small delay logic handled by CSS transition or RAF, but JS setTimeout 80ms was in original.
                // We can use direct transform for performance.
                setTimeout(() => {
                    follower.style.transform = `translate3d(${e.clientX - 15}px, ${e.clientY - 15}px, 0)`;
                }, 80);
            }
        };

        // Elements whose hover state has a white/light background
        const isLightHoverElement = (el) => {
            return el.closest('.btn.primary, .contact-link, .chatbot-toggle, .chatbot-input-area button:not(:disabled), .question-chip');
        };

        const handleLinkHover = (e) => {
            if (cursor && follower) {
                const isLight = isLightHoverElement(e.currentTarget);
                cursor.style.transform = `scale(1.5)`;
                cursor.style.background = isLight ? 'black' : 'white';
                cursor.style.borderColor = isLight ? 'black' : 'white';
                follower.style.opacity = '0';
            }
        };

        const handleLinkLeave = () => {
            if (cursor && follower) {
                cursor.style.transform = `scale(1)`;
                cursor.style.background = 'transparent';
                cursor.style.borderColor = 'white';
                follower.style.opacity = '1';
            }
        };

        document.addEventListener('mousemove', moveCursor);

        const links = document.querySelectorAll('a, button');
        links.forEach(link => {
            link.addEventListener('mouseenter', handleLinkHover);
            link.addEventListener('mouseleave', handleLinkLeave);
        });

        // MutationObserver to attach listeners to new links (React dynamic content)
        const observer = new MutationObserver((mutations) => {
            const newLinks = document.querySelectorAll('a, button');
            newLinks.forEach(link => {
                link.removeEventListener('mouseenter', handleLinkHover);
                link.removeEventListener('mouseleave', handleLinkLeave);
                link.addEventListener('mouseenter', handleLinkHover);
                link.addEventListener('mouseleave', handleLinkLeave);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.removeEventListener('mousemove', moveCursor);
            observer.disconnect();
            links.forEach(link => {
                link.removeEventListener('mouseenter', handleLinkHover);
                link.removeEventListener('mouseleave', handleLinkLeave);
            });
        };
    }, []);

    return (
        <>
            <div className="cursor" ref={cursorRef}></div>
            <div className="cursor-follower" ref={followerRef}></div>
        </>
    );
};

export default Cursor;
