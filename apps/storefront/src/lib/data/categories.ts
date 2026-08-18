import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"
import { MOCK_CATEGORIES } from "./mock-data"

export const listCategories = async (query?: Record<string, unknown>) => {
  const next = {
    ...(await getCacheOptions("categories")),
  }

  const limit = query?.limit || 100

  return sdk.client
    .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>(
      "/store/product-categories",
      {
        query: {
          fields:
            "*category_children, *products, *parent_category, *parent_category.parent_category",
          limit,
          ...query,
        },
        next,
        cache: "force-cache",
      }
    )
    .then(({ product_categories }) => {
      if (product_categories && product_categories.length > 0) {
        return product_categories
      }
      return MOCK_CATEGORIES
    })
    .catch(() => {
      return MOCK_CATEGORIES
    })
}

export const getCategoryByHandle = async (categoryHandle: string[]) => {
  const handle = `${categoryHandle.join("/")}`

  const next = {
    ...(await getCacheOptions("categories")),
  }

  return sdk.client
    .fetch<HttpTypes.StoreProductCategoryListResponse>(
      `/store/product-categories`,
      {
        query: {
          fields: "*category_children, *products",
          handle,
        },
        next,
        cache: "force-cache",
      }
    )
    .then(({ product_categories }) => {
      return (
        product_categories[0] ||
        MOCK_CATEGORIES.find((c) => c.handle === categoryHandle[categoryHandle.length - 1]) ||
        null
      )
    })
    .catch(() => {
      return (
        MOCK_CATEGORIES.find((c) => c.handle === categoryHandle[categoryHandle.length - 1]) ||
        null
      )
    })
}

