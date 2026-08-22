import { Metadata } from "next"
import DosageCalculator from "@modules/home/components/dosage-calculator"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Crop Advisory & Bio-Input Dosage Calculator | BioTill Biotech",
  description:
    "Accurately calculate bio-fertilizer and biopesticide requirement per acre for Sugarcane, Paddy, Cotton, Arecanut, Vegetables, and Banana crops.",
}

export default async function CalculatorPage() {
  return (
    <div className="w-full bg-white font-sans py-8">
      <div className="content-container">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-6">
          <LocalizedClientLink href="/" className="hover:text-emerald-700">
            Home
          </LocalizedClientLink>
          <span>/</span>
          <span className="text-emerald-900 font-bold">Crop Dosage Calculator</span>
        </nav>

        {/* Page Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-white rounded-2xl p-6 sm:p-10 mb-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-3">
              🌾 Farmer Advisory Tool • ಕೃಷಿ ಸಲಹಾ ಸಾಧನ
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Crop Dosage & Acreage Advisory Calculator
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Select your crop and total farm land acreage to instantly calculate recommended bio-fertilizers,
              biopesticides, and step-by-step application schedule.
            </p>
          </div>
          <div className="absolute right-4 bottom-0 opacity-15 sm:opacity-25 text-8xl sm:text-9xl pointer-events-none select-none">
            🧮
          </div>
        </div>

        {/* Dosage Calculator Component */}
        <DosageCalculator />
      </div>
    </div>
  )
}
