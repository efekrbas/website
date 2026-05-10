'use client';

import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Cursor from '../components/Cursor';
import Footer from '../components/Footer';
import About from '../components/About';
import LiveStatus from '../components/LiveStatus';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Projects from '../components/Projects';
import Youtube from '../components/Youtube';

export default function Home() {
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }
    window.scrollTo(0, 0);

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Scroll animation for section titles
    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view'); // Re-animate every time it scrolls into view
        }
      });
    }, { threshold: 0.5 });

    // We need a small timeout to let children mount properly before observing
    const timer = setTimeout(() => {
      const titles = document.querySelectorAll('.section-title');
      titles.forEach(title => titleObserver.observe(title));
    }, 100);

    return () => {
      titleObserver.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Cursor />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <LiveStatus />
        <Experience />
        <Education />
        <Projects />
        <Youtube />
      </main>
      <Footer />
    </>
  );
}
