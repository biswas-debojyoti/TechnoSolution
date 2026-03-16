import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useInView, animate } from 'motion/react';
import { ArrowRight, BarChart2, BookOpen, Target, Zap, CheckCircle2, Trophy, TrendingUp, Search, LayoutTemplate, Tag, PlaySquare, Smartphone, MousePointer2 } from 'lucide-react';
import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import gridImage from '../assets/fullchart.jpeg';
import MarketingDiagnosisOffer from '../components/MarketingDiagnosisOffer';
import SEO from '../components/SEO';
import CourseBanner from '../components/CourseBanner';
const InlineWidget = lazy(() => import('react-calendly').then(mod => ({ default: mod.InlineWidget })));
const GoogleAdsHero = lazy(() => import('../components/GoogleAdsHero'));

function Counter({ value, prefix = "", suffix = "" }: { value: string, prefix?: string, suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
      const controls = animate(0, numericValue, {
        duration: 2,
        onUpdate: (latest) => {
          if (value.includes('.')) {
            setDisplayValue(latest.toFixed(1));
          } else {
            setDisplayValue(Math.floor(latest).toString());
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{prefix}{displayValue}{suffix}</span>;
}

function TiltCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
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
          background: "radial-gradient(circle at center, rgba(250, 204, 21, 0.15) 0%, transparent 70%)",
          transform: "translateZ(-10px)",
        }}
      />
    </motion.div>
  );
}

export default function Home() {
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


 const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Sayad Shahid | Growth Strategist",
    "image": "https://sayadshahid.com/og-image.jpg",
    "description": "Engineering structured acquisition systems for high-growth brands. Specializing in Meta Ads, Google Ads, and Performance Marketing.",
    "url": "https://sayadshahid.com",
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://in.linkedin.com/in/sayed-shahid-089086344",
      "https://twitter.com/sayadshahid"
    ]
  };
  return (
    <div className="w-full">
      <SEO 
        title="Sayad Shahid | Growth Strategist & Performance Marketer"
        description="Engineering structured acquisition systems for high-growth brands. Specializing in Meta Ads, Google Ads, and Performance Marketing."
        structuredData={structuredData}
      />
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/stars/1920/1080?grayscale')] opacity-5 mix-blend-screen" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-fit">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-sm font-medium tracking-wide text-white/80 uppercase">
                Performance Marketing Strategist & Author
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-display font-bold leading-[1.1] tracking-tight">
              Scale Your Brand with  <span className='text-brand-orange'>NEX</span><span className="text-gradient-orange ">Zen Structured Growth</span> Systems
            </h1>
            
            <p className="text-sm text-white/60 leading-relaxed max-w-xl">Managing
              <span className='font-bold text-brand-orange'> ₹70L+ / $80k / £60k Monthly</span> Across <span className='text-brand-orange font-bold'>Google & Meta</span>| India • UK • USA. I build structured acquisition systems that scale profitably — and document the frameworks behind them.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/work-with-me" className="btn-glow group relative px-8 py-4 bg-brand-orange text-black rounded-full font-bold text-lg overflow-hidden flex items-center justify-center gap-2 transition-transform hover:scale-105">
                <span className="relative z-10">Apply for Strategy Call</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/case-studies" className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all">
                View Case Studies
              </Link>
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
                  src="https://drive.google.com/thumbnail?id=1c1Q1D_CpXdXqqT9yYz0_GLsZf2mR3CuU&sz=w800" 
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

      <CourseBanner />

      <section className="py-24">
        <MarketingDiagnosisOffer />
      </section>


        {/* STRATEGIC OFFERS SECTION */}
      <section className="py-15 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Strategic <span className="text-gradient-orange">Growth Entry Points</span></h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              High-leverage opportunities to experience the Structured Growth System with zero initial risk.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "1 Month Free SEO",
                desc: "Experience our next-gen SEO architecture. One full month of technical and strategic SEO at no cost for qualified businesses.",
                icon: Search,
                cta: "Claim Free Month"
              },
              {
                title: "30-Min Ads Audit",
                desc: "A deep-dive consultation to identify the structural leaks in your current acquisition funnel and provide a fix roadmap.",
                icon: Target,
                cta: "Book Diagnosis"
              },
              {
                title: "Website, App & CRM",
                desc: "Building mission-critical mobile applications that drive user engagement. Our App lab focuses on low-latency, high-security code architecture for both native and hybrid environments.",
                icon: BarChart2,
                cta: "Request Web & app"
              }
            ].map((offer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-[40px] border border-white/10 bg-black/40 backdrop-blur-xl hover:border-brand-orange/50 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <offer.icon className="w-7 h-7 text-brand-orange" />
                </div>
                <h3 className="text-xl font-bold mb-4">{offer.title}</h3>
                <p className="text-white/60 text-sm mb-8 leading-relaxed">
                  {offer.desc}
                </p>
                <Link to="/contact" className="flex items-center gap-2 text-brand-orange font-bold group/link">
                  {offer.cta} <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GOOGLE ADS HERO SECTION */}
      <Suspense fallback={<div className="h-96 bg-[#0c0f14] animate-pulse" />}>
        <GoogleAdsHero />
      </Suspense>

      {/* AUTHORITY SNAPSHOT */}
      <section className="py-24 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Execution First. Authority Earned.</h2>
            <p className="text-xl text-white/60 font-serif italic">Results build credibility. Frameworks build longevity.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { label: "Total Ad Spend Managed", value: "500", prefix: "$", suffix: "k+" },
              { label: "Years in Performance Marketing", value: "7", suffix: "+" },
              { label: "Scaling Experience", value: "Multi-Market" },
              { label: "Author of", value: "Google Ads Mastery OS" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                transition={{ 
                  delay: i * 0.1,
                  duration: 0.8,
                  ease: [0.21, 0.45, 0.32, 0.9]
                }}
                className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/10 group overflow-hidden"
              >
                {/* Subtle Floating Motion */}
                <motion.div
                  animate={{ 
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.4
                  }}
                  className="w-full relative z-10"
                >
                  <div className="text-3xl md:text-4xl font-display font-bold text-brand-orange mb-2">
                    {/^\d/.test(stat.value) ? (
                      <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.4, duration: 0.5 }}
                    className="text-sm text-white/60 uppercase tracking-wider font-medium"
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>

                {/* Soft Glow Accent Sweep */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-orange/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out" />
                </div>
                
                {/* Background Glow */}
                <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-brand-orange/5 rounded-full blur-2xl group-hover:bg-brand-orange/10 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            <div className="w-full max-w-[320px] h-[400px] rounded-xl overflow-hidden bg-white/5 border border-white/10">
              <Suspense fallback={<div className="w-full h-full bg-white/5 animate-pulse" />}>
                <InlineWidget 
                  url="https://calendly.com/greenmileshahid/30min" 
                  styles={{ height: '100%', width: '100%' }}
                  pageSettings={{
                    backgroundColor: '0c0f14',
                    hideEventTypeDetails: true,
                    hideLandingPageDetails: true,
                    primaryColor: 'facc15',
                    textColor: 'ffffff'
                  }}
                />
              </Suspense>
            </div>

            <div className="flex flex-col items-center gap-8">
              <a 
                href="https://calendly.com/greenmileshahid/30min" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-brand-orange text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-brand-orange/20"
              >
                Schedule An Appointment
              </a>

              <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="large" data-theme="dark" data-type="VERTICAL" data-vanity="sayed-shahid-089086344" data-version="v1">
                <a className="badge-base__link LI-simple-link" href="https://in.linkedin.com/in/sayed-shahid-089086344?trk=profile-badge">SAYED SHAHID</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM POSITIONING */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-8">
              Most Brands Don't Fail Because of Ads.<br/>
              <span className="text-white/40">They Fail Because of Structure.</span>
            </h2>
            <div className="space-y-6 text-lg text-white/70">
              <p>Scaling breaks when:</p>
              <ul className="space-y-4">
                {[
                  "Tracking is unreliable",
                  "Campaign architecture is messy",
                  "Budgets increase without control variables",
                  "ROAS is chased without margin clarity"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="pt-6 text-xl font-medium text-white">
                Performance marketing isn't about hacks.<br/>
                <span className="text-brand-orange">It's about disciplined systems.</span>
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="hidden md:block h-auto w-full aspect-square rounded-3xl overflow-hidden ">
              <img 
                src={gridImage} 
                alt="Structure" 
              
                className=" md:h-150 w-auto object-cover rounded-3xl opacity-50 hover:opacity-80 transition-opacity duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT I DO */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-0"><span className='text-brand-orange'>NEX</span>Zen</h2>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6">
             Structured Growth Systems, Not Random Optimization.
            </h2>
            <p className="text-xl text-white/60">If you're spending at scale, structure isn't optional.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8 text-brand-orange" />,
                title: "Performance Marketing Systems",
                desc: "Google & Meta campaigns engineered for controlled scaling."
              },
              {
                icon: <BarChart2 className="w-8 h-8 text-brand-orange" />,
                title: "Growth Architecture",
                desc: "Funnel mapping, data integrity, and structured testing cycles."
              },
              {
                icon: <Zap className="w-8 h-8 text-brand-orange" />,
                title: "Strategic Advisory",
                desc: "High-level decision support for brands expanding aggressively."
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-[#0c0f14] border border-white/10 hover:border-brand-orange/50 transition-colors group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
                <p className="text-white/60 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CASE STUDIES */}
      <section className="py-32 relative overflow-hidden">
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Animated Background Gradient Waves */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-orange/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-display font-bold">Our</h2>
              <h2 className="text-4xl md:text-5xl font-display font-bold">Featured Case Studies</h2>
            </motion.div>
            <Link to="/case-studies" className="hidden md:flex items-center gap-2 text-brand-orange hover:text-yellow-300 font-medium group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                bigMetric: <><span className="text-brand-orange"><Counter value="312" suffix="%" /></span> Revenue Growth in <span className="text-brand-orange"><Counter value="6" /></span> Months</>,
                title: "Scaling a D2C Apparel Brand in a Saturated Market",
                metrics: { m1: "+340% ROAS", m2: "$120k Spend" },
                desc: "How we restructured the entire account architecture to unlock profitable scale after they hit a plateau.",
                image: "https://www.gstatic.com/marketing-cms/assets/images/ads/2b/b5/8b6d1e964144bf793a641b690e5d/hero-image-em-ea-2x.png=n-w1600-h992-fcrop64=1,00000000ffffffff-rw"
              },
              {
                id: 2,
                bigMetric: <><span className="text-brand-orange"><Counter value="43" suffix="%" /></span> Reduction in Cost Per Qualified Lead</>,
                title: "B2B SaaS Lead Generation Engine",
                metrics: { m1: "-45% CPA", m2: "+210% Volume" },
                desc: "Moving from broad targeting to intent-based search structures, drastically reducing cost per acquisition.",
                image: "https://drive.google.com/thumbnail?id=1ZLXUxj7CT9IheErolenruyarL_saB-yj&sz=w1000"
              },
              {
                id: 3,
                bigMetric: <><span className="text-brand-orange">£<Counter value="1.1" suffix="M" /></span> Revenue Added Across <span className="text-brand-orange"><Counter value="2" /></span> Markets</>,
                title: "International Expansion for Luxury E-commerce",
                metrics: { m1: "4 New Markets", m2: "4.2x ROAS" },
                desc: "A phased rollout strategy for entering the UK and US markets with localized campaign structures.",
                image: "https://drive.google.com/thumbnail?id=1e8r0iQdj4E-5Mk8gkTeBDn1ilkit-uxW&sz=w1000"
              }
            ].map((caseStudy, idx) => (
              <motion.div
                key={caseStudy.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <TiltCard className="group h-full">
                  <Link to={`/case-studies/${caseStudy.id}`} className="block h-full p-1 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] transition-colors overflow-hidden">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-white/10 relative">
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10" />
                      <img 
                        src={caseStudy.image} 
                        alt={caseStudy.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-5 pt-0 space-y-3">
                      <h2 className="text-3xl font-display font-bold text-white mb-2 leading-tight">
                        {caseStudy.bigMetric}
                      </h2>
                      <h3 className="text-2xl font-display font-bold group-hover:text-brand-orange transition-colors">
                        {caseStudy.title}
                      </h3>
                      <p className="text-white/60 line-clamp-2">{caseStudy.desc}</p>
                      <div className="flex gap-4 text-sm font-mono text-brand-orange pt-2">
                        <span>{caseStudy.metrics.m1}</span>
                        <span>{caseStudy.metrics.m2}</span>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center md:hidden">
            <Link to="/case-studies" className="inline-flex items-center gap-2 text-brand-orange font-medium">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHO I WORK WITH */}
      <section className="py-32 relative overflow-hidden">
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">“If Your Brand Is Spending ₹4L+/Month on Ads — Read This.”</h2>
              <p className="text-xl text-white/60 mb-8">
                If you want experimentation, we're not aligned.<br/>
                <span className="text-white font-medium">If you want scalable systems, let's talk.</span>
              </p>
              <Link 
                to="/work-with-me" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange text-black rounded-full font-bold hover:bg-yellow-300 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-orange/20"
              >
                Book Strategy Call <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* My Approach */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <TiltCard className="h-full group">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm h-full flex flex-col hover:bg-white/[0.08] transition-colors">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-2xl bg-brand-orange/10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                      <Zap className="w-6 h-6 text-brand-orange" />
                    </div>
                    <h3 className="text-2xl font-display font-bold">My Approach</h3>
                  </div>
                  <p className="text-white/60 mb-6">I build scalable systems that combine:</p>
                  <ul className="space-y-4 flex-grow">
                    {[
                      "Advanced audience segmentation & buyer psychology",
                      "Creative testing frameworks (100+ variants tested monthly)",
                      "ROAS optimization (consistently achieving 4-8X ROAS)",
                      "Profit-first scaling strategies (not just revenue chasing)",
                      "Data-driven decision making with real-time analytics"
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 text-white/80 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>

            {/* Who I Help */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="h-full"
            >
              <TiltCard className="h-full group">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm h-full flex flex-col hover:bg-white/[0.08] transition-colors">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-2xl bg-brand-orange/10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                      <Target className="w-6 h-6 text-brand-orange" />
                    </div>
                    <h3 className="text-2xl font-display font-bold">Who I Help</h3>
                  </div>
                  <ul className="space-y-4 flex-grow">
                    {[
                      "eCommerce brands scaling beyond 7-figures",
                      "D2C founders wanting predictable ad performance",
                      "SaaS companies needing qualified lead generation",
                      "Service businesses wanting consistent client acquisition",
                      "Agencies seeking white-label performance marketing"
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 text-white/80 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>

            {/* Track Record */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="h-full"
            >
              <TiltCard className="h-full group">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm h-full flex flex-col hover:bg-white/[0.08] transition-colors">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-2xl bg-brand-orange/10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                      <Trophy className="w-6 h-6 text-brand-orange" />
                    </div>
                    <h3 className="text-2xl font-display font-bold">Track Record</h3>
                  </div>
                  <ul className="space-y-4 flex-grow">
                    {[
                      "Managed multi-million dollar campaigns across 50+ industries",
                      "Reduced CAC by 60% while scaling acquisition 3X",
                      "Generated 10,000+ qualified leads for B2B services",
                      "Authored \"Google Ads Mastery OS\" - the operating system for serious performance marketers"
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 text-white/80 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BOOKS SECTION */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Documented Frameworks</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">I don't just execute; I document the exact systems that drive results.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {[
              {
                title: "Google Ads Mastery OS 2026",
                desc: "The complete operating system for structuring, scaling, and optimizing Google Ads campaigns profitably.",
                takeaways: ["Campaign Architecture", "Bidding Strategies", "Search Term Control"],
                image: "https://drive.google.com/thumbnail?id=1o1WyLxyQ3ZVcc750BeimWFL_iahaJT99&sz=w1000"
              },
              {
                title: "Meta Scaling Playbook",
                desc: "Advanced frameworks for testing creatives, managing budgets, and scaling Meta ads without breaking ROAS.",
                takeaways: ["Creative Testing Loops", "Account Consolidation", "Scaling Rules"],
                image: "https://drive.google.com/thumbnail?id=14oQhOd-iv6qksvRn6sfsiWVicqNloFff&sz=w1000"
              }
            ].map((book, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-8 items-center md:items-start group">
                <div className="w-48 shrink-0 aspect-[2/3] rounded-lg border border-white/20 overflow-hidden relative shadow-2xl shadow-black/50 group-hover:-translate-y-2 transition-transform duration-500">
                  <img 
                    src={book.image} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-center font-display font-bold text-sm">
                    {book.title}
                  </div>
                </div>
                <div className="space-y-6 text-center md:text-left">
                  <h3 className="text-2xl font-display font-bold">{book.title}</h3>
                  <p className="text-white/60 leading-relaxed">{book.desc}</p>
                  <ul className="space-y-2 text-sm text-white/80 font-medium">
                    {book.takeaways.map((t, j) => (
                      <li key={j} className="flex items-center gap-2 justify-center md:justify-start">
                        <BookOpen className="w-4 h-4 text-brand-orange" /> {t}
                      </li>
                    ))}
                  </ul>
                  <a href="https://greenmiles.gumroad.com/l/google-ads-mastery-os" target="_blank" rel="noopener noreferrer">
                  <button className="px-6 py-2.5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors font-semibold text-sm">
                    Buy Now
                  </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   {/* LATEST FROM THE JOURNAL */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-fit mb-6">
                <BookOpen className="w-4 h-4 text-brand-orange" />
                <span className="text-sm font-medium tracking-wide text-white/80 uppercase">
                  The Growth Journal
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight">
                Strategic Insights for <br/><span className="text-gradient-orange">Market Dominance</span>
              </h2>
            </div>
            <Link to="/blog" className="group flex items-center gap-3 text-white/60 hover:text-brand-orange transition-colors font-bold text-lg">
              View All Articles <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group p-8 md:p-12 rounded-[40px] animated-border-card border border-white/10 relative overflow-hidden bg-white/5"
            >
              <div className="absolute inset-0 bg-brand-orange/5 blur-[80px] -z-10" />
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest px-2 py-1 bg-brand-orange/10 rounded">
                  Featured
                </span>
                <span className="text-xs text-white/40 font-mono">15 Min Read</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 group-hover:text-brand-orange transition-colors leading-tight">
                How to Turn Google Ads Into a Predictable Lead Gen System
              </h3>
              <p className="text-white/60 mb-10 leading-relaxed text-lg">
                Most companies waste thousands on ads without a real acquisition system. Here's the framework high-growth companies use to scale leads consistently.
              </p>
              <Link to="/blog/google-ads-lead-generation-system" className="btn-premium inline-flex items-center gap-3 px-8 py-4 group">
                Read Article <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>

            <div className="space-y-8">
              {[
                {
                  title: "SEO vs Paid Ads: Which One Drives Better ROI?",
                  category: "Strategy",
                  readTime: "12 min",
                  link: "/blog/seo-vs-paid-ads-roi"
                },
                {
                  title: "Why Most Marketing Agencies Fail to Scale Campaigns",
                  category: "Performance",
                  readTime: "10 min",
                  link: "/blog/why-marketing-campaigns-fail-to-scale"
                }
              ].map((post, i) => (
                <Link
                  key={i}
                  to={post.link}
                  className="block"
                >
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10 transition-all group cursor-pointer h-full"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                        {post.category}
                      </span>
                      <span className="text-[10px] text-white/20 font-mono italic">{post.readTime} read</span>
                    </div>
                    <h4 className="text-xl font-bold group-hover:text-brand-orange transition-colors">
                      {post.title}
                    </h4>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* AGENCY PREVIEW SECTION */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 md:p-20 rounded-[40px] animated-border-card border border-white/10 relative overflow-hidden text-center"
          >
            <div className="absolute inset-0 bg-brand-orange/5 blur-[120px] -z-10" />
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-fit mb-8">
              <Zap className="w-4 h-4 text-brand-orange" />
              <span className="text-sm font-medium tracking-wide text-white/80 uppercase">
                NexZen Creative Agency
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
              Turn Traffic Into <br/><span className="text-gradient-orange">Predictable Revenue</span>
            </h2>
            
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-12">
              NexZen Creative builds <strong>structured SEO and paid media acquisition systems</strong> designed to turn random clicks into real customers and scalable revenue. We deliver economic clarity before capital expansion.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
              {[
                { label: "Paid Media Managed", value: "$500K+" },
                { label: "Global Reach", value: "India • UK • USA" },
                { label: "Core Focus", value: "CAC • ROAS • LTV" }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-2xl font-bold text-brand-orange mb-1">{item.value}</div>
                  <div className="text-xs text-white/40 uppercase tracking-widest font-bold">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <Link to="/work-with-me" className="btn-premium px-10 py-5 text-lg group w-full sm:w-auto">
                Book Strategy Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/nexzen" className="px-10 py-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-lg font-bold w-full sm:w-auto">
                Explore Our Services
              </Link>
            </div>

            <p className="text-white/40 text-sm font-medium tracking-wide">
              Trusted by growth-focused brands across <span className="text-white/60">E-commerce, Health Clinics, SaaS, and Startups</span>
            </p>
          </motion.div>
        </div>
      </section>


      {/* FINAL CTA */}
      <section className="py-40 relative overflow-hidden">
        {/* Golden Flow Background */}
        <div className="golden-flow-container">
          <div className="golden-wave wave-1" />
          <div className="golden-wave wave-2" />
          <div className="golden-wave wave-3" />
          <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay for readability */}
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
            Ready to Build Your <br/>Growth Engine?
          </h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            Stop relying on random optimization. Let's engineer a structured system for your brand's growth.
          </p>
          <Link to="/work-with-me" className="btn-glow inline-flex items-center gap-3 px-10 py-5 bg-brand-orange text-black rounded-full font-bold text-xl hover:scale-105 transition-transform">
            Work With Me <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
