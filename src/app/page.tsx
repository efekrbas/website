import React from 'react';
import ScrollManager from '../components/ScrollManager';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';

import Footer from '../components/Footer';
import About from '../components/About';
import LiveStatus from '../components/LiveStatus';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Projects from '../components/Projects';
import OpenSource from '../components/OpenSource';
import Youtube from '../components/Youtube';
import Medium from '../components/Medium';

export default function Home() {
  return (
    <>
      <ScrollManager />

      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <LiveStatus />
        <Experience />
        <Education />
        <Projects />
        <OpenSource />
        <Youtube />
        <Medium />
      </main>
      <Footer />
    </>
  );
}
