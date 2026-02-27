"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ChevronRight as Arrow } from "lucide-react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { name: "Accessories", href: "/collections/accessories" },
    { name: "80+ Bronze Modular", href: "/collections/80-bronze-modular" },
    { name: "CPU", href: "/collections/cpu" },
    { name: "Motherboards", href: "/collections/motherboard" },
    { name: "RAM", href: "/collections/ram" },
    { name: "SSD", href: "/collections/ssd" },
    { name: "Hard Disk Drives", href: "/collections/hard-disk-drives" },
    { name: "Graphics Cards", href: "/collections/graphics-card" },
    { name: "CPU Coolers", href: "/collections/cpu-coolers" },
    { name: "Cabinets", href: "/collections/cabinet" },
  ];

  const slides = [
    {
      image:
        "https://microcenterindia.com/cdn/shop/files/MARS-980-BLADE_E-Micro-Centre-1600x900-1_00d69a05-6bc2-48a5-8ea0-9528280e3f0d.webp?v=1771194648&width=2000",
      alt: "Desktop Banner",
      href: "#",
    },
    {
      image:
        "https://microcenterindia.com/cdn/shop/files/deskstop-banner-Main-1_869cf96a-744a-4383-8abb-4998ec88b4fa.webp?v=1771194647&width=2000",
      alt: "GeForce Graphics Card",
      href: "#",
    },
    {
      image:
        "https://microcenterindia.com/cdn/shop/files/GEFORCE_GRAPHICS_CARD.webp?v=1771922894&width=2000",
      alt: "Mars 980 Blade",
      href: "#",
    },
  ];

  const sideImages = [
    {
      image:
        "https://microcenterindia.com/cdn/shop/files/website-side-banner-1-600x431_1_1dc3348f-4f5c-45dd-bec1-f0fb47432977.webp?v=1771194646&width=1000",
      href: "#",
      alt: "Side Banner 1",
    },
    {
      image:
        "https://microcenterindia.com/cdn/shop/files/website-side-banner-2-2048x1472_9d03583e-4b57-4256-aa68-2d775089b1d6.webp?v=1771194646&width=1000",
      href: "#",
      alt: "Side Banner 2",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="container mx-auto px-4 py-5">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_240px] gap-6">
        {/* Categories Panel */}
        <aside className="hidden lg:block bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-[#732370] text-white px-4 py-3.5">
            <h3 className="font-semibold text-[15px]">Categories</h3>
          </div>
          <ul className="py-2">
            {categories.map((category, index) => (
              <li
                key={index}
                className="border-b border-gray-100 last:border-b-0"
              >
                <Link
                  href={category.href}
                  className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  {category.name}
                  <Arrow className="w-4 h-4 text-gray-400" />
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Slider */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
          <div className="relative aspect-[16/9]">
            {slides.map((slide, index) => (
              <Link
                key={index}
                href={slide.href}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.alt || "Slide Image"}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </Link>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/35 hover:bg-black/50 text-white flex items-center justify-center transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/35 hover:bg-black/50 text-white flex items-center justify-center transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          {/* <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentSlide ? "bg-black w-4" : "bg-black/25"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div> */}
        </div>

        {/* Side Images */}
        <div className="hidden lg:grid grid-rows-2 gap-6">
          {sideImages.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
