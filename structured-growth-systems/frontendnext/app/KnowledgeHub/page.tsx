"use client";
import React from 'react';
import { motion } from 'motion/react';
import { 
  Book, 
  Search, 
  TrendingUp, 
  Zap, 
  Shield, 
  ArrowRight, 
  CheckCircle2,
  Layers,
  Target,
  BarChart3
} from 'lucide-react';
import SEO from '@/components/SEO';
import Link from 'next/link';
import Books from '../Books/page';


const clusters = [
  {
    title: "Google Ads Architecture",
    desc: "How to structure accounts for maximum algorithmic control and search term isolation.",
    topics: [
      "Alpha/Beta Campaign Structure",
      "Smart Bidding Training Data",
      "Negative Keyword Sculpting",
      "Performance Max Incrementality",
      "Search Term Isolation Techniques"
    ]
  },
  {
    title: "Meta Ads Scaling",
    desc: "Frameworks for creative testing, budget management, and horizontal expansion.",
    topics: [
      "Modular Creative Testing",
      "Account Consolidation (CBO/Advantage+)",
      "Scaling Rules & Automation",
      "Creative Fatigue Detection",
      "Post-iOS14 Attribution Fixes"
    ]
  },
  {
    title: "Growth Economics",
    desc: "The math behind profitable scaling. CAC, LTV, and Contribution Margin.",
    topics: [
      "Break-Even ROAS Modeling",
      "Payback Period Optimization",
      "Contribution Margin Analysis",
      "LTV Prediction Models",
      "Channel Profitability Mapping"
    ]
  }
];

export default function KnowledgeHub() {
  return (
    <div className="w-full pt-32  px-6 max-w-7xl mx-auto">
      <SEO 
        title="Performance Marketing Knowledge Hub | Topical Authority"
        description="The definitive resource for performance marketing strategy, account architecture, and growth economics. Building topical authority in digital acquisition."
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-fit mb-8">
          <Book className="w-4 h-4 text-brand-orange" />
          <span className="text-sm font-medium tracking-wide text-white/80 uppercase">
            Topical Authority — Knowledge Hub
          </span>
        </div>
        <h1 className="text-5xl md:text-8xl font-display font-bold leading-tight mb-8">
          The Growth <br/><span className="text-gradient-orange">Knowledge Hub</span>
        </h1>
        <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
          A structured repository of performance marketing intelligence. We don't just share tips; we document the systems that control millions in ad spend.
        </p>
      </motion.div>

      {/* Topic Clusters */}
      <div className="grid lg:grid-cols-3 gap-8 mb-40">
        {clusters.map((cluster, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-10 rounded-[40px] animated-border-card bg-white/5 border border-white/10 hover:border-brand-orange/30 transition-all flex flex-col"
          >
            <h2 className="text-2xl font-display font-bold mb-4">{cluster.title}</h2>
            <p className="text-white/40 text-sm mb-8 flex-grow">{cluster.desc}</p>
            
            <ul className="space-y-4 mb-10">
              {cluster.topics.map((topic, j) => (
                <li key={j} className="flex gap-3 text-sm text-white/80 items-start group cursor-pointer hover:text-brand-orange transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>

            <Link href="/Blog" className="text-sm font-bold flex items-center gap-2 text-white hover:text-brand-orange transition-colors">
              Explore Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Proof-Based Section - Case Study Integration */}
      <section className="mb-40">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-grow bg-white/10" />
          <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-white/40">Proof of Concept — Real Economics</h2>
          <div className="h-px flex-grow bg-white/10" />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-10 rounded-3xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-brand-orange" />
              <h3 className="text-2xl font-bold">SaaS Scaling Proof</h3>
            </div>
            <p className="text-white/60 mb-8">
              How we scaled a B2B SaaS from $10k to $100k monthly spend while maintaining a 4:1 LTV:CAC ratio.
            </p>
            <Link href="/case-studies/ecommerce-scaling" className="text-brand-orange font-bold flex items-center gap-2">
              View Case Study <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="p-10 rounded-3xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-brand-orange" />
              <h3 className="text-2xl font-bold">Clinic Acquisition Proof</h3>
            </div>
            <p className="text-white/60 mb-8">
              Reducing patient acquisition cost by 72% for a London-based private clinic using search intent isolation.
            </p>
            <Link href="/insights" className="text-brand-orange font-bold flex items-center gap-2">
              View Insight <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Snippet Optimized Section - Definitions */}
      <section className="mb-40">
        <div className="p-12 md:p-20 rounded-[40px] bg-gradient-to-br from-brand-orange/10 to-transparent border border-brand-orange/20">
          <h2 className="text-3xl font-display font-bold mb-12">Core Concepts Defined</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-brand-orange">What is Structured Growth?</h3>
              <p className="text-white/60 leading-relaxed">
                Structured Growth is a performance marketing methodology that focuses on building platform-agnostic acquisition systems. It prioritizes account architecture, data integrity, and economic control over platform-specific "hacks."
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-brand-orange">What is Account Architecture?</h3>
              <p className="text-white/60 leading-relaxed">
                Account Architecture refers to the logical organization of campaigns, ad groups, and creatives within an advertising platform. A superior architecture isolates variables, minimizes overlap, and provides the algorithm with clean signals for optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Linking - Authority Sculpting */}
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <Link href="/audit" className="btn-glow px-8 py-4 bg-brand-orange text-white rounded-full font-bold text-center">
          Get a Strategic Audit
        </Link>
        <Link href="/architecture" className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-bold text-center hover:bg-white/10 transition-colors">
          View Growth Architecture
        </Link>
      </div>
      <Books/>
    </div>
  );
}
