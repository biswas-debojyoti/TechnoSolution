"use client";
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, TrendingUp, Target, Zap } from 'lucide-react';
import { caseStudies } from '../page';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CaseStudyDetail() {
  const { id } = useParams();
  const study = caseStudies.find(s => s.id == Number(id));

  if (!study) {
    return <Link href="/case-studies" replace />;
  }

  return (
    <div className="w-full pt-32 pb-40 px-6 max-w-4xl mx-auto">
      <Link href="/case-studies" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" /> Back to Case Studies
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
            {study.bigMetric}
          </h2>
          <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-8">
            {study.title}
          </h1>
          <p className="text-2xl text-white/60 font-serif italic mb-8">
            {study.desc}
          </p>
          <div className="flex flex-wrap gap-4">
            {Object.entries(study.metrics).map(([key, val]) => (
              <div key={key} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-white/80 uppercase tracking-wider">
                <span className="text-white/40 mr-2">{key}:</span>{val}
              </div>
            ))}
          </div>
        </div>

        <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-20 border border-white/10">
          <img 
            src={study.image} 
            alt="Case Study Hero" 
            width="1200"
            height="514"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            fetchPriority="high"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          <div className="md:col-span-2 space-y-16">
            {id === '1' ? (
              <>
                <section>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
                    <Target className="text-yellow-400" /> 1. Overview
                  </h2>
                  <div className="grid grid-cols-2 gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Industry</p>
                      <p className="text-white font-medium">D2C Apparel</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Channel</p>
                      <p className="text-white font-medium">Meta (Facebook + Instagram)</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Objective</p>
                      <p className="text-white font-medium">Unlock Profitable Scale</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Timeline</p>
                      <p className="text-white font-medium">6 Months</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
                    <TrendingUp className="text-yellow-400" /> Results Snapshot
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "Revenue Growth", value: "+312%" },
                      { label: "ROAS Improvement", value: "+48%" },
                      { label: "Spend Capacity", value: "3.5x" },
                      { label: "AOV Increase", value: "+12%" }
                    ].map((stat, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-3xl font-display font-bold text-yellow-400 mb-1">{stat.value}</div>
                        <div className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
                    <Zap className="text-yellow-400" /> 2. The Problem
                  </h2>
                  <div className="prose prose-invert prose-lg max-w-none text-white/70">
                    <p className="text-xl text-white mb-6 font-medium">The Saturated Scaling Wall</p>
                    <p>A D2C apparel brand had achieved initial success but hit a "scaling wall" where increasing the budget only led to diminishing returns.</p>
                    <div className="space-y-8 mt-8">
                      <div>
                        <h4 className="text-white font-bold mb-2">Targeting Overlap</h4>
                        <p>The account was bloated with dozens of interest-based ad sets (e.g., "Yoga," "Athleisure," "Fitness") that were all bidding against each other for the same customer.</p>
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-2">Creative Stagnation</h4>
                        <p>The brand relied on static product shots that failed to stop the scroll in a hyper-competitive social feed.</p>
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-2">Fragmented Data</h4>
                        <p>Small budgets were spread across too many campaigns, preventing the Meta algorithm from ever exiting the "Learning Phase" and finding stability.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">3. Strategy: Account Consolidation & Creative Diversification</h2>
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">The "Broad" Revolution</h3>
                      <p className="text-white/70">We stripped away all narrow interest and lookalike targeting. We moved to Broad Targeting (Age/Gender/Location only), allowing the creative and the algorithm to define the audience.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Advantage+ Shopping (ASC) Implementation</h3>
                      <p className="text-white/70">We shifted 70% of the scaling budget into a single ASC campaign. This consolidated all historical data into one "brain," allowing Meta to find buyers across the entire ecosystem (Reels, Stories, Feed).</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Creative Iteration Lab</h3>
                      <p className="text-white/70">We moved away from "perfect" studio shots and implemented a UGC (User-Generated Content) engine. We tested 5 new video "Hooks" every week to identify what resonated with different psychological triggers (e.g., "Comfort," "Style," "Durability").</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Post-Purchase Optimization</h3>
                      <p className="text-white/70">We used the Meta Conversions API (CAPI) to ensure 100% signal accuracy, even for users with ad-blockers or iOS privacy settings.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">4. Results: Unlocking Profitable Scale</h2>
                  <div className="space-y-6">
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-2">+312% Increase in Monthly Revenue</h4>
                      <p className="text-white/70">Revenue tripled in six months while maintaining a stable, profitable margin.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-2">48% Improvement in ROAS</h4>
                      <p className="text-white/70">The efficiency of the "Broad" algorithm meant we were finding cheaper customers that competitors were missing.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-2">3.5x Spend Capacity</h4>
                      <p className="text-white/70">The new structure allowed us to increase daily spend by 250% without the typical "performance dip" associated with scaling.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-2">12% Increase in AOV</h4>
                      <p className="text-white/70">By testing "Bundle" creative, we encouraged customers to buy more items per transaction.</p>
                    </div>
                  </div>
                </section>
              </>
            ) : id === '3' ? (
              <>
                <section>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
                    <Target className="text-yellow-400" /> 1. Overview
                  </h2>
                  <div className="grid grid-cols-2 gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Industry</p>
                      <p className="text-white font-medium">Luxury E-commerce</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Channel</p>
                      <p className="text-white font-medium">Meta + Localized Funnels</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Objective</p>
                      <p className="text-white font-medium">International Expansion</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Timeline</p>
                      <p className="text-white font-medium">8 Months</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
                    <TrendingUp className="text-yellow-400" /> Results Snapshot
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "New Revenue", value: "£1.1M" },
                      { label: "Average ROAS", value: "3.8x" },
                      { label: "CTR Increase", value: "+55%" },
                      { label: "Cart Abandonment", value: "-32%" }
                    ].map((stat, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-3xl font-display font-bold text-yellow-400 mb-1">{stat.value}</div>
                        <div className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
                    <Zap className="text-yellow-400" /> 2. The Problem
                  </h2>
                  <div className="prose prose-invert prose-lg max-w-none text-white/70">
                    <p className="text-xl text-white mb-6 font-medium">The "Copy-Paste" Expansion Failure</p>
                    <p>A luxury e-commerce brand attempted to expand from its home market into the UK and US but saw immediate performance drops and high customer acquisition costs.</p>
                    <div className="space-y-8 mt-8">
                      <div>
                        <h4 className="text-white font-bold mb-2">Cultural Dissonance</h4>
                        <p>Creative that resonated in the original market felt "out of touch" with UK and US luxury consumers, leading to low Click-Through Rates (CTR).</p>
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-2">Logistics Friction</h4>
                        <p>High shipping costs and longer delivery times weren't addressed in the ad copy, causing massive cart abandonment at the final step.</p>
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-2">Currency & Technical Hurdles</h4>
                        <p>Pricing was inconsistent across ads and the landing page, leading to a broken user experience and a lack of trust in the brand.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">3. Strategy: Phased Rollout & Localized Architecture</h2>
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Phase 1: The Market Intelligence Sprint</h3>
                      <p className="text-white/70">We launched low-budget "Search & Social" tests in both regions to identify which products had the highest local demand. We discovered the US favored "Statement Pieces," while the UK preferred "Versatile Classics."</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Localized Multi-Currency Funnels</h3>
                      <p className="text-white/70">We implemented Dynamic Language Optimization (DLO) and localized storefronts. Ads automatically showed prices in £ for the UK and $ for the US, with landing pages reflecting local shipping guarantees (e.g., "Free UK Returns").</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">The "Luxury Trust" Creative Mix</h3>
                      <p className="text-white/70">We shifted from polished studio shots to a mix of Local Influencer Whitelisting and high-end editorial video. We used UK-based creators for UK ads to ensure the accent and "vibe" felt native.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Cross-Border Advantage+ Scaling</h3>
                      <p className="text-white/70">Once the "Winning Products" were identified per region, we moved them into dedicated Advantage+ Shopping Campaigns (ASC) for each country to allow Meta to optimize for local seasonal trends.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">4. Results: Profitable International Scale</h2>
                  <div className="space-y-6">
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-2">£1.1M in New Revenue</h4>
                      <p className="text-white/70">Added across the UK and US markets combined within 8 months.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-2">3.8x Average ROAS</h4>
                      <p className="text-white/70">Maintained high profitability despite the increased costs of entering competitive international markets.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-2">55% Increase in CTR</h4>
                      <p className="text-white/70">Localized creative and influencer content tripled the engagement rate compared to the original "Copy-Paste" ads.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-2">32% Reduction in Cart Abandonment</h4>
                      <p className="text-white/70">Addressing "Free Shipping & Returns" directly in the ad copy pre-qualified buyers and boosted trust.</p>
                    </div>
                  </div>
                </section>
              </>
            ) : id === '2' ? (
              <>
                <section>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
                    <Target className="text-yellow-400" /> 1. Overview
                  </h2>
                  <div className="grid grid-cols-2 gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Industry</p>
                      <p className="text-white font-medium">B2B SaaS</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Channel</p>
                      <p className="text-white font-medium">Google Search + LinkedIn</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Objective</p>
                      <p className="text-white font-medium">Improve Lead Quality & CPQL</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Timeline</p>
                      <p className="text-white font-medium">90 Days</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
                    <TrendingUp className="text-yellow-400" /> Results Snapshot
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "Cost Per Qualified Lead", value: "-43%" },
                      { label: "Increase in SQLs", value: "+65%" },
                      { label: "Business Email Capture", value: "82%" },
                      { label: "Pipeline Velocity", value: "2.5x Faster" }
                    ].map((stat, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-3xl font-display font-bold text-yellow-400 mb-1">{stat.value}</div>
                        <div className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
                    <Zap className="text-yellow-400" /> 2. The Problem
                  </h2>
                  <div className="prose prose-invert prose-lg max-w-none text-white/70">
                    <p className="text-xl text-white mb-6 font-medium">Lead volume was high. Revenue impact was low.</p>
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-white font-bold mb-2">1) Targeting Dilution</h4>
                        <p>Broad industry keywords. Students and entry-level clicks. Decision-makers underrepresented.</p>
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-2">2) High CPL</h4>
                        <p>Optimized for traffic, not qualification. Sales team overwhelmed. Poor lead-to-demo ratio.</p>
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-2">3) Low-Quality Form Structure</h4>
                        <p>Minimal fields. Personal email dominance (Gmail/Outlook). No company size qualification.</p>
                      </div>
                    </div>
                    <p className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold">
                      Result: Marketing volume ≠ Sales pipeline.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">3. Diagnosis Framework</h2>
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-white/10">
                          <th className="p-4 font-display font-bold">Pillar</th>
                          <th className="p-4 font-display font-bold">Issue</th>
                          <th className="p-4 font-display font-bold">Business Impact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        <tr>
                          <td className="p-4 text-white font-medium">Keywords</td>
                          <td className="p-4 text-white/70">Broad intent</td>
                          <td className="p-4 text-white/70">Unqualified traffic</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-white font-medium">Form Design</td>
                          <td className="p-4 text-white/70">Zero friction</td>
                          <td className="p-4 text-white/70">Junk submissions</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-white font-medium">Optimization</td>
                          <td className="p-4 text-white/70">Click-focused</td>
                          <td className="p-4 text-white/70">Inflated CPL</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-6 italic text-white/60">Conclusion: The system was optimized for ease, not intent.</p>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">4. Strategy: High-Intent Capture Model</h2>
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Step 1: Intent-Based Search Restructure</h3>
                      <p className="text-white/70 mb-4">Removed generic category keywords and focused on high-intent clusters:</p>
                      <ul className="space-y-2 text-sm text-white/60">
                        <li>• “[Category] enterprise platform”</li>
                        <li>• “[Competitor] alternatives”</li>
                        <li>• “[Problem] solution for enterprise”</li>
                        <li>• “[Software] pricing for large company”</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Step 2: Firmographic Gating (Strategic Friction)</h3>
                      <p className="text-white/70 mb-4">Redesigned forms to include mandatory work email, company size, and job title. Blocked personal email domains.</p>
                      <p className="mt-2 text-emerald-400 font-bold">Result: 82% business email capture rate.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Step 3: LinkedIn Insight Layer</h3>
                      <p className="text-white/70">Integrated LinkedIn Insight Tag to identify job titles and seniority. Manually excluded interns, juniors, and students from traffic.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Step 4: Value-Based Bidding Model</h3>
                      <p className="text-white/70">Shifted to “Maximize Conversion Value,” assigning higher weight to 500+ employee companies and enterprise titles.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">5. Execution Timeline</h2>
                  <div className="space-y-6">
                    <div className="flex gap-6">
                      <div className="w-24 shrink-0 font-display font-bold text-yellow-400">Month 1</div>
                      <div className="flex-grow pb-6 border-b border-white/10">
                        <p className="text-white/70">Keyword audit & purge, landing page redesign, insight tag integration.</p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="w-24 shrink-0 font-display font-bold text-yellow-400">Month 2</div>
                      <div className="flex-grow pb-6 border-b border-white/10">
                        <p className="text-white/70">Value-based bidding activation, audience exclusions applied, negative keyword expansion.</p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="w-24 shrink-0 font-display font-bold text-yellow-400">Month 3</div>
                      <div className="flex-grow pb-6 border-b border-white/10">
                        <p className="text-white/70">Performance-based bid scaling, high-LTV segment expansion, pipeline quality optimization.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">6. Results After 90 Days</h2>
                  <div className="space-y-8">
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-2">CPQL: –43% reduction</h4>
                      <p className="text-white/70">Less volume. Higher precision. Immediate cost stabilization.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-2">SQLs: +65% increase</h4>
                      <p className="text-white/70">More demo-ready prospects. Sales team workload improved dramatically.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-2">Pipeline Velocity: 2.5x faster</h4>
                      <p className="text-white/70">Higher intent → shorter negotiation → faster close.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">7. Before vs After Snapshot</h2>
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-white/10">
                          <th className="p-4 font-display font-bold">Metric</th>
                          <th className="p-4 font-display font-bold">Before</th>
                          <th className="p-4 font-display font-bold">After</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {[
                          { m: "CPL", b: "High", a: "–43%" },
                          { m: "SQL Rate", b: "Low", a: "+65%" },
                          { m: "Email Quality", b: "Personal-heavy", a: "82% Corporate" },
                          { m: "Traffic Intent", b: "Broad", a: "Enterprise-focused" },
                          { m: "Sales Cycle", b: "Slow", a: "2.5x Faster" }
                        ].map((row, i) => (
                          <tr key={i}>
                            <td className="p-4 text-white font-medium">{row.m}</td>
                            <td className="p-4 text-white/50">{row.b}</td>
                            <td className="p-4 text-emerald-400 font-bold">{row.a}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">8. Reusable B2B SaaS Framework</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Kill category keywords.",
                      "Target competitor & pain-driven queries.",
                      "Add friction to forms.",
                      "Track SQL, not MQL.",
                      "Assign conversion value by company size.",
                      "Exclude low-seniority job roles."
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 text-white/70 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">9. Growth Principle</h2>
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10 italic font-serif text-xl text-white/80">
                    "In B2B, fewer leads can mean more revenue. Sales time is your most expensive asset. Qualification must happen before the demo call."
                  </div>
                </section>
              </>
            ) : id === '4' ? (
              <>
                <section>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
                    <Target className="text-yellow-400" /> 1. Overview
                  </h2>
                  <div className="grid grid-cols-2 gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Industry</p>
                      <p className="text-white font-medium">DTC E-commerce</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Channel</p>
                      <p className="text-white font-medium">Meta (Facebook + Instagram)</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Objective</p>
                      <p className="text-white font-medium">Reduce CPA & Unlock Scale</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Timeline</p>
                      <p className="text-white font-medium">30 Days</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
                    <TrendingUp className="text-yellow-400" /> Results Snapshot
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "Revenue Growth", value: "+52%" },
                      { label: "CPA Reduction", value: "-24%" },
                      { label: "Performance", value: "Stable Daily" },
                      { label: "Learning Phase", value: "Exited" }
                    ].map((stat, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-3xl font-display font-bold text-yellow-400 mb-1">{stat.value}</div>
                        <div className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
                    <Zap className="text-yellow-400" /> 2. The Problem
                  </h2>
                  <div className="prose prose-invert prose-lg max-w-none text-white/70">
                    <p className="text-xl text-white mb-6 font-medium">The account was spending consistently — but growth had stopped.</p>
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-white font-bold mb-2">1) Creative Fatigue</h4>
                        <p>Legacy ads were overexposed. CTR declining. CPA rising week after week.</p>
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-2">2) Fragmented Structure</h4>
                        <p>Too many small ad sets. Budget spread too thin. Stuck in perpetual learning phase.</p>
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-2">3) Weak Signal Infrastructure</h4>
                        <p>Pixel-only tracking. Missing server-side events. Under-attributed conversions.</p>
                      </div>
                    </div>
                    <p className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold">
                      Result: High spend. Flat revenue. Increasing acquisition cost.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">3. Diagnosis Framework</h2>
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-white/10">
                          <th className="p-4 font-display font-bold">Layer</th>
                          <th className="p-4 font-display font-bold">Problem</th>
                          <th className="p-4 font-display font-bold">Impact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        <tr>
                          <td className="p-4 text-white font-medium">Structure</td>
                          <td className="p-4 text-white/70">Over-segmentation</td>
                          <td className="p-4 text-white/70">Data dilution</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-white font-medium">Creative</td>
                          <td className="p-4 text-white/70">No systematic testing</td>
                          <td className="p-4 text-white/70">Fatigue & blind spots</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-white font-medium">Tracking</td>
                          <td className="p-4 text-white/70">No CAPI</td>
                          <td className="p-4 text-white/70">Weak optimization signals</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-6 italic text-white/60">Conclusion: The issue wasn’t budget. It was architecture.</p>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">4. Strategy: Simplify to Amplify</h2>
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">A) Account Consolidation</h3>
                      <ul className="space-y-2 text-white/70">
                        <li>• Migrated to Advantage+ Shopping Campaigns</li>
                        <li>• Reduced ad set fragmentation</li>
                        <li>• Centralized conversion data</li>
                        <li>• Allowed algorithm to exit learning faster</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">B) Hook-First Creative System</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                          <h4 className="font-bold mb-3">Phase 1: Hook Testing</h4>
                          <p className="text-sm text-white/60">10–20 hooks per week. UGC format. Pain-point driven angles.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                          <h4 className="font-bold mb-3">Phase 2: Creative Iteration</h4>
                          <p className="text-sm text-white/60">Winning hooks → multiple body variations. Thumb-stop rate optimization.</p>
                        </div>
                      </div>
                      <p className="mt-4 font-serif italic text-white/80">Focus: First 3 seconds {'>'} Everything else.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">C) Signal Strengthening</h3>
                      <ul className="space-y-2 text-white/70">
                        <li>• Implemented Meta Conversions API (CAPI)</li>
                        <li>• Matched server-side events with Pixel</li>
                        <li>• Improved event match quality</li>
                        <li>• Restored lost attribution</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">5. Execution Timeline</h2>
                  <div className="space-y-6">
                    {[
                      { week: "Week 1", items: ["Full audit", "Structure consolidation", "CAPI setup", "Creative production sprint"] },
                      { week: "Week 2", items: ["Launch hook testing", "Kill underperformers fast", "Monitor frequency & CPA trends"] },
                      { week: "Week 3", items: ["Scale winning hooks", "Increase budget on stable ad sets", "Remove learning resets"] },
                      { week: "Week 4", items: ["Controlled scaling", "Horizontal creative expansion", "Daily performance stabilized"] }
                    ].map((w, i) => (
                      <div key={i} className="flex gap-6">
                        <div className="w-24 shrink-0 font-display font-bold text-yellow-400">{w.week}</div>
                        <div className="flex-grow pb-6 border-b border-white/10">
                          <ul className="grid grid-cols-2 gap-2">
                            {w.items.map((item, j) => (
                              <li key={j} className="text-white/70 text-sm flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-white/30" /> {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">6. Results After 30 Days</h2>
                  <div className="space-y-8">
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-2">Revenue: +52% total increase</h4>
                      <p className="text-white/70">Higher conversion volume without audience narrowing.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-2">CPA: –24% reduction</h4>
                      <p className="text-white/70">Lower acquisition cost through better creative + signal clarity.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-2">Stability: Reduced volatility</h4>
                      <p className="text-white/70">Predictable scaling pattern. Budget increases no longer broke performance.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">7. Why It Worked</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0 text-yellow-400 font-bold">1</div>
                      <p className="text-white/70"><strong className="text-white">Creative replaced interest targeting.</strong> Broad audiences + strong hooks beat micro-targeting.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0 text-yellow-400 font-bold">2</div>
                      <p className="text-white/70"><strong className="text-white">Data consolidation accelerated machine learning.</strong> Fewer buckets = faster optimization.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0 text-yellow-400 font-bold">3</div>
                      <p className="text-white/70"><strong className="text-white">Server-side tracking improved signal quality.</strong> Meta optimized using real revenue, not partial data.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">8. Before vs After Snapshot</h2>
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-white/10">
                          <th className="p-4 font-display font-bold">Metric</th>
                          <th className="p-4 font-display font-bold">Before</th>
                          <th className="p-4 font-display font-bold">After</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {[
                          { m: "Revenue Trend", b: "Flat", a: "Upward growth" },
                          { m: "CPA", b: "Rising", a: "Reduced 24%" },
                          { m: "Structure", b: "Fragmented", a: "Consolidated" },
                          { m: "Tracking", b: "Pixel only", a: "Pixel + CAPI" },
                          { m: "Stability", b: "Volatile", a: "Predictable" }
                        ].map((row, i) => (
                          <tr key={i}>
                            <td className="p-4 text-white font-medium">{row.m}</td>
                            <td className="p-4 text-white/50">{row.b}</td>
                            <td className="p-4 text-emerald-400 font-bold">{row.a}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </>
            ) : id === '5' ? (
              <>
                <section>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
                    <Target className="text-yellow-400" /> 1. Overview
                  </h2>
                  <div className="grid grid-cols-2 gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Industry</p>
                      <p className="text-white font-medium">High-Ticket Info Product</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Offer Price</p>
                      <p className="text-white font-medium">$2,000+</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Launch Window</p>
                      <p className="text-white font-medium">14 Days</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Primary Funnel</p>
                      <p className="text-white font-medium">Webinar → Offer Page</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
                    <TrendingUp className="text-yellow-400" /> Results Snapshot
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "Revenue in 14 Days", value: "$420,000" },
                      { label: "ROAS", value: "6.4x" },
                      { label: "Cart Recovery", value: "40%" },
                      { label: "Webinar Attendance", value: "+22%" }
                    ].map((stat, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-3xl font-display font-bold text-yellow-400 mb-1">{stat.value}</div>
                        <div className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
                    <Zap className="text-yellow-400" /> 2. The Problem
                  </h2>
                  <div className="prose prose-invert prose-lg max-w-none text-white/70">
                    <p className="text-xl text-white mb-6 font-medium">Strong registrations. Weak monetization.</p>
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-white font-bold mb-2">1) Low Webinar Show-Up</h4>
                        <p>High registration volume. Declining live attendance. Missed real-time closing opportunities.</p>
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-2">2) Cart Abandonment</h4>
                        <p>High-ticket hesitation. Price shock at checkout. No structured objection handling.</p>
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-2">3) Single-Channel Dependence</h4>
                        <p>Over-reliance on email. No paid remarketing amplification. Cold and warm prospects not re-engaged properly.</p>
                      </div>
                    </div>
                    <p className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold">
                      Result: Traffic was working. Funnel wasn’t.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">3. Diagnosis Framework</h2>
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-white/10">
                          <th className="p-4 font-display font-bold">Stage</th>
                          <th className="p-4 font-display font-bold">Problem</th>
                          <th className="p-4 font-display font-bold">Revenue Impact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        <tr>
                          <td className="p-4 text-white font-medium">Registrant</td>
                          <td className="p-4 text-white/70">Not attending</td>
                          <td className="p-4 text-white/70">Lost closing leverage</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-white font-medium">Attendee</td>
                          <td className="p-4 text-white/70">Not clicking</td>
                          <td className="p-4 text-white/70">Weak urgency</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-white font-medium">Page Visitor</td>
                          <td className="p-4 text-white/70">Not buying</td>
                          <td className="p-4 text-white/70">Objection friction</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-white font-medium">Cart Visitor</td>
                          <td className="p-4 text-white/70">Abandoning</td>
                          <td className="p-4 text-white/70">Revenue leakage</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-6 italic text-white/60">Conclusion: The issue was not lead volume — it was decision pressure orchestration.</p>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">4. Strategy: Multi-Channel Remarketing Engine</h2>
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">A) Audience Mapping</h3>
                      <p className="text-white/70 mb-4">Custom segments built across platforms:</p>
                      <ul className="grid grid-cols-2 gap-2 text-sm text-white/60">
                        <li>• Webinar Registrants (No Show)</li>
                        <li>• Webinar Attendees</li>
                        <li>• Offer Page Visitors</li>
                        <li>• Cart Abandoners</li>
                        <li>• 75% Video Viewers</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">B) The 14-Day Objection Timeline</h3>
                      <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                          <h4 className="font-bold mb-2">Days 1–4: Logic-Based Justification</h4>
                          <p className="text-sm text-white/60">ROI breakdown ads. Curriculum deep-dives. FAQ clarification videos. Goal: Remove rational hesitation.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                          <h4 className="font-bold mb-2">Days 5–10: Social Proof Saturation</h4>
                          <p className="text-sm text-white/60">Case studies. Student testimonials. Revenue screenshots. Goal: Remove belief resistance.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                          <h4 className="font-bold mb-2">Days 11–14: Controlled Pressure</h4>
                          <p className="text-sm text-white/60">Countdown timers. “Doors Closing” messaging. Bonus stack expiration. Goal: Force decision before deadline.</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">C) Omnichannel Synchronization</h3>
                      <p className="text-white/70">We aligned paid media with email automation. “48 Hour Left” email matched Meta + YouTube ads. Budget scaled aggressively in final 72 hours.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">5. Execution Timeline</h2>
                  <div className="space-y-6">
                    <div className="flex gap-6">
                      <div className="w-32 shrink-0 font-display font-bold text-yellow-400">Week 1</div>
                      <div className="flex-grow pb-6 border-b border-white/10">
                        <p className="text-white/70">Segment mapping, remarketing audiences deployed, objection-based creatives launched.</p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="w-32 shrink-0 font-display font-bold text-yellow-400">Week 2</div>
                      <div className="flex-grow pb-6 border-b border-white/10">
                        <p className="text-white/70">Budget reallocation to high-intent segments, social proof amplification, final 72-hour surge.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">6. Results After 14 Days</h2>
                  <div className="grid gap-6">
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-2">Revenue: $420,000 generated</h4>
                      <p className="text-white/70">Nearly half came from remarketing sequences.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-2">Cart Recovery: 40% of total revenue</h4>
                      <p className="text-white/70">Without structured remarketing, this revenue was lost.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">7. Why It Worked</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0 text-yellow-400 font-bold">1</div>
                      <p className="text-white/70"><strong className="text-white">High-ticket buyers require multiple trust signals.</strong> One email is not persuasion.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0 text-yellow-400 font-bold">2</div>
                      <p className="text-white/70"><strong className="text-white">Behavior-based segmentation reduced wasted impressions.</strong> Each ad matched user intent stage.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0 text-yellow-400 font-bold">3</div>
                      <p className="text-white/70"><strong className="text-white">Urgency was synchronized across channels.</strong> Email alone cannot create closing pressure.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">8. Before vs After Snapshot</h2>
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-white/10">
                          <th className="p-4 font-display font-bold">Metric</th>
                          <th className="p-4 font-display font-bold">Before</th>
                          <th className="p-4 font-display font-bold">After</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {[
                          { m: "Revenue", b: "Inconsistent", a: "$420K in 14 Days" },
                          { m: "ROAS", b: "Lower efficiency", a: "6.4x" },
                          { m: "Attendance", b: "Declining", a: "+22%" },
                          { m: "Cart Recovery", b: "Minimal", a: "40% Revenue" },
                          { m: "Channels", b: "Email-heavy", a: "Fully Omnichannel" }
                        ].map((row, i) => (
                          <tr key={i}>
                            <td className="p-4 text-white font-medium">{row.m}</td>
                            <td className="p-4 text-white/50">{row.b}</td>
                            <td className="p-4 text-emerald-400 font-bold">{row.a}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </>
            ) : id === '6' ? (
              <>
                <section>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
                    <Target className="text-yellow-400" /> 1. Overview
                  </h2>
                  <div className="grid grid-cols-2 gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Industry</p>
                      <p className="text-white font-medium">Multi-Location Clinic</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Channel</p>
                      <p className="text-white font-medium">Google Ads (Search)</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Objective</p>
                      <p className="text-white font-medium">Increase Qualified Bookings</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Timeline</p>
                      <p className="text-white font-medium">60 Days</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
                    <TrendingUp className="text-yellow-400" /> Results Snapshot
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "Qualified Leads", value: "+286%" },
                      { label: "Cost Per Lead", value: "-42%" },
                      { label: "Offline Match Rate", value: "74%" },
                      { label: "Show-Up Rate", value: "+18%" }
                    ].map((stat, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-3xl font-display font-bold text-yellow-400 mb-1">{stat.value}</div>
                        <div className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
                    <Zap className="text-yellow-400" /> 2. The Problem
                  </h2>
                  <div className="prose prose-invert prose-lg max-w-none text-white/70">
                    <p className="text-xl text-white mb-6 font-medium">The clinic was generating traffic — not patients.</p>
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-white font-bold mb-2">1) Low Lead Quality</h4>
                        <p>Spam submissions. Out-of-area inquiries. Front desk overwhelmed with unqualified calls.</p>
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-2">2) Attribution Blindness</h4>
                        <p>No visibility into which keywords led to actual booked appointments. Optimizing for form fills instead of real patients.</p>
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-2">3) Budget Bleed</h4>
                        <p>Ads shown too far from clinic radius. High bounce rates from distant users. Irrelevant traffic inflating CPL.</p>
                      </div>
                    </div>
                    <p className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold">
                      Result: High spend. Low booking efficiency.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">3. Diagnosis Framework</h2>
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-white/10">
                          <th className="p-4 font-display font-bold">Layer</th>
                          <th className="p-4 font-display font-bold">Problem</th>
                          <th className="p-4 font-display font-bold">Business Impact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        <tr>
                          <td className="p-4 text-white font-medium">Geography</td>
                          <td className="p-4 text-white/70">Broad targeting</td>
                          <td className="p-4 text-white/70">Low-intent clicks</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-white font-medium">Keywords</td>
                          <td className="p-4 text-white/70">Informational traffic</td>
                          <td className="p-4 text-white/70">Poor conversion intent</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-white font-medium">Tracking</td>
                          <td className="p-4 text-white/70">No offline feedback</td>
                          <td className="p-4 text-white/70">Algorithm trained on wrong signals</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-6 italic text-white/60">Conclusion: The account was optimized for surface metrics, not booked appointments.</p>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">4. Strategy: Hyper-Local Precision Engine</h2>
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Step 1: Micro-Radius Campaign Architecture</h3>
                      <p className="text-white/70 mb-4">We segmented campaigns by distance from each clinic:</p>
                      <ul className="space-y-2 text-sm text-white/60">
                        <li>• 0–5 miles (Primary Zone – Highest Bid)</li>
                        <li>• 5–10 miles (Moderate Bid)</li>
                        <li>• 10–20 miles (Reduced Bid)</li>
                        <li>• 20+ miles (Excluded)</li>
                      </ul>
                      <p className="mt-4 text-white/70 italic">Impact: Spend concentrated where commute likelihood was highest.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Step 2: Offline Conversion Tracking (OCT)</h3>
                      <p className="text-white/70 mb-4">We integrated CRM with Google Ads to track the full patient journey:</p>
                      <ul className="grid grid-cols-2 gap-2 text-sm text-white/60">
                        <li>• Form Fill</li>
                        <li>• Phone Call</li>
                        <li>• Booked Appointment (Primary)</li>
                        <li>• Showed Up</li>
                      </ul>
                      <p className="mt-4 text-white/70 italic">Effect: 74% match rate between ad click and confirmed booking.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Step 3: High-Intent Keyword Restructure</h3>
                      <p className="text-white/70">Removed informational queries like "How does [Service] work" and focused on "[Service] clinic near me" or "Best [Service] doctor in [City]".</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">Step 4: Localized Ad Copy System</h3>
                      <p className="text-white/70">Each ad dynamically referenced neighborhood, city name, and exact distance to clinic (e.g., "2.3 Miles Away").</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">6. Results After 60 Days</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-2">Qualified Leads: +286%</h4>
                      <p className="text-sm text-white/70">Not just volume — a fundamental shift in lead quality.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-2">Cost Per Lead: –42%</h4>
                      <p className="text-sm text-white/70">Less waste, more conversion intent, higher efficiency.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-2">Match Accuracy: 74%</h4>
                      <p className="text-sm text-white/70">Offline conversion match rate improved significantly.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-2">Show-Up Rate: +18%</h4>
                      <p className="text-sm text-white/70">Higher intent from start → fewer no-shows.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">7. Before vs After Snapshot</h2>
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-white/10">
                          <th className="p-4 font-display font-bold">Metric</th>
                          <th className="p-4 font-display font-bold">Before</th>
                          <th className="p-4 font-display font-bold">After</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {[
                          { m: "Lead Volume", b: "High but weak", a: "Fewer but qualified" },
                          { m: "CPL", b: "High", a: "–42%" },
                          { m: "Booking Visibility", b: "None", a: "Full CRM sync" },
                          { m: "Radius Targeting", b: "Broad", a: "Micro-layered" },
                          { m: "Show-Up Rate", b: "Inconsistent", a: "+18%" }
                        ].map((row, i) => (
                          <tr key={i}>
                            <td className="p-4 text-white font-medium">{row.m}</td>
                            <td className="p-4 text-white/50">{row.b}</td>
                            <td className="p-4 text-emerald-400 font-bold">{row.a}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">8. Why It Worked</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0 text-yellow-400 font-bold">1</div>
                      <p className="text-white/70"><strong className="text-white">Optimization shifted from clicks → booked appointments.</strong></p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0 text-yellow-400 font-bold">2</div>
                      <p className="text-white/70"><strong className="text-white">Distance was treated as a bidding variable.</strong></p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0 text-yellow-400 font-bold">3</div>
                      <p className="text-white/70"><strong className="text-white">CRM data trained the algorithm on real revenue events.</strong></p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0 text-yellow-400 font-bold">4</div>
                      <p className="text-white/70"><strong className="text-white">Broad informational waste was eliminated.</strong></p>
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
                    <Target className="text-yellow-400" /> The Problem
                  </h2>
                  <div className="prose prose-invert prose-lg max-w-none text-white/70">
                    <p>The brand had scaled successfully to $40k/mo in ad spend but hit a hard ceiling. Every attempt to increase budgets resulted in a proportional drop in ROAS, making further scaling unprofitable.</p>
                    <p>An audit revealed a messy account structure: overlapping audiences, cannibalized search terms, and a reliance on broad targeting without proper exclusion lists. The algorithm was confused, and budgets were being wasted on low-intent traffic.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
                    <Zap className="text-yellow-400" /> The Strategy
                  </h2>
                  <div className="prose prose-invert prose-lg max-w-none text-white/70">
                    <p>We implemented a structured growth system focused on account consolidation and clear algorithmic signals:</p>
                    <ul>
                      <li><strong>Consolidation:</strong> Reduced active campaigns from 45 to 8, consolidating learning and budget.</li>
                      <li><strong>Search Term Control:</strong> Implemented a rigorous negative keyword strategy to funnel traffic to the correct ad groups.</li>
                      <li><strong>Creative Testing Loop:</strong> Established a weekly cadence for testing new creative angles in isolated environments before rolling them out to scaling campaigns.</li>
                      <li><strong>Value-Based Bidding:</strong> Shifted from tCPA to tROAS bidding, feeding offline conversion data back into the platform to optimize for high-LTV customers.</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
                    <TrendingUp className="text-yellow-400" /> The Results
                  </h2>
                  <div className="prose prose-invert prose-lg max-w-none text-white/70 mb-8">
                    <p>Within 90 days, the new structure stabilized performance, allowing us to safely scale spend while actually improving efficiency.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
                      <div className="text-4xl font-display font-bold text-yellow-400 mb-2">3.4x</div>
                      <div className="text-sm text-white/60 uppercase tracking-wider font-medium">Blended ROAS</div>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
                      <div className="text-4xl font-display font-bold text-yellow-400 mb-2">300%</div>
                      <div className="text-sm text-white/60 uppercase tracking-wider font-medium">Spend Increase</div>
                    </div>
                  </div>

                  <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center p-8">
                    {/* Placeholder for a chart */}
                    <div className="w-full h-full border-b-2 border-l-2 border-white/20 relative flex items-end">
                      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-yellow-400/20 to-transparent" />
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polyline 
                          points="0,90 20,80 40,85 60,50 80,30 100,10" 
                          fill="none" 
                          stroke="#facc15" 
                          strokeWidth="3" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                        />
                      </svg>
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-32 p-8 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-display font-bold mb-6">Key Takeaways</h3>
              <ul className="space-y-4">
                {(id === '1' ? [
                  "Complexity is the Enemy of Scale. Let the machine do the targeting.",
                  "The Ad is the Targeting. Your 'Hook' determines who sees the ad.",
                  "Feed the Machine High-Quality Data. CAPI and Pixel health are non-negotiable.",
                  "Broad targeting + Creative diversification = Profitable Scale."
                ] : id === '3' ? [
                  "Don't Guess, Test. Every market has different 'Hero Products'.",
                  "Localization is More Than Currency. It's about the 'Hook' and cultural vibe.",
                  "Trust is the Biggest Barrier. Make logistics your biggest selling point.",
                  "Localized creative can triple engagement rates."
                ] : id === '4' ? [
                  "If you don’t generate 25–50 conversions per ad set weekly, consolidate.",
                  "If your CPA rises slowly over time, assume creative fatigue.",
                  "If you rely only on Pixel tracking, you are underfeeding the algorithm.",
                  "Scaling starts with signal clarity and creative volume."
                ] : id === '2' ? [
                  "Kill category keywords. Target competitor & pain-driven queries.",
                  "Add friction to forms. Mandatory work email is a must.",
                  "Track SQL, not MQL. Sales time is too expensive for junk leads.",
                  "Qualification must happen before the demo call."
                ] : id === '5' ? [
                  "High-ticket offers demand multi-touch persuasion.",
                  "Segment by behavior, not demographics.",
                  "60%+ of launch revenue happens in final 48 hours.",
                  "Cart abandonment is not loss — it is deferred revenue.",
                  "Synchronization > Volume."
                ] : id === '6' ? [
                  "Optimization shifted from clicks → booked appointments.",
                  "Distance was treated as a bidding variable.",
                  "CRM data trained the algorithm on real revenue events.",
                  "Broad informational waste was eliminated."
                ] : [
                  "Structure dictates scale.",
                  "Consolidation feeds the algorithm.",
                  "Testing must be isolated.",
                  "Data integrity is non-negotiable."
                ]).map((takeaway, i) => (
                  <li key={i} className="flex gap-3 text-white/80">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-sm text-white/60 mb-4">
                  {id === '1' ? "Ready to scale your D2C brand to the next level?" : id === '3' ? "Planning an international expansion?" : id === '4' ? "Want similar results for your Meta account?" : id === '5' ? "Want to build a launch engine like this?" : id === '6' ? "Ready to dominate your local market?" : id === '2' ? "Want a high-intent lead engine for your SaaS?" : "Facing similar scaling issues?"}
                </p>
                <Link href="/contact" className="w-full py-4 bg-yellow-400 text-black rounded-full font-bold text-center block hover:bg-yellow-300 transition-colors">
                  Apply for Strategy Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
