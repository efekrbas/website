import React, { useEffect, useRef } from 'react';

const Cursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const mousePos = useRef({ x: -100, y: -100 });
    const ringPos = useRef({ x: -100, y: -100 });
    const rafId = useRef(null);
    const activeWrapTarget = useRef(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768) {
            dot.style.display = 'none';
            ring.style.display = 'none';
            return;
        }

        const lerp = (start, end, factor) => start + (end - start) * factor;

        const animate = () => {
            if (activeWrapTarget.current) {
                const rect = activeWrapTarget.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Release if mouse leaves the general area (handling scroll out)
                const padding = 30;
                if (
                    mousePos.current.x < rect.left - padding || 
                    mousePos.current.x > rect.right + padding || 
                    mousePos.current.y < rect.top - padding || 
                    mousePos.current.y > rect.bottom + padding
                ) {
                    releaseWrap();
                } else {
                    ring.style.transform = `translate3d(${centerX}px, ${centerY}px, 0) translate(-50%, -50%)`;
                    // Keep ringPos in sync for smooth transition back
                    ringPos.current.x = centerX;
                    ringPos.current.y = centerY;
                }
            } else {
                ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.15);
                ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.15);
                ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
            }
            rafId.current = requestAnimationFrame(animate);
        };
        rafId.current = requestAnimationFrame(animate);

        const moveCursor = (e) => {
            if (e.clientX === undefined) return;
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;
            dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        };

        const releaseWrap = () => {
            activeWrapTarget.current = null;
            dot.style.opacity = '1';
            ring.classList.remove('ring-wrap');
            ring.style.width = '';
            ring.style.height = '';
            ring.style.borderRadius = '';
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            
            // 0. Hide on YouTube Videos
            if (target.closest('.video-container') || target.tagName === 'IFRAME') {
                dot.style.opacity = '0';
                ring.style.opacity = '0';
                return;
            } else {
                ring.style.opacity = '1';
                if (!activeWrapTarget.current) dot.style.opacity = '1';
            }

            // Priority 1: Wrap Targets (Navbar, Social, Buttons)
            const wrapTarget = target.closest('.nav-links a, .ls-social-item, button, .btn, .project-links a, .view-certs-btn');
            if (wrapTarget) {
                activeWrapTarget.current = wrapTarget;
                const rect = wrapTarget.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(wrapTarget);
                
                ring.classList.add('ring-wrap');
                dot.style.opacity = '0';
                
                ring.style.width = `${rect.width + 12}px`;
                ring.style.height = `${rect.height + 12}px`;
                ring.style.borderRadius = computedStyle.borderRadius;
                return;
            }

            // Priority 2: Marquee
            if (target.closest('.marquee-container')) {
                ring.classList.add('ring-marquee');
                // Keep dot visible, no icon logic needed
                return;
            }

            // Priority 3: General Hover
            if (target.closest('[class*="card"]')) {
                ring.classList.add('ring-hover');
                return;
            }
        };

        const handleMouseOut = (e) => {
            if (!activeWrapTarget.current) {
                ring.classList.remove('ring-hover', 'ring-marquee');
            }
        };

        document.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            document.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(rafId.current);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot"></div>
            <div ref={ringRef} className="cursor-ring"></div>
        </>
    );
};

export default Cursor;
