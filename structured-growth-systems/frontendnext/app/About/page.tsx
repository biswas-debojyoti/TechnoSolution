"use client";
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';
import Link from 'next/link';
import MarketingDiagnosisOffer from '@/components/MarketingDiagnosisOffer';

export default function About() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.linkedin.com/badges/js/profile.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Re-initialize LinkedIn badges if the script is already loaded
    const interval = setInterval(() => {
      if ((window as any).LInkedIn) {
        (window as any).LInkedIn.Badges.init();
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      document.body.removeChild(script);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full pt-32 pb-40 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-fit mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-orange" />
            <span className="text-sm font-medium tracking-wide text-white/80 uppercase">
              Operator &gt; Consultant
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
            I build revenue systems, <br />not just campaigns.
          </h1>
          <div className="prose prose-invert prose-lg max-w-none text-white/70 space-y-6">
            <p>
              For the past 7 years, I've managed over $500k in performance marketing spend across Google and Meta. I've scaled brands in the US, UK, and India.
            </p>
            <p>
              But I'm not an agency. I'm a strategic operator.
            </p>
            <p>
              Most brands hit a scaling ceiling because their account architecture is a mess. They chase ROAS without understanding margin, and they increase budgets without control variables.
            </p>
            <p className="text-xl font-medium text-white border-l-4 border-brand-orange pl-6 my-8">
              My philosophy is simple: Performance marketing isn't about finding a 'hack'. It's about disciplined, structured systems that feed the algorithm the right data.
            </p>
            <p>
              I document these systems in my books, and I implement them for a select group of clients who are ready to scale aggressively but profitably.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <img
              src="https://drive.google.com/thumbnail?id=1c1Q1D_CpXdXqqT9yYz0_GLsZf2mR3CuU&sz=w800"
              alt="Sayed Shahid"
              width="600"
              height="800"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <div className="mb-3">
                  <span className="highlight-amount text-2xl md:text-3xl">
                    ₹70L+ / $80k / £60k Monthly
                  </span>
                </div>
                <div>
                  <span className="highlight-markets">
                    India • UK • USA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>



      <div className="grid md:grid-cols-2 gap-20 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <h2 className="text-4xl font-display font-bold">The Timeline</h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
            {[
              { year: "2025 - Present", title: "Independent Strategist & Author", desc: "Managing high-scale accounts and publishing frameworks." },
              { year: "2022 - 2025", title: "Head of Growth", desc: "Scaled a D2C portfolio from $10k to $150k monthly spend." },
              { year: "2018 - 2022", title: "Senior Media Buyer", desc: "Managed B2B and Lead Gen accounts across global markets." }
            ].map((item, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-black group-[.is-active]:bg-brand-orange text-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <div className="w-3 h-3 bg-black rounded-full" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-brand-orange font-mono text-sm mb-2">{item.year}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <h2 className="text-4xl font-display font-bold">Core Philosophy</h2>
          <div className="space-y-6">
            {[
              { title: "Structure Over Hacks", desc: "Algorithms are smart, but they need clean data. A messy account structure confuses the machine. I build clean, isolated environments for testing and scaling." },
              { title: "Margin Over Revenue", desc: "Top-line revenue is a vanity metric if you're losing money on every sale. I focus on contribution margin and blended ROAS." },
              { title: "Consolidation Over Granularity", desc: "The days of SKAGs (Single Keyword Ad Groups) are dead. Modern platforms require consolidated data to exit learning phases quickly." },
              { title: "Creative is the New Targeting", desc: "When targeting becomes broad, your creative does the filtering. I implement rigorous creative testing loops to find winning angles." }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-orange/30 transition-colors">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                  <CheckCircle2 className="text-brand-orange w-6 h-6" /> {item.title}
                </h3>
                <p className="text-white/60 leading-relaxed pl-9">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="text-center p-16 rounded-3xl bg-brand-orange/5 border border-brand-orange/20 relative overflow-hidden section-matte">
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to restructure for scale?</h2>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">I work with a limited number of brands monthly to ensure execution quality.</p>
          <Link href="/contact" className="btn-premium inline-flex items-center gap-3 px-10 py-5 text-xl mb-12">
            Schedule An Appointment <ArrowRight className="w-6 h-6" />
          </Link>

          <div className="flex justify-center">
            <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="large" data-theme="dark" data-type="VERTICAL" data-vanity="sayed-shahid-089086344" data-version="v1">
              <a className="badge-base__link LI-simple-link" href="https://in.linkedin.com/in/sayed-shahid-089086344?trk=profile-badge">SAYED SHAHID</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
