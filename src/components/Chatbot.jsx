import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Chatbot = () => {
    const { language, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Initialize welcome message based on language
    useEffect(() => {
        setMessages([{ id: 1, text: t('chatbotWelcome'), sender: 'bot' }]);
    }, [language]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    // System Prompt with detailed user info
    const SYSTEM_PROMPT = `
    Sen Efe Kırbaş'ın kişisel web sitesindeki yapay zeka asistanısın. 
    İsmin "Efe'nin Asistanı".
    Görevin: Ziyaretçilerin Efe Kırbaş hakkındaki sorularını yanıtlamak.
    
    YÖNERGELER:
    1. Sadece Efe Kırbaş, onun yetenekleri, eğitimi, deneyimi ve projeleri hakkında konuş.
    2. Efe dışındaki konularda (örneğin: "Hava durumu nasıl?", "Matematik sorusu çöz", "React nasıl çalışır?") nazikçe bu konuda yardımcı olamayacağını, sadece Efe hakkında bilgi verebileceğini söyle.
    3. Cevapların kısa, profesyonel ve arkadaş canlısı olsun. Türkçe cevap ver.
    4. Efe adına konuşurken övücü ama alçakgönüllü ol.

    BİLGİ BANKASI:
    - Kimdir: Efe Kırbaş, Yazılım Geliştirici ve Siber Güvenlik meraklısı bir öğrencidir. Karmaşık iş akışlarını otomatize etmeyi sever.
    - Eğitim: 
      * Bilecik Şeyh Edebali Üniversitesi - Bilgisayar Programcılığı (2025-2027)
      * Dündar Uçar Mesleki ve Teknik Anadolu Lisesi - Yazılım Geliştirme (2022-2025)
    - Deneyim:
      * Siber Vatan: Öğrenci (Kasım 2025 - Günümüz, Bilecik)
      * Medipol Sağlık Grubu: IT Saha Destek Stajyeri (Eylül 2024 - Haziran 2025, İstanbul). Donanım/yazılım sorunları, kurulum ve bakım üzerine çalıştı.
    - Yetenekler: 
      * Diller: Türkçe (Anadil), İngilizce (Profesyonel).
      * Teknik: Siber Güvenlik, Linux, C, C#, C++, Python, Javascript, HTML, CSS, Node.js, SQL, Otomasyon.
    - Sertifikalar: CAPT (Hackviser), Google Technical Support Fundamentals, Miuul (Yapay Zeka & UI/UX), Garanti BBVA (Teknoloji Serisi).
    - İletişim: Sitenin iletişim bölümünden veya LinkedIn üzerinden ulaşılabilir.
    `;

    const processMessage = async (text) => {
        const userMessage = { id: Date.now(), text: text, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

            // Detailed debug logging
            console.log("Debug Info:", {
                apiKeyExists: !!apiKey,
                apiKeyLength: apiKey ? apiKey.length : 0,
                baseUrl: 'https://openrouter.ai/api/v1/chat/completions',
                referer: window.location.href
            });

            if (!apiKey) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const demoResponse = {
                    id: Date.now() + 1,
                    text: t('chatbotDemo'),
                    sender: 'bot'
                };
                setMessages(prev => [...prev, demoResponse]);
                return;
            }

            const apiMessages = [
                { role: "system", content: SYSTEM_PROMPT },
                ...messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })),
                { role: "user", content: text }
            ];

            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                    'HTTP-Referer': window.location.href,
                    'X-Title': 'Efe Kirbas Portfolio'
                },
                body: JSON.stringify({
                    model: "openai/gpt-3.5-turbo",
                    messages: apiMessages
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("API Error Response:", data);
                throw new Error(data.error?.message || `API Error: ${response.status}`);
            }

            if (data.choices && data.choices[0]) {
                const aiText = data.choices[0].message.content;
                setMessages(prev => [...prev, { id: Date.now() + 1, text: aiText, sender: 'bot' }]);
            } else {
                console.error("Unexpected API Response format:", data);
                throw new Error("API yanıtı beklenmedik formatta");
            }

        } catch (error) {
            console.error("Chatbot Error:", error);
            const errorMessage = error.message || "Unknown error";
            setMessages(prev => [...prev, {
                id: Date.now(),
                text: `${t('chatbotError')}: ${errorMessage}`,
                sender: 'bot'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        const text = inputText;
        setInputText("");
        await processMessage(text);
    };

    const sendSuggested = (text) => {
        processMessage(text);
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                className="chatbot-toggle"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-robot"></i>}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chatbot-window glass-card"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="chatbot-header">
                            <div className="chatbot-title">
                                <i className="fas fa-robot"></i>
                                <span>{t('chatbotTitle')}</span>
                            </div>
                            <span className="online-indicator"></span>
                        </div>

                        <div className="chatbot-messages">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                                    {msg.text}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="message bot-message typing-indicator">
                                    <span></span><span></span><span></span>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggested Questions */}
                        <div className="suggested-questions">
                            {[t('chatbotQ1'), t('chatbotQ2'), t('chatbotQ3'), t('chatbotQ4')].map((q, index) => (
                                <button
                                    key={index}
                                    className="question-chip"
                                    onClick={() => sendSuggested(q)}
                                >
                                    {q}
                                </button>
                            ))}
                        </div>

                        <form className="chatbot-input-area" onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                placeholder={t('chatbotPlaceholder')}
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <button type="submit" disabled={isLoading || !inputText.trim()}>
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .chatbot-toggle {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: var(--accent-color);
                    color: #000;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
                    z-index: 10000;
                    font-size: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .chatbot-window {
                    position: fixed;
                    bottom: 100px;
                    right: 30px;
                    width: 350px;
                    height: 500px;
                    background: rgba(10, 10, 10, 0.9);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    z-index: 10000;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                }

                .chatbot-header {
                    padding: 15px 20px;
                    background: rgba(255, 255, 255, 0.05);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .chatbot-title {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-weight: 600;
                    color: white;
                }

                .online-indicator {
                    width: 8px;
                    height: 8px;
                    background: #27c93f;
                    border-radius: 50%;
                    box-shadow: 0 0 5px #27c93f;
                }

                .chatbot-messages {
                    flex: 1;
                    padding: 20px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .message {
                    max-width: 80%;
                    padding: 10px 15px;
                    border-radius: 15px;
                    font-size: 0.9rem;
                    line-height: 1.4;
                    word-wrap: break-word;
                }

                .bot-message {
                    background: rgba(255, 255, 255, 0.1);
                    color: #ddd;
                    align-self: flex-start;
                    border-top-left-radius: 2px;
                }

                .user-message {
                    background: var(--accent-color);
                    color: #000;
                    align-self: flex-end;
                    border-bottom-right-radius: 2px;
                }

                .typing-indicator span {
                    display: inline-block;
                    width: 6px;
                    height: 6px;
                    background: #aaa;
                    border-radius: 50%;
                    margin: 0 2px;
                    animation: typing 0.6s infinite alternate;
                }
                
                .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
                .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

                @keyframes typing {
                    from { transform: translateY(0); }
                    to { transform: translateY(-5px); }
                }

                .suggested-questions {
                    padding: 10px 15px;
                    display: flex;
                    gap: 8px;
                    overflow-x: auto;
                    white-space: nowrap;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                
                .suggested-questions::-webkit-scrollbar {
                    display: none;
                }

                .question-chip {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #ccc;
                    padding: 8px 12px;
                    border-radius: 15px;
                    font-size: 0.8rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    flex-shrink: 0;
                }

                .question-chip:hover {
                    background: var(--accent-color);
                    color: #000;
                }

                .chatbot-input-area {
                    padding: 15px;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    gap: 10px;
                }

                .chatbot-input-area input {
                    flex: 1;
                    background: rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 10px 15px;
                    border-radius: 25px;
                    color: white;
                    font-family: inherit;
                    outline: none;
                }
                
                .chatbot-input-area input:focus {
                    border-color: var(--accent-color);
                }

                .chatbot-input-area button {
                    background: var(--accent-color);
                    color: #000;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s;
                }

                .chatbot-input-area button:hover:not(:disabled) {
                    transform: scale(1.1);
                }
                
                .chatbot-input-area button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                /* Mobile Fixes */
                @media (max-width: 768px) {
                    .chatbot-window {
                        width: 90%;
                        right: 5%;
                        bottom: 100px;
                        height: 60vh;
                    }
                }
            `}</style>
        </>
    );
};

export default Chatbot;
