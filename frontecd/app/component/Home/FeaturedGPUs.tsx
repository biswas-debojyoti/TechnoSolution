"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const products = [
  {
    title: "Colorful iGame GeForce RTX 5070 Ti Ultra W OC 16GB-V Graphics Card",
    href: "/products/colorful-ig-rtx-5070-ti-ultra-wo-16-v",
    image1:
      "//microcenterindia.com/cdn/shop/files/Colorful-iGame-GeForce-RTX-5070-Ti-Ultra-W-OC-16GB-V-Graphics-Card-1.webp?v=1771208300&width=533",
    image2:
      "//microcenterindia.com/cdn/shop/files/Colorful-iGame-GeForce-RTX-5070-Ti-Ultra-W-OC-16GB-V-Graphics-Card-2.webp?v=1771208299&width=533",
    salePrice: "Rs. 1,25,000.00",
    originalPrice: "Rs. 1,49,999.00",
    onSale: true,
  },
  {
    title: "ZOTAC Gaming GeForce RTX 5070 Solid Graphics Card",
    href: "/products/zotac-gaming-geforce-rtx-5070-solid",
    image1:
      "//microcenterindia.com/cdn/shop/files/ZOTAC-Gaming-GeForce-RTX-5070-Solid-GPU-1-1.webp?v=1771208641&width=533",
    image2:
      "//microcenterindia.com/cdn/shop/files/ZOTAC-Gaming-GeForce-RTX-5070-Solid-GPU-2.webp?v=1771208645&width=533",
    salePrice: "Rs. 84,000.00",
    originalPrice: "Rs. 91,390.00",
    onSale: true,
  },
  {
    title: "Colorful GeForce RTX 3050 NB DUO 6GB V4-V Graphics Card",
    href: "/products/colorful-gf-rtx-3050-nb-duo-6gb-v4-v",
    image1:
      "//microcenterindia.com/cdn/shop/files/Colorful-GeForce-RTX-3050-NB-DUO-6GB-V4-V-Graphics-Card-1.webp?v=1771209175&width=533",
    image2:
      "//microcenterindia.com/cdn/shop/files/Colorful-GeForce-RTX-3050-NB-DUO-6GB-V4-V-Graphics-Card-2.webp?v=1771209175&width=533",
    salePrice: "Rs. 23,500.00",
    originalPrice: "Rs. 29,999.00",
    onSale: true,
  },
  {
    title: "Colorful iGame GeForce RTX 5070 Ultra W OC 12GB-V Graphics Card",
    href: "/products/colorful-igame-gf-rtx-5070-ultra-w-oc-12gb-v",
    image1:
      "//microcenterindia.com/cdn/shop/files/121.webp?v=1771209276&width=533",
    image2:
      "//microcenterindia.com/cdn/shop/files/122.webp?v=1771209276&width=533",
    salePrice: "Rs. 77,190.00",
    originalPrice: "Rs. 83,000.00",
    onSale: true,
  },
  {
    title: "ZOTAC GAMING GeForce RTX 5060 Ti 16GB Twin Edge OC Graphics Card",
    href: "/products/zotac-gaming-gf-rtx-5060-ti-16gb-twin-edge-oc-gpu",
    image1:
      "//microcenterindia.com/cdn/shop/files/1111111.webp?v=1771210044&width=533",
    image2:
      "//microcenterindia.com/cdn/shop/files/11111111152.webp?v=1771210043&width=533",
    salePrice: "Rs. 71,990.00",
    originalPrice: "Rs. 91,390.00",
    onSale: true,
  },
  {
    title: "Zotac RTX 5080 Solid Core OC 16GB GDDR7 Graphics Card",
    href: "/products/zotac-rtx-5080-solid-core-oc-16-gddr7",
    image1:
      "//microcenterindia.com/cdn/shop/files/Zotac-RTX-5080-Solid-Core-OC-16GB-GDDR7-Graphics-Card-1.webp?v=1771210780&width=533",
    image2:
      "//microcenterindia.com/cdn/shop/files/Zotac-RTX-5080-Solid-Core-OC-16GB-GDDR7-Graphics-Card-2.webp?v=1771210780&width=533",
    salePrice: "Rs. 1,65,200.00",
    originalPrice: "Rs. 1,81,300.00",
    onSale: true,
  },
  {
    title: "ZOTAC GAMING GeForce RTX 5060 Ti 16GB AMP Graphics Card",
    href: "/products/zotac-gaming-gf-rtx-5060-ti-16gb-amp-gpu",
    image1:
      "//microcenterindia.com/cdn/shop/files/6-2_4508c2f1-e48e-4c85-bf6b-ad8210643ac5.webp?v=1771211104&width=533",
    image2:
      "//microcenterindia.com/cdn/shop/files/zt-b50620f-10m-image08.webp?v=1771211104&width=533",
    salePrice: "Rs. 75,850.00",
    originalPrice: null,
    onSale: false,
  },
  {
    title: "ZOTAC Gaming GeForce RTX 3050 6GB GDDR6 Twin Edge OC GPU",
    href: "/products/zotac-rtx-3050-6gb-gddr6-twin-edge-oc",
    image1:
      "//microcenterindia.com/cdn/shop/files/ZOTAC-Gaming-GeForce-RTX-3050-6GB-GDDR6-Twin-Edge-OC-GPU-1.jpg?v=1771212646&width=533",
    image2:
      "//microcenterindia.com/cdn/shop/files/ZOTAC-Gaming-GeForce-RTX-3050-6GB-GDDR6-Twin-Edge-OC-GPU-2.jpg?v=1771212646&width=533",
    salePrice: "Rs. 25,150.00",
    originalPrice: "Rs. 27,750.00",
    onSale: true,
  },
];

