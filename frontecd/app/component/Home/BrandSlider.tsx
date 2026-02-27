"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function BrandSlider() {
  const trackRef = useRef(null);

  const brands = [
    { name: "AMD", logo: "/images/brands/amd.png" },
    { name: "Intel", logo: "/images/brands/intel.png" },
    { name: "NVIDIA", logo: "/images/brands/nvidia.png" },
    { name: "Corsair", logo: "/images/brands/corsair.jpg" },
    { name: "ASUS", logo: "/images/brands/asus.png" },
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Duplicate content for seamless loop
  }, []);

  return (
    <section className="py-12 bg-[#fafafa]">
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex animate-scroll"
          style={{
            animationDuration: "10s",
          }}
        >
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[200px] h-[120px] flex items-center justify-center px-8"
            >
              <div className="relative w-full h-20">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 25s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
