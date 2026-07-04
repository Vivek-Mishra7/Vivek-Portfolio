import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Filter, Code } from 'lucide-react';

const projects = [
  {
    title: "DocuMind AI",
    category: "AI/ML",
    description: "Enterprise RAG assistant allowing users to upload multi-page PDF documents and run contextual Q&A queries. Designed vector retrieval with strict prompt bounding.",
    result: "Instant semantic retrieval & extraction from 500+ page documents",
    tech: ["FastAPI", "LangChain", "FAISS", "Gemini API", "Python"],
    github: "#", // placeholder
    live: "#" // placeholder
  },
  {
    title: "SnapText AI",
    category: "AI/ML",
    description: "High-accuracy multi-lingual OCR pipeline that processes unstructured scans, extracting structural key-value tables and structured JSON strings.",
    result: "Structural parsing with 98.7% digit recognition accuracy",
    tech: ["PaddleOCR", "Gemini API", "FastAPI", "React", "Docker"],
    github: "#",
    live: "#"
  },
  {
    title: "Intelligent Surveillance System",
    category: "AI/ML",
    description: "Crowd behavior analysis, simulation, and anomaly detection modeling. Integrates real-time object tracking with structural generative models.",
    result: "Detected high-density crowd anomalies in <250ms latency",
    tech: ["YOLO", "ResNet-50", "VAE", "LSTM", "Conditional GANs", "PyTorch"],
    github: "#",
    live: "#"
  },
  {
    title: "Deepfake Detection Classifier",
    category: "AI/ML",
    description: "SOTA image classification system trained to distinguish real human faces from deepfake or digitally manipulated images.",
    result: "94.2% classification accuracy on Celeb-DF benchmark dataset",
    tech: ["CNNs", "Vision Transformers (ViT)", "PyTorch", "OpenCV"],
    github: "#",
    live: "#"
  },
  {
    title: "High-Risk Migration Zones Model",
    category: "Data Science",
    description: "Predictive machine learning model assessing environmental risk variables to forecast climate-induced human displacement zones, backed by Streamlit narrative dashboards.",
    result: "85% accuracy zone mapping for planning NGOs",
    tech: ["Python", "Scikit-Learn", "Pandas", "Streamlit", "GeoPandas"],
    github: "#",
    live: "#"
  },
  {
    title: "NGO-Connect Portal",
    category: "Full-Stack",
    description: "Volunteering management platform built for Akansha Foundation. Automates volunteer-school matching and features AI-assisted background checks.",
    result: "Auto-approved certificates for volunteers across 27 schools",
    tech: ["React", "Tailwind CSS", "Node.js", "Express", "PostgreSQL"],
    github: "#",
    live: "#"
  },
  {
    title: "Glowkaya Beauty POS",
    category: "Automation",
    description: "Lightweight cloud Point-of-Sale application that maps catalog orders, inventory tracking, and client logs directly in central Google Sheets databases.",
    result: "Zero-cost POS system managing 1,200+ monthly orders",
    tech: ["Google Apps Script", "HTML5", "CSS3", "Google Sheets API"],
    github: "#",
    live: "#"
  },
  {
    title: "MagicTick Studio",
    category: "Full-Stack",
    description: "Co-founded agency delivering custom digital products, web experiences, CRM automations, and AI integrations for early-stage startups and small businesses.",
    result: "Shipped 10+ operational products for regional ventures",
    tech: ["React", "Next.js", "Tailwind", "Framer Motion", "Vercel"],
    github: "#",
    live: "#"
  }
];

const categories = ["All", "AI/ML", "Data Science", "Full-Stack", "Automation"];

// Project Card component implementing 3D tilt
function ProjectCard({ project }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), { damping: 15, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), { damping: 15, stiffness: 150 });

  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative border border-slate-light rounded-xl p-6 bg-warm-paper/70 hover:bg-warm-paper hover:border-cyan-accent/50 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Visual background details */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-cyan-accent/5 to-transparent rounded-bl-full pointer-events-none group-hover:from-cyan-accent/15 transition-all" />
      
      <div style={{ transform: 'translateZ(10px)' }}>
        {/* Category & Icons */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-accent border border-cyan-accent/20 px-2 py-0.5 rounded-full bg-cyan-accent/5">
            {project.category}
          </span>
          <div className="flex items-center space-x-2.5">
            <a 
              href={project.github} 
              className="text-graphite-dark/40 hover:text-graphite-dark transition-colors"
              title="View GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href={project.live} 
              className="text-graphite-dark/40 hover:text-cyan-accent transition-colors"
              title="View Live Link"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Project Title */}
        <h4 className="font-heading text-lg font-bold text-graphite-dark mb-2.5 group-hover:text-cyan-accent transition-colors">
          {project.title}
        </h4>

        {/* Project Description */}
        <p className="text-xs text-graphite-dark/70 leading-relaxed mb-4">
          {project.description}
        </p>
      </div>

      <div style={{ transform: 'translateZ(15px)' }}>
        {/* Core Metric / Output */}
        <div className="border-l-2 border-coral-accent pl-3 py-1 mb-4 bg-coral-accent/5 rounded-r">
          <p className="text-[10px] font-mono uppercase text-coral-accent tracking-wider font-semibold">Key Outcome</p>
          <p className="text-xs font-semibold text-graphite-dark mt-0.5">{project.result}</p>
        </div>

        {/* Tech Stack pills */}
        <div className="flex flex-wrap gap-1">
          {project.tech.map((t, idx) => (
            <span 
              key={idx} 
              className="font-mono text-[9px] text-graphite-dark/60 bg-slate-light/30 px-2 py-0.5 rounded border border-slate-light/40"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = projects.filter(proj => 
    filter === "All" ? true : proj.category === filter
  );

  return (
    <section id="projects" className="py-24 border-b border-slate-light bg-warm-paper relative">
      {/* Background visual grain/fade */}
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-cyan-accent/5 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-cyan-accent font-semibold mb-2">03 / Works</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-graphite-dark tracking-tight">
              Selected projects.
            </h2>
            <div className="w-12 h-1 bg-cyan-accent mt-4" />
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-1.5 bg-slate-light/35 p-1 rounded-lg border border-slate-light/60">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-md font-heading text-xs font-semibold transition-all ${
                  filter === cat
                    ? 'bg-warm-paper text-cyan-accent shadow-sm border border-slate-light/40'
                    : 'text-graphite-dark/60 hover:text-graphite-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>

        {/* Optional Studio Callout */}
        <div className="mt-12 p-6 border border-slate-light border-dashed rounded-xl bg-warm-paper/30 flex flex-col md:flex-row items-center justify-between text-left gap-4">
          <div className="flex items-start space-x-3.5">
            <Code className="w-5 h-5 text-cyan-accent mt-0.5" />
            <div>
              <h5 className="font-heading text-sm font-semibold text-graphite-dark">Need custom software or AI automation?</h5>
              <p className="text-xs text-graphite-dark/60 mt-0.5">I work directly with startup founders and NGOs to scope, design, and deploy production software packages.</p>
            </div>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-mono font-semibold text-cyan-accent hover:text-cyan-accent/80 flex items-center space-x-1 whitespace-nowrap"
          >
            <span>Discuss a project</span>
            <span>&rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
}
