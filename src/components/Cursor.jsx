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

        const handleMouseOver = (e) => {
            const target = e.target.closest('a, button');
            const videoTarget = e.target.closest('.video-container');

            if (target) {
                if (hoveredEl.current === target) return;
                
                isHovering.current = true;
                hoveredEl.current = target;

                cursor.style.opacity = '';
                follower.style.opacity = '';
                cursor.classList.add('cursor--hidden');
                follower.classList.add('cursor-follower--wrapping');
                wrapElement(target);
            } else if (videoTarget) {
                cursor.style.opacity = '0';
                follower.style.opacity = '0';
            }
        };

        const handleMouseOut = (e) => {
            const target = e.target.closest('a, button');
            const videoTarget = e.target.closest('.video-container');
            const related = e.relatedTarget;

            if (target && (!related || !target.contains(related))) {
                isHovering.current = false;
                hoveredEl.current = null;

                cursor.classList.remove('cursor--hidden');
                follower.classList.remove('cursor-follower--wrapping');
                follower.style.width = '';
                follower.style.height = '';
                follower.style.borderRadius = '';
            } else if (videoTarget && (!related || !videoTarget.contains(related))) {
                cursor.style.opacity = '';
                follower.style.opacity = '';
            }
        };

        const handleScroll = () => {
            if (isHovering.current && hoveredEl.current) {
                const rect = hoveredEl.current.getBoundingClientRect();
                const mx = mousePos.current.x;
                const my = mousePos.current.y;

                if (mx >= rect.left && mx <= rect.right && my >= rect.top && my <= rect.bottom) {
                    wrapElement(hoveredEl.current);
                } else {
                    isHovering.current = false;
                    hoveredEl.current = null;
                    cursor.classList.remove('cursor--hidden');
                    follower.classList.remove('cursor-follower--wrapping');
                    follower.style.width = '';
                    follower.style.height = '';
                    follower.style.borderRadius = '';
                }
            }
        };

        document.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);
        window.addEventListener('scroll', handleScroll, true);

        return () => {
            document.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            window.removeEventListener('scroll', handleScroll, true);
            cancelAnimationFrame(rafId.current);
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
