"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"

const TRUST_ITEMS = [
  {
    id: "delivery",
    icon: "🚚",
    tag: "Direct Farm Logistics",
    tagKn: "ನೇರ ವಿತರಣೆ",
    title: "Fast Delivery Across India",
    titleKn: "ತ್ವರಿತ ಕೃಷಿ ವಿತರಣೆ",
    description:
      "Direct dispatch to farm gates, taluk centers & rural pincodes with live tracking and secure packaging.",
    bgColor: "from-emerald-50 to-teal-50/50",
    borderColor: "border-emerald-200",
    accentColor: "text-emerald-800",
    badgeBg: "bg-emerald-100 text-emerald-900",
  },
  {
    id: "payments",
    icon: "💳",
    tag: "Zero-Surcharge UPI & COD",
    tagKn: "ಸುರಕ್ಷಿತ ಗೇಟ್‌ವೇ",
    title: "100% Safe Payments",
    titleKn: "ಸುರಕ್ಷಿತ ಪಾವತಿಗಳು",
    description:
      "Instant checkout via PhonePe, Paytm, Google Pay, BHIM UPI, Cards or Cash on Delivery (COD).",
    bgColor: "from-blue-50 to-indigo-50/50",
    borderColor: "border-blue-200",
    accentColor: "text-blue-800",
    badgeBg: "bg-blue-100 text-blue-900",
  },
  {
    id: "quality",
    icon: "🔬",
    tag: "CFU > 1×10⁸ Guaranteed",
    tagKn: "ಉನ್ನತ ತಳಿ ಸಾಮರ್ಥ್ಯ",
    title: "Certified High CFU Bio-Inputs",
    titleKn: "ಪ್ರಮಾಣೀಕೃತ ಜೈವಿಕ ಗುಣಮಟ್ಟ",
    description:
      "100% organic, residue-free biological strains tested for maximum viable colony count & zero chemicals.",
    bgColor: "from-purple-50 to-emerald-50/50",
    borderColor: "border-purple-200",
    accentColor: "text-purple-800",
    badgeBg: "bg-purple-100 text-purple-900",
  },
  {
    id: "advisory",
    icon: "📞",
    tag: "Free Farmer Support",
    tagKn: "ಉಚಿತ ತಜ್ಞ ಸಲಹೆ",
    title: "Agronomist Helpline & Guidance",
    titleKn: "ಉಚಿತ ಕೃಷಿ ತಜ್ಞರ ಮಾರ್ಗದರ್ಶನ",
    description:
      "Dedicated crop specialists for dosage calculation, disease diagnosis and application schedule advice.",
    bgColor: "from-amber-50 to-orange-50/50",
    borderColor: "border-amber-200",
    accentColor: "text-amber-800",
    badgeBg: "bg-amber-100 text-amber-900",
  },
]

export default function TrustFeatures() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TRUST_ITEMS.length)
  }, [])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + TRUST_ITEMS.length) % TRUST_ITEMS.length)
  }, [])

  // Auto-advance timer (4.5 seconds)
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      handleNext()
    }, 4500)
    return () => clearInterval(timer)
  }, [isPaused, handleNext])

  // Touch Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      handleNext()
    } else if (isRightSwipe) {
      handlePrev()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  const activeItem = TRUST_ITEMS[currentIndex]

  return (
    <section
      className="py-8 sm:py-12 bg-white border-b border-gray-100 font-sans select-none"
      aria-label="BioTill Farmer Guarantees & Features Slide"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="content-container">
        {/* Slider Container */}
        <div
          className="relative overflow-hidden rounded-3xl border border-emerald-100/90 bg-gradient-to-br from-emerald-50/60 via-slate-50 to-teal-50/40 p-6 sm:p-8 md:p-10 shadow-xs"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          data-testid="trust-features-slider"
        >
          {/* Header Controls Bar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-emerald-100/70">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                BioTill Direct Assurance / ರೈತ ಭರವಸೆಗಳು
              </span>
            </div>

            {/* Slide Index Counter & Controls */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-gray-500">
                <span className="text-emerald-800 font-black">0{currentIndex + 1}</span> / 0{TRUST_ITEMS.length}
              </span>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Slide"
                  className="w-8 h-8 rounded-full bg-white hover:bg-emerald-100/80 border border-emerald-200 text-gray-700 hover:text-emerald-900 flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-95"
                  data-testid="slider-prev-btn"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Slide"
                  className="w-8 h-8 rounded-full bg-white hover:bg-emerald-100/80 border border-emerald-200 text-gray-700 hover:text-emerald-900 flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-95"
                  data-testid="slider-next-btn"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Active Slide Display with Smooth Animation */}
          <div className="min-h-[140px] sm:min-h-[120px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-300">
            <div className="flex items-start gap-4 sm:gap-6 flex-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl sm:text-4xl flex-shrink-0 border border-emerald-100">
                {activeItem.icon}
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`text-[10px] sm:text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full ${activeItem.badgeBg}`}>
                    {activeItem.tag}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    • {activeItem.tagKn}
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <h3 className="font-bold text-gray-950 text-base sm:text-xl tracking-tight">
                    {activeItem.title}
                  </h3>
                  <span className="text-xs sm:text-sm font-bold text-emerald-800">
                    {activeItem.titleKn}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl pt-1">
                  {activeItem.description}
                </p>
              </div>
            </div>

            {/* Quick action / status chip */}
            <div className="hidden lg:flex flex-col items-end gap-1.5 flex-shrink-0 pl-4 border-l border-emerald-100/80">
              <span className="text-[11px] text-gray-400 font-medium">BioTill Guarantee</span>
              <span className="text-xs font-bold text-emerald-800 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
                ✓ 100% Certified Direct
              </span>
            </div>
          </div>

          {/* Interactive Slide Thumbnail Tabs / Dots */}
          <div className="mt-8 pt-5 border-t border-emerald-100/60 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {TRUST_ITEMS.map((item, idx) => {
              const isActive = idx === currentIndex
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                    isActive
                      ? "bg-white border-2 border-emerald-600 shadow-sm text-emerald-950 font-bold scale-[1.02]"
                      : "bg-white/60 hover:bg-white border border-gray-200/70 text-gray-600 hover:text-gray-900"
                  }`}
                  data-testid={`slider-tab-${idx}`}
                >
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <div className="truncate flex-1 min-w-0">
                    <p className="text-[11px] sm:text-xs font-bold truncate leading-tight">
                      {item.title}
                    </p>
                    <p className={`text-[10px] truncate leading-tight ${isActive ? "text-emerald-700 font-semibold" : "text-gray-400"}`}>
                      {item.titleKn}
                    </p>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0 ml-auto"></span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Progress Indicator Bar */}
          <div className="w-full bg-emerald-100/60 h-1 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-500 rounded-full"
              style={{ width: `${((currentIndex + 1) / TRUST_ITEMS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
