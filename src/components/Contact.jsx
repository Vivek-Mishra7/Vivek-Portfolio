import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, Send, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Set your Google Apps Script Web App URL here after deployment (see google_sheets_integration.md)
const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbw8NRypiXpVSXv7QVrtdrUVbdxuWnjz9A4A5zaZGKo3A1L0WFEqa4Cqc9cA-qTu_90O/exec";

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSubmitting(true);
    
    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors', // Avoids CORS pre-flight redirect issues with Google Apps Script
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formState),
        });
        
        setIsSubmitting(false);
        setIsSubmitted(true);
        setShowModal(true); // Pop up the thank you modal
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } catch (error) {
        console.error("Submission error:", error);
        setIsSubmitting(false);
        alert("Oops! Message transmission failed. Please email student.vivek.mishra@gmail.com directly.");
      }
    } else {
      // Local simulation mode (runs if Webhook URL is empty)
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setShowModal(true); // Pop up the thank you modal
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      }, 1200);
    }
  };

  return (
    <section id="contact" className="py-24 border-b border-slate-light bg-warm-paper relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-cyan-accent/5 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-left">
          <p className="font-mono text-[11px] uppercase tracking-widest text-cyan-accent font-semibold mb-2">06 / Contact</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-graphite-dark tracking-tight">
            Initiate connection.
          </h2>
          <div className="w-12 h-1 bg-cyan-accent mt-4" />
        </div>

        {/* Contact Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Left Side: Contact Credentials & Availability */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="font-heading text-xl font-bold text-graphite-dark">
                Let's discuss shipping your next product.
              </h3>
              <p className="text-sm text-graphite-dark/70 leading-relaxed max-w-sm">
                I am currently open to selective freelance contracts, product integrations, and full-time junior ML engineering/full-stack developer roles starting mid-2026.
              </p>
            </div>

            {/* Direct Details */}
            <div className="space-y-4 pt-4 border-t border-slate-light/60 flex flex-col">
              <a 
                href="mailto:student.vivek.mishra@gmail.com" 
                className="flex items-center space-x-3 text-sm text-graphite-dark/70 hover:text-cyan-accent transition-colors"
                title="Send direct email"
              >
                <Mail className="w-4 h-4 text-cyan-accent flex-shrink-0" />
                <span className="font-mono text-xs">student.vivek.mishra@gmail.com</span>
              </a>

              <a 
                href="tel:+917666328759" 
                className="flex items-center space-x-3 text-sm text-graphite-dark/70 hover:text-cyan-accent transition-colors"
                title="Call direct"
              >
                <Phone className="w-4 h-4 text-cyan-accent flex-shrink-0" />
                <span className="font-mono text-xs">+91 76663 28759</span>
              </a>

              <a 
                href="https://wa.me/917666328759?text=Hi%20Vivek,%20I%20viewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project." 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-sm text-graphite-dark/70 hover:text-emerald-600 transition-colors"
                title="Chat on WhatsApp"
              >
                <svg className="w-4 h-4 text-emerald-500 fill-current flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="font-mono text-xs">+91 76663 28759</span>
                <span className="text-[9px] font-mono text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Chat</span>
              </a>
            </div>

            {/* Socials Row */}
            <div className="flex items-center space-x-4 pt-4">
              <a 
                href="https://linkedin.com/in/placeholder" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center space-x-2 text-xs font-mono text-graphite-dark/70 hover:text-cyan-accent border border-slate-light hover:border-cyan-accent px-3.5 py-2 rounded bg-warm-paper/50 transition-all shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a 
                href="https://github.com/placeholder" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center space-x-2 text-xs font-mono text-graphite-dark/70 hover:text-cyan-accent border border-slate-light hover:border-cyan-accent px-3.5 py-2 rounded bg-warm-paper/50 transition-all shadow-sm"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Availability pill banner */}
            <div className="p-4 border border-cyan-accent/20 bg-cyan-accent/5 rounded-xl flex items-start space-x-3 max-w-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-accent mt-1.5 animate-pulse flex-shrink-0" />
              <div>
                <h5 className="font-heading text-xs font-bold text-graphite-dark">Current Status</h5>
                <p className="text-[11px] text-graphite-dark/60 mt-0.5 leading-relaxed">
                  Available for freelancing & B.Tech Capstone roles. Located in Bengaluru (can commute or work remote).
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Message Form */}
          <div className="lg:col-span-7">
            <div className="border border-slate-light rounded-xl p-6 md:p-8 bg-warm-paper/50 shadow-premium relative">
              
              <h4 className="font-heading text-lg font-bold text-graphite-dark mb-6">
                Transmit a Message
              </h4>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-mono uppercase text-graphite-dark/50 tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-light bg-warm-paper text-sm text-graphite-dark focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent/15 focus:outline-none transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[10px] font-mono uppercase text-graphite-dark/50 tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-light bg-warm-paper text-sm text-graphite-dark focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent/15 focus:outline-none transition-colors"
                    placeholder="name@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[10px] font-mono uppercase text-graphite-dark/50 tracking-wider mb-1.5">
                    Message Body
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-light bg-warm-paper text-sm text-graphite-dark focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent/15 focus:outline-none transition-colors resize-none"
                    placeholder="Describe your project requirements or career query..."
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`w-full py-3 rounded-lg font-heading text-sm font-semibold flex items-center justify-center space-x-2 shadow-md transform hover:scale-[1.01] transition-all ${
                      isSubmitted 
                        ? 'bg-emerald-500 text-warm-paper' 
                        : 'bg-graphite-dark text-warm-paper hover:bg-graphite-dark/95'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 rounded-full border border-warm-paper border-t-transparent animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Message Sent Successfully</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Formspree/Service Note */}
              <div className="mt-4 text-[10px] font-mono text-graphite-dark/40 text-center">
                * Note: Form submission is currently a simulated endpoint. Direct integration can be wired to Formspree or Resend.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Success Modal Popup Overlay */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-graphite-dark/45 backdrop-blur-[4px]"
            />
            
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-warm-paper border border-slate-light max-w-sm w-full rounded-2xl p-8 shadow-premium-hover text-center z-10"
            >
              {/* Close Button Icon */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-graphite-dark/40 hover:text-graphite-dark hover:bg-slate-light/45 p-1 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Smiling Emoji Indicator */}
              <div className="mx-auto w-14 h-14 bg-cyan-accent/10 text-cyan-accent rounded-full flex items-center justify-center text-3xl mb-5 animate-bounce">
                😊
              </div>

              {/* Headings */}
              <h3 className="font-heading text-lg font-bold text-graphite-dark mb-2">
                Thank you!
              </h3>
              
              {/* message */}
              <p className="text-xs text-graphite-dark/70 leading-relaxed mb-6">
                Your message has been successfully transmitted. Vivek will get back to you shortly! 😊
              </p>

              {/* Dismiss CTA */}
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 bg-cyan-accent text-warm-paper rounded-lg font-heading text-sm font-semibold hover:bg-cyan-accent/90 shadow-sm transition-all"
              >
                Close Window
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
