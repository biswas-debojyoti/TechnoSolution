"use client";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  animate,
} from "motion/react";
import {
  ArrowRight,
  BarChart2,
  BookOpen,
  Target,
  Zap,
  CheckCircle2,
  Trophy,
  TrendingUp,
  Search,
  LayoutTemplate,
  Tag,
  PlaySquare,
  Smartphone,
  MousePointer2,
} from "lucide-react";
// import gridImage from '../assets/fullchart.jpeg';
import MarketingDiagnosisOffer from "../components/MarketingDiagnosisOffer";
import SEO from "../components/SEO";
import CourseBanner from "../components/CourseBanner";
import Link from "next/link";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Problem from "@/components/HomeComponent/Problem";
import SystemPositioning from "@/components/HomeComponent/SystemPositioning";
import EntryPoints from "@/components/HomeComponent/EntryPoints";
import Offer from "@/components/HomeComponent/Offer";
import Process from "@/components/HomeComponent/Process";
import Authority from "@/components/HomeComponent/Authority";
import Differentiation from "@/components/HomeComponent/Differentiation";
import Services from "@/components/HomeComponent/Services";
import Insights from "@/components/HomeComponent/Insights";
import Footer from "@/components/HomeComponent/Footer";
// import Services from "./Services/page";
const InlineWidget = lazy(() =>
  import("react-calendly").then((mod) => ({ default: mod.InlineWidget })),
);

function Counter({
  value,
  prefix = "",
  suffix = "",
}: {
  value: string;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
      const controls = animate(0, numericValue, {
        duration: 2,
        onUpdate: (latest) => {
          if (value.includes(".")) {
            setDisplayValue(latest.toFixed(1));
          } else {
            setDisplayValue(Math.floor(latest).toString());
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }} className="h-full">
        {children}
      </div>
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(250, 204, 21, 0.15) 0%, transparent 70%)",
          transform: "translateZ(-10px)",
        }}
      />
    </motion.div>
  );
}

export default function Home() {


 
  return (
    <div className="w-full">
   
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" />

        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-15 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-fit">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-sm font-medium tracking-wide text-white/80 uppercase">
                Performance Marketing Strategist & Author
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-display font-bold leading-[1.1] tracking-tight">
              Performance Marketing That Turns Ad Spend Into Profit

            </h1>

            <p className="text-sm text-white/60 leading-relaxed max-w-xl">
              Scale your business with a performance marketing agency focused on Google Ads, Meta Ads, and measurable revenue growth.
            </p>

            {/* <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/contact"
                className="btn-glow group relative px-8 py-4 bg-brand-orange text-black rounded-full font-bold text-lg overflow-hidden flex items-center justify-center gap-2 transition-transform hover:scale-105"
              >
                <span className="relative z-10"> Book Strategy Call</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

            </div> */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a
                href="tel:8383997723">
                <button className="px-8 py-4 bg-brand-orange text-background font-bold rounded-full flex items-center justify-center gap-2 hover:scale-105 transition-transform group">
                  Book Free Strategy Call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </a>
              <Link
                href="/contact">
                <button className="btn-glow group relative px-8 py-4 bg-brand-orange text-black rounded-full font-bold text-lg overflow-hidden flex items-center justify-center gap-2 transition-transform hover:scale-105">
                  Get Free Ad Audit
                </button>
              </Link>
            </div>
              <div className="flex flex-wrap gap-6">
              {[
                "$500K+ Ad Spend Managed",
                "Multi-Market (India | UK | USA)",
                "Profit-Focused Scaling Systems"
              ].map((stat) => (
                <div key={stat} className="flex items-center gap-2 text-xs font-medium text-#A1A1AA uppercase">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6A00]" />
                  {stat}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="profile-wrapper h-100 w-100 mx-auto">
              <div className="rotating-ring"></div>
              <div className="profile-image-container ">
                <img
                  src="/image/profileImage.jpeg"
                  alt="Sayed Shahid"
                  width="320"
                  height="320"
                  className="w-full h-full object-cover shadow-2xl"
                  referrerPolicy="no-referrer"
                  fetchPriority="high"
                />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 to-transparent rounded-full blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </section>
      {/* <CourseBanner /> */}

      <Problem />
      <SystemPositioning/>
      <EntryPoints/>
      <Offer/>
      <Process/>
      <Authority/>
      <Differentiation/>
      <Services/>
     <Insights/>
     {/* <Footer/> */}

      
    </div>
  );
}