// Per-card hover image toggle
function ProductCard({ product }: any) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-xl p-4 mx-2 flex flex-col h-full"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.10)" }}
    >
      <Link href={product.href} className="block group">
        {/* Image */}
        <div
          className="relative w-full overflow-hidden rounded-lg bg-gray-50 mb-3"
          style={{ aspectRatio: "1/1" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {product.onSale && (
            <span className="absolute bottom-2 left-2 z-10 bg-white text-gray-800 text-xs font-semibold px-2 py-0.5 rounded">
              Sale
            </span>
          )}
          <img
            src={hovered ? product.image2 : product.image1}
            alt={product.title}
            className="w-full h-full object-cover transition-all duration-300"
          />
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-gray-800 leading-snug line-clamp-2 min-h-[2.8rem] mb-2 group-hover:underline">
          {product.title}
        </h3>
      </Link>

      {/* Price */}
      <div className="mt-auto mb-3">
        {product.onSale && product.originalPrice ? (
          <div className="flex flex-col">
            <s className="text-xs text-gray-400">{product.originalPrice} INR</s>
            <span className="text-base font-bold text-gray-900">
              {product.salePrice} INR
            </span>
          </div>
        ) : (
          <span className="text-base font-bold text-gray-900">
            {product.salePrice} INR
          </span>
        )}
      </div>

      {/* Add to Cart */}
      <button
        className="w-full py-2.5 rounded-md text-sm font-semibold text-white transition-colors"
        style={{ backgroundColor: "#7b1b7e" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#5e1461")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#7b1b7e")
        }
      >
        Add to cart
      </button>
    </div>
  );
}

export default function FeaturedGPUs() {
  const [isMobile, setIsMobile] = useState(false);
  const visibleSlides = isMobile ? 1 : 5;
  const cloneCount = visibleSlides;
  const total = products.length;

  const clonedItems = [
    ...products.slice(-cloneCount),
    ...products,
    ...products.slice(0, cloneCount),
  ];

  const [currentIndex, setCurrentIndex] = useState(cloneCount);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const isJumping = useRef(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setIsTransitioning(false);
    setCurrentIndex(cloneCount);
  }, [visibleSlides, cloneCount]);

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 4000);
  }, []);

  useEffect(() => {
    resetAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [resetAutoPlay]);

  const handleTransitionEnd = useCallback(() => {
    if (isJumping.current) return;
    if (currentIndex >= cloneCount + total) {
      isJumping.current = true;
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - total);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          isJumping.current = false;
        }),
      );
    } else if (currentIndex < cloneCount) {
      isJumping.current = true;
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + total);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          isJumping.current = false;
        }),
      );
    }
  }, [currentIndex, cloneCount, total]);

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
    resetAutoPlay();
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
    resetAutoPlay();
  };

  // Current real page (1-based) for the counter
  const realIndex = (((currentIndex - cloneCount) % total) + total) % total;
  const totalPages = Math.ceil(total / visibleSlides);
  const currentPage = Math.floor(realIndex / visibleSlides) + 1;

  const translateX = `${-(currentIndex * (100 / clonedItems.length))}%`;

  return (
    <section className="bg-white py-9 px-5">
      <div className=" mx-auto px-5">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
          <strong>GPUs at Lowest Price</strong>
        </h2>

        {/* Slider */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black text-white md:flex items-center justify-center hover:bg-gray-800 transition-colors shadow-md -translate-x-1"
            aria-label="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Viewport */}
          <div className="overflow-hidden mx-10">
            <div
              className="flex"
              style={{
                width: `${(clonedItems.length / visibleSlides) * 100}%`,
                transform: `translateX(${translateX})`,
                transition: isTransitioning
                  ? "transform 0.5s ease-in-out"
                  : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {clonedItems.map((product, idx) => (
                <div
                  key={idx}
                  style={{ width: `${100 / clonedItems.length}%` }}
                  className="flex-shrink-0 py-1"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className=" hidden  absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black text-white md:flex items-center justify-center hover:bg-gray-800 transition-colors shadow-md translate-x-1"
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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

        {/* Slide Counter */}
        <div className="flex items-center justify-center gap-3 mt-5 text-sm text-gray-500">
          <button
            onClick={handlePrev}
            className=" w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
            aria-label="Previous page"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span>
            <span className="font-semibold text-gray-800">{currentPage}</span>
            <span className="mx-1">/</span>
            <span>{totalPages}</span>
          </span>
          <button
            onClick={handleNext}
            className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
            aria-label="Next page"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* View All */}
        <div className="flex justify-center mt-6">
          <Link
            href="/collections/geforce-gpu"
            className="px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-md hover:bg-gray-900 hover:text-white transition-colors text-sm"
          >
            View all
          </Link>
        </div>
      </div>
    </section>
  );
}
