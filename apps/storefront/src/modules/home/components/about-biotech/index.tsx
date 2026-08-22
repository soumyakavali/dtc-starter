import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function AboutBiotech() {
  return (
    <section id="about-us" className="py-16 bg-gradient-to-b from-slate-50 to-white border-b border-gray-200">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Story & Mission */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-black rounded-full uppercase tracking-wider">
              <span>🌱</span>
              <span>About BioTill Biotech Solutions</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Transforming Agriculture Through Science, Sustainability & Bio-Innovation
            </h2>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              We are committed to delivering research-driven, eco-friendly biotechnology products directly to farmers. By harnessing beneficial fungi, bacteria, and mycorrhizae, our bio-formulations restore soil health, combat deadly plant pathogens, and enhance crop vigor without leaving toxic chemical residues.
            </p>

            <p className="text-xs sm:text-sm text-emerald-900 font-medium bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200 leading-relaxed">
              ನಮ್ಮ ಗುರಿ: ರಾಸಾಯನಿಕ ಮುಕ್ತ ಕೃಷಿ, ಫಲವತ್ತಾದ ಮಣ್ಣು ಮತ್ತು ರೈತರ ಆದಾಯ ಹೆಚ್ಚಳ. ಪ್ರತಿಯೊಂದು ಉತ್ಪನ್ನವೂ ಉನ್ನತ CFU ಕೌಂಟ್ ಹಾಗೂ ಶುದ್ಧತೆಯ ಪರೀಕ್ಷೆಗೆ ಒಳಪಟ್ಟಿದೆ.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs text-center">
                <span className="text-2xl sm:text-3xl font-black text-emerald-800 block">
                  15,000+
                </span>
                <span className="text-xs text-gray-500 font-bold">
                  Farmers Empowered
                </span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs text-center">
                <span className="text-2xl sm:text-3xl font-black text-emerald-800 block">
                  100%
                </span>
                <span className="text-xs text-gray-500 font-bold">
                  Chemical-Free Organic
                </span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs text-center col-span-2 sm:col-span-1">
                <span className="text-2xl sm:text-3xl font-black text-emerald-800 block">
                  25-30%
                </span>
                <span className="text-xs text-gray-500 font-bold">
                  Avg. Yield Increase
                </span>
              </div>
            </div>

            <div className="pt-2">
              <LocalizedClientLink
                href="/store"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-md transition-all hover:scale-105"
              >
                <span>Explore Certified Bio Catalog</span>
                <span>→</span>
              </LocalizedClientLink>
            </div>
          </div>

          {/* Right Column: Research Highlights Card */}
          <div className="lg:col-span-5 bg-emerald-900 text-white p-7 rounded-3xl shadow-xl border border-emerald-700 space-y-5">
            <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
              <span>🔬</span>
              <span>Our Biotech Research Highlights</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 p-3.5 bg-emerald-800/80 rounded-2xl border border-emerald-700">
                <span className="text-xl flex-shrink-0">🧫</span>
                <div>
                  <h4 className="font-bold text-white text-sm">High Spore Viability & CFU</h4>
                  <p className="text-emerald-200/90 mt-0.5 leading-relaxed">
                    Guaranteed CFU &gt; 1×10⁸ per gm/ml for maximum biological efficacy in field soils.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-emerald-800/80 rounded-2xl border border-emerald-700">
                <span className="text-xl flex-shrink-0">💧</span>
                <div>
                  <h4 className="font-bold text-white text-sm">Non-Clogging Liquid Technology</h4>
                  <p className="text-emerald-200/90 mt-0.5 leading-relaxed">
                    Suspension-stable liquids specifically engineered for seamless drip irrigation & fertigation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-emerald-800/80 rounded-2xl border border-emerald-700">
                <span className="text-xl flex-shrink-0">🛡️</span>
                <div>
                  <h4 className="font-bold text-white text-sm">Multi-Target Defense</h4>
                  <p className="text-emerald-200/90 mt-0.5 leading-relaxed">
                    Synergistic microbial consortia protecting against root rot, wilt, blight, and white grubs.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-950/80 rounded-xl text-[11px] text-emerald-300 text-center font-medium border border-emerald-800">
              ✓ Compliant with Central Insecticides Board (CIB) & FCO standards
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
