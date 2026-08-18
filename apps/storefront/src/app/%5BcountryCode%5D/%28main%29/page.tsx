import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import LeafIcon from "@modules/common/icons/leaf"
import PhonePeIcon from "@modules/common/icons/phonepe"
import PaytmIcon from "@modules/common/icons/paytm"
import UpiIcon from "@modules/common/icons/upi"

export const metadata: Metadata = {
  title: "KrishiVeda™ Direct | High-Yield Seeds, Bio-Fertilizers & Agri Store",
  description:
    "India's leading agri e-commerce store for certified seeds, organic bio-fertilizers, bio-pesticides & farm equipment with PhonePe, Paytm, and UPI payments.",
}

const MANDI_RATES = [
  { crop: "Pusa Basmati Paddy", rate: "₹3,850 / Qtl", change: "+₹65", trend: "up" },
  { crop: "Sharbati Wheat", rate: "₹2,420 / Qtl", change: "+₹30", trend: "up" },
  { crop: "Bt Cotton Medium", rate: "₹7,150 / Qtl", change: "+₹110", trend: "up" },
  { crop: "Yellow Mustard", rate: "₹5,680 / Qtl", change: "+₹45", trend: "up" },
  { crop: "Hybrid Maize", rate: "₹2,180 / Qtl", change: "+₹20", trend: "up" },
  { crop: "Red Gram (Tur)", rate: "₹9,200 / Qtl", change: "+₹150", trend: "up" },
]

