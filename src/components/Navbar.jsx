import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navItems = [
  { label: 'Home', id: '#home' },
  { label: 'About', id: '#about' },
  { label: 'Experience', id: '#experience' },
  { label: 'Projects', id: '#projects' },
  { label: 'Skills', id: '#skills' },
  { label: 'Education', id: '#education' },
  { label: 'Contact', id: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -50% 0px', // Trigger near middle of viewport
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact']
      .map(id => document.getElementById(id))
      .filter(el => el !== null);

    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      const offset = 80; // Offset for navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-warm-paper/85 backdrop-blur-md border-b border-slate-light/60 py-3 shadow-premium' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Initials */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center space-x-2 group"
        >
          <span className="font-heading font-bold text-2xl tracking-tighter text-graphite-dark">
            V<span className="text-cyan-accent">M</span>
          </span>
          <span className="font-mono text-[10px] uppercase border border-slate-light px-1.5 py-0.5 rounded text-graphite-dark/60 tracking-wider">
            Dev/AI
          </span>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.id}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`px-3 py-1.5 rounded-md font-heading text-sm font-medium tracking-tight transition-colors ${
                activeSection === item.id
                  ? 'text-cyan-accent bg-cyan-accent/5'
                  : 'text-graphite-dark/70 hover:text-graphite-dark hover:bg-slate-light/30'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Call to Actions */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Resume Link placeholder */}
          <a
            href="https://drive.google.com/file/d/1PFnCmIH0ZfWdWBLyrLN6o6yJk8ZVPggf/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono font-medium text-graphite-dark/70 hover:text-graphite-dark px-3 py-2 border border-slate-light hover:border-graphite-dark rounded-md transition-colors"
            title="Download PDF Resume"
          >
            Resume.pdf
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-flex items-center space-x-1 bg-cyan-accent text-warm-paper px-4 py-2 rounded-md font-heading text-sm font-medium hover:bg-cyan-accent/90 transition-all transform hover:scale-[1.03]"
          >
            <span>Let's talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-graphite-dark/70 hover:text-graphite-dark hover:bg-slate-light/40 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-warm-paper/95 backdrop-blur-lg border-b border-slate-light shadow-premium px-6 py-6 space-y-4 animate-fade-in">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.id}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`px-3 py-2 rounded-md font-heading text-base font-semibold transition-colors ${
                  activeSection === item.id
                    ? 'text-cyan-accent bg-cyan-accent/5'
                    : 'text-graphite-dark/70 hover:text-graphite-dark hover:bg-slate-light/30'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-slate-light flex items-center justify-between">
            <a
              href="https://drive.google.com/file/d/1PFnCmIH0ZfWdWBLyrLN6o6yJk8ZVPggf/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono font-medium text-graphite-dark/70 hover:text-graphite-dark py-2 border-b border-transparent hover:border-graphite-dark transition-all"
            >
              Download Resume (PDF)
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="bg-cyan-accent text-warm-paper px-4 py-2 rounded-md font-heading text-sm font-semibold shadow-sm hover:bg-cyan-accent/90"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
