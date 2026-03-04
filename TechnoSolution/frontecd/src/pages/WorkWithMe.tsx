import { motion } from 'motion/react';
import { AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

export default function WorkWithMe() {
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
              Let's Engineer <br/>Your Growth.
            </h1>
            <p className="text-xl text-white/60">
              I partner with brands spending at scale who need structured systems to unlock profitable growth.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-400 shrink-0" />
            <div>
              <h3 className="font-bold text-yellow-400 mb-2">Scarcity Notice</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                I work with a strictly limited number of brands monthly to ensure the highest quality of strategic execution. I am not an agency; you work directly with me.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-display font-bold">Who This Is For</h2>
            <ul className="space-y-4">
              {[
                "E-commerce & D2C brands hitting a scaling ceiling.",
                "B2B SaaS companies needing intent-based lead generation.",
                "Brands spending a minimum of $10k/mo on Google or Meta.",
                "Founders who understand that structure precedes scale."
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-white/80">
                  <CheckCircle2 className="w-6 h-6 text-yellow-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-display font-bold">The Process</h2>
            <div className="space-y-6">
              {[
                { step: "01", title: "Application", desc: "Fill out the form to ensure we're a mutual fit." },
                { step: "02", title: "Strategy Call", desc: "A 45-minute deep dive into your current architecture and bottlenecks." },
                { step: "03", title: "The Audit", desc: "A comprehensive review of your tracking, campaigns, and creatives." },
                { step: "04", title: "Execution", desc: "Restructuring and scaling your accounts systematically." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="text-2xl font-mono font-bold text-white/20">{item.step}</div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-[80px]" />
            
            <h2 className="text-3xl font-display font-bold mb-8 relative z-10">Application Form</h2>
            
            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 uppercase tracking-wider">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#0c0f14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 uppercase tracking-wider">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-[#0c0f14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80 uppercase tracking-wider">Company / Website</label>
                <input 
                  type="url" 
                  className="w-full bg-[#0c0f14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                  placeholder="https://yourbrand.com"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 uppercase tracking-wider">Monthly Ad Spend</label>
                  <select className="w-full bg-[#0c0f14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors appearance-none">
                    <option value="">Select Range</option>
                    <option value="under-10k">Under $10k</option>
                    <option value="10k-50k">$10k - $50k</option>
                    <option value="50k-100k">$50k - $100k</option>
                    <option value="100k+">$100k+</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 uppercase tracking-wider">Primary Market</label>
                  <select className="w-full bg-[#0c0f14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors appearance-none">
                    <option value="">Select Market</option>
                    <option value="us">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="in">India</option>
                    <option value="global">Global / Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80 uppercase tracking-wider">Primary Challenge</label>
                <textarea 
                  rows={4}
                  className="w-full bg-[#0c0f14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                  placeholder="What is the main bottleneck preventing you from scaling right now?"
                />
              </div>

              <button type="submit" className="btn-glow w-full py-4 bg-yellow-400 text-black rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 mt-8">
                Request Strategy Call <ChevronRight className="w-5 h-5" />
              </button>
              
              <p className="text-center text-xs text-white/40 mt-4">
                I review all applications within 48 hours. If there's a fit, you'll receive a link to book a call.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
