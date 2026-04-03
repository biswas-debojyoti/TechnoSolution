"use client";
import React from 'react';
import { motion } from 'motion/react';
import { Globe, TrendingUp, Shield, Zap, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
// import india from "../assets/india1.png";
// import uk from "../assets/uk.png";
// import usa from "../assets/usa1.png";
import MarketingDiagnosisOffer from '@/components/MarketingDiagnosisOffer';
import Link from 'next/link';
const markets = [
  {
    country: "INDIA",
    flag: "🇮🇳",
    tagline: "Emerging High-Volume, Cost-Sensitive Market",
    characteristics: [
      "Lower CPC but higher lead volatility",
      "Price-sensitive users",
      "High spam / low-intent traffic",
      "Strong Meta performance for demand creation"
    ],
    strategy: [
      "Search intent harvesting for bottom-funnel",
      "Meta volume generation with qualification filters",
      "Strong lead filtering mechanism",
      "WhatsApp + CRM integration critical"
    ],
    risk: "Cheap leads ≠ profitable growth.",
    color: "from-orange-500/20 to-green-500/20"
  },
  {
    country: "UK",
    flag: "🇬🇧",
    tagline: "Mid-Maturity, Regulated, Competitive",
    characteristics: [
      "Higher CPC",
      "Strong compliance sensitivity (health, finance)",
      "Better lead quality vs India",
      "Conversion rates stable if messaging precise"
    ],
    strategy: [
      "Long-tail search clusters",
      "Offer clarity over aggressive creatives",
      "Attribution precision",
      "Margin-controlled bidding"
    ],
    risk: "Overbidding for broad intent destroys contribution margin.",
    color: "from-blue-500/20 to-red-500/20"
  },
  {
    country: "USA",
    flag: "🇺🇸",
    tagline: "High Competition, Creative-Driven Market",
    characteristics: [
      "Expensive CPC",
      "Creative fatigue fast",
      "Aggressive competitor bidding",
      "Strong retargeting economics"
    ],
    strategy: [
      "Creative rotation system mandatory",
      "Strong LTV modeling",
      "Offer differentiation required",
      "Automated bidding only after data stability"
    ],
    risk: "Scaling without LTV visibility burns cash quickly.",
    color: "from-blue-600/20 to-red-600/20"
  }
];

export default function Architecture() {
  return (
    <div className="w-full pt-32 pb-40 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-fit mb-8">
          <Globe className="w-4 h-4 text-brand-orange" />
          <span className="text-sm font-medium tracking-wide text-white/80 uppercase">
            The <span className='text-brand-orange'>NEX</span>Zen Global Performance Architecture™
          </span>
        </div>
        <h1 className="text-3xl md:text-7xl font-display font-bold leading-tight mb-8">
          Premium Cross-Market <br /><span className="text-gradient-orange">Growth Engineering</span>
        </h1>
        <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
          Performance marketing fails when strategy ignores geography. This framework adapts capital deployment logic per market maturity level.
        </p>
      </motion.div>



      {/* LAYER 1: MARKET SPECIFIC */}
      <section className="mb-32">
        <div className="flex items-center gap-4 mb-11">
          <div className="h-px flex-grow bg-white/10" />
          <h2 className="text-xl font-bold uppercase tracking-[0.3em] text-white">Layer 01 — Acquisition Engineering</h2>
          <div className="h-px flex-grow bg-white/10" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {markets.map((market, i) => (
            <motion.div
              key={market.country}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-3xl bg-gradient-to-br ${market.color} border border-white/10 backdrop-blur-sm flex flex-col h-full`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl">{market.flag}</span>
                <h3 className="text-2xl font-display font-bold">{market.country}</h3>
              </div>
              <p className="text-brand-orange font-medium mb-8 text-sm uppercase tracking-wider">{market.tagline}</p>

              <div className="space-y-8 flex-grow">
                <div>
                  <h4 className="text-xs font-bold uppercase text-white/40 mb-4 tracking-widest">Characteristics</h4>
                  <ul className="space-y-3">
                    {market.characteristics.map((c, j) => (
                      <li key={j} className="flex gap-3 text-sm text-white/70">
                        <div className="w-1 h-1 rounded-full bg-white/30 mt-2 shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase text-brand-orange/60 mb-4 tracking-widest">Strategy Bias</h4>
                  <ul className="space-y-3">
                    {market.strategy.map((s, j) => (
                      <li key={j} className="flex gap-3 text-sm text-white/90">
                        <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-black/40 border border-red-500/20 flex gap-3 items-start">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-200/70 italic"><span className="font-bold text-red-400 uppercase not-italic mr-1">Risk:</span> {market.risk}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LAYER 2: ECONOMIC CONTROL */}
      <section className="mb-32 py-10 section-matte rounded-3xl px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xl font-bold uppercase tracking-[0.3em] text-white mb-6">Layer 02 — Economic Control System</h2>
            <h3 className="text-4xl font-display font-bold mb-8">Global Models. Local Tolerance.</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-black/40 border border-white/5 text-left">
                <code className="text-brand-orange block mb-2">Break-even ROAS = 1 / Gross Margin</code>
                <p className="text-sm text-white/40">The fundamental floor for any campaign.</p>
              </div>
              <div className="p-6 rounded-2xl bg-black/40 border border-white/5 text-left">
                <code className="text-brand-orange block mb-2">Target CPA = AOV × GM% × Close Rate</code>
                <p className="text-sm text-white/40">The ceiling for sustainable acquisition.</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h4 className="font-bold text-lg flex items-center gap-2">🇮🇳 India</h4>
              <p className="text-sm text-white/60">Lower CAC tolerance. High volume needed. Cashflow sensitive.</p>
              <ul className="text-xs space-y-2 text-white/40">
                <li>• Fast payback cycles</li>
                <li>• Front-end offer optimization</li>
                <li>• Upsell structure</li>
              </ul>
            </div>
            <div className="space-y-4 border-x border-white/5 px-8">
              <h4 className="font-bold text-lg flex items-center gap-2">🇬🇧 UK</h4>
              <p className="text-sm text-white/60">Stable margins. Moderate CAC tolerance.</p>
              <ul className="text-xs space-y-2 text-white/40">
                <li>• Conversion precision</li>
                <li>• Funnel clarity</li>
                <li>• Conservative scaling</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-lg flex items-center gap-2">🇺🇸 USA</h4>
              <p className="text-sm text-white/60">High CAC tolerance only if LTV validated.</p>
              <ul className="text-xs space-y-2 text-white/40">
                <li>• Subscription / Repeat purchase</li>
                <li>• Backend monetization</li>
                <li>• Advanced attribution</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* LAYER 3: CONVERSION ARCHITECTURE */}
      <section className="mb-32">
        <h2 className="text-xl font-bold uppercase tracking-[0.3em] text-white text-center mb-16">Layer 03 — Conversion Architecture</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              market: "India",
              focus: "Trust-building heavy. Social proof critical. Clear pricing.",
              flow: "Ad → Landing → WhatsApp / Call → Follow-up → Close",
              // icon: india,
            },
            {
              market: "UK",
              focus: "Clarity + compliance. Less aggressive urgency tactics.",
              flow: "Ad → Landing → Form → Consultation → Close",
              // icon: uk ,
            },
            {
              market: "USA",
              focus: "Speed + differentiation. Clear unique mechanism required.",
              flow: "Ad → Offer Page → Checkout / Calendar → Email Nurture",
              icon: "any",
            }
          ].map((item: any, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className='flex justify-between'>

                <h3 className="text-xl font-bold mb-4">{item.market}</h3>
                {item.icon && (
                  <div className="mb-4 relative">
                    <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-40"></div>
                    <img
                      src={item.icon}
                      alt={item.market}
                      className="relative w-12 h-12 rounded-full border-2 border-white"
                    />
                  </div>
                )}
              </div>
              <p className="text-white/60 text-sm mb-8">{item.focus}</p>
              <div className="p-4 rounded-xl bg-black/40 font-mono text-[10px] text-brand-orange leading-loose">
                {item.flow}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SYSTEM ARCHITECTURE DIAGRAM (CSS REPRESENTATION) */}
      <section className="mb-32 py-10 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.05)_0%,transparent_70%)]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4"><span className='text-brand-orange'>NEX</span>Zen Global Performance Architecture™</h2>
            <p className="text-white/40 font-mono text-xs uppercase tracking-widest">System Logic Visualization</p>
          </div>

          <div className="space-y-12">
            {/* Top Layer */}
            <div className="flex justify-center">
              <div className="px-8 py-4 border border-brand-orange bg-black rounded-lg text-sm font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                Market Selection Node
              </div>
            </div>

            {/* Connecting Lines */}
            <div className="flex justify-center gap-32 relative">
              <div className="w-px h-12 bg-gradient-to-b from-brand-orange to-white/20" />
            </div>

            {/* Second Layer */}
            <div className="grid grid-cols-3 gap-8">
              {["India", "UK", "USA"].map(c => (
                <div key={c} className="flex flex-col items-center gap-8">
                  <div className="px-6 py-3 border border-white/20 bg-white/5 rounded-lg text-xs font-bold uppercase tracking-widest w-full text-center shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                    {c}
                  </div>
                  <div className="flex justify-center gap-32 relative">
                    <div className="w-px h-12 bg-gradient-to-b from-brand-orange to-white/20" />
                  </div>                  <div className="p-4 border border-white/10 bg-black/40 rounded-lg text-[15px] font-mono text-white/60 w-full space-y-2">
                    <div className="text-brand-orange font-bold border-b border-white/5 pb-1 mb-2 uppercase">Acquisition</div>
                    <div>→ Search Intent Clusters</div>
                    <div>→ Paid Social Funnel</div>
                    <div>→ Budget Allocation</div>
                  </div>
                  <div className="flex justify-center gap-32 relative">
                    <div className="w-px h-12 bg-gradient-to-b from-brand-orange to-white/20" />
                  </div>                  <div className="p-4 border border-white/10 bg-black/40 rounded-lg text-[15px] font-mono text-white/60 w-full space-y-2">
                    <div className="text-brand-orange font-bold border-b border-white/5 pb-1 mb-2 uppercase">Economic Control</div>
                    <div>→ ROAS Calculation</div>
                    <div>→ Target CPA Model</div>
                    <div>→ Margin Tracking</div>
                  </div>
                  <div className="flex justify-center gap-32 relative">
                    <div className="w-px h-12 bg-gradient-to-b from-brand-orange to-white/20" />
                  </div>                  <div className="p-4 border border-white/10 bg-black/40 rounded-lg text-[15px] font-mono text-white/60 w-full space-y-2">
                    <div className="text-brand-orange font-bold border-b border-white/5 pb-1 mb-2 uppercase">Conversion</div>
                    <div>→ Offer Positioning</div>
                    <div>→ Funnel Design</div>
                    <div>→ Qualification Filters</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <div className="mt-32 text-center">
        <Link href="/contact" className="btn-premium px-12 py-6 text-xl group">
          Deploy This Architecture
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
