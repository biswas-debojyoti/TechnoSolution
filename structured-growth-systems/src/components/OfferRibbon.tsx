import { useRef } from "react";

interface RibbonItem {
  icon: string;
  text: string;
}

const ribbonItems: RibbonItem[] = [
  { icon: "🚀", text: "Website Development From ₹6,000 ($75)" },
  { icon: "🔥", text: "1 Month FREE SEO" },
  { icon: "📊", text: "FREE Google Ads Audit" },
];

const ArrowSeparator = () => (
  <span className="opacity-60 text-white text-sm font-light px-2 select-none">➜</span>
);

const RibbonContent = () => (
  <>
    {ribbonItems.map((item, index) => (
      <span key={index} className="flex items-center gap-0">
        <span className="flex items-center gap-2 px-8 py-2 text-sm font-semibold text-white whitespace-nowrap">
          <span className="text-base">{item.icon}</span>
          {item.text}
        </span>
        <ArrowSeparator />
      </span>
    ))}
  </>
);

export default function OfferRibbon() {
  const ribbonRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <style>{`
        @keyframes scrollRibbon {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ribbon-track {
          animation: scrollRibbon 25s linear infinite;
          will-change: transform;
        }
        .ribbon-wrapper:hover .ribbon-track {
          animation-play-state: paused;
        }
      `}</style>

      <div
        ref={ribbonRef}
        className="ribbon-wrapper sticky top-0 z-[9999] w-full overflow-hidden shadow-md "
        style={{
          background: "linear-gradient(90deg, #0a4bff, #1e90ff)",
        }}
        role="marquee"
        aria-label="Promotional offers"
      >
        <div className="ribbon-track flex whitespace-nowrap w-max">
          {/* Duplicate content for seamless loop */}
          <span className="flex items-center">
            <RibbonContent />
          </span>
          <span className="flex items-center" aria-hidden="true">
            <RibbonContent />
          </span>
        </div>
      </div>
    </>
  );
}