import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/fm.png';


const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Case Studies', path: '/case-studies' },
  { name: 'Books', path: '/books' },
  { name: 'About', path: '/about' },
  { name: 'Work With Me', path: '/work-with-me' },
];


export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0f14] text-white selection:bg-yellow-400 selection:text-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0c0f14]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="font-display font-bold text-xl tracking-tight">
            {/* <span className="text-yellow-400">S</span>GS. */}
            <img 
                  src={logo} 
                  alt="Sayed Shahid" 
                  width="70"
                  height="70"
                  // className="w-full h-full object-cover shadow-2xl"
                  // referrerPolicy="no-referrer"
                  // fetchPriority="high"
                />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-yellow-400 transition-colors"
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
            className="md:hidden absolute top-20 left-0 right-0 bg-[#0c0f14] border-b border-white/5 p-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-medium ${
                  location.pathname === link.path
                    ? 'text-yellow-400'
                    : 'text-white/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 px-6 py-3 rounded-full bg-yellow-400 text-black text-center font-semibold"
            >
              Contact
            </Link>
          </motion.nav>
        )}
      </header>

      <main className="flex-grow pt-20">
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

      <footer className="border-t border-white/5 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display font-bold text-xl tracking-tight">
            {/* <span className="text-yellow-400">S</span>GS. */}
             <img 
                  src={logo} 
                  alt="Sayed Shahid" 
                  width="70"
                  height="70"
                  // className="w-full h-full object-cover shadow-2xl"
                  // referrerPolicy="no-referrer"
                  // fetchPriority="high"
                />
          </div>
          <div className="text-sm text-white/40">
            © {new Date().getFullYear()} Friday Matrix. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-white/60 items-center">
            <a href="https://in.linkedin.com/in/sayed-shahid-089086344" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://calendly.com/greenmileshahid/30min" target="_blank" rel="noopener noreferrer" className="bg-yellow-400 text-black px-4 py-2 rounded-full font-medium hover:bg-yellow-300 transition-colors">Book a Call</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
