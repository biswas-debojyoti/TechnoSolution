import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Search, 
  Target, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  Globe, 
  BarChart3,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MarketingDiagnosisOffer from '../components/MarketingDiagnosisOffer';

const offers = [
  {
    id: "search",
    title: "Search Growth System",
    subtitle: "For companies that need traffic and search visibility.",
    positioning: "Dominate search results and capture high-intent traffic.",
    price: "Starting from $1000 / month",
    icon: Search,
    includes: [
      "SEO strategy",
      "Technical SEO",
      "Content growth system",
      "Keyword ranking strategy"
    ],
    bestFor: [
      "Businesses building search visibility",
      "Early-stage brands",
      "Companies needing SEO traffic"
    ]
  },
  {
    id: "lead-gen",
    title: "Lead Generation System",
    subtitle: "For companies that need customers quickly.",
    positioning: "Turn ad spend into predictable lead generation.",
    price: "Starting from $2000 / month + ad spend",
    icon: Target,
    isPopular: true,
    includes: [
      "Google Ads",
      "Meta Ads",
      "LinkedIn Ads",
      "Landing pages",
      "Conversion tracking"
    ],
    bestFor: [
      "Businesses that need consistent leads",
      "Clinics, real estate, B2B companies",
      "Brands running paid acquisition"
    ]
  },
  {
    id: "scaling",
    title: "Revenue Scaling System",
    subtitle: "For businesses already running marketing but not scaling.",
    positioning: "Scale profitable campaigns without increasing acquisition costs.",
    price: "Custom growth pricing",
    icon: TrendingUp,
    includes: [
      "Paid media optimization",
      "Funnel optimization",
      "Conversion rate optimization",
      "Growth analytics"
    ],
    bestFor: [
      "Businesses already running ads",
      "Companies scaling to $50k–$500k/month revenue"
    ]
  },
  {
    id: "infrastructure",
    title: "Growth Infrastructure",
    subtitle: "A complete revenue growth system for scaling companies.",
    positioning: "A complete revenue growth engine for scaling businesses.",
    price: "Strategy call required",
    icon: Zap,
    isPremium: true,
    includes: [
      "Full SEO & Performance Marketing",
      "End-to-end Conversion Funnel",
      "Website & Speed Optimization",
      "Advanced Analytics System"
    ],
    bestFor: [
      "High-growth startups",
      "Companies needing full growth infrastructure"
    ]
  }
];

const industries = ["Real Estate", "Health Clinics", "Cosmetic Brands", "Ecommerce", "SaaS"];


