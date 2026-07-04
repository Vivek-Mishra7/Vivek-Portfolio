import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Monitor OS-level accessibility setting for motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);

    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return (
    <div className="min-h-screen bg-warm-paper text-graphite-dark font-body antialiased transition-colors duration-300">
      {/* Background blueprint details */}
      <div className="absolute inset-0 blueprint-bg pointer-events-none z-0" />
      
      {/* Page Layout components */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero prefersReducedMotion={prefersReducedMotion} />
          <About />
          <Experience />
          <Projects />
          <Skills prefersReducedMotion={prefersReducedMotion} />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
