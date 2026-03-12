import React from 'react';
import { motion } from 'motion/react';
import { Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AnnouncementBar() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-brand-orange text-black py-1.5 px-4 z-[60] overflow-hidden">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-9xl mx-auto flex flex-col sm:flex-row items-center justify-center md:gap-3 text-center"
      >
        <div className="flex items-center gap-2 font-bold text-[10px] sm:text-xs uppercase tracking-tighter sm:tracking-widest">
          <span className="flex h-2 w-2 relative">
            
          </span>
          Live Course Starting Soon
        </div>
        
        <p className="text-xs sm:text-sm font-medium">
          Master Performance Marketing for just <span className="font-bold underline">₹1000 ($10)</span>
        </p>

        <Link 
          to="/contact" 
          className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity group"
        >
          Secure Your Spot
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
      
      {/* Decorative moving shine */}
      <motion.div 
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-1/2 skew-x-12 pointer-events-none"
      />
    </div>
  );
}
