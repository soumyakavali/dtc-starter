"use client"

import React from "react"
import { usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export type CategoryFilterItem = {
  id: string
  name: string
  nameKn: string
  handle: string
  icon: string
  badge?: string
  count?: number
}

export const STORE_CATEGORIES: CategoryFilterItem[] = [
  {
    id: "all",
    name: "All Bio Products",
    nameKn: "ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು",
    handle: "all",
    icon: "🌿",
    badge: "10 Products",
    count: 10,
  },
  {
    id: "cat_bio_fertilizers",
    name: "Bio-Fertilizers & VAM",
    nameKn: "ಜೈವಿಕ ಗೊಬ್ಬರ & ವ್ಯಾಮ್",
    handle: "bio-fertilizers",
    icon: "🌾",
    badge: "NPK + VAM",
    count: 2,
  },
  {
    id: "cat_bio_pesticides",
    name: "Bio-Pesticides & Insecticides",
    nameKn: "ಜೈವಿಕ ಕೀಟನಾಶಕಗಳು",
    handle: "bio-pesticides",
    icon: "🛡️",
    badge: "Grub / Termite",
    count: 2,
  },
  {
    id: "cat_bio_fungicides",
    name: "Bio-Fungicides & Bactericides",
    nameKn: "ಶಿಲೀಂಧ್ರ & ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕ",
    handle: "bio-fungicides",
    icon: "🧪",
    badge: "Root Rot / Wilt",
    count: 4,
  },
  {
    id: "cat_bio_decomposers",
    name: "Bio-Decomposers & Nematicides",
    nameKn: "ಡಿಕಂಪೋಸರ್ & ನೆಮಟೋಡ್",
    handle: "bio-decomposers",
    icon: "🍂",
    badge: "Waste & Worms",
    count: 2,
  },
  {
    id: "cat_powder",
    name: "Powder Formulations",
    nameKn: "ಪೌಡರ್ ಉತ್ಪನ್ನಗಳು (1 Kg)",
    handle: "powder-products",
    icon: "📦",
    badge: "₹150 / Kg",
    count: 6,
  },
  {
    id: "cat_liquid",
    name: "Liquid Formulations",
    nameKn: "ಲಿಕ್ವಿಡ್ ಉತ್ಪನ್ನಗಳು (1 L)",
    handle: "liquid-products",
    icon: "💧",
    badge: "₹350 / L",
    count: 4,
  },
]

type CategoryPickerProps = {
  currentCategoryHandle?: string
}

export default function CategoryPicker({ currentCategoryHandle }: CategoryPickerProps) {
  const pathname = usePathname()
  const isStorePage = pathname?.endsWith("/store") || pathname?.endsWith("/products")

  return (
    <div className="flex flex-col gap-3 pb-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Filter by Categories
          </span>
          <p className="text-[11px] text-gray-500 font-medium">ವರ್ಗವಾರು ವಿಂಗಡಣೆ</p>
        </div>
      </div>

      {/* Desktop Vertical Menu */}
      <nav className="hidden small:flex flex-col gap-1 mt-1" aria-label="Product categories sidebar">
        {STORE_CATEGORIES.map((cat) => {
          const isAll = cat.handle === "all"
          const href = isAll ? "/store" : `/categories/${cat.handle}`

          const isActive = isAll
            ? isStorePage && !currentCategoryHandle
            : (currentCategoryHandle === cat.handle) || pathname?.includes(`/categories/${cat.handle}`)

          return (
            <LocalizedClientLink
              key={cat.id}
              href={href}
              className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-emerald-700 text-white shadow-xs font-bold"
                  : "text-gray-700 hover:bg-emerald-50/80 hover:text-emerald-900"
              }`}
              suppressHydrationWarning
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="text-sm shrink-0">{cat.icon}</span>
                <div className="truncate text-left">
                  <div className="truncate font-bold leading-tight">{cat.name}</div>
                  <div
                    className={`text-[10px] truncate leading-tight font-normal ${
                      isActive ? "text-emerald-100" : "text-gray-400 group-hover:text-emerald-700"
                    }`}
                  >
                    {cat.nameKn}
                  </div>
                </div>
              </div>

              {cat.badge && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ml-1 whitespace-nowrap ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600 group-hover:bg-emerald-100 group-hover:text-emerald-800"
                  }`}
                >
                  {cat.badge}
                </span>
              )}
            </LocalizedClientLink>
          )
        })}
      </nav>

      {/* Mobile Horizontal Scrollable Category Chips */}
      <div className="small:hidden overflow-x-auto py-1 -mx-6 px-6 no-scrollbar flex items-center gap-2">
        {STORE_CATEGORIES.map((cat) => {
          const isAll = cat.handle === "all"
          const href = isAll ? "/store" : `/categories/${cat.handle}`

          const isActive = isAll
            ? isStorePage && !currentCategoryHandle
            : (currentCategoryHandle === cat.handle) || pathname?.includes(`/categories/${cat.handle}`)

          return (
            <LocalizedClientLink
              key={cat.id}
              href={href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                isActive
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-900 border border-gray-200"
              }`}
              suppressHydrationWarning
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </LocalizedClientLink>
          )
        })}
      </div>
    </div>
  )
}
