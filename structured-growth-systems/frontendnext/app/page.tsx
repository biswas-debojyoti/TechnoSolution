"use client";
import {
  motion,
  useInView,
  animate,
} from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
// import gridImage from '../assets/fullchart.jpeg';
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
import { Blog, FeaturedCard } from "@/app/Blog/page";
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



export default function Home() {
  const [featuredBlog, setFeaturedBlog] = useState<Blog | null>(null);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

  useEffect(() => {
    async function fetchLatestFeatured() {
      try {
        const res = await fetch(`${BASE_URL}/blogs?isFeatured=true&limit=1`);
        const json = await res.json();
        const list = Array.isArray(json) ? json : (json?.data || json?.blogs || []);
        if (list[0]) setFeaturedBlog(list[0]);
      } catch (err) {
        console.error("Failed to fetch featured blog on Home:", err);
      }
    }
    fetchLatestFeatured();
  }, [BASE_URL]);

  return (
    <div className="w-full">
    
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/image/nexzenbanner2.jpeg" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-fit">
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
      
      {/* LATEST INSIGHTS SECTION */}
      <section className="pt-24 pb-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold mb-6"
            >
              Strategic <span className="text-brand-orange">Insights</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/60 text-lg max-w-2xl mx-auto"
            >
              Learn real strategies, case studies, and frameworks used to scale brands profitably.
            </motion.p>
          </div>

          {featuredBlog && (
            <div className="mb-16">
              <FeaturedCard blog={featuredBlog} />
            </div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Link
              href="/Blog"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-bold hover:bg-brand-orange hover:text-black transition-all duration-300 shadow-xl"
            >
              View All Articles
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[140px] -z-10" />
      </section>

      
    </div>
  );
}
