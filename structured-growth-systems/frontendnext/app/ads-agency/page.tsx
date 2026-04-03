"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  Search,
  Facebook,
  Linkedin,
  BarChart3,
  Target,
  Zap,
  TrendingUp,
  AlertCircle,
  MousePointerClick,
  Layers,
  RefreshCcw,
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

// --- Components ---



const HeroContent = () => {
  const searchParams = useSearchParams();
  const source = searchParams.get("utm_source")?.toLowerCase();

  let subheadline =
    "We build full-funnel ad systems across Google, Meta, and LinkedIn — designed to generate real leads, not vanity metrics.";

  if (source === "google") {
    subheadline =
      "Capture high-intent buyers at the exact moment they’re ready to act.";
  } else if (
    source === "meta" ||
    source === "facebook" ||
    source === "instagram"
  ) {
    subheadline =
      "Turn cold attention into qualified leads with high-converting funnels.";
  } else if (source === "linkedin") {
    subheadline =
      "Reach decision-makers and generate high-value B2B opportunities.";
  }

  return (
    <section className="relative pt-10 pb-10 md:pt-15 md:pb-10 overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-orange/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase mb-6 text-brand-orange">
            The Conversion Agency
          </span>
          <h1 className="text-3xl md:text-7xl lg:text-4xl font-display font-bold tracking-tight leading-[1.1] mb-8">
            Turn Ads Spend Into <br />
            <span className="orange-gradient-text">Predictable Revenue</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            {subheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="w-full sm:w-auto bg-brand-orange text-black px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform group">
              Get Free Ad Strategy Audit
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
              See How It Works
            </button>
          </div>

          {/* Trust Strip */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 py-8 border-y border-white/5">
            <div className="flex items-center gap-2 text-white/60 font-medium">
              <CheckCircle2 size={18} className="text-brand-orange" />
              Google Ads
            </div>
            <div className="flex items-center gap-2 text-white/60 font-medium">
              <CheckCircle2 size={18} className="text-brand-orange" />
              Meta Ads
            </div>
            <div className="flex items-center gap-2 text-white/60 font-medium">
              <CheckCircle2 size={18} className="text-brand-orange" />
              LinkedIn Ads
            </div>
            <div className="flex items-center gap-2 text-white/60 font-medium">
              <CheckCircle2 size={18} className="text-brand-orange" />
              Conversion Tracking
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PainSection = () => {
  const pains = [
    "You’re getting clicks → but not customers",
    "Leads come → but don’t convert",
    "No clear tracking → no idea what’s working",
    "Budget increases → profit doesn’t",
    "Agencies report numbers → not revenue",
  ];

  return (
    <section className="py-10 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-3xl font-display font-bold mb-8 leading-tight">
              If You’re Running Ads <br />
              But Not Scaling,{" "}
              <span className="text-brand-orange">This Is Why</span>
            </h2>
            <div className="space-y-4">
              {pains.map((pain, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 glass-card border-none bg-white/5"
                >
                  <AlertCircle
                    className="text-brand-orange shrink-0"
                    size={20}
                  />
                  <span className="text-white/80 font-medium">{pain}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="glass-card p-8 relative z-10">
              <div className="text-brand-orange font-display text-2xl font-bold mb-4 italic">
                The NEXZen Truth:
              </div>
              <p className="text-2xl md:text-3xl font-bold leading-snug">
                You don’t have an ads problem. <br />
                <span className="text-brand-orange">
                  You have a conversion system problem.
                </span>
              </p>
              <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange/20 flex items-center justify-center">
                  <TrendingUp className="text-brand-orange" />
                </div>
                <div>
                  <div className="text-sm text-white/40 uppercase tracking-widest font-bold">
                    The Shift
                  </div>
                  <div className="font-bold">From Gambling to Growth</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange/20 blur-3xl rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

const ReframeSection = () => {
  return (
    <section className="py-10 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
          Ads Don’t Generate Revenue. <br />
          <span className="text-brand-orange">Systems Do.</span>
        </h2>
        <p className="text-xl text-white/60 mb-12 leading-relaxed">
          Running ads without structure is just gambling with your budget. Real
          growth happens when you align intent with a high-converting funnel.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
          {["Intent", "Funnel", "Conversion", "Optimization", "Scale"].map(
            (step, i) => (
              <React.Fragment key={step}>
                <div className="p-4 glass-card">
                  <div className="text-brand-orange font-bold text-sm mb-1">
                    0{i + 1}
                  </div>
                  <div className="font-bold">{step}</div>
                </div>
                {i < 4 && (
                  <div className="hidden md:block text-white/20">
                    <ChevronRight />
                  </div>
                )}
              </React.Fragment>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

const SystemSection = () => {
  const frameworks = [
    {
      icon: <Search className="text-brand-orange" />,
      title: "Google Ads",
      tag: "Demand Capture",
      desc: "Search + Performance Max. High-intent keyword targeting to capture buyers ready now.",
      color: "from-blue-500/20",
    },
    {
      icon: <Facebook className="text-brand-orange" />,
      title: "Meta Ads",
      tag: "Demand Creation",
      desc: "Scroll-stopping creatives and behavioral targeting to create demand from cold audiences.",
      color: "from-purple-500/20",
    },
    {
      icon: <Linkedin className="text-brand-orange" />,
      title: "LinkedIn Ads",
      tag: "Precision B2B",
      desc: "Job role targeting for high-ticket lead generation. Reach decision-makers directly.",
      color: "from-blue-600/20",
    },
    {
      icon: <RefreshCcw className="text-brand-orange" />,
      title: "Conversion Layer",
      tag: "The Multiplier",
      desc: "Landing page optimization, funnel structure, and retargeting to turn traffic into revenue.",
      color: "from-brand-orange/20",
    },
  ];

  return (
    <section id="system" className="py-10 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-3xl font-display font-bold mb-4">
            The <span className="text-brand-orange">NEXZen</span>{" "}
            Traffic-to-Conversion Framework
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Our proprietary system designed to maximize every dollar of ad
            spend.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {frameworks.map((f, i) => (
            <div
              key={i}
              className={`p-8 glass-card bg-gradient-to-br ${f.color} to-transparent border-white/5 hover:border-brand-orange/30 transition-all group`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <div className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-2">
                {f.tag}
              </div>
              <h3 className="text-xl font-bold mb-4">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FunnelVisual = () => {
  const steps = [
    { label: "Attention", icon: <Target size={20} /> },
    { label: "Click", icon: <MousePointerClick size={20} /> },
    { label: "Landing Page", icon: <Layers size={20} /> },
    { label: "Trust", icon: <ShieldCheck size={20} /> },
    { label: "Conversion", icon: <Zap size={20} /> },
    { label: "Retargeting", icon: <RefreshCcw size={20} /> },
    { label: "Sale", icon: <TrendingUp size={20} /> },
  ];

  return (
    <section className="py-10 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-display font-bold mb-16">
          How Your Customers Actually Convert
        </h2>
        <div className="relative max-w-5xl mx-auto">
          {/* Funnel SVG Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <div className="w-full h-full border-x-[100px] border-b-[400px] border-x-transparent border-b-brand-orange" />
          </div>

          <div className="flex flex-col items-center gap-4 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 glass-card px-8 py-4 w-full max-w-md hover:border-brand-orange/50 transition-colors cursor-default"
                style={{ width: `${100 - i * 8}%` }}
              >
                <div className="text-brand-orange">{step.icon}</div>
                <span className="font-bold">{step.label}</span>
                <div className="ml-auto text-white/20 font-mono text-xs">
                  STEP 0{i + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const IndustrySection = () => {
  const industries = [
    {
      title: "Ecommerce",
      icon: "🛒",
      problem: "Traffic without profitable ROAS",
      fix: [
        "Product-focused ads",
        "Retargeting flows",
        "Conversion optimization",
      ],
      outcome: "Higher ROAS, scalable sales",
    },
    {
      title: "Service Businesses",
      icon: "🏢",
      problem: "Inconsistent leads",
      fix: ["Local targeting", "Lead funnels", "Call optimization"],
      outcome: "More bookings, stable pipeline",
    },
    {
      title: "B2B / High-Ticket",
      icon: "🧠",
      problem: "Low-quality leads",
      fix: [
        "LinkedIn targeting",
        "Funnel qualification",
        "Multi-step conversion",
      ],
      outcome: "Fewer but high-quality leads",
    },
  ];

  return (
    <section id="industries" className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">
            Industry Specific Solutions
          </h2>
          <p className="text-white/60">
            We segment our approach to match your business model.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {industries.map((ind, i) => (
            <div key={i} className="glass-card p-10 flex flex-col h-full">
              <div className="text-4xl mb-6">{ind.icon}</div>
              <h3 className="text-2xl font-bold mb-6">{ind.title}</h3>

              <div className="mb-6">
                <div className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">
                  The Problem
                </div>
                <div className="text-white/80">{ind.problem}</div>
              </div>

              <div className="mb-8 flex-grow">
                <div className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-3">
                  The NEXZen Fix
                </div>
                <ul className="space-y-2">
                  {ind.fix.map((f, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-sm text-white/60"
                    >
                      <div className="w-1 h-1 bg-brand-orange rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="text-xs font-bold text-green-500 uppercase tracking-widest mb-2">
                  The Outcome
                </div>
                <div className="font-bold text-lg">{ind.outcome}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProofSection = () => {
  const results = [
    {
      label: "Ecommerce",
      metric: "ROAS Improved",
      sub: "Scalable Revenue",
      value: "4.8x",
    },
    {
      label: "Service Business",
      metric: "Lead Increase",
      sub: "Stable Pipeline",
      value: "310%",
    },
    {
      label: "B2B",
      metric: "Lead Quality",
      sub: "Higher Conversion",
      value: "2.5x",
    },
  ];

  return (
    <section id="proof" className="py-10 bg-white/[0.02]">
      <div className="max-w-9xl mx-auto px-2">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">
            What This Looks Like in Action
          </h2>
          <p className="text-white/60">Real systems delivering real results.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-8">
          {results.map((res, i) => (
            <div
              key={i}
              className="glass-card p-8 text-center relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              <div className="text-sm font-bold text-white/40 uppercase mb-2">
                {res.label}
              </div>
              <div className="text-3xl font-display font-bold text-brand-orange mb-4">
                {res.value}
              </div>
              <div className="font-bold text-lg mb-1">{res.metric}</div>
              <div className="text-white/50 text-sm">{res.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ObjectionSection = () => {
  return (
    <section className="py-10">
      <div className="max-w-9xl mx-auto px-1">
        <div className="glass-card p-12 border-brand-orange/20">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center italic">
            “We Tried Ads Before. It Didn’t Work.”
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="text-xs font-bold text-red-500 uppercase tracking-widest mb-4">
                The Reality
              </div>
              <ul className="space-y-4">
                {["No funnel", "No tracking", "No testing"].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-white/70"
                  >
                    <X size={18} className="text-red-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-bold text-green-500 uppercase tracking-widest mb-4">
                The Reframe
              </div>
              <p className="text-xl font-bold leading-relaxed">
                Ads didn’t fail. <br />
                <span className="text-brand-orange">
                  The system behind them did.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const OfferSection = () => {
  return (
    <section className="py-10 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/5 blur-[150px] rounded-full -z-10" />
      <div className="max-w-9xl mx-auto px-1">
        <div className="glass-card p-12 md:p-10 text-center relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand-orange text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest">
            Limited Availability
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
            Get a Free PPC Strategy Audit
          </h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            Stop guessing and start growing. We&apos;ll analyze your current
            setup and show you exactly where the gaps are.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 text-left">
            {[
              { icon: <Search size={20} />, text: "Campaign analysis" },
              { icon: <Layers size={20} />, text: "Funnel gap breakdown" },
              { icon: <Target size={20} />, text: "Industry-specific plan" },
              { icon: <Zap size={20} />, text: "Quick-win opportunities" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-white/80 font-medium"
              >
                <div className="text-brand-orange">{item.icon}</div>
                {item.text}
              </div>
            ))}
          </div>
          <Link href="/contact">
            <button className="bg-brand-orange text-black px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-lg shadow-brand-orange/20">
              Get My Audit Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};





// --- Main Page ---

export default function LandingPage() {
  return (
    <main className="selection:bg-brand-orange selection:text-black">
      {/* <Navbar /> */}
      <Suspense fallback={<div className="h-screen bg-brand-black" />}>
        <HeroContent />
      </Suspense>
      <PainSection />
      <ReframeSection />
      <SystemSection />
      <FunnelVisual />
      <IndustrySection />
      <ProofSection />
      <ObjectionSection />
      <OfferSection />


    </main>
  );
}
