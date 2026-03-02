"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Search, User, ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const categories = [
    { name: "Processors", href: "/collections/cpu" },
    { name: "Motherboards", href: "/collections/motherboard" },
    { name: "GPU's", href: "/collections/gpus" },
    { name: "RAM", href: "/collections/ram" },
    { name: "SSD", href: "/collections/ssd" },
    { name: "Coolers", href: "/collections/cpu-coolers" },
    { name: "Cabinets", href: "/collections/cabinet" },
    { name: "Laptop RAM", href: "/collections/laptop-ram" },
    { name: "Mobiles", href: "/collections/mobile" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 text-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="/logocom1.png"
              alt="Techno Solution India"
              width={120}
              height={42}
              className="h-10 w-auto md:h-20"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-900 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 text-gray-900 hover:text-blue-600 font-medium transition-colors"
                onMouseEnter={() => setCategoriesOpen(true)}
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                Categories
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 transition-all duration-200 ${
                  categoriesOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onMouseEnter={() => setCategoriesOpen(true)}
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/pages/pre-build-pc"
              className="text-gray-900 hover:text-blue-600 font-medium transition-colors"
            >
              Pre Build
            </Link>

            <Link
              href="/pages/blogs"
              className="text-gray-900 hover:text-blue-600 font-medium transition-colors"
            >
              Blogs
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Desktop Search */}
            <div className="hidden md:block">
              <form action="/search" method="get" className="relative">
                <input
                  type="search"
                  name="q"
                  placeholder="Search"
                  className="w-64 lg:w-80 px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account */}
            <Link
              href="/customer_authentication/redirect?locale=en&region_country=IN"
              className="hidden md:flex p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden pb-4">
            <form action="/search" method="get" className="relative">
              <input
                type="search"
                name="q"
                placeholder="Search"
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl transform transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>

                {/* Categories in Mobile */}
                <li>
                  <details className="group">
                    <summary className="flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors font-medium cursor-pointer">
                      Categories
                      <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                    </summary>
                    <ul className="mt-2 ml-4 space-y-1">
                      {categories.map((category) => (
                        <li key={category.name}>
                          <Link
                            href={category.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>

                <li>
                  <Link
                    href="/pages/pre-build-pc"
                    className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pre Build
                  </Link>
                </li>

                <li>
                  <Link
                    href="/pages/blogs"
                    className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blogs
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Mobile Menu Footer */}
            <div className="border-t p-4">
              <Link
                href="/customer_authentication/redirect?locale=en&region_country=IN"
                className="flex items-center gap-3 px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Log in</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
