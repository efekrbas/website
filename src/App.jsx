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
    // Basic routing handling for SPA
    const path = window.location.pathname.substring(1); // remove leading slash
    if (path) {
      const element = document.getElementById(path);
      if (element) {
        // Wait for render
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
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
