"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders, getCacheOptions, getLastOrderData } from "./cookies"
import { HttpTypes } from "@medusajs/types"
import { DEMO_ORDERS } from "./mock-data"

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
  const lastOrder = await getLastOrderData(id)
  if (lastOrder && (lastOrder.id === id || String(lastOrder.display_id) === id)) {
    return lastOrder
  }

  // Check demo orders
  const demoOrder = DEMO_ORDERS.find(
    (o) => o.id === id || String(o.display_id) === id
  )
  if (demoOrder) {
    return demoOrder
  }

  return lastOrder || null
}

export const listOrders = async (
  limit: number = 10,
  offset: number = 0,
  filters?: Record<string, unknown>
) => {
  let backendOrders: HttpTypes.StoreOrder[] = []
  try {
    const headers = {
      ...(await getAuthHeaders()),
    }

    const next = {
      ...(await getCacheOptions("orders")),
    }

    backendOrders = await sdk.client
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
    backendOrders = []
  }

  const lastOrder = await getLastOrderData()
  const combined: HttpTypes.StoreOrder[] = [...backendOrders]

  if (lastOrder && !combined.some((o) => o.id === lastOrder.id)) {
    combined.unshift(lastOrder)
  }

  DEMO_ORDERS.forEach((demo) => {
    if (!combined.some((o) => o.id === demo.id)) {
      combined.push(demo)
    }
  })

  return combined.slice(offset, offset + limit)
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
