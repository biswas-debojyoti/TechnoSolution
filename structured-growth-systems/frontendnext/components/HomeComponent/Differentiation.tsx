import { motion } from "motion/react";
import { XCircle, CheckCircle2 } from "lucide-react";

export default function Differentiation() {
  const comparisons = [
    { bad: "Random campaigns", good: "Structured scaling frameworks" },
    { bad: "ROAS chasing", good: "Profit-first optimization" },
    { bad: "Guesswork", good: "Data-backed decisions" },
    { bad: "Broken funnels", good: "Conversion-optimized architecture" }
  ];

  return (
    <section className="py-10 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-3xl font-bold mb-6"
          >
            Most Agencies Run Ads. <br />
            <span className="text-primary-accent">We Fix The System Behind Them.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg max-w-2xl mx-auto"
          >
            The difference between guessing and growing is the structure you build.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="text-xs font-bold tracking-widest uppercase text-red-500 mb-4">The Old Way</div>
            {comparisons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-red-500/5 border border-red-500/10"
              >
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <span className="text-text-secondary font-medium">{item.bad}</span>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="text-xs font-bold tracking-widest uppercase text-primary-accent mb-4">The NEXZEN Way</div>
            {comparisons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-primary-accent/5 border border-primary-accent/20"
              >
                <CheckCircle2 className="w-6 h-6 text-primary-accent flex-shrink-0" />
                <span className="text-text-primary font-bold">{item.good}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
