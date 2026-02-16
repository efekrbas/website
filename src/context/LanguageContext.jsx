import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const translations = {
    tr: {
        // Navigation
        about: 'Hakkımda',
        experience: 'Deneyim',
        skills: 'Yetenekler',
        education: 'Eğitim',
        projects: 'Projeler',
        contact: 'İletişim',

        // Hero
        greeting: 'Merhaba, ben',
        heroDesc: 'Karmaşık iş akışlarını terminale taşıyor, sistemleri otomatize eden verimli araçlar geliştiriyorum',
        contactBtn: 'İletişime Geç',
        downloadCV: 'CV İndir',
        scroll: 'Kaydır',
        codeSkills: '{"Siber G.", "Linux", "C"}',
        codeMission: 'Her Şeyi Otomatikleştir',
        codeHello: 'Merhaba Dünya! Ben Efe.',

        // About
        aboutTitle: 'Hakkımda',
        aboutText: 'Medipol Sağlık Grubu\'nda Bilgi İşlem Saha Destek Stajyeri olarak çalıştım ve bu süreçte son kullanıcıların donanım-yazılım sorunlarını çözme, arıza-tespiti konularında pratik deneyim kazandım. Ayrıca bilgisayar, yazıcı ve çevre birimlerinin kurulum–bakım işlemlerini gerçekleştirme konularında aktif görev aldım. Bilecik Şeyh Edebali Üniversitesi\'nde Bilgisayar Programcılığı bölümünde önlisans eğitimime devam ediyor, aynı zamanda yazılım geliştirme üzerine yoğunlaşıyorum.',

        // Experience  
        experienceTitle: 'Deneyim',
        present: 'Günümüz',
        expItem1: 'Son kullanıcı donanım-yazılım sorunları çözümü.',
        expItem2: 'Arıza tespiti ve pratik çözüm üretimi.',
        expItem3: 'Donanım kurulum ve bakım işlemleri.',

        // Skills
        skillsTitle: 'Yetenekler & Sertifikalar',
        technicalSkills: 'Teknik Yetenekler',
        languages: 'Diller',
        english: 'İngilizce',
        turkish: 'Türkçe',
        certificates: 'Sertifikalar',

        // Education
        educationTitle: 'Eğitim',
        associateDegree: 'Önlisans, Bilgisayar Programcılığı',
        highSchool: 'Lise, Bilişim Teknolojileri / Yazılım Geliştirme',

        // Contact
        contactTitle: 'İletişim',
        contactDesc: 'Projeleriniz veya iş birlikleri için benimle iletişime geçebilirsiniz.',
        yourName: 'Adınız Soyadınız',
        yourEmail: 'E-posta Adresiniz',
        yourMessage: 'Mesajınız',
        send: 'Gönder',
        sending: 'Gönderiliyor...',
        successMessage: 'Mesajınız başarıyla gönderildi!',
        errorMessage: 'Bir hata oluştu. Lütfen tekrar deneyin.',

        // Footer
        footerText: '© 2026 Efe Kırbaş. Tüm hakları saklıdır.',

        // Skills - Certifications accordion items
        certMachineLearning: 'Temel Makine Öğrenmesi',
        certGenAI: 'GenAI',
        certChatGPT: 'ChatGPT kullanımı ve Prompt Mühendisliği',
        certFutureTech: 'Geleceğin Teknolojileri',

        // Dynamic text translations
        softwareDeveloper: 'Yazılım Geliştirici',
        cyberSecurityEnthusiast: 'Siber Güvenlik Meraklısı',
        cyberSecurityStudent: 'Siber Güvenlik Öğrencisi',
        penetrationTesting: 'Sızma Testleri',
        automation: 'Otomasyon',
        professional: 'Profesyonel',
        native: 'Doğal',
        itFieldSupportIntern: 'Bilgi İşlem Saha Destek Stajyeri',
        cyberHomeland: 'Siber Vatan',
        medipolHealthGroup: 'Medipol Sağlık Grubu',
        projectsTitle: 'Projelerim',
        loadingProjects: 'Projeler yükleniyor...',
        viewAll: 'Tümünü Gör',
        bilecikUniversity: 'Bilecik Şeyh Edebali Üniversitesi',
        dundarUcarHighSchool: 'Dündar Uçar Mesleki Ve Teknik Anadolu Lisesi',
        Congenital: 'Doğuştan',
        certAIMiniBootcamp: 'Yapay Zeka Mini Bootcamp',
        certComputerOperator: 'Bilgisayar İşletmenliği (Operatörlüğü)',
        certOOP: 'Nesneye Dayalı Programlama',
        certFastTyping: 'Bilgisayarda Hızlı Klavye Kullanımı',
        certDomainLaw: 'İnternet Alan Adları Hukuku',
        certCAPT: 'Sertifikalı Sızma Testi Uzmanı (CAPT)',
        certCybersecurity: 'Siber Güvenliğe Giriş',
        certIndustrialNetworking: 'Endüstriyel Ağ Temelleri',
        certNetworkTechnician: 'Ağ Teknisyeni Kariyer Yolu',
        certNetworkingBasics: 'Ağ Temelleri',
        certDigitalSafety: 'Dijital Güvenlik ve Emniyet Farkındalığı',
        certIoT: 'IoT\'ye Giriş',
        certModernAI: 'Modern Yapay Zekaya Giriş',
        certTechSupport: 'Teknik Destek Temelleri',
        certGarantiBBVA: 'Garanti BBVA Genç Yeni Nesil Kariyer Okulu',
        certUIUX: 'UI/UX Web Tasarımcısı',
        btkAkademi: 'BTK Akademi',
        certAltaySecAcademy: 'AltaySec Akademi',
        certAltaySec: 'Sızma Testi Eğitim Programı Başarı Sertifikası',
        certNetworkingDevices: 'Ağ Cihazları ve İlk Yapılandırma',
        certNetworkAddressing: 'Ağ Adresleme ve Temel Sorun Giderme',

        // Youtube
        youtube: 'YouTube',
        youtubeTitle: 'YouTube Videolarım',
        watchVideo: 'İzle',
        visitChannel: 'Kanalı Ziyaret Et',

        // Chatbot
        chatbotTitle: 'AI Asistan',
        chatbotWelcome: 'Merhaba! Ben Efe\'nin yapay zeka asistanıyım. Size nasıl yardımcı olabilirim?',
        chatbotPlaceholder: 'Mesajınızı yazın...',
        chatbotQ1: 'Efe kimdir?',
        chatbotQ2: 'Projeleri neler?',
        chatbotQ3: 'Hangi teknolojileri kullanıyor?',
        chatbotQ4: 'Sertifikaları neler?',
        chatbotDemo: 'Demo Modu: Gerçek bir yanıt almak için lütfen .env dosyasına VITE_OPENROUTER_API_KEY ekleyin.',
        chatbotError: 'Üzgünüm, bir hata oluştu',
    },
    en: {
        // Navigation
        about: 'About',
        experience: 'Experience',
        skills: 'Skills',
        education: 'Education',
        projects: 'Projects',
        contact: 'Contact',

        // Hero
        greeting: 'Hello, I\'m',
        heroDesc: 'I bring complex workflows to the terminal and develop efficient tools that automate systems',
        contactBtn: 'Get in Touch',
        downloadCV: 'Download CV',
        scroll: 'Scroll',
        codeSkills: '["CyberSec", "Linux", "C"]',
        codeMission: 'Automate Everything',
        codeHello: 'Hello World! I\'m Efe.',

        // About
        aboutTitle: 'About Me',
        aboutText: 'I worked as an IT Field Support Intern at Medipol Health Group, where I gained practical experience in solving end-user hardware and software issues, and troubleshooting. I also actively participated in the installation and maintenance of computers, printers, and peripherals. I am continuing my associate degree in Computer Programming at Bilecik Sheikh Edebali University while focusing on software development.',

        // Experience
        experienceTitle: 'Experience',
        present: 'Present',
        expItem1: 'End-user hardware and software issue resolution.',
        expItem2: 'Troubleshooting and practical solution development.',
        expItem3: 'Hardware installation and maintenance.',

        // Skills
        skillsTitle: 'Skills & Certifications',
        technicalSkills: 'Technical Skills',
        languages: 'Languages',
        english: 'English',
        turkish: 'Turkish',
        certificates: 'Certifications',

        // Education
        educationTitle: 'Education',
        associateDegree: 'Associate Degree, Computer Programming',
        highSchool: 'High School, Information Technologies / Software Development',

        // Contact
        contactTitle: 'Contact',
        contactDesc: 'Feel free to reach out for projects or collaborations.',
        yourName: 'Your Name',
        yourEmail: 'Your Email',
        yourMessage: 'Your Message',
        send: 'Send',
        sending: 'Sending...',
        successMessage: 'Your message has been sent successfully!',
        errorMessage: 'An error occurred. Please try again.',

        // Footer
        footerText: '© 2026 Efe Kırbaş. All rights reserved.',

        // Skills - Certifications accordion items
        certMachineLearning: 'Basic Machine Learning',
        certGenAI: 'GenAI',
        certChatGPT: 'ChatGPT Usage and Prompt Engineering',
        certFutureTech: 'Technologies of the Future',

        // Dynamic text translations
        softwareDeveloper: 'Software Developer',
        cyberSecurityEnthusiast: 'Cyber Security Enthusiast',
        cyberSecurityStudent: 'Cyber Security Student',
        penetrationTesting: 'Penetration Testing',
        automation: 'Automation',
        professional: 'Professional',
        native: 'Native',
        itFieldSupportIntern: 'IT Field Support Intern',
        cyberHomeland: 'Cyber Homeland',
        medipolHealthGroup: 'Medipol Health Group',
        projectsTitle: 'Projects',
        loadingProjects: 'Loading projects...',
        viewAll: 'View All',
        bilecikUniversity: 'Bilecik Sheikh Edebali University',
        dundarUcarHighSchool: 'Dündar Uçar Vocational and Technical High School',
        Congenital: 'Congenital',
        certAIMiniBootcamp: 'Artificial Intelligence Mini Bootcamp',
        certComputerOperator: 'Computer Operator',
        certOOP: 'Object Oriented Programming',
        certFastTyping: 'Fast Keyboard Typing',
        certDomainLaw: 'Internet Domain Names Law',
        certCAPT: 'Certified Associate Penetration Tester (CAPT)',
        certCybersecurity: 'Introduction to Cybersecurity',
        certIndustrialNetworking: 'Industrial Networking Essentials',
        certNetworkTechnician: 'Network Technician Career Path',
        certNetworkingBasics: 'Networking Basics',
        certDigitalSafety: 'Digital Safety and Security Awareness',
        certIoT: 'Introduction to IoT',
        certModernAI: 'Introduction to Modern AI',
        certTechSupport: 'Technical Support Fundamentals',
        certGarantiBBVA: 'Garanti BBVA Young New Generation Career School',
        certUIUX: 'UI/UX Web Designer',
        btkAkademi: 'BTK Academy',
        certAltaySecAcademy: 'AltaySec Academy',
        certAltaySec: 'Penetration Testing Training Program Certificate of Achievement',
        certNetworkingDevices: 'Networking Devices and Initial Configuration',
        certNetworkAddressing: 'Network Addressing and Basic Troubleshooting',

        // Youtube
        youtube: 'YouTube',
        youtubeTitle: 'My YouTube Videos',
        watchVideo: 'Watch',
        visitChannel: 'Visit Channel',

        // Chatbot
        chatbotTitle: 'AI Assistant',
        chatbotWelcome: 'Hello! I\'m Efe\'s AI assistant. How can I help you?',
        chatbotPlaceholder: 'Type your message...',
        chatbotQ1: 'Who is Efe?',
        chatbotQ2: 'What are his projects?',
        chatbotQ3: 'What technologies does he use?',
        chatbotQ4: 'What are his certifications?',
        chatbotDemo: 'Demo Mode: Please add VITE_OPENROUTER_API_KEY to .env file for real responses.',
        chatbotError: 'Sorry, an error occurred',
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        // localStorage'dan dil tercihini oku, yoksa varsayılan olarak 'tr' kullan
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage || 'tr';
    });

    const toggleLanguage = () => {
        setLanguage(prev => {
            const newLang = prev === 'tr' ? 'en' : 'tr';
            localStorage.setItem('language', newLang);
            return newLang;
        });
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;
