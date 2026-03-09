import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  MousePointer2, 
  Target, 
  BarChart3, 
  Zap, 
  ArrowRight,
  Search,
  Layout,
  Database,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MarketingDiagnosisOffer from '../../components/MarketingDiagnosisOffer';

export default function GoogleAdsClicksNoCustomers() {
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
            <span className="text-white/40 text-xs font-mono italic">March 8, 2026 • 7 Min Read</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
            Why Your Google Ads Campaign Is Generating <span className="text-gradient-orange">Clicks But No Customers</span>
          </h1>
          <p className="text-xl text-white/60 leading-relaxed">
            If your Google Ads campaigns generate traffic but not customers, the issue is usually structural. Learn the key reasons campaigns fail to convert.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="aspect-video rounded-[40px] overflow-hidden border border-white/10 mb-20 relative group"
        >
          <img 
            src="https://picsum.photos/seed/clicks/1200/800" 
            alt="Google Ads Conversion Optimization" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </motion.div>

        <div className="space-y-16 text-white/80 leading-relaxed text-lg">
          <section className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-white">The Click Trap</h2>
            <p>
              Many businesses celebrate high click numbers. But clicks are meaningless if they don't produce customers. A campaign that generates traffic without conversions is simply expensive visibility.
            </p>
            <div className="p-8 rounded-3xl bg-brand-orange/5 border border-brand-orange/20 flex items-start gap-6">
              <AlertCircle className="w-8 h-8 text-brand-orange flex-shrink-0" />
              <p className="text-white italic">
                "Traffic is a commodity. Conversion is the strategy."
              </p>
            </div>
          </section>

          <section className="space-y-10">
            <h2 className="text-3xl font-display font-bold text-white">The 3 Common Reasons Campaigns Fail</h2>
            <div className="space-y-8">
              {[
                {
                  title: "1. Weak Keyword Intent",
                  desc: "Not all search traffic is equal. Keywords with vague intent attract visitors who are researching, not buying. Focus on queries showing clear purchase intent.",
                  icon: Search
                },
                {
                  title: "2. Poor Landing Page Experience",
                  desc: "Sending paid traffic to generic pages reduces conversions. Effective landing pages should include a clear problem statement, specific value proposition, and proof of results.",
                  icon: Layout
                },
                {
                  title: "3. Missing Conversion Tracking",
                  desc: "Without accurate tracking, optimization becomes guesswork. Algorithms focus on clicks, not revenue, leading to low-quality leads.",
                  icon: Database
                }
              ].map((reason, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
                  <reason.icon className="w-8 h-8 text-brand-orange mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-4">{reason.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-white/10 pt-16 space-y-6">
            <h2 className="text-3xl font-display font-bold text-white italic">Final Insight</h2>
            <p className="text-2xl font-display text-white leading-tight">
              Clicks are easy to buy. Customers require structured acquisition design.
            </p>
            <p className="text-brand-orange font-bold uppercase tracking-widest text-sm">
              Without the right infrastructure, ad spend simply amplifies inefficiency.
            </p>
          </section>
        </div>

        <div className="mt-32">
          <MarketingDiagnosisOffer />
        </div>

        <div className="mt-20 p-12 rounded-[40px] animated-border-card border border-white/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-orange/5 blur-[100px] -z-10" />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Generating Clicks But No Customers?</h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto">
            If your campaigns generate traffic but not customers, the problem is usually system architecture. We can help you fix the leak.
          </p>
          <Link to="/work-with-me" className="btn-premium inline-flex items-center gap-3 px-10 py-5 group">
            Book a Growth Strategy Call <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
