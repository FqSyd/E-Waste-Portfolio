import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  RefreshCw, 
  Repeat, 
  Globe, 
  ShieldAlert, 
  Cpu, 
  Boxes, 
  CheckCircle,
  Zap,
  TrendingDown
} from 'lucide-react';

export const SubjectOverviewSection = () => {
  const overviewCards = [
    {
      title: "What is E-Waste?",
      subtitle: "Electronic Scrap Definition",
      icon: Cpu,
      color: "from-emerald-500 to-green-600",
      description: "Electronic Waste (E-Waste) encompasses discarded electrical or electronic devices—including laptops, smartphones, PCBs, CRTs, and household appliances—that have reached the end of their useful life.",
      points: [
        "Over 62 Million Tonnes generated globally per year",
        "Fastest growing domestic waste stream (+3% annually)",
        "Contains precious metals alongside hazardous chemicals"
      ]
    },
    {
      title: "Why E-Waste is Harmful?",
      subtitle: "Ecological & Health Hazards",
      icon: AlertTriangle,
      color: "from-amber-500 to-rose-600",
      description: "When improperly landfilled or burned in informal sector yards, toxic heavy metals leach into groundwater, bioaccumulate in soil, and release dangerous carcinogenic fumes into the atmosphere.",
      points: [
        "Lead & Mercury damage human central nervous systems",
        "Cadmium causes kidney degradation & soil toxicity",
        "Brominated Flame Retardants (BFRs) disrupt endocrine health"
      ]
    },
    {
      title: "Importance of Recycling",
      subtitle: "Urban Mining & Conservation",
      icon: RefreshCw,
      color: "from-eco-primary to-eco-accent",
      description: "E-waste recycling extracts high-grade Gold, Silver, Palladium, and Copper from circuit scrap, consuming up to 90% less energy than virgin mining operations.",
      points: [
        "1 Ton of PCBs yields 40x more gold than 1 ton of ore",
        "Reduces greenhouse gas emissions from raw mining",
        "Prevents toxic landfill contamination"
      ]
    },
    {
      title: "The Circular Economy",
      subtitle: "Closing the Technology Loop",
      icon: Repeat,
      color: "from-teal-500 to-cyan-600",
      description: "Shifting away from the linear 'Take-Make-Dispose' model toward a closed-loop system where hardware components are designed for modular disassembly, refurbishment, and complete raw material recovery.",
      points: [
        "Modular device assembly for easy repairability",
        "Extended Producer Responsibility (EPR) compliance",
        "Product-as-a-Service leasing business models"
      ]
    },
    {
      title: "The 3Rs: Reduce, Reuse, Recycle",
      subtitle: "Core Sustainability Hierarchy",
      icon: Boxes,
      color: "from-green-600 to-teal-600",
      description: "A foundational approach ranking environmental priority: first reducing unnecessary gadget purchases, secondly repairing/reusing functional tech, and finally recycling non-repairable scrap.",
      points: [
        "Reduce: Avoid frequent annual device upgrades",
        "Reuse: Refurbish, donate, or repurpose older hardware",
        "Recycle: Utilize certified municipal e-waste dropoff bins"
      ]
    },
    {
      title: "UN SDGs & Environmental Goals",
      subtitle: "Global Impact & Compliance",
      icon: Globe,
      color: "from-blue-600 to-eco-primary",
      description: "Directly aligned with UN Sustainable Development Goals—specifically SDG 12 (Responsible Consumption & Production) and SDG 13 (Climate Action).",
      points: [
        "SDG 12.5: Substantially reduce waste generation by 2030",
        "SDG 12.4: Environmentally sound management of chemicals",
        "SDG 13: Combat climate change via energy savings"
      ]
    }
  ];

  return (
    <section id="subject" className="py-20 relative bg-white/40 dark:bg-eco-darkCard/40 border-y border-eco-border dark:border-eco-darkBorder overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-eco-primary dark:text-eco-accent bg-eco-primary/10 dark:bg-eco-accent/10 px-4 py-1.5 rounded-full mb-3">
            Academic Domain
          </span>
          <h2 className="font-outfit font-extrabold text-3xl sm:text-5xl text-eco-text dark:text-eco-darkText tracking-tight">
            About E-Waste & Environmental Management
          </h2>
          <p className="mt-4 text-eco-muted dark:text-eco-darkMuted text-base">
            Exploring the challenges, ecological threats, legal frameworks, and technological solutions involved in managing electronic waste.
          </p>
        </div>

        {/* Infographic Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {overviewCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-3xl p-6 sm:p-8 border border-eco-border dark:border-eco-darkBorder shadow-eco-sm hover:shadow-eco-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Header & Icon */}
                  <div className="flex items-center space-x-4 mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${card.color} text-white flex items-center justify-center shadow-md shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-outfit font-bold text-lg text-eco-text dark:text-eco-darkText leading-snug">
                        {card.title}
                      </h3>
                      <span className="text-xs text-eco-primary dark:text-eco-accent font-semibold">
                        {card.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-eco-muted dark:text-eco-darkMuted leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Key Bullet Points */}
                <div className="space-y-2 border-t border-eco-border/60 dark:border-eco-darkBorder/60 pt-4">
                  {card.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start space-x-2 text-xs text-eco-text/90 dark:text-eco-darkText/90">
                      <CheckCircle className="w-4 h-4 text-eco-accent shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Highlight Banner: 3Rs & SDG Target */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 glass-card rounded-3xl p-8 border border-eco-accent/30 bg-gradient-to-r from-eco-primary/10 via-eco-secondary/10 to-eco-teal/10 shadow-eco-glow text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <h3 className="font-outfit font-bold text-2xl text-eco-text dark:text-eco-darkText">
              Ready to Practice Responsible E-Waste Management?
            </h3>
            <p className="text-xs sm:text-sm text-eco-muted dark:text-eco-darkMuted">
              "Every electronic device recycled prevents toxic soil leaching and conserves critical rare-earth elements for future generations."
            </p>
          </div>
          
          <a
            href="#assignments"
            className="px-6 py-3 rounded-2xl bg-eco-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-eco-secondary shadow-eco-sm transition-all shrink-0"
          >
            View Student Submissions
          </a>
        </motion.div>

      </div>
    </section>
  );
};
