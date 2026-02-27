"use client";

import Link from "next/link";

export default function YouTubeSection() {
  const videos = [
    {
      id: 1,
      embedUrl: "https://www.youtube.com/embed/9JFWpyQjzcA",
    },
    {
      id: 2,
      embedUrl: "https://www.youtube.com/embed/1OUunFvqBKg",
    },
    {
      id: 3,
      embedUrl: "https://www.youtube.com/embed/a09V1CwxTp4",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-[#7b1b7e] mb-3">
            Subscribe to MicroCenter India
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed">
            Stay updated with the latest PC builds, tech reviews, gaming setups,
            and exclusive offers. Subscribe to our YouTube channel and never
            miss an update!
          </p>

          <Link
            href="https://www.youtube.com"
            target="_blank"
            className="inline-block px-7 py-3 bg-[#7b1b7e] text-white rounded-full font-semibold hover:bg-[#5e1460] transition-all hover:-translate-y-0.5 mb-9"
          >
            Subscribe Now
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {videos.map((video) => (
              <div
                key={video.id}
                className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg bg-black"
              >
                <iframe
                  src={video.embedUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  title={`YouTube video ${video.id}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
