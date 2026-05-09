'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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
        'live-status': 'Canlı Durum',
        education: 'Eğitim',
        projects: 'Projeler',
        contact: 'İletişim',

        // Hero
        greeting: 'Merhaba, ben',
        heroDesc: 'Karmaşık iş akışlarını terminale taşıyor, sistemleri otomatize eden verimli araçlar geliştiriyorum',
        contactBtn: 'İletişime Geç',
        downloadCV: 'CV İndir',
        scroll: 'Kaydır',
        codeSkills: '{"Coding", "CyberSec"}',
        codeMission: 'Her Şeyi Otomatikleştir',
        codeHello: 'Merhaba Dünya! Ben Efe.',

        // Marquee
        marqueeItem1: 'yazılım geliştirici',
        marqueeItem2: 'bilgisayar programcılığı öğrencisi',
        marqueeItem3: 'siber güvenlik & yapay zeka meraklısı',
        marqueeItem4: 'istanbul, tr',

        // About
        aboutTitle: 'Hakkımda',
        aboutText: 'Medipol Sağlık Grubu\'nda Bilgi İşlem Saha Destek Stajyeri olarak çalıştım ve bu süreçte son kullanıcıların donanım-yazılım sorunlarını çözme, arıza giderme konularında pratik deneyim kazandım. Ayrıca bilgisayar, yazıcı ve çevre birimlerinin kurulum–bakım işlemlerini gerçekleştirme konularında aktif görev aldım. Bilecik Şeyh Edebali Üniversitesi\'nde Bilgisayar Programcılığı bölümünde önlisans eğitimime devam ediyor, aynı zamanda siber güvenlik, yazılım geliştirme ve yapay zeka teknolojileri üzerine yoğunlaşıyorum. Üniversitemin Hackviser Kampüs Elçisiyim.',

        // Experience  
        experienceTitle: 'Deneyim',
        present: 'Devam ediyor',
        expItem1: 'Son kullanıcı desteği verdim.',
        expItem2: 'Donanım kurulum ve bakım işlemlerini gerçekleştirdim.',
        expItem3: 'Arıza giderme ve ağ takibi konularında aktif görevler aldım.',
        svItem1: 'Genel CTF sınavı sonucunda Bilecik\'de ilk 40\'a girerek öğrenci olmaya hak kazandım.',
        svItem2: 'Beyaz Şapkalı Hacker, CTF ve Reverse Engineering Eğitimi aldım.',
        svItem3: 'Aldığım eğitimlerde web güvenliği, ağ güvenliği, sızma testleri, zararlı yazılım analizi gibi birçok alanda bilgi ve beceri kazandım.',
        siber0x1Desc: 'Siber0x1 LinkedIn hesabının yönetilmesinden sorumluyum.',

        // Skills
        skillsTitle: 'Yetenekler',
        technicalSkills: 'Teknik Yetenekler',
        languages: 'Diller',
        english: 'İngilizce',
        turkish: 'Türkçe',
        certificates: 'Sertifikalar',
        viewCertifications: 'Sertifikalarımı Görüntüle',

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
        cyberSecurityEnthusiast: 'Sızma Testi Uzmanı',
        cyberSecurityStudent: 'Siber Güvenlik Öğrencisi',
        penetrationTesting: 'Sızma Testleri',
        automation: 'Otomasyon',
        professional: 'Profesyonel',
        native: 'Doğal',
        itFieldSupportIntern: 'Bilgi İşlem Saha Destek Stajyeri',
        cyberHomeland: 'Siber Vatan',
        medipolHealthGroup: 'Medipol Sağlık Grubu',
        campusAmbassador: 'Kampüs Elçisi',
        hackviser: 'Hackviser',
        projectsTitle: 'Projelerim',
        mostStarred: 'En Çok Yıldız Alanlar',
        recentlyUpdated: 'Son Güncellenenler',
        loadingProjects: 'Projeler yükleniyor...',
        viewAll: 'Tümünü Gör',
        bilecikUniversity: 'Bilecik Şeyh Edebali Üniversitesi',
        dundarUcarHighSchool: 'Dündar Uçar Mesleki Ve Teknik Anadolu Lisesi',
        Congenital: 'Doğuştan',
        founder: 'Sosyal Medya Yöneticisi',
        siber0x1: 'Siber0x1',
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

        // Live Status
        liveStatusTitle: 'Canlı Durum',
        istanbul: 'İstanbul',
        weather: 'Hava Durumu',
        socialMedia: 'Sosyal Medya',
        stackTitle: 'Yetenekler',
        location: 'Konum',
        discordOffline: 'Çevrimdışı',
        discordOnline: 'Çevrimiçi',
        discordIdle: 'Boşta',
        discordDnd: 'Rahatsız Etmeyin',

        // Youtube
        youtube: 'YouTube',
        youtubeTitle: 'YouTube Videolarım',
        watchVideo: 'İzle',
        visitChannel: 'Kanalı Ziyaret Et',
        chatbotHeader: 'Efe\'nin AI Asistanı',
        chatbotGreeting: 'Merhaba! Ben Efe\'nin yapay zeka asistanıyım. Sana nasıl yardımcı olabilirim?',
        chatSuggestWho: 'Efe Kimdir?',
        chatSuggestExp: 'Efe\'nin Deneyimleri Nelerdir?',
        chatSuggestEdu: 'Efe\'nin Eğitimi Hakkında Bilgi Alabilir Miyim?',
        chatSuggestProj: 'Efe\'nin Projeleri Nelerdir?',
        chatSuggestContact: 'Efe\'yle Nasıl İletişim Kurabilirim?',
        chatSuggestTech: 'Efe Hangi Teknolojileri Kullanıyor?',
        chatRateLimit: 'Çok hızlı gidiyorsun! 🧊 Biraz soluklanıp bir dakika sonra tekrar deneyebilir misin?',
        bioTitle: 'Efe Kırbaş - Özet',
        bioEducation: 'Eğitim',
        bioExperience: 'Deneyim',
        bioSkills: 'Yetenekler',
    },
    en: {
        // Navigation
        about: 'About',
        experience: 'Experience',
        'live-status': 'Live Status',
        education: 'Education',
        projects: 'Projects',
        contact: 'Contact',

        // Hero
        greeting: 'Hello, I\'m',
        heroDesc: 'I bring complex workflows to the terminal and develop efficient tools that automate systems',
        contactBtn: 'Get in Touch',
        downloadCV: 'Download CV',
        scroll: 'Scroll',
        codeSkills: '{"Coding", "CyberSec"}',
        codeMission: 'Automate Everything',
        codeHello: 'Hello World! I\'m Efe.',

        // Marquee
        marqueeItem1: 'software developer',
        marqueeItem2: 'computer programming student',
        marqueeItem3: 'cyber security & artificial intelligence enthusiast',
        marqueeItem4: 'istanbul, tr',

        // About
        aboutTitle: 'About Me',
        aboutText: 'I worked as an IT Field Support Intern at Medipol Sağlık Grubu, where I gained practical experience in solving end-user hardware and software issues, and troubleshooting. I also actively participated in the installation and maintenance of computers, printers, and peripherals. I am continuing my associate degree in Computer Programming at Bilecik Şeyh Edebali University while focusing on software development.',

        // Experience
        experienceTitle: 'Experience',
        present: 'Present',
        expItem1: 'Provided end-user support.',
        expItem2: 'Performed hardware installation and maintenance.',
        expItem3: 'Took active roles in troubleshooting and network monitoring.',
        svItem1: 'I earned my student spot by placing in the top 40 in Bilecik in the general CTF exam.',
        svItem2: 'I received training in Ethical Hacking, CTF, and Reverse Engineering.',
        svItem3: 'In these trainings, I gained knowledge and skills in many areas such as web security, network security, penetration testing, and malware analysis.',
        siber0x1Desc: 'I am responsible for managing the Siber0x1 LinkedIn account; the other two managers handle Instagram and TikTok accounts.',

        // Skills
        skillsTitle: 'Skills',
        technicalSkills: 'Technical Skills',
        languages: 'Languages',
        english: 'English',
        turkish: 'Turkish',
        certificates: 'Certifications',
        viewCertifications: 'View My Certifications',

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
        cyberSecurityEnthusiast: 'CAPT',
        cyberSecurityStudent: 'Cyber Security Student',
        penetrationTesting: 'Penetration Testing',
        automation: 'Automation',
        professional: 'Professional',
        native: 'Native',
        itFieldSupportIntern: 'IT Field Support Intern',
        cyberHomeland: 'Siber Vatan',
        medipolHealthGroup: 'Medipol Sağlık Grubu',
        campusAmbassador: 'Campus Ambassador',
        hackviser: 'Hackviser',
        projectsTitle: 'Projects',
        mostStarred: 'Most Starred',
        recentlyUpdated: 'Recently Updated',
        loadingProjects: 'Loading projects...',
        viewAll: 'View All',
        bilecikUniversity: 'Bilecik Şeyh Edebali University',
        dundarUcarHighSchool: 'Dündar Uçar Vocational and Technical High School',
        Congenital: 'Congenital',
        founder: 'Social Media Manager',
        siber0x1: 'Siber0x1',
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

        // Live Status
        liveStatusTitle: 'Live Status',
        istanbul: 'Istanbul',
        weather: 'Weather',
        socialMedia: 'Social Media',
        stackTitle: 'Skills',
        location: 'Location',
        discordOffline: 'Offline',
        discordOnline: 'Online',
        discordIdle: 'Idle',
        discordDnd: 'Do Not Disturb',

        // Youtube
        youtube: 'YouTube',
        youtubeTitle: 'My YouTube Videos',
        watchVideo: 'Watch',
        visitChannel: 'Visit Channel',
        chatbotHeader: 'Efe\'s AI Assistant',
        chatbotGreeting: 'Hello! I am Efe\'s AI assistant. How can I help you today?',
        chatSuggestWho: 'Who is Efe?',
        chatSuggestExp: 'What are Efe\'s experiences?',
        chatSuggestEdu: 'Can I get information about Efe\'s education?',
        chatSuggestProj: 'What are Efe\'s projects?',
        chatSuggestContact: 'How can I contact Efe?',
        chatSuggestTech: 'What technologies does Efe use?',
        chatRateLimit: 'Whoa, slow down! 🧊 Take a breather and try again in a minute.',
        bioTitle: 'Efe Kırbaş - Summary',
        bioEducation: 'Education',
        bioExperience: 'Experience',
        bioSkills: 'Skills',
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang && browserLang.toLowerCase().startsWith('tr')) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLanguage('tr');
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const t = (key) => {
        if (!mounted) return translations['en'][key] || key;
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;
