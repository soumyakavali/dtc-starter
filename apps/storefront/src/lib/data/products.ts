"use server"

import { OptionValueIds } from "@lib/util/product-option-filters"
import { sortProducts } from "@lib/util/sort-products"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { MOCK_PRODUCTS } from "./mock-data"

type ProductListQueryParams = (HttpTypes.FindParams &
  HttpTypes.StoreProductListParams) & {
  options?: string[]
  option_value_id?: string | string[]
}

const getFilteredMockProducts = (queryParams?: ProductListQueryParams) => {
  let list = [...MOCK_PRODUCTS]
  if (!queryParams) return list

  if (queryParams.handle) {
    const targetHandle = queryParams.handle.toLowerCase()
    list = list.filter((p) => {
      const ph = p.handle.toLowerCase()
      return (
        ph === targetHandle ||
        targetHandle.includes(ph) ||
        ph.includes(targetHandle) ||
        (targetHandle.includes("trichoderma") && ph.includes("trichoderma") && (targetHandle.includes("pow") ? ph.includes("pow") : ph.includes("liq"))) ||
        (targetHandle.includes("pseudomonas") && ph.includes("pseudomonas") && (targetHandle.includes("pow") ? ph.includes("pow") : ph.includes("liq"))) ||
        (targetHandle.includes("metarhizium") && ph.includes("metarhizium") && (targetHandle.includes("pow") ? ph.includes("pow") : ph.includes("liq"))) ||
        (targetHandle.includes("vam") && ph.includes("vam")) ||
        (targetHandle.includes("paecilomyces") && ph.includes("paecilomyces")) ||
        ((targetHandle.includes("soil") || targetHandle.includes("decomposer") || targetHandle.includes("compost")) && (ph.includes("soil") || ph.includes("decomposer") || ph.includes("compost"))) ||
        (targetHandle.includes("npk") && ph.includes("npk"))
      )
    })
  }
  if (queryParams.id) {
    const ids = Array.isArray(queryParams.id) ? queryParams.id : [queryParams.id]
    list = list.filter((p) => ids.includes(p.id))
  }
  if (queryParams.collection_id) {
    const colIds = Array.isArray(queryParams.collection_id)
      ? queryParams.collection_id
      : [queryParams.collection_id]
    list = list.filter((p) => p.collection_id && colIds.includes(p.collection_id))
  }
  if (queryParams.category_id) {
    const catIds = Array.isArray(queryParams.category_id)
      ? queryParams.category_id
      : [queryParams.category_id]
    list = list.filter((p) =>
      p.categories?.some(
        (c) => catIds.includes(c.id) || (c.handle && catIds.includes(c.handle))
      )
    )
  }
  return list
}

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode: _countryCode,
  regionId: _regionId,
}: {
  pageParam?: number
  queryParams?: ProductListQueryParams
  countryCode?: string
  regionId?: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: ProductListQueryParams
}> => {
  const limit = queryParams?.limit || 12
  const _pageParam = Math.max(pageParam, 1)
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit

  const fallbackResult = () => {
    const filtered = getFilteredMockProducts(queryParams)
    const paginated = filtered.slice(offset, offset + limit)
    const nextPage = filtered.length > offset + limit ? pageParam + 1 : null
    return {
      response: {
        products: paginated,
        count: filtered.length,
      },
      nextPage,
      queryParams,
    }
  }

  return fallbackResult()
}

export const getProductByHandle = async (
  handle: string,
  _regionId?: string
): Promise<{ product: HttpTypes.StoreProduct | null }> => {
  const norm = handle.toLowerCase().replace(/_/g, "-")
  const matched =
    MOCK_PRODUCTS.find((p) => {
      const ph = p.handle.toLowerCase()
      return (
        ph === norm ||
        norm.includes(ph) ||
        ph.includes(norm) ||
        (norm.includes("trichoderma") && norm.includes("pow") && ph.includes("trichoderma") && ph.includes("pow")) ||
        (norm.includes("trichoderma") && norm.includes("liq") && ph.includes("trichoderma") && ph.includes("liq")) ||
        (norm.includes("pseudomonas") && norm.includes("pow") && ph.includes("pseudomonas") && ph.includes("pow")) ||
        (norm.includes("pseudomonas") && norm.includes("liq") && ph.includes("pseudomonas") && ph.includes("liq")) ||
        (norm.includes("metarhizium") && norm.includes("pow") && ph.includes("metarhizium") && ph.includes("pow")) ||
        (norm.includes("metarhizium") && norm.includes("liq") && ph.includes("metarhizium") && ph.includes("liq")) ||
        (norm.includes("vam") && ph.includes("vam")) ||
        (norm.includes("paecilomyces") && ph.includes("paecilomyces")) ||
        ((norm.includes("soil") || norm.includes("decomposer") || norm.includes("compost")) && (ph.includes("soil") || ph.includes("decomposer") || ph.includes("compost"))) ||
        (norm.includes("npk") && ph.includes("npk"))
      )
    }) || null

  return { product: matched }
}

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
  page = 0,
  queryParams,
  sortBy = "created_at",
  countryCode,
  optionValueIds,
}: {
  page?: number
  queryParams?: ProductListQueryParams
  sortBy?: SortOptions
  countryCode: string
  optionValueIds?: OptionValueIds
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: ProductListQueryParams
}> => {
  const limit = queryParams?.limit || 12
  const optionFilters = Array.from(
    new Set((optionValueIds || []).filter(Boolean))
  )

  const {
    response: { products },
  } = await listProducts({
    pageParam: 0,
    queryParams: {
      ...queryParams,
      ...(optionFilters.length ? { option_value_id: optionFilters } : {}),
      limit: 100,
    },
    countryCode,
  })

  const sortedProducts = sortProducts(products, sortBy)

  const pageParam = (page - 1) * limit

  const filteredCount = products.length

  const nextPage = filteredCount > pageParam + limit ? pageParam + limit : null

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit)

  return {
    response: {
      products: paginatedProducts,
      count: filteredCount,
    },
    nextPage,
    queryParams,
  }
}
