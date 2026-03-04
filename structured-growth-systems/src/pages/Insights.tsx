import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, TrendingDown, Target, Zap, BarChart3, ShieldCheck, Clock, Users, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const insights = [
  {
    id: "uk-clinic",
    title: "UK Clinic: CAC Reduced from £320 → £88",
    market: "UK",
    context: "Private health clinic – London. Monthly spend: £25,000. Google Search primary channel.",
    problem: {
      points: [
        "70% spend on broad match",
        "No brand isolation",
        "No CRM revenue sync",
        "Slow follow-up (12–24 hrs)"
      ],
      data: "Reported CAC: £320. Profit margin collapsing. Traffic volume high, patient conversion weak."
    },
    changes: [
      "Removed majority broad match",
      "Built long-tail exact clusters",
      "Separated brand campaigns",
      "Implemented 5-minute callback SLA",
      "Imported offline revenue data"
    ],
    results: {
      metrics: [
        { label: "CPC", before: "£7.40", after: "£5.10" },
        { label: "Conversion Rate", before: "4.2%", after: "10.8%" },
        { label: "CPL", before: "£176", after: "£47" },
        { label: "Lead → Patient", before: "30%", after: "53%" }
      ],
      final: "Effective CAC: £320 → £88"
    },
    lesson: "In regulated UK markets, intent precision + speed of response can collapse acquisition cost dramatically."
  },
  {
    id: "india-saas",
    title: "India B2B SaaS: CAC Cut from ₹95,000 → ₹32,000",
    market: "India",
    context: "Indian SaaS. ACV: ₹80,000. Monthly spend: ₹8L. LinkedIn heavy dependency.",
    problem: {
      points: [
        "Optimized only for low CPL",
        "No SQL filtering",
        "No intent-based search capture",
        "Sales qualifying unfit leads"
      ],
      data: "CPL: ₹1,300 | SQL Rate: 11% | Close Rate: 10%. CAC: ₹118,000 (Blended ≈ ₹95,000). Unprofitable."
    },
    changes: [
      "Reduced LinkedIn by 45%",
      "Added high-intent Google Search",
      "Added budget + timeline filters",
      "Retargeted demo visitors",
      "CRM integration for SQL tracking"
    ],
    results: {
      metrics: [
        { label: "CPL", before: "₹1,300", after: "₹2,100" },
        { label: "SQL Rate", before: "11%", after: "26%" },
        { label: "Close Rate", before: "10%", after: "19%" }
      ],
      final: "New CAC: ₹95,000 → ₹32,000"
    },
    lesson: "In India B2B, lead filtering and search intent reduce CAC more than chasing cheap clicks."
  },
  {
    id: "us-ecommerce",
    title: "US E-Commerce: CPA Reduced from $72 → $24",
    market: "USA",
    context: "US DTC brand. Meta primary channel. Revenue plateau at $110K/month.",
    problem: {
      points: [
        "Mixed cold + retargeting budgets",
        "No creative rotation system",
        "No AOV optimization",
        "Scaling too aggressively"
      ],
      data: "CPC: $1.95 | Conv Rate: 2.7% | CPA: $72. Break-even CPA: $48. Burning margin."
    },
    changes: [
      "Split cold & retargeting campaigns",
      "Launched 12 new creatives in 30 days",
      "Introduced bundle offer (+22% AOV)",
      "Implemented cost-cap aligned with margin",
      "Scaled in 15% increments"
    ],
    results: {
      metrics: [
        { label: "CPC", before: "$1.95", after: "$1.40" },
        { label: "Conversion Rate", before: "2.7%", after: "5.8%" },
        { label: "CPA", before: "$72", after: "$24" }
      ],
      final: "CPA: $72 → $24 | Revenue: $110K → $210K+"
    },
    lesson: "In the US, creative expansion + AOV engineering can unlock massive CPA compression."
  },
  {
    id: "india-real-estate",
    title: "India Real Estate: Booking Cost Reduced from ₹2.1L → ₹65K",
    market: "India",
    context: "Luxury residential project – Gurgaon. Meta lead generation heavy.",
    problem: {
      points: [
        "Cheap CPL focus (₹480)",
        "No income qualification",
        "No site-visit screening",
        "No search intent capture"
      ],
      data: "CPL: ₹520 | Site Visit Rate: 8% | Booking Rate: 1.9%. Effective Booking Cost ≈ ₹2.1L."
    },
    changes: [
      "Added mandatory budget filter",
      "Added possession timeline filter",
      "Shifted 35% spend to high-intent search",
      "Dedicated follow-up team",
      "Manual lead scoring"
    ],
    results: {
      metrics: [
        { label: "CPL", before: "₹520", after: "₹1,350" },
        { label: "Site Visit Rate", before: "8%", after: "26%" },
        { label: "Booking Rate", before: "1.9%", after: "5.8%" }
      ],
      final: "Booking Cost: ₹2.1L → ₹65K"
    },
    lesson: "In Indian real estate, higher CPL with strict qualification reduces booking cost dramatically."
  }
];

