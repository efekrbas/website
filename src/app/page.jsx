'use client';

import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
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
  }, []);

  return (
    <>
      <Cursor />
      <Header />
      <main>
        <Hero />
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
