import { motion } from "motion/react";
import { Search, Zap, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function EntryPoints() {
  const steps = [
    {
      icon: <Search className="w-6 h-6 text-primary-accent" />,
      title: "Free SEO Audit",
      subtitle: "Lead Magnet",
      description: "Identify growth gaps and hidden opportunities in your current search presence.",
      cta: "Get Free Audit"
    },
    {
      icon: <Zap className="w-6 h-6 text-secondary-accent" />,
      title: "30-Min Ad Diagnosis",
      subtitle: "Quick Fix",
      description: "Fix your current campaigns and stop wasting ad spend with a professional review.",
      cta: "Book Diagnosis"
    },
    {
      icon: <Rocket className="w-6 h-6 text-primary-accent" />,
      title: "Full Growth System",
      subtitle: "Scale Fast",
      description: "Scale profitably with structured systems designed for long-term market domination.",
      cta: "Start Scaling"
    }
  ];

  return (
    <section className="py-10 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Start With What You Need
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg"
          >
            Choose your entry point and let's build your growth engine.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-3xl bg-card-bg border border-card-border hover:border-primary-accent/50 transition-all duration-300 flex flex-col h-full"
            >
              <div className="w-14 h-14 rounded-2xl bg-background border border-card-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-primary-accent mb-2">{step.subtitle}</div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-text-secondary mb-8 flex-grow leading-relaxed">
                {step.description}
              </p>
              <Link href="/contact" className="w-full">
              <button className="w-full py-4 rounded-xl bg-background border border-card-border text-sm font-bold flex items-center justify-center gap-2 group-hover:bg-primary-accent group-hover:text-background transition-all">
                {step.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
