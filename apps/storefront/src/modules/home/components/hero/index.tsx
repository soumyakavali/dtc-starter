import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PhonePeIcon from "@modules/common/icons/phonepe"
import PaytmIcon from "@modules/common/icons/paytm"
import UpiIcon from "@modules/common/icons/upi"

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-950 to-emerald-900 text-white py-12 lg:py-16 border-b border-emerald-800">
      {/* Background organic light pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="agri-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 5 C 10 15, 10 25, 20 35 C 30 25, 30 15, 20 5 Z" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#agri-pattern)" />
        </svg>
      </div>

      <div className="content-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: BioTill Biotech Headline & Showcase */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/90 border border-emerald-600/70 text-emerald-200 text-xs font-bold shadow-inner">
              <span className="text-emerald-400 text-sm">🌿</span>
              <span>100% Certified Bio-Agri Inputs • Direct Factory-to-Farm</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Science & Bio-Innovation for <br />
              <span className="text-emerald-300 underline decoration-amber-400 decoration-wavy decoration-2">
                High-Yield Sustainable Farming
              </span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl font-normal leading-relaxed">
              ಉತ್ತಮ ಇಳುವರಿ ಮತ್ತು ರೋಗಮುಕ್ತ ಬೆಳೆಗಾಗಿ ಸಂಶೋಧನಾ ಆಧಾರಿತ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ, ಕೀಟನಾಶಕ ಹಾಗೂ ಸಾವಯವ ಗೊಬ್ಬರಗಳು. Direct delivery to farmers across Karnataka & India.
            </p>

            {/* Clear Transparent Pricing Pills */}
            <div className="flex flex-wrap gap-3 pt-1">
              <div className="flex items-center gap-2.5 bg-emerald-800/90 border border-amber-400/60 px-3.5 py-2 rounded-2xl shadow-sm">
                <span className="text-xl">📦</span>
                <div>
                  <p className="text-[10px] text-emerald-200 uppercase font-extrabold">ಪೌಡರ್ ಉತ್ಪನ್ನಗಳು (1 Kg Pack)</p>
                  <p className="text-base font-black text-amber-300">₹150/- <span className="text-xs text-emerald-200 font-normal">Fixed Price</span></p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-emerald-800/90 border border-emerald-500/60 px-3.5 py-2 rounded-2xl shadow-sm">
                <span className="text-xl">🧪</span>
                <div>
                  <p className="text-[10px] text-emerald-200 uppercase font-extrabold">ಲಿಕ್ವಿಡ್ ಕನ್ಸಾರ್ಸಿಯಂ (1 L Bottle)</p>
                  <p className="text-base font-black text-emerald-300">₹350/- <span className="text-xs text-emerald-200 font-normal">Drip Concentrate</span></p>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 pt-2 w-full sm:w-auto">
              <LocalizedClientLink
                href="/store"
                className="px-6 py-3.5 rounded-xl font-black text-xs sm:text-sm bg-amber-400 hover:bg-amber-300 text-amber-950 shadow-lg shadow-amber-950/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Shop All 10 Bio-Products</span>
                <span>→</span>
              </LocalizedClientLink>

              <a
                href="#dosage-calculator"
                className="px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-800/80 hover:bg-emerald-700/80 border border-emerald-600/80 text-white transition-all flex items-center justify-center gap-1.5"
              >
                <span>🔬 Crop Dosage Calculator</span>
              </a>

              <a
                href="#products-showcase"
                className="px-4 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-900/60 hover:bg-emerald-800/60 border border-emerald-700 text-emerald-200 transition-all flex items-center justify-center"
              >
                🔥 Deals of the Day
              </a>
            </div>
          </div>

          {/* Right Column: Clean Spotlight Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Spotlight 1: Powder Bestseller */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 text-gray-900 shadow-xl border border-emerald-100 relative">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl">
                    🛡️
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="bg-emerald-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        POWDER • ₹150
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold">100% Bio</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mt-0.5">
                      Trichoderma Viride Bio-Fungicide
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      ಟ್ರೈಕೋಡರ್ಮಾ • ಬೇರು ಕೊಳೆತ ಮತ್ತು ಸೊರಗು ರೋಗ ತಡೆಗೆ
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-lg font-black text-emerald-950">₹150</span>
                  <p className="text-[10px] text-gray-400">1 Kg Pack</p>
                </div>
              </div>
              <LocalizedClientLink
                href="/products/trichoderma-powder"
                className="mt-3 w-full block text-center py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition shadow-xs"
              >
                View & Buy (ಖರೀದಿಸಿ) →
              </LocalizedClientLink>
            </div>

            {/* Spotlight 2: Liquid Bestseller */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 text-gray-900 shadow-xl border border-emerald-100 relative">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xl">
                    🧪
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="bg-amber-500 text-amber-950 text-[9px] font-bold px-1.5 py-0.5 rounded">
                        LIQUID • ₹350
                      </span>
                      <span className="text-[10px] text-amber-800 font-bold">Drip Grade</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mt-0.5">
                      Bio NPK Liquid Consortium (N+P+K)
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      ಬಯೋ ಎನ್ಪಿಕೆ • ಸಂಪೂರ್ಣ ದ್ರವ ಗೊಬ್ಬರ (1 ಲೀಟರ್)
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-lg font-black text-emerald-950">₹350</span>
                  <p className="text-[10px] text-gray-400">1 L Bottle</p>
                </div>
              </div>
              <LocalizedClientLink
                href="/products/bio-npk-consortium-liquid"
                className="mt-3 w-full block text-center py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition shadow-xs"
              >
                View & Buy (ಖರೀದಿಸಿ) →
              </LocalizedClientLink>
            </div>

            {/* Payment Trust Bar */}
            <div className="flex items-center justify-between gap-2 p-2.5 bg-emerald-900/70 rounded-xl border border-emerald-700/60 text-xs">
              <span className="text-emerald-200 text-[11px] font-semibold">Safe & Instant Payments:</span>
              <div className="flex items-center gap-2">
                <PhonePeIcon size={20} />
                <PaytmIcon size={20} />
                <UpiIcon size={20} />
                <span className="bg-emerald-800 text-white font-bold px-1.5 py-0.5 rounded text-[10px]">COD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