const CATEGORY_HIGHLIGHTS = [
  {
    title: "Certified Seeds",
    handle: "seeds",
    emoji: "🌾",
    desc: "ICAR & Lab Certified, 98% Germination guarantee for Paddy, Wheat & Vegetables.",
    tag: "High Yield",
    color: "from-emerald-700 to-emerald-900",
  },
  {
    title: "Organic Bio-Fertilizers",
    handle: "bio-fertilizers",
    emoji: "🌱",
    desc: "Pure Vermicompost, Seaweed Bio-stimulants & Neem Cake for fertile soil.",
    tag: "100% Organic",
    color: "from-teal-700 to-emerald-800",
  },
  {
    title: "Eco Crop Protection",
    handle: "crop-protection",
    emoji: "🛡️",
    desc: "Neem Oil 10,000 PPM, Trichoderma & Bio-fungicides for residue-free crops.",
    tag: "Non-Toxic",
    color: "from-green-800 to-emerald-950",
  },
  {
    title: "Farm Sprayers & Tools",
    handle: "farm-equipment",
    emoji: "🚜",
    desc: "16L Dual-Motor Battery Sprayers, Drip Irrigation Kits & Digital Soil Testers.",
    tag: "Heavy Duty",
    color: "from-amber-800 to-amber-950",
  },
]

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)
  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <div className="bg-gray-50/50">
      {/* Live Mandi Rates Ticker */}
      <div className="bg-emerald-950 text-emerald-100 py-2.5 px-4 border-b border-emerald-800 overflow-hidden">
        <div className="content-container flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 flex-shrink-0 font-bold text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            LIVE MANDI MSP RATES:
          </div>
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-0.5">
            {MANDI_RATES.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 flex-shrink-0">
                <span className="font-medium text-white">{item.crop}:</span>
                <span className="font-bold text-emerald-300">{item.rate}</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-900/60 px-1.5 py-0.2 rounded">
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Hero />

      {/* Categories Visual Cards Section */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="content-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">
                <LeafIcon size={16} />
                <span>Direct Farmer Supply</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
                Shop Agricultural Categories
              </h2>
            </div>
            <LocalizedClientLink
              href="/store"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 mt-2 md:mt-0"
            >
              <span>View All 150+ Products</span>
              <span>→</span>
            </LocalizedClientLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORY_HIGHLIGHTS.map((cat, idx) => (
              <LocalizedClientLink
                key={idx}
                href={`/collections/${cat.handle}`}
                className="group relative rounded-2xl p-6 bg-gradient-to-br transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-white overflow-hidden"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${
                    idx === 0
                      ? "#064e3b, #022c22"
                      : idx === 1
                      ? "#0f766e, #134e4a"
                      : idx === 2
                      ? "#166534, #14532d"
                      : "#78350f, #451a03"
                  })`,
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-3xl p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
                    {cat.emoji}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 text-white">
                    {cat.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  {cat.desc}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-300 group-hover:translate-x-1 transition-transform">
                  <span>Browse Products</span>
                  <span>→</span>
                </div>
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products from Backend Collections */}
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>

      {/* Interactive Krishi Advisory & Soil Health Assistant Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white border-t border-b border-emerald-800">
        <div className="content-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-extrabold">
                ⭐ Krishi Doctor Advisory
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Get Scientific Crop & Fertilizer Recommendations for Your Farm.
              </h2>
              <p className="text-emerald-100 text-sm leading-relaxed">
                Connect with our team of ICAR agronomists for customized soil health plans, organic pest control schedules, and high-yield seed variety selection suited for your soil and climate.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-xs border border-white/10">
                  <p className="font-bold text-amber-400 text-sm">Free Soil Testing Advice</p>
                  <p className="text-xs text-emerald-200 mt-1">Get custom NPK balancing guidance</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-xs border border-white/10">
                  <p className="font-bold text-amber-400 text-sm">Govt Subsidy Support</p>
                  <p className="text-xs text-emerald-200 mt-1">Direct invoice generation for DBT</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white text-gray-900 p-6 sm:p-8 rounded-2xl shadow-2xl border border-emerald-100 space-y-4">
                <h3 className="font-bold text-lg text-emerald-950">
                  🌾 Quick Crop Dosage Calculator
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Select Your Target Crop:
                  </label>
                  <select className="w-full text-xs p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-emerald-700">
                    <option>Paddy / Rice (Pusa / Sona Masuri)</option>
                    <option>Wheat (HD-2967 / Sharbati)</option>
                    <option>Cotton (Bt Hybrid)</option>
                    <option>Vegetables (Tomato / Chilli / Onion)</option>
                    <option>Sugarcane (Co-0238)</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Farm Area:
                    </label>
                    <input
                      type="text"
                      defaultValue="2 Acres"
                      className="w-full text-xs p-2.5 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Soil Type:
                    </label>
                    <select className="w-full text-xs p-2.5 border border-gray-300 rounded-lg bg-gray-50">
                      <option>Alluvial Loam</option>
                      <option>Black Cotton Soil</option>
                      <option>Red Soil</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-900 space-y-1">
                  <p className="font-bold">Recommended Combination:</p>
                  <p>• 25 Kg Enriched Vermicompost (Basal)</p>
                  <p>• 1L Cold Pressed Neem Oil (Pre-Flowering)</p>
                </div>

                <LocalizedClientLink
                  href="/store"
                  className="w-full block text-center py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs transition-colors"
                >
                  Add Recommended Agri Kit to Cart
                </LocalizedClientLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Security & Instant UPI Section */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="content-container">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Instant Zero-Surcharge Payments
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-emerald-950">
                Fast Checkout with PhonePe, Paytm, UPI & Kisan Credit Cards
              </h3>
              <p className="text-xs text-gray-600 max-w-xl">
                Pay instantly via UPI QR code, direct phone notification, or opt for Cash on Delivery after inspecting your seed and fertilizer bags at your farm.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-emerald-200 shadow-sm flex-shrink-0">
              <div className="flex items-center gap-3">
                <PhonePeIcon size={32} />
                <PaytmIcon size={32} />
                <UpiIcon size={32} />
              </div>
              <span className="text-xs font-bold text-emerald-900 pl-2 border-l border-gray-200">
                100% RBI & NPCI Secured
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
