import React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  MousePointer2, 
  Share2, 
  Code2, 
  Mail, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight, 
  BarChart3, 
  Zap, 
  Target, 
  TrendingUp,
  HelpCircle,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MarketingDiagnosisOffer from '../components/MarketingDiagnosisOffer';

const services = [
  {
    id: "seo",
    icon: Search,
    title: "Search Engine Optimization (SEO) Services",
    description: "Dominate search engine results pages (SERPs) and drive high-quality organic traffic that converts. Our SEO services are built on technical excellence, content authority, and search engine visibility.",
    features: [
      "Comprehensive Technical SEO Audits & Fixes",
      "Strategic Keyword Research & Semantic Mapping",
      "On-Page Optimization & Content Marketing Strategy",
      "High-Authority Backlink Building & Digital PR",
      "Local SEO & Google Business Profile Optimization"
    ]
  },
  {
    id: "ppc",
    icon: MousePointer2,
    title: "Google Ads & PPC Management Agency",
    description: "Maximize your Return on Ad Spend (ROAS) with data-driven PPC management. We build high-intent search campaigns that capture ready-to-buy customers at the moment of decision.",
    features: [
      "Search, Display, Shopping & Video Campaigns",
      "Performance Max (PMax) Strategy & Optimization",
      "Strategic Bidding & Budget Allocation Logic",
      "A/B Split Testing & Landing Page Optimization",
      "Advanced Conversion Tracking & Attribution Modeling"
    ]
  },
  {
    id: "social",
    icon: Share2,
    title: "Social Media Advertising & Paid Social",
    description: "Scale your brand with targeted social media advertising across Meta (Facebook/Instagram), LinkedIn, and TikTok. We turn passive scrolls into active customer acquisitions.",
    features: [
      "Creative Strategy & High-Impact Ad Production",
      "Advanced Audience Targeting & Micro-Segmentation",
      "Retargeting Funnels & Lookalike Audience Building",
      "Full-Funnel Paid Social Campaign Architecture",
      "Continuous Creative Testing & Performance Optimization"
    ]
  },
  {
    id: "web",
    icon: Code2,
    title: "Web Design & Conversion Optimization",
    description: "Your website is your most valuable digital asset. As a premier web design agency, we build high-performance, mobile-responsive sites optimized for speed and maximum conversion.",
    features: [
      "Custom Responsive Web Design & UI/UX",
      "E-commerce Development (Shopify & WooCommerce)",
      "Conversion Rate Optimization (CRO) Frameworks",
      "Core Web Vitals & Page Speed Optimization",
      "Seamless CMS Integration & Custom Functionality"
    ]
  },
  {
    id: "content",
    icon: Mail,
    title: "Content Marketing & Email Automation",
    description: "Nurture leads and build brand authority with strategic content marketing services and high-converting email marketing automation systems.",
    features: [
      "SEO-Driven Blog Content & Thought Leadership",
      "Email Marketing Automation & Lifecycle Drip Campaigns",
      "Newsletter Strategy & Subscriber Growth",
      "Lead Magnet Design & High-Conversion Copywriting",
      "Customer Retention & LTV Marketing"
    ]
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile App Design & Development",
    description: "Bring your brand to the palm of your customers' hands with intuitive, high-performance mobile applications designed for engagement and retention.",
    features: [
      "Native & Cross-Platform iOS/Android Development",
      "User-Centric UI/UX Design for Mobile Apps",
      "App Store Optimization (ASO) for Visibility",
      "Robust Backend Integration & API Development",
      "Ongoing Maintenance, Security & Feature Updates"
    ]
  }
];

const processSteps = [
  {
    step: "01",
    title: "Strategic Research & Market Intelligence",
    description: "We dive deep into your market landscape, competitor strategies, and customer data to build a data-backed digital growth roadmap."
  },
  {
    step: "02",
    title: "Campaign Architecture & Launch",
    description: "Our team executes the technical implementation, creative production, and tracking setup across your primary acquisition channels."
  },
  {
    step: "03",
    title: "Data-Driven Optimization",
    description: "We don't set and forget. We continuously monitor performance analytics, testing variables to lower CAC and improve conversion efficiency."
  },
  {
    step: "04",
    title: "Aggressive & Profitable Scaling",
    description: "Once we validate the winning formula, we strategically increase budgets and expand reach to maximize your revenue and market share."
  }
];

