import LocalizedClientLink from "@modules/common/components/localized-client-link"
import LeafIcon from "@modules/common/icons/leaf"
import PhonePeIcon from "@modules/common/icons/phonepe"
import PaytmIcon from "@modules/common/icons/paytm"
import UpiIcon from "@modules/common/icons/upi"

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-950 to-emerald-900 text-white py-12 lg:py-16 border-b border-emerald-800">
      {/* Background organic wave overlay pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="agri-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 10 C 20 20, 20 40, 30 50 C 40 40, 40 20, 30 10 Z" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#agri-pattern)" />
        </svg>
      </div>

      <div className="content-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Bio Products Headline & Showcase */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/60 text-emerald-200 text-xs font-semibold shadow-inner">
              <LeafIcon size={16} className="text-emerald-400" />
              <span>100% ಶುದ್ಧ ಜೈವಿಕ ಕೃಷಿ ಉತ್ಪನ್ನಗಳ ನೇರ ಮಾರಾಟ • Direct to Farmer</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              ಉತ್ತಮ ಇಳುವರಿಗೆ <br />
              <span className="text-emerald-400 underline decoration-amber-400 decoration-wavy decoration-2">
                ಜೈವಿಕ ಕೃಷಿ ಉತ್ಪನ್ನಗಳು
              </span>{" "}
              (Bio-Agri Inputs).
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl font-normal leading-relaxed">
              ಟ್ರೈಕೋಡರ್ಮಾ, ಸುಡೋಮೊನಾಸ್, ಮೆಟಾರೈಸಿಯಂ, ವ್ಯಾಮ್, ಪೆಸಿಲೋಮೈಸಿಸ್, ಕಾಂಪೊಸ್ಟ್ ಕಲ್ಚರ್ ಮತ್ತು ಬಯೋ NPK ಕನ್ಸಾರ್ಸಿಯಂ — ನೇರವಾಗಿ ರೈತರಿಗೆ ತಲುಪಿಸಲಾಗುತ್ತದೆ.
            </p>

            {/* Clear Pricing Summary Badges */}
            <div className="flex flex-wrap gap-3 pt-1">
              <div className="flex items-center gap-2 bg-emerald-800/90 border border-amber-400/50 px-3.5 py-2 rounded-xl">
                <span className="text-lg">📦</span>
                <div>
                  <p className="text-[11px] text-emerald-200 uppercase font-bold">ಪೌಡರ್ ಉತ್ಪನ್ನಗಳು (1 ಕೆಜಿ)</p>
                  <p className="text-base font-black text-amber-300">₹150/- ಪ್ರತಿ ಪ್ಯಾಕ್</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-emerald-800/90 border border-emerald-500/50 px-3.5 py-2 rounded-xl">
                <span className="text-lg">🧪</span>
                <div>
                  <p className="text-[11px] text-emerald-200 uppercase font-bold">ಲಿಕ್ವಿಡ್ ಉತ್ಪನ್ನಗಳು (1 ಲೀಟರ್)</p>
                  <p className="text-base font-black text-emerald-300">₹350/- ಪ್ರತಿ ಬಾಟಲ್</p>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 pt-2 w-full sm:w-auto">
              <LocalizedClientLink
                href="/store"
                className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 shadow-lg shadow-amber-900/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>ಎಲ್ಲಾ 10 ಉತ್ಪನ್ನಗಳನ್ನು ನೋಡಿ (Shop All 10 Items)</span>
                <span>→</span>
              </LocalizedClientLink>

              <LocalizedClientLink
                href="/collections/powder-products"
                className="px-5 py-3 rounded-xl font-semibold text-sm bg-emerald-800/80 hover:bg-emerald-700/80 border border-emerald-600/70 text-white transition-all flex items-center justify-center"
              >
                ಪೌಡರ್ @ ₹150
              </LocalizedClientLink>

              <LocalizedClientLink
                href="/collections/liquid-products"
                className="px-5 py-3 rounded-xl font-semibold text-sm bg-emerald-800/80 hover:bg-emerald-700/80 border border-emerald-600/70 text-white transition-all flex items-center justify-center"
              >
                ಲಿಕ್ವಿಡ್ @ ₹350
              </LocalizedClientLink>
            </div>
          </div>

          {/* Right Column: Quick Spotlight on Best-Selling Trichoderma & Bio NPK */}
          <div className="lg:col-span-5 space-y-4">
            {/* Spotlight 1: Powder */}
            <div className="bg-white rounded-2xl p-5 text-gray-900 shadow-xl border border-emerald-100 relative">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                    🛡️
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">ಟ್ರೈಕೋಡರ್ಮಾ ಪೌಡರ್ (Trichoderma)</h3>
                    <p className="text-xs text-emerald-700 font-medium">ಬೇರು ಕೊಳೆತ ಮತ್ತು ಸೊರಗು ರೋಗ ತಡೆಗೆ • 1 ಕೆಜಿ</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xl font-black text-emerald-900">₹150</span>
                  <p className="text-[10px] text-gray-500">1 ಕೆಜಿ ಪ್ಯಾಕ್</p>
                </div>
              </div>
              <LocalizedClientLink
                href="/products/trichoderma-powder"
                className="mt-3 w-full block text-center py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg text-xs transition-colors shadow-sm"
              >
                ಖರೀದಿಸಿ / Order Now →
              </LocalizedClientLink>
            </div>

            {/* Spotlight 2: Liquid */}
            <div className="bg-white rounded-2xl p-5 text-gray-900 shadow-xl border border-emerald-100 relative">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                    🧪
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">ಬಯೋ ಎನ್ಪಿಕೆ ಕನ್ಸಾರ್ಸಿಯಂ (Bio NPK)</h3>
                    <p className="text-xs text-emerald-700 font-medium">ಸಾರಜನಕ, ರಂಜಕ, ಪೊಟ್ಯಾಶ್ ದ್ರವ ಗೊಬ್ಬರ • 1 ಲೀಟರ್</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xl font-black text-emerald-900">₹350</span>
                  <p className="text-[10px] text-gray-500">1 ಲೀಟರ್ ಬಾಟಲ್</p>
                </div>
              </div>
              <LocalizedClientLink
                href="/products/bio-npk-consortium-liquid"
                className="mt-3 w-full block text-center py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg text-xs transition-colors shadow-sm"
              >
                ಖರೀದಿಸಿ / Order Now →
              </LocalizedClientLink>
            </div>

            {/* Payment Trust Bar */}
            <div className="flex items-center justify-between gap-2 p-2.5 bg-emerald-900/60 rounded-xl border border-emerald-700/60 text-xs">
              <span className="text-emerald-200 text-[11px] font-semibold">ಸುರಕ್ಷಿತ ಪಾವತಿ:</span>
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
    </div>
  )
}

export default Hero
