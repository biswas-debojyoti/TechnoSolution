import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  TrendingDown, 
  Target, 
  BarChart3, 
  Zap, 
  ArrowRight,
  Search,
  Layout,
  MousePointer2,
  RefreshCw,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MarketingDiagnosisOffer from '../../components/MarketingDiagnosisOffer';

export default function GoogleAdsROIMistakes() {
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
              Performance
            </span>
            <span className="text-white/40 text-xs font-mono italic">March 8, 2026 • 9 Min Read</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
            The 5 Biggest Mistakes That <span className="text-gradient-orange">Kill Google Ads ROI</span>
          </h1>
          <p className="text-xl text-white/60 leading-relaxed">
            Many Google Ads campaigns waste budget due to structural mistakes. Here are the five most common issues that reduce advertising ROI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="aspect-video rounded-[40px] overflow-hidden border border-white/10 mb-20 relative group"
        >
          <img 
            src="https://picsum.photos/seed/roi/1200/800" 
            alt="Google Ads ROI Optimization" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </motion.div>

        <div className="space-y-16 text-white/80 leading-relaxed text-lg">
          <section className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-white">Why Many Campaigns Waste Budget</h2>
            <p>
              Google Ads can generate powerful results. But poorly structured campaigns quickly turn into budget drains. High ROI campaigns are not accidental; they are the result of structured testing and ongoing optimization.
            </p>
          </section>

          <section className="space-y-12">
            <h2 className="text-3xl font-display font-bold text-white">The 5 ROI Killers</h2>
            <div className="grid grid-cols-1 gap-8">
              {[
                {
                  title: "1. Targeting Broad Keywords",
                  desc: "Broad keywords generate traffic but often attract low purchase intent users. High-performing campaigns focus on specific, solution-driven searches.",
                  icon: Search
                },
                {
                  title: "2. Sending Traffic to the Homepage",
                  desc: "A homepage tries to serve many purposes. Ads require dedicated landing pages designed for one specific conversion action.",
                  icon: Layout
                },
                {
                  title: "3. Ignoring Search Intent",
                  desc: "Successful campaigns align ad messaging with what the user is searching for. Mismatch between intent and offer reduces conversion rates.",
                  icon: Target
                },
                {
                  title: "4. Weak Ad Copy",
                  desc: "Generic ads blend into the search results. Effective ads highlight specific benefits, differentiation, and clear outcomes.",
                  icon: MessageSquare
                },
                {
                  title: "5. No Continuous Optimization",
                  desc: "Google Ads requires constant improvement. Successful advertisers regularly refine keywords, adjust bids, and test ad variations.",
                  icon: RefreshCw
                }
              ].map((mistake, i) => (
                <div key={i} className="flex gap-8 p-10 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center group-hover:rotate-6 transition-transform">
                    <mistake.icon className="w-7 h-7 text-brand-orange" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">{mistake.title}</h3>
                    <p className="text-white/60 leading-relaxed">{mistake.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-white/10 pt-16 space-y-6">
            <h2 className="text-3xl font-display font-bold text-white italic">Final Insight</h2>
            <p className="text-2xl font-display text-white leading-tight">
              High ROI campaigns are not accidental. They are the result of structured testing, data analysis, and ongoing optimization.
            </p>
          </section>
        </div>

        <div className="mt-32">
          <MarketingDiagnosisOffer />
        </div>

        <div className="mt-20 p-12 rounded-[40px] animated-border-card border border-white/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-orange/5 blur-[100px] -z-10" />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Not Delivering the ROI You Expected?</h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto">
            If your campaigns aren't delivering the ROI you expected, the issue may lie in campaign architecture. Let's find the leaks together.
          </p>
          <Link to="/work-with-me" className="btn-premium inline-flex items-center gap-3 px-10 py-5 group">
            Book a Growth Strategy Call <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