export default function Insights() {
  return (
    <div className="w-full pt-32 pb-40 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-fit mb-8">
          <Zap className="w-4 h-4 text-brand-orange" />
          <span className="text-sm font-medium tracking-wide text-white/80 uppercase">
            Performance Insights & Case Studies
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
          Strategic <span className="text-gradient-orange">Market Intelligence</span>
        </h1>
        <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
          Raw data from the front lines of global performance marketing. Real problems. Real economics. Real results.
        </p>
      </motion.div>

      <div className="space-y-32">
        {insights.map((insight, i) => (
          <motion.section 
            key={insight.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-md bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest border border-brand-orange/20">
                    {insight.market}
                  </span>
                  <span className="text-white/40 text-sm font-mono">Insight 0{i + 1}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">{insight.title}</h2>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
              {/* Left Column: Context & Problem */}
              <div className="lg:col-span-7 space-y-12">
                <div>
                  <h3 className="text-xs font-bold uppercase text-white/40 mb-6 tracking-widest flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" /> Context
                  </h3>
                  <p className="text-lg text-white/80 leading-relaxed">{insight.context}</p>
                </div>

                <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/10">
                  <h3 className="text-xs font-bold uppercase text-red-400 mb-6 tracking-widest flex items-center gap-2">
                    <TrendingDown className="w-4 h-4" /> The Strategic Mistake
                  </h3>
                  <ul className="space-y-4 mb-8">
                    {insight.problem.points.map((point, j) => (
                      <li key={j} className="flex gap-3 text-white/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="p-4 rounded-xl bg-black/40 border border-red-500/5 font-mono text-sm text-red-200/60 italic">
                    {insight.problem.data}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase text-brand-orange mb-6 tracking-widest flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Tactical Fix
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {insight.changes.map((change, j) => (
                      <div key={j} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                        <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                        <span className="text-sm text-white/80">{change}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Results & Insight */}
              <div className="lg:col-span-5 space-y-8">
                <div className="p-8 rounded-3xl bg-brand-orange/5 border border-brand-orange/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <TrendingDown className="w-24 h-24 rotate-180 text-brand-orange" />
                  </div>
                  <h3 className="text-xs font-bold uppercase text-brand-orange mb-8 tracking-widest">The Result</h3>
                  
                  <div className="space-y-6 mb-10">
                    {insight.results.metrics.map((m, j) => (
                      <div key={j} className="flex items-center justify-between border-b border-white/5 pb-4">
                        <span className="text-sm text-white/40">{m.label}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-white/20 line-through">{m.before}</span>
                          <ArrowRight className="w-3 h-3 text-white/20" />
                          <span className="text-lg font-bold text-white">{m.after}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-2xl font-display font-bold text-brand-orange text-center p-6 rounded-2xl bg-brand-orange/10 border border-brand-orange/20">
                    {insight.results.final}
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                  <h3 className="text-xs font-bold uppercase text-white/40 mb-6 tracking-widest flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Strategic Lesson
                  </h3>
                  <p className="text-xl font-display font-medium text-white leading-relaxed italic">
                    "{insight.lesson}"
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* FINAL CTA */}
      <div className="mt-40 text-center p-20 rounded-3xl section-matte border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-orange/5 blur-[100px]" />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Want these results for your brand?</h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            I don't just share insights. I implement these exact frameworks for brands ready to scale.
          </p>
          <Link to="/work-with-me" className="btn-premium px-12 py-6 text-xl group">
            Apply for Strategy Call
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
