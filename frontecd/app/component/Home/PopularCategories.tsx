"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const collections = [
  {
    title: "CPU",
    href: "/collections/cpu",
    image:
      "//microcenterindia.com/cdn/shop/collections/Intel-Core-i9-14900KS-CPU-1_medium.jpg?v=1770998259",
  },
  {
    title: "Motherboards",
    href: "/collections/motherboard",
    image:
      "//microcenterindia.com/cdn/shop/collections/MSI-B650M-Bomber-WIFI-Motherboard-3_medium.webp?v=1770998358",
  },
  {
    title: "RAM",
    href: "/collections/ram",
    image:
      "//microcenterindia.com/cdn/shop/collections/G.Skill-Trident-Z5-RGB-32GB-16GBx2-DDR5-7600MHz-Desktop-RAM-3_medium.webp?v=1770998516",
  },
  {
    title: "SSD",
    href: "/collections/ssd",
    image:
      "//microcenterindia.com/cdn/shop/collections/SanDisk-2TB-Extreme-Pro-Portable-SSD_medium.png?v=1770998542",
  },
  {
    title: "Graphics Cards",
    href: "/collections/graphics-card",
    image:
      "//microcenterindia.com/cdn/shop/collections/GPU-12_medium.webp?v=1770998415",
  },
  {
    title: "Cabinets",
    href: "/collections/cabinet",
    image:
      "//microcenterindia.com/cdn/shop/collections/82_source_1708009941_medium.jpg?v=1770998290",
  },
  {
    title: "CPU Coolers",
    href: "/collections/cpu-coolers",
    image:
      "//microcenterindia.com/cdn/shop/collections/Cooler-Master-Hyper-212-Spectrum-V3-ARGB-CPU-Air-Cooler-4_medium.webp?v=1770998302",
  },
  {
    title: "Monitors",
    href: "/collections/monitor",
    image:
      "//microcenterindia.com/cdn/shop/collections/MSI-MAG-255XF-25-Inch-FHD-Gaming-Monitor-3_medium.webp?v=1770998465",
  },
  {
    title: "Keyboards",
    href: "/collections/keyboard",
    image:
      "//microcenterindia.com/cdn/shop/collections/Zebronics-Zeb-Nitro-Plus-Blue-Black-Keyboard-1_medium.webp?v=1770998643",
  },
];

export default function PopularCategories() {
  const [isMobile, setIsMobile] = useState(false);
  const visibleSlides = isMobile ? 1 : 5;

  // Build cloned array: [...tail clones, ...originals, ...head clones]
  // Clone count = visibleSlides
  const cloneCount = visibleSlides;
  const totalReal = collections.length;

  const clonedItems = [
    ...collections.slice(-cloneCount),
    ...collections,
    ...collections.slice(0, cloneCount),
  ];

  // currentIndex points into clonedItems; real slides start at cloneCount
  const [currentIndex, setCurrentIndex] = useState(cloneCount);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isJumping = useRef(false);

  // Responsive detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Reset to correct real-slide position when visibleSlides changes
  useEffect(() => {
    setIsTransitioning(false);
    setCurrentIndex(cloneCount);
  }, [visibleSlides, cloneCount]);

  const goTo = useCallback((newIndex: any, withTransition = true) => {
    setIsTransitioning(withTransition);
    setCurrentIndex(newIndex);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    if (isJumping.current) return;

    // If we've scrolled into the tail clones (going forward)
    if (currentIndex >= cloneCount + totalReal) {
      isJumping.current = true;
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - totalReal);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isJumping.current = false;
        });
      });
    }
    // If we've scrolled into the head clones (going backward)
    else if (currentIndex < cloneCount) {
      isJumping.current = true;
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + totalReal);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isJumping.current = false;
        });
      });
    }
  }, [currentIndex, cloneCount, totalReal]);

  const handleNext = useCallback(() => {
    goTo(currentIndex + 1);
    resetAutoPlay();
  }, [currentIndex, goTo]);

  const handlePrev = useCallback(() => {
    goTo(currentIndex - 1);
    resetAutoPlay();
  }, [currentIndex, goTo]);

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        setIsTransitioning(true);
        return prev + 1;
      });
    }, 4500);
  };

  useEffect(() => {
    resetAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [resetAutoPlay]);

  // Calculate translate: each slide takes (100% / visibleSlides) of the track
  // We shift by currentIndex slots
  const translatePercent =
    (-(currentIndex * (100 / visibleSlides)) / clonedItems.length) *
    clonedItems.length;
  // Simpler: use pixel-based via CSS custom property approach
  // translateX = -(currentIndex / visibleSlides) * (sliderWidth / totalCloned * visibleSlides)
  // Easiest with CSS: use percentage of the track itself
  // Track width = clonedItems.length * slideWidth, slideWidth = 100%/visibleSlides of slider
  // So translateX = -currentIndex * slideWidth = -currentIndex * (100% of slider / visibleSlides)
  // As % of track: = -currentIndex * (100 / clonedItems.length)%
  const translateX = `${-(currentIndex * (100 / clonedItems.length))}%`;

  return (
    <section className="bg-white py-14 px-4">
      <div className="max-w-screen-xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Popular Categories
        </h2>

        {/* Slider wrapper */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-[50px] h-[50px] rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors shadow-md"
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Slider viewport */}
          <div className="overflow-hidden mx-[60px]">
            <div
              className="flex"
              style={{
                width: `${(clonedItems.length / visibleSlides) * 100}%`,
                transform: `translateX(${translateX})`,
                transition: isTransitioning
                  ? "transform 0.5s ease-in-out"
                  : "none",
                gap: "0px",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {clonedItems.map((item, idx) => (
                <div
                  key={idx}
                  className="box-border px-[7.5px]"
                  style={{ width: `${100 / clonedItems.length}%` }}
                >
                  <Link href={item.href}>
                    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white text-center group">
                      <div className="aspect-square overflow-hidden bg-gray-50">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="py-3 px-2 text-[15px] font-medium text-gray-800 group-hover:text-black transition-colors">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[50px] h-[50px] rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors shadow-md"
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
