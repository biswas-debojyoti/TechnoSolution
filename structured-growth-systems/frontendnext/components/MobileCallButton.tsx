import { Phone } from "lucide-react";

export default function MobileCallButton() {
  return (
    <div className="fixed bottom-30 right-5 z-50 md:hidden">
      <a
        href="tel:8383997723"
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-full shadow-lg transition-all"
      >
        <Phone size={18} />
        Call Now
      </a>
    </div>
  );
}