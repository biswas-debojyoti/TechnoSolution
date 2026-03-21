"use client";
import { motion } from 'motion/react';
import { AlertCircle, CheckCircle2, ChevronRight, ShieldCheck, Target, Zap, Globe, MapPin } from 'lucide-react';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';



export default function WorkWithMe() {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
const [formData, setFormData] = useState({
  full_name: "",
  email: "",
  website: "",
  budget: "",
  market: "",
  bottleneck: ""
});


const handleChange = (e: any) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));
};


 const sendEmail = async (e: any) => {
  e.preventDefault();

  if (isSubmitting) return;

  setIsSubmitting(true);
const payload = {
  name: formData.full_name,
  itme: new Date().toLocaleDateString(),
  email: formData.email,
  title: formData.website,
  budget: formData.budget,
  market: formData.market,
  message: formData.bottleneck +"This ia my website"+ formData.website + "My budget"+ formData.budget +"Targating market"+ formData.market
};
  try {
    await emailjs.send(
      "service_i18vkpf",
      "template_qka0y4r",
      payload,
      "RA8Jnik8efYhokoLu"
    );

    alert("Application submitted successfully!");

    setFormData({
      full_name: "",
      email: "",
      website: "",
      budget: "",
      market: "",
      bottleneck: ""
    });

  } catch (error) {
    console.error(error);
    alert("Failed to send application");
  }

  setTimeout(() => {
    setIsSubmitting(false);
  }, 2000);
};

  return (
    <div className="w-full pt-32 pb-40 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-20">
 <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
              Engineer Profitable Scale. <br/><span className="text-gradient-orange">Not Just More Traffic.</span>
            </h1>
            <p className="text-sm font-mono text-brand-orange uppercase tracking-[0.2em] mb-8">
              Trusted by brands across India, UK & USA.
            </p>
            <p className="text-xl text-white/60 leading-relaxed">
              I work with performance-driven brands spending at scale who need structured acquisition systems — not random campaign management.
            </p>
            <p className="text-lg text-white/40 mt-4 italic">
              If your growth has plateaued, your architecture is the problem.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-brand-orange/5 border border-brand-orange/20 flex gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShieldCheck className="w-24 h-24 text-brand-orange" />
            </div>
            <AlertCircle className="w-6 h-6 text-brand-orange shrink-0 mt-1" />
            <div className="relative z-10">
              <h3 className="font-bold text-brand-orange uppercase tracking-widest text-sm mb-3">Strategic Capacity Notice</h3>
              <p className="text-white/80 text-sm leading-relaxed space-y-2">
                <span className="block">I partner with a limited number of brands each quarter to maintain execution depth and economic precision.</span>
                <span className="block font-bold text-white">This is not agency outsourcing. You work directly with me.</span>
                <span className="block text-white/40 italic">Minimum ad spend requirement applies.</span>
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-display font-bold flex items-center gap-3">
              <Target className="w-6 h-6 text-brand-orange" />
              This Is For
            </h2>
            <ul className="space-y-5">
              {[
                "E-commerce & DTC brands stuck between growth spurts and profit instability",
                "B2B companies needing predictable, intent-based pipeline generation",
                "Real estate & high-ticket businesses scaling beyond lead volume dependency",
                "Brands spending $10K+ / ₹8L+ monthly across Google & Meta",
                "Founders who understand contribution margin, not just ROAS screenshots"
              ].map((item, i) => (
                <li key={i} className="flex gap-4 text-white/80 items-start">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <span className="text-base leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-display font-bold flex items-center gap-3">
              <Zap className="w-6 h-6 text-brand-orange" />
              Engagement Framework
            </h2>
            <div className="space-y-10 relative">
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/5" />
              {[
                { 
                  step: "01", 
                  title: "Strategic Qualification", 
                  desc: "Application review to assess economic fit, scalability, and market position." 
                },
                { 
                  step: "02", 
                  title: "Deep Diagnostic Call (45 Minutes)", 
                  desc: "We break down: Current CAC vs Break-even, Funnel leakage points, Attribution gaps, and Scaling constraints." 
                },
                { 
                  step: "03", 
                  title: "Architecture Blueprint", 
                  desc: "Full restructuring plan covering acquisition, tracking, and capital deployment." 
                },
                { 
                  step: "04", 
                  title: "Controlled Execution & Scale", 
                  desc: "Structured testing → Stabilization → Capital expansion." 
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 items-start relative z-10">
                  <div className="w-6 h-6 rounded-full bg-black border border-brand-orange flex items-center justify-center text-[10px] font-bold text-brand-orange shrink-0 mt-1 shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-white/90">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm font-mono text-brand-orange/60 pt-4">
              No random scaling. No platform guessing.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="sticky top-32"
        >
          <div className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-[80px]" />

            <div className="mb-10 relative z-10">
              <h2 className="text-3xl font-display font-bold mb-3">Strategic Evaluation Request</h2>
              <p className="text-white/40 text-sm">Access to strategic evaluation is by application only.</p>
            </div>

            <form className="space-y-6 relative z-10" ref={formRef}
              onSubmit={sendEmail}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Full Name</label>
                  <input
                    name="full_name"
                     onChange={handleChange}
                    type="text"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Work Email</label>
                  <input
                    name="email"
                     onChange={handleChange}
                    type="email"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Brand Website</label>
                <input
                  name="website"
                   onChange={handleChange}
                  type="url"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors"
                  placeholder="https://yourbrand.com"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Monthly Paid Media Budget</label>
                  <select name="budget"   onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors appearance-none">
                    <option value="">Select Range</option>
                    <option value="under-10k">Under $10k / ₹8L</option>
                    <option value="10k-50k">$10k - $50k</option>
                    <option value="50k-100k">$50k - $100k</option>
                    <option value="100k+">$100k+</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Primary Revenue Market</label>
                  <select name="market"   onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors appearance-none">
                    <option value="">Select Market</option>
                    <option value="us">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="in">India</option>
                    <option value="global">Global / Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Current Growth Bottleneck</label>
                <textarea name="bottleneck"
                 onChange={handleChange}
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors resize-none"
                  placeholder="What is the main bottleneck preventing you from scaling right now?"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-premium w-full py-5 text-lg group ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                >
                  {isSubmitting ? "Submitting..." : "Apply for Strategic Review"}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-[10px] text-white/30 mt-6 leading-relaxed">
                  Applications are reviewed within 24 hours.<br />
                  If there’s alignment, you’ll receive a private calendar link.
                </p>
              </div>
            </form>
          </div>
        </motion.div>


        
          {/* Global Presence / Address Section */}
          <div className="mt-12 p-8 rounded-3xl border border-white/5 bg-white/2[0.02] space-y-8">
            <h3 className="text-xs font-bold uppercase text-white/40 tracking-[0.2em] flex items-center gap-2">
              <Globe className="w-4 h-4 text-brand-orange" /> Global Presence
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/80 font-bold text-sm">
                  <MapPin className="w-3 h-3 text-brand-orange" /> India
                </div>
                <p className="text-xs text-white/40 leading-relaxed">
                  Strategic Operations & <br/>High-Volume Execution
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/80 font-bold text-sm">
                  <MapPin className="w-3 h-3 text-brand-orange" /> United Kingdom
                </div>
                <p className="text-xs text-white/40 leading-relaxed">
                  Compliance & <br/>Margin-Controlled Growth
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/80 font-bold text-sm">
                  <MapPin className="w-3 h-3 text-brand-orange" /> United States
                </div>
                <p className="text-xs text-white/40 leading-relaxed">
                  Creative Strategy & <br/>LTV Engineering
                </p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
