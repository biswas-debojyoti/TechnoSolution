import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Layers, 
  Target, 
  ShieldCheck, 
  RefreshCw, 
  ArrowRight, 
  CheckCircle2, 
  Cpu,
  Search,
  Users,
  MousePointer2,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MarketingDiagnosisOffer from '../../components/MarketingDiagnosisOffer';

export default function B2BLeadGenSystems() {
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
              Lead Generation
            </span>
            <span className="text-white/40 text-xs font-mono italic">March 8, 2026 • 15 Min Read</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
            The 2026 Guide to <span className="text-gradient-orange">B2B Lead Generation Systems</span>
          </h1>
          <p className="text-xl text-white/60 leading-relaxed">
            A system replaces random lead hunting with predictable demand capture. Instead of chasing prospects, businesses build infrastructure that attracts them continuously.
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
            src="https://picsum.photos/seed/system/1200/800" 
            alt="B2B Lead Generation System Infrastructure" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </motion.div>

        {/* Content */}
        <div className="space-y-16 text-white/80 leading-relaxed text-lg">
          <section className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-white">What a B2B Lead Generation System Actually Means</h2>
            <p>
              A modern B2B acquisition system is not a single tactic. It is a repeatable pipeline created by the integration of several key elements:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {[
                { icon: Search, label: "Search demand capture (SEO)" },
                { icon: Target, label: "Paid acquisition channels" },
                { icon: MousePointer2, label: "Conversion-optimized landing pages" },
                { icon: ShieldCheck, label: "Lead qualification workflows" },
                { icon: Mail, label: "CRM-driven nurturing" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <item.icon className="w-5 h-5 text-brand-orange" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-10">
            <h2 className="text-3xl font-display font-bold text-white">The 4 Layers of Modern B2B Acquisition</h2>
            <div className="space-y-12">
              {[
                {
                  num: "01",
                  title: "Demand Capture",
                  desc: "Capture buyers already searching for solutions. These prospects have high purchase intent because they are actively looking for 'B2B lead generation agency' or 'enterprise marketing automation solution'.",
                  icon: Search
                },
                {
                  num: "02",
                  title: "Authority Positioning",
                  desc: "Before contacting you, B2B buyers research. Your digital presence—content, case studies, and insights—must communicate expertise and proof of results to build trust.",
                  icon: ShieldCheck
                },
                {
                  num: "03",
                  title: "Conversion Infrastructure",
                  desc: "Traffic alone doesn't generate leads. High-performing companies use dedicated landing pages, lead magnets, and simple contact flows to turn attention into qualified conversations.",
                  icon: MousePointer2
                },
                {
                  num: "04",
                  title: "Lead Nurturing",
                  desc: "B2B sales cycles are longer. Effective systems include email sequences and remarketing to keep your company top-of-mind until the buyer is ready.",
                  icon: RefreshCw
                }
              ].map((layer, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="text-5xl font-display font-bold text-white/10 group-hover:text-brand-orange/20 transition-colors shrink-0">
                    {layer.num}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                      <layer.icon className="w-6 h-6 text-brand-orange" />
                      {layer.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed">{layer.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="p-12 rounded-[40px] bg-red-500/5 border border-red-500/20">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Why Most B2B Lead Generation Fails</h2>
            <p className="mb-6">
              The biggest mistake is focusing only on traffic generation. Without structure, traffic produces:
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-white/60">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Low-quality leads that waste sales time
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Wasted marketing budget on unoptimized channels
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Inconsistent pipeline growth
              </li>
            </ul>
            <p className="italic text-white/40">
              Successful companies focus on acquisition architecture, not isolated tactics.
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-display font-bold text-white">What Predictable Lead Flow Looks Like</h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-8 rounded-3xl bg-white/5 border border-white/10">
              <div className="text-center px-4">
                <div className="text-brand-orange font-bold text-2xl mb-1">Traffic</div>
                <div className="text-xs text-white/40 uppercase tracking-widest">Attention</div>
              </div>
              <ArrowRight className="w-6 h-6 text-white/20 hidden md:block" />
              <div className="text-center px-4">
                <div className="text-brand-orange font-bold text-2xl mb-1">Leads</div>
                <div className="text-xs text-white/40 uppercase tracking-widest">Interest</div>
              </div>
              <ArrowRight className="w-6 h-6 text-white/20 hidden md:block" />
              <div className="text-center px-4">
                <div className="text-brand-orange font-bold text-2xl mb-1">Opportunities</div>
                <div className="text-xs text-white/40 uppercase tracking-widest">Qualified</div>
              </div>
              <ArrowRight className="w-6 h-6 text-white/20 hidden md:block" />
              <div className="text-center px-4">
                <div className="text-brand-orange font-bold text-2xl mb-1">Clients</div>
                <div className="text-xs text-white/40 uppercase tracking-widest">Revenue</div>
              </div>
            </div>
            <p>
              This measurable flow allows companies to forecast revenue, optimize acquisition cost, and scale marketing investments confidently.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-white">The Future of B2B Lead Generation</h2>
            <p>
              The 2026 landscape is moving toward <span className="text-white">AI-assisted search discovery</span>, <span className="text-white">intent-driven marketing</span>, and <span className="text-white">highly targeted acquisition funnels</span>.
            </p>
            <p>
              Companies that build structured acquisition systems today will dominate future demand.
            </p>
          </section>

          <section className="border-t border-white/10 pt-16 space-y-6">
            <h2 className="text-3xl font-display font-bold text-white">Final Insight</h2>
            <p>
              The goal is not to generate more leads. The goal is to build a <span className="text-brand-orange font-bold">reliable pipeline of qualified buyers</span>.
            </p>
            <p>
              When the system is built correctly, leads stop being unpredictable. They become a predictable output of your growth infrastructure.
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
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Want to Build a Predictable B2B Lead Generation System?</h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto">
            If your company relies on inconsistent outreach or expensive ads without a clear acquisition structure, the issue is rarely traffic. The issue is system design.
          </p>
          <Link to="/work-with-me" className="btn-premium inline-flex items-center gap-3 px-10 py-5 group">
            Book a Growth Strategy Call <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
