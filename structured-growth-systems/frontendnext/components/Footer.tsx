import { Instagram, Linkedin, Phone, Twitter, Youtube } from 'lucide-react'
import React from 'react'
import { BsWhatsapp } from 'react-icons/bs'

function Footer() {
      const handleWhatsApp = () => {
    const phone = "918383997723";
    const message = "Hi. I want to Connect with you";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
  return (
    <div> <footer className="border-t border-white/5 py-12 mt-24 relative z-10">
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
            <p>
              <a 
                href="https://share.google/xx81WY2feERTz6Tx7" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Jorakhana,Kestopur,Rajarhat, Kolkata - 700102
              </a>
            </p>
              <a
                href="tel:8383997723"
className='flex gap-3'
              >
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
              <a href={`https://wa.me/918383997723?text=${encodeURIComponent("Hi. I want to Connect with you")}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">
                <BsWhatsapp />
              </a>
              <a href="https://youtube.com/@nexzencreativeofficial?si=iCuA12C_JP74X1qn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Youtube />
              </a>
              <a href="https://www.instagram.com/nexzen.agency/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Instagram />
              </a>
              <a href="https://in.linkedin.com/in/sayed-shahid-089086344" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Linkedin />
              </a>
              <a href="https://x.com/NexZenOfficial" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
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
          © {new Date().getFullYear()} NexZen Creative Growth Systems. All rights reserved.
        </div>
      </footer></div>
  )
}

export default Footer