import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Youtube from './components/Youtube';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';


function App() {
  useEffect(() => {
    // Sayfa her yenilendiğinde (F5) veya yüklendiğinde hash'i temizle ve en tepeye dön
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }
    window.scrollTo(0, 0);

    // Otomatik scroll restorasyonunu kapat
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <>
      <Cursor />
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Projects />
        <Youtube />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
