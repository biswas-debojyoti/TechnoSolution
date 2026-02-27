"use client";

export default function AboutSection() {
  const highlights = [
    {
      title: "Performance-Driven Builds",
      description:
        "Carefully selected components and optimized builds for gaming, workstations, and professional workflows.",
    },
    {
      title: "Trusted Expertise",
      description:
        "Get guidance from specialists who understand real-world performance, not just specifications.",
    },
    {
      title: "Value & Reliability",
      description:
        "Premium products, transparent pricing, and long-term reliability you can depend on.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#fafafa] to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Micro Center India
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Powering gamers, creators, and professionals with cutting-edge
              technology and expert guidance.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
            {/* Left Content */}
            <div className="space-y-5 text-gray-700 leading-relaxed">
              <p>
                At <strong>Micro Center India</strong>, we understand how
                critical technology is in today's fast-moving world. Whether
                you're a gamer chasing performance, a professional building
                reliability, or a business scaling growth — we're here to
                support you at every step.
              </p>

              <p>
                From high-performance custom PC builds in India to prebuilt
                gaming PCs, components, and accessories, our curated selection
                is designed to deliver maximum value without compromise.
              </p>

              <p>
                We don't just sell hardware — we provide confidence. With expert
                recommendations, quality assurance, and customer-first support,
                Micro Center India stands as your trusted destination for
                technology that performs.
              </p>
            </div>

            {/* Right Highlight Cards */}
            <div className="space-y-5">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  <h4 className="text-lg font-semibold text-[#6a1b9a] mb-2">
                    {highlight.title}
                  </h4>
                  <p className="text-gray-600 text-[15px] leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
