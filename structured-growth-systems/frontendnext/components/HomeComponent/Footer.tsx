import { motion } from "motion/react";
import { ArrowRight, Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card-bg pt-24 pb-12 border-t border-card-border" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
              Ready to Turn Your Ads Into a <br />
              <span className="text-gradient-orange">Profit Machine?</span>
            </h2>
            <p className="text-lg text-text-secondary mb-12 max-w-xl">
              Stop wasting money on broken systems. Let's build a scalable growth engine for your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-primary-accent text-background font-bold rounded-full flex items-center justify-center gap-2 hover:scale-105 transition-transform group">
                Book Strategy Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-background border border-card-border text-text-primary font-bold rounded-full flex items-center justify-center gap-2 hover:bg-card-border transition-colors">
                Get Free Audit
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-10 rounded-[40px] bg-background border border-card-border"
          >
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-primary-accent/10 flex items-center justify-center text-primary-accent">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase text-text-secondary mb-1">Email Us</div>
                  <div className="text-lg font-bold">growth@nexzen.com</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-secondary-accent/10 flex items-center justify-center text-secondary-accent">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase text-text-secondary mb-1">Call Us</div>
                  <div className="text-lg font-bold">+91 98765 43210</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-primary-accent/10 flex items-center justify-center text-primary-accent">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase text-text-secondary mb-1">Location</div>
                  <div className="text-lg font-bold">India | UK | USA</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-card-bg border border-card-border flex items-center justify-center text-text-secondary hover:text-primary-accent hover:border-primary-accent transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="pt-12 border-t border-card-border flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-accent rounded-sm flex items-center justify-center font-black text-background">N</div>
            <span className="text-xl font-bold tracking-tighter">NEXZEN</span>
          </div>
          
          <div className="text-xs text-text-secondary font-medium">
            © 2026 NEXZEN. All Rights Reserved. Performance Marketing Systems.
          </div>

          <div className="flex gap-8 text-[10px] font-bold tracking-widest uppercase text-text-secondary">
            <a href="#" className="hover:text-primary-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-accent transition-colors">Terms of Service</a>
          </div>
        </div>

        {/* SEO Block */}
        <div className="mt-12 p-8 rounded-2xl bg-background/50 border border-card-border text-[10px] text-text-secondary leading-relaxed text-center">
          NEXZEN is a global performance marketing agency specializing in Google Ads management for lead generation, Meta Ads scaling for e-commerce, conversion rate optimization (CRO), and funnel architecture. We serve clients across India, UK, and USA, helping brands and agencies build predictable growth engines and structured scaling frameworks.
        </div>
      </div>
    </footer>
  );
}
