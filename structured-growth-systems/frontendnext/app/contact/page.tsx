"use client";
import { motion } from "motion/react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Target,
  Zap,
  Globe,
  MapPin,
} from "lucide-react";
import { useState } from "react";

export default function WorkWithMe() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch(`${BASE_URL}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || "Submission failed");

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pt-20 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">

        {/* ── Left column ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-7"
        >
          <div>
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-3">
              Engineer Profitable Scale.{" "}
              <br />
              <span className="text-gradient-orange">Not Just More Traffic.</span>
            </h1>
            <p className="text-xs font-mono text-brand-orange uppercase tracking-[0.2em] mb-3">
              Trusted by brands across India, UK & USA.
            </p>
            <p className="text-base text-white/60 leading-relaxed">
              I work with performance-driven brands spending at scale who need
              structured acquisition systems — not random campaign management.
            </p>
            <p className="text-sm text-white/40 mt-2 italic">
              If your growth has plateaued, your architecture is the problem.
            </p>
          </div>

          {/* Notice */}
          <div className="p-5 rounded-2xl bg-brand-orange/5 border border-brand-orange/20 flex gap-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShieldCheck className="w-16 h-16 text-brand-orange" />
            </div>
            <AlertCircle className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
            <div className="relative z-10">
              <h3 className="font-bold text-brand-orange uppercase tracking-widest text-xs mb-2">
                Strategic Capacity Notice
              </h3>
              <p className="text-white/80 text-xs leading-relaxed">
                <span className="block">
                  I partner with a limited number of brands each quarter to maintain execution depth and economic precision.
                </span>
                <span className="block font-bold text-white mt-1">
                  This is not agency outsourcing. You work directly with me.
                </span>
                <span className="block text-white/40 italic mt-1">
                  Minimum ad spend requirement applies.
                </span>
              </p>
            </div>
          </div>

          {/* This is for */}
          <div className="space-y-3">
            <h2 className="text-lg font-display font-bold flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-orange" />
              This Is For
            </h2>
            <ul className="space-y-2.5">
              {[
                "E-commerce & DTC brands stuck between growth spurts and profit instability",
                "B2B companies needing predictable, intent-based pipeline generation",
                "Real estate & high-ticket businesses scaling beyond lead volume dependency",
                "Brands spending $10K+ / ₹8L+ monthly across Google & Meta",
                "Founders who understand contribution margin, not just ROAS screenshots",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-white/80 items-start">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <span className="text-sm leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Engagement Framework */}
          <div className="space-y-3">
            <h2 className="text-lg font-display font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-brand-orange" />
              Engagement Framework
            </h2>
            <div className="space-y-5 relative">
              <div className="absolute left-[10px] top-2 bottom-2 w-px bg-white/5" />
              {[
                {
                  step: "01",
                  title: "Strategic Qualification",
                  desc: "Application review to assess economic fit, scalability, and market position.",
                },
                {
                  step: "02",
                  title: "Deep Diagnostic Call (45 Min)",
                  desc: "CAC vs Break-even, funnel leakage, attribution gaps & scaling constraints.",
                },
                {
                  step: "03",
                  title: "Architecture Blueprint",
                  desc: "Full restructuring plan covering acquisition, tracking & capital deployment.",
                },
                {
                  step: "04",
                  title: "Controlled Execution & Scale",
                  desc: "Structured testing → Stabilization → Capital expansion.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 items-start relative z-10">
                  <div className="w-5 h-5 rounded-full bg-black border border-brand-orange flex items-center justify-center text-[9px] font-bold text-brand-orange shrink-0 mt-0.5 shadow-[0_0_8px_rgba(249,115,22,0.3)]">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-0.5 text-white/90">{item.title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs font-mono text-brand-orange/60 pt-1">
              No random scaling. No platform guessing.
            </p>
          </div>
        </motion.div>

        {/* ── Right column ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="sticky top-20 h-[calc(100vh-6rem)] flex flex-col gap-4"
        >
          {/* Form card */}
          <div className="flex-1 min-h-0 pl-7 pr-7 bp-2 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden backdrop-blur-sm flex flex-col">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-orange/5 rounded-full blur-[60px]" />

            <div className="mb-4 relative z-10">
              <h2 className="text-2xl font-display font-bold mb-1">
                Strategic Evaluation Request
              </h2>
              <p className="text-white/40 text-xs">
                Access to strategic evaluation is by application only.
              </p>
            </div>

            {submitStatus === "success" && (
              <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 flex gap-2.5 items-start relative z-10">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <p className="text-green-300 text-xs leading-relaxed">
                  Your inquiry has been submitted. We'll be in touch shortly.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-2.5 items-start relative z-10">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-red-300 text-xs leading-relaxed">
                  Something went wrong. Please try again or reach out directly.
                </p>
              </div>
            )}

            <form className="flex flex-col flex-1 min-h-0 gap-4 relative z-10" onSubmit={handleSubmit}>
              {/* Name + Email */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                    Full Name <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                    Work Email <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                  Phone Number
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-brand-orange transition-colors"
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Message — flex-grow to fill remaining space */}
              <div className="space-y-1.5 flex flex-col flex-1 min-h-0">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                  Message <span className="text-brand-orange">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="flex-1 min-h-0 w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-brand-orange transition-colors resize-none"
                  placeholder="Tell us about your brand, current ad spend, and the main bottleneck preventing you from scaling right now."
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-premium w-full py-2 text-base group ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                >
                  {isSubmitting ? "Submitting…" : "Apply for Strategic Review"}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-[10px] text-white/30 mt-1 leading-relaxed">
                  Applications reviewed within 24 hours.{" "}
                  If there's alignment, you'll receive a private calendar link.
                </p>
              </div>
            </form>
          </div>


        </motion.div>
      </div>
    </div>
  );
}