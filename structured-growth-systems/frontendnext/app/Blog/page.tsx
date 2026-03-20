"use client";
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  ArrowRight, 
  BookOpen, 
  TrendingUp, 
  Target, 
  Zap, 
  ChevronRight, 
  Mail, 
  Globe, 
  ShieldCheck,
  Filter
} from 'lucide-react';

const categories = [
  {
    name: "Performance Marketing",
    sub: ["Google Ads", "Meta Ads", "Paid Media Strategy"],
    icon: TrendingUp
  },
  {
    name: "SEO & Search Visibility",
    sub: ["SEO Strategy", "Search Ranking", "Content Systems"],
    icon: Search
  },
  {
    name: "Lead Generation",
    sub: ["Funnel Optimization", "Conversion Systems", "Customer Acquisition"],
    icon: Target
  },
  {
    name: "Industry Growth",
    sub: ["Real Estate", "Health Clinics", "Ecommerce", "SaaS"],
    icon: Globe
  }
];

const latestArticles = [
  {
    title: "Meta Ads Creative Testing Guide: The Modular Framework for Scale",
    excerpt: "The algorithm is now the creative. Learn how to build modular testing systems that identify winning psychological triggers before you scale.",
    category: "Meta Ads",
    date: "March 12, 2026",
    readTime: "15 min read",
    slug: "meta-ads-creative-testing"
  },
  {
    title: "Meta Ads Funnel Strategy: Mapping the Path to Conversion",
    excerpt: "Stop asking for a marriage on the first date. Discover the 3-stage funnel architecture that nurtures cold traffic into high-LTV customers.",
    category: "Meta Ads",
    date: "March 12, 2026",
    readTime: "12 min read",
    slug: "meta-ads-funnel-strategy"
  },
  {
    title: "Meta Ads Targeting Strategy: Beyond Interests and Lookalikes",
    excerpt: "The shift to algorithm-led targeting. Why broad targeting is the most powerful tool in your arsenal and how to use it correctly.",
    category: "Meta Ads",
    date: "March 12, 2026",
    readTime: "10 min read",
    slug: "meta-ads-targeting-strategy"
  },
  {
    title: "How to Turn Google Ads Into a Predictable Lead Generation System",
    excerpt: "Most companies burn ad budgets chasing random clicks. Learn the structured Google Ads framework that turns paid traffic into consistent leads.",
    category: "Google Ads",
    date: "March 8, 2026",
    readTime: "15 min read",
    slug: "google-ads-lead-generation-system"
  },
  {
    title: "SEO vs Paid Ads: Which One Drives Better ROI?",
    excerpt: "The ultimate comparison for scaling businesses. We break down the unit economics of both channels.",
    category: "Strategy",
    date: "March 8, 2026",
    readTime: "12 min read",
    slug: "seo-vs-paid-ads-roi"
  },
  {
    title: "The 2026 Guide to B2B Lead Generation Systems",
    excerpt: "Stop chasing leads. Build a system that attracts them. A deep dive into modern B2B acquisition architecture.",
    category: "Lead Gen",
    date: "March 8, 2026",
    readTime: "15 min read",
    slug: "b2b-lead-generation-systems-guide"
  },
  {
    title: "Why Most Marketing Agencies Fail to Scale Campaigns",
    excerpt: "Scaling isn't just about increasing budget. It's about structural integrity. Here's what's missing in most accounts.",
    category: "Performance",
    date: "March 8, 2026",
    readTime: "10 min read",
    slug: "why-marketing-campaigns-fail-to-scale"
  },
  {
    title: "The Problem With Random Lead Generation",
    excerpt: "Many B2B companies rely on scattered tactics that create an unstable pipeline. Discover why predictable growth requires a system.",
    category: "Lead Gen",
    date: "March 8, 2026",
    readTime: "8 min read",
    slug: "problem-with-random-lead-generation"
  },
  {
    title: "Why Your Google Ads Campaign Is Generating Clicks But No Customers",
    excerpt: "If your Google Ads campaigns generate traffic but not customers, the issue is usually structural. Learn the key reasons campaigns fail to convert.",
    category: "Performance",
    date: "March 8, 2026",
    readTime: "7 min read",
    slug: "google-ads-clicks-no-customers"
  },
  {
    title: "The 5 Biggest Mistakes That Kill Google Ads ROI",
    excerpt: "Many Google Ads campaigns waste budget due to structural mistakes. Here are the five most common issues that reduce advertising ROI.",
    category: "Performance",
    date: "March 8, 2026",
    readTime: "9 min read",
    slug: "biggest-google-ads-roi-mistakes"
  },
  {
    title: "When Should a Business Hire a Marketing Agency?",
    excerpt: "Hiring a marketing agency can accelerate growth, but timing matters. Here are the signs your business is ready for external expertise.",
    category: "Strategy",
    date: "March 8, 2026",
    readTime: "8 min read",
    slug: "when-to-hire-marketing-agency"
  }
];

