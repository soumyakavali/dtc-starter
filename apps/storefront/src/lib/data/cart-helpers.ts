import { HttpTypes } from "@medusajs/types"
import { DEFAULT_MOCK_REGION, MOCK_PRODUCTS } from "./mock-data"

export function findProductAndVariant(variantId: string) {
  if (!variantId) {
    return {
      product: MOCK_PRODUCTS[0],
      variant: MOCK_PRODUCTS[0].variants?.[0],
    }
  }

  // Exact variant ID match
  for (const prod of MOCK_PRODUCTS) {
    const variant = prod.variants?.find((v) => v.id === variantId)
    if (variant) {
      return { product: prod, variant }
    }
  }

  // Exact product handle or product ID match
  for (const prod of MOCK_PRODUCTS) {
    if (prod.id === variantId || prod.handle === variantId) {
      return { product: prod, variant: prod.variants?.[0] }
    }
  }

  // Fuzzy / Alias matching
  const vid = variantId.toLowerCase()
  if (vid.includes("vam")) {
    const p = MOCK_PRODUCTS.find((p) => p.id === "prod_vam_powder" || p.handle?.includes("vam")) || MOCK_PRODUCTS[3]
    return { product: p, variant: p.variants?.[0] }
  }
  if (vid.includes("soil") || vid.includes("cmp") || vid.includes("decomposer")) {
    const p = MOCK_PRODUCTS.find((p) => p.id === "prod_compost_culture_powder" || p.handle?.includes("decomposer")) || MOCK_PRODUCTS[5]
    return { product: p, variant: p.variants?.[0] }
  }
  if (vid.includes("pae") || vid.includes("nematicide") || vid.includes("lilacinus")) {
    const p = MOCK_PRODUCTS.find((p) => p.id === "prod_paecilomyces_powder" || p.handle?.includes("paecilomyces")) || MOCK_PRODUCTS[4]
    return { product: p, variant: p.variants?.[0] }
  }
  if (vid.includes("npk")) {
    const p = MOCK_PRODUCTS.find((p) => p.id === "prod_bio_npk_liquid" || p.handle?.includes("npk")) || MOCK_PRODUCTS[9]
    return { product: p, variant: p.variants?.[0] }
  }
  if (vid.includes("met")) {
    const p = vid.includes("liq") ? (MOCK_PRODUCTS.find((p) => p.id === "prod_metarhizium_liquid") || MOCK_PRODUCTS[8]) : (MOCK_PRODUCTS.find((p) => p.id === "prod_metarhizium_powder") || MOCK_PRODUCTS[2])
    return { product: p, variant: p.variants?.[0] }
  }
  if (vid.includes("pse")) {
    const p = vid.includes("liq") ? (MOCK_PRODUCTS.find((p) => p.id === "prod_pseudomonas_liquid") || MOCK_PRODUCTS[7]) : (MOCK_PRODUCTS.find((p) => p.id === "prod_pseudomonas_powder") || MOCK_PRODUCTS[1])
    return { product: p, variant: p.variants?.[0] }
  }
  if (vid.includes("tri")) {
    const p = vid.includes("liq") ? (MOCK_PRODUCTS.find((p) => p.id === "prod_trichoderma_liquid") || MOCK_PRODUCTS[6]) : (MOCK_PRODUCTS.find((p) => p.id === "prod_trichoderma_powder") || MOCK_PRODUCTS[0])
    return { product: p, variant: p.variants?.[0] }
  }

  return {
    product: MOCK_PRODUCTS[0],
    variant: MOCK_PRODUCTS[0].variants?.[0],
  }
}

export function hydrateCartItem(item: Partial<HttpTypes.StoreCartLineItem> & Record<string, unknown>): HttpTypes.StoreCartLineItem {
  const variantId = (item.variant_id || item.variant?.id || item.id) as string
  const { product, variant } = findProductAndVariant(variantId)
  const unitPrice = Number(
    item.unit_price ??
      variant?.calculated_price?.calculated_amount ??
      (product.handle?.includes("liquid") ? 350 : 150)
  )
  const quantity = Number(item.quantity ?? 1)
  const total = unitPrice * quantity

  return {
    id: (item.id as string) || `item_${variantId || variant?.id}_${Date.now()}`,
    title: (item.title as string) || product.title,
    product_title: (item.product_title as string) || product.title,
    subtitle: (item.subtitle as string) || variant?.title || "Standard Agricultural Pack",
    thumbnail: (item.thumbnail as string) || product.thumbnail,
    quantity,
    unit_price: unitPrice,
    total,
    subtotal: total,
    variant_id: (item.variant_id || variantId || variant?.id) as string,
    product_id: product.id,
    product_handle: product.handle,
    variant: (variant || {
      id: variantId || variant?.id,
      title: "1 Unit",
      calculated_price: { calculated_amount: unitPrice },
    }) as HttpTypes.StoreProductVariant,
    product: {
      id: product.id,
      title: product.title,
      handle: product.handle,
      thumbnail: product.thumbnail,
      description: product.description,
      collection_id: product.collection_id,
    } as HttpTypes.StoreProduct,
    metadata: product.metadata,
    created_at: (item.created_at as string) || new Date().toISOString(),
    updated_at: (item.updated_at as string) || new Date().toISOString(),
  } as unknown as HttpTypes.StoreCartLineItem
}

