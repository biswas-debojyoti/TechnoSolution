"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import {
  ArrowRight,
  Search,
  Target,
  Zap,
  ShieldCheck,
  BarChart3,
  Globe,
  Cpu,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Users,
  Layers,
  MousePointer2,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DigitalAssetEngine } from "../web-design/page";

// --- Components ---



const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-noise pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-accent text-xs font-bold uppercase tracking-widest">
                Next-Gen SEO Infrastructure
              </span>
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest">
                AI-Powered Search (SGE) Ready
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold leading-[0.9] tracking-tighter mb-8">
              Your Website Isn’t Invisible. <br />
              <span className="text-white/40 italic">
                It’s Structurally Irrelevant to Google.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed mb-10">
              We rebuild your search presence into a demand-capturing system —
              so high-intent buyers find you before your competitors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 ">
              <Link href="/contact">
                <button className="bg-accent hover:bg-accent/90 text-black px-8 py-4 rounded-full text-lg text-white font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95">
                  Get SEO Growth Blueprint <ArrowRight size={20} />
                </button>
              </Link>
              <Link href="/contact">
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-full text-lg font-bold transition-all">
                  Audit My Website (Free)
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-3 text-white/40 text-sm font-medium">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#050505] bg-neutral-800 overflow-hidden"
                  >
                    <img
                      src={`https://picsum.photos/seed/user${i}/100/100`}
                      alt="User"
                      width={32}
                      height={32}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
              <p>
                Not “more traffic.” →{" "}
                <span className="text-white">Qualified search demand</span> that
                converts into pipeline.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <DigitalAssetEngine />

    </section>
  );
};

