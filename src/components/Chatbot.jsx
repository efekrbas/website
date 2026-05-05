'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Chatbot = () => {
    const { language, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: '1', role: 'bot', content: t('chatbotGreeting') }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const sessionId = useRef(typeof window !== 'undefined' ? crypto.randomUUID() : 'default-session');

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

    return (
        <div className="chatbot-container">
            <AnimatePresence>
                {isOpen && (
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

                        <div className="chat-suggestions">
                            {[
                                t('chatSuggestWho'),
                                t('chatSuggestExp'),
                                t('chatSuggestProj'),
                                t('chatSuggestContact')
                            ].map((text, i) => (
                                <button 
                                    key={i} 
                                    className="suggestion-btn"
                                    onClick={() => handleSend(null, text)}
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
                )}
            </AnimatePresence>

            <motion.div 
                className="chatbot-bubble"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
            </motion.div>
        </div>
    );
};

export default Chatbot;
