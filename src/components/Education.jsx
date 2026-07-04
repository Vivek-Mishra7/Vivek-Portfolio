import React from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, BookOpen, Users, CompassIcon } from 'lucide-react';

const leadershipRoles = [
  {
    role: "Executive Student Member",
    organization: "IEEE Bangalore Section",
    desc: "Coordinate technical symposia and foster student engagement across regional IEEE chapters."
  },
  {
    role: "Core Member",
    organization: "Data Science Club",
    desc: "Organize workshops, hackathons, and study groups on machine learning, NLP, and vector architectures."
  },
  {
    role: "Executive Member",
    organization: "Robotics Club",
    desc: "Facilitate micro-controller programming sessions and design autonomous sensor integration guides."
  },
  {
    role: "Former College Vice Captain",
    organization: "Fergusson College",
    desc: "Managed student council activities, sports teams operations, and inter-college cultural programs."
  }
];

export default function Education() {
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
    <section id="education" className="py-24 border-b border-slate-light bg-warm-paper relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-left">
          <p className="font-mono text-[11px] uppercase tracking-widest text-cyan-accent font-semibold mb-2">05 / Credentials</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-graphite-dark tracking-tight">
            Education & Leadership.
          </h2>
          <div className="w-12 h-1 bg-cyan-accent mt-4" />
        </div>

        {/* Education & Leadership Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Left: Education Details */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-heading text-xl font-bold text-graphite-dark flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-cyan-accent" />
              <span>Academic Foundation</span>
            </h3>

            <div className="border border-slate-light rounded-xl p-6 bg-warm-paper/70 shadow-premium relative">
              <div className="absolute top-0 right-0 p-3 text-[10px] font-mono text-cyan-accent uppercase bg-cyan-accent/5 rounded-bl-lg rounded-tr-xl border-l border-b border-slate-light/50 font-semibold">
                Expected 2026
              </div>

              <p className="font-mono text-[10px] text-graphite-dark/50 uppercase tracking-widest mb-1.5">Bachelor of Technology (Hons.)</p>
              <h4 className="font-heading text-lg font-bold text-graphite-dark leading-snug">
                Computer Science & Engineering
              </h4>
              <p className="text-sm font-semibold text-graphite-dark mt-1">
                Specialization in Data Science, Minor in Finance
              </p>
              
              <div className="mt-4 pt-4 border-t border-slate-light/60 space-y-3">
                <div>
                  <p className="text-[10px] font-mono text-graphite-dark/40 uppercase tracking-wider">Institution</p>
                  <p className="text-sm text-graphite-dark/80 mt-0.5">Vidyashilp University, Bengaluru</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-mono text-graphite-dark/40 uppercase tracking-wider">Grade (CGPA)</p>
                    <p className="text-sm font-bold text-cyan-accent mt-0.5">7.58 / 10.0</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-graphite-dark/40 uppercase tracking-wider">Minor Focus</p>
                    <p className="text-sm text-graphite-dark/80 mt-0.5 font-medium">Investment Theory</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Minor highlights detail block */}
            <div className="p-5 border border-slate-light border-dashed rounded-xl bg-warm-paper/30">
              <h5 className="font-heading text-xs font-bold text-graphite-dark uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <Award className="w-3.5 h-3.5 text-coral-accent" />
                <span>Interdisciplinary Focus</span>
              </h5>
              <p className="text-xs text-graphite-dark/70 leading-relaxed">
                By minoring in Finance, I couple software automation with a solid grasp of financial statement analysis, valuations, and quantitative portfolio management theories.
              </p>
            </div>
          </div>

          {/* Right: Leadership Grid */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-heading text-xl font-bold text-graphite-dark flex items-center space-x-2">
              <Users className="w-5 h-5 text-cyan-accent" />
              <span>Leadership & Clubs</span>
            </h3>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {leadershipRoles.map((role, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-5 border border-slate-light rounded-xl bg-warm-paper/70 hover:border-slate-light hover:shadow-premium transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-cyan-accent font-semibold mb-1">
                      {role.role}
                    </p>
                    <h4 className="font-heading text-sm font-bold text-graphite-dark mb-2">
                      {role.organization}
                    </h4>
                    <p className="text-xs text-graphite-dark/60 leading-relaxed">
                      {role.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
