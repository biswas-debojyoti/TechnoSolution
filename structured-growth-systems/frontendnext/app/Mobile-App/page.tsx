"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import {
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Zap,
  Layers,
  TrendingUp,
  Users,
  BarChart3,
  Link as LinkIcon,
  ShoppingBag,
  Calendar,
  Rocket,
  ShieldCheck,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  Globe,
  CreditCard,
  Bell,
  MapPin,
  Share2,
  Code2,
  Cpu,
  Database,
  Terminal,
  Search,
  Layout,
  Smartphone as MobileIcon,
} from "lucide-react";
import Link from "next/link";

// --- Components ---

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: any) => {
  const variants: any = {
    primary:
      "bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-900/20",
    secondary:
      "bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border border-neutral-700",
    outline:
      "bg-transparent border-2 border-orange-600 text-orange-500 hover:bg-orange-600 hover:text-white",
  };

  return (
    <button
      className={`px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Section = ({ children, className = "", id = "" }: any) => (
  <section id={id} className={`py-20 px-6 md:py-10 ${className}`}>
    <div className="max-w-6xl mx-auto">{children}</div>
  </section>
);

const Badge = ({ children }: any) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-wider mb-6">
    {children}
  </span>
);

// --- Sections ---

const Hero = () => (
  <Section className="relative overflow-hidden pt-32 pb-20">
    {/* Background Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl opacity-20 pointer-events-none">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px]" />
    </div>

    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-left"
      >
        <Badge>Mobile App Design & Development</Badge>
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-8 leading-[0.95] uppercase">
          Downloads Don’t Grow Your Business. <br />
          <span className="text-orange-500">Retention Does.</span>
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 mb-10 max-w-xl leading-relaxed">
          We design and build mobile apps that users actually keep, engage with,
          and generate revenue from — not just install and forget.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <Link href="/contact">

            <Button className="w-full sm:w-auto text-lg px-10 py-5">
              Get App Growth Strategy <ArrowRight size={20} />
            </Button>
          </Link>
          <Link href="/contact">

            <Button
              variant="secondary"
              className="w-full sm:w-auto text-lg px-10 py-5"
            >
              See How It Works
            </Button>

          </Link>
        </div>

        {/* Trust Strip */}
        <div className="flex flex-wrap gap-6 md:gap-10 py-8 border-t border-neutral-800/50">
          {[
            { icon: <Smartphone size={18} />, text: "iOS & Android" },
            { icon: <Zap size={18} />, text: "UX-First Design" },
            { icon: <Layers size={18} />, text: "Scalable Architecture" },
            { icon: <ShieldCheck size={18} />, text: "Retention-Focused" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-neutral-400 font-bold text-xs uppercase tracking-widest"
            >
              <span className="text-orange-500">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="relative hidden lg:block"
      >
        {/* Phone Mockup */}
        <div className="relative w-[320px] h-[450px] mx-auto bg-neutral-900 rounded-[3rem] border-[8px] border-neutral-800 shadow-[0_0_100px_rgba(249,115,22,0.15)] overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-800 rounded-b-2xl z-20" />
          <img
            src="https://picsum.photos/seed/app-ui/600/1200"
            alt="App Interface"
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />

          {/* Floating UI Elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-12 p-4 rounded-2xl bg-neutral-800/90 border border-neutral-700 backdrop-blur-md shadow-2xl z-30"
          >
            <TrendingUp className="text-green-500 mb-2" size={24} />
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Retention
            </p>
            <p className="text-xl font-black text-white">+84%</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-1/4 left-12 p-4 rounded-2xl bg-neutral-800/90 border border-neutral-700 backdrop-blur-md shadow-2xl z-30"
          >
            <Users className="text-blue-500 mb-2" size={24} />
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Active Users
            </p>
            <p className="text-xl font-black text-white">12.4k</p>
          </motion.div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl" />
      </motion.div>
    </div>
  </Section>
);

const Pain = () => (
  <Section className="bg-neutral-900/50">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-3xl font-bold mb-8 leading-tight">
          Why Most Apps Fail <br />
          <span className="text-neutral-500 underline decoration-orange-500/50 underline-offset-8">
            Within 90 Days
          </span>
        </h2>
        <div className="space-y-6">
          {[
            "Users install → never open again",
            "Poor UX → confusion → drop-off",
            "No engagement strategy → no habit formation",
            "No retention system → wasted acquisition cost",
            "Built as a product → not as a growth system",
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-1.5 p-1 rounded-full bg-red-500/10 text-red-500">
                <AlertCircle size={16} />
              </div>
              <p className="text-lg text-neutral-300">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 p-6 rounded-2xl bg-orange-500/5 border border-orange-500/20">
          <p className="text-xl font-medium italic text-neutral-200">
            &ldquo;If users don&rsquo;t come back, your app is not an asset.{" "}
            <br className="hidden md:block" />
            <span className="text-orange-500 font-bold not-italic">
              It&rsquo;s a cost.
            </span>
            &rdquo;
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative aspect-square bg-neutral-800 rounded-3xl overflow-hidden border border-neutral-700 shadow-2xl flex items-center justify-center p-8"
      >
        {/* Retention Graph Visual */}
        <div className="w-full h-full flex flex-col justify-end gap-4">
          <div className="flex items-end justify-between h-64 gap-2">
            {[90, 45, 20, 12, 8, 5, 3].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className={`w-full rounded-t-lg transition-all duration-1000 ${i === 0 ? "bg-neutral-700" : "bg-red-500/40"}`}
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] text-neutral-500 uppercase font-bold">
                  Day {i * 15}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center pt-4 border-t border-neutral-700">
            <p className="text-sm font-bold text-red-400 uppercase tracking-widest">
              Average App Retention Rate
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </Section>
);

const Reframe = () => (
  <Section>
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-3xl font-bold mb-6">
        A Mobile App Is Not a Product. <br />
        <span className="text-orange-500">It’s a Retention Engine.</span>
      </h2>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="p-10 rounded-3xl bg-[#151B28] border border-neutral-800">
        <h3 className="text-xl font-bold text-neutral-500 mb-8 uppercase tracking-widest">
          Most businesses think:
        </h3>
        <div className="flex items-center gap-4 text-2xl font-bold">
          <span>Build app</span>
          <ArrowRight className="text-neutral-700" />
          <span>Launch</span>
          <ArrowRight className="text-neutral-700" />
          <span>Done</span>
        </div>
      </div>

      <div className="p-10 rounded-3xl bg-orange-600 text-white">
        <h3 className="text-xl font-bold text-orange-200 mb-8 uppercase tracking-widest">
          Reality:
        </h3>
        <div className="flex items-center gap-4 text-2xl font-bold flex-wrap">
          <span>Experience</span>
          <ArrowRight className="text-orange-400" />
          <span>Engagement</span>
          <ArrowRight className="text-orange-400" />
          <span>Retention</span>
          <ArrowRight className="text-orange-400" />
          <span>Revenue</span>
        </div>
      </div>
    </div>

    {/* Flow Visual */}
    <div className="mt-20 flex flex-wrap justify-center gap-4 md:gap-8">
      {[
        "Install",
        "First Experience",
        "Engagement",
        "Habit",
        "Retention",
        "Revenue",
      ].map((step, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="px-6 py-3 rounded-xl bg-[#151B28] border border-neutral-800 text-sm font-bold">
            {step}
          </div>
          {i < 5 && (
            <ChevronRight className="text-neutral-700 hidden md:block" />
          )}
        </div>
      ))}
    </div>
  </Section>
);

const Framework = () => (
  <Section className="bg-neutral-900/50">
    <div className="text-center mb-20">
      <Badge>The NEXZen System</Badge>
      <h2 className="text-4xl md:text-4xl font-bold mb-6">
        The NEXZen App Growth Framework
      </h2>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          icon: <Users className="text-blue-500" />,
          title: "1. Behavior-Driven UX Design",
          points: [
            "First-session optimization",
            "Clear user flows",
            "Minimal friction",
          ],
          outcome: "Users stay, not bounce",
        },
        {
          icon: <Zap className="text-orange-500" />,
          title: "2. Scalable App Development",
          points: [
            "Fast, stable builds",
            "Native / Cross-platform",
            "Clean backend",
          ],
          outcome: "App doesn't break as you grow",
        },
        {
          icon: <Layers className="text-purple-500" />,
          title: "3. Retention Layer",
          points: [
            "Push notifications strategy",
            "Behavior-based triggers",
            "User journey mapping",
          ],
          outcome: "Users come back consistently",
        },
        {
          icon: <BarChart3 className="text-green-500" />,
          title: "4. Data & Optimization",
          points: [
            "Event tracking",
            "Drop-off analysis",
            "Continuous improvements",
          ],
          outcome: "Growth becomes predictable",
        },
        {
          icon: <LinkIcon className="text-pink-500" />,
          title: "5. Integration Ecosystem",
          points: ["CRM integration", "Payment systems", "Analytics tools"],
          outcome: "App becomes a business engine",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className={`p-8 rounded-3xl bg-[#151B28] border border-neutral-800 flex flex-col h-full ${i === 4 ? "md:col-span-2" : ""}`}
        >
          <div className="mb-6 p-3 w-fit rounded-2xl bg-[#151B28]">
            {item.icon}
          </div>
          <h3 className="text-2xl font-bold mb-6">{item.title}</h3>
          <ul className="space-y-3 mb-8 flex-grow">
            {item.points.map((p, j) => (
              <li key={j} className="flex items-center gap-2 text-neutral-400">
                <CheckCircle2 size={16} className="text-neutral-600" />
                {p}
              </li>
            ))}
          </ul>
          <div className="pt-6 border-t border-neutral-800">
            <span className="text-xs font-bold uppercase text-neutral-500 tracking-widest block mb-2">
              Outcome:
            </span>
            <p className="text-lg font-bold text-neutral-200">
              👉 {item.outcome}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </Section>
);

const UseCases = () => (
  <Section>
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-3xl font-bold">
        Built for Real Businesses
      </h2>
    </div>

    <div className="grid md:grid-cols-3 gap-12">
      {[
        {
          icon: <ShoppingBag className="text-orange-500" />,
          title: "ECOMMERCE APP",
          problem: "Customers buy once → never return",
          solution: [
            "Personalized UX",
            "Push re-engagement",
            "Seamless checkout",
          ],
          outcome: "Higher repeat purchases + LTV",
        },
        {
          icon: <Calendar className="text-blue-500" />,
          title: "SERVICE / BOOKING",
          problem: "No consistent bookings / engagement",
          solution: [
            "Easy booking flows",
            "Reminder notifications",
            "Loyalty systems",
          ],
          outcome: "More bookings + recurring customers",
        },
        {
          icon: <Rocket className="text-purple-500" />,
          title: "STARTUPS / SAAS",
          problem: "Users sign up → drop off",
          solution: [
            "Onboarding optimization",
            "Feature engagement tracking",
            "Retention loops",
          ],
          outcome: "Higher activation + retention rate",
        },
      ].map((item, i) => (
        <div key={i} className="group">
          <div className="mb-8 p-4 w-fit rounded-2xl bg-[#151B28] border border-neutral-800 group-hover:border-orange-500/50 transition-colors">
            {item.icon}
          </div>
          <h3 className="text-2xl font-bold mb-6">{item.title}</h3>

          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest block mb-2">
                Problem:
              </span>
              <p className="text-neutral-400">{item.problem}</p>
            </div>

            <div>
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-2">
                Solution:
              </span>
              <ul className="space-y-2">
                {item.solution.map((s, j) => (
                  <li
                    key={j}
                    className="text-neutral-300 flex items-center gap-2"
                  >
                    <div className="w-1 h-1 rounded-full bg-blue-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
              <span className="text-xs font-bold text-green-500 uppercase tracking-widest block mb-1">
                Outcome:
              </span>
              <p className="font-bold text-neutral-200">👉 {item.outcome}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

const ProcessTimeline = () => (
  <Section
    id="process"
    className="bg-[#0B0F19] relative overflow-hidden py-10 md:py-10"
  >
    <div className="text-center mb-10 md:mb-10">
      <Badge>Our Workflow</Badge>
      <h2 className="text-3xl md:text-3xl font-bold mb-6">
        How We Build Your{" "}
        <span className="text-orange-500">Retention Engine</span>
      </h2>
      <p className="text-neutral-400 max-w-2xl mx-auto">
        A data-driven process designed to move your app from concept to a
        high-growth business asset.
      </p>
    </div>

    <div className="relative max-w-5xl mx-auto px-4">
      {/* Connecting Line */}
      <div className="absolute top-[32px] left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.5)] hidden md:block" />

      <div className="grid grid-cols-2 md:flex md:justify-between items-start relative z-10 gap-y-12 gap-x-4">
        {[
          { icon: <Search />, label: "Strategy", desc: "Market Analysis" },
          { icon: <Layout />, label: "UX Design", desc: "User Journeys" },
          { icon: <Code2 />, label: "Development", desc: "Clean Code" },
          { icon: <ShieldCheck />, label: "Testing", desc: "QA & Security" },
          { icon: <Rocket />, label: "Launch", desc: "App Store" },
          { icon: <Users />, label: "Support", desc: "Growth Ops" },
        ].map((step, i) => (
          <div key={i} className="flex flex-col items-center text-center group">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 rounded-full bg-neutral-900 border-2 border-blue-500 flex items-center justify-center relative shadow-[0_0_15px_rgba(59,130,246,0.3)] mb-4"
            >
              <div className="w-3 h-3 rounded-full bg-orange-500 absolute -top-1 -right-1 shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
              <div className="text-blue-400 group-hover:text-orange-500 transition-colors">
                {React.cloneElement(step.icon as React.ReactElement)}
              </div>
            </motion.div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">
              {step.label}
            </h4>
            <p className="text-neutral-500 text-[10px] uppercase tracking-widest">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

const Marquee = ({ children, reverse = false, className = "" }: any) => (
  <div className={`flex overflow-hidden select-none gap-4 ${className}`}>
    <motion.div
      initial={{ x: reverse ? "-50%" : "0%" }}
      animate={{ x: reverse ? "0%" : "-50%" }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="flex flex-none gap-4 min-w-full"
    >
      {children}
      {children}
    </motion.div>
  </div>
);

const IndustriesGrid = () => (
  <Section id="industries" className="bg-[#0B0F19]">
    <div className="text-center mb-16">
      <Badge>Industry Expertise</Badge>
      <h2 className="text-3xl md:text-3xl font-bold mb-6">
        Solutions for Every{" "}
        <span className="text-orange-500">Business Scenario</span>
      </h2>
      <p className="text-neutral-400 max-w-2xl mx-auto">
        We specialize in high-retention mobile experiences across diverse
        sectors, ensuring your app meets specific industry demands.
      </p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
      {[
        { icon: <ShoppingBag />, label: "Ecommerce" },
        { icon: <Zap />, label: "Fitness" },
        { icon: <ShieldCheck />, label: "Healthcare" },
        { icon: <MapPin />, label: "Logistics" },
        { icon: <Share2 />, label: "Social Media" },
        { icon: <MobileIcon />, label: "Booking" },
        { icon: <Globe />, label: "Travel" },
        { icon: <Calendar />, label: "Scheduling" },
        { icon: <CreditCard />, label: "Fintech" },
        { icon: <Database />, label: "SaaS" },
        { icon: <Users />, label: "Community" },
        { icon: <TrendingUp />, label: "Analytics" },
        { icon: <Smartphone />, label: "On-Demand" },
        { icon: <Layers />, label: "Enterprise" },
        { icon: <Rocket />, label: "Startups" },
        { icon: <ShieldCheck />, label: "Security" },
      ].map((c, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.02, y: -5 }}
          className="aspect-video rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center relative group overflow-hidden p-4"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-neutral-500 group-hover:text-blue-400 transition-colors mb-3">
            {React.cloneElement(c.icon as React.ReactElement)}
          </div>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">
            {c.label}
          </span>
        </motion.div>
      ))}
    </div>

    <div className="flex justify-center">
      <Button
        variant="outline"
        className="text-xs uppercase tracking-widest px-10"
      >
        Explore Industry Solutions <ArrowRight size={14} />
      </Button>
    </div>
  </Section>
);

const NextGenFeatures = () => (
  <Section id="features">
    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
      <div className="max-w-2xl">
        <Badge>Core Features</Badge>
        <h2 className="text-4xl md:text-3xl font-bold mb-6 uppercase tracking-tighter">
          Next-Gen Features That Fuel Exceptional{" "}
          <span className="text-orange-500">Mobile Experience</span>
        </h2>
        <p className="text-xl text-neutral-400">
          Our next-gen features & functionalities ensure your app stays ahead of
          the curve, offering smart, intuitive, and scalable solutions.
        </p>
      </div>
      <div className="flex gap-4">
        <button className="p-3 rounded-full border border-neutral-800 hover:border-orange-500 transition-colors">
          <ChevronRight className="rotate-180" />
        </button>
        <button className="p-3 rounded-full border border-neutral-800 hover:border-orange-500 transition-colors">
          <ChevronRight />
        </button>
      </div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          icon: <CreditCard className="text-orange-500" />,
          title: "In-App Payments",
          desc: "Integrate multiple payment gateways (Stripe, PayPal, Apple Pay, etc.) for secure transactions. Enable subscriptions or one-time purchases.",
        },
        {
          icon: <Bell className="text-blue-500" />,
          title: "Push Notifications",
          desc: "Keep users engaged with timely updates, promotional offers, and personalized messages based on behavioral triggers.",
        },
        {
          icon: <MapPin className="text-green-500" />,
          title: "Geolocation Tracking",
          desc: "Offer location-based services like real-time delivery tracking, nearby deals, and location-based content.",
        },
        {
          icon: <Share2 className="text-purple-500" />,
          title: "Social Media Integration",
          desc: "Allow users to sign in via Facebook, Google, or Apple ID. Enable easy sharing of content and referrals.",
        },
      ].map((feature, i) => (
        <div
          key={i}
          className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all group"
        >
          <div className="mb-6 flex justify-between items-start">
            <div className="p-3 rounded-2xl bg-neutral-800 group-hover:bg-neutral-700 transition-colors">
              {feature.icon}
            </div>
            <span className="text-neutral-700 font-black text-4xl">
              {i + 1}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            {feature.desc}
          </p>
        </div>
      ))}
    </div>
  </Section>
);

const TechStack = () => (
  <Section id="tech" className="bg-[#0B0F19] relative overflow-hidden py-10">
    <div className="text-center mb-16">
      <Badge>Our Tech Stack</Badge>
      <h2 className="text-3xl md:text-3xl font-bold mb-6 uppercase tracking-tighter">
        Built with <span className="text-orange-500">Modern Technologies</span>
      </h2>
      <p className="text-neutral-400 max-w-2xl mx-auto">
        We use the latest frameworks and tools to ensure your app is fast,
        secure, and ready to scale globally.
      </p>
    </div>

    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-blue-600/20 to-transparent blur-[120px] pointer-events-none" />
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6 relative z-10 mb-16">
      {[
        { icon: <Code2 />, label: "React Native" },
        { icon: <Layout />, label: "Next.js" },
        { icon: <Database />, label: "PostgreSQL" },
        { icon: <Cpu />, label: "Node.js" },
        { icon: <Terminal />, label: "TypeScript" },
        { icon: <Globe />, label: "Tailwind" },
        { icon: <Search />, label: "SEO Ops" },
      ].map((t, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -10, scale: 1.05 }}
          className="aspect-square rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center group relative overflow-hidden shadow-2xl p-4"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-neutral-400 group-hover:text-orange-500 transition-colors mb-3">
            {React.cloneElement(t.icon as React.ReactElement)}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors text-center">
            {t.label}
          </span>
        </motion.div>
      ))}
    </div>

    <div className="flex justify-center relative z-10">
      <Button
        variant="primary"
        className="text-xs uppercase tracking-widest px-10"
      >
        View Full Tech Capabilities <ArrowRight size={14} />
      </Button>
    </div>
  </Section>
);

const CaseStudies = () => {
  const [activeTab, setActiveTab] = useState("On Demand");

  const tabs = [
    "Drone Delivery",
    "AI Solutions",
    "On Demand",
    "ERP",
    "Real Estate",
    "E-commerce",
    "Gaming",
    "Fintech",
    "Blockchain",
  ];

  const caseData: any = {
    "On Demand": {
      title: "Dinein",
      desc: "An innovative food ordering and delivery platform with cutting-edge features and a highly personalized user experience to drive sales.",
      downloads: "20k+",
      conversion: "30%",
      color: "orange",
    },
    "Drone Delivery": {
      title: "SkyFetch",
      desc: "Autonomous drone delivery system for medical supplies in remote areas, featuring real-time tracking and obstacle avoidance.",
      downloads: "5k+",
      conversion: "45%",
      color: "blue",
    },
    "AI Solutions": {
      title: "CogniApp",
      desc: "AI-powered personal assistant that learns user habits to automate daily tasks and improve productivity by 40%.",
      downloads: "50k+",
      conversion: "25%",
      color: "purple",
    },
    ERP: {
      title: "BizFlow",
      desc: "Enterprise resource planning mobile app for real-time inventory management and team collaboration across multiple locations.",
      downloads: "10k+",
      conversion: "20%",
      color: "green",
    },
    "Real Estate": {
      title: "PropView",
      desc: "AR-powered real estate app that allows users to visualize furniture and renovations in properties before buying.",
      downloads: "15k+",
      conversion: "35%",
      color: "pink",
    },
    "E-commerce": {
      title: "ShopSwift",
      desc: "High-performance e-commerce app with AI-driven product recommendations and one-click checkout.",
      downloads: "100k+",
      conversion: "15%",
      color: "orange",
    },
    Gaming: {
      title: "QuestBound",
      desc: "Multiplayer AR RPG that turns your city into a fantasy world, with real-time combat and social features.",
      downloads: "500k+",
      conversion: "10%",
      color: "blue",
    },
    Fintech: {
      title: "WealthWise",
      desc: "Personal finance and investment app with automated portfolio rebalancing and real-time market insights.",
      downloads: "25k+",
      conversion: "40%",
      color: "green",
    },
    Blockchain: {
      title: "ChainSafe",
      desc: "Secure mobile wallet for managing multiple cryptocurrencies and interacting with decentralized applications (dApps).",
      downloads: "30k+",
      conversion: "22%",
      color: "purple",
    },
  };

  const current = caseData[activeTab] || caseData["On Demand"];

  return (
    <Section id="cases" className="bg-neutral-950">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <Badge>Success Stories</Badge>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
            How We Helped Top Brands Build{" "}
            <span className="text-orange-500">Winning Apps</span>
          </h2>
        </div>

      </div>

      <div className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex gap-10 border-b border-neutral-900 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-6 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? "text-orange-500" : "text-neutral-300"
                }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabCase"
                  className="absolute bottom-0 left-0 w-full h-1 bg-orange-600"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl md:rounded-[4rem] overflow-hidden aspect-[16/9] md:aspect-[21/9] min-h-[400px] md:min-h-[500px] border border-neutral-800 group"
      >
        <img
          src={`https://picsum.photos/seed/${activeTab}/1600/800`}
          alt={activeTab}
          className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent" />

        <div className="absolute inset-0 p-12 md:p-20 flex flex-col justify-center max-w-3xl">
          <div className="w-24 h-24 rounded-3xl border-2 border-white/10 flex items-center justify-center mb-10 backdrop-blur-md bg-white/5">
            <span className="text-sm font-black uppercase tracking-tighter text-white">
              {current.title}
            </span>
          </div>
          <h3 className="text-3xl md:text-3xl font-black text-white mb-8 leading-tight uppercase tracking-tighter">
            {current.title}: {activeTab} Platform
          </h3>
          <p className="text-xl md:text-2xl text-neutral-400 mb-12 leading-relaxed font-medium">
            {current.desc}
          </p>

          <div className="flex gap-16 mb-12">
            <div>
              <p className="text-4xl md:text-4xl font-black text-white mb-2 tracking-tighter">
                {current.downloads}
              </p>
              <p className="text-xs font-black text-neutral-500 uppercase tracking-[0.2em]">
                Downloads
              </p>
            </div>
            <div>
              <p className="text-4xl md:4xl font-black text-white mb-2 tracking-tighter flex items-center gap-3">
                {current.conversion}{" "}
                <TrendingUp size={32} className="text-green-500" />
              </p>
              <p className="text-xs font-black text-neutral-500 uppercase tracking-[0.2em]">
                Conversion Lift
              </p>
            </div>
          </div>
          <Link href="/contact">

            <Button
              variant="outline"
              className="w-fit border-white/20 text-white hover:text-neutral-950 px-10 py-5 text-lg"
            >
              Let&apos;s Build Yours <ArrowRight size={20} />
            </Button>
          </Link>

        </div>
      </motion.div>
    </Section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "How much do mobile app development services cost?",
      a: "Costs vary based on complexity, features, and platform. We provide custom quotes after a discovery session where we map out your growth goals.",
    },
    {
      q: "What software development services do you offer?",
      a: "We offer end-to-end mobile app development, UI/UX design focused on retention, backend architecture, and post-launch growth support.",
    },
    {
      q: "How long does it take to build a mobile app?",
      a: "A typical MVP takes 3-4 months, while complex enterprise apps can take 6-12 months. We use agile sprints to deliver value early.",
    },
    {
      q: "Do you offer post-launch support and maintenance?",
      a: "Yes, we provide ongoing maintenance, security updates, and feature enhancements to ensure your app stays ahead of the curve.",
    },
    {
      q: "How do you ensure the security and quality of the app?",
      a: "We follow strict QA protocols, automated testing, and security audits throughout the development lifecycle to protect your users and data.",
    },
    {
      q: "How do you handle project management and communication?",
      a: "We use Agile methodologies with weekly sprints and transparent communication via Slack, Jira, and regular video check-ins.",
    },
    {
      q: "How do you ensure a seamless user experience in your designs?",
      a: "Through deep user research, wireframing, prototyping, and iterative usability testing focused on habit-forming UX patterns.",
    },
    {
      q: "Why is NEXZen the best mobile app development company?",
      a: "Because we don't just build products; we build retention engines. Our focus is on your business growth and user engagement.",
    },
  ];

  return (
    <Section id="faq" className="bg-neutral-950">
      <div className="grid lg:grid-cols-[400px_1fr] gap-20">
        <div>
          <Badge>Got Questions?</Badge>
          <h2 className="text-3xl md:text-4xl font-black mb-8 uppercase tracking-tighter">
            Frequently <br /> <span className="text-orange-500">Asked</span>
          </h2>
          <p className="text-xl text-neutral-400 leading-relaxed">
            Everything you need to know about our process, pricing, and how we
            build apps that grow businesses.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-[2rem] border transition-all duration-500 ${openIndex === i
                  ? "bg-[#151B28] border-orange-500/50"
                  : "bg-[#151B28]/50 border-neutral-800 hover:border-neutral-700"
                }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-8 flex items-center justify-between text-left group"
              >
                <span
                  className={`text-lg md:text-xl font-black uppercase tracking-tight transition-colors ${openIndex === i ? "text-orange-500" : "text-neutral-200"}`}
                >
                  {faq.q}
                </span>
                <div
                  className={`p-2 rounded-full border transition-all duration-500 ${openIndex === i ? "bg-orange-600 border-orange-500 rotate-180" : "bg-neutral-800 border-neutral-700"}`}
                >
                  <ChevronDown
                    className={
                      openIndex === i ? "text-white" : "text-neutral-400"
                    }
                    size={20}
                  />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="px-8 pb-8 text-neutral-400 text-lg leading-relaxed"
                  >
                    <div className="pt-4 border-t border-neutral-800">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const Objection = () => (
  <Section>
    <div className="max-w-3xl mx-auto p-12 rounded-[3rem] bg-[#151B28] border border-neutral-800">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        “We Already Have an App”
      </h2>

      <div className="space-y-8 mb-12">
        {[
          { q: "If users don’t return", a: "It’s broken" },
          { q: "If you can’t track behavior", a: "You can’t improve" },
          { q: "If engagement is low", a: "You’re losing revenue" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row md:items-center justify-between gap-2 py-4 border-b border-neutral-800"
          >
            <span className="text-lg text-neutral-400">{item.q}</span>
            <span className="text-xl font-bold text-orange-500">
              → {item.a}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-2xl font-bold mb-2">Reframe:</p>
        <p className="text-3xl font-black text-neutral-100 uppercase tracking-tight">
          Having an app <span className="text-red-500">≠</span> Having a growth
          engine
        </p>
      </div>
    </div>
  </Section>
);

const Offer = () => (
  <Section className="bg-orange-600 rounded-[4rem] my-20 mx-6 text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

    <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
      <div>
        <h2 className="text-4xl md:text-4xl font-black mb-8 leading-tight">
          Get a Mobile App <br /> Growth Audit
        </h2>
        <p className="text-xl text-orange-100 mb-10">
          Fix your retention before you spend more on acquisition.
        </p>
        <Button className="bg-white text-orange-600 hover:bg-orange-50 w-full sm:w-auto">
          Get My App Strategy <ArrowRight size={20} />
        </Button>
      </div>

      <div className="bg-black/20 p-10 rounded-3xl backdrop-blur-sm border border-white/10">
        <h3 className="text-2xl font-bold mb-8">You’ll get:</h3>
        <ul className="space-y-6">
          {[
            "UX breakdown",
            "Retention gaps",
            "Engagement improvement plan",
            "Growth roadmap",
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-4 text-lg font-medium">
              <CheckCircle2 className="text-orange-300" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Section>
);

const Footer = () => (
  <footer className="py-10 px-6 bg-[#0B0F19] border-t border-neutral-900 relative overflow-hidden">
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-10 pointer-events-none">
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[150px]" />
    </div>

    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid lg:grid-cols-2 gap-20 mb-32">
        <div>
          <div className="text-4xl font-black tracking-tighter flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-xl">
              N
            </div>
            NEX<span className="text-orange-500">Zen</span>
          </div>
          <h2 className="text-4xl md:text-4xl font-black mb-10 tracking-tighter uppercase leading-[0.9]">
            Every User You Lose Is <br />{" "}
            <span className="text-orange-500">Revenue</span> You Already Paid
            For.
          </h2>
          <p className="text-xl text-neutral-500 max-w-md leading-relaxed">
            NEXZen is a retention-first mobile app development agency. we build
            growth engines, not just products.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 mb-8">
              Services
            </h4>
            <ul className="space-y-4 text-neutral-500 font-bold text-sm">
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  App Strategy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  UI/UX Design
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  iOS Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Android Development
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 mb-8">
              Company
            </h4>
            <ul className="space-y-4 text-neutral-500 font-bold text-sm">
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 mb-8">
              Connect
            </h4>
            <ul className="space-y-4 text-neutral-500 font-bold text-sm">
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Dribbble
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-8 text-neutral-600 text-xs font-black uppercase tracking-widest">
        <p>© 2026 NEXZen App Systems. All rights reserved.</p>
        <div className="flex gap-10">
          <a href="#" className="hover:text-orange-500 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-orange-500 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main Page ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-[#0B0F19]/80 backdrop-blur-xl border-b border-neutral-900/50 px-6 py-5">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="text-3xl font-black tracking-tighter flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white text-lg">
          N
        </div>
        NEX<span className="text-orange-500">Zen</span>
      </div>

      <div className="hidden md:flex items-center gap-10">
        {["Process", "Industries", "Features", "Tech", "Cases", "FAQ"].map(
          (item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs font-black uppercase tracking-widest text-neutral-400 hover:text-orange-500 transition-colors"
            >
              {item}
            </a>
          ),
        )}
      </div>

      <Button
        variant="primary"
        className="hidden md:flex px-8 py-3 text-xs uppercase tracking-widest"
      >
        Free App Audit
      </Button>

      <button className="md:hidden p-2 text-neutral-400">
        <Layout size={24} />
      </button>
    </div>
  </nav>
);

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-neutral-100 selection:bg-orange-500 selection:text-white">
      {/* <Navbar /> */}

      <div className="space-y-0">
        <Hero />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Pain />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Reframe />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Framework />
        </motion.div>

        <div id="industries">
          <IndustriesGrid />
        </div>

        <div id="process">
          <ProcessTimeline />
        </div>

        <div id="tech">
          <TechStack />
        </div>

        <div id="cases">
          <CaseStudies />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <UseCases />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Objection />
        </motion.div>

        <div id="faq">
          <FAQ />
        </div>

        {/* <Offer /> */}
        {/* <Footer /> */}
      </div>

      {/* Sticky CTA for Mobile */}

    </main>
  );
}
