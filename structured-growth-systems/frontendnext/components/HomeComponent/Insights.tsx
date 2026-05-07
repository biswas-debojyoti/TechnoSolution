import { motion } from "motion/react";
import { ArrowRight, BookOpen, Lightbulb, Target } from "lucide-react";
import Link from "next/link";

export default function Insights() {
  const posts = [
    {
      icon: <BookOpen className="w-6 h-6 text-primary-accent" />,
      title: "Scaling Brands Profitably",
      link:"servics",
      description: "Learn real strategies and frameworks used to scale brands profitably across multiple markets."
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-secondary-accent" />,
      title: "Strategic Insights",
      link : "/Blog",
      description: "Case studies and frameworks for market domination using Google & Meta Ads."
    },
    {
      icon: <Target className="w-6 h-6 text-primary-accent" />,
      title: "Growth Frameworks",
      link:"/Architecture",
      description: "Structured paths from awareness to conversion for predictable revenue."
    }
  ];

  return (
    <section className="pt-14 bg-background relative overflow-hidden" id="insights">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-3xl font-bold mb-6"
          >
            Strategic Insights for <br />
            <span className="text-primary-accent">Market Domination</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg max-w-2xl mx-auto"
          >
            Learn real strategies, case studies, and frameworks used to scale brands profitably.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link href={ `${post.link}`} key={index}>
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-3xl bg-card-bg border border-card-border hover:border-primary-accent/50 transition-all duration-300 flex flex-col h-full"
            >
              <div className="w-14 h-14 rounded-2xl bg-background border border-card-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {post.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
              <p className="text-text-secondary mb-8 flex-grow leading-relaxed">
                {post.description}
              </p>
              <button className="w-full py-4 rounded-xl bg-background border border-card-border text-sm font-bold flex items-center justify-center gap-2 group-hover:bg-primary-accent group-hover:text-background transition-all">
                Read More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
