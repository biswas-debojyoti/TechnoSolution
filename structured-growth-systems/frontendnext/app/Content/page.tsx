"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  CheckCircle2,
  ArrowRight,
  Mail,
  Target,
  RefreshCcw,
  BarChart3,
  MousePointerClick,
  Zap,
  Users,
  Briefcase,
  ShoppingCart,
  ChevronRight,
  AlertCircle,
  TrendingUp,
  Activity,
  Globe,
} from "lucide-react";

const revenueData = [
  { name: "Month 1", before: 4000, after: 4200 },
  { name: "Month 2", before: 4500, after: 5800 },
  { name: "Month 3", before: 4200, after: 7500 },
  { name: "Month 4", before: 4800, after: 9200 },
  { name: "Month 5", before: 4600, after: 12000 },
  { name: "Month 6", before: 5000, after: 15500 },
];

const activityLog = [
  "New lead captured from SEO Blog",
  "Welcome sequence triggered for 'John D.'",
  "Abandoned cart recovered: $249.00",
  "Re-engagement flow active: 124 users",
  "Conversion rate optimized: +12%",
  "New authority content published",
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

export default function LandingPage() {
  const [activeActivity, setActiveActivity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveActivity((prev) => (prev + 1) % activityLog.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 selection:bg-orange-500/30 selection:text-orange-200">
      {/* Live Activity Ticker */}
      <div className="fixed top-20 right-4 z-40 hidden lg:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeActivity}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-zinc-900/90 backdrop-blur border border-zinc-800 p-3 rounded-lg shadow-2xl flex items-center gap-3 max-w-xs"
          >
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider truncate">
              {activityLog[activeActivity]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative pt-10 pb-10 lg:pt-10 lg:pb-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-orange-500 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Lead-to-Revenue Systems
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-7xl lg:text-4xl font-black tracking-tight text-white mb-8 leading-[0.9]"
          >
            Leads Don&apos;t Convert Because <br className="hidden lg:block" />
            <span className="text-orange-500">You Stop Showing Up.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed"
          >
            We build content + email systems that turn cold leads into paying
            customers — and one-time buyers into long-term revenue.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20 group">
              Get Content Funnel Audit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 px-8 py-4 rounded-xl font-bold text-lg transition-all">
              See How It Works
            </button>
          </motion.div>

          {/* Live Stats Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          >
            {[
              { label: "Leads Generated", value: "12.4k+", icon: Users },
              { label: "Revenue Recovered", value: "$2.1M+", icon: TrendingUp },
              { label: "Email Open Rate", value: "42.8%", icon: Mail },
              { label: "Avg. ROI", value: "8.4x", icon: BarChart3 },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 text-orange-500 mb-1">
                  <stat.icon className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {stat.label}
                  </span>
                </div>
                <div className="text-2xl font-black text-white">
                  {stat.value}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Trust Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 md:gap-12 py-8 border-y border-zinc-900"
          >
            {[
              "SEO Content",
              "Email Automation",
              "Lead Nurturing Systems",
              "Lifecycle Marketing",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-zinc-500 text-sm font-bold uppercase tracking-wider"
              >
                <CheckCircle2 className="w-4 h-4 text-orange-500" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pain Section */}
      <section className="py-10 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl md:text-3xl font-black text-white mb-6 leading-tight">
                Why Your Leads Go Cold <br />
                <span className="text-zinc-600">(And Never Come Back)</span>
              </h2>
              <div className="space-y-6">
                {[
                  "You generate leads → but no follow-up system",
                  "You send random emails → no strategy",
                  "Your content gets views → but no conversions",
                  "No structured funnel → leads disappear",
                  "You constantly chase new leads → instead of monetizing existing ones",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 group-hover:border-orange-500 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    </div>
                    <p className="text-xl text-zinc-300 font-medium">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...fadeIn}
              className="relative p-8 md:p-12 bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <AlertCircle className="w-12 h-12 text-orange-500/20" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white mb-6 leading-snug">
                Most businesses don’t have a{" "}
                <span className="text-orange-500 underline decoration-orange-500/30 underline-offset-8">
                  traffic problem
                </span>
                .
              </p>
              <p className="text-4xl md:text-3xl font-black text-orange-500">
                They have a nurture and retention problem.
              </p>

              <div className="mt-12 grid grid-cols-2 gap-4">
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-orange-500"
                  />
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "15%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-zinc-600"
                  />
                </div>
              </div>
              <div className="flex justify-between text-xs font-bold text-zinc-500 mt-2 uppercase tracking-widest">
                <span>Lost Revenue</span>
                <span>Captured Revenue</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reframe Section with Live Data Visualization */}
      <section className="py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            {...fadeIn}
            className="text-4xl md:text-6xl font-black text-white mb-16"
          >
            Content Is Not Marketing. <br />
            <span className="text-orange-500">
              It&apos;s a Conversion System.
            </span>
          </motion.h2>

          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            <motion.div
              {...fadeIn}
              className="lg:col-span-2 p-8 bg-zinc-900 border border-zinc-800 rounded-3xl text-left overflow-hidden relative"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Revenue Growth Engine
                  </h3>
                  <p className="text-sm text-zinc-500">
                    NEXZen System vs. Traditional Marketing
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">
                      NEXZen
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">
                      Traditional
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient
                        id="colorAfter"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#f97316"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#f97316"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#18181b"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      stroke="#3f3f46"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#3f3f46"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value: any) => `$${value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#09090b",
                        border: "1px solid #27272a",
                        borderRadius: "8px",
                      }}
                      itemStyle={{ fontSize: "12px" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="after"
                      stroke="#f97316"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorAfter)"
                    />
                    <Area
                      type="monotone"
                      dataKey="before"
                      stroke="#3f3f46"
                      strokeWidth={2}
                      fillOpacity={0}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <div className="space-y-8">
              <motion.div
                {...fadeIn}
                className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-left"
              >
                <p className="text-zinc-500 font-bold uppercase tracking-widest mb-4">
                  The Old Way
                </p>
                <p className="text-2xl font-bold text-zinc-300">
                  Post content →{" "}
                  <span className="text-zinc-500 italic">
                    hope for engagement
                  </span>
                </p>
              </motion.div>
              <motion.div
                {...fadeIn}
                className="p-8 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-left"
              >
                <p className="text-orange-500 font-bold uppercase tracking-widest mb-4">
                  The NEXZen Reality
                </p>
                <div className="space-y-2">
                  <p className="text-xl font-bold text-white">
                    Content →{" "}
                    <span className="text-orange-500">builds trust</span>
                  </p>
                  <p className="text-xl font-bold text-white">
                    Email → <span className="text-orange-500">converts</span>
                  </p>
                  <p className="text-xl font-bold text-white">
                    Lifecycle →{" "}
                    <span className="text-orange-500">multiplies revenue</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Flow Visualization */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-4 md:gap-6"
          >
            {[
              { label: "Traffic", icon: Users },
              { label: "Content", icon: MousePointerClick },
              { label: "Lead", icon: Target },
              { label: "Email", icon: Mail },
              { label: "Trust", icon: CheckCircle2 },
              { label: "Conversion", icon: Zap },
              { label: "Retention", icon: RefreshCcw },
              { label: "LTV", icon: BarChart3 },
            ].map((step, i, arr) => (
              <React.Fragment key={step.label}>
                <motion.div
                  variants={fadeIn}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-orange-500 group hover:border-orange-500 transition-colors">
                    <step.icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-tighter">
                    {step.label}
                  </span>
                </motion.div>
                {i < arr.length - 1 && (
                  <motion.div
                    variants={fadeIn}
                    className="hidden lg:block text-zinc-800"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core System Section */}
      <section id="system" className="py-10 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2
              {...fadeIn}
              className="text-4xl md:text-6xl font-black text-white mb-6"
            >
              The NEXZen <br />
              <span className="text-orange-500">
                Content-to-Revenue Framework
              </span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* System Status Dashboard Visual */}
            <motion.div
              {...fadeIn}
              className="lg:col-span-3 p-8 bg-zinc-950 border border-zinc-800 rounded-3xl mb-8 overflow-hidden relative group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Globe className="w-64 h-64 text-orange-500" />
              </div>
              <div className="relative z-10 grid md:grid-cols-3 gap-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-white">
                    System Dashboard
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        label: "Active Funnels",
                        value: "24",
                        color: "bg-orange-500",
                      },
                      {
                        label: "Automation Health",
                        value: "99.9%",
                        color: "bg-green-500",
                      },
                      {
                        label: "Lead Velocity",
                        value: "+22%",
                        color: "bg-blue-500",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-4 bg-zinc-900 rounded-xl border border-zinc-800"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                            {item.label}
                          </span>
                          <div
                            className={`w-2 h-2 rounded-full ${item.color}`}
                          />
                        </div>
                        <div className="text-xl font-black text-white">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2 bg-zinc-900/50 rounded-2xl border border-zinc-800 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                      Live Conversion Stream
                    </span>
                    <Activity className="w-4 h-4 text-orange-500" />
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg border border-zinc-800/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500">
                            ID
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">
                              Conversion Event #{1024 + i}
                            </div>
                            <div className="text-[10px] text-zinc-500">
                              2 minutes ago
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-bold text-orange-500">
                          +$124.00
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {[
              {
                num: "01",
                title: "Intent-Driven Content Engine",
                desc: "SEO blogs (buyer-focused), authority-building content, and high-value lead magnets.",
                outcome: "Attract the right audience",
                icon: MousePointerClick,
              },
              {
                num: "02",
                title: "Lead Capture System",
                desc: "High-converting opt-ins, landing pages, and strategic funnel entry points.",
                outcome: "Turn traffic into leads",
                icon: Target,
              },
              {
                num: "03",
                title: "Email Automation Engine",
                desc: "Welcome sequences, nurture flows, and hard-hitting sales sequences.",
                outcome: "Convert leads into customers",
                icon: Mail,
              },
              {
                num: "04",
                title: "Lifecycle & Retention",
                desc: "Upsell flows, re-engagement campaigns, and long-term retention strategy.",
                outcome: "Increase LTV (not just first sale)",
                icon: RefreshCcw,
              },
              {
                num: "05",
                title: "Data & Optimization Layer",
                desc: "Open rate/CTR tracking, conversion tracking, and continuous A/B testing.",
                outcome: "Continuous improvement",
                icon: BarChart3,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                className="group p-8 bg-zinc-950 border border-zinc-800 rounded-3xl hover:border-orange-500/50 transition-all flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-4xl font-black text-zinc-900 group-hover:text-orange-500/10 transition-colors">
                    {item.num}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-zinc-400 mb-8 flex-grow">{item.desc}</p>
                <div className="pt-6 border-t border-zinc-900">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">
                    Outcome
                  </p>
                  <p className="text-orange-500 font-bold">{item.outcome}</p>
                </div>
              </motion.div>
            ))}

            {/* CTA Card */}
            <motion.div
              {...fadeIn}
              className="p-8 bg-orange-500 rounded-3xl flex flex-col justify-center items-center text-center text-white"
            >
              <h3 className="text-3xl font-black mb-4">
                Ready to build your system?
              </h3>
              <p className="font-medium mb-8 opacity-90">
                Stop leaving revenue on the table. Let&apos;s engineer your
                funnel.
              </p>
              <button className="w-full bg-white text-orange-500 px-6 py-4 rounded-xl font-bold hover:bg-zinc-100 transition-colors">
                Book My Strategy Call
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases Section - Bento Grid Layout */}
      <section id="use-cases" className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            {...fadeIn}
            className="text-4xl md:text-3xl font-black text-white mb-16 text-center"
          >
            What This Looks Like <br className="md:hidden" />{" "}
            <span className="text-orange-500">In Action</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[240px]">
            {/* E-commerce - Large Card */}
            <motion.div
              {...fadeIn}
              className="md:col-span-3 lg:col-span-8 row-span-2 p-8 bg-zinc-900 border border-zinc-800 rounded-3xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShoppingCart className="w-48 h-48 text-orange-500" />
              </div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    ECOMMERCE
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 flex-grow">
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                        Problem
                      </p>
                      <p className="text-lg text-zinc-300 font-medium leading-relaxed">
                        Customers buy once → never return. High CAC, low LTV.
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                        Solution
                      </p>
                      <p className="text-zinc-400">
                        Abandoned cart recovery, post-purchase education, and
                        automated loyalty flows.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end">
                    <div className="p-6 bg-orange-500 rounded-2xl shadow-xl shadow-orange-500/20">
                      <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-1">
                        Outcome
                      </p>
                      <p className="text-2xl font-black text-white">
                        +142% Repeat Purchase Rate
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service Business - Tall Card */}
            <motion.div
              {...fadeIn}
              className="md:col-span-3 lg:col-span-4 row-span-2 p-8 bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col group"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  SERVICE BUSINESS
                </h3>
              </div>

              <div className="space-y-8 flex-grow">
                <div>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                    Problem
                  </p>
                  <p className="text-zinc-300 font-medium">
                    Leads come → don&apos;t convert. Sales team spends 80% of
                    time chasing cold leads.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                    Solution
                  </p>
                  <p className="text-zinc-400">
                    Automated nurture sequences and authority content that
                    pre-sells the lead before the call.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
                <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">
                  Outcome
                </p>
                <p className="text-xl font-black text-white">
                  3.5x More Booked Calls
                </p>
              </div>
            </motion.div>

            {/* B2B - Wide Card */}
            <motion.div
              {...fadeIn}
              className="md:col-span-6 lg:col-span-12 p-8 bg-zinc-900 border border-zinc-800 rounded-3xl group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight">
                      B2B / HIGH-TICKET
                    </h3>
                    <p className="text-sm text-zinc-500">
                      Complex sales cycles made simple
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-8">
                  <div className="max-w-xs">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                      Problem
                    </p>
                    <p className="text-zinc-300 font-medium">
                      Long decision cycle → leads lose interest and vanish.
                    </p>
                  </div>
                  <div className="max-w-xs">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                      Solution
                    </p>
                    <p className="text-zinc-400">
                      Multi-step value-driven sequences that maintain
                      top-of-mind awareness.
                    </p>
                  </div>
                  <div className="flex items-center px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
                    <div>
                      <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">
                        Outcome
                      </p>
                      <p className="text-xl font-black text-white">
                        -40% Sales Cycle Time
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-10 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl md:text-3xl font-black text-white mb-6">
                How We Turn <br />
                <span className="text-orange-500">Content Into Revenue</span>
              </h2>
              <p className="text-xl text-zinc-400 mb-12">
                We don&apos;t send emails. <br />
                <span className="text-white font-bold">
                  We build conversion journeys.
                </span>
              </p>

              <div className="space-y-4">
                {[
                  "Audience + intent analysis",
                  "Content + funnel strategy",
                  "Lead magnet creation",
                  "Email sequence setup",
                  "Automation + integration",
                  "Optimization + scaling",
                ].map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl"
                  >
                    <span className="text-orange-500 font-black text-lg">
                      0{i + 1}
                    </span>
                    <span className="text-zinc-300 font-bold">{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...fadeIn}
              className="relative aspect-square bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden flex items-center justify-center"
            >
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />
              </div>

              {/* Abstract Funnel Visual */}
              <div className="relative w-full max-w-xs space-y-4">
                <motion.div
                  initial={{ width: "100%" }}
                  whileInView={{ width: "100%" }}
                  className="h-16 bg-zinc-800 rounded-xl border border-zinc-700 flex items-center justify-center text-zinc-500 font-bold text-xs uppercase tracking-widest"
                >
                  Traffic
                </motion.div>
                <motion.div
                  initial={{ width: "100%" }}
                  whileInView={{ width: "80%" }}
                  transition={{ delay: 0.2 }}
                  className="mx-auto h-16 bg-zinc-800 rounded-xl border border-zinc-700 flex items-center justify-center text-zinc-500 font-bold text-xs uppercase tracking-widest"
                >
                  Content
                </motion.div>
                <motion.div
                  initial={{ width: "100%" }}
                  whileInView={{ width: "60%" }}
                  transition={{ delay: 0.4 }}
                  className="mx-auto h-16 bg-orange-500/20 rounded-xl border border-orange-500/30 flex items-center justify-center text-orange-500 font-bold text-xs uppercase tracking-widest"
                >
                  Leads
                </motion.div>
                <motion.div
                  initial={{ width: "100%" }}
                  whileInView={{ width: "40%" }}
                  transition={{ delay: 0.6 }}
                  className="mx-auto h-16 bg-orange-500 rounded-xl border border-orange-400 flex items-center justify-center text-white font-bold text-xs uppercase tracking-widest"
                >
                  Revenue
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objection Section */}
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeIn}
            className="p-12 bg-zinc-900 border border-zinc-800 rounded-[3rem] text-center"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
              “We Already Send Emails”
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { title: "Random emails", sub: "≠ system" },
                { title: "No segmentation", sub: "→ low impact" },
                { title: "No automation", sub: "→ missed revenue" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl"
                >
                  <p className="text-zinc-400 font-bold mb-1">{item.title}</p>
                  <p className="text-orange-500 font-black">{item.sub}</p>
                </div>
              ))}
            </div>
            <p className="text-2xl font-bold text-white leading-relaxed">
              Sending emails is not strategy. <br />
              <span className="text-orange-500">A structured funnel is.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final Close Section */}
    </div>
  );
}
