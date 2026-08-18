"use client"

import React from "react"

interface PackagingVisualProps {
  handle?: string
  title?: string
  isLiquid?: boolean
  className?: string
}

interface ProductTheme {
  primaryGradient: string
  accentColor: string
  badgeBg: string
  badgeText: string
  labelKannada: string
  labelEnglish: string
  subtitleKannada: string
  categoryName: string
  cfuText: string
  packSize: string
  icon: string
  sealText: string
  type: "powder" | "liquid"
}

const PRODUCT_THEMES: Record<string, ProductTheme> = {
  "trichoderma-powder": {
    primaryGradient: "from-emerald-600 via-emerald-700 to-teal-900",
    accentColor: "#10b981",
    badgeBg: "bg-emerald-100 text-emerald-950 border-emerald-300",
    badgeText: "ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ",
    labelKannada: "ಟ್ರೈಕೋಡರ್ಮಾ",
    labelEnglish: "TRICHODERMA VIRIDE",
    subtitleKannada: "ಬೇರು ಕೊಳೆತ & ಸೊರಗು ರೋಗ ತಡೆಗಟ್ಟಲು",
    categoryName: "BIO-FUNGICIDE",
    cfuText: "2 × 10⁶ CFU/g min",
    packSize: "NET WT: 1 KG",
    icon: "🛡️",
    sealText: "ROOT SHIELD",
    type: "powder",
  },
  "pseudomonas-powder": {
    primaryGradient: "from-teal-600 via-cyan-700 to-emerald-900",
    accentColor: "#06b6d4",
    badgeBg: "bg-cyan-100 text-cyan-950 border-cyan-300",
    badgeText: "ಜೈವಿಕ ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕ",
    labelKannada: "ಸುಡೋಮೊನಾಸ್",
    labelEnglish: "PSEUDOMONAS FLUORESCENS",
    subtitleKannada: "ಎಲೆ ಚುಕ್ಕೆ & ಕರಕಲು ರೋಗ ನಿಯಂತ್ರಣಕ್ಕೆ",
    categoryName: "BIO-BACTERICIDE & PGPR",
    cfuText: "1 × 10⁸ CFU/g min",
    packSize: "NET WT: 1 KG",
    icon: "🌿",
    sealText: "PLANT IMMUNITY",
    type: "powder",
  },
  "metarhizium-powder": {
    primaryGradient: "from-lime-700 via-emerald-800 to-stone-900",
    accentColor: "#84cc16",
    badgeBg: "bg-lime-100 text-lime-950 border-lime-300",
    badgeText: "ಜೈವಿಕ ಕೀಟನಾಶಕ",
    labelKannada: "ಮೆಟಾರೈಸಿಯಂ",
    labelEnglish: "METARHIZIUM ANISOPLIAE",
    subtitleKannada: "ಗೊಣ್ಣೆ ಹುಳು & ಗೆದ್ದಲು ನಾಶಕ್ಕೆ",
    categoryName: "BIO-INSECTICIDE",
    cfuText: "1 × 10⁸ CFU/g min",
    packSize: "NET WT: 1 KG",
    icon: "🐛",
    sealText: "PEST DEFENSE",
    type: "powder",
  },
  "vam-powder": {
    primaryGradient: "from-amber-600 via-amber-700 to-yellow-950",
    accentColor: "#f59e0b",
    badgeBg: "bg-amber-100 text-amber-950 border-amber-300",
    badgeText: "ಜೈವಿಕ ರಂಜಕ ಗೊಬ್ಬರ",
    labelKannada: "ವ್ಯಾಮ್ ಮೈಕೋರೈಜಾ",
    labelEnglish: "VAM MYCORRHIZA",
    subtitleKannada: "ಬೇರಿನ ವೃದ್ಧಿ & ರಂಜಕ ಹೀರಿಕೆಗೆ",
    categoryName: "BIO-FERTILIZER (P-BOOSTER)",
    cfuText: "100 IP/g Active Spores",
    packSize: "NET WT: 1 KG",
    icon: "🌾",
    sealText: "ROOT BOOSTER",
    type: "powder",
  },
  "paecilomyces-powder": {
    primaryGradient: "from-purple-700 via-indigo-800 to-slate-900",
    accentColor: "#a855f7",
    badgeBg: "bg-purple-100 text-purple-950 border-purple-300",
    badgeText: "ಜೈವಿಕ ನೆಮಟೋಡ್ ನಿಯಂತ್ರಕ",
    labelKannada: "ಪೆಸಿಲೋಮೈಸಿಸ್",
    labelEnglish: "PAECILOMYCES LILACINUS",
    subtitleKannada: "ಬೇರು ಗಂಟು ಜಂತುಹುಳು ನಾಶಕ್ಕೆ",
    categoryName: "BIO-NEMATICIDE",
    cfuText: "1 × 10⁸ CFU/g min",
    packSize: "NET WT: 1 KG",
    icon: "🔬",
    sealText: "NEMATODE GUARD",
    type: "powder",
  },
  "compost-culture-powder": {
    primaryGradient: "from-stone-700 via-emerald-900 to-neutral-950",
    accentColor: "#10b981",
    badgeBg: "bg-emerald-100 text-emerald-950 border-emerald-300",
    badgeText: "ಜೈವಿಕ ಡಿಕಂಪೋಸರ್",
    labelKannada: "ಕಾಂಪೊಸ್ಟ್ ಕಲ್ಚರ್",
    labelEnglish: "COMPOST CULTURE",
    subtitleKannada: "ಕೃಷಿ ತ್ಯಾಜ್ಯ ಕಳಿಸಿ ಗೊಬ್ಬರವಾಗಿಸಲು",
    categoryName: "BIO-DECOMPOSER",
    cfuText: "Multi-Enzyme Consortium",
    packSize: "NET WT: 1 KG",
    icon: "♻️",
    sealText: "FAST COMPOST",
    type: "powder",
  },
  "trichoderma-liquid": {
    primaryGradient: "from-emerald-700 via-teal-800 to-emerald-950",
    accentColor: "#10b981",
    badgeBg: "bg-emerald-100 text-emerald-950 border-emerald-300",
    badgeText: "ಸಾಂದ್ರೀಕೃತ ಶಿಲೀಂಧ್ರನಾಶಕ",
    labelKannada: "ಟ್ರೈಕೋಡರ್ಮಾ ಲಿಕ್ವಿಡ್",
    labelEnglish: "TRICHODERMA LIQUID",
    subtitleKannada: "ಹನಿ ನೀರಾವರಿ (ಡ್ರಿಪ್) & ಸಿಂಪರಣೆಗೆ",
    categoryName: "LIQUID BIO-FUNGICIDE",
    cfuText: "1 × 10⁸ CFU/ml High Count",
    packSize: "NET VOL: 1 LITRE",
    icon: "💧",
    sealText: "DRIP READY",
    type: "liquid",
  },
  "pseudomonas-liquid": {
    primaryGradient: "from-teal-700 via-cyan-800 to-slate-900",
    accentColor: "#06b6d4",
    badgeBg: "bg-cyan-100 text-cyan-950 border-cyan-300",
    badgeText: "ಸಾಂದ್ರೀಕೃತ ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕ",
    labelKannada: "ಸುಡೋಮೊನಾಸ್ ಲಿಕ್ವಿಡ್",
    labelEnglish: "PSEUDOMONAS LIQUID",
    subtitleKannada: "ದುಂಡಾಣು ಕರಕಲು & ಸೊರಗು ನಿಯಂತ್ರಣಕ್ಕೆ",
    categoryName: "LIQUID BIO-BACTERICIDE",
    cfuText: "1 × 10⁸ CFU/ml PGPR",
    packSize: "NET VOL: 1 LITRE",
    icon: "🧪",
    sealText: "DRIP READY",
    type: "liquid",
  },
  "metarhizium-liquid": {
    primaryGradient: "from-lime-800 via-emerald-900 to-stone-950",
    accentColor: "#84cc16",
    badgeBg: "bg-lime-100 text-lime-950 border-lime-300",
    badgeText: "ದ್ರವ ಜೈವಿಕ ಕೀಟನಾಶಕ",
    labelKannada: "ಮೆಟಾರೈಸಿಯಂ ಲಿಕ್ವಿಡ್",
    labelEnglish: "METARHIZIUM LIQUID",
    subtitleKannada: "ಗೊಣ್ಣೆ ಹುಳು & ಗೆದ್ದಲು ಹತೋಟಿಗೆ",
    categoryName: "LIQUID BIO-INSECTICIDE",
    cfuText: "1 × 10⁸ CFU/ml Spores",
    packSize: "NET VOL: 1 LITRE",
    icon: "🛡️",
    sealText: "DRIP READY",
    type: "liquid",
  },
  "bio-npk-consortium-liquid": {
    primaryGradient: "from-amber-600 via-emerald-800 to-teal-950",
    accentColor: "#eab308",
    badgeBg: "bg-amber-100 text-amber-950 border-amber-300",
    badgeText: "ಸಂಪೂರ್ಣ ಜೈವಿಕ ದ್ರವ ಗೊಬ್ಬರ",
    labelKannada: "ಬಯೋ ಎನ್ಪಿಕೆ ಕನ್ಸಾರ್ಸಿಯಂ",
    labelEnglish: "BIO NPK CONSORTIUM",
    subtitleKannada: "ಸಾರಜನಕ + ರಂಜಕ + ಪೊಟ್ಯಾಶ್ (N-P-K)",
    categoryName: "LIQUID BIO-FERTILIZER (N+P+K)",
    cfuText: "Azotobacter + PSB + KMB",
    packSize: "NET VOL: 1 LITRE",
    icon: "⚡",
    sealText: "N-P-K COMPLETE",
    type: "liquid",
  },
}