export function compressCartData(cart: Partial<HttpTypes.StoreCart> & Record<string, unknown>) {
  if (!cart) return null
  return {
    id: cart.id,
    region_id: cart.region_id,
    currency_code: cart.currency_code || "inr",
    items: ((cart.items as HttpTypes.StoreCartLineItem[]) || []).map((i) => ({
      id: i.id,
      variant_id: i.variant_id || i.variant?.id,
      quantity: Number(i.quantity) || 1,
      unit_price: Number(i.unit_price) || 150,
    })),
    promotions: (cart.promotions || cart.promo_codes || []) as string[],
    promo_codes: (cart.promotions || cart.promo_codes || []) as string[],
    shipping_address: cart.shipping_address,
    billing_address: cart.billing_address,
    email: cart.email,
    created_at: cart.created_at,
    updated_at: cart.updated_at,
  }
}

export function hydrateCartData(cart: Partial<HttpTypes.StoreCart> & Record<string, unknown>, region?: HttpTypes.StoreRegion) {
  if (!cart) return null
  const hydratedItems = ((cart.items as HttpTypes.StoreCartLineItem[]) || []).map(hydrateCartItem)
  return calculateCartTotals(
    {
      ...cart,
      items: hydratedItems,
    },
    region
  )
}

export function calculateCartTotals(cart: Partial<HttpTypes.StoreCart> & Record<string, unknown>, region?: HttpTypes.StoreRegion) {
  const rawItems = (cart.items as HttpTypes.StoreCartLineItem[]) || []
  const items = rawItems.map((item) => {
    const unitPrice = Number(
      item.unit_price ??
        item.variant?.calculated_price?.calculated_amount ??
        ((item as Record<string, unknown>).product_handle === "string" && ((item as Record<string, unknown>).product_handle as string).includes("liquid") ? 350 : 150)
    )
    const quantity = Number(item.quantity ?? 1)
    const total = unitPrice * quantity
    return {
      ...item,
      unit_price: unitPrice,
      quantity,
      total,
      subtotal: total,
    }
  })

  const subtotal = items.reduce((acc: number, item) => acc + (item.total || 0), 0)

  const rawPromos = ((cart.promotions || cart.promo_codes || []) as (string | { code?: string; id?: string })[])
  const promoCodes = rawPromos
    .map((p) => (typeof p === "string" ? p : p.code || ""))
    .filter(Boolean)

  let discount_total = 0
  if (promoCodes.some((c: string) => c.toUpperCase() === "FARMER10")) {
    discount_total = Math.round(subtotal * 0.1)
  } else if (promoCodes.some((c: string) => c.toUpperCase() === "BIOTILL50")) {
    discount_total = Math.min(50, subtotal)
  } else if (promoCodes.length > 0) {
    discount_total = Math.round(subtotal * 0.05)
  }

  const promotions = promoCodes.map((code) => ({
    id: `promo_${code.toLowerCase()}`,
    code: code.toUpperCase(),
    application_method: {
      type: "percentage",
      value: 10,
    },
  }))

  const isFreeDelivery = subtotal >= 999
  const shipping_total = items.length === 0 ? 0 : isFreeDelivery ? 0 : 70
  const total = Math.max(0, subtotal - discount_total + shipping_total)

  const activeRegion = region || cart.region || DEFAULT_MOCK_REGION

  return {
    ...cart,
    currency_code: activeRegion.currency_code || "inr",
    region_id: activeRegion.id,
    region: activeRegion,
    items,
    promotions,
    promo_codes: promoCodes,
    subtotal,
    discount_total,
    shipping_total,
    tax_total: 0,
    total,
    shipping_methods:
      items.length > 0
        ? [
            {
              id: isFreeDelivery ? "sm_free_agri" : "sm_standard_agri",
              name: isFreeDelivery
                ? "Free Agricultural Farm Delivery (Orders ₹999+ / ಉಚಿತ ಡೆಲಿವರಿ)"
                : "Standard Rural & India Express (₹70 Flat)",
              amount: shipping_total,
            },
          ]
        : [],
  } as unknown as HttpTypes.StoreCart
}
