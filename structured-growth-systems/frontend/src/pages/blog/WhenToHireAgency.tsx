import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Users, 
  TrendingUp, 
  BarChart3, 
  Zap, 
  ArrowRight,
  Clock,
  UserPlus,
  Target,
  Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MarketingDiagnosisOffer from '../../components/MarketingDiagnosisOffer';

export default function WhenToHireAgency() {
  return (
    <div className="w-full pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-white/40 hover:text-brand-orange transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Journal
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 mb-16"
        >
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-[10px] font-bold text-brand-orange uppercase tracking-widest">
              Strategy
            </span>
            <span className="text-white/40 text-xs font-mono italic">March 8, 2026 • 8 Min Read</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
            When Should a Business <span className="text-gradient-orange">Hire a Marketing Agency?</span>
          </h1>
          <p className="text-xl text-white/60 leading-relaxed">
            Hiring a marketing agency can accelerate growth, but timing matters. Here are the signs your business is ready for external marketing expertise.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="aspect-video rounded-[40px] overflow-hidden border border-white/10 mb-20 relative group"
        >
          <img 
            src="https://picsum.photos/seed/agency/1200/800" 
            alt="Hiring a Marketing Agency" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </motion.div>

        <div className="space-y-16 text-white/80 leading-relaxed text-lg">
          <section className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-white">The Decision Many Companies Delay</h2>
            <p>
              Businesses often try to manage marketing internally for too long. This works in the early stages, but as growth ambitions increase, internal teams may lack the specialized expertise required to scale acquisition.
            </p>
          </section>

          <section className="space-y-10">
            <h2 className="text-3xl font-display font-bold text-white">Signs It's Time to Hire an Agency</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "1. Lead Generation Is Inconsistent",
                  desc: "If your pipeline depends on occasional campaigns or referrals, growth becomes unpredictable. An agency can build structured acquisition systems.",
                  icon: BarChart3
                },
                {
                  title: "2. Your Marketing Team Is Overloaded",
                  desc: "Internal teams often manage multiple responsibilities. Specialized agencies bring focused expertise across paid acquisition, SEO, and analytics.",
                  icon: UserPlus
                },
                {
                  title: "3. Customer Acquisition Costs Are Rising",
                  desc: "When CAC increases but results stagnate, the issue usually lies in campaign structure. External experts can identify inefficiencies quickly.",
                  icon: TrendingUp
                },
                {
                  title: "4. Growth Has Stalled",
                  desc: "Many companies reach a plateau. A strategic marketing partner helps unlock new growth channels and opportunities.",
                  icon: Rocket
                }
              ].map((sign, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
                  <sign.icon className="w-8 h-8 text-brand-orange mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-4">{sign.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{sign.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-white/10 pt-16 space-y-6">
            <h2 className="text-3xl font-display font-bold text-white italic">Final Insight</h2>
            <p className="text-2xl font-display text-white leading-tight">
              The right time to hire a marketing agency is when growth requires structured expertise and scalable acquisition systems.
            </p>
          </section>
        </div>

        <div className="mt-32">
          <MarketingDiagnosisOffer />
        </div>

        <div className="mt-20 p-12 rounded-[40px] animated-border-card border border-white/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-orange/5 blur-[100px] -z-10" />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to Scale Your Acquisition?</h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto">
            If your business is ready to scale customer acquisition, external expertise can accelerate the process and build the systems you need.
          </p>
          <Link to="/work-with-me" className="btn-premium inline-flex items-center gap-3 px-10 py-5 group">
            Book a Growth Strategy Call <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
