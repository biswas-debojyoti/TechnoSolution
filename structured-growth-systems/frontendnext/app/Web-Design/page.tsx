"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Zap,
  ShoppingCart,
  Building2,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Layout,
  Target,
  Globe,
  ArrowUpRight,
  Search,
  MousePointer2,
  Clock,
  ShieldCheck,
  Smartphone,
  Gauge,
} from "lucide-react";
import Link from "next/link";

// --- Components ---

const CaseStudySection = () => {
  return (
    <section className="py-10 md:py-10 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl">
            High-Performance Web Applications That Drive Real Business Growth
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
          {/* Mobile Mockup - Left on Desktop, Top on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 order-1 md:order-1"
          >
            <div className="relative mx-auto w-[280px] h-[580px] bg-zinc-900 rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl overflow-hidden">
              {/* Phone Speaker/Camera Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl z-20" />

              {/* Screen Content */}
              <div className="absolute inset-0 bg-zinc-950 p-6 pt-12">
                <div className="w-8 h-8 bg-orange-500 rounded-lg mb-8" />
                <div className="space-y-4">
                  <div className="h-4 w-full bg-zinc-900 rounded" />
                  <div className="h-4 w-5/6 bg-zinc-900 rounded" />
                  <div className="h-24 w-full bg-zinc-900 rounded-xl" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-20 bg-zinc-900 rounded-xl" />
                    <div className="h-20 bg-zinc-900 rounded-xl" />
                  </div>
                  <div className="h-12 w-full bg-orange-500 rounded-xl" />
                </div>
              </div>

              {/* Reflection Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Decorative Elements around phone */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full" />
          </motion.div>

          {/* Content - Right on Desktop, Bottom on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 order-2 md:order-2 space-y-8"
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-orange-500">
                NextGen Commerce Platform
              </h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                We designed and developed a scalable web application tailored
                for modern businesses that demand speed, reliability, and
                seamless user experience. Built with performance-first
                architecture, this platform enables businesses to manage
                operations, users, and transactions efficiently — all in one
                system.
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {[
                { label: "Active Users", value: "25K+" },
                { label: "Revenue Impact", value: "$2.4M+" },
                { label: "Performance Score", value: "95/100" },
              ].map((metric, i) => (
                <div
                  key={i}
                  className={`p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl ${i === 2 ? "sm:col-span-2" : ""}`}
                >
                  <div className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-1">
                    {metric.label}
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>

            <Link href="/contact" className="z-10">
              <button className="w-full md:w-auto px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group">
                Explore Case Study
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const LaptopMockup = ({ className }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Laptop Base */}
      <div className="relative mx-auto w-[450px] h-[290px] bg-zinc-800 rounded-t-2xl border-x-[12px] border-t-[12px] border-zinc-700 shadow-2xl overflow-hidden">
        {/* Screen Content - Live Report UI */}
        <div className="absolute inset-0 bg-zinc-950 p-0 flex flex-col">
          {/* Browser Header */}
          <div className="h-8 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-2">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
            </div>
            <div className="flex-1 h-5 bg-black rounded-md flex items-center px-3 border border-zinc-800">
              <span className="text-[7px] font-mono text-zinc-500">
                report.nexzencreative.com/live-performance
              </span>
            </div>
          </div>

          {/* Report Content */}
          <div className="flex-1 p-4 overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-[8px] font-mono text-orange-500 uppercase tracking-widest mb-1">
                  Live Performance Report
                </div>
                <div className="text-sm font-bold text-white">
                  Conversion Optimization
                </div>
              </div>
              <div className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-[8px] text-green-500 font-bold">
                ACTIVE
              </div>
            </div>

            {/* Main Metric */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-zinc-900/50 border border-zinc-800 p-2 rounded-lg">
                <div className="text-[6px] text-zinc-500 uppercase mb-1">
                  Conv. Rate
                </div>
                <div className="text-xs font-bold text-white">4.82%</div>
                <div className="text-[6px] text-green-500 mt-1">+1.2%</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 p-2 rounded-lg">
                <div className="text-[6px] text-zinc-500 uppercase mb-1">
                  Avg. Order
                </div>
                <div className="text-xs font-bold text-white">$142.50</div>
                <div className="text-[6px] text-green-500 mt-1">+8.4%</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 p-2 rounded-lg">
                <div className="text-[6px] text-zinc-500 uppercase mb-1">
                  Bounce Rate
                </div>
                <div className="text-xs font-bold text-white">24.1%</div>
                <div className="text-[6px] text-green-500 mt-1">-12.5%</div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl h-24 relative overflow-hidden">
              <div className="flex justify-between items-center mb-2">
                <div className="text-[7px] text-zinc-400 font-mono uppercase">
                  Revenue Growth (Real-time)
                </div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-orange-500 animate-ping" />
                  <div className="text-[6px] text-orange-500 font-bold">
                    LIVE
                  </div>
                </div>
              </div>

              {/* SVG Chart */}
              <svg className="w-full h-full" viewBox="0 0 100 40">
                <motion.path
                  d="M 0 35 Q 10 30 20 32 T 40 20 T 60 25 T 80 10 T 100 15"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <path
                  d="M 0 35 Q 10 30 20 32 T 40 20 T 60 25 T 80 10 T 100 15 V 40 H 0 Z"
                  fill="url(#chartGradient)"
                  opacity="0.1"
                />
                <defs>
                  <linearGradient
                    id="chartGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="h-8 bg-zinc-900/30 border border-zinc-800/50 rounded-lg flex items-center px-2 gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <div className="h-1 w-12 bg-zinc-800 rounded" />
              </div>
              <div className="h-8 bg-zinc-900/30 border border-zinc-800/50 rounded-lg flex items-center px-2 gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                <div className="h-1 w-12 bg-zinc-800 rounded" />
              </div>
            </div>
          </div>
        </div>
        {/* Screen Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
      </div>
      {/* Laptop Keyboard Part */}
      <div className="relative mx-auto w-[520px] h-5 bg-zinc-700 rounded-b-xl shadow-2xl" />
      <div className="relative mx-auto w-[140px] h-2.5 bg-zinc-600 rounded-b-xl" />
    </div>
  );
};

export const DigitalAssetEngine = () => {
  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-orange-500/10 blur-[100px] rounded-full" />

      {/* Rotating Core */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="relative w-48 h-48 rounded-full border border-orange-500/30 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10"
      >
        <div className="absolute inset-2 rounded-full border border-orange-500/10" />
        <Zap className="w-16 h-16 text-orange-500 fill-orange-500/20" />

        {/* Pulsing Core Glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl"
        />
      </motion.div>

      {/* Orbiting Modules */}
      {[
        {
          icon: ShoppingCart,
          label: "eCommerce",
          color: "text-blue-400",
          delay: 0,
        },
        {
          icon: BarChart3,
          label: "Analytics",
          color: "text-green-400",
          delay: 1.5,
        },
        { icon: Layout, label: "UX/UI", color: "text-purple-400", delay: 3 },
        {
          icon: Target,
          label: "Conversion",
          color: "text-red-400",
          delay: 4.5,
        },
        { icon: Globe, label: "Global", color: "text-orange-400", delay: 6 },
        {
          icon: ShoppingCart,
          label: "eCommerce",
          color: "text-blue-400",
          delay: 0,
        },
        {
          icon: BarChart3,
          label: "Analytics",
          color: "text-green-400",
          delay: 1.5,
        },
        { icon: Layout, label: "UX/UI", color: "text-purple-400", delay: 3 },
          {
          icon: Target,
          label: "Conversion",
          color: "text-red-400",
          delay: 4.5,
        },
        { icon: Globe, label: "Global", color: "text-orange-400", delay: 6 },
        
      ].map((module, i) => (
        <motion.div
          key={i}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: module.delay,
          }}
          className="absolute w-full h-full flex items-center justify-center pointer-events-none"
        >
          <motion.div
            style={{ rotate: -(i * 72) }} // Counter-rotate to keep icon upright
            className="absolute translate-x-[180px] md:translate-x-[220px]"
          >
            <div className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-xl backdrop-blur-md shadow-2xl pointer-events-auto group hover:border-orange-500/50 transition-colors">
              <module.icon className={`w-6 h-6 ${module.color}`} />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] uppercase tracking-widest font-mono text-zinc-500">
                {module.label}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Floating UI Assets */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl backdrop-blur-xl shadow-2xl z-20 hidden md:block"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-tighter">
            Conversion Engine Live
          </span>
        </div>
        <div className="h-1 w-32 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: ["20%", "85%", "60%", "95%"] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="h-full bg-orange-500"
          />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-10 left-0 bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl backdrop-blur-xl shadow-2xl z-20 hidden md:block"
      >
        <div className="flex items-end gap-1 h-12">
          {[40, 70, 45, 90, 60, 85].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.1, duration: 1 }}
              className="w-2 bg-orange-500/40 rounded-t-sm"
            />
          ))}
        </div>
        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-tighter block mt-2">
          Revenue Growth +124%
        </span>
      </motion.div>

      {/* Data Streams (SVG Paths) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <motion.path
          d="M 250 250 Q 350 100 450 250"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const PortfolioCard = ({
  title,
  icon: Icon,
  description,
  issues,
  fix,
  result,
  type,
}: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden hover:border-orange-500/30 transition-all duration-500"
    >
      {type && (
        <div className="absolute top-6 right-6 z-20">
          <div className="px-3 py-1 bg-zinc-800/80 backdrop-blur-md border border-zinc-700 rounded-full text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            {type}
          </div>
        </div>
      )}
      <div className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-500/10 rounded-2xl">
                <Icon className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                {title}
              </h3>
            </div>

            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              {description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-zinc-500">
                  What Matters
                </h4>
                <ul className="space-y-3">
                  {issues.map((item: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-zinc-300"
                    >
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-zinc-500">
                  The NEXZen Fix
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed italic">
                  &quot;{fix}&quot;
                </p>
                <div className="pt-4 border-t border-zinc-800">
                  <div className="flex items-center gap-2 text-orange-500 font-mono text-xs font-bold uppercase tracking-widest">
                    <ArrowUpRight className="w-4 h-4" />
                    Result: {result}
                  </div>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 text-white font-semibold group/btn">
              Explore Framework
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex-1 relative min-h-[300px] bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden">
            {/* Mock UI Preview */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-1.5">
              <div className="w-2 h-2 rounded-full bg-zinc-700" />
              <div className="w-2 h-2 rounded-full bg-zinc-700" />
              <div className="w-2 h-2 rounded-full bg-zinc-700" />
            </div>
            <div className="p-8 pt-12">
              <div className="w-full aspect-video rounded-lg bg-zinc-900 border border-zinc-800 animate-pulse" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-3/4 bg-zinc-900 rounded" />
                <div className="h-4 w-1/2 bg-zinc-900 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Page ---

export default function WebDesignLP() {
  return (
    <div className="min-h-screen bg-black selection:bg-orange-500/30">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative pt-10 pb-10 md:pt-10 md:pb-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-widest mb-6">
                <Zap className="w-3 h-3" />
                Performance-First Design
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-8">
                We Don’t Just <span className="text-zinc-500">Design</span>{" "}
                Websites. <br />
                <span className="text-white">We Engineer Digital Assets.</span>
              </h1>
              <p className="text-xl text-zinc-400 mb-10 max-w-xl leading-relaxed">
                Explore high-performance website frameworks built for eCommerce,
                agencies, and service businesses — optimized for speed, UX, and
                conversion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-orange-500 text-black font-bold rounded-full hover:bg-orange-400 transition-all flex items-center justify-center gap-2 group">
                  View Live Design References
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-zinc-900 text-white font-bold rounded-full border border-zinc-800 hover:bg-zinc-800 transition-all">
                  Get My Website Audit
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <DigitalAssetEngine />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Instant Trust Strip */}
      <section className="py-12 border-y border-zinc-900 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-sm uppercase tracking-[0.3em] font-mono text-zinc-500 mb-2">
                Real Design Systems
              </h2>
              <p className="text-xl font-bold">Real Business Impact.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {[
                { label: "🛒 eCommerce", id: "ecommerce" },
                { label: "🏢 Agency Website", id: "agency" },
                { label: "🧑💼 Service Business", id: "service" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    document
                      .getElementById(item.id)
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-sm font-semibold hover:border-orange-500/50 transition-colors flex items-center gap-2"
                >
                  {item.label}
                  <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <CaseStudySection />

      {/* Portfolio Section */}
      <section id="portfolio" className="py-10 md:py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-3xl font-bold tracking-tight mb-6">
              Designed to Outperform.
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              We don&apos;t just build pages; we build conversion engines
              tailored to your specific business model.
            </p>
          </div>

          <div className="space-y-20">
            <div id="ecommerce">
              <PortfolioCard
                title="🛒 eCommerce Website Design"
                icon={ShoppingCart}
                description="Built for conversion, not just browsing. We focus on the entire customer journey from discovery to checkout."
                issues={[
                  "Fast product discovery",
                  "Clean product page hierarchy",
                  "Trust signals (reviews, badges)",
                  "Frictionless checkout",
                ]}
                fix="Restructuring the UX to prioritize mobile-first product discovery and reducing checkout friction by 40%."
                result="Higher conversion rate + better AOV"
                type="Concept Project"
              />
            </div>

            <div id="agency">
              <PortfolioCard
                title="🏢 Agency / Business Website Design"
                icon={Building2}
                description="Designed to build authority and convert leads. We position you as the expert in your field."
                issues={[
                  "Clear messaging (no confusion)",
                  "Strong CTA placement",
                  "Trust building (case studies, proof)",
                  "Structured service pages",
                ]}
                fix="Optimizing messaging hierarchy and implementing high-intent lead capture funnels."
                result="More qualified leads"
                type="Concept Project"
              />
            </div>

            <div id="service">
              <PortfolioCard
                title="🧑💼 Service Business Website"
                icon={Briefcase}
                description="Built to generate consistent inbound leads. Perfect for local businesses and professional services."
                issues={[
                  "Simple user journey",
                  "Clear offer",
                  "Strong local SEO structure",
                  "Lead capture optimization",
                ]}
                fix="Redesigning the funnel to prioritize appointment booking and local SEO visibility."
                result="Increased inbound inquiries"
                type="Concept Project"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reframe Section */}
      <section className="py-10 md:py-10 bg-zinc-950 relative overflow-hidden">
        {/* Background Laptop Mockup with Depth of Field */}
        <motion.div
          initial={{ opacity: 0, x: 100, rotate: -5 }}
          whileInView={{ opacity: 0.4, x: 50, rotate: -10 }}
          viewport={{ once: true }}
          className="absolute -right-20 top-1/2 -translate-y-1/2 hidden lg:block blur-[2px] scale-125"
        >
          <LaptopMockup />
        </motion.div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
            Most Websites Look Good. <br />
            <span className="text-orange-500">Very Few Perform.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto mt-16">
            <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
              <div className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-4">
                The Status Quo
              </div>
              <h3 className="text-xl font-bold mb-4">
                Design without strategy
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Beautiful decoration that fails to guide the user or communicate
                value. High bounce rates and zero ROI.
              </p>
            </div>
            <div className="p-8 bg-orange-500/10 border border-orange-500/20 rounded-3xl">
              <div className="text-orange-500 font-mono text-xs uppercase tracking-widest mb-4">
                The NEXZen Way
              </div>
              <h3 className="text-xl font-bold mb-4">
                Design with conversion logic
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Every pixel is placed with intent. We align UI/UX with user
                psychology to drive revenue and growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The System Section */}
      <section id="system" className="py-10 md:py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1">
              <h2 className="text-4xl md:text-3xl font-bold tracking-tight mb-8">
                The NEXZen Web <br />
                Conversion Framework
              </h2>
              <div className="space-y-8">
                {[
                  {
                    title: "Conversion-first wireframing",
                    desc: "We map the journey before we pick the colors.",
                  },
                  {
                    title: "UI/UX aligned with user psychology",
                    desc: "Leveraging cognitive patterns to drive action.",
                  },
                  {
                    title: "Speed + performance optimization",
                    desc: "Sub-second load times for maximum retention.",
                  },
                  {
                    title: "Continuous CRO improvements",
                    desc: "Data-driven iterations to scale your results.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-orange-500 font-bold">
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-zinc-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square bg-zinc-900 rounded-3xl border border-zinc-800 p-8 flex flex-col justify-between">
                  <Gauge className="w-10 h-10 text-orange-500" />
                  <div className="text-3xl font-bold tracking-tighter">
                    99/100
                  </div>
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    PageSpeed Score
                  </div>
                </div>
                <div className="aspect-[3/4] bg-zinc-900 rounded-3xl border border-zinc-800 p-8 flex flex-col justify-between">
                  <Smartphone className="w-10 h-10 text-blue-400" />
                  <div className="text-2xl font-bold tracking-tighter">
                    Mobile-First
                  </div>
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    Responsive Core
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[3/4] bg-zinc-900 rounded-3xl border border-zinc-800 p-8 flex flex-col justify-between">
                  <ShieldCheck className="w-10 h-10 text-green-400" />
                  <div className="text-2xl font-bold tracking-tighter">
                    Secure Build
                  </div>
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    Enterprise Grade
                  </div>
                </div>
                <div className="aspect-square bg-zinc-900 rounded-3xl border border-zinc-800 p-8 flex flex-col justify-between">
                  <MousePointer2 className="w-10 h-10 text-purple-400" />
                  <div className="text-3xl font-bold tracking-tighter">
                    +45%
                  </div>
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    CTR Increase
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-10 md:py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-3xl font-bold tracking-tight mb-6">
              From Idea to High-Performance
            </h2>
            <p className="text-zinc-400 text-lg">
              A streamlined process designed for speed and clarity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Strategy + Structure", icon: Search },
              { title: "Design (UX-driven)", icon: Layout },
              { title: "Development", icon: Zap },
              { title: "Tracking + Optimization", icon: BarChart3 },
            ].map((step, i) => (
              <div key={i} className="relative group">
                <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl group-hover:border-orange-500/30 transition-all">
                  <step.icon className="w-10 h-10 text-orange-500 mb-6" />
                  <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-xs font-bold border border-zinc-700">
                    {i + 1}
                  </div>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-zinc-800 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Reference Section */}
      <section className="py-10 md:py-10 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-sm uppercase tracking-[0.3em] font-mono text-orange-500 mb-4">
                The Reference Strategy
              </h2>
              <h3 className="text-4xl md:text-3xl font-bold tracking-tight">
                Inspired by Global <br />
                Design Standards
              </h3>
            </div>
            <p className="text-zinc-400 max-w-md leading-relaxed">
              Our design approach follows proven UX patterns used by top global
              brands — adapted for your business model and conversion goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Minimalist Precision",
                ref: "Apple-Inspired",
                desc: "Focus on negative space, premium typography, and high-fidelity imagery to build instant luxury and trust.",
                features: ["Negative Space", "Type Hierarchy", "Fluid Motion"],
                color: "bg-zinc-100",
                textColor: "text-black",
              },
              {
                title: "Data-Driven Clarity",
                ref: "Stripe-Inspired",
                desc: "Complex information made simple through clean grids, subtle gradients, and intuitive interaction patterns.",
                features: [
                  "Grid Systems",
                  "Subtle Depth",
                  "Micro-Interactions",
                ],
                color: "bg-blue-600",
                textColor: "text-white",
              },
              {
                title: "High-Performance Utility",
                ref: "Linear-Inspired",
                desc: "Dark-mode optimization with high-contrast accents, keyboard-centric UX, and rapid-response interfaces.",
                features: ["Keyboard UX", "High Contrast", "Speed-Focused"],
                color: "bg-purple-600",
                textColor: "text-white",
              },
            ].map((standard, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden group"
              >
                <div
                  className={`h-48 ${standard.color} relative overflow-hidden`}
                >
                  {/* Abstract UI Pattern Representation */}
                  <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/pattern/800/600')] bg-cover mix-blend-overlay" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`px-4 py-2 rounded-lg backdrop-blur-md border border-white/20 font-mono text-[10px] font-bold uppercase tracking-widest ${standard.textColor}`}
                    >
                      {standard.ref}
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-xl font-bold mb-4">{standard.title}</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {standard.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {standard.features.map((f, j) => (
                      <span
                        key={j}
                        className="px-2 py-1 bg-zinc-800 rounded-md text-[10px] font-mono text-zinc-500 uppercase tracking-tighter"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>


        </div>
      </section>

      {/* Final Offer Section */}
      <section className="py-10 md:py-10 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
              Get a Website Audit + Design Direction
            </h2>
            <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
              Stop guessing. Get a professional analysis of your current UX,
              conversion gaps, and a clear design improvement roadmap.
            </p>
            <div className="flex flex-col items-center gap-6">
              <Link href="/contact" className="z-10">
                <button className="px-12 py-6 bg-white text-black font-black text-xl rounded-full hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                  Request My Audit
                </button>
              </Link>
              <div className="flex items-center gap-8 text-sm font-mono text-zinc-500 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" /> UX
                  Analysis
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />{" "}
                  Conversion Gaps
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" /> Roadmap
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
