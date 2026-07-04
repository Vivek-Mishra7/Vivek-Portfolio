import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-graphite-deep text-slate-light/90 border-t border-slate-light/10 relative overflow-hidden py-16">
      {/* Structural visual grid lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[size:30px_30px]" style={{
        backgroundImage: 'linear-gradient(to right, #E4E4E1 1px, transparent 1px), linear-gradient(to bottom, #E4E4E1 1px, transparent 1px)'
      }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Branding & Closing Summary */}
        <div className="text-left space-y-3.5 max-w-sm">
          <div className="flex items-center space-x-2">
            <span className="font-heading font-bold text-2xl tracking-tighter text-warm-paper">
              V<span className="text-cyan-accent">M</span>.
            </span>
            <span className="font-mono text-[9px] uppercase border border-slate-light/20 px-1.5 py-0.5 rounded text-warm-paper/40 tracking-wider">
              AI / Dev
            </span>
          </div>
          <p className="text-xs text-slate-light/50 leading-relaxed">
            Data Science & Applied Full-Stack Engineering. Shipping performant web apps and AI automations from Bengaluru, India.
          </p>
        </div>

        {/* Closing Credentials CTA */}
        <div className="flex flex-col md:items-end text-left md:text-right space-y-2">
          <p className="text-xs font-mono uppercase tracking-wider text-cyan-accent font-semibold">
            Open for Select Contracts
          </p>
          <p className="text-xs text-slate-light/50">
            Let's build reliable software systems that execute correctly.
          </p>
          <p className="text-[10px] font-mono text-slate-light/30">
            © {new Date().getFullYear()} Vivek Mishra Chandresh. All rights reserved.
          </p>
        </div>

        {/* Back to top anchor */}
        <div className="flex items-center">
          <a
            href="#home"
            onClick={handleScrollToTop}
            className="p-3 border border-slate-light/10 hover:border-cyan-accent rounded-full hover:bg-cyan-accent/5 text-slate-light/60 hover:text-cyan-accent transition-all duration-300 group"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </footer>
  );
}
