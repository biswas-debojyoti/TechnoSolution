"use client";
import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

interface MarketingDiagnosisOfferProps {
  className?: string;
}

export default function MarketingDiagnosisOffer({ className = "" }: MarketingDiagnosisOfferProps) {
  return (
    <div className={`max-w-7xl mx-auto px-6 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative group"
      >
        {/* The Glow effect */}
        <div className="absolute inset-0 bg-brand-orange rounded-[32px] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
        
        {/* The Main Container with Animated Border */}
        <div className="relative bg-gradient-to-r from-brand-orange to-orange-600 p-[2px] rounded-[32px]">
          <div className="bg-black rounded-[30px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
              <Zap className="w-64 h-64 text-brand-orange" />
            </div>

            <div className="text-left relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-[10px] font-bold text-brand-orange uppercase tracking-widest mb-4">
                Limited Availability
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
                Free 30-Minute <br className="hidden sm:block" />
                <span className="text-brand-orange">Marketing Diagnosis and Consultation</span>
              </h3>
              <p className="text-white/60 text-lg leading-relaxed">
                We'll find the leaks in your current funnel and map out your 90-day scaling roadmap. Targeted for <span className="text-white/80 font-medium">Startups, Business Owners, Agency Owners, and Freelancers</span>.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <Link 
                href="/contact" 
                className="btn-premium px-10 py-5 text-xl group whitespace-nowrap shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_50px_rgba(249,115,22,0.5)] transition-all"
              >
                Claim Your Free Audit
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
