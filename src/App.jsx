import React, { useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Cursor from './components/Cursor';
import Footer from './components/Footer';

// Lazy load components below the fold
const About = lazy(() => import('./components/About'));
const LiveStatus = lazy(() => import('./components/LiveStatus'));
const Experience = lazy(() => import('./components/Experience'));
const Education = lazy(() => import('./components/Education'));
const Projects = lazy(() => import('./components/Projects'));
const Youtube = lazy(() => import('./components/Youtube'));
const Contact = lazy(() => import('./components/Contact'));

// Basit bir yükleme bileşeni
const SectionLoader = () => (
  <div className="section-loader" style={{ 
    height: '200px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    color: 'var(--accent-color, #00d2ff)',
    fontSize: '0.9rem',
    opacity: 0.5
  }}>
    <span>...</span>
  </div>
);



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
        <Suspense fallback={<SectionLoader />}>
          <About />
          <LiveStatus />
          <Experience />
          <Education />
          <Projects />
          <Youtube />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
