import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import LeafIcon from "@modules/common/icons/leaf"

export const metadata: Metadata = {
  title: "About Us - BioTill Biotech Solutions",
  description:
    "BioTill Biotech Solutions delivers 100% certified bio-fertilizers, biopesticides, and beneficial microbes directly to farmers across India.",
}

export default function AboutPage() {
  return (
    <div className="w-full font-sans bg-white">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white py-14 lg:py-20 border-b border-emerald-800">
        <div className="content-container text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-800/80 border border-emerald-600/70 text-emerald-200 text-xs font-bold rounded-full">
            <LeafIcon size={16} />
            <span>BioTill Biotech Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Pioneering Sustainable Agriculture & Bio-Innovations
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Direct farmer delivery of research-backed bio-fertilizers, biopesticides, and crop stimulants across Karnataka and all states in India.
          </p>
          <p className="text-amber-300 font-bold text-xs sm:text-sm">
            ರೈತರ ಹಿತದೃಷ್ಟಿಯಿಂದ ರಾಸಾಯನಿಕ ಮುಕ್ತ, ಫಲವತ್ತಾದ ಮಣ್ಣು ಮತ್ತು ಸಮೃದ್ಧ ಬೆಳೆ.
          </p>
        </div>
      </section>

      {/* Core Mission & Story */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="content-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <span className="text-xs font-black text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
                Our Mission & Vision
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Empowering Farmers with Pure Biological Science
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                BioTill Biotech Solutions was founded with a singular objective: to provide farmers with direct access to high-grade agricultural biotechnology. Excessive chemical farming has degraded soil biology, depleted micronutrients, and increased pest resistance.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Our bio-formulations harness high-potency beneficial microbes (Trichoderma, Pseudomonas, VAM, Beauveria, Metarhizium, Verticillium, and Azotobacter) that naturally protect root systems, solubilize tied-up soil phosphorus and potash, and trigger systemic acquired resistance in crops.
              </p>

              <div className="pt-2">
                <LocalizedClientLink
                  href="/store"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all hover:scale-105"
                >
                  <span>View Certified Bio Catalog</span>
                  <span>→</span>
                </LocalizedClientLink>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <span className="text-3xl font-black text-emerald-900 block">15,000+</span>
                <span className="text-xs font-bold text-emerald-700">Farmers Connected</span>
                <p className="text-[11px] text-gray-600">Across Karnataka, Maharashtra, AP, and TN.</p>
              </div>

              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-2">
                <span className="text-3xl font-black text-amber-950 block">100%</span>
                <span className="text-xs font-bold text-amber-800">CIB & FCO Certified</span>
                <p className="text-[11px] text-gray-600">Pure microbial spores with verified CFU.</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <span className="text-3xl font-black text-emerald-900 block">₹150 / ₹350</span>
                <span className="text-xs font-bold text-gray-700">Transparent Pricing</span>
                <p className="text-[11px] text-gray-600">Powder 1Kg @ ₹150 | Liquid 1L @ ₹350</p>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-900 text-white text-center space-y-2">
                <span className="text-3xl font-black text-amber-300 block">25-30%</span>
                <span className="text-xs font-bold text-emerald-200">Yield Boost</span>
                <p className="text-[11px] text-emerald-100">Proven root vigor and pathogen defense.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-14 bg-slate-50 border-b border-gray-200">
        <div className="content-container max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-gray-900">Why Farmers Trust BioTill Biotech</h3>
            <p className="text-xs sm:text-sm text-gray-600">Strict laboratory quality control and direct factory pricing without middlemen markups.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-2">
              <span className="text-2xl">🧫</span>
              <h4 className="font-bold text-gray-900 text-sm">High Spore CFU Guarantee</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Every batch contains &gt; 1×10⁸ CFU/gm or CFU/ml, ensuring active colonisation in soil and plant roots.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-2">
              <span className="text-2xl">💧</span>
              <h4 className="font-bold text-gray-900 text-sm">Drip-Friendly Liquids</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Specially formulated non-clogging liquid suspension suitable for venturi drip and fertigation.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-2">
              <span className="text-2xl">🚚</span>
              <h4 className="font-bold text-gray-900 text-sm">Direct Farm Express</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Shipped straight to your village or farm location. Free delivery on all orders of ₹999 or more.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
