// app/page.jsx or pages/index.jsx

import AboutSection from "./AboutSection";
import BrandSlider from "./BrandSlider";
import FeaturedBuilds from "./FeaturedBuilds";
import FeaturedGPUs from "./FeaturedGPUs";
import HeroSection from "./HeroSection";
import PopularCategories from "./PopularCategories";
import Testimonials from "./Testimonials";
import YouTubeSection from "./YouTubeSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <FeaturedBuilds />
      <PopularCategories />
      <FeaturedGPUs />
      <YouTubeSection />
      <Testimonials />
      <BrandSlider />
      <AboutSection />
    </main>
  );
}
