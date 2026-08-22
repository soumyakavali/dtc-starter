"use server"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import {
  getAuthHeaders,
  getCacheOptions,
  getCacheTag,
  getCartId,
  getLocalCartData,
  removeCartId,
  removeLocalCartData,
  setCartId,
  setLastOrderData,
  setLocalCartData,
} from "./cookies"
import { getRegion } from "./regions"
import { getLocale } from "./locale-actions"
import { DEFAULT_MOCK_REGION } from "./mock-data"
import { calculateCartTotals, findProductAndVariant } from "./cart-helpers"
import { retrieveCustomer } from "./customer"

function safeRevalidate(tag: string) {
  try {
    if (tag && tag.trim().length > 0) {
      revalidateTag(tag)
    }
  } catch {
    // ignore
  }
}

export async function retrieveCart(
  cartId?: string,
  fields?: string
): Promise<HttpTypes.StoreCart | null> {
  const id = cartId || (await getCartId())

  // Check local cart state first
  const localData = await getLocalCartData()
  if (localData && Array.isArray(localData.items) && localData.items.length > 0) {
    const computed = calculateCartTotals(localData)
    return computed as unknown as HttpTypes.StoreCart
  }

  // Try remote backend if ID is provided
  if (id && !id.startsWith("cart_local_")) {
    try {
      fields ??=
        "*items, *region, *items.product, *items.variant, *items.thumbnail, *items.metadata, +items.total, *promotions, +shipping_methods.name"

      const headers = {
        ...(await getAuthHeaders()),
      }

      const next = {
        ...(await getCacheOptions("carts")),
      }

      const res = await sdk.client
        .fetch<HttpTypes.StoreCartResponse>(`/store/carts/${id}`, {
          method: "GET",
          query: {
            fields,
          },
          headers,
          next,
          cache: "force-cache",
        })
        .then(({ cart }: { cart: HttpTypes.StoreCart }) => cart || null)
        .catch(() => null)

      if (res && res.id) {
        return res
      }
    } catch {
      // ignore
    }
  }

  if (localData) {
    const computed = calculateCartTotals(localData)
    return computed as unknown as HttpTypes.StoreCart
  }

  return null
}

