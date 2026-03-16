import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  Target,
  Zap,
  LayoutTemplate
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MetaAdsCreativeTesting() {
  return (
    <div className="w-full pt-32 pb-40 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-white/40 hover:text-brand-orange transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Journal
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-fit mb-8">
            <LayoutTemplate className="w-4 h-4 text-brand-orange" />
            <span className="text-sm font-medium tracking-wide text-white/80 uppercase">
              Creative Strategy
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-bold leading-tight mb-8">
            Meta Ads <span className="text-gradient-orange">Creative Testing Guide</span>: The Modular Framework for Scale
          </h1>
          
          <div className="flex items-center gap-6 mb-12 pb-12 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center border border-brand-orange/20">
                <span className="text-brand-orange font-bold text-xs">SS</span>
              </div>
              <div>
                <div className="text-sm font-bold">Sayad Shahid</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest">Growth Architect</div>
              </div>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="text-xs text-white/40 font-mono">15 Min Read</div>
          </div>

          <div className="prose prose-invert max-w-none text-white/60 leading-relaxed space-y-8 text-lg">
            <p>
              In the post-iOS14 era, the algorithm is no longer the primary driver of performance. The <strong>creative</strong> is the algorithm. If your creative fails to resonate, no amount of "hacking" the targeting will save your ROAS.
            </p>
            
            <h2 className="text-3xl font-display font-bold text-white mt-12">The Problem with Traditional Creative Production</h2>
            <p>
              Most brands treat creative as an art project. They spend thousands on a single high-production video, launch it, and hope for the best. When it fails, they have no idea <em>why</em> it failed. Was it the hook? The offer? The visual style?
            </p>
            <p>
              This is what we call the "Creative Lottery." It's erratic, expensive, and impossible to scale.
            </p>

            <h2 className="text-3xl font-display font-bold text-white mt-12">The Modular Testing Framework</h2>
            <p>
              To scale predictably, you need a scientific approach. We use a <strong>Modular Testing Framework</strong> that breaks every ad down into three core components:
            </p>
            <ul className="space-y-4 list-none p-0">
              <li className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center border border-brand-orange/20 shrink-0">
                  <Target className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <strong className="text-white block mb-1">The Hook (0-3 Seconds):</strong>
                  The primary job of the hook is to stop the scroll. We test 10+ hooks for every winning angle.
                </div>
              </li>
              <li className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center border border-brand-orange/20 shrink-0">
                  <Zap className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <strong className="text-white block mb-1">The Body (The Angle):</strong>
                  This is the psychological trigger. Are you solving a pain point? Offering a benefit? Using social proof?
                </div>
              </li>
              <li className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center border border-brand-orange/20 shrink-0">
                  <ArrowRight className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <strong className="text-white block mb-1">The CTA (The Destination):</strong>
                  Where are you sending them? What is the immediate next step?
                </div>
              </li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-white mt-12">How to Run a Sandbox Test</h2>
            <p>
              A "Sandbox" is a low-budget campaign designed purely for data gathering. Here's the process:
            </p>
            <ol className="space-y-4">
              <li><strong>Isolate the Variable:</strong> Only test one thing at a time (e.g., 5 different hooks with the same body).</li>
              <li><strong>Set a Data Ceiling:</strong> Run the test until you have 2,000 impressions or 50 clicks.</li>
              <li><strong>Analyze the Metrics:</strong> Look at Hook Rate (3s views / impressions) and Hold Rate (15s views / 3s views).</li>
              <li><strong>Graduate the Winner:</strong> Take the hook with the highest CTR and graduate it to your main scaling campaign.</li>
            </ol>

            <div className="p-10 rounded-[40px] bg-brand-orange/10 border border-brand-orange/20 my-16">
              <h3 className="text-2xl font-display font-bold mb-4 text-brand-orange">Internal Strategy Link</h3>
              <p className="text-white/80 mb-6">
                Creative testing is only one part of the system. To see how this fits into a full acquisition architecture, explore our <Link to="/services/meta-ads-agency" className="text-brand-orange underline">Meta Ads Agency</Link> services.
              </p>
            </div>

            <h2 className="text-3xl font-display font-bold text-white mt-12">Conclusion</h2>
            <p>
              Stop guessing. Start engineering. By modularizing your creative production and testing variables in a sandbox, you remove the "lottery" element from your Meta Ads and replace it with a predictable growth engine.
            </p>
          </div>

          {/* Internal Linking - Ranking Acceleration */}
          <div className="mt-20 pt-20 border-t border-white/5">
            <h4 className="text-sm font-mono uppercase tracking-[0.3em] text-white/40 mb-8">Related Strategy Resources</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <Link to="/blog/meta-ads-funnel-strategy" className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-all group">
                <div className="text-brand-orange font-bold text-[10px] uppercase tracking-widest mb-2">Next Article</div>
                <h5 className="text-lg font-bold group-hover:text-brand-orange transition-colors">Meta Ads Funnel Strategy: Mapping the Customer Journey</h5>
              </Link>
              <Link to="/case-studies/creative-testing-cpa" className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-all group">
                <div className="text-brand-orange font-bold text-[10px] uppercase tracking-widest mb-2">Case Study</div>
                <h5 className="text-lg font-bold group-hover:text-brand-orange transition-colors">How Creative Testing Reduced CPA By 40% for a SaaS Startup</h5>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