export default function ProductPackagingVisual({
  handle = "",
  title = "",
  isLiquid: isLiquidProp,
  className = "",
}: PackagingVisualProps) {
  // Find matching theme or fallback
  const cleanHandle = Object.keys(PRODUCT_THEMES).find((k) =>
    handle?.toLowerCase().includes(k)
  )

  const isLiquid =
    isLiquidProp ??
    (handle?.includes("liquid") || title?.toLowerCase().includes("liquid"))

  const theme: ProductTheme = cleanHandle
    ? PRODUCT_THEMES[cleanHandle]
    : {
        primaryGradient: isLiquid
          ? "from-emerald-700 via-teal-800 to-emerald-950"
          : "from-emerald-600 via-emerald-700 to-teal-900",
        accentColor: "#10b981",
        badgeBg: isLiquid
          ? "bg-amber-100 text-amber-950 border-amber-300"
          : "bg-emerald-100 text-emerald-950 border-emerald-300",
        badgeText: isLiquid ? "ಲಿಕ್ವಿಡ್ ಜೈವಿಕ ಉತ್ಪನ್ನ" : "ಪೌಡರ್ ಜೈವಿಕ ಉತ್ಪನ್ನ",
        labelKannada: title.split("(")[0]?.trim() || "ಜೈವಿಕ ಉತ್ಪನ್ನ",
        labelEnglish: title.split("(")[1]?.replace(")", "")?.trim() || "BIOTILL AGRI",
        subtitleKannada: "100% ಶುದ್ಧ ಜೈವಿಕ ಕೃಷಿ ಸೂತ್ರ",
        categoryName: isLiquid ? "LIQUID BIO-FORMULATION" : "POWDER BIO-FORMULATION",
        cfuText: "High Microbial Count",
        packSize: isLiquid ? "NET VOL: 1 LITRE" : "NET WT: 1 KG",
        icon: isLiquid ? "🧪" : "📦",
        sealText: "BIO CERTIFIED",
        type: isLiquid ? "liquid" : "powder",
      }

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center p-3 select-none overflow-hidden ${className}`}
    >
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white" />
      <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-emerald-200/30 blur-xl pointer-events-none" />
      <div className="absolute -left-8 -top-8 w-32 h-32 rounded-full bg-teal-200/20 blur-xl pointer-events-none" />

      {theme.type === "powder" ? (
        // ===================================================================
        // 3D STAND-UP POUCH PACKAGING (1 KG POWDER)
        // ===================================================================
        <div className="relative w-full max-w-[210px] h-[92%] flex flex-col items-center drop-shadow-xl transition-transform duration-300 group-hover:scale-[1.03]">
          {/* Pouch Top Heat-Seal Notch */}
          <div className="w-[88%] h-3.5 bg-gradient-to-r from-emerald-800 via-emerald-600 to-emerald-800 rounded-t-md border-b border-emerald-900/60 relative flex items-center justify-center shadow-xs">
            <div className="w-8 h-1 rounded-full bg-emerald-300/40" />
            <div className="absolute left-3 top-1 w-1.5 h-1.5 rounded-full bg-amber-400/80" />
            <div className="absolute right-3 top-1 w-1.5 h-1.5 rounded-full bg-amber-400/80" />
          </div>

          {/* Pouch Main Body */}
          <div
            className={`w-[94%] flex-1 bg-gradient-to-b ${theme.primaryGradient} rounded-b-2xl p-3 flex flex-col justify-between text-white border border-white/20 shadow-inner relative overflow-hidden`}
          >
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:8px_8px]" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-lg pointer-events-none" />

            {/* Top Brand Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-white text-emerald-800 flex items-center justify-center font-black text-[10px] shadow-xs">
                  🌱
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-black tracking-tight leading-none text-white drop-shadow-xs">
                    BIOTILL <span className="text-amber-300">AGRI</span>
                  </span>
                  <span className="text-[7px] tracking-widest text-emerald-200 font-bold uppercase">
                    PVT LTD
                  </span>
                </div>
              </div>
              <span className="text-[8px] bg-amber-400 text-amber-950 font-black px-1.5 py-0.5 rounded shadow-xs uppercase tracking-wide">
                100% BIO
              </span>
            </div>

            {/* Middle Section: Big Product Title & Icon */}
            <div className="relative z-10 text-center my-auto py-1 flex flex-col items-center">
              {/* Category Pill */}
              <span className="text-[8px] tracking-wider uppercase font-extrabold px-2 py-0.5 rounded-full bg-black/35 backdrop-blur-xs text-emerald-200 border border-white/15 mb-1">
                {theme.categoryName}
              </span>

              {/* Kannada Name (High Contrast) */}
              <h2 className="text-lg sm:text-xl font-black text-amber-300 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                {theme.labelKannada}
              </h2>

              {/* English Subtitle */}
              <h3 className="text-[9px] font-extrabold tracking-wider text-white/95 uppercase drop-shadow-xs mt-0.5">
                {theme.labelEnglish}
              </h3>

              {/* Agricultural Purpose Badge */}
              <p className="text-[8px] font-bold text-emerald-100 bg-white/15 backdrop-blur-xs px-2 py-0.5 rounded-md mt-1.5 max-w-[95%] truncate">
                {theme.subtitleKannada}
              </p>
            </div>

            {/* Bottom Footer: Pack Size & CFU */}
            <div className="relative z-10 pt-1.5 border-t border-white/20 flex items-end justify-between text-[8px] font-extrabold">
              <div className="text-left leading-tight">
                <span className="text-amber-300 block text-[7px]">{theme.sealText}</span>
                <span className="text-white font-mono text-[8px]">{theme.cfuText}</span>
              </div>
              <div className="bg-white text-emerald-950 px-2 py-0.8 rounded-md font-black text-[9px] shadow-sm tracking-wider">
                {theme.packSize}
              </div>
            </div>
          </div>

          {/* Pouch Bottom Stand-up Gusset */}
          <div className="w-[84%] h-2 bg-emerald-950/80 rounded-b-md blur-[1px] -mt-0.5" />
        </div>
      ) : (
        // ===================================================================
        // 3D LIQUID BOTTLE PACKAGING (1 LITRE BOTTLE)
        // ===================================================================
        <div className="relative w-full max-w-[170px] h-[95%] flex flex-col items-center drop-shadow-xl transition-transform duration-300 group-hover:scale-[1.03]">
          {/* Bottle Ribbed Cap */}
          <div className="w-10 h-4 bg-gradient-to-r from-emerald-800 via-emerald-600 to-emerald-900 rounded-t-sm border border-emerald-950/60 relative flex items-center justify-around shadow-sm">
            <div className="w-0.5 h-full bg-emerald-400/40" />
            <div className="w-0.5 h-full bg-emerald-400/40" />
            <div className="w-0.5 h-full bg-emerald-400/40" />
          </div>

          {/* Bottle Neck */}
          <div className="w-8 h-2.5 bg-gradient-to-r from-emerald-100 via-white to-emerald-100 border-x border-gray-300" />

          {/* Bottle Shoulder */}
          <div className="w-24 h-4 bg-gradient-to-b from-white via-gray-50 to-gray-100 rounded-t-xl border-t border-x border-gray-300 shadow-xs" />

          {/* Bottle Main Body */}
          <div className="w-24 flex-1 bg-gradient-to-r from-gray-100 via-white to-gray-100 border-x border-gray-300 flex flex-col justify-center relative p-1 shadow-inner">
            {/* Liquid Level Window Line */}
            <div className="absolute right-1 top-2 bottom-2 w-1 rounded-full bg-amber-400/30 border border-amber-500/40" />

            {/* Bottle Center Label */}
            <div
              className={`w-full h-[90%] bg-gradient-to-b ${theme.primaryGradient} rounded-lg p-2 flex flex-col justify-between text-white shadow-md relative overflow-hidden border border-white/30`}
            >
              {/* Brand Top */}
              <div className="flex items-center justify-between border-b border-white/20 pb-1">
                <span className="text-[8px] font-black text-white leading-none">
                  BIOTILL <span className="text-amber-300">AGRI</span>
                </span>
                <span className="text-[7px] bg-amber-400 text-amber-950 font-black px-1 rounded">
                  DRIP
                </span>
              </div>

              {/* Product Info */}
              <div className="text-center py-1 my-auto">
                <span className="text-[7px] uppercase tracking-wider font-extrabold text-emerald-200 block">
                  {theme.categoryName}
                </span>
                <h2 className="text-sm font-black text-amber-300 leading-tight drop-shadow-xs mt-0.5">
                  {theme.labelKannada}
                </h2>
                <h3 className="text-[7px] font-extrabold tracking-wider text-white uppercase mt-0.5 truncate">
                  {theme.labelEnglish}
                </h3>
              </div>

              {/* Bottom Pack Info */}
              <div className="border-t border-white/20 pt-1 flex items-center justify-between text-[7px] font-extrabold">
                <span className="text-emerald-100 font-mono text-[6.5px]">1×10⁸ CFU/ml</span>
                <span className="bg-white text-emerald-950 px-1 py-0.5 rounded font-black text-[7.5px]">
                  1 LITRE
                </span>
              </div>
            </div>
          </div>

          {/* Bottle Base */}
          <div className="w-24 h-3 bg-gradient-to-t from-gray-300 to-gray-100 rounded-b-xl border-b border-x border-gray-300 shadow-sm" />
        </div>
      )}
    </div>
  )
}
