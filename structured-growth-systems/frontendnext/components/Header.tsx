"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import WhatsAppSticky from "./WhatsAppSticky";
import MobileCallButton from "./MobileCallButton";
import OfferRibbon from "./OfferRibbon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Architecture", path: "/Architecture" },
  {
    name: "Services",
    path: "/Services",
    link: [
      { name: "SEO", path: "/Seo" },
      { name: "Ads Agency", path: "/Ads-Agency" },
      { name: "Content", path: "/Content" },
      { name: "Social Media", path: "/Social-Media" },
      { name: "Web Design", path: "/Web-Design" },
      { name: "Mobile App", path: "/Mobile-App" },
    ],
  },
  { name: "Knowledge Hub", path: "/KnowledgeHub" },
  // { name: 'Books', path: '/books' },
  { name: "Blog", path: "/Blog" },
  // { name: 'Work With Me', path: '/contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = usePathname();

  return (
    <>
      {/* <AnnouncementBar /> */}
      {/* <OfferRibbon /> */}
      <WhatsAppSticky />
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-black/40 backdrop-blur-xl border-b border-black/5 dark:border-white/5  ">
        <div className="max-w-7xl mx-auto px-5 h-18 flex items-center justify-between">
          <Link
            href="/"
            className="font-display font-bold text-xl tracking-tight"
          >
            <span className="text-brand-orange">NEX</span>Zen
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  href={link.path}
                  className={`text-sm font-medium transition-colors ${
                    location === link.path
                      ? "text-brand-orange font-semibold border-b-2 border-brand-orange"
                      : "text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>

                {/* Dropdown */}
                {link.link && (
                  <div className="absolute top-6 left-0 hidden group-hover:flex flex-col bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl shadow-lg py-2 min-w-[180px] z-50">
                    {link.link.map((sublink) => (
                      <Link
                        key={sublink.name}
                        href={sublink.path}
                        className="px-4 py-2 text-sm text-black/70 hover:text-black hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition"
                      >
                        {sublink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-semibold hover:bg-brand-orange dark:hover:bg-brand-orange transition-colors"
            >
              Contact
            </Link>
            <ThemeToggle />
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            {/* Mobile Menu Toggle */}
            <button
              className="text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-white dark:bg-black border-b border-black/5 dark:border-white/5 p-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-medium ${
                  location === link.path ? "text-brand-orange" : "text-black/80 dark:text-white/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 px-6 py-3 rounded-full bg-brand-orange text-black font-semibold text-center hover:bg-opacity-90 transition-all font-display"
            >
              Contact
            </Link>
          </motion.nav>
        )}
      </header>
      <MobileCallButton />
    </>
  );
}
