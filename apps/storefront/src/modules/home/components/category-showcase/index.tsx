import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const CATEGORIES = [
  {
    title: "Bio Fertilizers",
    titleKn: "ಜೈವಿಕ ಗೊಬ್ಬರಗಳು",
    desc: "Bio NPK, VAM & Nitrogen Fixers",
    icon: "🌱",
    href: "/collections/liquid-products",
    badge: "High Yield",
    color: "from-emerald-500/10 to-emerald-600/20 border-emerald-200 text-emerald-900",
  },
  {
    title: "Bio Pesticides",
    titleKn: "ಜೈವಿಕ ಕೀಟನಾಶಕಗಳು",
    desc: "Trichoderma, Pseudomonas & Metarhizium",
    icon: "🛡️",
    href: "/collections/powder-products",
    badge: "100% Bio",
    color: "from-teal-500/10 to-teal-600/20 border-teal-200 text-teal-900",
  },
  {
    title: "Bio Stimulants & VAM",
    titleKn: "ಬೇರು ಮತ್ತು ಬೆಳವಣಿಗೆ ಪ್ರವರ್ಧಕ",
    desc: "Endo-Mycorrhizae & Root Enhancers",
    icon: "🌾",
    href: "/products/vam-powder",
    badge: "Root Boost",
    color: "from-amber-500/10 to-amber-600/20 border-amber-200 text-amber-900",
  },
  {
    title: "PGR & Micronutrients",
    titleKn: "ದ್ರವ ಕನ್ಸಾರ್ಸಿಯಂ & ಕಾಂಪೋಸ್ಟ್",
    desc: "Liquid NPK & Compost Bio-Decomposer",
    icon: "🧪",
    href: "/products/bio-npk-consortium-liquid",
    badge: "Lab Pure",
    color: "from-blue-500/10 to-blue-600/20 border-blue-200 text-blue-900",
  },
  {
    title: "Powder Formulations",
    titleKn: "ಪೌಡರ್ ಉತ್ಪನ್ನಗಳು (1 ಕೆಜಿ)",
    desc: "All 6 Certified Powder Bio-Inputs",
    icon: "📦",
    href: "/collections/powder-products",
    badge: "₹150 / 1 Kg",
    color: "from-emerald-600/15 to-emerald-700/25 border-emerald-300 text-emerald-950 font-bold",
  },
  {
    title: "Liquid Formulations",
    titleKn: "ಲಿಕ್ವಿಡ್ ಉತ್ಪನ್ನಗಳು (1 ಲೀಟರ್)",
    desc: "Drip & Foliar Bio-Concentrates",
    icon: "🛢️",
    href: "/collections/liquid-products",
    badge: "₹350 / 1 L",
    color: "from-amber-600/15 to-amber-700/25 border-amber-300 text-amber-950 font-bold",
  },
]

export default function CategoryShowcase() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="content-container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
            Explore Categories / ಉತ್ಪನ್ನ ವಿಭಾಗಗಳು
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Shop by Agricultural Bio-Category
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Scientifically formulated microbial bio-inputs for soil health, disease prevention, and superior crop harvest.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat, idx) => (
            <LocalizedClientLink
              key={idx}
              href={cat.href}
              className={`group flex flex-col items-center text-center p-5 rounded-2xl bg-gradient-to-b ${cat.color} border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden`}
            >
              <span className="absolute top-2.5 right-2.5 text-[10px] font-black px-2 py-0.5 rounded-full bg-white/90 text-emerald-900 shadow-xs">
                {cat.badge}
              </span>
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="font-bold text-sm text-gray-900 group-hover:text-emerald-700 transition-colors">
                {cat.title}
              </h3>
              <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                {cat.titleKn}
              </p>
              <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">
                {cat.desc}
              </p>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </section>
  )
}
