import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  Target,
  Zap,
  LayoutTemplate,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MetaAdsFunnelStrategy() {
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
            <Filter className="w-4 h-4 text-brand-orange" />
            <span className="text-sm font-medium tracking-wide text-white/80 uppercase">
              Funnel Architecture
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-bold leading-tight mb-8">
            Meta Ads <span className="text-gradient-orange">Funnel Strategy</span>: Mapping the Path to Conversion
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
            <div className="text-xs text-white/40 font-mono">12 Min Read</div>
          </div>

          <div className="prose prose-invert max-w-none text-white/60 leading-relaxed space-y-8 text-lg">
            <p>
              Most advertisers make the mistake of asking for a "marriage" on the first date. They run a direct-response ad to a cold audience and wonder why their CPA is $200.
            </p>
            <p>
              A <strong>Structured Funnel Strategy</strong> is about understanding the customer's state of awareness and providing the right information at the right time.
            </p>
            
            <h2 className="text-3xl font-display font-bold text-white mt-12">The 3 Stages of the Meta Ads Funnel</h2>
            <p>
              We break down the Meta ecosystem into three distinct layers, each with its own objective, creative style, and bidding strategy.
            </p>

            <h3 className="text-2xl font-display font-bold text-white mt-8">1. Top of Funnel (TOFU) - Awareness & Intent Harvesting</h3>
            <p>
              <strong>Objective:</strong> Stop the scroll and identify potential customers.
            </p>
            <p>
              At this stage, your audience doesn't know you. Your ads should focus on the <strong>problem</strong> you solve or the <strong>unique mechanism</strong> of your product. Use broad targeting to let the algorithm find the right people based on creative resonance.
            </p>

            <h3 className="text-2xl font-display font-bold text-white mt-8">2. Middle of Funnel (MOFU) - Consideration & Education</h3>
            <p>
              <strong>Objective:</strong> Build authority and handle objections.
            </p>
            <p>
              These are people who have engaged with your TOFU ads or visited your site but didn't convert. Show them social proof, case studies, and "how it works" content. You are moving them from "interested" to "convinced."
            </p>

            <h3 className="text-2xl font-display font-bold text-white mt-8">3. Bottom of Funnel (BOFU) - Conversion & Re-engagement</h3>
            <p>
              <strong>Objective:</strong> Close the deal.
            </p>
            <p>
              This is where you use high-urgency offers, discounts (if applicable), and clear CTAs. These are your "Add to Cart" or "Initiate Checkout" audiences. The goal is to remove the final friction point.
            </p>

            <div className="p-10 rounded-[40px] bg-brand-orange/10 border border-brand-orange/20 my-16">
              <h3 className="text-2xl font-display font-bold mb-4 text-brand-orange">Strategic Insight</h3>
              <p className="text-white/80 mb-6">
                A funnel is only as strong as its weakest link. If your BOAS is high but your conversion rate is low, the problem is likely your landing page architecture. Explore our <Link to="/services/performance-marketing-agency" className="text-brand-orange underline">Performance Marketing</Link> services for a full audit.
              </p>
            </div>

            <h2 className="text-3xl font-display font-bold text-white mt-12">The "Omnipresent" Retargeting Logic</h2>
            <p>
              Instead of just showing the same ad over and over, use <strong>Dynamic Retargeting</strong>. Show a testimonial video on Monday, a feature breakdown on Wednesday, and a limited-time offer on Friday. This creates an "omnipresent" feel without annoying the prospect.
            </p>

            <h2 className="text-3xl font-display font-bold text-white mt-12">Conclusion</h2>
            <p>
              Stop treating Meta Ads as a single-step process. By building a structured funnel that respects the customer journey, you'll see lower blended CPAs and higher long-term customer value.
            </p>
          </div>

          {/* Internal Linking - Ranking Acceleration */}
          <div className="mt-20 pt-20 border-t border-white/5">
            <h4 className="text-sm font-mono uppercase tracking-[0.3em] text-white/40 mb-8">Related Strategy Resources</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <Link to="/blog/meta-ads-creative-testing" className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-all group">
                <div className="text-brand-orange font-bold text-[10px] uppercase tracking-widest mb-2">Previous Article</div>
                <h5 className="text-lg font-bold group-hover:text-brand-orange transition-colors">Meta Ads Creative Testing Guide: The Modular Framework</h5>
              </Link>
              <Link to="/case-studies/meta-ads-roas" className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-all group">
                <div className="text-brand-orange font-bold text-[10px] uppercase tracking-widest mb-2">Case Study</div>
                <h5 className="text-lg font-bold group-hover:text-brand-orange transition-colors">How We Achieved 4.5x ROAS for a Global Health Brand</h5>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
