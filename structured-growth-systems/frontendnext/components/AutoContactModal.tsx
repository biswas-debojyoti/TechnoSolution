"use client";
import { motion, AnimatePresence } from "motion/react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  X,
  Loader2,
} from "lucide-react";
import { useState, useCallback, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   USAGE IN app/layout.tsx
   ───────────────────────────────────────────────────────────
   import AutoContactModal from "@/components/ContactModal";

   export default function RootLayout({ children }) {
     return (
       <html lang="en">
         <body>
           {children}
           <AutoContactModal />
         </body>
       </html>
     );
   }
   ═══════════════════════════════════════════════════════════ */

const DELAY_MS    = 5000;               // 10 seconds
const SESSION_KEY = "nexzen_modal_shown"; // shown once per session

type FormData     = { name: string; email: string; phone: string; message: string };
type SubmitStatus = "idle" | "success" | "error";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
        {label} {required && <span className="text-[#f97316]">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function AutoContactModal() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

  const [isOpen, setIsOpen]           = useState(false);
  const [formData, setFormData]       = useState<FormData>({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Auto-open once per session ── */
  useEffect(() => {
    // if (sessionStorage.getItem(SESSION_KEY)) return;
    timerRef.current = setTimeout(() => {
      setIsOpen(true);
    //   sessionStorage.setItem(SESSION_KEY, "1");
    }, DELAY_MS);
    return () => clearTimeout(timerRef.current!);
  }, []);

  /* ── Escape key ── */
  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isOpen]);

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSubmitStatus("idle");
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const res  = await fetch(`${BASE_URL}/inquiries`, {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message ?? "Submission failed");
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => { setSubmitStatus("idle"); handleClose(); }, 3000);
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls =
    "w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]/30 transition-all duration-200";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bd"
            className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="nexzen-modal-title"
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0, scale: 0.93, y: 28 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit   ={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
          >
            <div
              className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-[0_0_100px_rgba(249,115,22,0.10)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Ambient glow */}
              <div className="pointer-events-none absolute -top-10 right-0 w-72 h-72 bg-[#f97316]/[0.07] rounded-full blur-[90px]" />

              {/* Header */}
              <div className="relative z-10 flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-white/[0.07]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-4 h-4 text-[#f97316]" />
                    <span className="text-[10px] font-bold text-[#f97316] uppercase tracking-[0.2em]">
                      Strategic Evaluation Request
                    </span>
                  </div>
                  <h2 id="nexzen-modal-title" className="text-xl font-bold text-white leading-snug">
                    Apply for Strategic Review
                  </h2>
                  <p className="text-white/40 text-xs mt-0.5">
                    Access is by application only. Reviewed within 24 h.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="shrink-0 mt-0.5 p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.07] transition-all duration-150"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="relative z-10 px-6 py-5 flex-1">
                <AnimatePresence mode="wait">
                  {submitStatus === "success" && (
                    <motion.div key="ok"
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                      exit   ={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 flex gap-2.5 items-start">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <p className="text-green-300 text-xs leading-relaxed">
                          Application submitted! You'll receive a private calendar link shortly.
                        </p>
                      </div>
                    </motion.div>
                  )}
                  {submitStatus === "error" && (
                    <motion.div key="err"
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                      exit   ={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-2.5 items-start">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <p className="text-red-300 text-xs leading-relaxed">
                          Something went wrong. Please try again or reach out directly.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form id="nexzen-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full Name" required>
                      <input name="name" value={formData.name} onChange={handleChange}
                        type="text" required className={inputCls}
                        placeholder="John Doe" autoComplete="name" />
                    </Field>
                    <Field label="Work Email" required>
                      <input name="email" value={formData.email} onChange={handleChange}
                        type="email" required className={inputCls}
                        placeholder="john@company.com" autoComplete="email" />
                    </Field>
                  </div>

                  <Field label="Phone Number">
                    <input name="phone" value={formData.phone} onChange={handleChange}
                      type="tel" className={inputCls}
                      placeholder="+91 98765 43210" autoComplete="tel" />
                  </Field>

                  <Field label="Message" required>
                    <textarea name="message" value={formData.message} onChange={handleChange}
                      required rows={4} className={`${inputCls} resize-none`}
                      placeholder="Tell us about your brand, current ad spend, and the main bottleneck preventing you from scaling right now." />
                  </Field>
                </form>
              </div>

              {/* Footer */}
              <div className="relative z-10 px-6 pb-6 pt-3 border-t border-white/[0.07] space-y-2">
                <button
                  type="submit" form="nexzen-form" disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold text-white bg-[#f97316] hover:bg-[#fb923c] active:bg-[#ea6c0a] shadow-[0_0_24px_rgba(249,115,22,0.35)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                  ) : (
                    <>Apply for Strategic Review
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
                <p className="text-center text-[10px] text-white/30 leading-relaxed">
                  Applications reviewed within 24 hours. You work directly with me — no agency outsourcing.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}