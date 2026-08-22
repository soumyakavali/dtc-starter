"use client"

import React, { useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { usePathname } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

interface LeftNavPanelProps {
  customer?: HttpTypes.StoreCustomer | null
}

const SUBCATEGORIES = [
  {
    name: "All Bio Products",
    nameKn: "ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು (10 Items)",
    href: "/store",
    icon: "🌿",
    badge: "10",
  },
  {
    name: "Bio-Fertilizers & VAM",
    nameKn: "ಜೈವಿಕ ಗೊಬ್ಬರ & ವ್ಯಾಮ್",
    href: "/categories/bio-fertilizers",
    icon: "🌾",
    badge: "NPK + VAM",
  },
  {
    name: "Bio-Pesticides & Insecticides",
    nameKn: "ಜೈವಿಕ ಕೀಟನಾಶಕಗಳು",
    href: "/categories/bio-pesticides",
    icon: "🛡️",
    badge: "Grub / Termite",
  },
  {
    name: "Bio-Fungicides & Bactericides",
    nameKn: "ಶಿಲೀಂಧ್ರ & ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕ",
    href: "/categories/bio-fungicides",
    icon: "🧪",
    badge: "Root Rot / Wilt",
  },
  {
    name: "Bio-Decomposers & Nematicides",
    nameKn: "ಡಿಕಂಪೋಸರ್ & ನೆಮಟೋಡ್",
    href: "/categories/bio-decomposers",
    icon: "🍂",
    badge: "Compost",
  },
  {
    name: "Powder Formulations (1 Kg)",
    nameKn: "ಪೌಡರ್ ಪ್ಯಾಕ್‌ಗಳು",
    href: "/categories/powder-products",
    icon: "📦",
    badge: "₹150",
  },
  {
    name: "Liquid Formulations (1 L)",
    nameKn: "ಲಿಕ್ವಿಡ್ ಬಾಟಲ್‌ಗಳು",
    href: "/categories/liquid-products",
    icon: "💧",
    badge: "₹350",
  },
]

export default function LeftNavPanel({ customer }: LeftNavPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isProductsExpanded, setIsProductsExpanded] = useState(true)
  const pathname = usePathname()

  // Close panel on route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Handle Escape key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  const handleCalculatorClick = (e: React.MouseEvent) => {
    setIsOpen(false)
    const isHome = pathname === "/" || pathname === "/in" || pathname === "/in/"
    if (isHome) {
      const calcElem = document.getElementById("dosage-calculator")
      if (calcElem) {
        e.preventDefault()
        calcElem.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const isHomeActive = pathname === "/" || pathname === "/in"
  const isStoreActive =
    pathname?.includes("/store") ||
    pathname?.includes("/categories") ||
    pathname?.includes("/products")
  const isAboutActive = pathname?.includes("/about")
  const isContactActive = pathname?.includes("/contact")
  const isCalculatorActive = pathname?.includes("/calculator")

  return (
    <>
      {/* Left Navigation Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        aria-label="Open Navigation Menu"
        className="p-2 rounded-lg text-gray-700 hover:text-emerald-800 hover:bg-gray-100 transition-colors cursor-pointer flex items-center gap-2 border border-gray-200"
        data-testid="left-nav-panel-toggle"
        suppressHydrationWarning
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span className="text-xs font-semibold hidden sm:inline">Menu</span>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Left Navigation Panel */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white text-gray-900 shadow-2xl transition-transform duration-300 ease-out flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Left Navigation Panel"
      >
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-xs z-10">
            <LocalizedClientLink
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-base font-bold tracking-tight text-emerald-950 hover:text-emerald-700 transition-colors"
            >
              <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-xs font-black shadow-xs">
                🌱
              </span>
              <span>
                BioTill <span className="text-emerald-600 font-semibold">Biotech</span>
              </span>
            </LocalizedClientLink>

            <button
              onClick={() => setIsOpen(false)}
              type="button"
              aria-label="Close Navigation"
              className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              suppressHydrationWarning
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5" aria-label="Main menu">
            {/* 1. Home */}
            <LocalizedClientLink
              href="/"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isHomeActive
                  ? "bg-emerald-50 text-emerald-900 font-bold border-l-4 border-emerald-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className="text-base">🏠</span>
              <span>Home</span>
              <span className="text-[11px] font-normal text-gray-400 ml-auto">ಮುಖಪುಟ</span>
            </LocalizedClientLink>

            {/* 2. All Products with Nested Subcategories */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/60 overflow-hidden">
              <div className="flex items-center justify-between p-1">
                <LocalizedClientLink
                  href="/store"
                  onClick={() => setIsOpen(false)}
                  className={`flex-1 flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                    isStoreActive && !pathname?.includes("/categories")
                      ? "text-emerald-800 bg-emerald-100/70"
                      : "text-gray-800 hover:text-emerald-700"
                  }`}
                >
                  <span className="text-base">📦</span>
                  <span>All Products</span>
                  <span className="text-[10px] bg-emerald-700 text-white font-bold px-1.5 py-0.5 rounded-md ml-1">
                    10 Items
                  </span>
                </LocalizedClientLink>

                <button
                  type="button"
                  onClick={() => setIsProductsExpanded(!isProductsExpanded)}
                  aria-expanded={isProductsExpanded}
                  aria-label="Toggle Subcategories"
                  className="p-2 text-gray-400 hover:text-emerald-700 rounded-lg hover:bg-gray-100 transition-colors"
                  suppressHydrationWarning
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isProductsExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Subcategories Container */}
              {isProductsExpanded && (
                <div className="px-2 pb-2 pt-1 border-t border-gray-200/50 space-y-1">
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center justify-between">
                    <span>Subcategories (ಉಪವರ್ಗಗಳು)</span>
                  </div>

                  {SUBCATEGORIES.map((sub) => {
                    const isSubActive = pathname?.includes(sub.href)

                    return (
                      <LocalizedClientLink
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-all ${
                          isSubActive
                            ? "bg-emerald-700 text-white font-bold shadow-xs"
                            : "text-gray-700 hover:bg-emerald-100/60 hover:text-emerald-950 font-medium"
                        }`}
                        suppressHydrationWarning
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-sm shrink-0">{sub.icon}</span>
                          <div className="truncate text-left">
                            <span className="block truncate font-semibold leading-tight">{sub.name}</span>
                            <span
                              className={`block text-[10px] truncate leading-tight ${
                                isSubActive ? "text-emerald-100" : "text-gray-400"
                              }`}
                            >
                              {sub.nameKn}
                            </span>
                          </div>
                        </div>

                        {sub.badge && (
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm shrink-0 ml-1 whitespace-nowrap ${
                              isSubActive
                                ? "bg-white/20 text-white"
                                : "bg-white text-emerald-900 border border-emerald-200/70"
                            }`}
                          >
                            {sub.badge}
                          </span>
                        )}
                      </LocalizedClientLink>
                    )
                  })}
                </div>
              )}
            </div>

            {/* 3. Dosage Calculator Link */}
            <LocalizedClientLink
              href="/calculator"
              onClick={handleCalculatorClick}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isCalculatorActive
                  ? "bg-emerald-50 text-emerald-900 font-bold border-l-4 border-emerald-600"
                  : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-900"
              }`}
              suppressHydrationWarning
            >
              <div className="flex items-center gap-3">
                <span className="text-base">🧮</span>
                <div>
                  <div className="font-bold leading-tight flex items-center gap-1.5">
                    <span>Dosage Calculator</span>
                    <span className="text-[9px] bg-amber-400 text-amber-950 font-black px-1.5 py-0.2 rounded uppercase">
                      New
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-500 font-normal">ಡೋಸೇಜ್ ಮತ್ತು ಎಕರೆ ಲೆಕ್ಕಾಚಾರ</div>
                </div>
              </div>
              <span className="text-xs text-emerald-700 font-bold">🌾 Acreage</span>
            </LocalizedClientLink>

            {/* 4. About Us */}
            <LocalizedClientLink
              href="/about"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isAboutActive
                  ? "bg-emerald-50 text-emerald-900 font-bold border-l-4 border-emerald-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className="text-base">🔬</span>
              <span>About Us</span>
              <span className="text-[11px] font-normal text-gray-400 ml-auto">ನಮ್ಮ ಬಗ್ಗೆ</span>
            </LocalizedClientLink>

            {/* 5. Contact Us */}
            <LocalizedClientLink
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isContactActive
                  ? "bg-emerald-50 text-emerald-900 font-bold border-l-4 border-emerald-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className="text-base">📞</span>
              <span>Contact Us</span>
              <span className="text-[11px] font-normal text-gray-400 ml-auto">ಸಂಪರ್ಕ</span>
            </LocalizedClientLink>

            {/* 6. Real Instance Live Test Runner */}
            <LocalizedClientLink
              href="/tests"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-slate-900 text-emerald-300 hover:bg-slate-800 transition-colors border border-emerald-800/60 shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">🧪</span>
                <div>
                  <div className="font-bold text-white text-xs leading-tight">Run Real User Tests</div>
                  <div className="text-[10px] text-emerald-400 font-mono">100% Coverage Suite</div>
                </div>
              </div>
              <span className="text-[9px] bg-emerald-700 text-white font-black px-1.5 py-0.5 rounded">
                E2E LIVE
              </span>
            </LocalizedClientLink>
          </nav>
        </div>

        {/* Footer info in panel */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-3">
          <div className="space-y-1 text-xs text-gray-500">
            <p className="font-semibold text-gray-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              Farmer Advisory Helpline
            </p>
            <a
              href="tel:+919480123456"
              className="inline-flex items-center gap-1 text-emerald-700 font-bold hover:underline"
            >
              📞 +91 94801 23456
            </a>
            <p className="text-[11px] text-gray-400">Direct Farm Delivery across Karnataka & India</p>
          </div>

          <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between text-xs font-semibold">
            {customer ? (
              <LocalizedClientLink
                href="/account"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-emerald-800"
              >
                My Account
              </LocalizedClientLink>
            ) : (
              <div className="flex items-center gap-2">
                <LocalizedClientLink
                  href="/account"
                  onClick={() => setIsOpen(false)}
                  className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-emerald-50 text-gray-800 hover:text-emerald-800 border border-gray-200 transition-colors"
                >
                  Sign In
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/account?mode=register"
                  onClick={() => setIsOpen(false)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-semibold transition-colors"
                >
                  Register
                </LocalizedClientLink>
              </div>
            )}
            <LocalizedClientLink
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 shadow-xs"
            >
              View Cart 🛒
            </LocalizedClientLink>
          </div>
        </div>
      </aside>
    </>
  )
}
