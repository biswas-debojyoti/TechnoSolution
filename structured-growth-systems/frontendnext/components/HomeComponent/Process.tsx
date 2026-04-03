import { motion } from "motion/react";
import { Search, Activity, Construction, TrendingUp } from "lucide-react";

export default function Process() {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-primary-accent" />,
      title: "Audit",
      description: "Identify leaks in your ads & funnel to stop the bleed."
    },
    {
      icon: <Activity className="w-8 h-8 text-secondary-accent" />,
      title: "Diagnose",
      description: "Find root problems in strategy & structure that prevent scaling."
    },
    {
      icon: <Construction className="w-8 h-8 text-primary-accent" />,
      title: "Build",
      description: "Create scalable campaigns & funnels that convert consistently."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-secondary-accent" />,
      title: "Scale",
      description: "Increase revenue with controlled, data-backed systems."
    }
  ];

  return (
    <section className="py-10 bg-background relative overflow-hidden" id="process">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-3xl font-bold mb-6"
          >
            Our 4-Step Growth System
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg max-w-2xl mx-auto"
          >
            A structured approach to turning your marketing into a predictable revenue engine.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 rounded-3xl bg-card-bg border border-card-border hover:border-primary-accent/50 transition-all duration-300 group"
            >
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-background border border-card-border flex items-center justify-center text-xs font-bold text-text-secondary group-hover:bg-primary-accent group-hover:text-background transition-colors">
                0{index + 1}
              </div>
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
