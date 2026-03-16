import React, { lazy } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  Target,
  Zap,
  LayoutTemplate,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Blog Articles


export default function MetaAdsTargetingStrategy() {
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
            <Users className="w-4 h-4 text-brand-orange" />
            <span className="text-sm font-medium tracking-wide text-white/80 uppercase">
              Audience Engineering
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-bold leading-tight mb-8">
            Meta Ads <span className="text-gradient-orange">Targeting Strategy</span>: Beyond Interests and Lookalikes
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
            <div className="text-xs text-white/40 font-mono">10 Min Read</div>
          </div>

          <div className="prose prose-invert max-w-none text-white/60 leading-relaxed space-y-8 text-lg">
            <p>
              The days of "interest-stacking" and hyper-granular targeting are over. In the modern Meta Ads landscape, <strong>Broad Targeting</strong> is the most powerful tool in your arsenal—if you know how to use it.
            </p>
            
            <h2 className="text-3xl font-display font-bold text-white mt-12">The Shift to Algorithm-Led Targeting</h2>
            <p>
              Meta's AI is now smarter than any human advertiser. When you give the algorithm a broad audience (Age, Gender, Location), it uses the <strong>creative</strong> to find the right people. This is why "Creative is the Targeting."
            </p>
            <p>
              If your ad features a high-end watch, the algorithm will naturally show it to people who have shown interest in luxury goods, even if you don't explicitly target them.
            </p>

            <h2 className="text-3xl font-display font-bold text-white mt-12">The 3 Pillars of Modern Targeting</h2>
            <ul className="space-y-4 list-none p-0">
              <li className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center border border-brand-orange/20 shrink-0">
                  <Target className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <strong className="text-white block mb-1">Broad Targeting (No Interests):</strong>
                  Letting the pixel do the work. This is the most scalable approach for high-budget campaigns.
                </div>
              </li>
              <li className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center border border-brand-orange/20 shrink-0">
                  <Users className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <strong className="text-white block mb-1">Lookalike Audiences (LAL):</strong>
                  Still effective for seed data, but becoming less critical as Broad targeting matures. Use 1%, 3%, and 5% LALs for testing.
                </div>
              </li>
              <li className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center border border-brand-orange/20 shrink-0">
                  <Zap className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <strong className="text-white block mb-1">Advantage+ Shopping (ASC):</strong>
                  Meta's fully automated solution for ecommerce. Great for scaling but offers less control over creative testing.
                </div>
              </li>
            </ul>

            <div className="p-10 rounded-[40px] bg-brand-orange/10 border border-brand-orange/20 my-16">
              <h3 className="text-2xl font-display font-bold mb-4 text-brand-orange">Pro Tip</h3>
              <p className="text-white/80 mb-6">
                Targeting is only as good as the data you feed it. Without a proper server-side tracking setup (CAPI), your algorithm is flying blind. Check our <Link to="/services/facebook-ads-agency" className="text-brand-orange underline">Facebook Ads Agency</Link> page for tracking implementation details.
              </p>
            </div>

            <h2 className="text-3xl font-display font-bold text-white mt-12">When to Use Interest Targeting</h2>
            <p>
              Interest targeting is still useful in two scenarios:
            </p>
            <ol className="space-y-4">
              <li><strong>New Accounts:</strong> When you have zero pixel data and need to give the algorithm a "nudge" in the right direction.</li>
              <li><strong>Niche Markets:</strong> When your product is so specific that broad targeting might take too long to find the right pocket of users.</li>
            </ol>

            <h2 className="text-3xl font-display font-bold text-white mt-12">Conclusion</h2>
            <p>
              Stop trying to outsmart the machine. Focus on high-quality creative and clean data signals, and let Meta's broad targeting do the heavy lifting for your scale.
            </p>
          </div>

          {/* Internal Linking - Ranking Acceleration */}
          <div className="mt-20 pt-20 border-t border-white/5">
            <h4 className="text-sm font-mono uppercase tracking-[0.3em] text-white/40 mb-8">Related Strategy Resources</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <Link to="/blog/meta-ads-creative-testing" className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-all group">
                <div className="text-brand-orange font-bold text-[10px] uppercase tracking-widest mb-2">Pillar Guide</div>
                <h5 className="text-lg font-bold group-hover:text-brand-orange transition-colors">Meta Ads Creative Testing Guide: The Modular Framework</h5>
              </Link>
              <Link to="/services/meta-ads-agency" className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-all group">
                <div className="text-brand-orange font-bold text-[10px] uppercase tracking-widest mb-2">Service</div>
                <h5 className="text-lg font-bold group-hover:text-brand-orange transition-colors">Meta Ads Agency: Structured Growth Architecture</h5>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
