import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cpu, Brain, Award, Landmark } from 'lucide-react';

export default function About() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 }
    }
  };

  return (
    <section id="about" className="py-24 border-b border-slate-light relative overflow-hidden bg-warm-paper">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-cyan-accent/5 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-coral-accent/5 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-left">
          <p className="font-mono text-[11px] uppercase tracking-widest text-cyan-accent font-semibold mb-2">01 / Profile</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-graphite-dark tracking-tight">
            Engineering & applied intelligence.
          </h2>
          <div className="w-12 h-1 bg-cyan-accent mt-4" />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Narrative description */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-heading text-xl sm:text-2xl font-semibold text-graphite-dark">
              I translate complex data science models and machine learning pipelines into high-performance web products.
            </h3>
            
            <p className="text-graphite-dark/70 leading-relaxed">
              As a B.Tech (Hons.) Computer Science Engineering student specializing in Data Science and minoring in Finance at Vidyashilp University, Bengaluru, I bridge the gap between academic depth and industrial application.
            </p>
            
            <p className="text-graphite-dark/70 leading-relaxed">
              Through my freelance studio, I deliver complete end-to-end applications for startups, logistics providers, and NGOs. I don't just write scripts—I design databases, deploy scalable servers, build polished responsive frontends, and integrate contextual AI layers (such as LLM RAG frameworks and custom computer vision models) that solve real business problems.
            </p>
            
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-light rounded-lg bg-warm-paper/50 flex items-start space-x-3">
                <Brain className="w-5 h-5 text-cyan-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-heading text-sm font-semibold text-graphite-dark">Applied AI Specialist</h4>
                  <p className="text-xs text-graphite-dark/60 mt-1">Building custom retrieval systems, fine-tuning OCR pipelines, and deploying computer vision models.</p>
                </div>
              </div>

              <div className="p-4 border border-slate-light rounded-lg bg-warm-paper/50 flex items-start space-x-3">
                <Code className="w-5 h-5 text-coral-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-heading text-sm font-semibold text-graphite-dark">Full-Stack Capability</h4>
                  <p className="text-xs text-graphite-dark/60 mt-1">Deploying structured backends (Node.js, FastAPI, SQL, Prisma) integrated with interactive React interfaces.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fact card sidebar */}
          <motion.div 
            className="lg:col-span-5 flex flex-col justify-between"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="border border-slate-light rounded-xl p-8 bg-warm-paper/70 shadow-premium relative">
              {/* Technical corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-slate-light" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-slate-light" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-slate-light" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-slate-light" />

              <h4 className="font-heading text-lg font-bold text-graphite-dark mb-6 flex items-center space-x-2">
                <span>Core Credentials</span>
              </h4>

              <div className="space-y-6">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded bg-slate-light/40 text-graphite-dark">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase text-graphite-dark/50 tracking-wider">Education</p>
                    <p className="text-sm font-semibold text-graphite-dark mt-0.5">B.Tech (Hons.) CSE (Data Science)</p>
                    <p className="text-xs text-graphite-dark/60">Vidyashilp University, Bengaluru</p>
                    <p className="text-[10px] text-cyan-accent font-mono mt-0.5">CGPA 7.58 · Expected 2026</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded bg-slate-light/40 text-graphite-dark">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase text-graphite-dark/50 tracking-wider">Minor Specialization</p>
                    <p className="text-sm font-semibold text-graphite-dark mt-0.5">Finance</p>
                    <p className="text-xs text-graphite-dark/60">Financial Statements, Investment Management</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded bg-slate-light/40 text-graphite-dark">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase text-graphite-dark/50 tracking-wider">Based In</p>
                    <p className="text-sm font-semibold text-graphite-dark mt-0.5">Bengaluru, KA, India</p>
                    <p className="text-xs text-graphite-dark/60">Active in the local AI/ML and startup ecosystems</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