const popularGuides = [
  {
    title: "Complete Guide to Google Ads Lead Generation",
    desc: "The exact framework we use to manage $500k+ in monthly spend.",
    icon: Zap
  },
  {
    title: "The Ultimate SEO Strategy for High-Growth Companies",
    desc: "How to build a content engine that ranks for high-intent keywords.",
    icon: Search
  },
  {
    title: "Paid Media Scaling Framework for $1M+ Businesses",
    desc: "Advanced capital deployment strategies for market leaders.",
    icon: TrendingUp
  }
];

import MarketingDiagnosisOffer from '@/components/MarketingDiagnosisOffer';
import Link from 'next/link';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full pt-20 pb-40">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-brand-orange/5 blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-fit mb-8">
              <BookOpen className="w-4 h-4 text-brand-orange" />
              <span className="text-sm font-medium tracking-wide text-white/80 uppercase">
                The Growth Journal
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              Growth Insights for <br/><span className="text-gradient-orange">Modern Businesses</span>
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-12">
              Actionable strategies on SEO, paid media, and customer acquisition to help businesses scale predictable revenue.
            </p>
            
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 mb-12">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input 
                  type="text"
                  placeholder="Search marketing insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-brand-orange transition-colors"
                />
              </div>
              <Link href="/contact" className="btn-premium px-8 py-4 whitespace-nowrap">
                Get Free Growth Audit
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Featured Article */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-16 rounded-[40px] animated-border-card border border-white/10 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-brand-orange/5 blur-[100px] -z-10" />
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-[10px] font-bold text-brand-orange uppercase tracking-widest">
                    Featured Article
                  </span>
                  <span className="text-white/40 text-xs font-mono">15 Min Read</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
                  How to Turn Google Ads Into a <span className="text-gradient-orange">Predictable Lead Generation System</span>
                </h2>
                <p className="text-lg text-white/60 leading-relaxed">
                  Most companies waste thousands on ads without a real acquisition system. Here’s the framework high-growth companies use to scale leads consistently without increasing CAC.
                </p>
                <Link href="/blog/google-ads-lead-generation-system" className="btn-premium inline-flex items-center gap-3 px-8 py-4 group">
                  Read Article <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
              <div className="aspect-video rounded-3xl bg-white/5 border border-white/10 overflow-hidden relative">
                <img 
                  src="https://picsum.photos/seed/ads/1200/800" 
                  alt="Google Ads Strategy" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Categories */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-display font-bold">Strategic Categories</h2>
            <div className="flex items-center gap-2 text-white/40 text-sm font-mono">
              <Filter className="w-4 h-4" /> Filter by Expertise
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl animated-border-card bg-white/5 border border-white/10 hover:border-brand-orange/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <cat.icon className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-xl font-bold mb-4">{cat.name}</h3>
                <ul className="space-y-2">
                  {cat.sub.map((s, j) => (
                    <li key={j} className="text-sm text-white/40 hover:text-brand-orange transition-colors cursor-pointer flex items-center gap-2">
                      <ChevronRight className="w-3 h-3" /> {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Latest Articles */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-display font-bold">Latest Articles</h2>
            <Link href="#" className="text-brand-orange text-sm font-bold flex items-center gap-2 hover:underline">
              View All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {latestArticles.map((article, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl animated-border-card bg-white/5 border border-white/10 hover:border-brand-orange/30 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest px-2 py-1 bg-brand-orange/10 rounded">
                    {article.category}
                  </span>
                  <span className="text-xs text-white/40 font-mono">{article.date}</span>
                </div>
                <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-brand-orange transition-colors">
                  {article.title}
                </h3>
                <p className="text-white/60 text-sm mb-8 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-xs text-white/40 font-mono italic">{article.readTime}</span>
                  <Link 
                    href={article.slug ? `/blog/${article.slug}` : "#"} 
                    className="text-sm font-bold flex items-center gap-2 text-white group-hover:text-brand-orange transition-colors"
                  >
                    Read More <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Popular Guides */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="p-12 md:p-20 rounded-[40px] bg-white/[0.02] border border-white/5">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">High-Value Growth Guides</h2>
              <p className="text-white/40 max-w-2xl mx-auto">Long-form strategic frameworks for businesses ready to dominate their market.</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {popularGuides.map((guide, i) => (
                <div key={i} className="p-8 rounded-2xl animated-border-card bg-black/40 border border-white/5 hover:border-brand-orange/30 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-6">
                    <guide.icon className="w-6 h-6 text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{guide.title}</h3>
                  <p className="text-sm text-white/40 mb-8 leading-relaxed">{guide.desc}</p>
                  <Link href="#" className="text-brand-orange text-sm font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                    Download Guide <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Lead Magnet CTA */}
      <section className="py-24">
        <MarketingDiagnosisOffer />
      </section>

      {/* 7. Newsletter */}
      <section className="px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center mx-auto mb-8">
            <Mail className="w-8 h-8 text-brand-orange" />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Join 1500+ growth strategists</h2>
          <p className="text-white/40 mb-10">Get your weekly breakdown of performance marketing</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-grow bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-brand-orange transition-colors"
            />
            <button className="btn-premium px-8 py-4 whitespace-nowrap">
              Subscribe
            </button>
          </form>
          <p className="text-[10px] text-white/20 mt-6 uppercase tracking-widest">No spam. Just high-signal growth data.</p>
        </div>
      </section>
    </div>
  );
}

