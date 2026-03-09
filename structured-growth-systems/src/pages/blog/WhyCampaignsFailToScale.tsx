import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  TrendingUp, 
  AlertCircle, 
  BarChart3, 
  Layout, 
  ArrowRight, 
  Zap,
  Target,
  MousePointer2,
  Database
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MarketingDiagnosisOffer from '../../components/MarketingDiagnosisOffer';

export default function WhyCampaignsFailToScale() {
  return (
    <div className="w-full pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-white/40 hover:text-brand-orange transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Journal
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 mb-16"
        >
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-[10px] font-bold text-brand-orange uppercase tracking-widest">
              Performance
            </span>
            <span className="text-white/40 text-xs font-mono italic">March 8, 2026 • 10 Min Read</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
            Why Most Marketing Agencies <span className="text-gradient-orange">Fail to Scale</span> Campaigns
          </h1>
          <p className="text-xl text-white/60 leading-relaxed">
            Many marketing campaigns perform well initially but fail when budgets increase. Discover the structural issues that prevent agencies from scaling campaigns successfully.
          </p>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="aspect-video rounded-[40px] overflow-hidden border border-white/10 mb-20 relative group"
        >
          <img 
            src="https://picsum.photos/seed/scale/1200/800" 
            alt="Scaling Marketing Campaigns Challenges" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </motion.div>

        {/* Content */}
        <div className="space-y-16 text-white/80 leading-relaxed text-lg">
          <section className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-white">The Scaling Myth</h2>
            <p>
              Most agencies believe scaling is simple: Increase budget → get more results. But this assumption breaks quickly. Campaigns that work at $50/day often collapse at $500/day.
            </p>
            <p>
              Why? Because scaling exposes <span className="text-white font-bold">structural weaknesses</span> inside the campaign architecture.
            </p>
          </section>

          <section className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
            <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-brand-orange" />
              The Real Definition of Scaling
            </h2>
            <p>
              Scaling isn't about spending more. Scaling means: <span className="text-brand-orange font-bold">Increasing volume while maintaining efficiency.</span>
            </p>
            <p className="text-white/60">
              If your cost per acquisition rises drastically as budget increases, the campaign was never truly scalable.
            </p>
          </section>

          <section className="space-y-10">
            <h2 className="text-3xl font-display font-bold text-white">The 4 Structural Problems That Kill Scaling</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Weak Audience Intent",
                  desc: "At small budgets, broad targeting sometimes works. But as budgets increase, ads reach less relevant users, and conversion rates collapse. Strong campaigns focus on high purchase-intent segments.",
                  icon: Target
                },
                {
                  title: "Poor Landing Page Infrastructure",
                  desc: "Traffic scaling without conversion optimization leads to failure. More traffic simply amplifies weaknesses like generic pages, slow speeds, or weak CTAs.",
                  icon: Layout
                },
                {
                  title: "No Data Feedback Loop",
                  desc: "Scaling requires conversion intelligence. Without proper tracking, algorithms optimize for clicks instead of customers, leading to low-quality leads and guesswork.",
                  icon: Database
                },
                {
                  title: "Lack of Campaign Structure",
                  desc: "Chaotic accounts with mixed keywords and poor segmentation become expensive as budgets grow. Structured accounts scale; disorganized ones break.",
                  icon: AlertCircle
                }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
                  <item.icon className="w-8 h-8 text-brand-orange mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-display font-bold text-white">What Scalable Campaigns Actually Look Like</h2>
            <div className="relative p-12 rounded-[40px] bg-white/5 border border-white/10 overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Zap className="w-32 h-32 text-brand-orange" />
              </div>
              <div className="space-y-6 relative z-10">
                <p className="text-xl font-medium text-white">High-performing campaigns follow a system:</p>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-mono text-sm">Intent Targeting</span>
                  <ArrowRight className="w-4 h-4 text-white/20" />
                  <span className="px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-mono text-sm">Optimized Landing Page</span>
                  <ArrowRight className="w-4 h-4 text-white/20" />
                  <span className="px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-mono text-sm">Conversion Tracking</span>
                  <ArrowRight className="w-4 h-4 text-white/20" />
                  <span className="px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-mono text-sm">Continuous Optimization</span>
                </div>
                <p className="text-white/60">
                  Each element supports the next, creating an environment where increasing budget produces predictable results.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-white">The Scaling Reality</h2>
            <p>
              Most campaigns fail not because the platform is bad. They fail because the acquisition system behind the ads is weak. When the structure is correct, scaling becomes far easier.
            </p>
          </section>

          <section className="border-t border-white/10 pt-16 space-y-6">
            <h2 className="text-3xl font-display font-bold text-white italic">Final Insight</h2>
            <p className="text-2xl font-display text-white leading-tight">
              Campaign success isn't measured at small budgets. The real test is whether the system can handle growth without losing efficiency.
            </p>
            <p className="text-brand-orange font-bold uppercase tracking-widest text-sm">
              Scaling reveals whether a campaign is truly engineered for performance.
            </p>
          </section>
        </div>

        {/* Lead Magnet */}
        <div className="mt-32">
          <MarketingDiagnosisOffer />
        </div>

        {/* Final CTA */}
        <div className="mt-20 p-12 rounded-[40px] animated-border-card border border-white/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-orange/5 blur-[100px] -z-10" />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Struggling to Scale Your Campaigns?</h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto">
            If your campaigns generate results at small budgets but collapse when you try to scale, the issue is usually structural architecture — not the platform.
          </p>
          <Link to="/work-with-me" className="btn-premium inline-flex items-center gap-3 px-10 py-5 group">
            Book a Growth Strategy Call <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
