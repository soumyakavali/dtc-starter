import { Suspense } from "react"

import { OptionValueIds } from "@lib/util/product-option-filters"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  optionValueIds,
  searchQuery,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
  searchQuery?: string | string[]
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const qStr = typeof searchQuery === "string" ? searchQuery : searchQuery?.[0]

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      <RefinementList sortBy={sort} hideSortBy={true} />
      <div className="w-full">
        <div className="mb-8 text-2xl-semi flex items-center justify-between">
          <h1 data-testid="store-page-title">
            {qStr ? `Search Results for "${qStr}"` : "All products"}
          </h1>
          {qStr && (
            <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium">
              Keyword: {qStr}
            </span>
          )}
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            optionValueIds={optionValueIds}
            searchQuery={qStr}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