const PainPoints = () => {
  const points = [
    {
      title: "Traffic, but no revenue",
      desc: "You're getting clicks, but they're the wrong people. Wrong intent targeting kills ROI.",
      icon: <TrendingUp className="text-red-500" />,
    },
    {
      title: "Ranking, but not converting",
      desc: "There's no bridge between your content and your checkout. You're a library, not a business.",
      icon: <MousePointer2 className="text-orange-500" />,
    },
    {
      title: "Backlinks with no authority",
      desc: "Buying random links won't save you. Without authority structure, Google ignores your signals.",
      icon: <ShieldCheck className="text-blue-500" />,
    },
    {
      title: "Competitors outranking you",
      desc: "It's not because they're better, but because their technical system is tighter than yours.",
      icon: <AlertCircle className="text-accent" />,
    },
  ];

  return (
    <section className="py-10 bg-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Why Most SEO Fails <br />
            <span className="text-white/40">
              (And Why You’re Probably Experiencing It)
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((point, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-2">
                {point.icon}
              </div>
              <h3 className="text-xl font-bold">{point.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-8 border-l-4 border-accent bg-accent/5 rounded-r-3xl">
          <p className="text-2xl md:text-3xl font-display font-bold italic">
            &quot;SEO is not ranking pages. It’s controlling buyer intent across
            the search journey.&quot;
          </p>
        </div>
      </div>
    </section>
  );
};

const Reframe = () => {
  return (
    <section className="py-10 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
              SEO Is Not a Channel. <br />
              It’s an Acquisition Infrastructure.
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="text-accent font-display text-4xl font-bold opacity-20">
                  01
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Most agencies treat SEO as:
                  </h3>
                  <p className="text-white/40">
                    Keywords, generic blogs, and spammy backlinks.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-accent font-display text-4xl font-bold">
                  02
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-accent">
                    We treat it as:
                  </h3>
                  <ul className="grid grid-cols-2 gap-2 text-white/80">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-accent" /> Intent
                      Mapping
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-accent" />{" "}
                      Conversion Funnel
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-accent" />{" "}
                      Authority Stacking
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-accent" /> Demand
                      Capture
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="glass p-8 rounded-[40px] relative z-10">
              <div className="flex flex-col gap-4">
                {[
                  { label: "Search", color: "bg-blue-500" },
                  { label: "Intent", color: "bg-indigo-500" },
                  { label: "Page", color: "bg-purple-500" },
                  { label: "Conversion", color: "bg-blue-400" },
                  { label: "Revenue", color: "bg-green-500" },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center font-bold text-black`}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1 h-12 glass rounded-full flex items-center px-6 font-bold uppercase tracking-wider text-sm">
                      {step.label}
                    </div>
                    {i < 4 && (
                      <div
                        className="absolute left-[22px] top-[48px] w-[2px] h-8 bg-white/10"
                        style={{ transform: `translateY(${i * 64}px)` }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/10 blur-[100px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Architecture = () => {
  const pillars = [
    {
      title: "Search Intent Engineering",
      points: [
        "Not keywords → intent clusters",
        "Commercial vs informational",
        "SERP psychology decoding",
      ],
      output: "Pages that match buying mindset, not just queries",
      icon: <Target className="text-accent" />,
    },
    {
      title: "Content That Converts",
      points: [
        "BOFU money pages",
        "MOFU education layers",
        "Internal linking as funnel",
      ],
      output: "Traffic → leads (not traffic → bounce)",
      icon: <Layers className="text-blue-400" />,
    },
    {
      title: "Authority Flywheel",
      points: [
        "Contextual backlinks",
        "Topical authority stacking",
        "Digital PR signals",
      ],
      output: "Google trusts you faster",
      icon: <Cpu className="text-purple-400" />,
    },
    {
      title: "Technical + UX Layer",
      points: [
        "Crawl efficiency & SGE readiness",
        "Page speed optimization",
        "AI-powered search (SGE) alignment",
      ],
      output: "Rankings + AI search visibility",
      icon: <Zap className="text-yellow-400" />,
    },
  ];

  return (
    <section className="py-10 bg-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            The NEXZen SEO Architecture
          </h2>
          <p className="text-white/60 text-lg">
            Our 4-pillar system designed to turn your search presence into a
            revenue-generating asset.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="glass p-10 rounded-[40px] group hover:border-accent/30 transition-all"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <div className="text-white/10 font-display text-6xl font-bold">
                  0{idx + 1}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-6">{pillar.title}</h3>
              <ul className="space-y-3 mb-8">
                {pillar.points.map((p, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-white/10">
                <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
                  👉 Output
                </span>
                <p className="font-medium text-white/90">{pillar.output}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    {
      title: "Deep Audit",
      desc: "Not a checklist, but a forensic analysis of your current standing.",
    },
    {
      title: "Gap Analysis",
      desc: "Identifying exactly where your competitors are winning and why.",
    },
    {
      title: "Intent Mapping",
      desc: "Planning pages around how your customers actually search.",
    },
    {
      title: "Structure Build",
      desc: "Deploying the technical and content architecture.",
    },
    {
      title: "Authority Deployment",
      desc: "Building the trust signals Google needs to rank you.",
    },
    {
      title: "Optimization Loop",
      desc: "Continuous refinement based on real-world performance data.",
    },
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              How We Turn SEO Into Revenue
            </h2>
            <p className="text-white/60 text-lg">
              SEO is not a one-time setup. It’s a compounding system that grows
              stronger every month.
            </p>
          </div>
          <div className="flex items-center gap-2 text-accent font-bold">
            Scroll to explore <ChevronRight size={20} />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-x-12 gap-y-16">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="text-accent font-display text-4xl font-bold opacity-10 absolute -top-10 -left-6 -z-10">
                {idx + 1}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-white/60 leading-relaxed">{step.desc}</p>
              {idx % 3 !== 2 && (
                <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-[1px] bg-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Results = () => {
  return (
    <section className="py-10 bg-accent text-white overflow-hidden relative">
      {/* Background Noise/Texture */}
      <div className="absolute inset-0 bg-noise opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
              What This Actually Changes in Your Business
            </h2>
            <div className="grid grid-cols-2  gap-8">
              {[
                {
                  title: "Predictable Leads",
                  desc: "No more guessing where next month's revenue is coming from.",
                  icon: <Search />,
                },
                {
                  title: "Reduced Ad Spend",
                  desc: "Stop paying for every single click. Own your traffic.",
                  icon: <BarChart3 />,
                },
                {
                  title: "Higher LTV",
                  desc: "Organic customers trust you more and stay longer.",
                  icon: <Users />,
                },
                {
                  title: "Lower CAC",
                  desc: "As authority grows, your cost per acquisition drops.",
                  icon: <TrendingUp />,
                },
              ].map((item, i) => (
                <div key={i} className="grid sm:grid-col-2 gap-3">
                  <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-black/70 text-sm font-medium">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black p-12 rounded-[60px] text-white">
            <div className="flex items-center justify-between mb-12">
              <span className="text-xs font-bold uppercase tracking-widest opacity-50">
                Comparison
              </span>
              <div className="px-3 py-1 rounded-full bg-accent/20 text-accent text-[10px] font-bold">
                LIVE DATA
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <div className="flex justify-between mb-4">
                  <span className="font-bold">Paid Ads (Rent)</span>
                  <span className="text-red-400">High CAC</span>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    className="h-full bg-red-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-4">
                  <span className="font-bold">NEXZen SEO (Asset)</span>
                  <span className="text-accent">Compounding ROI</span>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    className="h-full bg-accent shadow-[0_0_20px_rgba(255,99,33,0.5)]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-white/10">
              <p className="text-center text-white/40 text-sm">
                Paid Ads = Renting Attention <br />
                <span className="text-white font-bold">
                  SEO = Building an Equity Asset
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CaseStudies = () => {
  const cases = [
    {
      type: "Ecom Brand",
      problem: "High traffic but zero sales due to poor intent matching.",
      fix: "Complete intent restructuring and BOFU page overhaul.",
      result: "+42% revenue from organic search in 90 days.",
      image: "https://picsum.photos/seed/ecom/800/600",
    },
    {
      type: "Local Business",
      problem: "Zero local visibility despite 5 years in business.",
      fix: "Local SEO infrastructure + GBP authority stacking.",
      result: "3x increase in inbound calls and foot traffic.",
      image: "https://picsum.photos/seed/local/800/600",
    },
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-16 text-center">
          Proof in the System
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {cases.map((c, i) => (
            <div key={i} className="glass rounded-[40px] overflow-hidden group">
              <div className="h-64 relative overflow-hidden">
                <img
                  src={c.image}
                  alt={c.type}
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <span className="bg-accent text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    {c.type}
                  </span>
                </div>
              </div>
              <div className="p-10">
                <div className="space-y-6">
                  <div>
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest block mb-2">
                      The Problem
                    </span>
                    <p className="text-lg font-medium">{c.problem}</p>
                  </div>
                  <div>
                    <span className="text-accent text-xs font-bold uppercase tracking-widest block mb-2">
                      The NEXZen Fix
                    </span>
                    <p className="text-lg font-medium">{c.fix}</p>
                  </div>
                  <div className="pt-6 border-t border-white/10">
                    <span className="text-green-400 text-xs font-bold uppercase tracking-widest block mb-2">
                      The Result
                    </span>
                    <p className="text-2xl font-display font-bold">
                      {c.result}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      q: "Does SEO still work in the age of AI?",
      a: "Yes — but only if done as a system. AI-powered search (SGE) actually rewards high-authority, intent-mapped content more than ever. The old 'keyword stuffing' is dead, but 'Intent Engineering' is the new gold standard.",
    },
    {
      q: "How long does it take to see results?",
      a: "SEO is a compounding asset. While technical fixes can show impact in weeks, the full NEXZen architecture typically hits its stride in 3-6 months, with ROI continuing to grow indefinitely.",
    },
    {
      q: "We tried SEO before and it failed. Why are you different?",
      a: "Most agencies sell execution (writing blogs, building links). We build infrastructure. If you don't have the right foundation, execution is just noise. We fix the system first.",
    },
  ];

  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="py-10 bg-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-16 text-center">
            &ldquo;Does SEO Still Work?&rdquo;
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass rounded-3xl overflow-hidden">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                  className="w-full p-8 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-xl font-bold">{faq.q}</span>
                  <div
                    className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-transform ${openIdx === i ? "rotate-45" : ""}`}
                  >
                    <X size={16} />
                  </div>
                </button>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    className="px-8 pb-8 text-white/60 leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const tiers = [
    {
      name: "Growth SEO",
      target: "For SMBs",
      features: [
        "Intent Mapping",
        "Technical Foundation",
        "Core Content Build",
      ],
    },
    {
      name: "Scale SEO",
      target: "For Funded Startups",
      features: [
        "Full Infrastructure",
        "Authority Flywheel",
        "Advanced Content Funnels",
        "Competitor Conquest",
      ],
    },
    {
      name: "Authority SEO",
      target: "For Aggressive Growth",
      features: [
        "Global Market Capture",
        "Digital PR Signals",
        "Custom AI Search Optimization",
        "24/7 Forensic Monitoring",
      ],
    },
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Choose Your Growth Velocity
          </h2>
          <p className="text-white/60 text-lg">
            Strategic positioning for businesses ready to own their market.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`glass p-10 rounded-[40px] flex flex-col ${i === 1 ? "border-accent/50 ring-1 ring-accent/20 scale-105 relative z-10" : ""}`}
            >
              {i === 1 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-black px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <span className="text-accent text-sm font-bold uppercase tracking-widest mb-8 block">
                {tier.target}
              </span>
              <ul className="space-y-4 mb-12 flex-1">
                {tier.features.map((f, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-white/70"
                  >
                    <CheckCircle2 size={18} className="text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <button
                  className={`w-full py-4 rounded-full font-bold transition-all ${i === 1 ? "bg-white text-black hover:bg-accent/90" : "bg-white/5 border border-white/10 hover:bg-white/10"}`}
                >
                  Book Strategy Call
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-accent/5 -z-10" />
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 leading-[0.9] tracking-tighter">
              Every Day You Delay SEO, You Fund Your{" "}
              <span className="text-accent">Competitor’s Growth.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto">
              The earlier you build authority, the harder it is to beat you.
              Stop renting attention and start owning your market.
            </p>
            <Link href="/contact" className="inline-block mb-4">
              <button className=" text-white text-black px-12 py-6 rounded-full text-2xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,99,33,0.3)]">
                Get Your SEO Growth Plan
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};



// --- Main Page ---

export default function SEOPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main className="relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* <Navbar /> */}
      <Hero />
      <PainPoints />
      <Reframe />
      <Architecture />
      <Process />
      <Results />
      <CaseStudies />
      <FAQ />
      <Pricing />
      <FinalCTA />
      {/* <Footer /> */}

      {/* Sticky CTA for Mobile/Desktop */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-6 right-6 z-50 md:bottom-10 md:right-10"
      >

      </motion.div>
    </main>
  );
}
