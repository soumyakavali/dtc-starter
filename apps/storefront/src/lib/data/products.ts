"use server"

import { sdk } from "@lib/config"
import { OptionValueIds } from "@lib/util/product-option-filters"
import { sortProducts } from "@lib/util/sort-products"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { getRegion, retrieveRegion } from "./regions"
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
    list = list.filter((p) => p.handle === queryParams.handle)
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
    list = list.filter((p) => p.categories?.some((c) => catIds.includes(c.id)))
  }
  return list
}

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
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

  let region: HttpTypes.StoreRegion | undefined | null

  if (countryCode) {
    region = await getRegion(countryCode)
  } else if (regionId) {
    region = await retrieveRegion(regionId)
  }

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

  try {
    const headers = {
      ...(await getAuthHeaders()),
    }

    const next = {
      ...(await getCacheOptions("products")),
    }

    return await sdk.client
      .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
        `/store/products`,
        {
          method: "GET",
          query: {
            limit,
            offset,
            region_id: region?.id,
            fields:
              "*variants.calculated_price,+variants.inventory_quantity,*variants.images,*variants.options,+metadata,+tags,",
            ...queryParams,
          },
          headers,
          next,
          cache: "force-cache",
        }
      )
      .then(({ products, count }) => {
        if (products && products.length > 0) {
          const nextPage = count > offset + limit ? pageParam + 1 : null
          return {
            response: {
              products,
              count,
            },
            nextPage: nextPage,
            queryParams,
          }
        }
        return fallbackResult()
      })
      .catch(() => {
        return fallbackResult()
      })
  } catch {
    return fallbackResult()
  }
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
