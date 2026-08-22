"use client"

import React, { useState } from "react"
import { useRouter, useParams } from "next/navigation"

const POPULAR_QUERIES = [
  { label: "ಟ್ರೈಕೋಡರ್ಮಾ (Trichoderma)", query: "trichoderma" },
  { label: "ಸುಡೋಮೊನಾಸ್ (Pseudomonas)", query: "pseudomonas" },
  { label: "ಮೆಟಾರೈಸಿಯಂ (Metarhizium)", query: "metarhizium" },
  { label: "ವ್ಯಾಮ್ (VAM)", query: "vam" },
  { label: "ಪೆಸಿಲೋಮೈಸಿಸ್ (Paecilomyces)", query: "paecilomyces" },
  { label: "ಕಾಂಪೊಸ್ಟ್ ಕಲ್ಚರ್ (Compost Culture)", query: "compost" },
  { label: "ಬಯೋ ಎನ್ಪಿಕೆ (Bio NPK)", query: "npk" },
]

export default function FarmerSearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()
  const params = useParams()
  const countryCode = (params?.countryCode as string) || "in"

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/${countryCode}/store?q=${encodeURIComponent(searchTerm.trim())}`)
    } else {
      router.push(`/${countryCode}/store`)
    }
  }

  const selectSuggestion = (query: string) => {
    setSearchTerm(query)
    router.push(`/${countryCode}/store?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="relative w-full max-w-lg">
      <form onSubmit={handleSearch} className="relative flex items-center">
        <div className="absolute left-3.5 text-emerald-700 pointer-events-none">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="ಉತ್ಪನ್ನ ಹುಡುಕಿ (ಟ್ರೈಕೋಡರ್ಮಾ, ಸುಡೋಮೊನಾಸ್, ಮೆಟಾರೈಸಿಯಂ, ವ್ಯಾಮ್...)"
          className="w-full pl-10 pr-24 py-2 text-xs sm:text-sm bg-emerald-50/70 hover:bg-emerald-50 focus:bg-white text-gray-900 border border-emerald-200 focus:border-emerald-600 rounded-full outline-none transition-all shadow-inner focus:ring-2 focus:ring-emerald-600/20"
          suppressHydrationWarning
        />
        <button
          type="submit"
          className="absolute right-1.5 px-3.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-full transition-colors flex items-center gap-1 shadow-sm"
          suppressHydrationWarning
        >
          <span>ಹುಡುಕಿ</span>
        </button>
      </form>

      {/* Quick Suggestions Dropdown on Focus */}
      {isFocused && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-emerald-100 p-3 z-50 text-left">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            ಉತ್ಪನ್ನಗಳು / Quick Bio-Agri Products:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_QUERIES.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onMouseDown={() => selectSuggestion(item.query)}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-medium border border-emerald-200/60 transition-colors"
                suppressHydrationWarning
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
