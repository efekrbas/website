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
                const padding = 10; // Tighten padding
                const isStillOver = 
                    mousePos.current.x >= rect.left - padding && 
                    mousePos.current.x <= rect.right + padding && 
                    mousePos.current.y >= rect.top - padding && 
                    mousePos.current.y <= rect.bottom + padding;

                // Ultimate Sync Check: Verify if the element under the mouse is still our target (or its child)
                // We only do this check every few frames or if we are outside the immediate rect to save performance
                let isElementUnder = true;
                if (!isStillOver) {
                    isElementUnder = false;
                } else {
                    // Check if the actual element under the mouse matches our target
                    const elAtPoint = document.elementFromPoint(mousePos.current.x, mousePos.current.y);
                    if (elAtPoint && !activeWrapTarget.current.contains(elAtPoint) && elAtPoint !== activeWrapTarget.current) {
                        // Allow a small "grace" period or check if it's just a tiny gap
                        isElementUnder = false;
                    }
                }

                if (!isStillOver || !isElementUnder) {
                    releaseWrap();
                } else {
                    ring.style.transform = `translate3d(${centerX}px, ${centerY}px, 0) translate(-50%, -50%)`;
                    // Update dimensions dynamically to stay synced during hover-animations
                    ring.style.width = `${rect.width + 12}px`;
                    ring.style.height = `${rect.height + 12}px`;
                    
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

            // Priority 1: Wrap Targets
            const wrapTarget = target.closest('.nav-links a, .ls-social-item, button, .btn, .project-links a, .view-certs-btn');
            
            // If we're already wrapping this exact target, don't do anything
            if (wrapTarget && activeWrapTarget.current === wrapTarget) return;

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

            // If we were wrapping and now we're not over any wrap target, let handleMouseOut or the animate loop's padding check handle it.
            // But to be safe, if we hit a non-wrap target, we can release if it's not a child of the current wrapTarget
            if (activeWrapTarget.current && !wrapTarget) {
                // The animate loop handles the distance-based release, which is smoother for small gaps
            }

            // Priority 2: Marquee
            if (target.closest('.marquee-container')) {
                ring.classList.add('ring-marquee');
                return;
            }

            // Priority 3: General Hover
            if (target.closest('[class*="card"]')) {
                ring.classList.add('ring-hover');
                return;
            }
        };

        const handleMouseOut = (e) => {
            // Only handle non-wrapping hover states here
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
