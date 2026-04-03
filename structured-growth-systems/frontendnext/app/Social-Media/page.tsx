"use client";

import React from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Play,
  Zap,
  Target,
  BarChart3,
  Users,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  MousePointer2,
  Lock,
  ChevronRight,
  Quote,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// --- Components ---

const Section = ({
  children,
  className = "",
  id = "",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <section
    id={id}
    className={`py-20 px-6 md:px-12 max-w-7xl mx-auto ${className}`}
  >
    {children}
  </section>
);

const Button = ({
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
}) => {
  const base =
    "px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base";
  const variants = {
    primary: "bg-[#FF6321] text-white hover:bg-[#e55a1e] orange-glow",
    secondary: "bg-white text-black hover:bg-gray-200",
    outline: "border border-white/20 text-white hover:bg-white/5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${base} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 rounded-full bg-[#FF6321]/10 border border-[#FF6321]/30 text-[#FF6321] text-xs font-bold uppercase tracking-widest mb-6 inline-block">
    {children}
  </span>
);

// --- Sections ---

const AdMockup = ({
  seed,
  metrics,
  className = "",
}: {
  seed: string;
  metrics?: { roas: string; ctr: string };
  className?: string;
}) => (
  <motion.div
    whileHover={{ y: -10, scale: 1.02 }}
    className={`aspect-[9/16] glass rounded-2xl overflow-hidden relative group ${className}`}
  >
    <img
      src={`https://picsum.photos/seed/${seed}/400/700`}
      alt="Ad Creative"
      className="object-cover group-hover:scale-110 transition-transform duration-700"
      referrerPolicy="no-referrer"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-4">
      {metrics && (
        <div className="flex gap-2 mb-4">
          <div className="px-2 py-1 rounded bg-[#FF6321] text-[10px] font-black uppercase tracking-tighter">
            {metrics.roas} ROAS
          </div>
          <div className="px-2 py-1 rounded bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-tighter">
            {metrics.ctr} CTR
          </div>
        </div>
      )}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/10" />
        <div className="space-y-1">
          <div className="h-2 w-20 bg-white/20 rounded-full" />
          <div className="h-1.5 w-12 bg-white/10 rounded-full" />
        </div>
      </div>
    </div>

    {/* Interactive Overlay */}
    <div className="absolute inset-0 bg-[#FF6321]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-white text-[#FF6321] flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500">
        <Play fill="currentColor" size={20} className="ml-1" />
      </div>
    </div>
  </motion.div>
);

const Hero = () => (
  <Section className="min-h-[100vh] flex flex-col items-center justify-center text-center relative overflow-hidden pt-10">
    {/* Background Elements */}
    <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#FF6321]/10 blur-[150px] rounded-full animate-pulse" />
    <div className="absolute bottom-1/4 -right-20 w-[400px] h-[500px] bg-[#FF6321]/5 blur-[150px] rounded-full animate-pulse" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="z-10 mb-20"
    >
      <Badge>Pattern Break + Emotional Hook</Badge>
      <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-[0.85] mb-8">
        Your Ads Don’t Fail <br />
        <span className="text-[#FF6321] drop-shadow-[0_0_30px_rgba(255,99,33,0.3)]">
          Because of Budget.
        </span>
      </h1>
      <p className="text-2xl md:text-4xl font-display italic text-white/60 mb-12 max-w-4xl mx-auto">
        They Fail Because Nobody Cares.
      </p>
      <p className="text-lg md:text-xl text-white/40 mb-12 max-w-2xl mx-auto font-sans leading-relaxed">
        We turn attention into revenue using high-converting creatives,
        psychological targeting, and full-funnel paid social systems.
      </p>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        <Button className="text-lg px-10 py-5">
          Get Free Creative + Funnel Audit <ArrowRight size={22} />
        </Button>
     
      </div>
    </motion.div>

    {/* Floating Ad Mockups - Enhanced Grid */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full max-w-6xl">
      <AdMockup
        seed="nex1"
        metrics={{ roas: "4.2x", ctr: "3.1%" }}
        className="md:mt-12"
      />
      <AdMockup
        seed="nex2"
        metrics={{ roas: "5.8x", ctr: "2.8%" }}
        className="hidden md:block"
      />
      <AdMockup
        seed="nex3"
        metrics={{ roas: "3.5x", ctr: "4.2%" }}
        className="md:-mt-12"
      />
      <AdMockup
        seed="nex4"
        metrics={{ roas: "6.1x", ctr: "2.5%" }}
        className="hidden md:block"
      />
      <AdMockup
        seed="nex5"
        metrics={{ roas: "4.9x", ctr: "3.4%" }}
        className="md:mt-8"
      />
    </div>
  </Section>
);

const Problem = () => (
  <Section className="bg-white/2">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div>
        <Badge>The Real Problem</Badge>
        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
          Why Most Social <br />
          <span className="text-[#FF6321]">Ads Burn Money</span>
        </h2>
        <div className="space-y-6">
          {[
            "Your creatives look like ads → people scroll past",
            "You target broad audiences → no emotional connection",
            "You boost posts instead of building funnels",
            "You rely on one winning ad → no testing system",
            "You get clicks → but no conversions",
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4"
            >
              <AlertCircle className="text-[#FF6321] shrink-0 mt-1" size={24} />
              <p className="text-xl text-white/70">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="glass p-12 rounded-3xl relative">
        <div className="absolute -top-10 right-6 w-24 h-24 bg-[#FF6321] rounded-full flex items-center justify-center font-black text-2xl rotate-12">
          STOP
        </div>
        <p className="text-3xl md:text-4xl font-display italic leading-tight mb-8">
          "Social ads don’t convert traffic. They convert{" "}
          <span className="text-[#FF6321]">attention + emotion + trust.</span>"
        </p>
        <div className="flex items-center gap-4 text-white/40">
          <div className="h-[1px] flex-1 bg-white/10" />
          <span className="text-sm uppercase tracking-widest">
            NEXZen Philosophy
          </span>
        </div>
      </div>
    </div>
  </Section>
);

const Reframe = () => (
  <Section className="text-center">
    <Badge>The Reframe</Badge>
    <h2 className="tex3-4xl md:text-4xl font-black mb-12 max-w-4xl mx-auto leading-tight">
      Social Ads Are Not Advertising. <br />
      <span className="text-[#FF6321]">They’re Behavioral Engineering.</span>
    </h2>

    <div className="grid md:grid-cols-2 gap-8 mb-20">
      <div className="glass p-10 rounded-3xl text-left border-white/5">
        <h3 className="text-white/40 uppercase tracking-widest text-sm mb-6">
          Most Businesses Think:
        </h3>
        <p className="text-3xl font-bold">
          Run ads <ArrowRight className="inline mx-2 text-[#FF6321]" /> get
          leads
        </p>
      </div>
      <div className="glass p-10 rounded-3xl text-left border-[#FF6321]/30 bg-[#FF6321]/5">
        <h3 className="text-[#FF6321] uppercase tracking-widest text-sm mb-6 font-bold">
          The Reality:
        </h3>
        <p className="text-3xl font-bold">
          Hook attention <ArrowRight className="inline mx-2 text-[#FF6321]" />{" "}
          trigger emotion <ArrowRight className="inline mx-2 text-[#FF6321]" />{" "}
          build trust <ArrowRight className="inline mx-2 text-[#FF6321]" />{" "}
          convert
        </p>
      </div>
    </div>

    <div className="flex flex-wrap justify-center gap-4">
      {[
        "Scroll",
        "Hook",
        "Watch",
        "Click",
        "Trust",
        "Convert",
        "Retarget",
        "Multiply",
      ].map((step, i) => (
        <React.Fragment key={step}>
          <div className="px-6 py-3 glass rounded-full font-bold text-lg">
            {step}
          </div>
          {i < 7 && <ChevronRight className="text-white/20 self-center" />}
        </React.Fragment>
      ))}
    </div>
  </Section>
);

const CoreSystem = () => {
  const systems = [
    {
      title: "Creative Psychology System",
      Icon: Zap,
      points: [
        "Scroll-stopping hooks (first 2 seconds)",
        "UGC-style ads (native feel, not polished ads)",
        "Pattern interrupts + curiosity triggers",
      ],
      outcome: "People STOP scrolling",
    },
    {
      title: "Audience Intelligence Layer",
      Icon: Target,
      points: [
        "Interest + behavior + lookalike stacking",
        "Micro-segmentation (not broad targeting)",
        "Creative-to-audience matching",
      ],
      outcome: "Right message → right person",
    },
    {
      title: "Funnel-Based Campaign Design",
      Icon: BarChart3,
      points: [
        "Cold (awareness) → Warm (consideration) → Hot (conversion)",
        "Retargeting sequences",
        "Offer positioning per stage",
      ],
      outcome: "Traffic doesn’t leak",
    },
    {
      title: "Testing & Scaling Framework",
      Icon: TrendingUp,
      points: [
        "Creative testing (angles, hooks, formats)",
        "Kill losers fast, scale winners aggressively",
        "Budget allocation based on performance",
      ],
      outcome: "Predictable growth",
    },
  ];

  return (
    <Section className="bg-[#FF6321]/5 rounded-[4rem]">
      <div className="text-center mb-20">
        <Badge>Our Weapon</Badge>
        <h2 className="text-4xl md:text-6xl font-black">
          The NEXZen Paid Social Engine 
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {systems.map((sys, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="glass p-10 rounded-[2.5rem] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <sys.Icon size={120} className="text-[#FF6321]" />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#FF6321]/20 flex items-center justify-center">
                <sys.Icon size={24} className="text-[#FF6321]" />
              </div>
              <h3 className="text-2xl font-bold">{sys.title}</h3>
            </div>
            <ul className="space-y-4 mb-10">
              {sys.points.map((p, pi) => (
                <li key={pi} className="flex items-start gap-3 text-white/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF6321] mt-2 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="pt-6 border-t border-white/10">
              <p className="text-[#FF6321] font-black uppercase tracking-widest text-xs mb-2">
                Outcome
              </p>
              <p className="text-xl font-bold">{sys.outcome}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

const Process = () => (
  <Section>
    <div className="text-center mb-20">
      <Badge>The Systematic Approach</Badge>
      <h2 className="text-4xl md:text-6xl font-black mb-6">
        How We Turn Scrolls Into Sales
      </h2>
      <p className="text-xl text-white/40 italic">
        "We don’t guess creatives. We engineer them."
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-12">
      {[
        {
          step: "01",
          title: "Market + Audience Deep Dive",
          desc: "We find where your customers hang out and what triggers their emotions.",
        },
        {
          step: "02",
          title: "Creative Strategy",
          desc: "Developing angles, hooks, and messaging that disrupt the scroll.",
        },
        {
          step: "03",
          title: "Ad Production",
          desc: "UGC, high-energy video, and static creatives designed for conversion.",
        },
        {
          step: "04",
          title: "Funnel + Campaign Setup",
          desc: "Building the architecture that captures and nurtures every click.",
        },
        {
          step: "05",
          title: "Launch + Rapid Testing",
          desc: "Real-world data collection to find the winning combinations fast.",
        },
        {
          step: "06",
          title: "Scale Winning Combinations",
          desc: "Aggressive budget allocation to winners to maximize ROAS.",
        },
      ].map((item, i) => (
        <div key={i} className="relative">
          <span className="text-4xl font-black text-white/5 absolute -top-10 -left-4">
            {item.step}
          </span>
          <h3 className="text-2xl font-bold mb-4 relative z-10">
            {item.title}
          </h3>
          <p className="text-white/50 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </Section>
);

const BeforeAfter = () => {
  const [sliderPos, setSliderPos] = React.useState(50);

  return (
    <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden glass border-white/10">
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/seed/after/1200/800"
          alt="After"
          className="object-cover"
        />
        <div className="absolute top-4 right-4 bg-[#FF6321] px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest z-20">
          NEXZen Engineered Ad
        </div>
      </div>

      <div
        className="absolute inset-0 z-10"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img
          src="https://picsum.photos/seed/before/1200/800"
          alt="Before"
          className="object-cover grayscale"
        />
        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest">
          Generic "Corporate" Ad
        </div>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(parseInt(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
      />

      <div
        className="absolute top-0 bottom-0 w-1 bg-white z-20 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-2xl">
          <MousePointer2 size={20} className="text-[#FF6321]" />
        </div>
      </div>
    </div>
  );
};

const Results = () => (
  <Section className="bg-white/2 rounded-[4rem]">
    <div className="grid lg:grid-cols-2 gap-20 items-center">
      <div>
        <Badge>The Impact</Badge>
        <h2 className="text-4xl md:text-6xl font-black mb-12">
          What This Changes for Your Business
        </h2>
        <div className="space-y-8 mb-12">
          {[
            {
              title: "Lower CPA",
              desc: "Reduce your cost per acquisition through better creative efficiency.",
            },
            {
              title: "Higher Engagement",
              desc: "Better algorithm performance as people actually watch your ads.",
            },
            {
              title: "Consistent Flow",
              desc: "A predictable stream of new customers hitting your funnel daily.",
            },
            {
              title: "Scalable Growth",
              desc: "An engine that can handle 10x the budget without breaking.",
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-[#FF6321]/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="text-[#FF6321]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-white/50">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="glass p-6 rounded-3xl border-red-500/20 flex justify-between items-center">
            <span className="text-red-500 font-bold uppercase tracking-widest text-xs">
              The Old Way
            </span>
            <span className="text-xl font-bold text-white/40">
              Random Ads → Expense
            </span>
          </div>
          <div className="glass p-8 rounded-3xl border-[#FF6321]/50 bg-[#FF6321]/10 relative overflow-hidden flex justify-between items-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6321]/20 blur-3xl" />
            <span className="text-[#FF6321] font-bold uppercase tracking-widest text-xs">
              The NEXZen Way
            </span>
            <span className="text-2xl font-black">
              Engineered Social System → Revenue Machine
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-center mb-4">
          Creative Engineering Comparison
        </h3>
        <BeforeAfter />
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "CTR", val: "+142%", color: "text-green-400" },
            { label: "ROAS", val: "3.8x", color: "text-[#FF6321]" },
            { label: "CPA", val: "-45%", color: "text-green-400" },
          ].map((stat, i) => (
            <div key={i} className="glass p-4 rounded-2xl text-center">
              <p className="text-[10px] text-white/40 uppercase font-black mb-1">
                {stat.label}
              </p>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

const Proof = () => (
  <Section>
    <div className="text-center mb-20">
      <Badge>Proof of Concept</Badge>
      <h2 className="text-4xl md:text-6xl font-black">
        Real Results. Real Growth.
      </h2>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          type: "D2C Brand",
          problem: "Low ROAS",
          solution: "Creative Overhaul",
          result: "3.8x ROAS",
        },
        {
          type: "Info Product",
          problem: "No Conversions",
          solution: "Funnel Fix",
          result: "2x Leads",
        },
        {
          type: "Local Service",
          problem: "No Visibility",
          solution: "Paid Social Engine",
          result: "Consistent Inbound",
        },
      ].map((item, i) => (
        <div key={i} className="glass p-10 rounded-[2.5rem] border-white/5">
          <p className="text-[#FF6321] font-bold mb-4">{item.type}</p>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Problem:</span>
              <span className="font-bold">{item.problem}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Solution:</span>
              <span className="font-bold">{item.solution}</span>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 text-center">
            <p className="text-4xl font-black text-[#FF6321]">{item.result}</p>
          </div>
        </div>
      ))}
    </div>
  </Section>
);



const Offer = () => (
  <Section id="audit" className="text-center">
    <div className="glass p-12 md:p-24 rounded-[4rem] border-[#FF6321]/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-[#FF6321]" />
      <Badge>The Offer</Badge>
      <h2 className="text-4xl md:text-7xl font-black mb-8">
        Get a Free Paid Social Audit
      </h2>
      <p className="text-xl text-white/60 mb-16 max-w-2xl mx-auto">
        Stop guessing and start engineering. We'll tear down your current
        strategy and show you exactly where the leaks are.
      </p>

      <div className="grid md:grid-cols-4 gap-6 mb-16 text-left">
        {[
          {
            title: "Creative Breakdown",
            desc: "Why your ads fail to stop the scroll.",
          },
          {
            title: "Funnel Leak Analysis",
            desc: "Where you're losing potential revenue.",
          },
          {
            title: "Audience Gaps",
            desc: "Who you're missing in your targeting.",
          },
          { title: "Quick-Win Plan", desc: "Immediate steps to improve ROAS." },
        ].map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-3xl bg-white/5 border border-white/5"
          >
            <h3 className="font-bold mb-2 text-[#FF6321]">{item.title}</h3>
            <p className="text-sm text-white/40">{item.desc}</p>
          </div>
        ))}
      </div>

      <Link href="/contact" className="inline-block">
        <Button className="mx-auto text-xl px-12 py-6">
          Get My Audit <ArrowRight />
        </Button>
      </Link>
    </div>
  </Section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      q: "How soon can we expect to see a ROAS improvement?",
      a: "Most clients see a significant shift in their 'Thumb-Stop Rate' and CTR within the first 7-14 days of launching our engineered creatives. Full funnel stabilization and ROAS scaling typically occur between weeks 4 and 6 as our testing engine identifies the winning combinations.",
    },
    {
      q: "Do you handle the actual ad production (UGC, Video, Design)?",
      a: "Yes. We are a full-service conversion architecture firm. We handle everything from creative strategy and scriptwriting to high-energy video production, UGC coordination, and static design. We don't just run ads; we build the assets that make them work.",
    },
    {
      q: "Which platforms do you specialize in?",
      a: "Our core expertise lies in Meta (Facebook & Instagram), TikTok, and YouTube. We focus on platforms where 'Attention Arbitrage' is highest and where psychological creative triggers have the most impact on conversion.",
    },
    {
      q: "What is the minimum ad spend you work with?",
      a: "To effectively run our Testing & Scaling Framework, we typically recommend a minimum monthly ad spend of $5,000. This ensures we have enough data volume to kill losers fast and scale winners aggressively without statistical noise.",
    },
    {
      q: "How are you different from a traditional 'Media Buying' agency?",
      a: "Traditional agencies focus on buttons and settings inside the Ad Manager. We focus on Behavioral Engineering. We believe the creative is the targeting. We build full-funnel systems that combine psychology, high-converting assets, and data-driven scaling—not just 'boosting posts'.",
    },
  ];

  return (
    <Section id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Badge>Common Questions</Badge>
          <h2 className="text-4xl md:text-6xl font-black">
            Objections Handled.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="glass rounded-3xl overflow-hidden border-white/5"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-8 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
              >
                <span className="text-xl font-bold pr-8">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  className="text-[#FF6321] shrink-0"
                >
                  <ChevronRight />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === i ? "auto" : 0,
                  opacity: openIndex === i ? 1 : 0,
                }}
                className="overflow-hidden"
              >
                <div className="p-8 pt-0 text-white/50 leading-relaxed border-t border-white/5 mt-4">
                  {faq.a}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};




// --- Main Page ---

export default function LandingPage() {
  return (
    <main className="relative">
      {/* <Navbar /> */}
      <Hero />
      <Problem />
      <Reframe />
      <CoreSystem />
      <Process />
      <Results />
      <Proof />
      {/* <Objection /> */}
      <FAQ />
      <Offer />


      {/* Sticky CTA for Mobile */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
        <Button className="w-full py-5 shadow-2xl">
          Get Free Audit <ArrowRight size={18} />
        </Button>
      </div>
    </main>
  );
}