export async function getOrSetCart(countryCode: string) {
  const region = (await getRegion(countryCode)) || DEFAULT_MOCK_REGION

  let cart = await retrieveCart(undefined, "id,region_id")

  if (!cart) {
    const headers = {
      ...(await getAuthHeaders()),
    }

    try {
      const locale = await getLocale()
      const cartResp = await sdk.store.cart.create(
        { region_id: region.id, locale: locale || undefined },
        {},
        headers
      )
      cart = cartResp.cart
      await setCartId(cart.id)
    } catch {
      const newLocalId = `cart_local_${Date.now()}`
      const newCart = calculateCartTotals(
        {
          id: newLocalId,
          region_id: region.id,
          currency_code: region.currency_code || "inr",
          region,
          items: [],
          shipping_methods: [],
          subtotal: 0,
          shipping_total: 0,
          discount_total: 0,
          total: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        region
      )

      await setCartId(newLocalId)
      await setLocalCartData(newCart)
      return newCart as unknown as HttpTypes.StoreCart
    }
  }

  return cart
}

export async function updateCart(data: HttpTypes.StoreUpdateCart) {
  const cartId = await getCartId()

  if (!cartId) {
    throw new Error("No existing cart found, please create one before updating")
  }

  if (!cartId.startsWith("cart_local_")) {
    try {
      const headers = {
        ...(await getAuthHeaders()),
      }

      return await sdk.store.cart
        .update(cartId, data, {}, headers)
        .then(async ({ cart }: { cart: HttpTypes.StoreCart }) => {
          const cartCacheTag = await getCacheTag("carts")
          safeRevalidate(cartCacheTag)

          const fulfillmentCacheTag = await getCacheTag("fulfillment")
          safeRevalidate(fulfillmentCacheTag)

          return cart
        })
    } catch {
      // fallback
    }
  }

  const localCart = (await getLocalCartData()) || { id: cartId }
  const updated = {
    ...localCart,
    ...data,
    updated_at: new Date().toISOString(),
  }
  const recalculated = calculateCartTotals(updated)
  await setLocalCartData(recalculated)

  const cartCacheTag = await getCacheTag("carts")
  safeRevalidate(cartCacheTag)

  return recalculated as unknown as HttpTypes.StoreCart
}

export async function addToCart({
  variantId,
  quantity,
  countryCode,
}: {
  variantId: string
  quantity: number
  countryCode: string
}) {
  if (!variantId) {
    throw new Error("Missing variant ID when adding to cart")
  }

  // Farmer registration/authentication gate
  const customer = await retrieveCustomer().catch(() => null)
  if (!customer) {
    throw new Error("AUTH_REQUIRED: Please register or sign in to add items to your cart / ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಲು ದಯವಿಟ್ಟು ನೋಂದಾಯಿಸಿ")
  }

  const region = (await getRegion(countryCode)) || DEFAULT_MOCK_REGION
  const cart = await getOrSetCart(countryCode)

  if (!cart) {
    throw new Error("Error retrieving or creating cart")
  }

  const isRemoteCart = cart.id && !cart.id.startsWith("cart_local_")

  if (isRemoteCart) {
    try {
      const headers = {
        ...(await getAuthHeaders()),
      }

      await sdk.store.cart
        .createLineItem(
          cart.id,
          {
            variant_id: variantId,
            quantity,
          },
          {},
          headers
        )
        .then(async () => {
          const cartCacheTag = await getCacheTag("carts")
          safeRevalidate(cartCacheTag)

          const fulfillmentCacheTag = await getCacheTag("fulfillment")
          safeRevalidate(fulfillmentCacheTag)
        })

      return
    } catch (remoteError) {
      console.warn("Falling back to local cart logic:", remoteError)
    }
  }

  // Local / Standalone Cart Operation
  const localCart = (await getLocalCartData()) || cart || { id: cart.id || `cart_local_${Date.now()}` }
  const { product, variant } = findProductAndVariant(variantId)

  const unitPrice =
    variant?.calculated_price?.calculated_amount ??
    (product.handle?.includes("liquid") ? 350 : 150)

  const existingItems = Array.isArray(localCart.items) ? [...localCart.items] : []
  const existingIdx = existingItems.findIndex(
    (item: HttpTypes.StoreCartLineItem) =>
      item.variant_id === variantId ||
      item.variant?.id === variantId ||
      (item as Record<string, unknown>).product_handle === product.handle
  )

  if (existingIdx > -1) {
    const current = existingItems[existingIdx]
    const updatedQty = (current.quantity || 1) + (quantity || 1)
    existingItems[existingIdx] = {
      ...current,
      quantity: updatedQty,
      total: updatedQty * unitPrice,
      subtotal: updatedQty * unitPrice,
    }
  } else {
    const newItem = {
      id: `item_${variant?.id || variantId}_${Date.now()}`,
      title: product.title,
      product_title: product.title,
      subtitle: variant?.title || "Standard Agricultural Pack",
      thumbnail: product.thumbnail,
      quantity: quantity || 1,
      unit_price: unitPrice,
      total: (quantity || 1) * unitPrice,
      subtotal: (quantity || 1) * unitPrice,
      variant_id: variantId || variant?.id,
      product_id: product.id,
      product_handle: product.handle,
      variant: variant || {
        id: variantId,
        title: "1 Unit",
        calculated_price: { calculated_amount: unitPrice },
      },
      product: {
        id: product.id,
        title: product.title,
        handle: product.handle,
        thumbnail: product.thumbnail,
        description: product.description,
        collection_id: product.collection_id,
      },
      metadata: product.metadata,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    existingItems.push(newItem)
  }

  const updatedCart = calculateCartTotals(
    {
      ...localCart,
      id: localCart.id || `cart_local_${Date.now()}`,
      items: existingItems,
      updated_at: new Date().toISOString(),
    },
    region
  )

  await setCartId(updatedCart.id)
  await setLocalCartData(updatedCart)

  const cartCacheTag = await getCacheTag("carts")
  safeRevalidate(cartCacheTag)

  const fulfillmentCacheTag = await getCacheTag("fulfillment")
  safeRevalidate(fulfillmentCacheTag)
}

export async function updateLineItem({
  lineId,
  quantity,
}: {
  lineId: string
  quantity: number
}) {
  if (!lineId) {
    throw new Error("Missing lineItem ID when updating line item")
  }

  const cartId = await getCartId()

  if (!cartId) {
    throw new Error("Missing cart ID when updating line item")
  }

  if (!cartId.startsWith("cart_local_")) {
    try {
      const headers = {
        ...(await getAuthHeaders()),
      }

      return await sdk.store.cart
        .updateLineItem(cartId, lineId, { quantity }, {}, headers)
        .then(async () => {
          const cartCacheTag = await getCacheTag("carts")
          safeRevalidate(cartCacheTag)

          const fulfillmentCacheTag = await getCacheTag("fulfillment")
          safeRevalidate(fulfillmentCacheTag)
        })
    } catch {
      // fallback
    }
  }

  const localCart = await getLocalCartData()
  if (localCart && Array.isArray(localCart.items)) {
    let items = [...localCart.items]
    if (quantity <= 0) {
      items = items.filter((item: HttpTypes.StoreCartLineItem) => item.id !== lineId)
    } else {
      items = items.map((item: HttpTypes.StoreCartLineItem) => {
        if (item.id === lineId) {
          const unitPrice = item.unit_price || 150
          return {
            ...item,
            quantity,
            total: quantity * unitPrice,
            subtotal: quantity * unitPrice,
          }
        }
        return item
      })
    }

    const recalculated = calculateCartTotals({
      ...localCart,
      items,
      updated_at: new Date().toISOString(),
    })

    await setLocalCartData(recalculated)

    const cartCacheTag = await getCacheTag("carts")
    safeRevalidate(cartCacheTag)

    const fulfillmentCacheTag = await getCacheTag("fulfillment")
    safeRevalidate(fulfillmentCacheTag)
  }
}

export async function deleteLineItem(lineId: string) {
  if (!lineId) {
    throw new Error("Missing lineItem ID when deleting line item")
  }

  const cartId = await getCartId()

  if (!cartId) {
    throw new Error("Missing cart ID when deleting line item")
  }

  if (!cartId.startsWith("cart_local_")) {
    try {
      const headers = {
        ...(await getAuthHeaders()),
      }

      return await sdk.store.cart
        .deleteLineItem(cartId, lineId, {}, headers)
        .then(async () => {
          const cartCacheTag = await getCacheTag("carts")
          safeRevalidate(cartCacheTag)

          const fulfillmentCacheTag = await getCacheTag("fulfillment")
          safeRevalidate(fulfillmentCacheTag)
        })
    } catch {
      // fallback
    }
  }

  const localCart = await getLocalCartData()
  if (localCart && Array.isArray(localCart.items)) {
    const items = localCart.items.filter((item: HttpTypes.StoreCartLineItem) => item.id !== lineId)
    const recalculated = calculateCartTotals({
      ...localCart,
      items,
      updated_at: new Date().toISOString(),
    })

    await setLocalCartData(recalculated)

    const cartCacheTag = await getCacheTag("carts")
    safeRevalidate(cartCacheTag)

    const fulfillmentCacheTag = await getCacheTag("fulfillment")
    safeRevalidate(fulfillmentCacheTag)
  }
}

export async function setShippingMethod({
  cartId,
  shippingMethodId,
}: {
  cartId: string
  shippingMethodId: string
}) {
  if (!cartId.startsWith("cart_local_")) {
    try {
      const headers = {
        ...(await getAuthHeaders()),
      }

      return await sdk.store.cart
        .addShippingMethod(cartId, { option_id: shippingMethodId }, {}, headers)
        .then(async () => {
          const cartCacheTag = await getCacheTag("carts")
          safeRevalidate(cartCacheTag)
        })
    } catch {
      // fallback
    }
  }

  const localCart = await getLocalCartData()
  if (localCart) {
    const recalculated = calculateCartTotals({
      ...localCart,
      selected_shipping_method_id: shippingMethodId,
      updated_at: new Date().toISOString(),
    })
    await setLocalCartData(recalculated)
    const cartCacheTag = await getCacheTag("carts")
    safeRevalidate(cartCacheTag)
  }
}

export async function initiatePaymentSession(
  cartOrData?: HttpTypes.StoreCart | string | Record<string, unknown>,
  dataOrOptions?: HttpTypes.StoreInitializePaymentSession | string | Record<string, unknown>
) {
  let cart: HttpTypes.StoreCart | null = null
  let data: HttpTypes.StoreInitializePaymentSession = { provider_id: "pp_system_default" }

  if (cartOrData && typeof cartOrData === "object" && "items" in cartOrData) {
    cart = cartOrData as HttpTypes.StoreCart
    if (dataOrOptions) {
      data = typeof dataOrOptions === "string" ? { provider_id: dataOrOptions } : (dataOrOptions as HttpTypes.StoreInitializePaymentSession)
    }
  } else if (typeof cartOrData === "string") {
    data = { provider_id: cartOrData }
    cart = (await getLocalCartData()) || (await retrieveCart())
  } else if (cartOrData && typeof cartOrData === "object" && ("provider_id" in cartOrData || "data" in cartOrData)) {
    data = cartOrData as HttpTypes.StoreInitializePaymentSession
    cart = (await getLocalCartData()) || (await retrieveCart())
  } else {
    cart = (await getLocalCartData()) || (await retrieveCart())
  }

  if (!cart) {
    cart = await getOrSetCart("in")
  }

  if (cart?.id && !cart.id.startsWith("cart_local_")) {
    try {
      const headers = {
        ...(await getAuthHeaders()),
      }

      return await sdk.store.payment
        .initiatePaymentSession(cart, data, {}, headers)
        .then(async (resp) => {
          const cartCacheTag = await getCacheTag("carts")
          safeRevalidate(cartCacheTag)
          return resp
        })
    } catch {
      // fallback
    }
  }

  const localCart = (await getLocalCartData()) || cart
  const session = {
    id: `ps_${data?.provider_id || "phonepe"}_${Date.now()}`,
    provider_id: data?.provider_id || "phonepe",
    amount: localCart?.total || 0,
    status: "authorized",
    data: data?.data || {},
  }

  const updatedCart = {
    ...localCart,
    payment_collection: {
      id: `paycol_${Date.now()}`,
      amount: localCart?.total || 0,
      payment_sessions: [session],
      status: "authorized",
    },
  }

  await setLocalCartData(updatedCart)
  return session as unknown as HttpTypes.StorePaymentSession
}

export async function applyPromotions(codes: string[]) {
  const cartId = await getCartId()

  if (!cartId) {
    throw new Error("No existing cart found")
  }

  if (!cartId.startsWith("cart_local_")) {
    try {
      const headers = {
        ...(await getAuthHeaders()),
      }

      return await sdk.store.cart
        .update(cartId, { promo_codes: codes }, {}, headers)
        .then(async () => {
          const cartCacheTag = await getCacheTag("carts")
          safeRevalidate(cartCacheTag)

          const fulfillmentCacheTag = await getCacheTag("fulfillment")
          safeRevalidate(fulfillmentCacheTag)
        })
    } catch {
      // fallback
    }
  }

  const localCart = await getLocalCartData()
  if (localCart) {
    const updated = {
      ...localCart,
      promotions: codes,
      promo_codes: codes,
    }
    const recalculated = calculateCartTotals(updated)
    await setLocalCartData(recalculated)

    const cartCacheTag = await getCacheTag("carts")
    safeRevalidate(cartCacheTag)
  }
}

export async function applyGiftCard(_code: string) {}

export async function removeDiscount(_code: string) {
  const localCart = await getLocalCartData()
  if (localCart) {
    const updated = {
      ...localCart,
      promotions: [],
      promo_codes: [],
    }
    const recalculated = calculateCartTotals(updated)
    await setLocalCartData(recalculated)
  }
}

export async function removeGiftCard(_codeToRemove: string, _giftCards: unknown[]) {}

export async function submitPromotionForm(
  _currentState: unknown,
  formData: FormData
) {
  const code = formData.get("code") as string
  try {
    await applyPromotions([code])
  } catch (e: unknown) {
    return (e as Error).message
  }
}

export async function setAddresses(_currentState: unknown, formData: FormData) {
  try {
    if (!formData) {
      throw new Error("No form data found when setting addresses")
    }
    const cartId = await getCartId()
    if (!cartId) {
      throw new Error("No existing cart found when setting addresses")
    }

    const shippingAddress = {
      first_name: formData.get("shipping_address.first_name") as string,
      last_name: (formData.get("shipping_address.last_name") as string) || "",
      address_1: formData.get("shipping_address.address_1") as string,
      address_2: (formData.get("shipping_address.address_2") as string) || "",
      company: (formData.get("shipping_address.company") as string) || "",
      postal_code: formData.get("shipping_address.postal_code") as string,
      city: formData.get("shipping_address.city") as string,
      country_code: (formData.get("shipping_address.country_code") as string) || "in",
      province: (formData.get("shipping_address.province") as string) || "Karnataka",
      phone: (formData.get("shipping_address.phone") as string) || "+91 94801 23456",
    }

    const sameAsBilling = formData.get("same_as_billing")
    const billingAddress =
      sameAsBilling === "on"
        ? shippingAddress
        : {
            first_name:
              (formData.get("billing_address.first_name") as string) || shippingAddress.first_name,
            last_name:
              (formData.get("billing_address.last_name") as string) || shippingAddress.last_name,
            address_1:
              (formData.get("billing_address.address_1") as string) || shippingAddress.address_1,
            address_2: "",
            company: "",
            postal_code:
              (formData.get("billing_address.postal_code") as string) || shippingAddress.postal_code,
            city: (formData.get("billing_address.city") as string) || shippingAddress.city,
            country_code:
              (formData.get("billing_address.country_code") as string) || "in",
            province:
              (formData.get("billing_address.province") as string) || "Karnataka",
            phone:
              (formData.get("billing_address.phone") as string) || shippingAddress.phone,
          }

    const email = (formData.get("email") as string) || "farmer@biotill.agri"

    const data: Parameters<typeof updateCart>[0] = {
      shipping_address: shippingAddress,
      billing_address: billingAddress,
      email,
    }

    await updateCart(data)
  } catch (e: unknown) {
    return (e as Error).message
  }

  const country = (formData.get("shipping_address.country_code") as string) || "in"
  redirect(`/${country}/checkout?step=delivery`)
}

export async function placeOrder(cartId?: string) {
  const id = cartId || (await getCartId())

  if (!id) {
    throw new Error("No existing cart found when placing an order")
  }

  if (!id.startsWith("cart_local_")) {
    try {
      const headers = {
        ...(await getAuthHeaders()),
      }

      const cartRes = await sdk.store.cart
        .complete(id, {}, headers)
        .then(async (res) => {
          const cartCacheTag = await getCacheTag("carts")
          safeRevalidate(cartCacheTag)
          return res
        })

      if (cartRes?.type === "order") {
        const countryCode =
          cartRes.order.shipping_address?.country_code?.toLowerCase() || "in"

        const orderCacheTag = await getCacheTag("orders")
        safeRevalidate(orderCacheTag)

        await removeCartId()
        await removeLocalCartData()
        redirect(`/${countryCode}/order/${cartRes?.order.id}/confirmed`)
      }

      if (cartRes?.cart) {
        return cartRes.cart
      }
    } catch {
      // fallback
    }
  }

  const localCart = (await getLocalCartData()) || { id }
  const orderId = `order_bt_${Date.now().toString(36).toUpperCase()}`
  const countryCode =
    localCart.shipping_address?.country_code?.toLowerCase() || "in"

  const confirmedOrder = {
    id: orderId,
    display_id: Math.floor(100000 + Math.random() * 900000),
    status: "completed",
    fulfillment_status: "not_fulfilled",
    payment_status: "captured",
    currency_code: localCart.currency_code || "inr",
    items: localCart.items || [],
    subtotal: localCart.subtotal || 0,
    shipping_total: localCart.shipping_total || 0,
    discount_total: localCart.discount_total || 0,
    tax_total: 0,
    total: localCart.total || 0,
    shipping_address: localCart.shipping_address || {
      first_name: "BioTill",
      last_name: "Farmer",
      address_1: "Main Farm Road",
      city: "Hubballi / Bengaluru",
      province: "Karnataka",
      postal_code: "560001",
      country_code: "in",
      phone: "+91 94801 23456",
    },
    billing_address: localCart.billing_address || localCart.shipping_address,
    email: localCart.email || "farmer@biotill.agri",
    shipping_methods: localCart.shipping_methods || [
      {
        id: "sm_standard",
        name: "Direct Farm Express Delivery (ಕರ್ನಾಟಕ & ಭಾರತ)",
        amount: localCart.shipping_total || 0,
      },
    ],
    payment_collections: [
      {
        id: `paycol_${Date.now()}`,
        status: "authorized",
        payments: [
          {
            id: `pay_${Date.now()}`,
            provider_id: "phonepe",
            amount: localCart.total || 0,
            currency_code: "inr",
          },
        ],
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  await setLastOrderData(confirmedOrder)
  await removeCartId()
  await removeLocalCartData()

  const orderCacheTag = await getCacheTag("orders")
  safeRevalidate(orderCacheTag)

  redirect(`/${countryCode}/order/${orderId}/confirmed`)
}

export async function updateRegion(countryCode: string, currentPath: string) {
  const cartId = await getCartId()
  const region = (await getRegion(countryCode)) || DEFAULT_MOCK_REGION

  if (cartId) {
    await updateCart({ region_id: region.id })
    const cartCacheTag = await getCacheTag("carts")
    safeRevalidate(cartCacheTag)
  }

  const regionCacheTag = await getCacheTag("regions")
  safeRevalidate(regionCacheTag)

  const productsCacheTag = await getCacheTag("products")
  safeRevalidate(productsCacheTag)

  redirect(`/${countryCode}${currentPath}`)
}

export async function listCartOptions() {
  try {
    const cartId = await getCartId()
    if (!cartId) return { shipping_options: [] }

    if (!cartId.startsWith("cart_local_")) {
      const headers = {
        ...(await getAuthHeaders()),
      }
      const next = {
        ...(await getCacheOptions("shippingOptions")),
      }

      const res = await sdk.client
        .fetch<{
          shipping_options: HttpTypes.StoreCartShippingOption[]
        }>("/store/shipping-options", {
          query: { cart_id: cartId },
          next,
          headers,
          cache: "force-cache",
        })
        .catch(() => null)

      if (res?.shipping_options?.length) {
        return res
      }
    }

    return {
      shipping_options: [
        {
          id: "sm_standard_agri",
          name: "Standard Rural & India Express (₹70 Flat / 2-4 Days)",
          amount: 70,
          is_tax_inclusive: true,
          price_type: "flat",
        },
        {
          id: "sm_free_agri",
          name: "Free Agricultural Farm Delivery (Orders ₹999+ / ಉಚಿತ ಡೆಲಿವರಿ)",
          amount: 0,
          is_tax_inclusive: true,
          price_type: "flat",
        },
      ] as unknown as HttpTypes.StoreCartShippingOption[],
    }
  } catch {
    return { shipping_options: [] }
  }
}
