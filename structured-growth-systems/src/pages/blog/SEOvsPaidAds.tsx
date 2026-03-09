import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  TrendingUp, 
  Search, 
  Zap, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3,
  Clock,
  DollarSign,
  LineChart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MarketingDiagnosisOffer from '../../components/MarketingDiagnosisOffer';

export default function SEOvsPaidAds() {
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
              Strategy & ROI
            </span>
            <span className="text-white/40 text-xs font-mono italic">March 8, 2026 • 12 Min Read</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
            SEO vs Paid Ads: Which One Drives <span className="text-gradient-orange">Better ROI?</span>
          </h1>
          <p className="text-xl text-white/60 leading-relaxed">
            SEO and Paid Ads are the two most powerful growth channels. But which one actually delivers better ROI? Here’s a simple breakdown of the economics behind both strategies.
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
            src="https://picsum.photos/seed/analytics/1200/800" 
            alt="SEO vs Paid Ads ROI Comparison" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </motion.div>

        {/* Content */}
        <div className="space-y-16 text-white/80 leading-relaxed text-lg">
          <section className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-white">The Real Question Businesses Should Ask</h2>
            <p>
              Most companies frame the question wrong. They ask: <span className="text-white font-bold">“SEO or Paid Ads?”</span>
            </p>
            <p>
              But the real question is: <span className="text-brand-orange italic">“Which channel generates the most profitable customers over time?”</span>
            </p>
            <p>
              Because traffic alone means nothing. What matters is <span className="text-white">customer acquisition efficiency</span>.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-brand-orange" />
              </div>
              <h3 className="text-2xl font-bold text-white">Understanding Paid Ads ROI</h3>
              <p className="text-sm text-white/60">
                Paid advertising (Google Ads, Meta Ads) delivers immediate traffic and instant visibility.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-orange" /> Instant visibility</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-orange" /> Highly targeted audience</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-orange" /> Fast lead generation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-orange" /> Scalable campaigns</li>
              </ul>
              <p className="text-xs italic text-white/40 pt-4 border-t border-white/5">
                Constraint: The moment you stop spending, traffic disappears.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                <Search className="w-6 h-6 text-brand-orange" />
              </div>
              <h3 className="text-2xl font-bold text-white">Understanding SEO ROI</h3>
              <p className="text-sm text-white/60">
                SEO works by earning visibility through search authority rather than buying it.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-orange" /> Long-term traffic growth</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-orange" /> Lower acquisition cost over time</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-orange" /> Compounding visibility</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-orange" /> Higher trust from organic search</li>
              </ul>
              <p className="text-xs italic text-white/40 pt-4 border-t border-white/5">
                Constraint: Results usually appear after 3–6 months of execution.
              </p>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-display font-bold text-white">The Unit Economics Comparison</h2>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-bottom border-white/10 bg-white/5">
                    <th className="p-6 font-bold text-white">Metric</th>
                    <th className="p-6 font-bold text-brand-orange">Paid Ads</th>
                    <th className="p-6 font-bold text-brand-orange">SEO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="p-6 text-white/60 font-medium">Speed</td>
                    <td className="p-6 text-white">Fast</td>
                    <td className="p-6 text-white">Slow initially</td>
                  </tr>
                  <tr>
                    <td className="p-6 text-white/60 font-medium">Cost per click</td>
                    <td className="p-6 text-white">High</td>
                    <td className="p-6 text-white">Zero (Earned)</td>
                  </tr>
                  <tr>
                    <td className="p-6 text-white/60 font-medium">Traffic stability</td>
                    <td className="p-6 text-white">Dependent on budget</td>
                    <td className="p-6 text-white">Long-term</td>
                  </tr>
                  <tr>
                    <td className="p-6 text-white/60 font-medium">Best for</td>
                    <td className="p-6 text-white">Immediate lead gen</td>
                    <td className="p-6 text-white">Sustainable growth</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="p-12 rounded-[40px] bg-brand-orange/5 border border-brand-orange/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <TrendingUp className="w-32 h-32" />
            </div>
            <h2 className="text-3xl font-display font-bold text-white mb-6">The Smart Growth Strategy</h2>
            <p className="mb-8">
              High-performing companies rarely choose only one. They combine both to create a balanced acquisition system.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-brand-orange font-bold uppercase tracking-widest text-xs">Short Term</div>
                <div className="text-2xl font-bold text-white">Paid Ads</div>
                <p className="text-sm text-white/60 text-balance">Generate immediate leads and test market demand quickly.</p>
              </div>
              <div className="space-y-2">
                <div className="text-brand-orange font-bold uppercase tracking-widest text-xs">Long Term</div>
                <div className="text-2xl font-bold text-white">SEO</div>
                <p className="text-sm text-white/60 text-balance">Build long-term demand generation and lower acquisition costs.</p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Zap className="w-6 h-6 text-brand-orange" /> When Paid Ads Win
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    <span>Launching a new product</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    <span>Testing market demand</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    <span>Scaling quickly</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    <span>Entering competitive markets</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Search className="w-6 h-6 text-brand-orange" /> When SEO Wins
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    <span>Customer lifetime value is high</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    <span>Search demand exists</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    <span>Businesses want sustainable traffic</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    <span>Producing lower acquisition costs over time</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="border-t border-white/10 pt-16 space-y-6">
            <h2 className="text-3xl font-display font-bold text-white">Final Insight</h2>
            <p>
              The highest ROI rarely comes from choosing one channel. It comes from building a structured acquisition strategy where <span className="text-white">SEO builds authority</span> and <span className="text-white">Paid Ads capture demand</span>.
            </p>
            <p>
              Businesses that integrate both systems create predictable and scalable growth.
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
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Want a Scalable Customer Acquisition Strategy?</h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto">
            Many businesses run SEO and paid ads separately without a structured growth system. We help companies build integrated acquisition strategies designed to generate consistent, high-quality leads.
          </p>
          <Link to="/work-with-me" className="btn-premium inline-flex items-center gap-3 px-10 py-5 group">
            Book a Growth Strategy Call <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
