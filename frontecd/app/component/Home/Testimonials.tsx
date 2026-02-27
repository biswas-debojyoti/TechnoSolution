"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const reviews = [
    {
      id: 1,
      name: "Amit Verma",
      avatar: "/images/avatars/avatar1.png",
      rating: 5,
      time: "1 months ago",
      text: "Best place for PC parts. Fast delivery and excellent support.",
    },
    {
      id: 2,
      name: "Sandeep",
      avatar: "/images/avatars/avatar2.png",
      rating: 5,
      time: "1 months ago",
      text: "Quick response from support and hassle-free purchase.",
    },
    {
      id: 3,
      name: "Rahul Sharma",
      avatar: "/images/avatars/avatar3.png",
      rating: 5,
      time: "2 months ago",
      text: "Great prices and genuine products. Smooth buying experience.",
    },
    {
      id: 4,
      name: "TOXIC AKKU",
      avatar: "/images/avatars/avatar4.png",
      rating: 5,
      time: "1 months ago",
      text: "Best experience at affordable price range",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setTimeout(() => setIsAnimating(false), 450);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setTimeout(() => setIsAnimating(false), 450);
  };

  const renderStars = (rating: any) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className="text-[#FBBC04] text-sm">
        ★
      </span>
    ));
  };

  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#732370] mb-8">
            What customers say
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 items-center">
            {/* Google Card */}
            <div className="bg-white rounded-2xl p-7 shadow-xl text-center">
              <strong className="block text-lg font-semibold text-gray-900 mb-2">
                Micro Center India
              </strong>
              <div className="flex justify-center gap-0.5 mb-2">
                {renderStars(5)}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                4.9 based on 2359 reviews
              </p>
              <Link
                href="https://search.google.com/local/writereview?placeid=ChIJnbSbL2R3AjoRrAbxDmACg4o"
                target="_blank"
                className="inline-block px-6 py-2.5 bg-[#1a73e8] text-white rounded-full font-semibold hover:bg-[#1557b0] transition-colors"
              >
                Review us on Google
              </Link>
            </div>

            {/* Slider */}
            <div className="relative">
              {/* Arrows */}
              {/* <button
                onClick={handlePrev}
                className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-700 hover:bg-[#732370] hover:text-white transition-all hover:scale-105"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-700 hover:bg-[#732370] hover:text-white transition-all hover:scale-105"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button> */}

              {/* Track */}
              <div className="overflow-hidden">
                <div
                  className="flex gap-5 transition-transform duration-450 ease-out"
                  style={{ transform: `translateX(-${currentIndex * 320}px)` }}
                >
                  {reviews.slice(1.2).map((review) => (
                    <div
                      key={review.id}
                      className="flex-shrink-0 w-[300px] bg-white rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-11 h-11 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                          <Image
                            src={review.avatar}
                            alt={review.name}
                            width={44}
                            height={44}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <strong className="block text-[15px] font-semibold text-gray-900">
                            {review.name}
                          </strong>
                          <div className="flex gap-0.5 my-1">
                            {renderStars(review.rating)}
                          </div>
                          <small className="text-xs text-gray-500">
                            {review.time}
                          </small>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
                        {review.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-5">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-5 bg-[#FBBC04]"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
