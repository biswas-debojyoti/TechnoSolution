"use client";
import { motion } from 'motion/react';
import { BookOpen, CheckCircle2, Star } from 'lucide-react';

const books = [
  {
    title: "Google Ads Mastery OS 2026",
    subtitle: "The complete operating system for structuring, scaling, and optimizing Google Ads campaigns profitably.",
    image: "https://drive.google.com/thumbnail?id=1o1WyLxyQ3ZVcc750BeimWFL_iahaJT99&sz=w1000",
    desc: "Stop relying on Google's automated recommendations. This book breaks down the exact campaign architectures, bidding strategies, and search term control methods used to manage over $500k in monthly ad spend. Learn how to build a system that scales predictably, rather than hoping the algorithm figures it out.",
    learnings: [
      "The 'Alpha/Beta' campaign structure for search term isolation.",
    "How to properly train Smart Bidding algorithms with offline conversion data.",
    "Advanced negative keyword strategies to eliminate wasted spend.",
    "Structuring Performance Max campaigns for actual incrementality.",
    "Auction & Economic Control",
    "Account Architecture Blueprint",
    "Conversion Engineering",
    "Optimization Machine",
    "Competitive Positioning",
    "Industry Execution Playbooks"
    ],
    testimonials: [
      { text: "This completely changed how we structure our accounts. We cut our CPA by 30% in the first month.", author: "Sarah J., Head of Growth" },
      { text: "The most practical, no-fluff guide to Google Ads I've ever read. It's an actual operating system.", author: "Mark T., Agency Owner" }
    ]
  },
  {
    title: "Meta Scaling Playbook",
    subtitle: "Advanced frameworks for testing creatives, managing budgets, and scaling Meta ads without breaking ROAS.",
    image: "https://drive.google.com/thumbnail?id=14oQhOd-iv6qksvRn6sfsiWVicqNloFff&sz=w1000",
    desc: "Scaling on Meta isn't about finding a 'hack'—it's about building a robust testing infrastructure. This playbook details the exact creative testing loops, account consolidation strategies, and scaling rules required to maintain profitability as you increase daily budgets.",
    learnings: [
      "The 'Modular Creative Testing' framework to find winning angles faster.",
      "How to consolidate accounts to exit the learning phase quickly.",
      "Vertical vs. Horizontal scaling strategies and when to use them.",
      "Building a resilient account structure that survives algorithm updates."
    ],
    testimonials: [
      { text: "Finally, a guide that explains *how* to test creatives systematically, not just 'make better ads'.", author: "David L., E-commerce Founder" },
      { text: "We used the scaling rules from chapter 4 to double our daily spend while maintaining our 3x ROAS target.", author: "Elena R., Media Buyer" }
    ]
  }
];

export default function Books() {
  return (
    <div className="w-full pt-32  px-6 max-w-7xl mx-auto">
      <div className="max-w-3xl mb-2 text-center mx-auto">
        <h1 className="text-3xl md:text-7xl font-display font-bold mb-6">Documented Frameworks</h1>
        <p className="text-xl text-white/60">
          I don't just execute; I document the exact systems that drive results. These are the operating systems behind millions in profitable ad spend.
        </p>
      </div>

      <div className="space-y-20">
        {books.map((book, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-center`}
          >
            <div className="w-full lg:w-1/3 shrink-0">
              <div className="aspect-[2/3] rounded-xl overflow-hidden border border-white/20 shadow-2xl shadow-brand-orange/10 relative group">
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
            </div>

            <div className="w-full lg:w-2/3 space-y-10">
              <div>
                <h2 className="text-4xl md:text-3xl font-display font-bold mb-5">{book.title}</h2>
                <p className="text-2xl text-brand-orange font-serif italic mb-6">{book.subtitle}</p>
                <p className="text-lg text-white/70 leading-relaxed">{book.desc}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-brand-orange" /> What You'll Learn
                  </h3>
                  <ul className="space-y-4">
                    {book.learnings.map((learning, j) => (
                      <li key={j} className="flex gap-3 text-white/80">
                        <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                        <span>{learning}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                    <Star className="w-5 h-5 text-brand-orange" /> Reader Feedback
                  </h3>
                  {book.testimonials.map((test, j) => (
                    <div key={j} className="p-6 rounded-2xl bg-white/5 border border-white/10 relative">
                      <div className="absolute -top-3 -left-2 text-4xl text-brand-orange/20 font-serif">"</div>
                      <p className="text-white/80 italic mb-4 relative z-10">"{test.text}"</p>
                      <p className="text-sm font-bold text-brand-orange">— {test.author}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <a href="https://greenmiles.gumroad.com/l/google-ads-mastery-os" className="inline-block">
                <button className="btn-glow px-10 py-4 bg-brand-orange text-black rounded-full font-bold text-lg hover:scale-105 transition-transform">
                  Buy {book.title}
                </button>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
