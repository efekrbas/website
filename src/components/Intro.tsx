'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Intro = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Disable scroll while intro is visible
        document.body.style.overflow = 'hidden';
        
        // Hide intro after 2 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);
            document.body.style.overflow = '';
        }, 1800);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="intro"
                    initial={{ y: 0 }}
                    exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100vh',
                        backgroundColor: 'var(--bg-color)',
                        zIndex: 99999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-color)',
                        fontFamily: "'Space Grotesk', sans-serif",
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 style={{ 
                            fontSize: '4.5rem', 
                            fontWeight: 700, 
                            letterSpacing: '-0.05em',
                            margin: 0
                        }}>
                            efe.
                        </h1>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Intro;
