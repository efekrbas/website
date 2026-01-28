import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState(''); // 'submitting', 'success', 'error'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        const formDataObj = new FormData(e.target);

        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
        if (accessKey) {
            formDataObj.append("access_key", accessKey);
        } else {
            // Fallback or error if not set, though user has it in props previously
            console.error("Web3Forms Access Key missing in .env");
            setStatus('error');
            return;
        }

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formDataObj
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                console.error("Error", data);
                setStatus('error');
            }
        } catch (error) {
            console.error("Fetch Error", error);
            setStatus('error');
        }
    };

    return (
        <motion.section
            id="contact"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="section-title">{t('contactTitle')}</h2>
            <div className="contact-container glass-card">
                <div className="contact-info">
                    <p>{t('contactDesc')}</p>
                    <a href="mailto:efekrbass@gmail.com" className="contact-link">
                        <i className="fas fa-envelope"></i> efekrbass@gmail.com
                    </a>
                    <a href="https://www.linkedin.com/in/efekrbs" target="_blank" rel="noopener noreferrer" className="contact-link">
                        <i className="fab fa-linkedin"></i> linkedin.com/in/efekrbs
                    </a>
                </div>

                {/* Form Section */}
                <form className="contact-form" onSubmit={handleSubmit} style={{ marginTop: '30px', textAlign: 'left' }}>
                    <div style={{ marginBottom: '15px' }}>
                        <input
                            type="text"
                            name="name"
                            placeholder={t('yourName')}
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <input
                            type="email"
                            name="email"
                            placeholder={t('yourEmail')}
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <textarea
                            name="message"
                            placeholder={t('yourMessage')}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="5"
                            style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn primary" disabled={status === 'submitting'} style={{ width: '100%', justifyContent: 'center' }}>
                        {status === 'submitting' ? t('sending') : t('send')} <i className="fas fa-paper-plane"></i>
                    </button>
                    {status === 'success' && <p style={{ color: '#27c93f', marginTop: '10px', textAlign: 'center' }}>{t('successMessage')}</p>}
                    {status === 'error' && <p style={{ color: '#ff5f56', marginTop: '10px', textAlign: 'center' }}>{t('errorMessage')}</p>}
                </form>
            </div>
        </motion.section>
    );
};
export default Contact;
