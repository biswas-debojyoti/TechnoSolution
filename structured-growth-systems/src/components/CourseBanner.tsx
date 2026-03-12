import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap, PlayCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CourseBanner() {
  const phone = "918383997723";
  const message = "Hi, I want to Connect with you";

  const handleClick = () => {
    const url = `https://chat.whatsapp.com/G8QdckdK1f5DNqfIkaXJTx`;
    window.open(url, "_blank");
  };  
  return (
    <section className="py-10 px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/10 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-5xl  mx-auto">
        <div className="relative rounded-[40px] border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden group">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            
            {/* Content Side */}
            <div className="p-8 md:p-8 space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-widest">
                <Zap className="w-4 h-4 fill-current" />
                Live Course
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl md:text-3xl font-display font-bold leading-tight">
                  Master <span className="text-gradient-orange">Performance Marketing</span>
                </h2>
                <p className="text-sm text-white/60 max-w-xl leading-relaxed">
                  Learn the exact systems I use to scale B2B companies from zero to millions in revenue. Real data, real campaigns, live execution.
                </p>
              </div>

              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-3">
                  {/* <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <PlayCircle className="w-6 h-6 text-brand-orange" />
                  </div> */}
                  {/* <div>
                    <p className="text-xs text-white/40 uppercase font-bold tracking-wider">Format</p>
                    <p className="text-white font-medium">Live Sessions</p>
                  </div> */}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase font-bold tracking-wider">Community</p>
                    <p  onClick={handleClick} className="text-white font-medium">Private Group</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Link 
                  to="/contact" 
                  className="btn-premium px-8 py-4 inline-flex items-center gap-3 group/btn"
                >
                  Join for ₹1000 (~$10)
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <p className="text-sm text-white/40 italic">
                  *Limited seats available for the next cohort.
                </p>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative h-[400px] lg:h-full min-h-[500px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 lg:hidden" />
              
              {/* This is where the instructor photo goes */}
              <img 
                src="https://picsum.photos/seed/instructor/800/1000" 
                alt="Performance Marketing Instructor" 
                className="w-full h-120 object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
              
              {/* Decorative Elements */}
              <div className="absolute bottom-8 right-8 z-20 p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 max-w-[240px]">
                <p className="text-brand-orange font-bold text-2xl mb-1">₹1,000</p>
                <p className="text-white/60 text-xs leading-relaxed">
                  One-time investment for life-changing marketing skills.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
