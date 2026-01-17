import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';

import Chatbot from './components/Chatbot';

function App() {
    useEffect(() => {
    // 1. Tarayıcının otomatik kaydırma geri yüklemesini devre dışı bırak
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // 2. Tarayıcının atlamasını önlemek için URL'deki hash'i (örn: /#contact) temizle
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    // 3. Sayfayı en tepeye kaydır
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Cursor />
      <Chatbot />
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
