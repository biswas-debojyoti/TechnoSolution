import { motion } from "motion/react";
import { AlertTriangle, XCircle, TrendingDown } from "lucide-react";

export default function Problem() {
  const problems = [
    {
      icon: <AlertTriangle className="w-8 h-8 text-primary-accent" />,
      title: "Broken Systems",
      description: "Scaling doesn't break when ads stop working. It breaks when your system is flawed."
    },
    {
      icon: <TrendingDown className="w-8 h-8 text-red-500" />,
      title: "Weak Structure",
      description: "If your structure is weak → more budget = more loss. Don't pour fuel on a broken engine."
    },
    {
      icon: <XCircle className="w-8 h-8 text-text-secondary" />,
      title: "Random Campaigns",
      description: "Most brands fail because they chase ROAS without a structured growth framework."
    }
  ];

  return (
    <section className="py-10 bg-card-bg/30 border-y border-card-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Most Brands Don't Fail Because of Ads. <br />
            <span className="text-primary-accent">They Fail Because of Broken Systems.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg max-w-2xl mx-auto"
          >
            Stop chasing the next "hack" and start building a predictable growth engine.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-background border border-card-border hover:border-primary-accent/50 transition-colors group"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                {problem.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{problem.title}</h3>
              <p className="text-text-secondary leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
