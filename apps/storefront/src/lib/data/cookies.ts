import "server-only"
import { cookies as nextCookies } from "next/headers"
import { compressCartData, hydrateCartData } from "./cart-helpers"

export const getAuthHeaders = async (): Promise<
  { authorization: string } | Record<string, never>
> => {
  try {
    const cookies = await nextCookies()
    const token = cookies.get("_medusa_jwt")?.value

    if (!token) {
      return {}
    }

    return { authorization: `Bearer ${token}` }
  } catch {
    return {}
  }
}

export const getCacheTag = async (tag: string): Promise<string> => {
  try {
    const cookies = await nextCookies()
    const cacheId = cookies.get("_medusa_cache_id")?.value

    if (!cacheId) {
      return ""
    }

    return `${tag}-${cacheId}`
  } catch {
    return ""
  }
}

export const getCacheOptions = async (
  tag: string
): Promise<{ tags: string[] } | Record<string, never>> => {
  if (typeof window !== "undefined") {
    return {}
  }

  const cacheTag = await getCacheTag(tag)

  if (!cacheTag) {
    return {}
  }

  return { tags: [`${cacheTag}`] }
}

export const setAuthToken = async (token: string) => {
  const cookies = await nextCookies()
  cookies.set("_medusa_jwt", token, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  })
}

export const removeAuthToken = async () => {
  try {
    const cookies = await nextCookies()
    cookies.delete("_medusa_jwt")
    cookies.set("_medusa_jwt", "", {
      maxAge: -1,
      path: "/",
    })
  } catch {
    // ignore
  }
}

export type PendingCustomer = {
  email: string
  first_name?: string
  last_name?: string
  phone?: string
}

// During the email verification flow the customer record isn't created until
// the customer verifies their email and logs in. We temporarily persist the
// extra signup fields in a cookie so they survive the customer leaving to open
// their inbox, and read them back when creating the customer at login.
export const setPendingCustomer = async (customer: PendingCustomer) => {
  try {
    const cookies = await nextCookies()
    cookies.set("_medusa_pending_customer", JSON.stringify(customer), {
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })
  } catch {
    // ignore
  }
}

export const getPendingCustomer = async (): Promise<PendingCustomer | null> => {
  try {
    const cookies = await nextCookies()
    const value = cookies.get("_medusa_pending_customer")?.value

    if (!value) {
      return null
    }

    return JSON.parse(value) as PendingCustomer
  } catch {
    return null
  }
}

export const removePendingCustomer = async () => {
  try {
    const cookies = await nextCookies()
    cookies.delete("_medusa_pending_customer")
    cookies.set("_medusa_pending_customer", "", {
      maxAge: -1,
      path: "/",
    })
  } catch {
    // ignore
  }
}

let memoryCartId: string | null = null
let memoryLocalCart: HttpTypes.StoreCart | null = null
let memoryLastOrder: HttpTypes.StoreOrder | null = null

export const getCartId = async () => {
  if (memoryCartId) return memoryCartId
  try {
    const cookies = await nextCookies()
    const val = cookies.get("_medusa_cart_id")?.value
    if (val) memoryCartId = val
    return val
  } catch {
    return memoryCartId
  }
}

export const setCartId = async (cartId: string) => {
  memoryCartId = cartId
  try {
    const cookies = await nextCookies()
    cookies.set("_medusa_cart_id", cartId, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })
  } catch {
    // ignore
  }
}

export const removeCartId = async () => {
  memoryCartId = null
  try {
    const cookies = await nextCookies()
    cookies.set("_medusa_cart_id", "", {
      maxAge: -1,
      path: "/",
    })
  } catch {
    // ignore
  }
}

export const getLocalCartData = async (): Promise<HttpTypes.StoreCart | null> => {
  if (memoryLocalCart) return memoryLocalCart
  try {
    const cookies = await nextCookies()
    const value = cookies.get("_medusa_cart_data")?.value
    if (value) {
      const parsed = JSON.parse(decodeURIComponent(value))
      const hydrated = hydrateCartData(parsed)
      memoryLocalCart = hydrated
      return hydrated
    }
    return null
  } catch {
    return null
  }
}

export const setLocalCartData = async (data: Partial<HttpTypes.StoreCart> & Record<string, unknown>) => {
  const hydrated = hydrateCartData(data) || (data as unknown as HttpTypes.StoreCart)
  memoryLocalCart = hydrated
  try {
    const cookies = await nextCookies()
    const compressed = compressCartData(data)
    const jsonStr = encodeURIComponent(JSON.stringify(compressed))
    cookies.set("_medusa_cart_data", jsonStr, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })
  } catch (e) {
    console.error("Failed to set local cart cookie", e)
  }
}

export const removeLocalCartData = async () => {
  memoryLocalCart = null
  try {
    const cookies = await nextCookies()
    cookies.set("_medusa_cart_data", "", {
      maxAge: -1,
      path: "/",
    })
  } catch {
    // ignore
  }
}

export const getLastOrderData = async (orderId?: string): Promise<HttpTypes.StoreOrder | null> => {
  if (memoryLastOrder && (!orderId || memoryLastOrder.id === orderId)) {
    return memoryLastOrder
  }
  try {
    const cookies = await nextCookies()
    const value = cookies.get("_medusa_last_order")?.value
    if (value) {
      const order = JSON.parse(decodeURIComponent(value))
      memoryLastOrder = order
      if (!orderId || order.id === orderId) {
        return order
      }
    }
    return null
  } catch {
    return null
  }
}

export const setLastOrderData = async (order: HttpTypes.StoreOrder | (Record<string, unknown> & { id: string })) => {
  memoryLastOrder = order as HttpTypes.StoreOrder
  try {
    const cookies = await nextCookies()
    const jsonStr = encodeURIComponent(JSON.stringify(order))
    cookies.set("_medusa_last_order", jsonStr, {
      maxAge: 60 * 60 * 24 * 3,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })
  } catch (e) {
    console.error("Failed to set last order cookie", e)
  }
}

let memoryFarmerSession: Record<string, unknown> | null = null

export const getFarmerSessionCookie = async (): Promise<Record<string, unknown> | null> => {
  if (memoryFarmerSession) return memoryFarmerSession
  try {
    const cookies = await nextCookies()
    const raw = cookies.get("_biotill_farmer_session")?.value
    if (raw) {
      const parsed = JSON.parse(raw)
      memoryFarmerSession = parsed
      return parsed
    }
    return null
  } catch {
    return null
  }
}

export const setFarmerSessionCookie = async (session: Record<string, unknown>) => {
  memoryFarmerSession = session
  try {
    const cookies = await nextCookies()
    cookies.set("_biotill_farmer_session", JSON.stringify(session), {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })
  } catch {
    // ignore
  }
}

export const removeFarmerSessionCookie = async () => {
  memoryFarmerSession = null
  try {
    const cookies = await nextCookies()
    cookies.set("_biotill_farmer_session", "", {
      maxAge: -1,
      path: "/",
    })
  } catch {
    // ignore
  }
}

