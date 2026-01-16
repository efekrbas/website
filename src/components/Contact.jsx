import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
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
        const formData = new FormData(e.target);
        formData.append("access_key", "e84086d1-45b2-4008-a38c-d098200d6928");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
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
            <h2 className="section-title">İletişim</h2>
            <div className="contact-container glass-card">
                <div className="contact-info">
                    <p>Projeleriniz veya iş birlikleri için benimle iletişime geçebilirsiniz.</p>
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
                            placeholder="Adınız Soyadınız"
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
                            placeholder="E-posta Adresiniz"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <textarea
                            name="message"
                            placeholder="Mesajınız"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="5"
                            style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn primary" disabled={status === 'submitting'} style={{ width: '100%', justifyContent: 'center' }}>
                        {status === 'submitting' ? 'Gönderiliyor...' : 'Gönder'} <i className="fas fa-paper-plane"></i>
                    </button>
                    {status === 'success' && <p style={{ color: '#27c93f', marginTop: '10px', textAlign: 'center' }}>Mesajınız başarıyla gönderildi!</p>}
                    {status === 'error' && <p style={{ color: '#ff5f56', marginTop: '10px', textAlign: 'center' }}>Bir hata oluştu. Lütfen tekrar deneyin.</p>}
                </form>
            </div>
        </motion.section>
    );
};
export default Contact;
