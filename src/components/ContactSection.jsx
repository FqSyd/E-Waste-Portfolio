import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { studentData } from '../data/studentData';

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const contactCards = [
    {
      title: "Email Address",
      value: studentData.email,
      href: `mailto:${studentData.email}`,
      icon: Mail,
      color: "from-eco-primary to-eco-secondary"
    },
    {
      title: "Phone Contact",
      value: studentData.phone,
      href: `tel:${studentData.phone}`,
      icon: Phone,
      color: "from-eco-secondary to-eco-accent"
    },
    {
      title: "LinkedIn Profile",
      value: "Faaeq Sayed on LinkedIn",
      href: studentData.linkedin,
      icon: Linkedin,
      color: "from-blue-600 to-cyan-600"
    },
    {
      title: "GitHub Portfolio",
      value: "faaeq-sayed on GitHub",
      href: studentData.github,
      icon: Github,
      color: "from-neutral-700 to-neutral-900"
    },
    {
      title: "University Campus",
      value: studentData.location,
      href: "https://vit.edu.in",
      icon: MapPin,
      color: "from-teal-600 to-emerald-600"
    }
  ];

  return (
    <section id="contact" className="py-20 relative bg-eco-bg dark:bg-eco-darkBg overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-eco-primary dark:text-eco-accent bg-eco-primary/10 dark:bg-eco-accent/10 px-4 py-1.5 rounded-full mb-3">
            Get In Touch
          </span>
          <h2 className="font-outfit font-extrabold text-3xl sm:text-5xl text-eco-text dark:text-eco-darkText tracking-tight">
            Contact Information
          </h2>
          <p className="mt-4 text-eco-muted dark:text-eco-darkMuted text-base">
            Have questions regarding coursework, recycling drives, or technical collaborations? Feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {contactCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.a
                  key={card.title}
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="glass-card rounded-2xl p-4 border border-eco-border dark:border-eco-darkBorder shadow-eco-sm flex items-center space-x-4 hover:border-eco-accent/40 transition-all block group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${card.color} text-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <span className="block text-[11px] font-semibold text-eco-muted dark:text-eco-darkMuted uppercase tracking-wider">
                      {card.title}
                    </span>
                    <span className="font-outfit font-bold text-sm text-eco-text dark:text-eco-darkText group-hover:text-eco-primary dark:group-hover:text-eco-accent transition-colors truncate block">
                      {card.value}
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Right Column: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-card rounded-3xl p-8 border border-eco-border dark:border-eco-darkBorder shadow-eco-md"
          >
            <h3 className="font-outfit font-bold text-2xl text-eco-text dark:text-eco-darkText mb-2 flex items-center space-x-2">
              <MessageSquare className="w-6 h-6 text-eco-primary dark:text-eco-accent" />
              <span>Send a Message</span>
            </h3>
            <p className="text-xs text-eco-muted dark:text-eco-darkMuted mb-6">
              Send a quick inquiry or feedback note regarding the E-Portfolio.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-eco-primary/10 border border-eco-primary/30 text-center space-y-3"
              >
                <CheckCircle className="w-12 h-12 text-eco-primary mx-auto animate-bounce" />
                <h4 className="font-outfit font-bold text-lg text-eco-text dark:text-eco-darkText">
                  Message Delivered Successfully!
                </h4>
                <p className="text-xs text-eco-muted dark:text-eco-darkMuted max-w-sm mx-auto">
                  Thank you for connecting. I will review your note regarding E-Waste & Environmental Management shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-eco-text dark:text-eco-darkText mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Prof. Environmental Officer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/80 dark:bg-eco-darkBg/80 border border-eco-border dark:border-eco-darkBorder text-xs text-eco-text dark:text-eco-darkText placeholder-eco-muted/60 focus:outline-none focus:border-eco-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-eco-text dark:text-eco-darkText mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. professor@vit.edu.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/80 dark:bg-eco-darkBg/80 border border-eco-border dark:border-eco-darkBorder text-xs text-eco-text dark:text-eco-darkText placeholder-eco-muted/60 focus:outline-none focus:border-eco-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-eco-text dark:text-eco-darkText mb-1">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. E-Waste Assignment Feedback"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/80 dark:bg-eco-darkBg/80 border border-eco-border dark:border-eco-darkBorder text-xs text-eco-text dark:text-eco-darkText placeholder-eco-muted/60 focus:outline-none focus:border-eco-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-eco-text dark:text-eco-darkText mb-1">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/80 dark:bg-eco-darkBg/80 border border-eco-border dark:border-eco-darkBorder text-xs text-eco-text dark:text-eco-darkText placeholder-eco-muted/60 focus:outline-none focus:border-eco-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-eco-primary to-eco-secondary text-white font-bold text-xs shadow-eco-glow hover:shadow-eco-md transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
};