const industries = [
  "Real Estate", "Health Clinics", "Cosmetic Brands", "Fashion Brands", 
  "E-commerce", "SaaS", "Startups", "Local Businesses", "Personal Brands"
];

const faqs = [
  {
    question: "How long does SEO take to show results?",
    answer: "SEO is a long-term investment. While some technical fixes can show immediate improvements, significant organic growth typically takes 3 to 6 months of consistent execution to see substantial ROI."
  },
  {
    question: "Do you manage Google Ads campaigns?",
    answer: "Yes, we provide full-service Google Ads management, including Search, Display, YouTube, and Shopping campaigns, focused entirely on driving profitable conversions."
  },
  {
    question: "Do you manage Meta Ads (Facebook & Instagram) campaigns?",
    answer: "Absolutely. We specialize in Meta Ads, handling everything from creative strategy and ad production to advanced audience targeting and scaling."
  },
  {
    question: "What industries do you work with?",
    answer: "We work with a diverse range of industries including Real Estate, Health & Wellness, E-commerce, B2B SaaS, and high-growth Startups. Our frameworks are adaptable to any performance-driven business."
  },
  {
    question: "How much does digital marketing cost?",
    answer: "Our pricing is tailored to your specific goals and budget. We typically work on a monthly retainer or a percentage of ad spend, ensuring our interests are aligned with your growth."
  },
  {
    question: "How do I get started?",
    answer: "The first step is to book a strategic evaluation call. We'll discuss your goals, audit your current presence, and determine if we're the right fit to help you scale."
  }
];

