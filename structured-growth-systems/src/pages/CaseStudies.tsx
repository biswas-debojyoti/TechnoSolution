import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const caseStudies = [
  {
    id: 1,
    bigMetric: <><span className="text-yellow-400">+312%</span> Revenue Growth in <span className="text-yellow-400">6</span> Months</>,
    title: "The Scale Blueprint: +312% Revenue Growth in 6 Months",
    metrics: { roas: "4.2x", revenue: "+312%", aov: "+12%" },
    desc: "Tripling revenue for a D2C apparel brand by moving from fragmented interest targeting to a consolidated 'Broad' strategy and UGC-first creative engine.",
    image: "https://www.gstatic.com/marketing-cms/assets/images/ads/2b/b5/8b6d1e964144bf793a641b690e5d/hero-image-em-ea-2x.png=n-w1600-h992-fcrop64=1,00000000ffffffff-rw"
  },
  {
    id: 2,
    bigMetric: <><span className="text-yellow-400">43%</span> Reduction in Cost Per Qualified Lead</>,
    title: "The Efficiency Engine: 43% Reduction in CPL for B2B SaaS",
    metrics: { cpa: "-45%", volume: "+210%", mqls: "450/mo" },
    desc: "A high-intent lead generation engine for B2B SaaS that reduced CPQL by 43% while increasing SQLs by 65% through firmographic gating and value-based bidding.",
    image: "https://drive.google.com/thumbnail?id=1ZLXUxj7CT9IheErolenruyarL_saB-yj&sz=w1000"
  },
  {
    id: 3,
    bigMetric: <><span className="text-yellow-400">£1.1M</span> Revenue Added Across <span className="text-yellow-400">2</span> Markets</>,
    title: "The Global Playbook: £1.1M Revenue Added Across 2 Markets",
    metrics: { markets: "UK & US", roas: "3.8x", revenue: "£1.1M+" },
    desc: "A phased rollout strategy for international expansion, overcoming cultural dissonance and logistics friction through localized architecture.",
    image: "https://drive.google.com/thumbnail?id=1e8r0iQdj4E-5Mk8gkTeBDn1ilkit-uxW&sz=w1000"
  },
  {
    id: 4,
    bigMetric: <>ROAS Increased from <span className="text-yellow-400">1.6x</span> to <span className="text-yellow-400">3.8x</span> in <span className="text-yellow-400">60</span> Days</>,
    title: "Breaking the Plateau: How We Revived a Stagnant Meta Ads Account in 30 Days",
    metrics: { roas: "2.8x -> 4.5x", spend: "$50k/mo", creatives: "Tested 120+" },
    desc: "A deep dive into account consolidation, hook-first creative testing, and signal strengthening to unlock profitable scale.",
    image: "https://drive.google.com/thumbnail?id=1_vjNOcJVc1J_tbX1AwxYpMIpgCgo7gTv&sz=w1000"
  },
  {
    id: 5,
    bigMetric: <><span className="text-yellow-400">$420K</span> Generated in <span className="text-yellow-400">14</span> Days</>,
    title: "$420K in 14 Days: The High-Ticket Launch Engine",
    metrics: { roas: "8x", revenue: "$1.2M", timeframe: "14 Days" },
    desc: "A behavior-driven omnichannel remarketing sequence that recovered 40% of lost revenue during a high-ticket product launch.",
    image: "https://drive.google.com/thumbnail?id=1isr0xCwHksBvixdj48Pvx2AGovniZSuf&sz=w1000"
  },
  {
    id: 6,
    bigMetric: <><span className="text-yellow-400">+286%</span> Increase in Qualified Leads</>,
    title: "Local Service Domination: +286% Qualified Lead Surge in 60 Days",
    metrics: { leads: "+400%", cpl: "-60%", closeRate: "35%" },
    desc: "A hyper-local Google Ads engine focused on offline conversion tracking and micro-radius targeting for a multi-location clinic.",
    image: "https://drive.google.com/thumbnail?id=1aXMpJJ-SsK07YhTYR7tb0X-0Y8P3cRcn&sz=w1000"
  }
];

export default function CaseStudies() {
  return (
    <div className="w-full pt-32 pb-40 px-6 max-w-7xl mx-auto">
      <div className="max-w-3xl mb-20">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Case Studies</h1>
        <p className="text-xl text-white/60">
          Real numbers. Documented strategies. See how structured growth systems perform in the wild across different industries and markets.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {caseStudies.map((study, i) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={`/case-studies/${study.id}`} className="group block h-full flex flex-col">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-white/10 relative">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={study.image} 
                  alt={study.title} 
                  width="400"
                  height="300"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div className="flex-grow flex flex-col">
                <h2 className="text-3xl font-display font-bold text-white mb-4 leading-tight">
                  {study.bigMetric}
                </h2>
                <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-yellow-400 transition-colors">
                  {study.title}
                </h3>
                <p className="text-white/60 mb-6 flex-grow">{study.desc}</p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {Object.entries(study.metrics).map(([key, val]) => (
                    <div key={key} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-yellow-400 uppercase tracking-wider">
                      <span className="text-white/40 mr-2">{key}:</span>{val}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-yellow-400 transition-colors mt-auto">
                  Read Full Breakdown <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
