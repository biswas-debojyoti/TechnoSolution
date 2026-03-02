import Link from "next/link";
import {
  Instagram,
  Facebook,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function TopBar() {
  const announcements = [
    "🚚 Free Shipping on orders over ₹5000",
    "🎁 Use code FREESHIP & save more",
    "⚡ Fast delivery across India",
    "🛒 Genuine PC components only",
    "📍 Visit our nearest store today",
  ];

  return (
    <div className="bg-gray-900 text-white text-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          {/* LEFT SOCIAL ICONS */}
          <div className="flex items-center gap-3">
            <Link
              href="https://www.instagram.com/microcenterind/"
              aria-label="Instagram"
              className="hover:text-pink-400 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </Link>
            <Link
              href="https://www.facebook.com/microcenterind"
              aria-label="Facebook"
              className="hover:text-blue-400 transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </Link>
            <Link
              href="https://wa.me/+9196798 95416"
              aria-label="WhatsApp"
              className="hover:text-green-400 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20 4A10 10 0 004 20l-1 4 4-1A10 10 0 1020 4zM7 9c1 3 4 6 7 7l2-2c.3-.3.8-.4 1.2-.2 1 .4 2 .6 3 .6v3c0 .6-.4 1-1 1A16 16 0 015 5c0-.6.4-1 1-1h3c0 1 .2 2 .6 3 .2.4.1.9-.2 1.2L7 9z" />
              </svg>
            </Link>
            <Link
              href="https://www.youtube.com/@microcenterind"
              aria-label="YouTube"
              className="hover:text-red-400 transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </Link>
          </div>

          {/* CENTER ANNOUNCEMENT SLIDER */}
          <div className="hidden md:block flex-1 mx-8 overflow-hidden">
            <div className="animate-slide whitespace-nowrap">
              {announcements.map((text, index) => (
                <span key={index} className="inline-block mx-8">
                  {text.includes("FREESHIP") ? (
                    <>
                      {text.split("FREESHIP")[0]}
                      <strong>FREESHIP</strong>
                      {text.split("FREESHIP")[1]}
                    </>
                  ) : (
                    text
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT CONTACT */}
          <div className="flex items-center gap-4">
            <Link
              href="tel:+9196798 95416"
              className="hidden lg:flex items-center gap-1 hover:text-blue-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+91 96798 95416</span>
            </Link>
            <Link
              href="mailto:help@microcenterindia.com"
              className="hidden md:flex items-center gap-1 hover:text-blue-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </Link>
            <Link
              href="/pages/store-locator"
              className="flex items-center gap-1 hover:text-blue-400 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>Store</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