export default function NexZen() {
  return (
    <article className="w-full pt-20 pb-40">
      {/* SEO Metadata (Hidden from UI, but for reference) */}
      {/* 
        Meta Title: Digital Marketing Agency | NexZen Creative | Scale Your Brand
        Meta Description: NexZen Creative is a premier digital marketing agency specializing in SEO services, Google Ads management, and high-performance web design. Scale your revenue today.
        URL Slug: /digital-marketing-agency
      */}

      {/* Hero Section */}
      <header className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-brand-orange/5 blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-fit mb-8">
              <Zap className="w-4 h-4 text-brand-orange" />
              <span className="text-sm font-medium tracking-wide text-white/80 uppercase">
                NexZen Creative: Digital Growth Architects
              </span>
            </div>
            <h1 className="text-5xl md:text-8xl font-display font-bold leading-tight mb-8">
              Engineer <span className="text-gradient-orange">Profitable Scale.</span> <br/>Not Just More Traffic.
            </h1>
            <p className="text-2xl text-white/80 font-medium mb-6">
              The ROI-Driven <strong>Digital Marketing Agency</strong> for Performance Brands.
            </p>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-12">
              We build <strong>structured acquisition systems</strong> that turn random clicks into predictable revenue. Whether you need <strong>SEO services</strong>, <strong>Google Ads management</strong>, or a high-converting <strong>web design agency</strong>, we deliver economic clarity before capital expansion.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/work-with-me" className="btn-premium px-12 py-6 text-xl group w-full sm:w-auto">
                Book Strategy Evaluation
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <a href="#services" className="px-12 py-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-xl font-bold w-full sm:w-auto">
                Explore Our Services
              </a>
            </div>
          </motion.div>
        </div>
      </header>

 <section className="py-24">
        <MarketingDiagnosisOffer />
      </section>

      {/* About Section */}
      <section className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              About NexZen Creative: Your Growth Partner
            </h2>
            <div className="prose prose-invert prose-lg text-white/70 space-y-6">
              <p>
                NexZen Creative is more than just a standard <strong>digital marketing agency</strong>. We are your strategic growth partners, specializing in <strong>performance marketing</strong> and <strong>customer acquisition</strong>. In an era where platform algorithms are increasingly complex, we provide the architectural discipline required to scale profitably.
              </p>
              <p>
                We help businesses achieve <strong>sustainable growth</strong> by moving away from "random acts of marketing" and moving toward <strong>data-driven acquisition systems</strong>. Our approach integrates technical <strong>SEO excellence</strong>, high-intent <strong>PPC management</strong>, and <strong>conversion rate optimization (CRO)</strong> to build a robust revenue pipeline for your brand.
              </p>
              <p>
                From high-growth startups in India to established e-commerce brands in the UK and USA, we've managed millions in <strong>paid media spend</strong>, consistently reducing Customer Acquisition Cost (CAC) and increasing <strong>contribution margins</strong> for our clients.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video rounded-3xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center overflow-hidden">
              <BarChart3 className="w-32 h-32 text-brand-orange opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-8 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 text-center">
                  <div className="text-4xl font-bold text-brand-orange mb-2">$500k+</div>
                  <div className="text-sm text-white/60 uppercase tracking-widest">Paid Media Spend Managed</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Comprehensive Digital Services</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              ROI-driven <strong>digital marketing solutions</strong> engineered for maximum performance, brand visibility, and organic growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <section
                key={service.id}
                className="p-10 rounded-3xl animated-border-card hover:border-brand-orange/30 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-brand-orange" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-6">{service.title}</h3>
                <p className="text-white/60 text-sm mb-8 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-4">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex gap-3 text-sm text-white/80 items-start">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-6 bg-brand-orange/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Our Digital Growth Roadmap</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              A proven 4-step <strong>marketing framework</strong> for taking brands from stagnation to profitable, long-term scale.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-white/10 -z-10" />
            {processSteps.map((step, i) => (
              <div
                key={step.step}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-full bg-black border-2 border-brand-orange flex items-center justify-center text-3xl font-display font-bold text-brand-orange mx-auto mb-8 shadow-[0_0_30px_rgba(249,115,22,0.2)]">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Specialized Industry Expertise</h2>
            <p className="text-white/40 mb-10">We deliver results for high-growth businesses across these sectors:</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {industries.map((industry) => {
              const isSpecial = ["Real Estate", "Health Clinics", "Cosmetic Brands", "Fashion Brands"].includes(industry);
              return (
                <span 
                  key={industry} 
                  className={`animated-border-tag rounded-full transition-all hover:scale-105 ${
                    isSpecial 
                      ? 'px-6 py-5 text-xl font-bold text-white' 
                      : 'px-6 py-5 text-xl font-bold text-white'
                  }`}
                >
                  {industry}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-12">Why Partner with <br/>NexZen Creative?</h2>
              <div className="space-y-8">
                {[
                  { title: "Data-Driven Performance Analytics", desc: "We eliminate guesswork. We utilize advanced <strong>attribution modeling</strong> and economic analysis to make decisions based on real profit, not vanity metrics." },
                  { title: "Global Market Intelligence", desc: "Experience scaling brands in India, UK, and USA markets with deep understanding of local consumer psychology and <strong>search engine visibility</strong>." },
                  { title: "Senior-Level Strategic Partnership", desc: "You don't get passed to a junior account manager. You work directly with senior <strong>growth strategists</strong> who understand your business objectives." },
                  { title: "ROI-Focused Execution", desc: "Our success is measured by your growth. We focus on the KPIs that drive bottom-line results: CAC, ROAS, and <strong>LTV-based bidding</strong>." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-6 h-6 text-brand-orange" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-white/60 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-12 rounded-3xl bg-brand-orange/5 border border-brand-orange/20 text-center">
              <h3 className="text-3xl font-display font-bold mb-6">Ready to Scale Profitably?</h3>
              <p className="text-white/60 mb-10">
                Stop wasting your marketing budget on inefficient campaigns. Let's engineer your <strong>digital growth architecture</strong> today.
              </p>
              <Link to="/work-with-me" className="btn-premium w-full py-6 text-xl">
                Apply for Strategic Review
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 flex items-center justify-center gap-4">
              <HelpCircle className="w-10 h-10 text-brand-orange" /> Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <section key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold mb-4 text-white/90">{i+1}. {faq.question}</h3>
                <p className="text-white/60 leading-relaxed">{faq.answer}</p>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <footer className="py-32 px-6">
        <div className="max-w-7xl mx-auto p-16 md:p-24 rounded-[40px] bg-gradient-to-br from-brand-orange to-orange-700 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-8">
              Ready to Accelerate Your <br/>Business Growth?
            </h2>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto">
              Don't leave your revenue to chance. Partner with a <strong>digital marketing agency</strong> that understands the fundamental architecture of scale.
            </p>
            <Link to="/work-with-me" className="px-12 py-6 rounded-xl bg-white text-black text-2xl font-bold hover:bg-black hover:text-white transition-all inline-flex items-center gap-3">
              Book Your Strategy Evaluation <ArrowRight className="w-6 h-6" />
            </Link>
            <p className="text-white/60 mt-8 text-sm uppercase tracking-widest font-bold">
              Trusted by performance brands across India, UK & USA
            </p>
          </div>
        </div>
      </footer>
    </article>
  );
}
