import { motion } from "motion/react";
import { BarChart3, Layers, Target, Zap } from "lucide-react";

export default function SystemPositioning() {
  const approaches = [
    {
      icon: <BarChart3 className="w-6 h-6 text-secondary-accent" />,
      title: "Performance Marketing",
      description: "Google + Meta Ads scaling strategies."
    },
    {
      icon: <Layers className="w-6 h-6 text-secondary-accent" />,
      title: "Funnel Architecture",
      description: "Structured paths from awareness to conversion."
    },
    {
      icon: <Target className="w-6 h-6 text-secondary-accent" />,
      title: "Conversion Optimization",
      description: "Maximizing every click for profit."
    },
    {
      icon: <Zap className="w-6 h-6 text-secondary-accent" />,
      title: "Data & Tracking",
      description: "GA4 and custom tracking systems."
    }
  ];

  return (
    <section className="py-10 overflow-hidden" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
              We Don't Run Ads. <br />
              <span className="text-gradient-blue">We Build Growth Systems.</span>
            </h2>
            <p className="text-lg text-text-secondary mb-12 max-w-xl">
              Our approach combines performance marketing, funnel architecture, conversion optimization, and data tracking to deliver predictable, scalable revenue.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {approaches.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary-accent/10 border border-secondary-accent/20 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-xs text-text-secondary">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 p-8 rounded-3xl bg-card-bg border border-card-border shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="text-sm font-bold tracking-widest uppercase text-text-secondary">Growth Engine Status</div>
                <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold">ACTIVE</div>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: "Funnel Efficiency", value: 94, color: "bg-secondary-accent" },
                  { label: "Ad Performance", value: 88, color: "bg-primary-accent" },
                  { label: "Data Integrity", value: 99, color: "bg-blue-500" }
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between text-xs mb-2">
                      <span>{bar.label}</span>
                      <span className="font-mono">{bar.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bar.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`h-full ${bar.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 rounded-2xl bg-background/50 border border-white/5">
                <div className="text-[10px] text-text-secondary uppercase mb-4">Predictive Scaling Result</div>
                <div className="text-2xl font-bold text-gradient-orange">+$240,000 / Mo</div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary-accent/20 blur-[80px] rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-accent/20 blur-[80px] rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
