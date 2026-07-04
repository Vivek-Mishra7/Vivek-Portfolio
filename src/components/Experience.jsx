import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Briefcase, Plus, Minus, ArrowUpRight } from 'lucide-react';

const experiences = [
  {
    role: "Full-Stack & AI Developer",
    company: "Freelancer / Self-Employed",
    location: "Bengaluru, India",
    period: "Jan 2026 – Present",
    type: "Freelance / Contract",
    tags: ["React", "Tailwind CSS", "Framer Motion", "FastAPI", "Node.js", "AI Automation"],
    highlights: [
      "Architect and ship production-grade web applications for startup & NGO clients across logistics, real estate, and services industries.",
      "Integrate AI-driven solutions, including custom lead-reminder tracking tools and data workflows, to automate manual processes.",
      "Manage end-to-end product lifecycles, from UI/UX high-fidelity wireframing to database engineering, client management, and deployment."
    ]
  },
  {
    role: "AI Intern",
    company: "Hell Craft Tech",
    location: "Bengaluru, India",
    period: "Jan – Jul 2026 (Capstone)",
    type: "Internship",
    tags: ["Node.js", "React", "SQL", "Prisma ORM", "Data Science", "ERP Integration"],
    highlights: [
      "Contributed to ERP system development, linking backend databases to intuitive client reporting dashboards.",
      "Engineered data pipelines for analytics and automated reporting, facilitating real-time operational decisions.",
      "Refactored relational database queries using Prisma ORM, optimizing load speeds by 25% across key data tables."
    ]
  },
  {
    role: "Programming Intern",
    company: "Akansha Foundation",
    location: "Pune, India",
    period: "Jan – May 2025",
    type: "Internship / NGO Work",
    tags: ["SQL", "Relational Databases", "React", "NGO-Connect", "Automation"],
    highlights: [
      "Designed and modeled the database schema for the NGO-Connect portal, managing data for 27 regional schools.",
      "Automated school-volunteer communication and matching assignments, eliminating 15+ hours of weekly manual coordination.",
      "Conducted programming classes and taught core computer science topics to underprivileged students."
    ]
  },
  {
    role: "Data Science Intern",
    company: "IIT Guwahati",
    location: "Assam, India",
    period: "Jun – Aug 2024",
    type: "Research Internship",
    tags: ["Python", "Deep Learning", "Retentive Neural Networks", "PyTorch", "Computer Vision"],
    highlights: [
      "Developed a Retentive Neural Network ('Learning Without Forgetting') structure, reducing catastrophic forgetting rates by 18% in image classifiers.",
      "Created annotations for large-scale marine image sets used in environmental research and conservation studies.",
      "Wrote optimized PyTorch training loops, improving training throughput on deep neural networks."
    ]
  }
];

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState(0); // Start with first item expanded

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <section id="experience" className="py-24 border-b border-slate-light bg-warm-paper/30 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-left">
          <p className="font-mono text-[11px] uppercase tracking-widest text-cyan-accent font-semibold mb-2">02 / Experience</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-graphite-dark tracking-tight">
            Professional trajectory.
          </h2>
          <div className="w-12 h-1 bg-cyan-accent mt-4" />
        </div>

        {/* Timeline Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sidebar details */}
          <div className="lg:col-span-4 text-left space-y-4">
            <h3 className="font-heading text-xl font-bold text-graphite-dark">
              Practical execution over theory.
            </h3>
            <p className="text-sm text-graphite-dark/70 leading-relaxed max-w-sm">
              My career spans freelance delivery, deep learning research, and automating volunteer operations. Select an entry on the timeline to inspect the technical highlights, stacks, and deliverables.
            </p>
            <div className="hidden lg:block pt-6">
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-graphite-dark/40 bg-slate-light/20 px-3 py-1.5 rounded border border-slate-light/60">
                <span className="w-2 h-2 rounded-full bg-cyan-accent" />
                <span>Interactive Elements: Expandable Cards</span>
              </div>
            </div>
          </div>

          {/* Right Column: Timeline Cards */}
          <div className="lg:col-span-8 relative pl-6 md:pl-10 text-left">
            {/* Vertical timeline line */}
            <div className="absolute left-1.5 md:left-5 top-2 bottom-2 w-[2px] timeline-line" />

            <div className="space-y-6">
              {experiences.map((exp, idx) => {
                const isExpanded = expandedIndex === idx;
                
                return (
                  <motion.div 
                    key={idx}
                    layout="position"
                    transition={{ layout: { type: "spring", stiffness: 100, damping: 18 } }}
                    className={`relative border rounded-xl p-5 md:p-6 transition-all duration-300 cursor-pointer ${
                      isExpanded 
                        ? 'border-cyan-accent/80 bg-warm-paper shadow-premium-hover ring-1 ring-cyan-accent/10' 
                        : 'border-slate-light bg-warm-paper/50 hover:bg-warm-paper hover:border-graphite-dark/45 hover:shadow-premium'
                    }`}
                    onClick={() => toggleExpand(idx)}
                  >
                    {/* Timeline Node Point */}
                    <div className={`absolute -left-[29px] md:-left-[45px] top-6 w-3 h-3 rounded-full border-2 transition-all ${
                      isExpanded 
                        ? 'bg-cyan-accent border-warm-paper scale-125' 
                        : 'bg-warm-paper border-slate-light group-hover:border-graphite-dark'
                    }`} />

                    {/* Timeline Card Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <span className="inline-flex items-center space-x-1 font-mono text-[9px] uppercase tracking-wider text-graphite-dark/50 bg-slate-light/40 px-2 py-0.5 rounded mb-1">
                          {exp.type}
                        </span>
                        <h4 className="font-heading text-lg font-bold text-graphite-dark leading-snug">
                          {exp.role}
                        </h4>
                        <div className="flex items-center space-x-1.5 text-sm font-medium text-graphite-dark/80 mt-0.5">
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:items-end text-xs font-mono text-graphite-dark/50 space-y-1">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-graphite-dark/40" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-graphite-dark/40" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Expand/Collapse Indicator */}
                    <div className="absolute right-6 top-6 text-graphite-dark/40">
                      {isExpanded ? <Minus className="w-4 h-4 text-cyan-accent" /> : <Plus className="w-4 h-4" />}
                    </div>

                    {/* Expandable Details Container */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          {/* Inner Content spacing */}
                          <div className="pt-5 mt-4 border-t border-slate-light space-y-4">
                            
                            {/* Key Highlights */}
                            <ul className="space-y-2.5">
                              {exp.highlights.map((bullet, bIdx) => (
                                <li key={bIdx} className="text-sm text-graphite-dark/70 leading-relaxed flex items-start space-x-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent/80 mt-1.5 flex-shrink-0" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>

                            {/* Tech Stack Tags */}
                            <div className="pt-2">
                              <p className="text-[10px] font-mono uppercase tracking-wider text-graphite-dark/40 mb-2">Technologies Used:</p>
                              <div className="flex flex-wrap gap-1.5">
                                {exp.tags.map((tag, tIdx) => (
                                  <span 
                                    key={tIdx} 
                                    className="font-mono text-[10px] px-2.5 py-0.5 rounded bg-slate-light/40 border border-slate-light text-graphite-dark/80"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
