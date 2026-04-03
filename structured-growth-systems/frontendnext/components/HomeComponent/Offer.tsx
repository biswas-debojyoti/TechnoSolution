import { motion } from "motion/react";
import { CheckCircle2, Users, ShieldCheck, MessageSquare, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function Offer() {
  const features = [
    { icon: <ShieldCheck className="w-5 h-5 text-primary-accent" />, text: "Ad Account Audit" },
    { icon: <LayoutDashboard className="w-5 h-5 text-primary-accent" />, text: "Strategy Diagnosis" },
    { icon: <Users className="w-5 h-5 text-primary-accent" />, text: "Weekly Live Guidance" },
    { icon: <MessageSquare className="w-5 h-5 text-primary-accent" />, text: "Private Community" },
    { icon: <CheckCircle2 className="w-5 h-5 text-primary-accent" />, text: "1:1 Support Access" }
  ];

  return (
    <section className="py-10 bg-card-bg relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,106,0,0.1)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto p-12 rounded-[40px] bg-background border border-primary-accent/30 shadow-2xl shadow-primary-accent/10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-accent/10 border border-primary-accent/20 text-primary-accent text-[10px] font-bold tracking-widest uppercase mb-6">
                Limited Time Offer
              </div>
              <h2 className="text-4xl md:text-3xl font-extrabold mb-6 leading-tight">
                Fix Your Ads. <br />
                <span className="text-primary-accent">Scale Your Agency.</span>
              </h2>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Join our Growth System and stop wasting ad spend. Start scaling smart with structured frameworks and 1:1 support.
              </p>
              
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-3xl font-black text-primary-accent">$20</span>
                <span className="text-text-secondary font-bold">/ month</span>
              </div>
             <Link href="/contact" className="w-full">
              <button className="w-full py-5 bg-primary-accent text-background font-black rounded-2xl hover:scale-105 transition-transform shadow-xl shadow-primary-accent/20">
                JOIN GROWTH SYSTEM NOW
              </button>
             </Link>
            </div>

            <div className="space-y-6">
              <div className="text-xs font-bold tracking-widest uppercase text-text-secondary mb-4">What's Included:</div>
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-card-bg border border-card-border"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-accent/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <span className="font-bold text-sm">{feature.text}</span>
                </motion.div>
              ))}
              
              <div className="pt-6 border-t border-card-border">
                <p className="text-xs text-text-secondary italic">
                  "Stop wasting ad spend. Start scaling smart."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
