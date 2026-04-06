import React, { useEffect, useRef } from 'react';

const Cursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const followerPos = useRef({ x: 0, y: 0 });
    const isHovering = useRef(false);
    const hoveredEl = useRef(null);
    const rafId = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        // Don't initialize cursor for touch devices (mobile)
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) {
            cursor.style.display = 'none';
            follower.style.display = 'none';
            return;
        }

        // Smooth lerp for the follower
        const lerp = (start, end, factor) => start + (end - start) * factor;

        const animate = () => {
            if (!isHovering.current) {
                // Smoothly follow the mouse when not hovering
                followerPos.current.x = lerp(followerPos.current.x, mousePos.current.x, 0.15);
                followerPos.current.y = lerp(followerPos.current.y, mousePos.current.y, 0.15);

                follower.style.left = `${followerPos.current.x}px`;
                follower.style.top = `${followerPos.current.y}px`;
            }
            rafId.current = requestAnimationFrame(animate);
        };
        rafId.current = requestAnimationFrame(animate);

        const moveCursor = (e) => {
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;

            // The small dot always follows instantly
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        };

        const wrapElement = (target) => {
            const rect = target.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(target);
            const borderRadius = computedStyle.borderRadius;
            const padding = 4;

            follower.style.width = `${rect.width + padding * 2}px`;
            follower.style.height = `${rect.height + padding * 2}px`;
            follower.style.borderRadius = borderRadius;
            follower.style.left = `${rect.left + rect.width / 2}px`;
            follower.style.top = `${rect.top + rect.height / 2}px`;
        };

        const handleLinkHover = (e) => {
            isHovering.current = true;
            hoveredEl.current = e.currentTarget;

            // Clear inline opacity so CSS classes take effect
            cursor.style.opacity = '';
            follower.style.opacity = '';

            cursor.classList.add('cursor--hidden');
            follower.classList.add('cursor-follower--wrapping');
            wrapElement(e.currentTarget);
        };

        const handleLinkLeave = () => {
            isHovering.current = false;
            hoveredEl.current = null;

            cursor.classList.remove('cursor--hidden');
            follower.classList.remove('cursor-follower--wrapping');
            follower.style.width = '';
            follower.style.height = '';
            follower.style.borderRadius = '';
        };

        const handleScroll = () => {
            if (isHovering.current && hoveredEl.current) {
                // Check if cursor is still over the element
                const rect = hoveredEl.current.getBoundingClientRect();
                const mx = mousePos.current.x;
                const my = mousePos.current.y;

                if (mx >= rect.left && mx <= rect.right && my >= rect.top && my <= rect.bottom) {
                    // Still over the element, update position
                    wrapElement(hoveredEl.current);
                } else {
                    // Scrolled away, release
                    handleLinkLeave();
                }
            }
        };

        document.addEventListener('mousemove', moveCursor);
        window.addEventListener('scroll', handleScroll, true);

        const handleVideoHover = () => {
            cursor.style.opacity = '0';
            follower.style.opacity = '0';
        };

        const handleVideoLeave = () => {
            cursor.style.opacity = '';
            follower.style.opacity = '';
        };

        const attachListeners = () => {
            // Original links and buttons
            const links = document.querySelectorAll('a, button');
            links.forEach(link => {
                link.removeEventListener('mouseenter', handleLinkHover);
                link.removeEventListener('mouseleave', handleLinkLeave);
                link.addEventListener('mouseenter', handleLinkHover);
                link.addEventListener('mouseleave', handleLinkLeave);
            });

            // Video containers
            const videos = document.querySelectorAll('.video-container');
            videos.forEach(video => {
                video.removeEventListener('mouseenter', handleVideoHover);
                video.removeEventListener('mouseleave', handleVideoLeave);
                video.addEventListener('mouseenter', handleVideoHover);
                video.addEventListener('mouseleave', handleVideoLeave);
            });
        };

        attachListeners();

        // MutationObserver to attach listeners to new elements
        const observer = new MutationObserver(() => {
            attachListeners();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('scroll', handleScroll, true);
            cancelAnimationFrame(rafId.current);
            observer.disconnect();
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
