import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import {
  Instagram,
  Linkedin,
  Menu,
  Phone,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import WhatsAppSticky from "./WhatsAppSticky";
import MobileCallButton from "./MobileCallButton";
import AnnouncementBar from "./AnnouncementBar";
import OfferRibbon from "./OfferRibbon";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Architecture", path: "/architecture" },
  { name: "Audit", path: "/audit" },
  { name: "Services", path: "/services" },
  { name: "Offers", path: "/growth-offers" },
  { name: "Insights", path: "/insights" },
  { name: "Knowledge Hub", path: "/knowledge-hub" },

  { name: "Case Studies", path: "/case-studies" },
  // { name: 'Books', path: '/books' },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  // { name: 'Work With Me', path: '/work-with-me' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleWhatsApp = () => {
    const phone = "918383997723";
    const message = "Hi. I want to Connect with you";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col studio-bg text-white selection:bg-brand-orange selection:text-black">
      {/* <AnnouncementBar /> */}
      {/* <OfferRibbon /> */}

      <WhatsAppSticky />
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5 mt-[42px] md:mt-[32px]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            to="/"
            className="font-display font-bold text-xl tracking-tight"
          >
            <span className="text-brand-orange">NEX</span>Zen
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-brand-orange font-semibold border-b-2 border-brand-orange"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-brand-orange transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white/80 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-black border-b border-white/5 p-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-medium ${
                  location.pathname === link.path
                    ? "text-brand-orange"
                    : "text-white/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 px-6 py-3 rounded-full bg-brand-orange text-black text-center font-semibold"
            >
              Contact
            </Link>
          </motion.nav>
        )}
      </header>
      <MobileCallButton />
      <main className="flex-grow pt-20 relative z-10">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
      <footer className="border-t border-white/5 py-12 mt-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="font-display font-bold text-xl tracking-tight mb-4">
              <span className="text-brand-orange">NEX</span>Zen
            </div>
            <p className="text-sm text-white/40">
              Creative Growth Systems for modern businesses.
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="text-sm text-white/60 space-y-2">
              <p>Jorakhana,Kestopur,Rajarhat, Kolkata - 700102</p>
              <a href="tel:8383997723" className="flex gap-3">
                <Phone size={18} />
                +918383997723
              </a>
              {/* <p>+91 8276832626</p> */}
              {/* <p>ommdigitalsolution@gmail.com</p> */}
              {/* <p>info@ommdigitalsolution.com</p> */}
              <p>Mon – Fri: 10:00 – 19:00</p>
              <p>Sat: 10:00 – 18:00</p>
            </div>
          </div>

          {/* Social + CTA */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-5 text-white/60 items-center text-lg">
              <div
                onClick={handleWhatsApp}
                className="hover:text-white transition-colors cursor-pointer"
              >
                <BsWhatsapp />
              </div>
              <a
                href="https://youtube.com/@nexzencreativeofficial?si=iCuA12C_JP74X1qn"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Youtube />
              </a>
              <a
                href="https://www.instagram.com/diamond_inthe_dust?igsh=MXFwbGY1aWUyOG8yMA=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Instagram />
              </a>
              <a
                href="https://in.linkedin.com/in/sayed-shahid-089086344"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Linkedin />
              </a>
              <a
                href="https://x.com/NexZenOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Twitter />
              </a>
            </div>

            <a
              href="https://calendly.com/greenmileshahid/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-orange text-black px-4 py-2 rounded-full font-medium hover:bg-orange-400 transition-colors w-fit"
            >
              Book a Call
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="text-center text-sm text-white/40 mt-10">
          © {new Date().getFullYear()} NexZen Creative Growth Systems. All
          rights reserved.
        </div>
      </footer>
    </div>
  );
}