export default function GrowthOffers() {
  return (
    <div className="w-full pt-20 pb-40">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden text-center">
        <div className="absolute inset-0 bg-brand-orange/5 blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-fit mb-8">
              <Zap className="w-4 h-4 text-brand-orange" />
              <span className="text-sm font-medium tracking-wide text-white/80 uppercase">
                Acquisition Systems
              </span>
            </div>
            <h1 className="text-5xl md:text-8xl font-display font-bold leading-tight mb-8">
              Core <span className="text-gradient-orange">Growth Offers</span>
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-12">
              Choose the acquisition system that fits your growth stage. Each offer is designed to generate measurable business outcomes.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link to="/work-with-me" className="btn-premium px-12 py-6 text-xl group w-full sm:w-auto">
                Book Strategy Call
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <p className="text-white/40 text-sm italic">
                We work with a limited number of growth partners each quarter to maintain performance.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Growth Offers Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {offers.map((offer, i) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-10 md:p-12 rounded-[40px] animated-border-card border border-white/10 relative overflow-hidden flex flex-col ${
                  offer.isPremium ? 'bg-gradient-to-br from-brand-orange/10 to-transparent' : 'bg-black/40'
                }`}
              >
                {offer.isPopular && (
                  <div className="absolute top-8 right-8 px-4 py-1 rounded-full bg-brand-orange text-black text-[10px] font-bold uppercase tracking-widest">
                    ⭐ Most Popular
                  </div>
                )}
                {offer.isPremium && (
                  <div className="absolute top-8 right-8 px-4 py-1 rounded-full bg-brand-orange text-black text-[10px] font-bold uppercase tracking-widest">
                    🔥 Premium
                  </div>
                )}
                
                <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center mb-8">
                  <offer.icon className="w-8 h-8 text-brand-orange" />
                </div>
                
                <h3 className="text-3xl font-display font-bold mb-2">{offer.title}</h3>
                <p className="text-brand-orange/80 text-sm font-medium mb-6 uppercase tracking-wider">{offer.subtitle}</p>
                
                <div className="mb-8">
                  <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-2">Investment</div>
                  <div className="text-2xl font-bold text-white">{offer.price}</div>
                </div>

                <div className="mb-10">
                  <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-4">Best For:</div>
                  <ul className="space-y-3">
                    {offer.bestFor.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-white/80 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 border-t border-white/5 mt-auto">
                  <div className="mb-8">
                    <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-4">Includes:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {offer.includes.map((item, j) => (
                        <div key={j} className="flex items-center gap-2 text-white/40 text-xs">
                          <div className="w-1 h-1 rounded-full bg-brand-orange" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link to="/work-with-me" className="btn-premium w-full py-5 text-lg group">
                    Book Free Business Consultation
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Conversion Trigger Section */}
      <section className="py-24">
        <MarketingDiagnosisOffer />
      </section>

      {/* 4. Proof Section */}
      <section className="py-32 px-6 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-orange/5 blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { label: "Monthly Ad Spend Managed", value: "₹70L+", icon: BarChart3 },
              { label: "Global Market Reach", value: "India, UK, USA", icon: Globe },
              { label: "Campaigns Launched", value: "100+", icon: ShieldCheck }
            ].map((stat, i) => (
              <div key={i} className="p-8">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mx-auto mb-6">
                  <stat.icon className="w-6 h-6 text-brand-orange" />
                </div>
                <div className="text-4xl font-display font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/40 uppercase tracking-widest font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Lead Capture (Ribbon Format) */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Ribbon Background */}
            <div className="absolute inset-0 bg-brand-orange rounded-[48px] blur-3xl opacity-10" />
            
            <div className="relative bg-gradient-to-r from-brand-orange to-orange-600 p-[1px] rounded-[48px]">
              <div className="bg-black rounded-[47px] p-12 md:p-24 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-12 opacity-5">
                  <BarChart3 className="w-64 h-64 text-brand-orange" />
                </div>
                
                <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-orange/20 bg-brand-orange/10 backdrop-blur-sm w-fit mb-8">
                      <span className="text-sm font-bold tracking-wide text-brand-orange uppercase">
                        Limited Availability
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                      Free <span className="text-brand-orange">Growth Audit</span>
                    </h2>
                    <p className="text-xl text-white/60 mb-12 leading-relaxed">
                      Get a 10-minute analysis of your current marketing system and discover the biggest opportunities to increase leads and revenue.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {industries.map((ind) => (
                        <span key={ind} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold text-white/40 uppercase tracking-widest">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                    <form className="grid sm:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Name</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Work Email</label>
                        <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors" placeholder="john@company.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Website</label>
                        <input type="url" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors" placeholder="https://brand.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Monthly Ad Spend</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors appearance-none">
                          <option className="bg-black">Select Range</option>
                          <option className="bg-black">$0 - $5k</option>
                          <option className="bg-black">$5k - $20k</option>
                          <option className="bg-black">$20k - $50k</option>
                          <option className="bg-black">$50k+</option>
                        </select>
                      </div>
                      <button type="submit" className="btn-premium sm:col-span-2 py-5 text-lg group">
                        Request Audit <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="py-40 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Ready to Build Your Growth Engine?</h2>
          <p className="text-xl text-white/60 mb-12 leading-relaxed">
            Don't leave your revenue to chance. Partner with a strategist who understands the fundamental architecture of scale.
          </p>
          <Link to="/work-with-me" className="btn-premium px-12 py-6 text-xl">
            Book Your Strategy Call
          </Link>
        </div>
      </section>
    </div>
  );
}
