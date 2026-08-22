"use client"

import React, { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type CropInfo = {
  name: string
  nameKn: string
  icon: string
  recommendedFertilizer: string
  fertHandle: string
  fertRatePerAcre: string
  fertType: string
  recommendedPesticide: string
  pestHandle: string
  pestRatePerAcre: string
  pestType: string
  applicationSchedule: string
  applicationScheduleKn: string
  benefits: string
}

const CROP_DATABASE: Record<string, CropInfo> = {
  sugarcane: {
    name: "Sugarcane (ಕಬ್ಬು)",
    nameKn: "ಕಬ್ಬಿನ ಬೆಳೆ",
    icon: "🎋",
    recommendedFertilizer: "Bio NPK Liquid Consortium (1 Litre/Acre)",
    fertHandle: "bio-npk-consortium-liquid",
    fertRatePerAcre: "1-2 Litres",
    fertType: "Liquid",
    recommendedPesticide: "Metarhizium Powder (White Grub Control)",
    pestHandle: "metarhizium-powder",
    pestRatePerAcre: "3-4 Kg",
    pestType: "Powder",
    applicationSchedule: "Apply Metarhizium in soil at planting to stop white grubs. Feed Bio NPK via drip at 45 & 90 days.",
    applicationScheduleKn: "ನಾಟಿ ಮಾಡುವಾಗ ಮೆಟಾರೈಸಿಯಂ ಮಣ್ಣಿಗೆ ಹಾಕಿ ಗೊಣ್ಣೆ ಹುಳು ತಡೆಯಿರಿ. 45 ಮತ್ತು 90 ದಿನಗಳಲ್ಲಿ ಡ್ರಿಪ್ ಮೂಲಕ ಬಯೋ ಎನ್ಪಿಕೆ ಕೊಡಿ.",
    benefits: "Increases cane weight, sugar recovery, and reduces chemical fertilizer need by 25%.",
  },
  paddy: {
    name: "Paddy / Rice (ಭತ್ತ)",
    nameKn: "ಭತ್ತದ ಬೆಳೆ",
    icon: "🌾",
    recommendedFertilizer: "Bio NPK Liquid Consortium + VAM Powder",
    fertHandle: "bio-npk-consortium-liquid",
    fertRatePerAcre: "1 Litre + 2 Kg VAM",
    fertType: "Liquid + Powder",
    recommendedPesticide: "Pseudomonas Powder (Bacterial Blight & Blast)",
    pestHandle: "pseudomonas-powder",
    pestRatePerAcre: "2-3 Kg",
    pestType: "Powder",
    applicationSchedule: "Seed treatment with Pseudomonas (10g/kg). Apply Bio NPK in standing water during tillering stage.",
    applicationScheduleKn: "ಬಿತ್ತನೆಗೆ ಮುನ್ನ ಸುಡೋಮೊನಾಸ್‌ನಿಂದ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ತೆನೆ ಬರುವ ಹಂತದಲ್ಲಿ ಬಯೋ ಎನ್ಪಿಕೆ ನೀಡಿ.",
    benefits: "Prevents blast & bacterial blight, increases tiller numbers and grain fullness.",
  },
  arecanut: {
    name: "Arecanut / Betelnut (ಅಡಿಕೆ)",
    nameKn: "ಅಡಿಕೆ ತೋಟ",
    icon: "🌴",
    recommendedFertilizer: "VAM Mycorrhiza Powder + Bio NPK Liquid",
    fertHandle: "vam-powder",
    fertRatePerAcre: "4 Kg VAM + 2 Litres NPK",
    fertType: "Powder + Liquid",
    recommendedPesticide: "Trichoderma Liquid (Koleroga & Root Rot Protection)",
    pestHandle: "trichoderma-liquid",
    pestRatePerAcre: "2 Litres",
    pestType: "Liquid",
    applicationSchedule: "Drench tree basin with Trichoderma pre-monsoon. Apply VAM with compost for root expansion.",
    applicationScheduleKn: "ಮಳೆಗಾಲಕ್ಕೆ ಮುಂಚಿತವಾಗಿ ಟ್ರೈಕೋಡರ್ಮಾ ದ್ರಾವಣದಿಂದ ಬುಡ ನೆನೆಸಿ (ಡ್ರೆಂಚಿಂಗ್). ಬೇರಿನ ವೃದ್ಧಿಗೆ ವ್ಯಾಮ್ ಗೊಬ್ಬರ ನೀಡಿ.",
    benefits: "Stops fatal Mahali / Koleroga and root decay, enhances nut retention and yield.",
  },
  cotton: {
    name: "Cotton (ಹತ್ತಿ)",
    nameKn: "ಹತ್ತಿ ಬೆಳೆ",
    icon: "☁️",
    recommendedFertilizer: "Bio NPK Liquid Consortium",
    fertHandle: "bio-npk-consortium-liquid",
    fertRatePerAcre: "1 Litre",
    fertType: "Liquid",
    recommendedPesticide: "Pseudomonas Powder + Metarhizium Powder",
    pestHandle: "pseudomonas-powder",
    pestRatePerAcre: "2 Kg",
    pestType: "Powder",
    applicationSchedule: "Soil drenching at seedling stage. Foliar spray at square & boll development stages.",
    applicationScheduleKn: "ಸಸಿ ಹಂತದಲ್ಲಿ ಮಣ್ಣು ಸಂಸ್ಕರಣೆ ಮಾಡಿ. ಕಾಯಿ ಮತ್ತು ಹೂವು ಬಿಡುವ ಹಂತದಲ್ಲಿ ಸಿಂಪಡಿಸಿ.",
    benefits: "Protects against bacterial blight and root pests, boosts boll count.",
  },
  vegetables: {
    name: "Tomato, Chilli & Vegetables (ತರಕಾರಿಗಳು)",
    nameKn: "ಟೊಮ್ಯಾಟೊ, ಮೆಣಸಿನಕಾಯಿ & ತರಕಾರಿ",
    icon: "🍅",
    recommendedFertilizer: "VAM Mycorrhiza Powder + Bio NPK Liquid",
    fertHandle: "vam-powder",
    fertRatePerAcre: "3 Kg VAM + 1 Litre NPK",
    fertType: "Powder + Liquid",
    recommendedPesticide: "Paecilomyces Powder (Root-Knot Nematode Protection)",
    pestHandle: "paecilomyces-powder",
    pestRatePerAcre: "2 Kg",
    pestType: "Powder",
    applicationSchedule: "Nursery bed treatment with VAM & Paecilomyces. Drip Bio NPK every 15 days.",
    applicationScheduleKn: "ಸಸಿ ಮಡಿಯಲ್ಲಿ ವ್ಯಾಮ್ & ಪೆಸಿಲೋಮೈಸಿಸ್ ಬೆರೆಸಿ. ನಾಟಿ ನಂತರ ಪ್ರತಿ 15 ದಿನಕ್ಕೊಮ್ಮೆ ಬಯೋ ಎನ್ಪಿಕೆ ಡ್ರಿಪ್ ಕೊಡಿ.",
    benefits: "Eliminates root-knot nematode galling, prevents wilt and gives lustrous vegetables.",
  },
  banana: {
    name: "Banana (ಬಾಳೆ)",
    nameKn: "ಬಾಳೆ ತೋಟ",
    icon: "🍌",
    recommendedFertilizer: "Bio NPK Liquid + Compost Culture",
    fertHandle: "bio-npk-consortium-liquid",
    fertRatePerAcre: "2 Litres NPK + 2 Kg Compost Culture",
    fertType: "Liquid + Powder",
    recommendedPesticide: "Trichoderma Powder (Panama Wilt Protection)",
    pestHandle: "trichoderma-powder",
    pestRatePerAcre: "3 Kg",
    pestType: "Powder",
    applicationSchedule: "Sucker dipping in Trichoderma. Soil drenching around suckers at 2, 4 and 6 months.",
    applicationScheduleKn: "ಕಂದು ನಾಟಿ ಮಾಡುವಾಗ ಟ್ರೈಕೋಡರ್ಮಾ ದ್ರಾವಣದಲ್ಲಿ ಅದ್ದಿ. 2, 4 ಮತ್ತು 6ನೇ ತಿಂಗಳಲ್ಲಿ ಬುಡಕ್ಕೆ ಗೊಬ್ಬರ ನೀಡಿ.",
    benefits: "Guards against Panama Fusarium wilt and increases bunch weight by 15-20%.",
  },
}

export default function DosageCalculator() {
  const [selectedCropKey, setSelectedCropKey] = useState<string>("sugarcane")
  const [acreage, setAcreage] = useState<number>(2)

  const currentCrop = CROP_DATABASE[selectedCropKey]

  return (
    <section id="dosage-calculator" className="py-16 bg-white border-b border-gray-200">
      <div className="content-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3.5 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-black rounded-full mb-2 uppercase tracking-wider">
            🔬 Farmer Agri Advisory & Calculator
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Calculate Bio-Dosage for Your Farm
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Select your crop and farm acreage to get precise scientific recommendations, application schedules, and direct package requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form: Left Column */}
          <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-7 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                1. Select Your Crop / ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(CROP_DATABASE).map(([key, crop]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedCropKey(key)}
                    className={`flex items-center gap-2 p-3 rounded-xl text-left text-xs font-bold transition-all ${
                      selectedCropKey === key
                        ? "bg-emerald-700 text-white shadow-md scale-[1.02]"
                        : "bg-white text-gray-800 border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/50"
                    }`}
                  >
                    <span className="text-lg">{crop.icon}</span>
                    <span className="line-clamp-1">{crop.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  2. Farm Land Area / ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ:
                </label>
                <span className="text-sm font-black text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full">
                  {acreage} {acreage === 1 ? "Acre" : "Acres"} ({acreage} ಎಕರೆ)
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={acreage}
                onChange={(e) => setAcreage(Number(e.target.value))}
                className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
              />
              <div className="flex justify-between text-[11px] font-semibold text-gray-400 mt-1">
                <span>1 Acre</span>
                <span>3 Acres</span>
                <span>5 Acres</span>
                <span>10 Acres</span>
              </div>
            </div>

            {/* Helpline quick badge */}
            <div className="p-3.5 bg-emerald-100/60 rounded-2xl border border-emerald-200 flex items-center gap-3 text-xs text-emerald-950">
              <span className="text-xl">📞</span>
              <div>
                <p className="font-bold">Need customized agronomist advice?</p>
                <p className="text-[11px] text-emerald-800">Call BioTill Helpline: +91 94801 23456</p>
              </div>
            </div>
          </div>

          {/* Results Display: Right Column */}
          <div className="lg:col-span-7 bg-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-emerald-800 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-emerald-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{currentCrop.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {currentCrop.name}
                    </h3>
                    <p className="text-xs text-emerald-300 font-medium">
                      Scientific Bio-Schedule for {acreage} {acreage === 1 ? "Acre" : "Acres"}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black bg-amber-400 text-amber-950 px-3 py-1 rounded-full">
                  100% Bio-Certified
                </span>
              </div>

              {/* Recommendations Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Fertilizer Card */}
                <div className="bg-emerald-900/80 rounded-2xl p-4 border border-emerald-700/70">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-200 uppercase tracking-wider mb-2">
                    <span>🌱</span>
                    <span>Primary Bio-Fertilizer</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">
                    {currentCrop.recommendedFertilizer}
                  </h4>
                  <div className="mt-2 pt-2 border-t border-emerald-800 flex justify-between items-center text-xs">
                    <span className="text-emerald-300">Required Quantity:</span>
                    <span className="font-black text-amber-300">
                      {acreage * 1} - {acreage * 2} {currentCrop.fertType === "Liquid" ? "Litres" : "Kg"}
                    </span>
                  </div>
                  <LocalizedClientLink
                    href={`/products/${currentCrop.fertHandle}`}
                    className="mt-3 block text-center py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition"
                  >
                    View Product Details →
                  </LocalizedClientLink>
                </div>

                {/* Pesticide Card */}
                <div className="bg-emerald-900/80 rounded-2xl p-4 border border-emerald-700/70">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-200 uppercase tracking-wider mb-2">
                    <span>🛡️</span>
                    <span>Preventive Bio-Pesticide</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">
                    {currentCrop.recommendedPesticide}
                  </h4>
                  <div className="mt-2 pt-2 border-t border-emerald-800 flex justify-between items-center text-xs">
                    <span className="text-emerald-300">Required Quantity:</span>
                    <span className="font-black text-amber-300">
                      {acreage * 2} - {acreage * 3} {currentCrop.pestType === "Powder" ? "Kg" : "Litres"}
                    </span>
                  </div>
                  <LocalizedClientLink
                    href={`/products/${currentCrop.pestHandle}`}
                    className="mt-3 block text-center py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition"
                  >
                    View Product Details →
                  </LocalizedClientLink>
                </div>
              </div>

              {/* Schedule & Guidelines */}
              <div className="bg-emerald-900/50 rounded-2xl p-4 border border-emerald-800 text-xs space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <span>📅 Application Timing & Method:</span>
                </div>
                <p className="text-emerald-100/90 leading-relaxed font-normal">
                  {currentCrop.applicationSchedule}
                </p>
                <p className="text-emerald-300 leading-relaxed font-medium pt-1 border-t border-emerald-800/60">
                  {currentCrop.applicationScheduleKn}
                </p>
              </div>

              {/* Expected Yield Boost */}
              <div className="flex items-center gap-2 text-xs text-emerald-200 bg-emerald-900/40 p-3 rounded-xl">
                <span>✨</span>
                <span><strong>Impact:</strong> {currentCrop.benefits}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 mt-6 border-t border-emerald-800/80 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-emerald-300">
                ✓ Delivered directly to farm with usage instruction manual
              </span>
              <LocalizedClientLink
                href="/store"
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black rounded-xl text-xs shadow-lg transition-all hover:scale-105"
              >
                Shop Recommended Bio Pack →
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
