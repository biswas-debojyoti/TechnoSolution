import { motion } from "motion/react";
import { Search, ShoppingCart, Target, Layers, BarChart3, Globe } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Search className="w-6 h-6 text-primary-accent" />,
      title: "Google Ads Management",
      description: "Specialized lead generation systems for high-intent traffic."
    },
    {
      icon: <ShoppingCart className="w-6 h-6 text-secondary-accent" />,
      title: "Meta Ads Scaling",
      description: "E-commerce growth frameworks for massive scale."
    },
    {
      icon: <Target className="w-6 h-6 text-primary-accent" />,
      title: "Conversion Optimization (CRO)",
      description: "Maximizing every click for maximum profit."
    },
    {
      icon: <Layers className="w-6 h-6 text-secondary-accent" />,
      title: "Funnel Design & Automation",
      description: "Structured paths from awareness to conversion."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-primary-accent" />,
      title: "Marketing Analytics (GA4)",
      description: "Data-backed decisions with custom tracking systems."
    },
    {
      icon: <Globe className="w-6 h-6 text-secondary-accent" />,
      title: "Global Market Domination",
      description: "Serving clients globally: India, UK, USA."
    }
  ];

  return (
    <section className="py-10 bg-card-bg/30 border-y border-card-border" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Performance Marketing Services <br />
            <span className="text-primary-accent">We Specialize In</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg max-w-2xl mx-auto"
          >
            We build growth engines that scale profitably across multiple markets.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-background border border-card-border hover:border-primary-accent/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-card-bg border border-card-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
