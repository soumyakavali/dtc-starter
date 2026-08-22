"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders, getCacheOptions, getLastOrderData } from "./cookies"
import { HttpTypes } from "@medusajs/types"

export const retrieveOrder = async (id: string) => {
  try {
    const headers = {
      ...(await getAuthHeaders()),
    }

    const next = {
      ...(await getCacheOptions("orders")),
    }

    const res = await sdk.client
      .fetch<HttpTypes.StoreOrderResponse>(`/store/orders/${id}`, {
        method: "GET",
        query: {
          fields:
            "*payment_collections.payments,*items,*items.metadata,*items.variant,*items.product",
        },
        headers,
        next,
        cache: "force-cache",
      })
      .then(({ order }) => order)
      .catch(() => null)

    if (res && res.id) {
      return res
    }
  } catch {
    // continue to local fallback
  }

  // Fallback to locally placed order
  return await getLastOrderData(id)
}

export const listOrders = async (
  limit: number = 10,
  offset: number = 0,
  filters?: Record<string, unknown>
) => {
  try {
    const headers = {
      ...(await getAuthHeaders()),
    }

    const next = {
      ...(await getCacheOptions("orders")),
    }

    return await sdk.client
      .fetch<HttpTypes.StoreOrderListResponse>(`/store/orders`, {
        method: "GET",
        query: {
          limit,
          offset,
          order: "-created_at",
          fields: "*items,+items.metadata,*items.variant,*items.product",
          ...filters,
        },
        headers,
        next,
        cache: "force-cache",
      })
      .then(({ orders }) => orders || [])
      .catch(() => [])
  } catch {
    return []
  }
}

export const createTransferRequest = async (
  state: {
    success: boolean
    error: string | null
    order: HttpTypes.StoreOrder | null
  },
  formData: FormData
): Promise<{
  success: boolean
  error: string | null
  order: HttpTypes.StoreOrder | null
}> => {
  const id = formData.get("order_id") as string

  if (!id) {
    return { success: false, error: "Order ID is required", order: null }
  }

  const headers = await getAuthHeaders()

  return await sdk.store.order
    .requestTransfer(
      id,
      {},
      {
        fields: "id, email",
      },
      headers
    )
    .then(({ order }) => ({ success: true, error: null, order }))
    .catch((err) => ({ success: false, error: err.message, order: null }))
}

export const acceptTransferRequest = async (id: string, token: string) => {
  const headers = await getAuthHeaders()

  return await sdk.store.order
    .acceptTransfer(id, { token }, {}, headers)
    .then(({ order }) => ({ success: true, error: null, order }))
    .catch((err) => ({ success: false, error: err.message, order: null }))
}

export const declineTransferRequest = async (id: string, token: string) => {
  const headers = await getAuthHeaders()

  return await sdk.store.order
    .declineTransfer(id, { token }, {}, headers)
    .then(({ order }) => ({ success: true, error: null, order }))
    .catch((err) => ({ success: false, error: err.message, order: null }))
}
