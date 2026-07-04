import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Layers, Terminal } from 'lucide-react';

// Lazy load the 3D scene to prioritize initial content paint
const HeroScene = lazy(() => import('./HeroScene'));

export default function Hero({ prefersReducedMotion }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const element = document.querySelector('#projects');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const element = document.querySelector('#contact');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] flex items-center pt-24 pb-12 overflow-hidden radial-fade-overlay blueprint-bg border-b border-slate-light"
    >
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Text Content */}
        <motion.div 
          className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow Label */}
          <motion.div variants={itemVariants} className="inline-flex">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-slate-light bg-warm-paper/90 shadow-sm text-xs font-mono font-medium text-graphite-dark/80">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent animate-pulse" />
              <span>Full-Stack Developer · AI/ML Engineer · Data Scientist</span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-graphite-dark leading-[1.08] lg:max-w-[15ch]"
          >
            I build production software and <span className="text-cyan-accent">AI systems</span> that ship.
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            variants={itemVariants}
            className="text-lg text-graphite-dark/70 font-normal leading-relaxed max-w-xl"
          >
            B.Tech Data Science student and freelance full-stack / AI developer. I deliver end-to-end client applications, robust RAG pipelines, computer vision systems, and automated workflows for startups and NGOs.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="px-6 py-3 bg-graphite-dark text-warm-paper rounded-md font-heading text-sm font-semibold hover:bg-graphite-dark/90 shadow-md transform hover:scale-[1.02] transition-all flex items-center space-x-2"
            >
              <span>View Projects</span>
              <Layers className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="px-6 py-3 border border-slate-light hover:border-graphite-dark bg-warm-paper/50 rounded-md font-heading text-sm font-semibold text-graphite-dark transform hover:scale-[1.02] transition-all flex items-center space-x-2"
            >
              <span>Get in touch</span>
              <Terminal className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Stats Bar */}
          <motion.div 
            variants={itemVariants}
            className="pt-8 border-t border-slate-light/80 grid grid-cols-3 gap-4"
          >
            <div>
              <p className="font-heading text-3xl font-bold text-graphite-dark">18+</p>
              <p className="font-mono text-[10px] uppercase text-graphite-dark/50 mt-1 tracking-wider">Months Exp</p>
            </div>
            <div>
              <p className="font-heading text-3xl font-bold text-graphite-dark">8+</p>
              <p className="font-mono text-[10px] uppercase text-graphite-dark/50 mt-1 tracking-wider">Client Projects</p>
            </div>
            <div>
              <p className="font-heading text-3xl font-bold text-graphite-dark">4</p>
              <p className="font-mono text-[10px] uppercase text-graphite-dark/50 mt-1 tracking-wider">Internships</p>
            </div>
          </motion.div>
        </motion.div>

        {/* 3D Visualizer / Graphic */}
        <div className="lg:col-span-5 h-[400px] md:h-[500px] flex items-center justify-center relative">
          {!prefersReducedMotion ? (
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center space-y-3 opacity-60">
                <div className="w-12 h-12 rounded-full border-2 border-slate-light border-t-cyan-accent animate-spin" />
                <span className="font-mono text-[11px] text-graphite-dark/50">Initializing Neural Net Graph...</span>
              </div>
            }>
              <HeroScene />
            </Suspense>
          ) : (
            // Static Fallback Image / Graphic if user prefers reduced motion
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 select-none">
              <svg width="100%" height="100%" viewBox="0 0 400 400" className="max-w-md">
                <circle cx="200" cy="200" r="100" stroke="#06B6D4" strokeWidth="1" fill="none" strokeDasharray="5,5" />
                <circle cx="200" cy="200" r="160" stroke="#FB7A5C" strokeWidth="0.5" fill="none" />
                <line x1="50" y1="200" x2="350" y2="200" stroke="#1A1D23" strokeWidth="0.5" />
                <line x1="200" y1="50" x2="200" y2="350" stroke="#1A1D23" strokeWidth="0.5" />
                <circle cx="200" cy="200" r="6" fill="#06B6D4" />
                <circle cx="100" cy="200" r="4" fill="#1A1D23" />
                <circle cx="300" cy="200" r="4" fill="#1A1D23" />
                <circle cx="200" cy="100" r="4" fill="#FB7A5C" />
                <circle cx="200" cy="300" r="4" fill="#06B6D4" />
              </svg>
            </div>
          )}
        </div>
      </div>
      
      {/* Absolute Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-40 hover:opacity-80 transition-opacity">
        <a href="#about" onClick={(e) => {
          e.preventDefault();
          document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
        }} className="flex flex-col items-center">
          <span className="font-mono text-[9px] uppercase tracking-widest mb-1.5">Scroll Down</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
