"use client";
import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  ShieldCheck, 
  Search, 
  Zap, 
  TrendingUp, 
  FileText, 
  ArrowRight, 
  Target,
  Activity,
  Layers,
  MousePointer2
} from 'lucide-react';
import MarketingDiagnosisOffer from '@/components/MarketingDiagnosisOffer';
import Link from 'next/link';

const auditRibbons = [
  {
    icon: BarChart3,
    title: "ECONOMIC MODELING",
    subtitle: "CAC & Break-Even Intelligence",
    desc: "We reverse-engineer your true acquisition economics.",
    points: [
      "Actual CAC vs reported CAC",
      "Break-even ROAS modeling",
      "Contribution margin validation",
      "Channel-level profitability mapping",
      "Payback window calculation"
    ],
    footer: "If your numbers are misaligned, scaling is gambling."
  },
  {
    icon: ShieldCheck,
    title: "ATTRIBUTION INTEGRITY",
    subtitle: "Data & Tracking Verification",
    desc: "Most accounts optimize on distorted data.",
    points: [
      "Conversion tracking accuracy",
      "Enhanced Conversions / CAPI implementation",
      "CRM revenue sync",
      "Multi-channel attribution gaps",
      "Over-attribution detection"
    ],
    footer: "No clean data → no intelligent scaling."
  },
  {
    icon: MousePointer2,
    title: "FUNNEL LEAKAGE MAPPING",
    subtitle: "Conversion Architecture Review",
    desc: "Traffic is rarely the core issue.",
    points: [
      "Landing page conversion behavior",
      "Drop-off stages (Lead → SQL → Close)",
      "Qualification friction",
      "Sales response time impact",
      "Offer positioning misalignment"
    ],
    footer: "We identify where profit leaks — not just where clicks drop."
  },
  {
    icon: Layers,
    title: "INTENT & STRUCTURE ANALYSIS",
    subtitle: "Acquisition System Engineering",
    desc: "We break down:",
    points: [
      "Search intent clustering",
      "Broad match dilution",
      "Budget allocation inefficiencies",
      "Audience overlap",
      "Campaign cannibalization"
    ],
    footer: "Most accounts fail at structural level — not creative level."
  },
  {
    icon: Activity,
    title: "CREATIVE & FATIGUE DIAGNOSIS",
    subtitle: "Performance Sustainability Review",
    desc: "We evaluate:",
    points: [
      "Creative rotation system",
      "Frequency thresholds",
      "Message-market alignment",
      "Creative-driven CVR impact",
      "Fatigue risk indicators"
    ],
    footer: "Scaling without creative infrastructure is temporary."
  },
  {
    icon: TrendingUp,
    title: "SCALING CEILING ESTIMATION",
    subtitle: "Capital Expansion Blueprint",
    desc: "We determine:",
    points: [
      "Current growth ceiling",
      "Market saturation risk",
      "Budget expansion tolerance",
      "Geo expansion potential",
      "90-day structured roadmap"
    ],
    footer: "You leave with clarity on: How far you can scale — and at what cost."
  }
];

export default function Audit() {
  return (
    <div className="w-full pt-32 pb-40 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-fit mb-8">
          <Target className="w-4 h-4 text-brand-orange" />
          <span className="text-sm font-medium tracking-wide text-white/80 uppercase">
            Strategic Performance Audit
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
          Capital Clarity <br/><span className="text-gradient-orange">Before Scale.</span>
        </h1>
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-xl text-white/60 leading-relaxed">
            Before scaling paid media, we rebuild economic clarity. This audit is not a surface-level account review. It is a full performance architecture diagnosis designed to identify profit leaks, structural inefficiencies, and scaling ceilings.
          </p>
          <div className="p-6 rounded-2xl bg-brand-orange/5 border border-brand-orange/20 inline-block">
            <p className="text-brand-orange font-bold text-lg">
              Investment: 10–20% of one month’s ad spend.
            </p>
            <p className="text-white/40 text-sm mt-1 italic">
              Because misallocated capital costs more than audit fees.
            </p>
          </div>
        </div>
      </motion.div>

 <section className="py-24">
        <MarketingDiagnosisOffer />
      </section>

      {/* Audit Ribbons */}
      <div className="grid md:grid-cols-2 gap-8 mb-32">
        {auditRibbons.map((ribbon, i) => (
          <motion.div
            key={ribbon.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-orange/30 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <ribbon.icon className="w-32 h-32 text-brand-orange" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center">
                  <ribbon.icon className="w-5 h-5 text-brand-orange" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                  {ribbon.title}
                </h3>
              </div>

              <h4 className="text-2xl font-display font-bold mb-4">{ribbon.subtitle}</h4>
              <p className="text-white/60 text-sm mb-8 leading-relaxed">{ribbon.desc}</p>

              <ul className="space-y-4 mb-8">
                {ribbon.points.map((point, j) => (
                  <li key={j} className="flex gap-3 text-sm text-white/80 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-white/5">
                <p className="text-xs text-brand-orange/60 font-mono italic">
                  {ribbon.footer}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Final Close Block */}
      <section className="mb-32">
        <div className="p-12 md:p-20 rounded-3xl bg-gradient-to-br from-brand-orange/10 to-transparent border border-brand-orange/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <FileText className="w-64 h-64 text-brand-orange" />
          </div>
          
          <div className="max-w-3xl relative z-10">
            <h2 className="text-4xl font-display font-bold mb-8">What You Receive</h2>
            <p className="text-xl text-white/60 mb-12">
              A structured strategic document including:
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {[
                "Full diagnostic breakdown",
                "Economic risk map",
                "Performance inefficiency score",
                "Capital reallocation model",
                "90-day execution blueprint"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-white/5">
                  <ShieldCheck className="w-5 h-5 text-brand-orange shrink-0" />
                  <span className="text-sm font-medium text-white/90">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-black/60 border border-white/10 inline-block">
              <p className="text-lg font-display font-bold text-white mb-1">
                This is consulting-grade documentation.
              </p>
              <p className="text-brand-orange text-sm font-mono uppercase tracking-widest">
                Not a screen recording.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-white/40 font-mono uppercase tracking-[0.2em]">
            This audit is designed for brands already spending at scale.
          </p>
          <p className="text-xs text-white/20 mt-2 italic">
            If you’re not investing serious capital in paid acquisition, this is premature.
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <Link href="/contact" className="btn-premium px-12 py-6 text-xl group">
          Apply for Strategic Audit
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
