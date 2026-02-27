import Link from "next/link";

const shopLinks = [
  {
    label: "PC Components",
    href: "/search?q=pc+component&options[prefix]=last",
  },
  { label: "Pre Built Gaming PCs", href: "/pages/pre-build-pc" },
  { label: "Workstations", href: "/collections/ai-workstation-editing" },
  { label: "Gaming Accessories", href: "/collections/gaming-accessories" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/policies/privacy-policy" },
  { label: "Refund & Returns", href: "/policies/refund-policy" },
  { label: "Terms & Conditions", href: "/policies/terms-of-service" },
  { label: "Shipping Policy", href: "/policies/shipping-policy" },
];

const aboutLinks = [
  { label: "About Us", href: "/pages/about-us" },
  { label: "Contact Us", href: "/pages/contact" },
  { label: "Our Stores", href: "/pages/contact" },
  { label: "Bank Details", href: "/pages/bank-details" },
];

const accountLinks = [
  { label: "My Account", href: "/account" },
  { label: "Order Tracking", href: "/pages/order-tracking" },
  { label: "Request a Quote", href: "/pages/contact" },
];

const socials = [
  {
    href: "https://www.facebook.com",
    icon: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com",
    icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
    label: "Instagram",
  },
  {
    href: "https://www.youtube.com",
    icon: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
    label: "YouTube",
  },
  {
    href: "https://x.com/",
    icon: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
    label: "X (Twitter)",
  },
];

function FooterColumn({ title, links }: any) {
  return (
    <section>
      <h4 className="text-[#fb923c] font-semibold text-[16px] mb-[18px]">
        {title}
      </h4>
      <ul className="space-y-[10px]">
        {links.map((link: any) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[#cbd5f5] text-sm leading-relaxed hover:text-[#38bdf8] transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Footer() {
  return (
    <div className="w-full px-4 py-6 bg-amber-50 ">
      <footer
        className="max-w-[1500px] mx-auto rounded-3xl px-[50px] pt-[60px] pb-[40px] text-[#e5e7eb]"
        style={{
          background: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        }}
        role="contentinfo"
      >
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,_1fr)] gap-12 text-left max-sm:text-center">
          {/* Brand */}
          <section>
            <div className="mb-[18px]">
              <Link href="/" aria-label="Home">
                <img
                  src="https://cdn.shopify.com/s/files/1/0671/0093/4192/files/mic-logo_1.webp?v=1770020772"
                  alt="Micro Center India – Gaming PCs & Computer Components Store in Kolkata"
                  width={180}
                  height="auto"
                  loading="lazy"
                  className="max-w-[180px] max-sm:mx-auto"
                />
              </Link>
            </div>

            <address className="text-[#cbd5f5] text-sm leading-[1.7] not-italic">
              Phone:
              <br />
              <Link
                href="tel:+916290923176"
                className="hover:text-[#38bdf8] transition-colors"
              >
                +91 62909 23176
              </Link>
              <br />
              <Link
                href="tel:+916290337892"
                className="hover:text-[#38bdf8] transition-colors"
              >
                +91 62903 37892
              </Link>
              <br />
              <br />
              4, Chittaranjan Avenue, Esplanade,
              <br />
              Beside Bow Barracks,
              <br />
              Kolkata – 700072, West Bengal, India
            </address>

            {/* Socials */}
            <div className="flex gap-[14px] mt-5 max-sm:justify-center">
              {socials.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  aria-label={s.label}
                  className="w-11 h-11 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{ background: "rgba(2,6,23,0.8)" }}
                >
                  <img src={s.icon} alt={s.label} width={18} height={18} />
                </Link>
              ))}
            </div>
          </section>

          <FooterColumn title="Shop Computer Products" links={shopLinks} />
          <FooterColumn title="Customer Policies" links={policyLinks} />
          <FooterColumn title="About Micro Center India" links={aboutLinks} />
          <FooterColumn title="Customer Account" links={accountLinks} />
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-5 text-center text-[13px] text-[#94a3b8] border-t border-white/[0.08]">
          © 2026 Micro Center India. All rights reserved.
        </div>
      </footer>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ComputerStore",
            name: "Micro Center India",
            url: "https://microcenterindia.com",
            logo: "//microcenterindia.com/cdn/shop/t/2/assets/logo.png?v=613",
            telephone: "+91-6290923176",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "4, Chittaranjan Avenue, Esplanade, Beside Bow Barracks",
              addressLocality: "Kolkata",
              postalCode: "700072",
              addressRegion: "West Bengal",
              addressCountry: "IN",
            },
            sameAs: [
              "https://www.facebook.com/microcenterindia",
              "https://www.instagram.com/microcenterindia",
              "https://www.youtube.com/@microcenterindia",
              "https://twitter.com/microcenterindia",
            ],
          }),
        }}
      />
    </div>
  );
}
