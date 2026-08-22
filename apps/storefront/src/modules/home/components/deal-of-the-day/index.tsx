"use client"

import React, { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { addToCart } from "@lib/data/cart"
import { useRouter } from "next/navigation"

type ProductItem = {
  id: string
  title: string
  titleKn: string
  subtitle: string
  category: "fertilizer" | "pesticide" | "stimulant" | "decomposer"
  form: "powder" | "liquid"
  price: number
  originalPrice: number
  packSize: string
  thumbnail: string
  handle: string
  crops: string
  isDeal?: boolean
  rating: number
  reviewsCount: number
}

const PRODUCTS_CATALOG: ProductItem[] = [
  {
    id: "prod_trichoderma_powder",
    title: "Trichoderma Viride Bio-Fungicide Powder",
    titleKn: "ಟ್ರೈಕೋಡರ್ಮಾ ಪೌಡರ್ (ಶಿಲೀಂಧ್ರನಾಶಕ)",
    subtitle: "Root rot, collar rot, damping off & wilt disease prevention",
    category: "pesticide",
    form: "powder",
    price: 150,
    originalPrice: 180,
    packSize: "1 Kg Pack",
    thumbnail: "https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?w=800&auto=format&fit=crop&q=80",
    handle: "trichoderma-powder",
    crops: "Arecanut, Pepper, Ginger, Tomato, Chilli, Cotton",
    isDeal: true,
    rating: 4.9,
    reviewsCount: 142,
  },
  {
    id: "prod_bio_npk_liquid",
    title: "Bio NPK Liquid Consortium (Azotobacter + PSB + KMB)",
    titleKn: "ಬಯೋ ಎನ್ಪಿಕೆ ಕನ್ಸಾರ್ಸಿಯಂ ಲಿಕ್ವಿಡ್",
    subtitle: "Complete organic liquid fertilizer providing Nitrogen, Phosphorus & Potash",
    category: "fertilizer",
    form: "liquid",
    price: 350,
    originalPrice: 450,
    packSize: "1 Litre Bottle",
    thumbnail: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80",
    handle: "bio-npk-consortium-liquid",
    crops: "Sugarcane, Paddy, Banana, Vegetables, Cotton, Fruits",
    isDeal: true,
    rating: 5.0,
    reviewsCount: 188,
  },
  {
    id: "prod_pseudomonas_powder",
    title: "Pseudomonas Fluorescens Bio-Bactericide Powder",
    titleKn: "ಸುಡೋಮೊನಾಸ್ ಪೌಡರ್ (ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕ)",
    subtitle: "Bacterial blight, leaf spot & blast disease protection with PGPR action",
    category: "pesticide",
    form: "powder",
    price: 150,
    originalPrice: 180,
    packSize: "1 Kg Pack",
    thumbnail: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&auto=format&fit=crop&q=80",
    handle: "pseudomonas-powder",
    crops: "Paddy, Pomegranate, Arecanut, Vegetables, Mango",
    rating: 4.8,
    reviewsCount: 96,
  },
  {
    id: "prod_trichoderma_liquid",
    title: "Trichoderma Harzianum Liquid Concentrate",
    titleKn: "ಟ್ರೈಕೋಡರ್ಮಾ ಲಿಕ್ವಿಡ್ (ದ್ರವ ಶಿಲೀಂಧ್ರನಾಶಕ)",
    subtitle: "Concentrated liquid bio-fungicide engineered for drip irrigation & foliar spray",
    category: "pesticide",
    form: "liquid",
    price: 350,
    originalPrice: 420,
    packSize: "1 Litre Bottle",
    thumbnail: "https://images.unsplash.com/photo-1585314062604-1a357de8b000?w=800&auto=format&fit=crop&q=80",
    handle: "trichoderma-liquid",
    crops: "Arecanut, Pepper, Ginger, Cardamom, Pomegranate",
    isDeal: true,
    rating: 4.9,
    reviewsCount: 115,
  },
  {
    id: "prod_metarhizium_powder",
    title: "Metarhizium Anisopliae Bio-Insecticide Powder",
    titleKn: "ಮೆಟಾರೈಸಿಯಂ ಪೌಡರ್ (ಕೀಟನಾಶಕ)",
    subtitle: "Controls white grubs, root borers & termites in sugarcane & arecanut soils",
    category: "pesticide",
    form: "powder",
    price: 150,
    originalPrice: 180,
    packSize: "1 Kg Pack",
    thumbnail: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=80",
    handle: "metarhizium-powder",
    crops: "Sugarcane, Arecanut, Groundnut, Coconut, Maize",
    rating: 4.8,
    reviewsCount: 78,
  },
  {
    id: "prod_vam_powder",
    title: "VAM Endo-Mycorrhiza Root Booster Powder",
    titleKn: "ವ್ಯಾಮ್ ಮೈಕೋರೈಜಾ ಪೌಡರ್ (ರಂಜಕ ಗೊಬ್ಬರ)",
    subtitle: "Expands root absorption area by 300% & mobilizes soil phosphorus and zinc",
    category: "stimulant",
    form: "powder",
    price: 150,
    originalPrice: 190,
    packSize: "1 Kg Pack",
    thumbnail: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=800&auto=format&fit=crop&q=80",
    handle: "vam-powder",
    crops: "Coffee, Cardamom, Arecanut, Banana, Rubber, Vegetables",
    isDeal: true,
    rating: 4.9,
    reviewsCount: 134,
  },
  {
    id: "prod_pseudomonas_liquid",
    title: "Pseudomonas Fluorescens Liquid Concentrate",
    titleKn: "ಸುಡೋಮೊನಾಸ್ ಲಿಕ್ವಿಡ್ (ದ್ರವ ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕ)",
    subtitle: "Drip and foliar grade bio-bactericide for bacterial blight and systemic immunity",
    category: "pesticide",
    form: "liquid",
    price: 350,
    originalPrice: 420,
    packSize: "1 Litre Bottle",
    thumbnail: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&auto=format&fit=crop&q=80",
    handle: "pseudomonas-liquid",
    crops: "Tomato, Chilli, Capsicum, Pomegranate, Paddy",
    rating: 4.7,
    reviewsCount: 65,
  },
  {
    id: "prod_metarhizium_liquid",
    title: "Metarhizium Liquid Concentrate (Drip Grade)",
    titleKn: "ಮೆಟಾರೈಸಿಯಂ ಲಿಕ್ವಿಡ್ (ದ್ರವ ಕೀಟನಾಶಕ)",
    subtitle: "Drenching & drip solution for sub-surface soil grubs, termites & beetle pests",
    category: "pesticide",
    form: "liquid",
    price: 350,
    originalPrice: 420,
    packSize: "1 Litre Bottle",
    thumbnail: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80",
    handle: "metarhizium-liquid",
    crops: "Sugarcane, Ginger, Arecanut, Coconut, Cardamom",
    rating: 4.8,
    reviewsCount: 82,
  },
  {
    id: "prod_paecilomyces_powder",
    title: "Paecilomyces Lilacinus Bio-Nematicide Powder",
    titleKn: "ಪೆಸಿಲೋಮೈಸಿಸ್ ಪೌಡರ್ (ಜಂತುಹುಳು ನಾಶಕ)",
    subtitle: "Biological parasite of root-knot nematodes and egg sacs in horticultural crops",
    category: "pesticide",
    form: "powder",
    price: 150,
    originalPrice: 180,
    packSize: "1 Kg Pack",
    thumbnail: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80",
    handle: "paecilomyces-powder",
    crops: "Pomegranate, Banana, Tomato, Polyhouse Vegetables, Flowers",
    rating: 4.8,
    reviewsCount: 71,
  },
  {
    id: "prod_compost_culture_powder",
    title: "Compost Culture Microbial Bio-Decomposer",
    titleKn: "ಕಾಂಪೊಸ್ಟ್ ಕಲ್ಚರ್ ಪೌಡರ್ (ಡಿಕಂಪೋಸರ್)",
    subtitle: "Converts farm waste, cow dung & dry leaves into premium rich compost in 30-40 days",
    category: "decomposer",
    form: "powder",
    price: 150,
    originalPrice: 180,
    packSize: "1 Kg Pack",
    thumbnail: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&auto=format&fit=crop&q=80",
    handle: "compost-culture-powder",
    crops: "Sugarcane Trash, Arecanut Fronds, Paddy Straw, Cattle Waste",
    rating: 4.9,
    reviewsCount: 110,
  },
]

type TabType = "all" | "deals" | "fertilizers" | "pesticides" | "liquids"

export default function DealOfTheDay({
  region: _region,
}: {
  region?: HttpTypes.StoreRegion
}) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>("all")
  const [addingId, setAddingId] = useState<string | null>(null)
  const [successId, setSuccessId] = useState<string | null>(null)

  const handleQuickAdd = async (product: ProductItem, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setAddingId(product.id)
    try {
      await addToCart({
        variantId: product.id,
        quantity: 1,
        countryCode: "in",
      })
      setSuccessId(product.id)
      router.refresh()
      setTimeout(() => {
        setSuccessId(null)
      }, 3000)
    } catch (err) {
      console.error("Quick add failed", err)
    } finally {
      setAddingId(null)
    }
  }

  const filteredProducts = PRODUCTS_CATALOG.filter((p) => {
    if (activeTab === "deals") return p.isDeal
    if (activeTab === "fertilizers") return p.category === "fertilizer" || p.category === "stimulant"
    if (activeTab === "pesticides") return p.category === "pesticide"
    if (activeTab === "liquids") return p.form === "liquid"
    return true
  })

  return (
    <section id="products-showcase" className="py-14 bg-slate-50/70 border-b border-gray-200/80">
      <div className="content-container">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black rounded-full uppercase tracking-wider flex items-center gap-1">
                <span>🔥</span>
                <span>Swash Biotech Catalog & Deals</span>
              </span>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                100% Certified Bio-Inputs
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Featured Bio-Agricultural Formulations
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Direct factory pricing: Powder at ₹150 (1 Kg) and Concentrated Liquids at ₹350 (1 Litre).
            </p>
          </div>

          {/* Clean Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-gray-200 shadow-xs overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === "all"
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-gray-600 hover:text-emerald-800 hover:bg-gray-50"
              }`}
            >
              All 10 Products
            </button>
            <button
              onClick={() => setActiveTab("deals")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 ${
                activeTab === "deals"
                  ? "bg-amber-400 text-amber-950 font-black shadow-sm"
                  : "text-gray-600 hover:text-amber-800 hover:bg-gray-50"
              }`}
            >
              <span>🔥</span>
              <span>Deal of the Day</span>
            </button>
            <button
              onClick={() => setActiveTab("fertilizers")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === "fertilizers"
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-gray-600 hover:text-emerald-800 hover:bg-gray-50"
              }`}
            >
              Bio-Fertilizers & VAM
            </button>
            <button
              onClick={() => setActiveTab("pesticides")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === "pesticides"
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-gray-600 hover:text-emerald-800 hover:bg-gray-50"
              }`}
            >
              Bio-Pesticides
            </button>
            <button
              onClick={() => setActiveTab("liquids")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === "liquids"
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-gray-600 hover:text-emerald-800 hover:bg-gray-50"
              }`}
            >
              Liquid Consortia (@ ₹350)
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isLiquid = product.form === "liquid"
            const discountPct = Math.round(
              ((product.originalPrice - product.price) / product.originalPrice) * 100
            )

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-gray-200/90 hover:border-emerald-500 hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden relative"
              >
                {/* Top Badge: Deal or Form */}
                <div className="relative h-48 sm:h-52 w-full bg-emerald-50/50 overflow-hidden">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    <span
                      className={`text-[11px] font-black px-2.5 py-1 rounded-lg shadow-sm ${
                        isLiquid
                          ? "bg-amber-400 text-amber-950"
                          : "bg-emerald-700 text-white"
                      }`}
                    >
                      {isLiquid ? "🧪 1 L Liquid (@ ₹350)" : "📦 1 Kg Powder (@ ₹150)"}
                    </span>
                    {product.isDeal && (
                      <span className="text-[10px] font-extrabold bg-red-600 text-white px-2 py-0.5 rounded-md shadow-xs self-start">
                        {discountPct}% OFF • Deal
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-xs px-2 py-1 rounded-md text-[11px] font-bold text-gray-800 shadow-xs flex items-center gap-1">
                    <span className="text-amber-500">★</span>
                    <span>{product.rating}</span>
                    <span className="text-gray-400 text-[10px]">({product.reviewsCount})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-emerald-700 transition-colors leading-snug">
                      {product.title}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-800 mt-1">
                      {product.titleKn}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {product.subtitle}
                    </p>

                    {/* Suitable crops badge */}
                    <div className="mt-3 pt-2.5 border-t border-gray-100">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Crops / ಬೆಳೆಗಳು:
                      </span>
                      <p className="text-[11px] text-gray-600 font-medium line-clamp-1 mt-0.5">
                        {product.crops}
                      </p>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-gray-100 flex flex-col gap-2 mt-auto">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-black text-emerald-950">
                            ₹{product.price}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            ₹{product.originalPrice}
                          </span>
                        </div>
                        <span className="text-[10px] text-emerald-700 font-semibold">
                          {product.packSize} • Incl. taxes
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(product, e)}
                        disabled={addingId === product.id}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs transition-all flex items-center gap-1 border ${
                          successId === product.id
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300"
                        }`}
                        title="Add to cart / ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ"
                      >
                        {addingId === product.id ? (
                          <span className="animate-spin text-xs">⏳</span>
                        ) : successId === product.id ? (
                          <span>✓ Added</span>
                        ) : (
                          <>
                            <span>🛒</span>
                            <span>+ Cart</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <LocalizedClientLink
                        href={`/products/${product.handle}`}
                        className="w-full text-center py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1 group-hover:bg-emerald-800"
                      >
                        <span>View Details & Buy</span>
                        <span>→</span>
                      </LocalizedClientLink>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Direct Link to Store */}
        <div className="mt-12 text-center">
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 border-2 border-emerald-600 font-extrabold text-sm shadow-sm transition-all hover:scale-105"
          >
            <span>View All 10 Certified Bio-Products Catalog</span>
            <span>→</span>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}
