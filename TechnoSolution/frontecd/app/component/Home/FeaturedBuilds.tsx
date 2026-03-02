"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Volume2, VolumeX } from "lucide-react";

export default function FeaturedBuilds() {
  // Use a large starting index so we can go backwards too
  const [currentIndex, setCurrentIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState<any>({});
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const builds = [
    {
      id: 1,
      title: "4k Gaming",
      video:
        "//microcenterindia.com/cdn/shop/videos/c/vp/fc4feb84b76b4fa88f88cbe1c79f5363/fc4feb84b76b4fa88f88cbe1c79f5363.HD-1080p-2.5Mbps-73926876.mp4?v=0",
      poster:
        "//microcenterindia.com/cdn/shop/files/preview_images/fc4feb84b76b4fa88f88cbe1c79f5363.thumbnail.0000000000.jpg?v=1771197842&width=2800",
      image:
        "//microcenterindia.com/cdn/shop/collections/NZXTH9FlowEliteBlack_grande_29c5a6f0-b855-41da-951e-de212e30805a.webp?v=1770998459&width=1000",
      href: "/collections/4k-gaming",
    },
    {
      id: 2,
      title: "4k Pre Built Gaming Desktop",
      video:
        "//microcenterindia.com/cdn/shop/videos/c/vp/7b1c308b852a44ee942527fc485bbd2e/7b1c308b852a44ee942527fc485bbd2e.HD-1080p-2.5Mbps-73926879.mp4?v=0",
      poster:
        "//microcenterindia.com/cdn/shop/files/preview_images/7b1c308b852a44ee942527fc485bbd2e.thumbnail.0000000000.jpg?v=1771197851&width=2800",
      image:
        "//microcenterindia.com/cdn/shop/files/NZXTH9FlowEliteBlack_grande_e2bf6fbd-fcbf-4989-8444-f65836e359c4.webp?v=1771100985&width=1000",
      href: "/products/4k-gaming-pre-build-intel-i9-4090",
    },
    {
      id: 3,
      title: "AI Workstation & Editing",
      video:
        "//microcenterindia.com/cdn/shop/videos/c/vp/6f4ebf6fca7f4f6e8f23ff0ebaaf3326/6f4ebf6fca7f4f6e8f23ff0ebaaf3326.HD-1080p-2.5Mbps-73926877.mp4?v=0",
      poster:
        "//microcenterindia.com/cdn/shop/files/preview_images/6f4ebf6fca7f4f6e8f23ff0ebaaf3326.thumbnail.0000000000.jpg?v=1771197841&width=2800",
      image:
        "//microcenterindia.com/cdn/shop/collections/CPU-AMD-RYZEN-5-7600X-8-scaled-1.webp?v=1771044801&width=1000",
      href: "/collections/ai-workstation-editing",
    },
    {
      id: 4,
      title: "Custom Build",
      video:
        "//microcenterindia.com/cdn/shop/videos/c/vp/b3e06f35bdbc45a7a4af224cb4dfae0a/b3e06f35bdbc45a7a4af224cb4dfae0a.SD-480p-0.9Mbps-73926878.mp4?v=0",
      poster:
        "//microcenterindia.com/cdn/shop/files/preview_images/b3e06f35bdbc45a7a4af224cb4dfae0a.thumbnail.0000000000.jpg?v=1771197834&width=2800",
      image:
        "//microcenterindia.com/cdn/shop/collections/custom-liqude-cool-e1700055091479.webp?v=1771044817&width=1000",
      href: "/collections/custom-build",
    },
    {
      id: 5,
      title: "HULK Green Gaming PC Dual Transparent Display PC",
      video:
        "//microcenterindia.com/cdn/shop/videos/c/vp/9e10b8c3577147e78807e9aac93bc132/9e10b8c3577147e78807e9aac93bc132.HD-1080p-2.5Mbps-73932020.mp4?v=0",
      poster:
        "//microcenterindia.com/cdn/shop/files/preview_images/9e10b8c3577147e78807e9aac93bc132.thumbnail.0000000000.jpg?v=1771199451&width=2800",
      image:
        "//microcenterindia.com/cdn/shop/files/hulk02.webp?v=1771201190&width=1000",
      href: "/products/hulk-green-gaming-pc",
    },
  ];

  const total = builds.length;

  // Normalize any integer index to 0..total-1
  const mod = (n: any) => ((n % total) + total) % total;

  // The "active" build index (always 0..total-1)
  const activeIndex = mod(currentIndex);

  // Reset autoplay timer
  const resetTimer = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 9000);
  };

  useEffect(() => {
    resetTimer();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play().catch(() => {});
          video.muted = !soundEnabled[index];
        } else {
          video.pause();
          video.muted = true;
        }
      }
    });
  }, [activeIndex, soundEnabled]);

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    resetTimer();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
    resetTimer();
  };

  const handleSlideClick = (buildIndex: any) => {
    // Navigate to nearest occurrence of buildIndex relative to currentIndex
    const diff = buildIndex - activeIndex;
    // Pick shortest path around the circle
    let step = diff;
    if (step > total / 2) step -= total;
    if (step < -total / 2) step += total;
    setCurrentIndex((prev) => prev + step);
    resetTimer();
  };

  const toggleSound = (index: any) => {
    const video = videoRefs.current[index];
    if (video) {
      const newSoundState = !soundEnabled[index];
      setSoundEnabled((prev: any) => ({ ...prev, [index]: newSoundState }));
      video.muted = !newSoundState;
    }
  };

  // Compute pixel offset relative to activeIndex
  const getSlideOffset = (buildIndex: any) => {
    let diff = buildIndex - activeIndex;
    // Wrap diff so slides appear on the shortest path
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff * 305; // 290px width + 15px gap
  };

  return (
    <section className="py-10 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-1 text-gray-900">
          Our Featured PC Build's
        </h2>

        <div className="max-w-7xl mx-auto relative">
          {/* Video Carousel Container */}
          <div className="relative h-[600px] flex items-end justify-center">
            <div className="absolute left-1/2 -translate-x-1/2 flex items-end">
              {builds.map((build, index) => {
                const isSelected = index === activeIndex;
                const offset = getSlideOffset(index);

                return (
                  <div
                    key={build.id}
                    className={`absolute left-1/2 transition-all duration-500 ease-out cursor-pointer ${
                      isSelected ? "z-10" : "z-0"
                    }`}
                    style={{
                      transform: `translateX(calc(-50% + ${offset}px)) ${
                        !isSelected ? "translateY(30px) scale(0.95)" : ""
                      }`,
                      opacity: isSelected ? 1 : 0.75,
                      width: "290px",
                    }}
                    onClick={() => handleSlideClick(index)}
                  >
                    <div className="relative">
                      {/* Video Container */}
                      <div className="relative rounded-xl overflow-hidden shadow-lg">
                        <video
                          ref={(el) => {
                            videoRefs.current[index] = el;
                          }}
                          className="w-full aspect-[12/16] object-cover"
                          poster={build.poster}
                          loop
                          muted
                          playsInline
                        >
                          <source src={build.video} type="video/mp4" />
                        </video>

                        {/* Sound Button - Only on Selected */}
                        {isSelected && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSound(index);
                            }}
                            className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center hover:bg-white/70 transition-colors z-20"
                            aria-label="Toggle sound"
                          >
                            {soundEnabled[index] ? (
                              <Volume2 className="w-5 h-5 text-gray-800" />
                            ) : (
                              <VolumeX className="w-5 h-5 text-gray-800" />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Info Card */}
                      <Link
                        href={build.href}
                        onClick={(e) => !isSelected && e.preventDefault()}
                      >
                        <div
                          className={`mt-2.5 border rounded-xl p-2.5 flex items-center gap-3 transition-all bg-white ${
                            isSelected
                              ? "border-gray-900 hover:border-2"
                              : "border-gray-300"
                          }`}
                        >
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                            <img
                              src={build.image}
                              alt={build.title}
                              width={64}
                              height={64}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 line-clamp-2 leading-snug">
                              {build.title}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center text-gray-500 justify-center gap-5 mt-8">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-gray-200 shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-105"
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="w-8 h-8 text-gray-500 rounded-full bg-gray-200 shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-105"
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
        </div>
      </div>
    </section>
  );
}
