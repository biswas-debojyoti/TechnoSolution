import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Target, 
  Layers, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Search,
  UserCheck,
  Layout,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MarketingDiagnosisOffer from '../../components/MarketingDiagnosisOffer';

export default function RandomLeadGen() {
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
              Lead Gen
            </span>
            <span className="text-white/40 text-xs font-mono italic">March 8, 2026 • 8 Min Read</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
            The Problem With <span className="text-gradient-orange">Random Lead Generation</span>
          </h1>
          <p className="text-xl text-white/60 leading-relaxed">
            Many B2B companies rely on scattered tactics that create an unstable pipeline. Discover why predictable growth requires a system, not isolated tactics.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="aspect-video rounded-[40px] overflow-hidden border border-white/10 mb-20 relative group"
        >
          <img 
            src="https://picsum.photos/seed/system/1200/800" 
            alt="Structured Lead Generation System" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </motion.div>

        <div className="space-y-16 text-white/80 leading-relaxed text-lg">
          <section className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-white">The Chaos of Scattered Tactics</h2>
            <p>
              Many B2B companies rely on scattered tactics: cold outreach, occasional ads, inconsistent content, and manual prospecting. This creates an unstable pipeline where some months bring leads and others bring silence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {[
                "Cold outreach without context",
                "Occasional, unoptimized ads",
                "Inconsistent content production",
                "Manual, non-scalable prospecting"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <ShieldCheck className="w-5 h-5 text-brand-orange" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-display font-bold text-white">The Foundation of a Lead Generation System</h2>
            <p>
              A reliable B2B acquisition system connects four layers: <span className="text-brand-orange font-bold">Demand Capture → Authority → Conversion → Nurturing</span>. Each layer turns attention into qualified opportunities.
            </p>
            
            <div className="space-y-8 mt-12">
              {[
                {
                  title: "1. Demand Capture",
                  desc: "Capture existing demand through SEO, Google search ads, and intent-driven keywords. These channels target prospects already searching for solutions.",
                  icon: Search
                },
                {
                  title: "2. Authority Positioning",
                  desc: "Before contacting you, buyers research. Your website should demonstrate expertise, industry specialization, and real results to reduce friction.",
                  icon: UserCheck
                },
                {
                  title: "3. Conversion Infrastructure",
                  desc: "Traffic alone doesn't generate leads. Effective systems include dedicated landing pages, clear value propositions, and simple lead forms.",
                  icon: Layout
                },
                {
                  title: "4. Lead Nurturing",
                  desc: "Most B2B buyers don't convert immediately. Smart companies use email sequences, remarketing, and educational content to stay visible.",
                  icon: Mail
                }
              ].map((layer, i) => (
                <div key={i} className="flex gap-6 p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center">
                    <layer.icon className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">{layer.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{layer.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-white/10 pt-16 space-y-6">
            <h2 className="text-3xl font-display font-bold text-white italic">Final Insight</h2>
            <p className="text-2xl font-display text-white leading-tight">
              Predictable lead generation comes from structured acquisition architecture, not marketing randomness.
            </p>
            <p className="text-brand-orange font-bold uppercase tracking-widest text-sm">
              When the system works, leads become a consistent output, not a monthly surprise.
            </p>
          </section>
        </div>

        <div className="mt-32">
          <MarketingDiagnosisOffer />
        </div>

        <div className="mt-20 p-12 rounded-[40px] animated-border-card border border-white/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-orange/5 blur-[100px] -z-10" />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Want a Predictable B2B Lead Pipeline?</h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto">
            We help companies design structured acquisition systems that generate consistent, qualified leads.
          </p>
          <Link to="/work-with-me" className="btn-premium inline-flex items-center gap-3 px-10 py-5 group">
            Book a Growth Strategy Call <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
