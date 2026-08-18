import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const isLiquid =
    product.handle?.includes("liquid") ||
    product.collection_id === "col_liquid" ||
    product.title?.toLowerCase().includes("liquid")

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group flex flex-col h-full bg-white rounded-2xl border border-emerald-100/80 hover:border-emerald-400 hover:shadow-xl transition-all duration-200 p-3 sm:p-4"
    >
      <div data-testid="product-wrapper" className="flex flex-col h-full">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
          handle={product.handle || ""}
          title={product.title}
        />

        <div className="flex flex-col flex-1 justify-between mt-3 space-y-2">
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <span
                className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-md ${
                  isLiquid
                    ? "bg-amber-100 text-amber-900 border border-amber-200"
                    : "bg-emerald-100 text-emerald-900 border border-emerald-200"
                }`}
              >
                {isLiquid ? "🧪 1 ಲೀಟರ್ ಲಿಕ್ವಿಡ್ (@ ₹350)" : "📦 1 ಕೆಜಿ ಪೌಡರ್ (@ ₹150)"}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                100% ಸಾವಯವ
              </span>
            </div>

            <h3
              className="text-sm sm:text-base font-extrabold text-gray-900 line-clamp-2 group-hover:text-emerald-700 transition-colors"
              data-testid="product-title"
            >
              {product.title}
            </h3>

            {product.subtitle && (
              <p className="text-xs text-gray-600 line-clamp-2 mt-1 leading-snug font-medium">
                {product.subtitle}
              </p>
            )}
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between mt-auto">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block">
                ಬೆಲೆ / Price
              </span>
              <div className="flex items-center gap-x-2">
                {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
              </div>
            </div>

            <span className="bg-emerald-700 group-hover:bg-emerald-800 text-white text-xs font-extrabold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-xs">
              ಖರೀದಿಸಿ →
            </span>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
