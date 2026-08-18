"use client"

import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"
import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct & {
    metadata?: Record<string, string>
  }
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const metadata = (product.metadata || {}) as Record<string, string>

  const isLiquid =
    product.handle?.includes("liquid") ||
    product.collection_id === "col_liquid" ||
    product.title?.toLowerCase().includes("liquid")

  const tabs = [
    {
      label: "🌿 ಬಳಕೆಯ ವಿಧಾನ & ಡೋಸೇಜ್ (How to Use & Dosage)",
      component: (
        <ApplicationGuideTab product={product} isLiquid={isLiquid} metadata={metadata} />
      ),
    },
    {
      label: "🎯 ಉಪಯೋಗಗಳು & ರೋಗ ನಿಯಂತ್ರಣ (Benefits & Target Problems)",
      component: (
        <BenefitsTab product={product} isLiquid={isLiquid} metadata={metadata} />
      ),
    },
    {
      label: "🌾 ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆಗಳು (Recommended Crops)",
      component: <CropsTab metadata={metadata} />,
    },
    {
      label: "🚚 ನೇರ ಮನೆ ಬಾಗಿಲಿಗೆ ಡೆಲಿವರಿ (Direct Farm Delivery)",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ApplicationGuideTab = ({
  product: _product,
  isLiquid,
  metadata,
}: {
  product: HttpTypes.StoreProduct
  isLiquid: boolean
  metadata: Record<string, string>
}) => {
  const defaultDosage = isLiquid
    ? "ಹನಿ ನೀರಾವರಿಗೆ (ಡ್ರಿಪ್): 1 ಲೀಟರ್ / ಎಕರೆಗೆ; ಸಿಂಪಡಣೆಗೆ: 5 ಮಿಲಿ / 1 ಲೀಟರ್ ನೀರಿಗೆ"
    : "ಬೀಜೋಪಚಾರ: 10 ಗ್ರಾಂ / ಕೆಜಿ ಬೀಜ; ಮಣ್ಣು ಸಂಸ್ಕರಣೆ: 2-4 ಕೆಜಿ / ಎಕರೆಗೆ 100-200 ಕೆಜಿ ಕಾಂಪೋಸ್ಟ್ ಅಥವಾ ತಿಪ್ಪೆ ಗೊಬ್ಬರದಲ್ಲಿ ಮಿಶ್ರಣ"

  const defaultGuide = isLiquid
    ? "1. ಹನಿ ನೀರಾವರಿ (Drip): 1 ಲೀಟರ್ ದ್ರಾವಣವನ್ನು ವೆಂಚುರಿ ಅಥವಾ ಫರ್ಟಿಗೇಶನ್ ಟ್ಯಾಂಕ್ ಮೂಲಕ ಬೆಳೆಗೆ ಹಾಯಿಸಿ. 2. ಸಿಂಪಡಣೆ (Foliar Spray): 5 ಮಿಲಿ ಪ್ರತಿ ಲೀಟರ್ ಶುದ್ಧ ನೀರಿಗೆ ಬೆರೆಸಿ ಎಲೆಗಳ ಎರಡೂ ಬದಿಗೂ ತಾಕುವಂತೆ ಸಂಜೆ ವೇಳೆ ಸಿಂಪಡಿಸಿ."
    : "1. ಬೀಜೋಪಚಾರ: ಪ್ರತಿ ಕೆಜಿ ಬೀಜಕ್ಕೆ 10 ಗ್ರಾಂ ಪುಡಿಯನ್ನು ಬೆಲ್ಲದ ನೀರಿನೊಂದಿಗೆ ಮಿಶ್ರಣ ಮಾಡಿ ನೆರಳಿನಲ್ಲಿ ಒಣಗಿಸಿ ಬಿತ್ತನೆ ಮಾಡಿ. 2. ಮಣ್ಣು ಸಂಸ್ಕರಣೆ: 2-4 ಕೆಜಿ ಪುಡಿಯನ್ನು 100-200 ಕೆಜಿ ಕಳಿತ ತಿಪ್ಪೆ ಗೊಬ್ಬರ/ಎರೆಹುಳು ಗೊಬ್ಬರದಲ್ಲಿ ಬೆರೆಸಿ, 5-7 ದಿನ ತೇವಾಂಶ ಕಾಪಾಡಿ ನಂತರ ಗಿಡಗಳ ಬೇರುಗಳ ಹತ್ತಿರ ಹಾಕಿ."

  return (
    <div className="text-small-regular py-4 space-y-4">
      <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100">
        <span className="font-bold text-emerald-900 block text-xs uppercase tracking-wide mb-1">
          🧪 ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ರಮಾಣ (Recommended Dosage)
        </span>
        <p className="text-emerald-950 font-medium leading-relaxed">
          {metadata.dosage || defaultDosage}
        </p>
      </div>

      <div className="space-y-2">
        <span className="font-bold text-gray-900 block text-xs uppercase tracking-wide">
          📝 ಬಳಸುವ ವಿಧಾನ (Step-by-Step Application)
        </span>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {metadata.application_guide || defaultGuide}
        </p>
      </div>

      <div className="text-xs text-gray-500 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
        ⚠️ <strong>ರೈತ ಬಾಂಧವರ ಗಮನಕ್ಕೆ:</strong> ಜೈವಿಕ ಉತ್ಪನ್ನಗಳನ್ನು ಯಾವುದೇ ರಾಸಾಯನಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ ಅಥವಾ ಕೀಟನಾಶಕಗಳ ಜೊತೆ ನೇರವಾಗಿ ಬೆರೆಸಬೇಡಿ. ಕನಿಷ್ಠ 5-7 ದಿನಗಳ ಅಂತರವಿರಲಿ.
      </div>
    </div>
  )
}

const BenefitsTab = ({
  product,
  isLiquid,
  metadata,
}: {
  product: HttpTypes.StoreProduct
  isLiquid: boolean
  metadata: Record<string, string>
}) => {
  return (
    <div className="text-small-regular py-4 space-y-3">
      <div className="grid grid-cols-1 gap-2.5">
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
          <span className="font-semibold text-gray-900 text-xs block text-emerald-800">
            🎯 ಉದ್ದೇಶಿತ ನಿಯಂತ್ರಣ / Target Protection:
          </span>
          <p className="text-gray-700 mt-1">
            {metadata.target_disease || product.subtitle || "ಮಣ್ಣು ಮತ್ತು ಬೆಳೆಯ ಸಮಗ್ರ ರಕ್ಷಣೆ"}
          </p>
        </div>

        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
          <span className="font-semibold text-gray-900 text-xs block text-emerald-800">
            🔬 ವೈಜ್ಞಾನಿಕ ಸೂತ್ರ (Scientific Specification):
          </span>
          <p className="text-gray-700 mt-1 font-mono text-xs">
            {metadata.scientific_name ||
              (isLiquid
                ? "BioTill High-Count Liquid Fermentation (1x10^8 CFU/ml)"
                : "BioTill High-Grade Microbially Enriched Carrier (2x10^6 CFU/g min)")}
          </p>
        </div>

        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
          <span className="font-semibold text-gray-900 text-xs block text-emerald-800">
            ✅ ಪ್ರಮುಖ ಪ್ರಯೋಜನಗಳು (Key Advantages):
          </span>
          <ul className="list-disc list-inside text-gray-700 mt-1 space-y-1 text-xs">
            <li>100% ಶುದ್ಧ ನೈಸರ್ಗಿಕ ಮತ್ತು ಪರಿಸರಸ್ನೇಹಿ ಜೈವಿಕ ಉತ್ಪನ್ನ.</li>
            <li>ಮಣ್ಣಿನ ಫಲವತ್ತತೆ ಮತ್ತು ಸೂಕ್ಷ್ಮಾಣುಜೀವಿಗಳ ಸಂಖ್ಯೆಯನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.</li>
            <li>ಗಿಡದಲ್ಲಿ ನೈಸರ್ಗಿಕ ರೋಗನಿರೋಧಕ ಶಕ್ತಿಯನ್ನು ಬಲಪಡಿಸುತ್ತದೆ.</li>
            <li>ಬೆಳೆಯ ಇಳುವರಿ ಮತ್ತು ಗುಣಮಟ್ಟವನ್ನು ಗಣನೀಯವಾಗಿ ಹೆಚ್ಚಿಸುತ್ತದೆ.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const CropsTab = ({ metadata }: { metadata: Record<string, string> }) => {
  const suitableCrops =
    metadata.suitable_crops ||
    "ಅಡಿಕೆ, ತೆಂಗು, ಕಾಳುಮೆಣಸು, ಏಲಕ್ಕಿ, ಶುಂಠಿ, ಅರಿಶಿನ, ಭತ್ತ, ಕಬ್ಬು, ಹತ್ತಿ, ಮೆಕ್ಕೆಜೋಳ, ದಾಳಿಂಬೆ, ಬಾಳೆ, ಮಾವು, ಪಪ್ಪಾಯ, ಟೊಮ್ಯಾಟೊ, ಮೆಣಸಿನಕಾಯಿ, ಬದನೆ, ಈರುಳ್ಳಿ ಹಾಗೂ ಎಲ್ಲಾ ತರಕಾರಿ, ಹೂವು ಮತ್ತು ತೋಟಗಾರಿಕಾ ಬೆಳೆಗಳು."

  return (
    <div className="text-small-regular py-4 space-y-3">
      <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
        <p className="text-gray-800 leading-relaxed font-medium">
          {suitableCrops}
        </p>
      </div>
      <p className="text-xs text-gray-500">
        ಈ ಉತ್ಪನ್ನವು ಎಲ್ಲಾ ಬಗೆಯ ಮಣ್ಣು (ಕೆಂಪು ಮಣ್ಣು, ಕಪ್ಪು ಮಣ್ಣು, ಮರಳು ಮಿಶ್ರಿತ ಮಣ್ಣು) ಹಾಗೂ ಹವಾಮಾನಕ್ಕೆ ಸೂಕ್ತವಾಗಿದೆ.
      </p>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-4 space-y-4">
      <div className="flex items-start gap-x-3">
        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-800">
          <FastDelivery />
        </div>
        <div>
          <span className="font-bold text-gray-900 text-sm">
            ನೇರ ತೋಟಕ್ಕೆ/ಮನೆಗೆ ಡೆಲಿವರಿ (Direct Farm Dispatch)
          </span>
          <p className="text-xs text-gray-600 mt-0.5">
            ಕರ್ನಾಟಕ ಮತ್ತು ಭಾರತದಾದ್ಯಂತ 3-5 ಕೆಲಸದ ದಿನಗಳಲ್ಲಿ ನಿಮ್ಮ ಊರಿಗೆ ಅಥವಾ ತೋಟಕ್ಕೆ ಸುರಕ್ಷಿತವಾಗಿ ತಲುಪಿಸಲಾಗುವುದು.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-x-3">
        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-800">
          <Refresh />
        </div>
        <div>
          <span className="font-bold text-gray-900 text-sm">
            100% ಶುದ್ಧ ಗುಣಮಟ್ಟದ ಗ್ಯಾರಂಟಿ (100% Quality Guaranteed)
          </span>
          <p className="text-xs text-gray-600 mt-0.5">
            BIOTILL AGRI PRIVATE LIMITED ನ ಸರ್ಟಿಫೈಡ್ ಜೈವಿಕ ಉತ್ಪನ್ನಗಳು. ಯಾವುದೇ ಡ್ಯಾಮೇಜ್ ಅಥವಾ ತೊಂದರೆಯಾದಲ್ಲಿ ತಕ್ಷಣ ಬದಲಿ ಉತ್ಪನ್ನ ನೀಡಲಾಗುತ್ತದೆ.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
