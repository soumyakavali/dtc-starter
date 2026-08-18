import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct & {
    metadata?: Record<string, string>
  }
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const isLiquid =
    product.handle?.includes("liquid") ||
    product.collection_id === "col_liquid" ||
    product.title?.toLowerCase().includes("liquid")

  return (
    <div id="product-info" className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 hover:bg-emerald-200 transition-colors"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            isLiquid
              ? "bg-amber-100 text-amber-900 border border-amber-200"
              : "bg-emerald-50 text-emerald-800 border border-emerald-200"
          }`}
        >
          {isLiquid ? "🧪 1 ಲೀಟರ್ ಲಿಕ್ವಿಡ್ (@ ₹350)" : "📦 1 ಕೆಜಿ ಪೌಡರ್ (@ ₹150)"}
        </span>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
          ✓ BioTill Certified
        </span>
      </div>

      <div>
        <Heading
          level="h1"
          className="text-2xl sm:text-3xl font-extrabold text-gray-950 leading-tight"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        {product.subtitle && (
          <p className="text-sm font-semibold text-emerald-800 mt-2 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100">
            {product.subtitle}
          </p>
        )}
      </div>

      <div className="pt-2">
        <Text
          className="text-sm text-gray-700 leading-relaxed whitespace-pre-line"
          data-testid="product-description"
        >
          {product.description}
        </Text>
      </div>

      <div className="flex items-center gap-4 py-3 px-4 bg-gray-50 rounded-xl border border-gray-200">
        <div className="text-2xl">🚜</div>
        <div className="text-xs text-gray-700">
          <p className="font-bold text-gray-900">ರೈತರಿಗೆ ನೇರ ತಲುಪಿಸುವಿಕೆ (Direct Delivery)</p>
          <p className="text-gray-500">ಮನೆ ಬಾಗಿಲಿಗೆ ಸುರಕ್ಷಿತ ಪಾರ್ಸೆಲ್ • ಸುಲಭ ಆನ್‌ಲೈನ್ ಆರ್ಡರ್</p>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
