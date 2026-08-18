"use server"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"
import { MOCK_COLLECTIONS } from "./mock-data"

export const retrieveCollection = async (id: string) => {
  const next = {
    ...(await getCacheOptions("collections")),
  }

  return await sdk.client
    .fetch<{ collection: HttpTypes.StoreCollection }>(
      `/store/collections/${id}`,
      {
        next,
        cache: "force-cache",
      }
    )
    .then(({ collection }) => collection || MOCK_COLLECTIONS.find((c) => c.id === id) || null)
    .catch(() => {
      return MOCK_COLLECTIONS.find((c) => c.id === id) || null
    })
}

export const listCollections = async (
  queryParams: Record<string, string> = {}
): Promise<{ collections: HttpTypes.StoreCollection[]; count: number }> => {
  const next = {
    ...(await getCacheOptions("collections")),
  }

  queryParams.limit = queryParams.limit || "100"
  queryParams.offset = queryParams.offset || "0"

  return await sdk.client
    .fetch<{ collections: HttpTypes.StoreCollection[]; count: number }>(
      "/store/collections",
      {
        query: queryParams,
        next,
        cache: "force-cache",
      }
    )
    .then(({ collections }) => {
      if (collections && collections.length > 0) {
        return { collections, count: collections.length }
      }
      return { collections: MOCK_COLLECTIONS, count: MOCK_COLLECTIONS.length }
    })
    .catch(() => {
      return { collections: MOCK_COLLECTIONS, count: MOCK_COLLECTIONS.length }
    })
}

export const getCollectionByHandle = async (
  handle: string
): Promise<HttpTypes.StoreCollection | null> => {
  const next = {
    ...(await getCacheOptions("collections")),
  }

  return await sdk.client
    .fetch<HttpTypes.StoreCollectionListResponse>(`/store/collections`, {
      query: { handle, fields: "*products" },
      next,
      cache: "force-cache",
    })
    .then(({ collections }) => collections[0] || MOCK_COLLECTIONS.find((c) => c.handle === handle) || null)
    .catch(() => {
      return MOCK_COLLECTIONS.find((c) => c.handle === handle) || null
    })
}

