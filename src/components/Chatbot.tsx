'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BEEP_BOOP_MESSAGES = [
    'beep boop 🤖',
    'hey! 👋',
    '01100010 💾',
    '*bzzzt* ⚡',
    'meow? 🐱',
];

const Chatbot = () => {
    const { language, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: '1', role: 'bot', content: t('chatbotGreeting') }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [showBeepBoop, setShowBeepBoop] = useState(false);
    const [beepBoopIndex, setBeepBoopIndex] = useState(0);
    const messagesEndRef = useRef(null);
    const suggestionsRef = useRef(null);
    const isDragging = useRef(false);
    const sessionId = useRef(typeof window !== 'undefined' ? crypto.randomUUID() : 'default-session');

    // "beep boop" speech bubble timer
    useEffect(() => {
        if (isOpen) {
            setShowBeepBoop(false);
            return;
        }

        const showDelay = setTimeout(() => {
            setShowBeepBoop(true);
            setBeepBoopIndex(prev => (prev + 1) % BEEP_BOOP_MESSAGES.length);
        }, 5000);

        return () => clearTimeout(showDelay);
    }, [isOpen]);

    useEffect(() => {
        if (!showBeepBoop || isOpen) return;

        const hideTimeout = setTimeout(() => {
            setShowBeepBoop(false);
        }, 4000);

        return () => clearTimeout(hideTimeout);
    }, [showBeepBoop, isOpen]);

    useEffect(() => {
        if (showBeepBoop || isOpen) return;

        const nextShow = setTimeout(() => {
            setShowBeepBoop(true);
            setBeepBoopIndex(prev => (prev + 1) % BEEP_BOOP_MESSAGES.length);
        }, 15000);

        return () => clearTimeout(nextShow);
    }, [showBeepBoop, isOpen]);

    // Prevent body scroll on mobile when chat is open to avoid address bar shifting
    useEffect(() => {
        if (isOpen && window.innerWidth <= 768) {
            document.body.style.overflow = 'hidden';
            document.body.style.overscrollBehavior = 'none';
            document.documentElement.style.overflow = 'hidden';
            document.documentElement.style.overscrollBehavior = 'none';
        } else {
            document.body.style.overflow = '';
            document.body.style.overscrollBehavior = '';
            document.documentElement.style.overflow = '';
            document.documentElement.style.overscrollBehavior = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.overscrollBehavior = '';
            document.documentElement.style.overflow = '';
            document.documentElement.style.overscrollBehavior = '';
        };
    }, [isOpen]);

    // Drag-to-scroll for suggestions on desktop
    useEffect(() => {
        const el = suggestionsRef.current;
        if (!el) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        const onMouseDown = (e) => {
            isDown = true;
            isDragging.current = false;
            el.style.cursor = 'grabbing';
            startX = e.pageX - el.offsetLeft;
            scrollLeft = el.scrollLeft;
            
            // Prevent text selection during drag
            document.body.style.userSelect = 'none';
            document.body.style.webkitUserSelect = 'none';
        };

        const onMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault(); // Prevent default text selection behavior
            const x = e.pageX - el.offsetLeft;
            const walk = (x - startX) * 2;
            // Mark as dragging only if moved more than 5px
            if (Math.abs(walk) > 5) {
                isDragging.current = true;
            }
            el.scrollLeft = scrollLeft - walk;
        };

        const onMouseUp = () => {
            if (!isDown) return;
            isDown = false;
            el.style.cursor = '';
            
            // Restore text selection
            document.body.style.userSelect = '';
            document.body.style.webkitUserSelect = '';
            
            // Use setTimeout to ensure click handler checks isDragging before it resets
            setTimeout(() => {
                isDragging.current = false;
            }, 50);
        };


        el.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            el.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [isOpen]);

    // Update greeting when language changes
    useEffect(() => {
        setMessages(prev => {
            const firstMsg = prev[0];
            if (firstMsg && firstMsg.id === '1') {
                return [{ ...firstMsg, content: t('chatbotGreeting') }, ...prev.slice(1)];
            }
            return prev;
        });
    }, [language, t]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('chatbotHidden');
            if (stored === 'true') {
                setIsVisible(false);
            }

            const handleToggle = (e) => {
                setIsVisible(e.detail.visible);
                if (e.detail.visible) {
                    localStorage.removeItem('chatbotHidden');
                } else {
                    localStorage.setItem('chatbotHidden', 'true');
                }
            };

            window.addEventListener('setChatbotVisibility', handleToggle);
            return () => window.removeEventListener('setChatbotVisibility', handleToggle);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('chatbotStateChange', { detail: isOpen }));
            if (isOpen) {
                document.body.classList.add('chatbot-is-open');
            } else {
                document.body.classList.remove('chatbot-is-open');
            }
        }
    }, [isOpen]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e, directMsg = null) => {
        e?.preventDefault();
        const messageText = directMsg || input;
        if (!messageText.trim() || isLoading) return;

        const userMessage = { id: Date.now().toString(), role: 'user', content: messageText };
        setMessages(prev => [...prev, userMessage]);
        if (!directMsg) setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: messages.map(m => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.content })).concat({ role: 'user', content: messageText })
                })
            });

            const data = await response.json();

            if (response.status === 429) {
                throw new Error('RATE_LIMIT');
            }

            if (!response.ok) {
                throw new Error(data.error || 'API Error');
            }

            if (data.content) {
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: 'bot',
                    content: data.content
                }]);
            } else {
                throw new Error('No content in response');
            }
        } catch (error) {
            console.error('Chat Error:', error);
            let errorMessage = language === 'tr'
                ? `Hata: ${error.message || 'Bilinmeyen bir sorun oluştu.'}`
                : `Error: ${error.message || 'An unknown error occurred.'}`;

            if (error.message === 'RATE_LIMIT') {
                errorMessage = t('chatRateLimit');
            }

            setMessages(prev => [...prev, {
                id: `error-${Date.now()}`,
                role: 'bot',
                content: errorMessage
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="chatbot-container">
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div 
                            className="chatbot-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            className="chatbot-window"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <div className="chat-header">
                            <h3>
                                <span className="chat-status"></span>
                                {t('chatbotHeader')}
                            </h3>
                            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="chat-messages">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`message ${msg.role}`}>
                                    {msg.content}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="message bot" style={{ opacity: 0.5 }}>
                                    {language === 'tr' ? 'Yazıyor...' : 'Typing...'}
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="chat-suggestions" ref={suggestionsRef}>
                            {[
                                t('chatSuggestWho'),
                                t('chatSuggestExp'),
                                t('chatSuggestEdu'),
                                t('chatSuggestProj'),
                                t('chatSuggestContact'),
                                t('chatSuggestTech')
                            ].map((text, i) => (
                                <button
                                    key={i}
                                    className="suggestion-btn"
                                    onClick={() => {
                                        if (isDragging.current) return;
                                        handleSend(null, text);
                                    }}
                                >
                                    {text}
                                </button>
                            ))}
                        </div>

                        <form className="chat-input-area" onSubmit={handleSend}>
                            <input
                                type="text"
                                className="chat-input"
                                placeholder={language === 'tr' ? 'Mesajınızı yazın...' : 'Type your message...'}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                            />
                            <button type="submit" className="send-btn" disabled={isLoading || !input.trim()}>
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                    </>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showBeepBoop && !isOpen && (
                    <motion.div
                        className="beep-boop-bubble"
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        onClick={() => { setShowBeepBoop(false); setIsOpen(true); }}
                    >
                        {BEEP_BOOP_MESSAGES[beepBoopIndex]}
                        <span className="beep-boop-tail" />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="chatbot-bubble"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ position: 'relative' }}
            >
                {isOpen ? <X size={28} /> : (
                    <>
                        <Bot size={28} />
                        <span style={{
                            position: 'absolute',
                            bottom: '14px',
                            right: '14px',
                            width: '10px',
                            height: '10px',
                            backgroundColor: '#23a559',
                            borderRadius: '50%',
                            border: '2px solid var(--accent-color)'
                        }}></span>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default Chatbot;
