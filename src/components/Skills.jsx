import React, { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, ShieldAlert, Laptop, BarChart2, ShieldCheck, Sparkles } from 'lucide-react';

const SkillsScene = lazy(() => import('./SkillsScene'));

const skillGroups = [
  {
    title: "AI/ML & LLM Engineering",
    icon: Sparkles,
    skills: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "LLMs (Gemini/GPT)", "LangChain", "RAG Pipelines", "FAISS / Vector DBs", "Agentic AI", "Prompt Engineering"],
    accent: "text-cyan-accent border-cyan-accent/20 bg-cyan-accent/5"
  },
  {
    title: "Languages & Core CS",
    icon: Terminal,
    skills: ["Python", "SQL", "JavaScript", "MySQL", "Data Structures & Algorithms (DSA)", "Object-Oriented Programming"],
    accent: "text-graphite-dark border-slate-light bg-slate-light/20"
  },
  {
    title: "Backend & APIs",
    icon: Database,
    skills: ["FastAPI", "Node.js", "REST APIs", "Prisma ORM", "Express.js", "Serverless Functions"],
    accent: "text-coral-accent border-coral-accent/20 bg-coral-accent/5"
  },
  {
    title: "Frontend & UI",
    icon: Laptop,
    skills: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "React Three Fiber (R3F)", "HTML5 / CSS3"],
    accent: "text-cyan-accent border-cyan-accent/25 bg-cyan-accent/5"
  },
  {
    title: "Data & Visualization",
    icon: BarChart2,
    skills: ["Power BI", "Tableau", "Pandas", "NumPy", "Matplotlib", "Data Wrangling"],
    accent: "text-amber-accent border-amber-accent/20 bg-amber-accent/5"
  },
  {
    title: "Domain & Minors",
    icon: ShieldCheck,
    skills: ["Financial Statement Analysis", "Investment Management", "Portfolio Theory", "Corporate Finance"],
    accent: "text-graphite-dark border-slate-light bg-slate-light/10"
  }
];

export default function Skills({ prefersReducedMotion }) {
  const [hoveredGroup, setHoveredGroup] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="skills" className="py-24 border-b border-slate-light bg-warm-paper/30 relative">
      {/* Background radial fade */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] radial-fade-coral pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-left">
          <p className="font-mono text-[11px] uppercase tracking-widest text-cyan-accent font-semibold mb-2">04 / Stack</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-graphite-dark tracking-tight">
            Capabilities.
          </h2>
          <div className="w-12 h-1 bg-cyan-accent mt-4" />
        </div>

        {/* Main Grid: Left 3D Canvas, Right 2D Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 3D orbiting cluster */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="w-full text-center lg:text-left mb-6 lg:mb-0 lg:max-w-sm">
              <h3 className="font-heading text-xl font-bold text-graphite-dark">Interactive Node Model</h3>
              <p className="text-xs text-graphite-dark/60 mt-1 leading-relaxed">
                Hovering over the capability blocks on the right highlights the corresponding core node categories in this 3D orbiting ecosystem.
              </p>
            </div>
            
            <div className="w-full relative h-[350px] md:h-[400px]">
              {!prefersReducedMotion ? (
                <Suspense fallback={
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 opacity-50">
                    <div className="w-8 h-8 rounded-full border-2 border-slate-light border-t-cyan-accent animate-spin" />
                    <span className="font-mono text-[10px] text-graphite-dark/50">Mapping Orbit coordinates...</span>
                  </div>
                }>
                  <SkillsScene hoveredGroup={hoveredGroup} />
                </Suspense>
              ) : (
                // SVG Fallback for reduced motion
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                  <svg width="100%" height="100%" viewBox="0 0 200 200" className="max-w-[200px]">
                    <circle cx="100" cy="100" r="60" stroke="#06B6D4" strokeWidth="0.5" fill="none" strokeDasharray="3,3" />
                    <circle cx="100" cy="100" r="40" stroke="#E4E4E1" strokeWidth="0.5" fill="none" />
                    <circle cx="100" cy="100" r="4" fill="#1A1D23" />
                    <circle cx="100" cy="40" r="6" fill="#06B6D4" />
                    <circle cx="100" cy="160" r="6" fill={hoveredGroup ? "#FB7A5C" : "#06B6D4"} />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Filterable Grid Category blocks */}
          <motion.div 
            className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {skillGroups.map((group, idx) => {
              const Icon = group.icon;
              
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredGroup(group.title)}
                  onMouseLeave={() => setHoveredGroup(null)}
                  className="p-5 border border-slate-light rounded-xl bg-warm-paper/70 hover:border-cyan-accent/50 hover:bg-warm-paper hover:shadow-premium transition-all duration-300 text-left"
                >
                  <div className="flex items-center space-x-2.5 mb-3.5">
                    <div className={`p-2 rounded-lg border ${group.accent} flex-shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-heading text-sm font-bold text-graphite-dark">
                      {group.title}
                    </h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx} 
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-light/30 text-graphite-dark/80 hover:text-cyan-accent transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
