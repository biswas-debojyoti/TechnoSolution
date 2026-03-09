import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Target, 
  Zap, 
  BarChart3, 
  CheckCircle2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MarketingDiagnosisOffer from '../../components/MarketingDiagnosisOffer';

export default function GoogleAdsLeadGen() {
  return (
    <div className="w-full pt-32 pb-40">
      {/* SEO & Meta Tags (Conceptual) */}
      {/* Title: How to Turn Google Ads Into a Predictable Lead Generation System */}
      {/* Meta: Most companies burn ad budgets chasing random clicks. Learn the structured Google Ads framework that turns paid traffic into consistent, scalable leads without increasing CAC. */}

      <div className="max-w-4xl mx-auto px-6">
        {/* Back Link */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-white/40 hover:text-brand-orange transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-mono uppercase tracking-widest">Back to Journal</span>
        </Link>

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-[10px] font-bold text-brand-orange uppercase tracking-widest">
              Performance Marketing
            </span>
            <div className="flex items-center gap-2 text-white/40 text-xs font-mono">
              <Calendar className="w-3 h-3" /> March 8, 2026
            </div>
            <div className="flex items-center gap-2 text-white/40 text-xs font-mono">
              <Clock className="w-3 h-3" /> 15 Min Read
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-8">
            How to Turn Google Ads Into a <span className="text-gradient-orange">Predictable Lead Generation System</span>
          </h1>
          
          <p className="text-xl text-white/60 leading-relaxed italic border-l-2 border-brand-orange/30 pl-6">
            "Most companies burn ad budgets chasing random clicks. Learn the structured Google Ads framework that turns paid traffic into consistent, scalable leads without increasing CAC."
          </p>
        </header>

        {/* Featured Image */}
        <div className="aspect-video rounded-[40px] overflow-hidden border border-white/10 mb-20 relative group">
          <img 
            src="https://picsum.photos/seed/googleads/1200/800" 
            alt="Google Ads Strategy" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Article Content */}
        <article className="prose prose-invert prose-orange max-w-none">
          <div className="space-y-12 text-lg text-white/80 leading-relaxed">
            
            <section>
              <h2 className="text-3xl font-display font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-brand-orange">01.</span> The Real Problem With Google Ads
              </h2>
              <p>
                Most businesses don’t fail because Google Ads “doesn’t work.” They fail because they run ads without a <strong>system</strong>.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 my-8">
                <h4 className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-6">Typical Failure Points:</h4>
                <ul className="grid md:grid-cols-2 gap-4 list-none p-0 m-0">
                  {[
                    "Random keyword selection",
                    "Generic homepage landing pages",
                    "Broken conversion tracking",
                    "Zero lead qualification",
                    "No data feedback loop"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-xl font-medium text-white">
                The result? You get traffic — but not predictable customers. High-growth companies treat Google Ads as an <span className="text-brand-orange">acquisition system</span>, not just a traffic tool.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-display font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-brand-orange">02.</span> The 4 Pillars of a Predictable System
              </h2>
              <p>A profitable Google Ads engine is built on four interconnected layers that must work in perfect harmony.</p>
              
              <div className="space-y-8 mt-12">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-brand-orange" />
                    </div>
                    <h3 className="text-xl font-bold">1. Intent Capture</h3>
                  </div>
                  <p className="text-white/60">
                    Stop bidding on broad terms. Target high-intent search keywords where users are actively seeking solutions. 
                    <br/><br/>
                    <span className="text-white font-mono text-sm block bg-black/40 p-4 rounded-lg border border-white/5">
                      Example: "SEO agency for SaaS" vs "What is SEO"
                    </span>
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-brand-orange" />
                    </div>
                    <h3 className="text-xl font-bold">2. Dedicated Landing Pages</h3>
                  </div>
                  <p className="text-white/60">
                    Never send traffic to your homepage. A converting landing page must follow a specific psychological structure:
                    <br/><br/>
                    <span className="text-brand-orange font-bold">Headline → Problem → Solution → Proof → CTA</span>
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-brand-orange" />
                    </div>
                    <h3 className="text-xl font-bold">3. Conversion Tracking</h3>
                  </div>
                  <p className="text-white/60">
                    Without tracking, optimization is impossible. You must feed Google's algorithm actual revenue signals: form submissions, qualified calls, and sales value.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                    </div>
                    <h3 className="text-xl font-bold">4. Continuous Optimization</h3>
                  </div>
                  <p className="text-white/60">
                    Winning campaigns are never static. Weekly hygiene includes removing low-intent keywords, improving CTR, and scaling winning ad groups.
                  </p>
                </div>
              </div>
            </section>

            <section className="py-12 border-y border-white/10">
              <h2 className="text-3xl font-display font-bold text-white mb-6">
                <span className="text-brand-orange">03.</span> The Acquisition Loop
              </h2>
              <p className="mb-8">
                The biggest difference between average advertisers and scalable companies is the <strong>feedback loop</strong>.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                {["Traffic", "Leads", "Sales", "Data", "Optimization"].map((step, i, arr) => (
                  <React.Fragment key={i}>
                    <div className="px-6 py-3 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-bold">
                      {step}
                    </div>
                    {i < arr.length - 1 && <ArrowRight className="w-5 h-5 text-white/20 hidden md:block" />}
                  </React.Fragment>
                ))}
              </div>
              <p className="mt-8 text-white/60">
                When this loop works properly, CPA drops, conversion rates increase, and revenue becomes predictable. Google Ads becomes a growth engine, not an expense.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-display font-bold text-white mb-6">
                <span className="text-brand-orange">04.</span> A Simple Comparative Example
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
                  <h4 className="text-white/40 uppercase tracking-widest text-[10px] font-bold mb-4">Company A (Random)</h4>
                  <div className="text-3xl font-bold mb-2">$5,000 Spend</div>
                  <div className="text-white/60">40 Leads → 3 Customers</div>
                </div>
                <div className="p-8 rounded-3xl border border-brand-orange/30 bg-brand-orange/5">
                  <h4 className="text-brand-orange uppercase tracking-widest text-[10px] font-bold mb-4">Company B (Structured)</h4>
                  <div className="text-3xl font-bold mb-2 text-brand-orange">$5,000 Spend</div>
                  <div className="text-white/60"><span className="text-white font-bold">70 Leads → 10 Customers</span></div>
                </div>
              </div>
              <p className="mt-6 italic text-white/40 text-center">Same budget. Different system.</p>
            </section>

            <section>
              <h2 className="text-3xl font-display font-bold text-white mb-6">
                <span className="text-brand-orange">05.</span> When Predictability Appears
              </h2>
              <p>Predictability appears when three metrics stabilize:</p>
              <ul className="space-y-4 mt-6">
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-brand-orange shrink-0" />
                  <div>
                    <span className="text-white font-bold">Cost Per Lead (CPL):</span> The baseline cost to acquire a prospect.
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-brand-orange shrink-0" />
                  <div>
                    <span className="text-white font-bold">Lead to Customer Rate:</span> The efficiency of your sales process.
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-brand-orange shrink-0" />
                  <div>
                    <span className="text-white font-bold">Customer Lifetime Value (LTV):</span> The total revenue generated per customer.
                  </div>
                </li>
              </ul>
              <p className="mt-8">Once these are stable, you can scale budget with absolute confidence.</p>
            </section>

            <section className="bg-brand-orange/10 border border-brand-orange/20 rounded-[40px] p-12 text-center">
              <ShieldCheck className="w-16 h-16 text-brand-orange mx-auto mb-8" />
              <h2 className="text-3xl font-display font-bold text-white mb-6">Final Insight</h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                Google Ads is not about buying traffic. It’s about building a structured customer acquisition machine. Businesses that understand this turn paid ads into a consistent pipeline of qualified leads.
              </p>
            </section>

          </div>
        </article>

        {/* Share & Meta */}
        <div className="mt-20 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Share Article:</span>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-orange/10 hover:border-brand-orange/30 transition-all">
                <Share2 className="w-4 h-4 text-white/60" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Google Ads", "Lead Gen", "Scaling", "ROI"].map((tag, i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-white/40">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="mt-40">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 md:p-24 rounded-[60px] animated-border-card border border-white/10 relative overflow-hidden bg-gradient-to-br from-brand-orange/10 to-transparent text-center"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
              Want a Predictable <br/><span className="text-gradient-orange">Lead Generation System?</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
              If your campaigns are generating traffic but not customers, the problem is usually the acquisition structure — not the platform. We help businesses build structured growth systems.
            </p>
            <Link to="/work-with-me" className="btn-premium px-12 py-6 text-xl group">
              Book a Growth Strategy Call <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Marketing Diagnosis Offer */}
      <MarketingDiagnosisOffer className="mt-40" />
    </div>
  );
}
