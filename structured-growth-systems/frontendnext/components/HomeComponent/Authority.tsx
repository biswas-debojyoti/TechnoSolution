import { motion } from "motion/react";
import { CheckCircle2, Globe, Award, TrendingUp, Users } from "lucide-react";

export default function Authority() {
  const stats = [
    { icon: <TrendingUp className="w-6 h-6 text-primary-accent" />, value: "$500K+", label: "Ad Spend Managed" },
    { icon: <Award className="w-6 h-6 text-secondary-accent" />, value: "7+ Years", label: "Performance Marketing" },
    { icon: <Globe className="w-6 h-6 text-primary-accent" />, value: "Multi-Market", label: "India | UK | USA" },
    { icon: <Users className="w-6 h-6 text-secondary-accent" />, value: "10,000+", label: "Leads Generated" }
  ];

  return (
    <section className="py-10 bg-card-bg/30 border-y border-card-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-accent/10 border border-primary-accent/20 text-primary-accent text-[10px] font-bold tracking-widest uppercase mb-6">
              Execution First. Authority Earned.
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
              We Don't Just Talk. <br />
              <span className="text-primary-accent">We Deliver Results.</span>
            </h2>
            <p className="text-lg text-text-secondary mb-12 max-w-xl">
              With over 7 years of experience in performance marketing and $500K+ in ad spend managed, we have the authority to scale your brand profitably.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-card-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-accent/10 flex items-center justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-black text-text-primary mb-1">{stat.value}</div>
                  <div className="text-xs font-bold tracking-widest uppercase text-text-secondary">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 p-12 rounded-[40px] bg-background border border-card-border shadow-2xl">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-16 rounded-full bg-primary-accent/20 flex items-center justify-center text-primary-accent font-black text-2xl">GS</div>
                <div>
                  <div className="text-lg font-bold">Google Ads Specialist</div>
                  <div className="text-xs text-text-secondary">Systems Architecture Expert</div>
                </div>
              </div>
              
              <div className="space-y-6">
                {[
                  "Multi-Market Scaling Experience",
                  "7+ Years in Performance Marketing",
                  "10,000+ Leads Generated",
                  "Google Ads Systems Specialist"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <CheckCircle2 className="w-5 h-5 text-primary-accent flex-shrink-0" />
                    <span className="text-sm font-medium text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 rounded-2xl bg-primary-accent/5 border border-primary-accent/10">
                <p className="text-sm text-text-secondary italic leading-relaxed">
                  "Most agencies run ads. We fix the system behind them. That's the difference between guessing and growing."
                </p>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-accent/20 blur-[80px] rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary-accent/20 blur-[80px] rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
