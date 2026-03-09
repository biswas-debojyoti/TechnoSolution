import { motion } from "motion/react";
import { Search, PlayCircle, ShoppingCart, AppWindow } from "lucide-react";

export default function GoogleAdsHero() {
  return (
    <section className="relative overflow-hidden bg-[#0c0f14] text-white py-24">

      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-red-600/30 blur-[120px] rounded-full top-[-200px] left-[-100px] animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] bg-blue-600/30 blur-[120px] rounded-full bottom-[-200px] right-[-100px] animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-center mb-20 font-display"
        >
          Google gives you many ways to be seen
        </motion.h1>

        <div className="grid md:grid-cols-3 gap-12 items-center">

          {/* LEFT MENU */}
          <div className="space-y-4">
            {[
              { name: "Performance Max", class: "pmax" },
              { name: "Search", class: "search" },
              { name: "Display", class: "display" },
              { name: "Shopping", class: "shopping" },
              { name: "Video", class: "video" },
              { name: "App", class: "app" },
            ].map((item, i) => (

              <div key={i} className="animated-border-card relative p-[2px] rounded-full overflow-hidden group">

                {/* Animated Border Layer */}
                {/* <div className="absolute inset-0 rounded-full animated-border-card"></div> */}

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`relative pill ${item.class} rounded-full px-6 py-2 bg-black text-white transition-all duration-300 cursor-pointer font-medium`}
                >
                  {item.name}
                </motion.div>

              </div>

            ))}
          </div>

          {/* CENTER IMAGE GLASS CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl p-[3px]">

              {/* Animated Gradient Border */}
              <div className="relative rounded-3xl p-[3px] overflow-hidden">
                {/* Animated Gradient Border */}
                {/* <div className="absolute inset-0 rounded-3xl animate-borderMove"></div> */}
                {/* Inner Card */}
                <div className="relative rounded-3xl bg-white/10 backdrop-blur-xl border border-yellow-500 p-1 shadow-2xl aspect-[3/4]">
                  <img
                    src="https://drive.google.com/thumbnail?id=1c1Q1D_CpXdXqqT9yYz0_GLsZf2mR3CuU&sz=w800"
                    alt="Sayed Shahid"
                    width="400"
                    height="533"
                    className="rounded-2xl w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>

              </div>

              {/* Inner Card */}


            </div>

            {/* Floating Icons */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-10 -left-10 bg-white/10 p-4 rounded-xl backdrop-blur-lg border border-white/10"
            >
              <Search className="w-8 h-8 text-blue-400" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute -bottom-10 -right-10 bg-white/10 p-4 rounded-xl backdrop-blur-lg border border-white/10"
            >
              <ShoppingCart className="w-8 h-8 text-red-400" />
            </motion.div>
          </motion.div>

          {/* RIGHT TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
              Make the most of{" "}
              <span className="text-red-500">Google Ads</span>
            </h2>

            <p className="text-white/70 leading-relaxed text-lg">
              With Performance Max, you get the best of Google all-in-one.
              Powered by Google’s AI, reach valuable customers most likely to
              buy from you across Search, Display, YouTube and more — from a
              single campaign.
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="text-center mt-20 text-white/50 text-sm">
          © <strong>Sayed Shahid</strong> · Engineering Scalable Paid Media Systems
          <br />
          <span className="text-red-500 font-semibold mt-2 inline-block">
            Google Ads Mastery OS
          </span>
        </div>
      </div>
    </section>
  );
}
