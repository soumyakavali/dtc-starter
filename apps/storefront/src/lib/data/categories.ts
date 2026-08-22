import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"
import { MOCK_CATEGORIES } from "./mock-data"

export type CategoryFilterItem = {
  id: string
  name: string
  nameKn: string
  handle: string
  icon: string
  badge?: string
  count?: number
}

export const STORE_CATEGORIES: CategoryFilterItem[] = [
  {
    id: "all",
    name: "All Bio Products",
    nameKn: "ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು",
    handle: "all",
    icon: "🌿",
    badge: "10 Products",
    count: 10,
  },
  {
    id: "cat_bio_fertilizers",
    name: "Bio-Fertilizers & VAM",
    nameKn: "ಜೈವಿಕ ಗೊಬ್ಬರ & ವ್ಯಾಮ್",
    handle: "bio-fertilizers",
    icon: "🌾",
    badge: "NPK + VAM",
    count: 2,
  },
  {
    id: "cat_bio_pesticides",
    name: "Bio-Pesticides & Insecticides",
    nameKn: "ಜೈವಿಕ ಕೀಟನಾಶಕಗಳು",
    handle: "bio-pesticides",
    icon: "🛡️",
    badge: "Grub / Termite",
    count: 2,
  },
  {
    id: "cat_bio_fungicides",
    name: "Bio-Fungicides & Bactericides",
    nameKn: "ಶಿಲೀಂಧ್ರ & ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕ",
    handle: "bio-fungicides",
    icon: "🧪",
    badge: "Root Rot / Wilt",
    count: 4,
  },
  {
    id: "cat_bio_decomposers",
    name: "Bio-Decomposers & Nematicides",
    nameKn: "ಡಿಕಂಪೋಸರ್ & ನೆಮಟೋಡ್",
    handle: "bio-decomposers",
    icon: "🍂",
    badge: "Waste & Worms",
    count: 2,
  },
  {
    id: "cat_powder",
    name: "Powder Formulations",
    nameKn: "ಪೌಡರ್ ಉತ್ಪನ್ನಗಳು (1 Kg)",
    handle: "powder-products",
    icon: "📦",
    badge: "₹150 / Kg",
    count: 6,
  },
  {
    id: "cat_liquid",
    name: "Liquid Formulations",
    nameKn: "ಲಿಕ್ವಿಡ್ ಉತ್ಪನ್ನಗಳು (1 L)",
    handle: "liquid-products",
    icon: "💧",
    badge: "₹350 / L",
    count: 4,
  },
]

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
      if (product_categories && product_categories.length >= MOCK_CATEGORIES.length) {
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
  const targetHandle = categoryHandle[categoryHandle.length - 1]

  const next = {
    ...(await getCacheOptions("categories")),
  }

  const fallbackCat = MOCK_CATEGORIES.find((c) => c.handle === targetHandle || c.handle === handle) || null

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
        product_categories?.[0] ||
        fallbackCat
      )
    })
    .catch(() => {
      return fallbackCat
    })
}
